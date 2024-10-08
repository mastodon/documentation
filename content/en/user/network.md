---
title: Using the network features
description: Follow and talk to anyone from any server.
menu:
  docs:
    weight: 40
    parent: user
---

## Browsing Content in Live Feeds {#timelines}

{{< figure src="assets/timeline.png" width="70%" caption="Posts from other servers being streamed into the Live Feed" >}}

To allow you to discover potentially interesting content, Mastodon provides a way to browse all public posts. Well, there is no global shared state between all servers, so there is no way to browse _all_ public posts. When you browse **Live Feeds** > **Other Servers**, you see all public posts that the server you are on knows about. There are various ways your server may discover posts, but the bulk of them will be from people that other users on your server follow.

You can also filter the Live Feeds to view only public posts created on your server.

## Interacting with Posts {#actions}

{{< figure src="assets/status.png" width="70%" caption="An expanded view can be loaded by clicking a status in the timeline" >}}

You can perform quick actions on a post directly from the timeline, or you can click on the post to load an expanded view that shows extra information, such as a full timestamp, interaction counts, and threaded replies, if any. The following actions can be performed on a post:

* **Reply** to a post by clicking the arrow icon. Your post will show up in the thread below the post you are replying to.
* **Boost** a post by clicking the cycled-arrow icon. The post will be reshared on your profile.
* **Favourite** a post by clicking the star icon. The post will be added to your favourites list, and a favourite notification will be delivered to its author.
* **Bookmark** a post by clicking the ribbon icon. The post will be privately added to your bookmarks list without generating a notification.
* Access a **menu** of additional options by clicking the ellipsis icon.

## Notifications {#notifications}

{{< figure src="assets/notifications.png" width="70%" caption="Notifications column with grouping feature enabled" >}}

When other people interact with you or your posts, you will receive a notification depending on the type of the event. Your notifications column allows you to view all notifications in the same stream, or to filter for specific types of notifications:

* **Mentions:** received when someone has mentioned you in a post.
* **Favourites:** received when someone has favourited one of your posts.
* **Boosts:** received when someone has boosted one of your posts.
* **Polls:** Received when a poll that you have voted in or created has ended.
* **Statuses:** Received when a user you have enabled notifications for posts a status.
* **Follows:** Received when someone has followed your profile.

When unread notifications are present, a checkmark will appear in the column header. Clicking this checkmark will mark notifications as read.

## Following Profiles {#follow}

{{< figure src="assets/profile.png" width="70%" caption="Profile card with the Follow button shown" >}}

As long as you encounter a person within your app’s user interface, e.g. the web interface on your home server, or your mobile app, you can just click “follow” and you won’t notice a difference if that person is on your server or not.

However if you come across someone’s public profile hosted on a different server, there’s an obstacle: That server sees you as just another anonymous visitor. Not to worry! You can copy the URL of that profile, or of one of their posts, and then paste that URL into the search function.

If you are visiting a public page on another Mastodon site, see [Using Mastodon outside of your site](../external/#interact).

## Enabling Notifications {#bell}

{{< figure src="assets/bell.png" width="70%" caption="An example of a profile that you are following" >}}

If you are following someone, you also have the option to receive a notification every time they post. To opt into this functionality, click the bell icon.

## Search {#search}

{{< figure src="assets/search.png" width="50%" caption="The search function with modifier options exposed" >}}

Mastodon's basic search allows logged-in users to find posts containing a specific hashtag, or to load a user or status directly if they know the URL or address. Searching for a term will show profiles whose username or display name contains that term, as well as hashtags that match or contain that term.

{{< figure src="assets/direct-url.png" width="70%" caption="An example of a post being loaded directly by its URL" >}}

{{< figure src="assets/search-accounts.png" width="70%" caption="An example of results when searching for &quot;arstechnica&quot; including an account validated by the domain" >}}

{{< figure src="assets/search-hashtags.png" width="70%" caption="An example of hashtags returned when searching for &quot;friday&quot;" >}}

Admins may optionally install full-text search. Mastodon’s full-text search allows logged-in users to find results from their own posts, their favourites, their bookmarks and their mentions. It deliberately does not allow searching for arbitrary strings in the entire database, in order to reduce the risk of abuse by people searching for controversial terms to find people to dogpile.

The following operators are supported:

* **"exact phrases"** will try to find the term inside the quote marks. This allows looking only for direct matches, such as `"look at my cluckers"` to find posts explicitly telling you to look at someone's cluckers.
* **-exclude** will exclude the term prepended by a minus sign. This allows filtering out certain terms, such as `animals -cats` to find posts about animals without posts about cats.
* **+include** will include the term after the plus sign. This allows searching for multiple terms that must be included, such as `cat +dog` to find posts about both cats and dogs.

## Private Mentions {#private}

{{< figure src="assets/dm-column.png" width="70%" caption="A list of conversations containing private mentions" >}}

In Mastodon, private mentions are just posts that have the "mention only" visibility selected. Visibility can be selected per-post, which allows changing the privacy level later in a thread. The private mentions column currently shows a list of all conversations containing a mention only post. Clicking on a conversation will load the associated thread.

## List Timelines {#lists}

Lists are subsets of your home timeline. You can create a list, give it a name, and add users that you follow to that list.

{{< figure src="assets/lists.png" width="70%" caption="A list of lists" >}}

Opening a list will load that list's timeline. List timelines contain only posts by members of that list, as well as replies to you or to other members of the list. This can be changed to show replies to all people you follow, or to no one.