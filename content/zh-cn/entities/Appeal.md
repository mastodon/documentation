---
title: Appeal
description: 对管理操作的申诉。
menu:
  docs:
    parent: entities
aliases: [
  "/entities/Appeal",
  "/api/entities/Appeal",
]
---

## 属性

### `text` {#text}

**描述:** 受到管理的账号向管理员发起的申诉文本。\
**类型:** 字符串\
**版本历史:**\
4.3.0 - 添加

### `state` {#state}

**描述:** 申诉的状态。\
**类型:** 字符串 (枚举类型，取值之一)\
`approved` = 申诉已被管理者批准\
`rejected` = 申诉已被管理者驳回\
`pending` = 申诉已提交，但尚未批准或驳回\
**版本历史:**\
4.3.0 - 添加

{{< translation-status-zh-cn raw_title="Appeal" raw_link="/entities/Appeal/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
