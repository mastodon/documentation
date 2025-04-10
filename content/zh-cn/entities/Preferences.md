---
title: Preferences
description: 表示用户的偏好设置。
menu:
  docs:
    parent: entities
aliases: [
  "/entities/preferences",
  "/entities/Preferences",
  "/api/entities/preferences",
  "/api/entities/Preferences",
]
---

## 示例

```json
{
  "posting:default:visibility": "public",
  "posting:default:sensitive": false,
  "posting:default:language": null,
  "reading:expand:media": "default",
  "reading:expand:spoilers": false
}
```

## 属性

### `posting:default:visibility` {#posting-default-visibility}

**描述:** 新嘟文的默认可见性。等同于 [CredentialAccount#source\[privacy\]]({{< relref "entities/Account#source-privacy" >}})。\
**类型:** 字符串 (枚举, 取值之一)\
`public` = 公开\
`unlisted` = 悄悄公开\
`private` = 仅关注者可见\
`direct` = 私下提及\
**版本历史:**\
2.8.0 - 添加

### `posting:default:sensitive` {#posting-default-sensitive}

**描述:** 新嘟文的默认敏感标记。等同于 [CredentialAccount#source\[sensitive\]]({{< relref "entities/Account#source-sensitive" >}})。\
**类型:** 布尔值\
**版本历史:**\
2.8.0 - 添加

### `posting:default:language` {#posting-default-language}

**描述:** 新嘟文的默认语言。等同于 [CredentialAccount#source\[language\]]({{< relref "entities/Account#source-language" >}})\
**类型:** {{<nullable>}} 字符串 (ISO 639-1 双字符语言代码), 或 null\
**版本历史:**\
2.8.0 - 添加

### `reading:expand:media` {#reading-expand-media}

**描述:** 媒体附件是否应自动显示或模糊/隐藏。\
**类型:** 字符串 (枚举, 取值之一)\
`default` = 隐藏标记为敏感的媒体\
`show_all` = 默认始终显示所有媒体，无论是否敏感\
`hide_all` = 默认始终隐藏所有媒体，无论是否敏感\
**版本历史:**\
2.8.0 - 添加

### `reading:expand:spoilers` {#reading-expand-spoilers}

**描述:** CW(内容警告) 是否应默认展开。\
**类型:** 布尔值\
**版本历史:**\
2.8.0 - 添加

## 参见

{{< page-relref ref="methods/preferences" caption="preferences API 方法" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/preferences_serializer.rb" caption="app/serializers/rest/preferences_serializer.rb" >}}

{{< translation-status-zh-cn raw_title="Preferences" raw_link="/entities/Preferences/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
