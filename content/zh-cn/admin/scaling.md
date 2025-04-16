---
title: 扩大你的站点规模
descriptions: 为服务更多用户可以进行的优化。
menu:
  docs:
    weight: 100
    parent: admin
---

## 管理并发度 {#concurrency}

Mastodon 有三种类型的进程：

- Web (Puma)
- 流式 API
- 后台处理 (Sidekiq)

### Web (Puma) {#web}

Web 进程处理应用大部分的短周期 HTTP 请求。可通过以下环境变量控制并发度：

- `WEB_CONCURRENCY` 控制工作进程的数量
- `MAX_THREADS` 控制每个进程的线程数量

线程共享其父进程的内存。不同的进程分配自己的内存，但通过写时复制共享一些内存。增加线程数量会优先耗尽你的 CPU，而增加进程数量会先耗尽你的 RAM。

上述变量的值可以影响同时能处理多少 HTTP 请求。

就吞吐量指标而言，增加进程数量比增加线程数量效果更好。

### 流式 API {#streaming}

流式 API 处理长周期 HTTP 和 WebSocket 连接，客户端通过这些连接接收实时更新。可通过以下环境变量控制并发度：

- `STREAMING_API_BASE_URL` 控制流式 API 的根 URL
- `PORT` 控制流式 API 服务器将监听的端口，默认为4000。`BIND`和`SOCKET`环境变量也可以使用。
- 此外，流式 API 还使用共享的[数据库](/admin/config#postgresql)和 [Redis](/admin/config#redis) 环境变量。

通过设置 `STREAMING_API_BASE_URL`，流式 API 可以使用不同的子域。这允许你为流式 API 和 Web API 请求使用不同的负载均衡器。然而，这也要求应用程序从[实例端点](/methods/instance/#v2)正确请求流式 API URL，而不是假设它与 Web API 托管在同一域名上。

流式 API 服务端的一个进程可以处理相当多的连接和吞吐量，但如果你发现单个进程无法处理你实例的负载，你可以通过改变每个进程的 `PORT` 号来运行多个进程，然后使用nginx将流量负载均衡到每个实例。例如，一个有大约 50000 个用户且月活跃用户为 10000 - 20000 个用户的社区，通常会有大约 800-1200 个并发流式 API 连接。

流式 API 服务端还在 `/metrics` 上暴露了一个 [Prometheus](https://prometheus.io/) 端点，提供许多指标帮助你了解 Mastodon 流式 API 服务器的当前负载，一些关键指标包括：

- `mastodon_streaming_connected_clients`：这是已连接客户端的数量，按客户端类型标记（websocket 或 eventsource）
- `mastodon_streaming_connected_channels`：这是当前订阅的"频道"数量（注意由于我们内部"系统"频道的工作方式，这个数字比连接的客户端要高得多）
- `mastodon_streaming_messages_sent_total`：这是自上次重启以来发送给客户端的消息总数。
- `mastodon_streaming_redis_messages_received_total`：这是从 Redis pubsub 接收的消息数量，用于补充[直接监控Redis](https://sysdig.com/blog/redis-prometheus/)。

{{< hint style="info" >}}
运行的流式 API 服务端进程越多， PostgreSQL 上消耗的数据库连接就越多，所以你可能需要使用 PgBouncer，如下文所述。
{{< /hint >}}

下面是一个 nginx 配置示例，用于将流量路由到三个不同的进程，分别运行在 `PORT` 4000、 4001 和 4002 上：

```text
upstream streaming {
    least_conn;
    server 127.0.0.1:4000 fail_timeout=0;
    server 127.0.0.1:4001 fail_timeout=0;
    server 127.0.0.1:4002 fail_timeout=0;
}
```

如果你使用分布式 systemd 文件，那么可以使用以下命令启动多个流式 API 服务端：

```bash
$ sudo systemctl start mastodon-streaming@4000.service
$ sudo systemctl start mastodon-streaming@4001.service
$ sudo systemctl start mastodon-streaming@4002.service
```

默认情况下， `sudo systemctl start mastodon-streaming` 只在端口4000上启动一个进程，相当于运行 `sudo systemctl start mastodon-streaming@4000.service`。

{{< hint style="warning" >}}
Mastodon 的早期版本有一个 `STREAMING_CLUSTER_NUM` 环境变量，该变量使流式 API 服务端使用集群，它启动多个工作进程并使用 Node.js 进行负载均衡。

上述配置与其他配置的交互方式使容量规划变得困难，在涉及到数据库连接和 CPU 资源时尤为如此。默认情况下，流式 API 服务端会消耗所有可用 CPU 上的资源，这可能会与服务器上运行的其他软件产生冲突。另一个常见问题是配置错误的 `STREAMING_CLUSTER_NUM` 导致因为每个集群工作进程打开连接池而耗尽数据库连接，因此 `STREAMING_CLUSTER_NUM` 为 `5` 且 `DB_POOL` 为 `10` 可能会消耗50个数据库连接。

现在，单个流式 API 服务端进程最多只会使用 `DB_POOL` 个PostgreSQL连接，并且通过运行更多的流式 API 服务端实例来处理扩展。
{{< /hint >}}

### 后台处理 (Sidekiq) {#sidekiq}

Mastodon 中的许多任务都被委托给后台处理，以确保对 HTTP 请求的快速响应，并防止 HTTP 请求中止影响这些任务的执行。Sidekiq 是一个单一进程，具有可配置的线程数。

#### 线程数量 {#sidekiq-threads}

虽然 Web 进程中的线程数影响 Mastodon 实例对最终用户的响应速度，但分配给后台处理的线程数影响嘟文从作者传递给其他人的速度、邮件发送速度等。

线程数不是通过环境变量调整的，而是通过调用 Sidekiq 时的命令行参数调整，如下例所示：

```bash
bundle exec sidekiq -c 15
```

这将以 15 个线程启动 Sidekiq 进程。需要注意的是，每个线程都需要一个数据库连接，所以这需要一个大的数据库池。这个池的大小由 `DB_POOL` 环境变量管理，它应该设置为至少等于线程数的值。

#### 队列 {#sidekiq-queues}

Sidekiq 使用不同的队列来处理不同重要性的任务，其中重要性是指如果队列不工作，对服务器本地用户体验的影响程度。队列按重要性降序列出如下：

`default`
: 影响本地用户的所有任务。

`push`
: 将负载传递到其他服务器。

`ingress`
: 传入的外站活动。优先级低于默认队列，以便在服务器负载过重时本站用户仍能看到他们的嘟文。

`mailers`
: 负责邮件的传递。

`pull`
: 较低优先级的任务，如处理导入、备份、解析嘟文串、删除用户、转发回复。

`scheduler`
: 处理定时任务，如刷新热门话题标签和清理日志。

默认队列及其优先级存储在 [config/sidekiq.yml](https://github.com/mastodon/mastodon/blob/main/config/sidekiq.yml) 中，但可以通过 Sidekiq 的命令行调用进行覆盖，例如：

```bash
bundle exec sidekiq -q default
```

此命令将只运行 `default` 队列。

Sidekiq 通过首先检查第一个队列中的任务来处理队列，如果没有找到，它会检查后续队列。因此，如果第一个队列过满，其他队列中的任务可能会遭遇延迟。

为队列创建不同的 Sidekiq 进程，可以实现真正的并行执行，例如为具有不同参数的 Sidekiq 创建多个 systemd 服务。

{{< hint style="warning" >}}
你可以根据需要运行任意多的 Sidekiq 进程和线程，以有效处理运行中的作业，但是 `scheduler` 队列永远不应该在多个 Sidekiq 进程中同时运行。
{{< /hint >}}

## 使用PgBouncer进行事务池化 {#pgbouncer}

### 为什么你可能需要PgBouncer {#pgbouncer-why}

如果你开始耗尽可用的 PostgreSQL 连接（默认为100个），那么 PgBouncer 可能是一个好的解决方案。本文档描述了一些常见的问题，以及 Mastodon 的良好配置默认值。

在 Mastodon 中具有 `DevOps` 权限的用户可以通过管理视图中的 PgHero 链接监控当前 PostgreSQL 连接的使用情况。通常，打开的连接数等于 Puma、Sidekiq 和流媒体 API 中的线程总数。

### 安装PgBouncer {#pgbouncer-install}

在 Debian 和 Ubuntu 上：

```bash
sudo apt install pgbouncer
```

### 配置 PgBouncer {#pgbouncer-config}

#### 设置密码 {#pgbouncer-password}

首先，如果你的 PostgreSQL 中的 `mastodon` 用户没有设置密码，你需要设置一个密码。

以下是重置密码的方法：

```bash
psql -p 5432 -U mastodon mastodon_production -w
```

然后（显然，此处应该使用不同于 "password" 的密码）：

```sql
ALTER USER mastodon WITH PASSWORD 'password';
```

然后使用 `\q` 退出。

#### 配置 userlist.txt {#pgbouncer-userlist}

编辑 `/etc/pgbouncer/userlist.txt`

只要你在稍后的 `pgbouncer.ini` 中指定了用户/密码， `userlist.txt` 中的值就不必与真实的 PostgreSQL 用户组对应。你可以任意定义用户和密码，但为了简单起见，你可以重用"真实"的凭证。将 `mastodon` 用户添加到 `userlist.txt`：

```text
"mastodon" "md5d75bb2be2d7086c6148944261a00f605"
```

这里我们使用 md5 方案，其中 md5 密码只是 `password + username` 的 md5sum，前面加上字符串 `md5`。例如，为用户 `mastodon` 和密码 `password` 生成哈希：

```bash
# ubuntu, debian等
echo -n "passwordmastodon" | md5sum
# macOS, openBSD等
md5 -s "passwordmastodon"
```

然后只需在开头添加 `md5`。

你还需要创建一个 `pgbouncer` 管理员用户来登录 PgBouncer 管理数据库。这里是一个示例 `userlist.txt`：

```text
"mastodon" "md5d75bb2be2d7086c6148944261a00f605"
"pgbouncer" "md5a45753afaca0db833a6f7c7b2864b9d9"
```

上述两个示例中的密码都为 `password`。

#### 配置 pgbouncer.ini {#pgbouncer-ini}

编辑 `/etc/pgbouncer/pgbouncer.ini`

在 `[databases]` 部分添加一行，列出你想连接的 PostgreSQL 数据库。这里我们只让 PgBouncer 使用相同的用户名/密码和数据库名来连接底层的 PostgreSQL 数据库：

```ini
[databases]
mastodon_production = host=127.0.0.1 port=5432 dbname=mastodon_production user=mastodon password=password
```

`listen_addr` 和 `listen_port` 将告知 PgBouncer 接受哪个地址/端口的连接。默认值的效果已经较为理想：

```ini
listen_addr = 127.0.0.1
listen_port = 6432
```

将 `auth_type` 设为 `md5`（假设你在 `userlist.txt` 中使用了 md5 格式）：

```ini
auth_type = md5
```

确保 `pgbouncer` 用户是管理员：

```ini
admin_users = pgbouncer
```

Mastodon 需要不同于默认的基于会话的池化模式。具体而言，它需要基于事务的池化模式。这意味着 PostgreSQL 连接在事务开始时建立，在事务完成时终止。因此，必须将 `pool_mode` 设置从 `session` 更改为 `transaction`：

```ini
pool_mode = transaction
```

接下来， `max_client_conn` 定义 PgBouncer 本身将接受多少个连接，而 `default_pool_size` 限制了底层会开启多少个 PostgreSQL 连接。（在 PgHero 中举报的连接数将对应于 `default_pool_size`，因为它不知道 PgBouncer 的存在）。

默认值可以开始，之后你可以随时增加它们：

```ini
max_client_conn = 100
default_pool_size = 20
```

修改完成后，不要忘记重新加载或重新启动 PgBouncer：

```bash
sudo systemctl reload pgbouncer
```

#### 调试并确认一切正常 {#pgbouncer-debug}

你应该能够像连接 PostgreSQL 那样连接到 PgBouncer：

```bash
psql -p 6432 -U mastodon mastodon_production
```

然后使用你的密码登录。

你还可以这样检查 PgBouncer 日志：

```bash
tail -f /var/log/postgresql/pgbouncer.log
```

#### 配置 Mastodon 与 PgBouncer 通信 {#pgbouncer-mastodon}

在你的 `.env.production` 文件中，首先确保配置了：

```bash
PREPARED_STATEMENTS=false
```

由于我们使用基于事务的池化，我们不能使用预处理语句。

接下来，配置 Mastodon 使用端口 6432（PgBouncer）而不是 5432（PostgreSQL），之后你应该就可以开始运行了：

```bash
DB_HOST=localhost
DB_USER=mastodon
DB_NAME=mastodon_production
DB_PASS=password
DB_PORT=6432
```

{{< hint style="warning" >}}
PgBouncer 不能用于执行 `db:migrate` 任务，但这很容易解决。如果你的 PostgreSQL 和 PgBouncer 在同一主机上，可以简单地在调用任务时定义 `DB_PORT=5432` 和 `RAILS_ENV=production`，例如： `RAILS_ENV=production DB_PORT=5432 bundle exec rails db:migrate` （如果不同，你也可以指定 `DB_HOST` 等）
{{< /hint >}}

#### 管理 PgBouncer {#pgbouncer-admin}

最简单的重启方法是：

```bash
sudo systemctl restart pgbouncer
```

但如果你已经设置了 PgBouncer 管理员用户，你也可以以管理员身份连接：

```bash
psql -p 6432 -U pgbouncer pgbouncer
```

然后执行：

```sql
RELOAD;
```

然后使用 `\q` 退出。

## 针对缓存分离Redis {#redis}

Redis 在整个应用中被广泛使用，但有些用途比其他用途更重要。主页订阅、列表订阅、 Sidekiq 队列以及流式 API 都由 Redis 支持，这些是你不想丢失的重要数据（虽然与比不可丢失的 PostgreSQL 数据库不同，丢失这些数据也可以恢复）。

Redis 也用于易失性缓存。如果你正在扩展站点规模，并担忧 Redis 处理负载的能力，你可以专门为缓存分配一个单独的 Redis 数据库。要做到这一点，请在环境中设置 `CACHE_REDIS_URL`，或者定义单独的组件如 `CACHE_REDIS_HOST`、 `CACHE_REDIS_PORT` 等。

未指定的组件将默认为没有 `CACHE_` 前缀的值。

在配置用于缓存的 Redis 数据库时，可以禁用后台保存到磁盘的功能，因为在重启时数据丢失不是很关键，这可以节省一些磁盘 I/O。此外，考虑设置最大内存限制和实现键驱逐策略。有关这些配置的更多详细信息，请查看此指南：[使用 Redis 作为 LRU 缓存](https://redis.io/topics/lru-cache)

## 针对 Sidekiq 分离 Redis {#redis-sidekiq}

Redis 在 Sidekiq 中用于跟踪其锁和队列。尽管总体上性能提升不是很大，但一些实例可能会受益于为 Sidekiq 单独设置 Redis 实例。

在环境文件中，你可以指定 `SIDEKIQ_REDIS_URL` 或单独的部分如 `SIDEKIQ_REDIS_HOST`、 `SIDEKIQ_REDIS_PORT` 等。未指定的部分回退到不带 `SIDEKIQ_` 前缀的相同值。

创建一个单独的 Redis 实例用于 Sidekiq 相对简单：

首先复制默认的 redis systemd 服务：

```bash
cp /etc/systemd/system/redis.service /etc/systemd/system/redis-sidekiq.service
```

在 `redis-sidekiq.service` 文件中，更改以下值：

```bash
ExecStart=/usr/bin/redis-server /etc/redis/redis-sidekiq.conf --supervised systemd --daemonize no
PIDFile=/run/redis/redis-server-sidekiq.pid
ReadWritePaths=-/var/lib/redis-sidekiq
Alias=redis-sidekiq.service
```

为新的 Sidekiq Redis 实例复制 Redis 配置文件：

```bash
cp /etc/redis/redis.conf /etc/redis/redis-sidekiq.conf
```

在复制后的 `redis-sidekiq.conf` 文件中，更改以下值：

```bash
port 6479
pidfile /var/run/redis/redis-server-sidekiq.pid
logfile /var/log/redis/redis-server-sidekiq.log
dir /var/lib/redis-sidekiq
```

在启动新的 Redis 实例之前，创建一个数据目录：

```bash
mkdir /var/lib/redis-sidekiq
chown redis /var/lib/redis-sidekiq
```

启动新的 Redis 实例：

```bash
systemctl enable --now redis-sidekiq
```

更新你的环境变量，并添加以下行：

```bash
SIDEKIQ_REDIS_URL=redis://127.0.0.1:6479/
```

重启 Mastodon 以使用新的 Redis 实例。确保同时重启 web 和 Sidekiq（否则其中一个仍将从错误的实例工作）：

```bash
systemctl restart mastodon-web.service
systemctl restart redis-sidekiq.service
```


## 用于高可用场景的 Redis Sentinel {#redis-sentinel}

如前所述， Redis 是 Mastodon 实例运行的关键部分。默认情况下，你的部署将使用单个 Redis 实例，或者如果你设置了缓存，则使用多个实例。但是，如果该实例宕机，也可能导致整个 Mastodon 实例宕机。为了缓解这个问题，可以使用 Redis Sentinel 来跟踪你的 Redis 实例，并在一个实例宕机时自动将客户端引导到新的主实例。你可以指定 `REDIS_SENTINELS`，这是 Mastodon 可以与之交互的 Sentinel 实例的 IP:Port 组合的以逗号分隔的列表，以确定当前的主 Redis 节点。你还需要在 `REDIS_SENTINEL_MASTER` 中指定你想要连接的主节点的名称。默认情况下， Sentinel 将在当前主节点无法访问一分钟后将其设置为宕机并选择新的主节点，但这可以根据你的设置进行配置。

所有与 sentinel 相关的变量也可以设置 `CACHE_`和`SIDEKIQ_` 前缀，以便使用多个redis实例。

了解更多关于 Redis sentinel 的信息：https://redis.io/docs/latest/operate/oss_and_stack/management/sentinel/

## 读副本 {#read-replicas}

为了减轻 PostgreSQL 服务器的负载，你可能希望设置热数据流式复制（读副本）。[参见此指南获取示例](https://cloud.google.com/community/tutorials/setting-up-postgres-hot-standby)。

### Mastodon >= 4.2

从 4.2 版本开始，Mastodon 内置了对副本的支持。你可以为每个服务（包括 Sidekiq）使用相同的配置，当情况允许时，某些查询将使用 Rails 内置的副本支持被定向到读副本。如果你的副本落后超过几秒钟，应用将停止向它发送查询，直到它赶上进度。

要配置读副本，请使用以下环境变量：

```
REPLICA_DB_HOST
REPLICA_DB_PORT
REPLICA_DB_NAME
REPLICA_DB_USER
REPLICA_DB_PASS
REPLICA_PREPARED_STATEMENTS
REPLICA_DB_TASKS
```

或者，如果你想使用同一个变量配置上述所有配置，也可以使用 `REPLICA_DATABASE_URL`。

`REPLICA_DB_TASKS=false` 将使应用连接到副本数据库，但不执行任何数据库管理任务，如模型管理、迁移、种子管理等。默认情况下，它被设为 true。

作为可选选项，可用 `REPLICA_PREPARED_STATEMENTS` 覆盖 `PREPARED_STATEMENTS` 的值。如果未设置 `PREPARED_STATEMENTS`，默认为 true。

应用上述配置后，你应该开始看到对副本服务器的请求了！

### Mastodon <= 4.1

对于 4.2 之前的 Mastodon 版本，你可以通过以下方式在 Mastodon 中使用副本：

- 流式 API 服务端完全不发出写操作，所以你可以直接将其连接到副本（它无论如何也不经常查询数据库，所以这样做的影响很小）。
- 在 web 和 Sidekiq 进程中使用 Makara 驱动程序，使写操作发送到主数据库，而读操作发送到副本。让我们来讨论这个。

{{< hint style="warning" >}}
Sidekiq 进程当前不支持读副本，对 Sidekiq 进程使用读副本将导致作业失败和数据丢失。
{{< /hint >}}

你将需要为web进程使用单独的 `config/database.yml` 文件，并编辑它以替换 `production` 部分，如下所示：

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

确保 URL 指向 PostgreSQL 服务器的正确位置。你可以添加多个副本。你可以在本地安装一个 PgBouncer，并配置其基于数据库名称连接到两个不同的服务器，例如， "mastodon" 连接到主服务器， "mastodon_replica" 连接到副本，因此在上面的文件中，两个URL都会指向具有相同用户、密码、主机和端口但数据库名称不同的本地 PgBouncer。这样设置的可能性很多。有关 Makara 的更多信息，[请查看其文档](https://github.com/taskrabbit/makara#databaseyml)。

{{< hint style="warning" >}}
确保 sidekiq 进程运行使用标准的 `config/database.yml`，以避免作业失败和数据丢失！
{{< /hint >}}

## 使用 Web 负载均衡器

像 DigitalOcean、AWS、Hetzner 等云提供商提供虚拟负载均衡解决方案，它们在多个服务器之间分配网络流量，但提供单一的公共 IP 地址。

可以扩展你的部署架构，在其中一个虚拟负载均衡器后面设置多个 web/Puma 服务器，以减少单个服务器被用户流量压垮的风险，帮助提供更一致的性能，并在进行维护或升级时减少停机时间。你应该咨询提供商的文档了解如何设置和配置负载均衡器，但要考虑到你需要配置负载均衡器来监控后端 web/Puma 节点的健康状况，否则你可能会向不响应的服务发送流量。

以下端点可用于监控此目的：

- **Web/Puma:** `/health`
- **流媒体API:** `/api/v1/streaming/health`

这两个端点都应返回HTTP状态码200，以及文本`OK`作为结果。

{{< hint style="info" >}}
你也可以将这些端点用于第三方监控/警报工具的健康检查。
{{< /hint >}}

{{< translation-status-zh-cn raw_title="Scaling up your server" raw_link="/admin/scaling/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
