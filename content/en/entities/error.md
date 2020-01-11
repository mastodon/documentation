---
title: Error
description: Represents an error message.
menu:
  docs:
    parent: entities
---

## Example

```javascript
{
  "error": "invalid_grant",
  "error_description": "The provided authorization grant is invalid, expired, revoked, does not match the redirection URI used in the authorization request, or was issued to another client."
}
```

{{< hint style="info" >}}
**The most important part of an error response is the HTTP status code.** Standard semantics are followed. The body of an error is a JSON object containing more information, if available.
{{< /hint >}}

## Required attributes

### `error` {#error}

**Description:** The error message.\
**Type:** String\
**Version history:** Added in 0.6.0

## Optional attributes

### `error_description` {#error_description}

**Description:** A longer description of the error, mainly provided with the OAuth API.\
**Type:** String\
**Version history:** Added in 0.6.0

## Possible reasons {#reasons}

### 401 - Unauthorized {#401}

#### require\_authenticated\_user! {#auth}

Error: This API requires an authenticated user. Appears when the instance is in secure mode, which disables all public use of API methods.

### 403 - Forbidden {#403}

#### current\_user.disabled? {#disabled}

Error: Your login is currently disabled. Appears when the OAuth token's authorized user has had their account disabled by a moderator.

#### !current\_user.confirmed? {#unconfirmed}

Error: Your login is missing a confirmed e-mail address. Appears when the email address associated with the OAuth token's authorized user's account has not yet been confirmed.

#### !current\_user.approved? {#unapproved}

Error: Your login is currently pending approval. Appears when the OAuth token's authorized user has signed up on an instance with approval-required registrations, and the user has not yet had their account approved by a moderator.

### 404 - Not Found {#404}

#### RecordNotFound {#not-found}

Error: Record not found. Appears when an entity record does not exist, or the authorized user is not within the audience of a private entity.operates on a user.

### 422 - Unprocessable Entity {#422}

#### RecordInvalid {#invalid}

Error: {string}. May appear when entity creation failed.

#### RecordNotUnique {#not-unique}

Error: Duplicate record. Appears when you are trying to pin an account or status that is already pinned.

#### !current\_user {#user-required}

Error: This method requires an authenticated user. Appears when using an OAuth token without an authorized user \(or no token at all\), while trying to call an API method that requires a user to be processed.

## See also

{{< caption-link url="https://github.com/tootsuite/mastodon/blob/master/app/controllers/api/base_controller.rb" caption="app/controllers/api/base\_controller.rb" >}}





