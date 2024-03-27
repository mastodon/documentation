---
title: reports API methods
description: Report problematic users to your moderators.
menu:
  docs:
    weight: 70
    name: reports
    parent: methods-accounts
    identifier: methods-reports
aliases: [
  "/methods/reports",
  "/api/methods/reports",
  "/methods/accounts/reports",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## File a report {#post}

```http
POST /api/v1/reports HTTP/1.1
```

**Returns:** [Report]({{< relref "entities/report" >}})\
**OAuth:** User token + `write:reports`\
**Version history:**\
1.1 - added\
2.3.0 - add `forward` parameter\
3.5.0 - add `category` and `rule_ids` parameters\
4.0.0 - `category` is now optional if `rule_ids` is provided\
4.2.0 - add `legal` category

#### Request
##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Form data parameters

account_id
: {{<required>}} String. ID of the account to report.

status_ids[]
: Array of String. You can attach statuses to the report to provide additional context.

comment
: String. The reason for the report. Default maximum of 1000 characters.

forward
: Boolean. If the account is remote, should the report be forwarded to the remote admin? Defaults to false.

category
: String. Specify if the report is due to `spam`, `legal` (illegal content), `violation` of enumerated instance rules, or some `other` reason. Defaults to `other`. Will be set to `violation` if `rule_ids[]` is provided (regardless of any category value you provide).

rule_ids[]
: Array of Integer. For `violation` category reports, specify the ID of the exact rules broken. Rules and their IDs are available via [GET /api/v1/instance/rules]({{< relref "methods/instance#rules" >}}) and [GET /api/v1/instance]({{< relref "methods/instance#get" >}}).

#### Response
##### 200: OK

Sample call with one status ID provided and a category of `spam` with a comment

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

##### 401: Unauthorized

Invalid or missing Authorization header

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

Report not filed.

```json
{
  "error": "Record not found"
}
```

##### 422: Unprocessable entity

Token does not have an authorized user

```json
{
  "error": "This method requires an authenticated user"
}
```

Alternatively, the `category` was set to `violation` but invalid or missing `rule_ids` were provided

```json
{
  "error": "Validation failed: Rule ids does not reference valid rules"
}
```

Alternatively (Mastodon 3.5), the `category` was set to something other than `violation` but some `rule_ids` were provided

```json
{
  "error": "Validation failed: Rule ids must be blank"
}
```

---

## See also

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/reports_controller.rb" caption="app/controllers/api/v1/reports_controller.rb" >}}