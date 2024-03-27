---
title: Cos'è Mastodon?
description: Benvenuto nella documentazione di Mastodon!
menu:
  docs:
    weight: -99
---

## Cos'è un microblog? {#microblogging}

Mentre il blogging è l'atto di pubblicare aggiornamenti ad un sito web, il **microblogging** è l'atto di pubblicare piccoli aggiornamenti a un flusso di aggiornamenti sul tuo profilo. Puoi pubblicare messaggi testuali oppure foto, audio, video o sondaggi. Mastodon ti permette di seguire i tuoi amici e di scoprirne di nuovi.

## Cos'è una federazione? {#federation}

La **federazione** è un tipo di decentralizzazione. Invece di un singolo servizio centrale che tutte le persone possono usare, ci sono svariati servizi che un qualsiasi numero di persone possono usare.

| Grado di centralizzazione | Esempi |
| :--- | :--- |
| Centralizzato | Twitter, Facebook, Instagram |
| Federato | Email, XMPP, numero di telefono, posta fisica |
| Distribuito | BitTorrent, IPFS, Scuttlebutt |

Un sito web Mastodon può lavorare da solo. Proprio come un sito web tradizionale, le persone si registrano, postano messaggi, caricano foto e parlano tra di loro. _A differenza_ di un sito web tradizionale, i siti web Mastodon possono interoperare tra di loro, permettendo ai loro utenti di interagire; proprio come quando mandi email dal tuo account Gmail a qualcuno su Outlook, Fastmail, Protonmail, o qualsiasi altro gestore, fino a quando tu sai il loro indirizzo email, **puoi menzionare o messaggiare con chiunque su ogni sito web usando il loro indirizzo**.

{{< figure src="assets/network-models.jpg" caption="From left to right: Centralized, Federated, Distributed" >}}



## Cos'è ActivityPub? {#fediverse}

Mastodon usa un protocollo aperto e standardizzato per implementare il concetto di federazione. Si chiama **ActivityPub**. Qualsiasi software che implementa la federazione tramite il protocollo ActivityPub può tranquillamente comunicare con Mastodon, proprio come i siti web Mastodon comunicano con altri.

Il **fediverso** (“universo federato”) è il nome di tutti i siti web che comunicano tra di loro attraverso ActivityPub e il World Wide Web. Questo inculde tutti i server Mastodon, ma anche altre implementazioni:

* Pleroma, un motore di microblogging modulare,
* Pixelfed, una piattaforma per condividere immagini, che ti consente di condividere post,
* Misskey, che include sia microblogging insieme a una dashboard personalizzabile,
* PeerTube, che ti permette di caricare video nei canali,
* Plume, che ti consente di pubblicare articoli lunghi,
* e molto altro, incluso siti web personali e individuali!

Il fediverso non ha un suo brand, quindi sentirai spesso “seguimi su Mastodon” invece di “seguimi nel fediverso”, ma tecnicamente quest'ultima è più corretta.

## Implementazioni pratiche {#implications}

### Scelta di service provider e policy {#choice}

Dato che Mastodon è solo un software che può essere usato su ogni sito wbe, potenzialmente gli utenti di Mastodon hanno la possibilità di scegliere un service provider da alcuni già esistenti siti web Mastodon, o creare i loro siti web Mastodon se lo desiderano. Il progetto Mastodon mantiene una lista di service provider raccomandati a [joinmastodon.org](https://joinmastodon.org), ordinabili per categoria e/o lingua. Alcuni siti web potrebbero avere policy di moderazioni che vanno oltre a questo, come ad esempio l'uso di specifici tag su contenuti sensibili, e alcuni siti web possono avere policy più blande, ma i siti web listati nel picker rispettano il [Mastodon Server Covenant](https://joinmastodon.org/covenant), questo significa che loro si impegnano attivamente a moderare contro odio, di mantenere backup giornalieri, di avere almeno un admin di riserva, e di concedere almeno 3 mesi di preavviso in caso di chiusura.

> Mantenere community che si sentono sicure tra tutti i membri non è facile. Mastodon concede molti framework e strumenti per farlo, questo permette di spostare la moderazione da un entità commerciale alla comunità stessa.
>
> -- Eugen Rochko, 6 Luglio 2018, ["Cage the Mastodon"](https://blog.joinmastodon.org/2018/07/cage-the-mastodon/)

> Una piattaforma social media ha una struttura gerarchica dove le regole e il loro rispetto, come lo sviluppo e la direzione della piattaforma, sono decisi dal CEO [...] Una rete decentralizzata deliberatamente passa da avere un proprietario a essenzialmente non averne nessuno
>
> -- Eugen Rochko, 30 Dicembre 2018, ["Why does decentralization matter?"](https://blog.joinmastodon.org/2018/12/why-does-decentralization-matter/)

### Finanziamento e monetizzazione {#monetization}

I siti web Mastodon sono operati da differenti persone e organizzazioni completamente indipendenti. Mastodon non implementa alcuna strategia di monetizzazione nel software.

Alcuni operatori server scelgono di offrire account a pagamento, altri operatori sono aziende che possono utilizzare la loro infrastruttura esistente, alcuni operatori server si affidano al crowdfunding dai loro utenti via Patreon e servizi simili, e alcuni operatori server pagano di tasca loro per un uso personale per loro e magari qualche amico. Quindi se vuoi supportare il server che hosta il tuo account. controlla se c'è un modo di donare.

Lo sviluppo di Mastodon è sostenuto dal crowdfunding su [Patreon](https://patreon.com/mastodon) e su [OpenCollective](https://opencollective.com/mastodon). **Nessun capitale di rischio è coinvolto.**

> Secondo me, "messaggi e conversazioni istantanee, pubbliche e globali" dovrebbero, effettivamente, essere _gloabli_. Sistemi distribuiti tra organizzazioni indipendenti e attori che possono auto-governarsi. Un utilità pubblica, senza incentivare lo sfruttamento delle conversazioni per guadagnare.
>
> -- Eugen Rochko, 3 Marzo 2018, ["Twitter is not a public utility"](https://blog.joinmastodon.org/2018/03/twitter-is-not-a-public-utility/)

### Interoperabilità tra software diversi {#interoperability}

In termini pratici: immagina che tu puoi seguire un utente Instagram dal tuo account Twitter e commentare le sue foto senza lasciare il tuo account. Se Twitter e Instagram fossero stati servizi federati che usavano lo stesso protocollo, questo sarebbe stato possibile. Con un account Mastodon, **puoi comunicare con un qualsiasi altro sito web compatibile,** _**anche se non sta girando su Mastodon**_. Tutto quello che è necessario è che il software supporti lo stesso sottosineiem del protocllo ActivityPub che consente di creare e interagire con gli aggiornamenti di stato. Per sapere di più riguardo le specifiche tecniche richieste per interoperare con Mastodon, leggi [ActivityPub](spec/activitypub), [WebFinger](spec/webfinger), e  [Security](spec/security). Per leggere di più riguardo cosa ActivityPub ci consente di fare leggi [Why ActivityPub is the future](https://blog.joinmastodon.org/2018/06/why-activitypub-is-the-future/).

> Tutte queste piattaforme sono differenti e ognuna si concentra su bisogni diversi. E ancora, la fondazione è sempre la stessa: persone che si iscrivono per ricevere post da altre persone. E così, sono tutte compatibili.
>
> -- Eugen Rochko, 27 Giugno 2018, ["Why ActivityPub is the future"](https://blog.joinmastodon.org/2018/06/why-activitypub-is-the-future/)

### Software libero {#libre}

A differenza dei software proprietari, **chiunque ha la completa libertà di eseguire, esaminare, ispezionare, copiare, modificare, distribuire, e riusare il codice sorgente di Mastodon, con la promessa di garantire le stesse libertà per ogni lavoro derivato.** Proprio come gli utenti di Mastodon possono scegliere il loro service provider, tu come individuo sei libero di contribuire a sviluppare nuove funzioni di Mastodon o pubblicare una versione modificata di Mastodon che include funzioni differenti. Queste versioni modificate, sono conosciute anche come fork, sono richiesti anche di concedere le stesse libertà del progetto originale di Mastodon. Per esempio, [glitch-soc](https://glitch-soc.github.io/docs/) è un software distribuito che aggiunge varie funzioni sperimentali. Molti fork individuali esistono, magari con temi differenti o con piccole modifiche che rispettano la tua libertà, personalizzazioni come questa non sono solo consentite ma anche incoraggiate.

> Il potere è di dare alle persone l'abilità di creare i propri spazio, le proprie comunità, di modificare il software come pensano sia meglio, ma senza sacrificare l'abilità delle persone di diverse comunità di interagire tra loro
>
> -- Eugen Rochko, 20 Febbraio 2017, ["The power to build communities: A response to Mark Zuckerberg"](https://blog.joinmastodon.org/2017/02/the-power-to-build-communities/)

> Decentralizzazione è biodiversità di lavoro digitale, il marchio di fabbrica di un ecosistema sano. Una rete decentralizzata come il fediverso permette diverse interfacce utente, diverso software, diverse forme di gestione di coesistere e cooperare.
>
> -- Eugen Rochko, 30 Dicembre 2018, ["Why does decentralization matter?"](https://blog.joinmastodon.org/2018/12/why-does-decentralization-matter/)

## Scegli il tuo percorso {#next-steps}

Impara come usare Mastodon:

{{< page-ref page="user/signup" >}}

Impara come installare Mastodon:

{{< page-ref page="admin/prerequisites" >}}

Impara a scrivere un app per Mastodon:

{{< page-ref page="client/intro" >}}

Impara riguardo il backend di Mastodon e come contribuire:

{{< page-ref page="dev/overview" >}}
