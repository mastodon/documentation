Frequently Asked Questions
==========================

> Translations of this FAQ:
>
> * [Español](FAQ_ESP.md)
> * [日本語](FAQ_JA.md)
> * [Polish](FAQ_PL.md)
> * [Français](FAQ_FR.md)

## Terminology

#### What is a Mastodon?

A prehistoric animal, predecessor of the mammoth. Essentially a fluffy elephant. Goes "toot."

#### Why the name Mastodon?

It's pretty metal. (There's a progressive metal band with the same name)

#### What is a “federation”?
It’s a group of Mastodon servers whose users can talk to each other seamlessly.

#### What is an “instance”?
It’s a server that you can have an account on. Each has its own policies, because they can be run by anyone!

#### How do you really spell “mast–don”?
It’s **mastodon** with two Os. You will get it wrong at least once.

#### I don’t get the local vs. federated timeline thing.
“Local” toots are from the server you signed up at. “Federated” are the all the toots your server knows about. (It's complicated, but short version is: “toots from people that you and other locals follow.”)

#### What is the “fediverse”?
Federated universe. The network of compatible social media servers such as Mastodon, Friendica, Hubzilla, Kroeg, PeerTube and more. Typically if you've got one account on a server in the fediverse, you can follow and befollowed by folks from other servers.

## Federation

#### How exactly is Mastodon decentralized?

There are different ways in which something can be decentralized; in this case, Mastodon is the "federated" kind. Think e-mail, not BitTorrent. There are different servers (instances), users have an account on one of them, but can interact and follow each other regardless of where their account is.

#### Technically, how does the federation work?

Since Mastodon version 1.6 we use the [ActivityPub](https://www.w3.org/TR/activitypub/) protocol. Currently ActivityPub is a proposed W3C standard. Mastodon still supports OStatus for compatibility purposes.

#### What else is part of the federated network?

The network ("fediverse") has existed before Mastodon, populated by GNU social servers, Friendica, Hubzilla, Diaspora etc. Not every one of those servers is fully compatible with every other. Mastodon is compatible with other software that implements the ActivityPub protocol, and with some software that implements OStatus. Notable recent additions to the network are PeerTube and Kroeg.

#### How many people signed up for Mastodon? Can I see a chart of user counts over time?
Two independent volunteers track statistics of the Mastodon network by crawling public APIs of known instances:

- [instances.social](https://instances.social)'s table of user counts: <https://instances.social/list/old> 
- [mnm.social](https://mnm.social)'s graph of user growth: <https://dashboards.mnm.social/dashboard/db/user-growth?orgId=1>

These should be taken as an estimate since all stats are voluntary and collection is based on discovery (Mastodon servers do not submit any stats anywhere automatically).

## Organization

#### How is Mastodon funded?

Development of Mastodon and hosting of mastodon.social is funded through [Patreon](https://www.patreon.com/mastodon) and [Liberapay](https://liberapay.com/Mastodon/). Beyond that, the project is not interested in VC funding, monetizing, advertising, or anything of that sort.

The software is free and open source and communities should host their own servers if they can, that way the costs are more or less distributed. Many instances have their own Patreon and Liberapay pages, among other community funding methods.

## Personal Use

#### This looks a lot like Twitter, what’s the difference?
Mastodon is decentralized. Anyone can run a Mastodon server, under their own community rules. Twitter is run by a central authority, and sets the rules for everyone.

#### How should I choose which instance to use?
[Many instances exist](https://joinmastodon.org/#getting-started) for almost every interest. It's okay to try a couple of public ones while looking for one that feels right. Talking about your interests on a public instance like [Mastodon.social](https://mastodon.social) may help you get invited to other instances.

You will find a preview of what the federated timeline of an instance looks like on their frontpage. Alternatively, to preview what an instance is saying, use [this preview tool](http://www.unmung.com/mastoview?url=mastodon.social&view=local) created by [Kevin Marks](https://mastodon.social/@kevinmarks).

#### How do I get this on Android?
If you use Chrome or Firefox for Android, you can add Mastodon to your homescreen. It will act as a native app in many ways including push notifications. Alternatively, try [Tusky](https://play.google.com/store/apps/details?id=com.keylesspalace.tusky), [Mastalab](https://play.google.com/store/apps/details?id=fr.gouv.etalab.mastodon) or [Tootdon](http://tootdon.club/).

#### How do I get this on iPhone?
Try [Amaroq](https://itunes.apple.com/us/app/amaroq-for-mastodon/id1214116200).

#### Are there other mobile/desktop/CLI apps?
[Yep.](Apps.md)

#### How do I search?
You can search for people and hashtags, but not general text. Use the box above the tooting area. If you are on the mobile layout, click the pen in the navigation.

#### How do I DM (Direct Message)?"
Click on the **globe** beneath your toot for privacy options, including "direct" (DM).

#### Are there instances that my instance doesn't federate with? How do I know?
Some instances are private and will not federate with your instance. Others may be blocked by your instance. To find out more about how your instance federates, ask your admin.

#### Can I have more than one account? Can I use the same email on different instances?
Yes and yes! If you find another instance you would like to join, sign up! Note that not all instances are open to new registrations and it’s possible that someone has already taken your preferred username.

#### Can I import the people I follow to another instance?
Yes. This may take time depending on the instance you move to. Talk to the admin of your new instance if you have difficulties.

#### How do I prevent people from impersonating me?
Because anyone can create a username on any instance, it is impossible to prevent others from using the same username on another instance. Some people have taken to running their own single-user instance to verify themselves, or use [Keybase](https://keybase.io/).

#### How do I enable Two-factor Authentication?
The option will be in Preferences under Two-factor Authentication. [Mastodon's 2FA](2FA.md) uses both a QR code and plain-text secrets.

#### Why can't I see someone's toots?
This could occur for several reasons. A person's posts may be private. You must be a follower of a private account to see their non-public posts. Additionally, if someone has blocked you, you will no longer see any of their posts.

#### What’s trending?
Trending topics are not currently officially tracked.

#### What’s “CW”?
“CW” stands for “Content Warning.” You can use it to hide your toot's text and image behind a warning, like a spoiler.

#### How does the “Mark Image as Sensitive” feature work (“NSFW”)?
When you add a picture to your post using the camera icon, an additional toggle will appear that looks like a crossed out eye. Clicking this will hide your image behind a "Sensitive Content" warning, preventing others from seeing your images until they click on them.

#### What’s with the pineapples?
They’re tasty, and they make people smile. Just go with it.

#### I see “Awoo” a lot, what does that mean?
Try saying it out loud. It’s fun!

#### How do I delete my account?
Click the Settings cog in the top left corner of the app, and select Security. From there, select "delete account". **Deleting an account is irreversible. The username will remain permanently unavailable.**

#### Who is my admin, and how do I contact/follow them?
Click on **Getting Started**, then **Extended Information**. An info page displays. If that information was configured by the admin, it will show up there.

#### Wow, I keep seeing offensive stuff from a particular instance, is there a way to block *all* of it?
Open the profile of anyone from that instance and click on the ellipsis (“…”) and choose "hide everything from domain".

#### Is Mastodon moderated?
Each instance handles moderation differently, and each has their own moderators. It’s okay to ask what the rules are for the instance you are on. Usually the rules are posted on the instance's about page ([like the “more” page at Mastodon.social](https://mastodon.social/about/more))

#### How do I report offensive content?
Beneath each post, you will see three dots. Clicking on those will allow you to expand a post or report the content. When reporting content, select all posts that need moderator attention.

#### How do I handle harassment?
If your admin takes harassment seriously, you can report it to them through the post-reporting system. This can be found through the ellipsis (“…”) beneath the post, or by contacting your admin directly.

#### Will my Private Messages reach people on other instances?
Private (followers-only) and direct messages will definitely reach people on Mastodon instances of version 1.6 and higher. They will not be sent to servers that only implement OStatus. You are unlikely to encounter such servers however.

#### What does “Adjust Status Privacy” mean and how does it work?
The **globe** icon under the toot area adjusts your status privacy by changing who can see your posts. This is what happens:

| Privacy setting | Broadcasted to | Viewable by | Notes |
| --------------- | ----------- | ------ | ----- |
| Public          | Public timelines | Everyone | On your instance, it will appear on all timelines. It will also appear on federated and hashtag timelines of instances where you have followers. |
| Unlisted        | Followers only | Everyone | |
| Private         | Followers only |  Followers only | Cannot be boosted. Mentioned people will also receive a copy. |
| Direct          | Mentioned people only  | Mentioned people only | Cannot be boosted |

#### Can I use hashtags? Should I?
Yes! Hashtags are tracked and are often fun, but some tags help people avoid triggering posts. This is especially appreciated on public posts of #POLITICS, #HEALTH, #DEPRESSION, or #LEWD OR #NSFW topics. Such posts are also what the Content Warning system was designed for.

#### How do I get verified with a “✅”?
“✅” is an emoji, *only* for laughs. There is no verification on Mastodon, as verification in the traditional sense would require a central authority. You can copy and paste “✅” into your bio if you wish, but it does nothing. If you want to really assert your identity, link to your Mastodon profile from another website where your identity is already established, or use Keybase for cryptographic verification.

#### Can I edit a toot?
No, sorry. But you could delete your toot and rewrite…

#### If I delete a post, does it get deleted everywhere?
Deleting a post propagates to the same places where the original post went. As a rule, it means yes, it gets deleted everywhere. There can be network delays and processing delays. Under rare circumstances a copy could remain somewhere, especially if the post was public.

#### How do I view my favorite toots?
From the Getting Started menu, click **Favourites**. If your Getting Started menu isn't open, that's the Asterisk (\*) icon in the navigation.

#### Can I quote a toot?
No. It's possible to link to toots like to any webpage, but we believe that the quote feature encourages toxic behaviour so it's deliberately omitted.

#### If my instance shuts down forever, do I lose my data?
Yes, you do.

#### Can I save my data?
Yes, some of it! It‘s under **Preferences->Data export**

#### I can’t see toots of a remote user under their bio!
If you are looking at their profile from the expanded view, click their avatar. This will take you directly to their instance, which displays all their public toots. Alternatively, opening any link of their username in a new tab will likewise take you there.

#### How do I see threads?
Click the toot body, or alternatively, select "expand toot" from the dropdown underneath. This will show the conversation the toot is part of.

#### How do I link to toots?
The date & time (sometimes relative time, such as "2m", that is, "2 minutes ago") of a toot always links to the public page ("permalink") of the toot. Right click it and copy location.

#### How do I link to my profile?
You can right-click your avatar or username and copy the location. The links typically look like `https://domain.tld/@username`

#### Does clicking a #hashtag show local results, or federated?
The hashtag timeline is essentially a filtered federated timeline.

#### When I mute a boost, who gets muted, the booster or the original author?
The original author. You can mute boosts from someone you follow from their profile.

#### Can I preview the people on an instance, and what they’re saying?
Yes, the frontpage of every instance has a timeline preview, unless disabled by their admin.

#### How do I hide the toots of languages I don’t understand?
Open preferences and select all languages you don't want to see. Keep in mind that language detection is automated and therefore imperfect, you may still see some toots you don't understand, that does not mean the filters don't work.

#### Is automatic translation supported?
Not yet, but there is a [Firefox TamperMonkey script](https://github.com/tomouchuu/mastodon-translate) that might work for you.

#### Do toots automatically broadcast federated, or stay local?
The primary function of Mastodon is delivering your toots to your followers. Your toots do not leave your server unless you have followers from other servers, in which case they go to those specific servers. There are other cases, such as when you address a message to someone from another server without them needing to be your follower. Mastodon does not discriminate between local and remote followers. However, the "federated" and "local" timelines you can browse display only toots with the "public" privacy setting. Choosing the "unlisted" or lower privacy setting will opt your toot out of those timelines. Similarly, an unlisted toot would not show up in a hashtag timeline even if you used that hashtag in the toot. 

#### What is the default image upload size limit?
The limit is 8 megabytes.

#### What types of files can be uploaded?
PNG, JPEG, GIF images, as well as WebM and MP4 videos. A GIF will be automatically converted to soundless MP4 which will behave like a GIF in the UI. Similarly, a soundless WebM or MP4 video will also act as a GIF in the UI.

#### How do I start my own instance?
See the [User Guide](../README.md), under the heading “Running Mastodon.”

#### I found a bug or have a suggestion for Mastodon.
You can file a bug or submit suggestions at [Mastodon’s Issue Tracker.](https://github.com/tootsuite/mastodon/issues)

## Hey I love mastodon FAQs! Can I have more?
Here’s more, from hardworking individuals trying to help, too.

* <https://gist.github.com/joyeusenoelle/74f6e6c0f349651349a0df9ae4582969>
* <https://hastebin.com/raw/xuqogukimu>
* <https://github.com/ThomasLeister/masto-faq>
* <http://mastoguide.info/Pages/FAQindex.html](http://mastoguide.info/Pages/FAQindex.html>
* <https://medium.com/tebelorg/my-first-10-days-on-mastodon-fediverse-f6f1d73db8d7>

---

This FAQ was compiled with contributions from [@Gargron](https://mastodon.social/@Gargron), [@raccoon](https://mastodon.social/@Raccoon), [@upside](https://octodon.social/@upside), [@zacanger](https://mastodon.social/@zacanger), [@NthTensor](https://octodon.social/@NthTensor), [@ametlles](https://mastodon.social/@ametlles) and many others in the fediverse!
