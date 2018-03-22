Foire Aux Questions
==========================
Ceci est une traduction de la [FAQ en anglais](FAQ.md) du réseau social décentralisé Mastodon, rédigée à l'origine par [@Gargron](https://mastodon.social/@Gargron), le créateur de Mastodon.

## Terminologie

#### Qu'est-ce qu'un Mastodon?
C'est un animal préhistorique, prédécesseur du mammouth. Une sorte d'élephant duveteux. Il barrit (on entend «pouet!», ou «toot» en anglais).

#### Pourquoi le nom Mastodon?
C'est plutôt «metal». (Un groupe de métal progressif porte le même nom).

#### Qu'est-ce qu'une «fédération»?
C'est un groupe de serveurs Mastodon qui partagent des pouets (toots) entre eux.

### Qu'est-ce qu'une «instance»?
C'est un serveur sur lequel il est possible d'avoir un compte. Chaque instance a ses propres règles, parce qu'elles peuvent être gérées individuellement par des personnes différentes!

#### Je ne comprends pas la différence entre la timeline locale et la timeline fédérée.
Les pouets «locaux» sont ceux du serveur sur lequel se trouve votre compte. les pouets «fédérés» sont tous les pouets que ce serveur connaît. (C'est compliqué, mais pour résumer: «Les pouets des personnes que les utilisateur·trice·s de votre instance suivent»)

#### Qu'est-ce que le «fediverse»?
«L' univers fédéré» (federated universe). C'est le réseau regroupant les serveurs de réseaux sociaux compatibles entre eux comme Mastodon, Friendica, Hubzilla, Kroeg, PeerTube et plus. Si vous avez un compte sur un des serveurs dans le fediverse, vous pouvez suivre et vous faire suivre par des personnes d'autres serveurs.

## Fédération

#### De quelle manière est-ce décentralisé?
Il existe plusieurs moyens de décentraliser quelque chose. Dans le cas de Mastodon, il s'agit d'un système «fédéré», plus proche du fonctionnement du courrier électronique que celui de «BitTorrent». Mastodon est un réseau constitué de différents serveurs appelés «instances» sur lesquels l'utilisateur·trice détient un ou plusieurs comptes, peut suivre et/ou interagir avec d'autres comptes quel que soient les instances sur lesquelles iels se trouvent.

#### Techniquement, comment fonctionne la fédération?
Depuis la version 1.6 de Mastodon, nous utilisons le protocole [ActivityPub](https://www.w3.org/TR/activitypub/). À l'heure actuelle, ActivityPub est candidat pour devenir un standard W3C.

Mastodon supporte toujours le protocole OStatus pour des raisons de compatibilité.

#### Quelles autres plateformes font aussi partie du réseau fédéré?
Le réseau (le «fediverse») existait déjà avant Mastodon, peuplé par des serveurs de GNU social, Friendica, Hubzilla, Diaspora etc. Tous ces serveurs ne sont pas complètement compatibles entre eux. Mastodon est compatible avec les autres logiciels qui implémentent le protocole ActivityPub, et quelques logiciels qui implémentent OStatus. De nouveaux logiciels sont arrivés récemment dans le fediverse, notamment PeerTube et Kroeg.

#### Combien de personnes sont sur Mastodon ? Il y a-t-il un historique du nombre d'utilisateur que je peux consulter ?
Deux volontaires indépendants traquent les statistiques du réseau de Mastodon en en parcourant les APIs publiques des instances:
- Tableau des nombres d'utilisateur·trice·s de [instances.social](https://instances.social/): <https://instances.social/list/old>
- Graphique de la croissances du nombre d'utilisateur·trice·s de [mnm.social](https://mnm.social): <https://dashboards.mnm.social/dashboard/db/user-growth?orgId=1>

Ces chiffres sont seulement des estimations, car la collecte des données repose sur la découverte des instances (les serveurs de Mastodon n'envoient aucune donnée statistique automatiquement).

## Organisation

#### Comment est financé Mastodon?
Le développement de Mastodon et l'hébergement de mastodon.social sont financés grâce à [Patreon](https://www.patreon.com/mastodon) et [Liberapay](https://liberapay.com/Mastodon/). En dehors de ce financement, le projet n'est pas intéressé par des financements capital risque, la monétisation, la publicité ou toute autre chose de la sorte. Il est aussi possible d'envoyer des dons via:
- [PayPal](https://www.paypal.me/gargron)
- BTC: `17j2g7vpgHhLuXhN4bueZFCvdxxieyRVWd`
- ETH: `0xC2d182De4604655CD420aE5739aE603DD7305C85`

Le logiciel est gratuit et open source, et les communautés doivent héberger elles-mêmes leurs serveurs si elles le peuvent, de manière à ce que les coûts soient également plus ou moins distribués. Beaucoup d'instances ont leur propre page Patreon ou Liberapay, ainsi que d'autres moyens de financement participatif.

## Usage Personnel

#### Mastodon ressemble beaucoup à Twitter. Quelles sont les différences ?
Mastodon est décentralisé. Chacun peut proposer son propre serveur Mastodon, avec ses propres règles de communauté. Twitter est un service fourni par une seule autorité centrale, et fixe les règles pour tout le monde.

#### Comment choisit-on quelle instance utiliser?
[Il existe beaucoup d'instances](https://instances.mastodon.xyz/list) pour à peu près tous les goûts. Il est courant d'essayer quelques instances publiques lorsqu'on est à la recherche de celle qui semble convenir le mieux. Parler de ses centres d'intérêt sur une instance publique comme [Mastodon.Social](https://mastodon.social) peut aider à se faire inviter sur d'autres instances.

Vous trouverez un aperçu de la timeline fédérée d'une instance sur sa page d'accueil. Pour avoir un aperçu de ce que les utilisateurs d'une instance disent, vous pouvez utiliser [cet outil d'aperçu](http://www.unmung.com/mastoview?url=mastodon.social&view=local) créé par [Kevin Marks](https://mastodon.social/@kevinmarks).

#### Comment puis-je utiliser Mastodon sur Android?
Si vous utilisez Chrome ou Firefox pour Android, vous pouvez ajouter Mastodon à votre écran d'accueil. Le comportement sera le même qu'une application native, y compris les notifications push. Sinon, essayez [Tusky](https://play.google.com/store/apps/details?id=com.keylesspalace.tusky), [Mastalab](https://play.google.com/store/apps/details?id=fr.gouv.etalab.mastodon) ou [Tootdon](http://tootdon.club/).

#### Comment puis-je utiliser Mastodon sur iPhone?
Essayez [Amaroq](https://itunes.apple.com/us/app/amaroq-for-mastodon/id1214116200).

#### Est-ce qu'il y a d'autres applications mobile/de bureau/en ligne de commande?
[Oui.](Apps.md)

#### Comment puis-je rechercher quelque chose?
Il est possible de rechercher des personnes ou des mots-dièse (hashtags), mais pas du texte. Utilisez le champ au-dessus de la zone de pouet. Si vous utilisez la version mobile, cliquez sur le crayon pour afficher cette zone.

#### Comment envoyer un message directement à quelqu'un?
En cliquant sur la **planète** en dessous de votre pouet, vous pouvez accéder aux paramètres de confidentialité, y compris les messages directs.

#### Est-ce qu'il y a des instances avec lesquelles mon instance ne se fédère pas? Comment puis-je le savoir?
Certaines instances sont privées et ne fédèreront pas avec votre instance. D'autres peuvent être bloquées par votre instance. Pour en savoir plus sur la façon dont votre instance se fédère avec les autres, contactez votre admin.

#### Est-ce que je peux avoir plusieurs comptes? Puis-je utiliser la même adresse email sur différentes instances?
Oui et oui! Si vous trouvez une autre instance que vous voudriez rejoindre, rejoignez-la! Sachez cependant que certaines instances ne permettent pas de s'y inscrire, et qu'il est possible que quelqu'un y utilise déjà votre pseudonyme favori.

#### Est-il possible d'importer les comptes que je suis avec mon compte d'une instance à une autre?
Oui. Cette opération peut prendre du temps en fonction de l'instance vers laquelle vous allez. Contactez l'admin de votre nouvelle instance si vous rencontrez des difficultés.

#### Comment puis-je empêcher les gens d'usurper mon identité?
Comme tout le monde peut créer un compte sur n'importe quelle instance, il est impossible d'empêcher les  autres utilisateurs d'utiliser le même nom d'utilisateur que vous sur une autre instance. Pour s'identifier auprès des autres utilisateurs, certaines personnes maintiennent leur propre instance avec pour unique utilisateur leur compte, ou utilisent [Keybase](https://keybase.io/).

#### Comment activer l'identification à deux facteurs (2FA)?
L'option se trouve dans Préférences, sous le menu «Identification à deux facteurs». [Le 2FA de Mastodon](2FA.md) utilise un QR code et un mot de passe texte.

#### Pourquoi ne puis-je pas voir les pouets de certaines personnes?
Il y a plusieurs raisons pour que cela se produise. Les posts de cette personne sont peut-être privés. Il faut suivre un compte pour voir ses pouets qui ne sont pas publics. Si quelqu'un vous a bloqué·e, il ne sera plus possible de voir ses posts non publics.

#### Quelles sont les tendances?
Le suivi des sujets tendances n'est pas supporté.

#### Qu'est-ce que «CW»?
«CW» signifie «Alerte sur le contenu» («Content Warning» en anglais). Il est utilisé pour cacher le contenu d'un pouet, comme les «spoilers».

#### Comment fonctionne l'option «Marquer le média comme sensible» («NSFW» - Not Safe For Work)?
Quand vous joignez une image à votre post en utilisant l'icône «appareil photo», une option supplémentaire apparaît (en général «NSFW»). Cliquer dessus va cacher l'image derrière une alerte «Contenu Sensible», permettant aux autres de ne voir l'image postée que s'iels le souhaitent, en cliquant dessus.

#### Qu'est-ce qui se passe sur Mastodon avec les ananas?
L'ananas, c'est bon. Et ça fait rire les gens. Contentez-vous de ça.

### Je vois souvent «Awoo», qu'est-ce que ça veut dire?
Essayez de le dire à haute voix («Awou»). C'est rigolo!

#### Comment puis-je supprimer mon compte?
Cliquez sur «Préférences» (l'engrenage, dans la zone en haut à gauche de l'écran), puis dans le menu «Sécurité» cliquez sur le lien sous «Supprimer le compte». **Supprimer un compte est irreversible. Le nom d'utilisateur restera indisponible pour toujours.**

#### Qui est l'admin de mon instance et comment la·le contacter/suivre?
Cliquez sur **Pour Commencer**, puis **Plus d'informations**. Cela affiche une page d'information. Normalement, les informations de contact de l'admin sont ici!

#### Oulah, je vois souvent du contenu offensant qui provient d'une même instance, est-ce qu'il y a un moyen de bloquer *tous* ces contenus?
Visitez la page d'un·e utilisateur·trice de l'instance que vous souhaitez bloquer, puis cliquez sur le menu déroulant sur la gauche juste au-dessus de ses pouets. Il devrait y avoir une option pour cacher tout le contenu provenant de l'instance de cet utilisateur.

#### Est-ce que Mastodon est modéré?
Chaque instance gère sa modération différemment, et chaque instance a ses propres modérateur·trice·s. C'est une bonne chose de demander quelles sont les règles concernant votre instance. La plupart du temps, les règles concernants une instance se trouvent sur la page à «propos» ([comme la page «plus» sur Mastodon.social](https://mastodon.social/about/more))

#### Comment puis-je signaler du contenu offensant?
Sous chaque post, il y a des points de suspension. En cliquant dessus, vous pouvez soit étendre le poste, soit signaler son contenu. Lors d'un signalement, pensez à bien sélectioner tous les posts qui nécéssitent l'attention de votre admin.

#### Que faire en cas de harcèlement?
Si votre admin prend le harcèlement au sérieux, vous pouvez le lui signaler via le système de signalement des posts: via les points de suspension («…») sous le post, ou en contactant votre admin directement.

#### Est-ce que je peux écrire des messages privés à des personnes d'autres instances?
Oui, normalement. Cependant, les messages privés ne sont *pas sécurisés*. Il est déconseillé d'envoyer des informations sensibles via des messages privés.

#### À quoi sert l'option «Ajuster la confidentialité du message» et comment est-ce que ça marche?
L'icône de **globe** sous la zone de pouet permet d'ajuster la confidentialité du post en changeant qui peut voir le message. Voici ce qui se passe:

| Option de confidentialité | Diffusé à                       | Visible par                     | Notes |
| ------------------------- | ------------------------------- | ------------------------------- | ----- |
| Public                    | Les fils publics                | Tout le monde                   | Sur votre instance, il apparaîtra dans tous les fils. Il apparaîtra aussi sur les fils fédérés et de hashtag des instances sur lesquels vous avez des followers. |
| Non-listé                 | Abonnés seulement               | Tout le monde                   |       |
| Privé                     | Abonnés seulement               | Abonné seulement                | Ne peuvent pas être boostés. Les personnes mentionnées recevront aussi une copie. |
| Direct                    | Personnes mentionnées seulement | Personnes mentionnées seulement | Ne peuvent pas être boostés. |

#### Puis-je utiliser des hashtags (mot-dièse)? Est-ce conseillé?
Oui! Les Hashtags sont traqués et sont souvent rigolos, mais aussi servent parfois à éviter à certaines personnes de tomber sur des posts offensants. Les Hashtags sont particulièrements appréciés pour les posts publics à propos de #POLITIQUE (#POLITICS), #SANTÉ (#HEALTH), #DÉPRESSION (#DEPRESSION), ou de sujets #LEWD ou #NSFW. De tels posts sont aussi ce pourquoi la fonctionnalité d'alerte concernant le contenu (Content Warning) a été créée.

#### Comment puis-je être vérifié, avec un “✅”?
“✅” est un emoji, *juste* pour rire. Il n'y a pas de vérification de compte sur Mastodon, puisque la vérification se fait traditionnellement via une autorité centrale. Vous pouvez copier/coller un “✅” dans votre description si vous le souhaitez, mais cela n'a aucun effet. Si vous voulez vraiment prouver votre identité, crééz des liens vers votre profil Mastodon depuis des sites sur lesquels votre identité est vérifiée, ou utilisez Keybase pour une vérification cryptographique.

#### Puis-je modifier un pouet?
Non, désolé. Mais vous pouvez toujours supprimer un pouet et le réécrire…

#### Si je supprime un post, est-il supprimé partout?
La suppression d'un post se propage de la même façon que lorsque le post a été émis. Cela veut donc dire que oui, il est supprimé partout. Il peut y avoir des décalages dues aux temps de transport de l'information et de traitement. Dans de rares circonstances, il se peut qu'une copie persiste quelque part, notamment si le post était public.

#### Comment puis-je voir mes pouets favoris?
Cliquez sur **Pour Commencer**, puis **Favoris**. Si votre menu **Pour Commencer** n'est pas ouvert, il s'agit de l'icône astérisque (\*) dans la barre de navigation.

#### Puis-je citer un pouet?
Non. Il est possible d'utiliser un lien vers un pouet comme avec n'importe quelle page web, mais nous pensons que la fonctionnalité de citation encourage un comportement toxique. Elle est donc ommise délibéremment.

#### Si mon instance ferme définitivement, est-ce que je perds mes données?
Oui.

#### Puis-je faire une sauvegarde de mes données?
Oui, en partie! C'est sous le menu **Préférences->Export des données**

#### Je ne peux pas voir les pouets d'un·e utilisateur·trice distant·e sous leur description!
Dans la **Vue Étendue** du profil, cliquez sur son avatar. Cela va vous rediriger sur son instance, et afficher tous ses pouets publics. Vous pouvez aussi ouvrir n'importe quel lien vers son nom d'utilisateur·trice dans un nouvel onglet.

#### Comment puis-je voir les conversations (threads)?
Cliquez sur un pouet ou sur l'option **Déplier ce statut** dans le menu déroulant en bas de celui-ci pour accéder à sa **Vue Étendue**. Cela va afficher les autres pouets qui lui sont reliés.

#### Comment puis-je créer un lien vers un pouet?
L'horodatage (parfois affiché de façon relative; par exemple «2m» pour «il y a 2 minutes») d'un pouet renvoie toujours vers la page publique (permalien) de ce pouet. Faites un **clic droit** et choisissez **copier la destination du lien**.

#### Comment puis-je avoir un lien vers mon profil?
Via un **clic droit** sur votre avatar ou votre nom d'utilisateur·trice, puis en choisissant **Copier la destination du lien**.

#### Est-ce que le clic sur un #hashtag affiche des pouets locaux uniquement ou des pouets fédérés?
Le fil des hashtag est le fil fédéré auquel on applique un filtre. On peut donc voir tous les pouets fédérés.

#### Quand je masque un boost, qui est mis en sourdine: La personne qui booste le pouet ou l'auteur·e de celui-ci?
L'auteur·e. Vous pouvez mettre en sourdine les boosts d'un·e utilisateur·trice que vous suivez depuis son profil.

#### Est-il possible d'avoir un aperçu des personnes d'une instance et de ce qu'elles postent?
Oui, la page d'accueil de chaque instance fournit un aperçu des posts, sauf si cette fonctionnalité a été desactivée par l'admin.

#### Comment puis-je masquer les pouets dans les langues que je ne comprends pas?
Ouvrez les **Préférences** et sélectionnez les langues que vous voulez masquer. Souvenez-vous que la détection de la langue est automatique et donc imparfaite. Il est possible que vous voyiez apparaître des pouets que vous ne comprenez pas, mais ça ne signifie pas que les filtres fonctionnent mal.

#### La traduction automatique est-elle supportée?
Non, mais il existe un [script Firefox TamperMonkey](https://github.com/tomouchuu/mastodon-translate) qui pourrait vous convenir.

#### Est-ce que les pouets se fédèrent automatiquement ou sont-ils d'abord locaux?
La fonction première de Mastodon est de faire parvenir vos pouest à vos followers. Vos pouets ne quittent pas votre instance tant que vous n'avez pas de follower sur d'autres instances. Ils sont transmis uniquement aux instances de vos followers s'il sont sur d'autres instances. Il y a d'autres cas de figure, par exemple lorsque vous adressez un message à un·e utilisateur·trice d'une autre instance sans qu'iel vous suive. Mastodon ne fait aucune distinction de traitement des pouets, qu'ils soient destinés à des followers de votre instance ou d'une autre. Cependant, les fils «fédérés» et «locaux» que vous pouvez parcourir n'affichent que des pouets «publics». Choisir «Non-listé» ou un paramètre de confidentialité plus fort empêchera votre pouet de s'afficher dans ces fils. De la même manière, un pouet non listé n'apparaîtra pas dans un fil de hashtag, même si vous utilisez ce hashtag dans le contenu du pouet.

#### Quelle est la taille limite pour l'envoi d'images?
La limite est de 8 megaoctets (8Mo).

#### Quel type de fichier peut être posté?
Les images PNG, JPEG, et GIF, ainsi que les vidéos WebM et MP4. Un GIF sera automatiquement converti en MP4 muet, qui se comportera comme un GIF sur l'interface de Mastodon. Pareil pour une vidéo MP4 ou WebM muette.

#### Comment puis-je installer et démarrer ma propre instance de Mastodon?
Voir le [Guide Utilisateur](../README.md), sous la partie «Running Mastodon.»

#### J'ai trouvé un bogue ou j'ai une suggestion pour Mastodon.
Vous pouvez reporter un bogue ou soumettre des suggestions via le [Traqueur de problèmes (issues en anglais) de Mastodon.](https://github.com/tootsuite/mastodon/issues)

#### Hey, j'adore les FAQs sur Mastodon! Y en a-t-il d'autres?
En voici quelques unes, fruit du dur labeur d'autres personnes souhaitant aussi aider la communauté de Mastodon (contenu externe, en anglais).

* <https://gist.github.com/joyeusenoelle/74f6e6c0f349651349a0df9ae4582969>
* <https://hastebin.com/raw/xuqogukimu>
* <https://github.com/ThomasLeister/masto-faq>
* <http://mastoguide.info/Pages/FAQindex.html>
* <https://medium.com/tebelorg/my-first-10-days-on-mastodon-fediverse-f6f1d73db8d7>
* <https://github.com/tootsuite/documentation/blob/master/Using-Mastodon/FAQ.md>
---
Cette FAQ a été compilée avec les contributions de [@Gargron](https://mastodon.social/@Gargron), [@raccoon](https://mastodon.social/@Raccoon), [@upside](https://octodon.social/@upside), [@zacanger](https://mastodon.social/@zacanger), [@NthTensor](https://octodon.social/@NthTensor), [@ametlles](https://mastodon.social/@ametlles), [@magikarp](https://hostux.social/@magikarp) et plein d'autres personnes du fediverse!
