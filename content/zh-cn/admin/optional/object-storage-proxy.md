---
title: 通过 nginx 代理对象存储
description: 从自己的域名提供 Mastodon 中用户上传的文件
---

当使用 Amazon S3、Wasabi、Google Cloud 或其他对象存储提供商作为 Mastodon 的对象存储时，默认情况下，文件及其 URL 会通过存储提供商本身提供。这有以下缺点：

- 带宽通常是按量计费且非常昂贵
- 如果你决定稍后更换提供商，URL 将会失效

你可以选择从自己的域名提供文件，并在此过程中加入缓存机制。在 Mastodon 中，访问模式显示新文件经常被多个客户端同时访问，因为它们出现在通过流式 API 提供的新贴文中或通过联邦与州共享；相比之下，旧内容的访问频率较低。因此，仅依靠缓存并不能显著减少代理到实际对象存储的带宽使用。为了解决这个问题，我们可以实现一个缓存锁定机制，确保一次只进行一个代理请求。

以下是实现这一目标的nginx配置示例：

```nginx
server {
  listen 443 ssl http2;
  listen [::]:443 ssl http2;
  server_name files.example.com;
  root /var/www/html;

  ssl_certificate     /etc/ssl/certs/ssl-cert-snakeoil.pem;
  ssl_certificate_key /etc/ssl/private/ssl-cert-snakeoil.key;

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
    add_header X-Content-Type-Options nosniff;
    add_header Content-Security-Policy "default-src 'none'; form-action 'none'";
  }
}
```

{{< hint style="info" >}}
我们使用 `$s3_backend` 作为变量来强制 nginx 对其值执行 DNS 解析，因为对象存储提供商的 IP 地址可能不会始终保持不变。
{{</ hint >}}

上述配置实现了以下效果：

- 阻止针对对象存储提供商的除 GET 请求之外的请求
- 阻止任何经过身份验证的请求到达对象存储提供商
- 阻止对象存储提供商设置cookie
- 移除对象存储提供商返回的不必要的标头信息
- 缓存有效文件最多 48 小时
- 如果对象存储不可用，允许使用旧缓存
- 使用缓存锁防止同时向对象存储发出请求
- 使返回的所有文件可被浏览器缓存长达一年
- 添加 Mastodon 网页界面所需的 CORS 头信息
- 添加一个特殊的头信息，告诉用户请求是否命中缓存

确保替换以下内容：

- `files.example.com`
- `YOUR_BUCKET_NAME`
- `YOUR_S3_HOSTNAME`

使用你的实际值，将配置保存到 `/etc/nginx/sites-available/files.example.com`，然后通过以下命令启用它：

```bash
ln -s /etc/nginx/sites-available/files.example.com /etc/nginx/sites-enabled/
systemctl reload nginx
```

你还需要为其获取SSL证书：

```bash
certbot --nginx -d files.example.com
systemctl reload nginx
```

最后，你需要确保 Mastodon 使用你的新代理生成文件 URL。编辑 Mastodon 的 `.env.production` 添加：

```bash
S3_ALIAS_HOST=files.example.com
```

（可选）如果你的 S3_ALIAS_HOST 使用了 301 重定向或类似方式，请将最终跳转的目标地址添加到 EXTRA_MEDIA_HOSTS。

```bash
EXTRA_MEDIA_HOSTS=https://data.example1.com,https://data.example2.com
```

然后重启 Mastodon：

```bash
systemctl restart mastodon-sidekiq
systemctl reload mastodon-web
```

{{< hint style="success" >}}
**现在你可以在浏览器中访问你的 Mastodon 以确认一切正常加载**
{{< /hint >}}

{{< translation-status-zh-cn raw_title="Proxying object storage through nginx" raw_link="/admin/optional/object-storage-proxy/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
