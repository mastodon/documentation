---
title: History
description: Represents daily usage history of a hashtag.
menu:
  docs:
    parent: entities
---

## Example

```javascript
{
  "day": "1574553600",
  "uses": "200",
  "accounts": "31"
}
```

## Required attributes

### `day` <a id="day"></a>

**Description:** UNIX timestamp on midnight of the given day.\
**Type:** String \(UNIX timestamp\)\
**Version history:** Added in 2.4.1

### `uses` <a id="uses"></a>

**Description:** the counted usage of the tag within that day.\
**Type:** String \(cast from an integer\)\
**Version history:** Added in 2.4.1

### `accounts` <a id="accounts"></a>

**Description:** the total of accounts using the tag within that day.\
**Type:** String \(cast from an integer\)\
**Version history:** Added in 2.4.1

## See also

* [Tag\#history](tag.md#history)

{{< page-ref page="tag.md" >}}

{{< caption-link url="https://github.com/tootsuite/mastodon/blob/17159625b3e2c6d94509c0c2879ca80efbac6846/app/models/tag.rb\#L101-L115" caption="app/models/tag.rb L101-115 -- history days\[\]" >}}



