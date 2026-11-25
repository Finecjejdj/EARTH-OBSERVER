/* Просмотр снимков NASA GIBS прямо на сайте: слой, дата, перемещение и масштаб.
   Картинки приходят с gibs.earthdata.nasa.gov (разрешено в CSP: img-src). */
(function () {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const root = $("imgv"), btn = $("wvLink");
  if (!root || !btn) return;
  const GIBS = "https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi";
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const ymd = (d) => d.toISOString().slice(0, 10);

  const LAYERS = [
    { id: "GOES-East_ABI_GeoColor", t: 2, name: "● В реальном времени: Америки (GOES-East)", reg: [-75, 0, 130], cap: "Почти живой снимок: геостационарный спутник GOES-East обновляет кадр каждые 10 минут. Видна дневная и ночная сторона, облака и грозы. Показан один полушарный диск, за его краем данных нет." },
    { id: "GOES-West_ABI_GeoColor", t: 2, name: "● В реальном времени: Тихий океан (GOES-West)", reg: [-140, 5, 130], cap: "Почти живой снимок Тихого океана и запада Америк со спутника GOES-West, кадр обновляется каждые 10 минут." },
    { id: "Himawari_AHI_Band3_Red_Visible_1km", t: 2, name: "● В реальном времени: Азия и Австралия (Himawari)", reg: [140, 0, 130], cap: "Почти живой снимок со спутника Himawari (Япония): Азия, Австралия и запад Тихого океана. Это красный видимый канал, ночью кадр тёмный." },
    { id: "VIIRS_SNPP_CorrectedReflectance_TrueColor", t: 1, name: "Вид из космоса (VIIRS)", cap: "Как планета выглядит на глаз, снимок за выбранный день (спутник Suomi NPP). Чёрные полосы и пробелы: туда спутник за этот день не долетел." },
    { id: "MODIS_Terra_CorrectedReflectance_TrueColor", t: 1, name: "Вид из космоса (MODIS Terra)", cap: "Тот же вид из космоса, но со спутника Terra. Ряд идёт с 2000 года, поэтому удобно сравнивать разные годы." },
    { id: "MODIS_Terra_Land_Surface_Temp_Day", t: 1, name: "Температура суши днём", cap: "Температура поверхности земли днём по данным MODIS. Синий: холодно, красный: жарко. Серые места: облака закрывали землю." },
    { id: "GHRSST_L4_MUR_Sea_Surface_Temperature", t: 1, name: "Температура океана", cap: "Температура поверхности воды (проект GHRSST/MUR). Тёплые течения и пятна Эль-Ниньо видны как тёплые полосы на экваторе." },
    { id: "MODIS_Terra_Aerosol", t: 1, name: "Дым, пыль, дымка", cap: "Аэрозоли в воздухе: дым пожаров, пыль пустынь, загрязнение. Чем ярче и теплее цвет, тем гуще дымка." },
    { id: "MODIS_Terra_NDSI_Snow_Cover", t: 1, name: "Снежный покров", cap: "Где лежит снег по данным MODIS. Сравните одну и ту же дату в разные годы." },
    { id: "MODIS_Terra_Chlorophyll_A", t: 1, name: "Хлорофилл в океане", cap: "Количество микроводорослей в воде. Зелёное и жёлтое: много жизни, синее: мало." },
    { id: "AMSR2_Sea_Ice_Concentration_12km", t: 1, name: "Морской лёд (полюса)", cap: "Доля воды, покрытой льдом (радиометр AMSR2). Откройте «Арктика» и сравните сентябрь разных лет: так виден минимум льда." },
    { id: "VIIRS_Black_Marble", t: 0, name: "Огни городов ночью", cap: "Ночная Земля: свет городов, дорог и промыслов. Это годовая композиция, выбор даты на неё не влияет." },
  ];
  const REGIONS = [
    ["Мир", 0, 0, 360],
    ["Арктика", 0, 78, 80],
    ["Европа", 15, 52, 60],
    ["Африка", 20, 3, 90],
    ["Азия", 90, 38, 110],
    ["Австралия", 134, -26, 60],
    ["Амазония", -62, -6, 40],
    ["Сев. Америка", -100, 42, 90],
  ];

  const sel = $("ivLayer"), dateEl = $("ivDate"), vp = $("ivVp"), st = $("ivSt"), cap = $("ivCap"), regBox = $("ivReg");
  const up = $("ivUp"), auto = $("ivAuto");
  const imgs = [$("ivA"), $("ivB")];
  let lastLoad = 0, front = 0, layer = LAYERS[0], tries = 0, token = 0, timer = 0, opened = false;
  const tgt = { cx: 0, cy: 0, L: 360 };
  let shown = null;

  LAYERS.forEach((l, i) => {
    const o = document.createElement("option");
    o.value = i;
    o.textContent = l.name;
    sel.appendChild(o);
  });
  REGIONS.forEach((r, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "tvb";
    b.dataset.i = i;
    b.textContent = r[0];
    regBox.appendChild(b);
  });
  const today = new Date(Date.now() - 864e5);
  dateEl.max = ymd(new Date());
  dateEl.min = "2000-02-24";
  dateEl.value = ymd(today);

  const fit = () => {
    tgt.L = clamp(tgt.L, 4, 360);
    tgt.cx = clamp(tgt.cx, -180 + tgt.L / 2, 180 - tgt.L / 2);
    tgt.cy = clamp(tgt.cy, -90 + tgt.L / 4, 90 - tgt.L / 4);
  };
  const say = (t) => { st.textContent = t; st.classList.toggle("on", !!t); };

  /* ---- кэш и отмена запросов ---- */
  const cache = new Map();            // адрес -> уже загруженная картинка (последние 14)
  const MAX_CACHE = 14;
  let pending = [], pt = 0;
  const remember = (u, im) => { cache.delete(u); cache.set(u, im); if (cache.size > MAX_CACHE) cache.delete(cache.keys().next().value); };
  const abortPending = () => { pending.forEach((i) => { i.onload = i.onerror = null; i.src = ""; }); pending = []; };
  function fetchImg(u, ok, bad, track) {
    const c = cache.get(u);
    if (c) { remember(u, c); ok(c); return; }
    const im = new Image();
    im.decoding = "async";
    const drop = () => { pending = pending.filter((x) => x !== im); };
    im.onload = () => { if (track) drop(); remember(u, im); ok(im); };
    im.onerror = () => { if (track) drop(); bad(); };
    if (track) pending.push(im);
    im.src = u;
  }

  const fullW = () => Math.round(clamp(vp.clientWidth * Math.min(2, window.devicePixelRatio || 1), 400, 2048));
  function url(wOver, dateOver) {
    const w = wOver || fullW(), h = Math.round(w / 2);
    const half = tgt.L / 2, qh = tgt.L / 4;
    const bbox = [tgt.cy - qh, tgt.cx - half, tgt.cy + qh, tgt.cx + half].map((v) => v.toFixed(4)).join(",");
    const png = layer.t === 2 || layer.id.indexOf("Sea_Ice") > -1 || layer.id.indexOf("Aerosol") > -1 || layer.id.indexOf("Snow") > -1;
    return GIBS + "?SERVICE=WMS&REQUEST=GetMap&VERSION=1.3.0&LAYERS=" + encodeURIComponent(layer.id) +
      "&STYLES=&FORMAT=" + (png ? "image/png" : "image/jpeg") + "&CRS=EPSG:4326&BBOX=" + bbox +
      "&WIDTH=" + w + "&HEIGHT=" + h + (layer.t === 1 ? "&TIME=" + (dateOver || dateEl.value) : "") + (layer.t === 2 ? "&TRANSPARENT=TRUE&_t=" + Math.floor(Date.now() / 600000) : "");
  }

  /* после загрузки тихо подгружаем соседние дни в малом размере: листание стрелками даты станет мгновенным */
  function prefetch() {
    clearTimeout(pt);
    if (layer.t !== 1 || !dateEl.value || (navigator.connection && navigator.connection.saveData)) return;
    pt = setTimeout(() => {
      [-1, 1].forEach((k) => {
        const d = new Date(dateEl.value + "T00:00:00Z");
        d.setUTCDate(d.getUTCDate() + k);
        if (d > new Date() || d < new Date(dateEl.min)) return;
        const u = url(512, ymd(d));
        if (!cache.has(u)) fetchImg(u, () => {}, () => {}, false);
      });
    }, 800);
  }

  /* пока идёт загрузка, показанный кадр сдвигаем и масштабируем, чтобы он следовал за рукой */
  function preview() {
    if (!shown) return;
    const W = vp.clientWidth, s = shown.L / tgt.L;
    const dx = ((shown.cx - tgt.cx) / tgt.L) * W, dy = (-(shown.cy - tgt.cy) / tgt.L) * W;
    imgs[front].style.transform = "translate(" + dx.toFixed(1) + "px," + dy.toFixed(1) + "px) scale(" + s.toFixed(5) + ")";
  }

  function load() {
    fit();
    const my = ++token, want = { cx: tgt.cx, cy: tgt.cy, L: tgt.L };
    abortPending();                    // старые запросы больше не нужны
    say("загружаем…");
    const fullUrl = url(), lowUrl = fullW() > 700 && !cache.has(fullUrl) ? url(512) : null;
    let fullDone = false;
    const show = (im) => {
      const back = imgs[1 - front];
      back.src = im.src;
      back.style.transform = "none";
      back.classList.add("on");
      imgs[front].classList.remove("on");
      front = 1 - front;
      shown = want;
      preview();
    };
    /* 1) быстрый кадр 512 px, 2) поверх него полный размер */
    if (lowUrl) fetchImg(lowUrl, (im) => { if (my !== token || fullDone) return; show(im); say("уточняем…"); }, () => {}, true);
    fetchImg(fullUrl, (im) => {
      if (my !== token) return;
      fullDone = true;
      show(im);
      tries = 0;
      say("");
      lastLoad = Date.now();
      const n = new Date();
      up.textContent = "Кадр загружен в " + String(n.getHours()).padStart(2, "0") + ":" + String(n.getMinutes()).padStart(2, "0") + (layer.t === 2 && auto.checked ? ", дальше обновится сам" : "");
      prefetch();
    }, () => {
      if (my !== token) return;
      if (layer.t === 1 && dateEl.value && tries < 3 && navigator.onLine !== false) {
        tries++;
        const d = new Date(dateEl.value + "T00:00:00Z");
        d.setUTCDate(d.getUTCDate() - 1);
        dateEl.value = ymd(d);
        load();
      } else { tries = 0; say("не удалось загрузить: слой или дата недоступны, проверьте интернет или выберите другую дату"); }
    }, true);
  }
  const later = (ms) => { preview(); clearTimeout(timer); timer = setTimeout(load, ms == null ? 280 : ms); };

  function setLayer() {
    layer = LAYERS[+sel.value];
    cap.textContent = layer.cap;
    dateEl.disabled = layer.t !== 1;
    $("ivY1").disabled = $("ivY10").disabled = layer.t !== 1;
    $("ivLiveRow").hidden = layer.t !== 2;
    if (layer.reg) { tgt.cx = layer.reg[0]; tgt.cy = layer.reg[1]; tgt.L = layer.reg[2]; }
    tries = 0;
    later(0);
  }
  sel.addEventListener("change", () => {
    if (layer.id !== LAYERS[+sel.value].id && /Sea_Ice/.test(LAYERS[+sel.value].id) && tgt.L > 200) { tgt.cx = 0; tgt.cy = 78; tgt.L = 80; }
    setLayer();
  });
  dateEl.addEventListener("change", () => { tries = 0; later(0); });
  const shiftYears = (n) => {
    if (!dateEl.value) return;
    const d = new Date(dateEl.value + "T00:00:00Z");
    d.setUTCFullYear(d.getUTCFullYear() - n);
    dateEl.value = ymd(d < new Date(dateEl.min) ? new Date(dateEl.min) : d);
    tries = 0;
    later(0);
  };
  $("ivY1").addEventListener("click", () => shiftYears(1));
  $("ivY10").addEventListener("click", () => shiftYears(10));
  regBox.addEventListener("click", (e) => {
    const b = e.target.closest(".tvb");
    if (!b) return;
    const r = REGIONS[+b.dataset.i];
    tgt.cx = r[1]; tgt.cy = r[2]; tgt.L = r[3];
    later(0);
  });

  /* перетаскивание, колесо и кнопки масштаба */
  let drag = null;
  vp.addEventListener("pointerdown", (e) => {
    if (e.target.closest("button")) return;
    drag = { x: e.clientX, y: e.clientY };
    vp.setPointerCapture(e.pointerId);
    vp.classList.add("grab");
  });
  vp.addEventListener("pointermove", (e) => {
    if (!drag) return;
    const W = vp.clientWidth;
    tgt.cx -= ((e.clientX - drag.x) / W) * tgt.L;
    tgt.cy += ((e.clientY - drag.y) / W) * tgt.L;
    drag = { x: e.clientX, y: e.clientY };
    fit();
    later();
  });
  const end = () => { drag = null; vp.classList.remove("grab"); };
  vp.addEventListener("pointerup", end);
  vp.addEventListener("pointercancel", end);
  function zoom(k, fx, fy) {
    const r = vp.getBoundingClientRect(), W = r.width;
    const px = fx == null ? 0.5 : (fx - r.left) / W, py = fy == null ? 0.25 : (fy - r.top) / W; // py в долях ширины
    const lon = tgt.cx + (px - 0.5) * tgt.L, lat = tgt.cy - (py - 0.25) * tgt.L;
    tgt.L = clamp(tgt.L * k, 4, 360);
    tgt.cx = lon - (px - 0.5) * tgt.L;
    tgt.cy = lat + (py - 0.25) * tgt.L;
    fit();
    later();
  }
  vp.addEventListener("wheel", (e) => { e.preventDefault(); zoom(e.deltaY < 0 ? 0.8 : 1.25, e.clientX, e.clientY); }, { passive: false });
  $("ivIn").addEventListener("click", () => zoom(0.6));
  $("ivOut").addEventListener("click", () => zoom(1.67));
  addEventListener("resize", () => { if (opened && !root.hidden) later(); });

  /* автообновление «живых» слоёв: проверка раз в 30 секунд, кадр грузится не чаще раза в 10 минут */
  const EVERY = 10 * 60e3;
  function tick() {
    if (root.hidden || document.hidden || layer.t !== 2 || !auto.checked || drag) return;
    if (Date.now() - lastLoad >= EVERY) { later(0); }
  }
  setInterval(tick, 30000);
  document.addEventListener("visibilitychange", tick);
  auto.addEventListener("change", () => { if (auto.checked) tick(); });

  /* окно */
  let closeT = 0;
  function open() {
    clearTimeout(closeT);
    root.hidden = false;
    document.body.classList.add("modal-on");
    document.documentElement.classList.add("modal-on");
    requestAnimationFrame(() => root.classList.add("open"));
    $("imgvClose").focus();
    if (!opened) { opened = true; setLayer(); }
  }
  function close() {
    root.classList.remove("open");
    document.body.classList.remove("modal-on");
    document.documentElement.classList.remove("modal-on");
    closeT = setTimeout(() => { root.hidden = true; }, 300);
    btn.focus();
  }
  btn.addEventListener("click", open);
  $("imgvClose").addEventListener("click", close);
  root.addEventListener("click", (e) => { if (e.target === root) close(); });
  window.addEventListener("keydown", (e) => {
    if (root.hidden) return;
    if (e.key === "Escape") { close(); e.stopImmediatePropagation(); return; }
    if ((e.key === "ArrowLeft" || e.key === "ArrowRight") && !/^(INPUT|SELECT)$/.test(e.target.tagName)) e.stopImmediatePropagation(); // не листать годы под окном
  }, true);
})();
