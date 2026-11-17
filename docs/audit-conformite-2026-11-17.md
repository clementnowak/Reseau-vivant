# Audit de conformité — 17 novembre 2026

Périmètre : site complet, univers savane et récif, ordinateur (1440 px) et mobile (iPhone SE et 13).
Méthode : tests automatiques (Playwright + Chrome) et relecture du code, des données et du rendu.

## 1. Bugs trouvés et corrigés (version 3.0.1)

| # | Bug | Gravité | Correction |
|---|-----|---------|------------|
| 1 | Le dugong était représenté par une vache (🐄), légende comprise. | Haute (contenu) | Remplacé par un phoque (🦭), un mammifère marin ; légende réécrite. Reste approximatif : voir le plan, point 1. |
| 2 | Sur ordinateur, la carte de l’animal central restait collée en haut puis glissait avec la page. La carte et sa zone font presque la même hauteur : l’effet « collant » ne servait à rien et donnait une impression de saccade. | Moyenne | Effet collant retiré ; la carte défile normalement. |
| 3 | Le bouton Retour du navigateur quittait le site au lieu de revenir à l’univers précédent. | Moyenne | Un changement d’univers crée maintenant une étape dans l’historique. |
| 4 | Une adresse comme `#recif/inconnu` restait telle quelle dans la barre d’adresse. | Faible | L’adresse est corrigée vers l’animal affiché. |
| 5 | Texte « Récif corallien » au-dessus du titre : contraste de 4,49 pour un minimum de 4,5. | Faible | Couleur légèrement assombrie. |
| 6 | Tortue imbriquée : « la seule tortue marine » qui mange surtout des éponges. Affirmation trop forte. | Faible (exactitude) | Remplacé par « l’une des rares ». |

## 2. Ce qui est conforme

- 0 erreur dans la console, 0 requête échouée, 0 violation de la politique de sécurité (CSP).
- Aucun débordement horizontal à 320, 390 et 1440 px.
- Un seul titre principal, aucun identifiant en double, tous les boutons et liens ont un nom, toutes les images ont un attribut `alt`.
- Navigation au clavier : 69 arrêts de tabulation, chacun avec un repère visible.
- Contraste : seul le point décoratif du logo est sous le seuil (sans texte à lire).
- Liens externes : tous en `noopener noreferrer`.
- Grammaire (de le, à les, élisions) : 92 fiches relues automatiquement, 0 anomalie.
- 240 parties de quiz jouées automatiquement, 0 erreur.
- Aucun cookie, aucun traceur, aucune ressource externe.

## 3. Points d’amélioration (non corrigés) et plan d’action

Priorité 1 — à faire en premier

1. **Vraies illustrations à la place des émojis.** Le problème est plus large que le dugong : dans le récif, 🐟 sert à 7 espèces, 🐠 à 4, 🦈 et 🐢 à 2 chacune ; dans la savane, 🦌 sert à 11 espèces. L’hippocampe (🐴) et la raie manta (🪽) sont aussi approximatifs. Piste : silhouettes PhyloPic sous licence libre, vérifiées une par une. Bloqué tant que je ne peux pas les télécharger (voir « Décisions » plus bas). Effort : moyen.
2. **Tester avec 2 ou 3 enfants de 8 à 16 ans.** Aucun test automatique ne remplace cela. Effort : faible.
3. **Mettre en place une vérification automatique à chaque PR** (GitHub Actions : cohérence des données, tests de navigation, politique de sécurité). C’est utile pour la qualité et pour apprendre GitHub. Effort : faible à moyen.

Priorité 2 — qualité des contenus

4. **Sources des liens alimentaires** : seuls 4 liens sur 149 (savane) et 10 sur 57 (récif) citent une source. Les liens présentés comme « parfois » (par exemple crabe → hippocampe, requin-tigre → raie manta) sont à vérifier ou à retirer. Effort : moyen.
5. **11 animaux de la savane sans prédateur** (léopard, blaireau, suricate, serval, caracal, otocyon, protèle, pangolin, serpentaire, outarde kori, bucorve). Effort : faible à moyen, avec sources.
6. **Relecture factuelle de la savane** par un second regard : le récif a été relu dans cet audit (aucune erreur grave), pas la savane. Nuance relevée : l’holothurie est qualifiée de « décomposeuse » alors que c’est un détritivore. Effort : moyen.

Priorité 3 — confort

7. **Recherche** : accepter des variantes (par exemple « mante » pour manta) et des noms courants. Effort : faible.
8. **Filtres d’animaux** : sur ordinateur, la rangée est coupée à droite (« Planct… ») ; passer à deux lignes. Effort : faible.
9. **Mobile** : textes de carte de 9 à 11 px, lien du logo de 30 px de large (cible tactile à agrandir). Effort : faible.
10. **Couleur de la barre du navigateur** (`theme-color`) identique pour les deux univers ; la faire suivre l’univers. Effort : faible.
11. **Préparer « les airs »** : modèle de fiche d’univers et liste de contrôle pour en ajouter un (outil de vérification déjà prêt). Effort : moyen.

## 4. Décisions attendues

- Pictos : tu télécharges les silhouettes toi-même (je te donne la liste exacte) ou tu m’autorises à le faire depuis ton ordinateur relié à la conversation.
- Ordre des priorités ci-dessus : valides-tu, ou veux-tu en retirer ou en avancer ?
