---
title: Guidelines and best practices
description: Things to keep in mind when implementing a Mastodon app.
menu:
  docs:
    weight: 50
    parent: client
---

## Login <a id="login"></a>

**The user must be able to login to any Mastodon server from the app**. This means you must ask for the server's domain and use the app registrations API to dynamically obtain OAuth2 credentials.

## Usernames <a id="username"></a>

**Decentralization must be transparent to the user**. It should be possible to see that a given user is from another server, by e.g. displaying their `acct` somewhere. Note that `acct` is equal to username for local users, and equal to username@domain for remote users.

## Handling and sorting IDs <a id="id"></a>

Vanilla Mastodon entity IDs are generated as integers and cast to string. However, this does not mean that IDs _are_ integers, nor should they be cast to integer! Doing so can lead to broken client apps due to integer overflow, so **always treat IDs as strings.**

With that said, because IDs are string representations of numbers, they can still be sorted chronologically very easily by doing the following:

1. Sort by size. Newer statuses will have longer IDs.
2. Sort lexically. Newer statuses will have at least one digit that is higher when compared positionally.

## Formatting <a id="formatting"></a>

Plain text is not available for content from remote servers, and plain text syntax rules may vary wildly between Mastodon and other fediverse applications. For certain attributes, such as the content of statuses, **Mastodon provides sanitized HTML**. You may expect these tags to appear in the content: `<p>`, `<br>`, `<span>`, `<a>`. See [HTML Sanitization](../spec/activitypub.md#html-sanitization) for more details.

### Mentions, hashtags, and custom emoji <a id="tags"></a>

Mentions and hashtags are `<a>` tags. Custom emoji remain in their plain text shortcode form. To give those entities their semantic meaning and add special handling, such as opening a mentioned profile within your app instead of as a web page, metadata is included with the [Status]({{< relref "../entities/status.md" >}}), which can be matched to a particular tag. See [Status &gt; Rendering attributes](../entities/status.md#rendering-attributes) for more information.

### Link shortening <a id="links"></a>

Links in Mastodon are not shortened using URL shorteners, and the usage of URL shorteners is heavily discouraged. URLs in text always count for 23 characters, and are intended to be shortened visually. For that purpose, a link is marked up like this:

```markup
<a href="https://example.com/page/that/is/very/long">
  <span class="invisible">https://</span>
  <span class="ellipsis">example.com/page</span>
  <span class="invisible">/that/is/very/long</span>
</a>
```

The spans with the `invisible` class can be hidden. The middle span is intended to remain visible. It may have no class if the URL is not very long, otherwise it will have an `ellipsis` class. No ellipsis \(`…`\) character is inserted in the markup, instead, you are expected to insert it yourself if you need it in your app.

## Filters <a id="filters"></a>

Clients must do their own text filtering based on filters returned from the API. The server will apply `irreversible` filters for home and notifications context, but anything else is still up to the client to filter!

Expired filters are not deleted by the server. They should no longer be applied but they are still stored by the server, as users may update the expiry time to re-enable the filter. It is up to users to delete those filters eventually.

