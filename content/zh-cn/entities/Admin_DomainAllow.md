---
title: Admin::DomainAllow
description: 表示允许进行联合的域名。
menu:
  docs:
    parent: entities
aliases: [
  "/entities/admin-domainallow",
  "/entities/Admin-DomainAllow",
  "/entities/admin_domainallow",
  "/entities/Admin_DomainAllow",
  "/api/entities/admin-domainallow",
  "/api/entities/Admin-DomainAllow",
  "/api/entities/admin_domainallow",
  "/api/entities/Admin_DomainAllow",
]
---

## 示例

```json
{
	"id": "1",
	"domain": "mastodon.social",
	"created_at": "2022-09-14T21:23:02.755Z"
}
```

## 属性

### `id` {#id}

**描述:** 数据库中 DomainAllow 的 ID。\
**类型:** 字符串（从整数转换而来，但不保证一定是数字）\
**版本历史:**\
4.0.0 - 添加

### `domain` {#domain}

**描述:** 允许进行联合的域名。\
**类型:** 字符串\
**版本历史:**\
4.0.0 - 添加

### `created_at` {#created_at}

**描述:** 域名被允许进行联合的时间。\
**类型:** ([Datetime](/api/datetime-format#datetime)) 字符串\
**版本历史:**\
4.0.0 - 添加

## 参见

{{< page-relref page="methods/admin/domain_allows" caption="admin/domain_allows API 方法" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/admin/domain_allow_serializer.rb" caption="app/serializers/rest/admin/domain_allow_serializer.rb" >}}

{{< translation-status-zh-cn raw_title="Admin::DomainAllow" raw_link="/entities/Admin_DomainAllow/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}
