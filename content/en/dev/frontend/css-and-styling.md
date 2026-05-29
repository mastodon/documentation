---
title: CSS and styling
description: How to style components in the Mastodon frontend
menu:
  docs:
    parent: frontend
    weight: 30
---

## Background

Before Mastodon 4.6, Mastodon's UI was styled using global SCSS files like `components.scss`. These files often grew large and became hard to navigate and change without unintended side-effects.

To improve on this, we decided to build the new functionality for the 4.6 release using [CSS Modules](https://github.com/css-modules/css-modules). This allows styles to be defined right next to the related components and reduces the likelihood of style conflicts.

## How to use CSS Modules

- When creating a new React component, create a new folder for it (use snake_case naming) and add a `styles.module.scss` file (note the `.module` suffix – leaving it out will prevent the styles from being imported).
  - For multiple CSS files in one folder, use `component_name.module.scss`, matching the name of the related subcomponent.
- Import and use the styles in the component: `import classes from './styles.module.scss'`
- The naming of classes in CSS Modules should be kept simple, e.g. `.card`, or `.actions`. There's no need for BEM-like naming patterns. Use camelCase for multiple words to make it easier to access the class in a component.
- CSS Modules will generate names for all classes in a module based on the location and module name, providing a stable-ish hook for theme authors.

## Styling variants

To style component variants, you can take one of two approaches:

- Compose classes using the `classNames` utility, e.g.: 
  ```jsx
  <section
    className={classNames(
      classes.wrapper,
      !hasBorder && classes.wrapperWithoutBorder,
    )}
  >
  ```
- Add a custom data attribute to the component markup and add styles based on that, e.g.:
  ```jsx
  <section
    className={classes.wrapper}
    data-has-border={hasBorder}
  >
  ```
  ```scss
  .wrapper {
    /* ... */
    &[data-has-border='true'] {
      border: 1px solid var(--color-border-primary);
    }
  }
  ```

## Styling sub-components

If you need to style sub-components that use legacy (global) CSS classes (e.g. `.avatar`), you can wrap the class like this: `:global(.avatar)` to prevent CSS Modules from turning it into a generated class name. Avoid this if possible and prefer to create a new local class and pass it to the nested component.

## Theming

Use our [design tokens](/dev/frontend/design-tokens) for colours and learn more about user theme preferences in our [Theming guide](/dev/frontend/theming).