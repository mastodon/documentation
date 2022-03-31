---
title: 从源中安装
description: 创建你自己的Mastodon站点的教学指献。
menu:
  docs:
    weight: 20
    parent: admin
---

## 前提条件 {#pre-requisites}

* 一台你有 root 访问权限的运行 **Ubuntu 20.04** 或者 **Debian 11** 的机器
* 一个用于 Mastodon 站点的**域名**（或一个子域名），例如：`example.com`
* 一个电子邮件发送服务提供商，或其他** SMTP 服务器**

你需要使用 root 用户运行命令。如果你现在不是 root 用户，请切换至 root 用户：

### 软件仓库 {#system-repositories}

首先确保已经安装 curl, wget, gnupg, apt-transport-https, lsb-release 和 ca-certificates 包：

```bash
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
yarn set version stable
```

### 安装 Ruby {#installing-ruby}

因为使用 rbenv 可以更容易的获得正确的版本并在新版本发布后进行更新，我们将使用 rbenv 来管理 Ruby 版本。 rbenv 必须安装在单个 Linux 用户中，因此，我们首先需要使用以下命令创建一个 Mastodon 用户：

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
cd ~/.rbenv && src/configure && make -C src
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(rbenv init -)"' >> ~/.bashrc
exec bash
git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build
```

上述操作完成，我们便可以安装正确的 Ruby 版本：

```bash
RUBY_CONFIGURE_OPTS=--with-jemalloc rbenv install 3.0.3
rbenv global 3.0.3
```

我们同样需要安装 bundler：

```bash
gem install bundler --no-document
```

返回 root 用户：

```bash
exit
```

## 配置 {#setup}

### 配置 PostgreSQL {#setting-up-postgresql}

#### 性能调优（可选） {#performance-configuration-optional}

为了优化性能，你可以使用 [pgTune](https://pgtune.leopard.in.ua/#/) 生成一个合适的配置文件。编辑 `/etc/postgresql/14/main/postgresql.conf` 中的相应数值并使用 `systemctl restart postgresql` 命令重启 PostgreSQL。

#### 创建帐户 {#creating-a-user}

你需创建一个供 Mastodon 使用的 PostgreSQL 帐户。创建一个使用 「ident」 认证方式的帐户是最容易的配置方法，即 PostgreSQL 帐户不需要独立的密码并由同名 Linux 用户使用。

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

现在该下载 Mastodon 代码了。切换至 mastodon 用户：

```bash
su - mastodon
```

#### 检出代码 {#checking-out-the-code}

使用 git 下载最新稳定版 Mastodon：

```bash
git clone https://github.com/tootsuite/mastodon.git live && cd live
git checkout $(git tag -l | grep -v 'rc[0-9]*$' | sort -V | tail -n 1)
```

#### 安装依赖 {#installing-the-last-dependencies}

现在，安装 Ruby 和 JavaScript 依赖：

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

配置文件被保存在 `.env.production`。如果你愿意的话，你可以查看并编辑这个文件。请参阅[配置文件的文档]({{< relref "config.md" >}})。

你已经完成需使用 mastodon 用户进行的操作，请切换回 root 用户：

```bash
exit
```

### 配置 nginx {#setting-up-nginx}

从M astodon 目录复制配置文件模版到 nginx：

```bash
cp /home/mastodon/live/dist/nginx.conf /etc/nginx/sites-available/mastodon
ln -s /etc/nginx/sites-available/mastodon /etc/nginx/sites-enabled/mastodon
```

编辑 `/etc/nginx/sites-available/mastodon`，替换 `example.com` 为你自己的域名，你可以根据自己的需求做出其它的一些调整。

重载 nginx 以使变更生效：

### 获取SSL证书 {#acquiring-a-ssl-certificate}

我们将使用 Let’s Encrypt 获取一个免费的SSL证书：

```bash
certbot --nginx -d example.com
```

这个命令将获取一个证书，自动更新 `/etc/nginx/sites-available/mastodon` 以使用新证书并重载 nginx 以使变更生效。

现在你应该能够通过浏览器访问你的域名，然后看到一只大象锤击电脑屏幕的错误页面。这是因为我们还没有启动 Mastodon 进程。

### 配置 systemd 服务 {#setting-up-systemd-services}

从 Mastodon 目录复制 systemd 服务模版：

```bash
cp /home/mastodon/live/dist/mastodon-*.service /etc/systemd/system/
```

然后修改以下文件，以保证用户名与路径是正确的：

* `/etc/systemd/system/mastodon-web.service`
* `/etc/systemd/system/mastodon-sidekiq.service`
* `/etc/systemd/system/mastodon-streaming.service`

最后，启动新 systemd 服务并将该服务设为开机自动激活：

```bash
systemctl daemon-reload
systemctl start mastodon-web mastodon-sidekiq mastodon-streaming
systemctl enable mastodon-*
```

他们将在开机启动时自动开始运行。

{{< hint style="success" >}}
**欢呼吧！你现在可以从浏览器中访问你的域名了！**
{{< /hint >}}

{{< translation-status-zh-cn raw_title="Installing from source" raw_link="/admin/install/" last_tranlation_time="2022-03-31" raw_commit="98d85c9f48477958f946eea8c1e7e770bfd4596f">}}
