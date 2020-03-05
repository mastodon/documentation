---
title: Rate limits
description: Defining how often you can hit the REST API
menu:
  docs:
    weight: 20
    parent: api
---

Rate limit information is returned in the response headers:

|Header|Description|
| :--- | :--- |
|`X-RateLimit-Limit`|Number of requests permitted per time period|
|`X-RateLimit-Remaining`|Number of requests you can still make|
|`X-RateLimit-Reset`|Timestamp when your rate limit will reset|

{{< hint style="info" >}}
Mind that an API method can be subject to multiple overlapping rate limits. The headers return information about the one you are closest to exceeding.
{{</ hint >}}

Here is a list of various rate limits:

|Endpoint|Bucket|Time period|Limit|Limit type|
| :--- | :--- | :--- | :--- | :--- |
|`* /api/*`|Account access|5 minutes|300|Account|
|`* /api/*`|IP access|5 minutes|300|IP|
|`POST /api/v1/accounts`|App sign-up|30 minutes|5|IP|
|`POST /api/v1/media`|Uploading|30 minutes|30|Account|
|`DELETE /api/v1/statuses/:id`|Deletion|30 minutes|30|Account|
|`POST /api/v1/statuses/:id/unreblog`|Deletion|30 minutes|30|Account|
