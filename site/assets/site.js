// What you can make: pick a tile to see its details
(function () {
  var tiles = document.querySelectorAll('[data-pick]');
  var panels = document.querySelectorAll('[data-panel]');
  if (!tiles.length || !panels.length) return;
  var cur = 0;
  function show(i, open) {
    cur = (i + panels.length) % panels.length;
    panels.forEach(function (p, j) { p.hidden = !open || j !== cur; });
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
