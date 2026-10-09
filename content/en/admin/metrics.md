---
title: Monitoring & Metrics for your server
descriptions: Metrics available to help with monitoring
menu:
  docs:
    weight: 100
    parent: admin
---

Mastodon provides various metrics to help you monitor the performance and load
of

## Web & Sidekiq Metrics

Mastodon uses the [NSA gem](https://github.com/localshred/nsa) to collect
various metrics for the Web and Sidekiq processes. If configured by setting the
[`STATSD_ADDR`](/admin/config#statsd) environment variable, the metrics are
published to statsd under the [`STATSD_NAMESPACE`](/admin/config#statsd)
namespace.

The following metrics are available:

### Controllers

| Type      | Name                                                      | Description |
| --------- | --------------------------------------------------------- | ----------- |
| Timing    | `web.{controller}.{action}.{format}.total_duration`       |             |
| Timing    | `web.{controller}.{action}.{format}.db_time`              |             |
| Timing    | `web.{controller}.{action}.{format}.view_time`            |             |
| Increment | `web.{controller}.{action}.{format}.status.{status_code}` |             |

### Database:

| Type   | Name                                             | Description |
| ------ | ------------------------------------------------ | ----------- |
| Timing | `db.tables.{table_name}.queries.delete.duration` |             |
| Timing | `db.tables.{table_name}.queries.insert.duration` |             |
| Timing | `db.tables.{table_name}.queries.select.duration` |             |
| Timing | `db.tables.{table_name}.queries.update.duration` |             |

### Cache:

| Type   | Name                       | Description |
| ------ | -------------------------- | ----------- |
| Timing | `cache.delete.duration`    |             |
| Timing | `cache.exist?.duration`    |             |
| Timing | `cache.fetch_hit.duration` |             |
| Timing | `cache.generate.duration`  |             |
| Timing | `cache.read_hit.duration`  |             |
| Timing | `cache.read_miss.duration` |             |
| Timing | `cache.read_miss.duration` |             |

### Sidekiq:

| Type      | Name                                    | Description |
| --------- | --------------------------------------- | ----------- |
| Timing    | `sidekiq.{worker_name}.processing_time` |             |
| Increment | `sidekiq.{worker_name}.success`         |             |
| Increment | `sidekiq.{worker_name}.failure`         |             |
| Gauge     | `sidekiq.queues.{queue_name}.enqueued`  |             |
| Gauge     | `sidekiq.queues.{queue_name}.latency`   |             |
| Gauge     | `sidekiq.dead_size`                     |             |
| Gauge     | `sidekiq.enqueued`                      |             |
| Gauge     | `sidekiq.failed`                        |             |
| Gauge     | `sidekiq.processed`                     |             |
| Gauge     | `sidekiq.processes_size`                |             |
| Gauge     | `sidekiq.retry_size`                    |             |
| Gauge     | `sidekiq.scheduled_size`                |             |
| Gauge     | `sidekiq.workers_size`                  |             |

## Streaming

The streaming server reports metrics via a prometheus metrics endpoint located
at `/metrics` on the streaming server. In order to collect these metrics, you'll
need to make a request directly to the streaming server.

The following metrics are available:

| Type      | Name                      | Description                                                                                                                    |
| --------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Gauge     | pg_pool_total_connections | The total number of clients existing within the postgresql pool                                                                |
| Gauge     | pg_pool_idle_connections  | The number of clients which are not checked out but are currently idle in the postgresql pool                                  |
| Gauge     | pg_pool_waiting_queries   | The number of queued requests waiting on a postgresql client when all clients are checked out                                  |
| Gauge     | connected_clients         | The number of clients connected to the streaming server, these are labelled with the type of connection: `http` or `websocket` |
| Gauge     | connected_channels        | The number of Redis channels the streaming server is subscribed to                                                             |
| Histogram | streaming_latency         | The time delta between when an event is published to redis from Ruby and when the streaming server processes that event        |
