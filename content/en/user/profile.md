---
title: Setting up your profile
description: Get started with your new account.
menu:
  docs:
    weight: 20
    parent: user
---

## Your appearance {#appearance}

{{< figure src="assets/profile-cards.jpg" caption="Profile cards showing display name, avatar, and header" >}}

You can change how your profile appears to others by navigating to Settings &gt; Profile &gt; Appearance.

### Display name {#name}

Your display name is shown to other users before your address. You can set a display name up to 30 characters by default.

### Bio {#bio}

Your bio is a short description of yourself that is displayed as a note on your profile. You can set a bio of up to 500 characters by default. All links are counted as 23 characters, no matter how long they actually are, so there is no need to use a link shortener to save characters. In fact, using a link shortener is actively discouraged.

### Avatar {#avatar}

Your avatar is an icon that is displayed next to your posts and is part of your visual identity. You can upload an avatar as a PNG, GIF, or JPG image up to 2MB in size. This image will be downscaled to 400x400.

### Header {#header}

Your header is a banner image shown at the top of your profile, as well as in profile cards used in follow lists and account directories. You can upload a header as a PNG, GIF, or JPG image up to 2MB in size. This image will be downscaled to 1500x500.

## Profile flags {#flags}

You can set certain flags on your profile to let others know how you use Mastodon.

{{< figure src="assets/bot-flag.jpg" caption="Overview of a profile with the Bot flag set." >}}


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

Document-based verification and blue ticks are not possible without a central authority. However, Mastodon can cross-reference the links you put on your profile to prove that you are the real owner of those links. In case one of those links is your personal homepage that is known and trusted, it can serve as the next-best-thing to identity document verification.

{{< hint style="info" >}}
Because Mastodon can be self-hosted, there is no better way to verify your identity than to host Mastodon on your own domain, which people already trust.
{{< /hint >}}

If you put an HTTPS link in your profile metadata, Mastodon checks if that link resolves to a web page that links back to your Mastodon profile with a special `rel=me` attribute. If so, you get a verification checkmark next to that link, since you are confirmed as the owner. Likewise, Mastodon puts `rel="me"` on the links within profile metadata. The link might look something like this:

```html
<a href="https://social.example.com/@username" rel="me">Follow me on Mastodon!</a>
```

It may also be embedded directly in the head of your web page:

```html
<link href="https://social.example.com/@username" rel="me">
```

#### Validation criteria for verified links

Mastodon will validate the "verified link" profile field under the following conditions:

- The value of the profile field is **a link that MUST start with HTTPS**. Other values will not be processed. Other types of links are not processed. In particular, plain HTTP links are not processed because they are insecure and may be modified by an attacker in transit.
- Since 4.0: **the hostname must not change after IDN normalization**. This is to prevent homeograph attacks where some Unicode character is used that looks confusingly similar to some ASCII character in a mixed string. For example, `U+0061` (English lowercase "a") and `U+0430` (Cyrillic small letter "а") appear nearly identical, but they are completely different characters. This similarity in appearance could be used maliciously to mislead people.

Mastodon will then resolve the link and fetch the web page located there, looking for a qualified link that matches the criteria:

- The resolved page must contain at least one `a` or `link` tag with a `rel="me"` attribute.
  - The `href` attribute on one of those elements must be equal to the URL for your Mastodon profile.
- If no links with `rel="me"` are found, Mastodon will look for the *first* link, and the `href` value must redirect to your Mastodon profile's URL. (This provides limited support for web pages that use link shorteners and do not use rel-me.)
- The HTTP response must not exceed 1 MB.

**Any such link must not be within an `iframe`**. An `iframe` effectively means the link is no longer on the same web page, but rather it is on some external web page which is being embedded in the current one. (Note that some "block-based" CMS software may wrap block elements within iframes, which prevents verification for this reason.)

{{< hint style="info" >}}
Make sure to save your profile *after* adding the rel-me link to your web page! The verification process is triggered when you save your profile, and may take some time before completing. If you have added the rel-me link and verification is not working, then try deleting the link, saving, re-adding the link, and saving again.
{{< /hint >}}
