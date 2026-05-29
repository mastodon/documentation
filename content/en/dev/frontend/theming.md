---
title: Creating themes
description: This document is an introduction to theming in Mastodon. It's primarily aimed at theme creators, but also contains useful information for anyone interested in working on Mastodon's styles.
menu:
  docs:
    parent: frontend
    weight: 40
---

## The groundwork

The entrypoint of the default Mastodon theme is located at `app/javascript/styles/application.scss`. To create your own theme, duplicate this file and add a new entry for it to the file `config/themes.yml`, for example:

```yml
default: styles/application.scss
my_theme: styles/my_theme.scss
```

After this, rebuild assets (`RAILS_ENV=production bundle exec rails assets:precompile`) and restart the Mastodon services:
```
systemctl restart mastodon-web
systemctl restart mastodon-sidekiq
```

Once this is done, your custom theme will be selectable
- for users from **Preferences > Appearance > Theme**
- as the server's default theme from **Administration > Server settings > Design**.

## Custom styles

With the steps above completed, you've created a new theme entrypoint, but its styles are identical to the default Mastodon theme.

You could now go on to duplicate the entire `app/javascript/styles/mastodon` CSS folder and start tweaking things, but if you only want to change the colours of the Mastodon UI, it's enough to create a copy of the `mastodon/theme` folder.

Once that's done, you need to change your entrypoint file (the one referenced in `config/themes.yml`) to import your copy of the theme folder instead of the original.

**Example:** If you've duplicated the `mastodon/theme` folder to `app/javascript/styles/my_theme`, open `my_theme.scss` and replace `@use 'mastodon/theme'` with `@use 'my_theme'`.

Once that's done, you can change the theme tokens defined in the files `my_theme/_base.scss`, `my_theme/_dark.scss`, and `my_theme/_light.scss` to create a new color theme, and the changes should be reflected in the UI.

## Respecting `color-scheme` and `contrast` preferences

Prior to Mastodon 4.6, theme variations like light mode, dark mode, and high-contrast had to be implemented as separate themes. This has changed in 4.6 where these preferences were made independent settings.

The newly available user options are:
- **Color scheme:** Auto, Light, or Dark
- **Contrast:** Auto or High

Current values are reflected in the HTML attributes `data-color-scheme` and `data-contrast` so that they can be used to scope your styles.


```scss
.component {
  color: black;
  background: black;

  [data-color-scheme='dark'] & {
    color: white;
    background: black;
  }
}
```

{{< hint style="info" >}}
The "Auto" setting will always be resolved to the actually displayed option. For `color-scheme`, that's `light` or `dark`, for `contrast` it's `default` or `high`.
{{< /hint >}}

You can also use the `light-dark()` CSS function to achieve the same result:

```scss
.component {
  color: light-dark(black, white);
  background: light-dark(white, black);
}
```

Generally we recommend handling `color-scheme` and `contrast`-dependent styles at the level of theme tokens. See our [Design Tokens reference](/dev/frontend/design-tokens) for a list of tokens available by default.