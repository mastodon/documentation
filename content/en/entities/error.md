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

### `error` <a id="error"></a>

**Description:** The error message.
**Type:** String
**Version history:** Added in 0.6.0

## Optional attributes

### `error_description` <a id="error_description"></a>

**Description:** A longer description of the error, mainly provided with the OAuth API.
**Type:** String
**Version history:** Added in 0.6.0

## Possible reasons <a id="reasons"></a>

### 401 - Unauthorized <a id="401"></a>

#### require\_authenticated\_user! <a id="auth"></a>

Error: This API requires an authenticated user. Appears when the instance is in secure mode, which disables all public use of API methods.

### 403 - Forbidden <a id="403"></a>

#### current\_user.disabled? <a id="disabled"></a>

Error: Your login is currently disabled. Appears when the OAuth token's authorized user has had their account disabled by a moderator.

#### !current\_user.confirmed? <a id="unconfirmed"></a>

Error: Your login is missing a confirmed e-mail address. Appears when the email address associated with the OAuth token's authorized user's account has not yet been confirmed.

#### !current\_user.approved? <a id="unapproved"></a>

Error: Your login is currently pending approval. Appears when the OAuth token's authorized user has signed up on an instance with approval-required registrations, and the user has not yet had their account approved by a moderator.

### 404 - Not Found <a id="404"></a>

#### RecordNotFound <a id="not-found"></a>

Error: Record not found. Appears when an entity record does not exist, or the authorized user is not within the audience of a private entity.operates on a user.

### 422 - Unprocessable Entity <a id="422"></a>

#### RecordInvalid <a id="invalid"></a>

Error: {string}. May appear when entity creation failed.

#### RecordNotUnique <a id="not-unique"></a>

Error: Duplicate record. Appears when you are trying to pin an account or status that is already pinned.

#### !current\_user <a id="user-required"></a>

Error: This method requires an authenticated user. Appears when using an OAuth token without an authorized user \(or no token at all\), while trying to call an API method that requires a user to be processed.

## See also

{{< caption-link url="https://github.com/tootsuite/mastodon/blob/master/app/controllers/api/base_controller.rb" caption="app/controllers/api/base\_controller.rb" >}}





