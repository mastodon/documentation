---
title: API Versions
description: How to detect new features within the Mastodon API.
menu:
  docs:
    weight: 40
    parent: api
---

Since Mastodon version 4.3.0, the [Instance Details]({{< relref "methods/instance#v2" >}}) endpoint has returned a property indicating the Mastodon API Version, which is separate from the release number, and is just an integer that can be used to detect the presence of new methods or properties on the Mastodon API.

```json
// GET /api/v2/instance
{
  // ...
  "api_versions": {
    "mastodon": 5,
  },
  // ...
}
```

## Changelog
### Version 1

- *None*

### Version 2

- Grouped notifications API: https://github.com/mastodon/mastodon/pull/31840

### Version 3

- API for updating attribution domains: https://github.com/mastodon/mastodon/pull/32730

### Version 4

- Media deletion methods: https://github.com/mastodon/mastodon/pull/34035

### Version 5

- `blur` filter for media attachments:
  https://github.com/mastodon/mastodon/pull/34256

---

When the Mastodon API gains new features in the future, this version number will be updated, and this page updated accordingly.