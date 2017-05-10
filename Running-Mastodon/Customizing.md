Customizing your instance
=========================

## Customizing style

If you create files prefixed with `custom` and suffixed with `.scss`
(e.g. `app/assets/stylesheets/custom.scss`, `app/assets/stylesheets/custom-foo.css`),
the default css will be replaced by their contents.

## Changing colors

If you want to customize for example the vibrant color of your mastodon instance, you can put the following code in your
`custom.scss` file :

````scss
$color4: #d3d900; // vibrant

@import 'application';
````

Don't forget to recompile your assets and restart mastodon(if you didn't have a `custom.scss` file before) 
to see the changes.
