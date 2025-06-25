---
title: Prowadź swój własny serwer
description:
menu:
  docs:
    weight: 9999
    parent: user
---

## Dlaczego miał(a)byś chcieć prowadzić własny serwer Mastodona?

- Pełna kontrola nad swoim głosem w Sieci, niebędąca zależna od zasad czy kaprysów innej osoby. Twój serwer jest Twoją własnością, z Twoimi zasadami. Będzie istnieć tak długo, jak będziesz tego chciał(-a).
- *Nie* jesteś odizolowany(-a) na własnym serwerze. Możesz obserwować użytkowników innych serwerów tak i wymieniać się z nimi wiadomościami tak, jakbyście byli na tym samym serwerze.
- Możesz ograniczyć rejestracje i być jedynym użytkownikiem serwera, i tam prowadzisz swój osobisty (mikro)blog, prowadzić społeczność tylko dla zaproszonych, dla rodziny i znajomych, lub utworzyć serwer, na którym każdy może się zarejestrować, to zależy od Ciebie!

{{< hint style="warning" >}}
Pamiętaj, że prowadzenie publicznej usługi w Internecie jest związane z koniecznością działania jako moderator i zarządzania społecznością, a ta praca staje się bardziej skomplikowana, gdy serwer powiększa się.
{{< /hint >}}

## Więc chcesz prowadzić własny serwer Mastodona

Będziesz potrzebować:

- **Domeny**. W ten sposób inni będą korzystać z Twojego serwera, jest to część tożsamości Twoich użytkowników w pozostałej części sieci.

  **Jak uzyskać**: Namecheap, Gandi, dowolny z licznych rejestratorów domen. Wiąże się to z coroczną opłatą zależną od wybranej domeny.
- Serwera **VPS**. To coś, na czym będzie uruchamiany serwer Mastodona, który będzie stale połączony z Internetem.

  **Jak uzyskać**: DigitalOcean, Hetzner, Exoscale, Scaleway, dowolny z licznych dostawców hostingu. Wiąże się to z miesięcznym lub rocznym kosztem zależnym od specyfikacji sprzętu.
- **Dostawcy email**. Mastodon musi wysyłać wiadomości z odnośnikami potwierdzającymi i różne powiadomienia przez email, a choć hostowanie własnego serwera SMTP jest możliwe, może to być bardziej skomplikowane niż z korzystanie usługi podmiotu trzeciego.

  **Jak uzyskać**: Mailgun, SparkPost, Postmark, Sendgrid, dowolny z liczny dostawców hostingu email oferujących API SMTP. Wiąże się to z miesięcznym kosztem zależnym od liczby wysłanych emaili.
- Nieobowiązkowo: **Dostawca rozwiązania Object Storage**. Mastodon może zapisywać pliki wysyłane przez użytkowników na dysku VPS-a, na którym jest uruchomiony, lecz zwykle powierzchnia tego dysku nie jest nieograniczona i jej powiększenie może być później trudne. Dostawca Object Storage oferuje praktycznie nieograniczoną przestrzeń na pliki.

  **Jak uzyskać**: Amazon S3, Exoscale, Wasabi, Google Cloud, cokolwiek, co oferuje API kompatybilne z S3 lub z OpenStack Swift. Wiąże się to z miesięcznym kosztem zależnym od ilości przechowywanych plików i częstości uzyskiwania ich.

Istnieje kilka **dedykowanych dostawców hostingu Mastodona** które zapewniają wszystkich z tych wymogów, z których możesz skorzystać, jeśli wolisz aby ktoś inny zajął się wszystkimi kwestiami technicznymi. Zwykle musisz jednak samodzielnie zakupić domenę. Kilka z tych dostawców:

{{< caption-link url="https://masto.host" caption="Masto.host" >}}

{{< caption-link url="https://hostdon.jp" caption="Hostdon" >}}

{{< caption-link url="https://app.spacebear.ee/mastodon" caption="Spacebear" >}}

{{< caption-link url="https://fedihost.co/" caption="FediHost" >}}

Zarządzane hostingi są świetnym rozwiązaniem, jeżeli nie masz doświadczenia lub chęci samodzielnie instalować i zajmować się oprogramowaniem. Jednak bycie odpowiedzialnym za wszystkie elementy na własnym sprzęcie daje większą kontrolę nad skalowalnością, wydajnością i dostosowywaniem.

Mastodon dość dobrze skaluje się horyzontalnie. Jeżeli potrzeby przekroczą możliwość jednego urządzenia, Mastodon może zostać podzielony pomiędzy wiele serwerów aplikacji, workerów działających w tle, backendów Redisa, replik PostgreSQL — ale instalacja jednym kliknięciem nie zapewni tego.

Jeżeli chcesz zainstalować wszystko samodzielnie, przejdź tutaj:

{{< caption-link url="https://docs.joinmastodon.org/admin/prerequisites" caption="Przygotowanie maszyny" >}}
