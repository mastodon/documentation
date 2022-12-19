---
title: Running your own server
summary: Build a home for yourself that you manage for yourself
weight: 9999
menu:
  docs:
    parent: user
---

## Why would you want to run your own Mastodon server?

- Absolute control over your own voice on the web, not subject to anyone else's rules or whims. Your server is your property, with your rules. It will exist as long as you want it to exist.
- You are *not* isolated on your own server. You can follow anyone on any other server, and they can follow you and you can exchange messages just like if you were on the same server.
- You can either limit sign-ups to be the only one on the server and run it like personal (micro)blog, maintain an invite-only community for family or friends or run a server anyone can sign up on, it's up to you!

{{< hint style="warning" >}}
Please mind that providing a public internet service involves moderation work and community management, and that such work becomes more complicated the larger your server grows.
{{< /hint >}}

## So you want to run your own Mastodon server

Here is what you need:

- A **domain name**. This is how you and others will access your server and how you and your users will be identified on the network.

  **How to get**: Namecheap, Gandi, any of the infinite number of domain name registrars. Comes with a yearly cost that varies depending on domain name choice.
- A **VPS**. Something that will run the Mastodon code that will always be connected to the internet.

  **How to get**: DigitalOcean, Hetzner, Exoscale, Scaleway, any of the infinite number of hosting providers. Comes with a monthly or yearly cost that varies depending on hardware specifications.
- An **e-mail provider**. Mastodon needs to send confirmation links and various notifications through e-mail, and hosting your own SMTP server, while possible, is much more difficult to do reliably than to use a third-party provider.

  **How to get**: Mailgun, SparkPost, Postmark, Sendgrid, any of the infinite number of e-mail hosting providers that expose a SMTP API. Comes with a monthly cost based on volume of e-mails sent.
- Optional: **Object storage provider**. Mastodon can save files that you and your users upload on the hard disk drive of the VPS it runs on, however, the hard disk drive is usually not infinite and difficult to upgrade later. An object storage provider gives you practically infinite metered file storage.

  **How to get**: Amazon S3, Exoscale, Wasabi, Google Cloud, anything that exposes either an S3-compatible or OpenStack Swift-compatible API. Comes with a monthly cost based on the amount of files stored as well as how often they are accessed.

There exist a number of **dedicated Mastodon hosting providers** that take care of many if not all of the above requirements, that you can choose if you're interested in someone else taking care of all the technical stuff. Usually you still need to buy your own domain name though. Some of such providers are:

{{< caption-link url="https://masto.host" caption="Masto.host" >}}

{{< caption-link url="https://hostdon.jp" caption="Hostdon" >}}

{{< caption-link url="https://app.spacebear.ee/mastodon" caption="Spacebear" >}}

{{< caption-link url="https://ossrox.org" caption="Ossrox" >}}

{{< caption-link url="https://weingaertner-it.de" caption="Weingärtner IT" >}}

{{< caption-link url="https://fedi.monster/" caption="Fedi.monster" >}}

{{< caption-link url="https://cloudplane.org" caption="Cloudplane" >}}

{{< caption-link url="https://ungleich.ch/u/products/mastodon-hosting/" caption="ungleich.ch" >}}

Managed hosting solutions are great for those who do not have experience or desire to install and maintain software. However, being in charge of all components on your own hardware gives greater control over scaling, performance and customization.

We provide a **DigitalOcean 1-Click Install Image** that you can put on a DigitalOcean droplet of your choosing which essentially gives you everything you would otherwise have after following our installation instructions through an interactive setup wizard.

{{< caption-link url="https://marketplace.digitalocean.com/apps/mastodon" caption="Mastodon 1-Click Install Image on DigitalOcean" >}}

That however does assume a single-machine setup. Mastodon scales quite well horizontally. If your needs outgrow the capacity of a single machine, Mastodon can be divided into multiple app servers, background workers, multiple Redis backends, PostgreSQL replicas -- but 1-click install won't cut it.

If you're interested in installing everything on your own, proceed here:

{{< page-ref page="admin/prerequisites" >}}
