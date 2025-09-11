---
title: Quoting other posts
description: All about quoting content (your own posts, or those made by other people).
menu:
  docs:
    weight: 40
    parent: user
---

## What are quote posts? {#what}

Quote posts allow you to reference another user's post in your own, while adding your own commentary.

- Found something inspiring? Quote your favourite posts from where you typically boost them.
- Don’t want to be quoted? Disable quoting by default for all posts, or turn off quoting for a specific post
- Want your thoughts to inspire a wider audience? Keep the default setting enabled to ‘Anyone’.

## How to quote others {#how}

If an author of a post has enabled quoting, you’ll see an option to quote their post under a new menu accessed from the *Boost* button.

<video src="/assets/quotes/initiate.mp4" autoplay playsinline loop controls muted width="100%"></video>

Your post will then appear within the composer window, where you can add your comment and post to continue the discussion.

## Setting your default quote settings {#defaults}

Disable or limit quotes by navigating to *Settings -> Preferences -> Posting Defaults*.
These defaults will apply to all *future* posts you create.

(Note: Users on Mastodon 4.4 will find this setting under *Settings -> Preferences -> Other*)

<video src="/assets/quotes/defaults.mp4" autoplay playsinline loop controls muted width="100%"></video>

Your visibility setting controls options for who can quote. When you make a followers-only post, others (including followers) won’t be able to quote it – this ensures that your post remains visible to only your followers.

## Customizing quote settings when composing a post {#custom}

Override your global settings for an individual post by navigating to *Visibility and interaction settings* within the composer.

<video src="/assets/quotes/individual-post.mp4" autoplay playsinline loop controls muted width="100%"></video>

## Notifications {#notifications}

Mastodon will notify users being quoted as long as the quote is using the new protocol and the quote is accepted by your quote policy. Your notification filter settings will also apply to these notifications.

## Removing your post from someone’s quote post {#remove}

You can easily remove your original post from another user’s post using the ••• Options menu.

<video src="/assets/quotes/revoke.mp4" autoplay playsinline loop controls muted width="100%"></video>

Sometimes, removing your post from a single quote may not be enough. If you believe someone is abusing the ability to quote you, you can also take the following actions:

- Block the user. While this action won’t retroactively remove your post from posts the user has already published, it will prevent the user from quoting you in future posts.
- Change the quote settings for your published post. The next section outlines how to do this.

## Changing quote settings on a published post {#change}

On your own published posts, edit the quote settings from the ••• menu. Changes to disallow quoting will prevent users from quoting your post in the future, but will not apply retroactively to quotes already published.

<video src="/assets/quotes/change-post.mp4" autoplay playsinline loop controls muted width="100%"></video>

Only public and quiet public posts can be edited this way; your followers-only posts and direct mentions can only ever be quoted by you.

## Additional tips {#tips}

**Power booster?** You can still boost quickly using `Shift + Click` on the *Boost* button or using the `‘B’` hotkey.

**Quote responsibly.** Authors can remove their post if they’re uncomfortable with the way you’ve quoted them. See [Removing your post from someone’s quote post](#remove) for more details.

## Frequently Asked Questions {#faq}

#### Do quote posts appear in the same context as a thread, or do they create a new context? {#faq-context}

Quote posts create a new context, and do not appear in the replies. Replies to the quote post will only notify you if you are also mentioned.

#### I don’t want to be quoted at all, can I prevent people from quoting me? {#faq-opt-out}

Yes, for every post you make, you can decide who can quote you, from “Anyone”, “Followers only”, and “Just me”. People you have blocked are not able to quote you, even if you have selected “Anyone”. You can select “Just me” if you don’t want to be quoted at all (note that you can *always* quote yourself).

#### What happens if the quoted post is deleted or edited? {#faq-changed-post}

If a quoted post is deleted, the contents of the quote post will remain, but the quoted post will be replaced with a placeholder explaining it is unavailable. If the quoted post is edited, this will be reflected when viewing the quote post.

#### I don’t want to see quote posts, can I disable them? {#faq-hide-quotes}

The Mastodon web interface allows you to hide quote posts from your own timeline, the same way it allows you to hide boosts or replies.

#### As a server administrator, I don’t want my users to use and see quotes, can I disable them? {#faq-admin}

No, there is no server setting in Mastodon to disable quote display or authoring for their users.

#### I don’t like how my post was quoted. Can I remove it? Do I need to block the person who quoted me? {#faq-remove-quote}

Yes, you can [revoke a quote](#remove) at any time. This will be irreversible though, so proceed with caution. You do not need to block the author to remove the quote.

#### I don’t want my post to be quoted anymore. Can I stop the quotes? Do I need to delete the post? {#faq-stop-quotes}

You can change the quote policy at any time without deleting the post. It will only affect new quotes, existing ones will remain unless you manually remove them.

#### Are my old posts quotable? {#faq-old-posts}

Posts made in Mastodon 4.4 and earlier do not allow quotes, although you can make them quotable by individually [changing their quote policy](#change).

#### How does Mastodon enforce quote consent? {#faq-consent}

Mastodon uses [FEP-044f, Consent-respecting quote posts](https://codeberg.org/fediverse/fep/src/branch/main/fep/044f/fep-044f.md) to advertise who is expected to be allowed to quote a post, request for consent, distribute and revoke approval. Mastodon will only offer the option to quote a post if the advertised policy allows it, and will only display a quote if it is a self-quote, or it has a valid authorization. Mastodon cannot prevent other Fediverse software from displaying quotes without consent, but it will not show such quotes, and we encourage other implementers to make use of the protocol described in Fediverse Enhancement Proposal FEP-044f.

#### Why is my quote taking time to appear? {#faq-delay}

While Mastodon will automatically approve or reject quotes according to your settings (see [Setting your default quote settings](#defaults)), other Fediverse software might require manual approval of quotes. This means that when you quote posts from across the Fediverse, it may take time for your quote to appear. When the quote is approved, it will automatically update on your post.

#### How do Mastodon quotes show up in other Fediverse software? {#faq-quote-from-mastodon}

Quotes authored with Mastodon should show up just like any other quote in Misskey, Akkoma, and most other pieces of Fediverse software that already have some quote implementations.

#### How do quotes from other Fediverse software show up in Mastodon? {#faq-quote-from-fedi}

Only self-quotes and quotes with explicit consent will show up as proper quotes in Mastodon. Quotes that do not meet these requirements and are authored from software that does not support Mastodon’s approval flow will show up as they did before Mastodon 4.4, as if they were not quote posts.

#### How do quotes interact with blocks? {#faq-blocks}

If you have blocked someone and see someone quoting them, the quote post will still appear, but the quote will be hidden. The same applies if they have blocked you. People cannot quote you if you have blocked them, but past quotes from blocked users are currently not detached when you block them.
