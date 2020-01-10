---
title: Mention
description: Represents a mention of a user within the content of a status.
menu:
  docs:
    parent: entities
---

## Example

{{< code title="excerpt from GET status:" >}}
```javascript
{
  "mentions": [
    {
      "id": "952529",
      "username": "alayna",
      "url": "https://desvox.es/users/alayna",
      "acct": "alayna@desvox.es"
    },
    {
      "id": "14715",
      "username": "trwnh",
      "url": "https://mastodon.social/@trwnh",
      "acct": "trwnh"
    }
  ]
}
```
{{< /code >}}

## Required attributes

### `id` <a id="id"></a>

**Description:** The account id of the mentioned user.\
**Type:** String \(cast from an integer, but not guaranteed to be a number\)\
**Version history:** Added in 0.6.0

### `username` <a id="username"></a>

**Description:** The username of the mentioned user.\
**Type:** String\
**Version history:** Added in 0.6.0

### `acct` <a id="acct"></a>

**Description:** The webfinger acct: URI of the mentioned user. Equivalent to `username` for local users, or `username@domain` for remote users.\
**Type:** String\
**Version history:** Added in 0.6.0

### `url` <a id="url"></a>

**Description:** The location of the mentioned user's profile.\
**Type:** String \(URL\)\
**Version history:** Added in 0.6.0

## See also

* [GET /api/v1/statuses/:id](../methods/statuses/#view-specific-status)
* [Status\#mentions](status.md#mentions)

{{< page-ref page="status.md" >}}



