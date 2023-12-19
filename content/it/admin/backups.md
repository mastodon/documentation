---
title: Fare un backup del tuo server
description: Impostare backup regolari (opzionale, ma non troppo)
menu:
  docs:
    weight: 80
    parent: admin
---

Per ogni uso nel mondo reale, dovresti essere sicuro di fare backup regolari del tuo server Mastodon

## Introduzione {#overview}

Cose che devono essere backuppate in ordine di importanza:

1. Database PostgreSQL 
2. I _secrets_ dell'applicazione nel file `.env.production` o equivalenti
3. File caricati dagli utenti
4. Database Redis

## Tipi di Failure {#failure}

Ci sono due tipi di failure da cui le persone dovrebbero mettersi in guardia: Il failure dell'hardware, come ad esempio la corruzzione di un disco; e un errore uomo-software, come ad esempio l'eleminazione involontaria di una specifica parte di dati. In questa documentazione, solo il primo tipo viene considerato.

Mastodon conserva tutti i dati più importanti nel database PostgreSQL. La perdita del database PostgreSQL comporterà il failure completo del server, inclusi tutti gli account, i loro post e follower.

Se perdi i _secrets_ dell'applicazioni, alcune funzioni di Mastodon smetteranno di funzionare per i tuoi utenti, loro verranno tutti disconnessi, l'autenticazione a due fattori non sarà disponibile e le Web Push API smetteranno di funzionare.

Se perdi i file caricati dagli utenti, perderai i loro avatar, headers, allegati ma Mastodon _continuerà_ a funzionare.

Perdere il database Redis è quasi innocuo: gli unici dati irricuperabili saranno i contenuti delle code Sidekiq e i ritentativi prenotati dei precedenti job falliti. La home e le liste feed sono salvate nel Redis ma possono essere rigenerate con tootctl.

I migliori backup sono gli off-site backup, per esempio quelli che non sono salvati nella stessa macchina di Mastodon stesso. Se il server prende fuoco e l'hard disk esplode, i backup salvato nello stesso hard drive non saranno molto utili.

## Back up dei secrets {#env}

I secrets sono i più facili da backuppare perché non cambiano mai. Devi soltanto salvare `.env.production` in un posto sicuro.

## Backup di PostgreSQL {#postgresql}

PostgreSQL è a rischio di corruzione dei dati dai salti di corrente, hard disk failure e schema migrations errati. Per questa ragione, è raccomandato fare spesso backup con `pg_dump` o `pg_dumpall`.

Per setup ad alta-disponibilità, è possibile usare una hot streaming replication che consente di avere un secondo PostgreSQL server con i dati sempre aggiornati, pronto per essere scambiato nel caso in cui l'altro server vada down.

## Back up dei file caricati dagli utenti {#media}

Se stai usando un provider per lo storage esterno come Amazon S3, Google Cloud o Wasabi, allora non ti devi preoccupare di questi backup. Le rispettive compagnie sono responsabili per la gestione degli hardware failure.

Se stai usando uno storage locale, allora è tuo dovere fare delle copie della cartella`public/system`, cioè dove i file caricati sono salvati di default.

## Back up di Redis {#redis}

Fare il backup di Redis è facile. Redis scrive regolarmente in `/var/lib/redis/dump.rdb` ovvero l'unico file che devi copiare.

