---
title: Moderation actions
description: Actions that can be taken against unwanted users or domains.
menu:
  docs:
    weight: 110
    parent: admin
---

## Individual moderation {#individual-moderation}

Moderation in Mastodon is always applied locally, i.e. as seen from the particular server. An admin or moderator on one server cannot affect a user on another server, they can only affect the local copy on their own server.

### Disable login {#disable-login}

A Mastodon account can be disabled. This prevents the user from doing anything with the account, but all of the content is still there untouched. This limitation is reversible, the account can be re-enabled at any time. This limitation is only available for local users on your server.

### Silence {#silence-user}

A Mastodon silence is synonymous with sandbox. A silenced account does not appear to users who are not already following it. All of the content is still there, and it can still be found via search, mentioned, and followed, but the content is invisible.

At this moment, silence does not affect federation. A locally silenced account is _not_ silenced automatically on other servers.

This limitation is reversible, the account can be unsilenced at any time.

### Suspend {#suspend-user}

A Mastodon suspension is synonymous with deletion. The account no longer appears in search, the profile page is gone, all of the posts, uploads, followers, and all other data is removed. This limitation is **irreversible**. While the account can be unsuspended, allowing the user to take control of it again, the old data is gone for good.

As of v3.3.0, suspensions are now reversible for 30 days.

## Server-wide moderation {#server-wide-moderation}

Because individually moderating a large volume of users from a misbehaving server can be exhausting, it is possible to pre-emptively moderate against all users from that particular server using a so-called **domain block**, which comes with several different levels of severity.

### Reject media {#reject-media}

With this option active, no files from the server will be processed locally. That includes avatars, headers, emojis and media attachments.

### Silence {#silence-server}

Applies a silence to all past and future accounts from the server.

### Suspend {#suspend-server}

Applies a suspension to all past and future accounts from the server. No content from the server will be stored locally except for usernames.

## Spam-fighting measures {#spam-fighting-measures}

There are a few baseline measures for preventing spam in Mastodon:

* Signing up requires confirming an e-mail address
* Signing up is rate-limited by IP

However, dedicated spammers will get through that. The other measure you can employ is **e-mail domain blacklisting**. During sign up, Mastodon resolves the given e-mail address for an A or MX record, i.e. the IP address of the e-mail server, and checks that IP address against a dynamically stored blacklist.

### Blocking by e-mail server {#blocking-by-e-mail-server}

Spammers will often use different e-mail domains so it looks like they are using a lot of different e-mail servers that would all be difficult to blacklist separately. However, sometimes all of those domains resolve to a single e-mail server IP. If you see a lot of spammers signing up at the same time, you can check for this, either using an online DNS lookup tool, or the Linux `dig` utility, e.g. `dig example.com` will return all DNS A records for that Domain. If you notice the IP is the same for all domains, you can add it to the e-mail domain blacklist.

### Blocking by IP {#blocking-by-ip}

It is not possible to block visitors by IP address in Mastodon itself, and it is not a fool-proof strategy. IPs are sometimes shared by a lot of different people, and sometimes change hands. But it is possible to block visitors by IP address in Linux using a firewall. Here is an example using `iptables` and `ipset`:

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

