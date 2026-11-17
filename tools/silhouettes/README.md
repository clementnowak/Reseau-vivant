# Fabrication des silhouettes

Étapes (les scripts gardent les chemins de la machine où ils ont servi : à adapter) :

1. Télécharger depuis PhyloPic les images **CC0 ou domaine public uniquement** (filtre `filter_license_by=false&filter_license_nc=false&filter_license_sa=false`).
2. `1-nettoyer.py` : ne garde que les tracés, vérifie qu’il n’y a ni script, ni image, ni lien dans le SVG.
3. `2-alleger.py` : simplifie les contours (un SVG de 4 à 370 Ko devient 0,5 à 6 Ko).
4. `3-construire.py` : écrit `univers/<id>/silhouettes.js`.

Toujours regarder la planche de contrôle : une silhouette copiée sur plusieurs espèces ou illisible à 40 px doit être retirée (l’émoji prend alors le relais).
