---
title: Radzenie sobie zniechcianą treścią
description: Kontroluj co zobaczysz, dla bardziej przyjaznego doświadczenia.
menu:
  docs:
    weight: 50
    parent: user
---

## Filtrowanie wpisów {#filters}

Możliwe jest filtrowanie wpisów według określonych słów kluczowych lub fraz, aby były automatycznie ukrywane.

{{< figure src="/assets/image%20%2848%29.png" caption="Przykład aktywnych filtrów dla różnych słów kluczowych w różnych kontekstach." >}}

Aby utworzyć i zarządzać filtrami, odwiedź Preferencje &gt; Filtry. Przycisk „Dodaj nowy filtr” pozwoli na utworzenie nowego filtru, a istniejące filtry mogą zostać edytowane lub usunięte. Istniejące filtry są podsumowane w tabeli.

{{< figure src="/assets/image%20%2814%29.png" caption="Filtry mogą mieć datę wyczerpania, określone konteksty, usuwanie po stronie serwera lub używać granic słów." >}}

Filtry mają następujące opcje:

### Słowa kluczowe lub frazy {#filter-phrase}

To ciąg znaków który jest sprawdzany. Słowo kluczowe będzie wyszukiwane w zawartości wpisu, uwzględniając CW, opisy mediów i opcje ankiet.

### Wygasanie po czasie {#filter-expire}

Opcjonalnie możesz zastosować filtr tylko na określony okres czasu. Wygaśnięte filtry nie są automatycznie usuwane, ale mogą być włączone ponownie, ustawiając nową datę wygaśnięcia \(lub wyłączając wygasanie\).

### Kontekst filtrów {#filter-context}

Wybierz gdzie zostanie zastosowany filtr:
Choose where the filter will be applied:
* Home timeline and lists = matching statuses will be removed from your home feed and lists
* Notifications = matching notifications will not be shown
* Public timelines = matching statuses will not appear in local/federated timelines
* Conversations = matching statuses will be hidden in threads and detailed views

### Usuwanie zamiast ukrywania {#filter-drop}

Filtering is usually done client-side, so that disabling a filter will cause filtered statuses to be visible again. However, if you enable "drop instead of hide", any matching statuses will be disappear completely and will never be delivered to your home or notifications.

### Całe słowa {#filter-whole}

Filters normally apply to any status that contains the included characters, regardless of whether they are in the middle of a word. Enabling "whole word" will only apply the filter if the keyword is surrounded by spaces or other non-alphanumeric characters.

## Działania po stronie użytkownika {#blocking-and-muting}

{{< figure src="/assets/image%20%2824%29.png" caption="The user dropdown menu offers various actions." >}}

### Ukrywanie udostępnień {#hide-boosts}

If you hide boosts from someone, you won’t see their boosts in your home feed. This option only appears on users who you are currently following.

### Wyciszanie {#mute}

{{< figure src="/assets/image%20%2852%29.png" caption="Sample of muted accounts." >}}

When muting, you have the option to mute notifications from them or not. Muting without muting notifications hides the user from your view:

* You won’t see the user in your home feed
* You won’t see other people boosting the user
* You won’t see other people mentioning the user
* You won’t see the user in public timelines

If you choose to also mute notifications from them, you will additionally not see notifications from that user.

The user has no way of knowing they have been muted.

### Blokowanie {#block}

{{< figure src="/assets/image%20%2836%29.png" caption="Sample of blocked accounts." >}}

Blocking hides a user from your view:

* You won’t see the user in your home feed
* You won’t see other people boosting the user
* You won’t see other people mentioning the user
* You won’t see the user in public timelines
* You won’t see notifications from that user

Additionally, on the blocked user’s side:

* The user is forced to unfollow you
* The user cannot follow you
* The user won’t see other people’s boosts of you
* The user won’t see you in public timelines

If you and the blocked user are on the same server, the blocked user will not be able to view your posts on your profile while logged in.

### Ukrywanie całego serwera {#hide-domain}

![](/assets/image%20%2861%29.png)

If you hide an entire server:

* You will not see posts from that server on the public timelines
* You won’t see other people’s boosts of that server in your home feed
* You won’t see notifications from that server
* You will lose any followers that you might have had on that server

## Zgłaszanie nieodpowiedniej treści moderatorom {#report}

{{< figure src="/assets/image%20%283%29.png" caption="The report modal allows selecting example statuses, adding a note, and forwarding reports." >}}

If you see a status or user that is violating the rules of your website, you can report that user to your site's moderators. Clicking the "report" option on the user dropdown or status dropdown will open the report modal. Here, you can \(and should\) add a note about why you are reporting this account. You can attach certain problematic statuses for additional context on why you are reporting the account, and if their conduct is violating the rules of the remote website, you can also choose to forward the report to their site's moderators.

