Translating
===========

If you want to localize Mastodon into your language, here is how.

* [Overview](#overview)
* [Procedures](#procedures)
  * [Obtain the Source Code](#obtain-the-source-code)
  * [Translating](#translating)
  * [Declaring the language](#declaring-the-language)
  * [Sending the translation](#sending-the-translation)
* [Testing the translation](#testing-the-translation)
* [Updating the translation](#updating-the-translation)
* [Appendix](#appendix)
  * [Appendix A. Plural handling](#appendix-a-plural-handling)
  * [Appendix B. Command Tools](#appendix-b-command-tools)

---

## Overview

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

## Procedures

### Obtain the Source Code

If you use Github, first fork the Mastodon repository to your account. Then
clone it to your local machine for further works.

For details instructions, you may read our
[Github cheatsheet](Translating-Github-Cheat-Sheet.md).

### Translating

1. Duplicate the files in their folder and replace `en` in the filenames by your language’s standard two-letters code
   ([ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)). Or [RFC5646](https://tools.ietf.org/html/rfc5646)
   language tags for regional languages.

   For instance `simple_form.en.yml` becomes `simple_form.es.yml` in the Spanish translation, and
   `simple_form.zh-HK.yml` in Traditional Chinese (HK) translation.

2. Also replace the language code in the first lines of all the files, and the last line of the `.js` file.

3. Translate the right-side values from English to your language. Keep the indentation and punctuation.

Since Devise and Doorkeeper are popular libraries, there may already be translation files for your language available on the Internet. [Devise's Wiki](https://github.com/plataformatec/devise/wiki/I18n) and [doorkeeper-i18n](https://github.com/doorkeeper-gem/doorkeeper-i18n) are official sources for these translations, respectively.

### Declaring the language

The locales are mentioned in several other files. To activate your translation, add your language code to the different lists present in these files:

| File | Location | Comment |
|---|---|---|
| [`index.js`](https://github.com/tootsuite/mastodon/blob/master/app/javascript/mastodon/locales/index.js) | `app/javascript/mastodon/locales/index.js` | 2 lines to add |
|[`mastodon.js`](https://github.com/tootsuite/mastodon/blob/master/app/javascript/mastodon/containers/mastodon.js) | `app/javascript/mastodon/containers/mastodon.js` | 1 line to add + 1 list to complete |
| [`settings_helper.rb`](https://github.com/tootsuite/mastodon/blob/master/app/helpers/settings_helper.rb) | `app/helpers/settings_helper.rb` | 1 line to add + your language’s name |
| [`application.rb`](https://github.com/tootsuite/mastodon/blob/master/config/application.rb) | `config/application.rb` | 1 list to complete |

### Sending the translation

You can then push the files to git and submit a pull request.

For details instructions, you may read our
[Github cheatsheet](Translating-Github-Cheat-Sheet.md).

## Testing the translation

Once the pull request is accepted, wait for the code to be deployed on a Mastodon instance. Log-in with your account there, and change the locale in the settings. Browse and use the website. See if everything makes sense in context and if anything seems out of place or breaks the layout. Invite other Mastodon users speaking your language to try it and give feedback. Make changes accordingly and update the translation.

## Updating the translation

Keep an eye on the original English files in `app/javascript/mastodon/locales` and `config/locales`. When they are updated, pass on the changes to your language files. For new strings, add the new lines to the same position and translate them. Once you’re finished with the updates, you can submit a new pull request.

## Appendix

### Appendix A. Plural handling

Different languages use different plural forms to be taken care of by Mastodon.

For JavaScipt (`.js`) translations, this is done in [react-intl](https://github.com/yahoo/react-intl), by doing:

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

### Appendix B. Command Tools

We have command line tools to help translators in their tasks. They are not
essential. But they are really helpful.

To use the tools, you'd need to properly setup your work station.

#### Setup

You need to have [Ruby](https://www.ruby-lang.org/en/) and [NodeJS](https://nodejs.org/en/)
setup in your machine. If you want to keep your global paths clean, you may use
[rvm](https://rvm.io/) and [nvm](https://github.com/creationix/nvm).

You'd also need to install [yarn](https://yarnpkg.com/) with your nodejs setup.

To install Ruby with rvm:
```
gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3
\curl -sSL https://get.rvm.io | bash -s stable
```

To install nodejs and yarn with nvm:
```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash
source ~/.bashrc
npm install stable
npm install -g yarn
```

#### Update node packages and ruby gems

You'll need to run these command in the root of your source code folder:
```
bundle install
yarn install
```

#### Server Translation

For the Ruby-based server, [i18n Tasks](https://github.com/glebm/i18n-tasks) is
used to manage the translations.

The command:
```
bundle exec i18n-tasks [command] [options]
```

You can use this command to find all usages:
```
bundle exec i18n-tasks --help
```

##### Key Usages

To see if there is any missing or unused language key(s) in your language, you
can use `health` command. For example, if you want to check the health of Magyar
(**hu**) translations:
```
bundle exec i18n-tasks health hu
```

If you found that there is missing keys in your file, you can use `add-missing`:
```
bundle exec i18n-tasks add-missing hu
```

Please note that `health` would simply check the existence of the language key.
It does not check if they are different from the default (English). Also the
command `add-missing` only copy the English translation for your lanuage.

In short, running `add-missing` can help you pass the `health` test, but you'd
still need to check your yml and translate the "added" strings.

#### Web Client Translation

For web client, [NPM scripts](https://docs.npmjs.com/misc/scripts) are written
to help.

There are 2 specific scripts that you'll have to use:

**`yarn build:development`**

Build the webpack assets for development use. Also generate the frontend
translation reference files. You'll need to run this every time you clone /
fetch the source code.

You'll need to run this before using `yarn manage:translation`.

**`yarn manage:translation`**

Based on [react-intl-translations-manager](https://www.npmjs.com/package/react-intl-translations-manager).
Sync and check the translation strings. It will:

* automatically create missing keys in json translation files; and
* remove obsoleted translations; and
* show you a list of translations needed; and
* create non-existed translation files (if forced to).

You may use the help command to get usage instructions:

```
yarn manage:translation -- --help
```

##### Key Usages

You may specify the language to sync and check:
```
yarn manage:translation -- [language code]
```

For example, to synchronize translations for French (**fr**):
```
yarn manage:translation -- fr
```

You may also use this to create json language files. You'd need to apply the
`--force` option. For example, if Arabic (**ar**) javascript translation
were not
created yet:
```
yarn manage:translation -- --force ar
```
will create the following language files:
* app/javascript/mastodon/locales/**ar**.json
* app/javascript/mastodon/locales/whitelist_**ar**.json

#### Check Your Translations

To see if you lanuage is doing good, you may mix using the command tools, like
this:

```
bundle exec i18n-tasks health zh-HK
yarn manage:translations -- zh-HK
```

If you're doing good, you'd have a result like this:

```
$ bundle exec i18n-tasks health zh-HK
Forest (zh-HK) has 422 keys in total. On average, values are 13 characters long, keys have 3.2 segments.
✓ Good job! No translations are missing.
✓ Well done! Every translation is in use.

$ yarn manage:translations -- zh-HK
yarn manage:translations v0.23.4
$ node ./config/webpack/translationRunner.js zh-HK
Maintaining zh-HK.json:

 Perfectly maintained, no remarks!

Done in 0.24s.
```
