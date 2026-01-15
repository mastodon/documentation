---
title: Moderation actions
description: Features to assist in managing your community.
menu:
  docs:
    weight: 110
    parent: admin
---

## Announcements

To communicate server-related events or notices to your users, you can use the "Announcements" feature from within the admin/moderation area.

To send an announcement, navigate to "Administration -> Announcements", and select "New announcement". On the form, fill in at least the text of the announcement, and optionally any related date information. Announcements can be published immediately, or scheduled for later publication. Once an announcement is published it will show up in the announcements feed of users within the application.

If you'd like to also email users about the announcement, choose "Notify users" from the announcements listing, check the preview, and click "Send" (you can optionally send yourself a preview email first). These emails cannot be opted out of by users, so use the feature for important notices only.

## Moderating individual users {#individual-moderation}

Moderation in Mastodon is always applied locally, i.e. as seen from the particular server. An admin or moderator on one server cannot affect a user on another server, they can only affect the local copy on their own server.

As of v3.5.0, all default user moderation decisions will notify the affected user by email. The user can access an appeal page, where they can submit one appeal within 20 days of the decision. Moderators can approve or reject the appeal.

### Sensitive {#sensitive-user}

When an account is marked as sensitive, all media that the user posts will be automatically [marked as sensitive](https://docs.joinmastodon.org/user/posting/#cw).

### Freeze {#freeze-user}

A Mastodon account can be frozen. This prevents the user from doing anything with the account, but all of the content is still there untouched. This limitation is reversible; the account can be unfrozen at any time. This limitation is only available for local users on your server.

When a user's account is frozen, they are redirected to their **Account Settings** page, where the following message is displayed:

> You can no longer login to your account or use it in any other way, but your profile and other data remains intact.

When the user's account is unfrozen, normal functionality resumes.

### Limit {#limit-user}

Previously known as "silencing". A limited account is hidden from all other users on that instance, except for its followers. All of the content is still there, and it can still be found via search, mentions, and following, but the content is invisible publicly. Notifications about activities from limited accounts will be handled according to account-level notification preferences (which default to "filter" for limited accounts).

If a limited account attempts to follow a user on that instance, the follow is converted into a follow request.

At this moment, limit does not affect federation. A locally limited account is *not* limited automatically on other servers. Account limitations are reversible.

### Suspend {#suspend-user}

A Mastodon suspension means the account is effectively deleted. The account no longer appears in search, the profile page is gone, and all of the posts, uploads, followers, and all other data are removed publicly. However, all the data is available in the admin back-end for a period of 30 days from suspension. This is to give the user an opportunity to work with instance admins to resolve any potential issues and have the account re-instated.

If the account is reinstated within the 30-day period, the user's profile and all posts become publicly accessible again. However, cross-server follow relationships may be broken upon suspension and will not be automatically restored when the account is reinstated. If the 30-day period lapses, **all** of the user's data is permanently purged from the instance. Admins also have the option to immediately delete the user's account data at any point during the 30-day period.

Once the data has been deleted, whether that is after the 30-day period, or if an admin has force deleted it, the account can still be un-suspended. However, the account will have no data (statuses, profile information, avatar or header image) associated with it.

For remote accounts, suspending will make them unfollow any local account. Those relationships are not restored in case the remote account is unsuspended, even within the 30-day time window.

Note that by default, users suspended by a server will still be able to view posts from that server. To change this default behavior, server admins can set the `AUTHORIZED_FETCH` environment variable - see the documentation for [configuring your environment](../config/).

## Moderating entire websites {#server-wide-moderation}

Because individually moderating a large volume of users from a misbehaving server can be exhausting, it is possible to pre-emptively moderate against all users from that particular server using a so-called **domain block**, which comes with several different levels of severity. Go to **Preferences** &gt; **Moderation** &gt; **Federation**, then click "Add new domain block" to block a server.

### Reject media {#reject-media}

With this option active, no files from the server will be processed locally. That includes avatars, headers, emojis and media attachments.

### Limit {#limit-server}

Equivalent to [limiting](#limit-user) all past and future accounts from the server. Previously known as "silencing". Notably, this will automatically turn all follows from the limited server into follow requests, even if the followed account does not require approving followers.

### Suspend {#suspend-server}

Equivalent to [suspending](#suspend-user) all past and future accounts from the server. No content from the server will be stored locally except for usernames.

Suspending a server will remove all existing follow relationships between local accounts and accounts on the suspended server. They will not be restored in case the remote server is un-suspended later.

### Blocklist {#blocklist}

A "blocklist" is a file that contains a list of servers that have been identified as problematic by other administrators, and may include comments describing the problematic content. You can import blocklists to block those servers from interacting with your Mastodon server.

After you have downloaded a blocklist, go to **Preferences** &gt; **Moderation** &gt; **Federation**, then click "Import". Select the blocklist's `.csv` file, then click "Upload". Mastodon will give you the chance to review the list, and you can de-select individual servers if desired. When you have finished, click "Import" to block the selected servers.

You can also click "Export" to backup your Mastodon server's blocklist or share it with other administrators.

Note that by default, users of a suspended server will still be able to view posts from the suspending server. To change this default behavior, server admins can set the `AUTHORIZED_FETCH` environment variable - see the documentation for [configuring your environment](../config/).

## Spam-fighting measures {#spam-fighting-measures}

There are a few baseline measures for preventing spam in Mastodon:

* Signing up requires confirming an e-mail address
* Signing up is rate-limited by IP

However, dedicated spammers will get through that. The other measure you can employ is **e-mail domain blacklisting**. During sign-up, Mastodon resolves the given e-mail address for an A or MX record, i.e. the IP address of the e-mail server, and checks that IP address against a dynamically stored blacklist.

### Blocking by e-mail server {#blocking-by-e-mail-server}

Spammers will often use different e-mail domains so it looks like they are using a lot of different e-mail servers that would all be difficult to blacklist separately. However, sometimes all of those domains resolve to a single e-mail server IP. If you see a lot of spammers signing up at the same time, you can check for this, either using an online DNS lookup tool, or the Linux `dig` utility, e.g. `dig example.com` will return all DNS A records for that Domain. If you notice the IP is the same for all domains, you can add it to the e-mail domain blacklist.

### Blocking by IP {#blocking-by-ip}

Blocking by IP is not a foolproof strategy. IPs are sometimes shared by
different people and sometimes change hands. It's also possible to accidentally
block a large IP range and cut off legitimate access. Be careful with either of
these approaches.

#### IP Blocks

Use the "IP Rules" page within the moderation interface to create an IP Address
based block. You can block specific IPv4 or IPv6 address, or block entire ranges
using the [CIDR] syntax. The instructions on the page will guide you through how
long the block should last, and what severity the block should have within the
application.

[CIDR]: https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing

#### Firewall rules

It is also possible to block visitors by IP address in Linux using a firewall.
Here is an example using `iptables` and `ipset`:

```bash
# Install ipset
sudo apt install ipset
# Create blacklist named "spambots"
sudo ipset create spambots nethash
# Add 1.2.3.4 to the blacklist
sudo ipset add spambots 1.2.3.4
# Add firewall rule based on the blacklist
sudo iptables -I INPUT 1 -m set --match-set spambots src -j DROP
```

Be careful not to lock yourself out of your machine.

### Webhooks for moderation-level events {#report-events-webhook}

[Webhooks](../webhooks) can be created to facilitate automation through the
moderation API by notifying applications about system events in real-time. This
also enables integrations with chat apps like Discord, IRC and Slack, helping
moderator coordination.
