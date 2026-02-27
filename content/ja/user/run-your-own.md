---
title: 自分のサーバーを動かすこと
description:
menu:
  docs:
    weight: 9999
    parent: user
---

## なぜ自分のMastodonサーバーを動かしたいのか？

* 他の人のルールや気まぐれに左右されることなく、インターネット上であなた自身の声を完全に制御できます。あなたのサーバーはあなたの所有物であり、あなたが決めたルールを持っているわけです。そのサーバーはあなたが続けたい限り存続します。
* 自分のサーバー上にいる、あなたは*孤立しません*。他のサーバーにいる人をフォローでき、その人はあなたをフォローできます。そして同じサーバーにいるかのようにメッセージを交換できるのです。
* サーバーにおける登録を唯一あなただけに制限して個人の（マイクロ）ブログのように使うか、または家族や友人のみを招待してコミュニティに利用するか、誰でも登録できるサーバーとして運用するか。それはあなた次第です！

{{< hint style="warning" >}}
公共のインターネットサービスの提供はモデレーション作業やコミュニティ管理をともないます。そのような作業は、あなたのサーバーが大きくなるほど複雑になることに注意してください。
{{< /hint >}}

## そういうわけで、自分のMastodonサーバーを動かしたい

以下があなたに必要なものです。

* **ドメイン名。** これはあなたと他の人があなたのサーバーにアクセスする手段になり、あなたとあなたのユーザーがネットワーク上で識別されるのに必要です。

  * **入手方法：** Namecheap、Gandiなどのドメイン名レジストラのいずれかより。ドメイン名の選択に応じて異なる費用が毎年かかります。
* **VPS。** インターネットに常時接続されていて、Mastodonコードを実行できるところです。

  * **入手方法：** DigitalOcean、Hetzner、Exoscale、Scalewayなどのホスティング事業者のいずれかより。ハードウェアの仕様に応じて異なる費用が毎月または毎年かかります。
* **電子メール事業者**。 Mastodonは登録時の確認リンクとさまざまな通知を電子メールで送信します。自分でSMTPサーバーをホストすることもできますが、サードパーティの事業者を使ったほうが確実でしょう。

  * **入手方法：** Mailgun、SparkPost、Postmark、Sendgridなど、SMTP APIを公開している電子メールホスティング事業者のいずれかより。電子メールの送信量に基づいて毎月費用がかかります。
* 任意：**オブジェクトストレージ事業者。** Mastodonにおいて、あなたやあなたのユーザーがアップロードしたファイルは、そのサーバーが実行されているVPSのハードディスクドライブに保存されます。しかし、ハードディスクドライブは通常無制限に使えませんし、あとでアップグレードすることは難しいです。オブジェクトストレージ事業者は実質的に無制限の従量制ファイルストレージを提供します。

  * **入手方法：** Amazon S3、Exoscale、Wasabi、Google Cloudなど、S3互換またはOpenStack Swift互換のAPIを持っているもの。ファイルの保存量とそれらがアクセスされる頻度に基づいて費用が毎月かかります。

上記の要件のすべてを満たさないかもしれませんが、この多くを処理してくれる**専用のMastodonホスティング事業者**がいくつかあります。技術的なことは他の誰かにすべて処理してもらうことに関心があるなら、ホスティング事業者を選択をしても良いでしょう。こういったホスティング事業者の一部は次のとおりです。ただし通常、あなたのサーバーのドメイン名は別途購入する必要があります。

{{< caption-link url="https://masto.host" caption="Masto.host" >}}

{{< caption-link url="https://hostdon.jp" caption="Hostdon" >}}

{{< caption-link url="https://ossrox.org" caption="Ossrox" >}}

{{< caption-link url="https://weingaertner-it.de" caption="Weingärtner IT" >}}

{{< caption-link url="https://ungleich.ch/u/products/mastodon-hosting/" caption="ungleich.ch" >}}

{{< caption-link url="https://fedihost.co/" caption="FediHost" >}}

{{< caption-link url="https://qoddi.com/mastodon" caption="Qoddi App Platform" >}}

{{< caption-link url="https://www.saasweb.net/de/managed-hosting/managed-mastodon-server" caption="SaaS Web" >}}

{{< caption-link url="https://webape.site" caption="WebApe" >}}

マネージドホスティングによるサーバー構築と管理は、ソフトウェアのインストールとメンテナンスの経験がないとか、またはそういったことを望まない人にとって最適です。もちろん、自分で用意したハードウェア上でサーバーを構成すれば、スケーリング、パフォーマンス、およびカスタマイズをより細かく制御できます。

訳注：大規模組織向けにMastodon gGmbHによるフルマネージドサービスも提供され始めました。「[Your fully-managed Mastodon service](https://joinmastodon.org/hosting)」ページと、[その紹介ブログ](https://blog.joinmastodon.org/2025/09/service-offerings-from-mastodon/)を参照してください。

Mastodonは、水平方向へのスケールに優れています。もし一台のマシンで処理しきれないほどの需要が出てきた場合、Mastodonは複数のアプリサーバー、バックグラウンドワーカー、複数のRedisバックエンド、そしてPostgreSQLのレプリカに分割することも可能です。ただし、それはワンクリックインストールのような簡単さでは実現できません。

もしMastodonをインストールすることに興味がある場合は、次の手順に進んでください。

{{< page-ref page="admin/prerequisites" >}}

{{< hint style="info" >}}
**［翻訳状態］** 以降、日本語にまだ訳されていないため、英語版の「Running Mastodon」の「[Preparing your machine](../../en/admin/prerequisites/)」に進んでください。
{{< /hint >}}

