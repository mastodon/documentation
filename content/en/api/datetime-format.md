---
title: Datetime formats
description: Datetime formats
menu:
  docs:
    weight: 10
    parent: api
---

## Datetime {#datetime}

A "datetime" specifies an instant in time.

The string representation of a datetime uses the "Internet Date/Time Format" defined in [RFC3339 section 5.6](https://www.rfc-editor.org/rfc/rfc3339#section-5.6).

To summarise, that is the following mandatory components:

```
[YYYY]-[MM]-[DD]T[hh]:[mm]:[ss].[s][TZD]
```

where:

- `[YYYY]` = four-digit year
- `[MM]`   = two-digit month (01=January, etc.)
- `[DD]`   = two-digit day of month (01 through 31)
- `[hh]`   = two digits of hour (00 through 23) (24 NOT allowed)
- `[mm]`   = two digits of minute (00 through 59)
- `[ss]`   = two digits of second (00 through 60)
- `[s]`    = one or more digits representing a decimal fraction of a second
- `[TZD]`  = time zone designator (either `Z` for UTC, or `+[hh]:[mm]` or `-[hh]:[mm]` to represent an offset from UTC)

For example, `1994-11-05T13:15:30.000Z` (equivalent to `1994-11-05T08:15:30-05:00`).

See [RFC3339 section 5.6](https://www.rfc-editor.org/rfc/rfc3339#section-5.6) for the complete [ABNF grammar](https://www.rfc-editor.org/rfc/rfc2234).

### Interoperability

- The date and time portions are always separated by an uppercase `T` (not lowercase, not a space).
- The timezone designator `Z` is always uppercase, not lowercase.
- The fractional (`[s]`) part of the second is represented with at least one digit and at most three digits.
- A field may be presented as a datetime while having lower resolution. E.g., the server clamps the value to the midnight on the date in question.

## Date {#date}

A "date" specifies the calendar date an activity occurred, in UTC.

The string representation of a date uses the complete, extended calendar date representation from ISO 8601, the International Standard for the representation of dates and times (section 5.2.1.1). This is also the "Complete date" format from [W3C Date and Time formats](https://www.w3.org/TR/NOTE-datetime).

That is the following mandatory components:

```
[YYYY]-[MM]-[DD]
```

- `[YYYY]` = four-digit year
- `[MM]`   = two-digit month (01=January, etc.)
- `[DD]`   = two-digit day of month (01 through 31)

### Interoperability

- The year, month, and date components are always separated by a `-`.

