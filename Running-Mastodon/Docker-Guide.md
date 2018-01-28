## Docker

[![](https://images.microbadger.com/badges/version/gargron/mastodon.svg)](https://microbadger.com/images/gargron/mastodon "Get your own version badge on microbadger.com") [![](https://images.microbadger.com/badges/image/gargron/mastodon.svg)](https://microbadger.com/images/gargron/mastodon "Get your own image badge on microbadger.com")

The project now includes a `Dockerfile` and a `docker-compose.yml` file (which requires at least docker-compose version `1.10.0`).

## Prerequisites

- Working basic (Linux) server with Nginx (or Apache2; not officially supported).
- Recent stable version of [Docker](https://www.docker.com/community-edition).
- Recent stable version of [Docker-compose](https://github.com/docker/compose/releases/latest).

## Setting up

Clone Mastodon's repository.

    git clone https://github.com/tootsuite/mastodon
    cd mastodon

Review the settings in `docker-compose.yml`. Note that it is **not default** to store the postgresql database and redis databases in a persistent storage location. If you plan on running your instance in production, you **must** uncomment the [`volumes` directive](https://github.com/tootsuite/mastodon/blob/972f6bc861affd9bc40181492833108f905a04b6/docker-compose.yml#L7-L16) in `docker-compose.yml`.

Then, you need to fill in the `.env.production` file:

    cp .env.production.sample .env.production
    nano .env.production

Do NOT change the `REDIS_*` or `DB_*` settings when running with the default docker configurations.

You will need to fill in, at least: `LOCAL_DOMAIN`, `LOCAL_HTTPS`, and the `SMTP_*` settings.


## Building the app

If you want to build your own image, run the command below:

    docker-compose build

If you want to use prebuilt images on Docker Hub, just comment out all `build` keys in `docker-compose.yml` and continue.

Now the image can be used to generate secrets. Run the command below for each of `PAPERCLIP_SECRET`, `SECRET_KEY_BASE`, and `OTP_SECRET` then copy the results into the `.env.production` file:

    docker-compose run --rm web rake secret

To enable Web Push notifications, you should generate a private/public key pair and put them into your `.env.production` file. Run the command below to create `VAPID_PRIVATE_KEY` and `VAPID_PUBLIC_KEY` then copy the result into the `.env.production` file: 

    docker-compose run --rm web rake mastodon:webpush:generate_vapid_key

Then you should run the `db:migrate` command to create the database, or migrate it from an older release:

    docker-compose run --rm web rake db:migrate

Then, you will also need to precompile the assets:

    docker-compose run --rm web rake assets:precompile

before you can launch the docker image with:

    docker-compose up

If you wish to run this as a daemon process instead of monitoring it on console, use instead:

    docker-compose up -d

## Configuration

Then you may login to your new Mastodon instance by browsing to http://localhost:3000/

If you set `LOCAL_HTTPS` to true before, you have to prepare your TLS nginx first [production guide](Production-guide.md) because connecting to port 3000 redirects you to HTTPS. 

Following that, make sure that you read the [production guide](Production-guide.md). You are probably going to want to understand how
to configure Nginx to make your Mastodon instance available to the rest of the world.

The container has two volumes, for the assets and for user uploads, and optionally two more, for the postgresql and redis databases.

The default docker-compose.yml maps them to the repository's `public/assets` and `public/system` directories, you may wish to put them somewhere else. Likewise, the PostgreSQL and Redis images have data containers that you may wish to map somewhere where you know how to find them and back them up.

**Note**: The `--rm` option for docker-compose will remove the container that is created to run a one-off command after it completes. As data is stored in volumes it is not affected by that container clean-up.

## IPv6

IPv6 is a successor of IPv4, which is commonly used as the backend of the Internet. It is recommended to support federation over IPv6 if your network configuration supports IPv6. On the other hand, IPv4 is not going to be superceded in the near future and IPv6 support is still optional.

Some instances and clients try to connect via IPv6 first, and a misconfiguration of the IPv6 stack may lead to denial of service for them. You need to make sure your IPv6 configuration is not causing such a problem at least.

Unfortunately it is quite a difficult to set up proper IPv6 environment because Docker lacks some functionalities which are available for IPv4. You may just remove AAAA record (IPv6 address on DNS) if you abandon IPv6. See step 4 _Add AAAA record to DNS_.

This section describes steps to enable IPv6.

1. Identify your subnet

On the contrary to IPv4, one device often has a group of IPv6 addresses callded subnet. Identify your subnet with following command:

```
$ ip -6 route
2001:db8:1::/64 dev enp0s25 proto ra metric 100 pref medium
default via 2001:db8::1 dev enp0s25 proto ra metric 100 pref medium
```

`enp0s25` is your network device. `2001:db8::1` is the default gateway. `2001:db8:1::/64` is your subnet. It is written in CIDR notation, and means the range from `2001:db8:1::` to `2001:db8:1:0:ffff:ffff:ffff:ffff`. This range is important so you must understand the notation to continue.

2. Decide address allocation

We are not going to use all the subnet for Mastodon because other programs and Docker containers (most importantly, nginx) uses IPv6 address, too. You have to decide:

* the IP address of your server (which nginx will listen to) and
* the smaller subnet of Mastodon's Docker containers.

One docker container requires `/80` (`::` to `::ffff:ffff:ffff:ffff`, for example), and Mastodon has 5 containers. Therefore `/77` (`::` to `:8:ffff:ffff:ffff:ffff`, which can host 8 containers) is the minimum requirement.

Here, we allocate `2001:db:1::1` for the server, and `2001:db:1:0:100:/72` (`2001:db:1:0:100::` to `2001:db:1:0:1ff:ffff:ffff:ffff`) for Mastodon. Both of the address and the subnet is in `2001:db8:1::/64`. `/72` is recommended for ease calculation if your whole subnet is `/64`.

3. Stabilize your server's address

Your server can pick any address in the subnet. However, it may cause collisions with those of Docker containers. DNS also requires a stable address to make sure the connection between your server and clients persistent.

Use [tokenised IPv6 identifiers](https://tools.ietf.org/html/draft-chown-6man-tokenised-ipv6-identifiers-02) to fix your address. If you use interfaces(5) configuration file, which is the default of Debian stretch and Ubuntu xenial, add the following lines to `/etc/network/interfaces`:

```
iface enp0s25 inet6 auto
    pre-up ip token set ::1 dev $IFACE
```

`enp0s25` is your network device. If your file already has `iface enp0s25 inet6`
section, merge them into one.

Reboot, and now your server's address is fixed to `2001:db8:1::1`. Verify the
configuration by making a request to `http://[2001:db8:1::1]/`

```
curl http://[2001:db8:1::1]/
```

4. Add AAAA record to DNS

__You must have already completed the previous steps to do this step.__ If you failed the previous step, make sure AAAA record is not present and remove it in case it exists. Otherwise, remote servers and clients may try to use your misconfigured IPv6 stack and fail to connect with your server.

AAAA record tells your server's IPv6 address. You can add one which points to `2001:db8:1::1` since you confirmed your server is avaialble via the address in the previous step.

Once you finished your DNS configuration, use `dig` command to query the record and check it works.

```
$ dig example.com aaaa

; <<>> DiG 9.11.2-P1 <<>> example.com aaaa
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 20536
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 2, ADDITIONAL: 5

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 1280
;; QUESTION SECTION:
;example.com.			IN	AAAA

;; ANSWER SECTION:
example.com.		1943	IN	AAAA	2001:db8:1::1
```

Replace `example.com` with your domain. The colon-seperated string (`2001:db8:1::1` in this case) is the corresponding IPv6 address.

Now, remote servers and clients can access your server via IPv6.

5. Install ndppd

The IPv6 configuration is not finished yet even though remote computers can access your server via IPv6; your server cannot access remote servers via IPv6 yet. That is not good because the federation must be bi-directional.

You must allocate the smaller subnet you decided in step 2 for Mastodon. Setting up NDP is what you should do next. A remote computer will ask your server who is using the smaller subnet via NDP. Your server must correctly answer that Mastodon is.

ndppd is a software with such a feature and used for GNU/Linux. Debian stretch and Ubuntu xenial provides the software as package `ndppd`. Install it.

```
sudo apt install ndppd
```

6. Configure ndppd

Edit `/etc/ndppd.conf`. You can just have a look through the file and change
values properly for your configuration. It will look like this:

```
route-ttl 30000

proxy enp0s25 {
  router yes
  timeout 500
  ttl 30000

  rule 240d:1a:1d5:9a00:100::/72 {
    auto
  }
}
```

This tells to be a proxy of `enp0s25` to answer a qustion who is using an IPv6 address in `240d:1a:1d5:9a00:100::/72`. It uses `auto` method to decide the actual answer; it looks for a (virtual) network device which has the IPv6 address, and such a device should belong to the Docker container.

7. Start and enable ndppd

Start ndppd. It should have been installed as a systemd service if your system
uses systemd.

```
systemctl start ndppd
```

Enable ndppd and keep it persistent if it works.

```
systemctl enable ndppd
```

5. Create a Docker network

Create a Docker network with the subnet.

```
docker network create mastodon --ipv6 --subnet 240d:1a:1d5:9a00:100::/72 --ip-range 240d:1a:1d5:9a00:100::/72
```

This creates a network named `mastodon` with IPv6 enabled and subnet `240d:1a:1d5:9a00:100::/72`. `--ip-range` determines the range of the IP addresses used for the automatic allocation.

8. Create `docker-compose.network.yml`

```YAML
version: '3'
networks:
  external_network:
    external:
      name: mastodon
```

This specifies to use network `mastodon` for external access.

9. Add a line to `.env`

```
COMPOSE_FILE=docker-compose.yml:docker-compose.network.yml
```

This specifies to use `docker-compose.network.yml`, which you created in the
last step.

10. Test the connection

Here we use an old good `ping`.

```
$ docker-compose run --rm web ping 240d:1a:2::1
PING 240d:1a:2::(240d:1a:2::1) 56 data bytes
64 bytes from 240d:1a:2::1 icmp_seq=1 ttl=55 time=53.8 ms
```

The IP address `240d:1a:2::1` is just a placeholder. Replace it with IPv6
adddress of something on the Internet.

If you see the remote server responds via IPv6, congratulations! Your IPv6
configuration is done.

## Running tasks

Running any of these tasks via docker-compose would look like this:

    docker-compose run --rm web rake mastodon:media:clear

## Updating

This approach makes updating to the latest version a real breeze.

1. `git fetch` to download updates from the repository.
2. Now you need to tell git to use those updates. You have probably changed your `docker-compose.yml` file. Check with `git status`.
  - If the `docker-compose.yml` file is modified, run `git stash` to stash your changes.
3. `git checkout TAG_NAME` to use the tag code. (If you have committed changes, use `git merge TAG_NAME` instead, though this isn't likely.)
4. Only if you ran `git stash`, now run `git stash pop` to redo your changes to `docker-compose.yml`. Double check the contents of this file.
5. `docker-compose build` to compile the Docker image out of the changed source files.
6. (optional) `docker-compose run --rm web rake db:migrate` to perform database migrations. Does nothing if your database is up to date.
7. (optional) `docker-compose run --rm web rake assets:precompile` to compile new JS and CSS assets.
8. `docker-compose up -d` to re-create (restart) containers and pick up the changes.
