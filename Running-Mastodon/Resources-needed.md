Resource usage examples
=======================

Here are examples of hardware setups of some Mastodon instances for your perusal.

> **Notes:**
>
> - 4x10 threads means 40 threads in total spread across 4 different processes
> - RPM stands for requests per minute
> - Users weekly means users who visit the site or use the API at least once per week
> - An up-to-date number of users cannot be guaranteed in this document
> - Listed setups may be underutilizing or overutilizing their hardware

|mastodon.social| |
|-------------------|-|
|Users total|150,000+|
|Users weekly|10,000+|
|Average RPM|11,000+|
|Approx. cost/mo|250€|
|Puma|4x10 threads|
|Sidekiq|4x50 threads|
|Streaming API|2x1 threads|
|Hosting|Hetzner|
|Special notes|4x servers, each with 8-core i7 CPUs, 32GB DDR3 RAM and SSD disks, arranged in a high-availability setup. Sidekiq on a separate machine. PostgreSQL on two separate machines (hot standby). Redis on two separate machines (one volatile for Rails cache).|

|asonix.dog| |
|-------------------|-|
|Users total|16|
|Users weekly|2|
|Average RPM|a few|
|Approx. cost/mo|electricity|
|Puma|1x8 threads|
|Sidekiq|4x4 threads|
|Streaming API|1x1 threads|
|Hosting|self|
|Special notes|Raspberry Pi 2 model B running Arch Linux Arm hosting mastodon-web, Pine64 running Armbian hosting mastodon-sidekiq and mastodon-streaming, Raspberry Pi 2 model B running postgres.  Raspberry Pi 1 B+ running Redis. All devices have 1GB RAM|

|mspsocial.net| |
|-------------------|-|
|Users total|79|
|Users weekly|10|
|Average RPM|20|
|Approx. cost/mo|$25|
|Puma|2x5|
|Sidekiq|1x5|
|Streaming API|1x1|
|Hosting|Digital Ocean|
|Special notes|Upgraded droplet from 2GB RAM/1vCPU to 4GB/2 vCPU to run elasticsearch. Total disk usage approx 15GB, increasing approx. 1 GB every 30 days.|
 
|masto.donte.com.br| |
|-------------------|-|
|Users total|480+|
|Users weekly|100+|
|Average RPM|150+|
|Approx. cost/mo|USD25 (server USD20 + automated backups USD5)|
|Puma|2x5 threads|
|Sidekiq|1x6 threads|
|Streaming API|1x1 threads|
|Hosting|Linode|
|Special notes|Running everything in one Linode 4096, used to run on a Linode 2048 before. Using ruby compiled with jmalloc, not using Docker. Database backup is at around 727MB compressed, production database around 6755MB (containing 5.4 million status, 39.5k accounts). |
