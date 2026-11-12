# Audit UX, UI et produit — 12 novembre 2026

Périmètre : code actuel main, état du déploiement Netlify via connecteurs, puis aperçu de la PR 7 dans Chrome. Revue experte, pas un test avec des enfants. Le navigateur local ne démarre pas (restriction système) ; pas de validation sur téléphone réel ni de certification WCAG. Les effets pédagogiques restent des hypothèses à mesurer.

| Priorité | Constat et preuve | Impact / confiance | Correction / critère |
|---|---|---|---|
| P1 | Une seule série de cinq questions revenait en boucle (app.js) | Répétition, confiance élevée | Trois séries distinctes de cinq, thème et numéro visibles. Rotation 1→2→3→1 vérifiée par quinze réponses dans Chrome. |
| P1 | Header mobile contraint à 70px, liens pouvant se couper (CSS) | Navigation peu lisible, élevée | Header de hauteur automatique, marque puis navigation, liens sans retour à la ligne et cibles de 44px. À confirmer à 320px sur appareil. |
| P1 | Catalogue mobile limité à 142px avec défilement interne | Exploration cachée, élevée | Liste dépliable, défilement naturel de page, ouverture automatique lors d’une recherche ou d’un filtre. Recherche suricate vérifiée. |
| P1 | Frise reposant surtout sur un geste à découvrir | Risque de ne voir que le centre, moyenne | Aperçu des panneaux voisins à 78vw, texte visible et trois commandes accessibles au clavier. Geste tactile réel encore à vérifier. |
| P1 | Recherche annoncée comme un symbole dans l’arbre accessible | Champ mal identifié, élevée | Nom accessible explicite, compteur de résultats annoncé. |
| P1 | Tirage aléatoire parmi des fiches sans relation renseignée | Impasses dans le parcours central, élevée | Tirage parmi les animaux avec au moins une relation ; catalogue complet conservé. |
| P2 | Choix d’un organisme dans l’exemple pédagogique ne ramenait pas à la frise | Résultat du clic hors écran, élevée | Retour visuel à l’exploration, avec respect du mouvement réduit. |
| P2 | Identité graphique différente du logo validé | Incohérence, élevée | Fichier fourni réutilisé sans redessin, dimensions réservées pour éviter un saut de mise en page. Vérifié visuellement dans le header. |
| P2 | Absence de repères culturels demandés | Opportunité de mémorisation, hypothèse | Bulles au-dessus du sujet : Simba, Pumba, Timon, Shenzi, Marty, Melman. Pumba et Timon vérifiés. Fiction explicitement distinguée de l’animal réel. |
| P2 | Grande zone aria-live annonçant toute la frise | Risque de surcharge vocale, moyenne | Suppression de cette annonce globale ; maintien des retours de quiz et recherche. Focus déplacé au titre à la question suivante. |

## Évaluation produit

Le parcours exploration → compréhension → auto-évaluation reste cohérent. Les trois quiz couvrent réseaux alimentaires, rôles écologiques, biodiversité et limites du modèle. Le score ne constitue pas une preuve d’apprentissage durable. La rotation est celle de la session en cours ; recharger la page repart au premier quiz. Aucun stockage ou suivi ajouté.

La carte reste schématique. Les nouvelles fiches ne garantissent pas de nouvelles relations : les 47 liens sont encore illustratifs et non tous sourcés individuellement. Ces limites sont affichées ; ajouter des relations inventées pour rendre le site plus spectaculaire serait une mauvaise correction. Priorité suivante : documenter les interactions et vérifier la compréhension avec des 8–16 ans (sens des flèches, réseau versus chaîne, rôle des producteurs et décomposeurs).

## Vérifications et limites

Syntaxe JavaScript et git diff --check : réussis. Aperçu Netlify chargé et inspecté visuellement sur ordinateur : logo exact, mise en page de la frise et bulle Pumba lisibles ; recherche suricate et bulle Timon fonctionnelles ; quinze réponses, transitions vers quiz 2, 3, puis 1 confirmées. Les corrections mobile sont fondées sur la revue CSS ; aucun test tactile ou de lecteur d’écran réel revendiqué. Aucun coût, service tiers applicatif, tracker ou dépendance de production ajouté.
