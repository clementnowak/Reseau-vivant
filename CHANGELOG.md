# Journal des versions

## Non publié
- Page « Les coulisses » condensée (de 19 à 14 Ko) : décisions réduites à cinq, cycle de travail et historique retirés, apprentissages et test en une ligne chacun, tuile « 7 jours » ajoutée.
- Polices : Inter (texte) et Lora (titres) sont hébergées sur le site (6 fichiers, 181 Ko au total, licence SIL OFL), sans appel à un service externe : même rendu sur tous les appareils, y compris sur Android, qui n’embarque généralement pas Georgia.

## 4.0.0 — Refonte visuelle et page « Les coulisses »
- Identité visuelle : titres en serif avec le mot clé en italique, surfaces claires, une palette par univers (savane : sable, acacia, terre ; récif : écume, bleu profond, corail). Relief réservé aux réponses du quiz et aux filtres.
- Accueil : le décor dessiné est remplacé par une chaîne d’exemple, lue du plus fort au plus faible comme la frise « Comprendre » ; les flèches montrent le chemin de l’énergie. Nouveau bouton « Jouer au quiz ».
- Nouvelle page `coulisses.html` (lien dans le pied de page) : démarche, décisions de produit, rôle de l’IA, ce qui est vérifié ou non, apprentissages, protocole du test avec des enfants, historique. Ses chiffres sont comparés aux données par le vérificateur.
- Le vérificateur contrôle aussi la chaîne de l’accueil. Le test de parcours visite la page des coulisses.
- Poissons du récif : silhouettes PhyloPic pour 8 d’entre eux (poisson-clown, papillon, ange, poisson-lion, murène, baliste, demoiselle, mérou), car l’émoji poisson était le même pour presque tous.
- Savane : silhouettes pour les 10 antilopes (toutes avaient le même émoji de cerf), le guépard, le léopard, le serval, le caracal, le chacal, le renard à oreilles et le protèle. 36 espèces au total ont une silhouette.
- Pangolin : retour à l’émoji, la silhouette ressemblait à un serpent en petit format.
- Sources : Toutes les relations alimentaires (209) citent maintenant leur source ; les 24 relations impossibles à sourcer ont été retirées. Les sources viennent surtout d’Animal Diversity Web, de FishBase, de la NOAA et d’articles scientifiques. Quand la source reste générale (« rongeurs », « lièvres »), elle est acceptée. Le suricate est retiré de la savane : aucune source acceptable pour ce qu’il mange.
- Revue produit et rédaction : fiches de la savane réécrites pour 8-16 ans (10 rôles, 4 consignes de protection), textes plus concrets au récif, régimes expliqués (« Détritivore (mange des restes de plantes) »), habitats précisés pour 6 espèces du récif.
- Corrections scientifiques : rhinocéros noir (il mange surtout des feuilles), mérou et murène (chasse en équipe), étoile couronne d’épines et triton, plancton et oxygène, algues (crampon), holothurie.
- Quiz : « Menus et cartes » devient « Régimes et régions », la bonne réponse est rappelée en toutes lettres, les régimes « à dominante » ne sont plus posés, leurres plus plausibles, question sur le plus grand oiseau du monde.
- Interface : accroche « Qui mange qui ? » sous le titre de chaque univers, espaces insécables avant ? ! : ; sur les fiches, étiquettes de sources lisibles (Animal Diversity Web, FishBase…), texte d’aide des silhouettes plus honnête.
- Page coulisses : signature et lien vers le site en haut de page, ligne « coût de fonctionnement 0 € », trois audits au lieu de deux (appareils simulés), affirmations alignées sur ce que le code fait vraiment, menu lisible sur mobile.

## 3.2.1
- Retour aux émojis pour tous les animaux qui ont un émoji représentatif. Les silhouettes ne sont gardées que pour 15 espèces sans émoji correspondant : hyène, oryctérope, autruche, suricate, pangolin, porc-épic, outarde kori, bucorve (savane) ; anémone, oursin, étoile de mer épineuse, holothurie, raie manta, hippocampe, dugong (récif).

## 3.2.0
- Savane : 28 relations ajoutées avec source pour 11 animaux qui n'avaient aucun prédateur (léopard, suricate, pangolin, serval, caracal, ratel, protèle, renard à oreilles de chauve-souris, outarde kori, bucorve, serpentaire).
- Récif : 3 relations « parfois » désormais sourcées et marquées rares.
- Tests automatiques GitHub Actions (cohérence des données + parcours complet) ; `npm test` en local.
- Checklist `docs/ajouter-un-univers.md` pour préparer « les airs ».
- Silhouettes ajoutées : léopard, éléphant, corail dur, anémone, holothurie (CC0). Seuls gnou, python, éland, springbok, triton, crocodile, hippotrague, cobe, termite et éponge gardent leur emoji.

## 3.1.0 — Vraies silhouettes et confort
- Silhouettes d’illustrateurs (PhyloPic, domaine public) à la place des émojis pour 39 animaux de la savane et 22 du récif ; l’émoji reste pour les autres. Crédits : `docs/credits-silhouettes.md`.
- Recherche plus tolérante (par exemple « mante » trouve la raie manta, « cheval de mer » l’hippocampe).
- Filtres sur deux lignes sur grand écran, logo plus facile à toucher, couleur de la barre du navigateur selon l’univers.

## 3.0.1 — Audit de conformité
- Dugong : la vache (🐄) est remplacée par un phoque (🦭), en attendant de vraies illustrations.
- Ordinateur : la carte de l’animal central ne reste plus collée en haut de l’écran.
- Bouton Retour : revient à l’univers précédent ; une adresse d’animal inconnue est corrigée.
- Contraste du titre de section légèrement renforcé ; tortue imbriquée : affirmation nuancée.
- Rapport complet et plan d’action : `docs/audit-conformite-2026-11-17.md`.

## 3.0.0 — Deuxième univers : le récif corallien
- Nouvel univers « récif corallien » : 27 animaux, 5 ressources, 57 liens alimentaires, 14 questions « Drôles de bêtes », cartes des grandes régions de récifs (mer Rouge, océan Indien, Triangle de corail, Australie, îles du Pacifique, Caraïbes).
- Bascule Savane / Récif en haut du site ; couleurs et décor propres à chaque univers.
- Architecture multi-univers : un dossier par univers, un registre, chargement à la demande. Prévue pour un 3e univers (les airs) et au-delà.
- Les textes, filtres, chaîne d’exemple, réglages des quiz et accords grammaticaux sont désormais dans les données de chaque univers, plus dans le code.
- Adresses partageables `#univers/animal`, compatibles avec les anciens liens.

## 2.2.1 — Retrait des silhouettes
- Les silhouettes dessinées à la main de la 2.2.0 sont retirées (peu ressemblantes) ; retour aux émojis en attendant des illustrations de meilleure qualité.
- Mentions légales : éditeur ajouté (conservé).

## 2.1.0 — novembre 2026

Corrections issues d'un audit indépendant (iPhone SE, iPhone 13 et ordinateur) : voir [`docs/audit-independant-2026-11-13.md`](docs/audit-independant-2026-11-13.md).

- Quiz : réponses mélangées, leurres plausibles, liens rares exclus, quiz des régions limité aux espèces dont l'aire est certaine.
- Français : accords au féminin, « résultats » au lieu de « animalaux », vocabulaire adapté aux enfants.
- Données : six aires de répartition et deux anecdotes corrigées ; mots-clés pour la recherche (« antilope », « singe »…).
- Accessibilité : focus clavier, puces cachées non tabulables, cibles de 44 px, contrastes de la carte.
- Partage : un lien vers un animal ouvre son réseau ; image d'aperçu pour les réseaux sociaux.
- Animal d'accueil : le zèbre.

## 2.0.0 — novembre 2026

Refonte complète, pensée d’abord pour le téléphone.

- **Mobile first** : feuille de style réécrite. Le réseau s’affiche verticalement (prédateurs en haut, nourriture en bas) au lieu d’une frise à faire glisser.
- **Cartes** : une carte du monde situe l’Afrique, puis une carte de l’Afrique colorie les régions où vit l’animal. L’ancienne carte schématique à 5 couleurs est supprimée.
- **Données** : 50 animaux reliés au réseau (au lieu de 20 ; 30 fiches n’avaient aucun lien). 149 liens alimentaires. Anecdotes réécrites pour les 8-16 ans. Deux liens douteux retirés.
- **Quiz** : trois nouveaux quiz centrés sur les animaux (« Qui mange qui ? », « Drôles de bêtes », « Menus et cartes »), en partie générés à partir des données, avec un lien vers la fiche de l’animal après chaque réponse.
- **Lisibilité** : l’avertissement scientifique placé sous le réseau est déplacé dans « Sources et limites du site », en bas de page.
- **Performance** : logo allégé de 733 Ko à 7 Ko.
- **Sécurité** : en-têtes de sécurité Netlify (politique de sécurité du contenu stricte, protection contre l’intégration dans d’autres sites).
- **Mentions légales** ajoutées.

## 1.x — novembre 2026

Première version : réseau de la savane, fiches, carte schématique, trois quiz.
