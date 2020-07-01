---
title: announcements
description: For announcements set by administration.
menu:
  docs:
    weight: 90
    parent: methods
---

{{< api-method method="get" host="https://mastodon.example" path="/api/v1/announcements" title="View all announcements" >}}
{{< api-method-description >}}

See all currently active announcements set by admins.

**Returns:** Array of Announcement\
**OAuth:** User token\
**Version history:**\
3.1.0 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< api-method-query-parameters >}}
{{< api-method-parameter name="with_dismissed" type="boolean" required=false >}}
If true, response will include announcements dismissed by the user. Defaults to false.
{{< endapi-method-parameter >}}
{{< endapi-method-query-parameters >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}

Currently active announcements
{{< endapi-method-response-example-description >}}


```javascript

```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}


{{< api-method method="post" host="https://mastodon.example" path="/api/v1/announcements/:id/dismiss" title="Dismiss an announcement" >}}
{{< api-method-description >}}

Allows a user to mark the announcement as read.

**Returns:** Empty\
**OAuth:** User token + `write:accounts`\
**Version history:**\
3.1.0 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< api-method-path-parameters >}}
{{< api-method-parameter name=":id" type="string" required=true >}}
Local ID of an announcement in the database.
{{< endapi-method-parameter >}}
{{< endapi-method-path-parameters >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}
{{< endapi-method-response-example-description >}}


```javascript

```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}


{{< api-method method="put" host="https://mastodon.example" path="/api/v1/announcements/:id/reactions/:name" title="Add reaction" >}}
{{< api-method-description >}}

React to an announcement with an emoji.

**Returns:** Empty\
**OAuth:** User token + `write:favourites`\
**Version history:**\
3.1.0 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< api-method-path-parameters >}}
{{< api-method-parameter name=":id" type="string" required=true >}}
Local ID of an announcement in the database.
{{< endapi-method-parameter >}}
{{< api-method-parameter name=":name" type="string" required=true >}}
Unicode emoji, or shortcode of custom emoji
{{< endapi-method-parameter >}}
{{< endapi-method-path-parameters >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}
{{< endapi-method-response-example-description >}}


```javascript

```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}

{{< api-method method="delete" host="https://mastodon.example" path="/api/v1/announcements/:id/reactions/:name" title="Remove reaction" >}}
{{< api-method-description >}}

Undo a react emoji to an announcement.

**Returns:** Empty\
**OAuth:** User token + `write:favourites`\
**Version history:**\
3.1.0 - added

{{< endapi-method-description >}}
{{< api-method-spec >}}
{{< api-method-request >}}
{{< api-method-headers >}}
{{< api-method-parameter name="Authorization" type="string" required=true >}}
Bearer &lt;user token&gt;
{{< endapi-method-parameter >}}
{{< endapi-method-headers >}}
{{< api-method-path-parameters >}}
{{< api-method-parameter name=":id" type="string" required=true >}}
Local ID of an announcement in the database.
{{< endapi-method-parameter >}}
{{< api-method-parameter name=":name" type="string" required=true >}}
Unicode emoji, or shortcode of custom emoji
{{< endapi-method-parameter >}}
{{< endapi-method-path-parameters >}}
{{< endapi-method-request >}}
{{< api-method-response >}}
{{< api-method-response-example httpCode=200 >}}
{{< api-method-response-example-description >}}
{{< endapi-method-response-example-description >}}


```javascript

```
{{< endapi-method-response-example >}}
{{< endapi-method-response >}}
{{< endapi-method-spec >}}
{{< endapi-method >}}