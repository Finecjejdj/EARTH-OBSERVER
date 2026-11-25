/* Карточка события: появляется у глобуса при клике на точку.
   1) красные отметки «События года» (globe.js), 2) землетрясения и события NASA EONET (live.js). */
(function () {
  "use strict";
  var $ = function (id) { return document.getElementById(id); };
  var pop = document.createElement("section");
  pop.id = "evpop";
  pop.className = "glass";
  pop.setAttribute("role", "region");
  pop.setAttribute("aria-live", "polite");
  pop.setAttribute("aria-label", "Описание события");
  var kEl = document.createElement("span"), tEl = document.createElement("b"), bEl = document.createElement("div"), xBtn = document.createElement("button");
  kEl.className = "ep-k"; tEl.className = "ep-t"; bEl.className = "ep-b";
  xBtn.type = "button"; xBtn.className = "ep-x"; xBtn.setAttribute("aria-label", "Закрыть");
  xBtn.innerHTML = '<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
  pop.append(xBtn, kEl, tEl, bEl);
  document.body.appendChild(pop);

  var src = null; // { type: "year", year } | { type: "live" }
  function hide() { pop.classList.remove("on"); src = null; }
  function open(kind, title, build, s) {
    pop.classList.remove("wx");
    kEl.textContent = kind;
    tEl.textContent = title;
    bEl.textContent = "";
    build(bEl);
    src = s;
    pop.scrollTop = 0;
    pop.classList.add("on");
  }
  // подробная карточка погоды из live.js
  window.showEvPop = function (kind, title, build) {
    open(kind, title, build, { type: "weather" });
    pop.classList.add("wx");
  };
  xBtn.addEventListener("click", hide);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && pop.classList.contains("on")) hide();
  });

  /* 1) события года: оборачиваем pick() из globe.js (его зовут и список, и клик по глобусу) */
  if (typeof pick === "function" && typeof EVS !== "undefined") {
    var pick0 = pick;
    pick = function (i) {
      pick0(i);
      var e = (EVS[year] || [])[i];
      if (!e) return;
      open("Событие " + year + " года", e.t, function (box) { box.innerHTML = e.d; }, { type: "year", year: year });
    };
    // смена года убирает карточку, она относилась к прежнему году
    if (typeof ui === "function") {
      var ui0 = ui;
      ui = function () {
        ui0();
        if (src && src.type === "year" && src.year !== year) hide();
      };
    }
  }

  /* 2) живые точки: повторяем в карточке то, что live.js пишет в панель «Сейчас на Земле».
        Погоду (клик по пустому месту) не дублируем, она остаётся в панели. */
  var info = $("lvInfo");
  if (info && "MutationObserver" in window) {
    new MutationObserver(function () {
      var b = info.querySelector("b");
      if (!b || /^Погода/.test(b.textContent)) return;
      var title = b.textContent, lines = [], link = null;
      Array.prototype.forEach.call(info.children, function (c) {
        if (c.tagName === "SPAN" && c.textContent) lines.push(c.textContent);
        else if (c.tagName === "A" && /^https:\/\//.test(c.href)) link = { href: c.href, text: c.textContent };
      });
      open(/^Землетрясение/.test(title) ? "Землетрясение · USGS" : "Событие · NASA EONET", title, function (box) {
        lines.forEach(function (t) { var s = document.createElement("span"); s.textContent = t; box.appendChild(s); });
        if (link) {
          var a = document.createElement("a");
          a.href = link.href; a.textContent = link.text; a.target = "_blank"; a.rel = "noopener noreferrer";
          box.appendChild(a);
        }
      }, { type: "live" });
    }).observe(info, { childList: true });
  }
})();
