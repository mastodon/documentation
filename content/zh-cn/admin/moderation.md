---
title: 审核操作
description: 针对不受欢迎的用户或域名可以采取的操作。
menu:
  docs:
    weight: 110
    parent: admin
---

## 针对个人用户的审核 {#individual-moderation}

Mastodon 中的审核始终在本站应用，即从特定实例的角度来看。一个实例的管理员或协管员不能影响另一个实例上的用户，他们只能影响该用户在自己实例上的本地副本。

从 v3.5.0 开始，所有默认的用户审核决定都会通过电子邮件通知受影响的用户。用户可以访问申诉页面，在决定做出后的 20 天内提交一次申诉。协管员可以批准或拒绝申诉。

### 标记为敏感内容 {#sensitive-user}

当一个账户被标记为敏感时，该用户发布的所有媒体内容将自动被[标记为敏感内容](https://docs.joinmastodon.org/user/posting/#cw)。

### 冻结 {#freeze-user}

Mastodon 账户可以被冻结。这会阻止用户使用该账户做任何事情，但所有内容仍然完好无损地保留。这种限制是可逆的；账户可以随时解冻。这种限制仅适用于你实例上的本站用户。

当用户的账户被冻结时，他们会被重定向到**账户设置**页面，并显示以下信息：

> 你不能再登录你的账户，或以任何其他方式使用它，但你的个人资料和其他数据保持完整。

当用户的账户解冻后，正常功能会恢复。

### 限制 {#limit-user}

之前被称为"隐藏"。被限制的账户将对该实例上的所有其他用户隐藏，除非用户已经关注了被限制的账户。所有内容仍然存在，并且仍然可以通过搜索、提及和关注找到，但内容在公开场合不可见。

目前，限制不影响联合功能。在本站被限制的账户在其他实例*不会*被自动限制。账户限制是可逆的。

### 封禁 {#suspend-user}

Mastodon 中的封禁操作意味着账户实际上被删除。该账户不再出现在搜索中，账户页面消失，所有嘟文、上传的内容、关注者和所有其他数据在公开场合被移除。但是，自封禁起 30 天内，所有数据在管理后台仍然保留。这是为了给用户提供与实例管理员合作解决潜在问题并恢复账户的机会。

如果账户在 30 天期限内被恢复，所有数据将再次可被公开访问，不会产生不良影响。 30 天期限过后，用户的**所有**数据将从被实例中清除。管理员还可以选择在 30 天内的任何时候立即删除用户的账户数据。

无论数据在 30 天期限后被删除，还是被管理员提前强制删除，对应账户仍然可以被解除封禁。但是，该账户将不再与之关联的任何数据（状态、个人资料信息、头像或标题图像）。

对于外站账户，封禁将使其取消关注任何本站账户。即使外站账户在 30 天时间窗口内被解除封禁，这些关系也不会恢复。

## 对整个站点进行审核 {#server-wide-moderation}

由于单个审核来自行为不端的站点的大量用户可能会很疲惫，因此可以使用**实例屏蔽**的功能对来自特定服务器的所有用户进行预先审核，这有几个不同的严重级别。

### 拒绝媒体 {#reject-media}

启用此选项后，本站不会处理来自该实例的任何文件。这包括头像、背景横幅、表情与媒体附件。

### 限制 {#limit-server}

相当于[限制](#limit-user)来自该实例的所有过去和未来的账户。之前称为"隐藏"。

### 封禁 {#suspend-server}

相当于[封禁](#suspend-user)来自该实例的所有过去和未来的账户。除用户名外，不会在本地存储来自该实例的任何内容。

封禁一个实例将删除本站账户与被封禁实例上账户之间的所有现存关注关系。如果外站实例稍后被解除封禁，这些关系不会恢复。

## 反垃圾信息措施 {#spam-fighting-measures}

Mastodon 中有一些基本措施来防止垃圾信息：

* 注册需要确认电子邮件地址
* 按 IP 地址限制注册速率

然而，专业的垃圾信息发送者会绕过这些措施。你可以采用的另一种措施是**电子邮件域名黑名单**。在注册过程中，Mastodon 会解析给定电子邮件地址的 A 或 MX 记录，即电子邮件服务器的 IP 地址，并检查该 IP 地址是否在动态存储的黑名单中。

### 按邮箱服务器屏蔽 {#blocking-by-e-mail-server}

垃圾信息发送者经常使用不同的电子邮件域名，使其看起来像是使用了许多不同的邮箱服务器，很难将这些域名全部添加到黑名单。但在某些情况下，所有这些域名都解析到单个邮箱服务器 IP。如果你看到大量垃圾信息发送者同时注册，你可以检查这一点，使用在线 DNS 查找工具或 Linux 的 `dig` 实用工具，例如 `dig example.com` 将返回该域的所有 DNS A 记录。如果你注意到所有域名的 IP 都相同，你可以将其添加到电子邮件域名黑名单中。

### 按 IP 屏蔽 {#blocking-by-ip}

在 Mastodon 本身中无法按 IP 地址屏蔽访问者，而且这不是一种万无一失的策略。 IP 有时由很多不同的人共享，且有时会更换。然而，可以在 Linux 中使用防火墙按 IP 地址屏蔽访问者。以下是使用 `iptables` 和 `ipset` 的示例：

```bash
# 安装 ipset
sudo apt install ipset
# 创建名为 "spambots" 的黑名单
sudo ipset create spambots nethash
# 将 1.2.3.4 添加到黑名单
sudo ipset add spambots 1.2.3.4
# 基于黑名单添加防火墙规则
sudo iptables -I INPUT 1 -m set --match-set spambots src -j DROP
```

小心不要将自己锁在机器之外。

### 用于审核级别事件的网络钩子 {#report-events-webhook}

你可以创建网络钩子，通过实时通知应用程序系统事件来促进审核API的自动化。这也实现了与 Discord、 IRC 和 Slack 等聊天应用的集成，有助于协调审核工作。

作为可选操作，你可使用来自 WebSub 规范的 X-Hub-Signature 标头来验证载荷的真实性。

当前支持的事件：

* account.approved
* account.created
* account.updated
* report.created
* report.updated
* status.created
* status.updated



#### 示例载荷：

```json

{
   "event":"report.created",
   "created_at":"2023-10-26T13:34:00.351Z",
   "object":{
      "id":"8437",
      "action_taken":false,
      "action_taken_at":null,
      "category":"violation",
      "comment":"",
      "forwarded":true,
      "created_at":"2023-10-26T13:34:00.348Z",
      "updated_at":"2023-10-26T13:34:00.348Z",
      "account":{
         "id":"123456789",
         "username":"bobisaburger",
         "domain":null,
         "created_at":"2023-07-13T04:39:22.493Z",
         "email":"bobisaburger@emailservice.com",
         "ip":"12.34.56.78",
         "confirmed":true,
         "suspended":false,
         "silenced":false,
         "sensitized":false,
         "disabled":false,
         "approved":true,
         "locale":"en",
         "invite_request":"I would love to be a member of your instance!",
         "ips":[
            {
               "ip":"12.34.56.78",
               "used_at":"2023-07-13T04:45:31.835Z"
            },
            {
               "ip":"98.76.54.32",
               "used_at":"2023-07-13T04:39:22.722Z"
            }
         ],
         "account":{
            "id":"123456789",
            "username":"bobisaburger",
            "acct":"bobisaburger",
            "display_name":"bobisaburger",
            "locked":false,
            "bot":false,
            "discoverable":null,
            "group":false,
            "created_at":"2023-07-13T00:00:00.000Z",
            "note":"",
            "url":"https://mastodonwebsite/@bobisaburger",
            "uri":"https://mastodonwebsite/users/bobisaburger",
            "avatar":"https://locationofavatar.com/image.jpg",
            "avatar_static":"https://locationofavatar.com/image.jpg",
            "header":"locationofheader.com/image.jpg",
            "header_static":"locationofheader.com/image.jpg",
            "followers_count":100,
            "following_count":200,
            "statuses_count":9,
            "last_status_at":"2023-08-05",
            "noindex":true,
            "emojis":[
               
            ],
            "roles":[
               
            ],
            "fields":[
               
            ]
         },
         "role":{
            "id":"-99",
            "name":"",
            "permissions":"65536",
            "color":"",
            "highlighted":false
         }
      },
      "target_account":{
         "id":"123454321",
         "username":"cheeseperson",
         "domain":"someothermastodonsite.com",
         "created_at":"2023-08-20T00:00:00.000Z",
         "email":null,
         "ip":null,
         "confirmed":null,
         "suspended":false,
         "silenced":false,
         "sensitized":false,
         "disabled":null,
         "approved":null,
         "locale":null,
         "invite_request":null,
         "ips":null,
         "account":{
            "id":"123454321",
            "username":"cheeseperson",
            "acct":"cheeseperson@someothermastodonsite.com",
            "display_name":"cheeseperson",
            "locked":false,
            "bot":false,
            "discoverable":false,
            "group":false,
            "created_at":"2023-08-20T00:00:00.000Z",
            "note":"",
            "url":"https://someothermastodonsite.com/@cheeseperson",
            "uri":"https://someothermastodonsite.com/users/cheeseperson",
            "avatar":"https://someothermastadonsite.com/avatars/original/missing.png",
            "avatar_static":"https://someothermastadonsite.com/avatars/original/missing.png",
            "header":"locationofheader.com/image.jpg",
            "header_static":"locationofheader.com/image.jpg",
            "followers_count":2,
            "following_count":2,
            "statuses_count":95,
            "last_status_at":"2023-10-26",
            "emojis":[
               
            ],
            "fields":[
               
            ]
         },
         "role":null
      },
      "assigned_account":null,
      "action_taken_by_account":null,
      "statuses":[
         {
            "id":"12345678987654321",
            "created_at":"2023-10-26T11:29:13.000Z",
            "in_reply_to_id":"1918282746465",
            "in_reply_to_account_id":"101010101010",
            "sensitive":false,
            "spoiler_text":"",
            "visibility":"public",
            "language":"de",
            "uri":"https://someothermastodonsite.com/users/cheeseperson/statuses/111301083360371621",
            "url":"https://someothermastodonsite.com/@cheeseperson/111301083360371621",
            "replies_count":0,
            "reblogs_count":0,
            "favourites_count":0,
            "edited_at":"2023-10-26T11:30:31.000Z",
            "content":"<p>Here is some content</p>",
            "reblog":null,
            "account":{
               "id":"123454321",
               "username":"cheeseperson",
               "acct":"cheeseperson@someothermastodonsite.com",
               "display_name":"cheeseperson",
               "locked":false,
               "bot":false,
               "discoverable":false,
               "group":false,
               "created_at":"2023-08-20T00:00:00.000Z",
               "note":"",
               "url":"https://someothermastodonsite.com/@cheeseperson",
               "uri":"https://someothermastodonsite.com/users/cheeseperson",
               "avatar":"https://someothermastadonsite.com/avatars/original/missing.png",
               "avatar_static":"https://someothermastadonsite.com/avatars/original/missing.png",
               "header":"locationofheader.com/image.jpg",
               "header_static":"locationofheader.com/image.jpg",
               "followers_count":2,
               "following_count":2,
               "statuses_count":95,
               "last_status_at":"2023-10-26",
               "emojis":[
                  
               ],
               "fields":[
                  
               ]
            },
            "media_attachments":[
               
            ],
            "mentions":[
               {
                  "id":"101010101010",
                  "username":"thirdperson",
                  "url":"https://thirdpersonsinstance.com/@thirdperson",
                  "acct":"thirdperson@emailwebsite.com"
               }
            ],
            "tags":[
               
            ],
            "emojis":[
               
            ],
            "card":null,
            "poll":null
         }
      ],
      "rules":[
         {
            "id":"2",
            "text":"不要做一个招人讨厌的人！"
         }
      ]
   }
}


```

{{< translation-status-zh-cn raw_title="Moderation actions" raw_link="/admin/moderation/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
