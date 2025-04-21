---
title: 验证码
description: 缓解自动注册机器人的问题
menu:
  docs:
    weight: 30
    parent: admin-optional
---

从 4.2 版本开始， Mastodon 支持使用验证码技术来帮助缓解机器人注册新账户的问题。
启用验证码后，新注册用户将需要在电子邮件验证过程中完成一个质询响应。

![](/assets/captcha/user-view.png)

{{< hint style="danger" >}}
对于某些人来说，使用中心化的验证码服务可能会引起安全和隐私方面的担忧。
此外，验证码可能会使注册过程的可访问性大大降低，尤其是对于视力障碍人士，如盲人或视力低下的人而言。
{{</ hint >}}

目前， hCaptcha 是 Mastodon 唯一支持的验证码提供商。
未来可能会添加其他提供商。

## hCaptcha

- 在 [hcaptcha.com](https://www.hcaptcha.com) 创建一个免费的 hCaptcha 账户
- 完成注册后，使用 hCaptcha 仪表板添加新站点，输入你的 Mastodon 站点域名并获取站点密钥(Site Key)
- 从 hCaptcha 的账户设置菜单中获取你的密钥(Secret Key)
- 将这些值添加到你的 Mastodon 环境配置中，分别添加 `HCAPTCHA_SITE_KEY` 和 `HCAPTCHA_SECRET_KEY`
- 重启服务器上运行的 Mastodon 服务
- 从 Mastodon 网页界面导航至**管理**>**服务器设置**>**注册**，并勾选标有"要求新用户解决验证码以确认其账户"的选项

![](/assets/captcha/admin-view.png)

{{< translation-status-zh-cn raw_title="Captcha" raw_link="/admin/optional/captcha/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}
