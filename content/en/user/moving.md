---
title: Moving or leaving accounts
description: Take your information and do what you want with it.
menu:
  docs:
    weight: 100
    parent: user
---

## Summary

If your current server is going to shut down, has changed policies, is not being maintained, or for whatever other reason is no longer working for you, you can migrate your account to a new server and preserve much of your account content and relationships.

Follow these steps to migrate accounts:

1. Create a new Mastodon account on another server. Try to choose one that you think will work for you long term, or make your own.
2. Set up the new account with your profile, bio, avatar and header, etc. This is not strictly necessary from a technical perspective, but it will help anyone who encounters it trust that it really is you. You may want to send out a post from the new account announcing the move as well.
3. From the old account, [export a list of people you follow](#export). If you are following people who require approval for followers, they will have to re-approve you.
4. From the new account, import that just-exported list of people you follow (and any other lists you exported).
5. Create an alias from the old to new account. From the new account, go to Preferences > Account and find “Moving from a different account”. Click “create an account alias”. Enter your old account handle and click “Create alias”.

   {{< hint style="warning" >}}
   You haven't changed anything yet, you have only prepared. Pause at this point and see if you have anything in your old account you will need access to, such as notifications and DMs. Once you proceed to the next step you will no longer have access to your old account.
   {{< /hint >}}

6. Redirect your old account to your new account. In your old account, go to Preferences > Account, find “Moving to a different account” and click “configure it here”. Enter your new account handle and your old account password (because this is on the old account server) and click "Move followers". If you see an error like “not an alias of this account”, make sure you have completed the "alias" step above. You may need to wait up to 24 hours and try again.

At this point your old account will no longer be accessible to you and your server will begin notifying the people who follow you of your new handle (they will be automatically switched to follow your new account). If you have enough followers, it may batch these requests up, so you may see new followers appear on your new account gradually as that happens.

## Exporting your information {#export}

{{< figure src="assets/export.png" width="70%" caption="The data export page in settings" >}}

At any time you want, you can go to Settings &gt; Import and export &gt; Export and download a CSV file for your current followed accounts, your currently created lists, your currently blocked accounts, your currently muted accounts, and your currently blocked domains. Your following, blocking, muting, and domain-blocking lists can be imported at Settings &gt; Import and export &gt; Import, where they can either be merged or overwritten.

Requesting an archive of your posts and media can be done once every 7 days, and can be downloaded in Activity Streams 2.0 JSON format. Mastodon currently does not support importing posts or media due to technical limitations, but your archive can be viewed by any software that understands how to parse Activity Streams 2.0 documents.

## Redirecting or moving your profile {#migration}

From the bottom of Settings &gt; Account, you can find options related to account redirection or migration.

### Profile redirect {#redirect}

Redirecting your account disables posting from that account and displays a "profile moved" notice indicating your new account. Anyone viewing your profile can see this notice and will know to follow you at your new account. Following redirected accounts is not possible. The redirect can be canceled at any time.

### Profile move {#move}

{{< figure src="assets/account-move.png" width="70%" caption="Profile move form" >}}

Moving your account is the same as redirecting your account, but it will also irreversibly force everyone to unfollow your current account and follow your new account, if their software supports the Move activity. Your posts will not be moved, due to technical limitations. There is also a 30-day cooldown period in which you cannot migrate again, so be very careful before using this option!

While moving your profile should automatically move your followers over, it does not automatically transfer your follows, blocks, mutes, or bookmarks. Those can be imported from [previously exported CSV files](#export).

### Account aliases {#aliases}

Profile moves can only be initiated when your two accounts have been aliased. Account aliases are currently not used for anything other than profile moves, where you will need to set your old account as an alias of your new account before initiating the move. Setting aliases is harmless and reversible on its own.

## Deleting your account {#delete}

{{< figure src="assets/account-delete.png" width="70%" caption="Account deletion form" >}}

From the bottom of Settings &gt; Account, you can find the form to delete your account. Deleting your account is irreversible, and will cause both your profile and username to become forever unusable.
