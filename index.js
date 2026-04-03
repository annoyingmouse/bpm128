const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function glyphs(str, container) {
  for (const ch of str) {
    const el = document.createElement('bpm-glyph');
    el.setAttribute('char', ch);
    container.appendChild(el);
  }
}

glyphs('ABCDEFGHIJKLMNOPQRSTUVWXYZ', document.getElementById('letters'));
glyphs('0123456789', document.getElementById('digits'));
glyphs(':-._ ', document.getElementById('punctuation'));

const colourSample = 'BPM8';
['default', 'amber', 'green', 'red', 'white'].forEach(name => {
  glyphs(colourSample, document.getElementById(`col-${name}`));
});

// Scrolling demo — rotates left one character per second (paused if reduced motion)
const demoText = 'BPM 128  ---  ';
const demoEl = document.getElementById('demo');
const demoCells = Array.from({ length: 7 }, () => {
  const el = document.createElement('bpm-glyph');
  el.setAttribute('aria-hidden', 'true');
  demoEl.appendChild(el);
  return el;
});

let demoOffset = 0;
function scrollDemo() {
  demoCells.forEach((el, i) => {
    el.setAttribute('char', demoText[(i + demoOffset) % demoText.length]);
  });
  demoOffset = (demoOffset + 1) % demoText.length;
}
scrollDemo();
if (!reduceMotion) setInterval(scrollDemo, 1000);

// Clock — HH:MM:SS with blinking colons (colon frozen if reduced motion)
const clockEl = document.getElementById('clock');
const pad = n => String(n).padStart(2, '0');

const positions = ['h1', 'h2', 'c1', 'm1', 'm2', 'c2', 's1', 's2'];
const cells = {};
for (const id of positions) {
  const el = document.createElement('bpm-glyph');
  el.setAttribute('aria-hidden', 'true');
  cells[id] = el;
  clockEl.appendChild(el);
}

function tick() {
  const now = new Date();
  const hh = pad(now.getHours());
  const mm = pad(now.getMinutes());
  const ss = pad(now.getSeconds());
  const colon = (!reduceMotion && Math.floor(Date.now() / 500) % 2 === 0) ? ' ' : ':';

  cells.h1.setAttribute('char', hh[0]);
  cells.h2.setAttribute('char', hh[1]);
  cells.c1.setAttribute('char', colon);
  cells.m1.setAttribute('char', mm[0]);
  cells.m2.setAttribute('char', mm[1]);
  cells.c2.setAttribute('char', colon);
  cells.s1.setAttribute('char', ss[0]);
  cells.s2.setAttribute('char', ss[1]);

  clockEl.setAttribute('aria-label', `${hh}:${mm}:${ss}`);
}

tick();
setInterval(tick, 500);
