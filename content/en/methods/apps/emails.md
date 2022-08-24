---
title: emails
description: Request a new confirmation email, potentially to a new email address.
menu:
  docs:
    weight: 20
    parent: methods-apps
---

## Resend confirmation email {#confirmations}

```http
POST https://mastodon.example/api/v1/emails/confirmation HTTP/1.1
```

**Returns:** Empty object\
**OAuth:** User token issued to the client that created the unconfirmed user\
**Version history:**\
3.4.0 - added

#### Request
##### Headers

Authorization 
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Form data parameters

`email`
: If provided, updates the unconfirmed user's email before resending the confirmation email.

#### Response
##### 200: Success

```javascript
{}
```

##### 403: Forbidden
The client associated with the token does not own the unconfirmed user.

```javascript
{
	"error": "This method is only available to the application the user originally signed-up with"
}
```