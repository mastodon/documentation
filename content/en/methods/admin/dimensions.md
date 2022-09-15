---
title: admin/dimensions
description: Obtain certain statistics about the server.
menu:
  docs:
    parent: methods-admin
    identifier: methods-admin-dimensions
---

## Generate dimensional data {#create}

```http
POST https://mastodon.example/api/v1/admin/dimensions HTTP/1.1
```

Obtain information about popularity of certain accounts, servers, languages, etc.

**Returns:** Array of [Admin::Dimension]({{< relref "entities/Admin_Dimension" >}})\
**OAuth:** User token + `admin:read`\
**Permissions:** View Dashboard\
**Version history:**\
3.5.0 - added\
3.6.0 - support custom roles and permissions

#### Request

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Form data parameters

keys[]
: {{<required>}} Array of String. Request specific measurements by their keystring.

start_at
: String (ISO 8601 Datetime). The start date for the time period. If a time is provided, it will be ignored.

end_at
: String (ISO 8601 Datetime). The end date for the time period. If a time is provided, it will be ignored.

limit
: Integer. The maximum number of results to return for sources, servers, languages, tag or instance dimensions. ???

tag_servers[id]
: String. When `tag_servers` is one of the requested keys, you must provide a trending tag ID to obtain information about which servers are posting the tag.

tag_languages[id]
: String. When `tag_languages` is one of the requested keys, you must provide a trending tag ID to obtain information about which languages are posting the tag.

instance_accounts[domain]
: String. When `instance_accounts` is one of the requested keys, you must provide a domain to obtain information about popular accounts from that domain.

instance_languages[domain]
: String. When `instance_accounts` is one of the requested keys, you must provide a domain to obtain information about popular languages from that domain.

#### Response

##### 200: OK

Requesting data on mastodon.social and a given trending tag with a limit of 2.

```javascript
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

Authorized user is missing a permission, or invalid or missing Authorization header

```javascript
{
  "error": "This action is not allowed"
}
```

## See also

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/admin/dimensions_controller.rb" caption="app/controllers/api/v1/admin/dimensions_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/lib/admin/metrics/dimension.rb" caption="app/lib/admin/metrics/dimension.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/lib/admin/metrics/dimension/" caption="app/lib/admin/metrics/dimension/" >}}