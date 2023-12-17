---
title: 从源中安装
description: 创建你自己的Mastodon站点的教学指献。
menu:
  docs:
    weight: 20
    parent: admin
---

## 前提条件 {#pre-requisites}

* 一台你有root访问权限的运行 **Ubuntu 18.04** 的机器
* 一个用于Mastodon站点的**域名**（或一个子域名），例如：`example.com`
* 一个电子邮件发送服务提供商，或其他**SMTP服务器**

你需要使用root用户运行命令。如果你现在不是root用户，请切换至root用户：

### 软件仓库 {#system-repositories}

首先确保已经安装curl：

#### Node.js {#node-js}

```bash
curl -sL https://deb.nodesource.com/setup_12.x | bash -
```

#### Yarn {#yarn}

```bash
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
```

### 软件包 {#system-packages}

```bash
apt update
apt install -y \
  imagemagick ffmpeg libpq-dev libxml2-dev libxslt1-dev file git-core \
  g++ libprotobuf-dev protobuf-compiler pkg-config nodejs gcc autoconf \
  bison build-essential libssl-dev libyaml-dev libreadline6-dev \
  zlib1g-dev libncurses5-dev libffi-dev libgdbm5 libgdbm-dev \
  nginx redis-server redis-tools postgresql postgresql-contrib \
  certbot python-certbot-nginx yarn libidn11-dev libicu-dev libjemalloc-dev
```

### 安装 Ruby {#installing-ruby}

因为使用 rbenv 可以更容易的获得正确的版本并在新版本发布后进行更新，我们将使用 rbenv 来管理Ruby版本。rbenv 必须安装在单个Linux用户中，因此，我们首先需要使用以下命令创建一个Mastodon用户：

```bash
adduser --disabled-login mastodon
```

切换到mastodon用户：

```bash
su - mastodon
```

执行以下步骤安装 rbenv 和 rbenv-build：

```bash
git clone https://github.com/rbenv/rbenv.git ~/.rbenv
cd ~/.rbenv && src/configure && make -C src
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(rbenv init -)"' >> ~/.bashrc
exec bash
git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build
```

上述操作完成，我们便可以安装正确的 Ruby 版本：

```bash
RUBY_CONFIGURE_OPTS=--with-jemalloc rbenv install 2.6.6
rbenv global 2.6.6
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
git checkout $(git tag -l | grep -v 'rc[0-9]*$' | sort -V | tail -n 1)
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

### 配置 nginx {#setting-up-nginx}

从Mastodon目录复制配置文件模版到nginx：

```bash
cp /home/mastodon/live/dist/nginx.conf /etc/nginx/sites-available/mastodon
ln -s /etc/nginx/sites-available/mastodon /etc/nginx/sites-enabled/mastodon
```

编辑 `/etc/nginx/sites-available/mastodon`

1. 替换 `example.com` 为你自己的域名
2. 启用 `ssl_certificate` 和 `ssl_certificate_key` 这两行，并把它们替换成如下两行（如果你使用自己的证书的话则可以忽略这一步）

```
ssl_certificate     /etc/ssl/certs/ssl-cert-snakeoil.pem;
ssl_certificate_key /etc/ssl/private/ssl-cert-snakeoil.key;
```

3. 你还可以根据自己的需求做出其它的一些调整。

重载 nginx 以使变更生效：

### 获取SSL证书 {#acquiring-a-ssl-certificate}

我们将使用 Let’s Encrypt 获取一个免费的SSL证书：

```bash
certbot --nginx -d example.com
```

这个命令将获取一个证书，自动更新 `/etc/nginx/sites-available/mastodon` 以使用新证书并重载nginx以使变更生效。

现在你应该能够通过浏览器访问你的域名，然后看到一只大象锤击电脑屏幕的错误页面。这是因为我们还没有启动Mastodon进程。

### 配置 systemd 服务 {#setting-up-systemd-services}

从Mastodon目录复制systemd服务模版：

```bash
cp /home/mastodon/live/dist/mastodon-*.service /etc/systemd/system/
```

然后修改以下文件，以保证用户名与路径是正确的：

* `/etc/systemd/system/mastodon-web.service`
* `/etc/systemd/system/mastodon-sidekiq.service`
* `/etc/systemd/system/mastodon-streaming.service`

最后，启动新systemd服务并将该服务设为开机自动激活：

```bash
systemctl daemon-reload
systemctl start mastodon-web mastodon-sidekiq mastodon-streaming
systemctl enable mastodon-*
```

他们将在开机启动时自动开始运行。

{{< hint style="success" >}}
**欢呼吧！你现在可以从浏览器中访问你的域名了！**
{{< /hint >}}

{{< translation-status-zh-cn raw_title="Installing from source" raw_link="/admin/install/" last_tranlation_time="2020-05-04" raw_commit="ad1ef20f171c9f61439f32168987b0b4f9abd74b">}}
