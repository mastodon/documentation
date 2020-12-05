---
title: More settings
description: Invite new users, sort through your contacts, and secure your account.
menu:
  docs:
    weight: 80
    parent: user
---

## Generating invites {#invites}

{{< figure src="/assets/invites.jpg" caption="Invite people from your account&apos;s settings" >}}

Invite links can be generated and shared with other people, and some servers require invites in order to register for an account. When generating an invite link, you can set the max uses to limit how many times a certain link is used, or how long it has been active. Invite links can be deactivated at any time.

## Follows and followers {#relationships}

{{< figure src="/assets/relationships.jpg" caption="Mutuals who have not moved their account, sorted by last activity" >}}

Within settings, you can find a relationship manager that lets you filter and sort through the profiles that you are connected to, based on different criteria:

* **Relationship:** whether a profile is following you, followed by you, or mutually following each other.
* **Account status:** whether a profile is currently marked as redirected or not.
* **Account activity:** whether a profile has posted in the past month or not.

You can select certain users to unfollow, or to remove from your followers, by checking the boxes and clicking the corresponding button in the table header.

## Account settings {#account}

From the account settings, you can change your email address, set a new password, revoke active sessions or authorized apps, and enable two-factor authentication.

## Identity proofs {#proofs}

[Link verification](../profile#verification) of profile metadata fields is one way to prove your identity by using rel=me links, but Mastodon also supports a more generalized proof provider subsystem. Currently, the only supported identity provider for this subsystem is Keybase.

### Keybase identity verification {#keybase}

{{< figure src="/assets/keybase.jpg" caption="An identity proof on a profile" >}}

First, sign up for Keybase and generate or upload a GPG public key to your Keybase account. Next, go to "prove more identities". Find your instance if it is available, and if not, contact Keybase for help. Select your Mastodon domain and enter your username. You will be able to prove your identity by authorizing with your Mastodon account and posting a proof message. Once you do this, the identity proof will be established, and your profile will show Keybase as a proven identity.

{{< hint style="danger" >}}
**Keybase verification is irreversible.** Keybase uses an immutable signature chain for its identity proofs, so once you prove your identity on Keybase, you cannot remove it. You can only revoke your proof by signing a revocation message with your associated private key.
{{< /hint >}}

