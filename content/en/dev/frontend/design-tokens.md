---
title: Design tokens reference
description: An overview of the design tokens introduced in Mastodon 4.6
menu:
  docs:
    parent: frontend
    weight: 50
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

## Pairing tokens

It's not always obvious which tokens can be used together, so here are some pointers that should help you get started pairing tokens safely:

- Generally, don't mix-and-match unrelated tokens just because they seem to work in one context, and always look for matching text-background pairings to ensure sufficient color contrast in all color modes.
  {{< hint style="info" >}}
  For example, `text-inverted` should not be used on `bg-brand-base`, where it would become hard to read in dark mode. Instead, only use `text-on-brand-base` with `bg-brand-base`. Similarly, `text-inverted` should only be used with `bg-inverted`.
  {{< /hint >}}

- The neutral text tokens `text-primary` and `text-secondary` are safe to be used on all of the following neutral or soft backgrounds:
  - `bg-primary`
  - `bg-secondary`
  - `bg-brand-soft` / `bg-brand-softest`
  - `bg-error-soft` / `bg-error-softest`
  - `bg-warning-soft` / `bg-warning-softest`
  - `bg-success-soft` / `bg-success-softest`

- Additionally, text tokens `text-brand`, `text-brand-hover`, `text-error`, `text-warning`, and `text-success` can be used with their respective `-soft` and `-softest` backgrounds, as well as `bg-primary` and `bg-secondary`.

- Don't mix semantic tokens across groups, e.g. `text-brand` should never be paired with `bg-error-softest` for aesthetic reasons.

## Reference

### Text tokens

| Token | Purpose |
|-------|---------|
| `--color-text-primary` | Main text color for body content and standard UI text |
| `--color-text-secondary` | Slightly muted text for supporting copy and metadata |
| `--color-text-tertiary` | Muted text for less prominent content (legacy) |
| `--color-text-inverted` | Text on inverted backgrounds, e.g. toast notifications |
| `--color-text-brand` | Branded color for highlighted or interactive text |
| `--color-text-brand-soft` | Soft brand color for subtle branded text (legacy) |
| `--color-text-on-brand-base` | Text color when placed over solid 'brand' background |
| `--color-text-brand-on-inverted` | Branded text color when placed on inverted background (legacy) |
| `--color-text-error` | Text indicating errors or destructive actions |
| `--color-text-on-error-base` | Text color when placed over solid 'error' background |
| `--color-text-warning` | Text indicating warnings |
| `--color-text-on-warning-base` | Text color when placed over solid 'warning' background |
| `--color-text-success` | Text indicating success, e.g. valid user input |
| `--color-text-on-success-base` |  Text color when placed over solid 'success' background |
| `--color-text-disabled` | Text for disabled controls (legacy) |
| `--color-text-on-disabled` | Text when placed over 'disabled' background (legacy) |
| `--color-text-bookmark-highlight` | Icon color for the selected 'bookmark' action (legacy) |
| `--color-text-favourite-highlight` | Icon color for the selected 'favourite' action (legacy) |
| `--color-text-on-media` | Text when placed in the media modal (legacy) |
| `--color-text-status-links` | Link color in posts (legacy) |


### Background tokens

#### Neutral backgrounds

| Token | Purpose |
|-------|---------|
| `--color-bg-primary` | Primary background for main content areas |
| `--color-bg-secondary` | Secondary background for subtle surface differentiation |
| `--color-bg-tertiary` | Tertiary background for stronger surface differentiation (legacy) |

#### Utility backgrounds

| Token | Purpose |
|-------|---------|
| `--color-bg-inverted` | Background for inverted contexts (relative to primary background) |
| `--color-bg-overlay-base` | Dark overlay for dialogs and backdrops |
| `--color-bg-overlay-highlight` | Light overlay for subtle hover states |
| `--color-bg-overlay` | Solid overlay for modal dialog backdrop (legacy) |
| `--color-bg-media` | Slightly transparent background for elements overlaid on top of media (legacy) |
| `--color-bg-media-base` | Opaque base colour of the token above (legacy) |
| `--color-bg-disabled` | Solid background for disabled controls, e.g. disabled primary buttons (legacy) |

#### Brand backgrounds

| Token | Purpose |
|-------|---------|
| `--color-bg-brand-base` | Opaque brand color for primary buttons and similar controls |
| `--color-bg-brand-base-hover` | Slight variant of the above for hover effects (legacy) |
| `--color-bg-brand-soft` | Softly tinted background for highlighted content |
| `--color-bg-brand-softest` | More subtly tinted background for highlighted content |

#### Error backgrounds

| Token | Purpose |
|-------|---------|
| `--color-bg-error-base` | Opaque error color for destructive buttons |
| `--color-bg-error-base-hover` | Slight variant of the above for hover effects (legacy) |
| `--color-bg-error-soft` | Softly tinted background for error content |
| `--color-bg-error-softest` | More subtly tinted background for error content |

#### Warning backgrounds

| Token | Purpose |
|-------|---------|
| `--color-bg-warning-base` | Opaque warning color for buttons (legacy) |
| `--color-bg-warning-soft` | Softly tinted background for warning content |
| `--color-bg-warning-softest` | More subtly tinted background for warning content |

#### Success backgrounds

| Token | Purpose |
|-------|---------|
| `--color-bg-success-base` | Opaque success color for buttons (legacy) |
| `--color-bg-success-soft` | Softly tinted background for success content |
| `--color-bg-success-softest` | More subtly tinted background for success content |

### Border tokens

| Token | Purpose |
|-------|---------|
| `--color-border-primary` | Primary color for borders and separators |
| `--color-border-brand` | Brand color for borders and outlines on interactive content |
| `--color-border-brand-soft` | Soft brand color for borders around highlighted content |
| `--color-border-error` | Border color for interactive content with errors |
| `--color-border-success-soft` | Border color for verified link cards |
| `--color-border-warning-soft` | Border color for warning callouts (legacy) |
| `--color-border-error-soft` | Border color for error callouts (legacy) |
| `--color-border-media` | Subtle border for embedded post media (images and videos) (legacy) |

### Other legacy tokens

The following tokens will not be used in new designs, but still exist to support older UI elements.

#### Shadow tokens (legacy)

| Token | Purpose |
|-------|---------|
| `--dropdown-shadow` | Standard `box-shadow` value for dropdown menus |
| `--overlay-icon-shadow` | Shadow `filter` value for icons overlaid on media |

#### Tokens for graphs and charts (legacy)

| Token | Purpose |
|-------|---------|
| `--color-graph-primary-stroke` | Standard colour for shape outlines in charts |
| `--color-graph-primary-fill` | Standard colour for shape fills in charts |
| `--color-graph-warning-stroke` | Warning colour for shape outlines in charts |
| `--color-graph-warning-fill` | Warning colour for shape fills in charts |
| `--color-graph-disabled-stroke` | Colour for shape outlines in disabled charts |
| `--color-graph-disabled-fill` | Color for shape fills in disabled charts |

#### Tokens for rich text formatting (legacy)

| Token | Purpose |
|-------|---------|
| `--rich-text-container-color` | Background colour for code or inline quotes embedded in posts |
| `--rich-text-text-color` | Text colour for code or inline quotes embedded in posts |
| `--rich-text-decorations-color` | Icon colour shown on inline quotes embedded in posts |
