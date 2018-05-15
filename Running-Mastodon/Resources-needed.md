Resource usage examples
=======================

Here are examples of hardware setups of some Mastodon instances for your perusal.

> **Notes:**
>
> - 4x10 threads means 40 threads in total spread across 4 different processes
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
