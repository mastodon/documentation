---
title: Single Sign On
menu:
  docs:
    weight: 40
    parent: admin-optional
---

{{< hint style="danger" >}}
This page is under construction.

For the moment, please refer to [this pull request](https://github.com/mastodon/mastodon/pull/16221)
{{< /hint >}}

# OmniAuth
Mastodon supports the CAS, SAML and OpenID Connect protocols for external authentication.
These can either be configured in addition to native logins on Mastodon or as the sole
identity provider using `OMNIAUTH_ONLY=true`.

## OpenID Connect
OpenID is configured using these environment variables.
```
OIDC_ENABLED=
OIDC_DISPLAY_NAME=
OIDC_ISSUER=
OIDC_DISCOVERY=
OIDC_CLIENT_AUTH_METHOD
OIDC_SCOPE=
OIDC_RESPONSE_TYPE=
OIDC_RESPONSE_MODE=
OIDC_DISPLAY=
OIDC_PROMPT=
OIDC_SEND_NONCE=
OIDC_SEND_SCOPE_TO_TOKEN_ENDPOINT=
OIDC_IDP_LOGOUT_REDIRECT_URI=
OIDC_UID_FIELD=
OIDC_CLIENT_ID=
OIDC_REDIRECT_URI=
OIDC_HTTP_SCHEME=
OIDC_HOST=
OIDC_PORT=
OIDC_AUTH_ENDPOINT=
OIDC_TOKEN_ENDPOINT=
OIDC_USER_INFO_ENDPOINT=
OIDC_JWKS_URI=
OIDC_END_SESSION_ENDPOINT=
OIDC_SECURITY_ASSUME_EMAIL_IS_VERIFIED=
```

Many of these variables can be omitted if the identity provider supports discovery using `OIDC_DISCOVERY=true`.

With that variable set, the environment variables that have to be configured are:
```
OIDC_ENABLED=true
OIDC_ISSUER=<URI to IdP> # For Keycloak, this is the realm's URI.
OIDC_DISCOVERY=true
OIDC_DISPLAY_NAME=My SSO # this is the name of the login method displayed to the users. Change as you wish.
OIDC_UID_FIELD=preferred_username # Keycloak specific, may vary for your identity provider.
OIDC_CLIENT_ID=mastodon # the client id configured with the IdP.In OIDC, the client is Mastodon.
OIDC_REDIRECT_URI=https://<Mastodon Domain>/auth/auth/openid_connect/callback
OIDC_SECURITY_ASSUME_EMAIL_IS_VERIFIED=true
OIDC_CLIENT_SECRET= # create a confidential client secret with your IdP and provide it here.
OIDC_SCOPE=openid,profile,email # Keycloak specific, maybe adjusted to your identity provider.
```

## SAML

## CAS

## Configure SSO as the only authentication method
If you want, you can setup a Mastodon instance and only use external autentication through one of the
methods described above.

After setting up an instance with one of the above authentication providers and setting `OMNIAUTH_ONLY=true`, you may want to add `ONE_CLICK_SSO_LOGIN=true` in your environment variables.
This will replace the two `Sign in` and `Sign up` buttons by a single `Login or Register` button,
redirecting people directly to the SSO provider you configured.
