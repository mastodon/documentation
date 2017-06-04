Running Mastodon requires some server resources. If you're wondering how much, you've come to the right place.
Here are some information about what you'll need for running your instance, both with Docker and without.

### With Docker :

| CPU % / info | RAM use / total | Median traffic in | out | Disk Usage | Users | OS | Sidekiq threads | puma params | Hosting provider | URL | Cost Estimate per month |
|-----|-----|-----------------------|-----|--------|-------|----|-----------------|----------------|------------------|-----|------|
| 25% / 2 CPUs 1.8GHz | 2.2 GB / 4 GB | | | | 2900 | Ubuntu 16.04 | 20 threads, DB_POOL=20 | WEB_CONCURRENCY=4, MAX_THREADS=8 | [Digital Ocean](https://www.digitalocean.com) | [mastodon.technology](https://mastodon.technology) | [$50–60](https://ashfurrow.com/blog/moving-mastodon-to-digital-ocean/) |

### Without Docker :

| CPU % / info | RAM  use / total | Median traffic in | out | Disk Usage | Users | OS | Sidekiq params | puma params | Server model / Provider | URL | Cost Estimate per month |
|-----|-----|-----------------------|-----|--------|-------|----|-----------------|----------------|------------------|-----|------|
| 17.3% / 2x2.4Ghz | 1.8 GB / 4 GB | 260kbps | 858kbps | 24 G | 785 | Debian | 35 threads, DB_POOL=35 | WEB_CONCURRENCY=5, MAX_THREADS=15 | [vultr](https://Vultr.com) | [social.wxcafe.net](https://social.wxcafe.net) | | 
| 20% / 4x3.40GHz | 4GB | 100Kbps | 1Mbps | 50 g | 1700 | Debian | 8 threads, DB_POOL=10 | MAX_THREADS=5, WEB_CONCURRENCY=4 | VM on [Dedibox LT 2014v2](https://documentation.online.net/fr/dedicated-server/offers/limited/server-dedibox-limited-edition-13816) | [oc.todon.fr](oc.todon.fr) | one quarter of a €30 server | 
