Translating
===========

If you want to localize Mastodon into your language, here is how.

There are two parts to Mastodon, the server and the web client. The translations for the web client are in [`app/javascript/mastodon/locales`](https://github.com/tootsuite/mastodon/tree/master/app/javascript/mastodon/locales). For the server-side, the translations live in [`config/locales`](https://github.com/tootsuite/mastodon/tree/master/config/locales) and are divided into different files. In addition, email templates for the server are found in [`app/views/user_mailer`](https://github.com/tootsuite/mastodon/tree/master/app/views/user_mailer). Here are all the files you’ll need to translate:

| Original file (English) | Location | Description |
|---|---|---|
| [`en.json`](https://github.com/tootsuite/mastodon/blob/master/app/javascript/mastodon/locales/en.json) | `app/javascript/mastodon/locales/en.json` | Strings for the web client |
| [`en.yml`](https://github.com/tootsuite/mastodon/blob/master/config/locales/en.yml) | `config/locales/en.yml` | Strings for general use |
| [`simple_form.en.yml`](https://github.com/tootsuite/mastodon/blob/master/config/locales/simple_form.en.yml) | `config/locales/simple_form.en.yml` | Strings for the settings area |
| [`devise.en.yml`](https://github.com/tootsuite/mastodon/blob/master/config/locales/devise.en.yml) | `config/locales/devise.en.yml` | Generic strings for Devise |
| [`doorkeeper.en.yml`](https://github.com/tootsuite/mastodon/blob/master/config/locales/doorkeeper.en.yml) | `config/locales/doorkeeper.en.yml` | Generic strings for Doorkeeper |
| [`confirmation_instructions.en.html.erb`](https://github.com/tootsuite/mastodon/blob/master/app/views/user_mailer/confirmation_instructions.en.html.erb)<br>[`confirmation_instructions.en.text.erb`](https://github.com/tootsuite/mastodon/blob/master/app/views/user_mailer/confirmation_instructions.en.text.erb) | `app/views/user_mailer/confirmation_instructions.en.html.erb`<br>`app/views/user_mailer/confirmation_instructions.en.text.erb` | Account confirmation message for Devise
| [`password_change.en.html.erb`](https://github.com/tootsuite/mastodon/blob/master/app/views/user_mailer/password_change.en.html.erb)<br>[`password_change.en.text.erb`](https://github.com/tootsuite/mastodon/blob/master/app/views/user_mailer/password_change.en.text.erb) | `app/views/user_mailer/password_change.en.html.erb`<br>`app/views/user_mailer/password_change.en.text.erb` | Password change notification for Devise
| [`reset_password_instructions.en.html.erb`](https://github.com/tootsuite/mastodon/blob/master/app/views/user_mailer/reset_password_instructions.en.html.erb)<br>[`reset_password_instructions.en.text.erb`](https://github.com/tootsuite/mastodon/blob/master/app/views/user_mailer/reset_password_instructions.en.text.erb) | `app/views/user_mailer/reset_password_instructions.en.html.erb`<br>`app/views/user_mailer/reset_password_instructions.en.text.erb`  | Password reset instructions for Devise

## Translating

If you use Github, first clone the Mastodon repository to your account.

1. Duplicate the files in their folder and replace `en` in the filenames by your language’s standard two-letters code ([ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)).
   For instance `simple_form.en.yml` becomes `simple_form.es.yml` in the Spanish translation.
2. Also replace the language code in the first lines of all the files, and the last line of the `.json` file.
3. Translate the right-side values from English to your language. Keep the indentation and punctuation.

Since Devise and Doorkeeper are popular libraries, there may already be translation files for your language available on the Internet. [Devise's Wiki](https://github.com/plataformatec/devise/wiki/I18n) and [doorkeeper-i18n](https://github.com/doorkeeper-gem/doorkeeper-i18n) are official sources for these translations, respectively.

## Declaring the language

The locales are mentioned in several other files. To activate your translation, add your language code to the different lists present in these files:

| File | Location | Comment |
|---|---|---|
| [`index.jsx`](https://github.com/tootsuite/mastodon/blob/master/app/assets/javascripts/components/locales/index.jsx) | `app/assets/javascripts/components/locales/index.jsx` | 2 lines to add |
|[`mastodon.jsx`](https://github.com/tootsuite/mastodon/blob/master/app/assets/javascripts/components/containers/mastodon.jsx) | `app/assets/javascripts/components/containers/mastodon.jsx` | 1 line to add + 1 list to complete |
| [`settings_helper.rb`](https://github.com/tootsuite/mastodon/blob/master/app/helpers/settings_helper.rb) | `app/helpers/settings_helper.rb` | 1 line to add + your language’s name |
| [`application.rb`](https://github.com/tootsuite/mastodon/blob/master/config/application.rb) | `config/application.rb` | 1 list to complete |

## Sending the translation

You can then push the files to git and submit a pull request.

## Testing the translation

Once the pull request is accepted, wait for the code to be deployed on a Mastodon instance. Log-in with your account there, and change the locale in the settings. Browse and use the website. See if everything makes sense in context and if anything seems out of place or breaks the layout. Invite other Mastodon users speaking your language to try it and give feedback. Make changes accordingly and update the translation.

## Updating the translation

Keep an eye on the original English files in `app/assets/javascripts/components/locales` and `config/locales`. When they are updated, pass on the changes to your language files. For new strings, add the new lines to the same position and translate them. Once you’re finished with the updates, you can submit a new pull request.

## Appendix A. Plural handling

Different languages use different plural forms to be taken care of by Mastodon.

For JavaScipt (`.jsx`) translations, this is done in [react-intl](https://github.com/yahoo/react-intl), by doing:

```
Here {appleCount, plural, one {is an apple} other {are {appleCount} apples}}.
```

On the other hand, `.yml` files are processed by [rails-i18n](https://github.com/svenfuchs/rails-i18n). Items that look like this are pluralized fields:

```YML
eat_apple:
  one: You ate an apple.
  other: You ate %{count} apples.
```

In both examples you can see a `one` case and an `other` case described for the pluralized strings. The exact strings is chosen by how many a certain quantity is -- when there is exactly one of something, the sentence goes to the `one` case; otherwise it goes to the `other` case. This how plualization works for English (`en`) and a few other languages.

There are, however, many languages that don't operate in the one-other way. Polish as four plural forms, named `one`, `few`, `many`, and `other` respectively. Arabic has six. Chinese, Japanese, and Korean only have one form called `other`. If your language does not use one/other plural forms, be sure to check out the cardinal part of this [Unicode CIDR Plural Rules](http://www.unicode.org/cldr/charts/28/supplemental/language_plural_rules.html) chart. Also as a rule of thumb, always start translaing with the `other` case in the English files as they are better generalized than the `one` case.
