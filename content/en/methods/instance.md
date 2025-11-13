---
title: instance API methods
description: Discover information about a Mastodon server.
menu:
  docs:
    weight: 70
    name: instance
    parent: methods
    identifier: methods-instance
aliases: [
  "/methods/instance",
  "/api/methods/instance",
]
---

<style>
#TableOfContents ul ul ul {display: none}
</style>

## View server information {#v2}

```http
GET /api/v2/instance
```

Obtain general information about the server.

**Returns:** [Instance]({{< relref "entities/Instance" >}})\
**OAuth:** Public\
**Version history:**\
4.0.0 - added\
4.1.0 - added `configuration.urls.status`\
4.2.0 - added `registrations.url`
4.3.0 - added `configuration.vapid.public_key`, `api_versions`, `configuration.accounts.max_pinned_statuses`, `icon`
4.4.0 - added `configuration.urls.about`, `configuration.urls.privacy_policy`, `configuration.urls.terms_of_service`, `registrations.min_age`, `registrations.reason_required`, `configuration.limited_federation`

#### Response

##### 200: OK

```json
{
  "domain": "mastodon.social",
  "title": "Mastodon",
  "version": "4.5.0-nightly.2025-07-11",
  "source_url": "https://github.com/mastodon/mastodon",
  "description": "The original server operated by the Mastodon gGmbH non-profit",
  "usage": {
    "users": {
      "active_month": 279347
    }
  },
  "thumbnail": {
    "url": "https://files.mastodon.social/site_uploads/files/000/000/001/@1x/57c12f441d083cde.png",
    "blurhash": "UeKUpFxuo~R%0nW;WCnhF6RjaJt757oJodS$",
    "versions": {
      "@1x": "https://files.mastodon.social/site_uploads/files/000/000/001/@1x/57c12f441d083cde.png",
      "@2x": "https://files.mastodon.social/site_uploads/files/000/000/001/@2x/57c12f441d083cde.png"
    }
  },
  "icon": [
    {
      "src": "https://mastodon.social/packs/assets/android-chrome-36x36-DLiBQg3N.png",
      "size": "36x36"
    },
    {
      "src": "https://mastodon.social/packs/assets/android-chrome-48x48-C7lKWFwX.png",
      "size": "48x48"
    },
    {
      "src": "https://mastodon.social/packs/assets/android-chrome-72x72-9LRpA3QN.png",
      "size": "72x72"
    },
    {
      "src": "https://mastodon.social/packs/assets/android-chrome-96x96-BKKwkkY-.png",
      "size": "96x96"
    },
    {
      "src": "https://mastodon.social/packs/assets/android-chrome-144x144-D-ewI-KZ.png",
      "size": "144x144"
    },
    {
      "src": "https://mastodon.social/packs/assets/android-chrome-192x192-jYKJbpas.png",
      "size": "192x192"
    },
    {
      "src": "https://mastodon.social/packs/assets/android-chrome-256x256-DXt2vsq7.png",
      "size": "256x256"
    },
    {
      "src": "https://mastodon.social/packs/assets/android-chrome-384x384-CbK7cG33.png",
      "size": "384x384"
    },
    {
      "src": "https://mastodon.social/packs/assets/android-chrome-512x512-Dz2ThkhV.png",
      "size": "512x512"
    }
  ],
  "languages": [
    "en"
  ],
  "configuration": {
    "urls": {
      "streaming": "wss://streaming.mastodon.social",
      "status": "https://status.mastodon.social",
      "about": "https://mastodon.social/about",
      "privacy_policy": "https://mastodon.social/privacy-policy",
      "terms_of_service": null
    },
    "vapid": {
      "public_key": "BCk-QqERU0q-CfYZjcuB6lnyyOYfJ2AifKqfeGIm7Z-HiTU5T9eTG5GxVA0_OH5mMlI4UkkDTpaZwozy0TzdZ2M="
    },
    "accounts": {
      "max_featured_tags": 10,
      "max_pinned_statuses": 5
    },
    "statuses": {
      "max_characters": 500,
      "max_media_attachments": 4,
      "characters_reserved_per_url": 23
    },
    "media_attachments": {
      "description_limit": 1500,
      "image_matrix_limit": 33177600,
      "image_size_limit": 16777216,
      "supported_mime_types": [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/heic",
        "image/heif",
        "image/webp",
        "image/avif",
        "video/webm",
        "video/mp4",
        "video/quicktime",
        "video/ogg",
        "audio/wave",
        "audio/wav",
        "audio/x-wav",
        "audio/x-pn-wave",
        "audio/vnd.wave",
        "audio/ogg",
        "audio/vorbis",
        "audio/mpeg",
        "audio/mp3",
        "audio/webm",
        "audio/flac",
        "audio/aac",
        "audio/m4a",
        "audio/x-m4a",
        "audio/mp4",
        "audio/3gpp",
        "video/x-ms-asf"
      ],
      "video_frame_rate_limit": 120,
      "video_matrix_limit": 8294400,
      "video_size_limit": 103809024
    },
    "polls": {
      "max_options": 4,
      "max_characters_per_option": 50,
      "min_expiration": 300,
      "max_expiration": 2629746
    },
    "translation": {
      "enabled": true
    },
    "limited_federation": false
  },
  "registrations": {
    "enabled": true,
    "approval_required": false,
    "reason_required": false,
    "message": null,
    "min_age": 16,
    "url": null
  },
  "api_versions": {
    "mastodon": 6
  },
  "contact": {
    "email": "staff@mastodon.social",
    "account": {
      "id": "13179",
      "username": "Mastodon",
      "acct": "Mastodon",
      "display_name": "Mastodon",
      "locked": false,
      "bot": false,
      "discoverable": true,
      "indexable": false,
      "group": false,
      "created_at": "2016-11-23T00:00:00.000Z",
      "note": "<p>Free, open-source decentralized social media platform.</p>",
      "url": "https://mastodon.social/@Mastodon",
      "uri": "https://mastodon.social/users/Mastodon",
      "avatar": "https://files.mastodon.social/accounts/avatars/000/013/179/original/b4ceb19c9c54ec7e.png",
      "avatar_static": "https://files.mastodon.social/accounts/avatars/000/013/179/original/b4ceb19c9c54ec7e.png",
      "header": "https://files.mastodon.social/accounts/headers/000/013/179/original/1375be116fbe0f1d.png",
      "header_static": "https://files.mastodon.social/accounts/headers/000/013/179/original/1375be116fbe0f1d.png",
      "followers_count": 843930,
      "following_count": 34,
      "statuses_count": 344,
      "last_status_at": "2025-07-10",
      "hide_collections": false,
      "noindex": false,
      "emojis": [],
      "roles": [],
      "fields": [
        {
          "name": "Homepage",
          "value": "<a href=\"https://joinmastodon.org\" target=\"_blank\" rel=\"nofollow noopener me\" translate=\"no\"><span class=\"invisible\">https://</span><span class=\"\">joinmastodon.org</span><span class=\"invisible\"></span></a>",
          "verified_at": "2018-10-31T04:11:00.076+00:00"
        },
        {
          "name": "Patreon",
          "value": "<a href=\"https://patreon.com/mastodon\" target=\"_blank\" rel=\"nofollow noopener me\" translate=\"no\"><span class=\"invisible\">https://</span><span class=\"\">patreon.com/mastodon</span><span class=\"invisible\"></span></a>",
          "verified_at": null
        },
        {
          "name": "GitHub",
          "value": "<a href=\"https://github.com/mastodon\" target=\"_blank\" rel=\"nofollow noopener me\" translate=\"no\"><span class=\"invisible\">https://</span><span class=\"\">github.com/mastodon</span><span class=\"invisible\"></span></a>",
          "verified_at": "2023-07-21T13:27:45.996+00:00"
        }
      ]
    }
  },
  "rules": [
    {
      "id": "1",
      "text": "Sexually explicit or violent media must be marked as sensitive or with a content warning",
      "hint": "This includes content that is particularly provocative even if it may not show specific body parts, as well as dead bodies, bloody injuries, and other gore. Particularly obscene content may be prohibited entirely. Profile pictures and header images may not contain sexually explicit or violent media.",
      "translations": {
        "de": {
          "text": "Sexuell explizite Darstellungen oder solche von Gewalt müssen mit einer Inhaltswarnung versehen werden.",
          "hint": "Das beinhaltet ausdrücklich provokative Inhalte, auch wenn keine bestimmten Körperteile zu sehen sind, sowie Leichname, blutige Verletzungen und vergleichbare extreme Darstellungen. Besonders obszöne Inhalte können vollständig verboten werden. Profil- und Titelbilder dürfen keine sexuell expliziten oder Gewaltdarstellungen abbilden."
        },
        "es": {
          "text": "El contenido sexual explícito o violento debe marcarse como sensible o con una advertencia de contenido.",
          "hint": "Esto incluye contenido especialmente provocativo, aunque no muestre partes específicas del cuerpo, así como cadáveres, heridas sangrientas y otras escenas sangrientas. Los contenidos especialmente obscenos pueden prohibirse por completo. Las fotos de perfil y las imágenes de cabecera no pueden contener contenido sexual explícito o violento."
        },
        "fr": {
          "text": "Le contenu érotique, pornographique ou violent doit être marqué comme sensible ou avoir un avertissement de contenu.",
          "hint": "Cela inclut le contenu particulièrement provocateur même s’il ne montre pas particulièrement de parties intimes, ainsi que les photos de cadavres, de blessures sanglantes et autres scènes dérangeantes. Le contenu particulièrement obscène peut être complètement interdit. Les images de profil et d’en-tête ne doivent pas contenir de contenu sexuellement explicite ou violent."
        },
        "nl": {
          "text": "Seksueel expliciet of gewelddadig beeldmateriaal moet als ‘gevoelig’ gemarkeerd worden, of met een inhoudswaarschuwing gemarkeerd.",
          "hint": "Dit omvat ook inhoud die gedeeltelijk aanstootgevend is zelfs als het geen lichaamsdelen toont, en ook dode lichamen, bloederige verwondingen en andere gruwelijkheden. Zeer obscene inhoud kan helemaal verboden worden. Profielfoto’s en headerafbeeldingen mogen geen seksueel expliciete of geweldadige inhoud hebben."
        },
        "ru": {
          "text": "Сексуально откровенные или жестокие изображения или видео должны быть помечены как чувствительные или скрыты под спойлер.",
          "hint": "Это включает в себя особенно провоцирующий контент, даже если он не показывает определённые части тела, а также мёртвые тела, окровавленные раны и прочую кровь. Особенно жестокий контент может быть запрещён полностью. Аватары и обложки профилей не должны содержать сексуально откровенные или жестокие изображения."
        },
        "zh-CN": {
          "text": "色情或暴力媒体必须标记为敏感或有内容警告",
          "hint": "这包括特别挑逗性的内容，即使它可能没有显示特定的身体部位，以及尸体、血腥伤害和其他血腥内容。特别淫秽的内容可能会被完全禁止。个人资料图片和头像不得包含色情或暴力内容。"
        },
        "zh-TW": {
          "text": "性暗示或暴力媒體必須標示為敏感或附帶內容警示",
          "hint": "這包括特別挑釁的內容，即使它可能沒有顯示特定的身體部位，以及屍體、血腥傷害和其他血腥內容。特別猥褻的內容可能會被完全禁止。個人檔案圖片和標題圖片不得包含色情或暴力媒體。"
        }
      }
    },
    {
      "id": "2",
      "text": "No racism, sexism, homophobia, transphobia, ableism, xenophobia, or casteism.",
      "hint": "Transphobic behavior such as intentional misgendering and deadnaming is strictly prohibited. Promotion of \"conversion therapy\" is strictly prohibited. Criticism of governments and religions is permissible unless being used as a proxy for discrimination.",
      "translations": {
        "de": {
          "text": "Kein(e) Rassismus, Sexismus, Homophobie, Transphobie, Behindertenfeindlichkeit, Fremdenfeindlichkeit oder Kasteismus.",
          "hint": "Transphobes Verhalten wie die absichtliche Verwendung von falschen Anreden und Pronomen sowie Deadnaming ist strengstens verboten. Die Werbung für Konversionstherapien ist strengstens verboten. Die Kritik an Regierungen und Religionen ist zulässig, sofern sie nicht stellvertretend für Diskriminierung verwendet wird."
        },
        "es": {
          "text": "Prohibido el racismo, sexismo, homofobia, transfobia, ableísmo, xenofobia o casticismo.",
          "hint": "Queda terminantemente prohibido el comportamiento transfóbico, como el uso intencionado de nombres falsos o el \"deadnaming\". La promoción de la \"terapia de conversión\" está estrictamente prohibida. Se permiten las críticas a gobiernos y religiones, a menos que se utilicen como excusa para la discriminación."
        },
        "fr": {
          "text": "Pas de racisme, sexisme, homophobie, transphobie, validisme, xénophobie ou discrimination de caste.",
          "hint": "Les comportements intentionnellement transphobes, comme le mégenrage ou le morinommage (“deadnaming”) est strictement interdit. La promotion des “thérapies de conversion” est strictement interdite. La critique des gouvernements et religions est autorisée, sauf dans les cas ou elle est utilisée comme paravent pour de la discrimination."
        },
        "nl": {
          "text": "Geen racisme, seksisme, homofobie, transfobie, validisme, xenofobie of kastendiscriminatie.",
          "hint": "Transfobisch gedrag zoals opzettelijk misgenderen en deadnaming is ten strengste verboden. Het promoten van “conversie therapie” is ten strengste verboden. Kritiek op overheden en religies is toegestaan tenzij het wordt gebruikt als proxy voor racisme."
        },
        "ru": {
          "text": "Запрещается расизм, сексизм, гомофобия, трансфобия, эйблизм, ксенофобия и кастовость.",
          "hint": "Трансфобное поведение, такое как осознанный мисгендеринг и деднейминг, строго запрещено. Продвижение \"конверсионной терапии\" строго запрещено. Критика правительств и религий разрешена, кроме случаев, когда она используется как оправдание для дискриминации."
        },
        "zh-CN": {
          "text": "禁止种族主义、性别歧视、仇视同性恋、仇视变性者、异能者、仇外心理或种姓歧视。",
          "hint": "严禁变性仇视行为，如故意误用性别和死名。严禁宣传 “转换疗法”。允许批评政府和宗教，除非被用作歧视的代名词。"
        },
        "zh-TW": {
          "text": "禁止種族主義、性別主義、恐同主義、恐變性主義、能力主義、仇外主義或種性主義。",
          "hint": "嚴禁變性仇視行為，例如故意誤用性別和暱稱。嚴禁宣傳「扭轉治療」。允許批評政府和宗教，除非被用來代表歧視。"
        }
      }
    },
    {
      "id": "3",
      "text": "No incitement of violence or promotion of violent ideologies",
      "hint": "Calling for people or groups to be assassinated, murdered, or attacked physically is strictly prohibited. Support for violent groups or events is prohibited.",
      "translations": {
        "de": {
          "text": "Keine Anstiftung zu Gewalt oder Förderung gewalttätiger Ideologien.",
          "hint": "Der Aufruf zum Mord oder körperlichen Attacken auf Personen oder Gruppen ist strengstens verboten. Die Unterstützung gewalttätiger Gruppen oder Veranstaltungen ist verboten."
        },
        "es": {
          "text": "Prohibida la incitación a la violencia o la promoción de ideologías violentas.",
          "hint": "Está estrictamente prohibido hacer llamamientos para que se asesine, mate o agreda físicamente a personas o grupos. Está prohibido apoyar a grupos o acontecimientos violentos."
        },
        "fr": {
          "text": "Pas d’incitation à la violence ou de promotion d’idéologies violentes.",
          "hint": "L’appel au meutre, à la violence ou à l’action physique envers des personnes ou des groupes de personnes est strictement interdit. Le soutien à des groupes ou évènements violents est interdit."
        },
        "nl": {
          "text": "Niet aanzetten tot geweld of verspreiden van gewelddadige ideologieën.",
          "hint": "Mensen of groepen aanzetten tot moord, aanslagen of fysieke aanvallen is ten strengste verboden. Steun voor gewelddadige groeperingen of evenementen is verboden."
        },
        "ru": {
          "text": "Запрещается подстрекательство к жестокости или продвижение жестоких идеологий.",
          "hint": "Призывы к покушениям, убийствам и физическим атакам на людей или группы людей строго запрещены. Поддержка жестоких сообществ или событий запрещена."
        },
        "zh-CN": {
          "text": "不得煽动暴力或宣扬暴力意识形态",
          "hint": "严禁呼吁暗杀、谋杀或人身攻击他人或团体。禁止支持暴力团体或事件。"
        },
        "zh-TW": {
          "text": "嚴禁煽動暴力或宣揚暴力意識形態",
          "hint": "嚴禁呼籲暗殺、謀殺或人身攻擊他人或團體。嚴禁支持暴力團體或事件。"
        }
      }
    },
    {
      "id": "4",
      "text": "No harassment, block evasion, dogpiling, or doxxing of others",
      "hint": "Repeat attempts to communicate with users who have blocked you or creation of accounts solely to harass or insult individuals is strictly prohibited. Coordinated activity to attack other users is prohibited. Posting of private personal information about others is prohibited.",
      "translations": {
        "de": {
          "text": "Keine Belästigungen, Umgehung von Blockierungen, Dogpiling oder Doxxing.",
          "hint": "Wiederholte Kommunikationsversuche mit Profilen, die dich blockiert haben, oder die Erstellung neuer Konten, die ausschließlich dazu dienen, andere zu belästigen oder zu beleidigen, sind strengstens verboten. Koordinierte Angriffe auf andere Profile sind verboten. Die Veröffentlichung von privaten und persönlichen Informationen anderer ist verboten."
        },
        "es": {
          "text": "No acosar, evadir bloqueos, \"dogpiling\" (abuso en línea por grupos de acosadores) o doxeo de otros.",
          "hint": "Está estrictamente prohibido intentar comunicarse repetidamente con usuarios que te hayan bloqueado o crear cuentas con el único fin de acosar o insultar a otras personas. Queda prohibida la actividad coordinada para atacar a otros usuarios. Está prohibido publicar información personal privada sobre otras personas."
        },
        "fr": {
          "text": "Pas de harcèlement, d’esquive de blocage, de “dogpiling”, ou de divulgation de données personnelles d’autrui.",
          "hint": "Les tentatives répétées de communiquer avec des utilisateur·ices qui vont ont bloqué ainsi que la création de comptes pour harceler ou insulter autrui sont strictement interdites. Les attaques coordonnées contre autrui sont interdites. La publication de données personnelles d’autrui est interdite."
        },
        "nl": {
          "text": "Geen intimidatie, omzeilen van blokkades, groepsaanvallen of het verspreiden van privégegevens van anderen.",
          "hint": "Herhaalde pogingen tot communiceren met gebruikers die je hebben geblokkeerd, of het maken van accounts enkel om personen te intimideren of beledigen is ten strengste verboden. Gecoördineerde activiteit om andere gebruikers aan te vallen is verboden. Het plaatsen van privé-gegevens van anderen is verboden."
        },
        "ru": {
          "text": "Запрещается травля, избегание блокировок, набеги и разглашение личной информации других лиц.",
          "hint": "Повторяющиеся попытки взаимодействовать с пользователями, которые вас заблокировали, и создание учётных записей исключительно ради травли или оскорблений, строго запрещены. Скоординированная активность с целью атаки на других пользователей запрещена. Публикация личной информации других лиц запрещена."
        },
        "zh-CN": {
          "text": "不得骚扰、回避封禁、诽谤或攻击他人",
          "hint": "严禁重复尝试与已封禁您的用户交流，或仅为骚扰或侮辱他人而创建账户。严禁协同攻击其他用户。禁止发布他人的私人个人信息。"
        },
        "zh-TW": {
          "text": "嚴禁騷擾、迴避封鎖、煽動或誣衊他人",
          "hint": "嚴禁重複嘗試與已封鎖您的使用者溝通，或純粹為了騷擾或侮辱他人而建立帳號。禁止攻擊其他使用者的協調活動。禁止張貼他人的私人個人資訊。"
        }
      }
    },
    {
      "id": "7",
      "text": "Do not share information widely-known to be false and misleading",
      "hint": "False and misleading information and links from low-quality sources may not be posted, especially if they are likely to mislead or confuse others or endanger their safety.",
      "translations": {
        "de": {
          "text": "Verbreitet keine Informationen, von denen allgemein bekannt ist, dass sie falsch oder irreführend.",
          "hint": "Falsche und irreführende Informationen sowie Links aus unseriösen Quellen dürfen nicht gepostet werden, insbesondere wenn sie geeignet sind, andere in die Irre zu führen oder deren Sicherheit zu gefährden."
        },
        "es": {
          "text": "No compartas información ampliamente conocida por ser falsa y engañosa.",
          "hint": "No está permitido publicar información falsa y engañosa ni enlaces de fuentes de baja calidad, especialmente si pueden inducir a error o confusión a otras personas o poner en peligro su seguridad."
        },
        "fr": {
          "text": "Ne partagez pas d’informations connues pour être fausses ou trompeuses.",
          "hint": "Les informations fausses ou trompeuses, ainsi que les liens vers des sources de mauvaise qualité ne doivent pas être publiées, particulièrement si elles risquent de tromper, d’induire en erreur, de semer la confusion ou de mettre des personnes en danger."
        },
        "nl": {
          "text": "Deel geen informatie die algemeen bekend staat als onjuist en misleidend.",
          "hint": "Onjuiste en misleidende informatie en links naar onbetrouwbare bronnen mogen niet geplaatst worden, zeker als deze waarschijnlijk anderen misleiden of verwarren, of hun veiligheid in  gevaar brengt."
        },
        "ru": {
          "text": "Не публикуйте заведомо ложную и вводящую в заблуждение информацию.",
          "hint": "Запрещена публикация ложной и вводящей в заблуждение информации и ссылок из низкокачественных источников, особенно если это может сбить других людей с толку, запутать их, или подвергнуть их опасности."
        },
        "zh-CN": {
          "text": "不得分享众所周知的虚假和误导性信息\r\n",
          "hint": "不得发布虚假和误导性信息以及来自低质量来源的链接，尤其是可能误导或混淆他人或危及他人安全的信息。"
        },
        "zh-TW": {
          "text": "請勿分享廣為人知的虛假和誤導資訊",
          "hint": "不得張貼虛假和誤導資訊以及來自低品質來源的連結，尤其是可能誤導或混淆他人或危害他人安全的資訊。"
        }
      }
    },
    {
      "id": "1008",
      "text": "Content created by others must be attributed, and use of generative AI must be disclosed",
      "hint": "Content created by others must clearly provide a reference to the author, creator, or source. For adult content, this should include performers. Accounts may not solely post AI-generated content.",
      "translations": {
        "de": {
          "text": "Von anderen erstellte Inhalte müssen gekennzeichnet und die Nutzung generativer KI offengelegt werden.",
          "hint": "Von anderen erstellte Inhalte müssen durch einen eindeutigen Verweis auf den/die Autor*in oder die Quelle gekennzeichnet werden. Bei nicht jugendfreien Inhalten sollte dies auch die Darsteller*innen einschließen. Konten dürfen nicht ausschließlich KI-generierte Inhalte posten."
        },
        "es": {
          "text": "Los contenidos creados por terceros deben ser atribuidos y el uso de IA debe ser revelado.",
          "hint": "Los contenidos creados por terceros deben proporcionar claramente una referencia al autor, creador o fuente. En el caso de los contenidos para adultos, debe incluirse a los artistas. Las cuentas no pueden publicar únicamente contenidos generados por IA."
        },
        "fr": {
          "text": "Le contenu crée par autrui doit être attribué, et l’utilisation d’IA générative doit être marqué comme tel.",
          "hint": "Le contenu créé par autrui doit fournir une référence explicite à son auteur·ice, créateur·ice ou sa source. Cela inclut les acteur·ice de contenu pour adulte. Les comptes publiant exclusivement du contenu généré par IA sont interdits."
        },
        "nl": {
          "text": "Inhoud gemaakt door anderen moet worden toegeschreven, en het gebruik van generatieve AI moet worden aangegeven.",
          "hint": "Inhoud gemaakt door anderen moet een duidelijke referentie naar de auteur, maker of bron bevatten. Voor Content created by others must clearly provide a reference to the author, creator, or source. Voor inhoud voor volwassenen, moet het model worden vermeld. Accounts mogen niet uitsluitend door AI gegenereerde inhoud plaatsen."
        },
        "ru": {
          "text": "Контент, созданный другими, должен публиковаться с указанием авторства, а использование генеративного ИИ должно быть раскрыто.",
          "hint": "Контент, созданный другими, должен явным образом сопровождаться отсылкой к автору, создателю или источнику. Для контента для взрослых это включает в себя актёров. Учётные записи не могут публиковать исключительно контент, сгенерированный с помощью ИИ."
        },
        "zh-CN": {
          "text": "他人创建的内容必须注明出处，使用人工智能产生的内容必须公开和披露说明",
          "hint": "他人创建的内容必须明确注明作者、创建者或来源。对于成人内容，应包括表演者。账户不得仅发布人工智能生成的内容。"
        },
        "zh-TW": {
          "text": "由他人創作的內容必須註明來源，使用人工智能產生的內容必須公開和披露說明",
          "hint": "他人創作的內容必須清楚提供作者、創作人或來源的參照。對於成人內容，這應該包括表演者。帳戶不得僅發佈人工智能產生的內容。"
        }
      }
    }
  ]
}
```

---

## List of connected domains {#peers}

```http
GET /api/v1/instance/peers HTTP/1.1
```

Domains that this server is aware of.

**Returns:** Array of String\
**OAuth:** Public\
**Version history:**\
2.1.2 - added\
3.0.0 - requires user token if server is in whitelist mode

#### Request

##### Headers

Authorization
: Provide this header with `Bearer <user_token>` to gain authorized access to this API method.

#### Response

##### 200: OK

```json
["tilde.zone","mspsocial.net",...,"conf.tube"]
```

##### 401: Unauthorized

If the server is in whitelist mode and the Authorization header is missing or invalid

```json
{
  "error": "This API requires an authenticated user"
}
```

---

## Weekly activity {#activity}

```http
GET /api/v1/instance/activity HTTP/1.1
```

Server activity over the last 3 months, binned weekly.

**Returns:** Array of Hash\
**OAuth:** Public\
**Version history:**\
2.1.2 - added\
3.0.0 - requires user token if server is in whitelist mode

#### Request

##### Headers

Authorization
: Provide this header with `Bearer <user_token>` to gain authorized access to this API method.

#### Response

##### 200: OK

Each hash in the array will contain the following attributes:

week
: String (UNIX Timestamp). Midnight at the first day of the week.

statuses
: String (cast from an integer). The number of Statuses created since the week began.

logins
: String (cast from an integer). The number of user logins since the week began.

registrations
: String (cast from an integer). The number of user registrations since the week began.

```json
[
  {
    "week": "1574640000",
    "statuses": "37125",
    "logins": "14239",
    "registrations": "542"
  },
  {
    "week": "1574035200",
    "statuses": "244447",
    "logins": "28820",
    "registrations": "4425"
  },
  {
    "week": "1573430400",
    "statuses": "270615",
    "logins": "35388",
    "registrations": "8781"
  },
  {
    "week": "1572825600",
    "statuses": "309722",
    "logins": "44433",
    "registrations": "26165"
  },
  {
    "week": "1572220800",
    "statuses": "116227",
    "logins": "19739",
    "registrations": "2926"
  },
  {
    "week": "1571616000",
    "statuses": "119932",
    "logins": "19247",
    "registrations": "3188"
  },
  {
    "week": "1571011200",
    "statuses": "117892",
    "logins": "19164",
    "registrations": "3107"
  },
  {
    "week": "1570406400",
    "statuses": "109092",
    "logins": "18763",
    "registrations": "2986"
  },
  {
    "week": "1569801600",
    "statuses": "107554",
    "logins": "19614",
    "registrations": "2904"
  },
  {
    "week": "1569196800",
    "statuses": "118067",
    "logins": "19703",
    "registrations": "3295"
  },
  {
    "week": "1568592000",
    "statuses": "110199",
    "logins": "19791",
    "registrations": "3026"
  },
  {
    "week": "1567987200",
    "statuses": "106029",
    "logins": "19089",
    "registrations": "2769"
  }
]
```

##### 401: Unauthorized

If the server is in whitelist mode and the Authorization header is missing or invalid

```json
{
  "error": "This API requires an authenticated user"
}
```

---

## List of rules {#rules}

```http
GET /api/v1/instance/rules HTTP/1.1
```

Rules that the users of this service should follow.

**Returns:** Array of [Rule]({{< relref "entities/rule" >}})\
**OAuth:** Public\
**Version history:**\
3.4.0 - added

#### Response

##### 200: OK

```json
[
  {
    "id": "1",
    "text": "Sexually explicit or violent media must be marked as sensitive when posting"
  },
  {
    "id": "2",
    "text": "No racism, sexism, homophobia, transphobia, xenophobia, or casteism"
  },
  {
    "id": "3",
    "text": "No incitement of violence or promotion of violent ideologies"
  },
  {
    "id": "4",
    "text": "No harassment, dogpiling or doxxing of other users"
  },
  {
    "id": "5",
    "text": "No content illegal in Germany"
  },
  {
    "id": "7",
    "text": "Do not share intentionally false or misleading information"
  }
]
```

---

## View moderated servers {#domain_blocks}

```http
GET /api/v1/instance/domain_blocks HTTP/1.1
```

Obtain a list of domains that have been blocked.

**Returns:** Array of [DomainBlock]({{< relref "entities/DomainBlock" >}})\
**OAuth:** Public, or User token if limited to users\
**Version history:**\
4.0.0 - added

#### Request

##### Headers

Authorization
: Provide this header with `Bearer <user_token>` to gain authorized access to this API method.

#### Response

##### 200: OK

The complete list of domains blocked by this instance

```json
[
  {
    "domain": "birb.elfenban.de",
    "digest": "5d2c6e02a0cced8fb05f32626437e3d23096480b47efbba659b6d9e80c85d280",
    "severity": "suspend",
    "comment": "Third-party bots"
  },
  {
    "domain": "birdbots.leptonics.com",
    "digest": "ce019d8d32cce8e369ac4367f4dc232103e6f489fbdd247fb99f9c8a646078a4",
    "severity": "suspend",
    "comment": "Third-party bots"
  }
  // ...
]
```

##### 401: Unauthorized

Invalid or missing Authorization header, if the admin has chosen to show domain blocks to users.

```json
{
  "error": "The access token is invalid"
}
```

##### 404: Not found

The admin has chosen to show domain blocks to no one. The response body is empty; only the HTTP 404 error code is relevant.

---

## View extended description {#extended_description}

```http
GET /api/v1/instance/extended_description HTTP/1.1
```

Obtain an extended description of this server.

**Returns:** [ExtendedDescription]({{< relref "entities/ExtendedDescription" >}})\
**OAuth:** Public\
**Version history:**\
4.0.0 - added

#### Response

##### 200: OK

```json
{
  "updated_at": "2022-11-03T04:09:07Z",
  "content": "<p>For inquiries not related specifically to the operation of this server, such as press inquiries, please contact <a href=\"mailto:press@joinmastodon.org\">press@joinmastodon.org</a>.</p>\n\n<h2>Funding</h2>\n\n<p>This server is crowdfunded by <a href=\"https://patreon.com/mastodon\">Patreon donations</a>. For a list of sponsors, see <a href=\"https://joinmastodon.org/sponsors\">joinmastodon.org</a>.</p>\n\n<h2>Reporting and moderation</h2>\n\n<p>When reporting accounts, please make sure to include at least a few posts that show rule-breaking behaviour, when applicable. If there is any additional context that might help make a decision, please also include it in the comment. This is especially important when the content is in a language nobody on the moderation team speaks.</p>\n\n<p>We usually handle reports within 24 hours. Please mind that you are not notified when a report you have made has led to a punitive action, and that not all punitive actions are externally visible. For first time offenses, we may opt to delete offending content, escalating to harsher measures on repeat offenses.</p>\n\n<h2>Impressum</h2>\n\n<p>Mastodon gGmbH<br>\nMühlenstraße 8a<br>\n14167 Berlin<br>\nGermany</p>\n\n<p>E-Mail-Adresse: hello@joinmastodon.org</p>\n\n<p>Vertretungsberechtigt: Eugen Rochko (Geschäftsführer)</p>\n\n<p>Umsatzsteuer Identifikationsnummer (USt-ID): DE344258260</p>\n\n<p>Handelsregister<br>\nGeführt bei: Amtsgericht Charlottenburg<br>\nNummer: HRB 230086 B</p>\n"
}
```

---

## View privacy policy {#privacy_policy}

```http
GET /api/v1/instance/privacy_policy HTTP/1.1
```

Obtain the contents of this server's privacy policy.

**Returns:** [PrivacyPolicy]({{< relref "entities/PrivacyPolicy" >}})\
**OAuth:** Public\
**Version history:**\
4.0.0 - added

#### Response

##### 200: OK

```json
{
  "updated_at": "2022-10-07T00:00:00+00:00",
  "content": "<p>This privacy policy describes how example.com (&quot;example.com&quot;, &quot;we&quot;, &quot;us&quot;) collects,\nprotects and uses the personally identifiable information you may provide\nthrough the example.com website or its API.</p>\n\n<h1>What information do we collect?</h1>\n\n<ul>\n<li><strong>Basic account information</strong>: If you register on this server, you may be\nasked to enter a username, an e-mail address and a password.</li>\n<li><strong>Posts, following and other public information</strong>: The list of people you\nfollow is listed publicly, the same is true for your followers.</li>\n<li><strong>Direct and followers-only posts</strong>: All posts are stored and processed on the\nserver. You may\ntoggle an option to approve and reject new followers manually in the settings.\n<strong>Please keep in mind that the operators of the server and any receiving\nserver may view such messages</strong>, and that recipients may screenshot, copy or\notherwise re-share them. <strong>Do not share any sensitive information over\nMastodon.</strong></li>\n<li><strong>IPs and other metadata</strong>: When you log in, we record the IP address you log\nin from, as well as the name of your browser application.</li>\n</ul>\n\n<hr>\n\n<p>This document is CC-BY-SA. Originally adapted from the <a href=\"https://github.com/discourse/discourse\">Discourse privacy\npolicy</a>.</p>\n"
}
```

---

## View terms of service {#terms_of_service}

```http
GET /api/v1/instance/terms_of_service HTTP/1.1
```

Obtain the contents of this server's terms of service, if configured.

**Returns:** [TermsOfService]({{< relref "entities/TermsOfService" >}})\
**OAuth:** Public\
**Version history:**\
4.4.0 - added

#### Response

##### 200: OK

```json
{
  "effective_date": "2025-04-15",
  "effective": true,
  "content": "<p>Foo bar newer</p>\n",
  "succeeded_by": null
}
```

##### 404: Not Found

No terms of service have been configured for this server.

```json
{
  "error": "Record not found"
}
```

---

## View a specific version of the terms of service {#terms_of_service_date}

```http
GET /api/v1/instance/terms_of_service/:date HTTP/1.1
```

Obtain the contents of this server's terms of service, for a specified date, if configured.

**Returns:** [TermsOfService]({{< relref "entities/TermsOfService" >}})\
**OAuth:** Public\
**Version history:**\
4.4.0 - added

#### Request

##### Path parameters

:date
: {{<required>}} String. The effective date of the terms of service.

#### Response

##### 200: OK

```json
{
  "effective_date": "2025-04-15",
  "effective": true,
  "content": "<p>Foo bar newer</p>\n",
  "succeeded_by": null
}
```

##### 404: Not Found

No terms of service have been configured for this server.

```json
{
  "error": "Record not found"
}
```

---

## View translation languages {#translation_languages}

```http
GET /api/v1/instance/translation_languages HTTP/1.1
```

Translation language pairs supported by the translation engine used by the server.

**Returns:** Object with source language codes as keys and arrays of target language codes as values.\
**OAuth:** Public\
**Version history:**\
4.2.0 - added

#### Response

##### 200: OK

All source and target language pairs supported by the server.

In the following sample response showing support for translating a status written in English (`en`) into German (`de`) or Spanish (`es`). The source language code `und` indicates that the server supports auto-detection the language of statuses with an empty `language` attribute and translating these into either British English (`en-GB`), German or Spanish.

```json
{
  "en": ["de", "es"],
  // [...]
  "und": ["en-GB", "de", "es"]
}
```

---

## View server information (v1) {{%deprecated%}} {#v1}

```http
GET /api/v1/instance HTTP/1.1
```

Obtain general information about the server. See [api/v2/instance]({{< relref "methods/Instance#v2">}}) instead.

**Returns:** [V1::Instance]({{< relref "entities/V1_Instance" >}})\
**OAuth:** Public\
**Version history:**\
1.1.0 - added\
3.0.0 - requires user token if instance is in whitelist mode\
3.1.4 - added `invites_enabled` to response\
3.4.0 - added `rules`\
3.4.2 - added `configuration`\
4.0.0 - deprecated. added `configuration[accounts]`.

#### Response

##### 200: OK

```json
{
  "uri": "mastodon.social",
  "title": "Mastodon",
  "short_description": "The original server operated by the Mastodon gGmbH non-profit",
  "description": "",
  "email": "staff@mastodon.social",
  "version": "3.5.3",
  "urls": {
    "streaming_api": "wss://mastodon.social"
  },
  "stats": {
    "user_count": 812303,
    "status_count": 38151616,
    "domain_count": 25255
  },
  "thumbnail": "https://files.mastodon.social/site_uploads/files/000/000/001/original/vlcsnap-2018-08-27-16h43m11s127.png",
  "languages": ["en"],
  "registrations": false,
  "approval_required": false,
  "invites_enabled": true,
  "configuration": {
    "statuses": {
      "max_characters": 500,
      "max_media_attachments": 4,
      "characters_reserved_per_url": 23
    },
    "media_attachments": {
      "supported_mime_types": [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
        "video/webm",
        "video/mp4",
        "video/quicktime",
        "video/ogg",
        "audio/wave",
        "audio/wav",
        "audio/x-wav",
        "audio/x-pn-wave",
        "audio/vnd.wave",
        "audio/ogg",
        "audio/vorbis",
        "audio/mpeg",
        "audio/mp3",
        "audio/webm",
        "audio/flac",
        "audio/aac",
        "audio/m4a",
        "audio/x-m4a",
        "audio/mp4",
        "audio/3gpp",
        "video/x-ms-asf"
      ],
      "image_size_limit": 10485760,
      "image_matrix_limit": 16777216,
      "video_size_limit": 41943040,
      "video_frame_rate_limit": 60,
      "video_matrix_limit": 2304000
    },
    "polls": {
      "max_options": 4,
      "max_characters_per_option": 50,
      "min_expiration": 300,
      "max_expiration": 2629746
    }
  },
  "contact_account":{
    "id":"1",
    "username":"Gargron",
    "acct":"Gargron",
    "display_name":"Eugen",
    "locked":false,
    "bot":false,
    "discoverable":true,
    "group":false,
    "created_at":"2016-03-16T00:00:00.000Z",
    "note":"\u003cp\u003eFounder, CEO and lead developer \u003cspan class=\"h-card\"\u003e\u003ca href=\"https://mastodon.social/@Mastodon\" class=\"u-url mention\"\u003e@\u003cspan\u003eMastodon\u003c/span\u003e\u003c/a\u003e\u003c/span\u003e, Germany.\u003c/p\u003e",
    "url":"https://mastodon.social/@Gargron",
    "avatar":"https://files.mastodon.social/accounts/avatars/000/000/001/original/dc4286ceb8fab734.jpg",
    "avatar_static":"https://files.mastodon.social/accounts/avatars/000/000/001/original/dc4286ceb8fab734.jpg",
    "header":"https://files.mastodon.social/accounts/headers/000/000/001/original/3b91c9965d00888b.jpeg",
    "header_static":"https://files.mastodon.social/accounts/headers/000/000/001/original/3b91c9965d00888b.jpeg",
    "followers_count":118944,
    "following_count":305,
    "statuses_count":72309,
    "last_status_at":"2022-08-24",
    "emojis":[

    ],
    "fields":[
      {
        "name": "Patreon",
        "value": "\u003ca href=\"https://www.patreon.com/mastodon\" target=\"_blank\" rel=\"nofollow noopener noreferrer me\"\u003e\u003cspan class=\"invisible\"\u003ehttps://www.\u003c/span\u003e\u003cspan class=\"\"\u003epatreon.com/mastodon\u003c/span\u003e\u003cspan class=\"invisible\"\u003e\u003c/span\u003e\u003c/a\u003e",
        "verified_at": null
      }
    ]
  },
  "rules": [
    {
      "id": "1",
      "text": "Sexually explicit or violent media must be marked as sensitive when posting"
    },
    {
      "id": "2",
      "text": "No racism, sexism, homophobia, transphobia, xenophobia, or casteism"
    },
    {
      "id": "3",
      "text": "No incitement of violence or promotion of violent ideologies"
    },
    {
      "id": "4",
      "text": "No harassment, dogpiling or doxxing of other users"
    },
    {
      "id": "5",
      "text": "No content illegal in Germany"
    },
    {
      "id": "7",
      "text": "Do not share intentionally false or misleading information"
    }
  ]
}
```

---

## See also

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/instances_controller.rb" caption="app/controllers/api/v1/instances_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/instances/activity_controller.rb" caption="app/controllers/api/v1/instances/activity_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/instances/peers_controller.rb" caption="app/controllers/api/v1/instances/peers_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/instances/rules_controller.rb" caption="app/controllers/api/v1/instances/rules_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/instances/privacy_policies_controller.rb" caption="app/controllers/api/v1/instances/privacy_policies_controller.rb" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/controllers/api/v1/instances/terms_of_services_controller.rb" caption="app/controllers/api/v1/instances/terms_of_services_controller.rb" >}}
