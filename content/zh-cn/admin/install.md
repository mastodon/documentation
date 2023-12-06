---
title: 从源代码中安装
description: 创建你自己的 Mastodon 站点的教学指献。
menu:
  docs:
    weight: 20
    parent: admin
---

## 前提条件 {#pre-requisites}

* 一台你有root访问权限的，运行 **Ubuntu 20.04** 或 **Debian 11** 的机器
* 一个用于Mastodon站点的**域名**（或一个子域名），例如：`example.com`
* 一个电子邮件发送服务提供商，或其他**SMTP服务器**

你需要使用root用户运行命令。如果你现在不是root用户，请切换至root用户：``sudo su - ``

### 软件仓库 {#system-repositories}

首先确保已经安装curl, wget, gnupg, apt-transport-https, lsb-release 和 ca-certificates

```
apt install -y curl wget gnupg apt-transport-https lsb-release ca-certificates
```

#### Node.js {#node-js}

```bash
curl -sL https://deb.nodesource.com/setup_16.x | bash -
```

#### PostgreSQL {#postgresql}

```bash
wget -O /usr/share/keyrings/postgresql.asc https://www.postgresql.org/media/keys/ACCC4CF8.asc
echo "deb [signed-by=/usr/share/keyrings/postgresql.asc] http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/postgresql.list
```

### 软件包 {#system-packages}

```bash
apt update
apt install -y \
  imagemagick ffmpeg libpq-dev libxml2-dev libxslt1-dev file git-core \
  g++ libprotobuf-dev protobuf-compiler pkg-config nodejs gcc autoconf \
  bison build-essential libssl-dev libyaml-dev libreadline6-dev \
  zlib1g-dev libncurses5-dev libffi-dev libgdbm-dev \
  nginx redis-server redis-tools postgresql postgresql-contrib \
  certbot python3-certbot-nginx libidn11-dev libicu-dev libjemalloc-dev
```

#### Yarn {#yarn}

```bash
corepack enable
yarn set version classic
```

### 安装 Ruby {#installing-ruby}

因为使用 rbenv 可以更容易的获得正确的版本并在新版本发布后进行更新，我们将使用 rbenv 来管理Ruby版本。rbenv 必须安装在单个Linux用户中，因此，我们首先需要使用以下命令创建一个Mastodon用户：

```bash
adduser --disabled-login mastodon
```

切换到 mastodon 用户：

```bash
su - mastodon
```

执行以下步骤安装 rbenv 和 rbenv-build：

```bash
git clone https://github.com/rbenv/rbenv.git ~/.rbenv
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(rbenv init -)"' >> ~/.bashrc
exec bash
git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build
```

上述操作完成，我们便可以安装正确的 Ruby 版本：

```bash
RUBY_CONFIGURE_OPTS=--with-jemalloc rbenv install 3.2.2
rbenv global 3.2.2
```

我们同样需要安装 bundler：

```bash
gem install bundler --no-document
```

返回root用户：

```bash
exit
```

## 配置 {#setup}

### 配置 PostgreSQL {#setting-up-postgresql}

#### 性能调优（可选） {#performance-configuration-optional}

为了优化性能，你可以使用 [pgTune](https://pgtune.leopard.in.ua/#/) 生成一个合适的配置文件。编辑 `/etc/postgresql/9.6/main/postgresql.conf` 中的相应数值并使用 `systemctl restart postgresql` 命令重启 PostgreSQL。

#### 创建帐户 {#creating-a-user}

你需创建一个供Mastodon使用的PostgreSQL帐户。创建一个使用“ident”认证方式的帐户是最容易的配置方法，即PostgreSQL帐户不需要独立的密码并由同名Linux用户使用。

打开控制台：

```bash
sudo -u postgres psql
```

在控制台中执行：

```sql
CREATE USER mastodon CREATEDB;
\q
```

完成！

### 配置 Mastodon {#setting-up-mastodon}

现在该下载Mastodon代码了。切换至mastodon用户：

```bash
su - mastodon
```

#### 检出代码 {#checking-out-the-code}

使用git下载最新稳定版Mastodon：

```bash
git clone https://github.com/mastodon/mastodon.git live && cd live
git checkout $(git tag -l | grep '^v[0-9.]*$' | sort -V | tail -n 1)
```

#### 安装依赖 {#installing-the-last-dependencies}

现在，安装Ruby和JavaScript依赖：

```bash
bundle config deployment 'true'
bundle config without 'development test'
bundle install -j$(getconf _NPROCESSORS_ONLN)
yarn install --pure-lockfile
```

{{< hint style="info" >}}
两个`bundle config`命令仅仅第一次安装依赖时需要。如果你之后进行升级或重安装依赖，只需要`bundle install`就够了。
{{< /hint >}}

#### 生成配置文件 {#generating-a-configuration}

运行交互式安装向导：

```bash
RAILS_ENV=production bundle exec rake mastodon:setup
```

它将：

* 创建一个配置文件
* 预编译静态文件
* 创建数据库schema

配置文件被保存在`.env.production`。如果你愿意的话，你可以查看并编辑这个文件。请参阅[配置文件的文档]({{< relref "config" >}})。

你已经完成需使用mastodon用户进行的操作，请切换回root用户：

```bash
exit
```

### Acquiring a SSL certificate {#acquiring-a-ssl-certificate}

使用 Let’s Encrypt 获取免费的 SSL 证书:

```bash
certbot certonly --nginx -d example.com
```

这将获取证书，并保存到  `/etc/letsencrypt/live/example.com/` 。

### 配置 nginx {#setting-up-nginx}

从Mastodon目录复制配置文件模版到nginx：

```bash
cp /home/mastodon/live/dist/nginx.conf /etc/nginx/sites-available/mastodon
ln -s /etc/nginx/sites-available/mastodon /etc/nginx/sites-enabled/mastodon
```

编辑 `/etc/nginx/sites-available/mastodon`，替换 `example.com` 为你自己的域名，你可以根据自己的需求做出其它的一些调整。

取消注释  `ssl_certificate` 和 `ssl_certificate_key` 开头的行 , 将路径改为对应的域名

重载 nginx 以使变更生效：

```bash
systemctl reload nginx
```

现在你应该能够通过浏览器访问你的域名，然后看到一只大象锤击电脑屏幕的错误页面。这是因为我们还没有启动Mastodon进程。

### 配置 systemd 服务 {#setting-up-systemd-services}

从Mastodon目录复制systemd服务模版：

```bash
cp /home/mastodon/live/dist/mastodon-*.service /etc/systemd/system/
```

如果在任何时候偏离了默认值，请检查用户名和路径是否正确：

```sh
$EDITOR /etc/systemd/system/mastodon-*.service
```

最后，启动并启用新的 systemd 服务:

```sh
systemctl daemon-reload
systemctl enable --now mastodon-web mastodon-sidekiq mastodon-streaming
```


他们将在开机启动时自动开始运行。

{{< hint style="success" >}}
**欢呼吧！你现在可以从浏览器中访问你的域名了！**
{{< /hint >}}

{{< translation-status-zh-cn raw_title="Installing from source" raw_link="/admin/install/" last_tranlation_time="2020-05-04" raw_commit="ad1ef20f171c9f61439f32168987b0b4f9abd74b">}}
