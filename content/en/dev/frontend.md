---
title: Frontend guide
description: Getting started with Mastodon frontend development
menu:
  docs:
    parent: dev
    identifier: frontend
---

## About this guide

The Mastodon user interface consists of two parts built on different technologies:

1. **A client-side React app**  
	The main app used for rendering post feeds, profiles and other "core" social networking functionality
2. **Server-rendered pages built on Ruby on Rails**  
	Used for settings and preferences, the registration and login flows, as well as admin and moderation functionality

This overview will focus on the React app.

## Ongoing refactoring efforts

Several ongoing refactoring initiatives are currently under way to improve the maintainability of the Mastodon frontend codebase. As the resulting temporary inconsistencies can make it hard to follow recommended code patterns, we want to document what we're working towards.

The following refactoring initiatives are currently under way:

- TypeScript migration
- CSS Modules migration
- Introducing CSS design tokens
- Moving away from Immutable.js
- Making use of Redux Slices

### TypeScript migration

- Any new components and utilities should be written in TypeScript by default.
- When modifying existing JS code, consider whether a prior conversion to TS might be appropriate. Don't force it if the file seems complex.
- New endpoints should have their types defined in a matching folder in `app/javascript/mastodon/models`.

### CSS Modules migration

So far, most of Mastodon's UI was styled by global SCSS files like `components.scss`. These files are often large and hard to navigate and make changes in without unintended side-effects.

To improve on this situation, we decided to build new functionality for the 4.6 release using CSS Modules. This allows styles to be defined right next to the related components and should reduce the likelihood of style conflicts.

- When creating a new component, create a new folder for it and add a `styles.module.scss` file (note the `.module` suffix – leaving it out will prevent the styles from being imported).
- Import and use styles locally: `import classes from './styles.module.scss'`
- Naming of classes in CSS Modules should be kept simple, e.g. `.wrapper`, or `.actions`. There's no need for BEM-like naming patterns. If you need more than one word, use `.camelCase` to make it easier to access the class in a component.
- CSS Modules will generate a class name based on the location and name of the component, providing a stable-ish hook for theme authors.
- If you need to style sub-components with global CSS (e.g. `.avatar`), wrap the class like this: `:global(.avatar)`. But generally it's best to avoid this – it's better to create a new local class and pass it to the nested component in React.

### Introducing CSS design tokens

For better collaboration with our designers, theming in Mastodon was moved from SCSS `$variables` to native CSS `--variables`, and more consistent naming of these tokens was introduced. This refactor is completed as of Mastodon 4.6, but we're planning to introduce additional design tokens for spacing, font sizes, and more.

View the [design tokens reference](/dev/design-tokens) for more details.

### Moving away from Immutable.js

- Don't use Immutable.js when implementing new functionality

### Making use of Redux Slices

- We have started to use the Redux [slice pattern](https://redux-toolkit.js.org/tutorials/quick-start#create-a-redux-state-slice) in favour of separate files for actions and reducers. For now, slices are located in `app/javascript/mastodon/reducers/slices`.