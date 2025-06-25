---
title: TermsOfService
description: 表示当前实例的服务条款。
menu:
  docs:
    parent: entities
aliases: [
  "/entities/termsofservice",
  "/entities/TermsOfService",
  "/api/entities/termsofservice",
  "/api/entities/TermsOfService",
]
---

## 示例

```json
{
  "effective_date": "2025-04-15",
  "effective": true,
  "content": "<p>Foo bar newer</p>\n",
  "succeeded_by": null
}
```

## 属性

### `effective_date` {#effective_date}

**说明：** 这些服务条款生效或已生效的日期。\
**类型：** 字符串（[Date](/api/datetime-format#date)）\
**版本历史：**\
4.4.0 - 添加

### `effective` {#effective}

**说明：** 当前这些服务条款是否正在生效。\
**类型：** 布尔值\
**版本历史：**\
4.4.0 - 添加

### `content` {#content}

**说明：** 服务条款的已渲染 HTML 内容。\
**类型：** 字符串（HTML）\
**版本历史：**\
4.4.0 - 添加

### `succeeded_by` {#succeeded_by}

**说明：** 如果存在更新的服务条款，则为其生效日期。\
**类型：** {{<nullable>}} 字符串（[Date](/api/datetime-format#date)）\
**版本历史：**\
4.4.0 - 添加

## 另请参阅

{{< page-relref ref="methods/instance#terms_of_service" caption="GET /api/v1/instance/terms_of_service" >}}

{{< page-relref ref="methods/instance#terms_of_service_date" caption="GET /api/v1/instance/terms_of_service/:date" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/terms_of_service_serializer.rb" caption="app/serializers/rest/terms_of_service_serializer.rb" >}}