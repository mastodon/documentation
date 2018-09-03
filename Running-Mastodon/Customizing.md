Customizing your instance
=========================
As of Mastodon 2.0.0 you can create themes to customize look of your instance, provide multiple themes, set the default one and let users choose from them. 

## Adding custom theme

1. Create `app/javascript/styles/my_theme.scss`. Here you can write whatever SCSS you want.
2. Add `@import 'application';` to the end of the SCSS file.
3. Update `config/themes.yml` to contain `my_theme: styles/my_theme.scss`.
4. Set name for your theme, in `config/locales/en.yml` under `themes` add new entry:
```yml
themes:
  ...
  my_theme: "My theme"
```
5. Restart your webpack-dev-server (if you're in development mode) for it to be recognized and start live reloading. Naturally, in production you'll need to compile assets and restart for the changes to take effect.

## Customizing style

### Changing colors and other variables

See the `app/javascript/styles/mastodon/variables.scss` file for the full list of available variables used throughout the application styles. You can redefine their values in your own `my_theme.scss` like this:

```scss
$ui-highlight-color: #d3d900;

@import 'application';
```

### Upgrading custom.scss variables from pre-1.4

Here is a mapping of the renamed variables:

```scss
$ui-base-color:           $color1;
$ui-secondary-color:      $color2;
$ui-primary-color:        $color3;
$ui-highlight-color:      $color4;
$base-border-color:       $color5;
$simple-background-color: $color5;
$primary-text-color:      $color5;
$error-value-color:       $color6;
$valid-value-color:       $color7;
$base-shadow-color:       $color8;
$base-overlay-background: $color8;
```


## Making custom theme the default

### Mastodon 2.5.0 and newer
Visit your instance's Settings > Administration > Site settings and select desired default theme. The change will be applied immediately.

### Before 2.5.0

1. Update `config/themes.yml` - copy path from `my_theme` to `default` and remove `my_theme` entry.
2. In `config/locales/en.yml` under `themes`, copy your theme name from `my_theme` to `default`:
```yml
themes:
  default: "My theme"
  ...
  my_theme: "My theme"
```

Restart your webpack-dev-server (if you're in development mode) for it to be recognized and start live reloading. Naturally, in production you'll need to compile assets and restart for the changes to take effect.

## Linking to source code

Mastodon is distributed under the terms of AGPL. The source code must be offered to its user. To easily achieve this on your instance, an initializer like below can be added, as a file like `config/initializers/source.rb`, to customize the links at the bottom of the `/about` and `/about/more` pages:

```ruby
# frozen_string_literal: true
module Mastodon
  module Version
    module_function
    def source_base_url
      'https://github.com/<your-github-account>/mastodon'
    end
  end
end
```
