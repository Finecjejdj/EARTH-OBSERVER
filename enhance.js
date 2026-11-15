
(function () {
  "use strict";
  if (typeof Y === "undefined" || typeof ui !== "function") return;
  const $ = (id) => document.getElementById(id);
  const reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const ease = (t) => 1 - Math.pow(1 - t, 3);
  const YEARS = Y.map((d) => d.y),
    Y0 = YEARS[0],
    Y1 = YEARS[YEARS.length - 1],
    AMAX = 1.5;
  const byYear = (y) => Y.find((d) => d.y === y);
  const aOf = (y) => {
    const d = byYear(y);
    return d && d.a != null ? d.a : 1.19;
  };
  const mixHex = (a, b, t) => {
    const p = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
    const A = p(a),
      B = p(b);
    return (
      "#" +
      A.map((v, i) =>
        Math.round(v + (B[i] - v) * t)
          .toString(16)
          .padStart(2, "0"),
      ).join("")
    );
  };
  const colorA = (a) => {
    const t = clamp((a - 0.8) / 0.6, 0, 1);
    return t < 0.5
      ? mixHex("#6fd3ff", "#ffd166", t * 2)
      : mixHex("#ffd166", "#ff6a2b", (t - 0.5) * 2);
  };

  /* --- вступление: приглушаем интерфейс --- */
  const hero = $("hero");
  const syncHero = () => {
    const on = !!hero && !hero.classList.contains("off");
    document.body.classList.toggle("hero-on", on);
    document.documentElement.classList.toggle("hero-on", on);
    ["top", "dock"].forEach((id) => { const e = $(id); if (e) e.inert = on; });
    document.querySelectorAll(".cols").forEach((e) => { e.inert = on; });
  };
  if (hero)
    new MutationObserver(syncHero).observe(hero, { attributes: true, attributeFilter: ["class"] });
  syncHero();

  /* --- год: плавное растворение вместо барабана --- */
  function roll(el, text) {
    if (el.textContent === text) return;
    el.textContent = text;
    el.setAttribute("aria-label", text);
    el.classList.remove("yfade");
    void el.offsetWidth;
    el.classList.add("yfade");
  }

  /* --- плавный счётчик чисел --- */
  const raf = new WeakMap();
  function num(el, to, dec, prefix) {
    prefix = prefix || "";
    cancelAnimationFrame(raf.get(el) || 0);
    if (to == null || isNaN(to)) {
      el.textContent = "—";
      el.dataset.v = "";
      return;
    }
    const prev = el.dataset.v,
      from = prev === "" || prev == null ? to : +prev;
    el.dataset.v = to;
    const draw = (v) => {
      el.textContent = prefix + f(v, dec);
    };
    if (reduce || from === to) {
      draw(to);
      return;
    }
    const t0 = performance.now(),
      D = 850;
    (function st(t) {
      const k = clamp((t - t0) / D, 0, 1);
      draw(from + (to - from) * ease(k));
      if (k < 1) raf.set(el, requestAnimationFrame(st));
    })(t0);
  }
  const parseCo2 = (s) => {
    const m = /^(≈?)\s*(\d+(?:[.,]\d+)?)\s*ppm\s*(?:\(([^)]*)\))?\s*,?\s*(.*)$/.exec(s || "");
    return m
      ? { ap: m[1], v: +m[2].replace(",", "."), note: [m[3], m[4]].filter(Boolean).join(" · ") }
      : null;
  };
  const parseSl = (s) => {
    const m = /^(≈?)\s*(\d+(?:[.,]\d+)?)\s*мм\s*в\s*год\s*(?:\(([^)]*)\))?/.exec(s || "");
    return m ? { ap: m[1], v: +m[2].replace(",", "."), note: m[3] || "" } : null;
  };
  const retrigger = (el) => {
    el.classList.remove("swap");
    void el.offsetWidth;
    el.classList.add("swap");
  };

  /* --- карточка года --- */
  function renderYear() {
    const d = byYear(year),
      hasA = d.a != null;
    roll($("ycYear"), String(year));
    $("ycRank").textContent = d.r;
    $("ycBadge").textContent = !hasA ? "Год продолжается" : d.ap ? "Оценка" : "NASA GISS";
    num($("stA"), hasA ? d.a : null, 2, hasA ? (d.ap ? "≈ +" : "+") : "");
    const prev = byYear(year - 1);
    let an;
    if (!hasA) an = "данных за год ещё нет";
    else if (!prev || prev.a == null) an = "начало ряда";
    else {
      const dl = d.a - prev.a;
      an = (dl < 0 ? "−" : "+") + f(Math.abs(dl), 2) + " °C к " + prev.y + " году";
    }
    $("stAn").textContent = an;
    $("stAm").style.width = (hasA ? clamp(d.a / AMAX, 0, 1) * 100 : 0) + "%";
    const c = parseCo2(d.co2);
    num($("stC"), c ? c.v : null, c && c.ap ? 0 : 1, c ? c.ap : "");
    $("stCn").textContent = c ? c.note || "среднее за год" : "нет данных за год";
    const s = parseSl(d.sl);
    num($("stS"), s ? s.v : null, 1, s ? s.ap : "");
    $("stSn").textContent = s ? s.note || "темп подъёма" : d.sln || "нет данных за год";
    num($("stI"), d.ice != null ? d.ice : null, 2, "");
    $("stIn").textContent = d.icen || "";
    num($("stO"), d.oz != null ? d.oz : null, 1, d.ozp || "");
    $("stOn").textContent = d.ozn || "";
    $("ycEv").innerHTML = d.ev;
    $("ycSat").innerHTML = d.sat || "";
    $("ycWhy").innerHTML = (typeof WHY !== "undefined" && WHY[year]) || "";
    ["ycRank", "ycEv", "ycSat", "ycWhy"].forEach((id) => retrigger($(id)));
  }

  /* --- график аномалий --- */
  const chartBox = $("chart");
  let geo = null,
    drawn = false,
    lastW = 0;
  function smooth(p) {
    if (p.length < 2) return "";
    let d = "M" + p[0][0].toFixed(1) + " " + p[0][1].toFixed(1);
    for (let i = 0; i < p.length - 1; i++) {
      const p0 = p[i - 1] || p[i],
        p1 = p[i],
        p2 = p[i + 1],
        p3 = p[i + 2] || p2;
      const lo = Math.min(p1[1], p2[1]),
        hi = Math.max(p1[1], p2[1]);
      const c1y = clamp(p1[1] + (p2[1] - p0[1]) / 6, lo, hi),
        c2y = clamp(p2[1] - (p3[1] - p1[1]) / 6, lo, hi);
      d +=
        " C" +
        (p1[0] + (p2[0] - p0[0]) / 6).toFixed(1) +
        " " +
        c1y.toFixed(1) +
        " " +
        (p2[0] - (p3[0] - p1[0]) / 6).toFixed(1) +
        " " +
        c2y.toFixed(1) +
        " " +
        p2[0].toFixed(1) +
        " " +
        p2[1].toFixed(1);
    }
    return d;
  }
  function cssVars(root) {
    root.querySelectorAll("[data-c]").forEach((e) => e.style.setProperty("--c", e.dataset.c));
  }
  function buildChart() {
    const W = Math.max(240, Math.round(chartBox.clientWidth) || 300);
    if (Math.abs(W - lastW) < 2 && geo) return;
    lastW = W;
    const H = 176,
      ml = 30,
      mr = 8,
      mt = 12,
      mb = 24,
      iw = W - ml - mr,
      ih = H - mt - mb,
      slot = iw / YEARS.length;
    const X = (i) => ml + slot * (i + 0.5),
      Yv = (v) => mt + ih * (1 - v / AMAX);
    const pts = [];
    Y.forEach((d, i) => {
      if (d.a != null) pts.push([X(i), Yv(d.a), d, i]);
    });
    const ld = smooth(pts),
      base = mt + ih;
    const area =
      ld +
      " L" +
      pts[pts.length - 1][0].toFixed(1) +
      " " +
      base +
      " L" +
      pts[0][0].toFixed(1) +
      " " +
      base +
      " Z";
    let g = "";
    [0, 0.5, 1, 1.5].forEach((v) => {
      g +=
        '<line class="gl' +
        (v === 0 ? " z" : v === 1 ? " one" : "") +
        '" x1="' +
        ml +
        '" x2="' +
        (W - mr) +
        '" y1="' +
        Yv(v).toFixed(1) +
        '" y2="' +
        Yv(v).toFixed(1) +
        '"/><text class="yl" x="' +
        (ml - 7) +
        '" y="' +
        (Yv(v) + 3.5).toFixed(1) +
        '" text-anchor="end">' +
        f(v, v % 1 ? 1 : 0) +
        "</text>";
    });
    let xl = "",
      hit = "",
      dots = "";
    Y.forEach((d, i) => {
      xl +=
        '<text class="xl" data-y="' +
        d.y +
        '" x="' +
        X(i).toFixed(1) +
        '" y="' +
        (H - 6) +
        '" text-anchor="middle">' +
        (slot >= 31 ? d.y : "’" + String(d.y).slice(2)) +
        "</text>";
      hit +=
        '<rect class="hit" data-y="' +
        d.y +
        '" x="' +
        (ml + slot * i).toFixed(1) +
        '" y="0" width="' +
        slot.toFixed(1) +
        '" height="' +
        H +
        '" tabindex="0" role="button" aria-label="' +
        d.y +
        (d.a != null ? ": +" + f(d.a, 2) + " °C" : ": данных за год ещё нет") +
        '"/>';
      if (d.a != null)
        dots +=
          '<circle class="pt" data-c="' +
          colorA(d.a) +
          '" cx="' +
          X(i).toFixed(1) +
          '" cy="' +
          Yv(d.a).toFixed(1) +
          '" r="3.4"/>';
    });
    $("chartSvg").innerHTML =
      '<svg viewBox="0 0 ' +
      W +
      " " +
      H +
      '" role="group" aria-label="График аномалии температуры по годам">' +
      '<defs><linearGradient id="ga" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffa133" stop-opacity=".34"/><stop offset=".55" stop-color="#5cc8ff" stop-opacity=".14"/><stop offset="1" stop-color="#5cc8ff" stop-opacity="0"/></linearGradient>' +
      '<linearGradient id="gs" gradientUnits="userSpaceOnUse" x1="0" y1="' +
      mt +
      '" x2="0" y2="' +
      base +
      '"><stop offset="0" stop-color="#ff8a3d"/><stop offset=".45" stop-color="#ffd166"/><stop offset="1" stop-color="#5cc8ff"/></linearGradient></defs>' +
      g +
      '<path class="area" d="' +
      area +
      '"/><path class="line' +
      (drawn ? "" : " draw") +
      '" pathLength="1" d="' +
      ld +
      '"/>' +
      dots +
      '<g class="mk" id="chM"><line class="mkl" x1="0" x2="0" y1="' +
      mt +
      '" y2="' +
      base +
      '"/><circle class="mkh" r="11"/><circle class="mkd" r="4.6"/></g>' +
      xl +
      hit +
      "</svg>";
    cssVars($("chartSvg"));
    drawn = true;
    geo = { X, Yv, W, H, mt };
    markChart(true);
  }
  function markChart(instant) {
    if (!geo) return;
    const i = YEARS.indexOf(year),
      d = byYear(year),
      m = $("chM");
    if (!m) return;
    const tr = instant || reduce ? "none" : "";
    m.style.transition = tr;
    const cs = m.querySelectorAll("circle");
    cs.forEach((c) => (c.style.transition = tr));
    m.style.transform = "translate(" + geo.X(i).toFixed(1) + "px,0)";
    const y = geo.Yv(d.a != null ? d.a : 0).toFixed(1);
    cs.forEach((c) => (c.style.transform = "translate(0," + y + "px)"));
    m.classList.toggle("nodata", d.a == null);
    document
      .querySelectorAll("#chart .xl")
      .forEach((t) => t.classList.toggle("on", +t.dataset.y === year));
    (function () {
      const n = $("chNow");
      if (!n) return;
      if (d.a == null) { n.innerHTML = "Данные за этот год ещё собираются."; const y0 = document.getElementById("ydNow"); if (y0) y0.innerHTML = "<b>" + year + " год.</b> Год ещё идёт, итоговой цифры пока нет."; return; }
      const v = f(d.a, 2);
      let w;
      if (d.a >= 1.5) w = "Это выше предела +1,5 °C.";
      else if (d.a >= 1.1) w = "Это уже заметно выше отметки +1 °C: так тепло стало только в последние годы.";
      else if (d.a >= 0.95) w = "Это около отметки +1 °C — так было в 2016–2022 годах (0,82–1,01).";
      else w = "Это немного не дотягивает до +1 °C — типично для 2016–2022 годов.";
      (function () {
        const yd = document.getElementById("ydNow");
        if (!yd) return;
        const vals = Y.filter((q) => q.a != null),
          rec = vals.reduce((m, q) => (q.a > m.a ? q : m), vals[0]),
          first = vals[0],
          fm = (x) => f(Math.abs(x), 2).replace(".", ",");
        let s = "<b>" + year + " год.</b> ";
        if (d.y === rec.y) s += "Это рекордный год: теплее не было ни разу за всю историю измерений. ";
        else s += "От рекорда (" + rec.y + ", +" + fm(rec.a) + " °C) отличается на " + fm(rec.a - d.a) + " °C в меньшую сторону. ";
        if (d.y !== first.y) s += (d.a >= first.a ? "С " + first.y + " года стало теплее на " : "К " + first.y + " году разница: на ") + fm(d.a - first.a) + " °C" + (d.a >= first.a ? "." : " холоднее.");
        yd.innerHTML = s;
      })();
      n.innerHTML = "<b>" + year + " год:</b> на " + v.replace(".", ",") + " °C теплее нормы. " + w;
    })();
    $("chYr").textContent = year;
    $("chVal").textContent =
      d.a == null ? "год ещё идёт" : (d.ap ? "≈ +" : "+") + f(d.a, 2) + " °C";
  }
  const tip = $("tip");
  function showTip(r) {
    const y = +r.dataset.y,
      d = byYear(y),
      box = chartBox.getBoundingClientRect(),
      b = r.getBoundingClientRect();
    tip.textContent =
      y + " · " + (d.a == null ? "год ещё идёт" : (d.ap ? "≈ +" : "+") + f(d.a, 2) + " °C");
    const cy = d.a != null && geo ? geo.Yv(d.a) : geo.mt + 10;
    tip.style.left = b.left - box.left + b.width / 2 + "px";
    tip.style.top =
      cy * (box.width ? $("chartSvg").firstChild.getBoundingClientRect().height / geo.H : 1) + "px";
    tip.classList.add("on");
  }
  chartBox.addEventListener("pointerover", (e) => {
    const r = e.target.closest && e.target.closest(".hit");
    if (r) showTip(r);
  });
  chartBox.addEventListener("pointerleave", () => tip.classList.remove("on"));
  chartBox.addEventListener("focusin", (e) => {
    const r = e.target.closest && e.target.closest(".hit");
    if (r) showTip(r);
  });
  chartBox.addEventListener("focusout", () => tip.classList.remove("on"));
  chartBox.addEventListener("click", (e) => {
    const r = e.target.closest && e.target.closest(".hit");
    if (r) {
      year = +r.dataset.y;
      ui();
    }
  });
  chartBox.addEventListener("keydown", (e) => {
    if (
      (e.key === "Enter" || e.key === " ") &&
      e.target.classList &&
      e.target.classList.contains("hit")
    ) {
      e.preventDefault();
      year = +e.target.dataset.y;
      ui();
    }
  });
  if ("ResizeObserver" in window)
    new ResizeObserver(() => {
      buildChart();
    }).observe(chartBox);

  /* --- лента лет --- */
  $("ticks").innerHTML = YEARS.map((y) => {
    const d = byYear(y);
    return (
      '<button type="button" class="tick" data-y="' +
      y +
      '" aria-label="' +
      y +
      '"' +
      (d.a != null ? ' data-c="' + colorA(d.a) + '"' : "") +
      '><i></i><span class="y4">' +
      y +
      '</span><span class="y2">’' +
      String(y).slice(2) +
      "</span></button>"
    );
  }).join("");
  cssVars($("ticks"));
  $("ticks").addEventListener("click", (e) => {
    const b = e.target.closest(".tick");
    if (b) {
      year = +b.dataset.y;
      ui();
    }
  });
  /* месяцы, которые ещё не наступили, выбрать нельзя */
  const NOW = new Date(), NOW_Y = NOW.getFullYear(), NOW_M = NOW.getMonth() + 1;
  const isFuture = (y, m) => y > NOW_Y || (y === NOW_Y && m > NOW_M);
  const MFULL = ["январь","февраль","март","апрель","май","июнь","июль","август","сентябрь","октябрь","ноябрь","декабрь"];
  $("mbtns").innerHTML = MN.map((m, i) => '<button type="button" class="mb" data-m="' + (i + 1) + '" title="' + MFULL[i] + '">' + m + "</button>").join("");
  $("mbtns").addEventListener("click", (e) => {
    const b = e.target.closest(".mb");
    if (b && !b.disabled) {
      month = +b.dataset.m;
      ui();
    }
  });
  function renderDock() {
    document.querySelectorAll("#mbtns .mb").forEach((b) => {
      b.classList.toggle("on", +b.dataset.m === month);
      const fut = isFuture(year, +b.dataset.m);
      b.disabled = fut;
      b.title = fut ? MFULL[+b.dataset.m - 1] + ": этот месяц ещё не наступил" : MFULL[+b.dataset.m - 1];
    });
    $("mv").textContent = MFULL[month - 1];
    $("trk").style.setProperty("--f", ((year - Y0) / (Y1 - Y0)).toFixed(4));
    $("ms").parentElement.style.setProperty("--f", ((month - 1) / 11).toFixed(4));
    document
      .querySelectorAll("#ticks .tick")
      .forEach((b) => b.classList.toggle("on", +b.dataset.y === year));
    $("play").setAttribute(
      "aria-label",
      $("play").classList.contains("playing") ? "Пауза" : "Проиграть годы",
    );
  }

  /* --- переключатель слоя --- */
  const LN = {
    v: "Вид из космоса",
    t: "Температура поверхности · модель",
    a: "Аномалия к среднему 1951–1980 · модель",
  };
  function renderLayer() {
    $("lyName").textContent = LN[layer];
    document.body.dataset.layer = layer;
    document
      .querySelectorAll(".seg .lay")
      .forEach((b) => b.setAttribute("aria-pressed", b.classList.contains("on")));
    const on = document.querySelector(".seg .lay.on"),
      p = $("segPill");
    if (on && p) {
      p.style.width = on.offsetWidth + "px";
      p.style.transform = "translateX(" + on.offsetLeft + "px)";
    }
  }
  addEventListener("resize", renderLayer);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(renderLayer);

  /* --- плавный переход между годами на самом глобусе --- */
  let lastYear = year,
    tween = null,
    wasTl = false;
  function stopTween() {
    tween = null;
    window.__aA = null;
    window.__yA = null;
  }
  function startTween(aFrom, aTo, yFrom, yTo) {
    const T = {},
      t0 = performance.now(),
      D = 950;
    tween = T;
    (function st(t) {
      if (tween !== T) return;
      const k = clamp((t - t0) / D, 0, 1),
        e = ease(k);
      window.__aA = aFrom + (aTo - aFrom) * e;
      window.__yA = yFrom + (yTo - yFrom) * e;
      if (layer !== "v") paint();
      iceSync();
      if (k < 1) requestAnimationFrame(st);
      else {
        stopTween();
        paint();
        iceSync();
      }
    })(t0);
  }
  const baseUi = ui;
  ui = function () {
    if (isFuture(year, month)) month = NOW_M;
    const skip = tlOn || wasTl || reduce;
    if (year !== lastYear) {
      if (skip) stopTween();
      else {
        const aFrom = window.__aA != null ? window.__aA : aOf(lastYear),
          yFrom = window.__yA != null ? window.__yA : lastYear;
        window.__aA = aFrom;
        window.__yA = yFrom;
        startTween(aFrom, aOf(year), yFrom, year);
      }
    }
    lastYear = year;
    wasTl = tlOn;
    baseUi();
    document.body.classList.toggle("tl-on", !!tlOn);
    try {
      const dt = $("dt");
      if (dt) dt.textContent = MFULL[month - 1][0].toUpperCase() + MFULL[month - 1].slice(1) + " " + year + (year === NOW_Y && month === NOW_M ? " · идёт сейчас" : "");
      const sp = $("cl").children;
      if (sp.length === 3 && layer !== "v") {
        const lo = sp[0].textContent, hi = sp[2].textContent;
        sp[0].textContent = (layer === "t" ? "холодно " : "как раньше ") + lo;
        sp[2].textContent = (layer === "t" ? "жарко " : "теплее ") + hi;
        sp[1].textContent = layer === "t" ? "°C" : "°C";
      }
      renderYear();
      markChart();
      renderDock();
      renderLayer();
    } catch (e) {
      console.warn("оформление:", e);
    }
  };

  /* --- ореол вокруг планеты: подгоняем под размер глобуса --- */
  (function () {
    const halo = $("halo"),
      gl = $("gl");
    if (!halo || typeof cam === "undefined") return;
    gl.appendChild(halo);
    let hz = 0,
      hh = 0;
    (function loop() {
      requestAnimationFrame(loop);
      const z = cam.position.z,
        h = gl.clientHeight;
      if (z !== hz || h !== hh) {
        hz = z;
        hh = h;
        const R =
          (Math.tan(Math.asin(Math.min(0.999, 1 / z))) / Math.tan((17.5 * Math.PI) / 180)) * h;
        halo.style.setProperty("--d", (R * 1.8).toFixed(0) + "px");
      }
    })();
  })();

  /* --- окно «Данные и методика» --- */
  const about = $("about");
  let aboutT = 0;
  function openAbout() {
    clearTimeout(aboutT);
    about.hidden = false;
    document.body.classList.add("modal-on");
    document.documentElement.classList.add("modal-on");
    requestAnimationFrame(() => about.classList.add("open"));
    $("aboutClose").focus();
  }
  function closeAbout() {
    about.classList.remove("open");
    document.body.classList.remove("modal-on");
    document.documentElement.classList.remove("modal-on");
    aboutT = setTimeout(() => {
      about.hidden = true;
    }, 300);
    $("aboutBtn").focus();
  }
  $("aboutBtn").addEventListener("click", openAbout);
  $("aboutClose").addEventListener("click", closeAbout);
  about.addEventListener("click", (e) => {
    if (e.target === about) closeAbout();
  });

  /* --- клавиатура: стрелки листают годы, Esc закрывает окно --- */
  document.addEventListener("keydown", (e) => {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.key === "Escape" && !about.hidden) {
      closeAbout();
      return;
    }
    const t = e.target;
    if (t && (/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) || t.isContentEditable)) return;
    if (document.body.classList.contains("hero-on") || !about.hidden) return;
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      year = clamp(year + (e.key === "ArrowRight" ? 1 : -1), Y0, Y1);
      ui();
      e.preventDefault();
    }
  });

  /* --- свежий снимок NASA GIBS (поверх обычного вида из космоса) --- */
  (function () {
    const sw = $("liveSw"), st = $("liveSt");
    if (!sw || typeof globe === "undefined" || typeof THREE === "undefined") return;
    let mesh = null, state = "idle"; // idle | loading | ok | fail
    const ymd = (back) => new Date(Date.now() - back * 864e5).toISOString().slice(0, 10);
    const url = (d) =>
      "https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi?SERVICE=WMS&REQUEST=GetMap&VERSION=1.3.0" +
      "&LAYERS=VIIRS_SNPP_CorrectedReflectance_TrueColor&STYLES=&FORMAT=image/jpeg&CRS=EPSG:4326" +
      "&BBOX=-90,-180,90,180&WIDTH=4096&HEIGHT=2048&TIME=" + d;
    const setSt = (t) => { if (st) st.textContent = t; };
    // сколько прошло с конца суток (UTC), за которые сделан снимок; обновляется раз в минуту
    let shotDay = null;
    const agoTxt = (ms) => {
      const m = Math.max(0, Math.round(ms / 60000));
      if (m < 60) return m + " мин";
      const h = Math.floor(m / 60);
      return h < 48 ? h + " ч " + (m % 60 ? (m % 60) + " мин" : "") : Math.floor(h / 24) + " дн";
    };
    const stamp = () => {
      if (!shotDay || state !== "ok") return;
      const [y, mo, d] = shotDay.split("-");
      const end = Date.parse(shotDay + "T23:59:59Z");
      setSt("— за " + d + "." + mo + "." + y + ", прошло " + agoTxt(Date.now() - end).trim() + " с конца того дня (UTC)");
    };
    setInterval(stamp, 60000);
    function sync() {
      if (mesh) mesh.visible = sw.checked && layer === "v";
    }
    function load(back, label) {
      state = "loading";
      setSt("— загружаем…");
      const im = new Image();
      im.crossOrigin = "anonymous";
      im.onload = () => {
        try {
          const c = document.createElement("canvas");
          c.width = im.width; c.height = im.height;
          const x = c.getContext("2d");
          x.drawImage(im, 0, 0);
          try { // чёрные пробелы между полосами спутника делаем прозрачными
            const id = x.getImageData(0, 0, c.width, c.height), a = id.data;
            for (let i = 0; i < a.length; i += 4) if (a[i] + a[i + 1] + a[i + 2] < 14) a[i + 3] = 0;
            x.putImageData(id, 0, 0);
          } catch (e) {}
          const t = new THREE.CanvasTexture(c);
          t.anisotropy = 8;
          mesh = new THREE.Mesh(
            new THREE.SphereGeometry(1.006, 96, 64),
            new THREE.MeshBasicMaterial({ map: t, transparent: true, color: 0xd8d8d8, depthWrite: false })
          );
          globe.add(mesh);
          state = "ok";
          shotDay = label;
          stamp();
          sync();
        } catch (e) { fail(); }
      };
      im.onerror = () => { if (back < 2) load(back + 1, ymd(back + 1)); else fail(); };
      im.src = url(ymd(back));
    }
    function fail() {
      state = "fail";
      sw.checked = false;
      setSt("— не удалось загрузить (нужен интернет)");
    }
    sw.addEventListener("change", () => {
      if (sw.checked && state === "idle") load(1, ymd(1));
      else if (sw.checked && state === "fail") load(1, ymd(1));
      if (sw.checked && layer !== "v") { layer = "v"; ui(); }
      sync();
    });
    const prev = ui;
    ui = function () { prev(); sync(); };
    if (sw.checked) load(1, ymd(1)); // по умолчанию снимок за вчера включён
  })();

  /* --- настоящая температура поверхности NASA (слой «Жарко и холодно») ---
     Суша: MODIS Terra (Land Surface Temp, день). Океан: GHRSST MUR. Берём середину выбранного месяца.
     Где спутник не видел землю (облака), остаётся модельная картинка. */
  (function () {
    const sw = $("realT"), st = $("realTSt"), row = $("realTRow");
    if (!sw || typeof globe === "undefined" || typeof THREE === "undefined") return;
    const GIBS = "https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi";
    const LAY = [["MODIS_Terra_Land_Surface_Temp_Day", 1.0052], ["GHRSST_L4_MUR_Sea_Surface_Temperature", 1.0046]];
    const url = (id, d) =>
      GIBS + "?SERVICE=WMS&REQUEST=GetMap&VERSION=1.3.0&LAYERS=" + id +
      "&STYLES=&FORMAT=image/png&TRANSPARENT=TRUE&CRS=EPSG:4326&BBOX=-90,-180,90,180&WIDTH=2048&HEIGHT=1024&TIME=" + d;
    const meshes = LAY.map(([, r]) => {
      const m = new THREE.Mesh(
        new THREE.SphereGeometry(r, 96, 64),
        new THREE.MeshBasicMaterial({ transparent: true, depthWrite: false, opacity: 0.97 })
      );
      m.visible = false;
      m.renderOrder = 2;
      globe.add(m);
      return m;
    });
    const cache = new Map();
    let loadedKey = "", loadedDate = "", ok = false, tok = 0, timer = 0;
    const setSt = (t) => { if (st) st.textContent = t ? "— " + t : ""; };
    function dateFor(y, m) {
      const start = Date.UTC(y, m - 1, 1), now = new Date();
      let t = Date.UTC(y, m - 1, 15);
      if (y === now.getFullYear() && m === now.getMonth() + 1) t = Math.max(start, Date.now() - 3 * 864e5); // данные приходят с задержкой в 1–3 дня
      return new Date(t).toISOString().slice(0, 10);
    }
    function apply(key, date, ts) {
      meshes.forEach((m, i) => { m.material.map = ts[i]; m.material.needsUpdate = true; });
      loadedKey = key; loadedDate = date; ok = ts.some(Boolean);
      setSt(ok ? date : "нет данных за " + date);
      ui();
    }
    function load(key, date) {
      if (cache.has(key)) return apply(key, date, cache.get(key));
      const my = ++tok;
      setSt("загружаем " + date + "…");
      Promise.all(LAY.map(([id]) => new Promise((res) => {
        const im = new Image();
        im.crossOrigin = "anonymous";
        im.onload = () => { const t = new THREE.Texture(im); t.anisotropy = 4; t.needsUpdate = true; res(t); };
        im.onerror = () => res(null);
        im.src = url(id, date);
      }))).then((ts) => {
        if (my !== tok) { ts.forEach((t) => t && t.dispose()); return; }
        if (cache.size >= 4) { const k0 = cache.keys().next().value; (cache.get(k0) || []).forEach((t) => t && t.dispose()); cache.delete(k0); }
        cache.set(key, ts);
        apply(key, date, ts);
      });
    }
    const want = () => sw.checked && layer === "t";
    function sync() {
      const w = want();
      meshes.forEach((m) => { m.visible = w && !!m.material.map; });
      window.__realT = w && ok;
      if (row) row.hidden = layer !== "t";
    }
    const prev = ui;
    ui = function () {
      prev();
      sync();
      if (want() && year + "-" + month !== loadedKey) {
        clearTimeout(timer);
        timer = setTimeout(() => load(year + "-" + month, dateFor(year, month)), 350);
      }
      if (window.__realT) {
        $("cbw").style.display = "none";
        $("lyName").textContent = "Температура поверхности · спутники NASA";
        $("lx").textContent = "Настоящие данные NASA за " + loadedDate + ": температура поверхности суши (MODIS Terra) и воды (GHRSST MUR). Цвета — шкала NASA: синий холоднее, красный жарче. Там, где спутник за этот день не увидел землю из-за облаков, остаётся модельная картинка. Это температура самой поверхности, а не воздуха, как в прогнозе погоды.";
      }
    };
    sw.addEventListener("change", () => ui());
  })();

  /* --- простой / подробный режим --- */
  (function () {
    const b = $("modeBtn");
    if (!b) return;
    const set = (simple) => {
      document.body.classList.toggle("simple", simple);
      b.textContent = simple ? "Подробно" : "Просто";
    };
    b.addEventListener("click", () => set(!document.body.classList.contains("simple")));
    set(true);
  })();

  /* первый показ */
  buildChart();
  ui();
  requestAnimationFrame(() => {
    const b = $("boot");
    if (b) b.classList.add("done");
  });
})();
