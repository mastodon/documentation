---
title: 洋葱服务
description: 通过 Tor 洋葱服务提供 Mastodon 服务。
menu:
  docs:
    weight: 20
    parent: admin-optional
---

Mastodon 可以通过 Tor 作为洋葱服务提供服务。这将为你提供一个 `*.onion` 地址，该地址只能在连接到 Tor 网络时使用。

## 安装 Tor {#install}

首先需要将 Tor 的 Debian 存储库添加到 apt 中。

```text
deb https://deb.torproject.org/torproject.org stretch main
deb-src https://deb.torproject.org/torproject.org stretch main
```

接下来添加 gpg 密钥。

```bash
curl https://deb.torproject.org/torproject.org/A3C4F0F979CAA22CDBA8F512EE8CBC9E886DDD89.asc | gpg --import
gpg --export A3C4F0F979CAA22CDBA8F512EE8CBC9E886DDD89 | apt-key add -
```

最后安装所需的软件包。

```bash
apt install tor deb.torproject.org-keyring
```

## 配置 Tor {#configure}

编辑 `/etc/tor/torrc` 文件并添加以下配置。

```text
HiddenServiceDir /var/lib/tor/onion_service/
HiddenServiceVersion 3
HiddenServicePort 80 127.0.0.1:80
```

重启 Tor。

```bash
sudo service tor restart
```

现在你可以在 `/var/lib/tor/hidden_service/hostname` 中找到你的 Tor 主机名。

## 移动你的 Mastodon 配置 {#nginx}

我们需要在 Nginx 中配置两次 Mastodon。为了保持["DRY"](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)原则，我们需要将 Mastodon 配置移到自己的文件中，以便之后可以引用。

创建一个新文件 `/etc/nginx/snippets/mastodon.conf`。复制所有 Mastodon 配置参数，除了 `listen`、`server_name`、`include` 指令以及所有 SSL 选项。包含一个 `Onion-Location` 头，让支持的浏览器知道该服务也可以通过 Tor 访问。你的新文件应该看起来像这样：

```nginx
add_header Referrer-Policy "same-origin";
add_header Onion-Location mastodon.qKnFwnNH2oH4QhQ7CoRf7HYj8wCwpDwsa8ohJmcPG9JodMZvVA6psKq7qKnFwnNH2oH4QhQ7CoRf7HYj8wCwpDwsa8ohJmcPG9JodMZvVA6psKq7.onion$request_uri;

keepalive_timeout    70;
sendfile             on;
client_max_body_size 80m;

root /home/mastodon/live/public;

# …

error_page 500 501 502 503 504 /500.html;

access_log /var/log/nginx/mastodon_access.log;
error_log /var/log/nginx/mastodon_error.log warn;
```

在新的配置文件中，在原来 Mastodon 配置的位置添加 `include` 指令。

你的 Nginx 配置文件现在应该看起来像这样：

```nginx
server {
  listen 80;
  server_name mastodon.example.com;
  return 301 https://$server_name$request_uri;
}

map $http_upgrade $connection_upgrade {
  default upgrade;
  ''      close;
}

server {
  listen 443 ssl http2;
  list [::]:443 ssl http2;
  server_name mastodon.example.com;
  include /etc/nginx/snippets/mastodon.conf;

  ssl_certificate /etc/letsencrypt/live/mastodon.example.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/mastodon.example.com/privkey.pem;
}
```

## 通过 HTTP 提供 Tor 服务 {#http}

本节假设你希望同时在 Tor 和公共互联网上公开你的实例。

虽然通过 HTTPS 提供 Mastodon 的 Tor 版本看起来很诱人，但这并不总是理想的选择。HTTPS 证书主要对能够使用自己的公司信息生成证书的大公司有用。没有证书颁发机构(CA)能[免费](https://community.torproject.org/onion-services/advanced/https/)提供它们，Tor 项目的[一篇博客文章](https://blog.torproject.org/facebook-hidden-services-and-https-certs)也解释了为什么 HTTPS 证书对安全性并没有真正的好处。但另一方面，Mastodon 使用了大量使用到 HTTPS 的重定向，有经过验证的证书可能会使你的用户更容易在 Tor 上使用你的实例，而无需手动删除 URL 中的 `https://` 前缀。

在本节中，我们将介绍如何通过 HTTP 提供 Mastodon 实例，但仅限于 Tor。这可以通过在现有 Nginx 配置前添加额外配置来实现。

```nginx
server {
  listen 80;
  server_name mastodon.qKnFwnNH2oH4QhQ7CoRf7HYj8wCwpDwsa8ohJmcPG9JodMZvVA6psKq7qKnFwnNH2oH4QhQ7CoRf7HYj8wCwpDwsa8ohJmcPG9JodMZvVA6psKq7.onion;
  include /etc/nginx/snippets/mastodon.conf;
}

server {
  listen 80;
  server_name mastodon.example.com;
  return 301 https://$server_name$request_uri;
}

map $http_upgrade $connection_upgrade {
  default upgrade;
  ''      close;
}

server {
  listen 443 ssl http2;
  list [::]:443 ssl http2;
  server_name mastodon.example.com;
  include /etc/nginx/snippets/mastodon.conf;

  ssl_certificate /etc/letsencrypt/live/mastodon.example.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/mastodon.example.com/privkey.pem;
}
```

用 `/var/lib/tor/hidden_service/hostname` 文件中的 Tor 域名替换这里提供的长哈希值。这也应该反映在 snippets 文件中的 `Onion-Location` 头中。

注意洋葱主机名前面加了 "mastodon."。你的 Tor 地址充当通配符域名。所有子域名都会被路由，你可以配置 Nginx 响应你想要的任何子域名。如果你不希望在 Tor 地址上托管任何其他服务，可以省略子域名，或选择不同的子域名。

现在你可以看到将 mastodon 配置移动到不同文件的好处。如果不这样做，所有配置都必须复制到两个地方。对配置的任何更改都必须在两个地方进行。

重启你的Web服务器。

```bash
service nginx restart
```

## 注意事项 {#gotchas}

你需要注意几点事项：

- 如前所述，Mastodon前端的某些URL会强制用户使用HTTPS URL。他们必须手动将URL替换为HTTP才能继续。
- 各种资源，如图像，仍将通过你常规的明网域名提供。这可能会成为问题，具体取决于你的用户希望、尝试或需要多高的隐私程度。

{{< translation-status-zh-cn raw_title="Onion services" raw_link="/admin/optional/tor/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}
