/* Throwaway harness: runs the SHIPPED index.html script under a DOM shim and checks the
   two language tables against each other and against every piece of copy the coach can
   actually produce. What it is looking for:

     1. key parity — a key present in en but missing in zh falls back to English silently,
        which is the one i18n bug you cannot see in a screenshot of the Chinese page.
     2. undefined / NaN leaking into a generated sentence.
     3. Latin words surviving into Chinese coach prose. Proper nouns are whitelisted;
        anything else is an untranslated fragment.
     4. the same sweep in English, so the refactor did not damage the original copy.

   Sweep covers: move 1, all eleven answers to the standard opening 1122 (both halves),
   the same answers under 3344 and 5656 (KNOW only, generated WHY), a non-22 opening,
   the solver's own line to the end for a spread of secrets, and the endings. */
const fs = require('fs');
const vm = require('vm');
const path = 'C:/Claude/Code/Mastermind/codebreaker/index.html';
const html = fs.readFileSync(path, 'utf8');
const js = /<script>([\s\S]*)<\/script>/.exec(html)[1];

/* ---- DOM shim ---- */
function mkEl(tag) {
  const e = {
    tagName: tag, children: [], style: {}, dataset: {}, _text: '', innerHTML: '',
    className: '', disabled: false, value: 0, max: 0, checked: false,
    classList: {
      _s: new Set(),
      add(c) { this._s.add(c); }, remove(c) { this._s.delete(c); },
      toggle(c, on) { if (on === undefined) on = !this._s.has(c); on ? this._s.add(c) : this._s.delete(c); },
      contains(c) { return this._s.has(c); }
    },
    appendChild(c) { this.children.push(c); return c; },
    setAttribute(k, v) { this[k] = v; }, getAttribute(k) { return this[k]; },
    querySelectorAll() { return []; },
    getContext() { return ctx2d; },
    addEventListener() {}
  };
  Object.defineProperty(e, 'textContent', { get() { return this._text; }, set(v) { this._text = v; } });
  Object.defineProperty(e, 'outerHTML', { get() { return '<span class="inline"></span>'; } });
  Object.defineProperty(e, 'clientWidth', { get() { return 600; } });
  return e;
}
const ctx2d = new Proxy({}, { get: () => () => {} });
const byId = {};
const tabs = ['play', 'coach', 'analyse'].map(m => { const e = mkEl('button'); e.dataset.mode = m; return e; });
const langs = ['en', 'zh'].map(l => { const e = mkEl('button'); e.dataset.lang = l; return e; });
const document = {
  body: mkEl('body'),
  documentElement: mkEl('html'),
  createElement: mkEl,
  getElementById(id) { return byId[id] || (byId[id] = mkEl('div')); },
  querySelector() { return mkEl('div'); },
  querySelectorAll(sel) { return sel === '.tab' ? tabs : sel === '.lang' ? langs : []; }
};
const store = {};
let rafQ = [];
const sandbox = {
  document,
  localStorage: { getItem: k => (k in store ? store[k] : null), setItem: (k, v) => { store[k] = String(v); } },
  matchMedia: () => ({ matches: false, addEventListener() {} }),
  requestAnimationFrame: fn => { rafQ.push(fn); },
  performance: { now: () => 0 },
  devicePixelRatio: 1,
  addEventListener() {},
  setTimeout() { return 0; }, clearTimeout() {},
  console
};
sandbox.window = sandbox;
sandbox.globalThis = sandbox;

const exportLine = `
globalThis.__X = { N, NB, SOLVED, FB, FBI, TABLE, digits, rankAll, bucketsFor,
  playGuess, newGame, setMode, setLang, advise, STR, T,
  get lang(){return lang;}, get mode(){return mode;}, get states(){return states;},
  get cursor(){return cursor;}, get ranking(){return ranking;},
  setSecret(v){ secret = v; }, get secret(){return secret;} };
`;
vm.createContext(sandbox);
new vm.Script(js + exportLine).runInContext(sandbox);
let guard = 0;
while (rafQ.length && guard++ < 100000) { const q = rafQ; rafQ = []; q.forEach(fn => fn(0)); }
const X = sandbox.__X;
if (!X) { console.error('FAIL: no exports'); process.exit(1); }

let problems = [];
const fail = m => problems.push(m);

/* ---- 1. key parity ---- */
const ek = Object.keys(X.STR.en), zk = Object.keys(X.STR.zh);
const missingZh = ek.filter(k => zk.indexOf(k) < 0);
const extraZh = zk.filter(k => ek.indexOf(k) < 0);
console.log('keys       : en', ek.length, '| zh', zk.length);
if (missingZh.length) fail('zh is missing keys: ' + missingZh.join(', '));
if (extraZh.length) fail('zh has keys en does not: ' + extraZh.join(', '));
const typeMismatch = ek.filter(k => zk.indexOf(k) >= 0 && typeof X.STR.en[k] !== typeof X.STR.zh[k]);
if (typeMismatch.length) fail('type mismatch between languages: ' + typeMismatch.join(', '));

/* ---- 2. sweep the coach in both languages ---- */
const N = X.N, SOLVED = X.SOLVED, TABLE = X.TABLE;
const fbIdx = (b, w) => X.FBI[b * 5 + w];
const strip = h => String(h).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
/* names that legitimately stay in Latin script inside Chinese copy */
const PROPER = /\b(Codebreaker|Mastermind|Knuth|minimax|EN)\b/g;

let samples = 0;
function check(label, html) {
  samples++;
  const txt = strip(html);
  if (!txt) { fail(label + ': produced no text'); return; }
  if (/undefined|NaN|\[object/.test(txt)) fail(label + ': ' + txt.slice(0, 160));
  if (X.lang === 'zh') {
    const leak = txt.replace(PROPER, '').match(/[A-Za-z]{3,}/g);
    if (leak) fail(label + ': untranslated -> ' + Array.from(new Set(leak)).join(',') + ' | ' + txt.slice(0, 160));
  }
  if (X.lang === 'en' && /[\u4e00-\u9fff]/.test(txt)) fail(label + ': Chinese leaked into English | ' + txt.slice(0, 160));
}
const coach = () => byId.coach.innerHTML;

/* the eleven reachable answers to a two-and-two opening */
const ANS = [[0,0],[0,1],[1,0],[0,2],[1,1],[2,0],[0,3],[1,2],[2,1],[3,0],[2,2]];
const OPENINGS = { '1122': 7, '3344': 525, '5656': 1073 };

function sweep(lang) {
  X.setLang(lang);
  X.setMode('coach'); X.newGame();
  check(lang + ' / move 1', coach());

  X.setMode('analyse');
  for (const name in OPENINGS) {
    for (const [b, w] of ANS) {
      X.newGame();
      X.playGuess(OPENINGS[name], fbIdx(b, w));
      check(lang + ' / open ' + name + ' -> ' + b + 'b' + w + 'w', coach());
    }
  }
  /* a non-22 opening skips the hand-written block entirely */
  X.newGame(); X.playGuess(51, fbIdx(1, 1));
  check(lang + ' / open 1234 -> 1b1w', coach());
  X.newGame(); X.playGuess(0, fbIdx(0, 0));            // 1111, all-one-colour shape
  check(lang + ' / open 1111 -> 0b0w', coach());

  /* the solver's own line, all the way down, for a spread of secrets */
  for (let secret = 0; secret < N; secret += 37) {
    X.newGame();
    for (let step = 0; step < 9; step++) {
      const g = X.ranking[0].g, f = TABLE[g * N + secret];
      X.playGuess(g, f);
      check(lang + ' / secret ' + secret + ' step ' + (step + 1), coach());
      if (f === SOLVED) break;
    }
  }

  /* a player who wanders: guess 1111 three times, which the solver's line never does */
  X.newGame();
  for (let i = 0; i < 3; i++) { X.playGuess(0, fbIdx(0, 0)); check(lang + ' / stubborn ' + (i + 1), coach()); }
  /* ...and on into guarantee territory */
  X.playGuess(X.ranking[0].g, fbIdx(0, 1)); check(lang + ' / stubborn 4', coach());
  X.playGuess(X.ranking[0].g, fbIdx(0, 1)); check(lang + ' / stubborn 5', coach());

  /* the entry caption and the histogram caption in the same states */
  check(lang + ' / entry caption', byId.ecap.innerHTML);
  check(lang + ' / histogram caption', byId.hcap.innerHTML);

  /* the play-mode result banner, both wordings */
  X.setMode('play'); X.newGame(); X.setSecret(0); X.playGuess(0);
  check(lang + ' / cracked banner', byId.result.innerHTML);
  X.newGame(); X.setSecret(0);
  for (let i = 0; i < 9; i++) X.playGuess(1);           // never right, runs the board out
  check(lang + ' / nine gone banner', byId.result.innerHTML);
  X.setMode('coach');

  /* every static string, rendered through T with plausible arguments */
  const args = { 'ttl.fieldN': [7], 'rank.nth': [42], 'hcap': [96, 11, 18], 'pinnote': ['<span class="inline"></span>', 3],
    'ecap.solved': ['<span class="inline"></span>'], 'ecap.played': ['<span class="inline"></span>'], 'ecap.replaces': [2], 'fb.label': [1, 3],
    'fb.count': [96], 'res.cracked': [4], 'res.miss': ['<span class="inline"></span>'], 'fact.code': [[0,1,2,3]],
    'fact.slot': [2, 4], 'fact.present': [1], 'fact.gone1': [5], 'fact.goneN': [[0,3]],
    'sp.keepProbe': ['…', '…'], 'sp.probe': ['…'], 'plan.fear': ['<span class="inline"></span>', 46, 3, '…'],
    'plan.hope': ['<span class="inline"></span>', 4], 'lastAnswer': [1, 1, [0,1]], 'pos.known': [[0],[3]],
    'pos.settled': ['…'], 'pos.almost': ['…', '…'], 'pos.hunt': ['…', 4],
    'survivors': [3], 'cert.inSet': ['<span class="inline"></span>', 4], 'cert.out': [4], 'guarantee': [5, 12],
    'behind': [32, 4, 7], 'adv.only': [3, '<span class="inline"></span>'], 'adv.play': ['<span class="inline"></span>', 5, 20, '…'],
    'open.copy': ['<span class="inline"></span>'], 'solved.head': [4, '<span class="inline"></span>'], 'peek.code': ['<span class="inline"></span>'],
    'gopen.good': ['<span class="inline"></span>', 89], 'gopen.bad': ['<span class="inline"></span>', '…', 312, 56],
    'grade.optimal': ['<span class="inline"></span>', 21], 'grade.risked': ['<span class="inline"></span>', 34, '<span class="inline"></span>', 21],
    'm2why': ['1,1'], 'm2know': ['1,1', { a: 0, b: 1, as: [1, 2], bs: [3, 4] }] };
  for (const k of ek) {
    if (k === 'doc.title' || k === 'foot.algo') continue;   // proper nouns only, checked by eye
    check(lang + ' / key ' + k, X.T.apply(null, [k].concat(args[k] || [])));
  }
}

sweep('en');
sweep('zh');

/* ---- 3. the solver is untouched by any of it ---- */
X.setLang('en'); X.setMode('coach');
let total = 0, worst = 0;
for (let secret = 0; secret < N; secret++) {
  let cands = Int32Array.from({ length: N }, (_, i) => i), n = 0;
  for (;;) {
    const g = X.rankAll(cands)[0].g; n++;
    const f = TABLE[g * N + secret];
    if (f === SOLVED) break;
    cands = Int32Array.from(X.bucketsFor(g, cands)[f]);
    if (n > 12) { fail('runaway on ' + secret); break; }
  }
  total += n; if (n > worst) worst = n;
}
console.log('solver     : total', total, '(expected 5801) | worst', worst, '(expected 5)');
if (total !== 5801 || worst !== 5) fail('solver changed');

console.log('samples    :', samples, 'generated strings checked');
if (problems.length) {
  console.log('\n' + problems.length + ' PROBLEM(S):');
  problems.slice(0, 40).forEach(p => console.log('  - ' + p));
  process.exit(1);
}
console.log('\nALL I18N CHECKS PASSED');
