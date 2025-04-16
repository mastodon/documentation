---
title: 从源代码安装
description: 创建你自己的 Mastodon 站点的教程。
menu:
  docs:
    weight: 20
    parent: admin
---

## 前提条件 {#pre-requisites}

* 一台运行 **Ubuntu 24.04** 或 **Debian 12** 的机器，你需要拥有root访问权限
* 一个用于 Mastodon 站点的**域名**（或子域名），例如 `example.com`
* 一个电子邮件发送服务或其他 **SMTP 服务器**

在以下示例中，我们将使用 `example.com` 作为域名。请记得在运行任何命令前将其替换为你自己的域名。

你将以 root 身份运行命令。如果你还不是 root 用户，请切换到 root：`sudo -i`

### 系统存储库 {#system-repositories}

首先确保已安装 curl、 wget、 gnupg、 apt-transport-https、 lsb-release 和 ca-certificates：

```bash
apt install -y curl wget gnupg apt-transport-https lsb-release ca-certificates
```

#### Node.js {#node-js}

```bash
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_20.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list
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
  imagemagick ffmpeg libvips-tools libpq-dev libxml2-dev libxslt1-dev file git-core \
  g++ libprotobuf-dev protobuf-compiler pkg-config gcc autoconf \
  bison build-essential libssl-dev libyaml-dev libreadline6-dev \
  zlib1g-dev libncurses5-dev libffi-dev libgdbm-dev \
  nginx nodejs redis-server redis-tools postgresql postgresql-contrib \
  certbot python3-certbot-nginx libidn11-dev libicu-dev libjemalloc-dev
```

#### Yarn {#yarn}

启用`corepack`，以便自动安装正确版本的`yarn`：

```bash
corepack enable
```

### 创建 `mastodon` 用户 {#creating-the-mastodon-user}

执行以下命令，创建用于运行 Mastodon 的用户：

```bash
adduser --disabled-password mastodon
```

## 配置 {#setup}

### 配置 PostgreSQL {#setting-up-postgresql}

#### 性能配置（可选） {#performance-configuration-optional}

为获得最佳性能，你可以使用 [pgTune](https://pgtune.leopard.in.ua/#/) 生成适当的配置，并在使用 `systemctl restart postgresql` 重启 PostgreSQL 之前编辑 `/etc/postgresql/17/main/postgresql.conf` 中的值。

#### 创建用户 {#creating-a-user}

你需要创建一个供 Mastodon 使用的 PostgreSQL 用户。在简单配置中，最简单的方法是使用 "ident" 认证，即 PostgreSQL 用户没有单独的密码，可以由具有相同用户名的 Linux 用户使用。

打开命令行：

```bash
sudo -u postgres psql
```

在命令行中执行：

```sql
CREATE USER mastodon CREATEDB;
\q
```

完成！

### 设置 Mastodon {#setting-up-mastodon}

现在是下载 Mastodon 代码的时候了。切换到 mastodon 用户：

```bash
su - mastodon
```

#### 检出代码 {#checking-out-the-code}

使用 git 下载 Mastodon 的最新稳定版本：

```bash
git clone https://github.com/mastodon/mastodon.git live && cd live
git checkout $(git tag -l | grep '^v[0-9.]*$' | sort -V | tail -n 1)
```

#### 安装 Ruby {#installing-ruby}

我们将使用 rbenv 来管理 Ruby 版本，因为它简化了获取正确版本和在新版本可用时进行更新的过程。
安装 rbenv 和 ruby-build：

```bash
git clone https://github.com/rbenv/rbenv.git ~/.rbenv
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(rbenv init -)"' >> ~/.bashrc
exec bash
git clone https://github.com/rbenv/ruby-build.git "$(rbenv root)"/plugins/ruby-build
```

完成这些后，我们可以安装正确的Ruby版本：

```bash
RUBY_CONFIGURE_OPTS=--with-jemalloc rbenv install
```

#### 安装最后的依赖项 {#installing-the-last-dependencies}

现在安装 Ruby 和 JavaScript 依赖项：

```bash
bundle config deployment 'true'
bundle config without 'development test'
bundle install -j$(getconf _NPROCESSORS_ONLN)
yarn install
```

{{< hint style="info" >}}
仅在首次安装依赖项时需要执行两个 `bundle config` 命令。如果你之后要更新或重新安装依赖项，只需执行 `bundle install` 就足够了。
{{< /hint >}}

#### 生成配置 {#generating-a-configuration}

运行交互式设置向导：

```bash
RAILS_ENV=production bin/rails mastodon:setup
```

这将：

* 创建一个配置文件
* 运行资源预编译
* 创建数据库架构

配置文件保存为 `.env.production`。你可以查看并按照喜好编辑它。请参考[配置文档]({{< relref "config" >}})。

现在你已完成 mastodon 用户的操作，切回 root 用户：

```bash
exit
```

### 获取SSL证书 {#acquiring-a-ssl-certificate}

我们将使用 Let's Encrypt 获取免费的 SSL 证书：

```bash
certbot certonly --nginx -d example.com
```

这将获取证书并将其保存在 `/etc/letsencrypt/live/example.com/` 目录下。

### 设置nginx {#setting-up-nginx}

从 Mastodon 目录复制 nginx 的配置模板：

```bash
cp /home/mastodon/live/dist/nginx.conf /etc/nginx/sites-available/mastodon
ln -s /etc/nginx/sites-available/mastodon /etc/nginx/sites-enabled/mastodon
rm /etc/nginx/sites-enabled/default
```

然后编辑 `/etc/nginx/sites-available/mastodon` 以

1. 将 `example.com` 替换为你自己的域名
2. 取消注释 `ssl_certificate` 和 `ssl_certificate_key`（如果你使用自己的证书，请忽略此步骤）：

    ```
    ssl_certificate     /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;;
    ```

3. 进行你可能需要的任何其他调整。

允许其他用户遍历 mastodon 用户的主目录，以便 nginx 的 `www-data` 用户可以访问资源文件：

```bash
chmod o+x /home/mastodon
```

重启 nginx 使更改生效：

```bash
systemctl restart nginx
```

此时，你应该能够在浏览器中访问你的域名，看到大象撞击电脑屏幕的错误页面。这是因为我们还没有启动 Mastodon 进程。

### 设置 systemd 服务 {#setting-up-systemd-services}

从 Mastodon 目录复制 systemd 服务模板：

```sh
cp /home/mastodon/live/dist/mastodon-*.service /etc/systemd/system/
```

如果你修改了默认设置，请检查用户名和路径是否正确：

```sh
$EDITOR /etc/systemd/system/mastodon-*.service
```

最后，启动并启用新的 systemd 服务：

```sh
systemctl daemon-reload
systemctl enable --now mastodon-web mastodon-sidekiq mastodon-streaming
```

Mastodon 服务现在将在开机时自动启动。

{{< hint style="success" >}}
**太好了！以上就是安装 Mastodon 的全部步骤。现在你可以在浏览器中访问你的站点了！**
{{< /hint >}}

{{< translation-status-zh-cn raw_title="Installing from source" raw_link="/admin/install/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
