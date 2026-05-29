---
title: Components
description: The Mastodon frontend is a client-side React app built on React Router 5 and Redux. This document should give you a quick intro to Mastodon UI development.
menu:
    docs:
        parent: frontend
        weight: 10
---

## Locations & files

You'll find Mastodon's React components in one of the following folders.

- `app/javascript/mastodon/components` for UI components that are re-usable across screens and features.
- `app/javascript/mastodon/features` for pages (or "columns") and feature-specific widgets.

When creating a new component or feature:

- Create a new folder with an index.tsx (or .ts) at its root
- Use snake_case naming for the folder and named files

When creating a new re-usable component, document its states and variants in Storybook by creating a `component_name.stories.tsx` file.

Use CSS Modules for styling by adding a `styles.module.scss` file. If you need multiple CSS files in one folder, use `component_name.module.scss` . Learn more in our [Styling docs](/dev/frontend/css-and-styling).

## General tips and guidelines

- Write React components as functions, not classes.
- Use TypeScript when writing new components and utilities.
- When modifying legacy (untyped) JS code, consider whether a prior conversion to TS might be appropriate – but don't force it if it's out of scope and the file is complex.
- If you find yourself re-using a piece of logic, consider breaking it out into its own component or React hook.
- Generally prefer composition of multiple specialised components over adding props to a single "mega-component".
