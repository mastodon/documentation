---
title: 设置你的环境
description: 为你安装的Mastodon设置环境变量。
menu:
  docs:
    weight: 30
    parent: admin
---

{{< hint style="warning" >}}
本页面仍在建设中。
{{< /hint >}}

Mastodon使用环境变量作为其的配置。

为了方便起见，Mastodon从Mastodon目录中的 `.env.production` 文件读取环境变量，但是始终可以用特定方式覆盖它们。例如：在 systemd service 文件中可以使用 `EnvironmentFile` 从特定文件中读取环境变量或使用 `Environment` 定义环境变量，因此你可以为不同服务指定不同的环境变量。也可以在从命令行调用运行Mastodon时指定环境变量。

## 基本参数 {#basic}

### 站点互联 {#federation}

* `LOCAL_DOMAIN`
* `WEB_DOMAIN`
* `ALTERNATE_DOMAINS`

#### `AUTHORIZED_FETCH` {#authorized_fetch}

  当设置为 `true` 时，Mastodon将停止内联签名活动，并要求远程服务器在拉取公开（public）和不公开（unlisted）的嘟文时进行身份验证。
  
  这可以阻止被屏蔽的域名拉取你的公开嘟文，但代价是可能增加计算量，并与不支持附带签名的拉取请求的软件不兼容（如低于3.0版本的Mastodon）。
  
  请注意：这个模式并不能保证你的公开嘟文（public、unlisted）不被恶意操作者获取，这仅仅是增加了一点难度。

#### `WHITELIST_MODE` {#whitelist_mode}

  当设置为 `true` 时，Mastodon将仅与白名单内的服务器互联，同时关闭公开页面和一些客户端API。
  白名单模式会启用 authorized fetch 模式。
  
  当一个现存实例站点切换至白名单模式，以下命令可以被用来移除非白名单站点的数据：
  ```
  tootctl domain purge --whitelist-mode
  ```
  
  请注意：虽然Mastodon 3.0 版本便引入了白名单模式 `WHITELIST_MODE`，但在Mastodon 3.0和3.0.1版中并没有正确实现。

### 密钥 {#secrets}

* `SECRET_KEY_BASE`
* `OTP_SECRET`
* `VAPID_PRIVATE_KEY`
* `VAPID_PUBLIC_KEY`

### 部署 {#deployment}

* `RAILS_ENV`
* `RAILS_SERVE_STATIC_FILES`
* `RAILS_LOG_LEVEL`
* `TRUSTED_PROXY_IP`
* `SOCKET`
* `PORT`
* `NODE_ENV`
* `BIND`

### 缩放选项 {#scaling}

* `WEB_CONCURRENCY`
* `MAX_THREADS`
* `PREPARED_STATEMENTS`
* `STREAMING_API_BASE_URL`
* `STREAMING_CLUSTER_NUM`

## 数据库连接 {#connections}

### PostgreSQL {#postgresql}

* `DB_HOST`
* `DB_USER`
* `DB_NAME`
* `DB_PASS`
* `DB_PORT`
* `DB_SSLMODE`
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

### Elasticsearch {#elasticsearch}

* `ES_ENABLED`
* `ES_HOST`
* `ES_PORT`
* `ES_PREFIX`

### StatsD {#statsd}

* `STATSD_ADDR`
* `STATSD_NAMESPACE`

## 限制 {#limits}

* `SINGLE_USER_MODE`
* `EMAIL_DOMAIN_WHITELIST`
* `DEFAULT_LOCALE`
* `MAX_SESSION_ACTIVATIONS`
* `USER_ACTIVE_DAYS`

## 电子邮件 {#email}

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

## 文件存储 {#cdn}

* `CDN_HOST`
* `S3_ALIAS_HOST`

### 本地文件存储 {#paperclip}

* `PAPERCLIP_ROOT_PATH`
* `PAPERCLIP_ROOT_URL`

### Amazon S3 及其兼容存储 {#s3}

* `S3_ENABLED`
* `S3_BUCKET`
* `AWS_ACCESS_KEY_ID`
* `AWS_SECRET_ACCESS_KEY`
* `S3_REGION`
* `S3_PROTOCOL`
* `S3_HOSTNAME`
* `S3_ENDPOINT`
* `S3_SIGNATURE_VERSION`
* `S3_BATCH_DELETE_LIMIT`
* `S3_BATCH_DELETE_RETRY`

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

## 外部认证 {#external-authentication}

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

## 隐藏服务 {#hidden-services}

* `http_proxy`
* `ALLOW_ACCESS_TO_HIDDEN_SERVICE`

## 其它 {#other}

* `SKIP_POST_DEPLOYMENT_MIGRATIONS`

{{< translation-status-zh-cn raw_title="Configuring your environment" raw_link="/admin/config/" last_tranlation_time="2020-05-04" raw_commit="ad1ef20f171c9f61439f32168987b0b4f9abd74b">}}
