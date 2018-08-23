Tuning Mastodon
===============

Table of contents:

- [Concurrency tuning / utilizing your hardware](#concurrency-tuning--utilizing-your-hardware)
- [Using pgBouncer](PgBouncer-guide.md)
- [Using nginx proxy caching](#using-nginx-proxy-caching)
- [Using a separate Redis for the Rails cache](#using-a-separate-redis-for-the-rails-cache)

___

## Concurrency tuning / utilizing your hardware

Mastodon has three types of processes:

- web
- streaming API
- background processing

By default, the web type spawns two worker processes with 5 threads each, the streaming API is a single thread/process with 10 database pool connections, and background processing spawns one process with 5 threads.

### Web

The web process serves short-lived HTTP requests for most of the application. The following environment variables control it:

- `WEB_CONCURRENCY` controls the number of worker processes
- `MAX_THREADS` controls the number of threads per process

The default is 2 workers with 5 threads each. Threads share the memory of their parent process. Different processes allocate their own memory, though they share some memory via copy-on-write. A larger number of threads maxes out your CPU first, a larger number of processes maxes out your RAM first.

These values affect how many HTTP requests can be served at the same time. When not enough threads are available, requests are queued until they can be answered.

For a single-user instance, 1 process with 5 threads should be more than enough.

### Streaming API

The streaming API handles long-lived HTTP and WebSockets connections, through which clients receive real-time updates. It is a single-threaded process. By default it has a database connection pool of 10, which means 10 different database queries can run *at the same time*. The database is not heavily used in the streaming API, only for initial authentication of the request, and for some special receiver-specific filter queries when receiving new messages. At the time of writing this value cannot be reconfigured, but mostly doesn't need to.

If you need to scale up the streaming API, change the `STREAMING_CLUSTER_NUM` in your `.env.production`. If unspecified, this will default to the number of cores on the machine minus 1.

### Background processing

Many tasks in Mastodon are delegated to background processing to ensure the HTTP requests are fast, and to prevent HTTP request aborts from affecting the execution of those tasks. Sidekiq is a single process, with a configurable number of threads (5 by default).

While the amount of threads in the web process affects the responsiveness of the Mastodon instance to the end-user, the amount of threads allocated to background processing affects how quickly posts can be delivered from the author to anyone else, how soon e-mails are sent out, etc.

The amount of threads is not controlled by an environment variable in this case, but a command line argument in the invocation of Sidekiq:

    bundle exec sidekiq -c 15 -q default -q mailers -q push -q pull

Would start the sidekiq process with 15 threads. Please mind that each threads needs to be able to connect to the database, which means that the database pool needs to be large enough to support all the threads. The database pool size is controlled with the `DB_POOL` environment variable, and defaults to the value of `MAX_THREADS` (therefore, is 5 by default). So when the amount of Sidekiq threads (-c) is different than the amount of Puma threads (MAX_THREADS) than you have to set DB_POOL as an environment variable for Sidekiq. 

You might notice that the above command specifies three queues to be processed:

- "default" contains most tasks such as delivering messages to followers and processing incoming notifications from other instances
- "mailers" contains tasks that send e-mails
- "push" contains tasks that deliver messages to other instances

If you wish, you could start three different processes for each queue, to ensure that even when there is a lot of tasks of one type, important tasks of other types still get executed in a timely manner.

___

### How to set environment variables
#### With systemd

In the `.service` file:

```systemd
...
Environment="WEB_CONCURRENCY=1"
Environment="MAX_THREADS=5"
ExecStart="..."
...
```

Don't forget to `sudo systemctl daemon-reload` before restarting the services so that the changes would take effect!

#### With docker-compose

Edit `docker-compose.yml`:

```yml
...
  web:
    restart: always
    build: .
    env_file: .env.production
    environment:
      - WEB_CONCURRENCY=1
      - MAX_THREADS=5
...
  sidekiq:
    restart: always
    build: .
    env_file: .env.production
    environment:
      - DB_POOL=10
    command: bundle exec sidekiq -c 10 -q default -q mailers -q pull -q push
...
```

Re-create the containers with `docker-compose up -d` for the changes to take effect.

You can also scale the number of containers per "service" (where service is "web", "sidekiq" and "streaming"):

    docker-compose scale web=1 sidekiq=2 streaming=3

Realistically the `docker-compose.yml` file needs to be modified a bit further for the above to work, because by default it wants to bind the web container to host port 3000 and streaming container to host port 4000, of either of which there is only one on the host system. However, if you change:

```yml
ports:
  - "3000:3000"
```

to simply:

```yml
ports:
  - "3000"
```

for each service respectively, Docker will allocate random host ports of the services, allowing multiple containers to run alongside each other. But it will be on you to look up which host ports those are (e.g. with `docker ps`), and they will be different on each container restart.

## Using nginx proxy caching

A lot of data that Mastodon deals with is not immutable, and is therefore difficult to cache. However, some data *is* immutable and caching it in the reverse proxy (e.g. nginx) can have a positive impact on performance because those requests never have to touch Ruby and the database.

Here is how to enable proxy caching in Nginx:

```diff
diff --git a/example.com.conf b/example.com.conf
index 0b50542..1d3fac6 100644
--- a/example.com.conf
+++ b/example.com.conf
@@ -13,6 +13,8 @@ server {
   location / { return 301 https://$host$request_uri; }
 }

+proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=CACHE:10m inactive=7d max_size=1g;
+
 server {
   listen 443 ssl http2;
   listen [::]:443 ssl http2;
@@ -66,12 +68,17 @@ server {
     proxy_pass_header Server;

     proxy_pass http://127.0.0.1:3000;
-    proxy_buffering off;
+    proxy_buffering on;
     proxy_redirect off;
     proxy_http_version 1.1;
     proxy_set_header Upgrade $http_upgrade;
     proxy_set_header Connection $connection_upgrade;

+    proxy_cache CACHE;
+    proxy_cache_valid 200 7d;
+    proxy_cache_use_stale error timeout updating http_500 http_502 http_503 http_504;
+    add_header X-Cached $upstream_cache_status;
+
     tcp_nodelay on;
   }
 ```
 
 The /var/cache/nginx directory is going to be kept at around 1GB at most, feel free to adjust those values as you see fit. The proxy cache in this case will only cache server responses that do not contain any session data. At the time of writing, these are primarily webfinger and host-meta responses as well as individual statuses in ActivityPub format.
 
## Using a separate Redis for the Rails cache

Redis is used widely throughout the application, but some uses are more important than others. Home feeds, list feeds, and Sidekiq queues as well as the streaming API are backed by Redis and that's important data you wouldn't want to lose (even though the loss can be survived, unlike the loss of the PostgreSQL database - never lose that!). However, Redis is also used for volatile cache. If you are at a stage of scaling up where you are worried if your Redis can handle everything, you can use a different Redis database for the cache. In the environment, you can specify `CACHE_REDIS_URL` or individual parts like `CACHE_REDIS_HOST`, `CACHE_REDIS_PORT` etc. Unspecified parts fallback to the same values as without the cache prefix.

As far as configuring the Redis database goes, basically you can get rid of background saving to disk, since it doesn't matter if the data gets lost on restart and you can save some disk I/O on that. You can also add a maximum memory limit and a key eviction policy, for that, see this guide: [Using Redis as an LRU cache](https://redis.io/topics/lru-cache)

With Docker, here's how you would do it with `docker-compose`:

```yaml
  redis:
    image: redis:4.0-alpine
    restart: always
    networks:
      - internal_network
    volumes:
      - ./redis:/data

  redis_cache:
    image: redis:4.0-alpine
    restart: always
    networks:
      - internal_network
    command: redis-server --save ""
```

The first Redis is the one you're used to run, and the second one is for the Rails cache. As we don't want it to save to disk, we specify `redis-server --save ""`, and we don't create any volume.

Then your `.env.production` should look like this:

```
REDIS_HOST=redis
REDIS_PORT=6379
CACHE_REDIS_HOST=redis_cache
CACHE_REDIS_PORT=6379
```
