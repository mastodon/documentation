---
title: Application
description: Represents an application that interfaces with the REST API to access accounts or post statuses.
menu:
  docs:
    parent: entities
aliases: [
	"/entities/application",
	"/entities/Application",
  "/api/entities/application",
	"/api/entities/Application",
]
---

## Example

```json
{
  "name": "test app",
  "website": null,
  "vapid_key": "BCk-QqERU0q-CfYZjcuB6lnyyOYfJ2AifKqfeGIm7Z-HiTU5T9eTG5GxVA0_OH5mMlI4UkkDTpaZwozy0TzdZ2M="
}
```

## Attributes

### `name` {#name}

**Description:** The name of your application.\
**Type:** String\
**Version history:**\
0.9.9 - added

### `website` {{%optional%}} {#website}

**Description:** The website associated with your application.\
**Type:** {{<nullable>}} String (URL)\
**Version history:**\
0.9.9 - added\
3.5.1 - this property is now nullable

### `client_id` {{%optional%}} {#client_id}

**Description:** Client ID key, to be used for obtaining OAuth tokens\
**Type:** String\
**Version history:**\
0.9.9 - added

### `client_secret` {{%optional%}} {#client_secret}

**Description:** Client secret key, to be used for obtaining OAuth tokens\
**Type:** String\
**Version history:**\
0.9.9 - added

## Deprecated attributes

### `vapid_key` {#vapid_key}

**Description:** Used for Push Streaming API. Returned with [POST /api/v1/apps]({{< relref "methods/apps#create" >}}). Equivalent to [WebPushSubscription#server_key]({{< relref "entities/WebPushSubscription#server_key" >}}) and [Instance#vapid_public_key]({{< relref "entities/Instance#vapid_public_key" >}})\
**Type:** String\
**Version history:**\
2.8.0 - added
4.3.0 - deprecated pending removal

## See also

{{< page-relref ref="methods/apps" caption="apps API methods" >}}

{{< page-relref ref="entities/Status#application" caption="Status (`application` attribute)" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/application_serializer.rb" caption="app/serializers/rest/application_serializer.rb" >}}
