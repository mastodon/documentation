Preguntas frecuentes
==========================

## Terminología

#### ¿Qué es un *Mastodon*?
Es un animal prehistórico, predecesor del mamut. En esencia es un elefante peludo. Los mastodontes hacen “toot” (al menos en inglés, en español berrearían, ¿no?).

#### ¿Por qué el nombre *Mastodon*?
Existe una banda de metal progresivo con el mismo nombre.

#### ¿Qué es una “federación”?
Es un grupo de servidores de Mastodon que pueden hablar unos con otros sin problemas.

#### ¿Qué es una “instancia”?
Es un servidor en el que puedes tener una cuenta. Cada instancia tiene sus propias políticas y reglas, ¡porque pueden ser administradas por cualquiera!

#### No entiendo la diferencia entre historia (*timeline*) local e historia federada.
Los toots “locales” corresponden al servidor en el que te registraste. La “federada” son todos los toots que tu servidor recibe de distintos servidores (es más complicado, pero la versión corta es: “los toots de gente que tú y otros usuarios locales siguen”).

#### ¿Qué otras plataformas son parte de la red federada (*fediverso*)?
Llamemos a la red federada “fediverso”. Esto es la red de servidores de redes sociales que son compatibles como por ejemplo Mastodon, Friendica, Hubzilla, Kroeg, PeerTube y más. Normalmente si tiene una cuenta en un servidor del *fediverso*, puede seguir y ser seguido a personas de otros servidores compatibles.

## Federación

#### ¿Por qué Mastodon es una red descentralizada?
Hay diferentes maneras en las cuales algo puede ser descentralizado;  en este caso, Mastodon es del tipo “federado”. Piensa en el correo electrónico, no tanto en los servicios torrent para compartir archivos: existen muchos servidores distintos (“instancias”) y los usuarios tienen una cuenta en alguno de estos servidores, pero pueden interactuar y seguirse entre ellos sin importar en qué servidor esté su cuenta.

#### Técnicamente, ¿cómo funciona la federación?

Desde la versión 1.6 de Mastodon estamos utilizando el protocolo [ActivityPub](https://www.w3.org/TR/activitypub/) que es un estándar recomendado por la w3C. Mastodon todavía mantiene el protocolo OStatus por cuestiones de compatibilidad.

#### ¿Qué más forma parte de la red federada?

La red ("fediverso") ha existido antes de que existiera Mastodon, poblada por servidores de GNU social, Friendica, Hubzilla, Diaspora etc. No todos esos servidores son totalmente compatibles con todos los demás. Mastodon es compatible con otro software que implemente el protocolo ActivityPub y con algún software que implemente OStatus. Algunas recientes incorporaciones al fediverso son PeerTube and Kroeg.

#### ¿Cuánta gente está registrada en Mastodon? ¿Puedo ver una gráfica con el número de usuarios a través del tiempo? 
Dos voluntarios independientes realizan un seguimiento de las estadísticas de la red Mastodon rastreando las API públicas de instancias conocidas:

- [instances.social](https://instances.social) es la gráfica para ver las cuentas de usuarios: <https://instances.social/list/old> 
- [mnm.social](https://mnm.social) es la gráfica que muestra el crecimiento: <https://dashboards.mnm.social/dashboard/db/user-growth?orgId=1>

Estas gráficas tienen que ser tomadas como una estimación ya que todos los datos son voluntarios y la recopilación está basada en los descubrimientos (Los servidores de Mastodon no envían ninguna estadística a ninguna parte de manera automática).

## Organización

#### ¿Cómo se financia Mastodon?
El desarrollo de Mastodon y el alojamiento web de mastodon.social es financiado por medio de [Patreon](https://www.patreon.com/mastodon) y [Liberapay](https://liberapay.com/Mastodon/). Más allá de lo anterior, no estoy interesado en financiamiento de capital de riesgo (*VC funding*), monetización, dinero a través de anunciantes, ni nada parecido.

El software es libre y gratuito, y las comunidades deberían alojar sus propios servidores si pueden hacerlo, de esa manera los costos quedan más o menos distribuidos. Muchas instancias tienen sus propios medios de financiación mediante Patreon o Liberapay, entre otros métodos para financiar comunidades.

## Uso personal

#### Mastodon se parece mucho a Twitter, ¿cuál es la diferencia?
Mastodon es una red social descentralizada; cualquiera puede iniciar y mantener su propio servidor de Mastodon, bajo las reglas para su comunidad que elija. Twitter es manejado por una autoridad centralizada y establece reglas que se aplican a todos.

#### ¿Cómo elijo qué instancia o nodo usar?
[Existen muchas instancias](https://joinmastodon.org/#getting-started) para  casi cualquier interés. Está bien si quieres probar un par de nodos públicos mientras encuentras algún otro que te agrade. Comentar tus intereses en una instancia pública, como [Mastodon.social](https://mastodon.social) puede ayudar a que te inviten a otras instancias más específicas.

Puede tener un primer contacto con lo que sucede en el *timeline* de una instancia, echando un vistazo a su página principal. También puede ver una *preview* de lo que sucede en un nodo utilizando [esta herramienta](http://www.unmung.com/mastoview?url=mastodon.social&view=local) creada por [Kevin Marks](https://mastodon.social/@kevinmarks).

#### ¿Cómo puedo usar Mastodon en mi Android?
Si utiliza los navegadores Chrome o Firefox para Android, puede añadir Mastodon a su página de inicio. Esto hará que actúe como una aplicación nativa en muchos aspectos incluyendo las notificaciones *push*. También tiene la posibilidad de usarlo probando [Tusky](https://play.google.com/store/apps/details?id=com.keylesspalace.tusky), [Mastalab](https://play.google.com/store/apps/details?id=fr.gouv.etalab.mastodon) o [Tootdon](http://tootdon.club/).

#### ¿Cómo puedo usar Mastodon en mi iPhone?
Pruebe [Amaroq](https://itunes.apple.com/us/app/amaroq-for-mastodon/id1214116200).

#### ¿Existen otras apps para móvil/escritorio/cli?
[Sí.](Apps.md)

#### ¿Cómo hago búsquedas?
Puede realizar búsquedas de usuarios y etiquetas o *hashtags*, y si su instancia lo permite, puede realizar búsquedas de mensajes o *toots* que haya escrito, que haya vuelto a compartir, haya marcado como favorito o en los que haya sido mencionado, pero no puede realizar búsquedas de texto en general. Utilice el cuadro de texto superior que aparece encima del área donde se escriben los *toots*. Si está navegando mediante su dispositivo móvil, haga clic en el bolígrafo en la navegación.

<img src="screenshots/search.png" alt="Search Box" height="200"/>

#### ¿Cómo mando un DM (Mensaje Directo)?
Haga clic en el **icono de globo** que aparece debajo de tu *toot* para cambiar las opciones de privacidad, las cuales incluyen mensajes directos (DM).

<img src="screenshots/compose-globe.png" alt="Privacy Globe" height="400"/>

#### ¿Hay instancias con las cuales no federa la instancia en la que estoy? ¿Cómo puedo saberlo?
Algunas instancias son privadas y por lo tanto no federarán con su instancia. Otros podrían haber sido bloqueados por su instancia. Puedes preguntar a tu admin para saber más sobre con cuáles nodos están federando.

#### ¿Puedo tener más de una cuenta? ¿Puedo usar la misma dirección de correo electrónico en diferentes instancias?
¡Sí y sí! Si encuentras alguna otra instancia a la que te gustaría unirte, ¡regístrese! Tome nota de que no todas las instancias están abiertas para que se inscriban nuevos miembros y también es posible que alguien ya se haya registrado con su nombre de usuario preferido.

#### ¿Puedo importar las cuentas que sigo si me mudo de instancia o nodo?
Sí. Esto podría llevar bastante tiempo dependiendo la instancia a la que te estés mudando. Habla con quien administre tu nueva instancia si tienes dificultades.

#### ¿Cómo evito que alguien se haga pasar por mí?
Puesto que cualquiera puede crear cualquier nombre de usuario en cualquier instancia, es imposible prevenir que otras personas usen el mismo nombre de usuario en diferentes instancias. Algunas pesonas se han tomado el trabajo de instalar y mantener sus propias instancias personales de un solo usuario como forma de verificación, o usar [Keybase](https://keybase.io/).

#### ¿Cómo activo la Autenticación en Dos Pasos (**“Autenticación de dos factores”** en la página)?
La opción estará en **Preferencias** (*Preferences*). En el menú **Autenticación de Dos Factores** (*Two-factor Authentication*). La [Autenticación de Dos Factores de Mastodon](2FA.md) (enlace en inglés) usa tanto código QR como secretos en texto plano.

#### ¿Por qué no puedo ver los toots algunas personas?
Esto puede ocurrir por varias razones. Por una parte, puede que los toots de una persona sean privados. Tienes que seguir a una cuenta privada para poder ver el contenido no-público. Por otra parte, si alguien te ha bloqueado, ya no podrás ver ninguna de sus publicaciones.

#### ¿Qué son las tendencias?
Las tendencias o *Trending topics* no están actualmente registradas ni hay un seguimiento.

#### ¿Qué es “CW”?
“CW” son las siglas de “Content Warning” (advertencia sobre contenido). Puedes usar esta opción para esconder el texto o la imagen de un toot, como un *spoiler*.

#### ¿Cómo funciona la característica de “Marcar contenido como sensible” (“NSFW”)?

Cuando añades una imagen a un toot usando el icono de cámara, aparecerá un icono adicional (típicamente con la leyenda “NSFW”). Al hacer clic en este icono la imagen que acompaña el toot será ocultada por una advertencia de Contenido sensible, lo que previene que otros usuarios vean la imagen publicada a menos de que hagan clic en ella.

#### ¿Qué son las piñas?
Son deliciosas y hacen sonreír a la gente. Sólo sigue la corriente.

#### Veo mucho “Awoo” por todos lados, ¿qué significa?
Intenta decirlo en voz alta: “aúu”. ¡Es divertido!

#### ¿Cómo puedo borrar mi cuenta?
Haz clic en Ajustes, en el icono de la rueda dentada en la esquina superior izquierda de la aplicación y selecciona Ajustes, Editar Perfil. Desde ahí selecciona "Borrar cuenta". **Eliminar una cuenta es irreversible. Deleting an account is irreversible. El nombre de usuario permanecerá permanentemente como no disponible.**

#### ¿Quién es mi administrador? ¿Cómo me pongo en contacto o sigo a esa persona?
Haz clic en **Primeros pasos** en el icono de las tres barras horizontales en la esquina superior izquierda (*Getting Started*), luego en **Información adicional** (*Extended Information*). Se desplegará una página con información. Si esa información ha sido configurada por el administrador, se mostrará ahí.

#### Wow, sigo viendo cosas ofensivas por parte de usuarios de una instancia en particular, ¿hay alguna manera de bloquearla *por completo*?
Abre el perfil de cualquiera de esa instancia y haz clic en los tres puntos verticales que aparecen al lado de las estadísticas de sus publicaciones y escoje la opción "Silenciar todo de *nombre_instancia*".

#### ¿Alguien modera Mastodon?
Cada instancia maneja la moderación de manera distinta y cada uno tiene a sus propios moderadores. Es correcto preguntar qué reglas siguen la instancia en la que estás. Normalmente las reglas están publicadas en la página del nodo en el enlace **Acerca de esta instancia** (“About”), [como en la página de “more” en mastodon.social](https://mastodon.social/about/more).

#### ¿Cómo reporto contenido ofensivo?
Debajo de cada toot verás tres puntos. Haciendo clic en esos tres puntos te permitirá ver un menú que te ofrece las opciones de expandir un toot o reportar el contenido de éste. Al momento de reportar el contenido, por favor selecciona todos los toots que necesiten atención por parte de los moderadores.

#### ¿Qué hago si me acosan en Mastodon?
Si quien administra tu nodo o instancia se toma el acoso de manera seria, puedes reportarlo a través del sistema de reportes. Puedes acceder a éste por medio de los **tres puntos** debajo de cada toot o contactando directamente a tu admin.

#### ¿Mis mensajes privados pueden llegar a personas de otras instancias?
Desde la versión 1.6 o superior los mensajes privados (sólo para tus seguidores) y los mensajes directos deberían llegar a las personas que usen Mastodon. No se enviarán a los servidores que sólo implementan el protocolo OStatus. Sin embargo, es poco probable que encuentre tales servidores.

#### ¿Qué significa el icono de **Ajustar privacidad** (*Adjust Status Privacy*) y cómo funciona?
El **icono de globo terráqueo** debajo del área en la que escribes un toot te permite ajustar la privacidad del toot al modificar quién puede ver tu publicación. Esto es lo que sucede:

| Ajustes de privacidad | Destinatarios | Quién lo puede ver | Notas |
| --------------- | ----------- | ------ | ----- |
| Público (*Public*)       | Global, historias (*TLs*) públicas | Todos | En tu instancia, aparecerá visible en todas las líneas de tiempo (*timeline*). También aparecerá en líneas de tiempo de instancias desde tu tengas seguidores. |
| Sin federar (*Unlisted*) | Sólo tus seguidores | Todos |   |
| Privado (*Private*)      | Sólo tus seguidores |  Sólo tus seguidores | No puede ser retooteado. Las personas que sean mencionadas también recibirán una copia. |
| Directo (*Direct*)       | Sólo la gente mencionada  | Sólo la gente mencionada | No puede ser retooteado. |

#### ¿Puedo usar hashtags? ¿Debería de hacerlo?
¡Sí! Los hashtags son monitoreados y muchas veces son divertidos, pero algunos se usan para ayudar a otras personas a evitar contenido sensible. Esto es particularmente apreciado en toots públicos sobre política (#POLITICS), salud (#HEALTH), depresión (#DEPRESSION), temas osbscenos (#LEWD) o no apropiados en general (#NSFW). Para este tipo de temas sensibles es el motivo por el que se diseñó el sistema de *Content Warning*.

#### ¿Cómo hago para que mi cuenta sea verificada y tenga “✅”?
“✅” es un emoji, *sólo* usado por diversión. No hay cuentas verificadas en Mastodon, ya que para eso se necesita una autoridad central. Puedes copiar y pegar “✅” en tu biografía si quieres, pero no tiene mayor significado. Si de verdad quieres verificar tu identidad, enlaza tu perfil de Mastodon a otro sitio web donde tu identidad ya este confirmada, o utiliza Keybase para conseguir una verificación criptográfica.

#### ¿Se puede editar un toot?
No, lo siento. Pero puedes borrarlos y rescribirlos…

#### ¿Qué es mastodon.social?
Es la instancia (o nodo) “emblemática” de Mastodon, también conocida como el servidor que administro yo mismo ([@Gargron](https://mastodon.social/@Gargron)) con las modificaciones al código más recientes. No se supone que tenga que ser la única instancia al final de cuentas.

#### Intenté iniciar sesión en Mastodon con una app cliente para GNU social, pero no funcionó, ¿por qué?
Si bien Mastodon es compatible con GNU social en términos de comunicación de servidor a servidor, no sucede lo mismo con la comunicación de cliente a servidor API (o el cómo accedes a Mastodon). Por lo tanto, las apps que fueron hechas específicamente para GNU social no van a funcionar con Mastodon. La razón de esto es por una parte técnica y por la otra ideológica.

Como Mastodon ha sido creado en blanco, es mucho más simple hacer que la API refleje las estructuras internas de la manera más fiel posible, en lugar de crear una capa que las emule. Por otra parte, la API cliente de GNU social es de hecho una implementación a medias de la API de legado (*legacy*) de Twitter –esta es la razón por la que funciona con algunos clientes viejos para Twitter–. Sin embargo, muchas de estas apps dejaron de ser mantenidas, la API de GNU social no se mantuvo a la par de la API real de Twitter y nunca implementó todas sus características; al mismo tiempo, la API de Twitter nunca fue pensada para un servicio federado y por lo tanto obscurece una parte de su funcionalidad.


#### Me gustaría tener soporte para múltiples cuentas en Android.
Puedes probar [TootyFruity](https://play.google.com/store/apps/details?id=ch.kevinegli.tootyfruity221258).


#### ¿Tusky puede hacer ‘💇’? ¿Qué tal la característica “🔥”? ¿Y qué pasa con “⛱” en Tusky?
Puedes seguir o contactar a la cuenta de Tusky en  [@Tusky@mastodon.social](https://mastodon.social/@Tusky) o a los desarrolladores en [@Vavassor@mastodon.social](https://mastodon.social/@Vavassor) y [@daycode@mastodon.social](https://mastodon.social/@daycode).



#### Si borro un toot, ¿es borrado de todos lados?
Borrar un toot lo borrará de la historia (*timeline*) local. Sin embargo, si ya ha sido retooteado (*boosted*) todavía podrá ser visto y tal vez pueda ser federado.

#### ¿Cómo veo mis toots favoritos?
Haz click en **Primeros pasos** (*Getting Started*), luego en **Favoritos** (*Favourites*).

<img src="screenshots/toolbar-getting_started.png" alt="Getting Started Button" height="200"/>
<img src="screenshots/getting_started-favourites.png" alt="Favourites" height="200"/>

#### ¿Se puede citar un toot?
No por el momento. Debes copiar y pegar manualmente el texto del toot para citarlo.

#### Si cierran para siempre la instancia o el nodo en el que estoy, ¿perdería todos los datos de mi cuenta?
Sí, así es.

#### ¿Puedo salvar los datos de mi cuenta?
Sí, ¡una parte de ellos! Sólo ve a **Preferencias** (*Preferences*) y luego a **Exportar información** (*Data export*).

<img src="screenshots/preferences-data_export.png" alt="Data Export" height="400"/>

#### No puedo ver los toots de un usuario remoto (de otra instancia) al ir a su bio!
Ve a la **vista expandida** de su perfil, luego haz click en su imagen de perfil. Al hacerlo irás directamente al servidor en el que se aloja la cuenta, el cual desplegará todos sus toots públicos.

<img src="screenshots/profile-avatar_click.png" alt="Click their avatar" height="200"/>
<img src="screenshots/profile-webpage_URL.png" alt="Native webpage view" height="200"/>

#### ¿Cómo veo un hilo de toots?
Haz click en el texto del toot para ver la **vista expandida** de éste. Te mostrará el hilo al que el toot está conectado.

#### ¿Cómo obtengo la liga de un toot?
Hay dos ligas permanentes (*permalinks*) para los toots. Puedes hacer **click derecho** en la marca de tiempo localizada en el encabezado del toot. O en los toots expandidos, haz **click derecho** en la fecha que aparece abajo del toot.

<img src="screenshots/inline_toot-timestamp_link.png" alt="Inline View Permalink" height="200"/>
<img src="screenshots/expanded_view-permalink.png" alt="Expanded View Permalink" height="200"/>

#### ¿Cómo obtengo la liga de mi perfil?
Haz **click derecho** en tu imagen de perfil y luego selecciona **Copiar dirección de enlace**.

<img src="screenshots/link_to_profile.png" alt="URL for Profile" height="200"/>

#### Al hacer click en un #hashtag, ¿los resultados que se muestran son de toots locales o federados?
Federados.

#### Cuando silencio un retoot (*boost*), ¿a quién estoy silenciando? ¿A quien hizo el retoot o al autor original?
Al autor original del toot.

#### ¿Puedo ver un *preview* de los miembros de una instancia cualquiera y de lo que están tooteando?
Sí, prueba [esta excelente herramienta](http://www.unmung.com/mastoview?url=mastodon.social&view=local) para ver *previews* de instancias.

#### ¿Cómo filtro los toots en idiomas que no entiendo?
El equipo de desarrolladores están trabajando en un filtro para esto junto con otras opciones de filtrado. ¡Mantente en tu asiento!

#### ¿Hay soporte para hacer traducciones automáticas de los toots?
Todavía no, pero el [script para TamperMonkey en Firefox](https://github.com/tomouchuu/mastodon-translate) podría funcionarte.

#### ¿Los toots automáticamente son publicados en la federación o se quedan en la instancia local?
Por default los toots están federados (son públicos) y se mostrarán tanto en la historia (*timeline*) local como en la federada. Puedes cambiar esté comportamiento default al hacer click en **Preferencias** (*Settings*) > **Preferencias** (*Preferences*) > **Privacidad de publicaciones** (*Post Privacy*).

<img src="screenshots/toolbar-getting_started.png" alt="Getting Started Button" height="200"/>
<img src="screenshots/getting_started-preferences.png" alt="Preferences" height="200"/>
<img src="screenshots/preferences-post_privacy.png" alt="Post Privacy" height="400"/>

#### ¿Cómo hago mi propia instancia o nodo?
Lee la [Guía de Usuario](../README.md), bajo el encabezado “Running Mastodon” (guía en inglés).

#### Encontré un error/tengo una sugerencia para Mastodon.
Puedes reportar errores o enviar sugerencias al [Rastreador de Problemas de Mastodon](https://github.com/tootsuite/mastodon/issues) (liga en inglés).

#### ¿Existen nodos o instancias sólo para hispanoparlantes o específicas para un país de habla española?
Por supuesto, en este momento ya existen varias instancias dirigidas a hablantes de español y a comunidades de países específicos. Esta es la lista hasta hoy:

*	Para hispanohablantes en general: [https://mastodones.club/](https://mastodones.club/)

*	México: [https://mstdn.mx/](https://mstdn.mx/)

*	Argentina: [https://mastodonar.club/](https://mastodonar.club/)

*	Uruguay: [https://mastodon.undernet.uy/](https://mastodon.undernet.uy/)

*	Perú: [https://mastodon.pe/](https://mastodon.pe/)

#### Ey, ¡me encantan las Preguntas Frecuentes sobre Mastodon! ¿Dónde hay más?
Aquí hay algunas más de individuos muy trabajadores que también quieren ayudar (ligas en inglés):

* [https://hastebin.com/raw/xuqogukimu](https://hastebin.com/raw/xuqogukimu)

* [https://github.com/ThomasLeister/masto-faq](https://github.com/ThomasLeister/masto-faq)

* [http://mastoguide.info/Pages/FAQindex.html](http://mastoguide.info/Pages/FAQindex.html)

* [https://medium.com/tebelorg/my-first-10-days-on-mastodon-fediverse-f6f1d73db8d7](https://medium.com/tebelorg/my-first-10-days-on-mastodon-fediverse-f6f1d73db8d7)

* [https://github.com/tootsuite/documentation/blob/master/Using-Mastodon/FAQ.md](https://github.com/tootsuite/documentation/blob/master/Using-Mastodon/FAQ.md)

---
Este documento de Preguntas Frecuentes fue formado con las contribuciones de [@Gargron](https://mastodon.social/@Gargron),  [@raccoon](https://mastodon.social/@Raccoon), [@upside](https://octodon.social/@upside), [@zacanger](https://mastodon.social/@zacanger), [@NthTensor](https://octodon.social/@NthTensor), [@ametlles](https://mastodon.social/@ametlles), ¡y mucha otra gente del fediverso!

Traducción al español por [@ametlles](https://mastodon.social/@ametlles). ¡Gracias a [@ara_batur](https://mastodones.club/@ara_batur) por los cambios sugeridos!
