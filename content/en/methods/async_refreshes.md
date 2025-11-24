---
title: Experimental async refreshes API methods
description: Methods concerning async refreshes
menu:
  docs:
    weight: 20
    name: async_refreshes
    parent: methods
    identifier: methods-async-refreshes
aliases: [
  "/methods/async_refreshes",
  "/api/methods/async_refreshes"
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

{{< hint style="warning" >}}
This page documents API endpoints that are not finalized. We plan to use this for several different use-cases but so far have only implemented one. We also do not yet use it in our mobile apps. As such, requirements might still change. We also welcome feedback from third-party developers.
Once we declare this API as stable and move it, we will keep this endpoint around for one additional version, so consumers have time to migrate to the stable endpoint.
{{</ hint >}}

## Get Status of Async Refresh {#show}

```http
GET /api/v1_alpha/async_refreshes/:id HTTP/1.1
```

Sometimes an API request might not return the expected results or not all possible results as either a background job is already running to (re-)create these results or the request triggers a background job to create or fetch results.

Examples of this are timelines that need to be re-created (which takes some time) and search or other requests that trigger fetching additional results from remote servers in the background.

In all of these cases, the API response MAY include an additional header:

```http
Mastodon-Async-Refresh: id="<string>", retry=<int>, result_count=<int>
```

The `retry` key includes a number of second the client SHOULD at least wait until retrying the same endpoint OR querying this one.

The key `result_count` is optional. If present it includes a number of results that have already been fetched as part of this ongoing async refresh.

Using the `id`, the client can query this endpoint here to get the current status of this async refresh.

The `status` of an async refresh is either `running` or `finished`. For some async refreshes, like a timeline re-generation, this information is sufficient to decide to either wait some more or refresh the timeline. Other kinds of async refreshes may optionally include a key `result_count` that includes a number of new results already generated or fetched. Depending on this number, the client can decide to refetch the resource, wait some more, or do nothing. I.e. a `finished` job with a `result_count` of `0` means that the job has finished but yielded nothing new. Refreshing is not necessary in this case.

Please note that the asynchronous nature of background jobs can lead to race conditions. Also the fact that some async refreshes might be user-agnostic while the fetched data is not, might mean that while new data is fetched, it will not be suitable for the current user. For example a background could be triggered to fetch new replies to a post. New replies could exist but the current usr might have blocked their authors.

For those reasons the `AsyncRefresh` can only ever serve as an indicator of when it could be worthwhile for a client to request new data. In the general case there is no guarantee that new data will be served.

**Returns:** [AsyncRefresh]({{< relref "entities/AsyncRefresh" >}})\
**OAuth:** User token + `read`\
**Version history:**\
4.4.0 - added

### Request

#### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user_token>` to gain authorized access to this API method.

### Response

#### 200: OK

```json
{
  "async_refresh": {
    "id": "ImNvbnRleHQ6MTEzNjQwNTczMzAzNzg1MTc4OnJlZnJlc2gi--c526259eb4a1f3ef0d4b91cf8c99bf501330a815",
    "status": "running",
    "result_count": 2
  }
}
```

#### 404: Not found

```json
{
  "error": "Not Found"
}
```

---

## See also

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1_alpha/async_refreshes_controller.rb" caption="app/controllers/api/v1_alpha/async_refreshes_controller.rb" >}}
