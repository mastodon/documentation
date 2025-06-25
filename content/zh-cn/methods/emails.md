---
title: emails API 方法
description: 请求新的确认邮件，可以发送到新的电子邮件地址。
menu:
  docs:
    weight: 20
    name: emails
    parent: methods-apps
    identifier: methods-emails
aliases: [
  "/methods/emails",
  "/api/methods/emails",
  "/methods/apps/emails",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## 重新发送确认邮件 {#confirmation}

```http
POST /api/v1/emails/confirmations HTTP/1.1
```

重新发送一封新的确认邮件。若提供了电子邮件地址，会在重新发送确认邮件之前更新未确认用户的电子邮件地址。

**返回:** 空\
**OAuth:** 颁发给创建未确认用户的客户端的用户令牌\
**版本历史:**\
3.4.0 - 添加

#### 请求
##### 标头

Authorization
: {{<required>}} 提供此标头，值为 `Bearer <user_token>`，以获得对此 API 方法的访问授权。

##### 表单数据参数

email
: 字符串。若提供，会在重新发送确认邮件之前更新未确认用户的电子邮件地址。

#### 响应
##### 200: OK

```json
{}
```

##### 403: Forbidden

与令牌关联的客户端并不关联该未确认用户。

```json
{
	"error": "This method is only available to the application the user originally signed-up with"
}
```

或者，用户已经确认了他们的电子邮件地址。

```json
{
  "error": "This method is only available while the e-mail is awaiting confirmation"
}
```

---

## 另请参考

{{< page-relref ref="methods/apps#create" caption="POST /api/v1/apps" >}}

{{< page-relref ref="methods/accounts#create" caption="POST /api/v1/accounts" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/emails/confirmations_controller.rb" caption="app/controllers/api/v1/emails/confirmations_controller.rb" >}}

{{< translation-status-zh-cn raw_title="emails API methods" raw_link="/methods/emails/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}
