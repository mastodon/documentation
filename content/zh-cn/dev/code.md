---
title: 代码结构
description: 在哪里可以找到代码库的特定部分。
menu:
  docs:
    weight: 30
    parent: dev
---

### 代码结构 {#structure}

下面的概述不应被视为完整或权威的，而只是一个粗略的指引，以帮助你在应用程序中确定查找方向。

#### Ruby {#ruby}

`app/controllers`
: 将业务逻辑绑定到模板的代码。

`app/helpers`
: 可以从视图中使用的代码，即常见操作。

`app/lib`
: 不适合其他类别的代码。

`app/models`
: 数据实体及其关联方法的表示。

`app/policies`
: 在调用相关方法之前进行的权限检查和其他验证。

`app/serializers`
: 从模型生成 JSON 的代码。

`app/services`
: 涉及多个模型的复杂逻辑操作。

`app/views`
: 用于生成 HTML 或其他输出的模板。

`app/workers`
: 在请求-响应周期之外执行的代码。

`spec`
: 自动化测试套件。

#### JavaScript {#javascript}

`app/javascript/mastodon`
: 前端 React.js 应用程序的代码。

`app/javascript/packs`
: 非 React.js 页面的代码。

#### CSS 和其他资源 {#assets}

`app/javascript/images`
: 图像。

`app/javascript/styles`
: 通过 Sass 转换为 CSS 的代码。

#### 本地化 {#localizations}

`config/locales`
: 服务器端 YML 格式的本地化。

`app/javascript/mastodon/locales`
: 客户端 JSON 格式的本地化。

所有语言设置文件都经过标准化，以确保一致的格式和键顺序，从而最大限度地减少版本控制中的变更范围。

- 运行 `bundle exec i18n-tasks normalize` 来规范化服务器端翻译。
- 运行 `yarn run i18n:extract` 将客户端翻译提取并将其规范化到 `en.json` 中。

{{< translation-status-zh-cn raw_title="Code structure" raw_link="/dev/code/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}
