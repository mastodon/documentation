---
title: Routes
description: How HTTP methods map to controllers and actions.
menu:
  docs:
    weight: 40
    parent: dev
---



{{< caption-link url="https://github.com/tootsuite/mastodon/blob/master/config/routes.rb" caption="config/routes.rb" >}}

## Explanation of routes

Mastodon uses Ruby on Rails, which defines its router configuration at config/routes.rb. You may view the [Ruby on Rails routing guide](https://guides.rubyonrails.org/routing.html) for more detailed information, but this page will explain the basics of how Mastodon handles routing.

### How routes are constructed

`namespace` is a prefix for routes mapped to a certain controller directory. `resources` are mapped to controllers within that namespace directory. `scope` passes to the `module`'s controller. For example, consider the following abbreviated code:

{{< code title="config/routes.rb excerpt" >}}
```ruby
namespace :api do
    namespace :v1 do
        resources :statuses, only [:create, :show, :destroy] do
            scope module: :statuses do
                resource :favourite, only: :create
                resource :unfavourite, to: 'favourites#destroy'
                member do
                    get :context
                end
            end
        end
    end
end
```
{{< /code >}}

The first available resource is :statuses, which is nested under the :api and :v1 namespaces. Thus, the resulting HTTP route will be /api/v1/statuses. The `only` defines certain allowed methods, which are to be defined in the controller at `app/controllers/api/v1/statuses_controller.rb`.

Within /api/v1/statuses, there is a scope for a module :statuses, where additional resources are defined. The controllers for these resources live in `app/controllers/api/v1/statuses/`. For example, :favourite will be handled by the \#create action within `app/controllers/api/v1/statuses/favourites_controller.rb` and :unfavourite will be handled within the same controller, but by the \#destroy action.

There is also a custom method defined for any `member` within this scope, or in other words, for any status to be controlled by `app/controllers/api/v1/statuses_controller.rb`, which is mapped to GET /api/v1/statuses/:id/context and handled by the :context action defined within that controller.

### Available methods

#### :index

Maps to HTTP GET, for a list. Handled by the \#index action in a controller.

#### :show

Maps to HTTP GET, for a single view. Handled by the \#show action in a controller.

#### :create

Maps to HTTP POST. Handled by the \#create action in a controller.

#### :update

Maps to HTTP PUT. Handled by the \#update action in a controller.

#### :destroy

Maps to HTTP DELETE. Handled by the \#destroy action in a controller.

## .well-known

### /.well-known/host-meta

Extensible Resource Descriptor \(XRD\). Advertises existence of Webfinger.

### /.well-known/nodeinfo

Maps to NodeInfo 2.0 endpoint at `/nodeinfo/2.0`, used for advertising software name and version, protocols, usage statistics, and whether registrations are open.

### /.well-know/webfinger

Used for discovering ActivityPub actor id. See [Spec compliance &gt; WebFinger]({{< relref "../spec/webfinger.md" >}}) for more information.

### /.well-known/change-password

Maps to account settings page.

### /.well-known/keybase-proof-config

Used for integration with Keybase, defining which usernames are acceptable and where proofs may be checked.

{{< hint style="warning" >}}
The sections below this point are under construction.
{{< /hint >}}

## Public URIs

* `/users/username` = user URI
* `/users/username/remote_follow` = remote follow dialog
* `/users/username/statuses/id` = status URI
* `/@username` = "toots" tab
* `/@username/with_replies` = "toots and replies" tab
* `/@username/media` = "media" tab
* `/@username/tagged/:hashtag` = tagged statuses by user
* `/@username/:status_id` = status permalink
* `/@username/:status_id/embed` = embeddable version
* `/interact/:status_id` = remote interaction dialog
* `/explore` = profile directory
* `/explore/:hashtag` = profiles with this hashtag in bio
* `/public` = public timeline preview
* `/about` = landing page
* `/about/more` = extended description
* `/terms` = terms of service

## API

* /api/oembed
* /api/proofs
* /api/v1
  * [statuses]({{< relref "../methods/statuses/" >}}) \[create, show, destroy\]
    * reblogged\_by \[index\]
    * favourited\_by \[index\]
    * reblog \[create\]
    * unreblog \[POST reblog\#destroy\]
    * favourite \[create\]
    * unfavourite \[POST favourites\#destroy\]
    * bookmark \[create\]
    * unbookmark \[POST bookmarks\#destroy\]
    * mute \[create\]
    * unmute \[POST mutes\#destroy\]
    * pin \[create\]
    * unpin \[POST pins\#destroy\]
    * context \[GET\]
  * [timelines]({{< relref "../methods/timelines/" >}})
    * home \[show\]
    * public \[show\]
    * tag \[show\]
    * list \[show\]
  * [streaming]({{< relref "../methods/timelines/streaming.md" >}}) \[index\]
  * [custom\_emojis]({{< relref "../methods/instance/custom_emojis.md" >}}) \[index\]
  * [suggestions]({{< relref "../methods/accounts/suggestions.md" >}}) \[index, destroy\]
  * [scheduled\_statuses]({{< relref "../methods/statuses/scheduled_statuses.md" >}}) \[index, show, update, destroy\]
  * [preferences]({{< relref "../methods/accounts/preferences.md" >}}) \[index\]
  * [conversations]({{< relref "../methods/timelines/conversations.md" >}}) \[index, destroy\]
    * read \[POST\]
  * [media]({{< relref "../methods/statuses/media.md" >}}) \[create, update\]
  * [blocks]({{< relref "../methods/accounts/blocks.md" >}}) \[index\]
  * [mutes]({{< relref "../methods/accounts/mutes.md" >}}) \[index\]
  * [favourites]({{< relref "../methods/accounts/favourites.md" >}}) \[index\]
  * [bookmarks]({{< relref "../methods/accounts/bookmarks.md" >}}) \[index\]
  * [reports]({{< relref "../methods/accounts/reports.md" >}}) \[create\]
  * [trends]({{< relref "../methods/instance/trends.md" >}}) \[index\]
  * [filters]({{< relref "../methods/accounts/filters.md" >}}) \[index, create, show, update, destroy\]
  * [endorsements]({{< relref "../methods/accounts/endorsements.md" >}}) \[index\]
  * [markers]({{< relref "../methods/timelines/markers.md" >}}) \[index, create\]
  * [apps]({{< relref "../methods/apps/" >}}) \[create\]
    * verify\_credentials \[credentials\#show\]
  * [instance]({{< relref "../methods/instance/" >}}) \[show\]
    * peers \[index\]
    * activity \[show\]
  * [domain\_blocks]({{< relref "../methods/accounts/domain_blocks.md" >}}) \[show, create, destroy\]
  * [directory]({{< relref "../methods/instance/directory.md" >}}) \[show\]
  * [follow\_requests]({{< relref "../methods/accounts/follow_requests.md" >}}) \[index\]
    * authorize \[POST\]
    * reject \[POST\]
  * [notifications]({{< relref "../methods/notifications/" >}}) \[index, show\]
    * clear \[POST\]
    * dismiss \[POST\]
  * [accounts]({{< relref "../methods/accounts/" >}})
    * verify\_credentials \[GET credentials\#show\]
    * update\_credentials \[PATCH credentials\#update\]
    * search \[show \(search\#index\)\]
    * relationships \[index\]
  * [accounts]({{< relref "../methods/accounts/" >}}) \[create, show\]
    * statuses \[index accounts/statuses\]
    * followers \[index accounts/follower\_accounts\]
    * following \[index accounts/following\_accounts\]
    * lists \[index accounts/lists\]
    * identity\_proofs \[index accounts/identity\_proofs\]
    * follow \[POST\]
    * unfollow \[POST\]
    * block \[POST\]
    * unblock \[POST\]
    * mute \[POST\]
    * unmute \[POST\]
    * pin \[POST\]
    * unpin \[POST\]
  * [lists]({{< relref "../methods/timelines/lists.md" >}}) \[index, create, show, update, destroy\]
    * accounts \[POST accounts/pins\#destroy\]
  * [featured\_tags]({{< relref "../methods/accounts/featured_tags.md" >}}) \[index, create, destroy\]
    * suggestions \[GET suggestions\#index\]
  * [polls]({{< relref "../methods/statuses/polls.md" >}}) \[create, show\]
    * votes \[create polls/votes\]
  * [push]({{< relref "../methods/notifications/push.md" >}})
    * subscription \[create, show, update, destroy\]
  * [admin]({{< relref "../methods/admin.md" >}})
    * accounts \[index, show\]
      * enable \[POST\]
      * unsilence \[POST\]
      * unsuspend \[POST\]
      * approve \[POST\]
      * reject \[POST\]
      * action \[create account\_actions\]
    * reports \[index, show\]
      * assign\_to\_self \[POST\]
      * unassign \[POST\]
      * reopen \[POST\]
      * resolve \[POST\]
* /api/v2
  * [search]({{< relref "../methods/search.md" >}}) \[GET search\#index\]

