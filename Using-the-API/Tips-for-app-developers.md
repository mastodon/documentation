Tips for app developers
=======================

## Authentication

Make sure that you allow your users to specify the domain they want to connect to before login. Use that domain to acquire a client id/secret for OAuth2 and then proceed with normal OAuth2 also using that domain to build the URLs.

In my opinion it is easier for people to understand what is being asked of them if you ask for a `username@domain` type input, since it looks like an e-mail address. Though the username part is not required for anything in the OAuth2 process. Once the user is logged in, you get information about the logged in user from `/api/v1/accounts/verify_credentials`

**Do not** ask the user for the password, i.e. use the "password grant" flow. The user should not have to trust you. Furthermore, the password grant *purposefully* does not support two-factor authentication, i.e. it's impossible to use if you have 2FA enabled. **Use the authorization flow** instead, i.e. redirect the user to an authorization page in the browser.

## Usernames

Make sure that you make it possible to see the `acct` of any user in your app (since it includes the domain part for remote users), people must be able to tell apart users from different domains with the same username.

## Formatting

The API delivers already formatted HTML to your app. This isn't ideal since not all apps are based on HTML, but this is not fixable as it's part of the way federation between potentially different server software works.

#### What HTML may come up

Only these elements can occur in the API:

- `<a>`
- `<span>`
- `<p>`
- `<br>`

Please mind that it's HTML, not XML. If you're parsing it you may need to use it as a "fragment" rather than "document".

#### Mentions and hashtags

You get some information on linked entities alongside the HTML of the status body. For example, you get a list of mentioned users, and a list of media attachments, and a list of hashtags. It is possible to convert the HTML to whatever you need in your app by parsing the HTML tags and matching their `href`s to the linked entities. If a match cannot be found, the link must stay a clickable link.

#### Links

Normal links may be intended to be visually shortened by wrapping parts of the text part of the anchor tag in `<span>` elements with the `.invisible` class, which are supposed to be hidden. The visible part is then wrapped in a `<span>` with the `.ellipsis` class. The HTML itself does not contain an ellipsis character (...), you may wish to insert it yourself.

In the default web UI, the invisible parts are hidden by setting their width/height to 0, rather than removing them from the DOM or setting display to none. The ellipsis character is inserted using a CSS pseudo-element. The result is that when selecting the entire text, the *invisible parts are actually preserved in the selection without the interruption of an ellipsis character*. That way the correct URL can be copypasted even though visually it is shortened.
