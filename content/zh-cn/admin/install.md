---
title: 从源中安装
description: 创建你自己的 Mastodon 站点的教学指南。
menu:
  docs:
    weight: 20
    parent: admin
---

## 前提条件 {#pre-requisites}

* 一台你有 root 访问权限的运行 **Ubuntu 18.04** 或 **Debian 11** 的机器
* 一个用于 Mastodon 站点的 **域名**（或一个子域名），例如：`example.com`
* 一个电子邮件发送服务提供商，或其他 **SMTP 服务器**

你需要使用root用户运行命令。如果你现在不是root用户，请切换至root用户：

### 软件仓库 {#system-repositories}

首先确保已经安装 curl、wget、gnupg、apt-transport-https、lsb-release、ca-certificates：

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


### 系统软件包 {#system-packages}

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

我们将使用 rbenv 来管理 Ruby 版本，因为更容易获得正确的版本并在新版本发布后进行更新。rbenv 必须为单个 Linux 用户安装 因此，首先我们必须创建 Mastodon 运行的用户：

```bash
adduser --disabled-login mastodon
```

然后我们可以切换到用户：

```bash
su - mastodon
```

并继续安装 rbenv 和 rbenv-build：

```bash
git clone https://github.com/rbenv/rbenv.git ~/.rbenv
cd ~/.rbenv && src/configure && make -C src
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(rbenv init -)"' >> ~/.bashrc
exec bash
git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build
```

完成此操作后，我们可以安装正确的 Ruby 版本：

```bash
RUBY_CONFIGURE_OPTS=--with-jemalloc rbenv install 3.0.4
rbenv global 3.0.4
```

我们还需要安装 bundler：

```bash
gem install bundler --no-document
```

返回到 root 用户：

```bash
exit
```

## 安装 {#setup}

### 设置 PostgreSQL {#setting-up-postgresql}

#### 性能配置（可选） {#performance-configuration-optional}

为了获得最佳性能，可以使用 [pgTune](https://pgtune.leopard.in.ua/#/) 生成适当的配置，编辑 `/etc/postgresql/15/main/postgresql.conf` 然后执行 `systemctl restart postgresql` 重新启动 PostgreSQL。

#### 创建用户 {#creating-a-user}

你需要创建一个 Mastodon 可以使用的 PostgreSQL 用户。在简单的设置中使用“ident”身份验证是最容易的，即 PostgreSQL 用户没有单独的密码，可以由具有相同用户名的 Linux 用户使用。

打开提示符：

```bash
sudo -u postgres psql
```

在提示符中，执行：

```sql
CREATE USER mastodon CREATEDB;
\q
```

完成！

### 设置 Mastodon {#setting-up-mastodon}

是时候下载 Mastodon 代码了。切换到 astodon 用户：

```bash
su - mastodon
```

#### 签出代码 {#checking-out-the-code}

使用 Git 下载 Mastodon 的最新稳定版本：

```bash
git clone https://github.com/mastodon/mastodon.git live && cd live
git checkout $(git tag -l | grep -v 'rc[0-9]*$' | sort -V | tail -n 1)
```

#### 安装最后的依赖 {#installing-the-last-dependencies}

现在要安装 Ruby 和 JavaScript 依赖项：

```bash
bundle config deployment 'true'
bundle config without 'development test'
bundle install -j$(getconf _NPROCESSORS_ONLN)
yarn install --pure-lockfile
```

{{< hint style="info" >}}
这两个 `bundle config` 命令仅在首次安装依赖项时需要。如果以后要更新或重新安装依赖项，只需要 `bundle install` 就可以了。
{{< /hint >}}

#### 生成配置 {#generating-a-configuration}

运行交互式安装向导：

```bash
RAILS_ENV=production bundle exec rake mastodon:setup
```

这将：

* 创建配置文件
* 运行资产预编译
* 创建数据库架构

配置文件保存为 `.env.production`。你可以对自己的喜好进行查看和编辑。请参阅 [相关配置文档]({{< relref "config" >}})

你现在已经完成了 mastodon 用户，因此请切换回 root 用户：

```bash
exit
```

### 设置 nginx {#setting-up-nginx}

从 Mastodon 目录中复制 nginx 的配置模板：

```bash
cp /home/mastodon/live/dist/nginx.conf /etc/nginx/sites-available/mastodon
ln -s /etc/nginx/sites-available/mastodon /etc/nginx/sites-enabled/mastodon
```

然后编辑 `/etc/nginx/sites-available/mastodon` 文件，将 `example.com` 替换为自己的域名，并进行其他任何调整。

重新加载 nginx 以使更改生效：


```bash
systemctl reload nginx
```

### 获取 SSL 证书 {#acquiring-a-ssl-certificate}

我们将使用 Let's Encrypt 来获取免费的 SSL 证书：

```bash
certbot --nginx -d example.com
```

这将获得证书，自动更新 `/etc/nginx/stites-abailable/mastodon` 使用新证书，然后 执行 `systemctl reload nginx` 使更改生效。

此时，你应该能够在浏览器中访问你的域名，并看到大象点击计算机屏幕错误页面。这是因为我们还没有启动 Mastodon 进程。

### 设置 systemd 服务 {#setting-up-systemd-services}

从 Mastodon 目录中复制 systemd 服务模板：

```sh
cp /home/mastodon/live/dist/mastodon-*.service /etc/systemd/system/
```

如果您在任何时候偏离默认值，请检查用户名和路径是否正确：

```sh
$EDITOR /etc/systemd/system/mastodon-*.service
```

最后，启动并启用新的 systemd 服务：

```sh
systemctl daemon-reload
systemctl enable --now mastodon-web mastodon-sidekiq mastodon-streaming
```

它们现在将在开机时自动启动。

{{< hint style="success" >}}
**欢呼吧！你现在可以从浏览器中访问你的域名了！**
{{< /hint >}}

{{< translation-status-zh-cn raw_title="Installing from source" raw_link="/admin/install/" last_tranlation_time="2020-05-04" raw_commit="ad1ef20f171c9f61439f32168987b0b4f9abd74b">}}
