// Test de parcours : ouvre chaque fiche de chaque univers et joue 8 parties de chaque quiz.
// Lancé par `npm test` et par GitHub Actions. Sert le site avec un mini serveur statique local.
const http = require('http'), fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..');
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.json': 'application/json', '.webmanifest': 'application/manifest+json' };
const server = http.createServer((req, res) => {
  let p = path.normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)).replace(/^(\.\.[\/\\])+/, '');
  if (p.endsWith(path.sep)) p += 'index.html';
  const f = path.join(ROOT, p);
  if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'Content-Type': TYPES[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
});
let PORT;
// Teste chaque univers : toutes les fiches, puis 8 parties de chaque quiz.
const { chromium, devices } = require('playwright');
server.listen(0, '127.0.0.1', async () => {
  PORT = server.address().port;
  const browser = await chromium.launch({ args: ['--no-sandbox'], executablePath: process.env.CHROME_PATH || undefined });
  const ctx = await browser.newContext(devices['iPhone 13']);
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push('PAGEERROR ' + e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text() + ' @ ' + (m.location().url||'') + ' | page ' + page.url()); });
  await page.goto('http://127.0.0.1:'+PORT+'/', { waitUntil: 'networkidle' });
  const only = process.argv[2];
  for (const uni of ['savane', 'recif']) {
    if (only && only !== uni) continue;
    await page.click(`[data-univers="${uni}"]`);
    await page.waitForFunction(u => document.documentElement.dataset.univers === u, uni);
    const ids = await page.evaluate(u => window.RV_DONNEES[u].species.map(s => s.id), uni);
    for (const id of ids) {
      await page.evaluate(([u, id]) => { location.hash = `${u}/${id}`; }, [uni, id]);
      await page.waitForTimeout(15);
      const t = await page.$eval('#centerAnimal h3', e => e.textContent);
      const want = await page.evaluate(([u, id]) => window.RV_DONNEES[u].species.find(s => s.id === id).name, [uni, id]);
      if (t !== want) errors.push(`CENTRE ${uni}/${id}: ${t}`);
      const sum = await page.$eval('#rangeSummary', e => e.textContent);
      if (/undefined/.test(sum)) errors.push('RANGE ' + id + sum);
    }
    const qs = [];
    for (let round = 0; round < 8; round++) for (let qi = 0; qi < 3; qi++) {
      await page.click(`[data-quiz="${qi}"]`);
      for (let k = 0; k < 5; k++) {
        const info = await page.evaluate(() => ({ q: document.getElementById('quizQuestion').innerText.trim(), opts: [...document.querySelectorAll('#quizAnswers [data-answer]')].map(b => b.dataset.answer + '|' + b.innerText.trim()) }));
        qs.push(info);
        if (info.opts.length !== 3) errors.push('NB OPTIONS ' + JSON.stringify(info));
        if (new Set(info.opts.map(o => o.split('|')[0])).size !== info.opts.length) errors.push('DUP OPTION ' + JSON.stringify(info));
        if (/undefined|null|NaN|\{/.test(info.q + info.opts.join())) errors.push('TEXTE ' + JSON.stringify(info));
        await page.click('#quizAnswers [data-answer] >> nth=0');
        const correct = await page.$$eval('#quizAnswers .correct', e => e.length);
        if (correct !== 1) errors.push('NO CORRECT ' + JSON.stringify(info));
        info.fb = await page.$eval('#quizFeedback', e => e.innerText.replace(/\n/g, ' '));
        if (/undefined|null|\{/.test(info.fb)) errors.push('FEEDBACK ' + info.fb);
        await page.click('#nextQuestion');
      }
      const end = await page.$eval('#quizAnswers', e => e.innerText.slice(0, 40));
      if (!/\/ 5/.test(end)) errors.push('END MISSING ' + end);
    }
    const uniq = [...new Map(qs.map(q => [q.q + q.opts.join(), q])).values()];
    console.log(`\n=== ${uni} : ${ids.length} fiches, ${uniq.length} questions différentes`);
    if (process.argv[3] === 'v') for (const q of uniq.slice(0, 70)) console.log('-', q.q.replace(/\n/g, ' '), '||', q.opts.map(o => o.split('|')[1].replace(/\n/g, ' ')).join(' / '), '=>', q.fb);
  }
  // Page « Les coulisses » : accessible depuis le pied de page, sans erreur, avec des ancres valides.
  await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'networkidle' });
  const lien = await page.locator('footer a[href="coulisses.html"]').count();
  if (lien !== 1) errors.push('COULISSES : lien du pied de page absent');
  await page.goto(`http://127.0.0.1:${PORT}/coulisses.html`, { waitUntil: 'networkidle' });
  if (!(await page.locator('h1').innerText()).includes('conçu, vérifié et mis en ligne')) errors.push('COULISSES : titre absent');
  const ancres = await page.$$eval('a[href^="#"]', (as) => as.map((a) => a.getAttribute('href')).filter((h) => h.length > 1 && !document.querySelector(h)));
  for (const h of ancres) errors.push('COULISSES : ancre cassée ' + h);
  const debord = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  if (debord) errors.push('COULISSES : débordement horizontal');
  console.log('errors', JSON.stringify(errors, null, 1));
  await browser.close();
  server.close();
  if (errors.length) { console.error('ÉCHEC : ' + errors.length + ' erreur(s)'); process.exit(1); }
  console.log('OK');
});
