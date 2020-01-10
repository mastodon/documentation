---
title: Setting up your new instance
menu:
  docs:
    weight: 50
    parent: admin
---

## Creating an admin account <a id="admin"></a>

### In the browser <a id="admin-gui"></a>

After signing up in the browser, you will need to use the command line to give your newly created account admin privileges. Assuming your username is `alice`:

```bash
RAILS_ENV=production bin/tootctl accounts modify alice --role admin
```

### From the command line <a id="admin-cli"></a>

You can create a new account using the command-line interface.

```bash
RAILS_ENV=production bin/tootctl accounts create \
  alice \
  --email alice@example.com \
  --confirmed \
  --role admin
```

A randomly generated password will be shown in the terminal.

## Filling in server information <a id="info"></a>

After logging in, navigate to the **Site settings** page. While there are no technical requirements for filling in this information, it is considered crucial for operating a server for humans.

| Setting | Meaning |
| :--- | :--- |
| Contact username | Your username so people know who owns the server |
| Business e-mail | An e-mail address so people locked out of their accounts, or people without accounts, can contact you |
| Instance description | Why did you start this server? Who is it for? What makes it different? |
| Custom extended information | You can put all sorts of information in here but a **code of conduct** is recommended |

After you fill these in, simply hit “Save changes”.

