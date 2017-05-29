Customizing your instance
=========================

## Customizing style

You can make the application load a different CSS file than the default, you can optionally choose to use that mechanism to adjust variables and re-import the application CSS from your own CSS. Here is what you need to do:

1. Create `app/javascript/packs/custom.js` with the contents `require('../styles/custom.scss');` - you can call the SCSS file anything you want, actually, it will still be compiled into custom.css because it uses the pack name, i.e. this js file
2. Create `app/javascript/styles/custom.scss` (or whatever you chose). Here you can write whatever SCSS you want.
3. If you just created the custom.js file, you'll need to restart your webpack-dev-server (if you're in development mode) for it to be recognized and start live reloading. Naturally, in production you'll need to compile assets and restart for the changes to take effect.

If you just want to override some standard application css, you can import application.scss and custom.scss in `app/javascript/packs/custom.js` file :
```javascript
require('../styles/application.scss');
require('../styles/custom.scss');
```

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
