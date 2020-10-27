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
RAILS_ENV=production bin/tootctl accounts modify alice --role admin
```

### From the command line {#admin-cli}

You can create a new account using the command-line interface.

```bash
RAILS_ENV=production bin/tootctl accounts create \
  alice \
  --email alice@example.com \
  --confirmed \
  --role admin
```

A randomly generated password will be shown in the terminal.

## Filling in server information {#info}

After logging in, navigate to the **Site settings** page. While there are no technical requirements for filling in this information, it is considered crucial for operating a server for humans.

| Setting | Meaning |
| :--- | :--- |
| Contact username | Your username so people know who owns the server |
| Business e-mail | An e-mail address so people locked out of their accounts, or people without accounts, can contact you |
| Instance description | Why did you start this server? Who is it for? What makes it different? |
| Custom extended information | You can put all sorts of information in here but a **code of conduct** is recommended |

After you fill these in, simply hit “Save changes”.

## Running periodic cleanup tasks {#cleanup}

Mastodon generates some temporary files that are worth cleaning up after a certain amount of time (e.g. to save money on hosting). In general, you want to set up `cron` jobs (or another mechanism) to run these periodic cleanup tasks.

Typically you want to run [`tootctl media remove`](https://docs.joinmastodon.org/admin/tootctl/#media) and [`tootctl preview_cards remove`](https://docs.joinmastodon.org/admin/tootctl/#preview_cards) periodically. These will clean up remote media (e.g. images, videos, audio) and preview cards (e.g. preview images for links) after a certain number of days. (Check the docs for those commands if you want to tweak how old something has to be before it's cleaned up.)

First, run `crontab -e` to edit the cronfile for the `mastodon` user. (If you get a prompt asking which editor to use, choose your favorite editor.)

Next, add something like the following to the bottom of the file:

    @weekly PATH=/home/mastodon/.rbenv/shims:/home/mastodon/.rbenv/bin:/usr/local/bin:/usr/bin:/bin RAILS_ENV=production /home/mastodon/live/bin/tootctl media remove
    @weekly PATH=/home/mastodon/.rbenv/shims:/home/mastodon/.rbenv/bin:/usr/local/bin:/usr/bin:/bin RAILS_ENV=production /home/mastodon/live/bin/tootctl preview_cards remove

This will run these two commands on a weekly basis.

Finally, save the file. You can use `crontab -l` to verify the configuration.
