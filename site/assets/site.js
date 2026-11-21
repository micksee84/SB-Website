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

// What you can make: a list of features beside one player (ARIA tabs)
(function () {
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.mk-tab'));
  if (!tabs.length) return;
  function select(i, focus) {
    tabs.forEach(function (t, j) {
      var on = j === i;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      var panel = document.getElementById(t.getAttribute('aria-controls'));
      if (!panel) return;
      panel.hidden = !on;
      var v = panel.querySelector('video.clip');
      if (!v) return;
      if (on) { v.currentTime = 0; playClip(v); } else v.pause();
    });
    if (focus) tabs[i].focus();
    if (tabs[i].scrollIntoView && window.matchMedia('(max-width: 860px)').matches) {
      tabs[i].scrollIntoView({ block: 'nearest', inline: 'nearest' });
    }
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { select(i, false); });
    t.addEventListener('keydown', function (e) {
      var k = e.key, n = tabs.length, to = null;
      if (k === 'ArrowDown' || k === 'ArrowRight') to = (i + 1) % n;
      else if (k === 'ArrowUp' || k === 'ArrowLeft') to = (i - 1 + n) % n;
      else if (k === 'Home') to = 0;
      else if (k === 'End') to = n - 1;
      if (to === null) return;
      e.preventDefault();
      select(to, true);
    });
  });
})();
