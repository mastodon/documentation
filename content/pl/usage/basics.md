---
title: Podstawy
description: Omówienie podstawowej funkcjonalności Mastodona
menu:
  docs:
    parent: usage
    weight: 1
---
## Rejestracja

Musisz wybrać serwer na którym się zarejestrujesz, tak jak wybrał(-a)byś dostawcę e-maila lub realm w World of Warcraft dla nowej postaci. Na tym serwerze będzie znajdować się Twoje konto i strumień.

Możesz [przejrzeć listę serwerów podzieloną według kategorii i języków na joinmastodon.org](https://joinmastodon.org/#getting-started).

## Edycja profilu
### Zdjęcie, nazwa i opis

- Możesz zmienić awatar
- Możesz ustawić obraz nagłówka
- Możesz ustawić nazwę wyświetlaną inną niż nazwa użytkownika
- Możesz napisać o sobie w biogramie
- Możesz tam wspomnieć o innych kontach i używać hashtagów lub niestandardowych emoji

### Metadane profilu

Metadane profilu są sposobem na umieszczenie dodatkowych informacji w przejrzysty sposób. Możesz wykorzystać 4 rzędy, w których określasz nazwę i zawartość. Na przykład:

|Nazwa|Zawartość|
|-----|-------|
|Wiek|25|
|Kraj|Niemcy|
|Zaimek osobowy|he/him|

To, co tam umieścisz zależy tylko od Ciebie – możesz wspomnieć o innych, użyć hashtagów, niestandardowych emoji i odnośników.

### Weryfikacja odnośników

Jeżeli umieścisz odnośnik w metadanych profilu, Mastodon sprawdzi, czy ta strona zawiera odnośnik do Twojego profilu na Mastodonie. Jeżeli tak, obok odnośnika zostanie wyświetlony znak weryfikacji, ponieważ jesteś jego potwierdzonym właścicielem.

Mastodon sprawdza obecność artybutu `rel="me"` w tym odnośniku. Tak samo, Mastodon umieszcza `rel="me"` na odnośnikach w metadanych.

## Tworzenie wpisów
### Tekst

- Możesz użyć maksymalnie 500 znaków
- Możesz wspomnieć o innych użytkownikach, np. `@alice` lub `@alice@example.com`
- Jeżeli wspominasz o innych, część zawierająca domenę jest omijana przez limit znaków
- Odnośniki muszą zaczynać się od `http://` lub `https://`
- Wszystkie odnośniki liczone są jako 23 znaki, niezależnie od ich długości
- Możesz używać hashtagów tj. `#przykład`, aby inni mogli znaleźć Twój wpis używając tego tagu
- Możesz dodawać ostrzeżenia o zawartości dla wpisów
- Ostrzeżenie o zawartości to czysty tekst. Nie obsluguje wspomnień, hashtagów i odnośników

### Zawartość multimedialna

- Możesz wysyłać zdjęcia w JPG i PNG
- Wysyłane GIF-y są konwertowane do MP4 bez dźwięku, tak jak na Imgur i Gfycat (GIFV)
- Możesz też wysyłać bezpośrednio MP4 i WebM bez dźwięku (GIFV)
- Możesz wysyłać filmy w formacie MP4, WebM lub MOV
- Ograniczenie rozmiaru zdjęć to 8 MB
- Ograniczenie rozmiaru filmów to 40 MB
- Zdjęcia o powierzchni większej niż 1280² pikseli są skalowane w dół
- Możesz ukryć zawartość multimedialną za spoilerem

### Niestandardowe emoji

- Każdy serwer może oferować zestaw niestandardowych emoji, tak jak na Discordzie
- Możesz używać shortcode aby umieścić emoji, np. `:thounking:`
