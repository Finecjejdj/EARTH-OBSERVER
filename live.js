(function () {
  "use strict";
  if (typeof globe === "undefined" || typeof THREE === "undefined" || typeof cv === "undefined" || typeof ui !== "function") return;
  const $ = (id) => document.getElementById(id);
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const num = (v) => typeof v === "number" && isFinite(v);

  /* Все данные из внешних API считаем недоверенными: в страницу они попадают
     только через textContent, а ссылки проверяются по списку доменов. */
  const API = {
    eq: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson",
    ev: "https://eonet.gsfc.nasa.gov/api/v3/events?status=open&limit=500",
    wx: "https://api.open-meteo.com/v1/forecast",
    emsc: "https://www.seismicportal.eu/fdsnws/event/1/query",
    gdacs: "https://www.gdacs.org/gdacsapi/api/events/geteventlist/EVENTS4APP",
    geo: "https://geocoding-api.open-meteo.com/v1/search",
    arch: "https://archive-api.open-meteo.com/v1/archive",
  };
  const GIBS = "https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi";
  async function getJSON(url, ms) {
    const c = new AbortController();
    const t = setTimeout(() => c.abort(), ms || 12000);
    try {
      const r = await fetch(url, { signal: c.signal, credentials: "omit", referrerPolicy: "no-referrer" });
      if (!r.ok) throw new Error("HTTP " + r.status);
      return await r.json();
    } finally {
      clearTimeout(t);
    }
  }
  const hhmm = (d) => String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0");
  function ago(ts) {
    const m = Math.max(0, Math.round((Date.now() - ts) / 60000));
    if (m < 1) return "только что";
    if (m < 60) return m + " мин назад";
    const h = Math.floor(m / 60);
    if (h < 48) return h + " ч " + (m % 60 ? (m % 60) + " мин " : "") + "назад";
    return Math.floor(h / 24) + " дн назад";
  }
  const coordTxt = (la, lo) =>
    f(Math.abs(la), 1) + "° " + (la >= 0 ? "с.ш." : "ю.ш.") + ", " + f(Math.abs(lo), 1) + "° " + (lo >= 0 ? "в.д." : "з.д.");

  /* ---------- вывод в панель ---------- */
  const info = $("lvInfo");
  const DEFAULT_INFO = "Включите слой и нажмите на точку на глобусе. Нажатие на пустое место покажет погоду там.";
  function setInfo(title, lines, link) {
    if (!info) return;
    info.textContent = "";
    if (title) {
      const b = document.createElement("b");
      b.textContent = title;
      info.appendChild(b);
    }
    (lines || []).forEach((t) => {
      const p = document.createElement("span");
      p.textContent = t;
      info.appendChild(p);
    });
    if (link) {
      const a = document.createElement("a");
      a.href = link.href;
      a.textContent = link.text;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      info.appendChild(a);
    }
    info.classList.remove("swap");
    void info.offsetWidth;
    info.classList.add("swap");
  }
  const status = (id, t) => {
    const el = $(id);
    if (el) el.textContent = t ? "· " + t : "";
  };

  /* ---------- точечные слои (одна отрисовка на слой) ---------- */
  const PX = () => (typeof renderer !== "undefined" ? renderer.getPixelRatio() : 1);
  function makePoints(shape) {
    const m = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: { uPx: { value: PX() }, uShape: { value: shape } },
      vertexShader:
        "attribute float size; attribute vec3 col; varying vec3 vC; uniform float uPx;" +
        "void main(){ vC=col; gl_PointSize=size*uPx; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",
      fragmentShader:
        "precision mediump float; varying vec3 vC; uniform float uShape;" +
        "void main(){ vec2 p=gl_PointCoord-0.5; float d=uShape>0.5?(abs(p.x)+abs(p.y)):length(p);" +
        "if(d>0.5) discard; float a=smoothstep(0.5,0.44,d); vec3 c=d>0.38?vec3(0.03,0.05,0.12):vC;" +
        "gl_FragColor=vec4(c,0.94*a); }",
    });
    const P = new THREE.Points(new THREE.BufferGeometry(), m);
    P.frustumCulled = false;
    P.renderOrder = 5;
    P.visible = false;
    P.items = [];
    P.vecs = [];
    globe.add(P);
    return P;
  }
  function setPts(P, items) {
    const n = items.length,
      pos = new Float32Array(n * 3),
      sz = new Float32Array(n),
      col = new Float32Array(n * 3);
    P.vecs = items.map((it, i) => {
      const v = PV(it.la, it.lo, 1.01);
      pos.set([v.x, v.y, v.z], i * 3);
      sz[i] = it.size;
      col.set(it.c, i * 3);
      return v.clone().normalize();
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("size", new THREE.BufferAttribute(sz, 1));
    g.setAttribute("col", new THREE.BufferAttribute(col, 3));
    P.geometry.dispose();
    P.geometry = g;
    P.items = items;
  }
  const rgb = (hex) => new THREE.Color(hex).toArray();

  const quakes = makePoints(0),
    events = makePoints(1);

  /* кольцо-маркер выбранной точки */
  const pin = new THREE.Mesh(
    new THREE.RingGeometry(0.03, 0.04, 40),
    new THREE.MeshBasicMaterial({ color: 0xffe14d, transparent: true, side: THREE.DoubleSide, depthWrite: false }),
  );
  pin.visible = false;
  pin.renderOrder = 6;
  globe.add(pin);
  function placePin(la, lo, color) {
    const p = PV(la, lo, 1.014);
    pin.position.copy(p);
    pin.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), p.clone().normalize());
    pin.material.color.set(color);
    pin.visible = true;
  }
  (function pulse(t) {
    requestAnimationFrame(pulse);
    if (pin.visible) pin.scale.setScalar(1 + ((t * 0.0009) % 1) * 0.7);
  })(0);

  /* ---------- режим «архив»: события за выбранные год и месяц ---------- */
  const arcSw = $("lvArc");
  const ARC_ON = () => !!(arcSw && arcSw.checked);
  const arcCache = new Map();
  let arcTok = 0, arcKey = "", arcT = 0;
  const pad2 = (n) => String(n).padStart(2, "0");
  const dstr = (t) => new Date(t).toISOString().slice(0, 10);
  const whenTxt = (t) => (ARC_ON() ? dstr(t) : ago(t));
  function monthRange(y, m) {
    const t0 = Date.UTC(y, m - 1, 1), t1 = Date.UTC(y, m, 1);
    return { t0, t1, a: dstr(t0), b: dstr(t1 - 864e5), next: dstr(t1) };
  }

  /* ---------- разбор данных (общий для «сейчас» и архива) ---------- */
  const qColor = (m) => rgb(m < 4 ? 0xffd84d : m < 5.5 ? 0xff9a3d : 0xff3d2e);
  function parseQuakes(j, em) {
    // USGS полон только в США (вне США с магнитуды ~4,5), поэтому добавляем EMSC: Европа, Средиземноморье, Азия
    const items = [];
    ((j && j.features) || []).slice(0, 600).forEach((ft) => {
      const c = ft && ft.geometry && ft.geometry.coordinates,
        p = (ft && ft.properties) || {};
      if (!c || !num(c[0]) || !num(c[1]) || !num(p.mag) || !num(p.time)) return;
      if (Math.abs(c[1]) > 90 || Math.abs(c[0]) > 180) return;
      items.push({
        la: c[1], lo: c[0], depth: num(c[2]) ? c[2] : null, mag: p.mag, time: p.time,
        place: String(p.place || "").slice(0, 120), url: typeof p.url === "string" ? p.url : "", tsu: p.tsunami === 1,
        size: clamp(5 + (p.mag - 2.5) * 3.2, 5, 26), c: qColor(p.mag),
      });
    });
    const usgsItems = items.slice();
    ((em && em.features) || []).slice(0, 400).forEach((ft) => {
      const c = ft && ft.geometry && ft.geometry.coordinates,
        p = (ft && ft.properties) || {};
      const t = Date.parse(p.time);
      if (!c || !num(c[0]) || !num(c[1]) || !num(p.mag) || !num(t)) return;
      if (Math.abs(c[1]) > 90 || Math.abs(c[0]) > 180) return;
      // тот же толчок уже есть в USGS: не дублируем
      if (usgsItems.some((u) => Math.abs(u.time - t) < 180000 && Math.abs(u.la - c[1]) < 1 && Math.abs(u.lo - c[0]) < 1)) return;
      const place = String(p.flynn_region || "").toLowerCase().replace(/(^|[\s-])\S/g, (m) => m.toUpperCase()).slice(0, 120);
      items.push({
        la: c[1], lo: c[0], depth: num(p.depth) ? Math.abs(p.depth) : null, mag: p.mag, time: t,
        place, url: "", tsu: false, src: "EMSC",
        size: clamp(5 + (p.mag - 2.5) * 3.2, 5, 26), c: qColor(p.mag),
      });
    });
    items.sort((a, b) => a.mag - b.mag);
    return items;
  }

  /* ---------- события NASA EONET + GDACS ---------- */
  const CAT = {
    wildfires: ["Пожар", 0xff5a2a], severeStorms: ["Шторм", 0x7fb2ff], volcanoes: ["Вулкан", 0xff2d6f],
    floods: ["Наводнение", 0x3ad0ff], drought: ["Засуха", 0xd9a441], dustHaze: ["Пыль или дымка", 0xc8b08a],
    seaLakeIce: ["Морской или озёрный лёд", 0xbfeaff], snow: ["Снег", 0xffffff], landslides: ["Оползень", 0xa0733a],
    tempExtremes: ["Температурная аномалия", 0xff8f8f], waterColor: ["Цвет воды", 0x5ee0b0], manmade: ["Техногенное", 0xb78cff],
  };
  const GD = {
    TC: ["Циклон", 0x7fb2ff], FL: ["Наводнение", 0x3ad0ff], VO: ["Вулкан", 0xff2d6f],
    DR: ["Засуха", 0xd9a441], WF: ["Лесной пожар", 0xff5a2a],
  };
  /* виды катастроф для переключателей */
  const KIND = { wildfires: "fire", severeStorms: "storm", volcanoes: "volcano", floods: "flood", drought: "drought" };
  const GDK = { TC: "storm", FL: "flood", VO: "volcano", DR: "drought", WF: "fire" };
  const KINDS = [["fire", "Пожары"], ["storm", "Штормы"], ["volcano", "Вулканы"], ["flood", "Наводнения"], ["drought", "Засухи"], ["other", "Прочее"]];
  const kindOn = { fire: true, storm: true, volcano: true, flood: true, drought: true, other: true };
  let evAll = [], evSfx = "";
  function setEv(items, sfx) {
    if (items) { evAll = items; evSfx = sfx || ""; }
    const shown = evAll.filter((it) => kindOn[it.k]);
    setPts(events, shown);
    status("lvEvSt", shown.length + (shown.length !== evAll.length ? " из " + evAll.length : "") + " шт." + evSfx);
  }
  (function () {
    const box = $("lvEvCats");
    if (!box) return;
    KINDS.forEach(([k, name]) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "tvb on";
      b.dataset.k = k;
      b.textContent = name;
      b.setAttribute("aria-pressed", "true");
      box.appendChild(b);
    });
    box.addEventListener("click", (e) => {
      const b = e.target.closest(".tvb");
      if (!b) return;
      const k = b.dataset.k;
      kindOn[k] = !kindOn[k];
      b.classList.toggle("on", kindOn[k]);
      b.setAttribute("aria-pressed", kindOn[k] ? "true" : "false");
      setEv();
      sync();
    });
    const m = $("lvEv");
    const vis = () => { box.hidden = !m.checked; };
    m.addEventListener("change", vis);
    vis();
  })();
  const AL = { Red: "красный", Orange: "оранжевый", Green: "зелёный" };
  // R: диапазон месяца (архив). Без R берётся последняя отметка события («сейчас»).
  function parseEvents(j, gd, R) {
    const items = [];
    ((j && j.events) || []).slice(0, 1000).forEach((e) => {
      let geoms = (e && e.geometry) || [];
      if (R) geoms = geoms.filter((q) => { const t = Date.parse(q && q.date); return t >= R.t0 && t < R.t1; });
      const g = geoms[geoms.length - 1];
      if (!g || !g.coordinates) return;
      let c = g.coordinates;
      if (g.type === "Polygon" && Array.isArray(c[0])) {
        const r = c[0].filter((q) => q && num(q[0]) && num(q[1]));
        if (!r.length) return;
        c = [r.reduce((s, q) => s + q[0], 0) / r.length, r.reduce((s, q) => s + q[1], 0) / r.length];
      } else if (g.type !== "Point") return;
      if (!num(c[0]) || !num(c[1]) || Math.abs(c[1]) > 90 || Math.abs(c[0]) > 180) return;
      const id = e.categories && e.categories[0] && e.categories[0].id,
        ct = CAT[id] || ["Событие", 0xc0c8d8];
      items.push({ la: c[1], lo: c[0], cat: ct[0], title: String(e.title || "").slice(0, 120), k: KIND[id] || "other", time: Date.parse(g.date) || 0, size: 12, c: rgb(ct[1]) });
    });
    ((gd && gd.features) || []).slice(0, 600).forEach((ft) => {
      const g = ft && ft.geometry, p = (ft && ft.properties) || {};
      const ct = GD[p.eventtype];
      if (!ct || !g || g.type !== "Point" || !Array.isArray(g.coordinates)) return; // землетрясения уже есть из USGS и EMSC
      const c = g.coordinates;
      if (!num(c[0]) || !num(c[1]) || Math.abs(c[1]) > 90 || Math.abs(c[0]) > 180) return;
      const t0 = Date.parse(p.fromdate) || 0, t1 = Date.parse(p.todate) || t0;
      if (R && !(t0 < R.t1 && t1 >= R.t0)) return;
      const name = String(p.name || p.description || ct[0]).slice(0, 100);
      const lvl = AL[p.alertlevel] ? " (уровень тревоги: " + AL[p.alertlevel] + ")" : "";
      items.push({ la: c[1], lo: c[0], cat: ct[0], title: name + (p.country ? ", " + String(p.country).slice(0, 60) : "") + lvl,
        k: GDK[p.eventtype] || "other", time: t0, src: "GDACS (ООН и ЕС)", size: 14, c: rgb(ct[1]) });
    });
    return items;
  }

  /* ---------- землетрясения «сейчас» ---------- */
  function loadQuakes() {
    const emscUrl = API.emsc + "?format=json&limit=400&minmag=2.5&orderby=time&start=" + new Date(Date.now() - 864e5).toISOString().slice(0, 19);
    return Promise.all([getJSON(API.eq), getJSON(emscUrl, 15000).catch(() => null)])
      .then(([j, em]) => {
        if (ARC_ON()) return;
        const items = parseQuakes(j, em);
        setPts(quakes, items);
        const top = items[items.length - 1];
        status("lvEqSt", items.length + " шт." + (top ? ", макс. M" + f(top.mag, 1) : "") + " · " + hhmm(new Date()));
      })
      .catch(() => status("lvEqSt", "не удалось загрузить"));
  }
  function loadEvents() {
    // EONET почти не знает о событиях вне США, поэтому добавляем GDACS (ООН и ЕС): весь мир
    return Promise.all([getJSON(API.ev), getJSON(API.gdacs, 15000).catch(() => null)])
      .then(([j, gd]) => {
        if (ARC_ON()) return;
        const items = parseEvents(j, gd, null);
        setEv(items, " · " + hhmm(new Date()));
      })
      .catch(() => status("lvEvSt", "не удалось загрузить"));
  }

  /* ---------- архив за выбранный месяц ---------- */
  function applyArc(d, my, key, label) {
    if (my !== arcTok || !ARC_ON()) return;
    setPts(quakes, d.q);
    setEv(d.e, "");
    arcKey = key;
    const top = d.q[d.q.length - 1];
    status("lvEqSt", d.q.length + " шт." + (top ? ", макс. M" + f(top.mag, 1) : "") + " · M4,5+");
    status("lvArcSt", label);
    pin.visible = false;
    sync();
  }
  function loadArchive() {
    const y = year, m = month, key = y + "-" + m, label = MN[m - 1] + " " + y, my = ++arcTok;
    const R = monthRange(y, m);
    if (R.t0 > Date.now()) {
      applyArc({ q: [], e: [] }, my, key, label + ": месяц ещё не наступил");
      return;
    }
    const hit = arcCache.get(key);
    if (hit) return applyArc(hit, my, key, label);
    status("lvArcSt", "загружаем " + label + "…");
    const evBase = API.ev.split("?")[0];
    Promise.all([
      getJSON(evBase + "?status=all&limit=1000&start=" + R.a + "&end=" + R.b, 30000).catch(() => null),
      getJSON("https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&minmagnitude=4.5&orderby=magnitude&limit=400&starttime=" + R.a + "&endtime=" + R.next, 25000).catch(() => null),
      getJSON(API.emsc + "?format=json&limit=300&minmag=4.5&orderby=magnitude&start=" + R.a + "T00:00:00&end=" + R.next + "T00:00:00", 20000).catch(() => null),
      getJSON(API.gdacs.replace("EVENTS4APP", "SEARCH") + "?eventlist=TC;FL;VO;DR;WF&fromDate=" + R.a + "&toDate=" + R.b, 20000).catch(() => null),
    ]).then(([ej, uq, em, gd]) => {
      if (my !== arcTok) return;
      if (!ej && !uq && !gd) { status("lvArcSt", "не удалось загрузить " + label); return; }
      const d = { q: parseQuakes(uq, em), e: parseEvents(ej, gd, R) };
      if (arcCache.size >= 36) arcCache.delete(arcCache.keys().next().value);
      arcCache.set(key, d);
      applyArc(d, my, key, label);
    });
  }
  function scheduleArc() {
    if (!ARC_ON() || year + "-" + month === arcKey) return;
    clearTimeout(arcT);
    arcT = setTimeout(loadArchive, 350);
  }

  /* ---------- погода: по клику на глобус и по поиску города (Open-Meteo) ---------- */
  const WMO = (c) =>
    c === 0 ? "Ясно" : c === 1 ? "Преимущественно ясно" : c === 2 ? "Переменная облачность" : c === 3 ? "Пасмурно"
    : c === 45 || c === 48 ? "Туман" : c >= 51 && c <= 55 ? "Морось" : c === 56 || c === 57 ? "Ледяная морось"
    : c >= 61 && c <= 65 ? "Дождь" : c === 66 || c === 67 ? "Ледяной дождь" : c >= 71 && c <= 75 ? "Снег"
    : c === 77 ? "Снежная крупа" : c >= 80 && c <= 82 ? "Ливень" : c === 85 || c === 86 ? "Снегопад"
    : c === 95 ? "Гроза" : c === 96 || c === 99 ? "Гроза с градом" : "Погода";
  const DIRS = ["С", "СВ", "В", "ЮВ", "Ю", "ЮЗ", "З", "СЗ"];
  const wxCache = new Map();
  let wxToken = 0;
  const sgn0 = (v) => (v > 0 ? "+" : v < 0 ? "−" : "") + f(Math.abs(v), 0);
  const sgn1 = (v) => (v > 0 ? "+" : v < 0 ? "−" : "") + f(Math.abs(v), 1);
  const mkEl = (tag, cls, txt) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (txt != null) e.textContent = txt;
    return e;
  };
  const DN = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

  /* подробная карточка у глобуса: сейчас, по часам, 7 дней */
  function openWxCard(name, j) {
    if (typeof window.showEvPop !== "function") return;
    const c = j.current, H = j.hourly || {}, D = j.daily || {};
    window.showEvPop("Погода · Open-Meteo", name, (box) => {
      const top = mkEl("div", "wx-top");
      top.append(mkEl("b", "wx-t", sgn0(c.temperature_2m) + "°"),
        mkEl("span", "wx-d", WMO(c.weather_code) + (num(c.apparent_temperature) ? ", ощущается " + sgn0(c.apparent_temperature) + "°" : "")));
      box.appendChild(top);
      const meta = [];
      if (num(c.wind_speed_10m)) meta.push("Ветер " + f(c.wind_speed_10m, 1) + " м/с" + (num(c.wind_direction_10m) ? ", " + DIRS[Math.round((c.wind_direction_10m % 360) / 45) % 8] : ""));
      if (num(c.relative_humidity_2m)) meta.push("влажность " + Math.round(c.relative_humidity_2m) + "%");
      if (num(c.pressure_msl)) meta.push("давление " + Math.round(c.pressure_msl * 0.75006) + " мм рт. ст.");
      if (num(c.cloud_cover)) meta.push("облачность " + Math.round(c.cloud_cover) + "%");
      if (D.sunrise && D.sunrise[0] && D.sunset && D.sunset[0]) meta.push("восход " + String(D.sunrise[0]).slice(11, 16) + ", закат " + String(D.sunset[0]).slice(11, 16));
      if (meta.length) box.appendChild(mkEl("span", "wx-m", meta.join(" · ")));
      if (Array.isArray(H.time) && Array.isArray(H.temperature_2m)) {
        const from = String(c.time || "").slice(0, 13) + ":00";
        let i = H.time.findIndex((x) => x >= from);
        if (i < 0) i = 0;
        const row = mkEl("div", "wx-hours");
        for (let k = i; k < Math.min(H.time.length, i + 12); k++) {
          if (!num(H.temperature_2m[k])) continue;
          const cell = mkEl("div", "wx-h");
          cell.append(mkEl("small", null, String(H.time[k]).slice(11, 16)), mkEl("b", null, sgn0(H.temperature_2m[k]) + "°"),
            mkEl("small", null, num(H.precipitation_probability && H.precipitation_probability[k]) ? "💧" + Math.round(H.precipitation_probability[k]) + "%" : ""));
          row.appendChild(cell);
        }
        box.append(mkEl("span", "wx-h4", "Ближайшие 12 часов"), row);
      }
      if (Array.isArray(D.time) && Array.isArray(D.temperature_2m_max)) {
        box.appendChild(mkEl("span", "wx-h4", "Прогноз на 7 дней"));
        const list = mkEl("div", "wx-days");
        D.time.slice(0, 7).forEach((t, k) => {
          if (!num(D.temperature_2m_max[k]) || !num(D.temperature_2m_min[k])) return;
          const d = new Date(t + "T12:00");
          const r = mkEl("div", "wx-day");
          const p = D.precipitation_probability_max && D.precipitation_probability_max[k];
          r.append(mkEl("span", "wx-dn", DN[d.getDay()] + ", " + String(t).slice(8, 10) + "." + String(t).slice(5, 7)),
            mkEl("span", "wx-dw", WMO(D.weather_code && D.weather_code[k])),
            mkEl("b", null, sgn0(D.temperature_2m_max[k]) + "° / " + sgn0(D.temperature_2m_min[k]) + "°"),
            mkEl("small", null, num(p) ? "💧" + Math.round(p) + "%" : ""));
          list.appendChild(r);
        });
        box.appendChild(list);
      }
      const a = mkEl("a", null, "Данные погоды: Open-Meteo.com");
      a.href = "https://open-meteo.com/"; a.target = "_blank"; a.rel = "noopener noreferrer";
      box.appendChild(a);
    });
  }
  function showWeather(la, lo, j, label) {
    const cur = j.current, off = num(j.utc_offset_seconds) ? j.utc_offset_seconds : 0;
    const t = new Date(Date.now() + off * 1000);
    const lt = String(t.getUTCHours()).padStart(2, "0") + ":" + String(t.getUTCMinutes()).padStart(2, "0");
    const name = label || coordTxt(la, lo);
    setInfo("Погода · " + name, [
      WMO(cur.weather_code) + ", " + sgn1(cur.temperature_2m) + " °C (ощущается " + sgn1(cur.apparent_temperature) + ")",
      "Ветер " + f(cur.wind_speed_10m, 1) + " м/с, " + DIRS[Math.round(((cur.wind_direction_10m % 360) / 45)) % 8] +
        " · влажность " + Math.round(cur.relative_humidity_2m) + "% · облачность " + Math.round(cur.cloud_cover) + "%",
      "Осадки сейчас: " + f(cur.precipitation, 1) + " мм · местное время " + lt,
    ], { href: "https://open-meteo.com/", text: "Данные погоды: Open-Meteo.com" });
    openWxCard(name, j);
  }
  function weather(la, lo, label) {
    if (ARC_ON() && isPastMonth(year, month)) return histWeather(la, lo, label);
    la = clamp(la, -90, 90);
    const key = la.toFixed(2) + "," + lo.toFixed(2),
      hit = wxCache.get(key);
    placePin(la, lo, 0x5cc8ff);
    if (hit && Date.now() - hit.t < 600000) return showWeather(la, lo, hit.j, label);
    const my = ++wxToken;
    setInfo("Погода · " + (label || coordTxt(la, lo)), ["Загружаю…"]);
    const url =
      API.wx + "?latitude=" + la.toFixed(3) + "&longitude=" + lo.toFixed(3) +
      "&current=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,cloud_cover,pressure_msl,wind_speed_10m,wind_direction_10m,weather_code" +
      "&hourly=temperature_2m,precipitation_probability&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset" +
      "&forecast_days=7&timezone=auto&wind_speed_unit=ms";
    getJSON(url)
      .then((j) => {
        const c = j && j.current;
        if (!c || !num(c.temperature_2m) || !num(c.wind_speed_10m)) throw new Error("bad");
        wxCache.set(key, { t: Date.now(), j });
        if (wxCache.size > 100) wxCache.delete(wxCache.keys().next().value);
        if (my === wxToken) showWeather(la, lo, j, label);
      })
      .catch(() => {
        if (my === wxToken) setInfo("Погода · " + (label || coordTxt(la, lo)), ["Не удалось получить погоду. Возможно, сервис временно ограничил запросы, попробуйте позже."]);
      });
  }

  /* ---------- погода, которая БЫЛА в выбранном месяце (архив Open-Meteo, данные ERA5) ---------- */
  const MON = ["январь","февраль","март","апрель","май","июнь","июль","август","сентябрь","октябрь","ноябрь","декабрь"];
  const hCache = new Map();
  let hTok = 0;
  const isPastMonth = (y, m) => { const n = new Date(); return y < n.getFullYear() || (y === n.getFullYear() && m < n.getMonth() + 1); };
  const avg = (a) => { const v = a.filter(num); return v.length ? v.reduce((s, x) => s + x, 0) / v.length : null; };
  function monthStats(D, y, m) {
    const pre = y + "-" + pad2(m), idx = [];
    (D.time || []).forEach((t, i) => { if (String(t).slice(0, 7) === pre) idx.push(i); });
    const pick = (k) => idx.map((i) => (D[k] ? D[k][i] : null));
    const tm = pick("temperature_2m_mean"), tx = pick("temperature_2m_max").filter(num), tn = pick("temperature_2m_min").filter(num);
    const pr = pick("precipitation_sum").filter(num), wd = pick("wind_speed_10m_max").filter(num);
    return {
      idx, days: idx.length, have: tm.filter(num).length,
      mean: avg(tm), tmax: tx.length ? Math.max.apply(0, tx) : null, tmin: tn.length ? Math.min.apply(0, tn) : null,
      rain: pr.length ? pr.reduce((s, x) => s + x, 0) : null, wind: wd.length ? Math.max.apply(0, wd) : null,
    };
  }
  function showHist(la, lo, j, label, y, m) {
    const D = j.daily || {}, S = monthStats(D, y, m), name = label || coordTxt(la, lo), ttl = MON[m - 1] + " " + y;
    if (!S.have) { setInfo("Погода · " + name, ["За " + ttl + " в архиве нет данных для этой точки."]); return; }
    setInfo("Погода · " + name, [
      "Было в " + ttl + ": средняя " + sgn1(S.mean) + " °C, от " + sgn0(S.tmin) + " до " + sgn0(S.tmax) + " °C",
      "Осадки за месяц: " + f(S.rain || 0, 0) + " мм" + (S.wind != null ? " · порывы до " + f(S.wind, 0) + " м/с" : ""),
    ], { href: "https://open-meteo.com/", text: "Данные: Open-Meteo.com (реанализ ERA5)" });
    if (typeof window.showEvPop !== "function") return;
    window.showEvPop("Погода была · Open-Meteo / ERA5", name + " · " + ttl, (box) => {
      const top = mkEl("div", "wx-top");
      top.append(mkEl("b", "wx-t", sgn0(S.mean) + "°"), mkEl("span", "wx-d", "средняя температура месяца"));
      box.appendChild(top);
      box.appendChild(mkEl("span", "wx-m", "Самый тёплый день " + sgn0(S.tmax) + "° · самая холодная ночь " + sgn0(S.tmin) + "° · осадки " + f(S.rain || 0, 0) + " мм" +
        (S.wind != null ? " · ветер до " + f(S.wind, 0) + " м/с" : "") + (S.have < S.days ? " · данных за " + S.have + " из " + S.days + " дней" : "")));
      // этот же месяц по годам
      const row = mkEl("div", "wx-hours");
      for (let yy = 2016; yy <= y + 20; yy++) {
        if (yy > new Date().getFullYear()) break;
        const R = monthStats(D, yy, m);
        if (R.have < 20 || R.mean == null) continue;
        const cell = mkEl("div", "wx-h");
        cell.append(mkEl("small", null, (yy === y ? "▸ " : "") + yy), mkEl("b", null, sgn0(R.mean) + "°"), mkEl("small", null, f(R.rain || 0, 0) + " мм"));
        row.appendChild(cell);
      }
      box.append(mkEl("span", "wx-h4", MON[m - 1][0].toUpperCase() + MON[m - 1].slice(1) + " по годам: средняя температура и осадки"), row);
      // по дням
      box.appendChild(mkEl("span", "wx-h4", "Погода по дням"));
      const list = mkEl("div", "wx-days");
      S.idx.forEach((i) => {
        const hi = D.temperature_2m_max && D.temperature_2m_max[i], lo2 = D.temperature_2m_min && D.temperature_2m_min[i];
        if (!num(hi) || !num(lo2)) return;
        const t = String(D.time[i]), p = D.precipitation_sum && D.precipitation_sum[i];
        const r = mkEl("div", "wx-day");
        r.append(mkEl("span", "wx-dn", t.slice(8, 10) + "." + t.slice(5, 7)),
          mkEl("span", "wx-dw", WMO(D.weather_code && D.weather_code[i])),
          mkEl("b", null, sgn0(hi) + "° / " + sgn0(lo2) + "°"),
          mkEl("small", null, num(p) && p >= 0.1 ? "💧" + f(p, 1) + " мм" : ""));
        list.appendChild(r);
      });
      box.appendChild(list);
      const a = mkEl("a", null, "Данные: Open-Meteo.com, реанализ ERA5");
      a.href = "https://open-meteo.com/"; a.target = "_blank"; a.rel = "noopener noreferrer";
      box.appendChild(a);
    });
  }
  function histWeather(la, lo, label) {
    la = clamp(la, -90, 90);
    const y = year, m = month, key = la.toFixed(1) + "," + lo.toFixed(1);
    placePin(la, lo, 0x5cc8ff);
    const hit = hCache.get(key);
    if (hit && Date.now() - hit.t < 1800000) return showHist(la, lo, hit.j, label, y, m);
    const my = ++hTok;
    setInfo("Погода · " + (label || coordTxt(la, lo)), ["Загружаю архив погоды 2016–" + new Date().getFullYear() + "…"]);
    const url = API.arch + "?latitude=" + la.toFixed(2) + "&longitude=" + lo.toFixed(2) +
      "&start_date=2016-01-01&end_date=" + dstr(Date.now() - 864e5) +
      "&daily=temperature_2m_mean,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,weather_code&timezone=auto&wind_speed_unit=ms";
    getJSON(url, 30000)
      .then((j) => {
        if (!j || !j.daily || !Array.isArray(j.daily.time)) throw new Error("bad");
        hCache.set(key, { t: Date.now(), j });
        if (hCache.size > 8) hCache.delete(hCache.keys().next().value);
        if (my === hTok) showHist(la, lo, j, label, y, m);
      })
      .catch(() => {
        if (my === hTok) setInfo("Погода · " + (label || coordTxt(la, lo)), ["Не удалось получить архив погоды. Возможно, сервис временно ограничил запросы, попробуйте позже."]);
      });
  }

  /* поиск города по названию (геокодер Open-Meteo) */
  const wxQ = $("wxQ"), wxRes = $("wxRes"), wxGo = $("wxGo");
  const cityLabel = (r) => [r.name, r.admin1 && r.admin1 !== r.name ? r.admin1 : "", r.country].filter((x) => typeof x === "string" && x).join(", ").slice(0, 120);
  function wxPick(r) {
    if (wxRes) wxRes.textContent = "";
    go(r.latitude, r.longitude);
    weather(r.latitude, r.longitude, cityLabel(r));
  }
  async function wxSearch() {
    const q = wxQ.value.trim();
    if (q.length < 2) return;
    wxRes.textContent = "Ищу…";
    try {
      const j = await getJSON(API.geo + "?name=" + encodeURIComponent(q) + "&count=6&language=ru&format=json");
      const rs = ((j && j.results) || []).filter((r) => r && num(r.latitude) && num(r.longitude) && typeof r.name === "string");
      wxRes.textContent = "";
      if (!rs.length) { wxRes.textContent = "Город не найден. Попробуйте написать иначе."; return; }
      if (rs.length === 1) return wxPick(rs[0]);
      rs.forEach((r) => {
        const b = mkEl("button", "wxr", cityLabel(r));
        b.type = "button";
        b.addEventListener("click", () => wxPick(r));
        wxRes.appendChild(b);
      });
    } catch (e) { wxRes.textContent = "Не удалось выполнить поиск (проверьте интернет)."; }
  }
  if (wxQ && wxRes && wxGo) {
    wxGo.addEventListener("click", wxSearch);
    wxQ.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); wxSearch(); } });
  }

  /* ---------- выбор точки кликом ---------- */
  const ray = new THREE.Raycaster(),
    mv = new THREE.Vector2();
  const sw = { eq: $("lvEq"), ev: $("lvEv"), wx: $("lvWx") };
  function nearest(P, v, lim) {
    let bi = -1, bd = lim;
    for (let i = 0; i < P.vecs.length; i++) {
      const a = Math.acos(clamp(P.vecs[i].dot(v), -1, 1));
      if (a < bd) { bd = a; bi = i; }
    }
    return bi < 0 ? null : { i: bi, d: bd };
  }
  const usgs = (u) => typeof u === "string" && /^https:\/\/earthquake\.usgs\.gov\//.test(u);
  function onClick(e) {
    const r = cv.getBoundingClientRect();
    mv.set(((e.clientX - r.left) / r.width) * 2 - 1, (-(e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(mv, cam);
    const h = ray.intersectObjects([globe, ...(typeof hits !== "undefined" ? hits : [])], false)[0];
    if (!h || h.object !== globe) return; // пусто или отметка «события года» — это обрабатывает globe.js
    const L = globe.worldToLocal(h.point.clone()),
      v = L.clone().normalize(),
      la = (Math.asin(clamp(v.y, -1, 1)) * 180) / Math.PI,
      lo = (Math.atan2(-v.z, v.x) * 180) / Math.PI;
    const lim = 0.03 * (cam.position.z / 3.2) + 0.006;
    const q = sw.eq.checked && quakes.visible ? nearest(quakes, v, lim) : null,
      ev = sw.ev.checked && events.visible ? nearest(events, v, lim) : null;
    if (q && (!ev || q.d <= ev.d)) {
      const it = quakes.items[q.i];
      const lines = [it.place || "Положение не указано",
        "Глубина " + (it.depth == null ? "—" : Math.round(it.depth) + " км") + " · " + whenTxt(it.time)];
      if (it.src) lines.push("Источник: европейско-средиземноморский сейсмоцентр (EMSC), названия на английском");
      if (it.tsu) lines.push("Отмечено как возможно связанное с цунами. Проверьте tsunami.gov.");
      setInfo("Землетрясение, магнитуда " + f(it.mag, 1), lines, usgs(it.url) ? { href: it.url, text: "Подробности на USGS" } : null);
      placePin(it.la, it.lo, 0xffe14d);
      go(it.la, it.lo);
    } else if (ev) {
      const it = events.items[ev.i];
      setInfo(it.cat + " · " + it.title, [it.time ? (ARC_ON() ? "Дата отметки: " + dstr(it.time) : "Последняя отметка: " + ago(it.time)) : "", "Источник: " + (it.src || "NASA EONET") + " (названия на английском)"].filter(Boolean));
      placePin(it.la, it.lo, 0xffe14d);
      go(it.la, it.lo);
    } else if (sw.wx.checked) {
      weather(la, lo);
    }
  }
  let dn = null;
  cv.addEventListener("pointerdown", (e) => { dn = { x: e.clientX, y: e.clientY }; });
  cv.addEventListener("pointerup", (e) => {
    if (!dn) return;
    const d = Math.hypot(e.clientX - dn.x, e.clientY - dn.y);
    dn = null;
    if (d <= 4) onClick(e);
  });

  /* ---------- переключатели и автообновление ---------- */
  const feeds = {
    eq: { every: 5 * 60e3, last: 0, busy: false, load: loadQuakes, sw: sw.eq },
    ev: { every: 15 * 60e3, last: 0, busy: false, load: loadEvents, sw: sw.ev },
  };
  function run(k) {
    const F = feeds[k];
    if (ARC_ON()) return;
    if (!F.sw.checked || F.busy) return;
    F.busy = true;
    F.last = Date.now();
    Promise.resolve(F.load()).finally(() => { F.busy = false; });
  }
  function sync() {
    quakes.visible = sw.eq.checked && quakes.items.length > 0;
    events.visible = sw.ev.checked && events.items.length > 0;
    if (!sw.eq.checked && !sw.ev.checked && !sw.wx.checked) pin.visible = false;
    const dot = $("liveDot");
    if (dot) dot.classList.toggle("on", sw.eq.checked || sw.ev.checked);
  }
  ["eq", "ev"].forEach((k) =>
    sw[k].addEventListener("change", () => {
      if (sw[k].checked) { if (ARC_ON()) { arcKey = ""; loadArchive(); } else run(k); }
      else { status(k === "eq" ? "lvEqSt" : "lvEvSt", ""); }
      sync();
    }),
  );
  sw.wx.addEventListener("change", () => {
    if (!sw.wx.checked) { pin.visible = false; setInfo("", [DEFAULT_INFO]); }
  });
  setInterval(() => {
    if (document.hidden) return;
    Object.keys(feeds).forEach((k) => {
      if (feeds[k].sw.checked && Date.now() - feeds[k].last >= feeds[k].every) run(k);
    });
  }, 30000);
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) Object.keys(feeds).forEach((k) => { if (Date.now() - feeds[k].last >= feeds[k].every) run(k); });
  });
  // дополняем перерисовку интерфейса
  const prevUi = ui;
  ui = function () { prevUi(); sync(); scheduleArc(); };
  if (arcSw)
    arcSw.addEventListener("change", () => {
      clearTimeout(arcT);
      arcKey = "";
      if (arcSw.checked) loadArchive();
      else {
        arcTok++;
        status("lvArcSt", "");
        feeds.eq.last = 0; feeds.ev.last = 0;
        run("eq"); run("ev");
      }
    });

  setInfo("", [DEFAULT_INFO]);
  if (ARC_ON()) loadArchive();
  else { run("eq"); run("ev"); }
  sync();
})();
