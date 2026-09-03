/* Throwaway harness: runs the SHIPPED index.html script under a minimal DOM shim,
   then plays all 1,296 games through it. Per CLAUDE.md, the number that matters is
   worst case 5 and total 5801 (avg 4.476), distribution 1/6/62/533/694. */
const fs = require('fs');
const vm = require('vm');
const path = 'C:/Claude/Code/Mastermind/codebreaker/index.html';
const html = fs.readFileSync(path, 'utf8');
const js = /<script>([\s\S]*)<\/script>/.exec(html)[1];

/* ---- minimal DOM shim ---- */
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
  Object.defineProperty(e, 'outerHTML', { get() { return ''; } });
  Object.defineProperty(e, 'clientWidth', { get() { return 600; } });
  return e;
}
const ctx2d = new Proxy({}, { get: () => () => {} });
const byId = {};
const tabs = ['play', 'coach', 'analyse'].map(m => { const e = mkEl('button'); e.dataset.mode = m; return e; });
const document = {
  body: mkEl('body'),
  createElement: mkEl,
  getElementById(id) { return byId[id] || (byId[id] = mkEl('div')); },
  querySelector() { return mkEl('div'); },
  querySelectorAll(sel) { return sel === '.tab' ? tabs : []; }
};
let rafQ = [];
const sandbox = {
  document,
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
globalThis.__X = { N, NB, SOLVED, FB, TABLE, digits, rankAll, bucketsFor, feedback,
  playGuess, newGame, setMode, get mode(){return mode;}, get states(){return states;},
  get cursor(){return cursor;}, get ranking(){return ranking;},
  setSecret(v){ secret = v; }, get secret(){return secret;} };
`;
vm.createContext(sandbox);
new vm.Script(js + exportLine).runInContext(sandbox);

/* drain the chunked table build */
let guard = 0;
while (rafQ.length && guard++ < 100000) { const q = rafQ; rafQ = []; q.forEach(fn => fn(0)); }
const X = sandbox.__X;
if (!X) { console.error('FAIL: no exports'); process.exit(1); }
console.log('table built, N =', X.N, '| mode after load =', X.mode);

/* ---- 1. the shipped ranking still reproduces Knuth ---- */
const N = X.N, NB = X.NB, SOLVED = X.SOLVED, TABLE = X.TABLE;
const dist = {}; let total = 0, worst = 0, worstSecret = -1;
for (let secret = 0; secret < N; secret++) {
  let cands = Int32Array.from({ length: N }, (_, i) => i);
  let n = 0;
  for (;;) {
    const g = X.rankAll(cands)[0].g;
    n++;
    const f = TABLE[g * N + secret];
    if (f === SOLVED) break;
    const bk = X.bucketsFor(g, cands);
    cands = Int32Array.from(bk[f]);
    if (n > 12) { console.error('runaway on', secret); process.exit(1); }
  }
  dist[n] = (dist[n] || 0) + 1; total += n;
  if (n > worst) { worst = n; worstSecret = secret; }
}
console.log('games      :', N);
console.log('total      :', total, '(expected 5801)');
console.log('average    :', (total / N).toFixed(4), '(expected 4.4761)');
console.log('worst case :', worst, '(expected 5)');
console.log('distribution:', [1, 2, 3, 4, 5].map(k => (dist[k] || 0)).join('/'), '(expected 1/6/62/533/694)');

let ok = total === 5801 && worst === 5 &&
  [1, 6, 62, 533, 694].every((v, i) => (dist[i + 1] || 0) === v);

/* ---- 2. modes: play skips the ranking, analyse takes typed answers ---- */
X.setMode('play');
console.log('\nplay mode  : ranking =', X.ranking, '(expected null)');
ok = ok && X.ranking === null;
X.setSecret(0);                      // code 1111
X.playGuess(0);                      // guess 1111 -> solved
const pst = X.states[X.cursor];
console.log('play solve : guesses =', pst.guesses.length, '| cands =', pst.cands.length);
ok = ok && pst.guesses.length === 1 && pst.cands.length === 1;

X.setMode('analyse');
console.log('\nanalyse    : secret =', X.secret, '(expected -1)', '| cands =', X.states[X.cursor].cands.length);
ok = ok && X.secret === -1 && X.states[X.cursor].cands.length === 1296;
/* type in a real game against the hidden code 3164 (index for digits 2,0,5,3) */
const hidden = 2 * 216 + 0 * 36 + 5 * 6 + 3;
let steps = 0;
for (;;) {
  const g = X.ranking[0].g;
  const f = TABLE[g * N + hidden];   // the answer a human would have written down
  X.playGuess(g, f);                 // typed in, not computed from a secret
  steps++;
  if (f === SOLVED) break;
  if (steps > 8) break;
}
const ast = X.states[X.cursor];
console.log('analyse    : solved in', steps, '| cands left =', ast.cands.length,
  '| code =', X.digits(ast.cands[0]).join(''), '(expected 2053)');
ok = ok && ast.cands.length === 1 && ast.cands[0] === hidden && steps <= 5;

/* an impossible answer must be rejected, not corrupt the state */
X.newGame();
const before = X.states[X.cursor].cands.length;
X.playGuess(0, X.FB.findIndex(f => f.b === 4 && f.w === 0) === SOLVED ? SOLVED : 0);
X.newGame();
const gg = 0;                                  // 1111
const impossible = (function () {              // 4 blacks then anything else is unreachable later
  const bk = X.bucketsFor(gg, X.states[X.cursor].cands);
  for (let i = 0; i < NB; i++) if (!bk[i].length) return i;
  return -1;
})();
if (impossible >= 0) {
  const n0 = X.states.length;
  X.playGuess(gg, impossible);
  console.log('\nbad answer : states', n0, '->', X.states.length, '(expected unchanged)');
  ok = ok && X.states.length === n0;
} else console.log('\nbad answer : no unreachable answer for 1111 at move 1 (nothing to test)');

console.log('\n' + (ok ? 'ALL CHECKS PASSED' : 'CHECKS FAILED'));
process.exit(ok ? 0 : 1);
