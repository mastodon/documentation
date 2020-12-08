---
title: Korzystanie z funkcjonalności sieci
description: Obserwuj i rozmawiaj z osobami z dowolnego serwera.
menu:
  docs:
    weight: 40
    parent: user
---

## Przeglądanie zawartości z publicznych osi czasu {#timelines}

{{< figure src="/assets/image%20%2830%29.png" caption="Wpisy na publicznej osi czasu" >}}


To allow you to discover potentially interesting content, Mastodon provides a way to browse all public posts. Well, there is no global shared state between all servers, so there is no way to browse _all_ public posts. When you browse the **federated timeline**, you see all public posts that the server you are on knows about. There are various ways your server may discover posts, but the bulk of them will be from people that other users on your server follow.

There is a way to filter the federated timeline to view only public posts created on your server: The **local timeline**. Mind that “local” here refers to the server, not to a geographical location.

## Interakcje z wpisami użytkowników {#actions}

{{< figure src="/assets/image%20%2821%29.png" caption="Rozszerzony widok może zostać załadowany po kliknięciu na wpis w osi czasu." >}}

You can perform quick actions on a post directly from the timeline, or you can click on the post to load an expanded view that shows extra information, such as a full timestamp, interaction counts, and threaded replies, if any. The following actions can be performed on a post:

* **Reply** to a post by clicking the arrow icon. Your toot will show up in the thread below the post you are replying to.
* **Boost** a post by clicking the cycled-arrow icon. The post will be reshared on your profile.
* **Favourite** a post by clicking the star icon. The post will be added to your favourites list, and a favourite notification will be delivered to its author.
* **Bookmark** a post by clicking the ribbon icon. The post will be privately added to your bookmarks list without generating a notification.
* Access a **menu** of additional options by clicking the ellipsis icon.

## Powiadomienia {#notifications}

{{< figure src="/assets/image%20%2850%29.png" caption="Kolumna powiadomień" >}}

When other people interact with you or your posts, you will receive a notification depending on the type of the event. Your notifications column allows you to view all notifications in the same stream, or to filter for specific types of notifications:

* **Mentions:** received when someone has mentioned you in a post.
* **Favourites:** received when someone has favourited one of your posts.
* **Boosts:** received when someone has boosted one of your posts.
* **Polls:** Received when a poll that you have voted in or created has ended.
* **Follows:** Received when someone has followed your profile.

## Obserwowanie profilów {#follow}

![](/assets/image%20%2811%29.png)

As long as you encounter a person within your app’s user interface, e.g. the web interface on your home server, or your mobile app, you can just click “follow” and you won’t notice a difference if that person is on your server or not.

Jeśli jednak przeglądasz czyiś publiczny profil z poziomu innego serwera, jest jedna przeszkoda — serwer widzi Cię jako anonimowego odwiedzającego. Nie przejmuj się! Możesz po prostu skopiować odnośnik do tego profilu lub jednego z jego wpisów i wkleić ten adres w pole wyszukiwania.

Jeżeli przeglądasz publiczny profil z innego serwera Mastodona, przeczytaj [Korzystanie z Mastodona zewnętrznie](../external/#interact).

## Wyszukiwanie {#search}

{{< figure src="/assets/image%20%2819%29.png" caption="Możliwość wyszukiwania jest dostępna na pasku bocznym." >}}

Podstawowe wyszukiwanie na Mastodonie pozwala zalogowanym użytkownikom na znalezienie wpisów zawierających określony hashtag, lub załadowanie użytkownika bądź wpisu znając adres jego profilu lub adres URL. Wyszukiwanie słowa wyświetli profile, których nazwy użytkowników lub nazwy wyszukiwania zawierają je, oraz hashtagi spełniające to kryterium.

{{< figure src="/assets/image%20%2839%29.png" caption="Przykład wpisu ładowanego bezpośrednio z adresu URL." >}}

{{< figure src="/assets/image%20%2823%29.png" caption="Przykład konta uzyskanego z wyszukiwania wyrazu „cats”." >}}

{{< figure src="/assets/image%20%2827%29.png" caption="Przykład hashtagu uzyskanego z wyszukiwania „cats”." >}}

Administratorzy mogą dodatkowo zainstalować wyszukiwanie pełnego tekstu. Wyszukiwanie pełnego tekstu na Mastodonie pozwala zalogowanym użytkownikom na wyszukiwanie wyników z własnych wpisów, własnych polubień, zakładek i wspomnień. Celowo nie pozwala na wyszukiwanie dowolnych wierszy znaków w całej bazie danych, aby ograniczyć możliwość nadużywania ten funkcji przez osoby szukające kontrowersyjnych treści do dogpilingu.

Obsługiwane są następujące operatory:

* **"pełne wyrażenie"** will try to find the term inside the quote marks. This allows looking only for direct matches, such as `"look at my cluckers"` to find posts explicitly telling you to look at someone's cluckers.
* **-wyklucz** will exclude the term prepended by a minus sign. This allows filtering out certain terms, such as `animals -cats` to find posts about animals without posts about cats.
* **+uwzględnij** will include the term after the plus sign. This allows searching for multiple terms that must be included, such as `cat +dog` to find posts about both cats and dogs.

## Rozmowy bezpośrednie {#direct}

{{< figure src="/assets/image%20%2812%29.png" caption="Lista konwersacji zawierających wiadomości bezpośrednie." >}}

Na Mastodonie, wiadomości bezpośrednie to po prostu wpisy o bezpośredniej widoczności. Widoczność może być wybrana dla poszczególnych wpisów, co pozwala na zmianę poziomu prywatności w późniejszym momencie w wątku. Kolumna wiadomości bezpośrednich wyświetla obecnie listę wszystkich konserwacji zawierających wiadomość bezpośrednią. Kliknięcie konwersacji załaduje powiązany wątek. 

{{< figure src="/assets/image%20%2857%29.png" caption="Wiadomość bezpośrednia w wątku." >}}

## Osie czasu list {#lists}

Listy są podzbiorami Twojej osi czasu. Możesz utworzyć listę, nadać jej nazwę i dodać do niej użytkowników, których obserwujesz.

![](/assets/image%20%2828%29.png)

Otwarcie listy załaduje jej oś czasu. Osie czasu listy zawierają wyłącznie wpisy członków tej listy, oraz odpowiedzi do Ciebie lub innych członków tej listy.

{{< figure src="/assets/image%20%285%29.png" caption="Oś czasu listy" >}}

