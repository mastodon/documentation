---
title: Reports API
menu:
  docs:
    parent: api
    weight: 10
---

## POST /api/v1/reports

Report an account.

### Resource information

{{< api_method_info auth="Yes" user="Yes" scope="write write:reports" version="0.0.0" >}}

### Parameters

|Name|Description|Required|Default|
|----|-----------|:------:|:-----:|
| `account_id` | The ID of the account to report | Required ||
| `status_ids` | The IDs of statuses to report as array | Optional ||
| `comment` | Reason for the report (up to 1,000 characters) | Optional ||
