---
title: profile API 方法
description: 关于用户账户的方法。
menu:
  docs:
    weight: 20
    name: profile
    parent: methods
    identifier: methods-profile
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## 删除账户头像

```http
DELETE /api/v1/profile/avatar HTTP/1.1
```

**返回:** [CredentialAccount]({{< relref "entities/Account#CredentialAccount">}})\
**OAuth:** 用户令牌 + `write:accounts`\
**版本历史:**\
4.2.0 - 添加

删除与账户关联的头像。

#### 请求

##### 标头

Authorization
: {{<required>}} 提供此标头，并附带 `Bearer <user_token>`，以获得对此 API 方法的访问授权。

##### 路径参数

#### 响应

##### 200: OK

已成功从账户中删除头像。若该账户未关联任何头像，响应仍将提示成功删除。

```json
{
  "id": "110357222516183152",
  "username": "rob",
  "acct": "rob",
  "display_name": "",
  "locked": false,
  "bot": false,
  "discoverable": false,
  "group": false,
  "created_at": "2023-05-12T00:00:00.000Z",
  "note": "",
  "url": "http://localhost:3000/@rob",
  "uri": "http://localhost:3000/users/rob",
  "avatar": "http://localhost:3000/avatars/original/missing.png",
  "avatar_static": "http://localhost:3000/avatars/original/missing.png",
  "header": "http://localhost:3000/system/accounts/headers/110/357/222/516/183/152/original/0cd99648c23005ed.png",
  "header_static": "http://localhost:3000/system/accounts/headers/110/357/222/516/183/152/original/0cd99648c23005ed.png",
  "followers_count": 14,
  "following_count": 2,
  "statuses_count": 10,
  "last_status_at": "2023-06-26",
  "noindex": false,
  "source": {
    "privacy": "public",
    "sensitive": false,
    "language": null,
    "note": "",
    "fields": [],
    "follow_requests_count": 0
  },
  "emojis": [],
  "roles": [],
  "fields": [],
  "role": {
    "id": "-99",
    "name": "",
    "permissions": "65536",
    "color": "",
    "highlighted": false
  }
}
```

### 401: 未授权

Authorization 标头无效或缺失。

```json
{
	"error": "The access token is invalid"
}
```

## 删除账户横幅图片

```http
DELETE /api/v1/profile/header HTTP/1.1
```

**返回:** [CredentialAccount]({{< relref "entities/Account#CredentialAccount">}})\
**OAuth:** 用户令牌 + `write:accounts`\
**版本历史:**\
4.2.0 - 添加

删除与账户关联的横幅图片。

#### 请求

##### 标头

Authorization
: {{<required>}} 提供此标头，并附带 `Bearer <user_token>`，以获得对此 API 方法的访问授权。

##### 路径参数

#### 响应

##### 200: OK

已成功从账户中删除横幅图片。若该账户未关联任何横幅图片，响应仍将提示成功删除。

```json
{
  "id": "110357222516183152",
  "username": "rob",
  "acct": "rob",
  "display_name": "",
  "locked": false,
  "bot": false,
  "discoverable": false,
  "group": false,
  "created_at": "2023-05-12T00:00:00.000Z",
  "note": "",
  "url": "http://localhost:3000/@rob",
  "uri": "http://localhost:3000/users/rob",
  "avatar": "http://localhost:3000/avatars/original/missing.png",
  "avatar_static": "http://localhost:3000/avatars/original/missing.png",
  "header": "http://localhost:3000/headers/original/missing.png",
  "header_static": "http://localhost:3000/headers/original/missing.png",
  "followers_count": 14,
  "following_count": 2,
  "statuses_count": 10,
  "last_status_at": "2023-06-26",
  "noindex": false,
  "source": {
    "privacy": "public",
    "sensitive": false,
    "language": null,
    "note": "",
    "fields": [],
    "follow_requests_count": 0
  },
  "emojis": [],
  "roles": [],
  "fields": [],
  "role": {
    "id": "-99",
    "name": "",
    "permissions": "65536",
    "color": "",
    "highlighted": false
  }
}
```

### 401: 未授权

Authorization 标头无效或缺失。

```json
{
	"error": "The access token is invalid"
}
```

{{< translation-status-zh-cn raw_title="profile API methods" raw_link="/methods/profile/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}
