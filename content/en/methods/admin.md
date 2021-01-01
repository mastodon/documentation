---
title: admin
description: Perform moderation actions with accounts and reports.
menu:
  docs:
    weight: 80
    parent: methods
    identifier: methods-admin
---

{{< hint style="warning" >}}

Responses are not currently documented. Exact nature of parameters has not been validated.
{{< /hint >}}


## Account methods

{{< api-method method="get" host="https://mastodon.example" path="/api/v1/admin/accounts" title="View accounts by criteria" >}}
{{< api-method-description >}}

View accounts matching certain criteria for filtering, up to 100 at a time. Pagination may be done with the HTTP Link header in the response.

**Returns:** Admin::Account\
**OAuth:** User token + `admin:read:accounts`\
**Version history:**\
2.9.1 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< api-method-query-parameters >}}
{{< api-method-parameter name="local" type="boolean" required=false >}}
Filter for local accounts?
{{< endapi-method-parameter >}}
{{< api-method-parameter name="remote" type="boolean" required=false >}}
Filter for remote accounts?
{{< endapi-method-parameter >}}
{{< api-method-parameter name="by_domain" type="string" required=false >}}
Filter by the given domain
{{< endapi-method-parameter >}}
{{< api-method-parameter name="active" type="boolean" required=false >}}
Filter for currently active accounts?
{{< endapi-method-parameter >}}
{{< api-method-parameter name="pending" type="boolean" required=false >}}
Filter for currently pending accounts?
{{< endapi-method-parameter >}}
{{< api-method-parameter name="disabled" type="boolean" required=false >}}
Filter for currently disabled accounts?
{{< endapi-method-parameter >}}
{{< api-method-parameter name="silenced" type="boolean" required=false >}}
Filter for currently silenced accounts?
{{< endapi-method-parameter >}}
{{< api-method-parameter name="suspended" type="boolean" required=false >}}
Filter for currently suspended accounts?
{{< endapi-method-parameter >}}
{{< api-method-parameter name="username" type="string" required=false >}}
Username to search for
{{< endapi-method-parameter >}}
{{< api-method-parameter name="display_name" type="string" required=false >}}
Display name to search for
{{< endapi-method-parameter >}}
{{< api-method-parameter name="email" type="string" required=false >}}
Lookup a user with this email
{{< endapi-method-parameter >}}
{{< api-method-parameter name="ip" type="string" required=false >}}
Lookup users by this IP address
{{< endapi-method-parameter >}}
{{< api-method-parameter name="staff" type="boolean" required=false >}}
Filter for staff accounts?
{{< endapi-method-parameter >}}
{{< endapi-method-query-parameters >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}
{{< endapi-method-response-example-description >}}


```

```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}
{{< api-method method="get" host="https://mastodon.example" path="/api/v1/admin/accounts/:id" title="View a specific account" >}}
{{< api-method-description >}}

View admin-level information about the given account.

**Returns:** Admin::Account\
**OAuth:** User token + `admin:read:accounts`\
**Version history:**\
2.9.1 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-path-parameters >}}
{{< api-method-parameter name=":id" type="string" required=true >}}
ID of the account
{{< endapi-method-parameter >}}
{{< endapi-method-path-parameters >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}
{{< endapi-method-response-example-description >}}


```

```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}
{{< api-method method="post" host="https://mastodon.example" path="/api/v1/admin/accounts/:account_id/action" title="Perform an action against an account" >}}
{{< api-method-description >}}

Perform an action against an account and log this action in the moderation history.

**Returns:** empty object\
**OAuth:** User token + `admin:write:accounts`\
**Version history:**\
2.9.1 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-path-parameters >}}
{{< api-method-parameter name=":account_id" type="string" required=true >}}
ID of the account
{{< endapi-method-parameter >}}
{{< endapi-method-path-parameters >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< api-method-form-data-parameters >}}
{{< api-method-parameter name="type" type="string" required=false >}}
Type of action to be taken. Enumerable oneOf: `none` `disable` `silence` `suspend`
{{< endapi-method-parameter >}}
{{< api-method-parameter name="report_id" type="string" required=false >}}
ID of an associated report that caused this action to be taken
{{< endapi-method-parameter >}}
{{< api-method-parameter name="warning_preset_id" type="string" required=false >}}
ID of a preset warning
{{< endapi-method-parameter >}}
{{< api-method-parameter name="text" type="string" required=false >}}
Additional text for clarification of why this action was taken
{{< endapi-method-parameter >}}
{{< api-method-parameter name="send_email_notification" type="boolean" required=false >}}
Whether an email should be sent to the user with the above information.
{{< endapi-method-parameter >}}
{{< endapi-method-form-data-parameters >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}
{{< endapi-method-response-example-description >}}


```

```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}
{{< api-method method="post" host="https://mastodon.example" path="/api/v1/admin/accounts/:id/approve" title="Approve pending account" >}}
{{< api-method-description >}}

Approve the given local account if it is currently pending approval.

**Returns:** Admin::Account\
**OAuth:** User token + `admin:write:accounts`\
**Version history:**\
2.9.1 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-path-parameters >}}
{{< api-method-parameter name=":id" type="string" required=true >}}
ID of the account
{{< endapi-method-parameter >}}
{{< endapi-method-path-parameters >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}
{{< endapi-method-response-example-description >}}


```

```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}
{{< api-method method="post" host="https://mastodon.example" path="/api/v1/admin/accounts/:id/reject" title="Reject pending account" >}}
{{< api-method-description >}}

Reject the given local account if it is currently pending approval.

**Returns:** Admin::Account\
**OAuth:** User token + `admin:write:accounts`\
**Version history:**\
2.9.1 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-path-parameters >}}
{{< api-method-parameter name=":id" type="string" required=true >}}
ID of the account
{{< endapi-method-parameter >}}
{{< endapi-method-path-parameters >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}
{{< endapi-method-response-example-description >}}


```

```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}
{{< api-method method="post" host="https://mastodon.example" path="/api/v1/admin/accounts/:id/enable" title="Re-enable account" >}}
{{< api-method-description >}}

Re-enable a local account whose login is currently disabled.

**Returns:** Admin::Account\
**OAuth:** User token + `admin:write:accounts`\
**Version history:**\
2.9.1 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-path-parameters >}}
{{< api-method-parameter name=":id" type="string" required=true >}}
ID of the account
{{< endapi-method-parameter >}}
{{< endapi-method-path-parameters >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}
{{< endapi-method-response-example-description >}}


```

```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}
{{< api-method method="post" host="https://mastodon.example" path="/api/v1/admin/accounts/:id/unsilence" title="Unsilence account" >}}
{{< api-method-description >}}

Unsilence a currently silenced account.

**Returns:** Admin::Account\
**OAuth:** User token + `admin:write:accounts`\
**Version history:**\
2.9.1 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-path-parameters >}}
{{< api-method-parameter name=":id" type="string" required=true >}}
ID of the account
{{< endapi-method-parameter >}}
{{< endapi-method-path-parameters >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}
{{< endapi-method-response-example-description >}}


```

```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}
{{< api-method method="post" host="https://mastodon.example" path="/api/v1/admin/accounts/:id/unsuspend" title="Unsuspend account" >}}
{{< api-method-description >}}

Unsuspend a currently suspended account.

**Returns:** Admin::Account\
**OAuth:** User token + `admin:write:accounts`\
**Version history:**\
2.9.1 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-path-parameters >}}
{{< api-method-parameter name=":id" type="string" required=true >}}
ID of the account
{{< endapi-method-parameter >}}
{{< endapi-method-path-parameters >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}
{{< endapi-method-response-example-description >}}


```

```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}


## Report methods

{{< api-method method="get" host="https://mastodon.example" path="/api/v1/admin/reports" title="View all reports" >}}
{{< api-method-description >}}

View all reports. Pagination may be done with HTTP Link header in the response.

**Returns:** Array of Admin::Report\
**OAuth:** User token + `admin:read:reports`\
**Version history:**\
2.9.1 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< api-method-query-parameters >}}
{{< api-method-parameter name="resolved" type="boolean" required=false >}}
{{< endapi-method-parameter >}}
{{< api-method-parameter name="account_id" type="string" required=false >}}
{{< endapi-method-parameter >}}
{{< api-method-parameter name="target_account_id" type="string" required=false >}}
{{< endapi-method-parameter >}}
{{< endapi-method-query-parameters >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}
{{< endapi-method-response-example-description >}}


```

```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}
{{< api-method method="get" host="https://mastodon.example" path="/api/v1/admin/reports/:id/" title="View a single report" >}}
{{< api-method-description >}}

View information about the report with the given ID.

**Returns:** Admin::Report\
**OAuth:** User token + `admin:read:reports`\
**Version history:**\
2.9.1 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-path-parameters >}}
{{< api-method-parameter name=":id" type="string" required=true >}}
ID of the report
{{< endapi-method-parameter >}}
{{< endapi-method-path-parameters >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}
{{< endapi-method-response-example-description >}}


```

```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}
{{< api-method method="post" host="https://mastodon.example" path="/api/v1/admin/reports/:id/assign_to_self" title="Assign report to self" >}}
{{< api-method-description >}}

Claim the handling of this report to yourself.

**Returns:** Admin::Report\
**OAuth:** User token + `admin:write:reports`\
**Version history:**\
2.9.1 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-path-parameters >}}
{{< api-method-parameter name=":id" type="string" required=true >}}
ID of the report
{{< endapi-method-parameter >}}
{{< endapi-method-path-parameters >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}
{{< endapi-method-response-example-description >}}


```

```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}
{{< api-method method="post" host="https://mastodon.example" path="/api/v1/admin/reports/:id/unassign" title="Unassign report" >}}
{{< api-method-description >}}

Unassign a report so that someone else can claim it.

**Returns:** Admin::Report\
**OAuth:** User token + `admin:write:reports`\
**Version history:**\
2.9.1 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-path-parameters >}}
{{< api-method-parameter name=":id" type="string" required=true >}}
ID of the report
{{< endapi-method-parameter >}}
{{< endapi-method-path-parameters >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}
{{< endapi-method-response-example-description >}}


```

```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}
{{< api-method method="post" host="https://mastodon.example" path="/api/v1/admin/reports/:id/resolve" title="Mark as resolved" >}}
{{< api-method-description >}}

Mark a report as resolved with no further action taken.

**Returns:** Admin::Report\
**OAuth:** User token + `admin:write:reports`\
**Version history:**\
2.9.1 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-path-parameters >}}
{{< api-method-parameter name=":id" type="string" required=true >}}
ID of the report
{{< endapi-method-parameter >}}
{{< endapi-method-path-parameters >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}
{{< endapi-method-response-example-description >}}


```

```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}
{{< api-method method="post" host="https://mastodon.example" path="/api/v1/admin/reports/:id/reopen" title="Re-open report" >}}
{{< api-method-description >}}

Reopen a currently closed report.

**Returns:** Admin::Report\
**OAuth:** User token + `admin:write:reports`\
**Version history:**\
2.9.1 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-path-parameters >}}
{{< api-method-parameter name=":id" type="string" required=true >}}
ID of the report
{{< endapi-method-parameter >}}
{{< endapi-method-path-parameters >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}
{{< endapi-method-response-example-description >}}


```

```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}


