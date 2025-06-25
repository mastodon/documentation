---
title: 准备你的机器
menu:
  docs:
    weight: 10
    parent: admin
---

如果你正在设置一台全新的机器，推荐你首要完成安全设置。以下内容假定你运行 **Ubuntu 18.04**：

## 禁止密码登录SSH（仅允许密钥登录）

首先，请确保你实际上是通过密钥而不是通过密码登录到服务器的，否则这将使你无法登录。许多托管服务提供商支持上传公钥，并自动为新机器设置基于密钥的root登录。

编辑 `/etc/ssh/sshd_config` 并找到 `PasswordAuthentication`。确保它已被去除注释并被设为 `no`。如果你做了任何改动，请重启 sshd。

## 更新系统

```bash
apt update && apt upgrade -y
```

## 安装 fail2ban 以阻止重复登录尝试

编辑 `/etc/fail2ban/jail.local` 并添加以下内容：

```text
[DEFAULT]
destemail = your@email.here
sendername = Fail2Ban

[sshd]
enabled = true
port = 22

[sshd-ddos]
enabled = true
port = 22
```

最后重启fail2ban：

```bash
systemctl restart fail2ban
```

## 安装防火墙并只暴露SSH、HTTP、HTTPS端口

首先，安装 iptables-persistent。在安装期间，它将询问你是否保留现有规则。

```bash
apt install -y iptables-persistent
```

编辑 `/etc/iptables/rules.v4` 并添加如下内容：

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

#  Allow SSH connections
#  The -dport number should be the same port number you set in sshd_config
-A INPUT -p tcp -m state --state NEW --dport 22 -j ACCEPT

#  Allow ping
-A INPUT -p icmp -m icmp --icmp-type 8 -j ACCEPT

#  Log iptables denied calls
-A INPUT -m limit --limit 5/min -j LOG --log-prefix "iptables denied: " --log-level 7

#  Reject all other inbound - default deny unless explicitly allowed policy
-A INPUT -j REJECT
-A FORWARD -j REJECT

COMMIT
```

iptables-persistent 将在机器启动时自动加载配置。但是由于我们现在不会立刻重启，我们需要第一次手动加载它：

```bash
iptables-restore < /etc/iptables/rules.v4
```

{{< translation-status-zh-cn raw_title="Preparing your machine" raw_link="/admin/prerequisites/" last_tranlation_time="2020-05-04" raw_commit="ad1ef20f171c9f61439f32168987b0b4f9abd74b">}}
