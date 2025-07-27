---
title: Report
description: Reports filed against users and/or statuses, to be taken action on by moderators.
menu:
  docs:
    parent: entities
aliases: [
  "/entities/report",
  "/entities/Report",
  "/api/entities/report",
  "/api/entities/Report",
]
---

## Example

```json
{
  "id": "48914",
  "action_taken": false,
  "action_taken_at": null,
  "category": "spam",
  "comment": "Spam account",
  "forwarded": false,
  "created_at": "2022-08-25T09:56:16.763Z",
  "status_ids": [
    "108882889550545820"
  ],
  "rule_ids": null,
  "target_account": {
    "id": "108366849347798387",
    "username": "Baluke",
    "acct": "Baluke",
    "display_name": "Baluke Dental Studios",
    "locked": false,
    "bot": false,
    "discoverable": false,
    "group": false,
    "created_at": "2022-05-26T00:00:00.000Z",
    "note": "<p>Baluke Dental Studios is a full service dental lab offering fabrication, staining, and digital services. Advanced technologies and a meticulous process ensure reduced chair time, lower costs, and better patient outcomes with beautiful smiles. Talk to a representative today.</p><p><a href=\"https://baluke.com/\" target=\"_blank\" rel=\"nofollow noopener noreferrer\"><span class=\"invisible\">https://</span><span class=\"\">baluke.com/</span><span class=\"invisible\"></span></a></p>",
    "url": "https://mastodon.social/@Baluke",
    "avatar": "https://files.mastodon.social/accounts/avatars/108/366/849/347/798/387/original/dbcfe99ed5def0f4.png",
    "avatar_static": "https://files.mastodon.social/accounts/avatars/108/366/849/347/798/387/original/dbcfe99ed5def0f4.png",
    "header": "https://static-cdn.mastodon.social/headers/original/missing.png",
    "header_static": "https://static-cdn.mastodon.social/headers/original/missing.png",
    "followers_count": 0,
    "following_count": 0,
    "statuses_count": 38,
    "last_status_at": "2022-08-25",
    "emojis": [],
    "fields": []
  }
}
```

## Attributes

### `id` {#id}

**Description:** The ID of the report in the database.\
**Type:** String (cast from integer)\
**Version history:**\
1.1.0 - added

### `action_taken` {#action_taken}

**Description:** Whether an action was taken yet.\
**Type:** Boolean\
**Version history:**\
1.1.0 - added

### `action_taken_at` {#action_taken_at}

**Description:** When an action was taken against the report.\
**Type:** {{<nullable>}} String ([Datetime](/api/datetime-format#datetime)) or null\
**Version history:**\
4.0.0 - added

### `category` {#category}

**Description:** The generic reason for the report.\
**Type:** String (Enumerable oneOf)\
`spam` = Unwanted or repetitive content\
`legal` = Illegal content\
`violation` = A specific rule was violated\
`other` = Some other reason\
**Version history:**\
4.0.0 - added\
4.2.0 - add `legal` category

### `comment` {#comment}

**Description:** The reason for the report.\
**Type:** String\
**Version history:**\
4.0.0 - added

### `forwarded` {#forwarded}

**Description:** Whether the report was forwarded to a remote domain.\
**Type:** Boolean\
**Version history:**\
4.0.0 - added

### `created_at` {#created_at}

**Description:** When the report was created.\
**Type:** String ([Datetime](/api/datetime-format#datetime))\
**Version history:**\
4.0.0 - added

### `status_ids` {#status_ids}

**Description:** IDs of statuses that have been attached to this report for additional context.\
**Type:** {{<nullable>}} Array of String (cast from integer), or null\
**Version history:**\
4.0.0 - added

### `rule_ids` {#rule_ids}

**Description:** IDs of the rules that have been cited as a violation by this report.\
**Type:** {{<nullable>}} Array of String (cast from integer), or null\
**Version history:**\
4.0.0 - added

### `target_account` {#target_account}

**Description:** The account that was reported.\
**Type:** [Account]({{< relref "entities/account" >}})\
**Version history:**\
4.0.0 - added

## See also

{{< page-relref ref="methods/reports" caption="reports API methods" >}}

{{< page-relref ref="entities/Notification#report" caption="Notification (`report` attribute)" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/report_serializer.rb" caption="app/serializers/rest/report_serializer.rb" >}}



