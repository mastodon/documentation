# Using Mastodon Behind A CDN
Mastodon behind a CDN such as Cloudflare or Akamai, allows you to save bandwidth on your host, by placing static assets closer to end users.  Other features include DDoS protection, dynamic routing, or SSL termination.

While there are benefits to such a setup, it can be very complex, and make issues difficult to troubleshoot.  You will definitely want to have a development/testing instance of Mastodon that is not behind the CDN, in order to test new code deployed to your system.

## Cloudflare
Cloudflare is a service that provides SSL termination, DNS hosting, and additional CDN services.  Only the DNS hosting and SSL termination is viable to use with Mastodon.

If you are wanting Cloudflare to terminate your SSL, you will need to open port 80 to the world, and ensure that the CDN option is always on for your domain record.  However, you will need to create page rules to turn off the other acceleration features.

In fact, all features, other than SSL termination must be off.  This will leave traffic between the Cloudflare POP and your endpoint unsecured, and potentially open to inspection/manipulation by a third party.

With paid Cloudflare accounts, you can do shared SSL, but this would leave data prone to being MITM'd by Cloudflare themselves.

## Other CDNs
Coming soon.
