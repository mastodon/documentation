---
title: Parameters
description: Specifics of parameter passing to the Mastodon API
menu:
  docs:
    parent: api
    weight: 3
---

## Parameter format

Query strings, form data, and JSON submitted via POST body is equally understood by the API. It is expected that query strings are used for GET requests, and form data or JSON is used for all other requests.

## Arrays

An array parameter must encoded using bracket notation, e.g. `array[0]=foo&array[1]=bar` would be translated into:

```ruby
array = [
  'foo',
  'bar',
]
```

## Booleans

A boolean value is considered false for the values `0`, `f`, `F`, `false`, `FALSE`, `off`, `OFF`, considered to not be provided for empty strings, and considered to be true for all other values.

## Files

File uploads must be encoded using `multipart/form-data`.

## Nested parameters

Some parameters need to be nested. For that, bracket notation must also be used. For example, `source[privacy]=public&source[language]=en` would be translated into:

```ruby
source = {
  privacy: 'public',
  language: 'en',
}
```

This can be combined with arrays as well.
