---
title: Datetime 格式
description: Datetime 格式
menu:
  docs:
    weight: 10
    parent: api
---

## Datetime  {#datetime}

“Datetime”指定某个时刻。

Datetime 的字符串表示形式使用 [RFC3339 第 5.6 节](https://www.rfc-editor.org/rfc/rfc3339#section-5.6) 中定义的“互联网日期/时间格式”。

总的来说，它包含以下必须包含的部分：

```
[YYYY]-[MM]-[DD]T[hh]:[mm]:[ss].[s][TZD]
```

其中：

- `[YYYY]` = 四位数的年份
- `[MM]`   = 两位数的月份（01=一月，以此类推）
- `[DD]`   = 两位数的月份中的日期（01 到 31）
- `[hh]`   = 小时的两位数字（00 到 23）（不允许 24）
- `[mm]`   = 分钟的两位数字（00 到 59）
- `[ss]`   = 秒的两位数字（00 到 60）
- `[s]`    = 一位或多位数字表示秒的小数部分
- `[TZD]`  = 时区指示符（UTC 为 `Z`，或者 `+[hh]:[mm]` 或 `-[hh]:[mm]` 表示与 UTC 的偏移量）

例如，`1994-11-05T13:15:30.000Z`（等同于 `1994-11-05T08:15:30-05:00`）。

有关完整的 [ABNF 语法](https://www.rfc-editor.org/rfc/rfc2234)，请查看 [RFC3339 第 5.6 节](https://www.rfc-editor.org/rfc/rfc3339#section-5.6)。

### 互操作性

- 日期和时间部分始终用大写 `T` 分隔（不是小写，也不是空格）。
- 时区指示符 `Z` 始终为大写，而不是小写。
- 秒的小数部分（`[s]`）至少用一位数字表示，最多三位数字表示。
- 精确度较低的字段也可以表示为 Datetime。 例如，服务器可能会将某个 Datetime 值截断至当天午夜。

## 日期 {#date}

“日期”指定活动发生的公历日期，以 UTC 为准。

日期的字符串表示形式使用 ISO 8601（日期和时间表示的国际标准，第 5.2.1.1 节）中的完整、扩展的日历日期表示形式。 这也是 [W3C 日期与时间格式](https://www.w3.org/TR/NOTE-datetime)中的“完整日期”格式。

包含以下必须包含的组成部分：

```
[YYYY]-[MM]-[DD]
```

- `[YYYY]` = 四位数的年份
- `[MM]`   = 两位数的月份（01=一月，以此类推）
- `[DD]`   = 两位数的月份中的日期（01 到 31）

### 互操作性

- 年、月和日期组件始终用 `-` 分隔。

{{< translation-status-zh-cn raw_title="Datetime formats" raw_link="/api/datetime-format/" last_translation_time="2025-04-06" raw_commit="5e2b739ee193896bea937addc2843146ea0bc870">}}
