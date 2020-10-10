---
title: Using the network features
description: Follow and talk to anyone from any server.
menu:
  docs:
    weight: 40
    parent: user
---

## Browsing content through public timelines {#timelines}

{{< figure src="/assets/image%20%2830%29.png" caption="Posts within a public timeline" >}}

To allow you to discover potentially interesting content, Mastodon provides a way to browse all public posts. Well, there is no global shared state between all servers, so there is no way to browse _all_ public posts. When you browse the **federated timeline**, you see all public posts that the server you are on knows about. There are various ways your server may discover posts, but the bulk of them will be from people that other users on your server follow.

There is a way to filter the federated timeline to view only public posts created on your server: The **local timeline**. Mind that “local” here refers to the server, not to a geographical location.

## Interacting with people's posts {#actions}

{{< figure src="/assets/image%20%2821%29.png" caption="An expanded view can be loaded by clicking a status in the timeline." >}}

You can perform quick actions on a post directly from the timeline, or you can click on the post to load an expanded view that shows extra information, such as a full timestamp, interaction counts, and threaded replies, if any. The following actions can be performed on a post:

* **Reply** to a post by clicking the arrow icon. Your toot will show up in the thread below the post you are replying to.
* **Boost** a post by clicking the cycled-arrow icon. The post will be reshared on your profile.
* **Favourite** a post by clicking the star icon. The post will be added to your favourites list, and a favourite notification will be delivered to its author.
* **Bookmark** a post by clicking the ribbon icon. The post will be privately added to your bookmarks list without generating a notification.
* Access a **menu** of additional options by clicking the ellipsis icon.

## Notifications {#notifications}

{{< figure src="/assets/image%20%2850%29.png" caption="Notifications column" >}}

When other people interact with you or your posts, you will receive a notification depending on the type of the event. Your notifications column allows you to view all notifications in the same stream, or to filter for specific types of notifications:

* **Mentions:** received when someone has mentioned you in a post.
* **Favourites:** received when someone has favourited one of your posts.
* **Boosts:** received when someone has boosted one of your posts.
* **Polls:** Received when a poll that you have voted in or created has ended.
* **Follows:** Received when someone has followed your profile.

## Following profiles {#follow}

![](/assets/image%20%2811%29.png)

As long as you encounter a person within your app’s user interface, e.g. the web interface on your home server, or your mobile app, you can just click “follow” and you won’t notice a difference if that person is on your server or not.

However if you come across someone’s public profile hosted on a different server, there’s an obstacle: That server sees you as just another anonymous visitor. Not to worry! You can simply copy the URL of that profile, or of one of their posts, and then paste that URL into the search function.

If you are visiting a public page on another Mastodon site, see [Using Mastodon outside of your site](../external/#interact).

## Search {#search}

{{< figure src="/assets/image%20%2819%29.png" caption="The search function can be accessed from the sidebar." >}}

Mastodon's basic search allows logged-in users to find toots containing a specific hashtag, or to load a user or status directly if they know the URL or address. Searching for a term will show profiles whose username or display name contains that term, as well as hashtags that match or contain that term.

{{< figure src="/assets/image%20%2839%29.png" caption="An example of a toot being loaded directly by its URL." >}}

{{< figure src="/assets/image%20%2823%29.png" caption="An example of accounts returned when searching for &quot;cats&quot;." >}}

{{< figure src="/assets/image%20%2827%29.png" caption="An example of hashtags returned when searching for &quot;cats&quot;." >}}

Admins may optionally install full-text search. Mastodon’s full-text search allows logged-in users to find results from their own toots, their favourites, their bookmarks and their mentions. It deliberately does not allow searching for arbitrary strings in the entire database, in order to reduce the risk of abuse by people searching for controversial terms to find people to dogpile.

The following operators are supported:

* **"exact phrases"** will try to find the term inside the quote marks. This allows looking only for direct matches, such as `"look at my cluckers"` to find posts explicitly telling you to look at someone's cluckers.
* **-exclude** will exclude the term prepended by a minus sign. This allows filtering out certain terms, such as `animals -cats` to find posts about animals without posts about cats.
* **+include** will include the term after the plus sign. This allows searching for multiple terms that must be included, such as `cat +dog` to find posts about both cats and dogs.

## Direct conversations {#direct}

{{< figure src="/assets/image%20%2812%29.png" caption="A list of conversations containing direct messages." >}}

In Mastodon, direct messages are simply toots that have the "direct" visibility selected. Visibility can be selected per-post, which allows changing the privacy level later in a thread. The direct messages column currently shows a list of all conversations containing a direct post. Clicking on a conversation will load the associated thread.

{{< figure src="/assets/image%20%2857%29.png" caption="A direct message in a thread." >}}

## List timelines {#lists}

Lists are subsets of your home timeline. You can create a list, give it a name, and add users that you follow to that list.

If you cannot find a link to **create** a list, try adding "/web/lists" to your home server URL. Add a name in the empty box and use the plus symbol to create the list.

To **add someone** to a list, a typical clicking sequence may go through:
* look at what is usually the middle column with toots from people whom you are following
* click on @person@host for the person you want to add to a list (this can be someone who was boosted and whom you don't follow)
* that person's profile should appear in (usually) the right-hand column with "follow" or "unfollow" and a vertical triple-dot
* click on the triple-dot: if you are following that person, then select the option "add or remove from lists"

![](/assets/image%20%2828%29.png)

Opening a list will load that list's timeline. List timelines contain only posts by members of that list, as well as replies to you or to other members of the list.

{{< figure src="/assets/image%20%285%29.png" caption="A list timeline" >}}

