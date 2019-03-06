---
title: Configuration
description: Vue d'ensemble des options de configuration de Mastodon
menu:
  docs:
    parent: administration
    weight: 2
---

Mastodon utilise des variables d'environnement pour sa configuration.

Par commodité, Mastodon lit ces variables depuis un fichier texte nommé `.env.production` dans le dossier contenant Mastodon, mais elles peuvent toujours être outrepassées par un processus. Par exemple, les fichiers de service systemd peuvent lire des variables d'environnement depuis un `EnvironmentFile` ou des variables définies avec `Environment` dans le fichier de service directement, pour que vous puissiez avoir plusieurs configurations pour des services spécifiques. Ces variables peuvent aussi être définies quand Mastodon est exécuté depuis la ligne de commande.

## Basique
### Fédération

- `LOCAL_DOMAIN`
- `WEB_DOMAIN`
- `ALTERNATE_DOMAINS`

### Secrets

- `SECRET_KEY_BASE`
- `OTP_SECRET`
- `VAPID_PRIVATE_KEY`
- `VAPID_PUBLIC_KEY`

### Déploiement

- `RAILS_ENV`
- `RAILS_SERVE_STATIC_FILES`
- `RAILS_LOG_LEVEL`
- `TRUSTED_PROXY_IP`
- `SOCKET`
- `PORT`
- `NODE_ENV`
- `BIND`

### Options pour l'aménagement des ressources

- `WEB_CONCURRENCY`
- `MAX_THREADS`
- `PREPARED_STATEMENTS`
- `STREAMING_API_BASE_URL`
- `STREAMING_CLUSTER_NUM`

## Connexion aux bases de données 
### PostgreSQL

- `DB_HOST`
- `DB_USER`
- `DB_NAME`
- `DB_PASS`
- `DB_PORT`
- `DATABASE_URL`

### Redis

- `REDIS_HOST`
- `REDIS_PORT`
- `REDIS_URL`
- `REDIS_NAMESPACE`
- `CACHE_REDIS_HOST`
- `CACHE_REDIS_PORT`
- `CACHE_REDIS_URL`
- `CACHE_REDIS_NAMESPACE`

### ElasticSearch

- `ES_ENABLED`
- `ES_HOST`
- `ES_PORT`
- `ES_PREFIX`

### StatsD

- `STATSD_ADDR`
- `STATSD_NAMESPACE`

## Limites

- `SINGLE_USER_MODE`
- `EMAIL_DOMAIN_WHITELIST`
- `DEFAULT_LOCALE`
- `MAX_SESSION_ACTIVATIONS`
- `USER_ACTIVE_DAYS`

## E-mail

- `SMTP_SERVER`
- `SMTP_PORT`
- `SMTP_LOGIN`
- `SMTP_PASSWORD`
- `SMTP_FROM_ADDRESS`
- `SMTP_DOMAIN`
- `SMTP_DELIVERY_METHOD`
- `SMTP_AUTH_METHOD`
- `SMTP_CA_FILE`
- `SMTP_OPENSSL_VERIFY_MODE`
- `SMTP_ENABLE_STARTTLS_AUTO`
- `SMTP_TLS`

## Stockage distant des fichiers

- `CDN_HOST`
- `S3_ALIAS_HOST`

### Stockage local des fichiers

- `PAPERCLIP_ROOT_PATH`
- `PAPERCLIP_ROOT_URL`

### Amazon S3 et compatibles

- `S3_ENABLED`
- `S3_BUCKET`
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `S3_REGION`
- `S3_PROTOCOL`
- `S3_HOSTNAME`
- `S3_ENDPOINT`
- `S3_SIGNATURE_VERSION`

### Swift

- `SWIFT_ENABLED`
- `SWIFT_USERNAME`
- `SWIFT_TENANT`
- `SWIFT_PASSWORD`
- `SWIFT_PROJECT_ID`
- `SWIFT_AUTH_URL`
- `SWIFT_CONTAINER`
- `SWIFT_OBJECT_URL`
- `SWIFT_REGION`
- `SWIFT_DOMAIN_NAME`
- `SWIFT_CACHE_TTL`

## Authentification externe

- `OAUTH_REDIRECT_AT_SIGN_IN`

### LDAP

- `LDAP_ENABLED`
- `LDAP_HOST`
- `LDAP_PORT`
- `LDAP_METHOD`
- `LDAP_BASE`
- `LDAP_BIND_DN`
- `LDAP_PASSWORD`
- `LDAP_UID`
- `LDAP_SEARCH_FILTER`

### PAM

- `PAM_ENABLED`
- `PAM_EMAIL_DOMAIN`
- `PAM_DEFAULT_SERVICE`
- `PAM_CONTROLLED_SERVICE`

### CAS

- `CAS_ENABLED`
- `CAS_URL`
- `CAS_HOST`
- `CAS_PORT`
- `CAS_SSL`
- `CAS_VALIDATE_URL`
- `CAS_CALLBACK_URL`
- `CAS_LOGOUT_URL`
- `CAS_LOGIN_URL`
- `CAS_UID_FIELD`
- `CAS_CA_PATH`
- `CAS_DISABLE_SSL_VERIFICATION`
- `CAS_UID_KEY`
- `CAS_NAME_KEY`
- `CAS_EMAIL_KEY`
- `CAS_NICKNAME_KEY`
- `CAS_FIRST_NAME_KEY`
- `CAS_LAST_NAME_KEY`
- `CAS_LOCATION_KEY`
- `CAS_IMAGE_KEY`
- `CAS_PHONE_KEY`

### SAML

- `SAML_ENABLED`
- `SAML_ACS_URL`
- `SAML_ISSUER`
- `SAML_IDP_SSO_TARGET_URL`
- `SAML_IDP_CERT`
- `SAML_IDP_CERT_FINGERPRINT`
- `SAML_NAME_IDENTIFIER_FORMAT`
- `SAML_CERT`
- `SAML_PRIVATE_KEY`
- `SAML_SECURITY_WANT_ASSERTION_SIGNED`
- `SAML_SECURITY_WANT_ASSERTION_ENCRYPTED`
- `SAML_SECURITY_ASSUME_EMAIL_IS_VERIFIED`
- `SAML_ATTRIBUTES_STATEMENTS_UID`
- `SAML_ATTRIBUTES_STATEMENTS_EMAIL`
- `SAML_ATTRIBUTES_STATEMENTS_FULL_NAME`
- `SAML_ATTRIBUTES_STATEMENTS_FIRST_NAME`
- `SAML_ATTRIBUTES_STATEMENTS_LAST_NAME`
- `SAML_UID_ATTRIBUTE`
- `SAML_ATTRIBUTES_STATEMENTS_VERIFIED`
- `SAML_ATTRIBUTES_STATEMENTS_VERIFIED_EMAIL`

## Services cachés (Tor)

- `http_proxy`
- `ALLOW_ACCESS_TO_HIDDEN_SERVICE`

## Autres

- `SKIP_POST_DEPLOYMENT_MIGRATIONS`
