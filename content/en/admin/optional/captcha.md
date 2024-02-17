---
title: Captcha
description: Mitigating automated signup bots
menu:
  docs:
    weight: 30
    parent: admin-optional
---

As of Mastodon 4.2, using CAPTCHA technology is supported to help mitigate against bots signing up for new accounts.
With CAPTCHA enabled, new registrations will be required to complete a challenge response as part of the e-mail verification process.

![](/assets/captcha/user-view.png)

For some people, the use of a central CAPTCHA service may be a security and privacy concern.
In addition, CAPTCHA can make the registration process significantly less accessible to some (especially disabled) people.

Currently, hCaptcha is the only available provider supported by Mastodon.
Other providers may be added in the future.

## hCaptcha

- Create a free hCaptcha account at [hcaptcha.com](https://www.hcaptcha.com)
- After completing registration, generate a Site Key and Site Secret from the hCaptcha dashboard
- Add the values to your Mastodon environment configuration as `HCAPTCHA_SITE_KEY` and `HCAPTCHA_SECRET_KEY`
- Restart the Mastodon services running on your server
- From the Mastodon web interface navigate to **Administration**  > **Server settings** > **Registrations** and check the box labled "Require new users to solve a CAPTCHA to confirm their account"

![](/assets/captcha/admin-view.png)