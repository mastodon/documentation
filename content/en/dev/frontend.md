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

This guide will focus on information relevant to the React app:

- [Components](/dev/frontend/components)
- [State management](/dev/frontend/state-management)
- [CSS and styling](/dev/frontend/css-and-styling)
- [Theming](/dev/frontend/theming)
- [Design tokens reference](/dev/frontend/design-tokens)

## Ongoing refactoring efforts

Several ongoing refactoring initiatives are currently under way to improve the maintainability of the Mastodon frontend codebase. As the resulting temporary inconsistencies can make it hard to follow recommended code patterns, we want to document what we're working towards.

The following refactoring initiatives are currently under way:

- TypeScript migration
- CSS Modules migration
- Introducing CSS design tokens
- Moving away from Immutable.js
- Making use of Redux Slices
