---
title: Signing up for an account
description: Find your perfect community.
menu:
  docs:
    weight: 10
    parent: user
---

## Choosing a website {#picker}

You have to choose a website to sign up on, like you would choose an email provider, or a World of Warcraft realm for your new character. The website will be your service provider, hosting your account, your profile, and your home feed.

{{< hint style="info" >}}
You can [browse a list of servers by categories and languages on joinmastodon.org](https://joinmastodon.org/#getting-started).
{{< /hint >}}

### Understanding a website's policies {#tos}

Before you sign up for a service, it is important to understand its policies and terms of use. A Mastodon website will usually have its policies listed on the `/about/more` page, which can be found by clicking "learn more" on the landing page while not logged in to that website.

### Signup modes {#signup}

Mastodon allows website administrators to set one of three different signup modes: open signups, invites, and approval mode.

#### Open signup {#open}

Some websites may allow you to register immediately -- just fill out the registration with your username, email address, and password, and you can start using your account.

#### Server invites {#invite}

Some websites disable the registration form, and instead require invite links to be generated and shared in order to allow people to register.

#### Approval-based registration {#approval}

Some websites allow you to fill out a registration form, but with an additional form entry for mentioning why you want to join that website. Once you submit the form, your account must be approved by a moderator before you can start using it.

## Your username and your domain {#address}

Mastodon addresses actually consist of two parts:

* The local username, e.g. `alice`
* And the domain of the website, e.g. `exemple.com`

Just like an email address. For convenience sake, Mastodon allows you to skip the second part when addressing people on the same server as you, but you have to keep in mind when sharing your username with other people, you need to include the domain or they won’t be able to find you as easily.

| Sharing your username |  |
| :--- | :--- |
| I’m `@alice` on Mastodon! | Wrong |
| I’m `@alice@example.com` on Mastodon! | Correct |
| I'm https://example.com/@alice on Mastodon! | Correct |

The search form in Mastodon will find people either with the above address form, or the link to the person’s profile, so you can share that instead if you prefer.

The same username _can_ be registered on different servers -- there is no way to claim all of them ahead of time. Just like with email, you should not expect `alice@outlook.com` to be the same person as `alice@gmail.com` or `alice@yahoo.com`.
