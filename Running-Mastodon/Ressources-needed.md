Running Mastodon requires some server ressources. If you're wondering how much, you've come to the right place.
Here are some information about what you'll need for running your instance, both with Docker and without.

### With Docker :

| CPU % / info | RAM use / total | Median traffic in | out | Users | OS | Sidekiq threads | puma params | Hosting provider | URL |
|-----|-----|-----------------------|-----|-------|----|-----------------|----------------|------------------|-----|

### Without Docker :

| CPU % / info | RAM  use / total | Median traffic in | out | Users | OS | Sidekiq params | puma params | Hosting provider | URL |
|-----|-----|-----------------------|-----|-------|----|-----------------|----------------|------------------|-----|
| 17.3% / 2x2.4Ghz | 1.8 GB / 4 GB | 260kbps | 858kbps | 785 | Debian | 30 threads | ? | [vultr](https://Vultr.com) | [social.wxcafe.net](https://social.wxcafe.net) |
| 30% / 4x3.40GHz | 1.8 to 2.2GB / 4GB | 90MB/s | 900MB/s | 1800 | Debian | 5 threads, DB_POOL=10 | MAX_THREADS=5, WEB_CONCURRENCY=4 | Online | [oc.todon.fr](oc.todon.fr) |
