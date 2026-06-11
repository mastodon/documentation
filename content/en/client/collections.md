---
title: Implementing Collections
description: 'An overview of Collection APIs and UX guidelines.'
menu:
  docs:
    weight: 80
    parent: client
---

## Overview

A Collection is a set of accounts that a user recommends others to follow. Users can create and share Collections and control whether they want to be featured in other user's Collections.

Collections and the new APIs described below are available starting with `mastodon` [API version]({{< relref "entities/Instance#api-versions" >}}) 10.

## Managing Collections

See [Collection methods]({{< relref "methods/collections" >}}) for an overview of all the new API methods introduced for Collections. These include methods for basic CRUD (Create/Read/Update/Delete) operations:

### Creating a new Collection

Use [`POST /api/v1/collections`]({{< relref "methods/collections#create" >}}) to create a new Collection. Newly created Collections are allowed to be empty but it is possible to supply a list of account IDs to feature immediately.

### Reading Collections

[`GET /api/v1/:account_id/collections`]({{< relref "methods/collections#get_collections" >}}) allows fetching all Collections from a given account.

Similarly, [`GET /api/v1/:account_id/in_collections`]({{< relref "methods/collections#in_collections" >}}) allows fetching all Collections that a given account is featured in.

[`GET /api/v1/collections/:id`]({{< relref "methods/collections#get_collection" >}}) can be used to fetch a single Collection when its ID is known.


### Updating Collections

Use [`PATCH /api/v1/collections/:id`]({{< relref "methods/collections#update_collection" >}}) to update metadata of a Collection such as name or description. This endpoint cannot be used to change what accounts are featured in the Collection. Use the following endpoints instead:

[`POST /api/v1/collections/:collection_id/items`]({{< relref "methods/collections#add_account" >}}) can be used to add an account to an existing Collection. See [Consent to be featured in Collections]({{< relref "client/collections#consent" >}}) to learn which accounts may be added.

Similarly, [`DELETE /api/v1/collections/:collection_id/items/:id`]({{< relref "methods/collections#remove_account" >}}) allows removing items from a Collection.

### Deleting a Collection

[`DELETE /api/v1/collections/:id`]({{< relref "methods/collections#delete_collection" >}}) can be called to delete a Collection permanently.

## Limitations

* A maximum of **25** accounts may be added to a single Collection. Collections from other, non-Mastodon servers can contain up to 150 items.
* There is a limit to how many Collections a single user may create. This is tied to the user role. See [`collection_limit`]({{< relref "entities/Role#collection_limit" >}}). The default is 10 but can be changed by an admin user.
* Only users who agreed to be featured in Collections can be added to one. See the [next section]({{< relref "client/collections#consent" >}}) for details.
* Collections are federated but just like statuses and profile data, Mastodon servers keep a local cached copy. So whatever you get from your local server about a Collection on a another server may not reflect the current state on the remote server immediately.

## Consent to be featured in Collections {#consent}

(Remote) accounts can indicate whether they allow to be featured in Collections and whether they approve requests to be featured automatically or manually.

Client developers must check the new [`feature_approval`]({{< relref "entities/Account#feature_approval"  >}}) property of an account to see if an account can be added to a Collection. Note that this is closely modeled after [`quote_approval`]({{< relref "entities/Status#quote_approval" >}}) on a status.

Accounts that have not consented or where the preferences are unknown cannot be added to a Collection.

This also means that accounts on servers running software without support for this feature, including all older versions of Mastodon, cannot be added to Collections.

Note that Mastodon does not support manual approval, but other software might. Also, there is no dedicated setting for this in Mastodon yet. Instead this is tied to the existing `discoverable` setting on an account. If your app allows changing `discoverable` in the account/profile settings, you should adjust the description accordingly.

Once featured in a Collection, the consent can always be revoked, in which case an account is automatically removed from the Collection in question.

To revoke the current user's consent to be featured in a collection, a [POST /api/v1/collections/:collection_id/items/:id/revoke]({{< relref "methods/collections#revoke_item" >}}) request can be performed.

## Sharing Collections

When you create a status that includes a URL that matches a Collection's [`url`]({{< relref "entities/Collection" >}}) exactly, Mastodon detects that a link to a Collection is being shared.

When you fetch such a status through the API, there will be a new [`tagged_collections`]({{< relref "entities/Status#tagged_collections" >}}) attribute that includes the Collection, similar to how mentions work.

This information can be used to render a rich preview of the Collection and/or mark up its link in some way to make it more recognizable that it leads to a Collection. When a user clicks on such a link, the linked Collection should open in-app.

## Reporting Collections

Collections, just like any user-generated content, might contain unwanted content, e.g. in its description. Apps should offer a way for users to report them. To support this the existing [report creation endpoint]({{< relref "methods/reports#post" >}}) has been extended to allow for an Array of `collection_ids` to be added. This can be used to attach Collections to a report, analogous to attaching statuses.

## Miscellaneous

* The [search API]({{< relref "methods/search" >}}) has not been extended to search through contents of Collections yet. But searching for a Collection's URL using the `resolve` parameter should work.
* Collections can be marked as "unlisted" (setting the `discoverable` attribute to `false`), which means they are not meant to show up on the owner's profile. In the future this will also preclude them from turning up in search results and other discovery mechanisms. Unlisted Collections can always be accessed directly via their URL, which is how they can be shared.
