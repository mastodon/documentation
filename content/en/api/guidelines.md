---
title: Guidelines
description: Guidelines that app developers for Mastodon should follow
menu:
  docs:
    parent: api
    weight: -1
---

## Login

**The user must be able to login to any Mastodon server from the app**. This means you must ask for either the full handle, or server domain, and use the app registrations API to dynamically obtain OAuth2 credentials.

## Usernames

**Decentralization must be transparent to the user**. It should be possible to see that a given user is from another server, by e.g. displaying their `acct` (username and domain) somewhere.

## Formatting

Plain text is not available for content from remote servers, and plain text syntax rules may vary wildly between Mastodon and other fediverse applications. For certain attributes, such as the content of statuses, **Mastodon provides sanitized HTML**.

### HTML tags

You may expect these tags to appear in the content: `<p>`, `<br>`, `<span>`, `<a>`

### Mentions and hashtags

Mentions and hashtags are `<a>` tags. To give those links their semantic meaning and add special handling, such as opening a mentioned profile within your app instead of as a web page, metadata is included with the status, which can be matched to a particular tag.

### Custom emoji

Custom emoji remain in their plain text shortcode form. Metadata about the determined custom emoji is included with the status, and the shortcodes must be matched against the text to display the images.

### Other links

Links in Mastodon are not shortened using URL shorteners. However, URLs in text always count for 23 characters, and are intended to be shortened visually. For that purpose, a link is marked up like this:

```html
<a href="https://example.com/page/that/is/very/long">
  <span class="invisible">https://</span>
  <span class="ellipsis">example.com/page</span>
  <span class="invisible">/that/is/very/long</span>
</a>
```

The spans with the `invisible` class can be hidden. The middle span is intended to remain visible. It may have no class if the URL is not very long, otherwise it will have an `ellipsis` class. No ellipsis (`…`) character is inserted in the markup, instead, you are expected to insert it yourself if you need it in your app.
