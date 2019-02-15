---
title: Overview
description: How to setup a development environment for Mastodon
menu:
  docs:
    parent: development
    weight: 1
---

Mastodon is a **Ruby on Rails** application with a **React.js** front-end. It follows standard practices of those frameworks, so if you are already familiar with Rails or React.js, you will not find any surprises here.

The best way of working with Mastodon in a development environment is installing all the dependencies on your system, rather than using Docker or Vagrant. You need Ruby, Node.js, PostgreSQL and Redis, which is a pretty standard set of dependencies for Rails applications.

## Environments

An "environment" is a set of configuration values intended for a specific use case. Some environments could be: development, in which you intend to change the code; test, in which you intend to run the automated test suite; staging, which is meant to preview the code to end-users; and production, which is intended to face end-users. Mastodon comes with configurations for development, test and production.

The default value of `RAILS_ENV` is `development`, so you don't need to set anything extra to run Mastodon in development mode. In fact, all of Mastodon's configuration has correct defaults for the development environment, so you do not need an `.env` file unless you need to customize something. Here are some of the different behaviours between the development environment and the production environment:

- Ruby code reloads itself when you change it, which means you don't need to restart the Rails server process to see changes
- All errors you encounter show stack traces in the browser, rather than being hidden behind a generic error page
- Webpack runs continuously and re-compiles JS and CSS assets when you change any of the front-end files, and the pages automatically reload
- Caching is disabled by default
- An admin account with the e-mail `admin@localhost:3000` and password `mastodonadmin` is created automatically during `db:seed`

It should be noted that the Docker configuration distributed with Mastodon is optimized for the production environment, and so is an extremely bad fit for development. The Vagrant configuration, on the other hand, is meant specifically for development and not production use.

## Setup

Run following commands in the project directory `bundle install`, `yarn install`.  

In the development environment, Mastodon will use PostgreSQL as the currently signed-in Linux user using the `ident` method, which usually works out of the box. The one command you need to run is `rails db:setup` which will create the databases `mastodon_development` and `mastodon_test`, load the schema into them, and then create seed data defined in `db/seed.rb` in `mastodon_development`. The only seed data is an admin account with the credentials `admin@localhost:3000` / `mastodonadmin`.

> Please keep in mind, by default Mastodon will run on port 3000. If you configure a different port for it, the generated admin account will use that number.

## Running

There are multiple processes that need to be run for the full set of Mastodon's functionality, although they can be selectively omitted. To run all of them with just one command, you can install Foreman with `gem install foreman --no-document` and then use:

    foreman start

In the Mastodon directory. This will start processes defined in `Procfile.dev`, which will give you: A Rails server, a Webpack server, a streaming API server, and Sidekiq. Of course, you can run any of those things stand-alone depending on your needs.

## Testing

|Command|Description|
|-------|-----------|
|`rspec`|Run the Ruby test suite|
|`yarn run test`|Run the JavaScript test suite|
|`rubocop`|Check the Ruby code for conformance with our code style|

## Most notable libraries used

Knowledge and understanding of these libraries will simplify work with the Mastodon code.

### Ruby

- `haml`, a templating language
- `devise`, for authentication
- `doorkeeper`, for acting as an OAuth 2 provider
- `paperclip`, for file uploads and attachments
- `sidekiq`, for background processing

### JavaScript

- `immutable`, for immutable data structures
- `react`, for rendering the dynamic web application
- `react-redux`, for managing React state
- `react-router-dom`, for navigation within React
- `react-intl`, for localizations within React

## Code structure

The following overview should not be seen as complete or authoritative, but as a rough guidance to help you find your way in the application.

### Ruby

|Path|Description|
|----|-----------|
|`app/controllers`|Code that binds business logic to templates|
|`app/helpers`|Code that can be used from views, i.e. common operations|
|`app/lib`|Code that doesn't fit in the other categories|
|`app/models`|Code that represents data entities|
|`app/serializers`|Code that generates JSON from models|
|`app/services`|Complex logical operations involving multiple models|
|`app/views`|Templates for generating HTML or other output|
|`app/workers`|Code that executes outside the request-response cycle|
|`spec`|Automated test suite|

### JavaScript

|Path|Description|
|----|-----------|
|`app/javascript/mastodon`|Code for the multi-column React.js application|
|`app/javascript/packs`|Code for non-React.js pages|

### CSS and other assets

|Path|Description|
|----|-----------|
|`app/javascript/images`|Images|
|`app/javascript/styles`|Code that turns into CSS via Sass|

### Localizations

|Path|Description|
|----|-----------|
|`config/locales`|Server-side localizations in the YML format|
|`app/javascript/mastodon/locales`|Client-side localizations in the JSON format|

## Localization maintenance

All locale files are normalized to ensure consistent formatting and key order, which minimizes changesets in version control.

|Command|Description|
|-------|-----------|
|`i18n-tasks normalize`|Normalize server-side translations|
|`yarn run manage:translations`|Normalize client-side translations|