---
title: Cos'è Mastodon?
description: Benvenuto nella documentazione di Mastodon!
menu:
  docs:
    weight: -99
---

## Cos'è un microblog? {#microblogging}

Mentre il blogging è l'azione di pubblicare aggiornamenti su un sito web, il **microblogging** è l'azione di pubblicare piccoli aggiornamenti in una corrente di essi direttamente sul tuo profilo. Puoi pubblicare post testuali e volendo anche allegare contenuti multimediali come immagini, audio, video o sondaggi. Mastodon ti permette di seguire i tuoi amici e fartene dei nuovi.

## Cos'è la federazione? {#federation}

La **federazione** è un modello di decentralizzatione. Invece di un unico e centrale server che tutti utilizzano, ce ne sono svariati da cui chiunque può usufruire.

| Grado di centralizzazione | Esempi |
| :--- | :--- |
| Centralizzati | Twitter, Facebook, Instagram |
| Federati | Email, XMPP, rete telefonica, lettere fisiche |
| Distribuiti | BitTorrent, IPFS, Scuttlebutt |

Un sito come Mastodon può operare da solo. Proprio come un sito tradizionale, le persone si registrano, postano messaggi, caricano foto e chiaccherano tra di loro. _Diversamente_ da un sito tradizionale, i siti web come Mastodon possono cooperare, lasciando agli utenti di comunicare tra di loro; proprio come quando invii una email a qualcuno  dal tuo account Gmail, usando Outlook, Fastmail, PRotonmail, o un qualsiasi altro provider email, limitato dal fatto che tu sappia il loro indirizzo,  **puoi menzionare o messaggiare chiunque su ogni sito usando il loro indirizzo**.

{{< figure src="/assets/network-models.jpg" caption="From left to right: Centralized, Federated, Distributed" >}}



## Cos'è ActivityPub? {#fediverse}

Mastodon usa un protocollo standardizzato e aperto per poter implementare la federazione. Si chiama **ActivityPub**. Un qualsiasi software che implementa la federazione tramite ActivityPub può in modo semplice comunicare con Mastodon, proprio come i siti come Mastodon comunicano tra di loro.

Il **fediverso** (“l'universo dei federati”) è il nome per tutti i siti web che possono comunicare tra di loro attraverso ActivityPub e il World Wide Web. Che include tutti i server di Mastodon, ma anche altre implementazioni:

* Pleroma, un motore modulare di microblogging,
* Pixelfed, piattaforma di condivisione di immagine federata, che ti permette di condividere e visualizzare post multimediali,
* Misskey, che include microblogging insieme ad una dashboard personalizzabile,
* PeerTube, che ti permette di pubblicare video sui canali,
* Plume, che ti permette di pubblicare articoli più lunghi,
* e molto altro, inclusi siti personali e individuali!

Il fediverso non ha il suo brand, quindi potresti sentire più volte sentire “seguimi su Mastodon” invece di “seguimi sul fediverso”, ma tecnicamente quest'ultimo è più corretto.

## Implicazioni pratiche {#implications}

### Scelta del provider dei servizi e della policy {#choice}

Poiché Mastodon è solo un software che può essere utilizzato per alimentare qualsiasi sito Web, i potenziali utenti di Mastodon hanno la possibilità di scegliere un fornitore di servizi dai siti Web Mastodon già esistenti o di creare il proprio sito Web Mastodon, se lo desiderano. Il progetto Mastodon mantiene un elenco di fornitori di servizi consigliati su [joinmastodon.org](https://joinmastodon.org), ordinabili per categoria e/o lingua. Alcuni siti Web potrebbero avere politiche di moderazione molto restrittivi, come richiedere l'uso di determinati tag su contenuti potenzialmente sensibili, e alcuni siti Web potrebbero avere politiche di moderazione più flessibili, ma i siti Web elencati nel selettore accettano tutti di adottare il [Mastodon Server Covenant] (https://joinmastodon.org/covenant), il che significa che si impegnano a moderare attivamente contro l'incitamento all'odio, a fare backup giornalieri, ad avere almeno un amministratore di emergenza e a fornire almeno 3 mesi di preavviso in caso di chiusura.

> Mantenere comunità sicure per tutti i suoi membri non è facile. Mastodon fornisce molte strutture e strumenti di base per farlo e sposta il potere di effettuare il cambiamento da un'entità commerciale alle comunità stesse.
>
> -- Eugen Rochko, 6 luglio 2018, ["Cage the Mastodon"](https://blog.joinmastodon.org/2018/07/cage-the-mastodon/)

> Una piattaforma di social media centralizzata ha una struttura gerarchica in cui le regole e la loro applicazione, così come lo sviluppo e la direzione della piattaforma, sono decise dal CEO [...] Una rete decentralizzata rinuncia deliberatamente al controllo del proprietario della piattaforma, sostanzialmente non averne uno.
>
> -- Eugen Rochko, 30 dicembre 2018, ["Perché il decentramento è importante?"](https://blog.joinmastodon.org/2018/12/why-does-decentralization-matter/)

### Finanziamenti e monetizzazione {#monetization}

I siti Web Mastodon sono gestiti da diverse persone o organizzazioni in modo completamente indipendente. Mastodon non implementa alcuna strategia di monetizzazione nel software.

Alcuni operatori di server scelgono di offrire account a pagamento, alcuni operatori di server sono aziende che possono utilizzare la loro infrastruttura esistente, alcuni operatori di server si affidano al crowdfunding dei propri utenti tramite Patreon e servizi simili e alcuni operatori di server stanno solo pagando di tasca propria per un server personale per se stessi e forse per alcuni amici. Quindi, se vuoi supportare il server che ospita il tuo account, controlla se offre un modo per donare.

Anche lo sviluppo di Mastodon è finanziato tramite crowdfunding tramite [Patreon](https://patreon.com/mastodon) e tramite [OpenCollective](https://opencollective.com/mastodon). **Non è coinvolto alcun capitale di rischio.**

> A mio parere, "messaggi e conversazioni istantanee, pubbliche e globali" dovrebbero, in effetti, essere _globali_. Distribuito tra organizzazioni indipendenti e attori che possono autogovernarsi. Di pubblica utilità, senza incentivi a sfruttare le conversazioni a scopo di lucro.
>
> -- Eugen Rochko, 3 marzo 2018, ["Twitter non è di pubblica utilità"](https://blog.joinmastodon.org/2018/03/twitter-is-not-a-public-utility/)

### Interoperabilità tra diversi software {#interoperability}

In termini pratici: immagina di poter seguire un utente Instagram dal tuo account Twitter e commentare le sue foto senza lasciare il tuo account. Se Twitter e Instagram fossero servizi federati che utilizzano lo stesso protocollo, ciò sarebbe possibile. Con un account Mastodon, **puoi comunicare con qualsiasi altro sito web compatibile,** _**anche se non è in esecuzione su Mastodon**_. Tutto ciò che è necessario è che il software supporti lo stesso sottoinsieme del protocollo ActivityPub che consente di creare e interagire con gli aggiornamenti di stato. Per saperne di più sulle specifiche tecniche necessarie per interagire con Mastodon, vedere [ActivityPub](spec/activitypub), [WebFinger](spec/webfinger) e [Security](spec/security). Per saperne di più su ciò che ActivityPub ci permette di fare, vedi [Perché ActivityPub è il futuro](https://blog.joinmastodon.org/2018/06/why-activitypub-is-the-future/).

> Tutte queste piattaforme sono diverse e si concentrano su esigenze diverse. Eppure, la base è sempre la stessa: persone che si iscrivono per ricevere post da altre persone. E così, sono tutti compatibili.
>
> -- Eugen Rochko, 27 giugno 2018, ["Perché ActivityPub è il futuro"](https://blog.joinmastodon.org/2018/06/why-activitypub-is-the-future/)

### Software libero/libero {#libre}

A differenza dei servizi proprietari, **chiunque ha la completa libertà di eseguire, esaminare, ispezionare, copiare, modificare, distribuire e riutilizzare il codice sorgente di Mastodon, a condizione che garantiscano le stesse libertà per qualsiasi lavoro derivato.** Proprio come fanno gli utenti di Mastodon puoi scegliere il loro fornitore di servizi, tu come individuo sei libero di contribuire con funzionalità a Mastodon o pubblicare una versione modificata di Mastodon che include funzionalità diverse. Queste versioni modificate, note anche come software fork, sono necessarie per mantenere le stesse libertà del progetto Mastodon originale. Ad esempio, [glitch-soc](https://glitch-soc.github.io/docs/) è una distribuzione software che aggiunge varie funzionalità sperimentali.
Esistono anche molti fork individuali, forse con un tema leggermente diverso o che includono piccole modifiche alla base di codice. Poiché Mastodon è un software gratuito che rispetta la tua libertà, personalizzazioni come questa non sono solo consentite ma incoraggiate.

> Il potere ultimo sta nel dare alle persone la possibilità di creare i propri spazi, le proprie comunità, di modificare il software come meglio credono, ma senza sacrificare la capacità di persone di comunità diverse di interagire tra loro.
>
> -- Eugen Rochko, 20 febbraio 2017, ["Il potere di costruire comunità: una risposta a Mark Zuckerberg"](https://blog.joinmastodon.org/2017/02/the-power-to-build-communities/ )

> Il decentramento è la biodiversità del mondo digitale, segno distintivo di un ecosistema sano. Una rete decentralizzata come fediverse consente la coesistenza e la cooperazione di diverse interfacce utente, diversi software, diverse forme di governo.
>
> -- Eugen Rochko, 30 dicembre 2018, ["Perché il decentramento è importante?"](https://blog.joinmastodon.org/2018/12/why-does-decentralization-matter/)

## Scegli il tuo percorso {#next-steps}

Scopri come usare Mastodonte:

{{< page-ref page="user/signup" >}}

Scopri come installare Mastodon:

{{< page-ref page="admin/prerequisites" >}}

Scopri come scrivere un'app per Mastodon:

{{< page-ref page="client/intro" >}}

Ulteriori informazioni sul backend Mastodon e su come contribuire:

{{< page-ref page="dev/overview" >}}


