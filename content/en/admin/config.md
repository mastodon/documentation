---
title: Configuring your environment
description: Setting environment variables for your Mastodon installation.
menu:
  docs:
    weight: 30
    parent: admin
---

{{< hint style="warning" >}}
This page is under construction.
{{< /hint >}}

Mastodon uses environment variables as its configuration.

For convenience, it can read them from a flat file called `.env.production` in the Mastodon directory, but they can always be overridden by a specific process. For example, systemd service files can read environment variables from an `EnvironmentFile` or from inline definitions with `Environment`, so you can have different configuration parameters for specific services. They can also be specified when calling Mastodon from the command line.

## Basic {#basic}

### Federation {#federation}

* `LOCAL_DOMAIN`
* `WEB_DOMAIN`
* `ALTERNATE_DOMAINS`

#### `AUTHORIZED_FETCH` {#authorized_fetch}

  When set to `true`, Mastodon will stop inline-signing activities, and will require remote servers to authenticate when fetching public and unlisted toots.
  
  This prevents blocked domains from fetching your public toots, at the cost of possibly increased computations, and broken compatibility with software that does not sign fetch requests (such as Mastodon prior to version 3.0).
  
  Note that this mode cannot guarantee that bad actors do not access your public and unlisted toots, it merely makes it a bit more difficult.

#### `WHITELIST_MODE` {#whitelist_mode}

  When set to `true`, Mastodon will restrict federation to whitelisted servers only, as well as disable public pages and some client APIs.
  Whitelist mode implies authorized fetch mode.
  
  When switching an existing instance to whitelist mode, the following command should be used to remove any already existent data on non-whitelisted domains:
  ```
  tootctl domain purge --whitelist-mode
  ```
  
  Note that, while introduced in Mastodon 3.0, `WHITELIST_MODE` is broken on Mastodon 3.0 and 3.0.1.

### Secrets {#secrets}

* `SECRET_KEY_BASE`
* `OTP_SECRET`
* `VAPID_PRIVATE_KEY`
* `VAPID_PUBLIC_KEY`

### Deployment {#deployment}

* `RAILS_ENV`
* `RAILS_SERVE_STATIC_FILES`
* `RAILS_LOG_LEVEL`
* `TRUSTED_PROXY_IP`
* `SOCKET`
* `PORT`
* `NODE_ENV`
* `BIND`

### Scaling options {#scaling}

* `WEB_CONCURRENCY`
* `MAX_THREADS`
* `PREPARED_STATEMENTS`
* `STREAMING_API_BASE_URL`
* `STREAMING_CLUSTER_NUM`

## Database connections {#connections}

### PostgreSQL {#postgresql}

* `DB_HOST`
* `DB_USER`
* `DB_NAME`
* `DB_PASS`
* `DB_PORT`
* `DATABASE_URL`

### Redis {#redis}

* `REDIS_HOST`
* `REDIS_PORT`
* `REDIS_URL`
* `REDIS_NAMESPACE`
* `CACHE_REDIS_HOST`
* `CACHE_REDIS_PORT`
* `CACHE_REDIS_URL`
* `CACHE_REDIS_NAMESPACE`

### ElasticSearch {#elasticsearch}

* `ES_ENABLED`
* `ES_HOST`
* `ES_PORT`
* `ES_PREFIX`

### StatsD {#statsd}

* `STATSD_ADDR`
* `STATSD_NAMESPACE`

## Limits {#limits}

* `SINGLE_USER_MODE`
* `EMAIL_DOMAIN_WHITELIST`
* `DEFAULT_LOCALE`
* `MAX_SESSION_ACTIVATIONS`
* `USER_ACTIVE_DAYS`

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

## File storage {#cdn}

* `CDN_HOST`
* `S3_ALIAS_HOST`

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

* `http_proxy`
* `ALLOW_ACCESS_TO_HIDDEN_SERVICE`

## Other {#other}

* `SKIP_POST_DEPLOYMENT_MIGRATIONS`

