---
title: 使用管理 CLI
description: 可以从 CLI 运行的 tootctl 命令。
menu:
  docs:
    weight: 60
    parent: admin
---

Mastodon 的命令行界面是一个名为 `tootctl` 的可执行文件，位于 Mastodon 根目录中的 `bin` 目录内。每次执行它时，你必须通过指定 `RAILS_ENV` 环境变量来指定你打算使用的环境。除非你是在本地机器上工作的开发人员，否则你需要使用 `RAILS_ENV=production`。如果你确信永远不需要其他环境（用于开发、测试或暂存），可以为方便起见将其添加到 `.bashrc` 文件中，例如：

```bash
echo "export RAILS_ENV=production" >> ~/.bashrc
```

如果这样做，你就不需要每次都在行内指定它。如果未配置全局环境变量，且 Mastodon 代码被检出在 `/home/mastodon/live` 中，对 `tootctl` 的调用通常会像这样：

```bash
cd /home/mastodon/live
RAILS_ENV=production bin/tootctl help
```

## CLI 基础命令

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/lib/mastodon/cli/base.rb" caption="lib/mastodon/cli/base.rb" >}}


---


### `tootctl self-destruct` {#self-destruct}

向其他所有已知实例广播账户删除活动，从联邦中擦除此服务器。这允许运行 Mastodon 的站点从联邦宇宙中"干净退出"，因为它几乎不会在其他实例上留下缓存。该命令始终是交互式的，需要两次确认。

本地数据实际上并未被删除，因为清空数据库或删除整个 VPS 更快。如果你运行此命令后继续操作实例，则可能会导致状态不匹配，进而导致联合出现故障和问题。

{{< hint style="danger" >}}
**在运行此命令之前，请确保你完全了解自己在做什么。** 此操作**不可逆转**，并且可能需要很长时间。站点将在此命令完成后处于**损坏状态**。需要一个正在运行的 Sidekiq 进程，因此在队列完全清空之前不要关闭站点。
{{< /hint >}}

`--dry-run`
: 仅打印预期结果，不执行任何操作。

**版本历史：**\
2.8.0 - 该命令被添加


---


### `tootctl --version` {#version}

显示当前运行的 Mastodon 实例的版本。

**版本历史：**\
2.7.0 - 该命令被添加


---


## 账户 CLI {#accounts}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/lib/mastodon/cli/accounts.rb" caption="lib/mastodon/cli/accounts.rb" >}}


---


### `tootctl accounts rotate` {#accounts-rotate}

生成并广播新的 RSA 密钥，作为安全维护的一部分。

`USERNAME`
: 账户的本站用户名。

`--all`
: 可以代替 `USERNAME` 提供，为所有本站账户轮换密钥。

**版本历史：**\
2.5.0 - 该命令被添加


---


### `tootctl accounts create` {#accounts-create}

使用给定的 `USERNAME` 和提供的 `--email` 创建新用户账户。

`USERNAME`
: 新账户的本站用户名。{{<required>}}

`--email EMAIL`
: 用户的电子邮件地址。{{<required>}}

`--confirmed`
: 跳过发送确认电子邮件的流程并立即激活账户。

`--role ROLE`
: 通过提供对应[用户组]({{< relref "entities/Role" >}})的 `name` 来定义新账户的自定义用户组。默认用户组包括 `Owner`、`Admin` 和 `Moderator`（区分大小写）。

`--reattach`
: 在账户被删除后重新使用旧的 USERNAME。

`--force`
: 强制删除任何具有此 `USERNAME` 的现有账户，并重新创建同名的新账户。

`--skip-sign-in-token`
: 强制确保用户永远不会被要求提供电子邮件发送的安全代码。

**版本历史：**\
2.6.0 - 该命令被添加\
4.0.0 - `--role` 不再接受硬编码的 `user`、`moderator` 或 `admin` 用户组。请指定自定义用户组的名称（区分大小写）。


---


### `tootctl accounts modify` {#accounts-modify}

修改用户账户的用户组、邮箱、活动状态、批准状态或 2FA 要求。

`USERNAME`
: 账户的本站用户名。{{<required>}}

`--role ROLE`
: 通过提供对应[用户组]({{< relref "entities/Role" >}})的 `name` 来定义现有账户的自定义用户组。默认用户组包括 `Owner`、`Admin` 和 `Moderator`（区分大小写）。

`--remove-role`
: 从用户中移除当前用户组。

`--email EMAIL`
: 将用户的邮箱地址更新为 `EMAIL`。

`--confirm`
: 与 `--email` 一起使用时，跳过确认邮件。

`--disable`
: 锁定 `USERNAME` 使其无法访问其账户。

`--enable`
: 如果 `USERNAME` 的账户当前被禁用，则解锁该账户。

`--approve`
: 若你的实例处于/曾处于批准模式，则批准 `USERNAME` 的账户。

`--disable-2fa`
: 移除其它的身份认证因素并允许使用密码登录。

`--reset-password`
: 重置给定账户的密码。

`--skip-sign-in-token`
: 强制确保用户永远不会被要求提供发送到邮箱中的安全代码。

**版本历史：**\
2.6.0 - 该命令被添加\
3.1.2 - 添加 `--reset-password`\
4.0.0 - `--role` 不再接受硬编码的 `user`、`moderator` 或 `admin` 用户组。请指定自定义用户组的名称（区分大小写）。使用 `--remove-role` 移除当前用户组。


---


### `tootctl accounts delete` {#accounts-delete}

删除具有给定 USERNAME 的用户账户。

`USERNAME`
: 要删除的账户的本站用户名。{{<required>}}

**版本历史：**\
2.6.0 - 该命令被添加


---


### `tootctl accounts backup` {#accounts-backup}

为具有给定 USERNAME 的用户账户请求备份。备份将在 Sidekiq 中异步创建，完成后，用户将收到一封包含备份链接的电子邮件。

`USERNAME`
: 要备份的账户的本站用户名。{{<required>}}

**版本历史：**\
2.6.0 - 该命令被添加


---


### `tootctl accounts cull` {#accounts-cull}

移除不再存在的外站账户。查询数据库中的每个外站账户，以确定它在原始服务器上是否仍然存在，如果不存在，则从数据库中移除它。在过去一周内有确认活动的账户不包括在检查中，以防服务器只是暂时下线。

`DOMAIN[...]`
: 可选择传递特定域名进行清理

`--concurrency N`
: 用于此任务的作业线程数量。默认为 N=5。

`--dry-run`
: 仅打印预期结果，不执行任何操作。

**版本历史：**\
2.6.0 - 该命令被添加\
2.8.0 - 添加 `--dry-run`\
3.5.0 - 添加传递特定域名的能力


---


### `tootctl accounts refresh` {#accounts-refresh}

重新获取一个或多个账户的外站用户数据和文件。

`USERNAME`
: 外站账户的 username@domain。

`--all`
: 可以代替 `USERNAME`，刷新所有外站账户。

`--domain DOMAIN`
: 可以代替 `USERNAME`，仅对来自此 `DOMAIN` 的外站账户进行操作。

`--concurrency N`
: 用于此任务的作业线程数量。默认为 N=5。

`--verbose`
: 在任务处理过程中输出额外信息。

`--dry-run`
: 仅打印预期结果，不执行任何操作。

**版本历史：**\
2.6.0 - 该命令被添加


---


### `tootctl accounts merge` {#accounts-merge}

将两个外站账户合并为一个。这主要用于修复由其他服务器更改其域名导致的重复。默认情况下，这仅在公钥相同时有效，但可以覆盖此设置。

`FROM`
: 要移除的外站账户的 username@domain。{{<required>}}

`TO`
: 要保留的外站账户的 username@domain。{{<required>}}

`--force`
: 覆盖公钥检查。

**版本历史：**\
3.3.0 - 该命令被添加


---


### `tootctl accounts follow` {#accounts-follow}

强制所有本站账户关注具有给定用户名的本站账户。

`USERNAME`
: 本站用户名。{{<required>}}

`--concurrency N`
: 用于此任务的作业线程数量。默认为 N=5。

`--verbose`
: 在任务处理过程中输出额外信息。

**版本历史：**\
2.7.0 - 该命令被添加\
3.0.0 - 使用 `USERNAME` 代替 `ACCT`


---


### `tootctl accounts unfollow` {#accounts-unfollow}

强制所有本站账户取消关注指定的账户。

`ACCT`
: `username@domain` 地址。{{<required>}}

`--concurrency N`
: 用于此任务的作业线程数量。默认为 N=5。

`--verbose`
: 在任务处理过程中输出额外信息。

**版本历史：**\
2.7.0 - 该命令被添加


---


### `tootctl accounts reset-relationships` {#accounts-reset-relationships}

重置本站账户的所有关注和/或关注者关系。

`USERNAME`
: 本站用户名。

`--follows`
: 强制 `USERNAME` 取消关注所有人，然后重新关注他们。

`--followers`
: 移除 `USERNAME` 的所有关注者。

**版本历史：**\
2.8.0 - 该命令被添加


---


### `tootctl accounts approve` {#accounts-approve}

当实例处于批准模式时，批准新的注册申请。

`USERNAME`
: 本站用户名。

`--number N`
: 批准最早的 N 个待处理注册申请。

`--all`
: 批准所有待处理的注册申请。

**版本历史：**\
2.8.0 - 该命令被添加


---


### `tootctl accounts prune` {#accounts-prune}

清理从未与本站用户互动过的外站账户。

`--concurrency N`
: 用于此任务的作业线程数量。默认为 N=5。

`--dry-run`
: 仅打印预期结果，不执行任何操作。

**版本历史：**\
2.8.0 - 该命令被添加


---


## 缓存 CLI {#cache}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/lib/mastodon/cli/cache.rb" caption="lib/mastodon/cli/cache.rb" >}}


---


### `tootctl cache clear` {#cache-clear}

清除缓存存储。

**版本历史：**\
2.8.1 - 该命令被添加


---


### `tootctl cache recount` {#cache-recount}

从头开始计算引用记录，更新 TYPE 的硬缓存计数器。这与数据库的大小有关，可能需要很长时间才能完成。将刷新账户的关注者、关注和嘟文计数，以及嘟文的回复、转发和收藏计数。

`TYPE`
: `accounts` 或 `statuses`。{{<required>}}

`--concurrency N`
: 用于此任务的作业线程数量。默认为 N=5。

`--verbose`
: 在任务处理过程中输出额外信息。

**版本历史：**\
3.0.0 - 该命令被添加


---


## 实例 CLI {#domains}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/lib/mastodon/cli/domains.rb" caption="lib/mastodon/cli/domains.rb" >}}


---


### `tootctl domains purge` {#domains-purge}

从给定 DOMAIN 中移除所有账户，且不留下任何记录。与封禁不同，如果 DOMAIN 在互联网中仍然在线，则意味着如果再次解析，账户可能仍会返回。

`DOMAIN[...]`
: 要清除的域名，以空格分隔。

`--by-uri`
: 在 actor URI 中匹配域名，而不是在 Webfinger 地址中匹配。

`--limited-federation-mode`
: 可以代替 DOMAIN 提供。不是从单个域名清除，而是从数据库中移除所有不在许可列表中的域名的账户。在启用有限联合模式并定义许可列表后使用此选项。

`--concurrency N`
: 用于此任务的作业线程数量。默认为 5。

`--verbose`
: 在任务处理过程中输出额外信息。

`--dry-run`
: 仅打印预期结果，不执行任何操作。

**版本历史：**\
2.6.0 - 该命令被添加\
2.8.0 - 添加 `--whitelist-mode`\
2.9.0 - 同时移除自定义表情\
3.0.0 - 可以接受多个域名\
3.2.0 - 将 `--whitelist-mode` 重命名为 `--limited-federation-mode`\
3.5.0 - 添加 `--by-uri`


---


### `tootctl domains crawl` {#domains-crawl}

使用 Mastodon REST API 端点来爬取已知的联邦宇宙，访问该端点获取所有已知的实例，并进一步从这些实例收集统计数据（如果对应实例支持该 API 端点）。当没有给出 START 时，该命令使用服务器自己的已知实例数据库作为初始列表进行爬取。返回总实例数、总注册用户数、过去一周的总活跃用户数以及过去一周加入的总用户数。

`START`
: 可选择从不同的域名开始。

`--exclude-suspended`
: 不要在输出中包含你已屏蔽的实例。这还包括被封禁实例域名的任何子域名。

`--concurrency N`
: 用于此任务的作业线程数量。默认为 N=50。

`--format FORMAT`
: 控制结果的返回方式。`summary` 将打印摘要。`domains` 将返回所有发现的对等节点的换行符分隔列表。`json` 将转储聚合的原始数据。默认为 `summary`。

**版本历史：**\
2.7.0 - 该命令被添加\
3.0.0 - 添加 `--exclude-suspended`


---


## 邮件域名屏蔽 CLI {#email-domain-blocks}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/lib/mastodon/cli/email_domain_blocks.rb" caption="lib/mastodon/cli/email_domain_blocks.rb" >}}


---


### `tootctl email-domain-blocks list` {#email-domain-blocks-list}

列出所有当前被屏蔽的邮件域名。

**版本历史：**\
3.2.0 - 该命令被添加


---


### `tootctl email-domain-blocks add` {#email-domain-blocks-add}

向邮件域名屏蔽列表添加条目。

`DOMAIN[...]`
: 要屏蔽的邮件域名，以空格分隔。{{<required>}}

`--with-dns-records`
: 如果提供，还将查找 A、AAAA 和 MX 记录并阻止它们。

**版本历史：**\
3.2.0 - 该命令被添加


---


### `tootctl email-domain-blocks remove` {#email-domain-blocks-remove}

从邮件域名屏蔽列表中移除条目。

`DOMAIN[...]`
: 要取消屏蔽的邮件域名，以空格分隔。{{<required>}}

**版本历史：**\
3.2.0 - 该命令被添加


---


## 表情 CLI {#emoji}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/lib/mastodon/cli/emoji.rb" caption="lib/mastodon/cli/emoji.rb" >}}


---


### `tootctl emoji export` {#emoji-export}

将自定义表情导出到 PATH 下的 `export.tar.gz`。

`PATH`
: 创建包含图片的 .tar.gz 归档文件的路径。{{<required>}}

`--overwrite`
: 覆盖 `PATH` 处的任何现有归档文件。

`--category CATEGORY`
: 仅导出指定的 `CATEGORY`。如果未提供，将导出所有表情。

**版本历史：**\
3.1.4 - 该命令被添加


---


### `tootctl emoji import` {#emoji-import}

从给定路径的 .tar.gz 归档文件导入自定义表情。归档文件应包含不大于 50KB 的 PNG 或 GIF 文件，短代码将被设置为不包含扩展名的文件名，可以提供前缀和/或后缀。

`PATH`
: 创建包含图片的 .tar.gz 归档文件的路径。{{<required>}}

`--prefix PREFIX`
: 在生成的短代码的开头添加 PREFIX。

`--suffix SUFFIX`
: 在生成的短代码的末尾添加 SUFFIX。

`--overwrite`
: 不跳过现有表情，用短代码一致的已发现表情替换原有表情。

`--category CATEGORY`
: 在选择器中将本次处理的表情分组在 CATEGORY 下。

`--unlisted`
: 处理的表情不会显示在表情选择器中，只能通过直接使用短代码使用。

**版本历史：**\
2.5.0 - 该命令被添加


---


### `tootctl emoji purge` {#emoji-purge}

移除所有自定义表情。

`--remote-only`
: 如果提供，仅移除外站自定义表情。

**版本历史：**\
2.8.0 - 该命令被添加\
3.1.0 - 该命令被添加 `--remote-only`


---


## 信息流 CLI {#feeds}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/lib/mastodon/cli/feeds.rb" caption="lib/mastodon/cli/feeds.rb" >}}


---


### `tootctl feeds build` {#feeds-build}

为一个或所有用户构建主页和列表信息流。信息流将从数据库构建并在 Redis 的内存缓存中存储。Mastodon 自动管理活跃用户的主页信息流。

`USERNAME`
: 要重新生成信息流的本站用户名。

`--all`
: 可以代替 `USERNAME` 提供，刷新所有外站账户。

`--concurrency N`
: 用于此任务的作业线程数量。默认为 N=5。

`--verbose`
: 在任务处理过程中输出额外信息。

`--dry-run`
: 仅打印预期结果，不执行任何操作。

**版本历史：**\
2.6.0 - 该命令被添加


---


### `tootctl feeds clear` {#feeds-clear}

从 Redis 中移除所有主页和列表信息流。

**版本历史：**\
2.6.0 - 该命令被添加


---


## 维护 CLI {#maintenance}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/lib/mastodon/cli/maintenance.rb" caption="lib/mastodon/cli/maintenance.rb" >}}


---


### `tootctl maintenance fix-duplicates` {#maintenance-fix-duplicates}

修复可能由于更改排序规则导致的数据库索引损坏。删除或合并重复的账户、嘟文、表情等。必须停止 Mastodon 才能运行此任务，该任务将花费很长时间并可能具有破坏性。如果你的数据库索引由于诸如 <https://wiki.postgresql.org/wiki/Locale_data_changes> 等问题而损坏，这将非常有用。

**版本历史：**\
3.3.0 - 该命令被添加


---


## 媒体 CLI {#media}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/lib/mastodon/cli/media.rb" caption="lib/mastodon/cli/media.rb" >}}


---


### `tootctl media remove` {#media-remove}

移除来自其他服务器的媒体附件、头像或账户页横幅背景的本站缓存副本。默认情况下，只移除媒体附件。

`--days N`
: 指定多旧的媒体附件才能被移除。对于头像和横幅背景，时间间隔针对对用户的最后一次 webfinger 请求和更新时间计算，默认为 7。

`--concurrency N`
: 用于此任务的作业线程数量。默认为 N=5。

`--prune-profiles`
: 不移除媒体附件，而是移除来自其他服务器的头像和横幅背景的本站缓存副本。不能与 `--remove-headers` 结合使用。

`--remove-headers`
: 不移除媒体附件，而是移除来自其他服务器的横幅背景的本站缓存副本。不能与 `--prune-profiles` 结合使用。

`--include-follows`
: 覆盖 `--prune-profiles` 和 `--remove-headers` 的默认行为，移除所有外站实例的头像（和横幅背景）的本站缓存副本，无论关注状态如何（默认情况下，只有本站没有被关注或没有关注任何人的账户的头像和横幅背景会被移除）。只能与 `--prune-profiles` 或 `--remove-headers` 一起使用。

`--verbose`
: 在任务处理过程中输出额外信息。

`--dry-run`
: 仅打印预期结果，不执行任何操作。

**版本历史：**\
2.5.0 - 该命令被添加\
2.6.2 - 显示释放的磁盘空间\
4.1.0 - 添加 --prune-profiles、--remove-headers 和 --include-follows。


---


### `tootctl media remove-orphans` {#media-remove-orphans}

扫描不属于现有媒体附件的文件，并移除它们。请注意，某些存储提供商对列出对象所需的 API 请求收费。此外，此操作需要遍历每个文件，因此速度会很慢。

`--start-after`
: 循环将开始的 Paperclip 附件键。如果命令在之前被中断，请使用此选项。

`--dry-run`
: 仅打印预期结果，不执行任何操作。

`--prefix`
: 仅遍历系统中特定前缀的文件。

`--fix-permissions`
: 根据环境变量将 S3 ACL 设置为默认值。

**版本历史：**\
3.1.0 - 该命令被添加\
3.1.3 - 添加 `--prefix`\
3.3.0 - 添加 `--fix-permissions`


---


### `tootctl media refresh` {#media-refresh}

从其他实例重新获取外站媒体附件。你必须使用 `--status`、`--account`、`--domain` 或 `--days` 指定媒体附件的来源。如果附件已存在于数据库中，除非你使用 `--force`，否则不会被覆盖。  

`--account ACCT`
: `username@domain` 格式的用户名字符串

`--domain DOMAIN`
: FQDN 格式的字符串

`--status ID`
: 数据库中嘟文的本站数字 ID。

`--days N`
: 限制此任务检查的天数范围。
  
`--concurrency N`
: 用于此任务的作业线程数量。默认为 5。

`--verbose`
: 在任务处理过程中输出额外信息。

`--dry-run`
: 仅打印预期结果，不执行任何操作。

`--force`
: 强制重新下载外站资源并覆盖本站附件。

**版本历史：**\
3.0.0 - 该命令被添加\
3.0.1 - 添加 `--force` 并默认跳过已下载的附件\
4.0.0 - 添加 `--days`


---


### `tootctl media usage` {#media-usage}

计算 Mastodon 消耗的磁盘空间。

**版本历史：**
3.0.1 - 该命令被添加


---


### `tootctl media lookup` {#media-lookup}

提示输入媒体 URL，然后查找显示该媒体的状态。

**版本历史：**\
3.1.0 - 该命令被添加


---


## 预览卡片 CLI {#preview_cards}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/lib/mastodon/cli/preview_cards.rb" caption="lib/mastodon/cli/preview_cards.rb" >}}


---


### `tootctl preview_cards remove` {#preview_cards-remove}

移除预览卡片的本地缩略图。

`--days N`
: 指定多旧的缩略图才会被移除。默认为 180。（注意：不建议删除最近 14 天内的预览卡片，因为除非链接在最后一次之后的 2 周内重新发布，否则不会重新获取预览卡片。）

`--concurrency N`
: 用于此任务的作业线程数量。默认为 N=5。

`--verbose`
: 在任务处理过程中输出额外信息。

`--dry-run`
: 仅打印预期结果，不执行任何操作。

`--link`
: 只删除链接类型的预览卡片；保留视频和照片卡片不变。

**版本历史：**\
3.0.0 - 该命令被添加


---


## 搜索 CLI {#search}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/lib/mastodon/cli/search.rb" caption="lib/mastodon/cli/search.rb" >}}


---


### `tootctl search deploy` {#search-deploy}

创建或更新 Elasticsearch 索引并填充它。如果 Elasticsearch 为空，此命令将创建必要的索引，然后将数据库中的数据导入到这些索引中。如果自上次运行以来底层架构已更改，此命令也会升级索引。

`--batch-size`
: 默认为 100。较高的批处理大小可以使 Elasticsearch 更快地处理记录，减轻 PostgreSQL 数据库的负载，但在索引期间可能会增加 Elasticsearch 节点的内存压力。

`--only INDEX`
: 指定索引名称 [`instances`、`accounts`、`tags`、`statuses`、`public_statuses`] 以仅创建或更新该索引。

`--concurrency N`
: 在多个线程上并行执行命令。默认为 5。

`--import`
: 将数据从数据库导入到索引
 
`--clean`
: 从索引中删除过时的文档

`--reset-chewy`
: 重置 Chewy 的内部索引

**版本历史:**
2.8.0 - 该命令被添加\
3.0.0 - 添加 `--processes` 用于并行处理\
3.3.0 - 更改可选参数\
3.5.0 - 添加 `--batch-size`\
3.5.3 - 将 `--batch-size` 默认值从 1000 更改为 100，将 `--concurrency` 从 2 更改为 5，添加 `--import` 和 `--clean`\
4.2.0 - 为 `--only` 添加 `instances` 和 `public_statuses` 选项，添加 `--reset-chewy`


---


## 设置 CLI {#settings}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/lib/mastodon/cli/settings.rb" caption="lib/mastodon/cli/settings.rb" >}}


---


### `tootctl settings registrations open` {#settings-registrations-open}

开放注册。

**版本历史：**\
2.6.0 - 该命令被添加


---


### `tootctl settings registrations close` {#settings-registrations-close}

关闭注册。

**版本历史：**\
2.6.0 - 该命令被添加


---


### `tootctl settings registrations approved` {#settings-registrations-approved}

将注册设为需要批准。

**版本历史：**\
3.5.2 - 该命令被添加

`--require_reason`
: 如果为真，用户注册时必须输入原因。


---


## 嘟文 CLI {#statuses}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/lib/mastodon/cli/statuses.rb" caption="lib/mastodon/cli/statuses.rb" >}}


---


### `tootctl statuses remove` {#statuses-remove}

从数据库中删除未引用的嘟文，例如来自中继的、不被任何本站账户关注、且未被回复或以其他方式互动的嘟文。

这是一个计算密集的过程，它在开始前创建额外的数据库索引，并在之后删除它们。

`--days N`
: 指定多旧的嘟文才会被删除。默认为 90。

`--skip-media-remove`
: 跳过删除媒体，以防 S3 出错。默认为 false。

**版本历史：**\
2.8.0 - 该命令被添加\
3.1.3 - 该命令被添加 `--skip-media-remove`\
3.5.0 - 现在删除孤立记录并执行额外的清理任务


---


## 升级 CLI {#upgrade}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/lib/mastodon/cli/upgrade.rb" caption="lib/mastodon/cli/upgrade.rb" >}}


---


### `tootctl upgrade storage-schema` {#upgrade-storage-schema}

升级存储架构，将所有非本站媒体资源存储在顶级缓存目录中。警告：这是可选的，仅适用于 v3.1.4 之前的部署。由于可能移动数 TB 的数据，此命令可能会导致巨大的对象存储成本。

`--verbose`
: 在任务处理过程中输出额外信息。

`--dry-run`
: 仅打印预期结果，不执行任何操作。

**版本历史：**\
3.1.4 - 该命令被添加

{{< translation-status-zh-cn raw_title="Using the admin CLI" raw_link="/admin/tootctl/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
