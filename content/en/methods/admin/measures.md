---
title: measures API methods
summary: Obtain quantitative metrics about the server.
menu:
  docs:
    name: measures
    parent: methods-admin
    identifier: methods-admin-measures
aliases: [
  "/methods/admin/measures",
  "/api/methods/admin/measures",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## Get measurable data {#get}

```http
POST /api/v1/admin/measures HTTP/1.1
```

Obtain statistical measures for your server.

**Returns:** Array of [Admin::Measure]({{< relref "entities/Admin_Measure" >}})\
**OAuth:** User token + `admin:read`\
**Permissions:** View Dashboard\
**Version history:**\
3.5.0 - added\
4.0.0 - support custom roles and permissions

#### Request

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Form data parameters

keys[]
: {{<required>}} Array of String. Request specific measures by their keystring. Supported measures include:
- `active_users` = Total active users on your instance within the time period
- `new_users` = Users who joined your instance within the time period
- `interactions` = Total interactions (favourites, boosts, replies) on local statuses within the time period
- `opened_reports` = Total reports filed within the time period
- `resolved_reports` = Total reports resolved within the time period
- `tag_accounts` = Total accounts who used a tag in at least one status within the time period
- `tag_uses` = Total statuses which used a tag within the time period
- `tag_servers` = Total remote origin servers for statuses which used a tag within the time period
- `instance_accounts` = Total accounts originating from a remote domain within the time period
- `instance_media_attachments` = Total space used by media attachments from a remote domain within the time period
- `instance_reports` = Total reports filed against accounts from a remote domain within the time period
- `instance_statuses` = Total statuses originating from a remote domain within the time period
- `instance_follows` = Total accounts from a remote domain followed by a local user within the time period
- `instance_followers` = Total local accounts followed by accounts from a remote domain within the time period

start_at
: {{<required>}} String (ISO 8601 Datetime). The start date for the time period. If a time is provided, it will be ignored.

end_at
: {{<required>}} String (ISO 8601 Datetime). The end date for the time period. If a time is provided, it will be ignored.

tag_accounts[id]
: String. When `tag_accounts` is one of the requested keys, you must provide a tag ID to obtain the measure of how many accounts used that hashtag in at least one status within the given time period.

tag_uses[id]
: String. When `tag_uses` is one of the requested keys, you must provide a tag ID to obtain the measure of how many statuses used that hashtag within the given time period.

tag_servers[id]
: String. When `tag_servers` is one of the requested keys, you must provide a tag ID to obtain the measure of how many servers used that hashtag in at least one status within the given time period.

instance_accounts[domain]
: String. When `instance_accounts` is one of the requested keys, you must provide a remote domain to obtain the measure of how many accounts have been discovered from that server within the given time period.

instance_media_attachments[domain]
: String. When `instance_media_attachments` is one of the requested keys, you must provide a remote domain to obtain the measure of how much space is used by media attachments from that server within the given time period.

instance_reports[domain]
: String. When `instance_reports` is one of the requested keys, you must provide a remote domain to obtain the measure of how many reports have been filed against accounts from that server within the given time period.

instance_statuses[domain]
: String. When `instance_statuses` is one of the requested keys, you must provide a remote domain to obtain the measure of how many statuses originate from that server within the given time period.

instance_follows[domain]
: String. When `instance_follows` is one of the requested keys, you must provide a remote domain to obtain the measure of how many follows were performed on accounts from that server by local accounts within the given time period.

instance_followers[domain]
: String. When `instance_followers` is one of the requested keys, you must provide a remote domain to obtain the measure of how many follows were performed by accounts from that server on local accounts within the given time period.

#### Response
##### 200: OK

Returns quantitative data for each measure, in aggregate and also by data bucket.

```json
[
  {
    "key": "active_users",
    "unit": null,
    "total": "2",
    "previous_total": "0",
    "data": [
      {
        "date": "2022-09-14T00:00:00Z",
        "value": "0"
      },
      // ...
    ]
  },
  {
    "key": "new_users",
    "unit": null,
    "total": "2",
    "previous_total": "0",
    "data": [
      {
        "date": "2022-09-14T00:00:00.000+00:00",
        "value": "0"
      },
      // ...
    ]
  },
  {
    "key": "interactions",
    "unit": null,
    "total": "0",
    "previous_total": "0",
    "data": [
      {
        "date": "2022-09-14T00:00:00Z",
        "value": "0"
      },
      // ...
    ]
  },
  {
    "key": "opened_reports",
    "unit": null,
    "total": "0",
    "previous_total": "0",
    "data": [
      {
        "date": "2022-09-14T00:00:00.000+00:00",
        "value": "0"
      },
      // ...
    ]
  },
  {
    "key": "resolved_reports",
    "unit": null,
    "total": "0",
    "previous_total": "0",
    "data": [
      {
        "date": "2022-09-14T00:00:00.000+00:00",
        "value": "0"
      },
      // ...
    ]
  },
  {
    "key": "tag_accounts",
    "unit": null,
    "total": "1",
    "previous_total": "0",
    "data": [
      {
        "date": "2022-09-14T00:00:00Z",
        "value": "0"
      },
      // ...
    ]
  },
  {
    "key": "tag_uses",
    "unit": null,
    "total": "2",
    "previous_total": "0",
    "data": [
      {
        "date": "2022-09-14T00:00:00Z",
        "value": "0"
      },
      // ...
    ]
  },
  {
    "key": "tag_servers",
    "unit": null,
    "total": "0",
    "previous_total": "0",
    "data": [
      {
        "date": "2022-09-14T00:00:00.000+00:00",
        "value": "0"
      },
      // ...
    ]
  },
  {
    "key": "instance_accounts",
    "unit": null,
    "total": "0",
    "data": [
      {
        "date": "2022-09-14T00:00:00.000+00:00",
        "value": "0"
      },
      // ...
    ]
  },
  {
    "key": "instance_media_attachments",
    "unit": "bytes",
    "total": "0",
    "human_value": "0 Bytes",
    "data": [
      {
        "date": "2022-09-14T00:00:00.000+00:00",
        "value": ""
      },
      // ...
    ]
  },
  {
    "key": "instance_reports",
    "unit": null,
    "total": "0",
    "data": [
      {
        "date": "2022-09-14T00:00:00.000+00:00",
        "value": "0"
      },
      // ...
    ]
  },
  {
    "key": "instance_statuses",
    "unit": null,
    "total": "0",
    "data": [
      {
        "date": "2022-09-14T00:00:00.000+00:00",
        "value": "0"
      },
      // ...
    ]
  },
  {
    "key": "instance_follows",
    "unit": null,
    "total": "0",
    "data": [
      {
        "date": "2022-09-14T00:00:00.000+00:00",
        "value": "0"
      },
      // ...
    ]
  },
  {
    "key": "instance_followers",
    "unit": null,
    "total": "0",
    "data": [
      {
        "date": "2022-09-14T00:00:00.000+00:00",
        "value": "0"
      },
      // ...
    ]
  }
]
```

##### 403: Forbidden

Authorized user is missing a permission, or invalid or missing Authorization header

```json
{
  "error": "This action is not allowed"
}
```

---

## See also

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/admin/measures_controller.rb" caption="app/controllers/api/v1/admin/measures_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/lib/admin/metrics/measure.rb" caption="app/lib/admin/metrics/measure.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/lib/admin/metrics/measure/" caption="app/lib/admin/metrics/measure/" >}}