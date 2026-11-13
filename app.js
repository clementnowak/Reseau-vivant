'use strict';
/* Réseau vivant — logique de la page (aucune dépendance, aucun traceur). */
(() => {
  const data = window.ECO_DATA;
  const $ = (id) => document.getElementById(id);
  if (!data || !Array.isArray(data.species) || !Array.isArray(data.links)) {
    $('speciesLibrary').textContent = 'Impossible de charger les données. Recharge la page.';
    return;
  }

  /* ---------- Données et utilitaires ---------- */
  const items = new Map(data.species.map((x) => [x.id, x]));
  // Silhouette dessinée (sprite SVG intégré à index.html) ; repli sur l’émoji si absente.
  function sil(id, fallback) {
    return items.has(id) && document.getElementById(`s-${id}`)
      ? `<svg class="sil" viewBox="0 -14 100 82" aria-hidden="true" focusable="false"><use href="#s-${escapeHtml(id)}"></use></svg>`
      : escapeHtml(fallback || '•');
  }
  const animals = data.species.filter((x) => x.type === 'animal');
  const escapeHtml = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const normalized = (s) => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const shuffle = (arr) => { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const eatersOf = (id) => data.links.filter((l) => l.food === id);
  const foodsOf = (id) => data.links.filter((l) => l.eater === id);

  // Articles français : « le lion », « la girafe », « l’éléphant », « les herbes ».
  const feminine = new Set(['hyene', 'gazelle', 'girafe', 'autruche', 'outarde_kori']);
  const plural = new Set(['herbes', 'feuilles', 'carcasses', 'racines', 'detritus', 'fruits_graines']);
  const elided = new Set(['hippotrague_rouan', 'hippotrague_noir']); // h muet
  const shortName = (x) => x.short || x.name.replace(/\s*\(.*\)$/, '');
  const lowerFirst = (s) => s.charAt(0).toLowerCase() + s.slice(1);
  function withArticle(x, kind = 'def') {
    const n = lowerFirst(shortName(x));
    const de = kind === 'de';
    if (plural.has(x.id)) return (de ? 'des ' : 'les ') + n;
    if (elided.has(x.id) || ('aeiouy'.includes(normalized(n).charAt(0)) && x.id !== 'hyene')) return (de ? 'de l’' : 'l’') + n;
    if (feminine.has(x.id)) return (de ? 'de la ' : 'la ') + n;
    return (de ? 'du ' : 'le ') + n;
  }
  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const nbsp = (s) => String(s).replace(/ ([?!:;»])/g, '\u00a0$1').replace(/« /g, '«\u00a0');
  const pronoun = (x) => (feminine.has(x.id) ? 'elle' : 'il');

  const regionLabels = { west: 'Afrique de l’Ouest', central: 'Afrique centrale', east: 'Afrique de l’Est', south: 'Afrique australe (le Sud)', sahel: 'Sahel' };
  const regionIn = { west: 'en Afrique de l’Ouest', central: 'en Afrique centrale', east: 'en Afrique de l’Est', south: 'en Afrique australe (le Sud)', sahel: 'au Sahel' };
  const joinFr = (arr) => (arr.length > 1 ? `${arr.slice(0, -1).join(', ')} et ${arr[arr.length - 1]}` : arr[0] || '');
  const regionShort = { west: 'Ouest', central: 'Centre', east: 'Est', south: 'Sud', sahel: 'Sahel' };
  const eaterLabels = { predation: 'prédateur', charognage: 'mange les restes', vegetaux: 'en mange', detritivore: 'décomposeur' };
  const foodLabels = { predation: '', charognage: 'restes d’animaux', vegetaux: '', detritivore: 'matière morte' };
  const culturalRefs = {
    lion: 'Comme Simba dans « Le Roi Lion ».', phacochere: 'Comme Pumbaa dans « Le Roi Lion ».', suricate: 'Comme Timon dans « Le Roi Lion ».',
    hyene: 'Comme Shenzi dans « Le Roi Lion ».', zebre: 'Comme Marty dans « Madagascar ».', girafe: 'Comme Melman dans « Madagascar ».'
  };

  const DEFAULT_ANIMAL = 'zebre';
  let current = items.has(location.hash.slice(1)) ? location.hash.slice(1) : DEFAULT_ANIMAL;
  let activeGroup = '';
  let libraryOpen = false;

  /* ---------- Bibliothèque d’animaux ---------- */
  const filters = [
    { id: '', label: 'Tous', test: (x) => x.type === 'animal' },
    { id: 'chasseurs', label: '🦁 Chasseurs', test: (x) => x.type === 'animal' && normalized(x.diet).startsWith('carnivore') },
    { id: 'herbivores', label: '🌿 Herbivores', test: (x) => x.type === 'animal' && normalized(x.diet).includes('herbivore') },
    { id: 'omnivores', label: '🍽️ Omnivores', test: (x) => x.type === 'animal' && normalized(x.diet).startsWith('omnivore') },
    { id: 'insectes', label: '🐜 Mangeurs d’insectes', test: (x) => x.type === 'animal' && normalized(x.diet).includes('insectivore') },
    { id: 'oiseaux', label: '🪶 Oiseaux', test: (x) => x.group === 'Oiseaux' },
    { id: 'plantes', label: '🌳 Plantes et restes', test: (x) => x.type === 'resource' }
  ];
  function renderFilters() {
    $('groupFilters').innerHTML = filters.map((f) => `<button type="button" class="filter-chip" data-group="${f.id}" aria-pressed="${f.id === activeGroup}">${escapeHtml(f.label)}</button>`).join('');
  }

  function renderLibrary() {
    const term = normalized($('speciesSearch').value.trim());
    const filter = filters.find((f) => f.id === activeGroup) || filters[0];
    const pool = term ? data.species : data.species.filter(filter.test);
    const visible = pool.filter((x) => (!activeGroup || filter.test(x)) && (!term || normalized(`${x.name} ${x.scientific} ${x.group} ${x.keywords || ''}`).includes(term)));
    const filtering = Boolean(term || activeGroup);
    const n = visible.length;
    $('searchResults').textContent = filtering ? `${n} ${n > 1 ? 'résultats' : 'résultat'}` : '';
    $('speciesLibrary').innerHTML = n
      ? visible.map((x) => `<button type="button" class="species-chip" data-animal="${escapeHtml(x.id)}" aria-pressed="${x.id === current}"><span class="chip-emoji" aria-hidden="true">${sil(x.id, x.emoji)}</span>${escapeHtml(shortName(x))}</button>`).join('')
      : '<p class="empty-library">Rien trouvé. Essaie un autre mot, comme « antilope », « singe » ou « oiseau » !</p>';
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
      toggle.textContent = libraryOpen ? 'Voir moins d’animaux' : `Voir les ${animals.length} animaux`;
    });
  }

  /* ---------- Réseau ---------- */
  function relationCard(link, entityId, side) {
    const x = items.get(entityId);
    if (!x) return '';
    const generic = (side === 'eaters' ? eaterLabels : foodLabels)[link.kind] || '';
    const note = link.note && !(side === 'eaters' && link.foodSideOnly) ? link.note : generic;
    return `<button type="button" class="relation-card" data-animal="${escapeHtml(x.id)}" aria-label="${escapeHtml(shortName(x))}${note ? ', ' + escapeHtml(note) : ''}. Placer au centre">`
      + `<span class="animal-emoji" aria-hidden="true">${sil(x.id, x.emoji)}</span>`
      + `<span class="rel-meta"><strong>${escapeHtml(shortName(x))}</strong>${note ? `<small>${escapeHtml(note)}</small>` : ''}</span></button>`;
  }

  function renderNetwork() {
    const x = items.get(current);
    if (!x) return;
    const eaters = eatersOf(current);
    const foods = foodsOf(current);
    const isResource = x.type === 'resource';
    const fem = feminine.has(x.id);
    $('predTitle').innerHTML = `<span aria-hidden="true">⬆️</span> ${isResource ? 'Qui en mange ?' : `Qui ${fem ? 'la' : 'le'} mange ?`}`;
    $('preyTitle').innerHTML = `<span aria-hidden="true">⬇️</span> ${isResource ? 'D’où vient son énergie ?' : `Que mange-t-${pronoun(x)} ?`}`;
    $('preyList').classList.toggle('is-long', foods.length > 8);
    $('predCount').textContent = eaters.length || '';
    $('preyCount').textContent = foods.length || '';
    $('predList').innerHTML = eaters.length
      ? eaters.map((l) => relationCard(l, l.eater, 'eaters')).join('')
      : `<p class="relation-empty">${escapeHtml(x.noPredator || 'Aucun prédateur n’est montré ici pour l’instant.')}</p>`;
    $('preyList').innerHTML = foods.length
      ? foods.map((l) => relationCard(l, l.food, 'foods')).join('')
      : `<p class="relation-empty">${isResource ? (x.group === 'Végétaux' ? '☀️ Une plante fabrique sa propre nourriture grâce à la lumière du Soleil, à l’eau et à l’air.' : '♻️ Cette matière vient d’êtres vivants morts. Elle sera recyclée et nourrira à nouveau le sol.') : 'Son alimentation n’est pas encore renseignée.'}</p>`;

    const badges = [x.diet, x.group].filter(Boolean).map((b) => `<span class="badge">${escapeHtml(b)}</span>`).join('');
    $('centerAnimal').innerHTML = `<p class="center-kicker">Au centre du réseau</p><div class="center-icon" aria-hidden="true">${sil(x.id, x.emoji)}</div>`
      + `<h3>${escapeHtml(x.name)}</h3>${x.scientific ? `<span class="scientific">${escapeHtml(x.scientific)}</span>` : ''}`
      + `<div class="center-badges">${badges}</div>`
      + (culturalRefs[x.id] ? `<p class="culture-bubble">🎬 ${escapeHtml(nbsp(culturalRefs[x.id]))} Ici, découvre le vrai animal !</p>` : '');
    $('liveCenter').textContent = `${capitalize(withArticle(x))} ${plural.has(x.id) ? 'sont' : 'est'} maintenant au centre du réseau.`;

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
    const sourced = foodsOf(x.id).concat(eatersOf(x.id)).filter((l) => l.source);
    const sources = [...new Set([x.source, ...sourced.map((l) => l.source)].filter(Boolean))];
    if (sources.length) {
      html += `<article class="profile-item"><span class="p-icon" aria-hidden="true">📚</span><h4>Pour aller plus loin</h4><p>${sources.map((u, i) => `<a href="${escapeHtml(u)}" target="_blank" rel="noopener noreferrer">Source ${i + 1} ↗</a>`).join(' · ')}</p></article>`;
    }
    $('profileContent').innerHTML = html;
  }

  function renderRange(x) {
    const regions = x.regions || [];
    for (const r of Object.keys(regionLabels)) {
      const el = $(`map-${r}`);
      if (el) el.classList.toggle('is-active', regions.includes(r));
      const label = document.querySelector(`.region-label[data-region="${r}"]`);
      if (label) label.classList.toggle('is-active', regions.includes(r));
    }
    $('rangeTitle').textContent = x.type === 'resource' ? `Où trouve-t-on ${withArticle(x)} ?` : `Où vit ${withArticle(x)} ?`;
    $('mapCaption').textContent = x.type === 'resource' ? 'Les régions où on en trouve' : `Les régions où ${pronoun(x)} vit`;
    $('mapLegend').textContent = x.type === 'resource' ? 'On en trouve dans ces régions' : `${capitalize(pronoun(x))} vit dans ces régions`;
    const list = joinFr(regions.map((r) => regionIn[r]));
    $('rangeSummary').innerHTML = regions.length
      ? `${x.type === 'resource' ? 'On en trouve' : (feminine.has(x.id) ? 'On la trouve' : 'On le trouve')} surtout <strong>${escapeHtml(list)}</strong>.`
      : 'Sa répartition n’est pas encore renseignée.';
    const svg = $('africaMap');
    svg.querySelector('desc').textContent = regions.length ? `Régions coloriées : ${regions.map((r) => regionShort[r]).join(', ')}.` : 'Aucune région coloriée.';
  }

  function renderHumanLayer(x) {
    const entries = (data.humanInteractions || []).filter((h) => h.species === x.id);
    $('humanLayer').hidden = entries.length === 0;
    $('humanPressureList').innerHTML = entries.map((h) => `<article class="human-pressure-card"><h4>🧑 ${escapeHtml(h.title)} — ${escapeHtml(h.region)}</h4><p>${escapeHtml(h.note)}</p><a href="${escapeHtml(h.sourceUrl)}" target="_blank" rel="noopener noreferrer">Lire l’étude (en anglais) ↗</a></article>`).join('');
  }

  function select(id, { scroll = true } = {}) {
    if (!items.has(id)) return;
    current = id;
    history.replaceState(null, '', `#${id}`);
    renderLibrary();
    renderNetwork();
    if (scroll) {
      const desktop = window.matchMedia('(min-width: 960px)').matches;
      (desktop ? $('network') : $('centerAnimal')).scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: desktop ? 'start' : 'center' });
      $('centerAnimal').focus({ preventScroll: true });
    }
  }

  /* ---------- Quiz ---------- */
  const dietKind = (x) => {
    const d = normalized(x.diet);
    if (d.startsWith('herbivore') || d.startsWith('principalement herbivore')) return 'herbivore';
    if (d.startsWith('carnivore')) return 'carnivore';
    if (d.startsWith('omnivore')) return 'omnivore';
    if (d.startsWith('insectivore')) return 'insectivore';
    return '';
  };
  const strictHerbivores = animals.filter((x) => normalized(x.diet).startsWith('herbivore') && !foodsOf(x.id).some((l) => items.get(l.food)?.type === 'animal'));
  const opt = (x) => ({ id: x.id, text: shortName(x), emoji: x.emoji, sil: x.id });

  const REGION_QUIZ = ['gazelle', 'springbok', 'suricate'];
  const common = (l) => !l.rare;
  const bigHunters = ['lion', 'crocodile', 'guepard', 'lycaon', 'hyene'].map((id) => items.get(id));
  const insectEaters = ['proteles', 'pangolin', 'orycterope'].map((id) => items.get(id));
  const bigPlantEaters = ['elephant', 'rhino_blanc', 'rhino_noir'].map((id) => items.get(id));
  const tinyFoods = ['termite', 'criquet'].map((id) => items.get(id));
  function qWhoEats() {
    // Leurres plausibles mais faux : des mangeurs de termites pour une proie vertébrée,
    // de grands chasseurs pour un insecte.
    const prey = pick(animals.filter((x) => eatersOf(x.id).some((l) => l.kind === 'predation' && common(l))));
    const eater = items.get(pick(eatersOf(prey.id).filter((l) => l.kind === 'predation' && common(l))).eater);
    const eaterIds = new Set(eatersOf(prey.id).map((l) => l.eater));
    const pool = (prey.group === 'Invertébrés' ? bigHunters : insectEaters).filter((w) => !eaterIds.has(w.id) && w.id !== prey.id);
    const wrong = shuffle(pool).slice(0, 2);
    const why = prey.group === 'Invertébrés'
      ? `${capitalize(withArticle(eater))} mange ${withArticle(prey)}. ${capitalize(joinFr(wrong.map((w) => withArticle(w))))} chassent de bien plus grosses proies.`
      : `${capitalize(withArticle(eater))} peut chasser ${withArticle(prey)}. ${capitalize(joinFr(wrong.map((w) => withArticle(w))))} mangent surtout des termites et des fourmis.`;
    return { emoji: prey.emoji, q: `Lequel de ces animaux peut manger ${withArticle(prey)} ?`, options: shuffle([opt(eater), ...wrong.map(opt)]), correct: eater.id, why, animal: prey.id };
  }
  function qWhatEats() {
    const herb = pick(strictHerbivores.filter((x) => foodsOf(x.id).length));
    const food = items.get(pick(foodsOf(herb.id)).food);
    const wrong = shuffle(animals.filter((a) => a.id !== herb.id && a.group === 'Mammifères' && eatersOf(a.id).length)).slice(0, 2);
    return { emoji: herb.emoji, q: `Que mange ${withArticle(herb)} ?`, options: shuffle([opt(food), ...wrong.map(opt)]), correct: food.id,
      why: `${capitalize(withArticle(herb))} est herbivore : ${pronoun(herb)} mange des plantes, comme ${withArticle(food)}.`, animal: herb.id };
  }
  function qPredatorFood() {
    const hunter = pick(animals.filter((x) => dietKind(x) === 'carnivore' && foodsOf(x.id).some((l) => l.kind === 'predation' && common(l))));
    const prey = items.get(pick(foodsOf(hunter.id).filter((l) => l.kind === 'predation' && common(l))).food);
    const foodIds = new Set(foodsOf(hunter.id).map((l) => l.food));
    const big = bigHunters.some((b) => b.id === hunter.id);
    // Un grand chasseur ne chasse pas les termites ; un petit chasseur ne chasse pas un éléphant.
    const pool = (big ? tinyFoods : bigPlantEaters).filter((w) => !foodIds.has(w.id));
    const plant = pick(data.species.filter((s) => s.type === 'resource' && s.group === 'Végétaux'));
    const wrong = [pick(pool), plant];
    return { emoji: hunter.emoji, q: `Lequel de ces repas ${withArticle(hunter)} peut-${pronoun(hunter)} chasser ?`, options: shuffle([opt(prey), ...wrong.map(opt)]), correct: prey.id,
      why: `${capitalize(withArticle(hunter))} chasse notamment ${withArticle(prey)}. ${big ? 'Les termites et les criquets sont bien trop petits pour un si grand chasseur.' : `${capitalize(withArticle(wrong[0]))} est bien trop gros pour ${pronoun(hunter) === 'elle' ? 'elle' : 'lui'}.`}`, animal: hunter.id };
  }
  function qDiet() {
    const x = pick(animals.filter((a) => ['herbivore', 'carnivore', 'omnivore'].includes(dietKind(a))));
    const k = dietKind(x);
    const words = { herbivore: 'des plantes', carnivore: 'des animaux', omnivore: 'un peu de tout' };
    return { emoji: x.emoji, q: `${capitalize(withArticle(x))} est plutôt…`, options: [
      { id: 'herbivore', text: 'Herbivore (mange des plantes)', emoji: '🌿' },
      { id: 'carnivore', text: 'Carnivore (mange des animaux)', emoji: '🥩' },
      { id: 'omnivore', text: 'Omnivore (mange de tout)', emoji: '🍽️' }], correct: k,
      why: `${capitalize(withArticle(x))} est ${k} : ${pronoun(x)} mange ${words[k]}.`, animal: x.id };
  }
  function qRegion() {
    // Seulement des espèces vivant dans une seule grande région, pour que les leurres soient vraiment faux.
    const x = pick(animals.filter((a) => REGION_QUIZ.includes(a.id)));
    const right = pick(x.regions);
    const wrong = shuffle(Object.keys(regionShort).filter((r) => !x.regions.includes(r))).slice(0, 2);
    return { emoji: x.emoji, q: `Dans quelle région d’Afrique vit ${withArticle(x)} ?`, options: shuffle([right, ...wrong].map((r) => ({ id: r, text: regionLabels[r], emoji: '🗺️' }))), correct: right,
      why: `On trouve ${withArticle(x)} surtout ${joinFr(x.regions.map((r) => regionIn[r]))}. Regarde sa carte !`, animal: x.id };
  }
  
  const curiosities = [
    { emoji: '💨', q: 'Quel est l’animal terrestre le plus rapide ?', options: [['guepard', 'Le guépard'], ['lion', 'Le lion'], ['zebre', 'Le zèbre']], correct: 'guepard', why: 'Le guépard peut dépasser 90 km/h, mais seulement pendant quelques secondes.', animal: 'guepard' },
    { emoji: '🪶', q: 'Quel oiseau ne vole pas, mais court très vite ?', options: [['autruche', 'L’autruche'], ['aigle', 'L’aigle martial'], ['vautour', 'Le vautour']], correct: 'autruche', why: 'L’autruche est le plus grand oiseau du monde. Ses longues pattes en font une excellente coureuse.', animal: 'autruche' },
    { emoji: '🦏', q: 'De quelle couleur sont les rhinocéros « noir » et « blanc » ?', options: [['gris', 'Ils sont tous les deux gris', '🩶'], ['nb', 'L’un noir, l’autre blanc', '⚫'], ['brun', 'Marron et beige', '🟤']], correct: 'gris', why: 'Les deux sont gris ! On les reconnaît à la forme de leur lèvre : pointue chez le noir, large chez le blanc.', animal: 'rhino_noir' },
    { emoji: '🛡️', q: 'Qu’est-ce qui recouvre le corps du pangolin ?', options: [['ecailles', 'Des écailles', '🛡️'], ['plumes', 'Des plumes', '🪶'], ['piquants', 'Des piquants', '🌵']], correct: 'ecailles', why: 'Les pangolins sont les seuls mammifères couverts d’écailles, faites de kératine comme nos ongles.', animal: 'pangolin' },
    { emoji: '🐜', q: 'Le termite est-il une fourmi ?', options: [['non', 'Non, c’est un cousin des blattes', '🪳'], ['oui', 'Oui, c’est une sorte de fourmi', '🐜'], ['arai', 'Non, c’est une petite araignée', '🕷️']], correct: 'non', why: 'Ils se ressemblent et vivent tous deux en colonies, mais le termite est un proche cousin des blattes.', animal: 'termite' },
    { emoji: '🐜', q: 'Que mange surtout le protèle, cousin de la hyène ?', options: [['termite', 'Des termites'], ['zebre', 'Des zèbres'], ['marula', 'Des fruits']], correct: 'termite', why: 'Le protèle peut avaler des centaines de milliers de termites en une seule nuit !', animal: 'proteles' },
    { emoji: '🌳', q: 'Comment le léopard protège-t-il sa proie des voleurs ?', options: [['arbre', 'Il la monte dans un arbre', '🌳'], ['terre', 'Il l’enterre', '🕳️'], ['eau', 'Il la cache dans l’eau', '💧']], correct: 'arbre', why: 'En hauteur, sa proie est à l’abri des lions et des hyènes.', animal: 'leopard' },
    { emoji: '👀', q: 'Que fait le suricate « sentinelle » ?', options: [['garde', 'Il surveille les dangers', '👀'], ['chasse', 'Il chasse pour tout le groupe', '🎯'], ['dort', 'Il dort pendant la journée', '😴']], correct: 'garde', why: 'Pendant que les autres cherchent à manger, il monte la garde et donne l’alerte.', animal: 'suricate' },
    { emoji: '🦓', q: 'Les rayures des zèbres sont…', options: [['unique', 'Uniques pour chaque zèbre', '🔍'], ['pareil', 'Les mêmes pour tous', '📋'], ['change', 'Différentes chaque année', '📅']], correct: 'unique', why: 'Comme nos empreintes digitales, les rayures sont propres à chaque zèbre.', animal: 'zebre' },
    { emoji: '🦴', q: 'Que mange le vautour ?', options: [['carcasses', 'Des animaux déjà morts'], ['herbes', 'De l’herbe'], ['elephant', 'Des éléphants vivants']], correct: 'carcasses', why: 'Le vautour est un charognard : il nettoie la savane en mangeant les restes.', animal: 'vautour' },
    { emoji: '🗣️', q: 'Pourquoi le vervet a-t-il plusieurs cris d’alarme ?', options: [['danger', 'Un cri différent pour chaque danger', '🚨'], ['chanter', 'Pour chanter le matin', '🎵'], ['pluie', 'Pour appeler la pluie', '🌧️']], correct: 'danger', why: 'Il ne crie pas pareil pour un aigle, un léopard ou un serpent. Les autres savent ainsi où se cacher !', animal: 'singe_vervet' },
    { emoji: '🧭', q: 'Pourquoi les gnous font-ils de grandes migrations ?', options: [['herbe', 'Pour suivre l’herbe fraîche', '🌱'], ['froid', 'Pour fuir la neige', '❄️'], ['mer', 'Pour aller se baigner à la mer', '🌊']], correct: 'herbe', why: 'Ils suivent les pluies, qui font pousser de l’herbe fraîche. Plus d’un million de gnous migrent en Afrique de l’Est.', animal: 'gnou' },
    { emoji: '🍯', q: 'Quelle friandise l’outarde kori adore-t-elle ?', options: [['gomme', 'La gomme des acacias', '🌳'], ['miel', 'Le miel des abeilles', '🍯'], ['choco', 'Les fruits du baobab', '🥥']], correct: 'gomme', why: 'En afrikaans, on la surnomme même « gompou », le paon à gomme !', animal: 'outarde_kori' },
    { emoji: '👂', q: 'Où se trouvent les « oreilles » du criquet ?', options: [['ventre', 'Sur les côtés du ventre', '🦗'], ['tete', 'Sur la tête', '🧠'], ['ailes', 'Sous les ailes', '🪽']], correct: 'ventre', why: 'Le criquet entend grâce à de fines membranes situées sur les côtés de son ventre.', animal: 'criquet' },
    { emoji: '🦁', q: 'Dans une troupe de lions, qui chasse le plus souvent ?', options: [['lionnes', 'Les lionnes', '🦁'], ['bebes', 'Les lionceaux', '🐾'], ['vieux', 'Les vieux mâles', '👴']], correct: 'lionnes', why: 'Les lionnes font la plupart des chasses en équipe, mais les mâles chassent aussi.', animal: 'lion' },
    { emoji: '🐘', q: 'Combien de végétaux un éléphant peut-il manger par jour ?', options: [['100', 'Plus de 100 kg', '🐘'], ['1', 'Environ 1 kg', '🍎'], ['10', 'Environ 10 kg', '🥗']], correct: '100', why: 'Il passe une grande partie de sa journée à manger herbes, feuilles, écorces et fruits.', animal: 'elephant' }
  ].map((c) => ({ ...c, options: c.options.map(([id, text, emoji]) => ({ id, text, emoji: emoji || items.get(id)?.emoji || '•', sil: emoji ? '' : id })) }));

  const quizzes = [
    { id: 'reseau', title: 'Qui mange qui ?', icon: '🕸️', make: () => [qWhoEats(), qWhatEats(), qPredatorFood(), qWhoEats(), pick([qWhatEats, qPredatorFood])()] },
    { id: 'curieux', title: 'Drôles de bêtes', icon: '✨', make: () => shuffle(curiosities).slice(0, 5).map((c) => ({ ...c, options: shuffle(c.options) })) },
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
    while (out.length < 5) { const extra = qDiet(); if (!seen.has(extra.q)) { seen.add(extra.q); out.push(extra); } }
    return out.slice(0, 5);
  }
  function renderQuestion(focus) {
    const q = quiz.questions[quiz.step];
    quiz.answered = false;
    $('quizProgress').textContent = `Question ${quiz.step + 1} sur ${quiz.questions.length}`;
    $('quizScore').textContent = `⭐ ${quiz.score}`;
    $('quizBar').style.width = `${(quiz.step / quiz.questions.length) * 100}%`;
    $('quizQuestion').hidden = false;
    $('quizQuestion').innerHTML = `<span class="quiz-big-emoji" aria-hidden="true">${q.animal ? sil(q.animal, q.emoji) : escapeHtml(q.emoji)}</span>${escapeHtml(nbsp(q.q))}`;
    $('quizAnswers').innerHTML = q.options.map((o) => `<button type="button" class="answer-btn" data-answer="${escapeHtml(o.id)}"><span class="a-emoji" aria-hidden="true">${o.sil ? sil(o.sil, o.emoji) : escapeHtml(o.emoji)}</span>${escapeHtml(o.text)}</button>`).join('');
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
    const a = items.get(q.animal);
    $('quizFeedback').innerHTML = `<span class="verdict">${ok ? pick(['Bravo ! 🎉', 'Exact ! 👏', 'Bien joué ! 🌟']) : 'Pas tout à fait… 🤔'}</span>${escapeHtml(nbsp(q.why))}`
      + (a ? `<br><button type="button" class="see-animal" data-animal="${escapeHtml(a.id)}"><span class="see-ico" aria-hidden="true">${sil(a.id, a.emoji)}</span> Voir ${escapeHtml(withArticle(a))} dans le réseau</button>` : '');
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
    const msg = quiz.score === total ? 'Parfait ! Tu es un vrai expert de la savane.' : quiz.score >= 3 ? 'Très bien ! Encore un petit effort pour le sans-faute.' : 'Bon début ! Explore le réseau puis réessaie.';
    const nextIndex = (quiz.index + 1) % quizzes.length;
    $('quizProgress').textContent = 'Quiz terminé';
    $('quizQuestion').hidden = true;
    $('quizAnswers').innerHTML = `<div class="quiz-end"><span class="medal" aria-hidden="true">${medal}</span><h3 tabindex="-1" id="quizEndTitle">${quiz.score} / ${total}</h3><p>${msg}</p>`
      + `<button type="button" class="quiz-next" data-quiz-action="replay">Rejouer avec d’autres questions</button>`
      + `<button type="button" class="quiz-next secondary" data-quiz-action="next">Quiz suivant : ${escapeHtml(quizzes[nextIndex].title)}</button></div>`;
    $('quizFeedback').innerHTML = '';
    $('nextQuestion').hidden = true;
    $('quizEndTitle').focus({ preventScroll: true });
  }

  /* ---------- Initialisation ---------- */
  function init() {
    $('animalCount').textContent = animals.length;
    $('linkCount').textContent = data.links.length;
    $('sourceList').innerHTML = (data.sources || []).map((s) => `<li><a href="${escapeHtml(s.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(s.name)} ↗</a></li>`).join('');

    renderFilters();
    $('groupFilters').addEventListener('click', (e) => {
      const b = e.target.closest('[data-group]');
      if (!b) return;
      activeGroup = b.dataset.group;
      renderFilters(); renderLibrary();
    });
    $('speciesSearch').addEventListener('input', renderLibrary);
    $('toggleLibrary').addEventListener('click', () => { libraryOpen = !libraryOpen; renderLibrary(); });
    $('randomBtn').addEventListener('click', () => select(pick(animals.filter((x) => x.id !== current)).id));

    document.body.addEventListener('click', (e) => {
      const b = e.target.closest('[data-animal]');
      if (b && items.has(b.dataset.animal)) { e.preventDefault(); select(b.dataset.animal); return; }
      const tab = e.target.closest('[data-quiz]');
      if (tab) { startQuiz(Number(tab.dataset.quiz), true); return; }
      const ans = e.target.closest('[data-answer]');
      if (ans) { answer(ans.dataset.answer); return; }
      const act = e.target.closest('[data-quiz-action]');
      if (act) startQuiz(act.dataset.quizAction === 'next' ? (quiz.index + 1) % quizzes.length : quiz.index, true);
    });
    $('nextQuestion').addEventListener('click', next);
    window.addEventListener('hashchange', () => { const h = location.hash.slice(1); if (items.has(h) && h !== current) select(h); });

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

    renderLibrary();
    renderNetwork();
    startQuiz(0);
    // Un lien partagé vers un animal (#girafe) ouvre directement son réseau.
    if (items.has(location.hash.slice(1))) requestAnimationFrame(() => $('network').scrollIntoView({ block: 'start' }));
  }
  init();
})();
