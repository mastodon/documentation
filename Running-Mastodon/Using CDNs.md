#Using Mastodon Behind A CDN
Mastodon behind a CDN such as Cloudflare or Akamai, allows you to save bandwidth on your host, by offloading processing elsewhere.  Other benefits with many CDNs are also available, such as dynamic routing, or SSL termination.

While there are benefits to such a setup, it can be very complex, and make issues difficult to troubleshoot.  You will definitley want to have a development/testing instance of Mastodon that is not behind the CDN, in order to test new code deployed to your system.

##Cloudflare
Cloudflare is a service that provides SSL termination, DNS hosting, and additional CDN services.  Only the DNS hosting and SSL termination is viable to use with Mastodon.

If you are wanting Cloudflare to terminate your SSL, you will need to open port 80 to the world, and ensure that the CDN option is always on for your domain record.  However, you will need to create page rules to turn off the other acceleration features.

In fact, all features, other than SSL termination must be off.

##Other CDNs
Coming soon.
