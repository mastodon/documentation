---
title: OAuth Tokens
description: Defining what token types are used throughout this documentation
menu:
  docs:
    weight: 15
    parent: api
---

## OAuth Tokens

Mastodon supports two different types of OAuth Tokens: App tokens and User tokens. Throughout this documentation you will see these token types referenced in the `OAuth` field for API endpoints.

The `OAuth` field also references Public, in which case no OAuth access token needs to be supplied to access the API endpoint.

### App tokens

In order to receive an App token, you must perform a [client credentials grant flow]({{<relref "client/token#flow" >}}), which gives you a token that can be used to interact with the API on behalf of the OAuth Application. Currently the only API endpoints that accepts this token type are:

- [`GET /api/v1/apps/verify_credentials`]({{<relref "methods/apps#verify_credentials" >}})
- [`POST /api/v1/accounts`]({{<relref "/methods/accounts#create" >}})

### User tokens

In order to create a User token, you must perform a [authorization code grant flow]({{<relref "client/authorized#flow">}}), which gives you an access token that is associated with the user who approves the access grant request.

Many Mastodon APIs require User tokens and specific scopes to access them.
