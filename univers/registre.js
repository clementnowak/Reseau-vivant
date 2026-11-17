'use strict';
/* Registre des univers du site.
   Ajouter un univers = créer un dossier univers/<id>/ (donnees.js + cartes.html) et ajouter une ligne ici.
   Les données d’un univers ne sont chargées que lorsqu’on l’ouvre. */
window.RV_UNIVERS = [
  { id: 'savane', label: 'Savane', icone: '🦁', donnees: 'univers/savane/donnees.js' },
  { id: 'recif', label: 'Récif', icone: '🐠', donnees: 'univers/recif/donnees.js' }
];
