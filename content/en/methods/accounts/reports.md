---
title: reports
description: Report problematic users to your moderators.
menu:
  docs:
    weight: 70
    parent: methods-accounts
---

{{< hint style="warning" >}}

Responses are not currently documented.
{{< /hint >}}
{{< api-method method="post" host="https://mastodon.example" path="/api/v1/reports" title="File a report" >}}
{{< api-method-description >}}

**Returns:** Report\
**OAuth:** User token + `write:reports`\
**Version history:**\
1.1 - added\
2.3.0 - add `forward` parameter

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< api-method-form-data-parameters >}}
{{< api-method-parameter name="account_id" type="string" required=true >}}
ID of the account to report
{{< endapi-method-parameter >}}
{{< api-method-parameter name="status_ids" type="array" required=false >}}
Array of Statuses to attach to the report, for context
{{< endapi-method-parameter >}}
{{< api-method-parameter name="comment" type="string" required=false >}}
Reason for the report \(default max 1000 characters\)
{{< endapi-method-parameter >}}
{{< api-method-parameter name="forward" type="boolean" required=false >}}
If the account is remote, should the report be forwarded to the remote admin?
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


