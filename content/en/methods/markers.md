---
title: markers API methods
description: Save and restore your position in timelines.
menu:
  docs:
    weight: 30
    name: markers
    parent: methods-timelines
    identifier: methods-markers
aliases: [
  "/methods/markers",
  "/api/methods/markers",
  "/methods/timelines/markers",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## Get saved timeline positions {#get}

```http
GET /api/v1/markers HTTP/1.1
```

Get current positions in timelines.

**Returns:** Hash of timeline key and associated [Marker]({{< relref "entities/Marker" >}})\
**OAuth:** User token + `read:statuses`\
**Version history:**\
3.0.0 - added

#### Request

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Query parameters

timeline[]
: Array of String. Specify the timeline(s) for which markers should be fetched. Possible values: `home`, `notifications`. If not provided, an empty object will be returned.

#### Response
##### 200: OK

A request with `?timeline[]=home&timeline[]=notifications`

```json
{
  "notifications": {
    "last_read_id": "35098814",
    "version": 361,
    "updated_at": "2019-11-26T22:37:25.239Z"
  },
  "home": {
    "last_read_id": "103206604258487607",
    "version": 468,
    "updated_at": "2019-11-26T22:37:25.235Z"
  }
}
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

---

## Save your position in a timeline {#create}

```http
POST /api/v1/markers HTTP/1.1
```

Save current position in timeline.

**Returns:** [Marker]({{< relref "entities/marker" >}})\
**OAuth:** User token + `write:statuses`\
**Version history:**\
3.0.0 - added

#### Request

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Form data parameters

home[last_read_id]
: String. ID of the last status read in the home timeline.

notifications[last_read_id]
: String. ID of the last notification read.

#### Response
##### 200: OK

Calling this API with home[last_read_id] causes a marker to be created for the home timeline.

```json
{
  "home": {
    "last_read_id": "103194548672408537",
    "version": 462,
    "updated_at": "2019-11-24T19:39:39.337Z"
  }
}
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

### 409: Conflict

If object is stale while being updated, an error will occur.

```json
{
  "error": "Conflict during update, please try again"
}
```

---

## See also

{{< page-relref ref="methods/timelines#home" caption="GET /api/v1/timelines/home (with `min_id` or `since_id` parameter)" >}}

{{< page-relref ref="methods/notifications#get" caption="GET /api/v1/notifications (with `min_id` or `since_id` parameter)" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/markers_controller.rb" caption="app/controllers/api/v1/markers_controller.rb" >}}
