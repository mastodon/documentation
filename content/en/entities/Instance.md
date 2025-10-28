---
title: Instance
description: Represents the software instance of Mastodon running on this domain.
menu:
  docs:
    parent: entities
aliases: [
  "/entities/instance",
  "/entities/Instance",
  "/api/entities/instance",
  "/api/entities/Instance",
]
---

## Example

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
    "timelines_access": {
      "live_feeds": {
        "local": "public",
        "remote": "public"
      },
      "hashtag_feeds": {
        "local": "public",
        "remote": "public"
      },
      "trending_link_feeds": {
        "local": "public",
        "remote": "public"
      }
    }
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

## Attributes

### `domain` {#domain}

**Description:** The WebFinger domain name of the server.\
**Type:** String\
**Version history:**\
4.0.0 - added

### `title` {#title}

**Description:** The title of the website.\
**Type:** String\
**Version history:**\
4.0.0 - added

### `version` {#version}

**Description:** The version of Mastodon installed on the server.\
**Type:** String\
**Version history:**\
4.0.0 - added

### `source_url` {#source_url}

**Description:** The URL for the source code of the software running on this server, per the AGPL license requirements.\
**Type:** String (URL)\
**Version history:**\
4.0.0 - added

### `description` {#description}

**Description:** A short, plain-text description defined by the admin.\
**Type:** String\
**Version history:**\
4.0.0 - added

### `usage` {#usage}

**Description:** Usage data for this server.\
**Type:** Hash\
**Version history:**\
4.0.0 - added

#### `usage[users]` {#users}

**Description:** Usage data related to users on this server.\
**Type:** Hash\
**Version history:**\
4.0.0 - added

##### `usage[users][active_month]` {#active_month}

**Description:** The number of active users in the past 4 weeks. This is set to zero for server with `configuration[limited_federation]`.\
**Type:** Integer\
**Version history:**\
4.0.0 - added

### `thumbnail` {#thumbnail}

**Description:** An image used to represent this server.\
**Type:** Hash\
**Version history:**\
4.0.0 - added

#### `thumbnail[url]` {#thumbnail-url}

**Description:** The URL for the thumbnail image.\
**Type:** String (URL)\
**Version history:**\
4.0.0 - added

#### `thumbnail[blurhash]` {{<optional>}} {#blurhash}

**Description:** A hash computed by [the BlurHash algorithm](https://github.com/woltapp/blurhash), for generating colorful preview thumbnails when media has not been downloaded yet.\
**Type:** String (Blurhash)\
**Version history:**\
4.0.0 - added

#### `thumbnail[versions]` {{<optional>}} {#thumbnail-versions}

**Description:** Links to scaled resolution images, for high DPI screens.\
**Type:** Hash\
**Version history:**\
4.0.0 - added

##### `thumbnail[versions][@1x]` {{<optional>}} {#1x}

**Description:** The URL for the thumbnail image at 1x resolution.\
**Type:** String (URL)\
**Version history:**\
4.0.0 - added

##### `thumbnail[versions][@2x]` {{<optional>}} {#2x}

**Description:** The URL for the thumbnail image at 2x resolution.\
**Type:** String (URL)\
**Version history:**\
4.0.0 - added

### `icon` {#icon}

**Description:** The list of available size variants for this server's configured icon.\
**Type:** Array of [InstanceIcon](#InstanceIcon)\
**Version history:**\
4.3.0 - added

### `languages` {#languages}

**Description:** Primary languages of the website and its staff.\
**Type:** Array of String (ISO 639-1 two-letter code)\
**Version history:**\
4.0.0 - added

### `configuration` {#configuration}

**Description:** Configured values and limits for this website.\
**Type:** Hash\
**Version history:**\
4.0.0 - added

#### `configuration[urls]` {#urls}

**Description:** URLs of interest for clients apps.\
**Type:** Hash\
**Version history:**\
4.0.0 - added

##### `configuration[urls][streaming]` {#streaming}

**Description:** The Websockets URL for connecting to the streaming API.\
**Type:** String (URL)\
**Version history:**\
4.0.0 - added

##### `configuration[urls][status]` {#status_url}

**Description:** The URL of the server's status page, if configured.\
**Type:** {{<nullable>}} String (URL)\
**Version history:**\
4.1.0 - added

##### `configuration[urls][about]` {#about_url}

**Description:** The URL of the server's about page.\
**Type:** String (URL)\
**Version history:**\
4.4.0 - added

##### `configuration[urls][privacy_policy]` {#privacy_policy}

**Description:** The URL of the server's privacy policy.\
**Type:** {{<nullable>}} String (URL)\
**Version history:**\
4.4.0 - added

##### `configuration[urls][terms_of_service]` {#terms_of_service}

**Description:** The URL of the server's current terms of service, if any.\
**Type:** {{<nullable>}} String (URL)\
**Version history:**\
4.4.0 - added

#### `configuration[vapid][public_key]` {#vapid_public_key}
**Description:** The server's VAPID public key, used for push notifications, the same as [WebPushSubscription#server_key]({{< relref "entities/WebPushSubscription#server_key" >}}).\
**Type:** String\
**Version history:**\
4.3.0 - added

#### `configuration[accounts]` {#accounts}

**Description:** Limits related to accounts.\
**Type:** Hash\
**Version history:**\
4.0.0 - added

##### `configuration[accounts][max_featured_tags]` {#max_featured_tags}

**Description:** The maximum number of featured tags allowed for each account.\
**Type:** Integer\
**Version history:**\
4.0.0 - added

##### `configuration[accounts][max_pinned_statuses]` {#max_pinned_statuses}

**Description:** The maximum number of pinned statuses for each account.\
**Type:** Integer\
**Version history:**\
4.3.0 - added

#### `configuration[statuses]` {#statuses}

**Description:** Limits related to authoring statuses.\
**Type:** Hash\
**Version history:**\
4.0.0 - added

##### `configuration[statuses][max_characters]` {#max_characters}

**Description:** The maximum number of allowed characters per status.\
**Type:** Integer\
**Version history:**\
4.0.0 - added

##### `configuration[statuses][max_media_attachments]` {#max_media_attachments}

**Description:** The maximum number of media attachments that can be added to a status.\
**Type:** Integer\
**Version history:**\
4.0.0 - added

##### `configuration[statuses][characters_reserved_per_url]` {#characters_reserved_per_url}

**Description:** Each URL in a status will be assumed to be exactly this many characters.\
**Type:** Integer\
**Version history:**\
4.0.0 - added

#### `configuration[media_attachments]` {#media_attachments}

**Description:** Hints for which attachments will be accepted.\
**Type:** Hash\
**Version history:**\
4.0.0 - added

##### `configuration[media_attachments][supported_mime_types]` {#supported_mime_types}

**Description:** Contains MIME types that can be uploaded.\
**Type:** Array of String\
**Version history:**\
4.0.0 - added

##### `configuration[media_attachments][description_limit]` {#description_limit}

**Description:** The maximum size of a description, in characters.\
**Type:** Integer\
**Version history:**\
4.4.0 - added

##### `configuration[media_attachments][image_size_limit]` {#image_size_limit}

**Description:** The maximum size of any uploaded image, in bytes.\
**Type:** Integer\
**Version history:**\
4.0.0 - added

##### `configuration[media_attachments][image_matrix_limit]` {#image_matrix_limit}

**Description:** The maximum number of pixels (width times height) for image uploads.\
**Type:** Integer\
**Version history:**\
4.0.0 - added

##### `configuration[media_attachments][video_size_limit]` {#video_size_limit}

**Description:** The maximum size of any uploaded video, in bytes.\
**Type:** Integer\
**Version history:**\
4.0.0 - added

##### `configuration[media_attachments][video_frame_rate_limit]` {#video_frame_rate_limit}

**Description:** The maximum frame rate for any uploaded video.\
**Type:** Integer\
**Version history:**\
4.0.0 - added

##### `configuration[media_attachments][video_matrix_limit]` {#video_matrix_limit}

**Description:** The maximum number of pixels (width times height) for video uploads.\
**Type:** Integer\
**Version history:**\
4.0.0 - added

#### `configuration[polls]` {#polls}

**Description:** Limits related to polls.\
**Type:** Hash\
**Version history:**\
4.0.0 - added

##### `configuration[polls][max_options]` {#max_options}

**Description:** Each poll is allowed to have up to this many options.\
**Type:** Integer\
**Version history:**\
4.0.0 - added

##### `configuration[polls][max_characters_per_option]` {#max_characters_per_option}

**Description:** Each poll option is allowed to have this many characters.\
**Type:** Integer\
**Version history:**\
4.0.0 - added

##### `configuration[polls][min_expiration]` {#min_expiration}

**Description:** The shortest allowed poll duration, in seconds.\
**Type:** Integer\
**Version history:**\
4.0.0 - added

##### `configuration[polls][max_expiration]` {#max_expiration}

**Description:** The longest allowed poll duration, in seconds.\
**Type:** Integer\
**Version history:**\
4.0.0 - added

#### `configuration[translation]` {#translation}

**Description:** Hints related to translation.\
**Type:** Hash\
**Version history:**\
4.0.0 - added

##### `configuration[translation][enabled]` {#translation-enabled}

**Description:** Whether the Translations API is available on this server.\
**Type:** Boolean\
**Version history:**\
4.0.0 - added

#### `configuration[timeline_access]` {#timeline_access}

**Description:** Access restrictions on different timelines.\
**Type:** Hash\
**Version history:**\
4.5.0 - added

#### `configuration[timeline_access][live_feeds]` {#timeline_access-live_feeds}

**Description:** Access restrictions on [public “firehose” feeds]({{< relref "methods/timelines#public" >}}).\
**Type:** Hash\
**Version history:**\
4.5.0 - added

#### `configuration[timeline_access][live_feeds][local]` {#timeline_access-live_feeds-local}

**Description:** Access restrictions for local posts in the public “firehose” feed.\
**Type:** String (Enumerable oneOf)\
- `public` = Access to local posts in the public “firehose” feed is available to both visitors and logged-in users.\
- `authenticated` = Access to local posts in the public “firehose” feed requires authentication.\
- `disabled` = Access to local posts in the public “firehose” feed is only possible for users with the “View live and topic feeds” [permission]({{< relref "entities/Role#permissions" >}}).\
**Version history:**\
4.5.0 - added

#### `configuration[timeline_access][live_feeds][remote]` {#timeline_access-live_feeds-remote}

**Description:** Access restrictions for remote posts in the public “firehose” feed.\
**Type:** String (Enumerable oneOf)\
- `public` = Access to remote posts in the public “firehose” feed is available to both visitors and logged-in users.\
- `authenticated` = Access to remote posts in the public “firehose” feed requires authentication.\
- `disabled` = Access to remote posts in the public “firehose” feed is only possible for users with the “View live and topic feeds” [permission]({{< relref "entities/Role#permissions" >}}).\
**Version history:**\
4.5.0 - added

#### `configuration[timeline_access][hashtag_feeds]` {#timeline_access-hashtag_feeds}

**Description:** Access restrictions on [hashtag feeds]({{< relref "methods/timelines#tag" >}}).\
**Type:** Hash\
**Version history:**\
4.5.0 - added

#### `configuration[timeline_access][hashtag_feeds][local]` {#timeline_access-hashtag_feeds-local}

**Description:** Access restrictions for local posts in hashtag feeds.\
**Type:** String (Enumerable oneOf)\
- `public` = Access to local posts in hashtag feeds is available to both visitors and logged-in users.\
- `authenticated` = Access to local posts in hashtag feeds requires authentication.\
- `disabled` = Access to local posts in hashtag feeds is only possible for users with the “View live and topic feeds” [permission]({{< relref "entities/Role#permissions" >}}).\
**Version history:**\
4.5.0 - added

#### `configuration[timeline_access][hashtag_feeds][remote]` {#timeline_access-hashtag_feeds-remote}

**Description:** Access restrictions for remote posts in hashtag feeds.\
**Type:** String (Enumerable oneOf)\
- `public` = Access to remote posts in hashtag feeds is available to both visitors and logged-in users.\
- `authenticated` = Access to remote posts in hashtag feeds requires authentication.\
- `disabled` = Access to remote posts in hashtag feeds is only possible for users with the “View live and topic feeds” [permission]({{< relref "entities/Role#permissions" >}}).\
**Version history:**\
4.5.0 - added

#### `configuration[timeline_access][trending_link_feeds]` {#timeline_access-trending_link_feeds}

**Description:** Access restrictions on [trending link feeds]({{< relref "methods/timelines#link" >}}).\
**Type:** Hash\
**Version history:**\
4.5.0 - added

#### `configuration[timeline_access][trending_link_feeds][local]` {#timeline_access-trending_link_feeds-local}

**Description:** Access restrictions for local posts in the trending link feeds.\
**Type:** String (Enumerable oneOf)\
- `public` = Access to local posts in trending link feeds is available to both visitors and logged-in users.\
- `authenticated` = Access to local posts in trending link feeds requires authentication.\
- `disabled` = Access to local posts in trending link feeds is only possible for users with the “View live and topic feeds” [permission]({{< relref "entities/Role#permissions" >}}).\
**Version history:**\
4.5.0 - added

#### `configuration[timeline_access][trending_link_feeds][remote]` {#timeline_access-trending_link_feeds-remote}

**Description:** Access restrictions for remote posts in trending link feeds.\
**Type:** String (Enumerable oneOf)\
- `public` = Access to remote posts in trending link feeds is available to both visitors and logged-in users.\
- `authenticated` = Access to remote posts in trending link feeds requires authentication.\
- `disabled` = Access to remote posts in trending link feeds is only possible for users with the “View live and topic feeds” [permission]({{< relref "entities/Role#permissions" >}}).\
**Version history:**\
4.5.0 - added

#### `configuration[limited_federation]` {#limited-federation}

**Description:** Whether federation is limited to explicitly allowed domains.\
**Type:** Boolean\
**Version history:**\
4.4.0 - added

### `registrations`

**Description:** Information about registering for this website.\
**Type:** Hash\
**Version history:**\
4.0.0 - added

#### `registrations[enabled]` {#registrations-enabled}

**Description:** Whether registrations are enabled. This will be `false` if `registrations_mode` is `none` or if the server is in `single_user_mode`.\
**Type:** Boolean\
**Version history:**\
4.0.0 - added

#### `registrations[approval_required]` {#approval_required}

**Description:** Whether registrations require moderator approval.\
**Type:** Boolean\
**Version history:**\
4.0.0 - added

#### `registrations[message]` {#registrations-message}

**Description:** A custom message to be shown when registrations are closed. Will be `null` if registrations are open.\
**Type:** {{<nullable>}} String (HTML)\
**Version history:**\
4.0.0 - added

#### `registrations[min_age]` {#registrations-min_age}

**Description:** A minimum age required to register, if configured.\
**Type:** {{<nullable>}} Integer\
**Version history:**\
4.4.0 - added

#### `registrations[reason_required]` {#registrations-reason_required}

**Description:** Whether registrations require the user to provide a reason for joining. Only applicable when `registrations[approval_required]` is true.\
**Type:** {{<nullable>}} Boolean\
**Version history:**\
4.4.0 - added

#### `registrations[url]` {#registrations-url}

**Description:** A custom URL for account registration, when using external authentication.\
**Type:** {{<nullable>}} String (URL)\
**Version history:**\
4.2.0 - added

### `api_versions` {#api-versions}

**Description:** Machine-readable API version information that allows clients to determine which API endpoints and features are available on this server. This provides a more reliable method for capability detection than parsing human-readable version strings, especially for forks and development builds. It contains at least a `mastodon` attribute, and other implementations may have their own additional attributes.\
**Type:** Hash\
**Version history:**\
4.3.0 - added

### `api_versions[mastodon]`

**Description:** API version number that increments with substantial API changes. Clients can use this value to determine API compatibility rather than parsing complex version strings like "4.4+hometown-123" from forks or nightly builds. This number increases independently of the human-readable version number.\
**Type:** Integer\
**Version history:**\
4.3.0 - added

### `contact` {#contact}

**Description:** Hints related to contacting a representative of the website.\
**Type:** Hash\
**Version history:**\
4.0.0 - added

#### `contact[email]` {#contact-email}

**Description:** An email address that can be messaged regarding inquiries or issues.\
**Type:** String (Email)\
**Version history:**\
4.0.0 - added

#### `contact[account]` {#contact-account}

**Description:** An account that can be contacted natively over the network regarding inquiries or issues.\
**Type:** {{<nullable>}} [Account]({{< relref "entities/Account" >}})\
**Version history:**\
4.0.0 - added

### `rules` {#rules}

**Description:** An itemized list of rules for this website.\
**Type:** Array of [Rule]({{< relref "entities/Rule" >}})\
**Version history:**\
4.0.0 - added

## InstanceIcon attributes {#InstanceIcon}

### `src` {#src}

**Description:** The URL of this icon.\
**Type:** String\
**Version history:**\
4.3.0 - added

### `size` {#size}

**Description:** The size of this icon.\
**Type:** String (in the form of `12x34`, where `12` is the width and `34` is the height of the icon)\
**Version history:**\
4.3.0 - added

## See also

{{< page-relref ref="methods/instance#v2" caption="GET /api/v2/instance" >}}

{{< caption-link url="https://github.com/mastodon/mastodon/blob/main/app/serializers/rest/instance_serializer.rb" caption="app/serializers/rest/instance_serializer.rb" >}}
