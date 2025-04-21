---
title: Admin::Dimension
description: 表示关于实例的定性数据。
menu:
  docs:
    parent: entities
aliases: [
  "/entities/admin-dimension",
  "/entities/Admin-Dimension",
  "/entities/admin_dimension",
  "/entities/Admin_Dimension",
  "/api/entities/admin-dimension",
  "/api/entities/Admin-Dimension",
  "/api/entities/admin_dimension",
  "/api/entities/Admin_Dimension",
]
---

## 属性

### `key` {#key}

**描述:** 请求维度的唯一键。\
**类型:** 字符串\
**版本历史:**\
3.5.0 - 添加

### `data` {#data}

**描述:** 请求维度可用的数据。\
**类型:** 哈希值的数组\
**版本历史:**\
3.5.0 - 添加

## Data attributes

### `key` {#data-key}

**描述:** 此数据项的唯一键。\
**类型:** 字符串\
**版本历史:**\
3.5.0 - 添加

### `human_key` {#data-human_key}

**描述:** 此数据项的可读键。\
**类型:** 字符串\
**版本历史:**\
3.5.0 - 添加

### `value` {#data-value}

**描述:** 此数据项的值。\
**类型:** 字符串\
**版本历史:**\
3.5.0 - 添加

### `unit` {{%optional%}} {#data-unit}

**描述:** 与此数据项的值相关的单位（如果适用）。\
**类型:** 字符串\
**版本历史:**\
3.5.0 - 添加

### `human_value` {{%optional%}} {#data-human_value}

**描述:** 此数据项的可读格式化值。\
**类型:** 字符串\
**版本历史:**\
3.5.0 - 添加

## 示例

### `languages` {#languages}

统计每种语言发布的本站嘟文的数量，然后展示关于每种语言受欢迎程度的维度数据。

```json
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
		},
		// ...
	]
}
```

### `sources` {#sources}

统计由给定客户端发布的本站嘟文的数量，然后展示关于每个客户端受欢迎程度的维度数据。

```json
{
	"key": "sources",
	"data": [
		{
			"key": "web",
			"human_key": "Website",
			"value": "2"
		},
		// ...
	]
}
```

### `servers` {#servers}

统计从给定域发布的嘟文数量，然后展示关于最受欢迎的外站实例的维度数据。

```json
{
    "key": "servers",
    "data": [
      {
        "key": "botsin.space",
        "human_key": "botsin.space",
        "value": "13738"
      },
      {
        "key": "mastodon.social",
        "human_key": "mastodon.social",
        "value": "8928"
      },
		// ...
    ]
  }
```

### `space_usage` {#space_usage}

展示关于实例堆栈中每个软件占用的空间的维度数据。

```json
{
	"key": "space_usage",
	"data": [
		{
			"key": "postgresql",
			"human_key": "PostgreSQL",
			"value": "14924935",
			"unit": "bytes",
			"human_value": "14.2 MB"
		},
		{
			"key": "redis",
			"human_key": "Redis",
			"value": "1972544",
			"unit": "bytes",
			"human_value": "1.88 MB"
		},
		{
			"key": "media",
			"human_key": "Media storage",
			"value": "0",
			"unit": "bytes",
			"human_value": "0 Bytes"
		}
	]
}
```

### `software_versions` {#software_versions}

展示关于实例堆栈中正在使用的软件版本的维度数据。

```json
{
	"key": "software_versions",
	"data": [
		{
			"key": "mastodon",
			"human_key": "Mastodon",
			"value": "3.5.3",
			"human_value": "3.5.3"
		},
		{
			"key": "ruby",
			"human_key": "Ruby",
			"value": "3.0.4p208",
			"human_value": "3.0.4p208"
		},
		{
			"key": "postgresql",
			"human_key": "PostgreSQL",
			"value": "10.22",
			"human_value": "10.22"
		},
		{
			"key": "redis",
			"human_key": "Redis",
			"value": "4.0.9",
			"human_value": "4.0.9"
		}
	]
}
```

### `tag_servers` {#tag_servers}

统计包含给定 `id` 的热门话题标签的嘟文数量，然后展示关于使用该热门话题标签的最受欢迎的实例的维度数据。

```json
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
}
```

### `tag_languages` {#tag_languages}

统计包含给定 `id` 的热门话题标签的嘟文数量，然后展示关于这些嘟文的最受欢迎的语言的维度数据。

```json
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
      },
		// ...
    ]
  }
```

### `instance_accounts` {#instance_accounts}

统计给定 `domain` 中每个账户的关注者数量，然后展示关于该外站实例中最受欢迎的账户的维度数据。

```json
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
		},
		// ...
	]
}
```

### `instance_languages` {#instance_languages}

统计给定 `domain` 中每种语言发布的嘟文数量，然后展示关于该外站实例上每种语言的受欢迎程度的维度数据。

```json
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
		},
		// ...
	]
}
```

## 另请参考

{{< page-relref ref="methods/admin/dimensions" caption="admin/dimensions API 方法" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/admin/dimension_serializer.rb" caption="app/serializers/rest/admin/dimension_serializer.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/lib/admin/metrics/dimension.rb" caption="app/lib/admin/metrics/dimension.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/lib/admin/metrics/dimension/" caption="app/lib/admin/metrics/dimension/" >}}

{{< translation-status-zh-cn raw_title="Admin::Dimension" raw_link="/entities/Admin_Dimension/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}
