---
title: Running your own server
description:
menu:
  docs:
    weight: 9999
    parent: user
---

## Why would you want to run your own Mastodon server?

There are a number of benefits to running your own Mastodon instance, including:

- Complete control over your own voice on the web, not subject to anyone else's rules or whims. Your server is your property, with your rules. Your server will exist as long as you want it to exist.
- You are *not* isolated on your own server. You can follow anyone on any other server, and they can follow you and you can exchange messages just as if you were on the same server.
- You can either limit sign-ups to be the only one on the server and run it like personal (micro)blog; maintain an invite-only community for family or friends; or, run a server anyone can sign up on - it's up to you!

{{< hint style="warning" >}}
Please bear in mind that providing a public internet service involves moderation work and community management. This kind of work becomes more complicated the larger your server grows.
{{< /hint >}}

## So you want to run your own Mastodon server

Here is what you need:

- A **domain name**. This is how you and others will access your server and how you and your users will be identified on the network.

  **How to get**: Namecheap, Gandi, Hover, or one of the many existing domain name registrars. A domain comes with an annual cost, which varies depending on the choice of domain name.
- A **VPS** (Virtual Private Server). Something that will run the Mastodon code, which should always be connected to the internet.

  **How to get**: DigitalOcean, Hetzner, Exoscale, Scaleway, or one of the many existing hosting providers. A VPS comes with a monthly or annual cost that varies depending on hardware specifications.
- An **email provider**. Mastodon needs to send confirmation links and various notifications through email, and hosting your own SMTP server, while possible, is much more difficult to do reliably than to use a third-party provider.

  **How to get**: Mailgun, SparkPost, Postmark, Sendgrid, or any email hosting provider that exposes an SMTP API. An email provider comes with a monthly or annual cost, usually based on the volume of emails sent.
- An **Object Storage provider** (optional). Mastodon can save files that you and your users upload on the storage of the VPS it runs on; however, the storage is often limited in space, and it can be difficult to upgrade later. An object storage provider gives a way to store files separately from your VPS, which is useful if your VPS has a small storage limit.

  **How to get**: Amazon S3, Exoscale, Wasabi, Google Cloud, anything that exposes either an S3-compatible or OpenStack Swift-compatible API. An object storage provider comes with a monthly cost based on the number and size of files stored, as well as how often they are accessed.

There are a number of **dedicated Mastodon hosting providers** that take care of many (if not all) of the above requirements. You can choose one of these if you're interested in having someone else look after all of the technical stuff. Note that you usually still need to buy your own domain name. Some of the providers are:

{{< caption-link url="https://masto.host" caption="Masto.host" >}}

{{< caption-link url="https://hostdon.jp" caption="Hostdon" >}}

{{< caption-link url="https://app.spacebear.ee/mastodon" caption="Spacebear" >}}

{{< caption-link url="https://ossrox.org" caption="Ossrox" >}}

{{< caption-link url="https://weingaertner-it.de" caption="Weingärtner IT" >}}

{{< caption-link url="https://fedi.monster/" caption="Fedi.monster" >}}

{{< caption-link url="https://cloudplane.org" caption="Cloudplane" >}}

{{< caption-link url="https://ungleich.ch/u/products/mastodon-hosting/" caption="ungleich.ch" >}}

Managed hosting solutions are great for those who do not have experience or desire to install and maintain software. However, being in charge of all components on your own hardware gives greater control over scaling, performance and customization.

We provide a **DigitalOcean 1-Click Install Image** that will deploy Mastodon on a DigitalOcean Droplet of your choosing, which essentially gives you everything you would otherwise have after following our installation instructions through an interactive setup wizard.

{{< caption-link url="https://marketplace.digitalocean.com/apps/mastodon" caption="Mastodon 1-Click Install Image on DigitalOcean" >}}

The 1-Click Install will deploy as a single-machine setup that can be scaled by adding CPU, memory or disk capacity to your Droplet.

If the needs of your deployment outgrow those abilities, you can reconfigure to load balance across multiple app servers, use dedicated servers for background workers, or use external databases servers - but these options are outside of the scope of the initial 1-Click Install.

If you're interested in installing, configuring, and managing everything on your own, proceed here:

{{< page-ref page="admin/prerequisites" >}}
