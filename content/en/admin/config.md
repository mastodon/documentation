---
title: Configuring your environment
description: Setting environment variables for your Mastodon installation.
menu:
  docs:
    weight: 30
    parent: admin
---

Mastodon uses environment variables as its configuration.

For convenience, it can read them from a flat file called `.env.production` in the Mastodon directory (called a "dotenv" file), but they can always be overridden by a specific process. For example, systemd service files can read environment variables from an `EnvironmentFile` or from inline definitions with `Environment`, so you can have different configuration parameters for specific services. They can also be specified when calling Mastodon from the command line.

## Basic {#basic}

### Federation {#federation}

#### `LOCAL_DOMAIN`

This is the unique identifier of your server in the network. It cannot be safely changed later. It has to be the domain name you are running the server under (without the protocol part, e.g. just `example.com`).

#### `WEB_DOMAIN`

It is possible to run the Mastodon interface on one domain, while having the users' handles on a different domain, e.g. addressing users as `@alice@example.com` but accessing Mastodon on `mastodon.example.com`. This may be useful if your domain name is already used for a different website but you still want to use it as a Mastodon identifier because it looks better/shorter. This requires additional nginx configuration like proxying `LOCAL_DOMAIN/.well-known` to your Mastodon instace or set a WebFinger. [more about WebFinger](/spec/webfinger/#intro)

#### `ALTERNATE_DOMAINS`

If you have multiple domains pointed at your Mastodon server, this setting will allow Mastodon to recognize itself when users are addressed using those other domains. Separate the domains by commas, e.g. `foo.com,bar.com`

#### `AUTHORIZED_FETCH` {#authorized_fetch}

Also called "secure mode". When set to `true`, the following changes occur:

- Mastodon will stop generating linked-data signatures for public posts, which prevents them from being re-distributed efficiently but without precise control. Since a linked-data object with a signature is entirely self-contained, it can be passed around without making extra requests to the server where it originates.
- Mastodon will require HTTP signature authentication on ActivityPub representations of public posts and profiles, which are normally available without any authentication. Profiles will only return barebones technical information when no authentication is supplied.
- Mastodon will require any REST/streaming API access to have a user context (i.e. having gone through an OAuth authorization screen with an active user), when normally some API endpoints are available without any authentication.

As a result, through the authentication mechanism and avoiding re-distribution mechanisms that do not have your server in the loop, it becomes possible to enforce who can and cannot retrieve even public content from your server, e.g. servers whose domains you have blocked.

{{< hint style="warning" >}}
Unfortunately, secure mode is not without its drawbacks, which is why it is not enabled by default. Not all software in the fediverse can support it fully, in particular some functionality will be broken with Mastodon servers older than 3.0; you lose some useful functionality even with up-to-date servers since linked-data signatures are used to make public conversation threads more complete; and because an authentication mechanism on public content means no caching is possible, it comes with an increased computational cost.
{{</ hint >}}

{{< hint style="warning" >}}
Secure mode does not hide HTML representations of public posts and profiles. HTML is a more lossy format compared to first-class ActivityPub representations or the REST API but it is still a potential vector for scraping content.
{{</ hint >}}

#### `LIMITED_FEDERATION_MODE` {#limited_federation_mode}

When set to `true`, Mastodon will restrict federation to servers you have manually approved only, as well as disable all public pages and some REST APIs. Limited federation mode is based on secure mode (`AUTHORIZED_FETCH_MODE`).

When switching an existing instance to limited federation mode, the following command should be used to remove any already existent data on non-allowed domains:

```
tootctl domain purge --limited-federation-mode
```

{{< hint style="warning" >}}
This mode is intended for private use only, such as in academic instituations or internal company networks, as it effectively creates a data silo, which is contrary to Mastodon's mission of decentralization.
{{</ hint >}}

{{< hint style="info" >}}
This setting was known as `WHITELIST_MODE` prior to 3.1.5.
{{</ hint >}}

### Secrets {#secrets}

#### `SECRET_KEY_BASE`

Generate with `rake secret`. Changing it will break all active browser sessions.

#### `OTP_SECRET`

Generate with `rake secret`. Changing it will break two-factor authentication.

#### `VAPID_PRIVATE_KEY`

Generate with `rake mastodon:webpush:generate_vapid_key`. Changing it will break push notifications.

#### `VAPID_PUBLIC_KEY`

Generate with `rake mastodon:webpush:generate_vapid_key`. Changing it will break push notifications.

### Deployment {#deployment}

#### `RAILS_ENV`

Environment. Can be `production`, `development`, or `test`. If you are running Mastodon on your personal computer for development purposes, use `development`. That is also the default. If you are running Mastodon online, use `production`. Mastodon will load different configuration defaults based on the environment.

{{< hint style="warning" >}}
This variable cannot be defined in dotenv (`.env`) files as it's used before they are loaded.
{{</ hint >}}

#### `RAILS_SERVE_STATIC_FILES`

If set to true, Mastodon will answer requests for files in its `public` directory. This may be necessary if the reverse proxy (e.g. nginx) has no file system access to the `public` directory itself, such as in a containerized environment. It is a suboptimal setting because serving static files directly from the file system will always be much faster than serving them through the Ruby on Rails process.

#### `RAILS_LOG_LEVEL`

Determines the amount of logs generated by Mastodon. Defaults to `info`, which generates a log entry about every request served by Mastodon and every background job processed by Mastodon. This can be useful but can get quite noisy and strain the I/O of your machine if there is a lot of traffic/activity. In that case, `warning` is recommended, which will only output information about things that are going wrong, and otherwise stay quiet. Possible values are `debug`, `info`, `warning`, `error`, `fatal` and `unknown`.

#### `TRUSTED_PROXY_IP`

If your Mastodon web process is on the same machine as your reverse proxy (e.g. nginx), then you don't need this setting. Otherwise, you need to set it to the IP from which your reverse proxy sends requests to Mastodon's web process, otherwise Mastodon will record the reverse proxy's own IP as the IP of all requests, which would be bad because IP addresses are used for important rate limits and security functions.

#### `SOCKET`

Instead of binding to an IP address like `127.0.0.1`, you may bind to a Unix socket. This variable is process-specific, e.g. you need different values for every process, and it works for both web (Puma) processes and streaming API (Node.js) processes.

{{< hint style="warning" >}}
This variable cannot be defined in dotenv (`.env`) files as it's used before they are loaded.
{{</ hint >}}

#### `PORT`

If you are not using Unix sockets, this defines which port the process will listen on. This variable is process-specific, e.g. you need different values for every process, and it works for both web (Puma) processes and streaming API (Node.js) processes. By default, web listens on `3000` and streaming API on `4000`.

{{< hint style="warning" >}}
This variable cannot be defined in dotenv (`.env`) files as it's used before they are loaded.
{{</ hint >}}

#### `NODE_ENV`

Equivalent to `RAILS_ENV`, but for the streaming API (Node.js).

{{< hint style="warning" >}}
This variable cannot be defined in dotenv (`.env`) files as it's used before they are loaded.
{{</ hint >}}

#### `BIND`

If you are not using Unix sockets, this defines the IP to which the process will bind. Multiple processes can bind to the same IP as long as they listen on different ports. Defaults to `127.0.0.1`.

{{< hint style="warning" >}}
This variable cannot be defined in dotenv (`.env`) files as it's used before they are loaded.
{{</ hint >}}

### Scaling options {#scaling}

{{< page-ref page="admin/scaling.md" >}}

#### `WEB_CONCURRENCY`

Specific to Puma, this variable determines how many different processes Puma forks into. Defaults to `2`.

#### `MAX_THREADS`

Specific to Puma, this variable determines how many threads each Puma process maintains. Defaults to `5`.

#### `PREPARED_STATEMENTS`

By default, Mastodon uses the prepared statements feature of PostgreSQL, which offers some performance advantages. This feature is not available if you are using a connection pool where connections are shared between transactions and must thus be set to `false`. When you are scaling up, the advantages of having a transaction-based connection pool outweigh those provided by prepared statements.

#### `STREAMING_API_BASE_URL`

The streaming API can be deployed to a different domain/subdomain. This may improve the performance of the streaming API as in the default configuration long-lived streaming API requests are proxied through nginx, while serving the streaming API from a different domain/subdomain would allow one to skip nginx entirely.

Example value: `wss://streaming.example.com`

#### `STREAMING_CLUSTER_NUM`

Specific to the streaming API, this variable determines how many different processes the streaming API forks into. Defaults to the number of CPU cores minus one.

## Database connections {#connections}

### PostgreSQL {#postgresql}

#### `DB_HOST`

Defaults to `localhost`.

#### `DB_USER`

Defaults to `mastodon`.

#### `DB_NAME`

Defaults to `mastodon_production`.

#### `DB_PASS`

No default.

#### `DB_PORT`

Defaults to `5432`.

#### `DB_POOL`

How many database connections to pool in the process. This value should cover every thread in the process, for this reason, it defaults to the value of `MAX_THREADS`.

#### `DB_SSLMODE`

Postgres's [SSL mode](https://www.postgresql.org/docs/10/libpq-ssl.html). Defaults to `prefer`.

#### `DATABASE_URL`

If provided, takes precedence over `DB_HOST`, `DB_USER`, `DB_NAME`, `DB_PASS` and `DB_PORT`.

Example value: `postgresql://user:password@localhost:5432`

### Redis {#redis}

{{< hint style="info" >}}
It is possible to use a separate Redis server for volatile cache. You may wish to do so if your Redis server starts getting overwhelmed.
{{</ hint >}}

#### `REDIS_HOST`

Defaults to `localhost`.

#### `REDIS_PORT`

Defaults to `6379`.

#### `REDIS_URL`

If provided, takes precedence over `REDIS_HOST` and `REDIS_PORT`.

Example value: `redis://user:password@localhost:6379`

#### `REDIS_NAMESPACE`

If provided, namespaces all Redis keys. This allows sharing the same Redis database between different projects or Mastodon servers.

#### `CACHE_REDIS_HOST`

Defaults to value of `REDIS_HOST`.

#### `CACHE_REDIS_PORT`

Defaults to value of `REDIS_PORT`.

#### `CACHE_REDIS_URL`

If provided, takes precedence over `CACHE_REDIS_HOST` and `CACHE_REDIS_PORT`. Defaults to value of `REDIS_URL`.

#### `CACHE_REDIS_NAMESPACE`

Defaults to value of `REDIS_NAMESPACE`.

### ElasticSearch {#elasticsearch}

{{< page-ref page="admin/optional/elasticsearch.md" >}}

#### `ES_ENABLED`

If set to `true`, Mastodon will use ElasticSearch for its search functions.

#### `ES_HOST`

Host of the ElasticSearch server. Defaults to `localhost`

#### `ES_PORT`

Port of the ElasticSearch server. Defaults to `9200`

#### `ES_PREFIX`

Useful if the ElasticSearch server is shared between multiple projects or different Mastodon servers. Defaults to value of `REDIS_NAMESPACE`.

### StatsD {#statsd}

#### `STATSD_ADDR`

If set, Mastodon will log some events and metrics into a StatsD instance identified by its hostname and port.

Example value: `localhost:8125`

#### `STATSD_NAMESPACE`

If set, all StatsD keys will be prefixed with this. Defaults to `Mastodon.production` when `RAILS_ENV` is `production`, `Mastodon.development` when it's `development`, etc.

## Limits {#limits}

#### `SINGLE_USER_MODE`

If set to `true`, the frontpage of your Mastodon server will always redirect to the first profile in the database and registrations will be disabled.

#### `EMAIL_DOMAIN_ALLOWLIST`

If set, registrations will not be possible with any e-mails **except** those from the specified domains. Pipe-separated values, e.g.: `foo.com|bar.com`

#### `EMAIL_DOMAIN_DENYLIST`

If set, registrations will not be possible with any e-mails from the specified domains. Pipe-separated values, e.g.: `foo.com|bar.com`

{{< hint style="warning" >}}
This option is deprecated. You can dynamically block e-mail domains from the admin interface or from the `tootctl` command-line interface.
{{</ hint >}}

#### `DEFAULT_LOCALE`

By default, Mastodon will automatically detect the visitor's language from browser headers and display the Mastodon interface in that language (if it's supported). If you are running a language-specific or regional server, that behaviour may mislead visitors who do not speak your language into signing up on your server. For this reason, you may want to set this variable to a specific language.

Example value: `de`

Supported languages:

- `ar`
- `ast`
- `bg`
- `bn`
- `br`
- `ca`
- `co`
- `cs`
- `cy`
- `da`
- `de`
- `el`
- `en`
- `eo`
- `es`
- `es-AR`
- `et`
- `eu`
- `fa`
- `fi`
- `fr`
- `ga`
- `gl`
- `he`
- `hi`
- `hr`
- `hu`
- `hy`
- `id`
- `io`
- `is`
- `it`
- `ja`
- `ka`
- `kab`
- `kk`
- `kn`
- `ko`
- `lt`
- `lv`
- `mk`
- `ml`
- `mr`
- `ms`
- `nl`
- `nn`
- `no`
- `oc`
- `pl`
- `pt-BR`
- `pt-PT`
- `ro`
- `ru`
- `sk`
- `sl`
- `sq`
- `sr`
- `sr-Latn`
- `sv`
- `ta`
- `te`
- `th`
- `tr`
- `uk`
- `ur`
- `vi`
- `zh-CN`
- `zh-HK`
- `zh-TW`

#### `MAX_SESSION_ACTIVATIONS`

How many browser sessions are allowed per-user. Defaults to `10`. If a new browser session is created, then the oldest session is deleted, e.g. user in that browser is logged out.

#### `USER_ACTIVE_DAYS`

Mastodon stores home feeds in RAM (specifically, in the Redis database). This makes them very fast to access and update, but it also means that you don't want to keep them there if they're not used, and you don't want to spend resources on inserting new items into home feeds that will not be accessed. For this reason, Mastodon periodically clears out home feeds of users who haven't been online in a while, and if they re-appear, it regenerates those home feeds from database data. By default, users are considered active if they have been online in the past `7` days.

Regeneration of home feeds is computationally expensive, if your Sidekiq is constantly doing it because your users come online every 3 days but your `USER_ACTIVE_DAYS` is set to 2, then consider adjusting it up.

{{< hint style="info" >}}
This setting has no relation to which users are considered active for the purposes of statistics, such as the Monthly Active Users number.
{{</ hint >}}

#### `ALLOWED_PRIVATE_ADDRESSES`

Comma-separated specific addresses/subnets allowed in outgoing HTTP queries.

## E-mail {#email}

* `SMTP_SERVER`
* `SMTP_PORT`
* `SMTP_LOGIN`
* `SMTP_PASSWORD`
* `SMTP_FROM_ADDRESS`
* `SMTP_DOMAIN`
* `SMTP_DELIVERY_METHOD`
* `SMTP_AUTH_METHOD`
* `SMTP_CA_FILE`
* `SMTP_OPENSSL_VERIFY_MODE`
* `SMTP_ENABLE_STARTTLS_AUTO`
* `SMTP_TLS`
* `SMTP_SSL`

## File storage {#cdn}

#### `CDN_HOST`

You can serve static assets (logos, emojis, CSS, JS, etc) from a separate host, like a CDN (Content Delivery Network) as it can decrease loading times for your users.

Example value: `https://assets.example.com`

{{< hint style="info" >}}
You must serve the files with CORS headers, otherwise some functions of Mastodon's web UI will not work. For example, `Access-Control-Allow-Origin: *`
{{</ hint >}}

#### `S3_ALIAS_HOST`

Similar to `CDN_HOST`, you may serve *user-uploaded* files from a separate host. In fact, if you are using external storage like Amazon S3, Minio or Google Cloud, you will by default be serving files from those services' URLs.

It is *extremely recommended* to use your own host instead, for a few reasons:

1. Bandwidth on external storage providers is metered and expensive
2. You may want to switch to a different provider later without breaking old links

Example value: `files.example.com`

{{< page-ref page="admin/optional/object-storage-proxy.md" >}}

{{< hint style="info" >}}
You must serve the files with CORS headers, otherwise some functions of Mastodon's web UI will not work. For example, `Access-Control-Allow-Origin: *`
{{</ hint >}}

### Local file storage {#paperclip}

* `PAPERCLIP_ROOT_PATH`
* `PAPERCLIP_ROOT_URL`

### Amazon S3 and compatible {#s3}

* `S3_ENABLED`
* `S3_BUCKET`
* `AWS_ACCESS_KEY_ID`
* `AWS_SECRET_ACCESS_KEY`
* `S3_REGION`
* `S3_PROTOCOL`
* `S3_HOSTNAME`
* `S3_ENDPOINT`
* `S3_SIGNATURE_VERSION`
* `S3_OVERRIDE_PATH_STYLE`
* `S3_OPEN_TIMEOUT`
* `S3_READ_TIMEOUT`

### Swift {#swift}

* `SWIFT_ENABLED`
* `SWIFT_USERNAME`
* `SWIFT_TENANT`
* `SWIFT_PASSWORD`
* `SWIFT_PROJECT_ID`
* `SWIFT_AUTH_URL`
* `SWIFT_CONTAINER`
* `SWIFT_OBJECT_URL`
* `SWIFT_REGION`
* `SWIFT_DOMAIN_NAME`
* `SWIFT_CACHE_TTL`

## External authentication {#external-authentication}

* `OAUTH_REDIRECT_AT_SIGN_IN`

### LDAP {#ldap}

* `LDAP_ENABLED`
* `LDAP_HOST`
* `LDAP_PORT`
* `LDAP_METHOD`
* `LDAP_BASE`
* `LDAP_BIND_DN`
* `LDAP_PASSWORD`
* `LDAP_UID`
* `LDAP_SEARCH_FILTER`
* `LDAP_MAIL`
* `LDAP_UID_CONVERSTION_ENABLED`

### PAM {#pam}

* `PAM_ENABLED`
* `PAM_EMAIL_DOMAIN`
* `PAM_DEFAULT_SERVICE`
* `PAM_CONTROLLED_SERVICE`

### CAS {#cas}

* `CAS_ENABLED`
* `CAS_URL`
* `CAS_HOST`
* `CAS_PORT`
* `CAS_SSL`
* `CAS_VALIDATE_URL`
* `CAS_CALLBACK_URL`
* `CAS_LOGOUT_URL`
* `CAS_LOGIN_URL`
* `CAS_UID_FIELD`
* `CAS_CA_PATH`
* `CAS_DISABLE_SSL_VERIFICATION`
* `CAS_UID_KEY`
* `CAS_NAME_KEY`
* `CAS_EMAIL_KEY`
* `CAS_NICKNAME_KEY`
* `CAS_FIRST_NAME_KEY`
* `CAS_LAST_NAME_KEY`
* `CAS_LOCATION_KEY`
* `CAS_IMAGE_KEY`
* `CAS_PHONE_KEY`

### SAML {#saml}

* `SAML_ENABLED`
* `SAML_ACS_URL`
* `SAML_ISSUER`
* `SAML_IDP_SSO_TARGET_URL`
* `SAML_IDP_CERT`
* `SAML_IDP_CERT_FINGERPRINT`
* `SAML_NAME_IDENTIFIER_FORMAT`
* `SAML_CERT`
* `SAML_PRIVATE_KEY`
* `SAML_SECURITY_WANT_ASSERTION_SIGNED`
* `SAML_SECURITY_WANT_ASSERTION_ENCRYPTED`
* `SAML_SECURITY_ASSUME_EMAIL_IS_VERIFIED`
* `SAML_ATTRIBUTES_STATEMENTS_UID`
* `SAML_ATTRIBUTES_STATEMENTS_EMAIL`
* `SAML_ATTRIBUTES_STATEMENTS_FULL_NAME`
* `SAML_ATTRIBUTES_STATEMENTS_FIRST_NAME`
* `SAML_ATTRIBUTES_STATEMENTS_LAST_NAME`
* `SAML_UID_ATTRIBUTE`
* `SAML_ATTRIBUTES_STATEMENTS_VERIFIED`
* `SAML_ATTRIBUTES_STATEMENTS_VERIFIED_EMAIL`

## Hidden services {#hidden-services}

{{< page-ref page="admin/optional/tor.md" >}}

* `http_proxy`
* `ALLOW_ACCESS_TO_HIDDEN_SERVICE`

## Other {#other}

#### `SKIP_POST_DEPLOYMENT_MIGRATIONS`

This variable only has any effect when running `rake db:migrate` and it is extremely specific to the Mastodon upgrade process. There are two types of database migrations, those that run before new code is deployed and running, and those that run after. By default, both types of migrations are executed. If you shut down all Mastodon processes before running migrations, then there is no difference. The variable makes sense for zero-downtime upgrades. You will see in the upgrade instructions of a specific Mastodon version if you need to use it or not.

