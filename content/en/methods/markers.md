---
title: markers
description: Save and restore your position in timelines.
menu:
  docs:
    weight: 30
    parent: methods-timelines
aliases: [/methods/timelines/markers/]
---

## Get saved timeline positions {#get}

```http
GET https://mastodon.example/api/v1/markers HTTP/1.1
```

**Returns:** Marker\
**OAuth:** User token + `read:statuses`\
**Version history:**\
3.0.0 - added

#### Request

##### Headers

Authorization 
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Query parameters

timeline
: {{<required>}} Array of String. Specify the timeline(s) for which markers should be fetched. Possible values: `home`, `notifications`. If not provided, an empty object will be returned.

#### Response
##### 200: Success

timeline\[\] = \["home", "notifications"\]

```javascript
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

```javascript
{
  "error": "The access token is invalid"
}
```

---

## Save your position in a timeline {#create}

```http
POST https://mastodon.example/api/v1/markers HTTP/1.1
```

**Returns:** Marker\
**OAuth:** User token + `write:statuses`\
**Version history:**\
3.0.0 - added

#### Request

##### Headers

Authorization 
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Form data parameters

home\[last_read_id\]
: String. ID of the last status read in the home timeline.

notifications\[last_read_id\]
: String. ID of the last notification read.

#### Response
##### 200: Success

Calling this API with home\[last_read_id\] causes a marker to be created for the home timeline.

```javascript
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

```javascript
{
  "error": "The access token is invalid"
}
```

### 409: Conflict

If object is stale while being updated, an error will occur.

```javascript
{
  "error": "Conflict during update, please try again"
}
```

---

## See also

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/markers_controller.rb" caption="app/controllers/api/v1/markers_controller.rb" >}}