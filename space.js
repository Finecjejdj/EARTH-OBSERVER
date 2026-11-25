(function () {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const box = $("spBody");
  if (!box) return;
  const num = (v) => typeof v === "number" && isFinite(v);
  const RANK = { A: 0, B: 1, C: 2, M: 3, X: 4 };
  const hhmm = (d) => String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0");
  function ago(ts) {
    const m = Math.max(0, Math.round((Date.now() - ts) / 60000));
    if (m < 60) return m + " мин назад";
    const h = Math.floor(m / 60);
    return h < 48 ? h + " ч назад" : Math.floor(h / 24) + " дн назад";
  }
  async function get(t) {
    const c = new AbortController(), to = setTimeout(() => c.abort(), 15000);
    try {
      const r = await fetch("/api/nasa?t=" + t, { signal: c.signal, credentials: "omit", referrerPolicy: "no-referrer" });
      if (!r.ok) throw new Error(String(r.status));
      return await r.json();
    } finally { clearTimeout(to); }
  }
  function row(k, v) {
    const d = document.createElement("div");
    d.className = "sprow";
    const a = document.createElement("span"), b = document.createElement("b");
    a.textContent = k; b.textContent = v;
    d.append(a, b);
    return d;
  }
  const sec = $("spSt");
  const say = (t) => { if (sec) sec.textContent = t; };

  /* Земля из точки L1 (EPIC / DSCOVR) */
  async function epic() {
    const j = await get("epic");
    const it = Array.isArray(j) ? j[j.length - 1] : null;
    if (!it || !/^epic_[0-9a-z_]+$/.test(it.image) || !/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(it.date)) throw new Error("bad");
    const [d, t] = it.date.split(" "), [y, m, dd] = d.split("-");
    const img = $("spImg");
    img.src = "https://epic.gsfc.nasa.gov/archive/natural/" + y + "/" + m + "/" + dd + "/jpg/" + it.image + ".jpg";
    img.hidden = false;
    const ts = Date.parse(d + "T" + t + "Z");
    $("spCap").textContent = "Снимок камеры EPIC со спутника DSCOVR из точки L1, в 1,5 млн км от Земли. Сделан " + d + " " + t.slice(0, 5) + " UTC" + (ts ? " (" + ago(ts) + ")" : "") + ".";
  }

  /* Космическая погода (NASA DONKI) */
  async function weather() {
    const [flr, cme, gst] = await Promise.all([get("flr"), get("cme"), get("gst")]);
    const list = $("spList");
    list.textContent = "";
    const F = (Array.isArray(flr) ? flr : []).filter((x) => x && typeof x.classType === "string" && /^[A-X]\d/.test(x.classType));
    let top = null;
    F.forEach((x) => {
      const r = RANK[x.classType[0]] * 100 + (parseFloat(x.classType.slice(1)) || 0);
      if (!top || r > top.r) top = { r, c: x.classType };
    });
    list.appendChild(row("Солнечные вспышки за 7 дней", F.length + (top ? ", сильнейшая " + top.c : "")));
    list.appendChild(row("Выбросы плазмы (CME)", String(Array.isArray(cme) ? cme.length : 0)));
    let kp = null;
    (Array.isArray(gst) ? gst : []).forEach((s) => (s.allKpIndex || []).forEach((k) => { if (num(k.kpIndex) && (kp == null || k.kpIndex > kp)) kp = k.kpIndex; }));
    list.appendChild(row("Магнитные бури", (Array.isArray(gst) ? gst.length : 0) + (kp != null ? ", макс. Kp " + kp : "")));
  }

  async function run() {
    let ok = 0;
    for (const f of [epic, weather]) {
      try { await f(); ok++; } catch (e) { if (e && e.message === "503") { say("Прокси не настроен: задайте NASA_API_KEY на хостинге."); return; } }
    }
    say(ok === 2 ? "обновлено " + hhmm(new Date()) : ok ? "часть данных недоступна" : "нужен сервер-прокси (Netlify) и ключ NASA_API_KEY");
  }
  run();
  setInterval(() => { if (!document.hidden) run(); }, 15 * 60e3);
})();
