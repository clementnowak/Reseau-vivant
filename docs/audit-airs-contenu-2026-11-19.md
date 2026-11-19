# Audit de contenu rédactionnel : univers « les airs » (ciel d’Europe)

Périmètre : `univers/airs/donnees.js` (34 entrées : 29 animaux, 5 ressources, 79 liens, 15 curiosités, 5 humanInteractions, textes de meta), comparé à `univers/savane/donnees.js` et `univers/recif/donnees.js`, en lisant aussi `app.js` pour savoir comment chaque champ devient une phrase à l’écran.
Aucun fichier du dépôt n’a été modifié. Les corrections sont données en texte prêt à coller (apostrophes typographiques ’ incluses).

Méthode : j’ai chargé les trois fichiers de données avec Node, porté en Python la logique de `withArticle`, `pronoun`, `tooBig` et des 5 générateurs de quiz de `app.js`, puis relu chaque champ. Les faits douteux ont été confrontés aux sources citées dans les données (WebFetch). Les corrections de contenu proposées plus bas ne reposent que sur des phrases retrouvées dans ces sources, indiquées entre crochets.

Gravités : **bloquant** (faux, ou casse une phrase affichée à l’écran), **important** (à corriger avant publication), **mineur** (polissage).

---

## 0. Synthèse

| Gravité | Nombre | Points principaux |
|---|---|---|
| Bloquant | 3 | Trois « animaux » au pluriel que le code ne sait pas accorder ; « Criquets et sauterelles : herbivore » faux pour les sauterelles ; phrase du héros qui fait chasser l’abeille par le faucon |
| Important | 14 | 5 cartes « ressource » qui répondent à la mauvaise question ; libellé « (en anglais) » faux sur 4 liens sur 5 ; 4 faits non confirmés par la source citée ; 7 « fun » redondants ou tautologiques ; jargon dans 2 notes humanInteractions ; régimes sans définition ; biais de longueur des réponses |
| Mineur | une vingtaine | Apostrophes droites (8), habitats incohérents, conseils « protect » pas toujours adressés à un enfant, etc. |

Chiffres de contrôle :
- Curiosités : la bonne réponse est strictement la plus longue dans 10 questions sur 15 (savane : 10 sur 15 ; récif : 6 sur 14). Elle fait au moins 1,4 fois la longueur de la plus longue des mauvaises dans 5 questions sur 15 (Q2, Q3, Q10, Q13, Q15), contre 1 question sur 15 en savane et 2 sur 14 en récif. Le biais est donc plus marqué que dans l’étalon.
- Typographie : 0 apostrophe droite dans savane et récif ; 8 dans les airs (voir A-12).

---

## 1. Bloquants

### B-1. `chenille`, `criquet`, `papillon_nuit` : animaux au pluriel, que le code accorde mal
Gravité : **bloquant**

Dans l’étalon, seules des **ressources** sont au pluriel (herbes, algues, herbiers, carcasses…). Les animaux y sont au singulier (savane : « Termite », « Criquet »). Dans les airs, trois animaux portent `pluriel: true`. Or `app.js` ne gère le pluriel que dans `withArticle`, `tooBig` et `liveCenter`. Tout le reste est codé au singulier, d’où ces phrases fausses (simulées avec la logique du code) :

| Où (app.js) | Phrase produite pour `chenille` / `criquet` |
|---|---|
| `qWhatEats`, énoncé (l.355) | « Que mange les chenilles ? » / « Que mange les criquets et sauterelles ? » |
| `qWhatEats`, explication (l.356) | « Les chenilles est herbivore : il mange des herbes, des graines ou des plantes, comme les herbes et feuilles. » |
| `qDiet`, énoncé (l.376) | « Les chenilles est plutôt… » |
| `qDiet`, explication (l.380) | « Les criquets et sauterelles est herbivore : il mange… » |
| `renderNetwork` (l.245-246) | « Qui le mange ? » / « Que mange-t-il ? » |
| `renderRange` (l.293-298) | « Où vit les chenilles ? », « Les régions où il vit », « On le trouve surtout… » |

`qWhatEats` est tiré à chaque partie du quiz « Qui mange qui ? » (1 question sur 5). Parmi les 4 herbivores candidats (campagnol, marmotte, criquet, chenille), 2 sont au pluriel : une partie sur deux environ affiche un énoncé fautif. `qDiet` est tiré 3 fois dans « Régimes et régions ».

**Correction (sans toucher au code)** : repasser les trois espèces au singulier, comme dans l’étalon, et supprimer `pluriel`. Le code produit alors « Que mange la chenille ? », « La chenille est herbivore : elle mange… », « Qui la mange ? », « Que mange-t-elle ? », « Où vit la chenille ? ».

```js
// chenille
"name": "Chenille (larve de papillon)", "short": "Chenille", "genre": "f",   // supprimer "pluriel": true
"description": "La larve d’un papillon, qui passe son temps à manger des feuilles avant de se transformer.",
"role": "Elle mange des feuilles et nourrit de nombreux oiseaux, comme la mésange bleue.",
"fun": "",   // voir F-chenille : bloc masqué par app.js (filtre b[2]) tant qu’aucun fait sourcé n’est trouvé

// criquet  (voir aussi B-2)
"name": "Criquet", "short": "Criquet", "scientific": "Acrididae",          // supprimer "pluriel": true
"description": "Un insecte sauteur aux longues pattes arrière, qui vit dans l’herbe et « chante » en les frottant contre ses ailes.",
"role": "Il mange des herbes et nourrit des oiseaux comme la cigogne, l’étourneau ou le guêpier.",
"fun": "Ses « oreilles » ne sont pas sur la tête : elles se trouvent sur les côtés de son ventre !",
"protect": "Laisse un coin de pelouse non tondu : les criquets y trouvent à manger.",   // inchangé
"keywords": "criquet sauterelle orthoptère insecte"                                    // inchangé : la recherche « sauterelle » marche toujours

// papillon_nuit
"name": "Papillon de nuit (noctuelle)", "short": "Papillon de nuit",         // supprimer "pluriel": true
"description": "Un papillon au corps trapu et aux couleurs ternes, qui vole surtout la nuit.",
"role": "Il butine les fleurs la nuit et nourrit les chauves-souris et les oiseaux.",
"fun": "Beaucoup de papillons de nuit entendent les ultrasons des chauves-souris : quand l’une approche, ils se mettent à voler en tous sens pour lui échapper."
```
Sources : fun du criquet [Guide biodiversité Grand Lyon : « sur les côtés de l’abdomen chez les criquets »] ; fun du papillon de nuit [Missouri Dept. of Conservation, fiche noctuelles : « can hear the pulses of ultrasonic sound made by bats », vol erratique avant l’attaque].
Après le passage au singulier, les stems du quiz deviennent « Lequel de ces animaux peut manger le criquet / la chenille / le papillon de nuit ? », corrects.
Remarque : le fun du criquet (oreilles sur le ventre) existe déjà dans le quiz de la savane. Si cette répétition gêne, on peut le remplacer par la stridulation (pattes contre ailes) mais elle figure déjà dans `description`.

Alternative côté code (hors périmètre de cet audit) : rendre `pronoun`, les titres de `renderNetwork` et `renderRange` et les verbes de `qWhatEats` / `qDiet` sensibles à `pluriel`.

### B-2. `criquet` : « Criquets et sauterelles — Herbivore » est faux pour les sauterelles
Gravité : **bloquant** (erreur scientifique, relayée par `qDiet` : « … est herbivore »)

Existant : `"name": "Criquets et sauterelles"`, `"diet": "Herbivore"`, `"scientific": "Orthoptera"`.
Les criquets (Acrididae) sont herbivores, les sauterelles (Tettigoniidae) ne le sont pas. [Grand Lyon : « Tous les criquets sont phytophages » mais « Sauterelles et grillons sont en général omnivores » ; Picardie Nature : la grande sauterelle verte « est essentiellement carnivore »]. La source citée dans les données (BioKids, *Acrididae*) ne parle d’ailleurs que des criquets.
Correction : voir B-1 (l’espèce devient « Criquet », famille Acrididae, `diet: "Herbivore"` reste juste). Les liens (cigogne, étourneau, guêpier → criquet) n’ont pas à changer.

### B-3. `meta.chaineHeroTexte` : la phrase fait chasser l’abeille par le faucon
Gravité : **bloquant** (texte de la page d’accueil de l’univers, contresens)

Existant : « Les flèches montrent le chemin de l’énergie : les fleurs nourrissent l’abeille, que l’hirondelle attrape en vol, et que le faucon pèlerin chasse à son tour. »
Les deux relatives (« que… », « et que… ») ont pour antécédent « l’abeille » : on lit que le faucon pèlerin chasse l’abeille. Les liens disent autre chose (faucon → hirondelle → abeille → fleurs). Cette phrase est aussi incohérente avec `chaineTexte`, qui est correcte.
Correction (même construction que savane : « les herbes nourrissent le zèbre, et le zèbre nourrit le lion ») :
```
"chaineHeroTexte": "Les flèches montrent le chemin de l’énergie : les fleurs nourrissent l’abeille, l’abeille est mangée par l’hirondelle, et l’hirondelle peut être chassée par le faucon pèlerin."
```

---

## 2. Importants

### I-1. Les 5 ressources : `protect` répond à une autre question que le titre affiché
`app.js` l.277 affiche pour une ressource le titre « **Pourquoi c’est important ?** ». Les 5 textes sont des conseils d’action (« Laisse pousser… », « Plante… », « Garde… », « Ne jamais utiliser… »). Dans savane, `protect` des ressources explique pourquoi (ex. carcasses : « Sans charognards, les restes resteraient sur le sol… »). Le registre est en plus incohérent dans les airs : `charognes` est le seul à utiliser l’infinitif (« Ne jamais utiliser de poison »).

Remplacements (sans chiffre, logique du réseau vérifiable dans les liens) :
```
fleurs   : "Sans fleurs, plus de nectar ni de pollen : abeilles, papillons et moustiques n’auraient rien à manger, ni les oiseaux qui les chassent."
graines  : "Une graine est un repas pour les oiseaux et les rongeurs, mais aussi le début d’une nouvelle plante."
fruits   : "Quand les fruits et les baies manquent, des oiseaux comme le merle, le moineau ou l’étourneau perdent une partie de leur nourriture."
herbes   : "Les herbes nourrissent les criquets, les chenilles et les rongeurs : elles sont la base du réseau de la prairie."
charognes: "Sans elles, les vautours et les gypaètes n’auraient rien à manger. En les mangeant, ils nettoient la montagne."
```
Les conseils d’action peuvent rester dans `fun` si on veut, mais ils sont déjà portés par les espèces (abeille, mésange, vautour…).

### I-2. Libellé « En savoir plus (en anglais) » faux sur 4 liens sur 5
`renderHumanLayer` (app.js l.307) écrit « (en anglais) » en dur. Dans les airs, seule la page de la Commission européenne (abeille) est en anglais. Les 4 autres sont en français (PNR Vosges du Nord, Parc du Vercors, LPO ×2). Un enfant qui clique sur une page française après « (en anglais) » est induit en erreur.
Correction : soit ajouter dans les données un champ `langue` (« fr » / « en ») et afficher « (en anglais) » seulement si `en`, soit afficher « En savoir plus ↗ » sans mention. Rien à changer dans les données tant que le code n’est pas adapté.

### I-3. Quatre « faits » que la source citée ne confirme pas
Vérifié en ouvrant la source indiquée dans le champ `source` de l’espèce. Ces énoncés sont vraisemblables, mais je n’ai pas pu les confirmer ; la règle « sourçable uniquement » conduit à les retirer ou les re-sourcer.

| Espèce / champ | Existant | Ce que dit la source citée | Correction |
|---|---|---|---|
| `mesange_bleue` fun + Q7 `why` | « les poussins en mangent presque uniquement des chenilles » ; « leurs parents en rapportent des centaines » | LPO PACA (fiche Ventoux) : rien sur le régime des poussins. Une autre source (Sophia Antipolis, mésanges et chenilles) dit seulement : « Elles consomment de nombreuses chenilles, en particulier pendant la nidification et le nourrissage des jeunes. » | Q7 `why` : « Au printemps, les mésanges attrapent de très nombreuses chenilles pour nourrir leurs petits. » Fun : voir F-mésange. |
| `hirondelle` fun | « une famille peut apporter à manger à ses petits des centaines de fois par jour ! » | Ni le cahier technique LPO ni la fiche INPN ne donnent de nombre de becquées par jour | Retirer le chiffre ; voir F-hirondelle. |
| `guepier` fun + Q8 `why` | « d’autres oiseaux réutilisent ensuite ses vieux terriers » | Fiche INPN citée : rien sur la réutilisation des terriers (elle dit : « tunnel creusé par le couple dans le sol meuble d’une falaise », « niche le plus souvent en colonies ») | Voir F-guêpier ; Q8 `why` : « Il creuse un tunnel dans le sol meuble d’une berge ou d’une falaise, souvent au sein d’une colonie. » |
| `faucon_hobereau` description | « à la silhouette de grande **hirondelle** » | Fiche INPN citée : « rappellent la silhouette d’un grand **martinet** » | « Un faucon élancé, à la silhouette de grand martinet, qui revient d’Afrique au printemps. » |

Autres écarts avec la source citée, de moindre portée :
- `chardonneret` role : « …et les dissémine ». La plaquette OFB ne parle pas de dissémination (un granivore détruit aussi beaucoup de graines). Remplacer par : « Il mange des graines de plantes sauvages, comme celles des chardons, et il nourrit à son tour l’épervier et le faucon pèlerin. » (liens existants).
- `epervier` fun : « environ un tiers plus grande ». Oiseaux.net ne donne aucun chiffre pour l’épervier (le « tiers » est celui du faucon pèlerin, déjà utilisé en Q3). Voir F-épervier.
- `faucon_crecerelle` : la fiche Tour du Valat citée en `source` ne parle pas du « Saint-Esprit ». La fiche INPN 440970 (déjà utilisée pour le lien crécerelle → campagnol) le fait : « Le Faucon crécerelle pratique souvent le vol en "Saint-Esprit" ». Mettre `"source": "https://inpn.mnhn.fr/docs-web/docs/download/440970"`.
- `gypaete` : « lâche les gros os de très haut sur les rochers » : la fiche INPN dit « Ils cassent les os les plus gros sur des pierriers ». L’orange du ventre est bien confirmé (« se colorent le plumage dans des sources et des boues ferrugineuses »). Le « de très haut » est un fait connu, mais absent de la fiche citée : ajouter une source ou écrire « sur les pierriers ».
- `charognes` fun : « Vautours et gypaètes se partagent souvent la même carcasse. » Non vérifié (aucune source ne le soutient dans les données). À re-sourcer ou retirer.
- `merle` fun : « Les merles du **nord** migrent… » ADW dit « migrate… 800-2000 km » et que la migration devient moins fréquente avec l’urbanisation, sans parler du nord. Écrire : « Certains merles migrent sur plusieurs centaines de kilomètres, alors que beaucoup de merles de ville restent toute l’année au même endroit. »
- `pigeon_ramier` fun : « s’est installé en ville depuis le début des années 1800 ». All About Birds : « in this region [Central Europe] … early 1800s ». Préciser : « En Europe centrale, il s’est installé en ville dès le début des années 1800. »

Confirmés par la source : vautour fauve (« supérieure à un kilogramme », « jeûner plusieurs jours »), aigle royal (nid « utilisé pendant des décennies, peut devenir énorme »), moustique (mâles = nectar, seules les femelles piquent), faucon pèlerin (mâle « 1/3 smaller (hence its name of tiercel) »), chardonneret (nom tiré du chardon ; capture interdite), martinet (« de mars à fin octobre » pour les travaux : LPO), cigogne (nid, courants ascendants).

### I-4. Les `fun` faibles, redondants ou tautologiques (7 cas critiques)
Un `fun` doit être un vrai « Le savais-tu ? » : un fait nouveau qui n’est pas déjà dans `description`, `role` ou `habitat`. Les cas ci-dessous ne le sont pas. Voir la section 5 pour tous les remplacements sourcés.

| Espèce | Existant | Problème |
|---|---|---|
| `papillon_nuit` | « Beaucoup de papillons de nuit volent la nuit, quand les chauves-souris les chassent. » | Tautologie (« papillons de nuit volent la nuit »), et `description` le dit déjà |
| `chouette_effraie` | « Quand il y a beaucoup de campagnols, il y a plus d’effraies : leur nombre suit celui de leurs proies. » | Recopie quasi mot pour mot `role` (« son nombre suit celui de ses proies »), et le fait est répété dans `campagnol` fun et la curiosité Q11 : 4 occurrences |
| `fruits` | « Les oiseaux qui mangent des baies en rejettent les graines plus loin. » | Trois fois la même phrase : `description`, `role`, `fun` |
| `abeille` | « Elle récolte du nectar et du pollen sur les fleurs, qu’elle rapporte à sa ruche. » | `description` (« butine les fleurs »), `role` (« butine les fleurs et transporte leur pollen ») et `fun` disent la même chose ; Q13 aussi |
| `faucon_hobereau` | « Ce chasseur acrobate attrape les libellules et les hirondelles directement en plein vol. » | Répète `role` (« chasse les libellules et les petits oiseaux en vol ») |
| `criquet` | « Les mâles font leur chant en frottant leurs pattes ou leurs ailes. » | Répète `description` (« “chantent” en frottant leurs pattes ou leurs ailes ») |
| `chenille` | « Une chenille mange énormément avant de devenir un papillon. » | Répète `description` (« passent leur temps à manger des feuilles avant de se transformer ») |

Redondances plus légères : `hirondelle` fun (1re moitié = `role`), `mesange_bleue` fun (= `role`), `etourneau` fun (« bandes » déjà dans `description` et `habitat`), `grand_duc` fun (« jusqu’en montagne » déjà dans `habitat`), `martinet` `habitat` (« passe presque toute sa vie dans le ciel ») = `fun`.

### I-5. `humanInteractions` : jargon et formulations ambiguës
Les 5 notes sont fidèles à leurs sources (vérifiées : Vercors « au moins 140 ans », 2010, 2022 ; LPO nids ; LPO vautours « plus de quarante ans » ; Commission européenne 2018), mais trois posent un problème de ton ou de clarté pour 8-16 ans.

**abeille** : trois noms de molécules (« clothianidine, imidaclopride, thiaméthoxame ») : illisibles pour un enfant et sans valeur pédagogique.
```
"title": "L’Europe protège les abeilles",
"note": "Certains insecticides, les néonicotinoïdes, sont dangereux pour les abeilles. En 2018, l’Union européenne a interdit trois d’entre eux en plein air. Ils ne peuvent plus être utilisés que dans des serres fermées en permanence."
```
**vautour_fauve** : « équarrisseurs » est un mot d’adulte. Source : LPO (« mauvaise réputation », « maladies véhiculées par les cadavres », « service gratuit »).
```
"title": "Les vautours, nettoyeurs de la nature",
"note": "Le vautour fauve avait presque disparu de France, victime notamment de sa mauvaise réputation. Grâce à plus de quarante ans de programmes de protection, il est revenu. Il mange les animaux morts, ce qui limite la propagation des maladies, et de nombreux éleveurs font appel à ce service gratuit."
```
**faucon_pelerin** : titre ambigu (« chasse » = poursuit ou fait fuir ? jeu de mots peu lisible), « a fait du mal » trop vague, « Ils ont disparu » ambigu (braconniers ou faucons ?), virgules empilées, et la source parle de « surveillance des sites de reproduction » (pas des « nids »).
```
"title": "Le faucon pèlerin avait disparu des Vosges du Nord",
"note": "Au début des années 1970, le faucon pèlerin a disparu des Vosges du Nord. Les causes : le DDT, un insecticide utilisé en agriculture, mais aussi le braconnage et le vol de jeunes dans les nids. Après l’interdiction du DDT, et grâce à des associations qui surveillaient les sites de reproduction, les faucons s’y sont de nouveau reproduits dans les années 1980."
```
**hirondelle** : « LPO » n’est pas expliqué, et la note omet l’information la plus utile à un enfant : c’est interdit par la loi (« Il est donc interdit de détruire ou d’enlever un nid d’hirondelle ou de martinet », LPO). « les hirondelles reviennent dans le même nid » est trop absolu (source : « ont tendance à revenir aux mêmes nids »).
```
"note": "Chaque année, beaucoup de nids d’hirondelles sont détruits ou déplacés, pour des travaux ou pour éviter les crottes. Or les hirondelles ont tendance à revenir dans les mêmes nids après leur migration. La Ligue pour la protection des oiseaux (LPO) explique que c’est un facteur important de leur déclin. C’est aussi interdit : les hirondelles et leurs nids sont protégés par la loi."
```
**gypaete** : acceptable. Proposition de lisibilité (« arc alpin » est un terme d’adulte) :
```
"note": "Le gypaète barbu avait complètement disparu des Alpes à la fin du XIXe siècle, à cause des humains : on le croyait nuisible. Depuis 2010, le Parc du Vercors lâche de jeunes gypaètes nés en élevage. En 2022, un poussin né dans la nature a pris son envol : c’était la première reproduction dans le massif depuis au moins 140 ans."
```
Remarque de cohérence : le bloc s’intitule « Les humains et cet animal » et l’étalon ne montre que des pressions (« Chassé pour sa viande »). Les airs mêlent pressions (DDT, nids) et réussites (Vercors, vautours, abeilles). C’est une bonne idée éditoriale, mais à assumer : trois titres sont des « bonnes nouvelles ».

### I-6. Régimes (`diet`) : jargon sans définition
Les badges affichent le champ tel quel. L’étalon glose les termes rares (« Détritivore (mange des restes de plantes) », « Mange du plancton »). Dans les airs, « Insectivore » (×5), « Granivore » (×2) et « Insectivore et granivore » ne sont pas expliqués ; « Nectar (et sang pour les femelles qui pondent) » est une phrase, pas un régime.
Les filtres utilisent `startsWith` / `includes` : ajouter une parenthèse ne les casse pas.
```
Insectivore                -> "Insectivore (mange des insectes)"
Granivore                  -> "Granivore (mange des graines)"
Insectivore et granivore   -> "Insectivore et granivore (insectes et graines)"
Carnivore et insectivore   -> "Carnivore et insectivore (oiseaux et insectes)"
moustique : "Nectar (et sang pour les femelles qui pondent)" -> "Mange du nectar (et du sang pour les femelles qui pondent)"
```

### I-7. Quiz : `libellule` n’apparaît pas dans le filtre « Mangeurs d’insectes »
Le filtre `regimeContient: ["insectivore"]` ne retient pas la libellule (`diet: "Carnivore"`), alors qu’elle mange moustiques et papillons. Remède sans effet de bord sur `dietKind` (qui lit `startsWith('carnivore')`) :
```
libellule : "diet": "Carnivore et insectivore (moustiques et autres insectes)"
```

### I-8. Curiosités : biais de longueur et distracteurs faibles
Voir section 4 (tableau complet). Quatre problèmes de fond : (a) la bonne réponse fait au moins 1,4 fois la longueur des autres dans 5 questions ; (b) des distracteurs absurdes que l’enfant élimine sans réfléchir (« Il pond trois œufs par an » pour un mâle, « Elles hibernent dans leur nid », « pour jouer ») ; (c) Q11 mélange pluriel (question) et singulier (réponses) ; (d) Q5, Q6, Q13 sont trop faciles (réponse donnée par `description`/`role`).

### I-9. Conseils `protect` : plusieurs ne s’adressent pas à un enfant
Voir section 3 (tableau). Le tutoiement impératif est une bonne décision pédagogique (plus concret que les infinitifs abstraits de l’étalon) mais six conseils supposent des actions d’adulte (« fais isoler les câbles électriques », « si tu fais des travaux », « plante des petits bois »).

### I-10. `Fleurs (nectar et pollen)` : `short` qui annule la coupe automatique de la parenthèse
`shortName` coupe `(…)` du `name` seulement si `short` est absent. Ici `short` répète le nom complet, donc :
- le héros affiche « Fleurs (nectar et pollen) » (long) ;
- le quiz écrit « La marmotte des Alpes est herbivore : elle mange des herbes, des graines ou des plantes, comme les fleurs (nectar et pollen). » : or la marmotte mange les fleurs, pas leur nectar ;
- Même chose pour `charognes` (« les charognes (animaux morts) »).
Correction : supprimer `short` pour `fleurs` et `charognes`. La note « restes d’animaux » de `foodLabels` fait déjà office de définition sur les cartes de relation.

### I-11. Habitats : longueur et ponctuation incohérentes avec l’étalon et entre eux
Savane : étiquettes très courtes, sans point (moyenne 38 caractères). Récif : moyenne 18 caractères. Airs : phrases complètes (moyenne 84 caractères, jusqu’à 26 mots) avec point final pour 22 animaux, sans point pour 7 animaux (`pigeon_ramier`, `moustique`, `abeille`, `papillon_nuit`, `libellule`, `criquet`, `chenille`) et pour les 5 ressources. Les habitats longs recopient d’autres champs (martinet, guêpier, étourneau, moineau : voir I-4).
Recommandation : uniformiser en groupe nominal court, sans point, comme l’étalon. Exemple :
```
martinet : "Villes et villages, sous les toits et dans les fissures des murs"
guepier  : "Berges de sable ou de terre, près de l’eau"
etourneau: "Prairies et champs ; nids dans les trous d’arbres et les bâtiments"
moineau  : "Villes, villages et fermes, tout près des humains"
```

### I-12. Cas de la Q-region « passe l’hiver en Afrique »
`cigogne` est dans la liste `oui`. Beaucoup de cigognes passent l’hiver en Afrique, mais pas toutes (non vérifié ici : à confirmer avec une source avant de laisser la question affirmative). Reformulation prudente : « Lequel de ces animaux **part** passer l’hiver en Afrique ? » (inutile de changer le reste) ou retirer `cigogne` de `oui` (elle a déjà la curiosité Q4).

### I-13. `leurresQuiMange` : explication trop absolue
« mangent des plantes ou des graines, pas des animaux. » : le pigeon ramier mange parfois vers, insectes et escargots (All About Birds, source citée), le chardonneret des chenilles (OFB). Corriger : « mangent surtout des plantes ou des graines, et ne chassent pas d’animaux. »

### I-14. `comprendre.cartes`, carte « Un réseau qui voyage »
« Quand les insectes **disparaissent** l’hiver, des oiseaux comme l’hirondelle et la cigogne partent vers l’Afrique » : les insectes ne « disparaissent » pas, ils se font rares ; et la cigogne mange surtout des campagnols, des criquets et des chenilles (liens). Remplacement :
```
"Quand les insectes se font rares en hiver, des oiseaux comme l’hirondelle ou le martinet partent vers l’Afrique : le réseau traverse les continents."
```
(les deux espèces sont strictement insectivores dans les données.)

---

## 3. Mineurs, espèce par espèce

### A-12. Apostrophes droites (8) : à remplacer par ’
`species[].habitat` de `faucon_pelerin` (« jusqu'en »), `faucon_hobereau` (« l'eau »), `epervier` (« s'approche »), `grand_duc` (« jusqu'en »), `vautour_fauve` (« l'air »), `mesange_bleue` (« jusqu'à »), `etourneau` (« d'arbres »), `guepier` (« l'eau »).
Aussi : « 1 200 m » (`mesange_bleue`) : espace fine insécable (U+202F) entre 1 et 200, et insécable avant « m ».
Non traités par `nbsp()` dans le code (même chose pour l’étalon) : `comprendre.cartes`, `chaineTexte`, `quiz.intro`, `carte.avertissement`, notes humanInteractions, textes des options de réponse. Les espaces avant « : » y restent sécables. Aucune action côté données.

### Accords, articles, élision : vérifié espèce par espèce
Sortie de `withArticle` (défini / « de ») : correcte pour les 29 animaux et 5 ressources, hors cas B-1 : le faucon pèlerin, l’épervier, la buse variable, l’aigle royal, la chouette effraie, le grand-duc, le vautour fauve, le gypaète barbu, l’hirondelle rustique (elision: true indispensable pour le h), le martinet noir, la mésange bleue, le moineau domestique, le chardonneret élégant, le merle noir, l’étourneau sansonnet, le pigeon ramier, le guêpier d’Europe, la cigogne blanche, le moustique commun, l’abeille domestique, la libellule empereur (elision: false inutile mais inoffensif), la pipistrelle commune, le campagnol des champs, la marmotte des Alpes. `genre: "f"` présent pour toutes les femelles (buse, effraie, hirondelle, mésange, cigogne, abeille, libellule, pipistrelle, marmotte). Rien à corriger.
Redondances inoffensives : `elision: true` sur `epervier` et `etourneau` (le code l’infère déjà d’après la lettre initiale É), `elision: false` sur `libellule`.
Stems du quiz « Qui mange qui ? » : tous corrects après B-1. Vérifié : « Lequel de ces repas le grand-duc peut-il chasser ? », « … la libellule empereur peut-elle chasser ? », « La cigogne blanche est bien trop grosse pour lui. » (pour un épervier), « L’aigle royal est bien trop gros pour elle. » (pour la chouette).
Autres : nom de `libellule` : l’appellation française de *Anax imperator* est « Anax empereur » (INPN). « Libellule empereur » est compréhensible pour un enfant ; si on veut la rigueur : `"name": "Anax empereur (libellule)", "short": "Anax empereur"`. Mineur.

### Conseils `protect` : réalisme pour un enfant
| Espèce | Existant | Problème | Remplacement |
|---|---|---|---|
| `faucon_hobereau` | « Garde des mares, des haies et des prairies sans pesticides… » | Verbe « garder » : un enfant ne décide pas des prairies | « Si tu as un jardin, laisse un coin sauvage avec des fleurs et une mare, sans pesticides : c’est là que vivent les libellules qu’il chasse. » |
| `epervier` | « Plante et protège des haies et de petits bois… » | Un enfant ne plante pas un bois | « Si tu as un jardin, plante une haie variée : les petits oiseaux s’y abritent, et l’épervier y trouve à manger. » |
| `buse` | « …évite les poisons contre les rongeurs, qui l’intoxiquent aussi. » | Un enfant n’achète pas de poison ; le lien de cause n’est pas expliqué. Fait non vérifié dans la source citée (à confirmer) | « Demande à tes proches de ne pas utiliser de poison contre les rongeurs : la buse qui en mange peut tomber malade. » |
| `grand_duc` | « …fais isoler les câbles électriques dangereux. » | Action d’adulte, non expliquée | « Laisse-le tranquille près des falaises et des carrières où il niche. » (supprimer la 2e moitié) |
| `chouette_effraie` | « …laisse-lui l’accès aux granges ou aux clochers, ou installe un nichoir. » | Un enfant ne gère pas un clocher | « Si tu connais une grange où elle vit, demande aux adultes de laisser une ouverture ou de poser un nichoir. » |
| `vautour_fauve` | « Ne laisse jamais de poison dans la nature… » | L’enfant n’en utilise pas | « Reste à distance des falaises où il niche, et ne laisse jamais de déchets ou de nourriture traîner dans la nature. » (à re-sourcer si on veut garder une mention du poison) |
| `gypaete` | « …falaises de nidification… » | Jargon | « Garde tes distances avec les falaises où il fait son nid, et ne fais pas voler de drone dans la montagne. » |
| `hirondelle` | 3 actions en 22 mots | Trop dense | « Ne détruis jamais un nid d’hirondelle (c’est interdit) et laisse un passage ouvert vers la grange ou le garage au printemps. » |
| `martinet` | « Si tu fais des travaux, garde les petits trous… » | L’enfant ne fait pas de travaux | « Si des travaux sont prévus sur un toit, demande qu’on garde les petits trous où nichent les martinets ou qu’on installe des nichoirs. » |
| `moineau` | 4 actions | Liste trop longue | « Laisse un coin de buissons dans ton jardin et mets de l’eau propre : le moineau y trouvera un abri. » |
| `guepier` | « Préserve les berges sableuses… » | « Préserver » abstrait | « Ne grimpe pas sur les berges de sable où il creuse son nid, et observe-le de loin. » |
| `cigogne` | « …plateformes de nidification » | Jargon | « Protège les prairies humides et les marais, où elle trouve à manger, et laisse son nid tranquille. » |
| `moustique` | « Vide les soucoupes d’eau stagnante plutôt que d’utiliser des produits qui tuent aussi les autres insectes. » | Le titre est « Comment le protéger ? » mais le conseil vise à limiter les moustiques | « Le moustique n’est pas menacé. Pour limiter les piqûres sans nuire aux autres insectes, vide les soucoupes d’eau stagnante plutôt que d’utiliser des insecticides. » |
| `abeille` | « fleurs mellifères » | « mellifères » est un mot technique | « Sème des fleurs sauvages sur ton balcon ou dans ton jardin, et évite les insecticides. » |
| `pipistrelle` | « Ne bouche pas les fissures où elle dort… » | Adulte ; et aucun conseil sur ce qu’un enfant peut faire | « Si des travaux sont prévus, demande qu’on laisse les fissures où elle dort, et laisse une mare dans le jardin pour qu’elle y trouve des insectes. » |
| `campagnol` | « …aide ses prédateurs comme l’effraie avec des nichoirs. » | Tournure lourde | « Laisse des bandes d’herbe et des haies : elles abritent les campagnols, et les rapaces qui les chassent. » |

Bons exemples à garder tels quels : `marmotte` (« Reste sur les sentiers, garde tes distances et ne la nourris jamais. »), `papillon_nuit` (« Éteins les lumières inutiles… »), `criquet` (« Laisse un coin de pelouse non tondu »), `chardonneret` (conseil + interdiction de capture, confirmée par l’OFB), `mesange_bleue`, `faucon_pelerin`, `aigle_royal`.

### Autres mineurs
- `merle` description : « Un oiseau noir au bec orange (le mâle), brun chez la femelle, très fréquent dans les jardins. » La parenthèse rend la phrase ambiguë. Proposition : « Le mâle est noir avec un bec orange, la femelle est brune : c’est un oiseau très fréquent dans les jardins. »
- `buse` role : « …elle garde les champs en équilibre. » Formule abstraite. Proposition : « …elle évite que les rongeurs deviennent trop nombreux dans les champs. »
- `moustique` role : sujet qui change en cours de phrase (« Il nourrit… et les mâles butinent… »). Proposition : « Il nourrit les hirondelles, les martinets, les libellules et les chauves-souris. Les mâles butinent aussi le nectar des fleurs. »
- `faucon_crecerelle` fun : voir F (pour la précision « ailes battant vite, queue en éventail »).
- `meta.regions.est` : `nom` « Europe centrale et de l’Est » mais `court` « Europe de l’Est » : cohérence : `"court": "Centre et Est"`.
- `meta.filtres` : « 🐦 Tous les oiseaux » côtoie « Tous » : confusion. Proposition : « 🐦 Oiseaux (rapaces compris) ». L’émoji 🦟 de « Mangeurs d’insectes » représente un insecte, proche de « 🐝 Insectes » : préférer 🦇 ou 🐦 (mineur).
- `meta.carte.avertissement` : ajouter une phrase pour les migrateurs : « Pour les oiseaux migrateurs, la zone Afrique montre où ils passent l’hiver. »
- `comprendre.cartes` « Rien ne se perd » : seuls vautours et gypaètes y sont cités ; l’étalon cite aussi les décomposeurs. Ajouter : « Des bactéries et des champignons finissent le travail. »
- `meta.quiz.motsHerbivore` : « des herbes, des graines ou des plantes » (redondance : les herbes et les graines sont des plantes). Remplacer par « des plantes (herbes, feuilles, graines) ».
- `faucon_pelerin` role / `grand_duc` role : « Super-chasseur » (×2) : ton enfantin, assumé ; OK mais à ne pas multiplier.
- `habitat` des ressources (`herbes` : « Prairies d’Europe ») : sans point, cohérent avec l’étalon.

---

## 4. Les 15 curiosités : tableau de contrôle

Longueurs en caractères : bonne réponse / mauvaises. « Biais » = bonne réponse d’au moins 1,4 fois la longueur de la plus longue des mauvaises.

| # | Animal | Longueurs (bonne / mauvaises) | Biais | Problèmes | Remplacement |
|---|---|---|---|---|---|
| 1 | gypaete | 44 / 29, 39 | non | « pour jouer » trahit la mauvaise réponse ; `why` « de très haut » non confirmé (voir I-3) | options : « Il les lâche sur des pierriers pour les briser » ; « Il les cache sous la neige pour plus tard » ; « Il les rapporte au nid pour s’amuser » (pas de chiffre) |
| 2 | faucon_crecerelle | 50 / 22, 35 | **oui** | Réponse très longue ; expression à expliquer | q : « Que fait la crécerelle quand elle pratique le « vol en Saint-Esprit » ? » ; options : « Elle reste sur place dans le vent » (32) / « Elle fait la sieste en plein vol » (31) / « Elle appelle ses petits en chantant » (35) ; `why` : « Elle reste immobile dans le vent, ailes battant vite et queue en éventail, pour repérer ses proies au sol. » |
| 3 | faucon_pelerin | 49 / 25, 26 | **oui** | Un mâle ne pond pas : distracteur absurde ; trois et tiers se ressemblent trop | options : « Il est un tiers plus petit que la femelle » (41) / « Il vole trois fois plus vite que la femelle » (42) / « Il porte trois plumes colorées sur la tête » (42) ; `why` inchangé (source oiseaux.net) |
| 4 | cigogne | 28 / 29, 31 | non | « hibernent dans leur nid » absurde ; OK sinon. `why` : « courants d’air chaud » confirmé (ADW) | inchangé. Voir I-12 pour la prudence sur « toutes » |
| 5 | martinet | 20 / 20, 20 | non | Trop facile (nager sur les lacs ?) ; `fun` dit « des journées entières » mais la question dit « presque toute sa vie » : incohérent | q : « Combien de temps un martinet noir peut-il rester en vol sans se poser ? » ; options : « Jusqu’à dix mois d’affilée » / « Une journée au maximum » / « Une semaine au maximum » ; `why` : « Des martinets suédois équipés de balises sont restés en l’air jusqu’à dix mois d’affilée, hors saison de nidification. » [BirdGuides, étude *Current Biology*] |
| 6 | hirondelle | 12 / 16, 23 | non | Trop facile, répète `role` | q : « Que fait souvent l’hirondelle quand elle revient d’Afrique au printemps ? » ; options : « Elle revient souvent à son nid » (30) / « Elle construit toujours un nid neuf » (35) / « Elle niche à terre, dans l’herbe » (32) ; `why` : « Les hirondelles ont tendance à revenir aux mêmes nids : c’est pourquoi les détruire leur fait tant de mal. » [LPO] |
| 7 | mesange_bleue | 13 / 11, 10 | non | `why` : « presque uniquement », « des centaines » non confirmés (I-3) | `why` : « Au printemps, les mésanges attrapent de très nombreuses chenilles pour nourrir leurs petits. » |
| 8 | guepier | 35 / 26, 25 | limite (×1,35) | `why` non confirmé (I-3) | options : « Dans une berge de sable ou de terre » (35) / « Tout en haut d’un grand arbre » (29) / « Sous le toit d’une vieille maison » (33) ; `why` : « Il creuse un tunnel dans le sol meuble d’une berge ou d’une falaise, souvent au sein d’une colonie. » |
| 9 | pipistrelle | 29 / 32, 26 | non | Les « cris » sont inaudibles : un enfant cherche un son ; « voit très bien » est en partie vrai | options : « En criant et en écoutant l’écho » (31) / « Elle voit parfaitement dans le noir » (35) / « Elle sent leur odeur de très loin » (33) ; `why` : « Elle crie des ultrasons, trop aigus pour nos oreilles, et repère ses proies grâce à l’écho. » [Vigie-Nature École ; ADW] |
| 10 | marmotte | 41 / 19, 25 | **oui** | Réponse très longue ; mauvaises réponses courtes | options : « Elle siffle pour prévenir les autres » (35) / « Elle se cache seule dans un coin » (33) / « Elle attaque pour faire fuir le danger » (38) ; `why` : « Une marmotte fait le guet et prévient la colonie d’un sifflement aigu. » [ADW] |
| 11 | chouette_effraie | 33 / 28, 28 | non | Question au pluriel, réponses au singulier (« Elle… ») ; l’énoncé donne presque la réponse | q : « Pourquoi y a-t-il plus de chouettes effraies quand les campagnols sont nombreux ? » ; options : « Parce qu’elles trouvent plus à manger » (37) / « Parce qu’elles les protègent des renards » (39) / « Parce qu’elles vivent dans leurs terriers » (39) ; `why` : « La chouette effraie mange surtout des campagnols : quand ils sont nombreux, elle a de quoi nourrir plus de petits. » [INPN : « fluctuations annuelles importantes corrélées avec l’abondance des campagnols »] |
| 12 | chardonneret | 33 / 37, 22 | non | Réponse devinable par l’assonance (chardon / chardonneret) | mineur : « De son chant très fort » → « De son chant qui s’entend de loin » (équilibre) ; `why` : « Son nom vient de la plante dont il raffole : le chardon. » [OFB] |
| 13 | abeille | 36 / 21, 21 | **oui** | Évident (une abeille visite les fleurs pour le nectar) ; répète `role` | q : « Comment une abeille peut-elle dire aux autres où sont les fleurs ? » ; options : « Grâce à une danse dans la ruche » (31) / « Grâce à un cri très aigu » (25) / « En laissant une trace de miel » (29) ; `why` : « La danse de l’abeille indique la direction et la distance des fleurs éloignées. » [ADW, *Apis mellifera*] ; emoji 💃 |
| 14 | faucon_hobereau | 13 / 12, 12 | non | « campagnol » n’est pas strictement impossible (zone grise) | « Un campagnol » → « Un lièvre » ; `why` inchangé |
| 15 | etourneau | 28 / 19, 19 | **oui** | « Compter jusqu’à dix » : on ne peut pas prouver qu’un oiseau n’en est pas capable ; id `calcule` | options : « Imiter d’autres animaux » (25) / « Voler à reculons » (16) / « Plonger sous l’eau pour pêcher » (30) ; allonger la 2e (« Voler en marche arrière », 23) pour équilibrer ; `why` : « L’étourneau sansonnet imite d’autres oiseaux et même des bruits de machines. » [BioKids] |

Nota : pour Q7 et Q14, les ids d’options (`chenille`, `graines`, `fruits`, `libellule`, `marmotte`, `campagnol`) sont aussi des ids d’espèces : `app.js` (l.110) leur colle automatiquement la silhouette ou l’émoji de l’espèce. C’est voulu et correct : pas d’émoji à ajouter.

Équilibre des thèmes : 15 questions, 3 quiz de 5 tirées au hasard : bonne couverture (rapaces ×5, oiseaux ×6, insectes ×1, mammifères ×2, mixtes ×1), mais un seul insecte (abeille) : après remplacement de Q13, ajouter éventuellement une question sur `papillon_nuit` (fun ci-dessus : « Que font beaucoup de papillons de nuit quand une chauve-souris approche ? / Ils volent en tous sens pour lui échapper »).

---

## 5. `fun` faibles : remplacements sourcés

Règle : une phrase par espèce, un fait nouveau, sourcé (pas de chiffre sans source). Les sources sont les pages retrouvées pendant l’audit.

| Espèce | Existant | Problème | Remplacement | Source |
|---|---|---|---|---|
| `faucon_hobereau` | « Ce chasseur acrobate attrape les libellules et les hirondelles directement en plein vol. » | Répète `role` | « Il ne construit pas son nid : il s’installe dans un vieux nid de corneille. » | Woodland Trust : « They don’t build their own nests. They reuse nests made by crows and other species » ; alternative INPN : « La ponte intervient seulement dans la première quinzaine de juin », pour que l’élevage coïncide avec le pic de proies |
| `chouette_effraie` | « Quand il y a beaucoup de campagnols… » | Répète `role` | « Son vol est si silencieux qu’on ne l’entend plus à plus de deux mètres. » (et retirer « sans bruit » de `description` : « …qui chasse la nuit. ») | INPN 440860 : « le vol est particulièrement remarquable par son extrême silence (inaudible à plus de deux mètres) » |
| `grand_duc` | « Il est revenu dans beaucoup de régions grâce à la protection, et il peut nicher jusqu’en montagne. » | Vague, 2e moitié dans `habitat` | « En France, il a failli disparaître : en 1976, on connaissait moins de 100 couples. Grâce à la protection, il est revenu. » | Fiche Grand Est : « moins de 100 couples connus en 1976 », retour grâce à la protection et aux réintroductions |
| `epervier` | « La femelle est environ un tiers plus grande… » | Chiffre non sourcé (I-3) | « La femelle est plus grande que le mâle : elle chasse des proies plus lourdes, comme les grives ou les pigeons ramiers. Le couple se fait ainsi moins concurrence. » | Oiseaux.net (traduction) : « Because of their larger size, females hunt for heavier prey such as thrushes and Wood Pigeons » ; « …without competition between the partners for food » |
| `hirondelle` | « Elle attrape ses proies en plein vol, et… des centaines de fois par jour ! » | Répète `role` ; chiffre non confirmé | « Après son voyage depuis l’Afrique, elle revient souvent au même endroit et répare son ancien nid. » | LPO : « ont tendance à revenir aux mêmes nids » ; INPN 441119 : les couples « s’affairent dès leur retour à la restauration de leur nid » |
| `martinet` | « Il peut passer des journées entières en vol… » | Exact (ADW) mais faible ; incohérent avec le quiz | « Il peut rester en l’air jusqu’à dix mois d’affilée, sans jamais se poser, en dehors de la saison de nidification. » | BirdGuides (étude *Current Biology*) : « up to 10 months in the air without landing » ; ADW : « entire day on the wing » |
| `mesange_bleue` | « Pour nourrir ses petits, elle chasse surtout des chenilles : les poussins en mangent presque uniquement. » | Répète `role`, non confirmé | « Après leur premier envol, les jeunes sont encore nourris par leurs parents pendant 10 à 15 jours. » | LPO PACA (source citée) : « nourris par les adultes pour environ 10 à 15 jours » |
| `moineau` | « Il défend son nid avec courage et il peut élever plusieurs nichées par an. » | « avec courage » : anthropomorphe ; faible | « Il défend avec énergie le petit territoire qui entoure son nid. » (garder « plusieurs nichées » seulement avec source européenne) | ADW : « aggressively protect a small territory just around their nesting site » |
| `chardonneret` | « Son nom vient du chardon, sa plante préférée. » | Correct et sourcé (OFB) ; mais répété dans `role` et Q12 | conserver | OFB : « Son nom provient de la plante dont il raffole » |
| `merle` | « Les merles du nord migrent… » | « du nord » non sourcé | voir I-3 | ADW : « migrate… 800-2000km » ; « migration has become less common » |
| `etourneau` | « Il vit en bandes bruyantes et sait imiter les sons qu’il entend. » | « bandes » répète `description` ; Q15 `why` copie le fun | « Il sait imiter d’autres animaux, et même des bruits de machines. » | BioKids : « accomplished mimics… other birds, animals, and even machines » |
| `guepier` | « Il creuse son nid dans une berge, et d’autres oiseaux réutilisent… » | 1re moitié = `habitat` ; 2e non confirmée | « Il niche le plus souvent en colonies, et ses troupes migrent souvent très haut dans le ciel. » | INPN 441081 : « niche le plus souvent en colonies, de quelques unités à quelques dizaines de couples » ; « migre en troupes… souvent haut dans le ciel » |
| `cigogne` | « Son nid est l’un des plus grands chez les oiseaux, et beaucoup de cigognes partent passer l’hiver en Afrique. » | Deux faits mélangés ; la 2e moitié est dans Q4 / quiz région | « Son nid peut mesurer jusqu’à 2 mètres de large : chaque printemps, le mâle agrandit celui de l’année précédente. » | ADW : « Nests can be up to 2 meters in diameter… Males enlarge the nest their pair used the previous year » |
| `moustique` | OK | Correct (ADW/Ohioline) | conserver | Ohioline |
| `abeille` | « Elle récolte du nectar et du pollen… » | Triple redondance | « Quand elle trouve de bonnes fleurs, elle peut le dire aux autres par une danse qui indique la direction et la distance. » | ADW : « indicates the direction and distance of food further away » |
| `papillon_nuit` | tautologie | voir B-1 | voir B-1 | MDC |
| `libellule` | « Ses larves vivent dans l’eau avant de sortir pour devenir des libellules. » | Vrai mais générique (déjà dit pour le moustique) | « Ses ailes déployées peuvent mesurer jusqu’à 11 cm. » | Réserve naturelle de Strasbourg : « wingspan of up to 110 mm » |
| `criquet` | tautologie | voir B-1 | voir B-1 | Grand Lyon |
| `chenille` | duplicat | Pas de remplacement sourcé trouvé | `"fun": ""` (bloc masqué, cf. `app.js` l.278) tant qu’un fait n’est pas sourcé | : |
| `pipistrelle` | « Elle repère ses proies dans le noir grâce à des cris. » | Incomplet (pourquoi ça marche ?) | « Elle crie des sons trop aigus pour nos oreilles, les ultrasons, et repère ses proies grâce à l’écho. » | Vigie-Nature École : « trop aigus pour que l’oreille humaine les perçoive » ; ADW |
| `campagnol` | « Quand les campagnols sont nombreux, les rapaces… » | Miroir d’effraie, déjà 3 fois | « Pendant la belle saison, une femelle peut avoir une nouvelle portée environ toutes les trois à quatre semaines. » | ADW : « time between litters averages 25.15 days » (portée d’environ 5 petits en moyenne) |
| `marmotte` | « …siffle fort pour prévenir toute la famille, et l’hiver elles dorment ensemble. » | Singulier puis pluriel dans la même phrase ; copié en Q10 | « Une marmotte fait le guet et prévient sa famille par un sifflement aigu. L’hiver, la famille hiberne ensemble : en se serrant, les adultes réchauffent les jeunes. » | ADW : « parents and older offspring control the temperature of the young by cuddling close » |
| `fruits` | triple répétition | voir I-4 | « Le merle recrache les noyaux des cerises sauvages loin de l’arbre : c’est ainsi que de nouveaux cerisiers poussent. » | ADW : « seed dispersal of wild cherry trees… regurgitating the seeds » |
| `charognes` | « Vautours et gypaètes se partagent souvent la même carcasse. » | Non sourcé | à sourcer ou retirer ; piste : fiche INPN du gypaète (« régime composé presque exclusivement de restes osseux ») → « Le gypaète mange presque uniquement les os que les autres charognards laissent. » | INPN 441085 |

Déjà bons, à conserver : `faucon_pelerin` (tiercelet), `buse` (plumage variable), `aigle_royal` (nid réutilisé « pendant des décennies »), `vautour_fauve` (« plus d’un kilogramme » ; « plusieurs jours »), `gypaete` (os ; plumes orange), `moustique`, `pigeon_ramier` (avec la précision « en Europe centrale »), `fleurs`, `graines`, `herbes`.

---

## 6. Ce que j’ai vérifié et ce qui est conforme à l’étalon

- Ton : tutoiement chaleureux, phrases courtes (aucune phrase de plus de 26 mots ; 13 phrases de 21 à 26 mots, listées par le script : `faucon_hobereau` protect, `faucon_crecerelle` fun, `buse` description, `hirondelle` fun/protect/habitat, `martinet` fun/protect/habitat, `moineau` habitat, `merle` fun/protect). Ni condescendant ni jargonneux, sauf les points signalés (néonicotinoïdes, équarrisseurs, insectivore/granivore, plateformes de nidification).
- Cohérence `description` / `role` : pas de contradiction entre `role` et les 79 liens : tous les rapaces, insectivores et herbivores mentionnés dans `role` correspondent à un lien existant (relecture de l’ensemble des espèces animales).
- Textes de meta alignés sur l’étalon : `aideReseau`, `texteProducteur`, `texteRecyclage`, `quiz.expert`, `quiz.intro`, `carte.avertissement` (même structure, adaptée aux airs).
- `exemplesRecherche` : « faucon », « hibou », « insecte » renvoient bien des résultats (mots-clés `hibou` sur effraie et grand-duc ; groupe `Insectes`).
- Aucun conflit entre `short` et les noms dans les listes de quiz, sauf I-10.

## 7. Non vérifié

- Aires de répartition (`regions`) et leur cohérence scientifique : hors périmètre rédactionnel. Je n’ai pas audité en détail ; à relire avec un spécialiste. Un doute à confirmer : l’aigle royal est noté `alpes` + `mediterranee` seulement, alors qu’il niche aussi en Scandinavie (non vérifié ici).
- Les fiches INPN du faucon pèlerin, de l’épervier d’Europe, de la buse (PDF bio-scene), de l’aigle (plaquette), les pages ADW du pigeon ou du faucon crécerelle n’ont pas toutes été relues ligne à ligne. Seuls les faits listés ci-dessus ont été confrontés à leur source.
- Le `why` de la curiosité Q4 (cigogne : « courants d’air chaud pour planer ») est confirmé par ADW. L’affirmation « Beaucoup de cigognes partent » n’a pas été comparée à une source européenne sur les populations sédentaires d’Ibérie.
- La source primaire de l’étude sur les martinets (*Current Biology*, Hedenström et al.) n’a pas été ouverte : je m’appuie sur l’article de BirdGuides qui la résume ; à ajouter dans `sources` après vérification.
- Les 79 liens (qui mange quoi) n’ont pas été revérifiés un par un dans leurs sources : audit de contenu rédactionnel uniquement.
- Les silhouettes et cartes (`silhouettes.js`, `cartes.html`) : seules les chaînes de texte visibles du fichier cartes ont été relevées (aucun problème).
- Le rendu réel dans le navigateur n’a pas été testé (shell restreint) : les phrases de quiz ont été simulées à partir du code lu.

---

## 8. Verdict

**L’univers « les airs » n’est pas encore au niveau de savane et récif.**

Points forts : texte nettement plus riche et plus chaleureux que l’étalon, bon tutoiement, bonne couverture des champs, 5 humanInteractions bien sourcées, sources variées, `genre` / `elision` correctement renseignés pour les 29 animaux.

Mais trois points bloquent la publication : (1) trois animaux au pluriel qui cassent la grammaire du quiz et de l’interface, (2) une erreur scientifique sur « Criquets et sauterelles : herbivore », (3) la phrase d’accueil qui fait chasser l’abeille par le faucon. S’y ajoutent des faits non confirmés par leurs sources (mésange, hirondelle, guêpier, hobereau), 7 `fun` qui ne sont pas de vrais « Le savais-tu ? », 5 cartes « ressource » qui répondent à une autre question que leur titre, et un libellé « (en anglais) » faux sur 4 liens sur 5.

Après correction de B-1 à B-3 et I-1 à I-5 (modifications de texte, faisables sans toucher au code, hors I-2), l’univers atteindrait le niveau de l’étalon, voire le dépasserait sur la richesse et le ton.
