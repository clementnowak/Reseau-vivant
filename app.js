'use strict';
/* Réseau vivant — logique de la page (aucune dépendance, aucun traceur).
   Le site contient plusieurs univers (savane, récif…) décrits dans univers/registre.js.
   Chaque univers apporte ses données et ses réglages (univers/<id>/donnees.js) et ses cartes
   (univers/<id>/cartes.html) ; ce fichier ne contient aucune donnée propre à un univers. */
(() => {
  const $ = (id) => document.getElementById(id);
  const UNIVERS = Array.isArray(window.RV_UNIVERS) ? window.RV_UNIVERS : [];
  const registre = new Map(UNIVERS.map((u) => [u.id, u]));
  if (!UNIVERS.length) { $('speciesLibrary').textContent = 'Impossible de charger le site. Recharge la page.'; return; }

  /* ---------- Utilitaires ---------- */
  const escapeHtml = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const normalized = (s) => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const shuffle = (arr) => { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const lowerFirst = (s) => s.charAt(0).toLowerCase() + s.slice(1);
  const nbsp = (s) => String(s).replace(/ ([?!:;»])/g, ' $1').replace(/« /g, '« ');
  const joinFr = (arr) => (arr.length > 1 ? `${arr.slice(0, -1).join(', ')} et ${arr[arr.length - 1]}` : arr[0] || '');
  const fill = (tpl, vars) => String(tpl).replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m));

  /* ---------- Grammaire (articles et accords, définis espèce par espèce dans les données) ---------- */
  const shortName = (x) => x.short || x.name.replace(/\s*\(.*\)$/, '');
  const isFem = (x) => x.genre === 'f';
  const isPlural = (x) => Boolean(x.pluriel);
  function withArticle(x, kind = 'def') {
    const n = lowerFirst(shortName(x));
    const de = kind === 'de';
    if (isPlural(x)) return (de ? 'des ' : 'les ') + n;
    const elide = x.elision ?? 'aeiouy'.includes(normalized(n).charAt(0));
    if (elide) return (de ? 'de l’' : 'l’') + n;
    if (isFem(x)) return (de ? 'de la ' : 'la ') + n;
    return (de ? 'du ' : 'le ') + n;
  }
  const pronoun = (x) => (isFem(x) ? 'elle' : 'il');
  const eaterLabels = { predation: 'prédateur', charognage: 'mange les restes', vegetaux: 'en mange', detritivore: 'décomposeur', broutage: 'en mange' };
  const foodLabels = { predation: '', charognage: 'restes d’animaux', vegetaux: '', detritivore: 'matière morte', broutage: '' };

  /* ---------- État ---------- */
  let U = null; // univers affiché : { id, meta, data, items, animals, … }
  let current = '';
  let activeGroup = '';
  let libraryOpen = false;
  let openToken = 0;
  const cache = new Map();

  /* ---------- Chargement d’un univers (à la demande) ---------- */
  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = src; s.async = true;
      s.onload = resolve; s.onerror = () => reject(new Error(`Échec du chargement : ${src}`));
      document.head.appendChild(s);
    });
  }
  function loadUniverse(id) {
    if (!cache.has(id)) {
      const entry = registre.get(id);
      const p = (async () => {
        if (!(window.RV_DONNEES && window.RV_DONNEES[id])) await loadScript(entry.donnees);
        const data = window.RV_DONNEES[id];
        if (!data || !Array.isArray(data.species) || !Array.isArray(data.links)) throw new Error('Données invalides');
        const res = await fetch(data.meta.carte.fichier);
        if (!res.ok) throw new Error('Cartes introuvables');
        return build(id, data, await res.text());
      })();
      p.catch(() => cache.delete(id));
      cache.set(id, p);
    }
    return cache.get(id);
  }
  function build(id, data, mapHtml) {
    const items = new Map(data.species.map((x) => [x.id, x]));
    const get = (ids) => (ids || []).map((k) => items.get(k)).filter(Boolean);
    const q = data.meta.quiz;
    return {
      id, meta: data.meta, data, items, mapHtml,
      animals: data.species.filter((x) => x.type === 'animal'),
      eatersOf: (k) => data.links.filter((l) => l.food === k),
      foodsOf: (k) => data.links.filter((l) => l.eater === k),
      bigHunters: get(q.grandsChasseurs), tinyFoods: get(q.petitesProies), bigPrey: get(q.grossesProies),
      curiosities: (q.curiosites || []).map((c) => ({ ...c, options: c.options.map(([oid, text, emoji]) => ({ id: oid, text, emoji: emoji || items.get(oid)?.emoji || '•' })) }))
    };
  }

  /* ---------- Adresse de la page : #recif/poisson_clown (ancien format #zebre = savane) ---------- */
  function parseHash() {
    const h = decodeURIComponent(location.hash.slice(1));
    if (!h) return {};
    const [a, b] = h.split('/');
    if (registre.has(a)) return { u: a, animal: b };
    return { u: UNIVERS[0].id, animal: a };
  }
  const setHash = () => history.replaceState(null, '', `#${U.id}/${current}`);

  /* ---------- Bascule entre univers ---------- */
  function renderSwitch(loadingId) {
    $('universeSwitch').innerHTML = UNIVERS.map((u) => `<button type="button" class="universe-btn" data-univers="${escapeHtml(u.id)}" aria-pressed="${U ? u.id === U.id : u.id === loadingId}"${u.id === loadingId && (!U || U.id !== loadingId) ? ' aria-busy="true"' : ''}><span aria-hidden="true">${escapeHtml(u.icone)}</span> ${escapeHtml(u.label)}</button>`).join('');
  }

  async function openUniverse(id, animal, { initial = false } = {}) {
    if (!registre.has(id)) id = UNIVERS[0].id;
    const token = ++openToken;
    renderSwitch(id);
    let u;
    try { u = await loadUniverse(id); } catch (e) {
      if (token !== openToken) return;
      if (U) { renderSwitch(); $('liveCenter').textContent = 'Impossible d’ouvrir cet univers pour l’instant. Réessaie dans un instant.'; return; }
      $('speciesLibrary').textContent = 'Impossible de charger les données. Recharge la page.';
      return;
    }
    if (token !== openToken) return;
    U = u;
    current = U.items.has(animal) ? animal : U.meta.animalParDefaut;
    activeGroup = ''; libraryOpen = false;
    $('speciesSearch').value = '';
    applyUniverse();
    setHash();
    if (!initial) $('liveCenter').textContent = `Tu explores maintenant : ${U.meta.nom.toLowerCase()}.`;
  }

  function applyUniverse() {
    const m = U.meta;
    document.documentElement.dataset.univers = U.id;
    document.title = m.titre;
    renderSwitch();
    $('universeEyebrow').textContent = m.eyebrow;
    document.querySelectorAll('.hero-art .decor').forEach((el, i) => { el.textContent = m.decor[i] || ''; });
    $('animalCount').textContent = U.animals.length;
    $('linkCount').textContent = U.data.links.length;
    $('networkHelp').textContent = m.aideReseau || '';
    $('maps').innerHTML = U.mapHtml;
    $('mapCaveat').textContent = m.carte.avertissement;
    $('ideaCards').innerHTML = m.comprendre.cartes.map(([e, t, p]) => `<article class="idea"><span aria-hidden="true">${escapeHtml(e)}</span><h3>${escapeHtml(t)}</h3><p>${escapeHtml(p)}</p></article>`).join('');
    const chain = m.comprendre.chaine;
    $('chainFlow').setAttribute('aria-label', `Chaîne alimentaire : ${chain.map((n) => n.nom).join(', puis ')}`);
    $('chainFlow').innerHTML = chain.map((n) => {
      const inner = `<span aria-hidden="true">${escapeHtml(n.emoji)}</span><strong>${escapeHtml(n.nom)}</strong><small>${escapeHtml(n.role)}</small>`;
      return `<li>${n.id && U.items.has(n.id) ? `<button type="button" data-animal="${escapeHtml(n.id)}" class="chain-node">${inner}</button>` : `<span class="chain-node">${inner}</span>`}</li>`;
    }).join('');
    $('chainFooter').textContent = m.comprendre.chaineTexte;
    $('quizIntro').textContent = m.quiz.intro;
    $('sourceList').innerHTML = (U.data.sources || []).map((s) => `<li><a href="${escapeHtml(s.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(s.name)} ↗</a></li>`).join('');
    renderFilters();
    renderLibrary();
    renderNetwork();
    startQuiz(0);
  }

  /* ---------- Bibliothèque d’animaux ---------- */
  function filterTest(f) {
    return (x) => (!f.type || x.type === f.type)
      && (!f.regimeDebut || f.regimeDebut.some((d) => normalized(x.diet).startsWith(d)))
      && (!f.regimeContient || f.regimeContient.some((d) => normalized(x.diet).includes(d)))
      && (!f.groupes || f.groupes.includes(x.group));
  }
  const filters = () => U.meta.filtres;
  function renderFilters() {
    $('groupFilters').innerHTML = filters().map((f) => `<button type="button" class="filter-chip" data-group="${escapeHtml(f.id)}" aria-pressed="${f.id === activeGroup}">${escapeHtml(f.label)}</button>`).join('');
  }

  function renderLibrary() {
    const term = normalized($('speciesSearch').value.trim());
    const filter = filters().find((f) => f.id === activeGroup) || filters()[0];
    const test = filterTest(filter);
    const pool = term ? U.data.species : U.data.species.filter(test);
    const visible = pool.filter((x) => (!activeGroup || test(x)) && (!term || normalized(`${x.name} ${x.scientific} ${x.group} ${x.keywords || ''}`).includes(term)));
    const filtering = Boolean(term || activeGroup);
    const n = visible.length;
    $('searchResults').textContent = filtering ? `${n} ${n > 1 ? 'résultats' : 'résultat'}` : '';
    $('speciesLibrary').innerHTML = n
      ? visible.map((x) => `<button type="button" class="species-chip" data-animal="${escapeHtml(x.id)}" aria-pressed="${x.id === current}"><span class="chip-emoji" aria-hidden="true">${escapeHtml(x.emoji)}</span>${escapeHtml(shortName(x))}</button>`).join('')
      : `<p class="empty-library">Rien trouvé. Essaie un autre mot, comme ${escapeHtml(U.meta.exemplesRecherche)} !</p>`;
    const lib = $('speciesLibrary');
    const open = libraryOpen || filtering;
    lib.classList.toggle('is-open', open);
    requestAnimationFrame(() => {
      const overflowing = lib.scrollHeight > lib.clientHeight + 2;
      lib.classList.toggle('is-clipped', !open && overflowing);
      // Les puces cachées par le repli ne doivent pas recevoir le focus clavier.
      const limit = lib.getBoundingClientRect().top + lib.clientHeight;
      for (const chip of lib.querySelectorAll('.species-chip')) chip.inert = !open && chip.getBoundingClientRect().bottom > limit + 1;
      const toggle = $('toggleLibrary');
      toggle.hidden = filtering || (!libraryOpen && !overflowing);
      toggle.setAttribute('aria-expanded', String(libraryOpen));
      toggle.textContent = libraryOpen ? 'Voir moins d’animaux' : `Voir les ${U.animals.length} animaux`;
    });
  }

  /* ---------- Réseau ---------- */
  function relationCard(link, entityId, side) {
    const x = U.items.get(entityId);
    if (!x) return '';
    const generic = (side === 'eaters' ? eaterLabels : foodLabels)[link.kind] || '';
    const note = link.note && !(side === 'eaters' && link.foodSideOnly) ? link.note : generic;
    return `<button type="button" class="relation-card" data-animal="${escapeHtml(x.id)}" aria-label="${escapeHtml(shortName(x))}${note ? ', ' + escapeHtml(note) : ''}. Placer au centre">`
      + `<span class="animal-emoji" aria-hidden="true">${escapeHtml(x.emoji)}</span>`
      + `<span class="rel-meta"><strong>${escapeHtml(shortName(x))}</strong>${note ? `<small>${escapeHtml(note)}</small>` : ''}</span></button>`;
  }

  function renderNetwork() {
    const x = U.items.get(current);
    if (!x) return;
    const eaters = U.eatersOf(current);
    const foods = U.foodsOf(current);
    const isResource = x.type === 'resource';
    $('predTitle').innerHTML = `<span aria-hidden="true">⬆️</span> ${isResource ? 'Qui en mange ?' : `Qui ${isFem(x) ? 'la' : 'le'} mange ?`}`;
    $('preyTitle').innerHTML = `<span aria-hidden="true">⬇️</span> ${isResource ? 'D’où vient son énergie ?' : `Que mange-t-${pronoun(x)} ?`}`;
    $('preyList').classList.toggle('is-long', foods.length > 8);
    $('predCount').textContent = eaters.length || '';
    $('preyCount').textContent = foods.length || '';
    $('predList').innerHTML = eaters.length
      ? eaters.map((l) => relationCard(l, l.eater, 'eaters')).join('')
      : `<p class="relation-empty">${escapeHtml(x.noPredator || 'Aucun prédateur n’est montré ici pour l’instant.')}</p>`;
    const producer = (U.meta.groupesProducteurs || []).includes(x.group);
    $('preyList').innerHTML = foods.length
      ? foods.map((l) => relationCard(l, l.food, 'foods')).join('')
      : `<p class="relation-empty">${escapeHtml(isResource ? (producer ? U.meta.texteProducteur : U.meta.texteRecyclage) : 'Son alimentation n’est pas encore renseignée.')}</p>`;

    const badges = [x.diet, x.group].filter(Boolean).map((b) => `<span class="badge">${escapeHtml(b)}</span>`).join('');
    $('centerAnimal').innerHTML = `<p class="center-kicker">Au centre du réseau</p><div class="center-icon" aria-hidden="true">${escapeHtml(x.emoji)}</div>`
      + `<h3>${escapeHtml(x.name)}</h3>${x.scientific ? `<span class="scientific">${escapeHtml(x.scientific)}</span>` : ''}`
      + `<div class="center-badges">${badges}</div>`
      + (x.culture ? `<p class="culture-bubble">🎬 ${escapeHtml(nbsp(x.culture))} Ici, découvre le vrai animal !</p>` : '');
    $('liveCenter').textContent = `${capitalize(withArticle(x))} ${isPlural(x) ? 'sont' : 'est'} maintenant au centre du réseau.`;

    renderProfile(x);
    renderRange(x);
    renderHumanLayer(x);
  }

  function renderProfile(x) {
    $('profileHeading').textContent = `Découvre ${withArticle(x)}`;
    const blocks = [
      ['🔎', 'Qui est-ce ?', x.description],
      ['🏡', 'Son habitat', x.habitat],
      ['🌍', 'Son rôle dans la nature', x.role],
      ['✨', 'Le savais-tu ?', x.fun, 'fun'],
      ['🌱', 'Comment le protéger ?', x.protect]
    ].filter((b) => b[2]);
    let html = blocks.map((b) => `<article class="profile-item${b[3] ? ' ' + b[3] : ''}"><span class="p-icon" aria-hidden="true">${b[0]}</span><h4>${b[1]}</h4><p>${escapeHtml(b[2])}</p></article>`).join('');
    const sourced = U.foodsOf(x.id).concat(U.eatersOf(x.id)).filter((l) => l.source);
    const sources = [...new Set([x.source, ...sourced.map((l) => l.source)].filter(Boolean))];
    if (sources.length) {
      html += `<article class="profile-item"><span class="p-icon" aria-hidden="true">📚</span><h4>Pour aller plus loin</h4><p>${sources.map((u, i) => `<a href="${escapeHtml(u)}" target="_blank" rel="noopener noreferrer">Source ${i + 1} ↗</a>`).join(' · ')}</p></article>`;
    }
    $('profileContent').innerHTML = html;
  }

  function renderRange(x) {
    const regions = x.regions || [];
    const R = U.meta.regions;
    for (const el of $('maps').querySelectorAll('[data-region]')) el.classList.toggle('is-active', regions.includes(el.dataset.region));
    const res = x.type === 'resource';
    $('rangeTitle').textContent = res ? `Où trouve-t-on ${withArticle(x)} ?` : `Où vit ${withArticle(x)} ?`;
    if ($('mapCaption')) $('mapCaption').textContent = res ? 'Les régions où on en trouve' : `Les régions où ${pronoun(x)} vit`;
    if ($('mapLegend')) $('mapLegend').textContent = res ? 'On en trouve dans ces régions' : `${capitalize(pronoun(x))} vit dans ces régions`;
    const list = joinFr(regions.filter((r) => R[r]).map((r) => R[r].dans));
    $('rangeSummary').innerHTML = regions.length
      ? `${res ? 'On en trouve' : (isFem(x) ? 'On la trouve' : 'On le trouve')} surtout <strong>${escapeHtml(list)}</strong>.`
      : 'Sa répartition n’est pas encore renseignée.';
    const desc = $('maps').querySelector('#zoomDesc');
    if (desc) desc.textContent = regions.length ? `Régions coloriées : ${regions.filter((r) => R[r]).map((r) => R[r].court).join(', ')}.` : 'Aucune région coloriée.';
  }

  function renderHumanLayer(x) {
    const entries = (U.data.humanInteractions || []).filter((h) => h.species === x.id);
    $('humanLayer').hidden = entries.length === 0;
    $('humanPressureList').innerHTML = entries.map((h) => `<article class="human-pressure-card"><h4>🧑 ${escapeHtml(h.title)} — ${escapeHtml(h.region)}</h4><p>${escapeHtml(h.note)}</p><a href="${escapeHtml(h.sourceUrl)}" target="_blank" rel="noopener noreferrer">En savoir plus (en anglais) ↗</a></article>`).join('');
  }

  function select(id, { scroll = true } = {}) {
    if (!U.items.has(id)) return;
    current = id;
    setHash();
    renderLibrary();
    renderNetwork();
    if (scroll) {
      const desktop = window.matchMedia('(min-width: 960px)').matches;
      (desktop ? $('network') : $('centerAnimal')).scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: desktop ? 'start' : 'center' });
      $('centerAnimal').focus({ preventScroll: true });
    }
  }

  /* ---------- Quiz (questions fabriquées à partir des données de l’univers) ---------- */
  const dietKind = (x) => {
    const d = normalized(x.diet);
    if (d.startsWith('herbivore') || d.startsWith('principalement herbivore')) return 'herbivore';
    if (d.startsWith('carnivore')) return 'carnivore';
    if (d.startsWith('omnivore')) return 'omnivore';
    if (d.startsWith('insectivore')) return 'insectivore';
    return '';
  };
  const opt = (x) => ({ id: x.id, text: shortName(x), emoji: x.emoji });
  const common = (l) => !l.rare;
  const tooBig = (x) => `${capitalize(withArticle(x))} ${isPlural(x) ? 'sont' : 'est'} bien trop ${isFem(x) ? 'grosse' : 'gros'}`;

  function qWhoEats() {
    // Leurres plausibles mais faux, choisis par l’univers (ex. : des mangeurs de termites pour une proie vertébrée).
    const Q = U.meta.quiz;
    const prey = pick(U.animals.filter((x) => U.eatersOf(x.id).some((l) => l.kind === 'predation' && common(l))));
    const eater = U.items.get(pick(U.eatersOf(prey.id).filter((l) => l.kind === 'predation' && common(l))).eater);
    const eaterIds = new Set(U.eatersOf(prey.id).map((l) => l.eater));
    const inv = prey.group === Q.groupeInvertebres;
    const decoy = Q.leurresQuiMange[inv ? 'invertebre' : 'vertebre'];
    const wrong = shuffle(decoy.ids.map((k) => U.items.get(k)).filter((w) => w && !eaterIds.has(w.id) && w.id !== prey.id)).slice(0, 2);
    const why = `${capitalize(withArticle(eater))} ${inv ? 'mange' : 'peut chasser'} ${withArticle(prey)}. ${capitalize(joinFr(wrong.map((w) => withArticle(w))))} ${decoy.pourquoi}`;
    return { emoji: prey.emoji, q: `Lequel de ces animaux peut manger ${withArticle(prey)} ?`, options: shuffle([opt(eater), ...wrong.map(opt)]), correct: eater.id, why, animal: prey.id };
  }
  function qWhatEats() {
    const Q = U.meta.quiz;
    const herbs = U.animals.filter((x) => normalized(x.diet).startsWith('herbivore') && !U.foodsOf(x.id).some((l) => U.items.get(l.food)?.type === 'animal') && U.foodsOf(x.id).length);
    const herb = pick(herbs);
    const food = U.items.get(pick(U.foodsOf(herb.id)).food);
    const foodIds = new Set(U.foodsOf(herb.id).map((l) => l.food));
    const wrong = shuffle(U.animals.filter((a) => a.id !== herb.id && !foodIds.has(a.id) && Q.leurresQueMange.includes(a.group) && U.eatersOf(a.id).length)).slice(0, 2);
    return { emoji: herb.emoji, q: `Que mange ${withArticle(herb)} ?`, options: shuffle([opt(food), ...wrong.map(opt)]), correct: food.id,
      why: `${capitalize(withArticle(herb))} est herbivore : ${pronoun(herb)} mange ${Q.motsHerbivore || 'des plantes'}, comme ${withArticle(food)}.`, animal: herb.id };
  }
  function qPredatorFood() {
    const Q = U.meta.quiz;
    const hunter = pick(U.animals.filter((x) => dietKind(x) === 'carnivore' && U.foodsOf(x.id).some((l) => l.kind === 'predation' && common(l))));
    const prey = U.items.get(pick(U.foodsOf(hunter.id).filter((l) => l.kind === 'predation' && common(l))).food);
    const foodIds = new Set(U.foodsOf(hunter.id).map((l) => l.food));
    const big = U.bigHunters.some((b) => b.id === hunter.id);
    // Un grand chasseur ne chasse pas les termites ; un petit chasseur ne chasse pas un éléphant.
    const pool = (big ? U.tinyFoods : U.bigPrey).filter((w) => !foodIds.has(w.id) && w.id !== hunter.id);
    const plant = pick(U.data.species.filter((s) => s.type === 'resource' && (U.meta.groupesProducteurs || []).includes(s.group) && !foodIds.has(s.id)));
    const wrong = [pick(pool), plant];
    return { emoji: hunter.emoji, q: `Lequel de ces repas ${withArticle(hunter)} peut-${pronoun(hunter)} chasser ?`, options: shuffle([opt(prey), ...wrong.map(opt)]), correct: prey.id,
      why: `${capitalize(withArticle(hunter))} chasse notamment ${withArticle(prey)}. ${big ? Q.petitesProiesPourquoi : `${tooBig(wrong[0])} pour ${pronoun(hunter) === 'elle' ? 'elle' : 'lui'}.`}`, animal: hunter.id };
  }
  function qDiet() {
    const x = pick(U.animals.filter((a) => ['herbivore', 'carnivore', 'omnivore'].includes(dietKind(a))));
    const k = dietKind(x);
    const plants = U.meta.quiz.motsHerbivore || 'des plantes';
    const words = { herbivore: plants, carnivore: 'des animaux', omnivore: 'un peu de tout' };
    return { emoji: x.emoji, q: `${capitalize(withArticle(x))} est plutôt…`, options: [
      { id: 'herbivore', text: `Herbivore (mange ${plants})`, emoji: '🌿' },
      { id: 'carnivore', text: 'Carnivore (mange des animaux)', emoji: '🥩' },
      { id: 'omnivore', text: 'Omnivore (mange de tout)', emoji: '🍽️' }], correct: k,
      why: `${capitalize(withArticle(x))} est ${k} : ${pronoun(x)} mange ${words[k]}.`, animal: x.id };
  }
  function qRegion() {
    const R = U.meta.regions;
    const Z = U.meta.quiz.region;
    if (Z.mode === 'presence') {
      // « Lequel de ces animaux peut-on voir dans les Caraïbes ? » : leurres absents de cette région.
      const x = U.items.get(pick(Z.oui));
      const wrong = shuffle(Z.non).slice(0, 2).map((k) => U.items.get(k));
      return { emoji: '🗺️', q: Z.question, options: shuffle([opt(x), ...wrong.map(opt)]), correct: x.id,
        why: `On peut voir ${withArticle(x)} ${R[Z.region].dans}. ${capitalize(fill(Z.pourquoi, { non: joinFr(wrong.map((w) => withArticle(w))) }))}`, animal: x.id };
    }
    // Seulement des espèces vivant dans une seule grande région, pour que les leurres soient vraiment faux.
    const x = U.items.get(pick(Z.especes));
    const right = pick(x.regions);
    const wrong = shuffle(Object.keys(R).filter((r) => !x.regions.includes(r))).slice(0, 2);
    return { emoji: x.emoji, q: fill(Z.question, { x: withArticle(x) }), options: shuffle([right, ...wrong].map((r) => ({ id: r, text: R[r].nom, emoji: '🗺️' }))), correct: right,
      why: `On trouve ${withArticle(x)} surtout ${joinFr(x.regions.map((r) => R[r].dans))}. Regarde sa carte !`, animal: x.id };
  }

  const quizzes = [
    { id: 'reseau', title: 'Qui mange qui ?', icon: '🕸️', make: () => [qWhoEats(), qWhatEats(), qPredatorFood(), qWhoEats(), pick([qWhatEats, qPredatorFood])()] },
    { id: 'curieux', title: 'Drôles de bêtes', icon: '✨', make: () => shuffle(U.curiosities).slice(0, 5).map((c) => ({ ...c, options: shuffle(c.options) })) },
    { id: 'monde', title: 'Menus et cartes', icon: '🗺️', make: () => shuffle([qDiet(), qDiet(), qDiet(), qRegion(), qRegion()]) }
  ];
  const quiz = { index: 0, questions: [], step: 0, score: 0, answered: false };

  function renderQuizTabs() {
    $('quizTabs').innerHTML = quizzes.map((q, i) => `<button type="button" class="quiz-tab" data-quiz="${i}" aria-pressed="${i === quiz.index}"><span aria-hidden="true">${q.icon}</span>${escapeHtml(q.title)}</button>`).join('');
  }
  function startQuiz(i, focus = false) {
    quiz.index = i; quiz.step = 0; quiz.score = 0;
    quiz.questions = dedupe(quizzes[i].make());
    renderQuizTabs(); renderQuestion(focus);
  }
  function dedupe(qs) {
    const seen = new Set(); const out = [];
    for (const q of qs) { if (!seen.has(q.q)) { seen.add(q.q); out.push(q); } }
    for (let tries = 0; out.length < 5 && tries < 50; tries++) { const extra = qDiet(); if (!seen.has(extra.q)) { seen.add(extra.q); out.push(extra); } }
    return out.slice(0, 5);
  }
  function renderQuestion(focus) {
    const q = quiz.questions[quiz.step];
    quiz.answered = false;
    $('quizProgress').textContent = `Question ${quiz.step + 1} sur ${quiz.questions.length}`;
    $('quizScore').textContent = `⭐ ${quiz.score}`;
    $('quizBar').style.width = `${(quiz.step / quiz.questions.length) * 100}%`;
    $('quizQuestion').hidden = false;
    $('quizQuestion').innerHTML = `<span class="quiz-big-emoji" aria-hidden="true">${escapeHtml(q.emoji)}</span>${escapeHtml(nbsp(q.q))}`;
    $('quizAnswers').innerHTML = q.options.map((o) => `<button type="button" class="answer-btn" data-answer="${escapeHtml(o.id)}"><span class="a-emoji" aria-hidden="true">${escapeHtml(o.emoji)}</span>${escapeHtml(o.text)}</button>`).join('');
    $('quizFeedback').innerHTML = '';
    $('nextQuestion').hidden = true;
    if (focus) $('quizQuestion').focus({ preventScroll: true });
  }
  function answer(id) {
    if (quiz.answered) return;
    quiz.answered = true;
    const q = quiz.questions[quiz.step];
    const ok = id === q.correct;
    if (ok) quiz.score++;
    for (const b of $('quizAnswers').querySelectorAll('button')) {
      b.setAttribute('aria-disabled', 'true');
      if (b.dataset.answer === q.correct) b.classList.add('correct');
      else if (b.dataset.answer === id) b.classList.add('wrong');
    }
    const a = U.items.get(q.animal);
    $('quizFeedback').innerHTML = `<span class="verdict">${ok ? pick(['Bravo ! 🎉', 'Exact ! 👏', 'Bien joué ! 🌟']) : 'Pas tout à fait… 🤔'}</span>${escapeHtml(nbsp(q.why))}`
      + (a ? `<br><button type="button" class="see-animal" data-animal="${escapeHtml(a.id)}"><span aria-hidden="true">${escapeHtml(a.emoji)}</span> Voir ${escapeHtml(withArticle(a))} dans le réseau</button>` : '');
    $('quizScore').textContent = `⭐ ${quiz.score}`;
    $('quizBar').style.width = `${((quiz.step + 1) / quiz.questions.length) * 100}%`;
    const last = quiz.step === quiz.questions.length - 1;
    $('nextQuestion').textContent = last ? 'Voir mon score →' : 'Question suivante →';
    $('nextQuestion').hidden = false;
    $('quizFeedback').focus({ preventScroll: true });
  }
  function next() {
    if (!quiz.answered) return;
    if (quiz.step < quiz.questions.length - 1) { quiz.step++; renderQuestion(true); return; }
    const total = quiz.questions.length;
    const medal = quiz.score === total ? '🏆' : quiz.score >= 3 ? '🥈' : '🌱';
    const msg = quiz.score === total ? U.meta.quiz.expert : quiz.score >= 3 ? 'Très bien ! Encore un petit effort pour le sans-faute.' : 'Bon début ! Explore le réseau puis réessaie.';
    const nextIndex = (quiz.index + 1) % quizzes.length;
    $('quizProgress').textContent = 'Quiz terminé';
    $('quizQuestion').hidden = true;
    $('quizAnswers').innerHTML = `<div class="quiz-end"><span class="medal" aria-hidden="true">${medal}</span><h3 tabindex="-1" id="quizEndTitle">${quiz.score} / ${total}</h3><p>${escapeHtml(msg)}</p>`
      + `<button type="button" class="quiz-next" data-quiz-action="replay">Rejouer avec d’autres questions</button>`
      + `<button type="button" class="quiz-next secondary" data-quiz-action="next">Quiz suivant : ${escapeHtml(quizzes[nextIndex].title)}</button></div>`;
    $('quizFeedback').innerHTML = '';
    $('nextQuestion').hidden = true;
    $('quizEndTitle').focus({ preventScroll: true });
  }

  /* ---------- Initialisation ---------- */
  function bindEvents() {
    $('groupFilters').addEventListener('click', (e) => {
      const b = e.target.closest('[data-group]');
      if (!b || !U) return;
      activeGroup = b.dataset.group;
      renderFilters(); renderLibrary();
    });
    $('speciesSearch').addEventListener('input', () => U && renderLibrary());
    $('toggleLibrary').addEventListener('click', () => { if (!U) return; libraryOpen = !libraryOpen; renderLibrary(); });
    $('randomBtn').addEventListener('click', () => U && select(pick(U.animals.filter((x) => x.id !== current)).id));
    $('universeSwitch').addEventListener('click', (e) => {
      const b = e.target.closest('[data-univers]');
      if (b && (!U || b.dataset.univers !== U.id)) openUniverse(b.dataset.univers);
    });

    document.body.addEventListener('click', (e) => {
      if (!U) return;
      const b = e.target.closest('[data-animal]');
      if (b && U.items.has(b.dataset.animal)) { e.preventDefault(); select(b.dataset.animal); return; }
      const tab = e.target.closest('[data-quiz]');
      if (tab) { startQuiz(Number(tab.dataset.quiz), true); return; }
      const ans = e.target.closest('[data-answer]');
      if (ans) { answer(ans.dataset.answer); return; }
      const act = e.target.closest('[data-quiz-action]');
      if (act) startQuiz(act.dataset.quizAction === 'next' ? (quiz.index + 1) % quizzes.length : quiz.index, true);
    });
    $('nextQuestion').addEventListener('click', next);
    window.addEventListener('hashchange', () => {
      const { u, animal } = parseHash();
      if (!u) return;
      if (!U || u !== U.id) openUniverse(u, animal);
      else if (animal && animal !== current && U.items.has(animal)) select(animal);
    });

    // Les liens du menu font défiler la page sans effacer l’animal choisi dans l’adresse.
    for (const link of document.querySelectorAll('a[href^="#"]')) {
      link.addEventListener('click', (e) => {
        const target = document.getElementById(link.getAttribute('href').slice(1));
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'start' });
        if (target.tabIndex < 0 && !target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      });
    }
  }

  async function init() {
    bindEvents();
    const { u, animal } = parseHash();
    await openUniverse(u || UNIVERS[0].id, animal, { initial: true });
    // Un lien partagé vers un animal (#recif/dugong) ouvre directement son réseau.
    if (U && animal && U.items.has(animal)) requestAnimationFrame(() => $('network').scrollIntoView({ block: 'start' }));
  }
  init();
})();
