---
title: Microformats
description: An open data format using CSS classes to structure your already-existing HTML.
menu:
  docs:
    weight: 40
    parent: spec
---

## What are microformats? {#intro}

[Microformats 2.0](https://microformats.io/) is a standard used to embed metadata directly within an HTML document. Rather than needing to use an API for read-only purposes, a web page can be parsed for certain CSS classes in order to extract information that you have already fetched just by viewing the page, rather than having to separately request that same information from an API. The use of microformats classes allows for semantic parsing of data within a given web page, and can be used to generate feeds, cards, or representations of that data.

## Microformats classes {#classes}

All microformats classes use a prefix. The prefix indicates the type of the element, independent of hierarchy. These are the microformats classes as used in Mastodon's codebase.

### Root elements (`h-*`) {#h}

#### `h-card` {#h-card}

Represents a person or organization. Attached to the container of display name, username, and avatar. Also attached to mentions.

### Plain-text properties (`p-*`) {#p}

#### `p-name` {#p-name}

Represents the plain-text name of a person or organization. Attached to display name.

### URL properties (`u-*`) {#u}

#### `u-url` {#u-url}

Within `h-card`, represents the profile permalink. Attached to display name link.

## Additional classes {#mastodon}

These elements are attached by Mastodon for parsing metadata, but are not technically part of the Microformats vocabulary.

### `mention` {#mention}

Indicates that the link should be opened in-app with the associated mention data from the API.

### `hashtag` {#hashtag}

Indicates that the link should be opened in-app with the associated hashtag data from the API.
