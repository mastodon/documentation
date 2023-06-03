---
title: Error
summary: Represents an error message.
menu:
  docs:
    parent: entities
aliases: [
	"/entities/error",
	"/entities/Error",
  "/api/entities/error",
	"/api/entities/Error",
]
---

## Example

```json
{
  "error": "invalid_grant",
  "error_description": "The provided authorization grant is invalid, expired, revoked, does not match the redirection URI used in the authorization request, or was issued to another client."
}
```

{{< hint style="info" >}}
**The most important part of an error response is the HTTP status code.** Standard semantics are followed. The body of an error is a JSON object containing more information, if available.
{{< /hint >}}

## Attributes

### `error` {#error}

**Description:** The error message.\
**Type:** String\
**Version history:**\
0.6.0 - added

### `error_description` {{%optional%}} {#error_description}

**Description:** A longer description of the error, mainly provided with the OAuth API.\
**Type:** String\
**Version history:**\
0.6.0 - added

## Possible reasons {#reasons}

### 400 - Bad request

#### ParameterMissing {#parameter-missing}

Error: {string}. Appears when a required parameter is missing from the API call.

### 401 - Unauthorized {#401}

#### require_authenticated_user! {#auth}

Error: This API requires an authenticated user. Appears when the instance is in secure mode, which disables all public use of API methods.

### 403 - Forbidden {#403}

#### NotPermitted {#not-permitted}

Error: This action is not allowed. Appears when trying to call a method that you do not have permission for (such as admin or staff methods), or performing actions you are not allowed to do (such as following a user that blocks you).

#### current_user.disabled? {#disabled}

Error: Your login is currently disabled. Appears when the OAuth token's authorized user has had their account disabled by a moderator.

#### !current_user.confirmed? {#unconfirmed}

Error: Your login is missing a confirmed e-mail address. Appears when the email address associated with the OAuth token's authorized user's account has not yet been confirmed.

#### !current_user.approved? {#unapproved}

Error: Your login is currently pending approval. Appears when the OAuth token's authorized user has signed up on an instance with approval-required registrations, and the user has not yet had their account approved by a moderator.

### 404 - Not found {#404}

#### RecordNotFound {#not-found}

Error: Record not found. Appears when an entity record does not exist, or the authorized user is not within the audience of a private entity.operates on a user.

### 422 - Unprocessable entity {#422}

#### RecordInvalid {#invalid}

Error: {string}. May appear when entity creation failed.

#### RecordNotUnique {#not-unique}

Error: Duplicate record. Appears when you are trying to pin an account or status that is already pinned.

#### !current_user {#user-required}

Error: This method requires an authenticated user. Appears when using an OAuth token without an authorized user (or no token at all), while trying to call an API method that requires a user to be processed.

### 429 - Too many requests {#429}

Error: {translated string}. Appears when you have exceeded the rate limit. See [Rate limits]({{< relref "api/rate-limits" >}}) for more information.

### 503 - Remote service unavailable {#503}

#### UnexpectedResponseError {#unexpected-response}

Error: Remote data could not be fetched. Appears when Mastodon calls a remote service (such as WebFinger from another instance) which returns an error.

#### SSLError {#ssl}

Error: Remote SSL certificate could not be verified. Appears when a remote service is called, but it has an invalid SSL certificate.

#### NetworkingError {#networking-error}

Error: There was a temporary problem serving your request, please try again. Appears when there was a failed call to an S3 storage server.

#### RaceConditionError {#race-condition}

Error: There was a temporary problem serving your request, please try again. Appears when there was an error due to a race condition in server-side code.

## See also

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/base_controller.rb" caption="app/controllers/api/base_controller.rb" >}}





