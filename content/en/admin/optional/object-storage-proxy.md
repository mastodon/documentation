---
title: Proxying object storage through nginx
description: Serving user-uploaded files in Mastodon from your own domain
---

When you are using Mastodon with an object storage provider like Amazon S3, Wasabi, Google Cloud or other, by default the URLs of the files go through the storage providers themselves. This has the following downsides:

- Bandwidth is usually metered and very expensive
- URLs will be broken if you decide to switch providers later

You can instead serve the files from your own domain, caching them in the process. Access patterns on Mastodon are such that **new files are usually accessed simultaneously by a lot of clients** as new posts stream in through the streaming API or as they get distributed through federation; older content is accessed comparatively rarely. For that reason, caching alone would not reduce bandwidth consumed by your proxy from the actual object storage. To mitigate this, we can use a **cache lock** mechanism that ensures that only one proxy request is made at the same time.

Here is an example nginx configuration that accomplishes this:

```nginx
server {
  listen 443 ssl http2;
  listen [::]:443 ssl http2;
  server_name files.example.com;
  root /var/www/html;

  keepalive_timeout 30;

  location = / {
    index index.html;
  }

  location / {
    try_files $uri @s3;
  }

  set $s3_backend 'https://YOUR_BUCKET_NAME.YOUR_S3_HOSTNAME';

  location @s3 {
    limit_except GET {
      deny all;
    }

    resolver 8.8.8.8;
    proxy_set_header Host YOUR_BUCKET_NAME.YOUR_S3_HOSTNAME;
    proxy_set_header Connection '';
    proxy_set_header Authorization '';
    proxy_hide_header Set-Cookie;
    proxy_hide_header 'Access-Control-Allow-Origin';
    proxy_hide_header 'Access-Control-Allow-Methods';
    proxy_hide_header 'Access-Control-Allow-Headers';
    proxy_hide_header x-amz-id-2;
    proxy_hide_header x-amz-request-id;
    proxy_hide_header x-amz-meta-server-side-encryption;
    proxy_hide_header x-amz-server-side-encryption;
    proxy_hide_header x-amz-bucket-region;
    proxy_hide_header x-amzn-requestid;
    proxy_ignore_headers Set-Cookie;
    proxy_pass $s3_backend$uri;
    proxy_intercept_errors off;

    proxy_cache CACHE;
    proxy_cache_valid 200 48h;
    proxy_cache_use_stale error timeout updating http_500 http_502 http_503 http_504;
    proxy_cache_lock on;

    expires 1y;
    add_header Cache-Control public;
    add_header 'Access-Control-Allow-Origin' '*';
    add_header X-Cache-Status $upstream_cache_status;
  }
}
```

{{< hint style="info" >}}
We are using `$s3_backend` as a variable to force nginx to perform a DNS resolution on its value, as the IP of the object storage provider may not always remain the same.
{{</ hint >}}

This configuration does a few different things:

- Blocks all but GET requests to the object storage provider
- Prevents any authenticated requests to the object storage provider
- Prevents the object storage provider from setting cookies
- Removes unnecessary headers returned by the object storage provider
- Caches valid files for at most 48 hours
- Allows older cache to be used if the object storage is unavailable
- Uses a cache lock to prevent simultaneous requests to the object storage
- Makes all returned files cacheable by browsers for up to a year
- Adds CORS headers necessary for Mastodon's web UI
- Adds a special header that tells you if your request was a cache hit or miss

Make sure to replace:

- `files.example.com`
- `YOUR_BUCKET_NAME`
- `YOUR_S3_HOSTNAME`

With your actual values. Save your configuration to `/etc/nginx/sites-available/files.example.com` and then enable it with:

```bash
ln -s /etc/nginx/sites-available/files.example.com /etc/nginx/sites-enabled/
systemctl reload nginx
```

You'll also want to get a SSL certificate for it:

```bash
certbot --nginx -d files.example.com
systemctl reload nginx
```

At last, you'll want to make sure Mastodon is using your new proxy to generate file URLs. Edit your Mastodon's `.env.production` to add:

```bash
S3_ALIAS_HOST=files.example.com
```

And restart Mastodon:

```bash
systemctl restart mastodon-sidekiq
systemctl reload mastodon-web
```

{{< hint style="success" >}}
**You can now visit your Mastodon in the browser to confirm everything loads correctly**
{{< /hint >}}

