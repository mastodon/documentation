---
title: Configuring your environment
description: Setting environment variables for your Mastodon installation.
menu:
  docs:
    weight: 30
    parent: admin
---

Mastodon uses environment variables as its configuration.

For convenience, it can read them from a flat file called `.env.production` in the Mastodon directory (called a "dotenv" file), but they can always be overridden by a specific process. For example, systemd service files can read environment variables from an `EnvironmentFile` or inline definitions with `Environment`, so you can have different configuration parameters for specific services. They can also be specified when calling Mastodon from the command line.

## Basic {#basic}

### Federation and display {#federation}

#### `LOCAL_DOMAIN`

This is the unique identifier of your server in the network. It cannot be safely changed later, as changing it will cause remote servers to confuse your existing accounts with entirely new ones. It has to be the domain name you are running the server under (without the protocol part, e.g. just `example.com`).

#### `WEB_DOMAIN`

`WEB_DOMAIN` is an optional environment variable allowing the installation of Mastodon on one domain, while having the users' handles on a different domain, e.g. addressing users as `@alice@example.com` but accessing Mastodon on `mastodon.example.com`. This may be useful if your domain name is already used for a different website but you still want to use it as a Mastodon identifier because it looks better or shorter.

As with `LOCAL_DOMAIN`, `WEB_DOMAIN` cannot be safely changed once set, as this will confuse remote servers that know of your previous settings and may break communication with them or make it unreliable. As the issues lie with remote servers' understanding of your accounts, re-installing Mastodon from scratch will not fix the issue. Therefore, please be extremely cautious when setting up `LOCAL_DOMAIN` and `WEB_DOMAIN`.

To install Mastodon on `mastodon.example.com` in such a way it can serve `@alice@example.com`, set `LOCAL_DOMAIN` to `example.com` and `WEB_DOMAIN` to `mastodon.example.com`. This also requires additional configuration on the server hosting `example.com` to redirect requests from `https://example.com/.well-known/webfinger` to `https://mastodon.example.com/.well-known/webfinger`. For instance, with nginx, the configuration could look like the following:

```
location /.well-known/webfinger {
  add_header Access-Control-Allow-Origin '*';
  return 301 https://mastodon.example.com$request_uri;
}
```

#### `ALTERNATE_DOMAINS`

If you have multiple domains pointed at your Mastodon server, this setting will allow Mastodon to recognize itself when users are addressed using those other domains. Separate the domains by commas, e.g. `foo.com,bar.com`

#### `ALLOWED_PRIVATE_ADDRESSES`

Comma-separated specific addresses/subnets are allowed in outgoing HTTP queries.

#### `AUTHORIZED_FETCH`

Also called "secure mode". When set to `true`, the following changes occur:

- Mastodon will stop generating linked-data signatures for public posts, which prevents them from being re-distributed efficiently but without precise control. Since a linked-data object with a signature is entirely self-contained, it can be passed around without making extra requests to the server where it originates.
- Mastodon will require HTTP signature authentication on ActivityPub representations of public posts and profiles, which are normally available without any authentication. Profiles will only return barebones technical information when no authentication is supplied.
- Prior to v4.0.0: Mastodon will require any REST/streaming API access to have a user context (i.e. having gone through an OAuth authorization screen with an active user) when normally some API endpoints are available without any authentication.

As a result, through the authentication mechanism and avoiding re-distribution mechanisms that do not have your server in the loop, it becomes possible to enforce who can and cannot retrieve even public content from your server, e.g. servers whose domains you have blocked.

{{< hint style="warning" >}}
Unfortunately, secure mode is not without its drawbacks, which is why it is not enabled by default. Not all software in the fediverse can support it fully, in particular, some functionality will be broken with Mastodon servers older than 3.0; you lose some useful functionality even with up-to-date servers since linked-data signatures are used to make public conversation threads more complete; and because an authentication mechanism on public content means no caching is possible, it comes with an increased computational cost.
{{</ hint >}}

{{< hint style="warning" >}}
Secure mode does not hide HTML representations of public posts and profiles. HTML is a more lossy format compared to first-class ActivityPub representations or the REST API but it is still a potential vector for scraping content.
{{</ hint >}}

#### `LIMITED_FEDERATION_MODE`

When set to `true`, Mastodon will restrict federation to servers you have manually approved only, as well as disable all public pages and some REST APIs. Limited federation mode is based on secure mode (`AUTHORIZED_FETCH`).

When switching an existing instance to limited federation mode, the following command should be used to remove any already existent data on non-allowed domains:

```
tootctl domain purge --limited-federation-mode
```

{{< hint style="warning" >}}
This mode is intended for private use only, such as in academic institutions or internal company networks, as it effectively creates a data silo, which is contrary to Mastodon's mission of decentralization.
{{</ hint >}}

{{< hint style="info" >}}
This setting was known as `WHITELIST_MODE` prior to 3.1.5.
{{</ hint >}}

#### `DISALLOW_UNAUTHENTICATED_API_ACCESS`

As of Mastodon v4.0.0, the web app is now used to render all requests, even for logged-out viewers. To make these views work, the web app makes public API requests to fetch accounts and statuses. If you would like to disallow this, then set this variable to `true`. Note that disallowing unauthenticated API access will cause profile and post permalinks to return an error to logged-out users, essentially making it so that the only way to view content is to either log in locally or fetch it via ActivityPub.

#### `SINGLE_USER_MODE`

If set to `true`, the front page of your Mastodon server will always redirect to the first profile in the database and registrations will be disabled.

#### `DISABLE_AUTOMATIC_SWITCHING_TO_APPROVED_REGISTRATIONS`

In order to prevent abandoned Mastodon servers from being used for spam, harassment and other malicious activity, Mastodon will automatically switch new user registrations to require moderator approval whenever they are left open and no activity (including non-moderation actions from apps) from any logged-in user with permission to access moderation reports has been detected in a full week. When this happens, users with the permission to change server settings will receive an email notification.

Setting `DISABLE_AUTOMATIC_SWITCHING_TO_APPROVED_REGISTRATIONS=true` disables this behavior.

**Version history:**\
4.2.8 - added

#### `DEFAULT_LOCALE`

By default, Mastodon will automatically detect the visitor's language from browser headers and display the Mastodon interface in that language (if it's supported). If you are running a language-specific or regional server, that behavior may mislead visitors who do not speak your language into signing up on your server. For this reason, you may want to set this variable to a specific language.

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

Determines the amount of logs generated by Mastodon for the web and Sidekiq processes. Defaults to `info`, which generates a log entry about every request served by Mastodon and every background job processed by Mastodon. This can be useful but can get quite noisy and strain the I/O of your machine if there is a lot of traffic/activity. In that case, `warn` is recommended, which will only output information about things that are going wrong, and otherwise stay quiet. Possible values are `debug`, `info`, `warn`, `error`, `fatal` and `unknown`.

#### `LOG_LEVEL`

Determines the amount of logs generated by Mastodon for the streaming processes. Defaults to `info`. Possible values are `silly` and `info`.

#### `TRUSTED_PROXY_IP`

Tells the Mastodon web and streaming processes which IPs act as your trusted reverse proxy (e.g. nginx, Cloudflare). It affects how Mastodon determines the source IP of each request, which is used for important rate limits and security functions. If the value is set incorrectly then Mastodon could use the IP of the reverse proxy instead of the actual source.

By default, the loopback and private network address ranges are trusted. Specifically:

- `127.0.0.1/8`
- `::1/128`
- `10.0.0.0/8`
- `172.16.0.0/12`
- `192.168.0.0/16`
- `fc00::/7`

If you're using a single reverse proxy and it runs on the same machine or is in the same private network as your Mastodon web and streaming processes then you most likely don't need to modify this setting and can use the default. Or if you're using multiple reverse proxy servers and they're all in the same private network as your Mastodon web and streaming processes then, again, the default should be fine. However, if you're using a reverse proxy server that reaches your Mastodon web and streaming servers via a public IP address (for example if you're using Cloudflare or a similar proxy) then you'll need to set this variable. It should be the IPs of all reverse proxies in use, as a comma-separated list of IPs or IP ranges using [CIDR notation](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing#CIDR_notation). Note that when this variable is set the default ranges (mentioned above) will no longer be trusted, so if you have both an external reverse proxy _and_ a proxy on localhost then you must include the IPs (or IP ranges) of both.

Administrators and moderators can find what Mastodon sees as the source IP for each user by navigating to the Settings > Moderation > Accounts tab. You can use a tool like [IPInfo](https://ipinfo.io) to gauge whether the IP is being used by an end-user ISP, or by a server hosting your proxy.

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

{{< page-ref page="admin/scaling" >}}

#### `SIDEKIQ_CONCURRENCY`

Added in 4.1. Specific to Sidekiq, this variable determines how many different processes Sidekiq forks into. Defaults to `5`.

#### `WEB_CONCURRENCY`

Specific to Puma, this variable determines how many different processes Puma forks into. Defaults to `2`.

#### `MAX_THREADS`

Specific to Puma, this variable determines how many threads each Puma process maintains. Defaults to `5`.

#### `PERSISTENT_TIMEOUT`

Specific to Puma, this variable determines how long Puma should wait before closing a connection. Defaults to `20`.

#### `PREPARED_STATEMENTS`

By default, Mastodon uses the prepared statements feature of PostgreSQL, which offers some performance advantages. This feature is not available if you are using a connection pool where connections are shared between transactions and must thus be set to `false`. When you are scaling up, the advantages of having a transaction-based connection pool outweigh those provided by prepared statements.

#### `STREAMING_API_BASE_URL`

The streaming API can be deployed to a different domain/subdomain. This may improve the performance of the streaming API as in the default configuration long-lived streaming API requests are proxied through nginx, while serving the streaming API from a different domain/subdomain would allow one to skip nginx entirely.

Example value: `wss://streaming.example.com`

#### `STREAMING_CLUSTER_NUM` (deprecated) {#streaming_cluster_num}

{{< hint style="danger" >}}
Deprecated: The streaming server process now only uses a single node.js process, to scale it further, you'll need to follow the documentation in the [scaling guide](/admin/scaling#streaming)
{{< /hint >}}

Specific to the streaming API, this variable determines how many different processes the streaming API forks into. Defaults to the number of CPU cores minus one.

## Backend {#backend}

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

Defines how many database connections to pool in the process. This value should cover every thread in the process, for this reason, it defaults to the value of `MAX_THREADS`.

#### `DB_SSLMODE`

PostgreSQL [SSL mode](https://www.postgresql.org/docs/10/libpq-ssl.html). Defaults to `prefer`.

#### `DATABASE_URL`

If provided, takes precedence over `DB_HOST`, `DB_USER`, `DB_NAME`, `DB_PASS` and `DB_PORT`.

Example value: `postgresql://user:password@localhost:5432`

### PostgreSQL (read-only replica) {#postgresql-replica}

{{< hint style="info" >}}
If you want to use a read-only database replica, you can have more details [on this page](../scaling/#read-replicas)
{{</ hint >}}

#### `REPLICA_DB_HOST`

No default.

#### `REPLICA_DB_PORT`

No default.

#### `REPLICA_DB_NAME`

No default.

#### `REPLICA_DB_USER`

No default.

#### `REPLICA_DB_PASS`

No default.

#### `REPLICA_DATABASE_URL`

If provided, takes precedence over `REPLICA_DB_HOST`, `REPLICA_DB_PORT`, `REPLICA_DB_NAME`, `REPLICA_DB_USER` and `REPLICA_DB_PASS`

No default.

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

If provided, namespaces all Redis keys. This allows the sharing of the same Redis database between different projects or Mastodon servers.

#### `CACHE_REDIS_HOST`

Defaults to the value of `REDIS_HOST`.

#### `CACHE_REDIS_PORT`

Defaults to the value of `REDIS_PORT`.

#### `CACHE_REDIS_URL`

If provided, takes precedence over `CACHE_REDIS_HOST` and `CACHE_REDIS_PORT`. Defaults to the value of `REDIS_URL`.

#### `CACHE_REDIS_NAMESPACE`

Defaults to the value of `REDIS_NAMESPACE`.

#### `SIDEKIQ_REDIS_URL`

### Elasticsearch {#elasticsearch}

{{< page-ref page="admin/elasticsearch" >}}

#### `ES_ENABLED`

If set to `true`, Mastodon will use Elasticsearch for its search functions.

#### `ES_PRESET`

It controls the Elasticsearch indices configuration (number of shards and replica).

Possible values are:

- `single_node_cluster` (default)
- `small_cluster`
- `large_cluster`

See the [Elasticsearch setup page for details on each setting](../elasticsearch#choosing-the-correct-preset).

#### `ES_HOST`

Host of the Elasticsearch server. Defaults to `localhost`. If using TLS, prepend the hostname with `https://`. For example: `https://elastic.example.com`.

#### `ES_PORT`

Port of the Elasticsearch server. Defaults to `9200`

#### `ES_USER`

Used for optionally authenticating with Elasticsearch

#### `ES_PASS`

Used for optionally authenticating with Elasticsearch

#### `ES_PREFIX`

Useful if the Elasticsearch server is shared between multiple projects or different Mastodon servers. Defaults to the value of `REDIS_NAMESPACE`.

### StatsD {#statsd}

#### `STATSD_ADDR`

If set, Mastodon will log some events and metrics into a StatsD instance identified by its hostname and port.

Example value: `localhost:8125`

#### `STATSD_NAMESPACE`

If set, all StatsD keys will be prefixed with this. Defaults to `Mastodon.production` when `RAILS_ENV` is `production`, `Mastodon.development` when it's `development`, etc.

#### `STATSD_SIDEKIQ`

If set to `true`, Mastodon will log some Sidekiq metrics into StatsD. Defaults to `false`.

#### `ES_CA_FILE`

Override Certificate Authority bundle file to use. Useful when using self-signed certificates.

**Version history:**\
4.3.0 - added

### SMTP email delivery {#smtp}

#### `SMTP_SERVER`

#### `SMTP_PORT`

#### `SMTP_LOGIN`

#### `SMTP_PASSWORD`

#### `SMTP_FROM_ADDRESS`

#### `SMTP_DOMAIN`

#### `SMTP_DELIVERY_METHOD`

#### `SMTP_AUTH_METHOD`

#### `SMTP_CA_FILE`

#### `SMTP_OPENSSL_VERIFY_MODE`

#### `SMTP_ENABLE_STARTTLS_AUTO`

#### `SMTP_ENABLE_STARTTLS`

Set to `auto` (default), `always`, or `never`.

**Version history:**\
4.0.0 - added

#### `SMTP_TLS`

#### `SMTP_SSL`

E-mail configuration is based on the *action_mailer* component of the *Ruby on Rails* framework that Mastodon is built on. Complete documentation on action_mailer is available [here](https://guides.rubyonrails.org/action_mailer_basics.html#action-mailer-configuration). The client uses SMTP or derivatives: StartTLS + SMTP or SMTPS (SMTP over TLS).

### Basic configuration {#basic}

* `SMTP_SERVER`: Specify the server to use. For example `sub.domain.tld`.
* `SMTP_PORT`: By default, the value is `25` (the usual port for SMTP). If StartTLS is detected, it may be switched to port 587.
* `SMTP_DOMAIN`: Only required if a HELO domain is needed. Will be set to the `SMTP_SERVER` domain by default.
* `SMTP_FROM_ADDRESS`: Specify a sender address.
* `SMTP_DELIVERY_METHOD`: By default, the value is `smtp` (can also be `sendmail`).

### Authentication for the SMTP server {#smtpauthentication}

* `SMTP_LOGIN`: Login for the SMTP user.
* `SMTP_PASSWORD`:  Password for the SMTP user.
* `SMTP_AUTH_METHOD`: Either `plain` (default; the password is transmitted in the clear), `login` (password will be base64 encoded) or `cram_md5`.

### Secured SMTP
By default, a StartTLS connection will be attempted to the specified SMTP server.

* `SMTP_ENABLE_STARTTLS_AUTO`: Default `true`.
* `SMTP_CA_FILE`: A value may be specified, but on many Linux distros (e.g. Debian-based) this will be `/etc/ssl/certs/ca-certificates.crt`.
* `SMTP_OPENSSL_VERIFY_MODE`: `none` or `peer`. When using TLS, it may be useful to accept connections with a self-signed certificate.
* `SMTP_TLS`: `true` or `false` (default `false`)
* `SMTP_SSL`: `true` or `false` (default `false`)

Note that `TLSv1.3` and `TLSv1.2` are the only SSL/TLS protocols currently considered to be secure.

## File storage {#files}

### CDN {#cdn}

#### `CDN_HOST`

You can serve static assets (logos, emojis, CSS, JS, etc) from a separate host, like a CDN (Content Delivery Network) as it can decrease loading times for your users.

Example value: `https://assets.example.com`

{{< hint style="info" >}}
You must serve the files with CORS headers, otherwise some functions of Mastodon's web UI will not work. For example, `Access-Control-Allow-Origin: *`
{{</ hint >}}

### Local file storage {#paperclip}

#### `PAPERCLIP_ROOT_PATH`

#### `PAPERCLIP_ROOT_URL`

### AWS S3 and compatible {#s3}

{{< page-ref page="admin/optional/object-storage" >}}

The bucket must support access control lists (ACLs). For AWS S3, this means setting the "Object Ownership" setting to "ACLs enabled". For Google Cloud Storage, this means setting the "Access control" setting to "Fine-grained".

#### `S3_ENABLED`

#### `S3_REGION`

#### `S3_ENDPOINT`

#### `S3_BUCKET`

#### `AWS_ACCESS_KEY_ID`

#### `AWS_SECRET_ACCESS_KEY`

#### `S3_SIGNATURE_VERSION`

#### `S3_OVERRIDE_PATH_STYLE`


#### `S3_PROTOCOL`

#### `S3_HOSTNAME`

#### `S3_ALIAS_HOST`


#### `S3_OPEN_TIMEOUT`

#### `S3_READ_TIMEOUT`

#### `S3_FORCE_SINGLE_REQUEST`

#### `S3_ENABLE_CHECKSUM_MODE`

#### `S3_STORAGE_CLASS`

#### `S3_MULTIPART_THRESHOLD`

#### `S3_PERMISSION`

#### `S3_BATCH_DELETE_LIMIT`

#### `S3_BATCH_DELETE_RETRY`

### Swift {#swift}

#### `SWIFT_ENABLED`

#### `SWIFT_USERNAME`

#### `SWIFT_TENANT`

#### `SWIFT_PASSWORD`

#### `SWIFT_PROJECT_ID`

#### `SWIFT_AUTH_URL`

#### `SWIFT_CONTAINER`

#### `SWIFT_OBJECT_URL`

#### `SWIFT_REGION`

#### `SWIFT_DOMAIN_NAME`

#### `SWIFT_CACHE_TTL`

### HTTP Cache Buster

If configured, the Cache Buster feature will send a request to invalidate the cache for media files when they are deleted or made unavailable from your origin. This allows you to ensure that your caching layer / CDN is purged from any content that is removed from Mastodon.

{{< hint style="info" >}}
The way to achieve this is very dependent of your proxy/CDN provider and will require configuration. If you are using nginx for HTTP caching, you will want to look at the `proxy_cache_purge` configuration directive.
{{</ hint >}}

#### `CACHE_BUSTER_ENABLED`

If set to `true`, then Mastodon will send a cache-busting request to the media URL when deleting the file so the file can be purged from the cache.

Defaults to `false`

#### `CACHE_BUSTER_HTTP_METHOD`

Defaults to `GET`

#### `CACHE_BUSTER_SECRET_HEADER`

Name of the header containing the secret defined in `CACHE_BUSTER_SECRET`.

Defaults to an empty value, meaning no header will be added

#### `CACHE_BUSTER_SECRET`

Value of the `CACHE_BUSTER_SECRET_HEADER` header configured above.

## External authentication {#external-authentication}

### OmniAuth

#### `ALLOW_UNSAFE_AUTH_PROVIDER_REATTACH`
Allow existing users to log in using external authentication providers they have not previously used, provided they use the same e-mail address. This can be useful if you want to offer users the ability to migrate from one external provider to another, but this is a potential security risk, as this allows attackers to hijack an account if they manage to create a new identity with their target's e-mail address on any of your configured providers.

**Version history:**\
4.2.6 - added

#### `OMNIAUTH_ONLY`

#### `ONE_CLICK_SSO_LOGIN`
Enables the `Login or Register` button.
Useful for instances where all authentication takes place using a single
external provider (CAS, SAML or OIDC).

Enabling this will prevent caching for anonymous sessions.
And, when using OIDC discovery, the identity provider has to be available
before Mastodon starts.

### LDAP {#ldap}

#### `LDAP_ENABLED`

#### `LDAP_HOST`

#### `LDAP_PORT`

#### `LDAP_METHOD`

#### `LDAP_BASE`

#### `LDAP_BIND_DN`

#### `LDAP_PASSWORD`

#### `LDAP_UID`

#### `LDAP_SEARCH_FILTER`

#### `LDAP_MAIL`

#### `LDAP_UID_CONVERSION_ENABLED`

### PAM {#pam}

#### `PAM_ENABLED`

#### `PAM_EMAIL_DOMAIN`

#### `PAM_DEFAULT_SERVICE`

#### `PAM_CONTROLLED_SERVICE`

### CAS {#cas}

#### `CAS_ENABLED`

#### `CAS_DISPLAY_NAME`

#### `CAS_URL`

#### `CAS_HOST`

#### `CAS_PORT`

#### `CAS_SSL`

#### `CAS_VALIDATE_URL`

#### `CAS_CALLBACK_URL`

#### `CAS_LOGOUT_URL`

#### `CAS_LOGIN_URL`

#### `CAS_UID_FIELD`

#### `CAS_CA_PATH`

#### `CAS_DISABLE_SSL_VERIFICATION`

#### `CAS_UID_KEY`
The key to the username to use for the account.
The created account will be `@uid@domain.tld`.

#### `CAS_NAME_KEY`

#### `CAS_EMAIL_KEY`

#### `CAS_NICKNAME_KEY`

#### `CAS_FIRST_NAME_KEY`

#### `CAS_LAST_NAME_KEY`

#### `CAS_LOCATION_KEY`

#### `CAS_IMAGE_KEY`
The key to the image to use as account avatar.
The value in this key must be a URL to the image file.
It is important to use a supported file format (JPEG or PNG, not SVG).

#### `CAS_PHONE_KEY`

#### `CAS_SECURITY_ASSUME_EMAIL_IS_VERIFIED`

### SAML {#saml}

#### `SAML_ENABLED`

#### `SAML_ACS_URL`

#### `SAML_ISSUER`

#### `SAML_IDP_SSO_TARGET_URL`

#### `SAML_IDP_CERT`

#### `SAML_IDP_CERT_FINGERPRINT`

#### `SAML_NAME_IDENTIFIER_FORMAT`

#### `SAML_CERT`

#### `SAML_PRIVATE_KEY`

#### `SAML_SECURITY_WANT_ASSERTION_SIGNED`

#### `SAML_SECURITY_WANT_ASSERTION_ENCRYPTED`

#### `SAML_SECURITY_ASSUME_EMAIL_IS_VERIFIED`

#### `SAML_ATTRIBUTES_STATEMENTS_UID`

#### `SAML_ATTRIBUTES_STATEMENTS_EMAIL`

#### `SAML_ATTRIBUTES_STATEMENTS_FULL_NAME`

#### `SAML_ATTRIBUTES_STATEMENTS_FIRST_NAME`

#### `SAML_ATTRIBUTES_STATEMENTS_LAST_NAME`

#### `SAML_UID_ATTRIBUTE`

#### `SAML_ATTRIBUTES_STATEMENTS_VERIFIED`

#### `SAML_ATTRIBUTES_STATEMENTS_VERIFIED_EMAIL`

## Hidden services {#hidden-services}

### TOR {#tor}

{{< page-ref page="admin/optional/tor" >}}

#### `http_proxy`

#### `http_hidden_proxy`

#### `ALLOW_ACCESS_TO_HIDDEN_SERVICE`

## Limits {#limits}

### Anti Spam / Abuse 

#### `HCAPTCHA_SITE_KEY`
#### `HCAPTCHA_SECRET_KEY`

If set, registrations confirm page will display a captcha, see [Captcha](https://docs.joinmastodon.org/admin/optional/captcha/)

### Email domains

#### `EMAIL_DOMAIN_ALLOWLIST`

If set, registrations will not be possible with any e-mails **except** those from the specified domains. Pipe-separated values, e.g.: `foo.com|bar.com`

#### `EMAIL_DOMAIN_DENYLIST`

If set, registrations will not be possible with any e-mails from the specified domains. Pipe-separated values, e.g.: `foo.com|bar.com`

{{< hint style="warning" >}}
This option is deprecated. You can dynamically block e-mail domains from the admin interface or the `tootctl` command-line interface.
{{</ hint >}}

### Sessions

#### `MAX_SESSION_ACTIVATIONS`

Defines the maximum number of browser sessions allowed per user, which defaults to 10. If a new browser session is created and the limit is exceeded, the oldest session is deleted, resulting in the user being logged out of that session.

### Home feeds

#### `USER_ACTIVE_DAYS`

Mastodon stores home feeds in RAM (specifically, in the Redis database). This makes them very fast to access and update, but it also means that you don't want to keep them there if they're not used, and you don't want to spend resources on inserting new items into home feeds that will not be accessed. For this reason, Mastodon periodically clears out home feeds of users who haven't been online in a while, and if they re-appear, it regenerates those home feeds from database data. By default, users are considered active if they have been online in the past `7` days.

Regeneration of home feeds is computationally expensive, if your Sidekiq is constantly doing it because your users come online every 3 days but your `USER_ACTIVE_DAYS` is set to 2, then consider adjusting it up.

{{< hint style="info" >}}
This setting has no relation to which users are considered active for the purposes of statistics, such as the Monthly Active Users number.
{{</ hint >}}

## Other {#other}

### DB migrations {#migrations}

#### `SKIP_POST_DEPLOYMENT_MIGRATIONS`

This variable only has any effect when running `rake db:migrate` and it is extremely specific to the Mastodon upgrade process. There are two types of database migrations, those that run before new code is deployed and running, and those that run after. By default, both types of migrations are executed. If you shut down all Mastodon processes before running migrations, then there is no difference. The variable makes sense for zero-downtime upgrades. You will see in the upgrade instructions of a specific Mastodon version if you need to use it or not.

### DB Encryption support

These three environment variables must be set to enable the Active Record
Encryption feature within Rails that Mastodon uses to encrypt and decrypt some
database attributes.

- `ACTIVE_RECORD_ENCRYPTION_PRIMARY_KEY`
- `ACTIVE_RECORD_ENCRYPTION_DETERMINISTIC_KEY`
- `ACTIVE_RECORD_ENCRYPTION_KEY_DERIVATION_SALT`

**Version history:**\
4.3.0 - added

### Uncategorized or unsorted

#### `BUNDLE_GEMFILE`

#### `DEEPL_API_KEY`

#### `DEEPL_PLAN`

#### `ENABLE_SIDEKIQ_UNIQUE_JOBS_UI`

Enable `sidekiq-unique-jobs`'s web interface. This can be used to review and clear the locks managed by this gem, but is rarely useful in practice and has had critical security vulnerabilities in the past.
If you only need to clear all locks, you can now use the newly-added `bundle exec rake sidekiq_unique_jobs:delete_all_locks`.

**Version history:**\
4.2.6 - added

#### `LIBRE_TRANSLATE_ENDPOINT`

#### `LIBRE_TRANSLATE_API_KEY`

#### `GITHUB_REPOSITORY`

Defaults to `mastodon/mastodon`

#### `SOURCE_BASE_URL`

Defaults to `https://github.com/$GITHUB_REPOSITORY`

#### `FFMPEG_BINARY`

Defaults to empty value (not enabled)

#### `LOCAL_HTTPS`

#### `PATH`

#### `MAX_FOLLOWS_THRESHOLD`

Defaults to `7500`

#### `MAX_FOLLOWS_RATIO`

Defaults to `1.1`

#### `IP_RETENTION_PERIOD`

Defaults to `31536000` (1 year)

#### `SESSION_RETENTION_PERIOD`

Defaults to `31536000` (1 year)

#### `BACKTRACE`

Set to `1` to allow backtracing to Rails framework code.

#### `DISABLE_SIMPLECOV`

#### `EMAIL_DOMAIN_LISTS_APPLY_AFTER_CONFIRMATION`

#### `DISABLE_FOLLOWERS_SYNCHRONIZATION`

#### `MAX_REQUEST_POOL_SIZE`

Defaults to `512`.

#### `GITHUB_API_TOKEN`

Used in a rake task for generating AUTHORS.md from GitHub commit history.
