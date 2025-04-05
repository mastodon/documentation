---
title: dimensions API 方法
description: 获取有关实例的定性指标。
menu:
  docs:
    name: dimensions
    parent: methods-admin
    identifier: methods-admin-dimensions
aliases: [
  "/methods/admin/dimensions",
  "/api/methods/admin/dimensions",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## 获取维度数据 {#get}

```http
POST /api/v1/admin/dimensions HTTP/1.1
```

获取有关某些帐户、实例、语言等受欢迎程度的信息。

**返回：** [Admin::Dimension]({{< relref "entities/Admin_Dimension" >}}) 数组\
**OAuth：** 用户令牌 + `admin:read`\
**权限：** 查看管理面板\
**版本历史：**\
3.5.0 - 添加\
4.0.0 - 支持自定义用户组和权限

#### 请求

##### 标头

Authorization
: {{<required>}} 提供此标头，其中包含 `Bearer <user_token>`，以获得对此 API 方法的访问授权。

##### 表单数据参数

keys[]
: {{<required>}} 字符串数组。按对应的键字符串请求特定维度。支持的维度包括：
- `languages` = 此实例上最常用的语言
- `sources` = 此实例上最常用的客户端应用
- `servers` = 嘟文最多的外站实例
- `space_usage` = 你的软件堆栈使用了多少空间
- `software_versions` = 你的软件堆栈的版本号
- `tag_servers` = 包含热门话题标签的嘟文的最常见实例
- `tag_languages` = 包含热门话题标签的嘟文的最常用语言
- `instance_accounts` = 来自外站实例的最受关注的帐户
- `instance_languages` = 来自外站实例的最常用的语言

start_at
: ([Datetime](/api/datetime-format#datetime)) 字符串。时间段的开始日期。若提供了时间，它将被忽略。

end_at
: ([Datetime](/api/datetime-format#datetime)) 字符串。时间段的结束日期。若提供了时间，它将被忽略。

limit
: 整数。要为来源、实例、语言、标签或实例维度返回的最大结果数。

tag_servers[id]
: 字符串。当 `tag_servers` 是请求的键之一时，你必须提供一个热门话题标签 ID 才能获得有关哪些实例正在发布该标签的信息。

tag_languages[id]
: 字符串。当 `tag_languages` 是请求的键之一时，你必须提供一个热门话题标签 ID 才能获得有关哪些语言正在发布该标签的信息。

instance_accounts[domain]
: 字符串。当 `instance_accounts` 是请求的键之一时，你必须提供一个域名才能获得有关来自该实例的受欢迎帐户的信息。

instance_languages[domain]
: 字符串。当 `instance_accounts` 是请求的键之一时，你必须提供一个域名才能获得有关来自该实例的受欢迎语言的信息。

#### 响应

##### 200: OK

请求 mastodon.social 上的数据以及给定热门话题标签，条目限制为 2。

```json
[
  {
    "key": "languages",
    "data": [
      {
        "key": "en",
        "human_key": "English",
        "value": "10"
      },
      {
        "key": "es",
        "human_key": "Spanish",
        "value": "1"
      }
    ]
  },
  {
    "key": "sources",
    "data": [
      {
        "key": "web",
        "human_key": "Website",
        "value": "3"
      }
    ]
  },
  {
    "key": "servers",
    "data": [
      {
        "key": "botsin.space",
        "human_key": "botsin.space",
        "value": "13738"
      },
      {
        "key": "monads.online",
        "human_key": "monads.online",
        "value": "8928"
      }
    ]
  },
  {
    "key": "space_usage",
    "data": [
      {
        "key": "postgresql",
        "human_key": "PostgreSQL",
        "value": "49581359907",
        "unit": "bytes",
        "human_value": "46.2 GB"
      },
      {
        "key": "redis",
        "human_key": "Redis",
        "value": "100765744",
        "unit": "bytes",
        "human_value": "96.1 MB"
      },
      {
        "key": "media",
        "human_key": "Media storage",
        "value": "837837315424",
        "unit": "bytes",
        "human_value": "780 GB"
      }
    ]
  },
  {
    "key": "software_versions",
    "data": [
      {
        "key": "mastodon",
        "human_key": "Mastodon",
        "value": "3.5.1+chitter",
        "human_value": "3.5.1+chitter"
      },
      {
        "key": "ruby",
        "human_key": "Ruby",
        "value": "3.0.3p157",
        "human_value": "3.0.3p157"
      },
      {
        "key": "postgresql",
        "human_key": "PostgreSQL",
        "value": "14.3",
        "human_value": "14.3"
      },
      {
        "key": "redis",
        "human_key": "Redis",
        "value": "6.2.7",
        "human_value": "6.2.7"
      }
    ]
  },
  {
    "key": "instance_languages",
    "data": [
      {
        "key": "en",
        "human_key": "English",
        "value": "5848"
      },
      {
        "key": "de",
        "human_key": "German",
        "value": "155"
      }
    ]
  },
  {
    "key": "instance_accounts",
    "data": [
      {
        "key": "fribbledom",
        "human_key": "fribbledom",
        "value": "33"
      },
      {
        "key": "ShugoWah",
        "human_key": "ShugoWah",
        "value": "26"
      }
    ]
  },
  {
    "key": "tag_servers",
    "data": [
      {
        "key": "live.hatnix.net",
        "human_key": "live.hatnix.net",
        "value": "6"
      },
      {
        "key": "linuxrocks.online",
        "human_key": "linuxrocks.online",
        "value": "4"
      }
    ]
  },
  {
    "key": "tag_languages",
    "data": [
      {
        "key": "und",
        "human_key": "und",
        "value": "8"
      },
      {
        "key": "en",
        "human_key": "English",
        "value": "7"
      }
    ]
  }
]
```

##### 403: Forbidden

授权用户缺少权限，或者 Authorization 标头无效或缺失

```json
{
  "error": "This action is not allowed"
}
```

## 另请参考

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/admin/dimensions_controller.rb" caption="app/controllers/api/v1/admin/dimensions_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/lib/admin/metrics/dimension.rb" caption="app/lib/admin/metrics/dimension.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/lib/admin/metrics/dimension/" caption="app/lib/admin/metrics/dimension/" >}}

{{< translation-status-zh-cn raw_title="dimensions API methods" raw_link="/methods/admin/dimensions/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
