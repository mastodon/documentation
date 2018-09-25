---
title: Basics
menu:
  docs:
    parent: usage
    weight: 1
---
## Sign up

You have to choose a server to sign up on, like you would choose an e-mail provider, or a World of Warcraft realm for your new character. The server will be hosting your account and your home feed.

You can [browse a list of servers by categories and languages on joinmastodon.org](https://joinmastodon.org/#getting-started).

## Edit profile
### Picture, name and bio

- You can upload a profile picture
- You can upload a header image for your profile
- You can set a display name different to your username
- You can write about yourself in the bio
- You can mention people and use hashtags and custom emoji in your bio

### Profile metadata

Profile metadata is a way to add extra information to your profile that is easy to skim. You have 4 rows where you can define the label and the value. For example:

|Label|Content|
|-----|-------|
|Age|25|
|Country|Germany|
|Pronouns|he/him|

It's completely up to you what you put there. The content can contain mentions, hashtags, custom emojis and links.

### Link verification

If you put a link in your profile metadata, Mastodon checks if the linked page links back to your Mastodon profile. If so, you get a verification checkmark next to that link, since you are confirmed as the owner.

Behind the scenes, Mastodon checks for the `rel="me"` attribute on the link back. Likewise, Mastodon puts `rel="me"` on the links within profile metadata.

## Posting
### Text

- You can use up to 500 characters
- You can mention other people like `@alice` or `@alice@example.com`
- When mentioning other people, the domain part of their username is not counted
- If you post links, they must begin with `http://` or `https://`
- When posting links, all links are counted as 23 characters, no matter how long
- You can use hashtags like `#example` so others can find your post by that tag
- You can add a content warning to your post
- The content warning is plain text. It does not support mentions, hashtags or links

### Media

- You can upload PNG and JPG images
- Uploaded GIFs are converted to soundless MP4s like on Imgur/Gfycat (GIFV)
- You can also directly upload soundless MP4s and WebMs (GIFV)
- You can upload videos in the MP4, WebM or MOV format
- Upload limit for images is 8 MB
- Upload limit for videos is 40 MB
- Images with a surface area larger than 1280² pixels are downsized
- All media in a post can be hidden behind a spoiler

### Custom emoji

- Each server offers a set of custom emoji you can use, like on Discord
- You can use an emoji using its shortcode like `:thounking:`
