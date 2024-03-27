---
title: Getting started with the API
description: 'A primer on REST APIs, HTTP requests and responses, and parameters.'
menu:
  docs:
    weight: 10
    parent: client
---

## An introduction to REST {#rest}

Mastodon provides access to its data over a REST API. REST stands for REpresentational State Transfer, but for our purposes, just think of it as sending and receiving information about various resources based on the request. The Mastodon REST API uses HTTP for its requests and JSON for its payloads.

## Understanding HTTP requests and responses {#http}

REST API endpoints can be called with certain HTTP methods, and more than one method can be used on the same endpoint. The Mastodon API will generally use the following HTTP methods:

* **GET**: Read or view a resource.
* **POST**: Send information to the server.
* **PUT** \| **PATCH**: Update a resource.
* **DELETE**: Removes a resource.

Your favorite programming language probably has a utility or library to make HTTP requests. For the purposes of this section, the cURL utility will be used for examples, which is a command-line utility included with many operating systems by default (as `curl`).

With cURL, the default HTTP method is GET, but you can specify the type of request to make by using the `--request` or `-X` flag; for example, `curl -X POST` will send a POST request instead of a GET request. You may also want to use the `-i` flag to include additional HTTP headers that may be returned as part of the response where relevant.

## Providing parameters {#parameters}

HTTP requests can include additional parameters in various different ways, but most notably, the Mastodon API understands query strings, form data, and JSON.

{{< hint style="info" >}}
Query strings, form data, and JSON submitted via POST body are equally understood by the API. It is expected that query strings are used for GET requests, and form data or JSON is used for all other requests.
{{< /hint >}}

### Query strings {#query-strings}

Request the URL, but append query strings to the end. Query strings can be appended by first typing ? and then appending them in the form of parameter=value. Multiple query strings can be appended by separating them with &. For example:

```bash
curl https://mastodon.example/endpoint?q=test&n=0
```

### Form data {#form-data}

Instead of mutating the URL with query strings, you can send the data separately. With cURL, this is done by passing it with the `--data` or `-d` flag. Data may be sent together similar to query strings, or it may be sent separately as key-value pairs with multiple data flags. You may also use the `--form` or `-F` flag for key-value pairs, which also allows sending multipart data such as files. For example:

```bash
# send raw data as query strings
curl -X POST \
     -d 'q=test&n=0' \
     https://mastodon.example/endpoint
# send raw data separately
curl -X POST \
     -d 'q=test' \
     -d 'n=0' \
     https://mastodon.example/endpoint
# explicit form-encoded; allows for multipart data
curl -X POST \
     -F 'q=test' \
     -F 'n=0' \
     -F 'file=@filename.jpg' \
     https://mastodon.example/endpoint
```

### JSON {#json}

*JavaScript Object Notation* as defined in ECMA-404. Quick one-page overview: https://www.json.org/

Similar to sending form data, but with an additional header to specify that the data is in JSON format. To send a JSON request with cURL, specify the JSON content type with a header, then send the JSON data as form data:

```bash
curl -X POST \
     -H 'Content-Type: application/json' \
     -d '{"parameter": "value"}' \
     https://mastodon.example/endpoint
```

## Data types {#types}

### Multiple values (Array) {#array}

An array parameter must be encoded using bracket notation. For example, `array[]=foo&array[]=bar` would be translated into the following:

```ruby
array = [
  'foo',
  'bar',
]
```

As JSON, arrays are formatted like so:

```json
{
  "array": ["foo", "bar"]
}
```

### Nested parameters (Hash) {#hash}

Some parameters need to be nested. For that, bracket notation must also be used. For example, `source[privacy]=public&source[language]=en` would be translated into:

```ruby
source = {
  privacy: 'public',
  language: 'en',
}
```

As JSON, hashes are formatted like so:

```json
{
  "source": {
    "privacy": "public",
    "language": "en"
  }
}
```

### True-or-false (Booleans) {#boolean}

A boolean value is considered false for the values `0`, `f`, `F`, `false`, `FALSE`, `off`, `OFF`; considered to not be provided for empty strings; and considered to be true for all other values. When using JSON data, use the literals `true`, `false`, and `null` instead.

### Files {#file}

File uploads must be encoded using `multipart/form-data`.

This can be combined with arrays as well.

## How to use API response data {#responses}

The Mastodon REST API will return JSON as the response text. It also returns HTTP headers which may be useful in handling the response, as well as an HTTP status code which should let you know how the server handled the request. The following HTTP status codes may be expected:

- 200 = OK. The request was handled successfully.
- 4xx = Client error. Your request was not correct. Most commonly, you may see 401 Unauthorized, 404 Not Found, 410 Gone, or 422 Unprocessed.
- 5xx = Server error. Something went wrong while handling the request. Most commonly, you may see 503 Unavailable.

