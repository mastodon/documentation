---
title: 匿名服务
description: 通过Tor的匿名服务来访问Mastodon。
menu:
  docs:
    weight: 20
    parent: admin-optional
---

可以通过Tor的匿名服务来访问Mastodon。这将给你一个只能通过 Tor 网络连接的 \*.onion 地址。

## 安装 Tor {#install}

首先，Tor的Debian软件仓库需要被添加至apt中。

```text
deb https://deb.torproject.org/torproject.org stretch main
deb-src https://deb.torproject.org/torproject.org stretch main
```

接下来，添加相应gpg密钥。

```bash
curl https://deb.torproject.org/torproject.org/A3C4F0F979CAA22CDBA8F512EE8CBC9E886DDD89.asc | gpg --import
gpg --export A3C4F0F979CAA22CDBA8F512EE8CBC9E886DDD89 | apt-key add -
```

最后，安装所需软件包。

```bash
apt install tor deb.torproject.org-keyring
```

## 配置 Tor {#configure}

编辑 `/etc/tor/torrc` 并添加如下设置。

```text
HiddenServiceDir /var/lib/tor/hidden_service/
HiddenServiceVersion 3
HiddenServicePort 80 127.0.0.1:80
```

重启 Tor。

```bash
sudo service tor restart
```

现在，你的Tor域名可以在 `/var/lib/tor/hidden_service/hostname` 找到。

## 移动你的Mastodon配置 {#nginx}

我们将需要将你的Mastodon配置告诉Nginx两次。为了不自我重复（[DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)），我们需要将Mastodon配置移动到一个可被引用的独立文件。

在 `/etc/nginx/snippets/mastodon.conf` 创建一个新文件。放入除`listen`、`server_name`、`include`及所有SSL相关选项之外的所有配置参数至新文件中。你的新文件看起来可能像这样。

```text
add_header Referrer-Policy "same-origin";

keepalive_timeout    70;
sendfile             on;
client_max_body_size 80m;

root /home/mastodon/live/public;
…
error_page 500 501 502 503 504 /500.html;

access_log /var/log/nginx/mastodon_access.log;
error_log /var/log/nginx/mastodon_error.log warn;
```

替换你的旧Mastodon配置文件，在新配置文件中添加一个include指令。

你的Nginx配置文件将看起来像这样。

```text
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

## 通过http提供Tor服务 {#http}

尽管通过https提供你的Tor版Mastodon可能很诱人，但对大多数人来说这不是一个好主意。请参阅Tor Project上的[这篇](https://blog.torproject.org/facebook-hidden-services-and-https-certs)博文，了解为什么https证书无法增加价值。由于你无法获得onion域名的SSL证书，当你尝试使用你的Mastodon时还会被证书错误所困扰。最近，一位Tor开发者在[这里](https://matt.traudt.xyz/p/o44SnkW2.html)阐述了为什么通过https提供Tor服务对大多数用例都没有好处的原因。

解决方法是通过http提供你的Mastodon服务，但仅供Tor使用。这可以通过在Nginx配置文件中添加额外的设置来完成。

```text
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

用你位于 `/var/lib/tor/hidden_service/hostname` 文件中的长hash替换上文中提供的。

请注意，onion域名已经被附加了“mastodon.”前缀。你的Tor地址充当通配符域名。所有的子域名都将被路由，你可以配置你的Nginx来响应你想要的任何子域名。如果你不想在你的tor域名上托管任何其他服务，你可以省略子域名，或者选择一个不同的子域名。

这里，你就可以看出移动你的mastodon配置到不同文件的好处了。如果不移动的话，你的所有配置都必须粘贴至两个地方，任何对你配置的改动你都必须同时修改两个地方。

重启你的Web服务器。

```bash
service nginx restart
```

## 陷阱 {#gotchas}

你需要注意一些事情。某些重定向会将你的用户跳转至https。他们必须手动把URL替换成http才能继续。

许多的资源，诸如图片，将仍然从常规非Tor域名加载。问题的严重性很大程度上取决于用户的谨慎程度。

{{< translation-status-zh-cn raw_title="Hidden services" raw_link="/admin/optional/tor/" last_tranlation_time="2020-05-04" raw_commit="ad1ef20f171c9f61439f32168987b0b4f9abd74b">}}
