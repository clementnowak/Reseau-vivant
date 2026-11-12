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
  const regionMapIds = {west:'mapWest',central:'mapCentral',east:'mapEast',south:'mapSouth',sahel:'mapSahel'};
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
  let questions = [
    {q:'Dans « Herbes → Zèbre », que signifie la flèche ?',options:[{id:'wrong_arrow',text:'Le zèbre fournit de l’énergie aux herbes.'},{id:'arrow_resource_consumer',text:'Les herbes peuvent être consommées par le zèbre.'},{id:'arrow_growth',text:'Les herbes se transforment en zèbre.'}],correct:'arrow_resource_consumer',why:'La flèche va de la nourriture vers celui qui la consomme : elle représente le transfert de matière et d’énergie.'},
    {q:'Tu ne vois pas de lien entre deux organismes dans ce réseau. Que peux-tu conclure ?',options:[{id:'no_relation',text:'Ils n’interagissent jamais dans la nature.'},{id:'not_shown',text:'Le modèle ne montre pas ce lien ; il peut être incomplet.'},{id:'same_diet',text:'Ils mangent forcément la même chose.'}],correct:'not_shown',why:'Ce réseau est une sélection d’exemples. Une relation non dessinée n’est pas une preuve qu’elle n’existe pas.'},
    {q:'Qu’est-ce que la biodiversité ?',options:[{id:'variety',text:'La variété du vivant : milieux, espèces et individus.'},{id:'animals_only',text:'Le nombre d’animaux dans un seul endroit.'},{id:'food_links',text:'Uniquement les liens entre prédateurs et proies.'}],correct:'variety',why:'La biodiversité concerne plusieurs niveaux, dont les milieux, les espèces et la diversité entre individus d’une même espèce.'},
    {q:'Que deviennent l’énergie et la matière dans un réseau alimentaire ?',options:[{id:'recycle_both',text:'L’énergie et la matière sont toutes deux recyclées.'},{id:'energy_matter',text:'L’énergie circule puis se dissipe ; la matière peut être recyclée.'},{id:'matter_disappears',text:'La matière disparaît après avoir été consommée.'}],correct:'energy_matter',why:'L’énergie passe d’un organisme à l’autre et une partie se dissipe sous forme de chaleur. La matière organique est transformée et recyclée, notamment par les décomposeurs.'},
    {q:'Pourquoi relier plusieurs organismes dans un réseau ?',options:[{id:'one_food',text:'Pour montrer qu’un organisme peut avoir plusieurs relations alimentaires.'},{id:'fixed_chain',text:'Pour montrer qu’il n’existe qu’une seule chaîne possible.'},{id:'all_essential',text:'Pour prouver que chaque espèce est toujours indispensable.'}],correct:'one_food',why:'Les chaînes se croisent : un organisme peut consommer plusieurs aliments et être consommé par plusieurs organismes. Le modèle ne prouve pas que chaque espèce a le même rôle partout.'}
  ];

  const quizSets = [{title:"Réseaux alimentaires",questions},{"title": "Rôles écologiques", "questions": [{"q": "Comment une herbe produit-elle sa matière ?", "options": [{"id": "0", "text": "Grâce à la lumière du Soleil"}, {"id": "1", "text": "En mangeant des insectes"}, {"id": "2", "text": "En absorbant de la viande"}], "correct": "0", "why": "Les plantes utilisent la lumière, l’eau et le dioxyde de carbone pour fabriquer leur matière."}, {"q": "Un vautour mange une carcasse. Quelle relation observes-tu ?", "options": [{"id": "0", "text": "La pollinisation"}, {"id": "1", "text": "Le charognage"}, {"id": "2", "text": "La consommation végétale"}], "correct": "1", "why": "Un charognard consomme un animal déjà mort. Cela ne signifie pas qu’il l’a tué."}, {"q": "Que mange un omnivore ?", "options": [{"id": "0", "text": "Uniquement des feuilles"}, {"id": "1", "text": "Uniquement des animaux"}, {"id": "2", "text": "Des aliments végétaux et animaux"}], "correct": "2", "why": "Son alimentation peut associer végétaux et animaux, selon les ressources disponibles."}, {"q": "Quel rôle jouent les champignons décomposeurs ?", "options": [{"id": "0", "text": "Ils transforment la matière morte"}, {"id": "1", "text": "Ils créent l’énergie du Soleil"}, {"id": "2", "text": "Ils font disparaître toute la matière"}], "correct": "0", "why": "Avec d’autres organismes, ils participent au recyclage de la matière dans les écosystèmes."}, {"q": "Un lion peut-il aussi consommer une carcasse qu’il n’a pas chassée ?", "options": [{"id": "0", "text": "Non, un carnivore chasse toujours"}, {"id": "1", "text": "Oui, chasse et charognage peuvent se combiner"}, {"id": "2", "text": "Seulement s’il devient herbivore"}], "correct": "1", "why": "Un même animal peut avoir plusieurs façons de se nourrir. Les catégories ne sont pas toujours exclusives."}]},{"title": "Biodiversité et esprit critique", "questions": [{"q": "Une espèce est indiquée en Afrique de l’Est. Est-elle présente partout dans cette région ?", "options": [{"id": "0", "text": "Oui, dans chaque village"}, {"id": "1", "text": "Oui, dans tous les milieux"}, {"id": "2", "text": "Non, cela dépend des habitats locaux"}], "correct": "2", "why": "La carte est indicative. Une grande région colorée ne signifie pas une présence continue."}, {"q": "Si les herbes deviennent plus rares, quels animaux peuvent être touchés ?", "options": [{"id": "0", "text": "Seulement les herbivores"}, {"id": "1", "text": "Les herbivores et, indirectement, leurs consommateurs"}, {"id": "2", "text": "Aucun animal"}], "correct": "1", "why": "Une perturbation peut se transmettre par plusieurs relations. Son effet dépend du contexte."}, {"q": "Pourquoi protéger différents habitats ?", "options": [{"id": "0", "text": "Ils abritent des êtres vivants et des relations variés"}, {"id": "1", "text": "Pour supprimer tous les prédateurs"}, {"id": "2", "text": "Pour garder une seule espèce partout"}], "correct": "0", "why": "La diversité des milieux contribue à la biodiversité, en plus de la diversité des espèces et des individus."}, {"q": "Deux espèces dessinées sur le site vivent-elles forcément ensemble ?", "options": [{"id": "0", "text": "Oui, toujours"}, {"id": "1", "text": "Seulement si elles ont la même couleur"}, {"id": "2", "text": "Non, le site rassemble plusieurs contextes de savane"}], "correct": "2", "why": "Ce modèle regroupe des exemples. Les espèces ne coexistent pas nécessairement dans un même lieu."}, {"q": "Un personnage de dessin animé permet-il de connaître le régime réel de son animal ?", "options": [{"id": "0", "text": "Oui, les films sont des observations scientifiques"}, {"id": "1", "text": "Non, il faut consulter des observations et des sources fiables"}, {"id": "2", "text": "Oui, si le personnage est célèbre"}], "correct": "1", "why": "La fiction aide à reconnaître un animal. Son comportement et son alimentation peuvent être inventés."}]}];
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
    $('randomBtn').addEventListener('click',()=>{const options=animals.filter(x=>x.id!==current); select(options[Math.floor(Math.random()*options.length)].id);});
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
    for(const [region,id] of Object.entries(regionMapIds))$(id).classList.toggle('is-active',regions.includes(region));
    $('rangeSummary').textContent=regions.length
      ? `Pour ${x.name}, les régions indiquées sont : ${regions.map(region=>regionLabels[region]).join(', ')}. Cette présence est discontinue et dépend des habitats locaux.`
      : `L’aire de présence régionale de ${x.name} n’est pas encore renseignée.`;
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
    $('nextQuestion').disabled=false;
  }
  init();
})();
