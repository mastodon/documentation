---
title: Setting up your profile
description: Get started with your new account.
menu:
  docs:
    weight: 20
    parent: user
---

## Your appearance {#appearance}

{{< figure src="/assets/profile-cards.jpg" caption="Profile cards showing display name, avatar, and header" >}}

You can change how your profile appears to others by navigating to Settings &gt; Profile &gt; Appearance.

### Display name {#name}

Your display name is shown to other users before your address. You can set a display name up to 30 characters by default.

### Bio {#bio}

Your bio is a short description of yourself that is displayed as a note on your profile. You can set a bio of up to 500 characters by default.

### Avatar {#avatar}

Your avatar is an icon that is displayed next to your posts and is part of your visual identity. You can upload an avatar as a PNG, GIF, or JPG image up to 2MB in size. This image will be downscaled to 400x400.

### Header {#header}

Your header is a banner image shown at the top of your profile, as well as in profile cards used in follow lists and account directories. You can upload a header as a PNG, GIF, or JPG image up to 2MB in size. This image will be downscaled to 1500x500.

## Profile flags {#flags}

You can set certain flags on your profile to let others know how you use Mastodon.

![](/assets/bot-flag.jpg)

### Locked account {#locked}

By locking your account, two things will happen:

* New followers will not be automatically accepted, but will instead require you to manually approve them.
* A lock icon will be shown to others, to let them know that their follow will not be immediately accepted.

### Bot account {#bot}

Enabling the bot flag will add a bot icon to your profile. This icon will let others know that your profile may perform automated actions, or might not be monitored by a human. Other software may choose to treat bot profiles differently, but Mastodon currently treats the bot flag as a visual indication only.

### Profile directory {#discoverable}

Opting in to be listed on the profile directory will make your profile discoverable through a feature that allows browsing through profiles.

## Profile metadata {#fields}

Profile metadata is a way to add extra information to your profile that is easy to skim. You have 4 rows where you can define the label and the value. For example:

| Label | Content |
| :--- | :--- |
| Age | 25 |
| Country | Germany |
| Pronouns | he/him |
| Website | https://example.com |

It’s completely up to you what you put there. The content can contain mentions, hashtags, custom emojis and links.

### Link verification {#verification}

Document-based verification and blue ticks are not possible without a central authority. However, Mastodon can cross-reference the links you put on your profile to prove that you are the real owner of those links. In case one of those links is your personal homepage that is known and trusted, it can serve as the next-best-thing to identity verification.

{{< hint style="info" >}}
Because Mastodon can be self-hosted, there is no better way to verify your identity than to host Mastodon on your own domain, which people already trust.
{{< /hint >}}

If you put an HTTPS link in your profile metadata, Mastodon checks if that link resolves to a web page that links back to your Mastodon profile with a special `rel=me` attribute. If so, you get a verification checkmark next to that link, since you are confirmed as the owner. Likewise, Mastodon puts `rel="me"` on the links within profile metadata. The link might look something like this:

```html
<a href="https://social.example.com/@username" rel="me">Follow me on Mastodon!</a>
```

More precisely, Mastodon will validate the link under the following conditions:
- Since 4.0: the hostname does not change after IDN normalization
- the link to your Mastodon profile is added to a static HTML page used in your site. Websites served via Javascript-heavy content management systems may not support these links. Check with your site developer.
- it starts with HTTPS
- the resolved page contains at least one `a` or `link` tag with a `rel="me"`
- the `href` attribute on one of those elements is equal to the URL for your Mastodon profile

Alternatively, validation will occur if the resolved page's *first* link has an `href` value that redirects to your Mastodon profile's URL (such as through a link shortener).

If validation succeeds, the link to your website will turn green on your profile page. This may take a few minutes even after you deploy the update to your site's HTML. Should validation fail: remove the link from your Mastodon profile; correct the link in your website's HTML and redeploy; re-add the link to your Mastodon profile. 
