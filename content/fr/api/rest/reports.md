---
title: Reports
menu:
  docs:
    parent: rest-api
    weight: 10
---

## POST /api/v1/reports

Report an account.

### Resource information

{{< api_method_info auth="Yes" user="Yes" scope="write write:reports" version="1.1.0" >}}

### Parameters

|Name|Description|Required|
|----|-----------|:------:|
| `account_id` | The ID of the account to report | Required |
| `status_ids` | The IDs of statuses to report as array | Optional |
| `comment` | Reason for the report (up to 1,000 characters) | Optional |
| `forward` | Whether to forward to the remote admin (in case of a remote account) | Optional |
