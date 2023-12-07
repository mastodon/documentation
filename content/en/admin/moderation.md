---
title: Moderation actions
description: Actions that can be taken against unwanted users or domains.
menu:
  docs:
    weight: 110
    parent: admin
---

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

Previously known as "silencing". A limited account is hidden from all other users on that instance, except for its followers. All of the content is still there, and it can still be found via search, mentions, and following, but the content is invisible publicly.

At this moment, limit does not affect federation. A locally limited account is *not* limited automatically on other servers. Account limitations are reversible.

### Suspend {#suspend-user}

A Mastodon suspension means the account is effectively deleted. The account no longer appears in search, the profile page is gone, and all of the posts, uploads, followers, and all other data are removed publicly. However, all the data is available in the admin back-end for a period of 30 days from suspension. This is to give the user an opportunity to work with instance admins to resolve any potential issues and have the account re-instated.

If the account is reinstated within the 30-day period, all data is once again accessible publicly without any adverse effects. If the 30-day period lapses, **all** that user's data is purged from the instance. Admins also have the option to immediately delete the user's account data at any point during the 30 days.

Once the data has been deleted, whether that is after the 30-day period, or if an admin has force deleted it, the account can still be un-suspended. However, the account will have no data (statuses, profile information, avatar or header image) associated with it.

For remote accounts, suspending will make them unfollow any local account. Those relationships are not restored in case the remote account is unsuspended, even within the 30-day time window.

## Moderating entire websites {#server-wide-moderation}

Because individually moderating a large volume of users from a misbehaving server can be exhausting, it is possible to pre-emptively moderate against all users from that particular server using a so-called **domain block**, which comes with several different levels of severity.

### Reject media {#reject-media}

With this option active, no files from the server will be processed locally. That includes avatars, headers, emojis and media attachments.

### Limit {#limit-server}

Equivalent to [limiting](#limit-user) all past and future accounts from the server. Previously known as "silencing".

### Suspend {#suspend-server}

Equivalent to [suspending](#suspend-user) all past and future accounts from the server. No content from the server will be stored locally except for usernames.

Suspending a server will remove all existing follow relationships between local accounts and accounts on the suspended server. They will not be restored in case the remote server is un-suspended later.

## Spam-fighting measures {#spam-fighting-measures}

There are a few baseline measures for preventing spam in Mastodon:

* Signing up requires confirming an e-mail address
* Signing up is rate-limited by IP

However, dedicated spammers will get through that. The other measure you can employ is **e-mail domain blacklisting**. During sign-up, Mastodon resolves the given e-mail address for an A or MX record, i.e. the IP address of the e-mail server, and checks that IP address against a dynamically stored blacklist.

### Blocking by e-mail server {#blocking-by-e-mail-server}

Spammers will often use different e-mail domains so it looks like they are using a lot of different e-mail servers that would all be difficult to blacklist separately. However, sometimes all of those domains resolve to a single e-mail server IP. If you see a lot of spammers signing up at the same time, you can check for this, either using an online DNS lookup tool, or the Linux `dig` utility, e.g. `dig example.com` will return all DNS A records for that Domain. If you notice the IP is the same for all domains, you can add it to the e-mail domain blacklist.

### Blocking by IP {#blocking-by-ip}

It is not possible to block visitors by IP address in Mastodon itself, and it is not a foolproof strategy. IPs are sometimes shared by a lot of different people and sometimes change hands. However, it is possible to block visitors by IP address in Linux using a firewall. Here is an example using `iptables` and `ipset`:

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

Webhooks can be created to facilitate automation through the moderation API by notifying applications about system events in real-time. This also enables integrations with chat apps like Discord, IRC and Slack, helping moderator coordination.

The X-Hub-Signature header adopted from the WebSub spec can be optionally used to verify that the payloads are authentic.

Events currently supported:

* account.approved
* account.created
* account.updated
* report.created
* report.updated
* status.created
* status.updated



#### Example payload:

```json

{
   "event":"report.created",
   "created_at":"2023-10-26T13:34:00.351Z",
   "object":{
      "id":"8437",
      "action_taken":false,
      "action_taken_at":null,
      "category":"violation",
      "comment":"",
      "forwarded":true,
      "created_at":"2023-10-26T13:34:00.348Z",
      "updated_at":"2023-10-26T13:34:00.348Z",
      "account":{
         "id":"123456789",
         "username":"bobisaburger",
         "domain":null,
         "created_at":"2023-07-13T04:39:22.493Z",
         "email":"bobisaburger@emailservice.com",
         "ip":"12.34.56.78",
         "confirmed":true,
         "suspended":false,
         "silenced":false,
         "sensitized":false,
         "disabled":false,
         "approved":true,
         "locale":"en",
         "invite_request":"I would love to be a member of your instance!",
         "ips":[
            {
               "ip":"12.34.56.78",
               "used_at":"2023-07-13T04:45:31.835Z"
            },
            {
               "ip":"98.76.54.32",
               "used_at":"2023-07-13T04:39:22.722Z"
            }
         ],
         "account":{
            "id":"123456789",
            "username":"bobisaburger",
            "acct":"bobisaburger",
            "display_name":"bobisaburger",
            "locked":false,
            "bot":false,
            "discoverable":null,
            "group":false,
            "created_at":"2023-07-13T00:00:00.000Z",
            "note":"",
            "url":"https://mastodonwebsite/@bobisaburger",
            "uri":"https://mastodonwebsite/users/bobisaburger",
            "avatar":"https://locationofavatar.com/image.jpg",
            "avatar_static":"https://locationofavatar.com/image.jpg",
            "header":"locationofheader.com/image.jpg",
            "header_static":"locationofheader.com/image.jpg",
            "followers_count":100,
            "following_count":200,
            "statuses_count":9,
            "last_status_at":"2023-08-05",
            "noindex":true,
            "emojis":[
               
            ],
            "roles":[
               
            ],
            "fields":[
               
            ]
         },
         "role":{
            "id":"-99",
            "name":"",
            "permissions":"65536",
            "color":"",
            "highlighted":false
         }
      },
      "target_account":{
         "id":"123454321",
         "username":"cheeseperson",
         "domain":"someothermastodonsite.com",
         "created_at":"2023-08-20T00:00:00.000Z",
         "email":null,
         "ip":null,
         "confirmed":null,
         "suspended":false,
         "silenced":false,
         "sensitized":false,
         "disabled":null,
         "approved":null,
         "locale":null,
         "invite_request":null,
         "ips":null,
         "account":{
            "id":"123454321",
            "username":"cheeseperson",
            "acct":"cheeseperson@someothermastodonsite.com",
            "display_name":"cheeseperson",
            "locked":false,
            "bot":false,
            "discoverable":false,
            "group":false,
            "created_at":"2023-08-20T00:00:00.000Z",
            "note":"",
            "url":"https://someothermastodonsite.com/@cheeseperson",
            "uri":"https://someothermastodonsite.com/users/cheeseperson",
            "avatar":"https://someothermastadonsite.com/avatars/original/missing.png",
            "avatar_static":"https://someothermastadonsite.com/avatars/original/missing.png",
            "header":"locationofheader.com/image.jpg",
            "header_static":"locationofheader.com/image.jpg",
            "followers_count":2,
            "following_count":2,
            "statuses_count":95,
            "last_status_at":"2023-10-26",
            "emojis":[
               
            ],
            "fields":[
               
            ]
         },
         "role":null
      },
      "assigned_account":null,
      "action_taken_by_account":null,
      "statuses":[
         {
            "id":"12345678987654321",
            "created_at":"2023-10-26T11:29:13.000Z",
            "in_reply_to_id":"1918282746465",
            "in_reply_to_account_id":"101010101010",
            "sensitive":false,
            "spoiler_text":"",
            "visibility":"public",
            "language":"de",
            "uri":"https://someothermastodonsite.com/users/cheeseperson/statuses/111301083360371621",
            "url":"https://someothermastodonsite.com/@cheeseperson/111301083360371621",
            "replies_count":0,
            "reblogs_count":0,
            "favourites_count":0,
            "edited_at":"2023-10-26T11:30:31.000Z",
            "content":"<p>Here is some content</p>",
            "reblog":null,
            "account":{
               "id":"123454321",
               "username":"cheeseperson",
               "acct":"cheeseperson@someothermastodonsite.com",
               "display_name":"cheeseperson",
               "locked":false,
               "bot":false,
               "discoverable":false,
               "group":false,
               "created_at":"2023-08-20T00:00:00.000Z",
               "note":"",
               "url":"https://someothermastodonsite.com/@cheeseperson",
               "uri":"https://someothermastodonsite.com/users/cheeseperson",
               "avatar":"https://someothermastadonsite.com/avatars/original/missing.png",
               "avatar_static":"https://someothermastadonsite.com/avatars/original/missing.png",
               "header":"locationofheader.com/image.jpg",
               "header_static":"locationofheader.com/image.jpg",
               "followers_count":2,
               "following_count":2,
               "statuses_count":95,
               "last_status_at":"2023-10-26",
               "emojis":[
                  
               ],
               "fields":[
                  
               ]
            },
            "media_attachments":[
               
            ],
            "mentions":[
               {
                  "id":"101010101010",
                  "username":"thirdperson",
                  "url":"https://thirdpersonsinstance.com/@thirdperson",
                  "acct":"thirdperson@emailwebsite.com"
               }
            ],
            "tags":[
               
            ],
            "emojis":[
               
            ],
            "card":null,
            "poll":null
         }
      ],
      "rules":[
         {
            "id":"2",
            "text":"Don't be a meanie!"
         }
      ]
   }
}


```
