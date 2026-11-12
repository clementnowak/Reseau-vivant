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
  let current = (items.has(location.hash.slice(1)) ? location.hash.slice(1) : 'lion');
  let quizIndex = 0, score = 0, answered = false;
  const questions = [
    {q:'Quel animal se nourrit notamment de termites ?', options:['zebre','orycterope','crocodile'], correct:'orycterope',why:'L’oryctérope utilise ses griffes et sa longue langue pour trouver des termites.'},
    {q:'Quelle est la nourriture principale du zèbre des plaines ?',options:['herbes','rongeur','carcasses'],correct:'herbes',why:'Le zèbre est un herbivore qui broute surtout des herbes.'},
    {q:'Quel animal se nourrit surtout de carcasses ?',options:['vautour','gazelle','guepard'],correct:'vautour',why:'Le vautour est un charognard : il consomme principalement des animaux déjà morts.'},
    {q:'Parmi ces animaux, lequel peut chasser la gazelle de Thomson ?',options:['termite','guepard','buffle'],correct:'guepard',why:'Le guépard est un prédateur de certaines gazelles et d’autres petites antilopes.'},
    {q:'Quel organisme se nourrit notamment de matière végétale morte ?',options:['lion','termite','impala'],correct:'termite',why:'De nombreux termites participent à la dégradation des débris végétaux.'}
  ];
  const init = () => {
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
    $('nextQuestion').addEventListener('click',()=>{ if (!answered) return; if (quizIndex===questions.length-1) {quizIndex=0;score=0;} else {quizIndex++;}renderQuiz(); });
    renderLibrary(); renderNetwork(); renderQuiz();
  };
  function select(id,updateUrl=true){
    if(!items.has(id)) return;
    current=id;
    if (updateUrl) history.replaceState(null,'','#'+id);
    renderLibrary();renderNetwork();
    // Keep the reader on the exploration view, not on a missing #id anchor.
  }
  function renderLibrary(){
    const term=normalized($('speciesSearch').value.trim()); const group=$('groupFilter').value;
    const visible=animals.filter(x=>(!group || x.group===group) && (!term || normalized(x.name+' '+x.scientific+' '+x.group).includes(term)));
    $('speciesLibrary').innerHTML=visible.length
      ? visible.map(x=>`<button type="button" class="species-chip" data-animal="${escapeHtml(x.id)}" aria-pressed="${x.id===current}"><span class="chip-emoji" aria-hidden="true">${escapeHtml(x.emoji)}</span>${escapeHtml(x.name)}</button>`).join('')
      : '<p class="empty-library">Aucun animal trouvé. Essaie un autre mot ou efface les filtres.</p>';
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
    $('centerAnimal').innerHTML=`<div class="center-icon" aria-hidden="true">${escapeHtml(x.emoji)}</div><span class="center-group">${escapeHtml(x.group)}</span><h3>${escapeHtml(x.name)}</h3><span class="scientific">${escapeHtml(x.scientific||'Ressource naturelle')}</span><span class="center-diet">${escapeHtml(x.diet || 'Base du réseau alimentaire')}</span>`;
    $('profileHeading').textContent='Découvre : '+x.name;
    const blocks=[['🔎','À connaître',x.description],['🌍','Son rôle dans la nature',x.role],['✨','Le savais-tu ?',x.fun],['🌱','Comment le protéger ?',x.protect]];
    $('profileContent').innerHTML=blocks.map(b=>`<article class="profile-item"><span class="p-icon" aria-hidden="true">${b[0]}</span><h4>${b[1]}</h4><p>${escapeHtml(b[2])}</p></article>`).join('');
  }
  function relationCard(r,side){
    const x=r.entity;const action=r.kind==='charognage'?'Charognage':r.kind==='vegetaux'?'Végétal':r.kind==='detritivore'?'Matière morte':r.note||x.group;
    return `<button type="button" class="relation-card ${side}" data-animal="${escapeHtml(x.id)}" aria-label="Explorer ${escapeHtml(x.name)}"><span class="animal-emoji" aria-hidden="true">${escapeHtml(x.emoji)}</span><span class="rel-meta"><strong>${escapeHtml(x.name)}</strong><small>${escapeHtml(action)}</small></span><span class="rel-arrow" aria-hidden="true">↗</span></button>`;
  }
  function renderQuiz(){
    const q=questions[quizIndex];answered=false;
    $('quizProgress').textContent=`QUESTION ${quizIndex+1} / ${questions.length}`;
    $('quizQuestion').textContent=q.q;
    $('quizFeedback').textContent='';
    $('nextQuestion').disabled=true;
    $('nextQuestion').textContent=quizIndex===questions.length-1?'Recommencer le quiz ↻':'Question suivante →';
    $('quizAnswers').innerHTML=q.options.map(id=>`<button class="answer-btn" data-answer="${id}" type="button">${escapeHtml(items.get(id).emoji)} &nbsp; ${escapeHtml(items.get(id).name)}</button>`).join('');
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
    $('quizFeedback').textContent=(correct?'✓ Bonne réponse ! ':'Pas tout à fait. ')+q.why+(quizIndex===questions.length-1?` Score final : ${score}/${questions.length}.`:'');
    $('nextQuestion').disabled=false;
  }
  init();
})();
