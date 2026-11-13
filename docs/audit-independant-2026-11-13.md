# Audit indépendant de « Réseau vivant » (v2.0.0), 13 novembre 2026

Périmètre : site local (serveur local), Chrome avec Playwright. Appareils testés : iPhone 13 (390 px), iPhone SE (320 px), ordinateur 1440×900, et un essai sans JavaScript. Points vérifiés : parcours complet, 13 fiches ouvertes (lion, zèbre, girafe, guépard, herbes, rhino_blanc, hyène, termite, pangolin, carcasses, détritus, baobab, gazelle), 375 réponses de quiz automatisées (121 questions différentes), navigation au clavier, débordements, contrastes calculés, en-têtes de sécurité du contenu (CSP) de `netlify.toml` injectés.
Captures : `audit/shots/`. Scripts : `audit/*.js`.
Limites : pas de lecteur d'écran réel, pas d'appareil physique, pas de test avec des enfants. Le site en ligne n'a pas été testé, seulement la copie locale.

## Synthèse

Le site est propre techniquement : aucune erreur console, aucune violation de la CSP stricte, environ 200 Ko au total, des cibles tactiles en grande majorité correctes et une identité visuelle soignée.
**Verdict : pas encore présentable à un recruteur.** Quatre défauts se repèrent en moins de deux minutes :
- une faute dans chaque recherche (« animalaux ») ;
- un quiz où la bonne réponse est toujours la première (100 % (15 sur 15)) ;
- un quiz qui déclare fausses des réponses justes (données de répartition incomplètes) ;
- des accords faux sur les animaux au féminin (« Que mange-t-il ? » sur la girafe).

Comptez environ une journée de corrections pour les P0 et la plupart des P1.

## Plan d'amélioration priorisé

| # | Prio | Constat et preuve | Impact | Correction proposée | Appareil |
|---|---|---|---|---|---|
| 1 | **P0** | Quiz « Drôles de bêtes » : la bonne réponse est **toujours en 1re position**, sur 100 % (15 sur 15) des questions observées. Cause : `curiosities` (app.js l.229-245) n'est jamais mélangé, seul l'ordre des questions l'est (l.249). | Un enfant trouve le truc dès la 2e question. Le quiz ne mesure plus rien, et le défaut saute aux yeux d'un recruteur. | `make: () => shuffle(curiosities).slice(0, 5).map((c) => ({ ...c, options: shuffle(c.options) }))` | Tous |
| 2 | **P0** | Faute visible à chaque recherche ou filtre : « 2 **animalaux** trouvés », « 40 animalaux trouvés ». Cause : app.js l.67, `animal${n > 1 ? 'aux' : ''}`. | Faute d'orthographe dans un site éducatif, au premier geste de l'utilisateur. | `` `${n} ${n > 1 ? 'animaux trouvés' : 'animal trouvé'}` `` | Tous |
| 3 | **P0** | Le quiz « Menus et cartes » compte comme fausses des réponses vraies. Exemples observés : « Dans quelle région vit le babouin olive ? » propose Afrique de l'Ouest comme mauvaise réponse ; pour l'autruche, Ouest et Centre ; pour le rat des herbes du Nil, Sahel et Centre. Cause : `regions` incomplètes dans data.js (voir la section scientifique) et `qRegion` (l.221-227) qui prend comme leurres toutes les régions absentes des données. | On apprend une erreur à l'enfant et on le pénalise alors qu'il a raison. | Corriger `regions` (babouin, autruche, rongeur, bubale, éland, python). Limiter `qRegion` aux espèces endémiques d'une seule région (gazelle de Thomson, topi, dik-dik, springbok, suricate). Ou poser la question à l'envers : « Laquelle n'est pas une région où vit… ». | Tous |
| 4 | **P0** | Accords faux pour les animaux au féminin et pour les ressources. Sur girafe, hyène, gazelle, autruche et outarde : « Qui **le** mange ? / Que mange-t-**il** ? » (app.js l.101-102, n'utilise pas `pronoun()`). La légende « **Il** vit dans ces régions » et la légende de carte « Les régions où **il** vit » sont figées dans index.html (l.109, l.111), même pour les carcasses et les herbes. Les options de `qDiet` disent « Herbivore : **il** mange » pour la girafe (l.216-218). L'annonce lecteur d'écran dit « Herbes de savane **est** maintenant au centre » (l.117). | Erreurs de français répétées sur les animaux phares, dans un site pour enfants. | Titres : `Qui ${feminine ? 'la' : 'le'} mange ? / Que mange-t-${pronoun(x)} ?`. Légendes générées en JS (« On le trouve ici », « Elle vit… », « On en trouve ici » pour les ressources). Options de `qDiet` sans pronom (« Herbivore : mange des plantes »). Annonce avec `capitalize(withArticle(x))` et accord du verbe. | Tous |
| 5 | P1 | Texte qui déborde des cartes de relation : « occasionnellement » dépasse de 37 px, « Phacochère commun » et « Hippotrague rouan » de 12 à 15 px. À 320 px, la page s'élargit à 328 px : défilement horizontal sur la fiche du lion, qui est l'écran par défaut. Le débordement se voit aussi à 390 px (capture `iPhone13-02-full-s02.png`, cartes Autruche et Hippotrague). Cause : `.rel-meta` (styles.css l.168-170) n'autorise pas la coupure des mots. | Mise en page cassée sur petit téléphone, dès l'arrivée. | `.rel-meta strong, .rel-meta small { overflow-wrap: anywhere; hyphens: auto; }` (le `lang="fr"` est déjà présent) | iPhone SE, iPhone 13 |
| 6 | P1 | Les liens rares servent de réponses de quiz, présentées comme la règle : « Quel repas peut chasser le lion ? → **L'éléphant** » puis « Le lion est carnivore : il mange d'autres animaux, comme l'éléphant », alors que data.js dit « très rarement, surtout des jeunes, dans quelques régions ». Même chose pour les hippotragues (« occasionnellement ») et le python face à l'impala (« rarement »). | Idée fausse ancrée chez l'enfant : « le lion mange les éléphants ». | Ajouter `"rare": true` aux liens concernés et les exclure de `qWhoEats` et `qPredatorFood` (filtrer sur `!l.rare`). | Tous |
| 7 | P1 | Quiz « Qui mange qui ? » trop faciles : les mauvaises réponses sont toujours des herbivores stricts (`qWhoEats`, l.193) ou des plantes (`qPredatorFood`, l.207). Il suffit de repérer « le seul carnivore » ou « le seul animal ». Exemple : « Qui peut manger l'hippotrague noir ? Bubale / **Lion** / Topi ». | Aucun apprentissage du réseau, et ennui pour les 12-16 ans. | Prendre comme leurres d'autres prédateurs qui ne mangent pas cette proie : « Qui mange le termite ? Oryctérope / Guépard / Crocodile ». Pour `qPredatorFood`, prendre des animaux trop gros ou d'un autre milieu. | Tous |
| 8 | P1 | Les émojis représentent d'autres animaux : 🦌 (cerf, absent d'Afrique subsaharienne) pour **11 antilopes** ; 🐜 (fourmi) pour le termite ; 🐃 (buffle d'Asie) pour le gnou ; 🦬 (bison d'Amérique) pour le bubale et le topi ; 🦡 (blaireau) pour l'oryctérope ; 🦊 pour le protèle (une hyène). 🐾 sert à 4 espèces (hyène, suricate, pangolin, porc-épic) et 🪶 à 3 oiseaux. L'avertissement « Les émojis sont des symboles » est caché dans un `<details>` fermé du pied de page. | Confusion visuelle forte pour un enfant de 8-10 ans, qui apprend à reconnaître. Le termite dessiné en fourmi entretient une confusion classique. | Court terme : 🐜 → libellé sans émoji ou silhouette ; avertissement visible près du réseau. Durable : silhouettes SVG ou photos (voir les décisions). | Tous |
| 9 | P1 | La recherche ne connaît pas les mots des enfants : « antilope », « singe », « fourmi » donnent **0 résultat**, alors que 11 antilopes et 2 singes sont présents. Les ressources (herbes, baobab, carcasses) sont introuvables : `renderLibrary` filtre `animals` seulement (l.65). | Impasse dès la première recherche naturelle. | Champ `keywords` dans data.js (ex. `"antilope"`, `"singe"`, `"oiseau"`), inclus dans la chaîne normalisée. Ressources dans les résultats de recherche. | Tous |
| 10 | P1 | Au clavier, la bibliothèque repliée (`max-height: 148px`, overflow hidden, styles.css l.130) laisse les 50 puces tabulables. On fait 36 tabulations sur des boutons invisibles avant d'atteindre le réseau (test `kbd.js` : Lycaon et Ratel reçoivent le focus hors champ). | Focus invisible (WCAG 2.4.7) et parcours au clavier très long. | Quand la liste est repliée, poser l'attribut `inert` (ou `hidden`) sur les puces qui débordent, ou n'afficher que N puces et « Voir les 50 animaux ». | Ordinateur, clavier |
| 11 | P1 | Après une réponse au quiz, le focus est perdu : le bouton cliqué devient `disabled` et le focus retombe sur `BODY` (test `kbd.js`, app.js l.287-291). | Les utilisateurs de lecteur d'écran ou de clavier perdent leur position. | Après `answer()`, envoyer le focus sur `#quizFeedback` (avec `tabindex="-1"`) ou sur `#nextQuestion`. Remplacer `disabled` par `aria-disabled="true"`. | Clavier, lecteur d'écran |
| 12 | P1 | Contradiction pédagogique dans la chaîne d'exemple : le texte dit « Chaque flèche veut dire **est mangé par** » (index.html l.145), mais une flèche va du Soleil aux herbes. Le Soleil n'est pas mangé. | Brouille la notion clé (flux d'énergie ou relation de prédation) qu'on attend des 8-12 ans. | « Chaque flèche montre où va l'énergie : le Soleil nourrit les herbes, les herbes sont mangées par le zèbre… » | Tous |
| 13 | P1 | Badge « Herbivore brouteur et **navigateur** » (data.js l.555, l.817, l.1003 : rhinocéros noir, koudou, dik-dik). « Navigateur » est un calque de l'anglais *browser* ; il n'a pas de sens en zoologie française. Le rhinocéros blanc est dit « brouteur » alors qu'il mange de l'herbe au ras du sol : le terme technique est « paisseur ». | Jargon faux, incompréhensible pour un enfant, et repérable par un enseignant. | Badges en langage enfant : « Mange de l'herbe », « Mange des feuilles », « Mange herbe et feuilles ». | Tous |
| 14 | P1 | Erreurs factuelles dans les fiches : oreilles « grandes et **arrondies** » de l'hippotrague rouan (data.js l.912 ; elles sont longues, pointues et terminées par une touffe) ; régions de l'éland, du bubale, du python, du babouin, de l'autruche et du rat des herbes. Détail et sources dans la section scientifique. | Crédibilité du contenu. | Corriger les données ; noter la source par espèce (champ `source`). | Tous |
| 15 | P1 | Mentions légales incomplètes (index.html l.183-188) : l'hébergeur est nommé sans adresse ni téléphone, ce que la loi pour la confiance dans l'économie numérique (LCEN, art. 6) exige même pour un site personnel. « Aucune donnée personnelle n'est collectée » est trop absolu : Netlify conserve des journaux techniques (adresses IP). | Point de conformité visible par un recruteur ou un parent attentif. | Ajouter l'adresse et le contact de Netlify. Écrire : « Ce site ne dépose aucun cookie et ne collecte aucune donnée ; l'hébergeur conserve des journaux techniques ». | Tous |
| 16 | P2 | Les notes des liens alimentaires sont écrites du point de vue du mangeur, mais elles s'affichent aussi côté proie. Sur la fiche du termite : « Pangolin — **et des fourmis** » ; sur celle du criquet : « Serval — et d'autres insectes ». Sur la fiche des herbes, les 22 mangeurs portent l'étiquette « **plante** » (« Lièvre du Cap — plante »), via `kindLabels` (l.44, l.88-89). | Lecture absurde pour un enfant. | Côté mangeurs : n'afficher que `noteForPrey`, ou « le mange » / « en mange ». Garder `note` pour le côté nourriture. | Tous |
| 17 | P2 | Une pastille de compteur vide reste visible (petit trait orange) quand il n'y a aucun prédateur : lion, guépard, rhinocéros, herbes (captures `iPhone13-11…`, `iPhone13-14…`). Cause : `.count-pill` sans règle `:empty` (styles.css l.157). | Artefact visuel sur l'écran d'accueil (le lion). | `.count-pill:empty { display: none; }` | Tous |
| 18 | P2 | Les deux `<details>` du pied de page n'ont pas de marqueur d'ouverture : `summary { display: flex }` (styles.css l.317) supprime le triangle (capture `iPhone13-02-full-s08.png`). | « Sources et limites » et « Mentions légales » ne paraissent pas cliquables, alors que les limites scientifiques y sont cachées. | Ajouter un chevron (`summary::after { content: "▾" }`, rotation quand `[open]`) ou garder `display: list-item`. | Tous |
| 19 | P2 | Défauts de la carte d'Afrique (`maps-combo.png`) : le Sahel est un `<rect>` superposé aux régions Ouest, Centre et Est, ce qui crée des bandes plus foncées et des bords droits (baobab, bubale). Aucun contour ne sépare les régions actives : avec 4 régions coloriées, « Centre » et « Est » se confondent. « Océan Indien » est coupé en « Océan Indie » à 390 px. | Lisibilité de la carte, qui est un argument clé du produit. | Découper le Sahel dans les autres régions (ou opacité commune sur un groupe `<g>`). Ajouter un trait blanc de 1,5 px entre les régions. Déplacer le libellé de l'océan ou utiliser `text-anchor="end"`. | Tous |
| 20 | P2 | Un lien partagé `/#girafe` s'ouvre en haut de la page : `scrollY = 0`, la fiche de la girafe est 1 341 px plus bas, car `init()` ne fait pas défiler. Un clic sur « Carte » ou « Quiz » remplace `#girafe` dans l'adresse ; au rechargement, on revient au lion. | Le partage d'une fiche (enseignant vers élève) ne fonctionne pas comme prévu. | À l'ouverture, défiler vers le réseau si le hash correspond à un animal. Garder l'animal dans `?a=girafe` (ou `localStorage`) pour qu'il ne soit pas écrasé par les ancres. | Tous |
| 21 | P2 | Petits écrans (320 px) : le lien « Quiz » de la navigation est coupé hors champ, sans indice de défilement. L'indication du champ de recherche est tronquée en « Cherch ». Les filtres font 40 px de haut, alors que le README annonce « cibles tactiles de 44 px minimum ». Le filtre « Mammifères » couvre 80 % (40 sur 50) des animaux. | Navigation incomplète, promesse du README contredite, filtre peu utile. | Navigation sur deux lignes ou icônes sous 360 px. Indication « Cherche un animal ». Filtres à `min-height: 44px`. Filtres plus utiles : « Prédateurs / Herbivores / Mangeurs d'insectes / Plantes ». | iPhone SE |
| 22 | P2 | Couche « Les humains et cet animal » : « plusieurs villes de Tanzanie… des gens chassent cet animal » (data.js l.2098, l.2112, l.2126). L'étude TRAFFIC porte sur le **commerce** de viande de brousse dans les villes, pas sur une chasse urbaine. Le lien renvoie vers un rapport en anglais. | Phrase factuellement bancale ; source inutilisable pour la cible. | « Dans des villes de Tanzanie, on vend de la viande de cet animal chassé dans la nature, parfois illégalement. » | Tous |
| 23 | P2 | Sur ordinateur, la fiche du lion (17 proies) laisse une colonne gauche presque vide sur environ 1 300 px de hauteur (`desktop-02-full-s00/s01`). Le texte d'aide dit « **Touche** un animal » même sur ordinateur. | Mise en page déséquilibrée, peu « produit ». | Côté proies, liste en 2 colonnes au-delà de 8 éléments, ou repli « Voir les 17 ». Texte « Touche ou clique ». | Ordinateur |
| 24 | P2 | Sans JavaScript, la bibliothèque, le réseau et le quiz sont vides, sans aucun message (pas de `<noscript>`). | Rare, mais page cassée sans explication (bloqueurs, réseau scolaire filtré). | `<noscript><p>Ce site a besoin de JavaScript pour fonctionner.</p></noscript>` | Tous |
| 25 | P2 | Contrastes faibles sur la carte : « Sahara » à 2,23:1 ; libellés de régions inactives à 4,34:1 en 13 px ; océans et équateur à 4,1:1 en 9 à 11 px italique. | Lisibilité réduite (malvoyance, plein soleil). | `.desert-label { fill: #7d7558 }`, régions en `#5d5946`, libellés d'au moins 12 px. | Tous |

Points positifs vérifiés, à mettre en avant :
- 0 erreur console et 0 violation de la CSP de production (injectée via Playwright).
- Poids total d'environ 200 Ko, sans police web ni image lourde.
- `escapeHtml` systématique avant chaque `innerHTML`.
- Respect de `prefers-reduced-motion`.
- Lien d'évitement présent.
- `aria-pressed` sur les filtres et les onglets ; `aria-live` sur le centre du réseau et les retours de quiz.
- Toucher un prédateur recentre bien l'écran sur le nouvel animal : centre visible entre 208 et 528 px pour un écran de 664 px.

## Décisions qui reviennent au propriétaire

1. **Précision des cartes.** Les 5 macro-régions colorent toute l'Afrique de l'Est pour la gazelle de Thomson (qui vit au Kenya et en Tanzanie) et la Zambie et le Mozambique pour le suricate (Kalahari surtout). Deux options : garder des blocs pédagogiques en assumant l'approximation, ou générer de vraies aires de répartition simplifiées (UICN) avec `tools/generer-cartes.py`. Les deux se défendent, mais le quiz des régions doit suivre le choix retenu.
2. **Émojis ou visuels réels.** Silhouettes SVG maison ou photos Wikimedia Commons (licences CC à créditer). Cela coûte du poids et du temps, mais c'est un gain pédagogique majeur pour les 8-10 ans.
3. **Niveaux de difficulté.** Une seule difficulté pour une tranche de 8 à 16 ans est trop large. Faut-il un mode « Explorateur » (8-11 ans) et un mode « Expert » (12-16 ans), avec chaîne à trois maillons, effet de la disparition d'une espèce, etc. ?
4. **Références Disney** (Simba, Pumbaa, Marty…). Elles accrochent l'attention, mais renvoient à des marques déposées et datent le ton pour les 13-16 ans. À garder, alléger ou rendre neutre.
5. **Historique du navigateur.** `history.replaceState` (l.168) empêche de revenir à l'animal précédent avec le bouton « Retour ». Avec `pushState`, l'exploration ressemble davantage à une navigation, au prix d'un historique long.
6. **Ce qui est publié en production.** `publish = "."` sert aussi `README.md`, `docs/` (audits internes), `tools/` et `CHANGELOG.md`. C'est une vitrine utile pour un recruteur, mais il faut l'assumer. Vérifier sur le site en ligne que `/.git/config` renvoie bien une erreur 404. Envisager un dossier `public/`.
7. **Animal par défaut.** Le lion affiche 17 proies et 0 prédateur : c'est un premier écran très long sur mobile et peu « réseau ». Un herbivore comme le zèbre (prédateurs et nourriture visibles) illustrerait mieux le concept dès l'arrivée.
8. **Couche « humains ».** Six espèces seulement, sous l'angle unique de la viande de brousse. À élargir (protection, tourisme, conflits avec les éleveurs), à réserver aux 12-16 ans ou à retirer.
9. **Aperçu de partage.** Il n'y a pas d'`og:image` : un lien partagé sur LinkedIn ou dans un courriel n'aura pas de visuel. Utile si le site sert de pièce de portfolio.
10. **Identité dans les mentions légales.** Un particulier peut rester anonyme (les coordonnées de l'hébergeur suffisent). Se nommer renforce la valeur de portfolio.

## Exactitude scientifique

### Erreurs et formulations douteuses

| Donnée | Problème | Correction | Source |
|---|---|---|---|
| `rongeur` (Rat des herbes du Nil, *Arvicanthis niloticus*) — `regions: east, south` | Son aire principale est l'Afrique de l'Ouest, le Sahel, l'Afrique centrale et l'Afrique de l'Est (du Sénégal à l'Éthiopie), jusqu'en Zambie et peut-être au Malawi. Elle n'atteint pas le « Sud » au sens du site. Le quiz compte donc « Sahel » comme faux. | `west, sahel, central, east` | [Mammal Diversity Database – *A. niloticus*](https://mammaldiversity.org/taxon/1003046) |
| `babouin` (*Papio anubis*) — `regions: central, east` | Il est présent dans toute l'Afrique de l'Ouest (Mauritanie, Mali, Guinée, Ghana, Niger, Nigeria…). Le quiz compte « Afrique de l'Ouest » comme faux. | Ajouter `west` et `sahel` | [Mammal Diversity Database – *P. anubis*](https://mammaldiversity.org/taxon/1000628) |
| `eland` (Éland du Cap, *Taurotragus oryx*) — inclut `west` | L'éland commun ne vit pas en Afrique de l'Ouest. C'est l'éland de Derby (*T. derbianus*) qu'on y trouve. | Retirer `west` | [Wikipedia – Taurotragus](https://en.wikipedia.org/wiki/Taurotragus) |
| `bubale` (*Alcelaphus buselaphus*) — `regions: west, east, sahel` | L'espèce est aussi en Afrique centrale (Cameroun, Tchad, Centrafrique) et australe (Namibie, Botswana, Afrique du Sud). Le nom « bubale roux » désigne même souvent la forme australe *caama*. | Ajouter `central` et `south` | [Mammal Diversity Database – *A. buselaphus*](https://mammaldiversity.org/taxon/1006131), [Futura Sciences](https://www.futura-sciences.com/planete/definitions/zoologie-bubale-roux-8161/) |
| `autruche` — `regions: east, south` | L'autruche d'Afrique du Nord survit au Cameroun, en Centrafrique, au Tchad et au Sénégal (réintroduction). Le quiz compte « Afrique centrale » et « Afrique de l'Ouest » comme faux. | Ajouter `central` et `sahel`, ou exclure l'autruche de `qRegion` | [Sahara Conservation – North African ostrich](https://saharaconservation.org/sahel-and-sahara-fauna/north-african-ostrich/) |
| `hippotrague_rouan`, `fun` : « Ses oreilles sont grandes et arrondies » (data.js l.912) | **Faux** : ses oreilles sont très longues, pointues et terminées par une touffe. C'est un de ses traits distinctifs. | « Ses longues oreilles pointues se terminent par une touffe de poils. » | [SeaWorld – Roan antelope](https://seaworld.org/animals/facts/mammals/roan-antelope) |
| `python` (*Python sebae*) — inclut `south` | Les populations d'Afrique australe sont rattachées à *Python natalensis* (espèce ou sous-espèce distincte, avec une zone d'hybridation). | **Douteux** : retirer `south` ou nommer « Python de Seba (et python de Natal au sud) » | [P. natalensis (miroir Wikipedia)](https://kaweah.freedombox.rocks/kiwix/wikipedia_en_all_maxi_2023-10/P._natalensis) |
| Badges « brouteur et navigateur » ; rhinocéros blanc « brouteur » | « Navigateur » est un calque de *browser*, sans sens en zoologie française. Pour un mangeur d'herbe, le terme est « paisseur ». | Langage enfant : « mange de l'herbe / des feuilles » | Terminologie (pas de source web consultée) |
| Quiz : « Le lion est carnivore : il mange d'autres animaux, comme l'éléphant » | **Trop affirmatif** : la donnée elle-même dit « très rarement, surtout des jeunes, dans quelques régions » (cas documentés à Savuti/Chobe). | Exclure les liens rares des quiz (constat 6) | data.js, note du lien lion → elephant |
| Termite représenté par 🐜 (fourmi) | Les termites ne sont pas des fourmis : ils sont apparentés aux blattes. C'est une confusion classique chez l'enfant, que le site renforce. | Autre visuel, plus une phrase « Le termite n'est pas une fourmi ! » | Connaissance établie (pas de source web consultée) |
| Pangolin : « C'est le seul mammifère couvert d'écailles » (data.js l.730, app.js l.233) | Juste pour le groupe, inexact au singulier : il existe 8 espèces de pangolins. | « Les pangolins sont les seuls mammifères couverts d'écailles. » | — |
| Couche « humains » : « dans plusieurs villes de Tanzanie… des gens chassent cet animal » | L'étude citée porte sur le commerce de viande de brousse dans les villes, pas sur une chasse urbaine. | Reformuler (constat 22) | Titre du rapport TRAFFIC référencé dans data.js (« Bushmeat trade in urban centres in Tanzania ») |
| Chaîne d'exemple : « chaque flèche veut dire est mangé par » | Incohérent pour la flèche Soleil → herbes. | Constat 12 | — |

### Échantillon jugé correct (vérifié sur connaissances de référence, pas de recherche web pour chaque ligne)

- **12 liens alimentaires :** lion → gnou, hyène → zèbre (jeunes ou affaiblis), guépard → gazelle, léopard → babouin, aigle martial → vervet (source ADW fournie), babouin → faons de gazelle (source Mpala fournie), outarde kori → gomme d'acacia (source ADW fournie), protèle → termites, crocodile → gnou, python → impala (jeunes), serval → rongeurs, lycaon → impala.
- **9 anecdotes ou réponses de quiz :** guépard au-delà de 90 km/h sur quelques secondes ; rhinocéros « noir » et « blanc » tous deux gris, lèvre pointue ou large ; cris d'alarme distincts du vervet (aigle, léopard, serpent) ; tympans du criquet sur l'abdomen ; « gompou » (afrikaans, « paon à gomme ») ; plus d'un million de gnous en migration en Afrique de l'Est ; rayures propres à chaque zèbre ; protèle et centaines de milliers de termites par nuit ; rugissement du lion audible à plusieurs kilomètres.

Les URL de sources (ADW, Mpala, DOI) n'ont pas pu être testées depuis l'environnement d'audit, car le réseau sortant était bloqué pour curl : vérifiez qu'elles répondent toujours.

---

## Suite donnée (version 2.1.0, 13 novembre 2026)

| # | Statut | Ce qui a été fait |
|---|---|---|
| 1 | ✅ | Réponses du quiz « Drôles de bêtes » mélangées à chaque partie |
| 2 | ✅ | « 1 résultat / N résultats » ; la recherche couvre aussi les plantes et les ressources |
| 3 | ✅ | Régions corrigées (rat des herbes, babouin, éland, bubale, autruche, python) ; quiz des régions limité aux espèces d'une seule région (gazelle de Thomson, springbok, suricate) |
| 4 | ✅ | Accords au féminin et pour les ressources (titres, légendes de carte, annonce vocale) ; options du quiz sans pronom |
| 5 | ✅ | Coupure des mots longs ; aucune barre de défilement horizontale à 320 px (vérifié) |
| 6 | ✅ | 9 liens rares marqués `rare` et exclus des quiz |
| 7 | ✅ | Leurres plausibles : mangeurs de termites pour une proie vertébrée, grands chasseurs pour un insecte, proies trop grosses pour un petit chasseur |
| 8 | 🟡 | Avertissement sur les émojis rendu visible sous le réseau, question et anecdote « le termite n'est pas une fourmi ». Le passage à des silhouettes ou à des photos reste à décider |
| 9 | ✅ | Mots-clés (antilope, singe, félin, oiseau, insecte, arbre, plante…) |
| 10 | ✅ | Puces masquées rendues `inert` quand la liste est repliée |
| 11 | ✅ | Focus envoyé sur le retour du quiz ; `aria-disabled` au lieu de `disabled` |
| 12 | ✅ | Texte de la chaîne : « les flèches montrent le chemin de l'énergie » |
| 13 | ✅ | « Herbivore (herbe) » et « Herbivore (herbe et feuilles) » remplacent « brouteur et navigateur » |
| 14 | ✅ | Oreilles de l'hippotrague rouan corrigées ; pangolins au pluriel |
| 15 | 🟡 | Adresse et contact de Netlify ajoutés, mention des journaux techniques. Le numéro de téléphone de l'hébergeur et l'identité de l'éditeur restent à décider |
| 16 | ✅ | Les notes réservées au côté « nourriture » ne s'affichent plus côté proie ; libellés génériques (« prédateur », « en mange ») |
| 17 | ✅ | Pastille vide masquée |
| 18 | ✅ | Chevron sur les blocs dépliables du pied de page |
| 19 | ✅ | Opacité commune sur les régions (plus de bandes foncées) ; libellés d'océan replacés |
| 20 | ✅ | Un lien `#girafe` ouvre directement le réseau ; les liens du menu ne remplacent plus l'animal dans l'adresse |
| 21 | ✅ | Cibles de 44 px pour les filtres, indication de recherche courte, menu compact sous 360 px ; filtres par régime alimentaire |
| 22 | ✅ | Texte de la couche « humains » aligné sur l'étude (commerce de viande, chasse légale ou braconnage) |
| 23 | ✅ | Liste des proies sur deux colonnes au-delà de 8 éléments (ordinateur) ; « Touche ou clique » |
| 24 | ✅ | Message `<noscript>` |
| 25 | ✅ | Contrastes de la carte renforcés, libellés d'au moins 10-12 px |

Décisions prises par défaut, réversibles :
- animal d'accueil : le zèbre (prédateurs et nourriture visibles dès l'arrivée) ;
- aperçu de partage (`og:image`) ajouté ;
- références aux dessins animés conservées.

Vérifications : 0 erreur console, 0 violation de la CSP, 120 quiz joués automatiquement sans incohérence détectée, captures iPhone SE, iPhone 13 et ordinateur.
