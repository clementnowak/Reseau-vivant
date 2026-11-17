# Réseau vivant 🌿

**Qui mange qui dans la nature ?** Un site éducatif gratuit où l’on choisit un animal pour découvrir ce qu’il mange, qui le mange, où il vit et quel est son rôle dans la nature.

👉 **Site en ligne : https://reseau-vivant-education.netlify.app**

## Le produit

| | |
|---|---|
| **Pour qui ?** | Enfants et ados de 8 à 16 ans, parents, enseignants, curieux de nature |
| **Problème** | La chaîne alimentaire est souvent montrée comme une ligne droite figée. On ne voit pas que tout est relié. |
| **Proposition** | Une exploration libre : on touche un animal, il passe au centre, on suit ses liens. |
| **Contraintes** | Coût de fonctionnement : 0 €. Sans publicité, sans cookies, sans compte. Pensé d’abord pour le téléphone. |
| **Ton** | Curiosité et émerveillement, sans discours moralisateur. |

## Ce que contient la version 3

Deux univers, qu’on choisit avec la bascule en haut du site :

- **Savane africaine** : 50 animaux, 10 ressources, 149 liens alimentaires
- **Récif corallien** : 27 animaux, 5 ressources (plancton, algues, herbiers, restes), 57 liens alimentaires

Dans chaque univers :

- Un réseau lisible sur téléphone : les prédateurs au-dessus, l’animal au centre, sa nourriture en dessous
- Une fiche par animal (habitat, rôle, anecdote, protection) et des sources dédiées pour les relations surprenantes
- Deux cartes : le monde, puis un zoom sur les régions où vit l’animal
- Trois quiz générés en partie à partir des données, différents à chaque partie
- Accessibilité : navigation au clavier, cibles tactiles de 44 px minimum, textes alternatifs, respect du « mouvement réduit »

## Démarche

Le site est construit en *vibe coding* (développement assisté par IA), avec des méthodes de Product Management :
audit UX, priorisation, itérations courtes, vérification sur mobile et ordinateur, puis audit indépendant.
Les décisions et audits sont dans le dossier [`docs/`](docs/), les évolutions dans [`CHANGELOG.md`](CHANGELOG.md).

## Technique

- HTML, CSS et JavaScript sans framework ni dépendance, hébergés sur Netlify (offre gratuite)
- Un dossier par univers dans `univers/` (`donnees.js` : espèces, liens, sources, textes et réglages du quiz ; `cartes.html` : les deux cartes). Le registre `univers/registre.js` liste les univers : en ajouter un ne demande pas de toucher au code de l’application.
- Les données d’un univers ne sont chargées que lorsqu’on l’ouvre, pour que le site reste léger avec 3 ou 4 univers
- Adresse partageable par animal : `#recif/dugong` (les anciens liens `#zebre` mènent toujours à la savane)
- CSS *mobile first* : les styles de base visent le téléphone, puis s’enrichissent pour tablette et ordinateur
- En-têtes de sécurité (politique de sécurité du contenu stricte) dans `netlify.toml`
- Cartes de tous les univers générées depuis Natural Earth (domaine public) avec `tools/generer-cartes.py`

## Prochaines étapes

- Tester le site avec 3 à 5 enfants de 8 à 16 ans et mesurer ce qu’ils retiennent
- Associer une source à chaque lien alimentaire
- Ajouter un troisième univers : les airs
- Remplacer les émojis approximatifs par des silhouettes d’illustrateurs sous licence libre (PhyloPic)
