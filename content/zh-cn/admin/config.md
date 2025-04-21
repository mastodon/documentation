---
title: 配置你的环境
description: 为你的 Mastodon 服务器设置环境变量。
menu:
  docs:
    weight: 30
    parent: admin
---

Mastodon 使用环境变量作为配置方式。

为方便起见，它可以从 Mastodon 目录中的 `.env.production` 纯文本文件（该文件也被称为 "dotenv" 文件）中读取这些变量，但它们始终可以被特定进程覆盖。例如，systemd 服务文件可以从 `EnvironmentFile` 或带有 `Environment` 的配置文件内联定义中读取环境变量，因此你可以为特定服务设置不同的配置参数。也可以在通过命令行调用 Mastodon 时指定它们。

## 基础配置 {#basic}

### 联合与显示 {#federation}

#### `LOCAL_DOMAIN`

这是你的站点在网络中的唯一标识符。之后无法安全更改，因为更改它将导致外站服务器将你现有的账户与全新的账户混淆。它必须是你服务器实际对应的域名(不包括协议部分，例如只是`example.com`)。

#### `WEB_DOMAIN`

`WEB_DOMAIN` 是一个可选环境变量，允许在一个域名上配置 Mastodon，同时让用户的标识保持在不同的域上，例如将用户地址配置为 `@alice@example.com`，但在 `mastodon.example.com` 上访问 Mastodon。如果你的域名已经用于不同的网站，但你仍然希望将其用作 Mastodon 标识符，因为它看起来更好或更短，这个配置可能会很有用。

与 `LOCAL_DOMAIN` 一样，一旦设置，`WEB_DOMAIN` 就无法安全更改，因为这会使知道你以前设置的外站服务器感到困惑，并可能破坏与它们的通信或使其变得不可靠。由于问题在于外站服务器对你的账户的理解，从头重新安装 Mastodon 也无法解决这个问题。因此，在设置 `LOCAL_DOMAIN` 和 `WEB_DOMAIN` 时请格外小心。

要在 `mastodon.example.com` 上安装 Mastodon，并使其为 `@alice@example.com` 这样的域名下的账户提供服务，请将 `LOCAL_DOMAIN` 设为 `example.com`，将 `WEB_DOMAIN` 设置为 `mastodon.example.com`。你还需要在托管 `example.com` 的服务器上进行额外配置，以将来自 `https://example.com/.well-known/webfinger` 的请求重定向到 `https://mastodon.example.com/.well-known/webfinger`。例如，使用 nginx 时，配置可能如下所示：

```
location /.well-known/webfinger {
  add_header Access-Control-Allow-Origin '*';
  return 301 https://mastodon.example.com$request_uri;
}
```

{{< hint style="info" >}}
进行服务重定向时必须添加 CORS 标头；否则，Mastodon 网页界面的某些功能将无法工作。例如可以添加如下 CORS 标头：`Access-Control-Allow-Origin: *`
{{</ hint >}}

#### `ALTERNATE_DOMAINS`

如果你有多个指向你的 Mastodon 服务器的域名，此设置将允许 Mastodon 在使用这些其他域名寻址用户时识别自己。域名之间用逗号分隔，例如`foo.com,bar.com`

#### `ALLOWED_PRIVATE_ADDRESSES`

私有IP地址/子网列表，以逗号分隔，允许在出站HTTP请求中使用。Mastodon 阻止来自私有IP地址范围(如 `127.0.0.1` 或 `192.168.1.1/16`)的主机的HTTP请求，以防止[服务器端请求伪造](https://en.wikipedia.org/wiki/Server-side_request_forgery)。此设置将从阻止列表中移除指定的IP地址/子网。

#### `AUTHORIZED_FETCH`

也称为"安全模式"。设置为`true`时，会发生以下变化：

- Mastodon 将停止为公开嘟文生成链接数据签名，这可以防止它们在没有精确控制的情况下被高效地重新分发。由于带有签名的链接数据对象是完全自包含的，它可以在不向来源服务器发出额外请求的情况下传递。
- Mastodon 将要求对公开嘟文和账户的 ActivityPub 表示的请求进行HTTP签名认证，这些数据通常在没有任何认证的情况下可用。当没有提供认证时，个人资料将只返回基本的技术信息。
- 在 4.0.0 版本之前：Mastodon 将要求任何 REST/streaming API 访问携带用户上下文(即已通过具有活跃用户的 OAuth 授权界面授权)，而通常情况下一些 API 端点无需任何认证即可使用。

因此，通过以上认证机制并避免不将你的服务器纳入循环的重新分发的情况出现，你可以强制谁可以和谁不可以检索你服务器上的公开内容，例如你已阻止域的服务器。

{{< hint style="warning" >}}
不幸的是，安全模式并非没有缺点，这就是它不默认启用的原因。联邦宇宙中，并非所有软件都能完全支持它，尤其是启用之后，与 3.0 之前版本的 Mastodon 服务器的某些功能将被破坏；由于链接数据签名被用于使公开对话的上下文更完整，因此即使在与最新版本的服务器联合时，也会失去一些有用的功能；另外，由于该模式下的公开内容上的认证机制意味着无法缓存，它会带来计算成本的增加。
{{</ hint >}}

{{< hint style="warning" >}}
安全模式不会隐藏公开嘟文和账户的HTML表示。与 ActivityPub 的第一方表示或 REST API 相比，HTML 是一种更具有损失性的格式，但它仍然是抓取内容的潜在途径。
{{</ hint >}}

#### `LIMITED_FEDERATION_MODE`

设置为 `true` 时，Mastodon 将联合范围限制在你手动批准的站点之内，并禁用所有公共页面和某些 REST API。有限联合模式基于安全模式(`AUTHORIZED_FETCH`)。

当将现有实例切换到有限联合模式时，应使用以下命令删除允许的域名之外的实例上已存在的任何数据：

```
tootctl domain purge --limited-federation-mode
```

{{< hint style="warning" >}}
此模式仅供私人使用，例如在学术机构或内部公司网络中，因为它实际上创建了一个数据孤岛，这与 Mastodon 的去中心化使命相悖。
{{</ hint >}}

{{< hint style="info" >}}
在 3.1.5 版本之前，此设置称为`WHITELIST_MODE`。
{{</ hint >}}

#### `DISALLOW_UNAUTHENTICATED_API_ACCESS`

从 Mastodon v4.0.0 开始，Web 应用将负责渲染所有请求，包括未登录状态下的请求。为了使相关应用视图工作， Web 应用会公开发出 API 请求以获取账户和嘟文。如果你想禁止这一点，请将此变量设置为`true`。请注意，禁止未经认证的 API 访问将导致账户和嘟文的永久链接对未登录用户返回错误，使得本地登录或通过ActivityPub获取内容称为查看内容的唯二方式。

#### `SINGLE_USER_MODE`

若配置为`true`，你的 Mastodon 服务器的首页将始终重定向到数据库中的第一个账户，且注册将被禁用。

#### `DISABLE_AUTOMATIC_SWITCHING_TO_APPROVED_REGISTRATIONS`

为了防止被遗弃的 Mastodon 服务器被用于垃圾信息、骚扰和其他恶意活动，如果服务器开放新用户注册，且一周内没有检测到任何可访问审核举报的用户的活动（包括通过 APP 的非审核活动），Mastodon 将自动切换到需要管理员批准新用户注册的模式。发生这种情况时，拥有更改服务器设置权限的用户将收到电子邮件通知。


设置 `DISABLE_AUTOMATIC_SWITCHING_TO_APPROVED_REGISTRATIONS=true` 可禁用此行为。

**版本历史：**\
4.2.8 - 该配置被添加

#### `DEFAULT_LOCALE`

默认情况下，Mastodon 会自动从浏览器标头中检测访问者的语言，并以该语言 (如果支持) 显示 Mastodon 界面。如果你正在运行特定语言或区域的服务器，这种行为可能会误导不会说你的语言的访客在你的服务器注册。因此，你可能希望将此变量设置为特定语言。

示例值：`de`

支持的语言：

- `ar`
- `ast`
- `bg`
- `bn`
- `br`
- `ca`
- `co`
- `cs`
- `cy`
- `da`
- `de`
- `el`
- `en`
- `eo`
- `es`
- `es-AR`
- `et`
- `eu`
- `fa`
- `fi`
- `fr`
- `ga`
- `gl`
- `he`
- `hi`
- `hr`
- `hu`
- `hy`
- `id`
- `io`
- `is`
- `it`
- `ja`
- `ka`
- `kab`
- `kk`
- `kn`
- `ko`
- `lt`
- `lv`
- `mk`
- `ml`
- `mr`
- `ms`
- `nl`
- `nn`
- `no`
- `oc`
- `pl`
- `pt-BR`
- `pt-PT`
- `ro`
- `ru`
- `sk`
- `sl`
- `sq`
- `sr`
- `sr-Latn`
- `sv`
- `ta`
- `te`
- `th`
- `tr`
- `uk`
- `ur`
- `vi`
- `zh-CN`
- `zh-HK`
- `zh-TW`

### 密钥 {#secrets}

#### `SECRET_KEY_BASE`

使用 `rake secret` 生成。更改将破坏所有活跃的浏览器会话。

#### `OTP_SECRET`

使用 `rake secret` 生成。更改将破坏双因素认证。

#### `VAPID_PRIVATE_KEY`

使用 `rake mastodon:webpush:generate_vapid_key` 生成。更改将破坏推送通知。

#### `VAPID_PUBLIC_KEY`

使用 `rake mastodon:webpush:generate_vapid_key` 生成。更改将破坏推送通知。

### 部署 {#deployment}

#### `RAILS_ENV`

环境。可以是 `production`、 `development` 或 `test`。如果你出于开发目的在个人计算机上运行 Mastodon，请使用 `development`。这也是默认值。如果你在线运行 Mastodon，请使用 `production`。Mastodon 将根据环境加载不同的配置默认值。

{{< hint style="warning" >}}
该变量不能在 dotenv(`.env`) 文件中定义，因为它在该文件被加载之前就已使用。
{{</ hint >}}

#### `RAILS_SERVE_STATIC_FILES`

若配置为 true， Mastodon 将响应对 `public` 目录中文件的请求。当反向代理(例如 nginx)无法访问 `public` 目录本身的文件系统时，这可能是必要的，例如在容器化环境中。这是一种次优配置，因为直接从文件系统提供静态文件总是比通过 Ruby on Rails 进程提供它们要快得多。

#### `RAILS_LOG_LEVEL`

确定 Mastodon 为 Web 和 Sidekiq 进程生成的日志量。默认为 `info`，这会为 Mastodon 服务的每个请求和 Mastodon 处理的每个后台作业生成日志条目。这可能很有用，但如果有大量流量/活动，可能会变得非常嘈杂并给你的机器的 I/O 带来压力。在这种情况下，建议使用 `warn`，它只会输出关于出错的信息，否则保持安静。可能的值是 `debug`、`info`、`warn`、`error`、`fatal` 和 `unknown`。

#### `LOG_LEVEL`

确定 Mastodon 为流进程生成的日志量。默认为 `info`。其它可能的值有 `silly` 和 `info`。

#### `TRUSTED_PROXY_IP`

告诉 Mastodon Web 进程和流进程哪些 IP 充当你的可信反向代理(例如nginx、Cloudflare)。它影响 Mastodon 如何确定每个请求的源 IP，这用于重要的速率限制和安全功能。如果该值设置不正确，那么 Mastodon 可能会使用反向代理的 IP 而不是实际源 IP。

默认情况下，环回和私有网络地址范围是可信的。具体来说：

- `127.0.0.1/8`
- `::1/128`
- `10.0.0.0/8`
- `172.16.0.0/12`
- `192.168.0.0/16`
- `fc00::/7`

如果你使用单个反向代理，并且它与你的 Mastodon Web 进程和流进程在同一台机器上运行，或位于同一个私有网络中，那么你很可能不需要修改此设置，可以使用默认设置。如果你使用多个反向代理服务器，并且它们都与你的 Mastodon Web 进程和流进程位于同一个私有网络中，那么理论上同样保持默认设置就可以了。但是，如果你使用的反向代理服务器通过公共IP地址到达你的 Mastodon Web 服务端和流服务端(例如，如果你使用 Cloudflare 或类似代理)，那么你需要设置此变量。它应该是所有可能使用的反向代理的IP，以逗号分隔的IP列表或使用[CIDR表示法](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing#CIDR_notation)表示的 IP 范围。请注意，当设置此变量时，默认范围(上面提到的)将不再被信任，因此如果你同时拥有外部反向代理和来自 localhost 的代理，则必须同时包含两者的IP(或IP范围)。

管理员和协管员可以进入设置 > 审核 > 账户选项卡来找到 Mastodon 看到的每个用户的源 IP。你可以使用像[IPInfo](https://ipinfo.io)这样的工具来判断 IP 是由最终用户 ISP 使用还是由托管你的代理的服务器使用。

#### `SOCKET`

除了绑定到 `127.0.0.1` 这样的 IP 地址之外，你还可以使用 Unix 套接字。此变量是特定于进程的，你可以根据需要为每个进程使用不同的值，它适用于 Web(Puma) 进程和流式 API(Node.js) 进程。

{{< hint style="warning" >}}
该变量不能在 dotenv(`.env`) 文件中定义，因为它在该文件被加载之前就已使用。
{{</ hint >}}

#### `PORT`

在不使用 Unix 套接字时，这将指定进程将监听的端口。此变量是特定于进程的，你可以根据需要为每个进程使用不同的值，它适用于 Web(Puma) 进程和流式 API(Node.js) 进程。默认情况下，Web 进程监听`3000`，流式 API 进程监听`4000`。

{{< hint style="warning" >}}
该变量不能在 dotenv(`.env`) 文件中定义，因为它在该文件被加载之前就已使用。
{{</ hint >}}

#### `NODE_ENV`

相当于 `RAILS_ENV`，但用于流式 API(Node.js) 服务端。

{{< hint style="warning" >}}
该变量不能在 dotenv(`.env`) 文件中定义，因为它在该文件被加载之前就已使用。
{{</ hint >}}

#### `BIND`

在不使用 Unix 套接字时，这将指定进程绑定到的 IP。只要它们监听不同的端口，多个进程就可以绑定到同一个IP。默认为 `127.0.0.1`。

{{< hint style="warning" >}}
该变量不能在 dotenv(`.env`) 文件中定义，因为它在该文件被加载之前就已使用。
{{</ hint >}}

#### `MASTODON_USE_LIBVIPS`

默认情况下， Mastodon 使用 ImageMagick 处理嘟文中的图像。作为替代方案，可以使用 [libvips](https://www.libvips.org) 8.13+，它具有更好的性能和更低的资源使用率。

从源代码安装 Mastodon 时，默认为 `false`，设置为 `true` 以启用。

部署 Mastodon 容器镜像时，这个值被硬编码为 `true`，不应被覆盖。

**版本历史：**\
4.3.0 - 该配置被添加

### 扩展选项 {#scaling}

{{< page-ref page="admin/scaling" >}}

#### `SIDEKIQ_CONCURRENCY`

在 4.1 版本中添加。特定于 Sidekiq，此变量确定 Sidekiq 派生多少个不同的进程。默认为 `5`。

#### `WEB_CONCURRENCY`

特定于 Puma，此变量确定 Puma 派生多少个不同的进程。默认为 `2`。

#### `MAX_THREADS`

特定于 Puma，此变量确定每个 Puma 进程维护的线程数。默认为 `5`。

#### `PERSISTENT_TIMEOUT`

特定于 Puma，此变量确定 Puma 在关闭连接之前应等待多长时间。默认为 `20`。

#### `PREPARED_STATEMENTS`

默认情况下， Mastodon 使用 PostgreSQL 的预备语句功能，它提供一些性能优势。如果你使用在不同事务间共享连接的连接池，则此功能不可用，因此必须设置为 `false`。当你扩展服务规模时，基于事务的连接池带来的优势将超过预备语句带来的优势。

#### `STREAMING_API_BASE_URL`

流式 API 可以部署到不同的域/子域。这可能会提高流式 API 的性能，因为在默认配置中，长寿命的流式 API 请求通过 nginx 代理，而从不同的域/子域提供流式 API 将允许完全跳过 nginx。

示例值：`wss://streaming.example.com`

#### `STREAMING_CLUSTER_NUM` {{%removed%}} {#streaming_cluster_num}

{{< hint style="danger" >}}
**已移除：**\
流服务器进程现在仅使用单个 node.js 进程，要进一步扩展它，你需要按照[扩展指南](/admin/scaling#streaming)中的文档进行操作
{{< /hint >}}

特定于流式 API，此变量确定流式 API 派生多少个不同的进程。默认为 CPU 核心数减一。

## 后端配置 {#backend}

### PostgreSQL {#postgresql}

#### `DB_HOST`

默认为 `localhost`。

#### `DB_USER`

默认为 `mastodon`。

#### `DB_NAME`

默认为 `mastodon_production`。

#### `DB_PASS`

无默认值。

#### `DB_PORT`

默认为 `5432`。

#### `DB_POOL`

定义进程中池化的数据库连接数。此值应涵盖进程中的每个线程，因此，它默认为 `MAX_THREADS` 的值。

#### `DB_SSLMODE`

PostgreSQL [SSL模式](https://www.postgresql.org/docs/10/libpq-ssl.html)。默认为`prefer`。

#### `DATABASE_URL`

若提供，则优先于 `DB_HOST`、 `DB_USER`、 `DB_NAME`、 `DB_PASS` 和 `DB_PORT`。

示例值：`postgresql://user:password@localhost:5432`

#### `QUERY_LOG_TAGS_ENABLED`

若配置为 `true`，则 ActiveRecord 将在每个 SQL 语句的末尾插入注释，这可以帮助分析应用程序的性能。

注释使用 SqlCommenter 格式，包含以下属性：
- `namespaced_controller`：生成此 SQL 语句的 HTTP 请求的控制器的完整名称
- `action`：生成此 SQL 语句的 HTTP 请求的操作名称
- `sidekiq_job_class`：生成此 SQL 语句的 Sidekiq 作业的类名

{{< hint style="warning" >}}
启用此选项将禁用预备语句
{{</ hint >}}

默认为 `false`。

**版本历史：**\
4.4.0 - 该配置被添加

### PostgreSQL (只读副本) {#postgresql-replica}

{{< hint style="info" >}}
如果你想使用只读数据库副本，你可以在[此页面](../scaling/#read-replicas)获取更多详细信息
{{</ hint >}}

#### `REPLICA_DB_HOST`

无默认值。

#### `REPLICA_DB_PORT`

无默认值。

#### `REPLICA_DB_NAME`

无默认值。

#### `REPLICA_DB_USER`

无默认值。

#### `REPLICA_DB_PASS`

无默认值。

#### `REPLICA_DATABASE_URL`

若提供，则优先于 `REPLICA_DB_HOST`、 `REPLICA_DB_PORT`、 `REPLICA_DB_NAME`、 `REPLICA_DB_USER` 和 `REPLICA_DB_PASS`。

无默认值。

### Redis {#redis}

Mastodon以三种不同的方式使用Redis：

* Web 应用本身使用 Redis 存储数据并与流服务器通信。
* Redis 被用作 Rails 内置缓存功能的缓存后端。
* Sidekiq，负责处理后台作业的进程，在 Redis 中存储作业数据。

你可以将单个 Redis 实例用于所有三种用例。只需使用下面提到的合适的 `REDIS_*` 变量即可。但你也可以通过使用带有 `CACHE_` 和 `SIDEKIQ_` 前缀的变量来使用两个甚至三个不同的 Redis 实例。

{{< hint style="info" >}}
建议为易失性缓存使用单独的 Redis 服务器。如果你的单个 Redis 服务器负载超过可承受范围，你可能希望这样做。
{{</ hint >}}

#### `REDIS_HOST`

默认为 `localhost`。

#### `REDIS_PORT`

默认为 `6379`。

#### `REDIS_USER`

可选。用于连接 Redis 的用户名。

**版本历史：**\
4.3.0 - 该配置被添加

#### `REDIS_PASSWORD`

可选。用于连接 Redis 的密码。

#### `REDIS_URL`

若提供，则优先于 `REDIS_HOST`、 `REDIS_PORT`、 `REDIS_USER`、 `REDIS_PASSWORD` 和 Sentinel 设置。

示例值： `redis://user:password@localhost:6379`

如果你需要使用 TLS 连接到 Redis 服务器，你必须使用带有协议头 `rediss://` 的 `REDIS_URL`，并按照下面的描述设置 `REDIS_DRIVER`。

#### `REDIS_DRIVER`

若提供， Redis 连接的驱动将从使用 Mastodon 默认的 hiredis 驱动更改为标准 Ruby 驱动。使用 Ruby 驱动是使用 TLS 连接到 Redis 所必需的。请注意，在某些环境中，使用 Ruby 驱动可能会影响 Redis 性能。

默认为 `hiredis`，可接受的值是 `hiredis` 或 `ruby`。

**版本历史：**\
4.3.0 - 该配置被添加

#### `REDIS_NAMESPACE`

如果提供，将为所有Redis键添加命名空间前缀。这允许在不同项目或Mastodon服务器之间共享同一个Redis数据库。

{{< hint style="warning" >}}
此选项已弃用。 Sidekiq 7 移除了对命名空间的支持，未来版本的 Mastodon 也会这样做。到那时，我们会尝试提供一个明确的迁移路径。如果你正在设置新的实例，强烈不建议使用此选项。
{{</ hint >}}

**版本历史：**\
4.3.0 - 该配置被弃用

#### `REDIS_SENTINELS`

Redis Sentinel 实例 HOST:PORT 列表。端口号是可选的，如果省略，它将使用 `REDIS_SENTINEL_PORT` 中给出的值或默认值 `26379`。

请注意，如果你想使用 Redis Sentinel，你还需要指定 `REDIS_SENTINEL_MASTER`。

**版本历史：**\
4.3.0 - 该配置被添加

#### `REDIS_SENTINEL_MASTER`

要连接的 Redis Sentinel 主节点的名称。

请注意，如果你想使用 Redis Sentinel，你还需要指定 `REDIS_SENTINELS`。

**版本历史：**\
4.3.0 - 该配置被添加

#### `REDIS_SENTINEL_PORT`

`REDIS_SENTINELS` 中给出的 Sentinel 的默认端口。

**版本历史：**\
4.3.0 - 该配置被添加

#### `REDIS_SENTINEL_USERNAME`

用于向 Sentinel 进行身份验证的用户名。

**版本历史：**\
4.3.0 - 该配置被添加

#### `REDIS_SENTINEL_PASSWORD`

用于向 Sentinel 进行身份验证的密码。

**版本历史：**\
4.3.0 - 该配置被添加

#### `CACHE_REDIS_HOST`

默认为 `REDIS_HOST` 的值。

#### `CACHE_REDIS_PORT`

默认为 `REDIS_PORT` 的值。

#### `CACHE_REDIS_USER`

可选。用于连接Redis的用户名。

**版本历史：**\
4.3.0 - 该配置被添加

#### `CACHE_REDIS_PASSWORD`

可选。用于连接 Redis 的密码。

#### `CACHE_REDIS_URL`

如果提供，优先于 `CACHE_REDIS_HOST` 和 `CACHE_REDIS_PORT`。默认为 `REDIS_URL` 的值。

#### `CACHE_REDIS_NAMESPACE`

默认为 `REDIS_NAMESPACE` 的值。

#### `CACHE_REDIS_SENTINELS`

逗号分隔的 Redis Sentinel 实例 HOST:PORT 列表。端口号是可选的，如果省略，它将使用默认值 `26379`。

请注意，如果你想使用 Redis Sentinel，你还需要指定 `CACHE_REDIS_SENTINEL_MASTER`。

**版本历史：**\
4.3.0 - 该配置被添加

#### `CACHE_REDIS_SENTINEL_MASTER`

要连接的 Redis Sentinel 主节点的名称。

请注意，如果你想使用 Redis Sentinel，你还需要指定 `CACHE_REDIS_SENTINELS`。

**版本历史：**\
4.3.0 - 该配置被添加

#### `CACHE_REDIS_SENTINEL_PORT`

`CACHE_REDIS_SENTINELS` 中给出的 Sentinel 的默认端口。

**版本历史：**\
4.3.0 - 该配置被添加

#### `CACHE_REDIS_SENTINEL_USERNAME`

用于向 Sentinel 进行身份验证的用户名。

**版本历史：**\
4.3.0 - 该配置被添加

#### `CACHE_REDIS_SENTINEL_PASSWORD`

用于向 Sentinel 进行身份验证的密码。

**版本历史：**\
4.3.0 - 该配置被添加

#### `SIDEKIQ_REDIS_HOST`

默认为 `REDIS_HOST` 的值。

#### `SIDEKIQ_REDIS_PORT`

默认为 `REDIS_PORT` 的值。

#### `SIDEKIQ_REDIS_USER`

可选。用于连接 Redis 的用户名。

**版本历史：**\
4.3.0 - 该配置被添加

#### `SIDEKIQ_REDIS_PASSWORD`

可选。用于连接 Redis 的密码。

#### `SIDEKIQ_REDIS_URL`

如果提供，优先于 `SIDEKIQ_REDIS_HOST` 和 `SIDEKIQ_REDIS_PORT`。默认为 `REDIS_URL` 的值。

#### `SIDEKIQ_REDIS_NAMESPACE`

默认为 `REDIS_NAMESPACE` 的值。

#### `SIDEKIQ_REDIS_SENTINELS`

逗号分隔的 Redis Sentinel 实例 HOST:PORT 列表。端口号是可选的，如果省略，它将使用默认值 `26379`。

请注意，如果你想使用Redis Sentinel，你还需要指定`SIDEKIQ_REDIS_SENTINEL_MASTER`。

**版本历史：**\
4.3.0 - 该配置被添加

#### `SIDEKIQ_REDIS_SENTINEL_MASTER`

要连接的 Redis Sentinel 主节点的名称。

请注意，如果你想使用 Redis Sentinel，你还需要指定 `SIDEKIQ_REDIS_SENTINELS`。

**版本历史：**\
4.3.0 - 该配置被添加

#### `SIDEKIQ_REDIS_SENTINEL_PORT`

`SIDEKIQ_REDIS_SENTINELS` 中给出的 Sentinel 的默认端口。

**版本历史：**\
4.3.0 - 该配置被添加

#### `SIDEKIQ_REDIS_SENTINEL_USERNAME`

用于向 Sentinel 进行身份验证的用户名。

**版本历史：**\
4.3.0 - 该配置被添加

#### `SIDEKIQ_REDIS_SENTINEL_PASSWORD`

用于向 Sentinel 进行身份验证的密码。

**版本历史：**\
4.3.0 - 该配置被添加

### Elasticsearch {#elasticsearch}

{{< page-ref page="admin/elasticsearch" >}}

#### `ES_ENABLED`

若配置为 `true`，Mastodon 将使用 Elasticsearch 执行搜索功能。

#### `ES_PRESET`

该变量控制 Elasticsearch 索引配置(分片数量和副本)。

可能的值是：

- `single_node_cluster`(默认)
- `small_cluster`
- `large_cluster`

有关每个设置的详细信息，请查看[Elasticsearch设置页面](../elasticsearch#choosing-the-correct-preset)。

#### `ES_HOST`

Elasticsearch 服务器的主机名。默认为 `localhost`。如果使用 TLS，请在主机名前加上 `https://`。例如：`https://elastic.example.com`。

#### `ES_PORT`

Elasticsearch 服务器的端口。默认为 `9200`

#### `ES_USER`

可选，用于向 Elasticsearch 进行身份验证

#### `ES_PASS`

可选，用于向 Elasticsearch 进行身份验证

#### `ES_PREFIX`

如果Elasticsearch服务器在多个项目或不同的Mastodon服务器之间共享，则很有用。默认为`REDIS_NAMESPACE`的值。

#### `ES_CA_FILE`

覆盖要使用的 CA 捆绑文件。在使用自签名证书时很有用。

**版本历史：**\
4.3.0 - 该配置被添加

### SMTP 电子邮件发件 {#smtp}

#### `SMTP_SERVER`

#### `SMTP_PORT`

#### `SMTP_LOGIN`

#### `SMTP_PASSWORD`

#### `SMTP_FROM_ADDRESS`

#### `SMTP_DOMAIN`

#### `SMTP_DELIVERY_METHOD`

#### `SMTP_AUTH_METHOD`

#### `SMTP_CA_FILE`

#### `SMTP_OPENSSL_VERIFY_MODE`

#### `SMTP_ENABLE_STARTTLS_AUTO`

#### `SMTP_ENABLE_STARTTLS`

可选的值有: `auto` (默认)、 `always` 或 `never`。

**版本历史：**\
4.0.0 - 该配置被添加

#### `SMTP_TLS`

#### `SMTP_SSL`

电子邮件配置基于 Mastodon 所基于的 *Ruby on Rails* 框架的 *action_mailer* 组件。关于 action_mailer 的完整文档可在 [这里](https://guides.rubyonrails.org/action_mailer_basics.html#action-mailer-configuration) 获取。客户端使用 SMTP 或其衍生产品：StartTLS + SMTP 或 SMTPS (使用 TLS 的 SMTP)。

### 基础配置 {#basic}

* `SMTP_SERVER`：指定要使用的服务器。例如 `sub.domain.tld`。
* `SMTP_PORT`：默认值为 `25` (SMTP 的常用端口)。如果检测到 StartTLS，可能会切换到端口 `587`。
* `SMTP_DOMAIN`：仅在需要 HELO 域时才需要。默认将设置为 `SMTP_SERVER` 域。
* `SMTP_FROM_ADDRESS`：指定发件人地址。
* `SMTP_DELIVERY_METHOD`：默认值为 `smtp` (也可以是 `sendmail`)。

### SMTP服务器的身份验证 {#smtpauthentication}

* `SMTP_LOGIN`：SMTP 用户的登录名。
* `SMTP_PASSWORD`：SMTP 用户的密码。
* `SMTP_AUTH_METHOD`：可以是 `plain`(默认；密码以明文传输)、 `login`(密码将被base64编码)或 `cram_md5`。

### 安全 SMTP
默认情况下，将尝试与指定的 SMTP 服务器建立 StartTLS 连接。

* `SMTP_ENABLE_STARTTLS_AUTO`：默认为 `true`。
* `SMTP_CA_FILE`：可以指定一个值，但在许多 Linux 发行版(如基于 Debian 的发行版)中，这将是 `/etc/ssl/certs/ca-certificates.crt`。
* `SMTP_OPENSSL_VERIFY_MODE`：可以是 `none` 或 `peer`。使用 TLS 时，接受带有自签名证书的连接可能很有用。
* `SMTP_TLS`：`true` 或 `false` (默认 `false`)
* `SMTP_SSL`：`true` 或 `false` (默认 `false`)

请注意，目前只有 `TLSv1.3` 和 `TLSv1.2` 被认为是安全的SSL/TLS协议。

### Prometheus指标 {#prometheus}

Mastodon 支持使用 Prometheus 格式公开一些指标，该配置是可选的。

对于 Ruby 进程，它使用 [`prometheus_exporter` gem](https://github.com/discourse/prometheus_exporter)。请参考其文档了解更多详情。

默认情况下，你需要运行 `prometheus_exporter` 服务器(使用 `./bin/prometheus_exporter`)来收集指标并公开它们以供抓取。如果你想更改此行为，请查看 `MASTODON_PROMETHEUS_EXPORTER_LOCAL`。

请注意， Prometheus 格式的指标始终对流服务端启用，并且可以在 `http://streaming-server-host:port/metrics` 访问。

**版本历史：**\
4.4.0 - 该配置被添加对Ruby进程的支持

#### `MASTODON_PROMETHEUS_EXPORTER_ENABLED`

若配置为 `true`， Mastodon 的 Ruby 进程(Web & Sidekiq)将启用 Prometheus 检测。

#### `MASTODON_PROMETHEUS_EXPORTER_WEB_DETAILED_METRICS`

若配置为 `true`，检测服务将收集并公开每个 Web 请求的每个控制器/操作指标。请注意，这可能会导致一些资源开销。

#### `MASTODON_PROMETHEUS_EXPORTER_SIDEKIQ_DETAILED_METRICS`

若配置为 `true`，检测服务将收集并公开每个 Sidekiq 作业的每个作业指标。请注意，这可能会导致一些资源开销。

#### `MASTODON_PROMETHEUS_EXPORTER_LOCAL`

若配置为 `true`，将启动一个进程内服务器来公开指标，而不是尝试将它们发送到外部的 `prometheus_exporter` 服务器。在容器化环境中运行 Sidekiq 时，这可能很有用，以避免外部导出器的开销。指标将在 `http://host:port/metrics` 上公开。

重要提示：这对于多进程服务器(如 Puma)不起作用，因为每个进程都会尝试监听同一个端口并会失败。

#### `PROMETHEUS_EXPORTER_HOST`

如果未启用进程内服务器，指标将发送到该主机(应该运行 `prometheus_exporter` 服务器)。默认为 `localhost`。

#### `PROMETHEUS_EXPORTER_PORT`

如果未启用进程内服务器，指标将发送到该端口(应该运行 `prometheus_exporter` 服务器)。默认为 `9394`。

#### `MASTODON_PROMETHEUS_EXPORTER_HOST`

如果启用了进程内服务器，进程内导出器将监听该主机。默认为`localhost`

#### `MASTODON_PROMETHEUS_EXPORTER_PORT`

如果启用了进程内服务器，进程内导出器将监听该端口。默认为`9394`

### OpenTelemetry {#otel}

Mastodon 支持使用 OpenTelemetry 协议导出跟踪数据。该检测使用标准 OTel Ruby SDK，应该支持[标准 OTel 环境配置变量](https://opentelemetry.io/docs/languages/sdk-configuration/general/)， `OTEL_SERVICE_NAME` 除外(参见下面的`OTEL_SERVICE_NAME_PREFIX`)。Mastodon 目前只提供 OLTP 导出器。

**版本历史：**\
4.3.0 - 添加了对Ruby后端的支持

#### `OTEL_SERVICE_NAME_PREFIX`

OTEL 服务名称的前缀。服务名称将是 `$prefix/web` 和 `$prefix/sidekiq`。默认为`mastodon`。

#### `OTEL_SERVICE_NAME_SEPARATOR`

在区分不同服务时在服务名称中使用的字符。默认为 `/` (即 `mastodon/web`)。


#### `OTEL_EXPORTER_OTLP_ENDPOINT`

发送跟踪的 OLTP 服务器的 URL。如果未设置此变量，则禁用 OpenTelemetry 检测。没有默认值(空值)。

## 文件存储 {#files}

### CDN {#cdn}

#### `CDN_HOST`

你可以从单独的域名(如 CDN(内容分发网络))提供静态资产(徽标、表情符号、 CSS、 JS等)，因为这可以减少用户的加载时间。

示例值： `https://assets.example.com`

{{< hint style="info" >}}
提供文件时必须使用 CORS 标头，否则 Mastodon 的 Web UI 的某些功能将无法工作。例如可以提供如下标头: `Access-Control-Allow-Origin: *`
{{</ hint >}}

### 本地文件存储 {#paperclip}

#### `PAPERCLIP_ROOT_PATH`

#### `PAPERCLIP_ROOT_URL`

### AWS S3和兼容服务 {#s3}

{{< page-ref page="admin/optional/object-storage" >}}

存储桶必须支持访问控制列表 (ACLs)。对于 AWS S3，这意味着将"对象所有权"设置设为"已启用 ACL"。对于 Google Cloud Storage，这意味着将"访问控制"设置设为"细粒度"。

#### `S3_ENABLED`

#### `S3_REGION`

#### `S3_ENDPOINT`

#### `S3_BUCKET`

#### `AWS_ACCESS_KEY_ID`

#### `AWS_SECRET_ACCESS_KEY`

#### `S3_SIGNATURE_VERSION`

#### `S3_OVERRIDE_PATH_STYLE`


#### `S3_PROTOCOL`

#### `S3_HOSTNAME`

#### `S3_ALIAS_HOST`

#### `EXTRA_MEDIA_HOSTS`

**版本历史:**\
4.4.0 - 添加

#### `S3_OPEN_TIMEOUT`

#### `S3_READ_TIMEOUT`

#### `S3_FORCE_SINGLE_REQUEST`

#### `S3_ENABLE_CHECKSUM_MODE`

#### `S3_STORAGE_CLASS`

#### `S3_MULTIPART_THRESHOLD`

#### `S3_PERMISSION`

#### `S3_BATCH_DELETE_LIMIT`

#### `S3_BATCH_DELETE_RETRY`

### Swift {#swift}

#### `SWIFT_ENABLED`

#### `SWIFT_USERNAME`

#### `SWIFT_TENANT`

#### `SWIFT_PASSWORD`

#### `SWIFT_PROJECT_ID`

#### `SWIFT_AUTH_URL`

#### `SWIFT_CONTAINER`

#### `SWIFT_OBJECT_URL`

#### `SWIFT_REGION`

#### `SWIFT_DOMAIN_NAME`

#### `SWIFT_CACHE_TTL`

### HTTP 缓存清除器

若配置，当媒体文件从你的源站被删除或变为不可用时，缓存清除器会发送一个请求来使其缓存失效。这将确保任何已从 Mastodon 中移除的内容都会被从你的缓存层/CDN 中清除。

{{< hint style="info" >}}
实现此目的的方式非常依赖于你的代理/CDN提供商，并且需要配置。如果你使用 nginx 进行 HTTP 缓存，你应该查看 `proxy_cache_purge` 配置指令。
{{</ hint >}}

#### `CACHE_BUSTER_ENABLED`

若配置为 `true`，那么 Mastodon 在删除文件时将向媒体 URL 发送缓存清除请求，以便可以从缓存中清除文件。

默认为 `false`

#### `CACHE_BUSTER_HTTP_METHOD`

默认为 `GET`

#### `CACHE_BUSTER_SECRET_HEADER`

包含 `CACHE_BUSTER_SECRET` 中定义的密钥的标头名称。

默认为空值，表示不会添加标头

#### `CACHE_BUSTER_SECRET`

上面配置的 `CACHE_BUSTER_SECRET_HEADER` 标头的值。

## 外部认证 {#external-authentication}

### OmniAuth

#### `ALLOW_UNSAFE_AUTH_PROVIDER_REATTACH`
允许现有用户使用他们以前未使用过的外部认证提供商登录，前提是他们使用相同的电子邮件地址。如果你想提供用户在不同外部提供商之间迁移的能力，该选项可能很有用，但这会构成潜在的安全风险，如果攻击者设法在你配置的任何提供商上使用要攻击的目标账号的邮件地址创建一个新的身份，就可以劫持该账号。

**版本历史：**\
4.2.6 - 该配置被添加

#### `OMNIAUTH_ONLY`

#### `ONE_CLICK_SSO_LOGIN`
启用`登录或注册`按钮。
对于全部使用单个外部提供商(CAS、SAML或OIDC)进行认证的实例很有用。

启用此功能将阻止匿名会话的缓存。
另外，当使用OIDC发现时，身份提供商必须在 Mastodon 启动前可用。

### LDAP {#ldap}

#### `LDAP_ENABLED`

#### `LDAP_HOST`

#### `LDAP_PORT`

#### `LDAP_METHOD`

#### `LDAP_BASE`

#### `LDAP_BIND_DN`

#### `LDAP_PASSWORD`

#### `LDAP_UID`

#### `LDAP_SEARCH_FILTER`

#### `LDAP_MAIL`

#### `LDAP_UID_CONVERSION_ENABLED`

### PAM {#pam}

#### `PAM_ENABLED`

#### `PAM_EMAIL_DOMAIN`

#### `PAM_DEFAULT_SERVICE`

#### `PAM_CONTROLLED_SERVICE`

### CAS {#cas}

#### `CAS_ENABLED`

#### `CAS_DISPLAY_NAME`

#### `CAS_URL`

#### `CAS_HOST`

#### `CAS_PORT`

#### `CAS_SSL`

#### `CAS_VALIDATE_URL`

#### `CAS_CALLBACK_URL`

#### `CAS_LOGOUT_URL`

#### `CAS_LOGIN_URL`

#### `CAS_UID_FIELD`

#### `CAS_CA_PATH`

#### `CAS_DISABLE_SSL_VERIFICATION`

#### `CAS_UID_KEY`
用于账户的用户名的键。
创建的账户将是`@uid@domain.tld`。

#### `CAS_NAME_KEY`

#### `CAS_EMAIL_KEY`

#### `CAS_NICKNAME_KEY`

#### `CAS_FIRST_NAME_KEY`

#### `CAS_LAST_NAME_KEY`

#### `CAS_LOCATION_KEY`

#### `CAS_IMAGE_KEY`
用作账户头像的图像的键。
此键中的值必须是图像文件的URL。
需使用支持的文件格式(JPEG 或 PNG，而非 SVG)很重要。

#### `CAS_PHONE_KEY`

#### `CAS_SECURITY_ASSUME_EMAIL_IS_VERIFIED`

### SAML {#saml}

#### `SAML_ENABLED`

#### `SAML_ACS_URL`

#### `SAML_ISSUER`

#### `SAML_IDP_SSO_TARGET_URL`

#### `SAML_IDP_CERT`

#### `SAML_IDP_CERT_FINGERPRINT`

#### `SAML_NAME_IDENTIFIER_FORMAT`

#### `SAML_CERT`

#### `SAML_PRIVATE_KEY`

#### `SAML_SECURITY_WANT_ASSERTION_SIGNED`

#### `SAML_SECURITY_WANT_ASSERTION_ENCRYPTED`

#### `SAML_SECURITY_ASSUME_EMAIL_IS_VERIFIED`

#### `SAML_ATTRIBUTES_STATEMENTS_UID`

#### `SAML_ATTRIBUTES_STATEMENTS_EMAIL`

#### `SAML_ATTRIBUTES_STATEMENTS_FULL_NAME`

#### `SAML_ATTRIBUTES_STATEMENTS_FIRST_NAME`

#### `SAML_ATTRIBUTES_STATEMENTS_LAST_NAME`

#### `SAML_UID_ATTRIBUTE`

#### `SAML_ATTRIBUTES_STATEMENTS_VERIFIED`

#### `SAML_ATTRIBUTES_STATEMENTS_VERIFIED_EMAIL`

## 隐藏服务 {#hidden-services}

### TOR {#tor}

{{< page-ref page="admin/optional/tor" >}}

#### `http_proxy`

#### `http_hidden_proxy`

#### `ALLOW_ACCESS_TO_HIDDEN_SERVICE`

## 限制 {#limits}

### 反垃圾信息/滥用

#### `HCAPTCHA_SITE_KEY`
#### `HCAPTCHA_SECRET_KEY`

若配置，注册确认页面将显示验证码，请查看[验证码](https://docs.joinmastodon.org/admin/optional/captcha/)

### 电子邮件域名

#### `EMAIL_DOMAIN_ALLOWLIST`

若配置，将只允许使用指定域名的邮箱注册，**排除**其他所有域名。域名以竖线`|`分隔，例如：`foo.com|bar.com`

#### `EMAIL_DOMAIN_DENYLIST` {{%deprecated%}}

若配置，将不允许使用指定域名的邮箱注册。域名以竖线`|`分隔，例如：`foo.com|bar.com`

{{< hint style="warning" >}}
此选项已被弃用。你可以通过管理界面或`tootctl`命令行界面动态调整邮箱域名阻止列表。
{{</ hint >}}

### 会话

#### `MAX_SESSION_ACTIVATIONS`

定义每个用户允许的浏览器会话的最大数量，默认为 10。如果创建了一个新的浏览器会话并且超出了限制，则最旧的会话将被删除，导致用户从该会话中注销。

### 主页提要

#### `USER_ACTIVE_DAYS`

Mastodon 在 RAM 中存储主页信息流(具体而言，信息流存储于 Redis 数据库中)。这使得它们可以被非常快速地访问和更新，但这也意味着如果它们不被使用，你可能不希望把它们保留在那里，而且你可能不想花费资源将新条目插入到不会被访问的主页信息流中。因此， Mastodon 会定期清除一段时间内未上线的用户的主页信息流，如果他们重新出现，服务端会从数据库数据中重新生成这些主页信息流。默认情况下，如果用户在过去 `7` 天内上线，则被视为活跃用户。

主页信息流的重新生成在计算上是昂贵的，如果你的 Sidekiq 不断地执行这项工作，是因为你的用户每3天上线一次，但你的 `USER_ACTIVE_DAYS` 设置为2，那么请考虑调整它。

{{< hint style="info" >}}
此设置与用于统计目的的活跃用户数(例如月活跃用户数)判定无关。
{{</ hint >}}

## 其他 {#other}

### 数据库迁移 {#migrations}

#### `SKIP_POST_DEPLOYMENT_MIGRATIONS`

此变量仅在运行 `rake db:migrate` 时有效，它只与 Mastodon 升级过程有关。有两种类型的数据库迁移，一种是在新代码部署和运行之前运行的，另一种是在之后运行的。默认情况下，这两种类型的迁移都会执行。如果你在运行迁移之前关闭了所有 Mastodon 进程，那么就没有区别。该变量对于零停机时间升级是有意义的。在特定 Mastodon 版本的升级说明中，你将看到是否需要使用它。

### 数据库加密支持

必须设置以下三个环境变量才能启用 Rails 中的 Active Record 加密功能， Mastodon 使用该功能来加密和解密某些数据库属性。

- `ACTIVE_RECORD_ENCRYPTION_PRIMARY_KEY`
- `ACTIVE_RECORD_ENCRYPTION_DETERMINISTIC_KEY`
- `ACTIVE_RECORD_ENCRYPTION_KEY_DERIVATION_SALT`

**版本历史：**\
4.3.0 - 该配置被添加

### StatsD(在4.3.0中移除) {#statsd}

{{< hint style="danger" >}}
StatsD 支持在 Mastodon 4.2.0 中已弃用，并在 4.3.0 中被完全移除。
{{< /hint >}}

#### `STATSD_ADDR`

若配置， Mastodon 将把一些事件和指标记录到由其主机名和端口标识的StatsD实例中。

示例值：`localhost:8125`

#### `STATSD_NAMESPACE`

若配置，所有 StatsD 键将以此为前缀。当 `RAILS_ENV` 为 `production` 时默认为 `Mastodon.production`，当为 `development` 时默认为 `Mastodon.development`，等等。

#### `STATSD_SIDEKIQ`

若配置为 `true`，Mastodon 将一些 Sidekiq 指标记录到 StatsD 中。默认为 `false`。

### 未分类或未排序

#### `BUNDLE_GEMFILE`

#### `DEEPL_API_KEY`

#### `DEEPL_PLAN`

#### `ENABLE_SIDEKIQ_UNIQUE_JOBS_UI`

启用 `sidekiq-unique-jobs` 的 Web 界面。这可以用于查看和清除此 gem 管理的锁，但在实践中很少有用，并且过去存在过关键的安全漏洞。
如果你只需要清除所有锁，你现在可以使用新添加的 `bundle exec rake sidekiq_unique_jobs:delete_all_locks`。

**版本历史：**\
4.2.6 - 该配置被添加

#### `LIBRE_TRANSLATE_ENDPOINT`

#### `LIBRE_TRANSLATE_API_KEY`

#### `GITHUB_REPOSITORY`

默认为 `mastodon/mastodon`

#### `SOURCE_BASE_URL`

默认为`https://github.com/$GITHUB_REPOSITORY`

#### `FFMPEG_BINARY`

默认为空值(未启用)

#### `LOCAL_HTTPS`

#### `PATH`

#### `MAX_FOLLOWS_THRESHOLD`

默认为 `7500`

#### `MAX_FOLLOWS_RATIO`

默认为 `1.1`

#### `IP_RETENTION_PERIOD`

默认为 `31536000`(1年)

#### `SESSION_RETENTION_PERIOD`

默认为 `31536000`(1年)

#### `BACKTRACE`

设置为 `1` 以允许回溯 Rails 框架代码。

#### `DISABLE_SIMPLECOV`

#### `EMAIL_DOMAIN_LISTS_APPLY_AFTER_CONFIRMATION`

#### `DISABLE_FOLLOWERS_SYNCHRONIZATION`

#### `MAX_REQUEST_POOL_SIZE`

默认为 `512`。

#### `GITHUB_API_TOKEN`

用于从 GitHub 提交历史生成 `AUTHORS.md` 的 rake 任务。

{{< translation-status-zh-cn raw_title="Configuring your environment" raw_link="/admin/config/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}
