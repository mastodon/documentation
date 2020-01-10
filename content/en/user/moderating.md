---
title: Dealing with unwanted content
description: Control what you see, for a more comfortable social media experience.
menu:
  docs:
    weight: 50
    parent: user
---

## Filtering posts <a id="filters"></a>

It is possible to filter statuses for specific keywords and phrases so that they can be hidden automatically.

{{< figure src="/assets/image%20%2848%29.png" caption="A sample of active filters for various keywords in different contexts." >}}

To create or manage your filters, go to Settings &gt; Filters. The "Add new filter" button will let you create a new filter, and existing filters can be edited or deleted. Your existing filters will be summarized in a table.

{{< figure src="/assets/image%20%2814%29.png" caption="Filters can have an expiry date, specific contexts, server-side drop, and use word boundaries." >}}

Filters have the following settings:

### Keyword or phrase <a id="filter-phrase"></a>

This is the string that will be matched. The keyword will be searched for in any status's content, including CW, media descriptions, and poll options.

### Expire after <a id="filter-expire"></a>

Optionally only apply the filter for a limited amount of time. Expired filters are not automatically deleted, but can be reactivated by setting a new expiry date \(or changing it back to "never" expire\).

### Filter contexts <a id="filter-context"></a>

Choose where the filter will be applied:

* Home timeline = matching statuses will be removed from your home feed
* Notifications = matching notifications will not be shown
* Public timelines = matching statuses will not appear in local/federated timelines
* Conversations = matching statuses will be hidden in threads and detailed views

### Drop instead of hide <a id="filter-drop"></a>

Filtering is usually done client-side, so that disabling a filter will cause filtered statuses to be visible again. However, if you enable "drop instead of hide", any matching statuses will be disappear completely and will never be delivered to your home or notifications.

### Whole word <a id="filter-whole"></a>

Filters normally apply to any status that contains the included characters, regardless of whether they are in the middle of a word. Enabling "whole word" will only apply the filter if the keyword is surrounded by spaces or other non-alphanumeric characters.

## User-level actions <a id="blocking-and-muting"></a>

{{< figure src="/assets/image%20%2824%29.png" caption="The user dropdown menu offers various actions." >}}

### Hiding boosts <a id="hide-boosts"></a>

If you hide boosts from someone, you won’t see their boosts in your home feed. This option only appears on users who you are currently following.

### Muting <a id="mute"></a>

{{< figure src="/assets/image%20%2852%29.png" caption="Sample of muted accounts." >}}

When muting, you have the option to mute notifications from them or not. Muting without muting notifications hides the user from your view:

* You won’t see the user in your home feed
* You won’t see other people boosting the user
* You won’t see other people mentioning the user
* You won’t see the user in public timelines

If you choose to also mute notifications from them, you will additionally not see notifications from that user.

The user has no way of knowing they have been muted.

### Blocking <a id="block"></a>

{{< figure src="/assets/image%20%2836%29.png" caption="Sample of blocked accounts." >}}

Blocking hides a user from your view:

* You won’t see the user in your home feed
* You won’t see other people boosting the user
* You won’t see other people mentioning the user
* You won’t see the user in public timelines
* You won’t see notifications from that user

Additionally, on the blocked user’s side:

* The user is forced to unfollow you
* The user cannot follow you
* The user won’t see other people’s boosts of you
* The user won’t see you in public timelines

If you and the blocked user are on the same server, the blocked user will not be able to view your posts on your profile while logged in.

### Hiding an entire server <a id="hide-domain"></a>

![](/assets/image%20%2861%29.png)

If you hide an entire server:

* You will not see posts from that server on the public timelines
* You won’t see other people’s boosts of that server in your home feed
* You won’t see notifications from that server
* You will lose any followers that you might have had on that server

## Reporting problematic content to moderators <a id="report"></a>

{{< figure src="/assets/image%20%283%29.png" caption="The report modal allows selecting example statuses, adding a note, and forwarding reports." >}}

If you see a status or user that is violating the rules of your website, you can report that user to your site's moderators. Clicking the "report" option on the user dropdown or status dropdown will open the report modal. Here, you can \(and should\) add a note about why you are reporting this account. You can attach certain problematic statuses for additional context on why you are reporting the account, and if their conduct is violating the rules of the remote website, you can also choose to forward the report to their site's moderators.

