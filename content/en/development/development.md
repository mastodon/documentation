---
title: Development
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

## Testing

To confirm that your Mastodon code works, run the automated test suite with `rspec`

## Most notable libraries used

Knowledge and understanding of these libraries will simplify work with the Mastodon code.

### Ruby

- haml
- devise
- doorkeeper
- paperclip
- sidekiq

### JavaScript

- immutable
- react
- react-redux
- react-router-dom
- react-intl

## Code structure

The following overview should not be seen as complete or authoritative, but as a rough guidance to help you find your way in the application.

### Ruby

|Path|Description|
|----|-----------|
|`app/controllers`|Code that logically connects models, services and views, authentication layer|
|`app/helpers`|Code that can be used from views, i.e. common operations|
|`app/lib`|Code that doesn't fit in the other categories|
|`app/models`|Code that operates on database records, or otherwise represents data entities|
|`app/serializers`|Code that generates JSON from models|
|`app/services`|Complex logical operations involving multiple models|
|`app/views`|Templates for generating HTML or other output|
|`app/workers`|Code that executes outside the request-response cycle, i.e. in Sidekiq|
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