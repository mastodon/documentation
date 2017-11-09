Customizing your instance
=========================

## Customizing style

You can make the application load a different CSS file than the default, you can optionally choose to use that mechanism to adjust variables and re-import the application CSS from your own CSS. Here is what you need to do:

1. Create `app/javascript/styles/custom.scss`. Here you can write whatever SCSS you want.
2. Add `@import 'application';` to the end of the SCSS file.
2. _(As of Mastodon 2.0.0)_ Update `config/themes.yml` to contain `default: styles/custom.scss`.
3. Restart your webpack-dev-server (if you're in development mode) for it to be recognized and start live reloading. Naturally, in production you'll need to compile assets and restart for the changes to take effect.

## Changing colors and other variables

See the `app/javascript/styles/variables.scss` file for the full list of available variables used throughout the application styles. You can redefine their values in your own `custom.scss` like this:

```scss
$ui-highlight-color: #d3d900;

@import 'application';
```

#### Upgrading custom.scss variables from pre-1.4

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

## Multiple themes

As of Mastodon 2.0.0, you can provide multiple themes for your users to choose from. Modify `config/themes.yml` like so:

```yml
default: styles/awesome_theme.scss
mastodon: styles/application.scss
another: style/another_theme.scss
```

Note that any custom theme should call `@import "application";`.

One of these themes **must** be called `default`, and it will be the default one for your users. By default, the `default` theme is called "Mastodon" in the UI. To change this, modify `config/locales/en.yml` and change:

```yml
themes:
  default: "Mastodon"
```

to e.g.:

```yml
themes:
  default: "Awesome Theme"
  mastodon: "Mastodon Default Theme"
  another: "Another Theme"
```

## Link to source code

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
