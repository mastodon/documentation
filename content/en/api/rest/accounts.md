---
title: Accounts
menu:
  docs:
    parent: rest-api
    weight: 10
---

## GET /api/v1/accounts/:id

Returns [Account]({{< relref "entities.md#account" >}})

### Resource information

{{< api_method_info auth="No" user="No" scope="read read:accounts" version="0.0.0" >}}

## POST /api/v1/accounts

Returns [Token]({{< relref "entities.md#token" >}})

The method is available to apps with a token obtained via the client credentials grant. It creates a user and account records, as well as an access token for the app that initiated the request. The user is unconfirmed, and an e-mail is sent as usual.

The method returns the access token, which the app should save for later. The REST API is not available to users with unconfirmed accounts, so the app must be smart to wait for the user to click a link in their e-mail inbox.

The method is rate-limited by IP to 5 requests per 30 minutes.

### Resource information

{{< api_method_info auth="Yes" user="No" scope="write write:accounts" version="2.7.0" >}}

### Parameters

|Name|Description|Required|
|----|-----------|:------:|
| `username` | User name | Required |
| `email` | E-mail address | Required |
| `password` | Password text | Required |
| `agreement` | Agreement to local rules, terms of use, privacy policy (Bool) | Required |
| `locale` | The language of the e-mail to be sent first | Required |

The `agreement` parameter must be set to true after presenting the local rules, terms of use, privacy policy for the user and obtaining consent.

## GET /api/v1/accounts/verify_credentials

User's own account.

Returns [Account]({{< relref "entities.md#account" >}}) with an extra [`source` attribute]({{< relref "entities.md#source" >}}).

### Resource information

{{< api_method_info auth="Yes" user="Yes" scope="read read:accounts" version="0.0.0" >}}

## PATCH /api/v1/accounts/update_credentials

Update user's own account.

Returns [Account]({{< relref "entities.md#account" >}})

### Resource information

{{< api_method_info auth="Yes" user="Yes" scope="write write:accounts" version="0.0.0" >}}

### Parameters

|Name|Description|Required|
|----|-----------|:------:|
| `display_name` | Display name | Optional |
| `note` | Biography | Optional |
| `avatar` | Avatar encoded using `multipart/form-data` | Optional |
| `header` | Header image encoded using `multipart/form-data` | Optional |
| `locked` | Enable follow requests | Optional |
| `source[privacy]` | Default post privacy preference | Optional |
| `source[sensitive]`| Whether to mark statuses as sensitive by default | Optional |
| `source[language]` | Override language on statuses by default (ISO6391) | Optional |
| `fields_attributes` | Profile metadata (max. 4) | Optional |

## GET /api/v1/accounts/:id/followers

Accounts which follow the given account.

Returns array of [Account]({{< relref "entities.md#account" >}})

### Resource information

{{< api_method_info auth="Yes" user="No" scope="read read:accounts" version="0.0.0" >}}

### Parameters

|Name|Description|Required|Default|
|----|-----------|:------:|:-----:|
| `limit` | Maximum number of results | Optional | 40 |

### Pagination

{{< api_pagination >}}

## GET /api/v1/accounts/:id/following

Accounts which the given account is following.

Returns array of [Account]({{< relref "entities.md#account" >}})

### Resource information

{{< api_method_info auth="Yes" user="No" scope="read read:accounts" version="0.0.0" >}}

### Parameters

|Name|Description|Required|Default|
|----|-----------|:------:|:-----:|
| `limit` | Maximum number of results | Optional | 40 |

### Pagination

{{< api_pagination >}}

## GET /api/v1/accounts/:id/statuses

An account's statuses.

Returns array of [Status]({{< relref "entities.md#status" >}})

### Resource information

{{< api_method_info auth="Yes" user="No" scope="read read:statuses" version="0.0.0" >}}

### Parameters

|Name|Description|Required|Default|Added in|
|----|-----------|:------:|:-----:|:------:|
| `only_media` | Only return statuses that have media attachments | Optional | false | |
| `pinned` | Only return statuses that have been pinned | Optional | false | |
| `exclude_replies` | Skip statuses that reply to other statuses | Optional | false | |
| `max_id` | Return results older than ID | Optional | | |
| `since_id` | Return results newer than ID | Optional | | |
| `min_id` | Return results immediately newer than ID | Optional | | |
| `limit` | Maximum number of results | Optional | 20 | | |
| `exclude_reblogs` | Skip statuses that are reblogs of other statuses | Optional | false | 2.7.0 |

### Pagination

{{< api_dynamic_pagination >}}

## POST /api/v1/accounts/:id/follow

Follow an account.

Returns [Relationship]({{< relref "entities.md#relationship" >}})

### Resource information

{{< api_method_info auth="Yes" user="Yes" scope="write:follows follow" version="0.0.0" >}}

### Parameters

|Name|Description|Required|Default|
|----|-----------|:------:|:-----:|
| `reblogs` | Whether the followed account's reblogs will show up in the home timeline | Optional | true |

## POST /api/v1/accounts/:id/unfollow

Unfollow an account.

Returns [Relationship]({{< relref "entities.md#relationship" >}})

### Resource information

{{< api_method_info auth="Yes" user="Yes" scope="write:follows follow" version="0.0.0" >}}

## GET /api/v1/accounts/relationships

Relationship of the user to the given accounts in regards to following, blocking, muting, etc.

Returns array of [Relationship]({{< relref "entities.md#relationship" >}})

### Resource information

{{< api_method_info auth="Yes" user="Yes" scope="read read:follows" version="0.0.0" >}}

### Parameters

|Name|Description|Required|
|----|-----------|:------:|
| `id` | Array of account IDs | Required |

## GET /api/v1/accounts/search

Search for matching accounts by username, domain and display name.

Returns array of [Account]({{< relref "entities.md#account" >}})

### Resource information

{{< api_method_info auth="Yes" user="Yes" scope="read read:accounts" version="0.0.0" >}}

### Parameters

|Name|Description|Required|Default|
|----|-----------|:------:|:-----:|
| `q` | What to search for | Required ||
| `limit` | Maximum number of results | Optional | 40 |
| `resolve` | Attempt WebFinger look-up | Optional | false |
| `following` | Only who the user is following | Optional | false |
