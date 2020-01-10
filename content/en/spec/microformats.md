---
title: Microformats
description: An open data format using CSS classes to structure your already-existing HTML.
menu:
  docs:
    weight: 40
    parent: spec
---

## What are microformats? <a id="intro"></a>

[Microformats 2.0](https://microformats.io/) is a standard used to embed metadata directly within an HTML document. Rather than needing to use an API for read-only purposes, a web page can simply be parsed for certain CSS classes in order to extract information that you have already fetched simply by viewing the page, rather than having to separately request that same information from an API. The use of microformats classes allows for semantic parsing of data within a given web page, and can be used to generate feeds, cards, or representations of that data.

## Microformats classes <a id="classes"></a>

All microformats classes use a prefix. The prefix indicates the type of the element, independent of hierarchy. These are the microformats classes as used in Mastodon's codebase.

### Root elements \(`h-*`\) <a id="h"></a>

#### `h-feed` <a id="h-feed"></a>

Represents a stream of entries. Attached to a profile's toots. Also attached to the parent thread within detailed status views.

#### `h-entry` <a id="h-entry"></a>

Represents episodic or date stamped online content. Attached to a status.

#### `h-cite` <a id="h-cite"></a>

Represents a reference to another online publication. Attached to a boost. Also attached to other statuses in the thread within detailed status views.

#### `h-card` <a id="h-card"></a>

Represents a person or organization. Attached to the container of display name, username, and avatar. Also attached to mentions.

### Plain-text properties \(`p-*`\) <a id="p"></a>

#### `p-author` <a id="p-author"></a>

Within `h-entry` or `h-cite`, represents the author of the entry, and is attached to the container of display name, username, and avatar.

#### `p-name` <a id="p-name"></a>

Within `h-feed`, represents the title of the feed. Attached to `data` element with `value` attribute.
Within `h-entry` or `h-cite`, represents the title of the entry. Unused in Mastodon.
Within `h-card`, represents the plain-text name of a person or organization. Attached to display name.

#### `p-in-reply-to` <a id="p-in-reply-to"></a>

Within `h-entry` of a detailed status, represents the status that is the direct parent.

#### `p-repost-of` <a id="p-repost-of"></a>

Within h-entry of a detailed status, represents a post that is a reblog and also a direct parent. Currently unused, since reblogs cannot be replied to.

#### `p-comment` <a id="p-comment"></a>

Within `h-entry` of a detailed status, represents statuses that are direct children.

### URL properties \(`u-*`\) <a id="u"></a>

#### `u-photo` <a id="u-photo"></a>

Within `h-card`, represents the profile picture. Attached to the avatar image.

#### `u-uid` <a id="u-uid"></a>

Within `h-entry` or `h-cite`, represents a universally unique identifier. Attached to timestamp link.

#### `u-url` <a id="u-url"></a>

Within `h-entry` or `h-cite`, represents the status permalink. Attached to timestamp link.
Within `h-card`, represents the profile permalink. Attached to display name link.

### Datetime properties \(`dt-*`\) <a id="dt"></a>

#### `dt-published` <a id="dt-published"></a>

Within `h-entry` or `h-cite`, represents the date and time at which the status was published. Attached to `data` element with `value` attribute.

### Element tree \(`e-*`\) <a id="e"></a>

#### `e-content` <a id="e-content"></a>

Within `h-entry` or `h-cite`, represents the content of the status. Attached to status content.

## Additional classes <a id="mastodon"></a>

These elements are attached by Mastodon for parsing metadata, but are not technically part of the Microformats vocabulary.

#### `mention` <a id="mention"></a>

Indicates that the link should be opened in-app with the associated mention data from the API.

#### `hashtag` <a id="hashtag"></a>

Indicates that the link should be opened in-app with the associated hashtag data from the API.

