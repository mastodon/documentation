---
title: State management
description: Learn how data and state are managed in the Mastodon frontend
menu:
  docs:
    parent: frontend
    weight: 20
---

## Which type of state?

We're using Redux for global state, but not all state should go into Redux:

**Use React component state** if it is local to a UI component and does not need to persist across navigations.

**Use Redux state** if it should persist across views and navigation. We also use Redux to store remote data as a sort of cache. (But are looking into moving to more robust data-fetching patterns in the near future.)

## Redux slices

State for new functionality should use the Redux [slice pattern](https://redux-toolkit.js.org/tutorials/quick-start#create-a-redux-state-slice) in favour of separate files for actions and reducers. Slices are located in `app/javascript/mastodon/reducers/slices`.

## Other guidelines

- Use TypeScript when writing new state logic
- Don't use Immutable.js when implementing new functionality
