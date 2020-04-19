/**
 * timer.js — 25/5 pomodoro (lockdown edition)
 */
(function () {
  var FOCUS = 25 * 60;
  var BRK = 5 * 60;
  var remaining = FOCUS;
  var focus = true;
  var handle = null;

  var timeEl = document.getElementById("time");
  var modeEl = document.getElementById("mode");

  function fmt(s) {
    var m = Math.floor(s / 60);
    var r = s % 60;
    return (m < 10 ? "0" : "") + m + ":" + (r < 10 ? "0" : "") + r;
  }

  function paint() {
    timeEl.textContent = fmt(remaining);
    modeEl.textContent = focus ? "Focus" : "Break";
  }

  function tick() {
    if (remaining <= 0) {
      focus = !focus;
      remaining = focus ? FOCUS : BRK;
      try { new Audio("data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=").play(); } catch (e) {}
    } else {
      remaining -= 1;
    }
    paint();
  }

  document.getElementById("start").onclick = function () {
    if (handle) return;
    handle = setInterval(tick, 1000);
  };
  document.getElementById("reset").onclick = function () {
    clearInterval(handle);
    handle = null;
    focus = true;
    remaining = FOCUS;
    paint();
  };
  paint();
})();
