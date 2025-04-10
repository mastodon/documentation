---
title: 准备你的服务器
menu:
  docs:
    weight: 10
    parent: admin
---

如果你正在设置一台全新的服务器，建议你首先进行安全设置。假设你运行的是**Ubuntu 22.04**：

## 禁用基于密码的 SSH 登录(仅限密钥)

首先，你需要确保自己现在已经是在使用密钥而非密码登录服务器，否则，这将使你无法登录。许多托管提供商支持上传公钥，并自动为新机器设置基于密钥的 root 登录。

编辑 `/etc/ssh/sshd_config` 并找到 `PasswordAuthentication`。确保它已取消注释并设置为 `no`。做出更改后，请重启sshd：

```bash
systemctl restart ssh.service
```

## 更新系统包

```bash
apt update && apt upgrade -y
```

## 安装 fail2ban 以阻止重复登录尝试

首先，安装fail2ban：

```bash
apt install fail2ban
```

编辑 `/etc/fail2ban/jail.local` 并在其中填入以下内容：

```text
[DEFAULT]
destemail = your@email.here
sendername = Fail2Ban

[sshd]
enabled = true
port = 22
mode = aggressive
```

最后，重启 fail2ban：

```bash
systemctl restart fail2ban
```

## 安装防火墙并只允许 SSH、 HTTP 和 HTTPS 端口

首先，安装 iptables-persistent。在安装过程中，它会询问你是否要保留当前规则——选择拒绝。

```bash
apt install -y iptables-persistent
```

编辑 `/etc/iptables/rules.v4` 并在其中填入以下内容：

```text
*filter

#  允许所有回环(lo0)流量，拒绝所有不通过 lo0 接口访问 127/8 地址段的流量
-A INPUT -i lo -j ACCEPT
-A INPUT ! -i lo -d 127.0.0.0/8 -j REJECT

#  接受所有已建立的入站连接
-A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

#  允许所有出站流量 - 你可以修改此规则以实现只允许特定流量
-A OUTPUT -j ACCEPT

#  允许来自任何地方的 HTTP 和与HTTPS 连接(网站和 SSL 服务的标准端口)
-A INPUT -p tcp --dport 80 -j ACCEPT
-A INPUT -p tcp --dport 443 -j ACCEPT

#  (可选)允许来自任何位置的 HTTP/3 连接
-A INPUT -p udp --dport 443 -j ACCEPT

#  允许 SSH 连接
#  这里的端口号应该与你在 sshd_config 中设置的端口号一致
-A INPUT -p tcp -m state --state NEW --dport 22 -j ACCEPT

#  允许 ping 请求
-A INPUT -p icmp -m icmp --icmp-type 8 -j ACCEPT

#  允许目标不可达消息，这里类型 4(需要分片)的消息对于 PMTUD (路径 MTU 发现)功能至关重要
-A INPUT -p icmp -m icmp --icmp-type 3 -j ACCEPT

#  记录被 iptables 拒绝的请求
-A INPUT -m limit --limit 5/min -j LOG --log-prefix "iptables denied: " --log-level 7

#  拒绝所有其他入站请求 - 默认拒绝策略，除非明确允许
-A INPUT -j REJECT
-A FORWARD -j REJECT

COMMIT
```

通过使用 iptables-persistent 进行配置，该配置将在启动时加载。但由于我们现在不重启，所以需要手动加载一次：

```bash
iptables-restore < /etc/iptables/rules.v4
```

如果你的服务器也可以通过 IPv6 访问，编辑`/etc/iptables/rules.v6`并添加以下内容：
```text
*filter

#  允许所有本地回环(lo0)流量，并拒绝所有不通过 lo0 接口访问 127/8 地址段的流量
-A INPUT -i lo -j ACCEPT
-A INPUT ! -i lo -d ::1/128 -j REJECT

#  接受所有已建立的入站连接
-A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

#  允许所有出站流量 - 你可以修改此规则以实现只允许特定的流量
-A OUTPUT -j ACCEPT

#  允许来自任何位置的 HTTP 和 HTTPS 连接(网站和 SSL 服务的标准端口)
-A INPUT -p tcp --dport 80 -j ACCEPT
-A INPUT -p tcp --dport 443 -j ACCEPT
#  (可选) 允许来自任何位置的 HTTP/3 连接
-A INPUT -p udp --dport 443 -j ACCEPT

#  允许 SSH 连接
#  这里的端口号应与 sshd_config 中设置的端口号一致
-A INPUT -p tcp -m state --state NEW --dport 22 -j ACCEPT

#  允许 ping
-A INPUT -p icmpv6 -j ACCEPT

#  记录被 iptables 拒绝的请求
-A INPUT -m limit --limit 5/min -j LOG --log-prefix "iptables denied: " --log-level 7

#  拒绝所有其他入站连接 - 默认拒绝策略，除非明确允许
-A INPUT -j REJECT
-A FORWARD -j REJECT

COMMIT
```
与 IPv4 规则类似，你可以这样手动加载它：
```bash
ip6tables-restore < /etc/iptables/rules.v6
```

{{< translation-status-zh-cn raw_title="Preparing your machine" raw_link="/admin/prerequisites/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
