Running Mastodon requires some server resources. If you're wondering how much, you've come to the right place.
Here are some information about what you'll need for running your instance, both with Docker and without.

### With Docker :

| CPU % / info | RAM use / total | Median traffic in | out | Users | OS | Sidekiq threads | puma params | Hosting provider | URL |
|-----|-----|-----------------------|-----|-------|----|-----------------|----------------|------------------|-----|

### Without Docker :

| CPU % / info | RAM  use / total | Median traffic in | out | Users | OS | Sidekiq params | puma params | Server model / Provider | URL |
|-----|-----|-----------------------|-----|-------|----|-----------------|----------------|------------------|-----|
| 17.3% / 2x2.4Ghz | 1.8 GB / 4 GB | 260kbps | 858kbps | 785 | Debian | 30 threads | ? | [vultr](https://Vultr.com) | [social.wxcafe.net](https://social.wxcafe.net) |
| 30% / 4x3.40GHz | 1.8 to 2.2GB / 4GB | 100Kbps | 1Mbps | 1800 | Debian | 5 threads, DB_POOL=10 | MAX_THREADS=5, WEB_CONCURRENCY=4 | [Dedibox LT 2014v2](https://documentation.online.net/fr/dedicated-server/offers/limited/server-dedibox-limited-edition-13816) | [oc.todon.fr](oc.todon.fr) |
