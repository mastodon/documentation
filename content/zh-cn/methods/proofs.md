---
title: proofs API 方法
description: 供身份提供者使用。
menu:
  docs:
    weight: 100
    name: proofs
    parent: methods
    identifier: methods-proofs
aliases: [
  "/methods/proofs",
  "/api/methods/proofs",
  "/methods/accounts/proofs",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

{{< hint style="danger" >}}
**已弃用**\
身份证明已在 3.5.0 及更高版本中弃用。 以前，唯一的证明提供者是 Keybase，但自从被 Zoom 收购以来，Keybase 的开发已经完全停滞。
{{< /hint >}}

## 查看身份证明{{%removed%}} {#get}

```http
GET /api/proofs HTTP/1.1
```

**返回：** 由提供者定义的自定义响应\
**OAuth：** 公开\
**版本历史：**\
2.8.0 - 添加

#### 请求
##### 查询参数

provider
: 字符串。要查找的身份提供者。目前仅支持 `keybase`（区分大小写）。

username
: 字符串。所选身份提供者上的用户名。

#### 响应
##### 200: OK

通过“keybase”`provider` 查找 `username` “gargron”

```json
{
  "avatar": "https://files.mastodon.social/accounts/avatars/000/000/001/original/d96d39a0abb45b92.jpg",
  "signatures": [
    {
      "sig_hash": "5cfc20c7018f2beefb42a68836da59a792e55daa4d118498c9b1898de7e845690f",
      "kb_username": "gargron"
    }
  ]
}
```

##### 404: Not found

未找到 `provider` 上 `username` 的身份证明

```json
{
  "error": "Record not found"
}
```

---

## 另请参考

{{< caption-link url="https://github.com/mastodon/mastodon/pull/17045" caption="删除 Keybase 集成 (#17045)" >}}

{{< translation-status-zh-cn raw_title="proofs API methods" raw_link="/methods/proofs/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
