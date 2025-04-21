---
title: 对象存储
description: 使用外部对象存储来存储 Mastodon 中用户上传的文件
menu:
  docs:
    weight: 15
    parent: admin-optional
---

用户上传的文件可以存储在主服务器的文件系统中，或者使用外部对象存储服务器。使用外部对象存储对于扩展 Mastodon 实例来说可能是必需的。

## 使用文件系统 {#FS}

最简单的存储用户上传文件的方式是使用服务器的文件系统。这是默认的工作方式，适用于小型服务器。

默认情况下， Mastodon 会将文件上传存储在安装目录下的 `public/system` 文件夹中，但可以通过使用 `PAPERCLIP_ROOT_PATH` 环境变量来覆盖此设置。

默认情况下，这些文件可以通过 `https://your-domain/system` 访问，可以使用 `PAPERCLIP_ROOT_URL` 和 `CDN_HOST` 来覆盖此访问路径。

{{< hint style="info" >}}
虽然使用服务器的文件系统对小型服务器来说完全可用，但使用外部对象存储更具可扩展性。
{{</ hint >}}

{{< hint style="danger" >}}
必须配置 Web 服务器，使其能够提供这些文件，但不允许列出它们（也就是说 `https://your-domain/system/` 不应返回文件列表）。如果你使用与 Mastodon 一起分发的配置文件，情况应该就是这样，但最好再次检查一下。
{{</ hint >}}

## 兼容 S3 的对象存储后端 {#S3}

Mastodon 可以使用兼容 S3 的对象存储后端。 建议支持 ACL，因为 ACL 允许 Mastodon 快速地让被封禁用户的媒体附件不可用，或略微提高私有数据的安全性。

Mastodon 使用 S3 API (`S3_REGION`, `S3_ENDPOINT`, `S3_BUCKET`,
`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `S3_SIGNATURE_VERSION`,
`S3_OVERRIDE_PATH_STYLE`) 进行所有的写入、删除和权限修改操作。这包括媒体上传（来自 Web 界面、 Mastodon API 客户端和 ActivityPub 服务器）、媒体删除（贴文被编辑或删除时）以及阻止对媒体的访问（当帐户被暂停时）。

Mastodon 会向 Web 界面、Mastodon API 客户端和 ActivityPub 服务器发送 URL，用于所有“读取”操作。因此，这些操作是匿名的（不需要身份验证或授权），并使用纯 HTTP GET 方法，这意味着它们可以通过反向代理和 CDN 路由并被缓存。 这也意味着这些 URL 可以包含与 S3 存储提供商本身使用的主机/域名完全不同的主机/域名（根据需要）。 请查看下面的详细文档，其中描述了如何构造这些 URL 以及涉及哪些环境变量。

要启用 S3 存储，请将 `S3_ENABLED` 环境变量设置为 `true`。

### 用于 S3 API 访问的环境变量

- `S3_REGION` (默认为 'us-east-1'，如果使用 AWS S3 则必需提供，使用其他存储提供商可能不需要)
- `S3_ENDPOINT` (默认为 'https://s3.<S3_REGION>.amazonaws.com'， 如果不使用 AWS S3 则必需提供)
- `S3_BUCKET=mastodata` (将 `mastodata` 替换为你的存储桶名称)
- `AWS_ACCESS_KEY_ID` 和 `AWS_SECRET_ACCESS_KEY` 需要设置为你的凭据
- `S3_SIGNATURE_VERSION` (默认为 'v4'，应该与大多数存储提供商兼容)
- `S3_OVERRIDE_PATH_STYLE` (仅当配置了 `S3_ENDPOINT` 时使用， 如果存储提供商要求将 API 操作发送到 '<S3_BUCKET>.<S3_ENDPOINT>`（域名样式），请将其设置为 `true`)

### 用于客户端访问媒体对象的环境变量

- `S3_PROTOCOL` (默认为 `https`)
- `S3_HOSTNAME` (默认为 's3-<S3_REGION>.amazonaws.com'， 如果不使用 AWS S3 且未设置 `S3_ALIAS_HOST`，则为必需)
- `S3_ALIAS_HOST` (如果你不希望 `S3_BUCKET` 包含在媒体 URL 中，可以使用 `S3_ALIAS_HOST` 代替 `S3_HOSTNAME`， 这需要你在存储提供商前面配置一个反向代理或 CDN)

如上所述，当客户端需要从存储提供商访问媒体对象时，Mastodon 将向客户端发送 URL。 这些 URL 构造如下：

- 如果未设置 `S3_ALIAS_HOST`，则 URL 将为 '<S3_PROTOCOL>://<S3_HOSTNAME>/<S3_BUCKET>/\<对象路径\>'

- 如果设置了 `S3_ALIAS_HOST`，则 URL 将为 '<S3_PROTOCOL>://<S3_ALIAS_HOST>/\<对象路径\>'

注意，当设置了 `S3_ALIAS_HOST` 时，存储桶名称 **不** 包含在生成的 URL 中； 这意味着存储桶名称必须包含在 `S3_ALIAS_HOST` 中（称为“域名样式”对象访问），或者 `S3_ALIAS_HOST` 必须指向一个反向代理或 CDN，它可以将存储桶名称包含在用于将请求发送到存储提供商的 URL 中。 这种类型的配置允许你从实例的客户端“隐藏”存储提供商，这意味着你可以更改存储提供商，而无需更改生成的 URL。

除隐藏存储提供商之外，这还可以让你在从存储提供商拉取媒体后缓存媒体，从而降低存储提供商的出口带宽成本。 这可以在你自己的反向代理中完成，也可以通过使用 CDN 来完成。

`EXTRA_MEDIA_HOSTS` 允许你追加一组额外的域名，这些域名将被允许为你的实例提供媒体资源。如果你在自定义 CSS 或关于页面中包含了外部媒体，或者你的数据存储提供商会重定向到其他域名时，这个设置非常有用。  
例如：`EXTRA_MEDIA_HOSTS=https://data.example1.com,https://data.example2.com`

{{< page-ref page="admin/optional/object-storage-proxy.md" >}}

{{< hint style="info" >}}
你必须使用 CORS 标头来提供文件，否则 Mastodon Web UI 的某些功能将无法正常工作。 例如，`Access-Control-Allow-Origin: *`
{{</ hint >}}

### 可选环境变量

#### `S3_OPEN_TIMEOUT`

默认值：5 (秒)

HTTP 处理程序在尝试打开新的 HTTP 会话时应超时的秒数。

#### `S3_READ_TIMEOUT`

默认值：5 (秒)

HTTP 处理程序在等待 HTTP 响应时应超时的秒数。

#### `S3_FORCE_SINGLE_REQUEST`

默认值：false

如果你在处理大型文件时遇到问题，请将其设置为 `true`。

#### `S3_ENABLE_CHECKSUM_MODE`

默认值：false

使在 Mastodon 从存储提供商检索对象时验证对象校验和。 此功能在 AWS S3 中可用，但在其他兼容 S3 的实现中可能不可用。

#### `S3_STORAGE_CLASS`

默认值：none

当使用 AWS S3 时，此变量可以设置为 [存储类](https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html) 的其中一个选项，这些选项会影响所选的用于上传对象的存储（以及它们的访问时间和成本）。 如果未指定存储类，则 AWS S3 将使用 `STANDARD` 类，但选项包括 `REDUCED_REDUNDANCY`、`GLACIER` 等。

#### `S3_MULTIPART_THRESHOLD`

默认值：15 (兆字节)

此大小及以下的对象将以单个操作上传，但更大的对象将使用多部分分块机制上传，这可以提高传输速度和可靠性。

#### `S3_PERMISSION`

默认值：`public-read`

定义上传新文件时的 S3 对象 ACL。 使用 [S3 阻止公共访问](https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-control-block-public-access.html) 并启用 `BlockPublicAcls` 选项时请谨慎，因为使用 ACL `public-read` 上传对象将失败 (403)。 在这种情况下，需将 `S3_PERMISSION` 设置为 `private`。

{{< hint style="danger" >}}
无论 ACL 配置如何，你的 S3 存储桶都必须设置为确保所有对象都是公共可读，但不可写或可列出。 同时，Mastodon 本身应该对存储桶具有写入权限。 此配置通常在所有 S3 提供商中保持一致，常用提供商在本指南后面会重点介绍。
{{</ hint >}}

#### `S3_BATCH_DELETE_LIMIT`

默认值: `1000`

官方的 [Amazon S3 API](https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteObjects.html) 可以处理在一个批处理作业中删除 1,000 个对象，但一些提供商可能在处理一个请求中的这么多对象时遇到问题，或者提供更低的限制。

#### `S3_BATCH_DELETE_RETRY`

默认值: 3

在批处理删除操作期间，S3 提供商可能会在处理删除请求时周期性地失败或超时。 Mastodon 会退避并重试该请求，直到达到最大重试次数。

### MinIO

MinIO 是 S3 对象提供程序的开源实现。 本节不介绍如何安装它，而是介绍如何配置存储桶以在 Mastodon 中使用。

你需要为匿名访问设置一个策略，该策略允许对存储桶包含的对象进行只读访问，而不允许列出它们。

为此，你需要设置一个自定义策略（将 `mastodata` 替换为你的 S3 存储桶的实际名称）：
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "AWS": [
                    "*"
                ]
            },
            "Action": [
                "s3:GetObject"
            ],
            "Resource": [
                "arn:aws:s3:::mastodata/*"
            ]
        }
    ]
}
```

Mastodon 本身需要能够写入存储桶，因此请使用你的 MinIO 管理员帐户（不建议）或附加以下策略的 Mastodon 专用帐户（建议）（将 `mastodata` 替换为你的 S3 存储桶的实际名称）：
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "s3:*",
            "Resource": "arn:aws:s3:::mastodata/*"
        }
    ]
}
```

你可以通过 MinIO 控制台（基于 Web 的用户界面）或命令行客户端 (`mcli` / `mc`) 设置这些策略。

#### 使用 MinIO 控制台

连接到 MinIO 控制台 Web 界面并创建一个新存储桶（或导航到你现有的存储桶）：
![](/assets/object-storage/minio-bucket.png)

然后，将“访问策略”配置为允许读取访问 (`s3:GetObject`) 而未写入访问或列出对象的能力的自定义策略（见上文）：
![](/assets/object-storage/minio-access-policy.png)

{{< hint style="info" >}}
如果 MinIO 控制台不允许你设置“自定义”策略，则可能需要更新 MinIO。 如果你在 *独立* 或 *文件系统* 模式下使用 MinIO，则 [`RELEASE.2022-10-24T18-35-07Z`](https://github.com/minio/minio/releases/tag/RELEASE.2022-10-24T18-35-07Z) 应该是一个安全的更新版本，不需要 [涉及迁移过程](https://min.io/docs/minio/linux/operations/install-deploy-manage/migrate-fs-gateway.html#migrate-from-gateway-or-filesystem-mode)。
{{< /hint >}}

新建一个 `mastodon-readwrite` 策略（见上文）：
![](/assets/object-storage/minio-mastodon-readwrite.png)

最后，使用 `mastodon-readwrite` 策略创建一个新的 `mastodon` 用户：
![](/assets/object-storage/minio-mastodon-user.png)

#### 使用命令行实用程序

使用 [MinIO 客户端](https://min.io/docs/minio/linux/reference/minio-mc.html) 命令行实用程序（可以根据安装位置调用 `mc` 或 `mcli`）也可以实现相同的目的。

创建一个新存储桶：
`mc mb myminio/mastodata`

将上面的匿名访问策略保存为 `anonymous-readonly-policy.json`，并将 Mastodon 用户访问策略保存为 `mastodon-readwrite.json`（确保将 `mastodata` 替换为你新创建的存储桶的名称）。

设置存储桶的匿名访问策略：
`mc anonymous set-json anonymous-readonly-policy.json myminio/mastodata`

添加 `mastodon-readwrite` 策略:
`mc admin policy add myminio mastodon-readwrite mastodon-readwrite.json`

添加 `mastodon` 用户（替换密码）：
`mc admin user add myminio mastodon SECRET_PASSWORD`

将 `mastodon-readwrite` 策略应用到 `mastodon` 用户：
`mc admin policy set myminio mastodon-readwrite user=mastodon`

### Wasabi 对象存储

创建一个新存储桶并定义其策略，允许对象进行匿名读取但不可列出：
```json
{
   "Version": "2012-10-17",
   "Statement": [
      {
         "Effect": "Allow",
         "Principal": {
           "AWS": "*"
         },
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::mastodata/*"
      }
   ]
}
```

![](/assets/object-storage/wasabi-access-policy.png)

{{< hint style="info" >}}
如果你使用旧存储桶，请确保你没有通过 Wasabi 的旧版访问控制设置授予“所有人”读取对象的权限，因为该设置允许列出对象并优先于上面定义的 IAM 策略。

![](/assets/object-storage/wasabi-access-control.png)
{{< /hint >}}

然后，创建一个 `mastodon-readwrite` 策略以授予对你的存储桶的读写访问权限：
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "s3:*",
            "Resource": "arn:aws:s3:::mastodata/*"
        }
    ]
}
```

![](/assets/object-storage/wasabi-mastodon-readwrite.png)

最后，创建一个新的 `mastodon` 用户，并且不要忘记启用 `mastodon-readwrite` 策略：
![](/assets/object-storage/wasabi-mastodon-user.png)

在 Mastodon 端，你需要设置`S3_FORCE_SINGLE_REQUEST=true`来正确处理大型上传。

### DigitalOcean Spaces

在你的 DigitalOcean Spaces 存储桶中，确保“文件列表”对于拥有访问密钥的用户是“受限制的”。

![](/assets/object-storage/do-spaces.png)

### Scaleway

如果你想使用 Scaleway 对象存储，我们强烈建议你创建一个专用于 Mastodon 实例资产的 Scaleway 项目，并使用自定义 IAM 策略。

首先，创建一个新的 Scaleway 项目，在其中创建对象存储桶。 你需要将存储桶的可见性设置为“私有”，以不允许列出对象。

![](/assets/object-storage/scaleway-bucket.png)

现在你的存储桶已创建，你需要创建 API 密钥，以便在你的 Mastodon 实例配置中使用。

前往 IAM 设置（在你的组织菜单中，屏幕的右上角），然后创建一个新的 IAM 策略（例如 `mastodon-media-access`）

![](/assets/object-storage/scaleway-policy.jpg)

此策略需要有一个规则，允许它在你上面创建的 Scaleway 项目（作用域）中读取、写入和删除对象。

![](/assets/object-storage/scaleway-policy-rules.jpg)

然后前往 IAM 应用程序页面，创建一个新的应用程序（例如 `my-mastodon-instance`），并选择你上面创建的策略。

最后，单击你创建的应用程序，然后单击“API 密钥”，并创建一个新的 API 密钥，以便在你的实例配置中使用。 你应该使用“是，设置首选项目”选项，并选择你上面创建的项目作为此密钥的默认项目。

![](/assets/object-storage/scaleway-api-key.png)

复制 Access Key ID 和 Secret，并将它们用于你的 `AWS_ACCESS_KEY_ID` 和 `AWS_SECRET_ACCESS_KEY` 这两个 Mastodon 配置变量。

### Exoscale

在 Exoscale 中，你的存储桶不应有任何读取 ACL（Mastodon 将根据需要在对象本身上设置 ACL）。

你需要为 Mastodon 应用程序创建一个 API 密钥，该密钥限于对象存储 (`sos`) 服务，限于你的存储桶，并且操作不受限制。

![](/assets/object-storage/exoscale.png)

在 Mastodon 端，你需要设置`S3_FORCE_SINGLE_REQUEST=true`才能正确处理大型上传。

### Cloudflare R2

Cloudflare R2 不支持 ACL，因此需要指示 Mastodon 不尝试设置他们。 为此，需要将 `S3_PERMISSION` 环境变量设置为空字符串。

{{< hint style="warning" >}}
如果不支持 ACL，被封禁的用户的媒体文件仍然可以访问。
{{< /hint >}}

要获取在 Mastodon 中使用的凭据，请选择“管理 R2 API 令牌”并创建一个新的 API 令牌，具有“编辑”权限。

{{< hint style="warning" >}}
本节正在建设中。
{{< /hint >}}


{{< translation-status-zh-cn raw_title="Object storage" raw_link="/admin/optional/object-storage/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}
