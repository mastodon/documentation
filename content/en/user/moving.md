---
title: Moving or leaving accounts
description: Take your information and do what you want with it.
menu:
  docs:
    weight: 100
    parent: user
---

## Exporting your information {#export}

{{< figure src="/assets/export.jpg" caption="The data export page in settings" >}}

At any time you want, you can go to Settings &gt; Export and download a CSV file for your current followed accounts, your currently created lists, your currently blocked accounts, your currently muted accounts, and your currently blocked domains. Your following, blocking, muting, and domain-blocking lists can be imported at Settings &gt; Import, where they can either be merged or overwritten.

Requesting an archive of your toots and media can be done once every 7 days, and can be downloaded in ActivityPub JSON format. Mastodon currently does not support importing toots or media due to technical limitations, but your archive can be viewed by any software that understands how to parse ActivityPub documents. Solutions to the limitations have been discussed on the issue tracker such as [tootsuite/mastodon#981](https://github.com/tootsuite/mastodon/issues/981).

## Redirecting or moving your profile {#migration}

From the bottom of Settings &gt; Account, you can find options related to account redirection or migration.

### Profile redirect {#redirect}

{{< figure src="/assets/account-redirect.jpg" caption="Profile redirect form" >}}

Redirecting your account disables posting from that account and displays a "profile moved" notice indicating your new account. Anyone viewing your profile can see this notice and will know to follow you at your new account. Following redirected accounts is not possible. The redirect can be canceled at any time.

### Profile move {#move}

{{< figure src="/assets/account-move.jpg" caption="Profile move form" >}}

Moving your account is the same as redirecting your account, but it will also irreversibly force everyone to unfollow your current account and follow your new account, if their software supports the Move activity. Your toots will not be moved, due to technical limitations. There is also a very heavy cooldown period in which you cannot migrate again, so be very careful before using this option!

### Account aliases {#aliases}

{{< figure src="/assets/account-aliases.jpg" caption="Alias management screen" >}}

Profile moves can only be initiated when your two accounts have been aliased. Account aliases are currently not used for anything other than profile moves, where you will need to set your old account as an alias of your new account before initiating the move. Setting aliases is harmless and reversible on its own.

## Deleting your account {#delete}

{{< figure src="/assets/account-delete.jpg" caption="Account deletion form" >}}

From the bottom of Settings &gt; Account, you can find the form to delete your account. Deleting your account is irreversible, and will cause both your profile and username to become forever unusable.

