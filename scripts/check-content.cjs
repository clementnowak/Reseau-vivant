// Content integrity checks; run with: node scripts/check-content.cjs
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const app=fs.readFileSync('app.js','utf8'),html=fs.readFileSync('index.html','utf8');
const quiz=JSON.parse(app.split('const quizSets = ')[1].split(';\n  let questions=')[0]);
const ctx={window:{}};vm.runInNewContext(fs.readFileSync('data.js','utf8'),ctx);
const ids=new Set(ctx.window.ECO_DATA.species.map(s=>s.id)),seen=new Set();
assert.equal(quiz.length,3);
for(const set of quiz){assert.equal(set.questions.length,5);for(const q of set.questions){assert(ids.has(q.animal),q.animal);assert(!seen.has(q.q),'duplicate question');seen.add(q.q);assert.equal(q.options.filter(o=>o.id===q.correct).length,1);assert.equal(new Set(q.options.map(o=>o.id)).size,q.options.length);assert(new URL(q.source).protocol==='https:');assert(q.why.length>20);}}
for(const s of ctx.window.ECO_DATA.species)for(const region of s.regions||[])assert(['west','central','east','south','sahel'].includes(region));
assert.equal((html.match(/class="atlas-map"/g)||[]).length,2);
for(const r of ['west','central','east','south','sahel'])assert.equal((html.match(new RegExp(`data-map-region="${r}"`,'g'))||[]).length,2);
assert(!html.includes('class="scientific-note"'));
console.log('PASS: 15 unique animal questions, valid answers and sources, map regions synchronized.');
