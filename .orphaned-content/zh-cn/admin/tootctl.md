---
title: 使用管理命令行
summary: 可以从命令行运行tootctl命令
menu:
  docs:
    weight: 60
    parent: admin
---
---

Mastodon的命令行界面是一个位于Mastodon根目录内`bin`目录中的名为`tootctl`的可执行文件。你必须通过`RAILS_ENV`环境变量指定你执行时打算使用的环境。除非你是在本地计算机上进行开发工作，否则你需要使用`RAILS_ENV=production`。如果你确信永不使用其它环境（开发、测试），为了方便起见，你可以把它添加到 `.bashrc` 文件，例如：

```bash
echo "export RAILS_ENV=production" >> ~/.bashrc
```

如果这样，便无需在每次执行时指定它。否则，通常会这样调用 `tootctl` 命令（假定你的Mastodon代码位于`/home/mastodon/live`）：

```bash
cd /home/mastodon/live
RAILS_ENV=production bin/tootctl help
```

## 基础命令

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/lib/mastodon/cli/base.rb" caption="lib/mastodon/cli/base.rb" >}}

### `tootctl self-destruct` {#self-destruct}

通过向所有己知实例广播帐户删除通告，将本服务器从联邦宇宙抹除。此命令允许Mastodon服务器“干净退出（clean exit）”，即几乎不在其它服务器留下任何缓存。此命令始终是交互式的，且需要二次确认。

实际上，不会删除任何本地数据，因为直接清空数据库或删除整个VPS更快。如果你运行此命令后，无论如何都要继续运营实例，状态不匹配可能导致与其它站点互联时出错。

{{< hint style="danger" >}}
**运行此命令之前，请确保你确实知道自己正在做什么。**此操作**不**可逆，并且可能花费很长时间。完成此命令之后，服务器将处于**破碎状态**（BROKEN STATE）。需要一个运行中的Sidekiq进程，所以在队列完全被清空之前不要关闭服务器。
{{< /hint >}}

**版本历史：**
* 2.8.0 - 被加入

| 选项 | 描述 |
| :--- | :--- |
| `--dry_run` | 仅打印预期结果，而不执行任何操作。 |

### `tootctl --version` {#version}

展示目前运行的Mastodon实例版本。

**版本历史：**
* 2.7.0 - 被加入

## 帐户相关命令 {#accounts}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/lib/mastodon/cli/accounts.rb" caption="lib/mastodon/cli/accounts.rb" >}}

### `tootctl accounts rotate` {#accounts-rotate}

生成并广播新的RSA密钥，作为安全维护的一部分。

**版本历史：**
* 2.5.0 - 被加入

| 选项 | 描述 |
| :--- | :--- |
| `USERNAME` | 本地帐户用户名 |
| `--all` | 轮替所有本地帐户密钥，可取代 USERNAME。 |

### `tootctl accounts create` {#accounts-create}

创建一个给定用户名（USERNAME）和给定电子邮件地址（--email）的新帐户。

**版本历史：**
* 2.6.0 - 被加入

| 选项 | 描述 |
| :--- | :--- |
| `USERNAME`      | 新帐户的本地用户名。 必须的。 |
| `--email EMAIL` | 要附加到用户的电子邮件地址。 必须的。 |
| `--confirmed`   | 跳过发送确认邮件步骤并立即激活帐户。 |
| `--role ROLE`   | 设定新用户的身份为 `user`, `moderator` 或 `admin`。默认为 `user`。 |
| `--reattach`    | 重用已被删除帐户的旧用户名。 |
| `--force`       | 强制删除使用此用户名（USERNAME）的现有帐户，然后重新的新帐户代替（刚刚删除的）该帐户。 |
| `--skip-sign-in-token` | 强制跳过该用户登录时的邮件验证码（目前这是不可逆操作）。 |

### `tootctl accounts modify` {#accounts-modify}

修改某帐户的身份，电子邮箱地址，激活状态，审核状态及禁用双因素认证（2FA）。

**版本历史：**
* 2.6.0 - 被加入

| 选项 | 描述 |
| :--- | :--- |
| `USERNAME` | 本地帐户的用户名。 必须的。 |
| `--role ROLE` | 设定该帐户的身份为 `user`, `moderator` 或 `admin`。 |
| `--email EMAIL` | 将该帐户电子邮箱地址改为 EMAIL。 |
| `--confirm` | 跳过邮件确认步骤，当使用 --email 时可用。 |
| `--disable` | 禁止 USERNAME 帐户登录。 |
| `--enable` | 允许 USERNAME 帐户登录，如果该帐户目前被禁止登录。 |
| `--approve` | 审核通过该帐户，如果你的实例为审核制。 |
| `--disable_2fa` | 移除额外认证因素，允许只用密码登录。 |
| `--reset-password` | 重置此用户的密码，将用一个随机生成的字符串作为临时密码。 |
| `--skip-sign-in-token` | 强制跳过该用户登录时的邮件验证码（目前这是不可逆操作）。 |

### `tootctl accounts delete` {#accounts-delete}

删除给定 USERNAME 的用户帐户。

**版本历史：**
* 2.6.0 - 被加入

| 选项 | 描述 |
| :--- | :--- |
| `USERNAME` | 本地帐户的用户名。 必须的。 |

### `tootctl accounts backup` {#accounts-backup}

请求给定 USERNAME 帐户的备份。备份将会被 Sidekiq 异步创建，创建完成后用户将接收到一封带有备份链接的电子邮件。

**版本历史：**
* 2.6.0 - 被加入

| 选项 | 描述 |
| :--- | :--- |
| `USERNAME` | 本地帐户的用户名。 必须的。 |

### `tootctl accounts cull` {#accounts-cull}

移除不在存在的远程帐户。查询数据库中的所有远程帐户，以确认其是否仍存在于原有服务器，如果不存在，那么该帐户将从数据库中删除。在远程服务器刚刚下线的情况下，最近一周有活动痕迹的帐户将被排除在检测范围之外。

**版本历史：**
* 2.6.0 - 被加入
* 2.8.0 - 加入 `--dry_run`

| 选项 | 描述 |
| :--- | :--- |
| `--concurrency N` | 执行该任务的worker数。默认N=5。 |
| `--dry_run` | 仅打印预期结果，而不执行任何操作。 |

### `tootctl accounts refresh` {#accounts-refresh}

重新拉取一个或多个远程帐户的数据与文件。

**版本历史：**
* 2.6.0 - 被加入

| 选项 | 描述 |
| :--- | :--- |
| `USERNAME` | 远程用户名 |
| `--all` | 刷新所有远程帐户，可取代 USERNAME。 |
| `--domain DOMAIN` | 仅操作此域名 DOMAIN 下的远程帐户。可取代 USERNAME。 |
| `--concurrency N` | 执行该任务的worker数。默认N=5。 |
| `--verbose` | 任务进行时，打印额外信息。 |
| `--dry_run` | 仅打印预期结果，而不执行任何操作。 |

### `tootctl accounts follow` {#accounts-follow}

迫使所有本地帐户关注给定本地帐户。

**版本历史：**
* 2.7.0 - 被加入
* 3.0.0 - 使用 USERNAME 取代 ACCT

| 选项 | 描述 |
| :--- | :--- |
| `USERNAME` | 本地用户名 |
| `--concurrency N` | 执行该任务的worker数。默认N=5。 |
| `--verbose` | 任务进行时，打印额外信息。 |

### `tootctl accounts unfollow` {#accounts-unfollow}

迫使所有本地帐户取消关注给定帐户。

**版本历史：**
* 2.7.0 - 被加入

| 选项 | 描述 |
| :--- | :--- |
| `ACCT` | `username@domain` 地址 |
| `--concurrency N` | 执行该任务的worker数。默认N=5。 |
| `--verbose` | 任务进行时，打印额外信息。 |

### `tootctl accounts reset-relationships` {#accounts-reset-relationships}

重置某本地帐户所有正在关注和/或关注者。

**版本历史：**
* 2.8.0 - 被加入

| 选项 | 描述 |
| :--- | :--- |
| `USERNAME` | 本地用户名 |
| `--follows` | 迫使 USERNAME 取消关注所有人后，再重新关注他们。 |
| `--followers` | 移除 USERNAME 的所有关注者。 |

### `tootctl accounts approve` {#accounts-approve}

当实例为审核制时，审核通过新注册者。

**版本历史：**
* 2.8.0 - 被加入

| 选项 | 描述 |
| :--- | :--- |
| `USERNAME` | 审核通过这个用户名的待审核帐户。 |
| `--number N` | 审核通过最近N个注册者。 |
| `--all` | 审核通过所有待审核帐户。 |

## 缓存相关命令 {#cache}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/lib/mastodon/cli/cache.rb" caption="lib/mastodon/cli/cache.rb" >}}

### `tootctl cache clear` {#cache-clear}

清除缓存存储。

**版本历史：**
* 2.8.1 - 被加入

### `tootctl cache recount` {#cache-recount}

通过从头开始进行引用计数，更新指定类型的硬缓存计数。此操作可能会花费很长时间才能完成，这取决于你的数据库大小。帐户将刷新正在关注数、关注者数、嘟文数。嘟文将刷新回复数、转发数及喜爱数。

**版本历史：**
* 3.0.0 - 被加入

| 选项 | 描述 |
| :--- | :--- |
| TYPE | `accounts` 或 `statuses` |
| `--concurrency N` | 执行该任务的worker数。默认N=5。 |
| `--verbose` | 任务进行时，打印额外信息。 |

## 域名相关命令 {#domains}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/lib/mastodon/cli/domains.rb" caption="lib/mastodon/cli/domains.rb" >}}

### `tootctl domains purge` {#domains-purge}

移除给定域名的所有帐号，不留下任何纪录。与封禁（suspension）不同，如果该域名（DOMAIN）仍存在，这意味着如果该域名上的帐户被再次解析，帐户将重新回来。

**版本历史：**
* 2.6.0 - 被加入
* 2.8.0 - 加入 `--whitelist_mode`
* 2.9.0 - 同时移除自定义emoji
* 3.0.0 - 可同时接受多个域名

| 选项 | 描述 |
| :--- | :--- |
| `DOMAIN[...]` | 要移除的域名（Domains），使用空格进行分隔。 |
| `--whitelist_mode` | 可取代 DOMAIN。不是移除单一域名，而是从数据库移除所有来自非白名单站点的帐户。启用白名单模式并完成白名单设定后运行此命令。 |
| `--concurrency N` | 执行该任务的worker数。默认为5。 |
| `--verbose` | 任务进行时，打印额外信息。 |
| `--dry_run` | 仅打印预期结果，而不执行任何操作。 |

### `tootctl domains crawl` {#domains-crawl}

通过使用Mastodon REST API，爬取API暴露的所有节点，收集这些节点的统计数字（只要这些节点支持相关API），来爬取已知联邦宇宙。当没有给定 START 时，此命令将使用服务器数据库中的已知节点作为爬取的种子。返回总实例数、总注册帐户数、最近一周内的总活跃帐户数、最近一周内新加入的总帐户数。

**版本历史：**
* 2.7.0 - 被加入
* 3.0.0 - 加入 `--exclude_suspended`

| 选项 | 描述 |
| :--- | :--- |
| START | 可选的，从一个不同域名开始。 |
| `--concurrency N` | 执行该任务的worker数。默认为50。 |
| `--format FORMAT` | 控制数据的返回方式。`summary`将打印一个总结。`domains`将返回以换行符分隔的所有已发现节点列表。`json`将输出原始数据汇总。默认为`summary`。 |
| `--exclude_suspended` | 输出中不包括已被你封禁的域名，子域名也将包括内。 |

## Emoji相关命令 {#emoji}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/lib/mastodon/cli/emoji.rb" caption="lib/mastodon/cli/emoji.rb" >}}

### `tootctl emoji import` {#emoji-import}

从一个给定路径的 .tar.gz 存档中导入自定义emoji。存档中包含的PNG、GIF文件不能大于50KB，emoji短代码（shortcode）将被设为去除扩展名后的文件名，可以使用选项附加前缀与后缀。

**版本历史：**
* 2.5.0 - 被加入

| 选项 | 描述 |
| :--- | :--- |
| `PATH` | 含图片的 .tar.gz 存档文件的路径。 |
| `--prefix PREFIX` | 在生成的短代码开头附加前缀 PREFIX。 |
| `--suffix SUFFIX` | 在生成的短代码结尾附加后缀 SUFFIX。 |
| `--overwrite` | 不是跳过已存在的emoji，而是覆盖同名短代码的emoji。 |
| `--unlisted` | 导入的emojis将不在emoji选择器中出现，但仍能通过它们的短代码来使用。 |
| `--category CATEGORY` | 导入的emoji在选择器的将会分组至 CATEGORY。 |

### `tootctl emoji purge` {#emoji-purge}

移除所有自定义emoji。

**版本历史：**
* 2.8.0 - 被加入
* 3.1.0 - 加入 `--remote_only`

| 选项 | 描述 |
| :--- | :--- |
| `--remote_only` | 如果被提供，将仅移除远程实例。 |

## 时间流（Feeds）相关命令 {#feeds}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/lib/mastodon/cli/feeds.rb" caption="lib/mastodon/cli/feeds.rb" >}}

### `tootctl feeds build` {#feeds-build}

为某个或所有用户构建主页（home）和列表（list）时间流。时间流将从数所库中构建，并使用Redis缓存于内存中。Mastodon 自动管理激活用户的主页时间流。

**版本历史：**
* 2.6.0 - 被加入

| 选项 | 描述 |
| :--- | :--- |
| `USERNAME` | 要被生成时间流的本地用户名。 |
| `--all` | 刷新所有本地用户的时间流，可取代 USERNAME。 |
| `--concurrency N` | 执行该任务的worker数。默认N=5。 |
| `--verbose` | 任务进行时，打印额外信息。 |
| `--dry_run` | 仅打印预期结果，而不执行任何操作。 |

### `tootctl feeds clear` {#feeds-clear}

从Redis中移除所有主页和列表时间流。

**版本历史：**
* 2.6.0 - 被加入

## 媒体相关命令 {#media}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/lib/mastodon/cli/media.rb" caption="lib/mastodon/cli/media.rb" >}}

### `tootctl media remove` {#media-remove}

移除本地缓存的其它实例媒体附件。

**版本历史：**
* 2.5.0 - 被加入
* 2.6.2 - 显示被释放的硬盘空间

| 选项 | 描述 |
| :--- | :--- |
| `--days` | 多久之前的媒体附件将会被清理。默认为7天。 |
| `--concurrency N` | 执行该任务的worker数。默认为5。 |
| `--verbose` | 任务进行时，打印额外信息。 |
| `--dry_run` | 仅打印预期结果，而不执行任何操作。 |

### `tootctl media remove-orphans` {#media-remove-orphans}

扫描出不属于任何媒体附件的文件并移除他们。请注意，某些存储提供商会对列出对象所必需的API收取费用。另外，此操作需要遍历每个文件，因此速度很慢。

**版本历史：**
* 3.1.0 - 被加入

| 选项 | 描述 |
| :--- | :--- |
| `--start_after` | 循环开始的附件key值。如果之前中断过此操作，请使用此选项。 |
| `--dry_run` | 仅打印预期结果，而不执行任何操作。 |

### `tootctl media refresh` {#media-refresh}

从其它服务器重拉取远程媒体附件。你必须使用 --status 、 --account 或 --domain 来指定媒体附件来源。如果附件已经存在于数据库，除非你使用 --force，否则将不会被覆写。

**版本历史：**
* 3.0.0 - 被加入
* 3.0.1 - 加入 `--force` 选项，并默认跳过已下载的附件

| 选项 | 描述 |
| :--- | :--- |
| `--account ACCT` | 需要被处理的帐号，格式 `username@domain` |
| `--domain DOMAIN` | FQDN string |
| `--status ID` | 数据库中的嘟文本地数字ID。 |
| `--concurrency N` | 执行该任务的worker数。默认为5。 |
| `--verbose` | 任务进行时，打印额外信息。  |
| `--dry_run` | 仅打印预期结果，而不执行任何操作。 |
| `--force` | 强制重下载远程资源并覆写本地附件。 |

### `tootctl media usage` {#media-usage}

计算被Mastodon消耗的硬盘空间。

**版本历史：**
* 3.0.1 - 被加入

### `tootctl media lookup` {#media-lookup}

提示输入媒体URL，然后查询该媒体显示位置。

**版本历史：**
* 3.1.0 - 被加入

## 预览卡片（Preview Cards）相关命令 {#preview_cards}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/lib/mastodon/cli/preview_cards.rb" caption="lib/mastodon/cli/preview_cards.rb" >}}

### `tootctl preview_cards remove` {#preview_cards-remove}

移除本地预览卡片缩略图。

**版本历史：**
* 3.0.0 - 被加入

| 选项 | 描述 |
| :--- | :--- |
| `--days` | 多久之前的媒体附件将会被清理。默认为180天。（注意：不推荐删除14天内的预览卡片，因为同一链接两周之内再次发布将不会重抓取。） |
| `--concurrency N` | 执行该任务的worker数。默认为5。 |
| `--verbose` | 任务进行时，打印额外信息。 |
| `--dry_run` | 仅打印预期结果，而不执行任何操作。 |
| `--link` | 仅删除链接型（link-type）预览卡片。不处理视频与图片卡片。 |

## 搜索相关命令 {#search}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/lib/mastodon/cli/search.rb" caption="lib/mastodon/cli/search.rb" >}}

### `tootctl search deploy` {#search-deploy}

创建或更新Elasticsearch索引并进行填充。 如果Elasticsearch为空，此命令将创建必要的索引，然后将数据从数据库导入到这些索引中。如果自上次运行以来索引结构已更改，此命令还将升级索引。

**版本历史：**
* 2.8.0 - 被加入
* 3.0.0 - 加入 `--processes` 选项来并行化

| 选项 | 描述 |
| :--- | :--- |
| `--processes N` | 并行执行命令。默认N=2。可以设为`auto`来基于可用CPU数获取相应数值。 |

## 站点设定相关命令 {#settings}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/lib/mastodon/cli/settings.rb" caption="lib/mastodon/cli/settings.rb" >}}

### `tootctl settings registrations open` {#settings-registrations-open}

开放注册。

**版本历史：**
* 2.6.0 - 被加入

### `tootctl settings registrations close` {#settings-registrations-close}

关闭注册。

**版本历史：**
* 2.6.0 - 被加入

## 嘟文相关命令 {#statuses}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/lib/mastodon/cli/statuses.rb" caption="lib/mastodon/cli/statuses.rb" >}}

### `tootctl statuses remove` {#statuses-remove}

从数据库中删除未被引用的嘟文，例如来自中继的或来自本地用户不再关注的用户的嘟文，同时没有被回复的或以其他方式与之互动的。

这是一个计算量很大的操作，其会开始之前创建额外的数据库索引，并在结束后删除它们。

**版本历史：**
* 2.8.0 - 被加入

| 选项 | 描述 |
| :--- | :--- |
| `--days` | 多久之前的嘟文将会被清理。默认为90天。 |

{{< translation-status-zh-cn raw_title="Using the admin CLI" raw_link="/admin/tootctl/" last_tranlation_time="2020-05-05" raw_commit="ad1ef20f171c9f61439f32168987b0b4f9abd74b">}}
