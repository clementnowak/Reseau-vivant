# Journal des versions

## 2.2.0 — Silhouettes et mentions légales
- Les émojis d'animaux sont remplacés par 60 silhouettes dessinées (SVG, originales, légères) : une forme propre à chaque espèce, dont les 11 antilopes.
- Mentions légales : éditeur et responsable de la publication ajoutés.
- Générateur des silhouettes : `tools/generer-silhouettes.py`.

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
