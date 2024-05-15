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
  "name": "Test Application",
  "website": "https://app.example",
  "scopes": ["read", "write", "push"],
  "redirect_uri": "https://app.example/callback\nhttps://app.example/register",
  "redirect_uris": [
    "https://app.example/callback",
    "https://app.example/register"
  ]
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

### `client_id` {#client_id}

**Description:** Client ID key, to be used for obtaining OAuth tokens\
**Type:** String\
**Version history:**\
0.9.9 - added
4.3.0 - changed to always be returned

### `client_secret` {{%optional%}} {#client_secret}

**Description:** Client secret key, to be used for obtaining OAuth tokens\
**Type:** String\
**Version history:**\
0.9.9 - added

### `scopes` {#scopes}

**Description:** The scopes for your application. This is the registered `scopes` string split on whitespace.\
**Type:** Array of Strings\
**Version history:**\
4.3.0 - added

### `redirect_uris` {#redirect_uris}

**Description:** The registered redirection URI(s) for your application.\
**Type:** Array of String (URLs or `"urn:ietf:wg:oauth:2.0:oob"` as values)\
**Version history:**\
4.3.0 - added

## Deprecated attributes

### `redirect_uri` {#redirect_uri}

**Description:** The registered redirection URI(s) for your application.\
May contain `\n` characters when multiple redirect URIs are registered.\
**Type:** String\
**Version history:**\
0.0.0 - added\
4.3.0 - deprecated in favour of [`redirect_uris`]({{< relref "entities/Application#redirect_uris" >}}), since the value of this property is not a well-formed URI when multiple redirect URIs are registered

### `vapid_key` {#vapid_key}

**Description:** Used for Push Streaming API. Returned with [POST /api/v1/apps]({{< relref "methods/apps#create" >}}). Equivalent to [WebPushSubscription#server_key]({{< relref "entities/WebPushSubscription#server_key" >}}) and [Instance#vapid_public_key]({{< relref "entities/Instance#vapid_public_key" >}})\
**Type:** String\
**Version history:**\
2.8.0 - added\
4.3.0 - deprecated pending removal, please see [api/v2/instance]({{< relref "methods/Instance#v2">}}) for this value (`configuration.vapid.public_key`)

## See also

{{< page-relref ref="methods/apps" caption="apps API methods" >}}

{{< page-relref ref="entities/Status#application" caption="Status (`application` attribute)" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/application_serializer.rb" caption="app/serializers/rest/application_serializer.rb" >}}
