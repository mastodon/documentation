Mastodon felhasználói kézikönyv
===============================

* [Bevezetés](User-guide_HUN.md#bevezetés)
  * [Decentralizáció és federáció](User-guide_HUN.md#decentralizáció-és-federáció)
* [Első lépések](User-guide_HUN.md#első-lépések)
  * [Profilod létrehozása](User-guide_HUN.md#profilod-létrehozása)
  * [E-mail értesítések](User-guide_HUN.md#e-mail-értesítések)
  * [Szöveges üzenetek](User-guide_HUN.md#szöveges-üzenetek)
  * [Content Warnings - Figyelmeztetés szenzitív tartalmakra](User-guide_HUN.md#content-warnings---figyelmeztetés-szenzitív-tartalmakra)

## Bevezetés

A Mastodon egy, az OStatus protokollon alapuló közösségi alkalmazás. Működésében nagyban emlékztet más közösségi alkalmazásokra - főképp a Twitterre -, egy jelentős különbséget azonban meg kell említenünk: a Mastodon nyílt forráskódú alkalmazás, bárki működtethet saját Mastodon-szervert (ezeket "*instanciának*" is nevezzük) és bármely szerver regisztrált felhasználói szabadon kapcsolatba léphetnek más szerverek felhasználóival (ezt nevezzük "*federációnak*"). Ezek révén válik lehetségessé, hogy kisebb közösségek saját szervert üzemeltessenek, melyet a közösségen belüli kapcsolattartásra használnak, ugyanakkor más közösségekkel is kapcsolatba tudnak lépni. 

#### Decentralizáció és federáció

A Mastodon egy "*federációnak*" nevezett koncepció alapján decentralizált (központosítatlan) rendszer - ahelyett, hogy egy személyre vagy szervezetre bízná a futtatásához szükséges infrastruktúra üzemeltetését, inkább bárki számára lehetővé teszi, hogy letöltse és futtassa az alkalmazást és saját szervert üzemeltessen. A federáció révén az egyes Mastodon szerverek gond nélkül kapcsolatba tudnak lépni egymással, hasonlóan például az e-mailhez.

A fentiekből adódóan bárki beszerezheti a Mastodont és üzemeltethet saját szervert például egy kisebb közösség számára, azonban így is lehetséges, hogy az egyes szerverek regisztrált felhasználói kövessék és olvassák más szerverek felhasználóinak üzeneteit, illetve üzenetet küldjenek számukra (ugyanez igaz más OStatus-alapú szolgáltatások szervereire is, mint például a GNU Social vagy a postActiv). Ez nem csak azt jelenti, hogy a felhasználói adatokat nem egy, az adatok hirdetők felé történő értékesítésében érdekelt vállalat birtokolja, de azt is, hogy ha egy bizonyos szerver megszűnne, a felhasználók egyszerűen indíthatnak egy újat, vagy átmigrálhatják profiljukat egy másik instanciára, ahelyett, hogy adataik végleg elvesznének.

Egy adott Mastodon instancián belül a felhasználónevek `@felhasználónév` formában jelennek meg (csakúgy, mint a Twitteren). A más szerveren regisztrált felhasználókat a `@felhasználónév@szervernév.tld` formában tudjuk keresni és követni - tehát a `@gargron` nevű felhasználót a `mastodon.social` szerveren más instanciákról a `@gargron@mastodon.social` formában érhetjük el.

A más szerver felhasználóinak üzenetei a "*federáció*" révén jelennek meg egy adott szerveren - például ha `user1@mastodon1` felhasználó követi `user2@gnusocial2` felhasználót, abban az esetben `user2@gnusocial2` üzenetei megjelennek `user1@mastodon1` *Kezdőlapján* (Home Feed) és a `mastodon1` szerver *Nyilvános időfolyamában* (Public Timeline). A Mastodon-szerverek adminisztrátorainak van erre a folyamatra némi ráhatásuk és letilthatják bizonyos felhasználók üzeneteinek megjelenését a Nyilvános időfolyamról. Hasonlóképp a felhasználók adatvédelmi beállításai is kihatnak a federációra - ezzel kapcsolatban lásd a [Tülk adatvédelem](User-guide_HUN.md#tülk-adatvédelem) fejezetet.

## Első lépések

#### Profilod létrehozása

Több módon is egyedivé teheted Mastodon-profilodat - beállíthatsz egyedi "Megjelenített nevet" (Display Name), Profil- és Fejlécképet (Avatar és Header) tölthetsz fel és írhatsz egy rövid "Önéletrajzot" (Bio) is magadról.

![Preferences icon](screenshots/preferences.png) Profilod szerkesztéséhez kattints a Beállítások ikonra a baloldali oszlopban és a megjelenő Beállítások oldalon válaszd a "Profil szerkesztése" (Edit Profile) menüpontot. A Megjelenített név 30 karakterben van maximálva, míg az Őnéletrajz maximum 160 karakter hosszú lehet. A Profilkép és a Fejléckép megengedett formátumai a png, a gif és a jpg, a megengedett maximális fájlméret pedig 2MB. A feltöltött képeket a rendszer automatikusan átméretezi: a Profilkép mérete 200x200 pixel, a Fejlécképé pedig 700x335 pixel lesz.

#### E-mail értesítések

![Preferences icon](screenshots/preferences.png) Ha kéred, a Mastodon e-mailben értesít téged bizonyos történésekről. Az értesítések beállításához kattints a Beállítások ikonra a baloldali oszlopban és a megjelenő oldalon válaszd a "Beállítások" (Preferences) menüpontot. Itt találod az e-mail értesítések listáját, ahol jelölheted az általad kívánt opciókat.

#### Szöveges üzenetek

A szöveges üzenet (más néven *Tülk*, angolul *Toot*) a Mastodonon történő interakció legalapvetőbb formája. *Tülköléshez* egyszerűen írd be üzeneted a baloldali oszlop "Mire gondolsz?" (What is on your mind?) mezőjébe és kattints a "TÜLK!" (TOOT) gombra. A tülkök maximum 500 karakter hosszúak lehetnek; amennyiben ennél hosszabbat szeretnél tülkölni, válaszolhatsz saját tülködre, így tülkjeid beszélgetés formájában (egy láncban) jelennek meg.

Ha más felhasználók tülkjeire szeretnél válaszolni, kattints a tülk alatti "Válasz" (Reply) ikonra. Ezzel automatikusan beemeled felhasználónevüket a beviteli mezőbe (a megválaszolni kívánt tülk előnézetével együtt) és az adott felhasználó is értesítést kap arról, hogy válaszoltál neki.

Ugyanígy, ha beszélgetést kezdeményeznél egy felhasználóval, egyszerűen foglald bele felhasználónevét a tülködbe. Mihelyt beírod a @ (kukac) karaktert és (szóköz nélkül) a felhasználónév első betűjét, a Mastodon a bevitt barakterek alapján azonnal megjeleníti javaslatait. Ahogy a válaszok esetében, az adott felhasználó akkor is értesítést kap, ha valaki megemlítette egy tülkben. Ha egy üzenet említéssel (felhasználónévvel) kezdődik, a rendszer válaszként kezeli - ebben az esetben csak azon felhasználók Kezdőlapján jelenik majd meg, akik *egyaránt* követnek téged *és* az említett személyt. Az ilyen tülkök azonban - adatvédelmi beállításaidtól függően - láthatóak lehetnek profiloldaladon is.

##### Content Warnings - Figyelmeztetés szenzitív tartalmakra 

When you want to post something that you don't want to be immediately visible - for example, spoilers for that film that's just come out, or some personal thoughts that mention potentially upsetting topics, you can "hide" it behind a Content Warning.

To do this, click the ![CW icon](screenshots/compose-cw.png) "CW" switch under the Compose box. This will add another text box labeled "Content warning"; you should enter a short summary of what the "body" of your post contains here while your actual post goes into the "What is on your mind?" box as normal.

![animation showing how to enable content warnings](screenshots/content-warning.gif)

This will cause the body of your post to be hidden behind a "Show More" button in the timeline, with only the content warning and any mentioned users visible by default:

![animation showing content warnings in the timeline](screenshots/cw-toot.gif)

**NOTE** that this will not hide images included in your post - images can be marked as "sensitive" separately to hide them from view until clicked on. To find out how to do this, see the [Posting Images](User-guide.md#posting-images) section of this user guide.
