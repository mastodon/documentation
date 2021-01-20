---
title: Więcej ustawień
description: Zaproś nowych użytkowników, przeglądaj kontakty i zabezpiecz swoje konto.
menu:
  docs:
    weight: 80
    parent: user
---

## Tworzenie zaproszeń {#invites}

{{< figure src="/assets/pl/invites.png" caption="Zaproś ludzi z ustawień swojego konta" >}}

Zaproszenia mogą być generowane, aby udostępniać je innym osobom, a niektóre serwery mogą wymagać zaproszenia do założenia konta. Przy generowaniu odnośnika zapraszającego, możesz określić maksymalną liczbę użyć odnośnika lub jak długo będzie on aktywny. Odnośniki z zaproszeniami mogą być dezaktywowane w każdym momencie.

## Obserwacje i obserwujący {#relationships}

{{< figure src="/assets/relationships.jpg" caption="Wzajemni obserwujący, którzy nie przenieśli konta, sortowani według daty ostatniej aktywności" >}}

W ustawieniach możesz znaleźć stronę zarządzania relacjami, pozwalającą na filtrowanie i sortowanie profili, z którymi jesteś połączony(-a), według różnych kryteriów:

* **Relacje:** czy konto obserwuje Cię, jest obserwowane przez Ciebie, lub wzajemnie się obserwujecie.
* **Stan konta:** czy konto jest obecnie oznaczone jako przekierowujące na inne.
* **Aktywność konta:** czy konto publikowało jakieś wpisy w ciągu ostatniego miesiąca.

Możesz wybrać które osoby chcesz przestać obserwować lub usunąć z obserwujących, zaznaczając ich i klikając na odpowiedni przycisk w nagłówku tabeli.

## Ustawienia konta {#account}

Z ustawień konta możesz zmienić swój adres e-mail, ustawić nowe hasło, unieważnić aktywne sesje lub uwierzytelnione aplikacje czy włączyć uwierzytelnianie dwuetapowe.

## Dowody tożsamości {#proofs}

[Weryfikacja odnośników](../profile#verification) w polach metadanych profilu jest jednym ze sposobów na udowodnienie swojej tożsamości z użyciem odnośników rel=me, ale Mastodon obsługuje bardziej uogólniony podsystem dostawców dowodów tożsamości. Obecnie jedynym dostawcą obsługującym ten mechanizm jest Keybase.

### Weryfikacja tożsamości przez Keybase {#keybase}

{{< figure src="/assets/keybase.jpg" caption="Dowód tożsamości na profilu" >}}

Na początek, zarejestruj się na Keybase i wygeneruj lub prześlij publiczny klucz GPG na swoje konto Keybase. Następnie, przejdź do „prove more identities”. Odnajdź swój serwer, jeśli jest dostępny, a jeśli nie, skontaktuj się z Keybase aby uzyskać pomoc. Wybierz swoją domenę Mastodona i wprowadź nazwę użytkownika. Możesz udowodnić swoją tożsamość, autoryzując swoje konto na Mastodonie i publikując wiadomość z dowodem. Gdy to zrobisz, zostanie utworzony dowód tożsamości, a Twój profil będzie pokazywał Keybase jako udowodnioną tożsamość.

{{< hint style="danger" >}}
**Weryfikacja Keybase jest nieodwracalna.** Keybase używa niemodyfikowalnego łańcucha podpisów dla dowodów tożsamości, więc po zweryfikowaniu tożsamości na Keybase, nie możesz jej usunąć. Możesz tylko unieważnić dowód, podpisując wiadomość unieważniającą używajac powiązanego klucza prywatnego.
{{< /hint >}}

