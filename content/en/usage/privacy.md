---
title: Privacy
menu:
  docs:
    parent: usage
    weight: 1
---

## Publishing levels

|Level|Public timelines|Permalink|Profile view|Home feeds|
|-----|:--------------:|:-------:|:----------:|:--------:|
|Public|<i class="fa fa-check"></i>|<i class="fa fa-check"></i>|<i class="fa fa-check"></i>|<i class="fa fa-check"></i>|
|Unlisted|<i class="fa fa-times"></i>|<i class="fa fa-check"></i>|<i class="fa fa-check"></i>|<i class="fa fa-check"></i>|
|Private|<i class="fa fa-times"></i>|<i class="fa fa-times"></i>|<i class="fa fa-times"></i>|<i class="fa fa-check"></i>|
|Direct|<i class="fa fa-times"></i>|<i class="fa fa-times"></i>|<i class="fa fa-times"></i>|<i class="fa fa-times"></i>|

No matter which level, every mentioned user can see the message in their notifications.

## Account locking

To effectively publish private (followers-only) posts, you must lock your account--otherwise, anyone could follow you to view older posts. Locking your account on Mastodon does one thing: Adds an authorization step to the process of following you.

Once locked, before someone can become your follower, you will receive a follow request, which you can either accept or reject.

Please mind that post privacy on Mastodon is per-post, rather than account-wide, and as such there is no way to instantly make past public posts private.

## Blocking and muting
### Hiding boosts

If you hide boosts from someone, you won't see their boosts in your home feed.

### Muting

When muting, you have the option to mute notifications from them or not. Muting without muting notifications hides the user from your view:

- You won't see the user in your home feed
- You won't see other people boosting the user
- You won't see other people mentioning the user
- You won't see the user in public timelines

If you choose to also mute notifications from them, you will additionally not see notifications from that user.

The user has no way of knowing they have been muted.

### Blocking

Blocking hides a user from your view:

- You won't see the user in your home feed
- You won't see other people boosting the user
- You won't see other people mentioning the user
- You won't see the user in public timelines
- You won't see notifications from that user

Additionally, on the blocked user's side:

- The user is forced to unfollow you
- The user cannot follow you
- The user won't see other people's boosts of you
- The user won't see you in public timelines

If you and the blocked user are on the same server, the blocked user will not be able to view your posts on your profile while logged in.

### Hiding an entire server

If you hide an entire server:

- You will not see posts from that server on the public timelines
- You won't see other people's boosts of that server in your home feed
- You won't see notifications from that server
- You will lose any followers that you might have had on that server
