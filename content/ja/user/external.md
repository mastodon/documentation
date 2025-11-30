---
title: 外部でのMastodonの使用
description: 外部のアプリやウェブサイトからMastodonを閲覧して操作できます。
menu:
  docs:
    weight: 90
    parent: user
---

## 別のMastodonのサイト上での操作 {#interact}

Mastodonが動いている別のサイトを閲覧しているときに返信やブースト、お気に入りのボタンをクリックすると、あなたが登録しているMastodonのサイトにその操作をリダイレクトするためのダイアログが表示されます。

{{< figure src="assets/external-reply.gif" caption="別のMastodonのサイトに表示されている投稿に対して返信するために、ダイアログ上であなたが登録しているMastodonのサイトのドメインを入力している様子" >}}

## クライアントアプリでのログイン {#apps}

Mastodonのアカウントがあれば、Mastodon APIを実装しているどんなアプリにもログインできます。そのようなアプリの一覧は、[https://joinmastodon.org/apps](https://joinmastodon.org/apps)に掲載されています。

訳注：このほか、Mastodonの公開投稿（ひかえめな公開を含む）は外部サイトに埋め込むことができます。投稿の詳細ニューから「埋め込み」を選ぶと、HTMLの埋め込みコードを取得できます。そのコードを外部のHTMLサイトに記述することで、投稿を外部サイトに表示できます。

