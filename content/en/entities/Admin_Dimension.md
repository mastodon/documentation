---
title: Admin::Dimension
description: Represents qualitative data about the server.
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

## Attributes

### `key` {#key}

**Description:** The unique keystring for the requested dimension.\
**Type:** String\
**Version history:**\
3.5.0 - added

### `data` {#data}

**Description:** The data available for the requested dimension.\
**Type:** Array of Hash\
**Version history:**\
3.5.0 - added

## Data attributes

### `key` {#data-key}

**Description:** The unique keystring for this data item.\
**Type:** String\
**Version history:**\
3.5.0 - added

### `human_key` {#data-human_key}

**Description:** A human-readable key for this data item.\
**Type:** String\
**Version history:**\
3.5.0 - added

### `value` {#data-value}

**Description:** The value for this data item.\
**Type:** String\
**Version history:**\
3.5.0 - added

### `unit` {{%optional%}} {#data-unit}

**Description:** The units associated with this data item's value, if applicable.\
**Type:** String\
**Version history:**\
3.5.0 - added

### `human_value` {{%optional%}} {#data-human_value}

**Description:** A human-readable formatted value for this data item.\
**Type:** String\
**Version history:**\
3.5.0 - added

## Examples

### `languages` {#languages}

Count how many local statuses are posted in each language, then show dimensional data about how popular each language is.

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

Count how many local statuses were authored by a given client, then show dimensional data about how popular each client is.

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

Count how many statuses were posted from a given domain, then show dimensional data about the most popular remote servers.

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

Show dimensional data about how much space is used by each software in your server stack.

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

Show dimensional data about which versions of software in your server stack you are using.

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

Count how many statuses contain the trending tag with the given `id`, then show dimensional data about the most popular servers using that trending tag.

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

Count how many statuses contain the trending tag with the given `id`, then show dimensional data about the most popular languages for those statuses.

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

Count how many followers each account from the given `domain` has, then show dimensional data about the most popular accounts from that remote server.

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

Count how many statuses from the given `domain` are posted in each language, then show dimensional data about how popular each language is on that remote server.

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

## See also

{{< page-relref ref="methods/admin/dimensions" caption="admin/dimensions API methods" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/admin/dimension_serializer.rb" caption="app/serializers/rest/admin/dimension_serializer.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/lib/admin/metrics/dimension.rb" caption="app/lib/admin/metrics/dimension.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/lib/admin/metrics/dimension/" caption="app/lib/admin/metrics/dimension/" >}}