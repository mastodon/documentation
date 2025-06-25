---
title: Setting up your new instance
description: Things to do after installing Mastodon
menu:
  docs:
    weight: 50
    parent: admin
---

## Creating an admin account {#admin}

### In the browser {#admin-gui}

After signing up in the browser, you will need to use the command line to give your newly created account admin privileges. Assuming your username is `alice`:

```bash
RAILS_ENV=production bin/tootctl accounts modify alice --role Owner
```

{{<hint style="warning">}}
Prior to Mastodon 4.0, roles were hardcoded to be one of `user`, `moderator`, or `admin`. Since Mastodon 4.0, there is a customizable role system, with default roles created for `Moderator`, `Admin`, and `Owner`. Names of custom roles are case-sensitive.
{{</hint>}}

### From the command line {#admin-cli}

You can create a new account using the command-line interface.

```bash
RAILS_ENV=production bin/tootctl accounts create \
  alice \
  --email alice@example.com \
  --confirmed \
  --role Owner
```

A randomly generated password will be shown in the terminal.

## Filling in server information {#info}

After logging in, navigate to the **Site settings** page (under **Preferences** -> **Administration**). While there are no technical requirements for filling in this information, it is considered crucial for operating a server for humans.

| Setting | Meaning |
| :--- | :--- |
| Contact username | Your username so people know who owns the server |
| Business email | An email address so people locked out of their accounts, or people without accounts, can contact you |
| Instance description | Why did you start this server? Who is it for? What makes it different? |
| Custom extended information | You can put all sorts of information in here but a **code of conduct** is recommended |

After you fill these in, click “Save changes”.
