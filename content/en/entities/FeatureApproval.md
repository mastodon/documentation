---
title: FeatureApproval
description: Summary of an account's policy with regards to being featured in a Collection and how it applies to the requesting user.
menu:
  docs:
    parent: entities
aliases: [
	"/entities/feature_approval",
]
---

## Example

```json
{
  "automatic": ["public"],
  "manual": [],
  "current_user": "automatic"
}
```

## Attributes

### `automatic` {#automatic}

**Description:** Describes who is expected to be able to feature the account in a Collection and have this authorized automatically. An empty list means that nobody is expected to be able to feature this account with automatic approval. Other values may be added in the future, so unknown values should be treated as `unsupported_policy`.\
**Type:** Array of String (Enumerable, anyOf)\
`public` = Anybody is expected to be able to feature this account in a Collection and have this accepted automatically.\
`followers` = Followers are expected to be able to feature this account in a Collection and have this accepted automatically.\
`following` = People followed by this account are expected to be able to to feature it in a Collection and have this accepted automatically.\
`unsupported_policy` = The underlying policy is not supported by Mastodon. Some accounts that do not fit in the above categories may be allowed to feature this account in a Collection and have this accepted automatically.\
`disabled` = All interaction explicitly disabled.\
**Version history:**\
4.6.0 - added

### `manual` {#manual}

**Description:** Describes who is expected to have attempts of featuring this account in a Collection be manually reviewed by the account owner before being accepted. An empty list means that nobody is expected to be able to feature this account with manual approval. Other values may be added in the future, so unknown values should be treated as `unsupported_policy`.\
**Type:** Array of String (Enumerable, anyOf)\
`public` = Anybody is expected to be able to feature this account in a Collection but it has to be reviewed and accepted manually.\
`followers` = Followers are expected to be able to feature this account in a Collection but it has to be reviewed and accepted manually.\
`following` = People followed by this are expected to be able to feature it in a Collection but it has to be reviewed and accepted manually.\
`unsupported_policy` = The underlying policy is not supported by Mastodon. Some accounts that do not fit in the above categories may be allowed to feature this account in a Collection but it has to be reviewed and accepted manually.\
**Version history:**\
4.6.0 - added

### `current_user` {#current_user}

**Description:** Describes how this account's feature approval policy applies to the current user.\
**Type:** String (Enumerable, oneOf)\
`automatic` = The requesting user is expected to be allowed to feature this account in a Collection and have this accepted automatically.\
`manual` = The requesting user is expected to be allowed to feature this account in a Collection but it has to be reviewed and accepted manually.\
`denied` = The requesting user is not expected to be allowed to feature this account in a Collection. Mastodon will return an error if you attempt to do so.\
`unknown` = The user is not covered by the policies supported by Mastodon, and there are additional underlying policies that are unsupported by Mastodon. This should be treated as `denied`.\
`missing` = The user has no policy. This is most likely the case when it is a remote user on a server that does not support feature approval policies, e.g. using software other than Mastodon or older versions of Mastodon. This should be treated as `denied`.\
**Version history:**\
4.6.0 - added
