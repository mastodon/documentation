---
title: emails API methods
description: Request a new confirmation email, potentially to a new email address.
menu:
  docs:
    weight: 20
    name: emails
    parent: methods-apps
    identifier: methods-emails
aliases: [
  "/methods/emails",
  "/api/methods/emails",
  "/methods/apps/emails",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## Resend confirmation email {#confirmation}

```http
POST /api/v1/emails/confirmations HTTP/1.1
```

**Returns:** Empty\
**OAuth:** User token issued to the client that created the unconfirmed user\
**Version history:**\
3.4.0 - added

#### Request
##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Form data parameters

email
: If provided, updates the unconfirmed user's email before resending the confirmation email.

#### Response
##### 200: OK

```json
{}
```

##### 403: Forbidden

The client associated with the token does not own the unconfirmed user.

```json
{
	"error": "This method is only available to the application the user originally signed-up with"
}
```

Alternatively, the user has already confirmed their email.

```json
{
  "error": "This method is only available while the e-mail is awaiting confirmation"
}
```

---

## See also

{{< page-relref ref="methods/apps#create" caption="POST /api/v1/apps" >}}

{{< page-relref ref="methods/accounts#create" caption="POST /api/v1/accounts" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/emails/confirmations_controller.rb" caption="app/controllers/api/v1/emails/confirmations_controller.rb" >}}
