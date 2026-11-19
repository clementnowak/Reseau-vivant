# Audit CPO — univers « les airs » (3e univers de Réseau vivant)

Périmètre : branche `univers-airs` du dépôt `/home/claude/reseau-vivant` (état non commité). Aucun fichier du dépôt n'a été modifié. Les chiffres viennent de scripts d'analyse sur `univers/airs/donnees.js` et de captures du site réel (Chrome headless, mobile et bureau).

Commandes lancées :
- `node tools/verifier-univers.js` : OK. 3 avertissements « pas encore de prédateur renseigné » : faucon_hobereau, epervier, guepier.
- `node tests/parcours.js` : OK, `errors []` (34 fiches, 95 questions différentes pour airs). Le test ne détecte aucun des défauts ci-dessous, car il cherche seulement `undefined`, `null` ou `{` dans les textes, jamais la grammaire.

Convention : « bloquant » = à corriger avant mise en ligne ; « important » = à corriger dans la même PR ou juste après ; « mineur » = confort ou finition.

---

## 0. Synthèse

| Axe | Niveau |
|---|---|
| Équilibre du réseau | Bon, avec un manque de maillons (vers de terre, mouches, lapin/lièvre) |
| Cohérence avec le modèle des autres univers | 2 vrais défauts de code ; le reste est propre |
| Carte | Fonctionnelle et accessible dans la structure. Un problème de fond : la zone « Afrique (hiver) » est trompeuse |
| Contenu et sources | Globalement solide. Quelques relations marginales et des sources hors Europe |
| Parité documentaire | Incomplète : README, CHANGELOG, `<meta>` d'`index.html`, coulisses |

Défauts bloquants :
1. B1 : accords au pluriel cassés (criquets, chenilles, papillons de nuit), dans l'interface et dans les quiz.
2. B2 : phrase de la chaîne d'accueil qui dit que le faucon pèlerin chasse l'abeille.

---

## 1. Intérêt pédagogique et équilibre du réseau

### Chiffres (airs / savane / récif)

| | airs | savane | récif |
|---|---|---|---|
| Êtres vivants | 34 | 59 | 32 |
| Animaux / ressources | 29 / 5 | 49 / 10 | 27 / 5 |
| Liens | 79 | 161 | 48 |
| Liens par être vivant | 2,32 | 2,73 | 1,50 |
| Liens marqués `rare` | 6 (8 % : 6 sur 79) | 25 | 4 |
| Questions « Drôles de bêtes » | 15 | 15 | 14 |
| `humanInteractions` | 5 | 6 | 3 |
| Entrées `culture` (bulles 🎬) | 0 | 5 | 5 |

Verdict sur la taille : 34 est le bon ordre de grandeur. C'est plus dense que le récif et moins que la savane, ce qui convient à un 3e univers. La densité de 2,32 est saine.

### Ce qui marche
- **Chaînes de 3 à 4 maillons** (liens non rares uniquement) :
  - 18 animaux sur 29 (62 %) ont une chaîne d'au moins 3 maillons, producteur compris.
  - 7 animaux sur 29 (24 %) en ont une d'au moins 4.
  - 4 chaînes font 5 maillons : `faucon_pelerin > hirondelle > libellule > moustique > fleurs` (idem avec hobereau et épervier), et `grand_duc > chouette_effraie > moineau > chenille > herbes`.
  - La chaîne à 6 maillons n'existe qu'avec des liens `rare`. C'est bien qu'elle reste cachée.
- **L'hirondelle comme animal par défaut est un bon choix.** Elle a 8 liens (4 prédateurs, 4 proies), soit le maximum d'équilibre sur la fiche d'accueil. Le réseau est lisible dès l'arrivée et le lien avec le faucon pèlerin de la chaîne d'accueil est cohérent. Elle est aussi visible dans la vraie vie pour un enfant.
- **La chaîne d'accueil est valide** : `faucon_pelerin > hirondelle > abeille > fleurs` passe le vérificateur et l'ordre est fort vers faible, comme les autres univers. Elle compte 4 maillons, contre 3 pour savane et récif. C'est acceptable sur mobile.
- Un seul animal est à la fois très central et crédible : `hirondelle`, `etourneau`, `epervier`, `criquet`, `campagnol` ont 7 ou 8 liens. Pas de hub aberrant.

### Problèmes de structure

**R1. Trois animaux sans prédateur affiché et sans explication — important**
- Concerne `faucon_hobereau`, `epervier`, `guepier`. L'interface affiche « Aucun prédateur n'est montré ici pour l'instant. ».
- Pour un 3e univers livré, mieux vaut un texte `noPredator` (comme `faucon_pelerin`) ou une vraie relation. Les relations alternatives n'ont pas été vérifiées par moi, donc je propose le texte seulement pour les deux rapaces (affirmation prudente, cohérente avec les fiches `aigle_royal` et `grand_duc`).
- Texte à coller :
  - `faucon_hobereau.noPredator` : `"Adulte, il a très peu de prédateurs : c'est un chasseur rapide, au sommet de sa chaîne."`
  - `epervier.noPredator` : `"Adulte, il a très peu de prédateurs : il est lui-même un chasseur d'oiseaux."`
  - `guepier` : ne pas écrire de texte sans source. Soit ajouter un lien sourcé (`faucon_hobereau → guepier` n'est pas dans le jeu de données et je ne l'ai pas vérifié), soit laisser l'avertissement du vérificateur, comme le récif.

**R2. Vautour fauve et gypaète : 1 seul lien chacun — mineur**
- Ils ne mangent que `charognes`. Sur leurs fiches, la colonne « Que mange-t-il ? » montre un seul bouton.
- Le groupe charognes forme une mini-grappe de 6 nœuds (4 charognards + la ressource, plus buse et aigle). On y entre depuis la fiche « charognes ».
- Le chemin de navigation reste viable : `vautour > charognes > aigle > marmotte > herbes`.
- Idée : `charognes` n'a aucun lien vers un animal du réseau (rien ne « meurt » vers elle). C'est cohérent avec la ressource, mais les enfants ne verront pas « de quoi » viennent les charognes. Voir M1.

**R3. Maillons manquants que les enfants chercheront — important**
- **Vers de terre** : le texte du merle dit « des fruits, des vers et des insectes » et la protection dit « vers de terre et insectes ». Le réseau du merle montre `fruits`, `chenille`, `criquet` : pas de vers. Texte et réseau ne disent pas la même chose.
- **Mouches** : la fiche hirondelle dit « moustiques, des mouches », mais il n'y a pas de diptère autre que le moustique. Les enfants penseront à la mouche en premier.
- **Lapin / lièvre** : le seul grand mammifère proie est la marmotte (alpine). L'aigle royal n'a que 2 liens (marmotte, charognes) et le grand-duc ne mange ni lapin ni hérisson, deux proies emblématiques. Sources citées dans le jeu de données : le PDF du Parc national des Pyrénées et le PDF du Parc du Luberon. Elles peuvent probablement les étayer, mais je n'ai pas ouvert ces PDF.
- **Corbeaux / pies** : aucun corvidé. C'est le premier oiseau cité par un enfant pour « l'oiseau de mon jardin ».
- Recherche quasi vide pour : `mouche`, `corbeau`, `lièvre`, `ver de terre`, `héron`, `guêpe`, `pinson`.
- Ce n'est pas bloquant ; à prioriser dans l'ordre vers de terre > mouches > lièvre/lapin si l'objectif est la parité de qualité.

**R4. Déséquilibre par groupe — mineur**
- 10 rapaces sur 29 animaux (34 % : 10 sur 29). 3 mammifères seulement (campagnol, marmotte, pipistrelle), non filtrables (pas de puce « Mammifères »).
- Dans `qDiet`, 10 animaux sur 17 sont carnivores (59 % : 10 sur 17). La bonne réponse « Carnivore » tombe donc plus d'une fois sur deux : un enfant peut deviner sans réfléchir. Les herbivores sont 4, les omnivores 3.
- Piste : élargir le pool de `qDiet` en autorisant `Insectivore` (ajouter un 4e choix de réponse) ou en retirant 3 rapaces du pool.

**R5. Question de région unique et répétée — mineur**
- `quiz.region` est en mode `presence` : un seul libellé de question (« Lequel de ces animaux passe l'hiver en Afrique ? »). `dedupe` écarte la 2e occurrence ; le quiz « Régimes et régions » complète donc avec une 4e question de régime.
- Même limite que le récif. C'est surtout une question de migration, pas de région : le titre du quiz promet un peu plus.
- Pas de correctif de code ; juste un point à connaître.

**R6. Questions « Drôles de bêtes » trop faciles — mineur**
- Q martinet (« Il vole dans le ciel » face à « Il marche sur le sol » / « Il nage sur les lacs »), Q hirondelle (« En plein vol » face à « Posée sur le sol » / « En plongeant sous l'eau »), Q cigogne (« Elles partent vers l'Afrique » face à « Elles hibernent » / « Elles montent vers le pôle Nord »).
- Pour des 8-16 ans, les deux mauvaises réponses sont absurdes. Proposition pour le martinet :
  - Question : `"Que ne fait presque jamais le martinet noir ?"`
  - Bonne réponse : `"Se poser sur le sol"` ; mauvaises : `"Chasser en vol"`, `"Dormir dans un nid"`.
  - Explication : `"Ses pattes sont minuscules : il se pose presque seulement au nid. Il mange, boit, et dort même en vol."` (la partie « dort en vol » n'a pas été vérifiée par moi ; la retirer si la source n'en parle pas.)

---

## 2. Cohérence avec le modèle des autres univers et régressions

Ce qui est bon : le registre, le chargement à la demande, le hash `#airs/...` (y compris `#airs` seul, qui retombe sur l'hirondelle), la couleur de barre (`#1d3557` appliquée via `meta.couleurBarre`), le thème CSS `html[data-univers="airs"]`, le titre de l'onglet. Le test de parcours visite bien les 34 fiches.

### B1. Accords au pluriel cassés — BLOQUANT

`app.js` suppose que tous les animaux sont au singulier. `airs` est le premier univers qui a des animaux pluriels : `criquet`, `chenille`, `papillon_nuit` (`pluriel: true`). Dans savane et récif, seules des ressources sont plurielles ; ce cas n'a donc jamais été exercé. Défauts observés dans le navigateur :

| Où | Texte affiché | Texte attendu |
|---|---|---|
| Fiche criquet / chenille / papillon de nuit, titre prédateurs | « Qui le mange ? » | « Qui les mange ? » |
| Idem, titre nourriture | « Que mange-t-il ? » | « Que mangent-ils ? » |
| Idem, résumé de carte | « On le trouve surtout… » | « On les trouve surtout… » |
| Idem, légende de carte | « Les régions où il vit » | « Les régions où ils vivent » |
| Quiz `qWhatEats` | « Que mange les criquets et sauterelles ? » | « Que mangent… » |
| Quiz `qWhatEats` (réponse) | « Les chenilles est herbivore : il mange… » | « Les chenilles sont herbivores : elles mangent… » |
| Quiz `qDiet` | « Les criquets et sauterelles est plutôt… » | « Les criquets et sauterelles sont plutôt… » |

Ampleur : 2 herbivores sur 4 (50 %) du pool de `qWhatEats` sont pluriels, donc une question « Que mange… » sur deux contient la faute. Dans `qDiet`, 2 animaux sur 17 (12 %).

Correctif proposé dans `app.js`, dans la zone « Grammaire » :

```js
const pronoun = (x) => (isPlural(x) ? (isFem(x) ? 'elles' : 'ils') : (isFem(x) ? 'elle' : 'il'));
const isAre = (x) => (isPlural(x) ? 'sont' : 'est');
const doesEat = (x) => (isPlural(x) ? 'mangent' : 'mange');
```

(Pour le pluriel féminin, ajouter `genre: 'f'` à `chenille` ; `criquet` reste masculin.) Puis :

- `renderNetwork` :
  ```js
  $('predTitle').innerHTML = `<span aria-hidden="true">⬆️</span> ${isResource ? 'Qui en mange ?' : `Qui ${isPlural(x) ? 'les' : (isFem(x) ? 'la' : 'le')} mange ?`}`;
  $('preyTitle').innerHTML = `<span aria-hidden="true">⬇️</span> ${isResource ? 'D’où vient son énergie ?' : `Que ${isPlural(x) ? 'mangent-' : 'mange-t-'}${pronoun(x)} ?`}`;
  ```
  Attention : pour le pluriel, « Que mangent-ils ? » s'écrit sans « t » ; pour le singulier `mange-t-il`.
- `renderRange` : `isFem(x) ? 'On la trouve' : 'On le trouve'` devient `isPlural(x) ? 'On les trouve' : (isFem(x) ? 'On la trouve' : 'On le trouve')`. Idem pour `mapCaption` et `mapLegend` : `vit` devient `${isPlural(x) ? 'vivent' : 'vit'}`.
- `qWhatEats` : question `Que ${isPlural(herb) ? 'mangent' : 'mange'} ${withArticle(herb)} ?` ; explication `${capitalize(withArticle(herb))} ${isPlural(herb) ? 'sont herbivores' : 'est herbivore'} : ${pronoun(herb)} ${doesEat(herb)} ${Q.motsHerbivore || 'des plantes'}, comme ${withArticle(food)}.`.
- `qDiet` : question `${capitalize(withArticle(x))} ${isAre(x)} plutôt…` ; explication `${capitalize(withArticle(x))} ${isPlural(x) ? 'sont' : 'est'} ${k}${isPlural(x) ? 's' : ''} : ${pronoun(x)} ${doesEat(x)} ${words[k]}.`.
- `qPredatorFood` : `peut-${pronoun(hunter)}` ne pose pas de problème tant que les chasseurs sont singuliers (tous les carnivores d'airs le sont).
- Ajouter au test de parcours un contrôle de grammaire basique : `/mange les |est herbivore.*\bil\b/` appliqué aux textes d'un animal `pluriel`, ou plus simplement ajouter une assertion sur `#predTitle` pour les animaux pluriels.

Alternative sans toucher au code : renommer `criquet` en « Criquet (sauterelle) » et `chenille` en « Chenille » (singulier, `pluriel` supprimé). Perd l'idée d'une population mais supprime le défaut en 2 lignes. `papillon_nuit` (« Papillons de nuit ») reste pluriel. Les titres de la fiche devraient donc quand même être traités : je recommande le correctif de code.

### B2. Phrase de la chaîne d'accueil fausse — BLOQUANT

`meta.chaineHeroTexte` :
> « …les fleurs nourrissent l'abeille, que l'hirondelle attrape en vol, et que le faucon pèlerin chasse à son tour. »

Le deuxième « que » reprend « l'abeille » : la phrase dit que le faucon pèlerin chasse l'abeille. C'est la phrase d'accroche du site. Remplacer par :

`"Les flèches montrent le chemin de l'énergie : les fleurs nourrissent l'abeille, l'hirondelle attrape l'abeille en vol, et le faucon pèlerin chasse l'hirondelle à son tour."`

La phrase équivalente dans `comprendre.chaineTexte` est correcte (« l'hirondelle attrape l'abeille en vol et le faucon pèlerin chasse l'hirondelle »).

### I1. « Tu explores maintenant : le ciel d'europe. » — mineur (visible à chaque bascule)

`app.js`, `openUniverse` : `U.meta.nom.toLowerCase()` met « Europe » en minuscule. Savane et récif n'ont pas de nom propre dans leur nom, donc le défaut n'est jamais apparu.
- Remplacement : `` `Tu explores maintenant : ${lowerFirst(U.meta.nom)}.` `` (`lowerFirst` existe déjà dans `app.js`). Donne « le ciel d'Europe », « la savane africaine », « le récif corallien ».

### I2. « En savoir plus (en anglais) » codé en dur — important

`renderHumanLayer` ajoute toujours « (en anglais) ». Dans airs, 4 sources sur 5 sont en français (Grand Est, Parc du Vercors, LPO ×2) ; seule la page de la Commission européenne est en anglais. Les enfants voient une mention fausse sur 4 fiches sur 5.
- Correctif : champ optionnel `langue` dans `humanInteractions` et dans `app.js` :
  ```js
  `<a href="…">En savoir plus${h.langue === 'fr' ? '' : ' (en anglais)'} ↗</a>`
  ```
  Dans `airs/donnees.js`, ajouter `"langue": "fr"` aux entrées `faucon_pelerin`, `gypaete`, `hirondelle`, `vautour_fauve`. Savane et récif gardent le comportement actuel sans modification.

### I3. Recherche : pluriels et variantes — important (transverse, pas propre à airs)

La recherche ne marche pas avec le pluriel ni avec « chauve souris » sans trait d'union. Testé sur airs : « hirondelles », « faucons », « vautours », « abeilles », « moustiques », « cigognes », « marmottes », « libellules » donnent « Rien trouvé ». Les enfants tapent naturellement le pluriel.
- Correctif dans `renderLibrary` (partagé par tous les univers) :
  ```js
  const term = normalized($('speciesSearch').value.trim()).replace(/[-’']/g, ' ').replace(/(\w{4,})[sx]\b/g, '$1');
  ... normalized(`${x.name} ${x.scientific} ${x.group} ${x.keywords || ''}`).replace(/[-’']/g, ' ')
  ```
  (Non testé : valider avec les trois univers, ex. « lions », « gnous ».)
- Ajouter dans `keywords` : `pipistrelle` : `chauve souris` ; `moustique` : `moustiques` ; `chenille` : `papillon`.
- Bruit : « rat » trouve 7 animaux, car la recherche est une sous-chaîne (« imperator »). Savane a le même défaut ; à surveiller.

### I4. Métadonnées statiques d'`index.html` — important

Les balises de l'en-tête ne sont pas modifiées par `applyUniverse`. Elles servent aux moteurs de recherche et aux aperçus de partage :
- `<meta name="description" content="Choisis un animal de la savane ou du récif corallien et découvre…">` devient `"Choisis un animal de la savane, du récif corallien ou du ciel d'Europe et découvre qui le mange, ce qu'il mange et où il vit. Un site éducatif gratuit pour les 8-16 ans."`
- `<meta property="og:description" content="Choisis un animal et découvre ses liens avec les autres êtres vivants, de la savane africaine au récif corallien.">` devient `"…de la savane africaine au récif corallien, en passant par le ciel d'Europe."`
- `assets/apercu-partage.png` (image de partage) montre « Savane africaine / Qui mange qui dans la savane ? ». C'était déjà le cas pour le récif. Avec 3 univers, une image neutre serait mieux ; non bloquant.
- Le `theme-color` statique reste `#183e34` (savane) tant que le JS ne l'a pas changé. Le JS le met bien à jour (`#1d3557` vérifié en bascule). OK.
- Le favicon (`assets/favicon.png`) est le logo du site : OK pour les 3 univers.

### I5. Sources : noms de fournisseurs manquants dans `SOURCE_NOMS` — mineur

`sourceLabel` retombe sur le nom de domaine brut pour 2 sources d'airs :
- `tourduvalat.org` (source de `faucon_crecerelle`) : afficherait « tourduvalat.org ». Ajouter `'tourduvalat.org': 'Tour du Valat'`.
- `reserves-naturelles.strasbourg.eu` (source de `libellule`) : ajouter `'reserves-naturelles.strasbourg.eu': 'Réserves naturelles de Strasbourg'`.
- Autres domaines couverts : vérifié programmatiquement (les sous-domaines `occitanie.lpo.fr`, `paca.lpo.fr`, `grand-est.developpement-durable.gouv.fr` passent par `endsWith`).

### I6. Étiquettes de sources redondantes sur la fiche de l'hirondelle — mineur

Fiche hirondelle : « INPN (MNHN) (1) · LPO · Cornell Lab · Animal Diversity Web · Article scientifique · INPN (MNHN) (2) · Oiseaux.net · INPN (MNHN) (3) », soit 8 liens. Fonctionnel, mais dense sur mobile. C'est le comportement existant. À regrouper plus tard (une seule entrée par domaine).

### I7. Vérificateur : ce qu'il ne détecte pas — mineur
Ajouter à `tools/verifier-univers.js` :
- Chaque clé `silhouettes.js` correspond à une espèce (j'ai vérifié à la main : 23 sur 23 OK).
- `humanInteractions[].species` est un identifiant connu.
- Chaque hôte de `links[].source` figure dans `SOURCE_NOMS` (aurait détecté I5).
- `comprendre.chaine` : chaque maillon mange le suivant (le vérificateur ne contrôle que `chaineHero`).
- Les espèces `pluriel` qui sont des animaux : signaler qu'`app.js` doit les gérer.

### Rien codé en dur qui casse pour airs (vérifié)
- Textes « savane » : aucun dans `app.js`. Les seules occurrences sont dans les données de chaque univers, et dans les métadonnées statiques d'`index.html` (I4).
- Libellés de régions : tous viennent de `meta.regions` ; le test n'a trouvé aucun `undefined`.
- Quiz régions en mode `presence` : fonctionne (même mode que le récif). Le calcul `R[Z.region].dans` donne « en Afrique pendant l'hiver ». Les feedbacks sont corrects : « Le grand-duc et la marmotte des Alpes ne quittent pas l'Europe en hiver. »
- Filtres : `regimeContient: ["insectivore"]` fonctionne. Remarque : le filtre « Mangeurs d'insectes » ne contient ni la libellule (« Carnivore »), ni le merle (« Omnivore »), ni la cigogne. C'est logique d'après leurs régimes, mais un enfant peut s'en étonner pour la libellule, qui ne mange que des insectes. Piste : `diet: "Carnivore et insectivore"` pour `libellule`, comme pour le hobereau (le filtre cherche le mot « insectivore » dans le régime).
- Hash : `#airs`, `#airs/hirondelle`, `#airs/inconnu` (retombe sur l'animal par défaut), ancien format `#zebre` (savane) : OK.
- Thème : couleurs de texte vérifiées. Texte principal sur surface 14,2:1 ; texte atténué sur fond 6,25:1 ; accent sur surface 5,22:1 ; lien vert sur fond 4,93:1. Tous au-dessus de 4,5:1.

---

## 3. Accessibilité de la carte (`univers/airs/cartes.html`, `tools/generer-cartes.py`)

### Ce qui est conforme au modèle savane/récif
- Les deux SVG ont `role="img"` et `aria-labelledby`.
- La carte de zoom a un `<title>` (« Carte de l'Europe et de l'Afrique ») et un `<desc id="zoomDesc">` mis à jour par `renderRange` (« Régions coloriées : … »). Structure identique à savane et récif.
- Une légende textuelle (`#mapLegend`) et un résumé écrit (`#rangeSummary`) doublent la couleur. Un lecteur d'écran et un daltonien n'ont donc pas besoin de la carte.
- Pas de `style=` ni de `<script>` dans le fichier (contrôlé par le vérificateur ; CSP respectée).
- Les 6 `data-region` sont présentes ; `alpes` a 2 tracés (Alpes et Pyrénées).

### Étiquettes qui se chevauchent
Mesurées dans le navigateur (`getBBox`, mobile et bureau) :
- **Aucun chevauchement entre étiquettes.** Seule exception : « N » de la boussole, sans importance (c'est un faux positif dû au groupe `transform`).
- **« Europe » sort de la carte du monde** : boîte du texte de y = -2,7 à 11 dans un `viewBox` de 147 de haut. Le haut des lettres colle au bord et le contour blanc est rogné.
  - Correctif dans `tools/generer-cartes.py` : placer le texte à `wproj(16, 78)[1] + 4` (soit en dessous du bord supérieur) ou le mettre à côté de la boîte de zoom.
- **« Océan Atlantique » est écrit par-dessus les îles britanniques** (capture mobile : le mot « Atlantique » traverse la Grande-Bretagne). C'est lisible (texte foncé sur beige, 5,42:1) mais peu propre.
  - Correctif : `lab(eproj, 'ocean-label', 'Océan Atlantique', -14.5, 51, …)` ne réglerait pas, car l'Irlande est à -10° ; mettre plutôt `-14.5, 44` (golfe de Gascogne), à gauche de la péninsule ibérique. Non testé : valider visuellement.
- **« Méditerranée » (étiquette de région) et « Mer Méditerranée » (étiquette d'océan)** sont deux textes proches (distance d'environ 40 px) au même mot. Un enfant peut les prendre pour deux choses. Renommer l'étiquette de région en « Sud » ou « Pourtour méd. », ou retirer « Mer Méditerranée ».
- **« Alpes »** est en 10 px (limite basse) : texte lisible mais petit ; `.region-label.small` est partagé avec le récif.

### Couleurs
- Le fond actif (orange `#f0954a`) face au fond terre (`#ebe5d2`) fait 1,83:1, et face à la mer 1,81:1. En dessous de 3:1 (critère WCAG 1.4.11 pour les éléments graphiques). C'est le même orange et la même terre que la savane ; défaut hérité, pas propre à airs.
  - Ce défaut est atténué par les étiquettes en gras (6,1:1) et par la légende et le résumé en texte.
  - Piste : un orange plus foncé pour airs seulement, par exemple `#d9731f` (vérifier le ratio), ou un contour (`stroke`) foncé sur `.range-region.is-active`.
- Avec l'hirondelle, pratiquement toute l'Europe est orange : la carte n'apprend alors presque rien. Normal pour une espèce répandue, mais la granularité en 6 régions est faible : 20 espèces d'airs sur 29 touchent 4 régions ou plus (comptage à faire par script si besoin ; je n'ai pas chiffré).

### I8. « Afrique (hiver) » est trompeuse — important

- Le tracé n'inclut que 29 pays du Sahel et d'Afrique centrale (`AFR`), coupés au nord à 17,5° N, et la carte s'arrête à 2° S (`BY1 = -2`). Résultat : une bande orange horizontale au bord bas de la carte, avec un bord droit qui coupe l'Afrique.
- Or l'hirondelle rustique d'Europe de l'Ouest passe l'hiver surtout en Afrique australe (Zambie, Angola, Afrique du Sud, d'après ce que je sais, non vérifié par une source ici). Le hobereau et le martinet noir vont aussi en Afrique centrale et australe. La carte montre donc une zone qui n'est pas leur vraie zone d'hivernage.
- Correctif : étendre la carte jusqu'à environ 35° S ou, plus simple, changer le libellé et l'avertissement :
  - `regions.afrique.nom` : `"Afrique (où ils passent l'hiver, sans plus de précision)"`.
  - `meta.carte.avertissement` : ajouter `" L'Afrique n'est montrée qu'en partie : ces oiseaux hivernent dans de nombreuses régions au sud du Sahara."`
  - Si la carte est étendue, prévoir des pays pour `AFR` (ZMB, AGO, ZWE, BWA, NAM, ZAF, TZA, MOZ, MWI) et recalculer `BY1`.

### Régions d'espèces incomplètes — important (contenu, vu via la carte)
Les `regions` de certaines espèces sont trop étroites :
- `aigle_royal` : `alpes, mediterranee` seulement. Il vit aussi en Écosse, en Scandinavie et dans les Carpates (`nord`, `est`, `atlantique`). Je n'ai pas de source dans le dépôt qui contredise ; mais le résumé affiché, « surtout… dans les montagnes et autour de la Méditerranée », est en dessous de la réalité.
- `buse` : pas de `alpes` alors que c'est un rapace très commun en moyenne montagne.
- `faucon_pelerin` : `atlantique, mediterranee, alpes`, sans `nord` ni `est`.
- `campagnol` : pas de `mediterranee`.
Le mot « surtout » sauve le texte affiché, mais les enfants qui comparent avec la réalité verront des trous. À faire relire par un naturaliste, comme le dit déjà la page des coulisses.

---

## 4. Risques de contenu

### Vérifications faites
- **Étymologie du tiercelet** : confirmée par le Dictionnaire de l'Académie française (9e éd.) : « Nom donné au faucon et à l'épervier mâles, parce qu'ils sont d'environ un tiers plus petits que les femelles ». La question de quiz et la fiche sont donc justes.
- **Gypaète dans le Vercors** : page du Parc du Vercors consultée. Elle confirme : disparu de l'arc alpin à la fin du XIXe siècle, lâchers depuis 2010, premier poussin né dans le massif en 2022, « au moins 140 ans » plus tôt. Texte fidèle à la source.
- **Hirondelle → abeille** : la page Cornell « Barn Swallow / food » indique que les mouches forment l'essentiel du régime, avec aussi des abeilles, guêpes, fourmis, papillons de nuit. Les abeilles sont citées au sens général, pas l'abeille domestique. Voir C3.
- **Néonicotinoïdes** : le texte (interdiction en plein air en 2018, serres fermées permanentes) est cohérent avec ce que je sais ; je n'ai pas rechargé la page de la Commission.

### Non vérifié (à dire clairement)
- Les 79 liens ne sont pas tous vérifiés un par un : je n'ai pas ouvert les PDF INPN, OFB, LPO, Avocetta, Brighton, Parc du Luberon, Parc national des Pyrénées. Seuls 3 liens/affirmations ont été contrôlés (ci-dessus).
- Les licences PhyloPic n'ont pas pu être revérifiées en ligne (le réseau bloque `api.phylopic.org` et `phylopic.org`). Je m'appuie sur `prov.json`.

### C1. Relations marginales présentées comme normales — important
La règle du site est « chaque relation a une source ». Mais certaines relations sont réelles et rares ; un enfant lira qu'elles sont habituelles. Les marquées `rare` sont bien repérées (6). À examiner pour un éventuel `rare: true` :
- `chouette_effraie → moineau` et `chouette_effraie → etourneau` : l'effraie mange surtout des petits mammifères. Les oiseaux sont secondaires (je ne cite pas de pourcentage faute de source ouverte). Ces deux relations alimentent des questions de quiz « peut manger… » (filtre `common`) : questions justes mais pas représentatives.
- `faucon_pelerin → chardonneret` : plausible, mais proie anecdotique face aux pigeons et étourneaux. Candidat `rare`.
- `grand_duc → chouette_effraie`, `→ buse`, `→ faucon_crecerelle` : marqués `rare` pour buse et crécerelle, pas pour l'effraie. Cohérent avec « et même d'autres rapaces » dans la fiche ; l'effraie devrait être `rare` aussi.
- `cigogne → chenille`, `→ criquet` : OK. Mais le régime « Carnivore » masque que la cigogne mange surtout des insectes et des vers dans beaucoup de régions (non vérifié). Régime à nuancer : `"Carnivore (mange des campagnols et des insectes)"`.

### C2. Sources américaines pour une faune européenne — mineur
- `moustique` : source Ohio State (`ohioline.osu.edu`), pour *Culex pipiens* (cosmopolite).
- `papillon_nuit` : Missouri Department of Conservation.
- `chenille` : Université du Minnesota.
- `moineau → chenille` : Game & Wildlife Conservation Trust (Royaume-Uni, plausible).
La biologie générale est transférable mais pas « européenne ». Les enfants et les enseignants le verront dans la liste « Pour aller plus loin ». À remplacer par INPN ou OFB quand possible.

### C3. `abeille` dans la chaîne d'accueil — mineur
La chaîne d'accueil place l'abeille domestique comme proie de l'hirondelle. La source dit « bees » (abeilles en général), alors que le régime dominant est les mouches. Choix pédagogique acceptable (l'abeille est plus parlante que la mouche), mais un naturaliste pourrait objecter. À mentionner dans le coulisses (relecture).

### C4. Rubrique « Le savais-tu ? » faible ou redondante — important (engagement)
Plusieurs entrées répètent le rôle, le nom, ou la description au lieu d'apporter une surprise. Comparaison avec le niveau savane/récif :
- `chouette_effraie.fun` (« Quand il y a beaucoup de campagnols, il y a plus d'effraies… ») répète `role` presque mot pour mot. Idem `campagnol.fun`.
- `chardonneret.fun` (« Son nom vient du chardon… ») répète la question de quiz et le champ `role` (« comme celles des chardons »).
- `criquet.fun` répète `description`. `fruits.fun` répète `role`.
- `chenille.fun` (« Une chenille mange énormément avant de devenir un papillon ») est vague.
- `libellule.fun` : cycle de vie sans surprise.
Remplacements à vérifier avant de coller (je les cite de mémoire, donc sources à obtenir) :
- Chouette effraie : sa face en cœur aide à localiser les sons.
- Martinet : il dort en vol (à confirmer).
- Chardonneret : écrire un fait sur le chant ou le bec plutôt que le nom.

### C5. Phrases de protection : OK, avec une réserve
- Tous les conseils de protection sont actionnables (nichoir, haies, pas de pesticides, garde de distance). Aucun ton moralisateur.
- `epervier.fun` : « …ce qui les empêche de chasser les mêmes proies » est une hypothèse écrite comme un fait. Suggestion : « ce qui leur permet souvent de chasser des proies de tailles différentes ».
- `humanInteractions` faucon pèlerin : titre « Le DDT chasse le faucon pèlerin » se lit comme « le DDT chasse (poursuit) » ; remplacer par « Le DDT met le faucon pèlerin en danger ».

### C6. Papillons de nuit : généralisation — mineur
`papillon_nuit` est nommé « Papillons de nuit (noctuelles) », scientifique `Noctuidae`. La silhouette est `Luperina testacea` (une noctuelle) : c'est annoncé dans les crédits. Cohérent, mais le nom « papillons de nuit » couvre bien plus que les noctuelles. À garder en note dans la fiche si un naturaliste relit.

### Silhouettes et licences

Contrôles faits par script, avec `/home/claude/airs/prov.json` :
- `univers/airs/silhouettes.js` contient **23 clés**, toutes présentes dans `prov.json` (23). Aucune clé en trop ni manquante.
- Les 23 sont des identifiants d'espèces existants dans `donnees.js`.
- Les 23 tracés passent la regex de sécurité d'`app.js` (`/^[\d. ]+$/` pour le `viewBox`, `/^[MZ\d. \-]+$/` pour le tracé) : aucun script ni lien possible.
- **`docs/credits-silhouettes.md` liste déjà 23 lignes pour « Les airs »** (modification non commitée). Chacune correspond à `prov.json` : nom scientifique, auteur, licence et UUID, sans aucune divergence.
- Répartition des licences : 21 CC0 (91 % : 21 sur 23) et 2 Public Domain Mark (9 % : 2 sur 23), à savoir `grand_duc` (T. Michael Keesey) et `etourneau` (Oier).
- Le crédit du campagnol précise que l'animal dessiné est *Microtus pennsylvanicus* (Amérique du Nord), cousin du même genre que *Microtus arvalis*. C'est honnête.
- Ce qui reste à faire dans ce fichier :
  - L'introduction dit « Les silhouettes ne servent que pour les espèces dont l'émoji est faux, ou identique à celui d'autres espèces ». Pour airs, 23 silhouettes sur 34 êtres vivants (68 % : 23 sur 34) ; justifié pour les 10 rapaces (🦅 répété) et les oiseaux (🐦 répété). Pour `pigeon_ramier` (🕊️ = colombe blanche) et `libellule` (🪰 = mouche), l'émoji était faux : c'est justifié aussi. Aucun changement obligatoire, mais mettre l'intro au pluriel : « …et les oiseaux, sinon représentés par un même émoji ».
  - Vérifier que la mention PDM figure bien dans la légende : OK d'après le fichier.
- La page « Sources » de l'interface liste « PhyloPic — silhouettes d'animaux (domaine public) ». Exact pour CC0 et PDM.
- Émojis de repli : `libellule` a l'émoji 🪰 (mouche). Si la silhouette ne charge pas, l'enfant voit une mouche. Idem `merle` (🐦‍⬛, non supporté sur les systèmes plus anciens). Mineur ; la silhouette charge avec la page.

---

## 5. Ce qui manque pour atteindre la parité

| Élément | État | Action |
|---|---|---|
| `README.md` | Dit « Deux univers », décrit savane et récif seulement ; « Prochaines étapes : ajouter un troisième univers : les airs » ; « 36 espèces silhouettes » | Réécrire « Trois univers », ajouter « **Ciel d'Europe** : 29 animaux, 5 ressources, 79 liens alimentaires, chacun avec sa source » ; retirer la prochaine étape ; 36 + 23 silhouettes |
| `CHANGELOG.md` | Aucune entrée pour airs | Ajouter une entrée (voir ci-dessous) |
| `package.json` | `4.0.0` | Décider : version `4.1.0` (nouvel univers) ; sinon `meta.version` d'airs à `4.0.0`, comme les autres (actuellement `1.0.0`, incohérent) |
| `coulisses.html` | Chiffres à jour (288 / 125 / 3, contrôlés par le vérificateur). Mais : « de l'herbe au requin » ; `cl-asof` « version 4.0.0, 18 novembre 2026 » ; ligne 116 : « Le lancement de l'univers « les airs » dépendra de H1 à H4 » | Voir C-gouvernance ci-dessous |
| `index.html` | `<meta description>` et `og:description` citent encore « la savane ou du récif » (I4) | Corriger |
| `app.js` `SOURCE_NOMS` | 2 hôtes manquants (I5) | Ajouter |
| `docs/ajouter-un-univers.md` | Checklist non cochée ; exemple « les airs » | Cocher ; ajouter : « gérer les animaux au pluriel (`pluriel`), le nom propre dans `nom` (`lowerFirst`), la langue des sources humaines (`langue`) » |
| `docs/credits-silhouettes.md` | Complet (23 lignes) | RAS ; ajuster l'intro |
| Audit externe | `docs/audit-*.md` : aucun pour airs | Optionnel : copier ce rapport dans `docs/` sous la forme `audit-airs-2026-11-19.md` |
| Relecture naturaliste | Pas faite (le site le dit déjà) | À planifier avant mise en avant. Compte tenu des C1, des régions (§3) et de R3, c'est la condition de la « parité » avec savane/récif, qui ont été audités |
| Test enfants | « À venir » | Voir ci-dessous |
| `culture` (bulles 🎬 « Ici, découvre le vrai animal ! ») | 0 sur airs ; 5 en savane, 5 en récif | Optionnel : des références comme « Hedwige » ou « Maya l'abeille » sont possibles, mais mentionner une marque protégée n'est pas nécessaire. Ne pas bloquer |
| Textes « le savais-tu » | Voir C4 | À renforcer |
| `meta.validation` | Présent (`scope`, `note`, `rangeMapping`) | RAS |

### C-gouvernance : la page coulisses se contredit — important
`coulisses.html` ligne 116 dit : « Le lancement de l'univers « les airs » dépendra de H1 à H4, pas de l'apparence » (hypothèses du test avec des enfants, « À venir »). Or le code d'airs est dans la branche et l'univers apparaît dans la bascule. Deux options cohérentes :
1. **Ne pas exposer airs tant que le test n'a pas eu lieu** : retirer la ligne de `registre.js` (ou la masquer derrière `?univers=airs`), et fusionner le reste.
2. **Exposer airs et corriger la phrase** : `"L'univers « les airs » est en ligne en version bêta ; le test avec des enfants (H1 à H4) décidera de la suite."` Et ajouter dans `cl-asof` : `"Pas encore fait : test avec des enfants, relecture par un naturaliste (en particulier pour l'univers « les airs »)."`

Entrée de CHANGELOG proposée (sous « Non publié ») :
```
- Troisième univers : « le ciel d'Europe » (29 animaux, 5 ressources, 79 liens alimentaires, chacun avec sa source, 15 questions « Drôles de bêtes », carte de l'Europe et de l'Afrique d'hivernage, 5 exemples d'interactions humaines). 23 silhouettes PhyloPic (21 CC0, 2 domaine public) ; crédits dans `docs/credits-silhouettes.md`.
- Application : accords au pluriel pour les animaux (« Que mangent-ils ? »), nom d'univers avec majuscule conservée, langue des liens « En savoir plus », recherche tolérante aux pluriels.
- Coulisses : 288 relations, 125 êtres vivants, 3 univers.
```

---

## 6. Liste des correctifs, par priorité

**Bloquants**
- B1 : accords au pluriel (`app.js`, §2).
- B2 : phrase `chaineHeroTexte` (`airs/donnees.js`, §2).

**Importants**
- I2 : « (en anglais) » (`app.js` + `airs/donnees.js`).
- I3 : recherche au pluriel (`app.js`).
- I4 : `<meta>` d'`index.html`.
- I8 : zone Afrique trompeuse (`generer-cartes.py` + avertissement).
- Régions d'espèces incomplètes (aigle royal, buse, faucon pèlerin, campagnol).
- R1 : `noPredator` pour hobereau et épervier.
- R3 : vers de terre, mouches (au moins pour que le texte du merle et de l'hirondelle ait un équivalent dans le réseau).
- C1 : relations marginales (`rare: true` pour effraie → grand-duc, pèlerin → chardonneret).
- C4 : « le savais-tu » redondants.
- Gouvernance des coulisses ; README ; CHANGELOG.

**Mineurs**
- I1 (casse d'« Europe »), I5, I6, I7, R2, R4, R5, R6, C2, C3, C5, C6, étiquettes de la carte (Atlantique, « Europe » rognée, Méditerranée en double), contraste orange, `libellule` émoji 🪰.

---

## 7. Verdict

**L'univers n'est pas encore au niveau de savane et récif, mais il en est proche.** Le contenu a la bonne forme : 34 êtres vivants, 79 liens tous sourcés, chaînes de 3 à 5 maillons, animal par défaut bien choisi, crédits de silhouettes complets et exacts (23 sur 23). La structure technique (registre, hash, thème, quiz en mode `presence`, test de parcours vert) est saine.

Ce qui l'empêche aujourd'hui d'être au niveau de l'étalon :
1. Deux défauts visibles par un enfant dès les premières minutes : la grammaire au pluriel (B1) et la phrase de la chaîne d'accueil (B2). Les deux se corrigent en moins d'une heure.
2. Une carte dont la zone d'hiver est trompeuse (I8) et des aires d'espèces trop étroites.
3. Des maillons que le texte annonce mais que le réseau n'a pas (vers, mouches).
4. Pas de relecture naturaliste, alors que savane et récif ont été audités, et une page coulisses qui dit que le lancement dépend d'un test enfants non fait.

Si B1 et B2 sont corrigés, l'univers peut être exposé comme **bêta** (option 2 de la gouvernance). Pour le déclarer « au niveau » de savane et récif, il faut en plus : I2, I3, I4, I8, les régions, R1, R3, C1, C4, et la relecture par un naturaliste.

### Ce que je n'ai pas pu vérifier
- Licences et auteurs PhyloPic en ligne (accès réseau refusé) : seule la cohérence avec `prov.json` est contrôlée.
- Contenu des PDF de sources (INPN, OFB, LPO, Avocetta, Brighton, Luberon, Pyrénées) : non ouverts. 3 affirmations vérifiées sur 79 liens et 5 interactions humaines.
- Aires d'hivernage réelles (Afrique australe) et aires de répartition précises : je m'appuie sur ma connaissance générale, pas sur une source ouverte ici.
- Rendu sur un vrai appareil (iPhone SE, Android) ; j'ai seulement émulé un iPhone 13 et un écran de bureau 1280 px.
- Les correctifs de code proposés ne sont pas testés (aucun fichier modifié) ; en particulier la regex de recherche (I3) et la position des étiquettes de carte.
- Aucun test avec des enfants de 8 à 16 ans.
