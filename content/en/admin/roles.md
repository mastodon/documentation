---
title: Roles
description: Roles UI, accessible from the admin dashboard
menu:
  docs:
    parent: admin
---

## Roles {#roles}
When the database is seeded, roles are derived from the values present in  [`~/config/roles.yml`](https://github.com/mastodon/mastodon/blob/main/config/roles.yml). 

{{< page-ref page="entities/Role" >}}

The resultant roles are `Owner`, `Admin`, and `Moderator`.

A Role and its attributes can be created using the *Add role* button present on the `/admin/roles` page.

![](/assets/admin-roles-ui.png)

### Add Role {#add-role}

The `admin/roles/new` page allows for the creation of a custom Role.

![](/assets/admin-roles-new-ui.png)

**Input Fields**

{{< page-relref ref="entities/Role#name"  caption="Name">}}

{{< page-relref ref="entities/Role#color" caption="Badge color">}}

*Priority*

- Defaults to `0`
	- Cannot be > `999` 
		- The `Owner` role by default has a value of 1000.
	- Can be any negative integer value

> "Higher role decides conflict resolution in certain situations. Certain actions can only be performed on roles with a lower priority."

{{< page-relref ref="entities/Role#highlighted"  caption="Display role as badge on user profiles">}}

{{< page-relref ref="entities/Role#permissions"  caption="Permissions">}}


