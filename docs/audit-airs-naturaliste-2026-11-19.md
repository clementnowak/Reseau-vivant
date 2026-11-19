# Audit naturaliste de l'univers « les airs » (univers/airs/donnees.js)

Date de l'audit : 19/11/2026. Aucun fichier du dépôt n'a été modifié.
Fichier audité : /home/claude/reseau-vivant/univers/airs/donnees.js (30 espèces ou ressources, 79 liens, 15 curiosités, 5 interactions humaines).
J'ai aussi lu la logique du quiz dans /home/claude/reseau-vivant/app.js (fonctions qWhoEats, qWhatEats, qPredatorFood, qDiet, qRegion), car certaines erreurs de données se transforment en questions fausses.

## 0. Méthode et limites

Vérifié en ligne (pages réellement ouvertes) : fiches INPN (vautour fauve, gypaète, guêpier, hobereau, effraie), page Grand Est sur le grand-duc, page du Parc du Vercors, PDF du PNR des Vosges du Nord, page LPO sur les hirondelles, communiqué LPO sur les vautours, page de la Commission européenne sur les néonicotinoïdes, Cornell (pigeon ramier, hirondelle rustique, chardonneret), ADW (hirondelle, martinet, pipistrelle, campagnol), oiseaux.net (pèlerin, épervier, étourneau, buse), BirdLife Birds in Europe (pèlerin), Wikipedia « Status and conservation of the golden eagle », EurekAlert (hobereau et pipistrelles), site suisse du gypaète, étude Shupova et al. sur les terriers de guêpier, étude Heleno 2011 (finches et dispersion).

Non vérifié ou seulement vérifié de mémoire (signalé « non vérifié » plus bas) : présence en montagne ('alpes') de l'épervier, de la buse, du moineau, de l'étourneau, du chardonneret et de la pipistrelle ; hivernage africain de la crécerelle et de la libellule empereur ; mesures exactes de dimorphisme de l'épervier ; stockage d'os par le gypaète ; plusieurs pages Wikipedia ont été refusées par l'outil de fetch (hors liste autorisée), je n'ai donc pas pu m'en servir.

Les exemples cités dans la demande :
- « vautour fauve plus d'un kilo » : VÉRIFIÉ, la fiche INPN dit « peut être supérieure à un kilogramme ». Pas de problème.
- « gypaète plumes orange » : VÉRIFIÉ, INPN : il se colore le plumage dans des sources et boues ferrugineuses, le ventre devient orangé (en Corse et en captivité il reste blanc). Pas de problème, une précision facultative est proposée.
- « étourneau imite » : VÉRIFIÉ (oiseaux.net : imitations de très nombreuses espèces). Pas de problème.
- « grand-duc revenu » : exact mais incomplet, voir G-1 (mineur).
- « hobereau » : une vraie imprécision, voir H-1.
- « pipistrelle quelques grammes » et « moineau 70 espèces » : ces phrases ne figurent plus dans les données actuelles. Si elles reviennent : pipistrelle commune 3,5 à 8 g (ADW), exact.
- « pigeon ramier en ville depuis 1800 » : sourcé mais sur-généralisé, voir P-1 (mineur).

## 1. Synthèse

- Bloquant : 0.
- Important : 9 (noms de régions manquantes pour le pèlerin, l'aigle royal, le pigeon ramier ; criquets/sauterelles ; chardonneret « dissémine » ; date de disparition du gypaète dans les Alpes ; liens « papillons de nuit » douteux ; lien hirondelle → libellule ; titre de chaîne d'accueil à nuancer).
- Mineur : une vingtaine de reformulations (surtout des promesses trop fortes du type « régule », « presque uniquement », « empêche »).
- Points forts : taxonomie correcte, quiz « Afrique » sûr, curiosités bien choisies, interactions humaines fidèles aux sources.

## 2. Noms français et scientifiques

Tous les noms scientifiques sont corrects et à jour (Carduelis carduelis reste valide chez IOC/CAF ; Tyto alba correct pour l'Europe ; Cyanistes caeruleus correct).

| Id | Existant | Remarque | Gravité |
|---|---|---|---|
| grand_duc | « Hibou grand-duc » | Nom officiel français : « Grand-duc d'Europe » (« Hibou grand-duc » reste très courant). Proposition : `"name": "Grand-duc d'Europe"` ; `short` « Grand-duc » inchangé. | mineur |
| chouette_effraie | « Chouette effraie » | Nom officiel : « Effraie des clochers » ; « chouette effraie » est courant. Garder, mais ajouter « effraie des clochers » dans `keywords` (déjà « dame blanche »). | mineur |
| libellule | « Libellule empereur » | Nom courant : « Anax empereur » (ou « Empereur bleu » pour le mâle). Proposition : `"name": "Anax empereur"` (le champ `genre` passe à "m", `elision` à true). Si vous gardez « Libellule empereur », OK. | mineur |
| papillon_nuit | « Papillons de nuit (noctuelles) » + scientific « Noctuidae » | « Papillons de nuit » et noctuelles ne sont pas synonymes (les noctuelles ne sont qu'une famille). Proposition : `"name": "Noctuelles (papillons de nuit)"`. | mineur |
| criquet | « Criquets et sauterelles » + Orthoptera | Voir C-1 : deux familles au régime différent. | important |

## 3. Descriptions, rôles, curiosités, protection, régime, habitat

### C-1 — criquet (Criquets et sauterelles) — IMPORTANT
- Existant : `"diet": "Herbivore"`, nom « Criquets et sauterelles », source ADW Acrididae.
- Problème : les criquets (Acrididae) sont herbivores, mais beaucoup de sauterelles (Tettigoniidae, par exemple la grande sauterelle verte) mangent surtout des insectes, dont des chenilles. Le régime « herbivore » est donc faux pour la moitié du nom, et il alimente le quiz : qWhatEats prend les espèces dont le régime commence par « herbivore » puis propose en leurres des insectes comme la chenille ou le moustique. Une question « Que mange le criquet ? » avec un leurre « chenille » peut donc être fausse pour une sauterelle.
- Correction proposée (la plus simple) : ne parler que des criquets.
  - `"name": "Criquets"`, `"short": "Criquets"`, `"scientific": "Acrididae"`
  - `"description": "Des insectes sauteurs aux pattes arrière puissantes, qui vivent dans l’herbe et « chantent » en frottant leurs pattes contre leurs ailes."`
  - `"role"` : « Ils mangent des herbes et nourrissent des oiseaux comme la cigogne, l’étourneau ou le guêpier. » (inchangé)
  - `"fun": "Les mâles font leur chant en frottant leurs pattes arrière contre leurs ailes."`
  - garder « sauterelle » dans `keywords` pour la recherche.
- Alternative : conserver le nom large mais changer `diet` en « Principalement herbivore » (dietKind le reconnaît encore, mais le quiz reste fragile pour les leurres insectes).

### F-1 — faucon_pelerin — mineur
- « il régule les populations de pigeons, d’étourneaux et d’autres oiseaux » : « régule » est trop affirmatif (la prédation du pèlerin n'est pas démontrée comme régulatrice à l'échelle des populations de proies).
- Remplacement de `role` : « Super-chasseur du ciel : il capture en plein vol des pigeons, des étourneaux et d’autres oiseaux. »
- `fun` (tiercelet « un tiers plus petit ») : cohérent avec oiseaux.net (« male, 1/3 smaller »). Précision facultative : « environ un tiers plus petit (et plus léger) que la femelle ». Les régions : voir section 4.

### H-1 — faucon_hobereau — mineur
- `description` : « à la silhouette de grande hirondelle » ; la fiche INPN citée dit « la silhouette d’un grand martinet ».
- Remplacement : « Un faucon élancé, aux ailes effilées, à la silhouette de grand martinet, qui revient d’Afrique au printemps. »
- `role` : « et limite leurs populations » est trop fort. Remplacement : « Il chasse les libellules et les petits oiseaux en vol : un acrobate du ciel d’été. »
- Vérifié : migrateur, hivernage en Afrique (INPN : Afrique australe) ; capture de chauves-souris « régulière » (INPN) et observation de huit pipistrelles en une demi-heure (EurekAlert 2026) ; libellules et hirondelles/martinets (Woodland Trust).

### E-1 — epervier — mineur
- `role` : « ce qui évite qu’une seule espèce ne devienne trop nombreuse » : conséquence écologique affirmée sans preuve. Remplacement : « Il chasse de petits oiseaux en les surprenant entre les arbres et les haies. »
- `fun` : « La femelle est environ un tiers plus grande que le mâle, ce qui les empêche de chasser les mêmes proies. » Source oiseaux.net : femelle « noticeably larger », elle prend des proies plus lourdes (grives, pigeons ramiers). Remplacement : « La femelle est nettement plus grande que le mâle : elle chasse des proies plus grosses, comme des grives ou des pigeons, et le couple se partage ainsi le gibier. » (le « tiers » n'est pas confirmé par la source ; le poids de la femelle est en réalité proche du double de celui du mâle, valeur de mémoire non vérifiée ici).

### GD-1 (G-1) — grand_duc — mineur
- `fun` : « Il est revenu dans beaucoup de régions grâce à la protection » : vrai mais il manque la cause principale citée par la fiche Grand Est : les lâchers massifs en Allemagne voisine, et le creux du milieu du XXe siècle (moins de 100 couples connus en France en 1976).
- Remplacement : « Il avait presque disparu de plusieurs régions. Grâce à la protection (et à des lâchers en Allemagne voisine), il est revenu, et il peut nicher jusqu’en montagne. »
- Vérifié : plus grand hibou d'Europe ; nidification jusqu'à 2 100 m dans les Alpes ; absent des îles Britanniques (cohérent avec la région « atlantique » = France/Espagne) ; mange d'autres rapaces.
- Lien grand_duc → campagnol : voir section 5.

### V-1 — vautour_fauve — mineur
- `description` : « au cou presque nu ». La fiche INPN décrit un duvet blanchâtre court sur la tête, une collerette (brune chez le jeune) et deux plages de peau bleue nue à la base du cou. Remplacement : « Un grand vautour brun clair, à la tête et au long cou couverts d’un fin duvet blanc, qui plane en groupe au-dessus des falaises. »
- `fun` « plus d’un kilo… plusieurs jours sans manger » : VÉRIFIÉ, INPN : « peut être supérieure à un kilogramme » ; « peuvent jeûner plusieurs jours consécutifs ». Garder.

### GY-1 — gypaete — mineur (facultatif)
- `fun` « colore ses plumes du ventre en orange » : VÉRIFIÉ (INPN). Précision utile pour éviter l'idée d'une couleur naturelle : « Il lâche les gros os sur les rochers pour les briser, et il se baigne dans des sources riches en fer, qui colorent en orange les plumes de son ventre. »
- À propos de « lâcher les os de haut » : la fiche INPN dit seulement qu'il casse les os sur des pierriers ; le fait de les lâcher de haut est bien connu, mais je ne l'ai pas vérifié sur une page ouverte ici.

### PR-1 (P-1) — pigeon_ramier — mineur
- `fun` : « D’abord oiseau de forêt, il s’est installé en ville depuis le début des années 1800. » La source Cornell dit : « In this region [Central Europe] they started colonizing urban areas by the early 1800s » et ils continuent de coloniser de nouvelles villes dans le sud et l'est de l'Europe au XXIe siècle. L'énoncé est donc sourcé mais généralisé à toute l'Europe.
- Remplacement : « D’abord oiseau de forêt, il s’est installé dans les villes d’Europe centrale dès le début des années 1800, et il continue de conquérir de nouvelles villes. »
- Régions : voir section 4 (région « nord » manquante).

### CH-1 — chardonneret — IMPORTANT (formulation écologique fausse) + mineur
- `role` : « Il mange des graines de plantes sauvages, comme celles des chardons, et les dissémine. »
- Problème : le chardonneret est avant tout un prédateur de graines (il les décortique). La dispersion intacte par les fringillidés est possible mais anecdotique : dans l'étude Heleno 2011, le chardonneret n'apparaît que dans 11 fientes analysées, dont une seule avec une graine entière. La source citée (plaquette OFB) ne dit rien de la dispersion.
- Remplacement : « Il se nourrit surtout de graines de plantes sauvages, comme celles des chardons, et ses petits reçoivent aussi des chenilles. » (l'OFB : « essentiellement granivore, il mange aussi des chenilles »).
- `diet` : « Granivore » est correct pour l'adulte ; mention des chenilles possible : « Granivore (et chenilles pour les jeunes) ».

### M-1 — mesange_bleue — mineur
- `fun` et curiosité : « les poussins en mangent presque uniquement » : la source LPO du Ventoux dit seulement que les chenilles sont des proies « importantes ». « presque uniquement » est une exagération (araignées et autres insectes comptent aussi).
- Remplacement `fun` : « Pour nourrir ses petits, elle chasse surtout des chenilles : ses parents en rapportent des centaines chaque jour au nid. »
- Remplacement `why` de la curiosité : « Les poussins mangent surtout des chenilles : leurs parents en rapportent des centaines. »
- `habitat` : « jusqu’à environ 1 200 m » correspond au Mont Ventoux ; la même fiche donne 2 250 m en PACA. Remplacement : « en montagne jusqu’à plus de 2 000 m dans le sud des Alpes ».

### MA-1 — martinet — mineur
- `fun` et curiosité : « il se pose seulement pour nourrir ses petits ou dormir au nid » : vrai pendant la nidification (ADW : atterrit pour nourrir les jeunes ou dormir la nuit) mais ne décrit pas les mois d'hivernage. Hors reproduction, les martinets noirs restent en vol près de 10 mois et dorment probablement en vol (étude Hedenström 2016, communiqué EurekAlert).
- Remplacement du `why` de la curiosité : « Il passe presque toute sa vie en vol : il se pose surtout pour nicher et nourrir ses petits, et pendant des mois en Afrique il reste même en vol, nuit comprise. »
- `protect` : « évite de les déranger de mars à octobre » : le martinet n'est là que de fin avril/début mai à août (ADW : fin avril–début mai à mi-septembre pour l'envol). Remplacement : « … et évite de les déranger de mai à août. »

### PI-1 — pipistrelle — mineur
- `role` : « Elle mange des moustiques et des papillons de nuit » : ADW dit « mosquitos, small moths and other insects ». C'est correct ; les proies principales de la pipistrelle sont des petits diptères (moucherons, moustiques). Remplacement facultatif : « Elle mange surtout des moustiques et des moucherons, et parfois des papillons de nuit. »

### PN-1 — papillon_nuit — mineur
- `fun` : « Beaucoup de papillons de nuit volent la nuit, quand les chauves-souris les chassent. » Tautologique. Remplacement : « Beaucoup de papillons de nuit entendent les cris des chauves-souris et plongent vers le sol pour leur échapper. » (comportement de défense bien documenté chez les noctuelles ; non vérifié sur une page ouverte ici).

### MO-1 — moustique — correct
Vérifié : seules les femelles piquent, les mâles se nourrissent de nectar.

### CA-1 — campagnol — correct
ADW : herbivore ; répartition du nord de l'Espagne au sud de la Finlande (la région « mediterranee » exclue est acceptable).

## 4. Régions (champ `regions`)

### Afrique (hivernage) — résultat : AUCUNE erreur, quiz sûr
- Espèces avec 'afrique' : hirondelle, martinet, cigogne, guêpier, hobereau. Toutes vérifiées (hirondelle : quartiers d'hiver africains selon LPO ; martinet : Afrique centrale/australe ; guêpier, hobereau : Afrique ; cigogne : une grande partie des populations, nuancé par « beaucoup » dans le texte).
- Aucune espèce sans 'afrique' dans la liste `non` du quiz n'hiverne en Afrique : marmotte (hiberne), campagnol, grand-duc, aigle royal, moineau, effraie : tous sédentaires. Les leurres du quiz sont donc réellement faux.
- Cas limites, à décider (non bloquants) : 
  - Chardonneret : sa source OFB dit qu'il « préfère passer l’hiver dans le sud de la France et au Maghreb ». Étourneau : oiseaux.net signale de grands rassemblements hivernaux au Maghreb. Épervier : oiseaux.net dit que « seul un petit nombre traverse la Méditerranée ». Ces trois espèces sont partiellement migratrices vers le Maghreb, pas vers l'Afrique subsaharienne. Le libellé de la région est « Afrique (où ils passent l’hiver) » : le choix actuel (n'inscrire que les migrateurs transsahariens) est cohérent, il suffit de l'assumer. Si vous voulez rester prudent, ajoutez dans `meta.regions.afrique.nom` : « Afrique (où beaucoup passent l’hiver) ».
  - Crécerelle, buse, libellule empereur : populations nordiques partiellement migratrices ; non vérifié.

### Régions manquantes à tort (important)
| Id | Existant | Correction proposée | Preuve |
|---|---|---|---|
| faucon_pelerin | atlantique, mediterranee, alpes | `["atlantique","nord","mediterranee","est","alpes"]` | BirdLife Birds in Europe : nicheur en Suède (85 à 100 couples), Finlande (120 à 150), Norvège (350 à 500), Allemagne (620 à 640), Pologne (5 à 8), Roumanie (8 à 15) |
| aigle_royal | alpes, mediterranee | `["atlantique","nord","mediterranee","est","alpes"]` | Norvège 860 à 1 040 couples, Finlande 300 à 350, Écosse/Grande-Bretagne 442 territoires (2003), Espagne environ 1 300 couples, Carpates (Roumanie 85 à 130), Pologne, Bulgarie, Russie d'Europe |
| pigeon_ramier | atlantique, mediterranee, est | `["atlantique","nord","mediterranee","est"]` | Wikipedia (page accessible) : migrateur dans les parties nord et est de l'Europe, donc nicheur dans le nord |

Habitat de l'aigle royal à ajuster aussi : « Montagnes rocheuses » devient « Montagnes et grands espaces sauvages (Alpes, Pyrénées, Scandinavie, Écosse) : il niche surtout sur des falaises, parfois dans un arbre. » Sinon la fiche affiche le nord de l'Europe sans que le texte l'explique.

### Montagnes ('alpes') — à arbitrer
- Cohérents et vérifiés : pèlerin (jusqu'à environ 2 000 m dans les Alpes, oiseaux.net), grand-duc (2 100 m), gypaète (900 à 2 550 m pour les nids), vautour fauve (Pyrénées, Baronnies, Verdon), aigle royal, marmotte, mésange (jusqu'à 2 250 m en PACA), crécerelle.
- Hobereau sans 'alpes' : cohérent avec INPN (absent des zones les plus élevées des Alpes et des Pyrénées).
- Effraie sans 'alpes' : cohérent avec INPN (absente des zones montagneuses, reproduction jusqu'à 1 500 m dans les Hautes-Alpes).
- Possiblement manquantes (non vérifié, forte probabilité) : épervier, buse, moineau, étourneau, chardonneret, pipistrelle (tous nichent dans les vallées et forêts de montagne). Je ne recommande pas de les ajouter sans source ; à ajouter seulement si la carte « Montagnes » doit refléter la nidification en vallée.

## 5. Relations (links)

Chiffre vérifié : 79 liens, 6 liens marqués `rare` (le nombre annoncé dans `validation.links` est exact).

### L-1 — étourneau → papillon_nuit, guêpier → papillon_nuit — IMPORTANT (à supprimer ou marquer rare)
- Les « noctuelles » volent surtout la nuit, l'étourneau et le guêpier chassent de jour. La source de l'étourneau (biokids) est générale (insectes), celle du guêpier (Birds of the World) aussi, et la fiche INPN du guêpier ne cite pas les papillons. L'étourneau a déjà le lien réaliste « étourneau → chenille ».
- Correction : supprimer `etourneau → papillon_nuit` ; mettre `"rare": true` sur `guepier → papillon_nuit`.

### L-2 — hirondelle → papillon_nuit, libellule → papillon_nuit — mineur
- Même logique (proies nocturnes pour des chasseurs diurnes ou crépusculaires). Cornell cite bien « butterflies, moths » dans le régime de l'hirondelle, mais en faible proportion. Correction : ajouter `"rare": true` sur `hirondelle → papillon_nuit`. Garder `libellule → papillon_nuit` (l'Anax chasse au crépuscule), éventuellement `rare`.

### L-3 — hirondelle → libellule — IMPORTANT (marquer rare)
- ADW cite « dragonflies » dans le régime de l'hirondelle, mais l'espèce figurant ici est l'Anax empereur, qui mesure environ 10 cm d'envergure : trop grosse pour une hirondelle de 19 g en proie courante (seuls de petits odonates sont plausibles). Correction : `"rare": true`. Les liens guêpier → libellule et hobereau → libellule sont, eux, bien réels (INPN).

### L-4 — grand_duc → campagnol — mineur (source)
- La source citée (Luberon, Penteriani) ne contient que le « campagnol terrestre » (autre espèce, 0,8 % des proies, soit environ 4 sur 502) ; le régime y est dominé par le lapin, les rats, le hérisson, les oiseaux. Le lien reste vrai ailleurs en Europe (la fiche Grand Est : « surtout des rongeurs »). Correction : remplacer la `source` de ce lien par https://www.grand-est.developpement-durable.gouv.fr/IMG/pdf/hibou_grand-duc_cle25c532.pdf (déjà source de l'espèce), ou ajouter `"rare": true`.
- Les liens grand_duc → buse / crécerelle sont marqués `rare` à bon droit (rapaces 1,2 % dans l'étude Luberon).

### L-5 — chouette_effraie → étourneau, chouette_effraie → moineau — mineur
- INPN : les campagnols, les muridés et les musaraignes forment l'essentiel du menu (plus de 95 pour 100 des proies) ; les passereaux sont marginaux. Correction : `"rare": true` sur `chouette_effraie → etourneau` ; `chouette_effraie → moineau` peut rester (le moineau est l'oiseau le plus souvent trouvé dans les pelotes), mais c'est la limite.

### L-6 — faucon_pelerin → chardonneret — mineur
- Possible (le pèlerin est opportuniste) mais marginal : oiseaux.net dit que les mâles prennent « de la taille d’une mésange jusqu’à un geai ou un pigeon biset » et les femelles de la taille du merle au pigeon ramier. Correction : `"rare": true` sur `faucon_pelerin → chardonneret`.

### L-7 — chaîne de l'accueil (chaineHero) — mineur
- `hirondelle → abeille` est vrai (Cornell : abeilles, guêpes, fourmis parmi les proies) mais l'hirondelle mange surtout des mouches. Un enfant peut en déduire que l'hirondelle est un grand prédateur d'abeilles. Option : remplacer la chaîne par faucon_pelerin → martinet → moustique → fleurs (liens tous existants, moustique → fleurs = mâles), ou garder la chaîne avec une phrase : « l'hirondelle attrape surtout des mouches, parfois une abeille ».

### Proies manquantes évidentes
Aucune proie majeure d'une espèce du jeu n'est absente parmi les espèces présentes. Absences structurelles (espèces qui n'existent pas dans le jeu) : mulots et musaraignes (effraie, buse), lapin et hérisson (grand-duc, aigle), mouches (hirondelle, martinet), vers de terre et grenouilles (cigogne, merle). Pas à corriger, mais les textes doivent rester prudents sur « surtout » (ex. `chouette_effraie` : « surtout des campagnols » est exact en France sauf sur le pourtour méditerranéen où les mulots dominent).
Ajouts facultatifs bien documentés : `faucon_pelerin → merle`, `faucon_pelerin → mesange_bleue` (femelle : taille du merle ; mâle : taille de la mésange, oiseaux.net) ; `faucon_hobereau → etourneau` (INPN : étourneaux cités) ; `faucon_hobereau → moineau` (documenté ailleurs, non vérifié ici). La source de `faucon_hobereau → pipistrelle` (EurekAlert) est solide ; INPN dit que la capture de chauves-souris est « régulière », donc on pourrait retirer `rare`, mais il vaut mieux le garder pour ne pas en faire une question de quiz.

### Sens trophique
Tous les liens ont le bon sens (eater mange food). Les types sont cohérents : charognage pour les charognes, broutage pour les herbes, vegetaux pour graines/fruits/fleurs.

## 6. Quiz

### Question de région (presence « afrique »)
- Bonne réponse : correcte pour les cinq `oui` ; leurres réellement faux pour les six `non`. Texte `pourquoi` exact (« ne quittent pas l’Europe en hiver »). Rien à changer.

### Les 15 curiosités
| # | Question | Verdict | Remarque |
|---|---|---|---|
| 1 | gypaète et os | OK | Réponse vraie ; leurres « enterre », « jouer » faux (INPN ne mentionne pas de stockage ; non vérifié ailleurs) |
| 2 | crécerelle Saint-Esprit | OK | Leurres faux |
| 3 | tiercelet | OK | « un tiers plus petit » confirmé par oiseaux.net |
| 4 | cigogne | OK | « Beaucoup de cigognes » prudent |
| 5 | martinet | OK, précision | Voir MA-1 pour le `why` |
| 6 | hirondelle en vol | OK | Leurres faux |
| 7 | mésange | OK, correction du `why` | « presque uniquement » → « surtout » (M-1) |
| 8 | guêpier et berge | OK | « D’autres oiseaux réutilisent ses vieux terriers » : confirmé par la littérature (mésanges, moineaux friquets, gobemouches, rougequeues, étourneau occupent d'anciens terriers de guêpier), mais pas par la fiche INPN citée ; changer l'attribution de la source si possible |
| 9 | pipistrelle | OK | Leurre « elle voit très bien » : les pipistrelles voient, mais s'orientent au son ; acceptable |
| 10 | marmotte | OK | Comportement de guet documenté |
| 11 | effraie | OK | Fonctionnement vrai (réponse numérique aux proies) |
| 12 | chardonneret | OK | OFB : « son nom provient de la plante dont il raffole » |
| 13 | abeille | OK | |
| 14 | hobereau | À reformuler | Voir ci-dessous |
| 15 | étourneau | OK | Imitation vérifiée ; leurres faux |

Curiosité 14 (hobereau) — mineur : `why` « mais pas les animaux restés au sol » est trop absolu (INPN : micromammifères « occasionnels » ; chauves-souris capturées régulièrement). Le leurre « Un campagnol » n'est donc pas totalement faux dans la nature, il est seulement impossible « en plein vol ».
Remplacement du `why` : « Le hobereau est un chasseur acrobate : il attrape en plein vol des libellules, des hirondelles et des martinets. Une marmotte est bien trop lourde pour lui, et il chasse très rarement des animaux restés au sol. »
Si vous voulez un leurre irréprochable, remplacez « Un campagnol » par « Un poisson ».

### Autres questions fabriquées par le code (qWhoEats, qWhatEats, qPredatorFood, qDiet)
- Leurres « vertébré » (marmotte, pigeon ramier, chardonneret : « mangent des plantes ou des graines ») : vrais pour des proies vertébrées. Aucun problème.
- Leurres « invertébré » (aigle royal, vautour fauve, gypaète, grand-duc : « pas d’insectes ») : acceptables. Le grand-duc avale parfois de gros insectes (rare) mais aucun lien ne le dit.
- qWhatEats : voir C-1 pour criquet.
- qDiet : moineau et étourneau « omnivores » corrects ; cigogne et libellule « carnivores » corrects.
- qPredatorFood (grands chasseurs / petites proies) : grands chasseurs aigle royal, grand-duc, pèlerin, buse, petites proies moustique et abeille : fidèle (la buse variable ne mange pas d'abeilles).

## 7. humanInteractions

| Espèce | Verdict | Détail |
|---|---|---|
| faucon_pelerin | Fidèle | PNRVN : disparu des Vosges du Nord « dès le début des années 1970 » ; causes DDT, braconnage et désairage ; retour de la reproduction dans les années 1980 après interdiction du DDT et surveillance par des associations. Seule nuance : le texte résume « désairage par des fauconniers » en « braconniers prenaient aussi leurs jeunes » : acceptable. Titre « Le DDT chasse le faucon pèlerin » peut se lire « chasse = fait fuir » ; un titre plus clair : « Le DDT fait disparaître le faucon pèlerin ». |
| gypaete | CORRECTION (important) | Existant : « avait disparu de tout l’arc alpin à la fin du XIXe siècle ». La page du Vercors le dit en effet, mais le dernier gypaète alpin abattu documenté l'a été en 1913 dans le Val d'Aoste (site suisse du programme de réintroduction). Remplacement : « Le gypaète barbu avait disparu de tout l’arc alpin au début du XXe siècle : le dernier oiseau connu a été abattu en 1913. Depuis 2010, le Parc du Vercors lâche des jeunes oiseaux nés en élevage. En 2022, un poussin né dans la nature s’est envolé : c’était la première reproduction sur le Vercors depuis plus de 140 ans. » Les autres faits (lâchers depuis 2010 ; première reproduction en 2022 depuis plus de 140 ans) sont fidèles à la page du Parc. |
| abeille | Fidèle | La Commission européenne : trois néonicotinoïdes (imidaclopride, clothianidine, thiaméthoxame), tous les usages en plein air interdits en 2018, seuls les serres permanentes restent possibles. |
| hirondelle | Fidèle, une nuance | LPO : destruction de nids facteur « important du déclin alarmant » ; elles ont « tendance à revenir aux mêmes nids ». « Chaque année, beaucoup de nids… » n'est pas un chiffre de la source. Remplacement : « Des nids d’hirondelles sont détruits ou déplacés, pour des travaux ou pour éviter les crottes. » |
| vautour_fauve | Fidèle, une nuance | Communiqué LPO 2025 : les vautours (pluriel, toutes espèces) « avaient presque disparu de l’Hexagone, victimes de leur mauvaise réputation et de la raréfaction du pastoralisme extensif » ; programmes « depuis plus de quarante ans » ; service « gratuit et écologique » pour les éleveurs. Le texte écrit « le vautour fauve », la source parle des vautours en général : remplacement conseillé « Les vautours avaient presque disparu de France, notamment à cause de leur mauvaise réputation et de la fin de l’élevage en plein air extensif. » Le champ `region` « France (Grands Causses) » ne vient pas de la source (communiqué national) : écrire « France ». |

## 8. Divers (mineurs)

- `meta.comprendre.cartes` : « des oiseaux comme l’hirondelle et la cigogne partent vers l’Afrique » après « Quand les insectes disparaissent l’hiver » : la cigogne mange surtout des campagnols et des insectes, la raison est vraie pour l'hirondelle et le martinet. Remplacement : « … des oiseaux comme l’hirondelle et le martinet partent vers l’Afrique… ».
- `epervier.fun` et `pigeon_ramier.role` : « il est une proie du faucon pèlerin et du grand-duc » omet l'épervier (qui est dans les liens). Facultatif.
- `aideReseau` : correct.

## 9. Verdict

L'univers « les airs » est au niveau de « savane » et « récif » pour la structure, les sources et le quiz « Afrique », et il est même plus rigoureux sur le plan des citations (79 liens, chacun avec une source ; nombre annoncé exact). Il n'est pas encore au même niveau sur trois points qui relèvent du fond :
1. cartes de répartition incomplètes pour le faucon pèlerin, l'aigle royal et le pigeon ramier (corrections `regions` de la section 4, trois lignes à changer) ;
2. criquets/sauterelles (renommer en « Criquets ») et lien « dissémine » du chardonneret ;
3. un fait historique à corriger (gypaète, 1913) et quatre liens « papillons de nuit » ou « libellule » à rendre rares ou à supprimer.
Après ces corrections (aucune n'est bloquante, toutes sont de petites modifications de texte ou de tableau), je le déclare au niveau des deux univers de référence. Les reformulations « mineur » peuvent suivre dans un second temps.

Priorités pour la session principale : (1) régions pèlerin/aigle/pigeon ; (2) criquet ; (3) chardonneret ; (4) gypaète humanInteraction ; (5) liens L-1 à L-3 ; (6) reste.
