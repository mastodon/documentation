---
title: Rate limits
summary: Defining how often you can call the REST API
menu:
  docs:
    weight: 30
    parent: api
---

## Headers

Rate limit information is returned in the response headers:

`X-RateLimit-Limit`
: Number of requests permitted per time period

`X-RateLimit-Remaining`
: Number of requests you can still make

`X-RateLimit-Reset`
: Timestamp when your rate limit will reset

{{< hint style="info" >}}
An API method can be subject to multiple overlapping rate limits. The headers return information about the one you are closest to exceeding.
{{</ hint >}}

## Limits

By default, the following limits are hardcoded:

### Per account

All endpoints and methods can be called 300 times within 5 minutes.

#### Uploading media

`POST /api/v1/media` can be called 30 times within 30 minutes.

#### Deleting statuses

Either `DELETE /api/v1/statuses/:id` or `POST /api/v1/statuses/:id/unreblog` can be called 30 times within 30 minutes.

### Per IP

All endpoints and methods can be called 300 times within 5 minutes.

#### Creating accounts

`POST /api/v1/accounts` can be called 5 times within 30 minutes.
