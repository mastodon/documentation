---
title: Roles
description: Management of roles from the admin dashboard.
menu:
  docs:
    parent: admin
---

# Roles {#roles}
When the database is seeded, roles are derived from the values present in [`~/config/roles.yml`](https://github.com/mastodon/mastodon/blob/main/config/roles.yml).

{{< page-ref page="entities/Role" >}}

The resultant [default roles](#default-roles) are `Owner`, `Admin`, and `Moderator`.

A role and its attributes can be created using [Add role](#add-role), present on the *Roles* (`/admin/roles`) page.

![](/assets/admin-roles-ui.png)

An existing role's attributes can be changed using the [edit role](#edit-role) feature.

## Default roles {#default-roles}
### Base role (*Default permissions*) {#default-base-role}

Affects all users, including users without an assigned role.

The only permission flag that can be altered for this role is **Invite Users**. Enabling this permission allows all users to send invitations.

The base role has a priority of `0`, and this value cannot be altered.

### Owner {#default-owner-role}

A role that is assigned the **Administrator** permission flag, bypassing all permissions. Users with the owner role have every [permission flag](/entities/Role/#permission-flags) enabled.

The role's *Name*, *Badge color*, and *Display badge* attributes can be changed. No permissions can be edited / revoked from this role.

The owner role has the highest [priority](#role-priority) of any role (`1000`). The owner can modify any other role attributes. No role can be created which supersedes the owner role, as [role priority](#role-priority) for new and existing roles must be <= `999`.

### Admin {#default-admin-role}

A role that is assigned all **Moderation** and **Administration** permission flags.

The **DevOps** permission flag for this role is disabled, but can be enabled by an **Owner** (or a custom role with a higher priority value).

The role's *Name*, *Badge color*, and *Display badge* attributes can be changed.

The admin role has a priority of `100`.

### Moderator {#default-moderator-role}

A role that is assigned certain **Moderation** permission flags. These include...
- **View Dashboard**
- **View Audit Log**
- **Manage Users**
- **Manage Reports**
- **Manage Taxonomies**

The role's *Name*, *Badge color*, and *Display badge* attributes can be changed.

The moderator role has a priority of `10`.

## Add Role {#add-role}

The `admin/roles/new` page allows for the creation of a custom role.

![](/assets/admin-roles-new-ui.png)

### Input Fields {#add-role-input-fields}

{{< page-relref ref="entities/Role#name" caption="Name">}}

Duplicate role names can exist. They are discerned in the database by their `id`, which cannot be set from the web interface.

{{< page-relref ref="entities/Role#color" caption="Badge color">}}

### Priority {#role-priority}

- Defaults to `0`
	- Cannot be > `999`
	- Can be any negative integer value
- Two roles can have the same priority value

> "Higher role decides conflict resolution in certain situations. Certain actions can only be performed on roles with a lower priority."

{{< page-relref ref="entities/Role#highlighted" caption="Display role as badge on user profiles">}}

{{< page-relref ref="entities/Role#permissions" caption="Permissions">}}


## Edit role {#edit-role}

![](/assets/admin-roles-edit-ui.png)

An existing role and its attributes can be edited using *Edit* in the role list. [Input fields](#add-role-input-fields) can be changed and saved, just as they can when creating a new role. The role can also be deleted using this form.

![](/assets/admin-roles-edit-role-ui.png)

A logged in user with permission to **Manage Roles** will always be able to see every role, but cannot modify roles that exceed or are equal to their assigned role's [priority](#role-priority).