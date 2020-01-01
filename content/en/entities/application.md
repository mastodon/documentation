---
title: Application
description: >-
  Represents an application that interfaces with the REST API to access accounts
  or post statuses.
menu:
  docs:
    parent: entities
---

## Example

```javascript
{
  "name": "test app",
  "website": null,
  "vapid_key": "BCk-QqERU0q-CfYZjcuB6lnyyOYfJ2AifKqfeGIm7Z-HiTU5T9eTG5GxVA0_OH5mMlI4UkkDTpaZwozy0TzdZ2M="
}
```

## Required attributes

### `name`

**Description:** The name of your application.
**Type:** String
**Version history:** Added in 0.9.9

## Optional attributes

### `website`

**Description:** The website associated with your application.
**Type:** String \(URL\)
**Version history:** Added in 0.9.9

### `vapid_key`

**Description:** Used for Push Streaming API. Returned with [POST /api/v1/apps](../methods/apps/#create-an-application). Equivalent to [PushSubscription\#server\_key](push-subscription.md#server_key)
**Type:** String
**Version history:** Added in 2.8.0

## Client attributes

### client\_id

**Description:** Client ID key, to be used for obtaining OAuth tokens
**Type:** String
**Version history:** Added in 0.9.9

### client\_secret

**Description:** Client secret key, to be used for obtaining OAuth tokens
**Type:** String
**Version history:** Added in 0.9.9

## See also

* [Status\#application](status.md#application)
* [Create an application \(POST /api/v1/apps\)](../methods/apps/#create-an-application)

{{< page-ref page="status.md" >}}

{{< page-ref page="methods/apps.md" >}}

{{< caption-link url="https://github.com/tootsuite/mastodon/blob/master/app/serializers/rest/application_serializer.rb" caption="app/serializers/rest/application\_serializer.rb" >}}



