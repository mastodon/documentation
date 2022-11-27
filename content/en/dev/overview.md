---
title: Technical overview
description: A description of Mastodon's architecture.
menu:
  docs:
    weight: 10
    parent: dev
---

Mastodon is a Ruby on Rails application with a React.js front-end.  It follows standard practices of those frameworks, so if you are already familiar with Rails or React.js, you will not find any surprises here.

## Architecture

Mastodon's architecture can be divided in the five sub-systems depicted in the image bellow:

{{< figure src="/assets/architecture.png" caption="Architectural layout of a Mastodon deployment." >}}

  1. The web-server, who deals with the incoming HTTP calls from clients;
  2. Mastodon's logic which implements the Tooting functionalities you love;
  3. A job processing system (a.k.a. queuing framework) used by Mastodon's logic to process as needed tasks;
  4. An "operations data system" which keeps needed information handy for quick access; 
  5. A persistent data storage system where all those toots and cat photos will be written and read from.

Because the Mastodon's logic is implemented in Ruby, as of now, all these systems are implemented on or easily integratable in a Ruby project stack. For instance, although one could imagine using any HTTP server or Queue framework, as of now, the default architecture uses [Puma](https://puma.io) and [Sidekiq](https://sidekiq.org), both Ruby libraries that made adding Web call-handling and Job processing conveniently easy to create. 

In terms of data management, Mastodon uses the popular in-memory datastructure storage system [Redis](https://redis.io) which affords super-fast access to vital information like cached toot streams and Sidekiq's queues and its jobs. The final bit, the persistent storage, is accomplished by the [PosgreSQL][https://posgresql.org] for general data, and for media storage, Mastodon can use either a conventional filesystem or an Elastic Storage solution (a.k.a. storage bucket - initially created as the S3 API by Amazon Cloud, but now implemented by most cloud service providers like Google, Azure, or Digital Ocean.).


## Development

The best way of working with Mastodon in a development environment is installing all the dependencies directly on an Ubuntu Server, rather than using Docker or Vagrant. You will need to install all the software describe above -- e.g., Ruby, Node.js, PostgreSQL and Redis -- which is a pretty standard set of dependencies for Rails applications. You may also prefer to install your storage-components in dedicated servers, but there is a conversation for another time.

Tutorials for installing these dependencies can be found on the “Installing from source” page in the Running Mastodon section of the documentation. Please keep in mind that root access to a machine running Ubuntu (currently on 22.10) is required. After following the installation guide in the Running Mastodon section, see the “Setting up a dev environment” page for further instruction on how to configure your environment for development.

### Environments {#environments}

An “environment” is a set of configuration values intended for a specific use case. Some environments could be: development, in which you intend to change the code; test, in which you intend to run the automated test suite; staging, which is meant to preview the code to end-users; and production, which is intended to face end-users. Mastodon comes with configurations for development, test and production.

The default value of `RAILS_ENV` is `development`, so you don’t need to set anything extra to run Mastodon in development mode. In fact, all of Mastodon’s configuration has correct defaults for the development environment, so you do not need an `.env` file unless you need to customize something. Here are some of the different behaviours between the development environment and the production environment:

* Ruby code reloads itself when you change it, which means you don’t need to restart the Rails server process to see changes
* All errors you encounter show stack traces in the browser, rather than being hidden behind a generic error page
* Webpack runs continuously and re-compiles JS and CSS assets when you change any of the front-end files, and the pages automatically reload
* Caching is disabled by default
* An admin account with the e-mail `admin@localhost:3000` and password `mastodonadmin` is created automatically during `db:seed`

It should be noted that the Docker configuration distributed with Mastodon is optimized for the production environment, and so is an extremely bad fit for development. The Vagrant configuration, on the other hand, is meant specifically for development and not production use.

