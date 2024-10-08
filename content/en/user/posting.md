---
title: Posting to your profile
description: Sharing your thoughts has never been more convenient.
menu:
  docs:
    weight: 30
    parent: user
---

{{< figure src="assets/compose-with-cw.png" width="50%" caption="Compose form with optional Content Warning enabled" >}}

## Text {#text}

The main body of each status update can be composed using the text field. The default character limit is 500 characters.

### Links {#links}

{{< figure src="assets/compose-links.png" width="50%" caption="Links must start with http(s):// and are counted as 23 characters regardless of length" >}}

If you include links in your post, they must begin with `http://` or `https://`. All links are counted as 23 characters, no matter how long they actually are, so there is no need to use a link shortener to save characters. In fact, using a link shortener is actively discouraged.

### Mentions {#mentions}

{{< figure src="assets/compose-mentions.png" width="50%" caption="Suggested mentions for both local and remote users" >}}

You can mention users by typing out their full address, e.g. `@alice@example.com`. Note that any usage of`@word` will be interpreted as mentioning the local user with the username `word`, if that user exists. Only the username part will count against your character limit -- the domain is not counted.

### Hashtags {#hashtags}

{{< figure src="assets/compose-hashtags.png" width="50%" caption="Hashtags are autosuggested with usage frequency" >}}

You can use a `#hashtag` to make your post discoverable to anyone searching for that hashtag. Hashtags can contain alphanumeric characters and underscores, but cannot contain numbers only.

### Custom emoji {#emoji}

{{< figure src="assets/compose-custom-emoji.png" width="50%" caption="An array of custom emoji are available in the selector" >}}

Each server offers a set of custom emoji you can use, similar to Slack or Discord. You can use an emoji using its shortcode like `:thounking:` or by clicking the emoji face in the compose box and browsing through the "Custom" category. You can also browse through and search for standard unicode emoji.

## Attachments {#attachments}

You can attach either files or a poll to your status.

### Files {#media}

{{< figure src="assets/compose-media-attachment.png" width="50%" caption="New post with a thumbnail for attached media, with an Edit button for additional options" >}}

Click the photo stack to attach a file to your post. You can attach the following:

* **Images** (PNG, JPG, HEIF, WEBP, AVIF) **up to 16MB**. Images will be downscaled to 8.3 megapixels (enough for a 3840x2160 image). Up to 4 images can be attached, per post.
* **Animated GIFs** (GIFV) **up to 16MB** are converted to soundless MP4s. GIF dimensions must be less than 1MP (1280x720). You can also upload soundless MP4 and WebM files, which will be looped in clients the same way as an animated GIF. Only one animated GIF can be attached, per post.
  * Static GIF files have the same limits applied to them as animated GIF files. If you are having issues uploading these images, you will need to convert it to another supported image format.
* **Videos** (MP4, M4V, MOV, WebM) **up to 99MB**. Video will be transcoded to H.264 MP4 with a maximum bitrate of 1300kbps and framerate of 120fps. Only one video can be attached, per post.
* **Audio** (MP3, OGG, WAV, FLAC, OPUS, AAC, M4A, 3GP) **up to 99MB**. Audio will be transcoded to MP3 using V2 VBR (roughly 192kbps). Only one audio file can be attached, per post.

#### Editing media {#edit}

{{< figure src="assets/edit-media.png" caption="Edit media to add a media description (ALT text) or choose a focal point for the preview thumbnail" >}}

By clicking the "Edit" link on the attachment thumbnail, you can load a modal which will allow adding a media description or changing the focal point. Although optional, it is a good idea to add media descriptions that briefly describe what is in contained in the media. These descriptions will be shown when the media fails to load for any reason, or when accessed by screen readers and other assistive technology. Setting the focal point is also optional, but can make preview thumbnails looks better when they are not shown in a 16:9 aspect ratio.

### Polls {#polls}

{{< figure src="assets/compose-polls.png" width="50%" caption="New post with a poll in a 'pick one' style, that expires after one day" >}}

Click the bar graph icon to attach a poll to your post.

* You can add up to 4 choices. Each choice can be up to 25 characters.
* Polls default to pick-one/single-choice. Click on the radio button to switch your poll to any-of/multiple-choice checkboxes.
* Polls can be set to expire in 5 minutes, 30 minutes, 1 hour, 6 hours, 1 day, 3 days, or 7 days.

## Publishing levels {#privacy}

{{< figure src="assets/post-visibility.png" width="50%" caption="New post with the option to modify the publishing level" >}}

| Level | Public timelines | Permalink | Profile view | Home feeds |
| :--- | :--- | :--- | :--- | :--- |
| Public | Yes | Yes | Yes | Yes |
| Quiet Public | No | Yes | Yes | Yes |
| Followers | No | Logged in on the same site | In-app or logged in | Yes |
| Specific People | No | Logged in and mentioned | In-app or logged in | No |

Posts can be published with one of four different privacy levels, as described below. You can [set a default privacy level for your posts](../preferences#posting), and you can change the privacy level for a draft post by selecting the "Change Post Privacy" icon beneath the text of the post.

### Public {#public}

The default option.

* Anyone can see your post at the permalink without logging in.
* Your post will appear in-app in the public timelines.
* Your followers will receive the post in their home feeds, and anyone mentioned will receive the post in notifications.
* Your post can be boosted into other home feeds.

### Quiet Public {#unlisted}

Exactly the same as public, but with the following difference:

* Your post will not appear in Mastodon's live feeds or explore features.
* Your post will not appear in search results, even if your account has opted-in to full text search.

This option was previously known as Unlisted.

### Followers {#followers}

A more limited delivery option.

* Seeing your post at the permalink requires being logged in on the same website as someone who follows you or was mentioned.
* Your post will not appear in-app except to followers browsing your profile, and to anyone mentioned.
* Your followers will receive the post in their home feeds, and anyone mentioned will receive the post in notifications.
* Your post cannot be boosted, except by yourself.

{{< hint style="warning" >}}
To effectively publish private (followers-only) posts, you must **lock your account**–otherwise, anyone could follow you to view older posts.
{{< /hint >}}

{{< hint style="danger" >}}
Please mind that post privacy on Mastodon is per-post, rather than account-wide, and as such **there is no way to make past public posts private.**
{{< /hint >}}

### Specific People {#private}

Send your post only to mentioned users.

* Seeing your post at the permalink requires being logged in on the same website as someone who was mentioned.
* Your post will not appear in-app except to anyone mentioned.
* Anyone mentioned will receive the post in notifications. It will not appear in the home timeline.
* Your post cannot be boosted.

{{< hint style="warning" >}}
**Do not share dangerous and sensitive information over private mentions**. Mastodon is not an encrypted messaging app like Signal or Matrix, the database administrators of the sender’s and recipient’s servers may obtain access to the text.
{{< /hint >}}

## Visibility of Replies {#replies}

Your replies will only appear on your followers' Home feeds if they follow both you and the person you are replying to.

Some notes about this:

* A new post you make which starts with an `@mention` is **not** considered a reply, so it will show up on the Home feed of all your followers.
* The reply's visibility (Public vs Unlisted vs Followers-Only) does **not** affect whether it shows up on the Home feed.
* If your post is public and contains a followed hashtag, it will be shown on the Home feed regardless of whether it is a reply.
* Other Fediverse software may show all of your replies on the Home feed, no matter who the posts are replies to.

## Content Warnings {#cw}

{{< figure src="assets/status-cw.png" width="50%" caption="Expanded post with a content warning that also has attached images obscured" >}}

One feature that Mastodon provides that you may not have seen on other social networks is the option to attach a content warning to your posts. When a content warning is included, the status content will be collapsed by default, and only the Content Warning will be shown, similarly to an email subject line or a "read more" break. This can be used to add a summary or subject for your post, to collapse long posts, or to otherwise provide context or setup for the body of the post.

When media is attached, a checkbox appears to allow you to "mark media as sensitive". This hides the full media behind a blurred thumbnail by default. Adding a CW to a post automatically marks the media as sensitive as well.
