(function () {
  "use strict";
  if (typeof Y === "undefined") return;
  const $ = (id) => document.getElementById(id);
  const box = $("trBody");
  if (!box) return;
  const NS = "http://www.w3.org/2000/svg";
  const fmt = (x, n) => x.toFixed(n).replace(".", ",");
  const sgn = (x) => (x > 0 ? "+" : x < 0 ? "−" : "");

  /* ---------- ряды из таблицы Y ---------- */
  const num = (s) => {
    const m = /(\d+(?:[.,]\d+)?)/.exec(String(s || ""));
    return m ? +m[1].replace(",", ".") : null;
  };
  const VARS = {
    a: { name: "Температура", unit: "°C", dec: 2, get: (d) => (d.a != null && !d.ap ? d.a : null), note: "2026 не включён: год ещё не закончен." },
    c: { name: "CO₂ (май)", unit: "ppm", dec: 1, get: (d) => num(d.co2), note: "Майский максимум на Мауна-Лоа." },
    i: { name: "Лёд Арктики", unit: "млн км²", dec: 2, get: (d) => (typeof d.ice === "number" ? d.ice : null), note: "Сентябрьский минимум (NSIDC). Значение 2026 года приблизительное." },
    o: { name: "Озоновая дыра", unit: "млн км²", dec: 1, get: (d) => (typeof d.oz === "number" ? d.oz : null), note: "Рост показателя означает бо́льшую дыру." },
  };
  const SRC = { a: "NASA GISS GISTEMP (база 1951–1980)", c: "Scripps / NOAA, Мауна-Лоа", i: "NSIDC", o: "NASA / NOAA, Aura/MLS" };
  const series = (k) => Y.map((d) => ({ x: d.y, v: VARS[k].get(d) })).filter((p) => p.v != null && isFinite(p.v));

  /* ---------- статистика ---------- */
  const erf = (x) => {
    const t = 1 / (1 + 0.3275911 * Math.abs(x));
    const y = 1 - ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x);
    return x >= 0 ? y : -y;
  };
  const Phi = (z) => 0.5 * (1 + erf(z / Math.SQRT2));
  function median(a) {
    const s = a.slice().sort((p, q) => p - q), m = s.length >> 1;
    return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
  }
  /* Наклон Сена + тест Манна-Кендалла (нормальное приближение, поправка на совпадения),
     доверительный интервал наклона по методу Кендалла. */
  function trend(pts) {
    const n = pts.length;
    const sl = [];
    let S = 0;
    for (let i = 0; i < n - 1; i++)
      for (let j = i + 1; j < n; j++) {
        const dx = pts[j].x - pts[i].x, dv = pts[j].v - pts[i].v;
        sl.push(dv / dx);
        S += Math.sign(dv);
      }
    const ties = {};
    pts.forEach((p) => (ties[p.v] = (ties[p.v] || 0) + 1));
    let tt = 0;
    Object.keys(ties).forEach((k) => { const t = ties[k]; if (t > 1) tt += t * (t - 1) * (2 * t + 5); });
    const varS = (n * (n - 1) * (2 * n + 5) - tt) / 18;
    const Z = S === 0 ? 0 : (S - Math.sign(S)) / Math.sqrt(varS);
    const p = Math.min(1, 2 * (1 - Phi(Math.abs(Z))));
    const slope = median(sl);
    const s = sl.slice().sort((a, b) => a - b), N = s.length, C = 1.96 * Math.sqrt(varS);
    const lo = s[Math.max(0, Math.min(N - 1, Math.floor((N - C) / 2) - 1))];
    const hi = s[Math.max(0, Math.min(N - 1, Math.ceil((N + C) / 2)))];
    const icpt = median(pts.map((q) => q.v - slope * q.x));
    return { n, slope, lo, hi, p, S, Z, icpt };
  }

  /* ---------- интерфейс ---------- */
  let key = "a";
  const selA = $("trFrom"), selB = $("trTo"), vbtn = $("trVars"), out = $("trOut"), svg = $("trSvg"), warn = $("trWarn");
  for (let y = Y[0].y; y <= Y[Y.length - 1].y; y++) {
    [selA, selB].forEach((s) => { const o = document.createElement("option"); o.value = y; o.textContent = y; s.appendChild(o); });
  }
  selA.value = Y[0].y;
  selB.value = Y[Y.length - 1].y;
  Object.keys(VARS).forEach((k) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "tvb" + (k === key ? " on" : "");
    b.dataset.k = k;
    b.textContent = VARS[k].name;
    b.setAttribute("aria-pressed", k === key ? "true" : "false");
    vbtn.appendChild(b);
  });
  vbtn.addEventListener("click", (e) => {
    const b = e.target.closest(".tvb");
    if (!b) return;
    key = b.dataset.k;
    vbtn.querySelectorAll(".tvb").forEach((x) => { x.classList.toggle("on", x === b); x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
    render();
  });
  selA.addEventListener("change", render);
  selB.addEventListener("change", render);

  const el = (tag, attrs) => {
    const e = document.createElementNS(NS, tag);
    Object.keys(attrs || {}).forEach((k) => e.setAttribute(k, attrs[k]));
    return e;
  };
  const line = (t, cls) => { const d = document.createElement("div"); d.className = cls; d.textContent = t; return d; };

  function draw(pts, T, V) {
    svg.textContent = "";
    const W = 300, H = 120, ml = 34, mr = 8, mt = 8, mb = 18;
    const xs = pts.map((p) => p.x), x0 = Math.min.apply(0, xs), x1 = Math.max.apply(0, xs);
    const vs = pts.map((p) => p.v).concat([T.icpt + T.slope * x0, T.icpt + T.slope * x1]);
    let v0 = Math.min.apply(0, vs), v1 = Math.max.apply(0, vs);
    const pad = (v1 - v0) * 0.12 || 1;
    v0 -= pad; v1 += pad;
    const X = (x) => ml + ((x - x0) / (x1 - x0 || 1)) * (W - ml - mr);
    const Yp = (v) => mt + (1 - (v - v0) / (v1 - v0)) * (H - mt - mb);
    svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    // оси: 3 подписи по вертикали
    [v0 + pad, (v0 + v1) / 2, v1 - pad].forEach((v) => {
      svg.appendChild(el("line", { class: "tgl", x1: ml, x2: W - mr, y1: Yp(v).toFixed(1), y2: Yp(v).toFixed(1) }));
      const t = el("text", { class: "tyl", x: ml - 5, y: (Yp(v) + 3).toFixed(1), "text-anchor": "end" });
      t.textContent = fmt(v, V.dec > 1 ? 1 : V.dec);
      svg.appendChild(t);
    });
    [x0, x1].forEach((x, i) => {
      const t = el("text", { class: "tyl", x: X(x).toFixed(1), y: H - 4, "text-anchor": i ? "end" : "start" });
      t.textContent = x;
      svg.appendChild(t);
    });
    // коридор неопределённости: линии с наклоном lo и hi через середину ряда
    const xm = (x0 + x1) / 2, vm = T.icpt + T.slope * xm;
    const band = (sl) => [x0, x1].map((x) => [X(x), Yp(vm + sl * (x - xm))]);
    const A = band(T.lo), B = band(T.hi);
    svg.appendChild(el("polygon", { class: "tband", points: [A[0], A[1], B[1], B[0]].map((q) => q[0].toFixed(1) + "," + q[1].toFixed(1)).join(" ") }));
    svg.appendChild(el("line", { class: "tfit", x1: X(x0).toFixed(1), x2: X(x1).toFixed(1), y1: Yp(T.icpt + T.slope * x0).toFixed(1), y2: Yp(T.icpt + T.slope * x1).toFixed(1) }));
    pts.forEach((p) => svg.appendChild(el("circle", { class: "tpt", cx: X(p.x).toFixed(1), cy: Yp(p.v).toFixed(1), r: 3 })));
  }

  function render() {
    const V = VARS[key];
    let a = +selA.value, b = +selB.value;
    if (a > b) { const t = a; a = b; b = t; selA.value = a; selB.value = b; }
    const pts = series(key).filter((p) => p.x >= a && p.x <= b);
    out.textContent = "";
    warn.textContent = "";
    if (pts.length < 4) {
      svg.textContent = "";
      out.appendChild(line("Выберите период минимум из 4 лет с данными: для меньшего числа точек тренд считать нельзя.", "tmsg"));
      return;
    }
    const T = trend(pts), dec = 10;
    const sig = T.p < 0.05;
    const head = document.createElement("div");
    head.className = "thead";
    const big = document.createElement("b");
    big.textContent = sgn(T.slope) + fmt(Math.abs(T.slope * dec), V.dec) + " " + V.unit;
    const small = document.createElement("small");
    small.textContent = "за десятилетие (наклон Сена)";
    head.append(big, small);
    out.appendChild(head);
    const rows = [
      ["95% доверительный интервал", sgn(T.lo) + fmt(Math.abs(T.lo * dec), V.dec) + " … " + sgn(T.hi) + fmt(Math.abs(T.hi * dec), V.dec)],
      ["p-значение (Манн-Кендалл)", T.p < 0.001 ? "< 0,001" : fmt(T.p, 3)],
      ["Точек в ряду", String(T.n) + " (" + pts[0].x + "–" + pts[pts.length - 1].x + ")"],
    ];
    rows.forEach((r) => {
      const d = document.createElement("div");
      d.className = "trow";
      const s = document.createElement("span"), v = document.createElement("b");
      s.textContent = r[0]; v.textContent = r[1];
      d.append(s, v);
      out.appendChild(d);
    });
    const crosses = T.lo < 0 && T.hi > 0;
    const verdict = document.createElement("p");
    verdict.className = "tver " + (sig ? "ok" : "no");
    const dir = T.slope > 0 ? "рост" : T.slope < 0 ? "снижение" : "отсутствие изменений";
    verdict.textContent = sig
      ? "Вывод: " + dir + " статистически значим (p < 0,05). Случайное совпадение маловероятно."
      : "Вывод: по этим точкам " + dir + " нельзя отличить от случайных колебаний (p ≥ 0,05)." + (crosses ? " Интервал включает ноль." : "");
    if (T.n < 10) verdict.textContent += " Точек мало (" + T.n + "): p-значение приблизительное, считайте вывод ориентировочным.";
    out.appendChild(verdict);
    draw(pts, T, V);
    const msg = [V.note];
    if (T.n < 15) msg.push("Ряд короткий (" + T.n + " точек): климатологи обычно берут 30 лет и больше, поэтому оценка грубая и сильно зависит от выбранных границ.");
    msg.push("Источник: " + SRC[key] + ".");
    warn.textContent = msg.join(" ");
  }

  /* ---------- скачать данные (CSV) ---------- */
  const dl = $("trCsv");
  if (dl)
    dl.addEventListener("click", () => {
      const rows = [["year", "temperature_anomaly_C_vs_1951_1980", "temperature_is_preliminary", "co2_may_ppm", "arctic_sea_ice_sept_min_Mkm2", "ozone_hole_Mkm2"]];
      Y.forEach((d) => rows.push([d.y, d.a != null ? d.a : "", d.ap ? "yes" : "", num(d.co2) != null ? num(d.co2) : "", typeof d.ice === "number" ? d.ice : "", typeof d.oz === "number" ? d.oz : ""]));
      const head = [
        "# Earth 2016-2026: data used on the site. Check values at the original sources before reuse.",
        "# temperature: NASA GISS GISTEMP; 2026 = mean of Jan-Oct, preliminary",
        "# CO2: Scripps / NOAA Mauna Loa, May value; ice: NSIDC; ozone: NASA/NOAA Aura/MLS",
        "# Trend method: Sen's slope + Mann-Kendall test (normal approximation, tie correction), 95% CI by Kendall's method",
      ];
      const csv = "﻿" + head.join("\n") + "\n" + rows.map((r) => r.join(",")).join("\n") + "\n";
      const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
      const a = document.createElement("a");
      a.href = url;
      a.download = "earth-2016-2026.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 2000);
    });

  render();
})();
