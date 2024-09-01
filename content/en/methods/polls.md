---
title: polls API methods
description: >-
  View and vote on polls attached to statuses. To discover poll ID, you will
  need to GET a Status first and then check for a `poll` property.
menu:
  docs:
    weight: 20
    name: polls
    parent: methods-statuses
    identifier: methods-polls
aliases: [
  "/methods/polls",
  "/api/methods/polls",
  "/methods/statuses/polls",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## View a poll {#get}

```http
GET /api/v1/polls/:id HTTP/1.1
```

View a poll attached to a status.

**Returns:** [Poll]({{< relref "entities/poll" >}})\
**OAuth:** Public if parent status is public. User token + `read:statuses` if parent status is private.\
**Version history:**\
2.8.0 - added

#### Request

##### Path parameters

:id
: {{<required>}} String. The ID of the Poll in the database.

##### Headers

Authorization
: Provide this header with `Bearer <user token>` to gain authorized access to this API method.

#### Response
##### 200: OK

```json
{
  "id": "34830",
  "expires_at": "2019-12-05T04:05:08.302Z",
  "expired": true,
  "multiple": false,
  "votes_count": 10,
  "voters_count": null,
  "voted": true,
  "own_votes": [
    1
  ],
  "options": [
    {
      "title": "accept",
      "votes_count": 6
    },
    {
      "title": "deny",
      "votes_count": 4
    }
  ],
  "emojis": []
}
```

##### 404: Not found

Poll does not exist, or poll's parent status is private

```json
{
  "error": "Record not found"
}
```

---

## Vote on a poll {#vote}

```http
POST /api/v1/polls/:id/votes HTTP/1.1
```

Vote on a poll attached to a status.

**Returns:** [Poll]({{< relref "entities/poll" >}})\
**OAuth:** User token + `write:statuses`\
**Version history:**\
2.8.0 - added

#### Request

##### Path parameters

:id
: {{<required>}} String. The ID of the Poll in the database.

##### Headers

Authorization
: {{<required>}} Provide this header with `Bearer <user token>` to gain authorized access to this API method.

##### Form data parameters

choices[]
: {{<required>}} Array of Integer. Provide your own votes as an index for each option (starting from 0).

#### Response
##### 200: OK

Poll was voted on

```json
{
  "id": "34873",
  "expires_at": "2019-12-05T11:16:17.426Z",
  "expired": false,
  "multiple": true,
  "votes_count": 5,
  "voters_count": null,
  "voted": true,
  "own_votes": [
    0,
    2,
    4,
    9,
    6
  ],
  "options": [
    {
      "title": "option 0",
      "votes_count": 1
    },
    {
      "title": "option 1",
      "votes_count": 0
    },
    {
      "title": "option 2",
      "votes_count": 1
    },
    {
      "title": "option 3",
      "votes_count": 0
    },
    {
      "title": "option 4",
      "votes_count": 1
    },
    {
      "title": "option 5",
      "votes_count": 0
    },
    {
      "title": "option 6",
      "votes_count": 1
    },
    {
      "title": "option 7",
      "votes_count": 0
    },
    {
      "title": "option 8",
      "votes_count": 0
    },
    {
      "title": "option 9",
      "votes_count": 1
    }
  ],
  "emojis": []
}
```

##### 401: Unauthorized

Invalid or missing Authorization header.

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

Poll does not exist, or poll's parent status is private

```json
{
  "error": "Record not found"
}
```

##### 422: Unprocessable entity

The poll has expired

```json
{
  "error": "Validation failed: The poll has already ended"
}
```

Alternatively, you have already voted

```json
{
  "error": "Validation failed: You have already voted on this poll"
}
```

---

## See also

{{< page-relref ref="methods/statuses#create" caption="POST /api/v1/statuses (`poll` parameter)" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/polls_controller.rb" caption="app/controllers/api/v1/polls_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/polls/votes_controller.rb" caption="app/controllers/api/v1/polls/votes_controller.rb" >}}
