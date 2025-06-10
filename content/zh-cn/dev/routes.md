---
title: 路由
description: HTTP 方法如何映射到控制器与操作。
menu:
  docs:
    weight: 40
    parent: dev
---

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/config/routes.rb" caption="config/routes.rb" >}}

## 路由说明 {#routes}

Mastodon 使用 Ruby on Rails，它在 config/routes.rb 中定义其路由配置。本页只解释 Mastodon 如何处理路由的基础知识，你可以查看 [Ruby on Rails 路由指南](https://guides.rubyonrails.org/routing.html) 以获取更详细的信息。

### 路由的构建方式 {#router}

`namespace` 是映射到特定控制器目录的路由的前缀。`resources` 映射到该命名空间目录中的控制器。`scope` 传递到 `module` 的控制器。例如，考虑以下缩写代码：

{{< code title="config/routes.rb 摘录" >}}
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

第一个可用的资源是 :statuses，它嵌套在 :api 和 :v1 命名空间下。因此，生成的 HTTP 路由将是 /api/v1/statuses。`only` 定义某些允许的方法，这些方法将在 `app/controllers/api/v1/statuses_controller.rb` 的控制器中定义。

在 /api/v1/statuses 中，有一个模块 :statuses 的作用域，其中定义了其他资源。这些资源的控制器位于 `app/controllers/api/v1/statuses/` 中。例如，:favourite 将由 `app/controllers/api/v1/statuses/favourites_controller.rb` 中的 #create 操作处理，而 :unfavourite 将由同一控制器中的 #destroy 操作处理。

还为该作用域内的任何 `member` 定义了一个自定义方法，或者换句话说，对于任何要由 `app/controllers/api/v1/statuses_controller.rb` 控制的状态，该方法都映射到 GET /api/v1/statuses/:id/context 并且由该控制器中定义的 :context 操作处理。

### 可用方法 {#methods}

#### :index

映射到 HTTP GET，用于列出。由控制器中的 #index 操作处理。

#### :show

映射到 HTTP GET，用于显示单个视图。由控制器中的 #show 操作处理。

#### :create

映射到 HTTP POST。由控制器中的 #create 操作处理。

#### :update

映射到 HTTP PUT。由控制器中的 #update 操作处理。

#### :destroy

映射到 HTTP DELETE。由控制器中的 #destroy 操作处理。

## .well-known {#well-known}

### /.well-known/host-meta {#host-meta}

可扩展资源描述符 (XRD)。 声明 Webfinger 的存在。

### /.well-known/nodeinfo {#nodeinfo}

映射到 `/nodeinfo/2.0` 的 NodeInfo 2.0 端点，用于声明软件名称和版本、协议、使用统计信息以及是否开放注册。

### /.well-known/webfinger {#webfinger}

用于发现 ActivityPub 行为体 ID。有关更多信息，请查看 [对 &gt; WebFinger 的合规性说明]({{< relref "spec/webfinger" >}})。

### /.well-known/change-password {#change-password}

映射到帐户设置页面。

### /.well-known/keybase-proof-config {#keybase}

用于与 Keybase 集成，定义哪些用户名可接受以及可以在哪里检查证明。

{{< hint style="warning" >}}
以下部分正在建设中。
{{< /hint >}}

## 公开 URI {#public}

* `/users/username` = 用户 URI
* `/users/username/remote_follow` = 外站关注对话框
* `/users/username/statuses/id` = 嘟文 URI
* `/@username` = “嘟文”选项卡
* `/@username/with_replies` = “嘟文与回复”选项卡
* `/@username/media` = “媒体”选项卡
* `/@username/tagged/:hashtag` = 用户标记的嘟文
* `/@username/:status_id` = 嘟文永久链接
* `/@username/:status_id/embed` = 可嵌入版本
* `/interact/:status_id` = 外站交互对话框
* `/explore` = 用户目录
* `/explore/:hashtag` = 简介中包含此标签的用户
* `/public` = 公共时间线预览
* `/about` = 落地页
* `/about/more` = 详细描述
* `/terms` = 服务条款

## API {#api}

* /api/oembed
* /api/proofs
* /api/v1
  * [statuses]({{< relref "methods/statuses" >}}) [create, show, destroy]
    * reblogged_by [index]
    * favourited_by [index]
    * reblog [create]
    * unreblog [POST reblog#destroy]
    * favourite [create]
    * unfavourite [POST favourites#destroy]
    * bookmark [create]
    * unbookmark [POST bookmarks#destroy]
    * mute [create]
    * unmute [POST mutes#destroy]
    * pin [create]
    * unpin [POST pins#destroy]
    * context [GET]
  * [timelines]({{< relref "methods/timelines" >}})
    * home [show]
    * public [show]
    * tag [show]
    * list [show]
  * [streaming]({{< relref "methods/streaming" >}}) [index]
  * [custom_emojis]({{< relref "methods/custom_emojis" >}}) [index]
  * [suggestions]({{< relref "methods/suggestions" >}}) [index, destroy]
  * [scheduled_statuses]({{< relref "methods/scheduled_statuses" >}}) [index, show, update, destroy]
  * [preferences]({{< relref "methods/preferences" >}}) [index]
  * [conversations]({{< relref "methods/conversations" >}}) [index, destroy]
    * read [POST]
  * [media]({{< relref "methods/media" >}}) [create, update]
  * [blocks]({{< relref "methods/blocks" >}}) [index]
  * [mutes]({{< relref "methods/mutes" >}}) [index]
  * [favourites]({{< relref "methods/favourites" >}}) [index]
  * [bookmarks]({{< relref "methods/bookmarks" >}}) [index]
  * [reports]({{< relref "methods/reports" >}}) [create]
  * [trends]({{< relref "methods/trends" >}}) [index]
  * [filters]({{< relref "methods/filters" >}}) [index, create, show, update, destroy]
  * [endorsements]({{< relref "methods/endorsements" >}}) [index]
  * [markers]({{< relref "methods/markers" >}}) [index, create]
  * [apps]({{< relref "methods/apps" >}}) [create]
    * verify_credentials [credentials#show]
  * [instance]({{< relref "methods/instance" >}}) [show]
    * peers [index]
    * activity [show]
  * [domain_blocks]({{< relref "methods/domain_blocks" >}}) [show, create, destroy]
  * [directory]({{< relref "methods/directory" >}}) [show]
  * [follow_requests]({{< relref "methods/follow_requests" >}}) [index]
    * authorize [POST]
    * reject [POST]
  * [notifications]({{< relref "methods/notifications" >}}) [index, show]
    * clear [POST]
    * dismiss [POST]
  * [accounts]({{< relref "methods/accounts" >}})
    * verify_credentials [GET credentials#show]
    * update_credentials [PATCH credentials#update]
    * search [show (search#index)]
    * relationships [index]
  * [accounts]({{< relref "methods/accounts" >}}) [create, show]
    * statuses [index accounts/statuses]
    * followers [index accounts/follower_accounts]
    * following [index accounts/following_accounts]
    * lists [index accounts/lists]
    * identity_proofs [index accounts/identity_proofs]
    * follow [POST]
    * unfollow [POST]
    * block [POST]
    * unblock [POST]
    * mute [POST]
    * unmute [POST]
    * pin [POST]
    * unpin [POST]
  * [lists]({{< relref "methods/lists" >}}) [index, create, show, update, destroy]
    * accounts [POST accounts/pins#destroy]
  * [featured_tags]({{< relref "methods/featured_tags" >}}) [index, create, destroy]
    * suggestions [GET suggestions#index]
  * [polls]({{< relref "methods/polls" >}}) [create, show]
    * votes [create polls/votes]
  * [push]({{< relref "methods/push" >}})
    * subscription [create, show, update, destroy]
  * [admin]({{< relref "methods/admin" >}})
    * accounts [index, show]
      * enable [POST]
      * unsilence [POST]
      * unsuspend [POST]
      * approve [POST]
      * reject [POST]
      * action [create account_actions]
    * reports [index, show]
      * assign_to_self [POST]
      * unassign [POST]
      * reopen [POST]
      * resolve [POST]
* /api/v2
  * [search]({{< relref "methods/search" >}}) [GET search#index]

{{< translation-status-zh-cn raw_title="Routes" raw_link="/dev/routes/" last_translation_time="2025-04-21" raw_commit="6addd5cf525adec1859f48c52dafcfe1f96e558a">}}
