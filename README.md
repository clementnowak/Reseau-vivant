# Réseau vivant 🌿

**Qui mange qui dans la savane ?** Un site éducatif gratuit où l’on choisit un animal pour découvrir ce qu’il mange, qui le mange, où il vit et quel est son rôle dans la nature.

👉 **Site en ligne : https://reseau-vivant-education.netlify.app**

## Le produit

| | |
|---|---|
| **Pour qui ?** | Enfants et ados de 8 à 16 ans, parents, enseignants, curieux de nature |
| **Problème** | La chaîne alimentaire est souvent montrée comme une ligne droite figée. On ne voit pas que tout est relié. |
| **Proposition** | Une exploration libre : on touche un animal, il passe au centre, on suit ses liens. |
| **Contraintes** | Coût de fonctionnement : 0 €. Sans publicité, sans cookies, sans compte. Pensé d’abord pour le téléphone. |
| **Ton** | Curiosité et émerveillement, sans discours moralisateur. |

## Ce que contient la version 2 (savane africaine)

- 50 animaux, 10 ressources végétales ou organiques, 149 liens alimentaires
- Un réseau lisible sur téléphone : les prédateurs au-dessus, l’animal au centre, sa nourriture en dessous
- Une fiche par animal (habitat, rôle, anecdote, protection) et des sources dédiées pour les relations surprenantes
- Deux cartes : l’Afrique dans le monde, puis les régions où vit l’animal
- Trois quiz générés en partie à partir des données, différents à chaque partie
- Accessibilité : navigation au clavier, cibles tactiles de 44 px minimum, textes alternatifs, respect du « mouvement réduit »

## Démarche

Le site est construit en *vibe coding* (développement assisté par IA), avec des méthodes de Product Management :
audit UX, priorisation, itérations courtes, vérification sur mobile et ordinateur, puis audit indépendant.
Les décisions et audits sont dans le dossier [`docs/`](docs/), les évolutions dans [`CHANGELOG.md`](CHANGELOG.md).

## Technique

- HTML, CSS et JavaScript sans framework ni dépendance, hébergés sur Netlify (offre gratuite)
- Données dans `data.js` (espèces, liens, sources) : ajouter un animal ne demande pas de toucher au code
- CSS *mobile first* : les styles de base visent le téléphone, puis s’enrichissent pour tablette et ordinateur
- En-têtes de sécurité (politique de sécurité du contenu stricte) dans `netlify.toml`
- Cartes générées depuis Natural Earth (domaine public) avec `tools/generer-cartes.py`

## Prochaines étapes

- Tester le site avec 3 à 5 enfants de 8 à 16 ans et mesurer ce qu’ils retiennent
- Associer une source à chaque lien alimentaire
- Ajouter un deuxième écosystème (océan, forêt tropicale…)
