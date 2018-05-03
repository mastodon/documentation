# Security Guide

This guide is meant to be a number of security measures to the Mastodon server and various accounts
that may be related to said server.

It is not meant to cover every possible threat model. Assess your own risks and act 
accordingly.

## The Mastodon server 

### Public key authentication

Use public key authentication with SSH. Read this excellent [guide](https://www.linode.com/docs/security/use-public-key-authentication-with-ssh).
Once you have set up public key authentication and have tested it, disable password authentication.
See this [guide](https://help.ubuntu.com/community/SSH/OpenSSH/Configuring#Disable_Password_Authentication) 
on how to disable password authentication for the OpenSSH server.

### Firewall rules 

You may want to set up some firewall rules. A Mastodon server will require public incoming
access to the following ports: 22 (SSH), 80 (HTTP), 443 (HTTPS). Here are a couple [example iptables rulesets](https://github.com/QueuingKoala/netfilter-samples/tree/master/rules-host)
that you can modify according to your needs. It is recommended to have access to your 
server provider’s out-of-band access method while adding any ruleset 
in case you lock yourself out from SSH.

The rulesets mentioned above can be imported like so:
```sh
iptables-restore < iptables.rules
ip6tables-restore < ip6tables.rules
```

## Securing various related accounts

### Mastodon admin account(s)

In the course of running your Mastodon server you will need an admin account for performing
tasks such as moderation. There may also be multiple admin accounts if you have more than one
admin.

All these accounts will need to be secured due to the level of access they have.

This is how you do that:
* Use randomly generated strong password(s), preferably with the use of a password manager
* Enable two-factor authentication for all admin account(s). This will ensure that even in
the case of a password compromise the admin account(s) themselves are not compromised.

Setting up two-factor authentication in Mastodon is fairly simple:
Settings -> Two-factor Authentication

### Server provider client area account

Access to your server provider’s client area account is very lucrative to any potential 
attacker as such accounts usually provide access to various root password reset methods and
out-of-band access along with the ability to cancel your server service and wipe all data.

Therefore it is important that such an account be secured with all methods available.

This how you do that:
* Use randomly generated strong password(s), preferably with the use of a password manager
* Enable two-factor authentication. This will ensure that even in
the case of a password compromise the account itself is not compromised.

### A note about two-factor authentication

Please make sure to store the recovery code(s) in a secure place that is backed up (try a
offline password manager). This will protect you against loss of the second factor (usually a
smartphone).
