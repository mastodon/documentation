---
title: Set your preferences
description: Customize things just the way you like them.
menu:
  docs:
    weight: 70
    parent: user
---

## Customizing the user interface {#interface}

### Choose a theme {#theme}

Mastodon defaults to a dark theme, but a light or high-contrast theme can be selected.

{{< figure src="assets/light-theme.jpg" caption="Mastodon light theme" >}}

### Choose your layout {#layout}

Mastodon defaults to a simple, one-column layout with a compose box on the left and a column switcher on the right. You can choose to enable the advanced web interface, which allows you view and pin multiple columns at the same time.

{{< figure src="assets/advanced-web-ui.jpg" caption="The advanced web interface" >}}

In either interface, updates will load automatically as new posts are available. You can enable Slow Mode to instead show a banner at the top of the column indicating the number of new items available, which will be loaded only when you click the banner.

For accessibility reasons, the auto-play of animated GIFs is disabled by default. You can enable animated GIFs if you want to see animations. You can also reduce motion of animations throughout the UI.

Trending hashtags can be shown or hidden below the getting started column in the advanced UI, or below the column switcher in the simple UI (only when there is enough space to display them).

### Confirmation dialogs {#confirm}

You can choose to require confirmation before performing certain actions. Currently, confirmations can be set before performing the following actions:

* Unfollow
* Boost
* Delete

### Sensitive content {#sensitive}

By default, any media marked as sensitive is hidden behind a click-through overlay. You can also choose to always show/hide media behind this overlay, regardless of whether it is marked as sensitive.

Hidden and unloaded media uses a colorful gradient provided by the BlurHash algorithm, which uses the colors of the image but blurs the details. These gradients can be disabled.

{{< figure src="assets/blurhash.jpg" caption="An example blurhash thumbnail" >}}

Posts with content warnings are collapsed by default, but you can choose to always expand the warnings so that the full post is displayed.

## Controlling your notifications {#notifications}

### Sending emails {#email}

You can choose to receive email notifications according to the type of notification you receive within Mastodon. The following notification types are available to enable:

* Follows
* Follow requests
* Boosts
* Favourites
* Mentions

You can also enable digest emails, which will provide you with an overview of notifications received during periods of long inactivity.

### Hiding certain notifications {#hide-notifications}

You can choose to not receive notifications from people you don't follow, or from people who don't follow you. This will cause replies, favourites, boosts, and other interactions to not be shown to you.

You can also choose to not receive notifications when you receive a direct message from people you don't follow.

## Miscellaneous options {#misc}

If you opt out of search engine indexing, a `noindex` flag will be added to your public profile and status pages.

You can choose to hide your network, which will make your following and follower lists private to you only.

{{< figure src="assets/hidden-network.jpg" caption="A profile that has opted to hide its network" >}}

If you want to see posts that are boosted multiple times be reinserted into your feed at the top, you can disable boost grouping in timelines.

### Setting defaults for post privacy, post language, and media sensitivity {#posting}

Posts default to public privacy. You can choose to default new posts as unlisted or followers-only instead. For an explanation of post privacy levels, see [Posting to your Mastodon profile &gt; Publishing levels](../posting#privacy).

If you primarily or exclusively post in a certain language, it is a good idea to set that language here.

If you often post sensitive media, you can choose to always mark your media as sensitive.

### Filtering languages on public timelines {#languages}

You can choose to only show posts in certain detected languages while browsing the public timelines. However, note that language detection can be very imprecise, so you may still see some posts in a disabled language, or miss some posts from enabled languages.
