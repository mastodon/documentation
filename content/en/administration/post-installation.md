---
title: Post-installation steps
description: What to do after the installation of Mastodon is complete
menu:
  docs:
    parent: administration
    weight: 3
---

## Using the command-line interface

The command-line interface of Mastodon is an executable file called `tootctl` residing in the `bin` directory within the Mastodon root directory. You must specify which environment you intend to use whenever you execute it by specifying the `RAILS_ENV` environment variable. Unless you are a developer working on a local machine, you need to use `RAILS_ENV=production`. If you are sure that you will never need another environment (for development, testing, or staging), you can add it to your `.bashrc` file for convenience, e.g.:

```bash
echo "export RAILS_ENV=production" >> ~/.bashrc
```

If so, you won't need to specify it each time inline. Otherwise, calls to `tootctl` will usually go like this, assuming that the Mastodon code is checked out in `/home/mastodon/live`:

```bash
cd /home/mastodon/live
RAILS_ENV=production bin/tootctl help
```

## Creating an admin account
### In the browser

After signing up in the browser, you will need to use the command line to give your newly created account admin privileges. Assuming your username is `alice`:

```bash
RAILS_ENV=production bin/tootctl accounts update alice --role admin
```

### From the command line

You can create a new account using the command-line interface.

```bash
RAILS_ENV=production bin/tootctl accounts create \
  alice \
  --email alice@example.com \
  --confirmed \
  --role admin
```

A randomly generated password will be shown in the terminal.

## Filling in server information

After logging in, navigate to the **Site settings** page. While there are no technical requirements for filling in this information, it is considered crucial for operating a server for humans.

|Setting|Meaning|
|-------|-------|
|Contact username|Your username so people know who owns the server|
|Business e-mail|An e-mail address so people locked out of their accounts, or people without accounts, can contact you|
|Instance description|Why did you start this server? Who is it for? What makes it different?|
|Custom extended information|You can put all sorts of information in here but a **code of conduct** is recommended|

After you fill these in, simply hit "Save changes".
