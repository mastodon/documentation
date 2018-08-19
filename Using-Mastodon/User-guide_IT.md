Guida dell'utente di Mastodon
=====================

## Sommario

* [Introduzione](User-guide_IT.md#introduzione)
  * [Decentralizzazione e federazione](User-guide_IT.md#decentralizzazione-e-federazione)
* [Come iniziare](User-guide_IT.md#come-iniziare)
  * [Creare un profilo](User-guide_IT.md#creare-un-profilo)
  * [Notifiche email](User-guide_IT.md#notifiche-email)
  * [Post di testo](User-guide_IT.md#post-di-testo)
    * [Contenuto sensibile](User-guide_IT.md#contenuto-sensibile)
    * [Hashtag](User-guide_IT.md#hashtag)
    * [Toot condivisi e apprezzati](User-guide_IT.md#toot-condivisi-e-apprezzati)
  * [Pubblicare immagini](User-guide_IT.md#pubblicare-immagini)
  * [Seguire altri utenti](User-guide_IT.md#seguire-altri-utenti)
  * [Notifiche](User-guide_IT.md#notifiche)
  * [Applicazioni mobili](User-guide_IT.md#applicazioni-mobili)
  * [La timeline federata](User-guide_IT.md#la-timeline-federata)
  * [La timeline locale](User-guide_IT.md#la-timeline-locale)
  * [Ricerca](User-guide_IT.md#ricerca)
  * [Liste](User-guide_IT.md#liste)
* [Privacy e sicurezza](User-guide_IT.md#privacy-e-sicurezza)
  * [Autenticazione a due fattori](User-guide_IT.md#autenticazione-a-due-fattori)
  * [Privacy dell'account](User-guide_IT.md#privacy-dell-account)
  * [Privacy dei toot](User-guide_IT.md#privacy-dei-toot)
  * [Bloccare un utente](User-guide_IT.md#bloccare-un-utente)
  * [Silenziare un utente](User-guide_IT.md#silenziare-un-utente)
  * [Segnalare toot o utenti](User-guide_IT.md#segnalare-toot-o-utenti)
* [Altre domande?](User-guide_IT.md#altre-domande)

## Introduzione

Mastodon è un'applicazione per social network basata sul protocollo ActivityPub. Funziona in modo molto simile ad altri social network, specialmente a Twitter, con una differenza chiave: è open-source e chiunque può avviare un proprio server (detto "*istanza*"), e gli utenti di qualunque istanza possono interagire liberamente con quelli delle altre istanze (questa è la "*federazione*"). Dunque è possibile anche per un piccolo gruppo mettere in piedi un server per il proprio uso, e allo stesso tempo permettere l'interazione con altri gruppi.

#### Decentralizzazione e federazione

<img src="mastofed.png" align="right" width="48%" alt="Schema della decentralizzazione e federazione" />

Mastodon è un sistema decentrato basato su un concetto detto "*federazione*": invece che dipendere da una singola persona od organizzazione che faccia funzionare l'infrastruttura, chiunque può scaricare e utilizzare il software, e installare e gestire il proprio server. Federazione significa che diversi server Mastodon possono interagire l'uno con l'altro senza ostacoli, in modo simile a quanto succede, ad esempio, con la posta elettronica.

Per il modo con cui Mastodon è fatto, chiunque può scaricarlo e usarlo ad esempio per un piccolo gruppo, ma qualunque utente registrato su quella istanza può seguire, mandare e leggere post da altre istanze di Mastodon (e dai server di altri servizi compatibili con OStatus e ActivityPub, come GNU Social e postActiv). Ciò significa non solo che i dati degli utenti non sono di proprietà di un'azienda che ha interesse a venderli agli inserzionisti pubblicitari, ma anche che se un dato server chiude, i suoi utenti possono metterne in piedi un altro o trasferirsi su un'altra istanza, e non può accadere che l'intero servizio cessi di funzionare.

Entro ciascuna istanza di Mastodon, i nomi utente appaiono come `@nomeutente`, in modo simile a quanto accade in altri servizi come Twitter. Gli utenti di altre istanze appaiono come `@utente@nomeserver.ext` e possono essere cercati e seguiti con questo identificativo. Così, ad esempio, l'utente `@gargron` sull'istanza `mastodon.social` può essere seguito da altre istanze come `@gargron@mastodon.social`.

I post degli utenti di istanze esterne vengono "*federati*" in quella locale, ad esempio se `user1@mastodon1` segue `user2@gnusocial2`, tutti i post di `user2@gnusocial2` appaiono sia nella timeline home di `user1@mastodon1` sia nella timeline pubblica del server `mastodon1`. Gli amministratori dei server Mastodon hanno un certo grado di controllo su questo meccanismo e possono escludere i post degli utenti dalle timeline pubbliche; inoltre la visibilità è influenzata anche dalle impostazioni di privacy dei singoli post degli utenti: per spiegazioni vedi oltre nella sezione [Privacy dei Toot](User-guide_IT.md#privacy-dei-toot).

## Come iniziare

#### Creare un profilo

Potete personalizzare il vostro profilo Mastodon in diversi modi: potete impostare un "nome visualizzato", un'immagine  dell'"avatar", un'immagine di sfondo per l'intestazione del profilo, e una breve "biografia" con succinte informazioni su di voi o sul vostro account.

![Icona preferenze](screenshots/preferences.png) Per modificare il vostro profilo fate clic sull'icona Preferenze nella colonna di composizione e selezionate "Modifica profilo" nel menù a sinistra. Il nome visualizzato non può superare i 30 caratteri, la biografia i 160. Le immagini dell'avatar e dell'intestazione possono essere caricate nei formati png, gif o jpg e non possono superare i 2MB. Saranno ridimensionate a 120x120 pixel per l'avatar, 700x335 per l'intestazione.

#### Notifiche email

![Icona preferenze](screenshots/preferences.png) Se volete, Mastodon può informarvi via email di attività che interessano il vostro account. Per modificare le impostazioni delle notifiche via email, fate clic sull'icona Preferenze nella colonna di composizione e selezionate "Preferenze" nel menù a sinistra. Qui potete attivare o disattivare i vari tipi di notifica.

#### Post di testo

Il modo basilare per utilizzare Mastodon consiste nel creare un post di testo, noto anche come *toot*. Per creare un toot, scrivete il messaggio che volete pubblicare nella casella "A cosa stai pensando?" nella colonna di composizione e fate clic su "TOOT". C'è un limite di 500 caratteri per toot; se davvero ve ne servono di più, potete rispondere al vostro toot, e in questo modo i vostri toot appariranno come conversazione.

Se volete rispondere al toot di un altro utente, potete fare clic sull'icona "Rispondi" che il toot contiene. Il nome dell'altro utente sarà inserito nella casella del testo con un'anteprima del messaggio a cui state rispondendo, e l'utente riceverà una notifica della vostra risposta.

Analogamente, per iniziare una conversazione con un altro utente, basta citare il suo nome utente nel toot. Quando digitate il simbolo @ seguito (senza spazi) da qualunque carattere, Mastodon vi suggerirà automaticamente degli utenti che corrispondono a ciò che state digitando. Come per le risposte, l'utente che citate riceverà una notifica. Se il post inizia con un nome utente, sarà trattato come risposta e apparirà solo nella timeline Home degli utenti che seguono sia voi sia l'utente citato. La visibilità sul vostro profilo dipende dalle impostazioni di privacy.

##### Contenuto sensibile

Quando volete pubblicare qualcosa e volete che non sia immediatamente visibile (ad esempio la trama di quel film appena uscito, o qualche osservazione personale su argomenti che potrebbero turbare qualcuno), potete "nasconderlo" con un "Content Warning".

Per farlo, fate clic sulla ![icona CW](screenshots/compose-cw.png) opzione "CW" sotto la casella di composizione. Questo apre un'altra casella con l'indicazione "Content warning"; qui dovreste inserire un breve riassunto del contenuto del vostro post, mentre il post vero e proprio va nella casella "A cosa stai pensando?" come al solito.

![animazione che mostra come attivare il content warning](screenshots/content-warning.gif)

In questo modo, il testo del vostro post viene nascosto da un pulsante "Mostra di più", con visibili soltanto l'avviso ed eventuali utenti citati:

![animazione che mostra il content warning nella timeline](screenshots/cw-toot.gif)

Se aggiungete a un post il content warning, le immagini allegate vengono automaticamente segnate come "sensibili" per nasconderle alla vista finché l'utente non fa clic su di esse. Per sapere come farlo senza aggiungere un content warning, vedete la sezione [Pubblicare immagini](User-guide_IT.md#pubblicare-immmagini).

##### Hashtag

Se state scrivendo un post che riguarda un argomento più ampio, potreste aggiungergli un "hashtag". Per farlo basta scrivere nel post un segno # seguito da una parola o frase, ad esempio #introductions o #presentazione, che sono spesso usati da un nuovo utente che si presenta alla comunità, o #politica per discussioni politiche, e così via. Gli hashtag possono contenere solo lettere e numeri, e devono contenere almeno una lettera; non spazi o il carattere "&".

Quando il toot viene pubblicato, l'hashtag diventa un link; se l'utente fa' clic su un hashtag in un toot, sarà mostrata una timeline comprendente solo i post pubblici che contengono quell'hashtag (in altre parole, è un modo rapido per cercarlo). In questo modo gli utenti possono raggruppare post di argomento simile, creando una "timeline" autonoma per gli utenti interessati a quell'argomento. Si può fare una ricerca per hashtag anche dalla barra di ricerca sopra la casella di composizione.

Quando avete aperta una ricerca per hashtag, l'elenco si aggiorna automaticamente con i nuovi toot. Potete fissare la colonna per tenere aperta la ricerca, facendo clic sul simbolo impostazioni in alto a destra e poi su "Fissa". Dallo stesso menù potete spostare a destra o a sinistra la colonna fissata oppure eliminarla.

I toot non listati, privati, diretti non compaiono nelle ricerche per hashtag, ma se ne contengono, su questi hashtag si può fare clic per [cercare](User-guide_IT.md#ricerca) i toot pubblici che li contengono. Una ricerca per hashtag troverà solo i toot noti alla tua istanza.

##### Toot condivisi e apprezzati

Potete segnare come *apprezzato* un toot di un altro utente facendo clic sull'icona a stella sotto di esso. L'autore riceverà una notifica che avete segnato il suo post come apprezzato; il significato di questa azione può essere molto variabile in base al contesto: può manifestare ascolto e attenzione, oppure accordo, o sostegno per le idee espresse. Il clic sull'icona a stella aggiunge il toot all'elenco dei toot salvati, che si raggiunge dal menù sopra la casella di composizione.

Inoltre potete condividere un toot facendo clic sull'icona "frecce circolari". Un toot condiviso sarà visibile nella timeline del vostro profilo e in quelle di tutti i vostri seguaci, anche se non seguono l'autore del post originale. Questo può servire se qualcuno pubblica un messaggio che secondo voi dovrebbe essere visto da altri, poiché aumenta la diffusione del messaggio e lascia intatte le informazioni sull'autore. 

#### Pubblicare immagini

![Icona immagine](screenshots/compose-media.png) Per pubblicare un'immagine basta fare clic sull'icona "immmagine" nella casella di composizione e selezionare un file da caricare.

Potete anche trascinare l'immagine direttamente dal desktop e rilasciarla nella casella di composizione. 

![Icona immagine](screenshots/drag-and-drop-image.gif)

Se l'immagine ha un contenuto "sensibile" (come nudità o violenza), potete fare clic sul pulsante "nascondi media", che somiglia a un occhio e compare dopo il caricamento dell'immagine. L'immagine sarà nascosta, e l'utente dovrà fare clic su di essa per vedere l'anteprima.

Se aggiungete un [content warning](User-guide_IT.md#contenuto-sensibile) a un toot, le immagini allegate saranno nascoste, ma potete usare il pulsante nascondi media per nascondere un'immagine senza aggiungere un content warning.

Ai toot potete allegare anche file video o GIF animate. Ma per questo tipo di file c'è una dimensione massima di 8 MB e i video devono essere in formato .webm o .mp4.

#### Seguire altri utenti

Quando seguite un altro utente, tutti i suoi toot e quelli di altri utenti che questi [condivide](User-guide_IT.md#toot-condivisi-e-apprezzati) appariranno nella vostra colonna Home. In questo modo avete una timeline separata da quelle [pubbliche](User-guide_IT.md#le-timeline-pubbliche) in cui potete leggere i messaggi di determinati utenti senza il disturbo della conversazione generale.

![Icona segui](screenshots/follow-icon.png) Per seguire un utente, fate clic sul suo nome o avatar per aprire il suo profilo, e poi sull'icona Segui in alto a sinistra.

Se l'account mostra un'icona a forma di lucchetto ![Icona lucchetto](screenshots/locked-icon.png) vicino al nome utente, l'utente riceverà una notifica della vostra richiesta di seguirlo, e dovrà approvarla perché siate aggiunti ai suoi seguaci (e vedere i suoi toot). Quando la vostra richiesta è in attesa di approvazione, l'icona ![Icona segui](screenshots/follow-icon.png) sarà sostituita da una clessidra ![Icona in attesa](screenshots/pending-icon.png). Se volete attivare l'approvazione delle richieste di nuovi seguaci, potete farlo dalle preferenze.

Quando seguite un utente l'icona Segui sarà colorata in blu nel suo profilo ![Icona seguace](screenshots/following-icon.png); potete smettere di seguirlo facendo clic su di essa.

Se conoscete il nome utente di qualcuno, potete aprire il suo profilo per seguirlo inserendolo nella [Casella di ricerca](User-guide_IT.md#ricerca) nella colonna di composizione. Questo funziona anche per gli utenti remoti, ma, a seconda se essi sono noti alla vostra istanza oppure no, potreste dover inserire il nome utente completo, compreso il dominio (ad esempio `gargron@mastodon.social`) per trovarlo.

C'è un'altra possibilità: se il profilo dell'utente è già aperto in un'altra scheda del browser, le altre istanze di Mastodon e la maggior parte di quelle compatibili con OStatus dovrebbero mostrare nel profilo un pulsante "Segui" o "Sottoscrivi". Se lo premete, dovrebbe esservi chiesto di inserire il nome utente **dal quale** lo volete seguire (ad esempio se il vostro account è su mastodon.social dovrete inserirlo come `mioaccount@mastodon.social`).

#### Notifiche

Quando qualcuno segue il vostro account o chiede di seguirvi, cita il tuo nome utente, o condivide o segna come apprezzato uno dei vostri toot, riceverete una notifica. Esse appariranno come notifiche sul desktop del tuo computer (se il vostro browser le mostra e se le avete attivate) e anche nella vostra colonna "Notifiche".

![Icona impostazioni notifiche](screenshots/notifications-settings.png) Potete filtrare quali tipi di notifiche sono mostrate nella colonna Notifiche facendo clic sull'icona Impostazioni Notifiche in alto nella colonna, e selezionando o deselezionando i tipi che volete o non volete vedere.

![Icona cancella](screenshots/notifications-clear.png) Se le notifiche diventano troppo numerose o disordinate, potete ripulire la colonna facendo clic sull'icona Cancella in alto: tutto il contenuto della colonna sarà cancellato.

![Icona preferenze](screenshots/preferences.png) Potete anche disabilitare le notifiche da persone che non seguite o che non vi seguono: per farlo fate clic sull'icona Preferenze nella colonna di composizione, selezionate "Preferenze" nel menù a sinistra e attivate una o entrambe le opzioni "Blocca notifiche".

#### Applicazioni mobili

Mastodon ha un'API aperta, quindi chiunque può sviluppare un client o usare Mastodon da qualunque applicazione. Sono già state sviluppate molte applicazioni mobili per iOS e Android. Potete trovare un elenco [qui](Apps.md). Molti di questi progetti sono open source e accettano collaboratori.

#### Le timeline pubbliche

Oltre alla timeline Home, vi sono due timeline pubbliche: la timeline federata e la timeline locale. Entrambe sono buoni modi per incontrare nuovi utenti da seguire o con cui interagire.

##### La timeline federata

La timeline federata mostra tutti i post pubblici di tutti gli utenti "noti" alla vostra istanza. "Noto" vuol dire che l'utente è sulla vostra stessa istanza, o che qualcuno sulla vostra istanza lo segue. La timeline federata è un ottimo modo per partecipare alla conversazione generale. Seguire utenti di istanze remote che incontrate nella timeline federata può portare a incontrare ancora più utenti su più istanze, e così collegare la vostra istanza a una parte sempre maggiore dell'intera rete di Mastodon e oStatus.

![Icona della timeline federata](screenshots/federated-timeline.png) Per visualizzare la timeline federata, fate clic sull'icona "Timeline federata" nella colonna di composizione o sull'analogo pulsante nel pannello Come Iniziare. Per nasconderla, basta fare clic sul link "Indietro" in alto nella colonna.

#### La timeline locale

La timeline locale mostra solo i post pubblici degli utenti della vostra istanza. Questo può essere utile se la vostra istanza ha regole particolari che gli utenti su altre istanze potrebbero non avere, ad esempio certi argomenti che dovrebbero essere segnati come sensibili, oppure particolari "inside joke" o interessi comuni. 

![Icona della timeline locale](screenshots/local-timeline.png)

Per visualizzare la timeline locale, fate clic sull'icona "Timeline locale" nella colonna di composizione o sull'analogo pulsante nel pannello Come Iniziare.

#### Ricerca

Mastodon ha una casella di ricerca, situata sopra la casella "nuovo toot". Se fate clic nella casella, compare un pannello che vi spiega come usarla.

Potete usare la ricerca per le seguenti operazioni:

* **[Hashtag](User-guide_IT.md#hashtag)** - Gli hashtag noti alla vostra istanza compariranno in questo tipo di ricerca. Facendo clic su uno di essi, si avvierà una ricerca nei post pubblici con hasthag noti alla vostra istanza. I toot non listati non compaiono nelle ricerche per hashtag. La ricerca è limitata ai post noti alla vostra istanza, cioè, grossomodo, "toot pubblicati da o condivisi da o a cui è stato risposto da persone sulla vostra istanza, e da persone seguite da persone sulla vostra istanza".

* **Persone** - Una ricerca per `@nomeutente` darà come risultato tutti gli utenti noti alla vostra istanza che hanno quel nome utente, compresi quelli che si trovano su altre istanze. Potete fare ricerche più accurate con `@nomeutente@istanza`: in questo modo troverete chiunque abbia quei nome e istanza, anche se non è ancora noto alla vostra istanza. Facendo clic sul risultato della ricerca potrete visualizzare il profilo degli utenti trovati. Se cercate la URL del profilo di qualcuno, come `http://istan.za/@nomeutente`, il risultato sarà lo stesso, ma inoltre verranno aggiornati l'avatar, la biografia e i dati su seguaci e seguiti, se essi non sono aggiornati sulla vostra istanza.

* **Toot** - Se la vostra istanza lo permette, potete cercare i toot che avete scritto, condiviso, segnato come apprezzati, o in cui siete stati citati. La funzione di ricerca su Mastodon è volutamente limitata per prevenire abusi; il fatto che non permetta di fare ricerche su *tutti* i toot è intenzionale.

* **URL dei toot** - Se inserite nella casella di ricerca la URL di un particolare toot e premete Invio, il risultato sarà esattamente quel toot, e potrete salvarlo, rispondere o condividerlo. Questo renderà quel toot "noto" alla vostra istanza; quindi comparirà nella timeline federata e, se contiene hashtag, nelle ricerche per hashtag fatte dagli utenti della vostra istanza. Potete fare clic sul toot per aprirlo e vedere eventuali risposte e il numero di apprezzati e condivisioni.

Per avviare una ricerca, digitate qualcosa nella casella di ricerca nella colonna di composizione e premete *invio*. I risultati compariranno subito sotto. Se digitate una parola (senza simboli # o @) otterrete tutti i toot che avete scritto, apprezzato, condiviso o in cui siete citati, contenenti quella parola; gli hashtag contenenti quella parola; le persone il cui nome utente, nome visualizzato o nome istanza contiene quella parola. Ad esempio se digitate `nonbinary` i risultati possono contenere:

* Nonbinary Friend (`@hannah@instance`)
* Hannah (`@nonbinaryfriend@instance`)
* Hannah (`@friend@nonbinary.instance`)
* `#nonbinary`
* `#nonbinaryheroes`

#### Liste

Le liste permettono di organizzare gli utenti che seguite. Le liste possono essere create e modificate dalla colonna Come Iniziare, facendo clic su Liste.

Per creare una nuova lista, inserite un nome nell'apposito spazio e premete il simbolo +. Se aprite una lista esistente e premete l'icona Impostazioni in alto a destra, vedrete le opzioni per modificarla, cancellarla, e fissarla in cima. Facendo clic su Modifica Lista, si apre una finestra in cui potete cercare tra gli utenti che seguite, e aggiungerli alla lista. La lista mostrerà i post degli utenti che ne fanno parte (pubblicati dopo la creazione della lista).

Potete vedere un esempio [qui](https://discourse.joinmastodon.org/t/user-lists-feature/921/2).

## Privacy e sicurezza

Mastodon è dotato di alcune caratteristiche avanzate per la privacy e la sicurezza, a differenza di servizi dove i contenuti sono più pubblici, come Twitter. In particolare, i controlli sulla privacy sono piuttosto fini; questa sezione spiega come funzionano.

#### Autenticazione a due fattori

L'autenticazione a due fattori (2FA) è un meccanismo che migliora la sicurezza del vostro account Mastodon, chiedendo per l'accesso a Maastodon un codice numerico ottenuto attraverso un altro apparecchio (di solito un telefono cellulare) collegato al vostro account Mastodon. Ciò significa che anche se qualcuno riesce a procurarsi sia il vostro indirizzo email sia la vostra password, non potrà prendere il controllo del vostro account, perché gli servirebbe anche il vostro dispositivo per poter accedere.

Per l'autenticazione a due fattori, Mastodon usa Google Authenticator (o applicazioni compatibili come Authy). Potete installarlo gratuitamente sul vostro dispositivo [Android](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2) o [iOS](https://itunes.apple.com/gb/app/google-authenticator/id388497605); [questa pagina di Wikipedia](https://en.wikipedia.org/wiki/Google_Authenticator#Implementations) elenca altre versioni delle app per altri sistemi.

![Icona preferenze](screenshots/preferences.png) Per attivare l'autenticazione a due fattori, fate clic sull'icona Preferenze nella colonna di composizione, poi su "Autenticazione a due fattori" nel menù a sinistra, e seguite le istruzioni. Dopo l'attivazione, ogni volta che accederete a Mastodon vi servirà un codice usa-e-getta generato dall'app Authenticator sul dispositivo collegato al vostro account.

#### Privacy dell'account

Per permettervi un maggiore controllo su chi può vedere i vostri toot, Mastodon permette di creare account "privati" o "bloccati". Se il vostro account è impostato come privato, riceverete una notifica quando qualcuno tenta di seguirvi, e potrete accettare o rifiutare la richiesta. Inoltre, se il vostro account è privato, i toot che create saranno per impostazione predefinita impostati come privati (vedi la sezione [Privacy dei toot](User-guide_IT.md#privacy-dei-toot)  qui sotto).

![Icona preferenze](screenshots/preferences.png) Per rendere il vostro account privato, fate clic sull'icona Preferenze nella colonna di composizione, poi su "Modifica profilo", seleziona l'opzione "Blocca account" e salva le modifiche.

![Screenshot dell'impostazione Blocca Account](screenshots/private.png)

Potete vedere le richieste di seguirvi nel menù del vostro profilo, che potete aprire nella colonna di composizione

![Screenshot del menù Richieste di seguirti](screenshots/follow_requests_menu.png)

e approvare o rifiutare le singole richieste.

![Screenshot del menù di approvazione/rifiuto](screenshots/follow_requests.png)

#### Privacy dei toot

La privacy dei toot è gestita in modo indipendente da quella dell'account, e singolarmente per ciascun toot. I quattro livelli di visibilità per i toot sono: Pubblico (predefinito), Non listato, Privato, Diretto. Per selezionare il livello di privacy del toot, fate clic sull'![Icona globo](screenshots/compose-privacy.png)icona globo. Le modifiche a questa impostazione vengono ricordate tra un post e l'altro, cioè se create un toot privato, anche i successivi saranno privati finché cambiate l'impostazione. Potete cambiare l'impostazione predefinita nelle preferenze.

**Pubblico:** è lo stato predefinito dei toot, sulla maggior parte degli account. I toot pubblici sono visibili a qualunque altro utente nelle timeline pubbliche, vengono trasmessi alle altre istanze Mastodon e OStatus senza restrizioni, e sono mostrati nella vostra pagina del profilo: qui sono visibili a chiunque, compresi i motori di ricerca e tutte le persone che visitano la pagina, anche se non sono utenti di Mastodon o non hanno eseguito l'accesso.

**Non listato:** i toot sono pubblici, ma non sono mostrati nelle timeline pubbliche né nei risultati delle ricerche. Sono visibili dai vostri seguaci e sono mostrati nella vostra pagina del profilo, e qui sono visibili a chiunque, anche a chi non è utente di Mastodon. Funzionano esattamente come i post pubblici, salvo che non compaiono nelle timeline pubbliche e nei risultati di ricerca.

**Privato:** i toot non compaiono nelle timeline pubbliche né sulla vostra pagina del profilo, salvo che agli utenti che sono vostri seguaci. Questa opzione ha un'utilità limitata se il vostro account non è bloccato (cioè impostato con l'approvazione per i nuovi seguaci), poiché chiunque può seguirvi senza conferma e quindi vedere i vostri toot privati. Ma ciò significa che se impostate il vostro account come privato, potete disattivare questa opzione su un certo toot per pubblicare un toot non listato o anche pubblico dal vostro account privato.

I toot privati non possono essere condivisi. Se qualcuno che seguite crea un toot privato, esso apparirà nella vostra timeline con un icona a lucchetto invece di quella per la condivisione. **NOTA:** le istanze remote potrebbero non rispettare questa impostazione.

Non esiste un modo affidabile per controllare se una data istanza effettivamente rispetta le impostazioni di privacy dei post. I server non Mastodon (ad esempio un server GNU Social) non hanno le impostazioni di privacy di Mastodon. Un utente su GNU Social che @citate in un post privato non saprebbe che voi intendete che il post sia privato, e potrebbe condividerlo, e ciò annullerebbe l'impostazione di privacy. Inoltre non c'è modo di garantire che qualcuno non potrebbe modificare il codice sulla sua particolare istanza di Mastodon per ignorare le restrizioni sui post privati. Se componete un post privato che sarà trasmesso ad altre istanze, riceverete un avviso. Dovreste valutare quanto vi fidate dell'utente che state @citando e l'istanza su cui si trova.

I post privati non sono crittografati. Valutate se fidarvi dell'amministratore della vostra istanza: potrebbe leggere i vostri post privati dal back-end. Non dite nulla che temete possa essere intercettato. 

**Diretto:** i post sono visibili solo agli utenti che avete @citato all'interno e non possono essere condivisi. Come per i post privati, tenete presente che le istanze remote potrebbero non rispettare questa impostazione. Se volete parlare di un argomento sensibile dovreste farlo fuori da Mastodon. 

Riassumendo:

Privacy del toot | Visibile nel profilo | Visibile nelle timeline pubbliche | Trasmesso ad altre istanze
------------ | ------------------ | -------------------------- | ---------------------------
Pubblico | A tutti compresi visitatori anonimi | Sì | Sì
Non listato | A tutti compresi visitatori anonimi | No | Sì
Privato | Solo seguaci | No | Sì
Diretto | No | No | Solo @citati remoti

#### Bloccare un utente

Potete bloccare un utente per impedirgli di contattarvi. Per farlo, fate clic sul menù su un suo toot o sul suo profilo e selezionate "Blocca".

**NOTA:** questo impedirà all'utente bloccato di vedere i vostri toot pubblici quando ha eseguito l'accesso, ma *potrà vederli* semplicemente aprendo il vostro profilo in un altro browser da cui non ha eseguito l'accesso (oppure se usa un altro account che non avete bloccato).

Citazioni, apprezzati, condivisioni e ogni altra interazione da un utente bloccato saranno nascoste e non vedrete nulla. Non vedrete le risposte a un utente bloccato, nemmeno se vi citano, e non vedrete i suoi toot se qualcuno li condivide.

L'utente bloccato non sarà informato che l'avete bloccato, e sarà eliminato dai vostri seguaci.

#### Silenziare un utente

Se non volete vedere i post di un certo utente, ma non vi importa se lui/lei vede i vostri post, potete *silenziarlo*. Potete farlo dallo stesso menù sul suo profilo da cui potete bloccarlo. Non vedrete i post di un utente silenziato, a meno che non vi @citi. Un utente silenziato non ha modo di sapere che l'avete silenziato. Potete anche silenziare solo le condivisioni di un certo utente, dallo stesso menù sulla pagina del suo profilo.

#### Segnalare toot o utenti

Se incontrate un toot o un utente che rompe le regole della vostra istanza, o se comunque volete farlo notare agli amministratori (ad esempio se qualcuno sta molestando un altro utente, o sta pubblicando pornografia o contenuti illegali), potete fare clic sul pulsante "...", poi nel menù selezionate Segnala. Nella colonna a destra comparirà questo modulo:

![Modulo segnalazione](screenshots/report.png)

In questo modulo potete selezionare i toot che volete segnalare all'amministratore dell'istanza e inserire altre informazioni utili a identificare o gestire il problema (ad esempio: "è uno spammer", "questo post contiene pornografia esplicita", ecc.). La segnalazione, dopo che l'avrete inviata, sarà visibile agli amministratori del server che potranno prendere i provvedimenti adatti, ad esempio escludere i post dell'utente dalle timeline pubbliche o espellerlo.

## Altre domande?

Se avete altre domande, potete fare due cose:

1. chiedete su Mastodon con l'hashtag #support (ciò funzionerà meglio su istanze con molti utenti).
2. andate sul [forum di Mastodon](https://discourse.joinmastodon.org/c/general) (powered by Discourse). Prima di utilizzarlo siete pregati di [leggere le linee guida](https://discourse.joinmastodon.org/faq).
