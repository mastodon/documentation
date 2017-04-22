Frequently Asked Questions
==========================

#### What is a Mastodon?

A prehistoric animal, predecessor of the mammoth. Goes "toot."

#### Why the name Mastodon?

There's a progressive metal band with the same name that I'm a fan of that brought the animal to my attention. I thought it's a pretty cool name/animal.

#### How exactly is it decentralized?

There are different ways in which something can be decentralized; in this case, Mastodon is the "federated" kind. Think e-mail, not BitTorrent. There are different servers (instances), users have an account on one of them, but can interact and follow each other regardless of where their account is.

#### Technically, how does the federation work?

We are using the OStatus suite of protocols:

1. Webfinger for user-on-domain lookup
2. Atom feeds with ActivityStreams, Portable Contacts, Threads extensions for the actual content
3. PubSubHubbub for subscribing to Atom feeds
4. Salmon for delivering certain items from the Atom feeds to interested parties such as the mentioned user, author of the status being replied to, person being followed, etc

#### What is mastodon.social?

The "flagship" instance of Mastodon, aka the server I run myself with the latest code. It's not supposed to be the only instance in the end.

#### What else is part of the federated network?

Let's call it the "fediverse". It has existed for a longer while, populated by GNU social servers, Friendica, Hubzilla, Diaspora etc. Not every one of those servers is fully compatible with every other. Mastodon strives to be fully standards-compliant and compatibility with GNU social is higher in priority than the others.

#### I tried logging into a GNU social client app with Mastodon and it didn't work, why?

While Mastodon is compatible with GNU social in terms of server to server communication, the client to server API (aka how you access Mastodon) is different. Therefore, client apps that were made for specifically GNU social will not work with Mastodon. The reason for this is half technical, half ideological.

Because Mastodon has been created from a blank slate, it is much simpler to have the API mirror internal structures as closely as possible, rather than build an emulation layer. Secondly, the GNU social client API is actually a half-way implementation of the legacy Twitter API - that's the reason why it works with some older Twitter client apps. However, many of those apps are not maintained anymore, the GNU social API does not actually keep up with the real Twitter API and never fully implemented all its features; at the same time, the Twitter API was never meant for a federated service and so obscures some of the functionality.


#### How is Mastodon funded?

Development of Mastodon and hosting of mastodon.social is funded through my [Patreon (also BTC/PayPal donations)](https://www.patreon.com/user?u=619786). Beyond that, I am not interested in VC funding, monetizing, advertising, or anything of that sort. I could offer setup/maintenance services on demand.

The software is free and open source and communities should host their own servers if they can, that way the costs are more or less distributed. Obviously it'd be hard for me to pay the bills if literally everyone decided to use the mastodon.social instance only.

#### What’s a “federation”?
It’s a group of mastodon servers that share toots with each other.

#### What’s an “instance”?
It’s a server that you can have an account on. Each has its own policies, because they can be run by anyone!

#### How many people signed up for Mastodon? Can I see a chart of user counts over time?
Sure, you can follow [@mastodonusercount@social.lou.lt](https://social.lou.lt/@mastodonusercount).

#### How do you really spell “mast–don”?
It’s **mastodon** with two Os. You will get it wrong at least once.

#### How do I get this on Android?
Try [Tusky](https://play.google.com/store/apps/details?id=com.keylesspalace.tusky).

#### On Android, I really want multiple account support.
Try [TootyFruity](https://play.google.com/store/apps/details?id=ch.kevinegli.tootyfruity221258).

#### How do I get this on iPhone?
Try [Amaroq](https://itunes.apple.com/us/app/amaroq-for-mastodon/id1214116200). Also, Safari might be a choice.

#### Can Tusky do ‘💇’? How about feature “🔥”? And what’s with Tusky’s “⛱”?
You can follow or contact Tusky at [@Tusky@mastodon.social](https://mastodon.social/@Tusky), or the developers [@Vavassor@mastodon.social](https://mastodon.social/@Vavassor) and [@daycode@mastodon.social](https://mastodon.social/@daycode)

#### How do I search?
You can search for people and hashtags, but not general text. Use the box above the tooting area.

![Search Box](https://octodon.social/media/fytp1Gxgo13W-Gtx0LM)

#### How do I DM (Direct Message)?"
Click on the **globe** beneath your toot for privacy options, including DM.

#### I don’t get the local vs. federated timeline thing.
“Local” toots are from the server you signed up at. “Federated” are the all the toots your server knows about. (It's complicated, but short version is: “toots from people that you and other locals follow.”)

#### What’s trending?
Follow the esteemed [@TrendingBot@mastodon.social](https://mastodon.social/@TrendingBot).

#### What’s “CW”?
“CW” stands for “Content Warning.” You can use it to hide your toot, like a spoiler.

#### What’s with the pineapples?
They’re tasty, and they make people smile. Just go with it.

#### How do I delete my account?
At the moment, you will have to toot the admin of your instance for help on that one.

#### Who is my admin, and how do I contact/follow them?
Click on **Getting Started**, then **Extended Information**. An info page displays. Hopefully, they put their contact information in there!

![Getting Started](https://octodon.social/media/TKlZpSNRRcHBOEFNlGs) ![Extended Information](https://octodon.social/media/D7bfl1NYzNy4XIT8nLs) ![Info Page](https://octodon.social/media/zvoI8yUt4uurZcKqFRk)

#### Wow, I keep seeing offensive stuff from a particular instance, is there a way to block *all* of it?
Not without a lot of clicking, sorry. But, your instance admin can do it! Please contact her.

#### How do I get verified with a “✅”?
“✅” is an emoji, *only* for lulz. There is no verification on Mastodon. You can copy and paste “✅” into your bio if you wish, you cheeky monkey.

#### Can I edit a toot?
No, sorry. But you could delete and rewrite...

#### How do I view my favorite toots?
Click "Getting Started," then "Favourites."

![img](http://octodon.social/media/KKVbLbEdqa22oNNKQYg "Getting Started") ![img](https://octodon.social/media/wYG2bD7bAAplgZKkwH8 "Favourites")

#### Can I quote a toot?
Not currently. You must manually copy and paste the text to quote it.

#### If my instance shuts down forever, do I lose my data?
Yes you do.

#### Can I save my data?
Yes, some of it! It‘s under **Preferences->Data export**

![Data Export](https://octodon.social/media/Qkn_ELLQqCjZhWI5NQo)

#### I can’t see toots of a remote user under their bio!
Click their avatar pic. This will take you directly to their instance, which displays all their public toots.

#### How do I see threads?
Click the toot body for **Expanded View**. This will show threads the toot’s connected to.

#### How do I link to toots?
Click the toot body for a **Expanded View**. Right-click on the **date beneath** the toot for a permalink.

#### How do I link to my bio?
In Firefox, right-click on your avatar picture. Select **Copy link location**.

![URL Bio](https://octodon.social/media/1K7gKcZIY1D_tYnwvj0)

#### Does clicking a #hashtag show  local results, or federated?
Federated.

#### When I mute a boost, who gets muted, the booster or the original author?
The original author.

#### Can I preview the people on an instance, and what they’re saying?
Yes, try the excellent [instance preview tool](http://www.unmung.com/mastoview?url=mastodon.social&view=local).
	
#### How do I hide the toots of languages I don’t understand?
The developers are working on this and other filtering options, stay tuned!

#### Is automatic translation supported?
Not yet, but there is a [Firefox TamperMonkey script](https://github.com/tomouchuu/mastodon-translate) that might work for you.
	
#### Do toots automatically broadcast federated, or stay local?
By default, toots are federated (public), and will show on both timelines. You can change the default behavior through **Settings->Preferences->Post Privacy.**

![Settings](https://octodon.social/media/kQB46sQCKN654Q-DOCY) ![Preferences](https://octodon.social/media/gtUtLEA_li6UlaqzOh8)![Post Privacy](https://octodon.social/media/f0euT4bv0Es5h-gMbg8)

#### I found a bug or have a suggestion for Mastodon.
You can file a bug or submit suggestions at [Mastodon’s Issue Tracker.](https://github.com/tootsuite/mastodon/issues) 

#### Hey I love mastodon FAQs! Can I have more?
Here’s more, from hardworking individuals trying to help, too.

* [https://hastebin.com/raw/xuqogukimu](https://hastebin.com/raw/xuqogukimu)

* [https://github.com/ThomasLeister/masto-faq](https://github.com/ThomasLeister/masto-faq)

* [http://mastoguide.info/Pages/FAQindex.html](http://mastoguide.info/Pages/FAQindex.html)

* [https://medium.com/tebelorg/my-first-10-days-on-mastodon-fediverse-f6f1d73db8d7](https://medium.com/tebelorg/my-first-10-days-on-mastodon-fediverse-f6f1d73db8d7)

* [https://github.com/tootsuite/documentation/blob/master/Using-Mastodon/FAQ.md](https://github.com/tootsuite/documentation/blob/master/Using-Mastodon/FAQ.md)
