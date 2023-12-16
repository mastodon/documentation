---
title: 伸缩你的服务器
descriptions: 为服务更多用户而优化。
menu:
  docs:
    weight: 100
    parent: admin
---

## 并发管理 {#concurrency}

Mastodon有三种进程：

* Web (Puma)
* Streaming API
* 后台进程 (Sidekiq)

### Web (Puma) {#web}

web进程处理绝大多数应用的短HTTP请求。以下环境变量可以控制它：

* `WEB_CONCURRENCY` 控制worker进程数
* `MAX_THREADS` 控制每进程的线程数

线程共享其父进程的内存。不同的线程被分配了专有内存，虽然他们通过copy-on-write共享了一些内存。数量较多的线程会先消耗掉你的CPU，数量较多的进程会先消耗掉你的内存。

这些数值会影响到可以同时处理多少HTTP请求。

在吞吐量方面，多进程比多线程要好。

### Streaming API {#streaming}

streaming API处理长HTTP连接与WebSockets连接，通过这些连接用户可以接受到实时更新。以下环境变量可以控制它：

* `STREAMING_CLUSTER_NUM` 控制worker进程数
* `STREAMING_API_BASE_URL` 控制streaming API的base URL

一个进程可以处理相当数量的连接。 如果您愿意，streaming API可以托管在其他子域上，例如：避免nginx代理连接开销。

### 后台进程 (Sidekiq) {#sidekiq}

Mastodon许多任务都分配给后台进程，以确保HTTP请求快速响应，并防止HTTP请求中止影响到这些任务的执行。Sidekiq是单个进程，具有可配置的线程数。

#### 线程数 {#sidekiq-threads}

虽然web进程数与web线程数影响Mastodon实例响应终端用户，分配给后台进程的线程数影响嘟文从作者分发至其他人的速度，电子邮件花多长时间发完等等。

Sidekiq的线程数并不受环境变量控制，但是可通过命令行参数控制，例如：

```bash
bundle exec sidekiq -c 15
```

将启一个15线程的sidekiq进程。请注意每个线程都需要能够连接数据库，这意味着数据库连接池应足够大以满足所有进程。数据库连接池的大小由`DB_POOL`环境变量控制，该变量必须至少与进程数同样大。

#### 队列 {#sidekiq-queues}

Sidekiq根据任务的重要性使用不同队列，这里的重要性是指如果队列不工作，其对本地用户体验的冲击有多大。按重要性降序排列：

| 队列 | 重要性 |
| :--- | :--- |
| `default` | 影响本地用户的所有任务 |
| `push` | 推送消息至其它服务器 |
| `mailers` | 分发电子邮件 |
| `pull` | 从其它服务器拉取信息 |
| `scheduler` | 完成计划任务，例如更新当下流行标签及清理日志 |

默认队列及其优先级存储于`config/sidekiq.yml`，但可通过调用Sidekiq命令行覆盖，例如：

```bash
bundle exec sidekiq -q default
```

仅运行`default`队列。

Sidekiq处理队列的方式是，它首先检查第一个队列中的任务，如果没有，则检查下一个队列。这意味着，如果第一个队列已满，其他队列将延后。

作为一种解决方案，可以启动为不同队列启动不同的Sidekiq进程以确保真正的并列执行，例如：使用不同Sidekiq参数创建多个systemd服务。

**请确保仅有一个`scheduler`队列！！**


## 使用pgBouncer事务池 {#pgbouncer}

### 你为什么要用PgBouncer {#pgbouncer-why}

如果开始耗尽可用的Postgres连接（默认为100），那PgBouncer可能是一个好方案。本文档将介绍Mastodon的一些常见陷阱及好的默认配置。

请注意，你可以在管理界面的“PgHero”查看当前使用了多少Postgres连接。通常Mastodon使用Puma、Sidekiq、streaming API三者线程数总和的连接数。

### 安装PgBouncer {#pgbouncer-install}

在Debian和Ubuntu：

```bash
sudo apt install pgbouncer
```

### 配置PgBouncer {#pgbouncer-config}

#### 设置密码 {#pgbouncer-password}

首先，如果你的Postgres中`mastodon`帐户没有设置密码的话，你需要设置一个密码。
First off, if your `mastodon` user in PostgreSQL is set up without a password, you will need to set a password.

下面是如何重置密码：

```bash
psql -p 5432 -U mastodon mastodon_production -w
```

之后（很显然，使用一个与单词“password”不同的密码）：

```sql
ALTER USER mastodon WITH PASSWORD 'password';
```

然后输入 `\q` 退出。

#### 配置userlist.txt {#pgbouncer-userlist}

编辑 `/etc/pgbouncer/userlist.txt`

只要稍后你在 pgbouncer.ini 中指定一个用户名/密码，userlist.txt文件中的值*不必*与真实PostgreSQL用户相同。你可以随意设定用户名和密码，但是为方便起来，你可以重用“真实”的凭证。添加`mastodon`帐户至`userlist.txt`：

```text
"mastodon" "md5d75bb2be2d7086c6148944261a00f605"
```

这里，我们使用md5格式，这里的md5密码就是字符串`密码 + 用户名`的md5值附加上`md5`。例如：为了获得用户名为`mastodon`密码为`password`的散列值，你可以这样做：

```bash
# ubuntu, debian, etc.
echo -n "passwordmastodon" | md5sum
# macOS, openBSD, etc.
md5 -s "passwordmastodon"
```

然后将`md5`添加至开头。

你也可以创建一个`pgbouncer`管理帐户，以登入查看PgBouncer管理数据库。下面是一个`userlist.txt`文件的例子：

```text
"mastodon" "md5d75bb2be2d7086c6148944261a00f605"
"pgbouncer" "md5a45753afaca0db833a6f7c7b2864b9d9"
```

以上两个帐户密码者是`password`。

#### 配置 pgbouncer.ini {#pgbouncer-ini}

编辑 `/etc/pgbouncer/pgbouncer.ini`

在`[databases]`行下，列出你想连接的Postgres数据库。这里PgBouncer将使用同样的用户名/密码和数据库名称连接下层Postgres数据库：

```text
[databases]
mastodon_production = host=127.0.0.1 port=5432 dbname=mastodon_production user=mastodon password=password
```

`listen_addr` 和 `listen_port` 告诉 PgBouncer 从哪个地址/端口接收连接。默认值即可：

```text
listen_addr = 127.0.0.1
listen_port = 6432
```

将`auth_type`设为`md5`（假定你在`userlist.txt`使用md5格式）：

确保`pgbouncer`帐户为管理员：

**接下来的部分极其重要！** 默认连接池模式是基于连接（session-based），但是Mastodon需要基于事务（transaction-based）。换而言之，当一个事务创建一个Postgres连接随之创建，当事务完成该连接也随之结束。因此，你需要把`pool_mode`从`session`改为`transaction`：

接下来，`max_client_conn`定义PgBouncer自身接受多少连接，`default_pool_size`限制后台开启多少Postgres连接。（在PgHero，显示的连接数将与`default_pool_size`数目一致，因为它不知道PgBouncer。）

使用默认值启动即可，你可以随后调大他们：

```text
max_client_conn = 100
default_pool_size = 20
```

完成更改后，不要忘记重载（reload）或重启（restart）pgbouncer：

```bash
sudo systemctl reload pgbouncer
```

#### 调试，确保一切正常 {#pgbouncer-debug}

你应该能像连接Postgres一样连接PgBouncer：

```bash
psql -p 6432 -U mastodon mastodon_production
```

然后，使用你的密码登录。

你也可以检查PgBouncer日专，就像这样：

```bash
tail -f /var/log/postgresql/pgbouncer.log
```

#### 配置 Mastodon 以连接 PgBouncer {#pgbouncer-mastodon}

首先，确保`.env.production`文件这样设置：

```bash
PREPARED_STATEMENTS=false
```

因为我们使用基于事务（transaction-based）的连接池，我们不能使用参数化查询（prepared statement）。

接下来，配置Mastodon使用6432端口（PgBouncer）而不是5432端口（PostgreSQL）就可以了：

```bash
DB_HOST=localhost
DB_USER=mastodon
DB_NAME=mastodon_production
DB_PASS=password
DB_PORT=6432
```

{{< hint style="warning" >}}
你不能使用pgBouncer来执行 `db:migrate` 操作。但是这个问题很容易解决。如果你的postgres和pgBouncer位于同一台主机，只需要在执行任务时与 `RAILS_ENV=production` 一同定义 `DB_PORT=5432` 就可以了，例如：`RAILS_ENV=production DB_PORT=5432 bundle exec rails db:migrate`（如果主机不同，你也可以指定`DB_HOST`等等）
{{< /hint >}}

#### 管理 PgBouncer {#pgbouncer-admin}

最简单的重启方法：

```bash
sudo systemctl restart pgbouncer
```

但如果你设定了PgBouncer管理员帐户，你也可以用管理员帐户连接：

```bash
psql -p 6432 -U pgbouncer pgbouncer
```

然后执行：

```sql
RELOAD;
```

使用 `\q` 以退出。

## 单独的Redis缓存 {#redis}

Redis被广泛使用于应用，但是某些用途比其他用途更重要。主页时间轴、列表时间轴、Sidekiq队列还有streaming API都是由Redis支持的，这些是你不希望丢失的重要数据（尽管丢失了也能存活，不像PostgreSQL数据库的丢失——永远不要丢失PostgreSQL数据库！）。然而，Redis也被用于易失性缓存。如果你正处于扩展阶段，担心你的Redis能否处理所有事情，你可以使用一个不同的Redis数据库来做缓存。在环境变量中，你可以指定 `CACHE_REDIS_URL` 或分离形式，就像 `CACHE_REDIS_HOST`、 `CACHE_REDIS_PORT`等等。未指定部分将会回落至没有前缀的相同设定值。

至于Redis数据库配置，基本上你可以去除后台保存至磁盘，因为重启致使数据丢失也没关系，你可以以此节省一些磁盘I/O。你还可以添加最大内存限制和 key eviction policy，对于这部分，请参阅这个指南：[Using Redis as an LRU cache](https://redis.io/topics/lru-cache)。

## 只读副本（Read-replicas） {#read-replicas}

为了减轻你的Postgresql服务器负担，你可以使用热流复制（hot streaming replication）（只读副本（read replica））。有关示例，请参见[该指南](https://cloud.google.com/community/tutorials/setting-up-postgres-hot-standby)。你可以给以下Mastodon用途使用副本（replica）：

* streaming API 服务器无需写入，因此你可以将其直接使用副本（replica）。但由于 streaming API 服务器不经常查询数据库，这样的优化影响很小。
* 使用 Makara 驱动 web 与 sidekiq 进程，这样可以实现从主（primary）数据库写，从副本（replica）读。让我们开始吧。

编辑 `config/database.yml` 文件，将 `production` 替换为如下内容：

```yaml
production:
  <<: *default
  adapter: postgresql_makara
  prepared_statements: false
  makara:
    id: postgres
    sticky: true
    connections:
      - role: master
        blacklist_duration: 0
        url: postgresql://db_user:db_password@db_host:db_port/db_name
      - role: slave
        url: postgresql://db_user:db_password@db_host:db_port/db_name
```

确保URL指向PostgreSQL服务器所在位置。你可以添加多个副本（replica）。你可以本地安装一个pgBouncer，该pgBouncer可被配置为根据数据库名称连接两个不同服务器，例如：“mastodon”连接主服务器，“mastodon_replica”连接副本服务器，这样上面文件中的两个URL可以使用同样用户名、密码、主机、端口，不同数据库名称。可能的设置有很多！有关Makara的更多信息，请参阅[其文档](https://github.com/taskrabbit/makara#databaseyml)。

{{< hint style="warning" >}}
Sidekiq无法可靠的使用只读副本（read-replicas），因为即使是最微小的复制延迟也会导致查询不到相关纪录所致的任务失败。
{{< /hint >}}

{{< translation-status-zh-cn raw_title="Scaling up your server" raw_link="/admin/scaling/" last_tranlation_time="2020-05-06" raw_commit="ad1ef20f171c9f61439f32168987b0b4f9abd74b">}}
