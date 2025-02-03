---
title: PrivacyPolicy
description: Represents the privacy policy of the instance.
menu:
  docs:
    parent: entities
aliases: [
  "/entities/privacypolicy",
  "/entities/PrivacyPolicy",
  "/api/entities/privacypolicy",
  "/api/entities/PrivacyPolicy",
]
---

## Example

```json
{
  "updated_at": "2022-10-07T00:00:00+00:00",
  "content": "<p>This privacy policy describes how mastodon.social (&quot;mastodon.social&quot;, &quot;we&quot;, &quot;us&quot;) collects,\nprotects and uses the personally identifiable information you may provide\nthrough the mastodon.social website or its API. The policy also describes the choices\navailable to you regarding our use of your personal information and how you can\naccess and update this information. This policy does not apply to the practices\nof companies that mastodon.social does not own or control, or to individuals that\nmastodon.social does not employ or manage.</p>\n\n<h1>What information do we collect?</h1>\n\n<ul>\n<li><strong>Basic account information</strong>: If you register on this server, you may be\nasked to enter a username, an e-mail address and a password. You may also\nenter additional profile information such as a display name and biography, and\nupload a profile picture and header image. The username, display name,\nbiography, profile picture and header image are always listed publicly.</li>\n<li><strong>Posts, following and other public information</strong>: The list of people you\nfollow is listed publicly, the same is true for your followers. When you\nsubmit a message, the date and time is stored as well as the application you\nsubmitted the message from. Messages may contain media attachments, such as\npictures and videos. Public and unlisted posts are available publicly. When\nyou feature a post on your profile, that is also publicly available\ninformation. Your posts are delivered to your followers, in some cases it\nmeans they are delivered to different servers and copies are stored there.\nWhen you delete posts, this is likewise delivered to your followers. The\naction of reblogging or favouriting another post is always public.</li>\n<li><strong>Direct and followers-only posts</strong>: All posts are stored and processed on the\nserver. Followers-only posts are delivered to your followers and users who are\nmentioned in them, and direct posts are delivered only to users mentioned in\nthem. In some cases it means they are delivered to different servers and\ncopies are stored there. We make a good faith effort to limit the access to\nthose posts only to authorized persons, but other servers may fail to do so.\nTherefore it&#39;s important to review servers your followers belong to. You may\ntoggle an option to approve and reject new followers manually in the settings.\n<strong>Please keep in mind that the operators of the server and any receiving\nserver may view such messages</strong>, and that recipients may screenshot, copy or\notherwise re-share them. <strong>Do not share any sensitive information over\nMastodon.</strong></li>\n<li><strong>IPs and other metadata</strong>: When you log in, we record the IP address you log\nin from, as well as the name of your browser application. All the logged in\nsessions are available for your review and revocation in the settings. The\nlatest IP address used is stored for up to 12 months. We also may retain\nserver logs which include the IP address of every request to our server.</li>\n</ul>\n\n<h1>What do we use your information for?</h1>\n\n<p>Any of the information we collect from you may be used in the following ways:</p>\n\n<ul>\n<li>To provide the core functionality of Mastodon. You can only interact with\nother people&#39;s content and post your own content when you are logged in. For\nexample, you may follow other people to view their combined posts in your own\npersonalized home timeline.</li>\n<li>To aid moderation of the community, for example comparing your IP address with\nother known ones to determine ban evasion or other violations.</li>\n<li>The email address you provide may be used to send you information,\nnotifications about other people interacting with your content or sending you\nmessages, and to respond to inquiries, and/or other requests or questions.</li>\n</ul>\n\n<h1>How do we protect your information?</h1>\n\n<p>We implement a variety of security measures to maintain the safety of your\npersonal information when you enter, submit, or access your personal\ninformation. Among other things, your browser session, as well as the traffic\nbetween your applications and the API, are secured with SSL, and your password\nis hashed using a strong one-way algorithm. You may enable two-factor\nauthentication to further secure access to your account.</p>\n\n<h1>What is our data retention policy?</h1>\n\n<p>We will make a good faith effort to:</p>\n\n<ul>\n<li>Retain server logs containing the IP address of all requests to this server,\nin so far as such logs are kept, no more than 90 days.</li>\n<li>Retain the IP addresses associated with registered users no more than 12\nmonths.</li>\n</ul>\n\n<p>You can request and download an archive of your content, including your posts,\nmedia attachments, profile picture, and header image.</p>\n\n<p>You may irreversibly delete your account at any time.</p>\n\n<h1>Do we use cookies?</h1>\n\n<p>Yes. Cookies are small files that a site or its service provider transfers to\nyour computer&#39;s hard drive through your Web browser (if you allow). These\ncookies enable the site to recognize your browser and, if you have a registered\naccount, associate it with your registered account.</p>\n\n<p>We use cookies to understand and save your preferences for future visits.</p>\n\n<h1>Do we disclose any information to outside parties?</h1>\n\n<p>We do not sell, trade, or otherwise transfer to outside parties your personally\nidentifiable information. This does not include trusted third parties who assist\nus in operating our site, conducting our business, or servicing you, so long as\nthose parties agree to keep this information confidential. We may also release\nyour information when we believe release is appropriate to comply with the law,\nenforce our site policies, or protect ours or others rights, property, or\nsafety.</p>\n\n<p>Your public content may be downloaded by other servers in the network. Your\npublic and followers-only posts are delivered to the servers where your\nfollowers reside, and direct messages are delivered to the servers of the\nrecipients, in so far as those followers or recipients reside on a different\nserver than this.</p>\n\n<p>When you authorize an application to use your account, depending on the scope of\npermissions you approve, it may access your public profile information, your\nfollowing list, your followers, your lists, all your posts, and your favourites.\nApplications can never access your e-mail address or password.</p>\n\n<h1>Site usage by children</h1>\n\n<p>If this server is in the EU or the EEA: Our site, products and services are all\ndirected to people who are at least 16 years old. If you are under the age of\n16, per the requirements of the GDPR (General Data Protection Regulation) do not\nuse this site.</p>\n\n<p>If this server is in the USA: Our site, products and services are all directed\nto people who are at least 13 years old. If you are under the age of 13, per the\nrequirements of COPPA (Children&#39;s Online Privacy Protection Act) do not use this\nsite.</p>\n\n<p>Law requirements can be different if this server is in another jurisdiction.</p>\n\n<hr>\n\n<p>This document is CC-BY-SA. Originally adapted from the <a href=\"https://github.com/discourse/discourse\">Discourse privacy\npolicy</a>.</p>\n"
}
```

## Attributes

### `updated_at` {#updated_at}

**Description:** A timestamp of when the privacy policy was last updated.\
**Type:** String ([Datetime](/api/datetime-format#datetime))\
**Version history:**\
4.0.0 - added

### `content` {#content}

**Description:** The rendered HTML content of the privacy policy.\
**Type:** String (HTML)\
**Version history:**\
4.0.0 - added

## See also

{{< page-relref ref="methods/instance#privacy_policy" caption="GET /api/v1/instance/privacy_policy" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/privacy_policy_serializer.rb" caption="app/serializers/rest/privacy_policy_serializer.rb" >}}