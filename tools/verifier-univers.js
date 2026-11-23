// Vérifie la cohérence des données de chaque univers : node tools/verifier-univers.js
// (identifiants uniques, liens valides, régions connues, références du quiz, animaux sans nourriture…)
'use strict';
const fs = require('fs');
const vm = require('vm');
const ctx = { window: {} };
vm.runInNewContext(fs.readFileSync('univers/registre.js', 'utf8'), ctx);
let errors = 0;
const totaux = { univers: 0, especes: 0, liens: 0 };
const err = (u, m) => { errors++; console.log(`✗ ${u} : ${m}`); };
const warn = (u, m) => console.log(`⚠ ${u} : ${m}`);
for (const u of ctx.window.RV_UNIVERS) {
  vm.runInNewContext(fs.readFileSync(u.donnees, 'utf8'), ctx);
  const d = ctx.window.RV_DONNEES[u.id];
  if (!d) { err(u.id, 'données absentes'); continue; }
  const m = d.meta, ids = new Set();
  for (const x of d.species) { if (ids.has(x.id)) err(u.id, `identifiant en double : ${x.id}`); ids.add(x.id); }
  for (const l of d.links) if (!ids.has(l.eater) || !ids.has(l.food)) err(u.id, `lien invalide : ${l.eater} → ${l.food}`);
  for (const x of d.species) for (const r of x.regions || []) if (!m.regions[r]) err(u.id, `région inconnue ${r} (${x.id})`);
  for (const x of d.species.filter((s) => s.type === 'animal')) {
    if (!d.links.some((l) => l.eater === x.id)) err(u.id, `animal sans nourriture : ${x.id}`);
    if (!d.links.some((l) => l.food === x.id) && !x.noPredator) warn(u.id, `pas encore de prédateur renseigné : ${x.id}`);
  }
  // Fiche d’identité (champ « stats ») : si un univers l’utilise, tous ses animaux doivent l’avoir ; chaque chiffre porte au moins une source https.
  const animauxStats = d.species.filter((s) => s.type === 'animal');
  if (animauxStats.some((s) => s.stats)) {
    for (const x of animauxStats) {
      if (!x.stats) { err(u.id, `fiche d’identité absente : ${x.id}`); continue; }
      const champs = Object.keys(x.stats).filter((k) => k !== 'groupe');
      if (!champs.length) err(u.id, `fiche d’identité vide : ${x.id}`);
      for (const k of champs) {
        if (!['taille', 'adulte', 'vie', 'repro', 'rythme'].includes(k)) { err(u.id, `fiche : champ inconnu « ${k} » (${x.id})`); continue; }
        const f = x.stats[k];
        if (!f || typeof f.v !== 'string' || !f.v.trim()) err(u.id, `fiche : valeur vide « ${k} » (${x.id})`);
        else if (f.v.length > 160) err(u.id, `fiche : valeur trop longue « ${k} » (${x.id})`);
        const src = [].concat(f && f.s || []);
        if (!src.length || src.some((l) => !/^https:\/\/[^\s]+$/.test(l))) err(u.id, `fiche : source https manquante ou invalide « ${k} » (${x.id})`);
      }
    }
  }
  if (!ids.has(m.animalParDefaut)) err(u.id, 'animalParDefaut inconnu');
  const q = m.quiz;
  for (const k of [...q.grandsChasseurs, ...q.petitesProies, ...q.grossesProies, ...q.leurresQuiMange.vertebre.ids, ...q.leurresQuiMange.invertebre.ids,
    ...(q.region.especes || []), ...(q.region.oui || []), ...(q.region.non || [])]) if (!ids.has(k)) err(u.id, `quiz : identifiant inconnu ${k}`);
  for (const k of q.region.oui || []) if (!d.species.find((s) => s.id === k).regions.includes(q.region.region)) err(u.id, `quiz région : ${k} absent de ${q.region.region}`);
  for (const k of q.region.non || []) if (d.species.find((s) => s.id === k).regions.includes(q.region.region)) err(u.id, `quiz région : ${k} présent dans ${q.region.region}`);
  for (const c of q.curiosites) {
    if (!ids.has(c.animal)) err(u.id, `curiosité : animal inconnu (${c.q})`);
    if (!c.options.some((o) => o[0] === c.correct)) err(u.id, `curiosité sans bonne réponse (${c.q})`);
  }
  for (const n of m.comprendre.chaine) if (n.id && !ids.has(n.id)) err(u.id, `chaîne : ${n.id} inconnu`);
  // Chaîne de l’accueil : du plus fort au plus faible, chaque maillon mange le suivant.
  const ch = m.chaineHero || [];
  if (ch.length < 2) err(u.id, 'chaineHero : au moins 2 maillons');
  for (let i = 0; i < ch.length; i++) {
    if (!ids.has(ch[i])) err(u.id, `chaineHero : ${ch[i]} inconnu`);
    else if (i && !d.links.some((l) => l.eater === ch[i - 1] && l.food === ch[i])) err(u.id, `chaineHero : ${ch[i - 1]} ne mange pas ${ch[i]}`);
  }
  if (!m.chaineHeroTexte) err(u.id, 'chaineHeroTexte absent');
  if (!fs.existsSync(m.carte.fichier)) err(u.id, 'fichier de cartes absent');
  else { const html = fs.readFileSync(m.carte.fichier, 'utf8'); for (const r of Object.keys(m.regions)) if (!html.includes(`data-region="${r}"`)) err(u.id, `région ${r} absente des cartes`); if (/style=|<script/i.test(html)) err(u.id, 'cartes : style ou script en ligne (interdit par la politique de sécurité)'); }
  for (const l of d.links) if (!l.source) { console.log(`✗ ${u.id} : relation sans source : ${l.eater} → ${l.food}`); process.exitCode = 1; }
  totaux.univers++; totaux.especes += d.species.length; totaux.liens += d.links.length;
  console.log(`✓ ${u.id} : ${d.species.length} êtres vivants et ressources, ${d.links.length} liens`);
}
// Les chiffres affichés sur la page « coulisses » doivent correspondre aux données.
if (fs.existsSync('coulisses.html')) {
  const page = fs.readFileSync('coulisses.html', 'utf8');
  for (const [cle, attendu] of Object.entries(totaux)) {
    const m = page.match(new RegExp(`data-stat="${cle}">(\\d+)<`));
    if (!m) err('coulisses', `chiffre « ${cle} » absent de coulisses.html`);
    else if (Number(m[1]) !== attendu) err('coulisses', `« ${cle} » affiche ${m[1]}, les données donnent ${attendu}`);
  }
  console.log('✓ coulisses : chiffres cohérents avec les données');
}
process.exit(errors ? 1 : 0);
