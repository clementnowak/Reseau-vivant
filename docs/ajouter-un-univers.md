# Ajouter un univers (exemple : « les airs »)

Checklist pour créer un nouvel univers sans casser les autres. Ne fusionner qu'une fois tout coché.

## 1. Contenu (le plus long, et le plus important)
- [ ] 20 à 40 espèces, dont au moins 4 ressources (plantes, insectes…) à la base du réseau.
- [ ] Chaque espèce : `id` unique (minuscules, sans accent), nom français, nom scientifique, `emoji`, `group`, texte « le savais-tu », régime, régions.
- [ ] Chaque espèce a au moins un lien « mange » ou `noPredator` expliqué (le vérificateur avertit sinon).
- [ ] Chaque lien rare ou surprenant : `"rare": true` et un champ `source` (URL vérifiée, jamais écrite de mémoire).
- [ ] Relecture factuelle par une personne qui connaît le sujet (ornithologue, naturaliste).

## 2. Fichiers
- [ ] `univers/<id>/donnees.js` (copier la structure de `savane`, mettre `couleurBarre` en `#rrggbb`).
- [ ] Déclarer l'univers dans `univers/registre.js`.
- [ ] Thème : ajouter les variables CSS sous `html[data-univers="<id>"]` dans `styles.css`.
- [ ] Silhouettes (facultatif mais recommandé) : suivre `tools/silhouettes/README.md`, ne garder que les licences CC0 / domaine public, et compléter `docs/credits-silhouettes.md`.
- [ ] Sources : ajouter chaque ouvrage ou site dans `sources`.
- [ ] Fiche d’identité (facultative, tout ou rien par univers) : champ `stats` sur chaque animal (`taille`, `adulte`, `vie`, `repro`, `rythme`, chacun `{ v: "texte", s: "https://…" }`, `s` pouvant être une liste). Jamais de chiffre de mémoire ni sans source ; un champ non sourcé est omis. `groupe: true` pour un nom qui désigne plusieurs espèces. Chaque domaine de source cité : ajouté à `SOURCE_NOMS`.
- [ ] Animaux au pluriel (`"pluriel": true`, `"genre": "f"` si besoin) : gérés par `app.js` (« Que mangent-ils ? »). Nom propre dans `meta.nom` : la casse est conservée.
- [ ] Liens « En savoir plus » : `"langue": "fr"` dans `humanInteractions` si la page est en français (sinon « (en anglais) » est affiché).
- [ ] Chaque domaine de source cité : ajouté à `SOURCE_NOMS` dans `app.js`, sinon le nom de domaine brut est affiché.

## 3. Contrôles automatiques
- [ ] `npm install && npx playwright install chromium`
- [ ] `npm test` : cohérence des données puis 8 parties de chaque quiz par univers (ajouter l'id dans la liste de `tests/parcours.js`).
- [ ] Aucune erreur dans la console, aucune violation CSP (pas de script ni de style inline).

## 4. Contrôles à la main
- [ ] Téléphone et ordinateur : fiches, quiz, recherche (avec fautes de frappe), changement d'univers, bouton retour.
- [ ] Texte lisible sur le fond de chaque groupe (contraste), zones tactiles d'au moins 44 px.
- [ ] Test avec 2 ou 3 enfants de 8 à 16 ans : comprennent-ils le vocabulaire ? Où se trompent-ils ?

## 5. Publication
- [ ] Mettre à jour `CHANGELOG.md` et la version (`package.json`, `meta.version` des données).
- [ ] Pull request, CI verte, fusion sur `main`, vérification du site en ligne.
