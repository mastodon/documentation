Sık Sorulan Sorular
==========================

> Bu SSS'in çevirileri:
>
> * [Español](FAQ_ESP.md)
> * [日本語](FAQ_JA.md)
> * [Polish](FAQ_PL.md)
> * [Français](FAQ_FR.md)

## Terminoloji

#### Mastodon nedir?

Tarih öncesi bir hayvan, mamutların atasıdır. Esasen, tüylü bir fildir. "Toot" diye ses çıkarır. 

#### Neden Mastodon İsmi?

Bir hayli metaldir. (Aynı isme sahip bir progresif metal grubu vardır)

#### “Federasyon” Nedir?

Kullanıcılarının sorunsuz bir şekilde konuşabildiği bir grup Mastodon sunucusudur.

#### “Oluşum” Nedir?

Hesap alabileceğiniz bir sunucudur. Herbirinin kendi politikası vardır çünkü herhangi biri tarafından yönetilebilirler!

#### “Mast–don” Nasıl Okunur?

İki O ile **mastodon** şeklindedir. En az bir kere yanlış anlayacaksınız. 

#### Yerel ve federal zaman tünelini anlamıyorum.

"Yerel" tootlar kayıt olduğunuz sunuculardandır. "Federal" tootlar sunucunuzun bildiklerinin hepsidir. (Biraz karışık, fakat kısa veriyonu: "sizin ve diğer yerlilerin takip ettiği tootlar.")

#### “Fediverse” Nedir?

Federal evren. Mastodon, Friendica, Hubzilla, Kroeg, Peertube ve daha fazla uygun sosyal medya sunucuları için bir ağdır. Genellikle eğer fediverse'deki sunucuların birinde hesabınız varsa, diğer sunuculardaki insanları takip edebilir ve onlar tarafından takip edilebilirsiniz. 

## Federasyon

####  Mastodon tam olarak nasıl merkezsizleştirilmiştir? 

Bir şeyi merkezsizleştirmenin farklı yolları vardır; bu durumda, Mastodon "federal" bir türdür. E-postayı düşünün, BitTorent'i değil. Kullanıcıların hesabı olduğu farklı sunucular (örnekler) vardır, ama hesaplarının nerede olduğundan bağımsız olarak birbirlerini takip edebilir ve birbirleriyle etkileşime girebilirler.

#### Teknik olarak federasyon nasıl çalışır?

Mastodon sürüm 1.6'dan beri bu protokolü kullanıyoruz [ActivityPub](https://www.w3.org/TR/activitypub/). Mevcut durumda ActivityPub önerilen W3C standardıdır. Mastodon uygunluk amacıyla OStatus'u destekler.

#### Başka neler federal ağın parçasıdır? What else is part of the federated network?

Ağ ("fediverse") Mastodon'dan önce vardı ve Friendica, Hubzilla, Diaspora vb. GNU sosyal sunucular tarafından doldurulmaktaydı. Bu sunucuların hepsi bir diğeriyle tamamen uyumlu değildir. Mastodon, ActivityPub ve OStatus protokolünü uygulayan diğer ağlarla uyumludur. Dikkate değer sunuculara yapılmış yeni eklentiler PeerTube ve Kroeg'dir.

#### Kaç kişi Mastodon'a kayıt olmuştur? Kullanıcı sayısı bölü zaman çizelgesini görebilir miyim?

Umumi APIlerin bilinen oluşumlarından alınmış Mastodon ağının iki bağımlı gönüllü rota istatistiği:

- [instances.social](https://instances.social)'s kullanıcı sayısı tablosu: <https://instances.social/list/old> 
- [mnm.social](https://mnm.social)'s kullanıcı artışı grafiği: <https://dashboards.mnm.social/dashboard/db/user-growth?orgId=1>

Tüm dosya durum bilgileri gönüllü ve derleme bulgulara bağlı olduğu için bunlar yaklaşık olarak alınmalıdır (Mastodon sunucuları hiçbir yere dosya durum bilgisi göndermez).

## Organizasyon

#### Mastodon nasıl finanse edilmiştir? 

Mastodon'un gelişimi ve mastodon.social'ın ev sahipliği böyle finanse edilmiştir [Patreon](https://www.patreon.com/mastodon) ve [Liberapay](https://liberapay.com/Mastodon/). Bunun ötesinde, projenin VC fonlaması, parasallaşması, reklamı veya bu tarzda bir şeyle ilgisi yoktur. Patreon ve Liberapay dışında bağışlar böyle gönderilebilir:

- [PayPal](https://www.paypal.me/gargron)
- BTC: `17j2g7vpgHhLuXhN4bueZFCvdxxieyRVWd`
- ETH: `0xC2d182De4604655CD420aE5739aE603DD7305C85`

Ağ bedavadır ve açık kaynaklıdır ve komüniteler kendi sunucularına yapabiliyorlarsa ev sahipliği yapmalıdırlar, bu şekilde masraflar daha fazla veya daha az dağılır. Kendi Patreon ve Libarepay sayfalarında diğer komünite fonlama metodları arasında birsürü örnek vardır.

## Kişisel Kullanım

#### Twitter'a çok benziyor, ne farkı var?

Mastodon merkezsizleştirilmiştir. Herkes kendi komünite kuralları altında bir Mastodon sunucusu yönetebilir. Twitter merkezi bir otorite tarafından yönetilir ve herkes için kurallar belirler.

#### Hangi oluşumu kullanacağımı nasıl seçmeliyim? 

[Birçok örnek mevcuttur](https://joinmastodon.org/#getting-started) hemen hemen her ilgi alanı için. Birkaç tane kamusal olanı deneyip hangisinin daha doğru olacağını görmek sorun değildir. Kamusal oluşumlarda kendi ilgi alanlarınız hakkında konuşmak bunun gibi [Mastodon.social](https://mastodon.social) diğer oluşumlara davet edilmenize yardımcı olabilir.

Bir oluşumun federal zaman akışının önizlemesini önsayfalarında bulabilirsiniz. Alternatif olarak, bir oluşumun ne dediğini görüntülemek için, kullanın [this preview tool](http://www.unmung.com/mastoview?url=mastodon.social&view=local) tatafından yaratılmıştır [Kevin Marks](https://mastodon.social/@kevinmarks).

#### Android'e nasıl yüklerim? 
Andorid için Chrome veya Firefox kullanıyorsanız Mastodon'u ana ekranınıza ekleyebilirsiniz. Anlık bildirimler dahil, birçok yönden asıl uygulama gibi davranacaktır. Alternatif olarak, deneyin [Tusky](https://play.google.com/store/apps/details?id=com.keylesspalace.tusky), [Mastalab](https://play.google.com/store/apps/details?id=fr.gouv.etalab.mastodon) veya [Tootdon](http://tootdon.club/).

#### iPhone'a nasıl yüklerim? 
Deneyin [Amaroq](https://itunes.apple.com/us/app/amaroq-for-mastodon/id1214116200).

#### Başka mobil/masaüstü/CLI uygulamalar var mı? 
[Evet.](Apps.md)

#### Nasıl arama yaparım?
İnsan ve etiket aramaları yapabilirsiniz fakat genel yazı aratamazsınız. Tooting alanının altındaki kutuyu kullanın. Eğer mobil düzendeyseniz navigasyondaki kaleme tıklayın.

#### Nasıl DM (Direkt Mesaj) atarım? 
Özel ayarlar için, "direkt" dahil (DM) tootun altındaki **küre**ye tıklayın. 

#### Benim oluşumumla birleşmeyen oluşumlar var mı? Nasıl anlarım?
Bazı oluşumlar özeldir ve sizin oluşumunuzla birleşmeyecektir. Diğerleri sizin oluşumunuz tarafından engellenebilir. Oluşumunuzun nasıl birleştiği hakkında daha çok bilgi edinmek için yöneticinize sorun.

#### Birden fazla hesabım olabilir mi? Farklı oluşumlar için aynı e-postayı kullanabilir miyim? 
Evet ve evet! Katılmak istediğiniz başka bir oluşum bulursanız, kayıt olun! Unutmayın, tüm oluşumlar yeni kayıtlara açık değildir ve bir başkası sizin seçtiğiniz kullanıcı adını almış olabilir.

#### Bir başka oluşumda takip ettiklerimi aktarabilir miyim? 
Evet. Aktarmak istediğiniz oluşuma bağlı olarak süre değişebilir. Eğer problem yaşıyorsanız yeni oluşumunuzla ilgili yöneticinizle konuşun. 

#### İnsanların beni taklit etmesini nasıl engellerim?
Herkes her oluşumda kullanıcı adı yaratabildiği için, başkalarının bir başka oturumda aynı kullanıcı adını kullanmalarını engellemek imkansızdır. Bazı insanlar kendi tek-kullanıcılık oluşumlarını kendilerini doğrulamak için alırlar, veya kullanırlar Keybase](https://keybase.io/).

#### İki-faktörlü doğrulamaya nasıl izin veririm?
İki-faktörlü doğrulamanın altında Ayarlar kısmında seçenek olacaktır. [Mastodon's 2FA](2FA.md) hem QR kodunu hem de düz metin parolasını kullanır.

#### Neden başkasının tootlarını göremiyorum? 
Bu birkaç sebepten dolayı olmuş olabilir. Kişinin gönderileri özel olabilir. Bir özel hesabın halka kapalı gönderilerini görmek için o kişinin takipçisi olmalısınız. Ek olarak, eğer biri sizi engellediyse, onun hiçbir postunu göremezsiniz.

#### Trending nedir?
Trending konular şu an için resmi olarak takip edilmemektedir. 

#### “CW” nedir?
“CW” “İçerik Uyarısı” demektır. Tootunuzdaki yazıları ve görüntüleri bir uyarı ile gizlemek için kullanabilirsiniz, spoiler gibi.

####  “Görüntüyü Hassas olarak İşaretle” özelliği nasıl çalışır (“NSFW”)?
Kamera ikonunu kullanarak gönderinize bir resim eklediğinizde, çizili bir göz gibi bir toggle belirecektir. Buna tıklamak görselinizi "Hassas İçerik" uyarısının arkasına gizler, üstüne tıklayana kadar başkalarının görmesini engeller.

#### Ananas olayı nedir?
Lezzetlidirler ve insanı gülümsetirler. Alışmaya çalışın.

#### Çok fazla "Awoo" görüyorum, bu ne anlama geliyor?
Yüksek sesle söylemeyi deneyin. Eğlenceli!

#### Hesabımı nasıl silerim?
Uygulamanın üst sol köşesindeki Ayarlar çarkına tıklayın ve Güvenliği seçin. Oradan "hesabımı sil"i seçin. **Hesap silme geri döndürülemez bir olaydır. Kullanıcı adı kalıcı olarak kullanılamaz durumda olacaktır.**

#### Benim yöneticim kim ve onla nasıl iletişim kuracağım/onu nasıl takip edeceğim?
Önce **Başlarken**e, sonra **Genişletilmiş Bilgi**ye tıklayın. Bir bilgi sayfası görünecektir. Eğer o bilgi yönetici tarafından yapılandırılmışsa, orada görünecektir.

#### Vay, belirli bir oluşumda sürekli aşağılayıcı şeyler görüyorum, bunun *hepsini* engellemenin bir yolu var mıdır?
O oluşumdan herhangi bir kişinin profilini açın ve üç noktaya ("...") tıklayın ve "alandaki her şeyi gizle"yi seçin.

#### Mastodon modere ediliyor mu?
Her oluşumun moderasyonu farklıdır ve hepsinin kendi moderatörleri vardır. Bulunduğunuz oluşumun kurallarını sormanızda bir sorun yoktur. Genellikle kurallar oluşumun hakkında sayfasına yollanır.([like the “more” page at Mastodon.social](https://mastodon.social/about/more))

#### Aşağılayıcı içerikleri nasıl bildiririm? How do I report offensive content?
Her gönderinin altında üç nokta göreceksiniz. Bunlara tıklayarak gönderiyi açabilir veya içeriği bildirebilirsiniz. Bir içerik bildirirken, moderatörün bakmasına ihtiyaç olan tüm gönderileri seçiniz.

#### Tacizle nasıl başa çıkacağım?
Eğer yöneticiniz tacizi ciddiye alıyorsa, gönderi-bildirimi sistemiyle direkt olarak ona bildirebilirsiniz. Bu, gönderilerin altındaki üç noktadan ve yöneticinizle direkt iletişime geçerek yapılabilir.

#### Özel Mesajlarım diğer oturumlardaki insanlara ulaşacak mı?
Özel (sadece-takipçiler) ve direkt mesajlar kesinlikle Mastodon oturumlarının 1.6 ve üstü sürümlerini kullanan insanlara ulaşacaktır. Sadece OStatus uygulayan sunuculara gönderilmeyecektir. Zaten böyle sunucularla karşılaşmanız pek olası değildir.

#### What does “Adjust Status Privacy” mean and how does it work?
The **globe** icon under the toot area adjusts your status privacy by changing who can see your posts. This is what happens:

| Privacy setting | Broadcasted to | Viewable by | Notes |
| --------------- | ----------- | ------ | ----- |
| Public          | Public timelines | Everyone | On your instance, it will appear on all timelines. It will also appear on federated and hashtag timelines of instances where you have followers. |
| Unlisted        | Followers only | Everyone | |
| Private         | Followers only |  Followers only | Cannot be boosted. Mentioned people will also receive a copy. |
| Direct          | Mentioned people only  | Mentioned people only | Cannot be boosted |

#### Can I use hashtags? Should I?
Yes! Hashtags are tracked and are often fun, but some tags help people avoid triggering posts. This is especially appreciated on public posts of #POLITICS, #HEALTH, #DEPRESSION, or #LEWD OR #NSFW topics. Such posts are also what the Content Warning system was designed for.

#### How do I get verified with a “✅”?
“✅” is an emoji, *only* for laughs. There is no verification on Mastodon, as verification in the traditional sense would require a central authority. You can copy and paste “✅” into your bio if you wish, but it does nothing. If you want to really assert your identity, link to your Mastodon profile from another website where your identity is already established, or use Keybase for cryptographic verification.

#### Can I edit a toot?
No, sorry. But you could delete your toot and rewrite…

#### If I delete a post, does it get deleted everywhere?
Deleting a post propagates to the same places where the original post went. As a rule, it means yes, it gets deleted everywhere. There can be network delays and processing delays. Under rare circumstances a copy could remain somewhere, especially if the post was public.

#### How do I view my favorite toots?
From the Getting Started menu, click **Favourites**. If your Getting Started menu isn't open, that's the Asterisk (\*) icon in the navigation.

#### Can I quote a toot?
No. It's possible to link to toots like to any webpage, but we believe that the quote feature encourages toxic behaviour so it's deliberately omitted.

#### If my instance shuts down forever, do I lose my data?
Yes, you do.

#### Can I save my data?
Yes, some of it! It‘s under **Preferences->Data export**

#### I can’t see toots of a remote user under their bio!
If you are looking at their profile from the expanded view, click their avatar. This will take you directly to their instance, which displays all their public toots. Alternatively, opening any link of their username in a new tab will likewise take you there.

#### How do I see threads?
Click the toot body, or alternatively, select "expand toot" from the dropdown underneath. This will show the conversation the toot is part of.

#### How do I link to toots?
The date & time (sometimes relative time, such as "2m", that is, "2 minutes ago") of a toot always links to the public page ("permalink") of the toot. Right click it and copy location.

#### How do I link to my profile?
You can right-click your avatar or username and copy the location. The links typically look like `https://domain.tld/@username`

#### Does clicking a #hashtag show local results, or federated?
The hashtag timeline is essentially a filtered federated timeline.

#### When I mute a boost, who gets muted, the booster or the original author?
The original author. You can mute boosts from someone you follow from their profile.

#### Can I preview the people on an instance, and what they’re saying?
Yes, the frontpage of every instance has a timeline preview, unless disabled by their admin.

#### How do I hide the toots of languages I don’t understand?
Open preferences and select all languages you don't want to see. Keep in mind that language detection is automated and therefore imperfect, you may still see some toots you don't understand, that does not mean the filters don't work.

#### Is automatic translation supported?
Not yet, but there is a [Firefox TamperMonkey script](https://github.com/tomouchuu/mastodon-translate) that might work for you.

#### Do toots automatically broadcast federated, or stay local?
The primary function of Mastodon is delivering your toots to your followers. Your toots do not leave your server unless you have followers from other servers, in which case they go to those specific servers. There are other cases, such as when you address a message to someone from another server without them needing to be your follower. Mastodon does not discriminate between local and remote followers. However, the "federated" and "local" timelines you can browse display only toots with the "public" privacy setting. Choosing the "unlisted" or lower privacy setting will opt your toot out of those timelines. Similarly, an unlisted toot would not show up in a hashtag timeline even if you used that hashtag in the toot. 

#### What is the default image upload size limit?
The limit is 8 megabytes.

#### What types of files can be uploaded?
PNG, JPEG, GIF images, as well as WebM and MP4 videos. A GIF will be automatically converted to soundless MP4 which will behave like a GIF in the UI. Similarly, a soundless WebM or MP4 video will also act as a GIF in the UI.

#### How do I start my own instance?
See the [User Guide](../README.md), under the heading “Running Mastodon.”

#### I found a bug or have a suggestion for Mastodon.
You can file a bug or submit suggestions at [Mastodon’s Issue Tracker.](https://github.com/tootsuite/mastodon/issues)

## Hey I love mastodon FAQs! Can I have more?
Here’s more, from hardworking individuals trying to help, too.

* <https://gist.github.com/joyeusenoelle/74f6e6c0f349651349a0df9ae4582969>
* <https://hastebin.com/raw/xuqogukimu>
* <https://github.com/ThomasLeister/masto-faq>
* <http://mastoguide.info/Pages/FAQindex.html](http://mastoguide.info/Pages/FAQindex.html>
* <https://medium.com/tebelorg/my-first-10-days-on-mastodon-fediverse-f6f1d73db8d7>

---

This FAQ was compiled with contributions from [@Gargron](https://mastodon.social/@Gargron), [@raccoon](https://mastodon.social/@Raccoon), [@upside](https://octodon.social/@upside), [@zacanger](https://mastodon.social/@zacanger), [@NthTensor](https://octodon.social/@NthTensor), [@ametlles](https://mastodon.social/@ametlles) and many others in the fediverse!
