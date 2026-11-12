'use strict';
(() => {
  const data = window.ECO_DATA;
  if (!data || !Array.isArray(data.species) || !Array.isArray(data.links)) {
    document.getElementById('speciesLibrary').textContent = 'Impossible de charger les données. Vérifie la présence du fichier data.js.';
    return;
  }
  const items = new Map(data.species.map(x => [x.id, x]));
  const $ = (id) => document.getElementById(id);
  const escapeHtml = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const normalized = s => String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const animals = data.species.filter(x => x.type === 'animal');
  const resources = data.species.filter(x => x.type === 'resource');
  const regionLabels = {west:'Afrique de l’Ouest',central:'Afrique centrale',east:'Afrique de l’Est',south:'Afrique australe',sahel:'Sahel'};
  function syncScrollHint(contentId,hintId){
    requestAnimationFrame(()=>{const content=$(contentId),hint=$(hintId);if(content&&hint)hint.hidden=content.scrollHeight<=content.clientHeight+1;});
  }
  function syncAllScrollHints(){
    syncScrollHint('speciesLibrary','speciesScrollHint');
    syncScrollHint('predList','predScrollHint');
    syncScrollHint('preyList','preyScrollHint');
  }
  function centerNetworkSlide(){
    requestAnimationFrame(()=>{
      const web=$('foodWeb'),center=$('centerAnimal')?.closest('.center-column');
      if(web&&center&&window.matchMedia('(max-width:740px)').matches){
        web.scrollLeft += center.getBoundingClientRect().left-web.getBoundingClientRect().left-(web.clientWidth-center.clientWidth)/2;
      }
      syncAllScrollHints();
    });
  }
  let current = (items.has(location.hash.slice(1)) ? location.hash.slice(1) : 'lion');
  let quizIndex = 0, score = 0, answered = false;
  const quizSets = [
  {
    "title": "À table !",
    "questions": [
      {
        "animal": "zebre",
        "emoji": "🦓",
        "q": "Que mange surtout le zèbre ?",
        "options": [
          {
            "id": "0",
            "text": "Des poissons"
          },
          {
            "id": "1",
            "text": "Des herbes"
          },
          {
            "id": "2",
            "text": "Des insectes"
          }
        ],
        "correct": "1",
        "why": "Le zèbre broute surtout des herbes. Ses dents coupent les tiges : c’est un herbivore.",
        "source": "https://animals.sandiegozoo.org/animals/zebra"
      },
      {
        "animal": "lion",
        "emoji": "🦁",
        "q": "Quel repas convient à un lion ?",
        "options": [
          {
            "id": "0",
            "text": "De la viande"
          },
          {
            "id": "1",
            "text": "Des feuilles seulement"
          },
          {
            "id": "2",
            "text": "Du nectar de fleurs"
          }
        ],
        "correct": "0",
        "why": "Le lion est carnivore. Il chasse notamment de grands herbivores, souvent avec d’autres lions.",
        "source": "https://kids.nationalgeographic.com/animals/mammals/facts/lion/"
      },
      {
        "animal": "girafe",
        "emoji": "🦒",
        "q": "La girafe est herbivore. Quel aliment lui convient ?",
        "options": [
          {
            "id": "0",
            "text": "Des œufs"
          },
          {
            "id": "1",
            "text": "Des poissons"
          },
          {
            "id": "2",
            "text": "Des feuilles"
          }
        ],
        "correct": "2",
        "why": "La girafe mange des végétaux. Sa grande taille lui permet d’atteindre des feuilles en hauteur.",
        "source": "https://kids.nationalgeographic.com/animals/mammals/facts/giraffe"
      },
      {
        "animal": "phacochere",
        "emoji": "🐗",
        "q": "Avec quoi le phacochère déterre-t-il des racines ?",
        "options": [
          {
            "id": "0",
            "text": "Sa queue"
          },
          {
            "id": "1",
            "text": "Son groin"
          },
          {
            "id": "2",
            "text": "Ses oreilles"
          }
        ],
        "correct": "1",
        "why": "Son groin puissant lui sert à fouiller le sol. Il mange notamment des herbes et des racines.",
        "source": "https://animals.sandiegozoo.org/animals/warthog"
      },
      {
        "animal": "suricate",
        "emoji": "🐾",
        "q": "Que cherche souvent le suricate en creusant ?",
        "options": [
          {
            "id": "0",
            "text": "Des insectes"
          },
          {
            "id": "1",
            "text": "Des algues marines"
          },
          {
            "id": "2",
            "text": "Des feuilles au sommet des arbres"
          }
        ],
        "correct": "0",
        "why": "Les insectes occupent une grande place dans son alimentation. Il peut aussi capturer d’autres petits animaux.",
        "source": "https://animals.sandiegozoo.org/animals/meerkat"
      }
    ]
  },
  {
    "title": "Des talents étonnants",
    "questions": [
      {
        "animal": "guepard",
        "emoji": "🐆",
        "q": "Quel animal est le plus rapide sur terre sur une courte distance ?",
        "options": [
          {
            "id": "0",
            "text": "Le zèbre"
          },
          {
            "id": "1",
            "text": "Le lion"
          },
          {
            "id": "2",
            "text": "Le guépard"
          }
        ],
        "correct": "2",
        "why": "Le guépard est un sprinteur : il court très vite sur une courte distance, pas pendant des heures.",
        "source": "https://kids.nationalgeographic.com/animals/mammals/facts/cheetah"
      },
      {
        "animal": "autruche",
        "emoji": "🪶",
        "q": "Comment l’autruche se déplace-t-elle pour fuir rapidement ?",
        "options": [
          {
            "id": "0",
            "text": "Elle s’envole"
          },
          {
            "id": "1",
            "text": "Elle court"
          },
          {
            "id": "2",
            "text": "Elle grimpe aux arbres"
          }
        ],
        "correct": "1",
        "why": "L’autruche ne vole pas. Ses longues pattes lui permettent de courir vite ; ses ailes l’aident à garder l’équilibre.",
        "source": "https://kids.nationalgeographic.com/animals/birds/facts/ostrich"
      },
      {
        "animal": "elephant",
        "emoji": "🐘",
        "q": "À quoi la trompe de l’éléphant peut-elle servir pendant un repas ?",
        "options": [
          {
            "id": "0",
            "text": "À saisir des végétaux"
          },
          {
            "id": "1",
            "text": "À mâcher à la place des dents"
          },
          {
            "id": "2",
            "text": "À fabriquer des feuilles"
          }
        ],
        "correct": "0",
        "why": "La trompe saisit des herbes ou des branches et les amène à la bouche. Elle sert aussi à sentir.",
        "source": "https://kids.nationalgeographic.com/animals/mammals/facts/african-elephant"
      },
      {
        "animal": "girafe",
        "emoji": "🦒",
        "q": "Que permet à la girafe sa grande hauteur ?",
        "options": [
          {
            "id": "0",
            "text": "De voir sous terre"
          },
          {
            "id": "1",
            "text": "De voler au-dessus des arbres"
          },
          {
            "id": "2",
            "text": "De repérer un danger de loin"
          }
        ],
        "correct": "2",
        "why": "Sa hauteur et sa bonne vue lui permettent de surveiller les alentours dans les milieux ouverts.",
        "source": "https://kids.nationalgeographic.com/animals/mammals/facts/giraffe"
      },
      {
        "animal": "autruche",
        "emoji": "🪶",
        "q": "L’autruche cache-t-elle sa tête dans le sable pour fuir ?",
        "options": [
          {
            "id": "0",
            "text": "Oui, toujours"
          },
          {
            "id": "1",
            "text": "Non, c’est une idée reçue"
          },
          {
            "id": "2",
            "text": "Seulement la nuit"
          }
        ],
        "correct": "1",
        "why": "Elle peut se coucher et allonger son cou près du sol. De loin, cela donne l’impression que sa tête est cachée.",
        "source": "https://kids.nationalgeographic.com/animals/birds/facts/ostrich"
      }
    ]
  },
  {
    "title": "La vie ensemble",
    "questions": [
      {
        "animal": "lion",
        "emoji": "🦁",
        "q": "Comment vivent généralement les lions ?",
        "options": [
          {
            "id": "0",
            "text": "En groupes appelés troupes"
          },
          {
            "id": "1",
            "text": "Toujours seuls"
          },
          {
            "id": "2",
            "text": "En colonies souterraines"
          }
        ],
        "correct": "0",
        "why": "Les lions vivent en groupes. Les membres peuvent chasser, défendre leur territoire et élever les petits ensemble.",
        "source": "https://kids.nationalgeographic.com/animals/mammals/facts/lion/"
      },
      {
        "animal": "suricate",
        "emoji": "🐾",
        "q": "Pourquoi un suricate fait-il le guet pendant que les autres cherchent à manger ?",
        "options": [
          {
            "id": "0",
            "text": "Pour choisir le plus grand"
          },
          {
            "id": "1",
            "text": "Pour surveiller les dangers"
          },
          {
            "id": "2",
            "text": "Pour attirer les prédateurs"
          }
        ],
        "correct": "1",
        "why": "Une sentinelle surveille les environs et peut donner l’alerte. Les adultes se relaient.",
        "source": "https://animals.sandiegozoo.org/animals/meerkat"
      },
      {
        "animal": "elephant",
        "emoji": "🐘",
        "q": "Avec qui voyagent généralement les jeunes éléphants ?",
        "options": [
          {
            "id": "0",
            "text": "Toujours seuls"
          },
          {
            "id": "1",
            "text": "Avec des lions"
          },
          {
            "id": "2",
            "text": "Avec les femelles du troupeau"
          }
        ],
        "correct": "2",
        "why": "Les femelles et les jeunes vivent en troupeaux. Les mâles adultes vivent souvent à part.",
        "source": "https://kids.nationalgeographic.com/animals/mammals/facts/african-elephant"
      },
      {
        "animal": "zebre",
        "emoji": "🦓",
        "q": "Pourquoi des troupeaux de zèbres se déplacent-ils quand les herbes sèchent ?",
        "options": [
          {
            "id": "0",
            "text": "Pour trouver de la nourriture et de l’eau"
          },
          {
            "id": "1",
            "text": "Pour changer leurs rayures"
          },
          {
            "id": "2",
            "text": "Pour vivre sous la mer"
          }
        ],
        "correct": "0",
        "why": "Lorsque les ressources manquent, les zèbres peuvent se déplacer vers de nouveaux pâturages et des points d’eau.",
        "source": "https://animals.sandiegozoo.org/animals/zebra"
      },
      {
        "animal": "suricate",
        "emoji": "🐾",
        "q": "Où les suricates trouvent-ils un abri ?",
        "options": [
          {
            "id": "0",
            "text": "Dans un nid au sommet d’un arbre"
          },
          {
            "id": "1",
            "text": "Dans des terriers"
          },
          {
            "id": "2",
            "text": "Au fond d’un lac"
          }
        ],
        "correct": "1",
        "why": "Les suricates vivent en groupes et s’abritent dans des terriers souterrains.",
        "source": "https://animals.sandiegozoo.org/animals/meerkat"
      }
    ]
  }
];
  let questions=quizSets[0].questions;
  let seriesIndex = 0;
  const culturalRefs = {lion:'Comme Simba dans Le Roi Lion (Disney).',phacochere:'Comme Pumba dans Le Roi Lion (Disney).',suricate:'Comme Timon dans Le Roi Lion (Disney).',hyene:'Comme Shenzi dans Le Roi Lion (Disney).',zebre:'Comme Marty dans Madagascar.',girafe:'Comme Melman dans Madagascar.',hippopotame:'Comme Gloria dans Madagascar.'};
  const init = () => {
    document.querySelector('.species-disclosure summary').textContent=`Voir les ${animals.length} animaux et groupes`;
    $('speciesSearch').addEventListener('input',()=>{document.querySelector('.species-disclosure').open=true;});
    $('groupFilter').addEventListener('change',()=>{document.querySelector('.species-disclosure').open=true;});
    for(const button of document.querySelectorAll('[data-slide]')) button.addEventListener('click',()=>{
      const web=$('foodWeb'), target=web.children[Number(button.dataset.slide)];
      web.scrollTo({left:target.offsetLeft-web.offsetLeft-(web.clientWidth-target.clientWidth)/2,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
    });
    $('animalCount').textContent = animals.length;
    $('linkCount').textContent = data.links.length;
    const groups = [...new Set(animals.map(x => x.group))].sort((a,b)=>a.localeCompare(b,'fr'));
    for (const g of groups) { const op=document.createElement('option'); op.value=g; op.textContent=g; $('groupFilter').appendChild(op); }
    $('speciesSearch').addEventListener('input', renderLibrary);
    $('groupFilter').addEventListener('change', renderLibrary);
    $('clearFilters').addEventListener('click',()=>{ $('speciesSearch').value=''; $('groupFilter').value='';renderLibrary(); });
    $('randomBtn').addEventListener('click',()=>{const options=animals.filter(x=>x.id!==current && data.links.some(r=>r.food===x.id || r.eater===x.id)); select(options[Math.floor(Math.random()*options.length)].id);});
    document.body.addEventListener('click', (event) => { const b=event.target.closest('[data-animal]'); if (b && items.has(b.dataset.animal)) select(b.dataset.animal); });
    window.addEventListener('hashchange',()=>{ const hash=location.hash.slice(1); if(items.has(hash)) select(hash,false); });
    window.addEventListener('resize',syncAllScrollHints);
    $('nextQuestion').addEventListener('click',()=>{ if (!answered) return; if (quizIndex===questions.length-1) {quizIndex=0;score=0;seriesIndex=(seriesIndex+1)%quizSets.length;questions=quizSets[seriesIndex].questions;} else {quizIndex++;}renderQuiz();$("quizQuestion").focus({preventScroll:true}); });
    renderLibrary(); renderNetwork(); renderQuiz(); syncAllScrollHints();
  };
  function select(id,updateUrl=true){
    if(!items.has(id)) return;
    current=id;
    if (updateUrl) history.replaceState(null,'','#'+id);
    const active=document.activeElement;
    const restoreChip=active?.matches?.('.species-chip:focus-visible')===true;
    const restoreRelation=active?.matches?.('.relation-card:focus-visible')===true;
    renderLibrary();renderNetwork();
    if(active?.closest('.chain-flow')) $('explorer').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
    if(restoreChip){
      const selectedChip=[...$('speciesLibrary').querySelectorAll('.species-chip')].find(button=>button.dataset.animal===id);
      selectedChip?.focus({preventScroll:true});
    }else if(restoreRelation){
      $('centerAnimal').focus({preventScroll:true});
    }
    // Keep the reader on the exploration view, not on a missing #id anchor.
  }
  function renderLibrary(){
    const term=normalized($('speciesSearch').value.trim()); const group=$('groupFilter').value;
    const visible=animals.filter(x=>(!group || x.group===group) && (!term || normalized(x.name+' '+x.scientific+' '+x.group).includes(term)));
    $('searchResults').textContent=`${visible.length} animal${visible.length>1?'s':''} trouvé${visible.length>1?'s':''}`;
    $('speciesLibrary').innerHTML=visible.length
      ? visible.map(x=>`<button type="button" class="species-chip" data-animal="${escapeHtml(x.id)}" aria-pressed="${x.id===current}"><span class="chip-emoji" aria-hidden="true">${escapeHtml(x.emoji)}</span>${escapeHtml(x.name)}</button>`).join('')
      : '<p class="empty-library">Aucun animal trouvé. Essaie un autre mot ou efface les filtres.</p>';
    syncScrollHint('speciesLibrary','speciesScrollHint');
  }
  function renderNetwork(){
    const x=items.get(current);if(!x)return;
    const consumers=data.links.filter(r=>r.food===current).map(r=>({...r,entity:items.get(r.eater)})).filter(r=>r.entity);
    const foods=data.links.filter(r=>r.eater===current).map(r=>({...r,entity:items.get(r.food)})).filter(r=>r.entity);
    $('predTitle').textContent=x.type==='resource'?'Qui en profite ?':'Qui le mange ?';
    $('preyTitle').textContent=x.type==='resource'?'Ce qu’il nourrit':'Que mange-t-il ?';
    $('predCount').textContent=consumers.length;
    $('preyCount').textContent=foods.length;
    $('predList').innerHTML=consumers.length? consumers.map(r=>relationCard(r,'pred-side')).join('') : '<p class="relation-empty">Aucun consommateur présenté ici pour cette sélection. Le réseau est volontairement simplifié.</p>';
    $('preyList').innerHTML=foods.length?foods.map(r=>relationCard(r,'prey-side')).join(''):'<p class="relation-empty">Aucun aliment représenté ici. Cela ne veut pas dire que cet être vivant ne mange rien !</p>';
    $('centerAnimal').innerHTML=`${culturalRefs[x.id]?`<aside class="culture-bubble">${escapeHtml(culturalRefs[x.id])}<small>Un clin d’œil à la fiction : découvre ici l’animal réel.</small></aside>`:''}<div class="center-icon" aria-hidden="true">${escapeHtml(x.emoji)}</div><span class="center-group">${escapeHtml(x.type==='resource'?'Ressource · '+x.group:x.group)}</span><h3>${escapeHtml(x.name)}</h3><span class="scientific">${escapeHtml(x.scientific||'Ressource naturelle')}</span><span class="center-diet">${escapeHtml(x.diet || 'Base du réseau alimentaire')}</span>`;
    $('profileHeading').textContent='Découvre : '+x.name;
    const blocks=[['🔎','À connaître',x.description],['🌿','Habitat',x.habitat],['🌍','Son rôle dans la nature',x.role],['✨','Le savais-tu ?',x.fun],['🌱','Piste de conservation',x.protect]];
    $('profileContent').innerHTML=blocks.map(b=>`<article class="profile-item"><span class="p-icon" aria-hidden="true">${b[0]}</span><h4>${b[1]}</h4><p>${escapeHtml(b[2])}</p></article>`).join('');
    renderHumanLayer(x);
    renderRange(x);
    syncScrollHint('predList','predScrollHint');
    syncScrollHint('preyList','preyScrollHint');
    centerNetworkSlide();
  }
  function renderHumanLayer(x){
    const entries=(data.humanInteractions||[]).filter(item=>item.species===x.id);
    const layer=$('humanLayer');
    layer.hidden=entries.length===0;
    $('humanPressureList').innerHTML=entries.map(item=>`<article class="human-pressure-card"><h4>🧑 ${escapeHtml(item.title)}</h4><p><strong>Exemple documenté : ${escapeHtml(item.region)}.</strong> ${escapeHtml(item.note)}</p><a href="${escapeHtml(item.sourceUrl)}" target="_blank" rel="noopener noreferrer">Lire la source TRAFFIC ↗</a></article>`).join('');
  }
  function renderRange(x){
    const regions=x.regions||[];
    for(const zone of document.querySelectorAll('[data-map-region]')) zone.classList.toggle('is-active',regions.includes(zone.dataset.mapRegion));
    $('rangeTitle').textContent=`Où trouver ${x.name.toLowerCase()} ?`;
    $('rangeSummary').textContent=regions.length ? `À chercher dans ces grandes régions : ${regions.map(r=>regionLabels[r]).join(', ')}.` : 'Ses régions ne sont pas encore indiquées sur cette carte.';
    $('rangeHabitat').textContent=`Son habitat : ${x.habitat || 'à préciser'}.`;
    for(const id of ['worldDesc','detailDesc']) $(id).textContent=$('rangeSummary').textContent+' Ces zones donnent des repères, pas une présence partout.';
  }
  function relationCard(r,side){
    const x=r.entity;const action=r.kind==='charognage'?'Charognage':r.kind==='vegetaux'?'Consommation végétale':r.kind==='detritivore'?'Consommation de matière morte':r.kind==='predation'?'Prédation':'Relation alimentaire';
    return `<button type="button" class="relation-card ${side}" data-animal="${escapeHtml(x.id)}" aria-label="Explorer ${escapeHtml(x.name)}"><span class="animal-emoji" aria-hidden="true">${escapeHtml(x.emoji)}</span><span class="rel-meta"><strong>${escapeHtml(x.name)}</strong><small>${escapeHtml(action)}${r.note?' · '+escapeHtml(r.note):''}</small></span><span class="rel-arrow" aria-hidden="true">↗</span></button>`;
  }
  function renderQuiz(){
    const q=questions[quizIndex];answered=false;
    $('quizSeries').textContent=`Quiz ${seriesIndex+1} sur 3 · ${quizSets[seriesIndex].title}`;
    $('quizProgress').textContent=`QUESTION ${quizIndex+1} / ${questions.length}`;
    $('quizQuestion').textContent=q.q;
    $('quizAnimal').textContent=q.emoji;
    $('quizSource').hidden=true;
    $('quizFeedback').textContent='';
    $('nextQuestion').disabled=true;
    $('nextQuestion').textContent=quizIndex===questions.length-1?`Passer au quiz ${(seriesIndex+1)%3+1} / 3 →`:'Question suivante →';
    $('quizAnswers').innerHTML=q.options.map(option=>`<button class="answer-btn" data-answer="${escapeHtml(option.id)}" type="button">${escapeHtml(option.text)}</button>`).join('');
    for(const b of $('quizAnswers').querySelectorAll('button')) b.addEventListener('click',()=>answer(b.dataset.answer));
  }
  function answer(id){
    if(answered)return;
    answered=true;
    const q=questions[quizIndex];let correct=id===q.correct;
    if(correct)score++;
    for(const btn of $('quizAnswers').querySelectorAll('button')){
      btn.disabled=true;
      if(btn.dataset.answer===q.correct)btn.classList.add('correct');
      if(btn.dataset.answer===id && !correct)btn.classList.add('wrong');
    }
    $('quizFeedback').textContent=(correct?'✓ Bonne réponse ! ':'Pas tout à fait. ')+q.why+(quizIndex===questions.length-1?` Auto-test terminé : ${score}/${questions.length}. Ce score porte seulement sur ces cinq questions.`:'');
    $('quizSource').href=q.source;
    $('quizSource').hidden=false;
    $('nextQuestion').disabled=false;
  }
  init();
})();
