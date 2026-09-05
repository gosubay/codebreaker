(function(){
"use strict";
var T = THREE;
if (T.ColorManagement){
  if ("legacyMode" in T.ColorManagement) T.ColorManagement.legacyMode = false;
  else T.ColorManagement.enabled = true;
}
var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- palette + theme ---------- */
var PEG_CSS = ["--p1","--p2","--p3","--p4","--p5","--p6"];
var PEG_NAME = ["Red","Orange","Yellow","Green","Blue","Purple"];
var PEG_HEX = [0xD33F3A,0xE5772A,0xEFC93D,0x3FA35B,0x3A78C4,0x8A54B8];
var BOARD_HEX = 0x2A231C, RIM_HEX = 0x3A3128, HOLE_HEX = 0x0B0907;

function tok(n){ return getComputedStyle(document.documentElement).getPropertyValue(n).trim(); }
function tokNum(n,d){ var v = parseFloat(tok(n)); return isNaN(v) ? d : v; }

/* ---------- game maths ---------- */
var ALL = [];
for (var a=0;a<6;a++) for (var b=0;b<6;b++) for (var c=0;c<6;c++) for (var d=0;d<6;d++) ALL.push([a,b,c,d]);

function score(g, c){
  var black = 0, i, gc = [0,0,0,0,0,0], cc = [0,0,0,0,0,0];
  for (i=0;i<4;i++){ if (g[i] === c[i]) black++; else { gc[g[i]]++; cc[c[i]]++; } }
  var white = 0;
  for (i=0;i<6;i++) white += Math.min(gc[i], cc[i]);
  return [black, white];
}
function eq(x,y){ return x[0]===y[0] && x[1]===y[1] && x[2]===y[2] && x[3]===y[3]; }
function codeStr(g){ return g.map(function(v){ return v+1; }).join(""); }

var OPENING = [0,0,1,1];      /* 1122 red red orange orange */
var BRANCH_LOW = [2,2,3,4];   /* 3345 yellow yellow green blue */
var BRANCH_MID = [0,0,2,3];   /* 1134 red red yellow green */

/* ---------- state ---------- */
var ROWS = 8;
var st = {
  secret: null, guesses: [], feedback: [], draft: [],
  cands: ALL.slice(), mode: "play", view: "board", solved: false, busy: false
};
function newGame(){
  st.secret = ALL[(Math.random()*1296)|0].slice();
  st.guesses = []; st.feedback = []; st.draft = [];
  st.cands = ALL.slice(); st.solved = false; st.busy = false;
  clearBoard(); resetCloud(); syncUI();
  caption(st.mode === "strategy"
    ? "In Mastermind, there are 1296 codes your opponent could be hiding."
    : "");
}

/* ---------- three.js scene ---------- */
var canvas = document.getElementById("gl");
var renderer = new T.WebGLRenderer({canvas:canvas, antialias:true, alpha:true, preserveDrawingBuffer:true});
renderer.setPixelRatio(Math.min(window.devicePixelRatio||1, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = T.PCFSoftShadowMap;
renderer.outputEncoding = T.sRGBEncoding;
renderer.toneMapping = T.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;

var scene = new T.Scene();
var camera = new T.PerspectiveCamera(32, 1, 0.5, 200);

var ambient = new T.HemisphereLight(0xffffff, 0x2a2018, 0.85);
scene.add(ambient);

var key = new T.DirectionalLight(0xfff2dd, 2.0);
key.position.set(9, 16, 13);
key.castShadow = true;
key.shadow.mapSize.set(2048, 2048);
key.shadow.camera.near = 4; key.shadow.camera.far = 60;
key.shadow.camera.left = -12; key.shadow.camera.right = 12;
key.shadow.camera.top = 14; key.shadow.camera.bottom = -14;
key.shadow.bias = -0.0012; key.shadow.radius = 3;
scene.add(key);

var rim = new T.DirectionalLight(0xE8B33C, 1.15);
rim.position.set(-11, 5, -9); scene.add(rim);
var fill = new T.DirectionalLight(0x9fb8d8, 0.5);
fill.position.set(-6, -3, 10); scene.add(fill);

var floorMat = new T.MeshStandardMaterial({color:0x0A0908, roughness:0.95, metalness:0.0});
var floor = new T.Mesh(new T.PlaneGeometry(140,140), floorMat);
floor.position.z = -1.6; floor.receiveShadow = true;
scene.add(floor);

function applyTheme(){
  var sky = new T.Color(tok("--sky3d") || "#131110");
  scene.background = sky;
  scene.fog = new T.Fog(sky.getHex(), 40, 90);
  floorMat.color.set(tok("--floor3d") || "#0A0908");
  ambient.intensity = tokNum("--amb", 0.34);
  key.intensity = tokNum("--key", 2.1);
  rim.color.set(tok("--brass") || "#E8B33C");
}

/* ---------- cel shading twins + outlines ---------- */
var gradArr = new Uint8Array([44, 118, 200, 255]);
var gradMap = new T.DataTexture(gradArr, gradArr.length, 1, T.RedFormat);
gradMap.needsUpdate = true;
gradMap.minFilter = T.NearestFilter; gradMap.magFilter = T.NearestFilter;
gradMap.generateMipmaps = false;

var matPairs = new Map();
function pairToon(stdMat){
  var toon = new T.MeshToonMaterial({color: stdMat.color.clone(), gradientMap: gradMap});
  matPairs.set(stdMat, toon);
  return stdMat;
}
var outlineMat = new T.MeshBasicMaterial({color:0x0E0B08, side:T.BackSide});
var outlines = [];
function addOutline(mesh, s){
  var o = new T.Mesh(mesh.geometry, outlineMat);
  o.scale.setScalar(s); o.visible = false;
  mesh.add(o); outlines.push(o);
}
var swappables = [];
function register(root){
  root.traverse(function(o){
    if (o.isMesh && matPairs.has(o.material) && !o.userData.reg){
      o.userData.reg = true;
      swappables.push({m:o, std:o.material, toon:matPairs.get(o.material)});
    }
  });
}
var toonOn = false, outlineOn = false;
function setToon(on){
  toonOn = on;
  swappables.forEach(function(s){ s.m.material = on ? s.toon : s.std; });
  ambient.intensity = on ? tokNum("--amb",0.34) * 1.5 : tokNum("--amb",0.34);
}
function setOutlines(on){
  outlineOn = on;
  outlines.forEach(function(o){ o.visible = on; });
}

/* ---------- board build ---------- */
var COLS = 4, COL_STEP = 1.05, ROW_STEP = 1.15;
var ROW_Y0 = -4.6, KEY_X = 2.52;
function colX(i){ return (i - 1.5) * COL_STEP; }
function rowY(r){ return ROW_Y0 + r * ROW_STEP; }
var SHIELD_Y = rowY(ROWS) + 0.55;

function roundedBox(w,h,d,r){
  var s = new T.Shape();
  s.moveTo(-w/2+r, -h/2);
  s.lineTo(w/2-r, -h/2); s.quadraticCurveTo(w/2, -h/2, w/2, -h/2+r);
  s.lineTo(w/2, h/2-r);  s.quadraticCurveTo(w/2, h/2, w/2-r, h/2);
  s.lineTo(-w/2+r, h/2); s.quadraticCurveTo(-w/2, h/2, -w/2, h/2-r);
  s.lineTo(-w/2, -h/2+r);s.quadraticCurveTo(-w/2, -h/2, -w/2+r, -h/2);
  var g = new T.ExtrudeGeometry(s, {depth:d, bevelEnabled:true, bevelThickness:0.06,
    bevelSize:0.06, bevelSegments:3, curveSegments:8});
  g.center();
  return g;
}

var boardGroup = new T.Group();
scene.add(boardGroup);

var BW = 6.4, BH = (SHIELD_Y - ROW_Y0) + 1.9;
var BCY = (SHIELD_Y + ROW_Y0)/2 - 0.15;
var boardMesh = new T.Mesh(roundedBox(BW, BH, 0.9, 0.35),
  pairToon(new T.MeshStandardMaterial({color:BOARD_HEX, roughness:0.62, metalness:0.06})));
boardMesh.position.set(0, BCY, 0);
boardMesh.castShadow = true; boardMesh.receiveShadow = true;
boardGroup.add(boardMesh);

var holeGeo = new T.CylinderGeometry(0.215, 0.185, 0.32, 20);
var holeMat = new T.MeshStandardMaterial({color:HOLE_HEX, roughness:0.9, metalness:0.0});
var keyHoleGeo = new T.CylinderGeometry(0.105, 0.09, 0.24, 14);
var ringGeo = new T.TorusGeometry(0.238, 0.034, 8, 22);
var ringMat = pairToon(new T.MeshStandardMaterial({color:0x4E4133, roughness:0.55, metalness:0.18}));

var pegGeo = new T.SphereGeometry(0.33, 28, 20);
var stemGeo = new T.CylinderGeometry(0.15, 0.17, 0.42, 16);
var keyPegGeo = new T.SphereGeometry(0.115, 18, 14);


var pegMats = PEG_HEX.map(function(h){
  return pairToon(new T.MeshStandardMaterial({color:h, roughness:0.22, metalness:0.05}));
});
var keyBlackMat = new T.MeshStandardMaterial({color:0x141210, roughness:0.35, metalness:0.1});
var keyWhiteMat = new T.MeshStandardMaterial({color:0xF2ECE2, roughness:0.3, metalness:0.05});
var railMat = pairToon(new T.MeshStandardMaterial({color:RIM_HEX, roughness:0.7, metalness:0.1}));

/* holes + key clusters */
var rowGroups = [];
for (var r=0;r<ROWS;r++){
  var rg = new T.Group(); rg.position.y = rowY(r);
  for (var i=0;i<COLS;i++){
    var h = new T.Mesh(holeGeo, holeMat);
    h.rotation.x = Math.PI/2; h.position.set(colX(i), 0, 0.36);
    rg.add(h);
    var ring = new T.Mesh(ringGeo, ringMat);
    ring.position.set(colX(i), 0, 0.53); ring.castShadow = true;
    rg.add(ring);
  }
  var plate = new T.Mesh(roundedBox(0.88, 0.74, 0.2, 0.12), railMat);
  plate.position.set(KEY_X, 0, 0.52); rg.add(plate);
  for (var k=0;k<4;k++){
    var kh = new T.Mesh(keyHoleGeo, holeMat);
    kh.rotation.x = Math.PI/2;
    kh.position.set(KEY_X + ((k%2)-0.5)*0.42, ((k<2?1:-1))*0.21, 0.62);
    rg.add(kh);
  }
  boardGroup.add(rg); rowGroups.push(rg);
}

/* shield over the secret */
var shieldGroup = new T.Group();
shieldGroup.position.y = SHIELD_Y;
for (var i2=0;i2<COLS;i2++){
  var sh = new T.Mesh(holeGeo, holeMat);
  sh.rotation.x = Math.PI/2; sh.position.set(colX(i2), 0, 0.36);
  shieldGroup.add(sh);
  var shr = new T.Mesh(ringGeo, ringMat);
  shr.position.set(colX(i2), 0, 0.53); shieldGroup.add(shr);
}
var shield = new T.Mesh(roundedBox(4.5, 1.0, 0.34, 0.16),
  pairToon(new T.MeshStandardMaterial({color:0x1C1712, roughness:0.5, metalness:0.25})));
shield.position.set(0, 0, 0.72);
shield.castShadow = true;
shieldGroup.add(shield);
boardGroup.add(shieldGroup);
addOutline(boardMesh, 1.012);
register(boardGroup);

/* live peg meshes */
var livePegs = [];
function makePeg(colorIdx){
  var g = new T.Group();
  var ball = new T.Mesh(pegGeo, pegMats[colorIdx]);
  ball.castShadow = true; ball.scale.y = 0.82;
  var stem = new T.Mesh(stemGeo, pegMats[colorIdx]);
  stem.rotation.x = Math.PI/2; stem.position.z = -0.28;
  g.add(stem); g.add(ball);
  addOutline(ball, 1.09);
  register(g);
  if (toonOn) setToon(true);
  if (outlineOn) setOutlines(true);
  return g;
}
function clearBoard(){
  livePegs.forEach(function(p){ p.parent.remove(p); });
  livePegs = [];
  shield.visible = true;
}

var drops = [];
function dropPeg(mesh, targetZ, delay){
  mesh.position.z = targetZ + 5.5;
  drops.push({m:mesh, z0:targetZ+5.5, z1:targetZ, t:-delay, dur:reduce?0.01:0.42});
}
function stepDrops(dt){
  for (var i=drops.length-1;i>=0;i--){
    var d = drops[i]; d.t += dt;
    if (d.t < 0) continue;
    var u = Math.min(1, d.t/d.dur);
    var e = 1 - Math.pow(1-u, 3);
    d.m.position.z = d.z0 + (d.z1-d.z0)*e;
    if (u >= 1) drops.splice(i,1);
  }
}

function placeGuess(rowIdx, guess, fb){
  var rg = rowGroups[rowIdx];
  for (var i=0;i<COLS;i++){
    var p = makePeg(guess[i]);
    p.position.set(colX(i), 0, 0.62);
    rg.add(p); livePegs.push(p);
    dropPeg(p, 0.62, i*0.07);
  }
  var pegs = [];
  for (var b=0;b<fb[0];b++) pegs.push(keyBlackMat);
  for (var w=0;w<fb[1];w++) pegs.push(keyWhiteMat);
  for (var k=0;k<pegs.length;k++){
    var kp = new T.Mesh(keyPegGeo, pegs[k]);
    kp.castShadow = true;
    kp.position.set(KEY_X + ((k%2)-0.5)*0.42, ((k<2?1:-1))*0.21, 0.70);
    rg.add(kp); livePegs.push(kp);
    dropPeg(kp, 0.70, 0.30 + k*0.05);
  }
}
function revealSecret(){
  shield.visible = false;
  for (var i=0;i<COLS;i++){
    var p = makePeg(st.secret[i]);
    p.position.set(colX(i), 0, 0.62);
    shieldGroup.add(p); livePegs.push(p);
    dropPeg(p, 0.62, i*0.07);
  }
}

/* ---------- codespace cloud ---------- */
var GRID = 36, PITCH = 0.30, SW = 0.058, SH = 0.205, SD = 0.05, SGAP = 0.066;
var cloudGeo = new T.BoxGeometry(SW, SH, SD);
var cloudMat = new T.MeshStandardMaterial({roughness:0.45, metalness:0.05});
var cloud = new T.InstancedMesh(cloudGeo, cloudMat, 1296*4);
cloud.instanceMatrix.setUsage(T.DynamicDrawUsage);
cloud.visible = false;
scene.add(cloud);

var aliveCur = new Float32Array(1296);
var aliveTgt = new Float32Array(1296);
var _m = new T.Matrix4(), _q = new T.Quaternion(), _p = new T.Vector3(), _s = new T.Vector3();
var cloudCol = new T.Color();

(function initCloud(){
  for (var idx=0; idx<1296; idx++){
    aliveCur[idx] = 1; aliveTgt[idx] = 1;
    var gx = idx % GRID, gy = (idx / GRID)|0;
    for (var k=0;k<4;k++){
      cloudCol.setHex(PEG_HEX[ALL[idx][k]]);
      cloud.setColorAt(idx*4+k, cloudCol);
    }
  }
  if (cloud.instanceColor) cloud.instanceColor.needsUpdate = true;
  writeCloud();
})();

function writeCloud(){
  for (var idx=0; idx<1296; idx++){
    var gx = idx % GRID, gy = (idx / GRID)|0;
    var bx = (gx - (GRID-1)/2) * PITCH;
    var by = ((GRID-1)/2 - gy) * PITCH;
    var sc = aliveCur[idx];
    for (var k=0;k<4;k++){
      _p.set(bx + (k-1.5)*SGAP*0.42, by, 0);
      _s.set(sc, sc, sc);
      _m.compose(_p, _q, _s);
      cloud.setMatrixAt(idx*4+k, _m);
    }
  }
  cloud.instanceMatrix.needsUpdate = true;
}
function resetCloud(){
  for (var i=0;i<1296;i++){ aliveTgt[i] = 1; aliveCur[i] = 1; }
  writeCloud();
}
function syncCloudTargets(){
  var live = new Uint8Array(1296);
  for (var i=0;i<st.cands.length;i++) live[st.cands[i].__i] = 1;
  for (var j=0;j<1296;j++) aliveTgt[j] = live[j] ? 1 : 0;
  if (reduce){ aliveCur.set(aliveTgt); writeCloud(); }
}
for (var ii=0; ii<1296; ii++) ALL[ii].__i = ii;

/* ---------- camera rig ---------- */
var rig = {r:28, theta:0.34, phi:1.30, tx:0, ty:0.1, fov:26};
var want = {r:28, theta:0.34, phi:1.30, tx:0, ty:0.1, fov:26};
var KEYS = ["r","theta","phi","tx","ty","fov"];
var spin = false;
var PRESETS = {
  hero:  {r:28,  theta:0.34, phi:1.30, tx:0, ty:0.1,  fov:26},
  top:   {r:28,  theta:0.0,  phi:0.36, tx:0, ty:0.1,  fov:26},
  close: {r:11,  theta:0.22, phi:1.34, tx:0, ty:-3.2, fov:30},
  cloud: {r:24,  theta:0.0,  phi:1.5707, tx:0, ty:0,  fov:26}
};
function goto(p){ KEYS.forEach(function(k){ if (p[k] !== undefined) want[k] = p[k]; }); }
function snap(){ var o = {}; KEYS.forEach(function(k){ o[k] = rig[k]; }); return o; }
function applyCam(){
  var sp = Math.sin(rig.phi);
  camera.position.set(
    rig.tx + rig.r*sp*Math.sin(rig.theta),
    rig.ty + rig.r*Math.cos(rig.phi),
    rig.r*sp*Math.cos(rig.theta)
  );
  camera.lookAt(rig.tx, rig.ty, 0);
  if (Math.abs(camera.fov - rig.fov) > 0.01){
    camera.fov = rig.fov; camera.updateProjectionMatrix();
  }
}

var dragging = false, lastX = 0, lastY = 0;
canvas.addEventListener("pointerdown", function(e){
  dragging = true; spin = false; lastX = e.clientX; lastY = e.clientY;
  canvas.setPointerCapture(e.pointerId);
});
canvas.addEventListener("pointermove", function(e){
  if (!dragging) return;
  want.theta -= (e.clientX - lastX) * 0.006;
  want.phi = Math.max(0.16, Math.min(2.4, want.phi - (e.clientY - lastY) * 0.006));
  lastX = e.clientX; lastY = e.clientY;
});
canvas.addEventListener("pointerup", function(e){ dragging = false; });
canvas.addEventListener("pointercancel", function(){ dragging = false; });
canvas.addEventListener("wheel", function(e){
  e.preventDefault();
  want.r = Math.max(6, Math.min(40, want.r + e.deltaY * 0.02));
}, {passive:false});

/* ---------- render loop ---------- */
var shot = {a:null, b:null, dur:3, ease:"inout", playing:false, t:0};
var rec = {on:false, dt:1/30, recorder:null, track:null, chunks:[]};
function easeFn(u){
  if (shot.ease === "linear") return u;
  if (shot.ease === "out") return 1 - Math.pow(1-u, 3);
  return u < 0.5 ? 4*u*u*u : 1 - Math.pow(-2*u+2, 3)/2;
}
function playShot(){
  if (!shot.a || !shot.b) return false;
  shot.playing = true; shot.t = 0; spin = false; return true;
}

var clock = new T.Clock();
var camTick = 0;
function frame(){
  requestAnimationFrame(frame);
  var dt = rec.on ? rec.dt : Math.min(clock.getDelta(), 0.05);

  if (shot.playing){
    shot.t += dt;
    var u = Math.min(1, shot.t / Math.max(0.05, shot.dur));
    var e = easeFn(u);
    KEYS.forEach(function(k){
      rig[k] = shot.a[k] + (shot.b[k] - shot.a[k]) * e;
      want[k] = rig[k];
    });
    if (u >= 1) shot.playing = false;
  } else {
    if (spin && !dragging) want.theta += dt * 0.28;
    var k2 = reduce ? 1 : (1 - Math.pow(0.001, dt));
    KEYS.forEach(function(k){ rig[k] += (want[k] - rig[k]) * k2; });
  }
  applyCam();
  stepDrops(dt);
  if (cloud.visible && !reduce){
    var moved = false;
    for (var i=0;i<1296;i++){
      var d = aliveTgt[i] - aliveCur[i];
      if (Math.abs(d) > 0.002){ aliveCur[i] += d * Math.min(1, dt*5.5); moved = true; }
      else if (aliveCur[i] !== aliveTgt[i]){ aliveCur[i] = aliveTgt[i]; moved = true; }
    }
    if (moved) writeCloud();
  }
  renderer.render(scene, camera);

  if (rec.on){
    if (rec.track && rec.track.requestFrame) rec.track.requestFrame();
    if (!shot.playing) stopRec();
  }
  camTick += dt;
  if (camTick > 0.12){ camTick = 0; syncCamInputs(); }
}

function resize(){
  if (document.body.classList.contains("plate")){
    renderer.setSize(1080, 1920, false);
    camera.aspect = 1080/1920; camera.updateProjectionMatrix();
    return;
  }
  var box = canvas.parentElement.getBoundingClientRect();
  var w = Math.max(1, box.width|0), h = Math.max(1, box.height|0);
  renderer.setSize(w, h, false);
  camera.aspect = w/h; camera.updateProjectionMatrix();
}
window.addEventListener("resize", resize);

/* ---------- UI ---------- */
var elSw = document.getElementById("swatches");
var elGuess = document.getElementById("guessRow");
var elLog = document.getElementById("log");
var elCount = document.getElementById("count");
var elCountLbl = document.getElementById("countLbl");
var elCaption = document.getElementById("caption");
var elSubmit = document.getElementById("submit");
var elUndo = document.getElementById("undo");
var elNote = document.getElementById("modeNote");
var elPick = document.getElementById("pickBlock");

function caption(t){ elCaption.textContent = t || ""; }

PEG_NAME.forEach(function(name, i){
  var b = document.createElement("button");
  b.type = "button"; b.className = "sw"; b.title = name;
  b.setAttribute("aria-label", name);
  b.style.background = "var(" + PEG_CSS[i] + ")";
  b.addEventListener("click", function(){
    if (st.mode !== "play" || st.solved || st.busy) return;
    if (st.draft.length < 4){ st.draft.push(i); syncUI(); }
  });
  elSw.appendChild(b);
});

var elSecret, elStateBox, elWarn, camIn = {};
function syncDirector(){
  if (!elSecret) return;
  if (document.activeElement !== elSecret) elSecret.value = codeStr(st.secret);
  if (document.activeElement !== elStateBox) elStateBox.value = serialize();
}
function syncCamInputs(){
  if (!camIn.r) return;
  var a = document.activeElement;
  if (a !== camIn.r) camIn.r.value = rig.r.toFixed(1);
  if (a !== camIn.t) camIn.t.value = rig.theta.toFixed(2);
  if (a !== camIn.p) camIn.p.value = rig.phi.toFixed(2);
  if (a !== camIn.y) camIn.y.value = rig.ty.toFixed(1);
  if (camIn.f && a !== camIn.f) camIn.f.value = rig.fov.toFixed(0);
}

function syncUI(){
  elGuess.innerHTML = "";
  for (var i=0;i<4;i++){
    var s = document.createElement("div");
    s.className = "slot" + (st.draft[i] !== undefined ? " filled" : "");
    if (st.draft[i] !== undefined) s.style.background = "var(" + PEG_CSS[st.draft[i]] + ")";
    elGuess.appendChild(s);
  }
  elSubmit.disabled = st.draft.length !== 4 || st.solved || st.busy;
  elUndo.disabled = st.draft.length === 0;

  elLog.innerHTML = "";
  if (!st.guesses.length){
    var li0 = document.createElement("li");
    li0.className = "empty"; li0.textContent = "No guesses yet";
    elLog.appendChild(li0);
  }
  st.guesses.forEach(function(g, n){
    var fb = st.feedback[n];
    var li = document.createElement("li");
    var sp = document.createElement("span"); sp.className = "n"; sp.textContent = (n+1);
    var cd = document.createElement("span"); cd.className = "code"; cd.textContent = codeStr(g);
    var fbw = document.createElement("span"); fbw.className = "fb";
    for (var b=0;b<fb[0];b++){ var d1 = document.createElement("i"); d1.className="kp b"; fbw.appendChild(d1); }
    for (var w=0;w<fb[1];w++){ var d2 = document.createElement("i"); d2.className="kp w"; fbw.appendChild(d2); }
    if (!fb[0] && !fb[1]){ var d3 = document.createElement("i"); d3.className="kp"; fbw.appendChild(d3); }
    li.appendChild(sp); li.appendChild(cd); li.appendChild(fbw);
    elLog.appendChild(li);
  });

  elCount.textContent = st.solved ? codeStr(st.secret) : st.cands.length;
  elCountLbl.textContent = st.solved
    ? "cracked on guess " + st.guesses.length
    : (st.cands.length ? "codes still possible" : "no code fits that feedback");
  syncDirector();
}

function recount(){
  st.cands = ALL.filter(function(c){
    for (var i=0;i<st.guesses.length;i++){
      var s2 = score(st.guesses[i], c), f = st.feedback[i];
      if (s2[0] !== f[0] || s2[1] !== f[1]) return false;
    }
    return true;
  });
}

/* ---------- state string ---------- */
function serialize(){
  var parts = [codeStr(st.secret)];
  for (var i=0;i<st.guesses.length;i++){
    var f = st.feedback[i];
    parts.push(codeStr(st.guesses[i]) + "=" + f[0] + "b" + f[1] + "w");
  }
  parts.push("cam " + rig.r.toFixed(1) + "," + rig.theta.toFixed(2) + ","
    + rig.phi.toFixed(2) + "," + rig.ty.toFixed(1));
  return parts.join(" / ");
}
function parseCode(t){
  t = (t||"").replace(/[^1-6]/g, "");
  if (t.length !== 4) return null;
  return t.split("").map(function(ch){ return (+ch) - 1; });
}
function applyState(text){
  var chunks = String(text).split("/").map(function(x){ return x.trim(); }).filter(Boolean);
  var secret = null, rows = [], cam = null, bad = [];
  chunks.forEach(function(ch){
    if (/^cam/i.test(ch)){
      var n = ch.replace(/^cam/i, "").split(",").map(parseFloat);
      if (n.length >= 3 && n.every(function(v){ return !isNaN(v); })) cam = n;
      else bad.push(ch);
      return;
    }
    var m = ch.match(/^([1-6]{4})\s*(?:=\s*(\d)\s*b\s*(\d)\s*w)?$/i);
    if (!m){ bad.push(ch); return; }
    var g = parseCode(m[1]);
    if (secret === null && m[2] === undefined && rows.length === 0){ secret = g; return; }
    rows.push({g:g, f: m[2] === undefined ? null : [+m[2], +m[3]]});
  });
  if (!secret) secret = rows.length ? rows[rows.length-1].g : ALL[(Math.random()*1296)|0].slice();

  clearStrat();
  st.secret = secret; st.guesses = []; st.feedback = []; st.draft = [];
  st.solved = false; st.busy = false;
  clearBoard();
  rows = rows.slice(0, ROWS);
  rows.forEach(function(row, n){
    var f = row.f || score(row.g, st.secret);
    if (f[0] + f[1] > 4){ f = [Math.min(4, f[0]), Math.max(0, 4 - Math.min(4, f[0]))]; }
    st.guesses.push(row.g); st.feedback.push(f);
    placeGuess(n, row.g, f);
    if (f[0] === 4) st.solved = true;
  });
  recount();
  if (st.solved) revealSecret();
  if (cam){
    want.r = Math.max(6, Math.min(40, cam[0]));
    want.theta = cam[1];
    want.phi = Math.max(0.16, Math.min(2.4, cam[2]));
    if (cam.length > 3) want.ty = cam[3];
    spin = false;
  }
  syncCloudTargets(); syncUI(); syncDirector();
  return bad;
}

function submitGuess(g){
  if (st.busy || st.solved) return;
  st.busy = true;
  var fb = score(g, st.secret);
  st.guesses.push(g.slice()); st.feedback.push(fb);
  st.cands = st.cands.filter(function(c){
    var s = score(g, c); return s[0]===fb[0] && s[1]===fb[1];
  });
  placeGuess(st.guesses.length-1, g, fb);
  syncCloudTargets();
  st.draft = [];
  if (fb[0] === 4){ st.solved = true; revealSecret(); }
  syncUI();
  setTimeout(function(){ st.busy = false; syncUI(); }, reduce ? 20 : 620);
  return fb;
}

elSubmit.addEventListener("click", function(){
  if (st.draft.length === 4) submitGuess(st.draft.slice());
});
elUndo.addEventListener("click", function(){ st.draft.pop(); syncUI(); });
document.getElementById("newGame").addEventListener("click", newGame);

/* view + mode + camera buttons */
var vBoard = document.getElementById("vBoard"), vCloud = document.getElementById("vCloud");
function setView(v){
  st.view = v;
  vBoard.setAttribute("aria-pressed", String(v==="board"));
  vCloud.setAttribute("aria-pressed", String(v==="cloud"));
  boardGroup.visible = (v==="board");
  shieldGroup.visible = (v==="board");
  cloud.visible = (v==="cloud");
  floor.visible = (v==="board" && bgMode === "studio");
  goto(v==="board" ? PRESETS.hero : PRESETS.cloud);
  if (v==="cloud") syncCloudTargets();
}
vBoard.addEventListener("click", function(){ setView("board"); });
vCloud.addEventListener("click", function(){ setView("cloud"); });

var mPlay = document.getElementById("mPlay"), mStrat = document.getElementById("mStrat"),
    mDirect = document.getElementById("mDirect"), elDir = document.getElementById("dirBlock");
var NOTES = {
  play: "Pick 4 colours and submit. Repeats allowed.",
  strategy: "Plays the locked script: <strong>1122</strong>, then branches on the answer.",
  director: "Compose any board and camera, then copy the state string."
};
function setMode(m){
  clearStrat();
  st.mode = m;
  mPlay.setAttribute("aria-pressed", String(m==="play"));
  mStrat.setAttribute("aria-pressed", String(m==="strategy"));
  mDirect.setAttribute("aria-pressed", String(m==="director"));
  elPick.style.display = (m==="play") ? "" : "none";
  elDir.style.display = (m==="director") ? "" : "none";
  elNote.innerHTML = NOTES[m];
  if (m === "strategy"){ newGame(); runStrategy(); }
  if (m === "director"){ caption(""); syncDirector(); }
}
mPlay.addEventListener("click", function(){ setMode("play"); });
mStrat.addEventListener("click", function(){ setMode("strategy"); });
mDirect.addEventListener("click", function(){ setMode("director"); });

elSecret = document.getElementById("secretIn");
elStateBox = document.getElementById("stateBox");
elWarn = document.getElementById("stateWarn");
camIn.r = document.getElementById("camR"); camIn.t = document.getElementById("camT");
camIn.p = document.getElementById("camP"); camIn.y = document.getElementById("camY");

elSecret.addEventListener("change", function(){
  var c = parseCode(elSecret.value);
  if (!c){ elWarn.textContent = "Secret needs 4 digits, each 1-6."; syncDirector(); return; }
  elWarn.textContent = "";
  st.secret = c; recount(); syncCloudTargets(); syncUI();
});
document.getElementById("applyState").addEventListener("click", function(){
  var bad = applyState(elStateBox.value);
  elWarn.textContent = bad.length ? "Ignored: " + bad.join(", ") : "";
});
document.getElementById("copyState").addEventListener("click", function(){
  var txt = serialize();
  elStateBox.value = txt;
  elStateBox.focus(); elStateBox.select();
  if (navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(txt).then(function(){
      elWarn.textContent = "Copied.";
    }, function(){ elWarn.textContent = "Selected — press Ctrl/Cmd+C."; });
  } else elWarn.textContent = "Selected — press Ctrl/Cmd+C.";
});
["r","t","p","y"].forEach(function(k){
  var map = {r:"r", t:"theta", p:"phi", y:"ty"};
  camIn[k].addEventListener("input", function(){
    var v = parseFloat(camIn[k].value);
    if (isNaN(v)) return;
    spin = false;
    if (k === "r") v = Math.max(6, Math.min(40, v));
    if (k === "p") v = Math.max(0.16, Math.min(2.4, v));
    want[map[k]] = v;
  });
});

Array.prototype.forEach.call(document.querySelectorAll("[data-cam]"), function(b){
  b.addEventListener("click", function(){
    var c = b.getAttribute("data-cam");
    if (c === "spin"){ spin = !spin; return; }
    spin = false; goto(PRESETS[c]);
  });
});

/* theme toggle */
document.getElementById("themer").addEventListener("click", function(){
  var cur = document.documentElement.getAttribute("data-theme");
  var dark = cur ? cur === "dark"
    : window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.setAttribute("data-theme", dark ? "light" : "dark");
  applyTheme(); applyBg();
});
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", applyTheme);

/* ---------- strategy walkthrough ---------- */
var stratTimers = [];
function clearStrat(){ stratTimers.forEach(clearTimeout); stratTimers = []; }
function later(ms, fn){ stratTimers.push(setTimeout(fn, reduce ? Math.min(ms, 60) : ms)); }

function runStrategy(){
  clearStrat();
  setView("board");
  caption("In Mastermind, there are 1296 codes your opponent could be hiding.");
  later(2600, function(){
    caption("Move 1 never changes. Red, red, orange, orange.");
    later(1400, function(){
      var fb = submitGuess(OPENING.slice());
      var total = fb[0] + fb[1];
      later(1900, function(){
        caption("Whatever answer comes back, you are down to 256 codes at worst. "
              + st.cands.length + " here.");
        later(2600, function(){
          if (st.solved) return finish();
          var next, line;
          if (total <= 1){
            next = BRANCH_LOW.slice();
            line = "0 or 1 peg. Your reds and oranges are mostly dead, so bring in 3 fresh colours: yellow, yellow, green, blue.";
          } else if (total <= 3){
            next = BRANCH_MID.slice();
            line = "2 or 3 pegs. Go red, red, yellow, green. Keep the reds where they were, so anything that changes comes from the 2 new colours.";
          } else {
            next = (st.cands[0] || OPENING).slice();
            line = "4 pegs, once in 216 openings. Stop testing colours and rearrange the 2 reds and 2 oranges you already have.";
          }
          caption(line);
          later(2600, function(){ submitGuess(next); later(2200, finish); });
        });
      });
    });
  });
}
function finish(){
  caption("You will have the code by guess 4.");
  goto(PRESETS.close);
}


/* ---------- shot, look and output controls ---------- */
var elOutWarn = document.getElementById("outWarn");
function outMsg(t){ elOutWarn.textContent = t || ""; }

document.getElementById("setA").addEventListener("click", function(){
  shot.a = snap(); outMsg("A set.");
});
document.getElementById("setB").addEventListener("click", function(){
  shot.b = snap(); outMsg("B set.");
});
document.getElementById("shotDur").addEventListener("input", function(){
  var v = parseFloat(this.value); if (!isNaN(v)) shot.dur = Math.max(0.25, v);
});
document.getElementById("shotEase").addEventListener("change", function(){
  shot.ease = this.value;
});
document.getElementById("playShot").addEventListener("click", function(){
  if (!playShot()) outMsg("Set A and B first, or pick a move.");
});

var MOVES = {
  push:   function(a){ var b = snap(); b.r = Math.max(6, a.r * 0.72); return b; },
  pull:   function(a){ var b = snap(); b.r = Math.min(40, a.r * 1.4); return b; },
  orbit:  function(a){ var b = snap(); b.theta = a.theta + 0.55; return b; },
  crane:  function(a){ var b = snap(); b.phi = Math.min(2.4, a.phi + 0.45); b.ty = a.ty - 1.6; return b; },
  reveal: function(a){ var b = snap(); b.phi = Math.max(0.16, a.phi - 0.62); b.r = a.r * 0.88; return b; },
  drift:  function(a){ var b = snap(); b.theta = a.theta + 0.16; b.r = a.r * 0.94; return b; }
};
Array.prototype.forEach.call(document.querySelectorAll("[data-move]"), function(btn){
  btn.addEventListener("click", function(){
    var a = snap();
    shot.a = a; shot.b = MOVES[btn.getAttribute("data-move")](a);
    outMsg("Move built. Play to run it.");
    playShot();
  });
});

var toonBtn = document.getElementById("toonBtn");
var outlineBtn = document.getElementById("outlineBtn");
toonBtn.addEventListener("click", function(){
  setToon(!toonOn); toonBtn.classList.toggle("on", toonOn);
});
outlineBtn.addEventListener("click", function(){
  setOutlines(!outlineOn); outlineBtn.classList.toggle("on", outlineOn);
});

var bgMode = "studio";
var bgSel = document.getElementById("bgSel");
function applyBg(){
  if (bgMode === "alpha"){
    scene.background = null; scene.fog = null;
    renderer.setClearColor(0x000000, 0);
    floor.visible = false;
  } else if (bgMode === "green" || bgMode === "blue"){
    var c = new T.Color(bgMode === "green" ? 0x00B140 : 0x0047BB);
    scene.background = c; scene.fog = null;
    renderer.setClearColor(c, 1);
    floor.visible = false;
  } else {
    renderer.setClearColor(0x000000, 1);
    floor.visible = (st.view === "board");
    applyTheme();
  }
}
bgSel.addEventListener("change", function(){ bgMode = this.value; applyBg(); });

var plateBtn = document.getElementById("plateBtn");
function setPlate(on){
  document.body.classList.toggle("plate", on);
  plateBtn.classList.toggle("on", on);
  resize();
}
plateBtn.addEventListener("click", function(){
  setPlate(!document.body.classList.contains("plate"));
});
document.getElementById("exitPlate").addEventListener("click", function(){ setPlate(false); });
document.addEventListener("keydown", function(e){
  if (e.key === "Escape" && document.body.classList.contains("plate")) setPlate(false);
});

var dlNs = null, dlAsked = false, dlPromise = null;
function getDownloads(){
  if (dlPromise) return dlPromise;
  dlPromise = new Promise(function(resolve){
    if (!(window.claude && typeof window.claude.use === "function")) return resolve(null);
    try {
      window.claude.use("downloads").then(function(ns){ resolve(ns || null); },
                                          function(){ resolve(null); });
    } catch (e){ resolve(null); }
  });
  return dlPromise;
}
function localSave(blob, name){
  try {
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url; a.download = name;
    document.body.appendChild(a); a.click();
    setTimeout(function(){ URL.revokeObjectURL(url); a.remove(); }, 2000);
    outMsg("Saved " + name + ".");
  } catch (err){ outMsg("Could not save here — try the local copy."); }
}
function saveBlob(blob, name){
  outMsg("Preparing " + name + "…");
  getDownloads().then(function(dl){
    if (dl && typeof dl.save === "function"){
      dl.save({filename:name, data:blob}).then(function(){
        outMsg("Saved " + name + ".");
      }, function(err){
        var c = err && err.code;
        if (c === "declined") outMsg("Save declined.");
        else if (c === "rate_limited") outMsg("A save prompt is already open.");
        else if (c === "unavailable" || c === "not_granted") localSave(blob, name);
        else outMsg("Save failed (" + (c || "unknown") + ").");
      });
    } else localSave(blob, name);
  });
}
document.getElementById("savePng").addEventListener("click", function(){
  renderer.render(scene, camera);
  canvas.toBlob(function(b){
    if (b) saveBlob(b, "board-" + Date.now() + ".png");
    else outMsg("Could not read the canvas.");
  }, "image/png");
});

function stopRec(){
  if (!rec.on) return;
  rec.on = false;
  try { rec.recorder.stop(); } catch(e){}
}
document.getElementById("recBtn").addEventListener("click", function(){
  if (rec.on){ stopRec(); return; }
  if (!shot.a || !shot.b){ outMsg("Set A and B, or pick a move, then record."); return; }
  if (!canvas.captureStream || typeof MediaRecorder === "undefined"){
    outMsg("This browser can't record the canvas."); return;
  }
  var stream = canvas.captureStream(0);
  rec.track = stream.getVideoTracks()[0];
  var mime = ["video/webm;codecs=vp9", "video/webm;codecs=vp8", "video/webm"]
    .filter(function(m){ return MediaRecorder.isTypeSupported(m); })[0];
  if (!mime){ outMsg("No webm encoder available."); return; }
  rec.chunks = [];
  rec.recorder = new MediaRecorder(stream, {mimeType:mime, videoBitsPerSecond: 16000000});
  rec.recorder.ondataavailable = function(e){ if (e.data && e.data.size) rec.chunks.push(e.data); };
  rec.recorder.onstop = function(){
    saveBlob(new Blob(rec.chunks, {type:"video/webm"}), "shot-" + Date.now() + ".webm");
  };
  rec.recorder.start();
  rec.on = true;
  outMsg("Recording at 30fps, fixed step…");
  KEYS.forEach(function(k){ rig[k] = shot.a[k]; want[k] = shot.a[k]; });
  applyCam();
  playShot();
});

camIn.f = document.getElementById("camF");
camIn.f.addEventListener("input", function(){
  var v = parseFloat(camIn.f.value);
  if (!isNaN(v)) want.fov = Math.max(8, Math.min(90, v));
});

/* ---------- boot ---------- */
applyTheme();
applyBg();
resize();
newGame();
setView("board");
goto(PRESETS.hero);
rig.r = 38; applyCam();
frame();
})();
