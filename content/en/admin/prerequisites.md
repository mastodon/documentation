---
title: Preparing your machine
menu:
  docs:
    weight: 10
    parent: admin
---

If you are setting up a fresh machine, it is recommended that you secure it first. Assuming that you are running **Ubuntu 20.04**:

## Do not allow password-based SSH login (keys only)

First, make sure you are actually logging in to the server using keys and not via a password, otherwise, this will lock you out. Many hosting providers support uploading a public key and automatically set up key-based root login on new machines for you.

Edit `/etc/ssh/sshd_config` and find `PasswordAuthentication`. Make sure it’s uncommented and set to `no`. If you made any changes, restart sshd:

```bash
systemctl restart ssh.service
```

## Update system packages

```bash
apt update && apt upgrade -y
```

## Install fail2ban so it blocks repeated login attempts

First, install fail2ban:

```bash
apt install fail2ban
```

Edit `/etc/fail2ban/jail.local` and put this inside:

```text
[DEFAULT]
destemail = your@email.here
sendername = Fail2Ban

[sshd]
enabled = true
port = 22
mode = aggressive
```

Finally, restart fail2ban:

```bash
systemctl restart fail2ban
```

## Install a firewall and only allow SSH, HTTP and HTTPS ports

First, install iptables-persistent. During installation, it will ask you if you want to keep the current rules–decline.

```bash
apt install -y iptables-persistent
```

Edit `/etc/iptables/rules.v4` and put this inside:

```text
*filter

#  Allow all loopback (lo0) traffic and drop all traffic to 127/8 that doesn't use lo0
-A INPUT -i lo -j ACCEPT
-A INPUT ! -i lo -d 127.0.0.0/8 -j REJECT

#  Accept all established inbound connections
-A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

#  Allow all outbound traffic - you can modify this to only allow certain traffic
-A OUTPUT -j ACCEPT

#  Allow HTTP and HTTPS connections from anywhere (the normal ports for websites and SSL).
-A INPUT -p tcp --dport 80 -j ACCEPT
-A INPUT -p tcp --dport 443 -j ACCEPT
#  (optional) Allow HTTP/3 connections from anywhere.
-A INPUT -p udp --dport 443 -j ACCEPT

#  Allow SSH connections
#  The -dport number should be the same port number you set in sshd_config
-A INPUT -p tcp -m state --state NEW --dport 22 -j ACCEPT

#  Allow ping
-A INPUT -p icmp -m icmp --icmp-type 8 -j ACCEPT

# Allow destination unreachable messages, especially code 4 (fragmentation required) is required or PMTUD breaks
-A INPUT -p icmp -m icmp --icmp-type 3 -j ACCEPT

#  Log iptables denied calls
-A INPUT -m limit --limit 5/min -j LOG --log-prefix "iptables denied: " --log-level 7

#  Reject all other inbound - default deny unless explicitly allowed policy
-A INPUT -j REJECT
-A FORWARD -j REJECT

COMMIT
```

With iptables-persistent, that configuration will be loaded at boot time. But since we are not rebooting right now, we need to load it manually for the first time:

```bash
iptables-restore < /etc/iptables/rules.v4
```

If your server is also reachable over IPv6, edit `/etc/iptables/rules.v6` and add this inside:
```text
*filter

#  Allow all loopback (lo0) traffic and drop all traffic to 127/8 that doesn't use lo0
-A INPUT -i lo -j ACCEPT
-A INPUT ! -i lo -d ::1/128 -j REJECT

#  Accept all established inbound connections
-A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

#  Allow all outbound traffic - you can modify this to only allow certain traffic
-A OUTPUT -j ACCEPT

#  Allow HTTP and HTTPS connections from anywhere (the normal ports for websites and SSL).
-A INPUT -p tcp --dport 80 -j ACCEPT
-A INPUT -p tcp --dport 443 -j ACCEPT
#  (optional) Allow HTTP/3 connections from anywhere.
-A INPUT -p udp --dport 443 -j ACCEPT

#  Allow SSH connections
#  The -dport number should be the same port number you set in sshd_config
-A INPUT -p tcp -m state --state NEW --dport 22 -j ACCEPT

#  Allow ping
-A INPUT -p icmpv6 -j ACCEPT

#  Log iptables denied calls
-A INPUT -m limit --limit 5/min -j LOG --log-prefix "iptables denied: " --log-level 7

#  Reject all other inbound - default deny unless explicitly allowed policy
-A INPUT -j REJECT
-A FORWARD -j REJECT

COMMIT
```
Similar to the IPv4 rules, you can load it manually like this:
```bash
ip6tables-restore < /etc/iptables/rules.v6
```
