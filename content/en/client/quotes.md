---
title: Implementing quote posts
description: 'An overview of quote post APIs and UX guidelines.'
menu:
  docs:
    weight: 70
    parent: client
---

## API additions for quote posts

The new APIs described below are available starting with `mastodon` [API version]({{< relref "entities/Instance#api-versions" >}}) 7.

### New attributes to existing entities

- the [Status]({{< relref "entities/status" >}}) entity has a new `quote_approval` attribute, holding a [QuoteApproval]({{< relref "entities/QuoteApproval" >}}) entity
- the [Status]({{< relref "entities/status" >}}) entity also has an additional `quotes_count` attribute counting the number of accepted quotes
- the [CredentialAccount]({{< relref "entities/Account#CredentialAccount">}}) entity has an additional `source[quote_policy]` attribute holding the default quote policy for the user. One of `public`, `followers` and `nobody`
- the response to [`GET /api/v1/preferences`]({{< relref "methods/preferences#get" >}}) has a new attribute `posting:default:quote_policy` holding the default quote policy for the user. One of `public`, `followers` and `nobody`.

### New notification types

Mastodon 4.5 introduces two new notification types:
- `quote`: Someone quoted one of your posts. This means the quote post has been automatically accepted by Mastodon (Mastodon does not offer its user manual approval). The quote post is in the `status` attribute.
- `quoted_update`: A status you have quoted has been edited. This is similar to `update`, except `status` holds your quote post, not the post you have quoted. There is at this time no notification for a post quoting you being edited.

Those two notification types are also new `alerts` keys for requests to the [`/api/v1/push`]({{< relref "methods/push" >}}) endpoint.

### New parameters to existing endpoints

The following endpoints have new parameters:
- [`POST /api/v1/statuses`]({{< relref "methods/statuses#create" >}}) has two new optional parameters:
  - `quoted_status_id`: the identifier of the status to quote
    Tthis will raise an error if the current user does not have access to this status, or if Mastodon knows for sure the policy disallows it.
    Unless the quoted post is on the same server, the quote will be in [pending state]({{< relref "entities/Quote#state" >}}) until it is explicitly accepted; quoting a private post is only possible in a private quote.
    Private Mentions cannot be quoted.
    A `<p class="quote-inline">RE: <a href="…">…</a></p>` link will be prepended to the body by the server for backward compatibility purposes if the body of the post does not already include a link to the quoted post. (This prepended paragraph will be hidden by the Mastodon Web UI)
  - `quote_approval_policy`: a string, one of `public`, `followers` or `nobody`; if omitted, it will use the user's default settings; if the status' visibility is `private` or `direct`, this parameter will be ignored and the policy be set to `nobody`
- [`PUT /api/v1/statuses/:id`]({{< relref "methods/statuses#edit" >}}) has one new parameter:
  - `quote_approval_policy`: a string, one of `public`, `followers` or `nobody`; if omitted, it will use the user's default settings; if the status' visibility is `private` or `direct`, this parameter will be ignored and the policy be set to `nobody`
- [`PATCH /api/v1/accounts/update_credentials`]({{< relref "methods/accounts#update_credentials" >}}) has one new parameter:
  - `source[quote_policy]`: a string, one of `public`, `followers` or `nobody`, setting the default quote policy when making new posts

### New endpoints

- [`GET /api/v1/statuses/:id/quotes`]({{< relref "methods/statuses#quotes" >}}): returns a list of posts quoting the status specified by `id`; requires the current user to be the author of that status
- [`POST /api/v1/statuses/:id/quotes/:quoting_status_id/revoke`]({{< relref "methods/statuses#revoke_quote" >}}): revoke quote authorization of post `quoting_status_id`, requires the status identified by `id` to be owned by the current user
- [`PUT /api/v1/statuses/:id/interaction_policy`]({{< relref "methods/statuses#interaction_policy" >}}): use parameter `quote_approval_policy` to update the quote policy of a status without going through the entire edit flow

## General recommendations for clients

Generally speaking, a rough order of priorities for implementing quote-post related features should be the following:
- displaying quote posts, as not doing that may cause a loss of meaning when displaying posts that are intended to be quotes
- handling quote notifications and offering to revoke quotes, as users who did not change the default posting setting will be quotable
- handling changing the quote policy of new and existing posts
- handling authoring of quote posts

### Displaying quote posts

Displaying quote posts should be fairly straightforward, given the [Quote]{{< relref "entities/Quote" >}} and [ShallowQuote]({{< relref "entities/ShallowQuote" >}}) entities already contain all the pre-processed information.

Don't forget to apply filters to quoted posts as well. In this regard, the context type is inherited from the quoting post (i.e. if it's in a home timeline, the filter for home timelines should apply), and we have decided for the Mastodon Web UI to still show the quoting post if the quoted post matches a `hide` action filter but not the quoting post. In this case, the Mastodon Web UI hides the quoted post with “Hidden due to one of your filters”.

We do not recommend displaying quotes more than 1 level deep, and recommend having a placeholder instead:
<img width="383" height="412" alt="image" src="https://github.com/user-attachments/assets/5dc484b9-cb5c-4ac4-b653-6f238d35dc13" />

If you do decide to handle deeper quotes, be mindful of potential infinite recursion.

Additionally, if a status has a `quote`, you should remove/hide from its contents any element with the `quote-inline` CSS class, as this will be used for fallback and will otherwise be redundant.

### Interpreting quote policies

While Mastodon currently only allows setting very straightforward quote policies (only automatic approval, `public`, `followers` or `nobody`), the underlying protocol allows for both automatic approval and manual approval policies, and allows each of these policies to list arbitrary accounts. Mastodon has chosen to support only a subset of that for implementation complexity and database storage reasons, but will still expose policies with more granularity than it allows setting.

In particular, it supports the split between automatic and manual policies, and will also record when one of these sub-policies is too complex to be accurately represented by Mastodon. This will be represented as an `unsupported_policy` value in the sub-policy.

Through the `current_user` attribute discussed above, Mastodon will tell API consumers if they are `denied` the ability to quote a post, if the approval will be `automatic`, if the quote approval will be `manual`, or if it is `unknown` to Mastodon. That last case should probably be treated as `denied`, unless you target “power users” who want the most accurate representation possible and be able to author a quote even if it will be likely rejected.

The `automatic` and `manual` lists can be used to convey the policy as accurately possible to users.

For reference, the Mastodon Web UI uses the `current_user`, `automatic` and `manual` values as follow:
- if `current_user` is `automatic`, allow quoting the post and label the button “Quote”
- if the `current_user` is `manual`, allow quoting the post and label the button “Request to quote” / “Author will manually review”
- if the `current_user` is `unknown` or `denied`, disallow quoting, and display either “Only followers can quote this post” or “You are not allowed to quote this post” depending on the presence of `followers` in the policies

### Setting quote policies

As discussed above, while the underlying protocol allows for more complex policies, Mastodon only supports setting a few predefined policies:
- `public` (“Anybody can quote”): anybody except blocked users will be able to quote
- `followers` (“Only followers can quote”): only followers and the author will be able to quote
- `nobody` (“Just me”): only the author will be able to quote

The author is always allowed to quote themselves (except for private mentions), and blocked users are never allowed to quote (Mastodon will automatically reject their quotes). Approval is automatically handled by Mastodon, meaning there is no manual authorization for clients (but there is a posteriori removal of quotes).

Mastodon will always set the policy of `private` (“followers-only”) and `direct` (“private mentions”) posts to `nobody` (“Just me”), but the UI should be mindful of these limits to avoid user confusion.

### Authoring quote posts

Mastodon 4.5 lets people quote posts if the policy allows it. It doesn't allow adding a poll or media attachment together with a quote, so clients should be mindful of that. Editing a post can't remove or change a quote.