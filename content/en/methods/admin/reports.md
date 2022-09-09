---
title: reports
description: Perform moderation actions with reports.
menu:
  docs:
    parent: methods-admin
    identifier: methods-admin-reports
---

<!--
TODO: verify and document responses
-->

## View all reports {#get}

```http
GET https://mastodon.example/api/v1/admin/reports HTTP/1.1
```

View information about all reports.

**Returns:** Array of [Admin::Report]({{< relref "entities/admin-report" >}})\
**OAuth:** User token + `admin:read:reports`\
**Version history:**\
2.9.1 - added

#### Request

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Query parameters

resolved
: Boolean. Include resolved reports? <!--TODO: verify this is true-->

account_id
: String. Filter for reports filed by this account. <!--TODO: verify this is true-->

target_account_id
: String. Filter for reports targeting this account.

#### Response
##### 200: OK

<!--
TODO:
-->

##### 403: Forbidden

<!--
TODO:
-->

---

## View a single report {#get-one}

```http
GET https://mastodon.example/api/v1/admin/reports/:id HTTP/1.1
```

**Returns:** [Admin::Report]({{< relref "entities/admin-report" >}})\
**OAuth:** User token + `admin:read:reports`\
**Version history:**\
2.9.1 - added

#### Request

##### Path parameters

:id
: {{<required>}} String. The ID of the SOMETHING in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: OK

<!--
TODO:
-->

##### 403: Forbidden

<!--
TODO:
-->

---

## Assign report to self {#assign_to_self}

```http
POST https://mastodon.example/api/v1/admin/reports/:id/assign_to_self HTTP/1.1
```

Claim the handling of this report to yourself.

**Returns:** [Admin::Report]({{< relref "entities/admin-report" >}})\
**OAuth:** User token + `admin:write:reports`\
**Version history:**\
2.9.1 - added

#### Response
##### 200: OK

<!--
TODO:
-->

##### 403: Forbidden

<!--
TODO:
-->

---

## Unassign report {#unassign}

```http
POST https://mastodon.example/api/v1/admin/reports/:id/unassign HTTP/1.1
```

Unassign a report so that someone else can claim it.

**Returns:** [Admin::Report]({{< relref "entities/admin-report" >}})\
**OAuth:** User token + `admin:write:reports`\
**Version history:**\
2.9.1 - added

#### Request

##### Path parameters

:id
: {{<required>}} String. The ID of the SOMETHING in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: OK

<!--
TODO:
-->

##### 403: Forbidden

<!--
TODO:
-->

---

## Mark report as resolved {#resolve}

```http
POST https://mastodon.example/api/v1/admin/reports/:id/resolve HTTP/1.1
```

Mark a report as resolved with no further action taken.

**Returns:** [Admin::Report]({{< relref "entities/admin-report" >}})\
**OAuth:** User token + `admin:write:reports`\
**Version history:**\
2.9.1 - added

#### Request

##### Path parameters

:id
: {{<required>}} String. The ID of the SOMETHING in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: OK

<!--
TODO:
-->

##### 403: Forbidden

<!--
TODO:
-->

---

## Reopen a closed report {#reopen}

Reopen a currently closed report.

**Returns:** [Admin::Report]({{< relref "entities/admin-report" >}})\
**OAuth:** User token + `admin:write:reports`\
**Version history:**\
2.9.1 - added

#### Request

##### Path parameters

:id
: {{<required>}} String. The ID of the SOMETHING in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: OK

<!--
TODO:
-->

##### 403: Forbidden

<!--
TODO:
-->

---

## See also

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/admin/reports_controller.rb" caption="app/controllers/api/v1/admin/reports_controller.rb" >}}