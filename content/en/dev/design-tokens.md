---
title: Design tokens reference
description: An overview of the design tokens introduced in Mastodon 4.6
menu:
  docs:
    parent: frontend
---

## What are design tokens?

Design tokens are colour, size, or other design values with names that reflect the intended usage of the token. Each token represents a small design decision, helping you choose values that are consistent with similar usages of values already present in our UI.

As of Mastodon 4.6, we've only introduced _theme tokens_, i.e. those related to theme colours. Additional tokens for spacing, font sizes, and more are planned to be added later.

Our theme tokens are defined in [`app/javascript/styles/mastodon/theme`](https://github.com/mastodon/mastodon/tree/main/app/javascript/styles/mastodon/theme).

## General structure

Theme tokens look like this: `--color-text-primary` or `--color-bg-brand-soft`.

The first part of each token name indicates the type of the token's value, e.g. `color`.

The second part of the name matches one of three categories, indicating where the token is meant to be used:

- `-text`
- `-bg` (background)
- `-border`

The next part of the token name further groups the token into a semantic role or context, e.g. `-primary`, `-brand`, `-error`, `-on-brand-base`.

Finally, sometimes additional modifiers are added to the token name, e.g. most background tokens follow a consistent `-base`, `-soft`, `-softest` pattern.

## Reference

TBC