// Demo clips: play muted loops only while on screen. With reduced motion, show the
// poster frame and let people press play themselves.
var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function playClip(v) {
  if (reduceMotion) { if (v.hasAttribute('data-clip')) v.controls = true; return; }
  if (v.preload === 'none') v.preload = 'auto';
  var p = v.play();
  if (p && p.catch) p.catch(function () { if (v.hasAttribute('data-clip')) v.controls = true; });
}

(function () {
  var clips = document.querySelectorAll('video.clip');
  if (!clips.length) return;
  if (reduceMotion) { clips.forEach(function (v) { if (v.hasAttribute('data-clip')) v.controls = true; }); return; }
  if (!('IntersectionObserver' in window)) { clips.forEach(playClip); return; }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      var v = e.target;
      if (e.isIntersecting && !v.closest('[hidden]')) playClip(v);
      else v.pause();
    });
  }, { threshold: 0.35 });
  clips.forEach(function (v) { io.observe(v); });
  window.__sbClipObserver = io;
})();

// What you can make: pick a tile to see its details
(function () {
  var tiles = document.querySelectorAll('[data-pick]');
  var panels = document.querySelectorAll('[data-panel]');
  if (!tiles.length || !panels.length) return;
  var cur = 0;
  function show(i, open) {
    cur = (i + panels.length) % panels.length;
    panels.forEach(function (p, j) {
      var on = open && j === cur;
      p.hidden = !on;
      var v = p.querySelector('video.clip');
      if (!v) return;
      if (on) { v.currentTime = 0; playClip(v); } else v.pause();
    });
    tiles.forEach(function (t, j) {
      var on = open && j === cur;
      t.setAttribute('aria-pressed', on ? 'true' : 'false');
      t.style.border = on ? '3px solid #2D2200' : '1.5px solid #2D2200';
    });
  }
  tiles.forEach(function (t, i) { t.addEventListener('click', function () { show(i, true); }); });
  document.querySelectorAll('[data-prev]').forEach(function (b) { b.addEventListener('click', function () { show(cur - 1, true); }); });
  document.querySelectorAll('[data-next]').forEach(function (b) { b.addEventListener('click', function () { show(cur + 1, true); }); });
  document.querySelectorAll('[data-close]').forEach(function (b) { b.addEventListener('click', function () { show(cur, false); }); });
})();
