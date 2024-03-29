---
title: プロフィールの設定
description: 新しいアカウントで始めよう。
menu:
  docs:
    weight: 20
    parent: user
---

## あなたの外観 {#appearance}

{{< figure src="assets/image%20%2829%29.png" caption="プロフィールカードでは表示名、アイコン、ヘッダーが表示される" >}}

設定の「プロフィール」を選択して「外観」に移動し、あなたのプロフィールが他の人にどのように見られるかを変更できます。

### 表示名 {#name}

表示名（＝ディスプレイネーム）は他のユーザーにとって、あなたのアドレスの前に表示される名前です。標準では30文字までの表示名を設定できます。

### プロフィール {#bio}

プロフィール（＝バイオ）は、プロフィール部分でメモとして表示される、あなた自身の短い説明です。標準では500文字までのプロフィールを設定できます。

### アイコン {#avatar}

アイコン（＝アバター）は投稿の横に表示され、視覚的にあなたであることを示す情報の一つです。サイズとして2MBまでのPNG、GIF、またはJPG形式の画像をアイコンとしてアップロードできます。この画像は400x400に縮小されます。

### ヘッダー {#header}

ヘッダーは、プロフィールの上部で表示されたり、またディレクトリで使われるプロフィールカードにおいて表示されたりするバナー画像です。サイズとして2MBまでのPNG、GIF、またはJPG形式の画像をヘッダーとしてアップロードできます。この画像は1500x500に縮小されます。

## プロフィールに関するフラグ {#flags}

プロフィールに関するフラグを設定することで、どのようにマストドンを使っているかを、他の人に知らせることができます。

![]({{ relUrl "/assets/image%20%281%29.png" }})

### 承認制アカウント {#locked}

承認制アカウントにすることで、次の2つが引き起こされます。

- 新しいフォロワーを自動的に受け入れなくなります。その代わりに、その新しいフォロワーを手動で承認する必要があります。
- 他のユーザーに対して鍵アイコンを表示し、フォローがすぐに受け入れられないことを知らせます。

### BOTアカウント {#bot}

BOT（ボット）のフラグを有効にすると、BOTアイコンがプロフィールに追加されます。BOTアイコンは、そのプロフィールが自動化された行動を実行したり、そのアカウントを持っている人に監視されていない可能性があったりすることを他の人に知らせます。他のソフトウェアではBOTプロフィールを普通の場合と異なるように取り扱っているかもしれませんが、Mastodonでは現在、視覚的な表示としてのみBOTフラグを取り扱っています。

### ディレクトリ {#discoverable}

ディレクトリ（＝プロフィールディレクトリ）に掲載されることを許可することで、プロフィールを一覧できる機能を通して、あなたのプロフィールを見つけられるようにします。

## プロフィール補足情報 {#fields}

プロフィール補足情報（＝プロフィールメタデータ）は、プロフィール上で簡単に拾い読みできる補足情報を追加する手段です。4つの行を持っていて、そこではラベルとその値を設定できます。例えば、次のように記入できます。

| ラベル | 内容 |
| :--- | :--- |
| 年齢 | 25 |
| 国 | ドイツ |
| 代名詞 | he/him |
| ウェブサイト | https://example.com |

何を書くかは完全にあなた次第です。その内容はメンション、ハッシュタグ、カスタム絵文字、リンクを含められます。

### リンク検証 {#verification}

申請書を元にした検証と青い認証済みのバッジは、中央型の権威なしには不可能です。しかしながらMastodonでは、プロフィールに書いたリンクが本当にあなたの所有であることを証明するために、リンク先のページからもMasotodonのプロフィールにリンクできます。Mastodonからのリンクの一つがすでに知られていて信用できるあなた個人のホームページである場合には、本人確認の次善策として機能させられるでしょう。

プロフィール補足情報にリンクを書くと、Mastodonは、リンクされているページがMastodonのプロフィールにもリンクしているかを確認します。もしそのような場合、Mastodonで書いたリンクの横に検証済みのチェックマークが付きます。これにより、あなたがそのリンクを所有していることを確認できます。

この仕組みの裏側では、リンクされているページに`rel="me"`属性があることをMastodonが確認します。また、Mastodonのプロフィール補足情報のリンクでも`rel="me"`を設定します。

{{< hint style="info" >}}
Mastodonは自己ホスト型であるため、人々がすでに信頼しているあなたのドメインでMastodonをホストすること以上に、あなたの本人確認を行う良い手段はありません。
{{< /hint >}}
