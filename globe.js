const Y = [
  {
    y: 2016,
    a: 1.01,
    r: "Пятый по тёплости в ряду 2016–2026; на момент выхода — рекорд",
    co2: "≈408 ppm (май)",
    sl: "—",
    sln: "в строю с января: Jason-3",
    ice: 4.14,
    icen: "сентябрьский минимум",
    oz: 22.8,
    ozn: "минимум озона 111 е. Д.",
    ev: "NASA и NOAA объявили рекорд третий год подряд. Озоновая дыра за сезон выросла до 22,8 млн км².",
    sat: "<b>Jason-3</b> стартовал 17 января и продолжил спутниковый ряд высоты океана, начатый в 1992 году. <b>OCO-2</b> показал, что после Эль-Ниньо 2015–2016 тропики выбросили примерно на 2,5 млрд т углерода больше обычного.",
  },
  {
    y: 2017,
    a: 0.92,
    r: "Восьмой в ряду 2016–2026; на момент выхода — второй по тёплости",
    co2: "≈410 ppm (май)",
    sl: "—",
    sln: "ряд ведёт Jason-3",
    ice: 4.64,
    icen: "сентябрьский минимум",
    oz: 19.6,
    ozn: "минимум озона 131 е. Д.",
    ev: "Рекорд 2016 года не побит, но год в верхней части ряда. Озоновая дыра заметно меньше прошлогодней: 19,6 млн км².",
    sat: "<b>GRACE</b> закончил работу в октябре после 15 лет наблюдений за массой воды и льда. <b>NOAA-20</b> (18 ноября) вывел на орбиту второй VIIRS: теперь пожары и дымы видны сразу с двух спутников.",
  },
  {
    y: 2018,
    a: 0.82,
    r: "Самый прохладный в ряду 2016–2026; на момент выхода — четвёртый",
    co2: "≈411 ppm (май)",
    sl: "—",
    sln: "ряд ведёт Jason-3",
    ice: 4.59,
    icen: "сентябрьский минимум",
    oz: 24.8,
    ozn: "минимум озона 102 е. Д.",
    ev: "Самый прохладный год десятилетия, но он всё равно теплее 2014-го (+0,73 °C). Озоновая дыра выросла до 24,8 млн км².",
    sat: "<b>GRACE-FO</b> стартовал 22 мая: два спутника в паре меряют, как меняется сила тяжести над землёй, и по ней считают массу воды и льда. Заодно проверяют лазерный дальномер вместо радиолуча.",
  },
  {
    y: 2019,
    a: 0.95,
    r: "Седьмой в ряду 2016–2026; на момент выхода — второй по тёплости",
    co2: "≈415 ppm (май)",
    sl: "—",
    sln: "ряд ведёт Jason-3",
    ice: 4.15,
    icen: "сентябрьский минимум",
    oz: 16.4,
    ozn: "минимум озона 142 е. Д.",
    ev: "Гренландия потеряла рекордный для наблюдений GRACE-FO объём льда: больше 500 Гт за год. Озоновая дыра самая маленькая за десятилетие: 16,4 млн км².",
    sat: "<b>GRACE-FO</b> записал рекордную потерю льда Гренландией. <b>OCO-3</b> доставили на МКС в мае: станция летает не привязана к солнечному времени, поэтому он видит CO₂ над городами и лесами в разные часы суток.",
  },
  {
    y: 2020,
    a: 0.98,
    r: "Шестой в ряду 2016–2026; на момент выхода делил рекорд с 2016-м",
    co2: "≈417 ppm (май)",
    sl: "—",
    sln: "готовится Sentinel-6",
    ice: 3.74,
    icen: "второй за всю историю (рекорд 3,39 в 2012-м)",
    oz: 24.8,
    ozn: "минимум озона 94 е. Д.",
    ev: "Сентябрьский минимум арктического льда 3,74 млн км²: второй за всю историю спутниковых наблюдений. Озоновая дыра глубокая и затянулась до ноября.",
    sat: "<b>VIIRS</b> видел фронт огня в Калифорнии: больше 4 млн акров за сезон, рекорд штата. <b>Sentinel-6 Michael Freilich</b> стартовал 21 ноября: радарный альтиметр продолжил ряд, который начал TOPEX/Poseidon в 1992 году.",
  },
  {
    y: 2021,
    a: 0.84,
    r: "Десятый в ряду 2016–2026 (+0,84 °C)",
    co2: "≈419 ppm (май)",
    sl: "—",
    sln: "ряд ведёт Sentinel-6",
    ice: 4.72,
    icen: "сентябрьский минимум",
    oz: 24.8,
    ozn: "минимум озона 92 е. Д.",
    ev: "Самая глубокая озоновая дыра десятилетия: минимум озона 92 единицы Добсона. Относительно прохладный год, но теплее почти всех лет до 2015-го.",
    sat: "<b>Aura/MLS</b> продолжает измерять озон и водяной пар в стратосфере. <b>VIIRS</b>: пожар Dixie (июль–октябрь) сжёг почти миллион акров в Калифорнии.",
  },
  {
    y: 2022,
    a: 0.89,
    r: "Девятый в ряду 2016–2026 (+0,89 °C)",
    co2: "≈421 ppm (май)",
    sl: "—",
    sln: "ряд ведёт Sentinel-6",
    ice: 4.67,
    icen: "сентябрьский минимум",
    oz: 26.5,
    ozn: "минимум озона 97 е. Д.",
    ev: "15 января извержение Хунга-Тонга забросило в стратосферу около 146 Тг водяного пара: примерно 10% всего, что там было. Озоновая дыра самая большая за десятилетие: 26,5 млн км².",
    sat: "<b>Aura/MLS</b> измерил выброс воды после Тонга: прибор видит сквозь пепел, который ослепил другие спутники. <b>NOAA-21</b> (10 ноября) принёс на орбиту третий VIIRS.",
  },
  {
    y: 2023,
    a: 1.17,
    r: "Четвёртый в ряду 2016–2026; на момент выхода — рекорд",
    co2: "≈424 ppm (май)",
    sl: "—",
    sln: "ряд ведёт Sentinel-6",
    ice: 4.23,
    icen: "сентябрьский минимум",
    oz: 26.0,
    ozn: "минимум озона 99 е. Д.",
    ev: "Рекордный пожарный сезон в Канаде: около 17,6 млн га, 647% от нормы. Каждый месяц с июня по декабрь побил свой температурный рекорд.",
    sat: "<b>VIIRS</b> и индекс аэрозолей <b>OMPS</b> показали дымовой шлейф над Атлантикой, дошедший до Западной Европы. Антарктический морской лёд в феврале упал до рекордных 1,79 млн км².",
  },
  {
    y: 2024,
    a: 1.28,
    r: "Самый тёплый год в истории наблюдений",
    co2: "426,7 ppm (май)",
    sl: "5,9 мм в год (ожидали 4,3)",
    ice: 4.28,
    icen: "сентябрьский минимум",
    oz: 22.4,
    ozn: "минимум озона 107 е. Д.",
    ev: "Уровень моря вырос на 5,9 мм вместо ожидавшихся 4,3, в основном из-за расширения тёплой воды. С 1993 года океан поднялся примерно на 10 см.",
    sat: "<b>GRACE-FO</b>: исследование NASA показало, что запасы пресной воды на суше падают с мая 2014-го. За 2015–2023 годы её стало на 1200 км³ меньше, чем в среднем за 2002–2014. 13 из 30 сильнейших засух пришлись на годы после января 2015-го.",
  },
  {
    y: 2025,
    a: 1.19,
    r: "Третий в ряду 2016–2026 (+1,19 °C); ниже 2024-го, выше 2023-го",
    co2: "430,2 ppm (май)",
    sl: "—",
    sln: "стартовал Sentinel-6B",
    ice: 4.6,
    icen: "10-й с конца, как 2008 и 2010",
    oz: 22.9,
    ozn: "минимум озона 127 е. Д.",
    ev: "Озоновая дыра пятая по малости с 1992 года, а зимний максимум арктического льда рекордно низкий: 14,33 млн км². В Канаде сгорело больше 7,3 млн га: второй по тяжести сезон после 2023-го.",
    sat: "<b>Sentinel-6B</b> стартовал в ноябре и продолжит ряд высоты океана вместе с Sentinel-6 Michael Freilich. <b>VIIRS</b>: основной огонь канадского сезона пришёлся на Саскачеван и Манитобу, больше половины площади.",
  },
  {
    y: 2026,
    a: 1.27,
    ap: true,
    r: "Год не закончен: среднее за январь–октябрь +1,27 °C, итог зависит от ноября и декабря",
    co2: "432,0 ppm (май), рекорд",
    sl: "—",
    sln: "ряд ведёт Sentinel-6B",
    ice: 4.6,
    icen: "10-й с конца, как 2008, 2010 и 2025",
    oz: 27.1,
    ozn: "максимум 18 сентября (NASA/NOAA), минимум озона 105 е. Д.",
    ev: "Сильнейший за всю историю наблюдений Эль-Ниньо: 21 сентября суточная аномалия температуры воды в зоне Ниньо-3.4 (+3,11 °C) побила рекорд 2015 года, а среднее за октябрь достигло рекордных +3,21 °C (Copernicus). Август стал самым тёплым августом за всю историю наблюдений во всех шести основных наборах данных.",
    sat: "<b>Aura/MLS</b> отработал 22 года, но орбита дрейфует, а мощность батарей, как ожидают в NASA, ограничит миссию примерно к 2028 году. Озоновая дыра 2026 года самая большая за последние десять лет (седьмая по величине за 48 лет наблюдений).",
  },
];
const MN = ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];
const f = (x, n) => x.toFixed(n).replace(".", ",");
const POLY = [
  [
    -168, 66, -162, 70, -141, 70, -125, 70, -95, 72, -82, 70, -80, 63, -94, 59, -82, 52, -78, 58,
    -70, 60, -62, 57, -56, 52, -66, 45, -70, 42, -76, 35, -81, 31, -80, 25, -83, 29, -90, 30, -97,
    27, -97, 21, -91, 19, -87, 21, -88, 16, -83, 10, -78, 8, -80, 8, -86, 12, -92, 15, -105, 20,
    -110, 23, -115, 30, -117, 33, -121, 35, -124, 40, -124, 47, -130, 55, -140, 60, -152, 59, -158,
    57, -165, 60,
  ],
  [
    -80, 8, -72, 12, -62, 10, -52, 5, -50, 0, -35, -6, -39, -15, -41, -22, -48, -26, -58, -35, -65,
    -41, -68, -52, -72, -54, -74, -46, -73, -37, -71, -28, -70, -18, -76, -14, -81, -6, -80, 0, -78,
    5,
  ],
  [-72, 78, -60, 82, -30, 83, -20, 75, -22, 70, -42, 60, -50, 64, -56, 70],
  [-80, 73, -62, 67, -65, 62, -75, 65],
  [-24, 64, -14, 65, -14, 64, -22, 63],
  [
    -9, 37, -9, 43, -2, 44, -5, 48, 2, 51, 8, 54, 9, 57, 12, 54, 20, 55, 24, 59, 30, 60, 24, 65, 20,
    63, 18, 60, 12, 56, 6, 58, 5, 62, 14, 68, 25, 71, 32, 70, 40, 67, 44, 68, 60, 69, 70, 73, 80,
    73, 100, 77, 115, 74, 130, 72, 150, 71, 170, 70, 180, 68, 180, 65, 178, 62, 165, 60, 160, 54,
    156, 51, 155, 58, 143, 59, 137, 54, 141, 48, 135, 43, 130, 42, 129, 35, 126, 37, 125, 40, 122,
    40, 121, 37, 119, 35, 122, 30, 120, 25, 110, 20, 108, 16, 109, 12, 105, 9, 101, 13, 100, 8, 103,
    1, 98, 8, 98, 16, 94, 17, 91, 22, 87, 21, 80, 15, 78, 8, 73, 17, 72, 21, 67, 24, 57, 26, 50, 30,
    48, 30, 44, 37, 36, 36, 30, 36, 27, 37, 26, 40, 29, 41, 23, 40, 23, 37, 20, 40, 19, 42, 13, 45,
    16, 41, 18, 40, 16, 38, 12, 42, 9, 44, 3, 43, 0, 39, -2, 37, -5, 36,
  ],
  [35, 31, 48, 30, 50, 26, 56, 25, 59, 22, 52, 16, 43, 13, 39, 21, 35, 28],
  [
    -17, 21, -10, 30, -6, 36, 10, 37, 11, 33, 20, 31, 32, 31, 34, 28, 43, 12, 51, 12, 47, 5, 40, -3,
    40, -15, 35, -24, 32, -29, 26, -34, 20, -35, 18, -32, 12, -17, 13, -6, 9, 4, -8, 4, -13, 8, -17,
    14,
  ],
  [44, -25, 48, -25, 50, -15, 49, -12, 44, -17],
  [
    114, -22, 122, -18, 130, -12, 137, -12, 141, -17, 146, -19, 153, -26, 150, -37, 141, -38, 135,
    -35, 130, -32, 115, -34, 114, -26,
  ],
  [-5, 50, 2, 51, 0, 54, -2, 57, -6, 58, -5, 55, -3, 54, -5, 52],
  [130, 31, 136, 34, 141, 38, 142, 43, 140, 41, 135, 36],
  [95, 5, 106, -6, 104, -6, 98, 0],
  [109, 1, 117, 7, 119, 1, 116, -4, 110, -3],
  [131, -1, 141, -3, 150, -10, 141, -9, 135, -4],
];
const CASP = [47, 45, 53, 47, 54, 42, 53, 37, 49, 37, 48, 41];
const W = 1280,
  H = 640;
const lm = document.createElement("canvas");
lm.width = W;
lm.height = H;
const lc = lm.getContext("2d");
const tr = (p, c) => {
  lc.fillStyle = c;
  lc.beginPath();
  for (let i = 0; i < p.length; i += 2) {
    const x = ((p[i] + 180) / 360) * W,
      y = ((90 - p[i + 1]) / 180) * H;
    i ? lc.lineTo(x, y) : lc.moveTo(x, y);
  }
  lc.closePath();
  lc.fill();
};
lc.fillStyle = "#000";
lc.fillRect(0, 0, W, H);
POLY.forEach((p) => tr(p, "#fff"));
tr(CASP, "#000");
const mask = lc.getImageData(0, 0, W, H).data;
const ST = [
  [-25, [18, 40, 150]],
  [-8, [100, 40, 170]],
  [8, [200, 30, 120]],
  [22, [235, 70, 40]],
  [34, [250, 160, 25]],
  [45, [255, 240, 70]],
];
const SA = [
  [-1, [60, 100, 220]],
  [0, [235, 235, 235]],
  [1, [250, 190, 80]],
  [2.5, [230, 70, 30]],
  [4, [120, 0, 30]],
];
const pal = (S, v) => {
  if (v <= S[0][0]) return S[0][1];
  for (let k = 1; k < S.length; k++) {
    if (v <= S[k][0]) {
      const [v0, c0] = S[k - 1],
        [v1, c1] = S[k],
        t = (v - v0) / (v1 - v0);
      return [
        c0[0] + (c1[0] - c0[0]) * t,
        c0[1] + (c1[1] - c0[1]) * t,
        c0[2] + (c1[2] - c0[2]) * t,
      ];
    }
  }
  return S[S.length - 1][1];
};
const mix = (c, d, t) => [
  c[0] + (d[0] - c[0]) * t,
  c[1] + (d[1] - c[1]) * t,
  c[2] + (d[2] - c[2]) * t,
];
const sm = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
let year = 2024,
  month = 7,
  layer = "t",
  timer = null;
const cur = () => Y.find((d) => d.y === year);
const A = () => (window.__aA != null ? window.__aA : (cur().a ?? 1.19));
function val(lat, lon, land, a) {
  const al = Math.abs(lat),
    s = (lat / 90) * 16 * Math.cos((2 * Math.PI * (month - 7)) / 12);
  const n = Math.sin(lon * 0.13 + lat * 0.2) * 0.6 + Math.sin(lon * 0.31 - lat * 0.17) * 0.4;
  const an = a * (1 + 1.6 * sm(35, 80, al));
  if (layer === "a") return an + 0.35 * n * a;
  const T = land
    ? 30 - 0.011 * lat * lat + s + 12 * Math.exp(-Math.pow((al - 25) / 10, 2)) + 3 * n
    : 27 - 0.0035 * lat * lat + 0.35 * s;
  return T + an;
}
const tc = document.createElement("canvas");
tc.width = W;
tc.height = H;
const tx = tc.getContext("2d"),
  img = tx.createImageData(W, H);
const isLand = (lat, i, j) => lat < -70 || mask[(j * W + i) * 4] > 127;
function paint() {
  const a = A(),
    S = layer === "t" ? ST : SA;
  for (let j = 0; j < H; j++) {
    const lat = 90 - ((j + 0.5) / H) * 180;
    for (let i = 0; i < W; i++) {
      const lon = ((i + 0.5) / W) * 360 - 180,
        land = isLand(lat, i, j);
      let c = pal(S, val(lat, lon, land, a));
      if (!land) c = mix(c, [8, 18, 45], layer === "t" ? 0.72 : 0.4);
      if (Math.abs((lon + 180) % 30) < 0.3 || Math.abs((lat + 90) % 30) < 0.3)
        c = mix(c, [255, 255, 255], 0.13);
      const k = (j * W + i) * 4;
      img.data[k] = c[0];
      img.data[k + 1] = c[1];
      img.data[k + 2] = c[2];
      img.data[k + 3] = 255;
    }
  }
  tx.putImageData(img, 0, 0);
  tex.needsUpdate = true;
}
const gl = document.getElementById("gl");
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
gl.appendChild(renderer.domElement);
const scene = new THREE.Scene(),
  cam = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
cam.position.z = 3.9;
const tex = new THREE.CanvasTexture(tc);
const globe = new THREE.Mesh(
  new THREE.SphereGeometry(1, 96, 64),
  new THREE.MeshBasicMaterial({ map: tex }),
);
globe.rotation.set(0.84, -2.79, 0);
scene.add(globe);
scene.add(
  new THREE.Mesh(
    new THREE.SphereGeometry(1.05, 64, 48),
    new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.1,
      side: THREE.BackSide,
    }),
  ),
);
const sp = new Float32Array(1500);
for (let i = 0; i < 500; i++) {
  const u = Math.random() * 6.283,
    v = Math.acos(2 * Math.random() - 1),
    r = 40;
  sp[i * 3] = r * Math.sin(v) * Math.cos(u);
  sp[i * 3 + 1] = r * Math.cos(v);
  sp[i * 3 + 2] = r * Math.sin(v) * Math.sin(u);
}
const sg = new THREE.BufferGeometry();
sg.setAttribute("position", new THREE.BufferAttribute(sp, 3));
scene.add(
  new THREE.Points(
    sg,
    new THREE.PointsMaterial({ color: 0xffffff, size: 0.12, sizeAttenuation: true }),
  ),
);
const fit = () => {
  const w = gl.clientWidth,
    h = gl.clientHeight;
  if (!w || !h) return;
  renderer.setSize(w, h);
  cam.aspect = w / h;
  cam.updateProjectionMatrix();
};
new ResizeObserver(fit).observe(gl);
fit();
const cv = renderer.domElement;
cv.style.touchAction = "none";
let drag = null;
const ray = new THREE.Raycaster(),
  mv = new THREE.Vector2(),
  rd = document.getElementById("rd");
cv.addEventListener("pointerdown", (e) => {
  drag = { x: e.clientX, y: e.clientY };
  cv.setPointerCapture(e.pointerId);
  cv.style.cursor = "grabbing";
});
cv.addEventListener("pointerup", () => {
  drag = null;
  cv.style.cursor = "grab";
});
cv.addEventListener("pointermove", (e) => {
  if (drag) {
    const k = (0.005 * cam.position.z) / 3.2;
    globe.rotation.y += (e.clientX - drag.x) * k;
    globe.rotation.x = Math.max(-1.55, Math.min(1.55, globe.rotation.x + (e.clientY - drag.y) * k));
    drag.x = e.clientX;
    drag.y = e.clientY;
    return;
  }
  const r = cv.getBoundingClientRect();
  mv.set(((e.clientX - r.left) / r.width) * 2 - 1, (-(e.clientY - r.top) / r.height) * 2 + 1);
  ray.setFromCamera(mv, cam);
  const h = ray.intersectObject(globe, false)[0];
  if (!h) {
    rd.textContent = "";
    return;
  }
  const lon = (h.uv.x - 0.5) * 360,
    lat = (h.uv.y - 0.5) * 180,
    i = Math.min(W - 1, Math.floor(h.uv.x * W)),
    j = Math.min(H - 1, Math.floor((1 - h.uv.y) * H));
  if (layer === "v" || window.__realT) {
    rd.textContent = `${f(Math.abs(lat), 1)}°${lat >= 0 ? "с.ш." : "ю.ш."}  ${f(Math.abs(lon), 1)}°${lon >= 0 ? "в.д." : "з.д."}`;
    return;
  }
  const v = val(lat, lon, isLand(lat, i, j), A());
  rd.textContent =
    `${f(Math.abs(lat), 1)}°${lat >= 0 ? "с.ш." : "ю.ш."}  ${f(Math.abs(lon), 1)}°${lon >= 0 ? "в.д." : "з.д."}  ·  ` +
    (layer !== "a" ? "≈ " + f(v, 1) + " °C (модель)" : "≈ " + (v >= 0 ? "+" : "") + f(v, 2) + " °C к 1951–1980 (модель)");
});
cv.addEventListener(
  "wheel",
  (e) => {
    e.preventDefault();
    cam.position.z = Math.max(1.5, Math.min(5, cam.position.z * (1 + e.deltaY * 0.001)));
  },
  { passive: false },
);
(function loop() {
  requestAnimationFrame(loop);
  renderer.render(scene, cam);
})();
const $ = (id) => document.getElementById(id);
function bars() {
  $("bars").innerHTML = Y.filter((d) => d.a != null)
    .map(
      (d) =>
        `<button class="bar${d.y === year ? " on" : ""}" data-y="${d.y}" data-h="${(d.a / 1.5) * 100}" title="${d.y}: +${f(d.a, 2)} °C" aria-label="${d.y}"><span>${String(d.y).slice(2)}</span></button>`,
    )
    .join("");
  $("bars").querySelectorAll("[data-h]").forEach((el) => { el.style.height = el.dataset.h + "%"; });
}
$("bars").addEventListener("click", (e) => {
  const b = e.target.closest(".bar");
  if (b) {
    year = +b.dataset.y;
    ui();
  }
});
function cbar() {
  const S = layer === "t" ? ST : SA,
    lo = S[0][0],
    hi = S[S.length - 1][0];
  $("cb").style.background =
    "linear-gradient(90deg," +
    S.map(([v, c]) => `rgb(${c.map(Math.round)}) ${((v - lo) / (hi - lo)) * 100}%`).join(",") +
    ")";
  $("cl").innerHTML =
    `<span>${lo}</span><span>${layer === "t" ? "°C" : "аномалия, °C"}</span><span>${hi}</span>`;
}
function ui() {
  const d = cur();
  $("ys").value = year;
  $("ms").value = month;
  $("yv").textContent = year;
  $("mv").textContent = MN[month - 1];
  $("dt").textContent = `01 ${MN[month - 1]} ${year}`;
  $("info").innerHTML =
    `<div class="yr">${year}</div><div class="rank">${d.r}</div><dl><dt>Аномалия</dt><dd>${d.a == null ? "данных за год ещё нет" : (d.ap ? "≈ " : "") + "+" + f(d.a, 2) + " °C"}</dd><dt>CO₂</dt><dd>${d.co2}</dd><dt>Уровень моря</dt><dd>${d.sl}</dd></dl><div class="ev">${d.ev}</div>`;
  bars();
  cbar();
  paint();
}
$("lt").onclick = () => {
  layer = "t";
  $("lt").classList.add("on");
  $("la").classList.remove("on");
  ui();
};
$("la").onclick = () => {
  layer = "a";
  $("la").classList.add("on");
  $("lt").classList.remove("on");
  ui();
};
$("ys").oninput = (e) => {
  year = +e.target.value;
  ui();
};
$("ms").oninput = (e) => {
  month = +e.target.value;
  ui();
};
$("play").onclick = () => {
  if (timer) {
    clearInterval(timer);
    timer = null;
    $("play").classList.remove("playing");
    return;
  }
  $("play").classList.add("playing");
  timer = setInterval(() => {
    year = year >= 2026 ? 2016 : year + 1;
    ui();
  }, 1500);
};
const n3h = (x, y, z) => {
  const s = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453;
  return s - Math.floor(s);
};
const L = (a, b, t) => a + (b - a) * t;
function n3(x, y, z) {
  const xi = Math.floor(x),
    yi = Math.floor(y),
    zi = Math.floor(z),
    u = x - xi,
    v = y - yi,
    w = z - zi,
    a = u * u * (3 - 2 * u),
    b = v * v * (3 - 2 * v),
    c = w * w * (3 - 2 * w);
  const g = (d) =>
    L(
      L(n3h(xi, yi, zi + d), n3h(xi + 1, yi, zi + d), a),
      L(n3h(xi, yi + 1, zi + d), n3h(xi + 1, yi + 1, zi + d), a),
      b,
    );
  return L(g(0), g(1), c);
}
const fb = (x, y, z) =>
  0.57 * n3(x, y, z) + 0.29 * n3(x * 2, y * 2, z * 2) + 0.14 * n3(x * 4, y * 4, z * 4);
{
  const src = mask.slice();
  for (let j = 0; j < H; j++)
    for (let i = 0; i < W; i++) {
      const dx =
          (n3(i * 0.0225, j * 0.0225, 0) +
            0.5 * n3(i * 0.06, j * 0.06, 3) +
            0.25 * n3(i * 0.2, j * 0.2, 5) -
            0.875) *
          16,
        dy =
          (n3(i * 0.0225, j * 0.0225, 7) +
            0.5 * n3(i * 0.06, j * 0.06, 11) +
            0.25 * n3(i * 0.2, j * 0.2, 9) -
            0.875) *
          16;
      const si = Math.max(0, Math.min(W - 1, Math.round(i + dx))),
        sj = Math.max(0, Math.min(H - 1, Math.round(j + dy)));
      mask[(j * W + i) * 4] = src[(sj * W + si) * 4];
    }
}
const HT = new Float32Array(W * H).fill(0.3),
  DN = new Float32Array(W * H);
const RG = [
  [31, 87, 14, 0.9],
  [-15, -69, 7, 0.85],
  [45, -112, 9, 0.6],
  [43, 80, 9, 0.55],
  [9, 38, 8, 0.45],
  [46, 10, 5, 0.4],
  [28, -8, 8, 0.3],
];
const DG = [
  [23, 12, 18, 0.55],
  [24, 45, 10, 0.5],
  [41, 95, 10, 0.5],
  [-25, 134, 14, 0.5],
  [41, 62, 8, 0.4],
  [-3, -62, 12, -0.5],
  [0, 23, 9, -0.5],
];
for (let j = 0; j < H; j++) {
  const lat = 90 - ((j + 0.5) / H) * 180,
    cl = Math.cos((lat * Math.PI) / 180),
    sl = Math.sin((lat * Math.PI) / 180);
  for (let i = 0; i < W; i++) {
    const lon = ((i + 0.5) / W) * 360 - 180,
      lr = (lon * Math.PI) / 180,
      x = cl * Math.cos(lr),
      z = cl * Math.sin(lr),
      k = j * W + i;
    let d = fb(x * 2 + 9, sl * 2, z * 2) * 0.8;
    if (lat < -70 || mask[k * 4] > 127) {
      let h = fb(x * 5, sl * 5, z * 5) * 0.6;
      RG.forEach(([la, lo, r, s]) => {
        const e = Math.hypot(lat - la, (lon - lo) * cl) / r;
        h += s * Math.exp(-e * e);
      });
      DG.forEach(([la, lo, r, s]) => {
        const e = Math.hypot(lat - la, (lon - lo) * cl) / r;
        d += s * Math.exp(-e * e);
      });
      HT[k] = h;
    }
    DN[k] = d;
  }
}
const cc = document.createElement("canvas");
cc.width = 512;
cc.height = 256;
const cx = cc.getContext("2d"),
  ci = cx.createImageData(512, 256);
for (let j = 0; j < 256; j++) {
  const lat = 90 - ((j + 0.5) / 256) * 180,
    cl = Math.cos((lat * Math.PI) / 180),
    sl = Math.sin((lat * Math.PI) / 180);
  for (let i = 0; i < 512; i++) {
    const lr = ((((i + 0.5) / 512) * 360 - 180) * Math.PI) / 180,
      c = fb(cl * Math.cos(lr) * 3.2 + 20, sl * 3.2, cl * Math.sin(lr) * 3.2),
      k = (j * 512 + i) * 4;
    ci.data[k] = ci.data[k + 1] = ci.data[k + 2] = 255;
    ci.data[k + 3] = Math.max(0, Math.min(1, (c - 0.5) * 3.4)) * 255;
  }
}
cx.putImageData(ci, 0, 0);
const cm = new THREE.MeshBasicMaterial({
  map: new THREE.CanvasTexture(cc),
  transparent: true,
  opacity: 0.3,
  depthWrite: false,
});
const clouds = new THREE.Mesh(new THREE.SphereGeometry(1.012, 64, 48), cm);
globe.add(clouds);
$("cld").onchange = (e) => {
  clouds.visible = e.target.checked;
};
const vs =
  "varying vec3 n;void main(){n=normalize(normalMatrix*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}";
scene.add(
  new THREE.Mesh(
    new THREE.SphereGeometry(1.003, 64, 48),
    new THREE.ShaderMaterial({
      vertexShader: vs,
      fragmentShader:
        "varying vec3 n;void main(){float d=1.-clamp(n.z,0.,1.);gl_FragColor=vec4(0.,.02,.08,pow(d,2.2)*.75);}",
      transparent: true,
      depthWrite: false,
    }),
  ),
);
scene.add(
  new THREE.Mesh(
    new THREE.SphereGeometry(1.18, 64, 48),
    new THREE.ShaderMaterial({
      vertexShader: vs,
      fragmentShader:
        "varying vec3 n;void main(){float c=clamp(-n.z,0.,1.);float i=min(pow(c*1.9,2.5),1.);gl_FragColor=vec4(.35,.62,1.,1.)*i*.9;}",
      transparent: true,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  ),
);
function paint() {
  const a = A(),
    S = layer === "t" ? ST : SA,
    vis = layer === "v",
    cs = Math.cos((2 * Math.PI * (month - 9)) / 12),
    ie = 74 + 6 * cs + (year - 2016) * 0.15,
    se = 65 - 7 * cs;
  const M = (x, y) =>
    mask[(Math.min(H - 1, Math.max(0, y)) * W + Math.min(W - 1, Math.max(0, x))) * 4] > 127;
  for (let j = 0; j < H; j++) {
    const lat = 90 - ((j + 0.5) / H) * 180,
      al = Math.abs(lat);
    for (let i = 0; i < W; i++) {
      const lon = ((i + 0.5) / W) * 360 - 180,
        k = j * W + i,
        land = lat < -70 || mask[k * 4] > 127;
      let c;
      if (vis) {
        if (land) {
          const h = HT[k],
            d = DN[k];
          if (al > 66 || (lat > 60 && lon > -75 && lon < -10) || h > 0.95) c = [236, 241, 248];
          else if (al > 55) c = [54, 84, 60];
          else if (al > 38) c = d > 0.46 ? [160, 150, 98] : [92, 120, 70];
          else if (al > 13)
            c = d > 0.62 ? [208, 178, 118] : d > 0.5 ? [158, 152, 84] : [84, 118, 62];
          else c = d > 0.62 ? [190, 170, 100] : [34, 92, 46];
          if (h > 0.6 && c[0] < 230) c = mix(c, [142, 130, 118], Math.min(1, (h - 0.6) * 2.2));
        } else {
          c = mix([8, 26, 72], [16, 66, 128], Math.cos((lat * Math.PI) / 180) * 0.7);
          if (M(i + 5, j) || M(i - 5, j) || M(i, j + 5) || M(i, j - 5))
            c = mix(c, [44, 126, 156], 0.7);
          const e = (DN[k] - 0.4) * 14;
          if ((lat > 0 && lat > ie + e) || (lat < 0 && lat < -se + e)) c = [226, 234, 244];
        }
      } else {
        c = pal(S, val(lat, lon, land, a));
        if (!land) c = mix(c, [8, 18, 45], layer === "t" ? 0.72 : 0.4);
        if (Math.abs((lon + 180) % 30) < 0.3 || Math.abs((lat + 90) % 30) < 0.3)
          c = mix(c, [255, 255, 255], 0.13);
      }
      if (land && i > 0 && i < W - 1 && j > 0 && j < H - 1) {
        const g = Math.max(
          0.7,
          Math.min(1.3, 1 + (HT[k - 1] - HT[k + 1] + HT[k - W] - HT[k + W]) * 30),
        );
        c = [c[0] * g, c[1] * g, c[2] * g];
      }
      const q = Math.sin(k * 12.9898) * 43758.5453,
        gr = 1 + (q - Math.floor(q) - 0.5) * (vis ? 0.1 : 0.04);
      img.data[k * 4] = c[0] * gr;
      img.data[k * 4 + 1] = c[1] * gr;
      img.data[k * 4 + 2] = c[2] * gr;
      img.data[k * 4 + 3] = vis ? 255 : land ? 200 : 150;
    }
  }
  tx.putImageData(img, 0, 0);
  tex.needsUpdate = true;
}
const LX = {
  v: "Так планета выглядит из космоса: снимок NASA Blue Marble. Белое на суше — ледники и снег (Гренландия, Антарктида), этот снимок 2004 года не меняется. Белое на океане у полюсов — морской лёд, он меняется по годам и месяцам. Нажмите «Перемотать» и посмотрите, как сжимается арктический лёд.",
  t: "Модельная иллюстрация, не снимок NASA: цвет считается по широте, сезону и глобальной аномалии года. Температура поверхности днём. Жёлтое и красное — жарко (например, пустыни), синее и фиолетовое — холодно. Попробуйте январь и июль: зима и лето меняются местами в северном и южном полушариях.",
  a: "Модельная иллюстрация, не снимок NASA. Аномалия — на сколько градусов здесь теплее, чем было в 1951–1980 годах: так учёные задают «обычную» температуру. Чем краснее, тем сильнее потеплело. К полюсам краснее: Арктика греется быстрее остальной планеты.",
};
const WHY = {
  2016: "Точка отсчёта десятилетия. +1,01 °C тогда был рекордом, а потом такие значения стали обычными. С этого года у нас есть Jason-3 для океана и OCO-2 для CO₂.",
  2017: "Рекорд не повторили, но год всё равно теплее 2015-го и любого года до него. Тем временем GRACE уходит на покой, и миссия-преемник уже готовится.",
  2018: "Даже самый прохладный год десятилетия (+0,82 °C) теплее рекорда 2014 года (+0,73 °C). Планка сдвинулась.",
  2019: "Пока температура колебалась, лёд тихо таял. Спутник, который взвешивает его по силе тяжести, замечает разницу там, где термометр её не увидит.",
  2020: "Второй раз за четыре года температура вышла на рекорд. Пандемия на время сократила выбросы, но CO₂ в воздухе всё равно вырос: он копится годами.",
  2021: "Небольшой спад не отменил тренда: год всё равно теплее 2014-го. Озоновая дыра напоминает, что восстановление идёт десятилетиями, а не годами.",
  2022: "Урок про хрупкость наблюдений: от одной станции на вулкане зависит ряд измерений CO₂ с 1958 года, а один подводный вулкан за минуты изменил химию стратосферы.",
  2023: "Скачок с +0,89 до +1,17 °C за один год. И первый год, когда дым канадских лесов спутники проследили до самой Европы.",
  2024: "Океан не просто теплеет, он расширяется. Поэтому уровень моря растёт даже без дополнительного таяния льда.",
  2025: "В заголовках писали «прохладнее, чем в 2024-м». Но год остался в тройке самых тёплых. Один год ещё не тренд.",
  2026: "Цифры ещё меняются: это среднее за январь–октябрь, а ноябрь и декабрь могут его поднять. Рекорд 2024-го (+1,28 °C) под вопросом: по оценке Carbon Brief, шанс его побить около 67%. Мощный Эль-Ниньо почти наверняка сделает рекордным 2027-й (около 96%).",
};
function ui() {
  const d = cur();
  $("ys").value = year;
  $("ms").value = month;
  $("yv").textContent = year;
  $("mv").textContent = MN[month - 1];
  $("dt").textContent = `01 ${MN[month - 1]} ${year}`;
  $("info").innerHTML =
    `<div class="yr">${year}</div><div class="rank">${d.r}</div><dl><dt>Аномалия</dt><dd>${d.a == null ? "данных за год ещё нет" : (d.ap ? "≈ " : "") + "+" + f(d.a, 2) + " °C"}</dd><dt>CO₂</dt><dd>${d.co2}</dd><dt>Уровень моря</dt><dd>${d.sl}</dd></dl><div class="ev">${d.ev}</div><div class="why"><b>Что это значит.</b> ${WHY[year]}</div>`;
  document
    .querySelectorAll(".lay")
    .forEach((b) => b.classList.toggle("on", b.id === { v: "lv", t: "lt", a: "la" }[layer]));
  $("lx").textContent = LX[layer];
  $("cbw").style.display = layer === "v" ? "none" : "";
  cm.opacity = layer === "v" ? 0.7 : 0.28;
  bars();
  cbar();
  paint();
}
[
  ["lv", "v"],
  ["lt", "t"],
  ["la", "a"],
].forEach(([id, l]) => {
  $(id).onclick = () => {
    layer = l;
    ui();
  };
});
let tgt = null;
const go = (lat, lon) => {
  tgt = {
    x: Math.max(-1.55, Math.min(1.55, (lat * Math.PI) / 180)),
    y: (-(90 + lon) * Math.PI) / 180,
  };
};
cv.addEventListener("pointerdown", () => {
  tgt = null;
});
(function an() {
  requestAnimationFrame(an);
  if (tgt) {
    let dy = tgt.y - globe.rotation.y;
    dy = Math.atan2(Math.sin(dy), Math.cos(dy));
    const dx = tgt.x - globe.rotation.x;
    globe.rotation.y += dy * 0.08;
    globe.rotation.x += dx * 0.08;
    if (Math.abs(dy) + Math.abs(dx) < 0.003) tgt = null;
  }
  clouds.rotation.y += 0.0003;
})();
const SS = [
  {
    b: "2022: вода в стратосфере",
    y: 2022,
    m: 1,
    l: "v",
    la: -20.5,
    lo: -175.4,
    t: "15 января вулкан Хунга-Тонга забросил в стратосферу около 146 Тг водяного пара, примерно 10% от всего, что там было. Заметил это Aura/MLS: он видит сквозь пепел.",
  },
  {
    b: "2023: канадский дым",
    y: 2023,
    m: 6,
    l: "a",
    la: 55,
    lo: -100,
    t: "Лето 2023: в Канаде сгорело около 17,6 млн га, 647% от нормы. VIIRS и индекс аэрозолей OMPS показали шлейф, дошедший до Западной Европы.",
  },
  {
    b: "Озоновая дыра",
    y: 2021,
    m: 9,
    l: "v",
    la: -85,
    lo: 0,
    t: "Каждую сентябрьскую весну над Антарктидой открывается озоновая дыра. Глубже всего за десять лет она была в 2021-м (минимум 92 е. Д.), меньше всего в 2019-м (16,4 млн км²).",
  },
  {
    b: "2024: океан раздулся",
    y: 2024,
    m: 7,
    l: "v",
    la: 0,
    lo: -150,
    t: "Океан забирает больше 90% лишнего тепла. В 2024-м уровень моря рос на 5,9 мм вместо ожидавшихся 4,3, в основном из-за расширения тёплой воды.",
  },
  {
    b: "Суша теряет воду",
    y: 2024,
    m: 7,
    l: "a",
    la: -10,
    lo: -55,
    t: "GRACE и GRACE-FO взвешивают воду по силе тяжести. С мая 2014 года пресной воды на суше стало меньше: за 2015–2023 на 1200 км³ ниже среднего 2002–2014.",
  },
  {
    b: "Арктика: сентябрь",
    y: 2020,
    m: 9,
    l: "v",
    la: 80,
    lo: 60,
    t: "2020: 3,74 млн км², второй минимум за всю историю наблюдений. К тому году 14 лет подряд (2007–2020) давали самые низкие минимумы спутниковой эпохи. Пролистайте годы до 2026-го.",
  },
  {
    b: "CO₂ без пауз",
    y: 2026,
    m: 5,
    l: "v",
    la: 19.5,
    lo: -155.6,
    t: "С Мауна-Лоа CO₂ растёт без остановок: около 408 ppm в мае 2016 года и 432 ppm в мае 2026-го. Со спутников то же самое видят OCO-2 и OCO-3.",
  },
  {
    b: "2026: супер-Эль-Ниньо",
    y: 2026,
    m: 9,
    l: "a",
    la: 0,
    lo: -140,
    t: "В сентябре 2026 года дневная температура воды в зоне Ниньо-3.4 побила рекорд. Основной всплеск мировой температуры ожидают в 2027-м.",
  },
];
$("stories").innerHTML = SS.map(
  (s, i) => `<button class="chip" data-i="${i}">${s.b}</button>`,
).join("");
$("stories").onclick = (e) => {
  const b = e.target.closest(".chip");
  if (!b) return;
  const s = SS[+b.dataset.i];
  year = s.y;
  month = s.m;
  layer = s.l;
  $("story").textContent = s.t;
  go(s.la, s.lo);
  ui();
};
const bc = document.createElement("canvas");
bc.width = W;
bc.height = H;
const bx = bc.getContext("2d"),
  bi = bx.createImageData(W, H);
const sc = document.createElement("canvas");
sc.width = W;
sc.height = H;
const sx = sc.getContext("2d"),
  si2 = sx.createImageData(W, H);
for (let k = 0; k < W * H; k++) {
  const lat = 90 - ((((k / W) | 0) + 0.5) / H) * 180,
    land = lat < -70 || mask[k * 4] > 127,
    v = land ? Math.max(0, Math.min(1, HT[k])) * 255 : 76,
    o = land ? 0 : 255,
    m = k * 4;
  bi.data[m] = bi.data[m + 1] = bi.data[m + 2] = v;
  bi.data[m + 3] = 255;
  si2.data[m] = si2.data[m + 1] = si2.data[m + 2] = o;
  si2.data[m + 3] = 255;
}
bx.putImageData(bi, 0, 0);
sx.putImageData(si2, 0, 0);
tex.anisotropy = 8;
globe.material = new THREE.MeshPhongMaterial({
  map: tex,
  emissive: 0xffffff,
  emissiveMap: tex,
  emissiveIntensity: 0.55,
  bumpMap: new THREE.CanvasTexture(bc),
  bumpScale: 0.05,
  specularMap: new THREE.CanvasTexture(sc),
  specular: new THREE.Color(0x5a7fa8),
  shininess: 30,
});
scene.add(new THREE.AmbientLight(0xffffff, 0.3));
const sun = new THREE.DirectionalLight(0xfff2dd, 0.8);
sun.position.set(-2.2, 1.4, 3);
cam.add(sun);
scene.add(cam);
let spin = true;
cv.addEventListener("pointerdown", () => {
  spin = false;
});
document.addEventListener("click", () => {
  spin = false;
});
(function sp() {
  requestAnimationFrame(sp);
  if (spin && !tgt && !drag) globe.rotation.y += 0.0007;
})();
const ML = { la: 19.5, lo: -155.6 },
  VB = { la: 34.7, lo: -120.6 };
const EVS = {
  2016: [
    {
      la: 0,
      lo: -62,
      t: "Эль-Ниньо и углерод тропиков",
      d: "Засуха 2015–2016 годов заставила тропические леса и почвы выбросить на ≈2,5 млрд т углерода больше обычного. Это увидел OCO-2.",
    },
    {
      ...VB,
      t: "Старт Jason-3",
      d: "17 января 2016 года, база Ванденберг (Калифорния). Спутник продолжил ряд высоты океана, который идёт с 1992 года.",
    },
    {
      ...ML,
      t: "Мауна-Лоа: около 407,6 ppm",
      d: "Главная станция измерения CO₂. В апреле 2016 года недельное значение было около 407,6 ppm, к 2026-му оно выросло до 432 ppm.",
    },
    {
      la: -80,
      lo: 0,
      t: "Озоновая дыра: 22,8 млн км²",
      d: "Максимальная площадь дыры по данным NASA Ozone Watch; минимум озона около 111 единиц Добсона.",
    },
    {
      la: 88,
      lo: 0,
      t: "Тепло на Северном полюсе",
      d: "Зимой 2016 года на Северном полюсе наблюдали необычно высокие температуры (разбор World Weather Attribution).",
    },
    {
      la: 26.9,
      lo: 72.4,
      t: "Рекордная жара в Индии",
      d: "19 мая 2016 года в Пхалауди (Раджастхан) было 51 °C: национальный рекорд Индии.",
    },
    {
      la: 68,
      lo: 70,
      t: "Ямал: жара и сибирская язва",
      d: "Лето 2016: аномальная жара на Ямале, вспышка сибирской язвы, пали тысячи оленей. Вспышку связывают с оттаиванием вечной мерзлоты.",
    },
  ],
  2017: [
    {
      la: 72,
      lo: -40,
      t: "Конец GRACE: Гренландия",
      d: "В октябре 2017 года закончилась миссия GRACE (2002–2017). По объединённому ряду GRACE и GRACE-FO Гренландия теряет около 264 Гт льда в год, это ≈0,8 мм подъёма уровня моря.",
    },
    {
      la: 38.5,
      lo: -122.7,
      t: "Пожар Tubbs",
      d: "Октябрь 2017 года, Калифорния: один из самых разрушительных пожаров штата. Очаги огня видны VIIRS, в том числе ночью.",
    },
    {
      la: -80,
      lo: 0,
      t: "Озоновая дыра: 19,6 млн км²",
      d: "Заметно меньше, чем в 2016-м. Минимум озона около 131 единицы Добсона.",
    },
    {
      la: 25,
      lo: 86,
      t: "Наводнения в Южной Азии",
      d: "Август 2017: муссонные паводки в Индии, Непале и Бангладеш. По данным ООН, погибло больше 1200 человек, пострадали десятки миллионов.",
    },
  ],
  2018: [
    {
      ...VB,
      t: "Старт GRACE-FO",
      d: "22 мая 2018 года. Два спутника продолжили ряд измерений массы воды и льда по силе тяжести, который идёт с 2002 года.",
    },
    {
      la: 39.8,
      lo: -121.6,
      t: "Пожар Camp Fire",
      d: "Ноябрь 2018, Калифорния: самый смертоносный пожар штата, погибли 85 человек. Дым хорошо виден на снимках VIIRS.",
    },
    {
      la: -80,
      lo: 0,
      t: "Озоновая дыра: 24,8 млн км²",
      d: "Минимум озона около 102 единиц Добсона. Дыра заметно больше прошлогодней.",
    },
    {
      la: 36,
      lo: 138,
      t: "Жара от США до Японии",
      d: "Летом 2018 года волны жары одновременно накрыли северное полушарие от США до Японии. Учёные заключили, что без изменения климата этого почти наверняка не было бы.",
    },
  ],
  2019: [
    {
      la: 72,
      lo: -40,
      t: "Гренландия: рекордная потеря льда",
      d: "В 2019 году, по данным GRACE-FO, остров потерял больше 500 Гт льда: примерно вдвое больше среднего темпа за 2002–2025 годы (около 264 Гт).",
    },
    {
      la: -33,
      lo: 150,
      t: "Пожары в Австралии",
      d: "Сезон с июня 2019 по май 2020: около 18,6 млн га, огонь и дым задели больше 80% австралийцев. Дым обошёл земной шар.",
    },
    {
      la: -80,
      lo: 0,
      t: "Самая маленькая дыра десятилетия",
      d: "16,4 млн км², минимум озона 142 е. Д. Причина: внезапное потепление стратосферы над Антарктидой.",
    },
    {
      la: 48,
      lo: 2.3,
      t: "Рекордная жара в Европе",
      d: "Конец июня 2019: рекорды во Франции, Швейцарии, Австрии, Германии, Чехии и Испании. В конце июля вторая волна по Западной Европе и Скандинавии.",
    },
    {
      la: 60,
      lo: 110,
      t: "Пожары в Сибири",
      d: "Лето 2019: режим ЧС в нескольких регионах Сибири и Дальнего Востока, горели миллионы гектаров тайги, дым накрывал города.",
    },
  ],
  2020: [
    {
      la: 82,
      lo: 120,
      t: "Арктика: второй минимум",
      d: "Сентябрь 2020: 3,74 млн км². Ниже было только в 2012 году (3,39 млн км²).",
    },
    {
      la: 39,
      lo: -122,
      t: "Рекордные пожары в Калифорнии",
      d: "Август–сентябрь 2020: больше 4 млн акров, рекорд штата. VIIRS видел фронт огня даже ночью.",
    },
    {
      la: -80,
      lo: 0,
      t: "Озоновая дыра: 24,8 млн км²",
      d: "Минимум озона 94 е. Д. Дыра была глубокой и продержалась до ноября.",
    },
    {
      ...VB,
      t: "Старт Sentinel-6 Michael Freilich",
      d: "21 ноября 2020 года, Ванденберг. Миссия названа в честь Майкла Фрейлиха, бывшего директора отдела наук о Земле NASA.",
    },
    {
      la: 67,
      lo: 134,
      t: "Жара в Сибири",
      d: "Сибирская жара 2020 года была бы почти невозможна без изменения климата (World Weather Attribution).",
    },
    {
      la: 69.4,
      lo: 88.2,
      t: "Норильск: разлив дизельного топлива",
      d: "29 мая 2020: из резервуара предприятия «Норникеля» вытекло больше 21 тыс. тонн дизельного топлива. Компания допустила, что причиной могло стать таяние вечной мерзлоты (Moscow Times).",
    },
  ],
  2021: [
    {
      la: 40,
      lo: -121,
      t: "Пожар Dixie",
      d: "Июль–октябрь 2021: почти миллион акров в Калифорнии, один из крупнейших пожаров в истории штата.",
    },
    {
      la: -80,
      lo: 0,
      t: "Самая глубокая озоновая дыра десятилетия",
      d: "Минимум озона 92 е. Д., максимум площади 24,8 млн км².",
    },
    {
      la: 50,
      lo: -122,
      t: "«Тепловой купол» в Северной Америке",
      d: "Конец июня 2021: в Литтоне (Канада) было 49,6 °C, национальный рекорд.",
    },
    {
      la: 50.5,
      lo: 6.9,
      t: "Наводнение в Германии и Бельгии",
      d: "Июль 2021: ливни в долине Арв и вокруг, погибло больше 220 человек. World Weather Attribution: из-за потепления такие осадки стали заметно вероятнее.",
    },
    {
      la: 63,
      lo: 130,
      t: "Якутия: дым дошёл до Северного полюса",
      d: "Лето 2021: к 5 июля горело больше 250 пожаров на площади около 5720 км². По данным NASA, дым впервые в истории наблюдений достиг Северного полюса. К 12 августа сибирские пожары были больше всех остальных на планете вместе взятых.",
    },
  ],
  2022: [
    {
      la: -20.5,
      lo: -175.4,
      t: "Хунга-Тонга: вода в стратосфере",
      d: "15 января 2022. Aura/MLS увидел около 146 Тг водяного пара, примерно 10% от всего, что было в стратосфере.",
    },
    {
      ...ML,
      t: "Извержение Мауна-Лоа",
      d: "Ноябрь 2022: лава засыпала дорогу к обсерватории CO₂, измерения временно перенесли на соседнюю Мауна-Кеа.",
    },
    {
      la: -80,
      lo: 0,
      t: "Самая большая дыра десятилетия: 26,5 млн км²",
      d: "Максимум площади по NASA Ozone Watch; минимум озона около 97 е. Д.",
    },
    {
      la: 45,
      lo: 2,
      t: "Жара в Западной Европе",
      d: "Июнь 2022: рекордная волна жары, крупные пожары в Испании и Германии.",
    },
    {
      la: 27,
      lo: 68,
      t: "Наводнение в Пакистане",
      d: "Июнь–октябрь 2022: под водой оказалась примерно треть страны, около 246 тыс. км² в августе. Погибло больше 1700 человек, пострадали около 33 млн (Britannica). Усилили паводок аномальные муссонные ливни и вода от тающих ледников.",
    },
  ],
  2023: [
    {
      la: 55,
      lo: -100,
      t: "Рекордный сезон пожаров в Канаде",
      d: "К 22 сентября сгорело около 17,6 млн га, 647% от нормы (Natural Resources Canada). Квебек потерял около 5,2 млн га.",
    },
    {
      la: 47,
      lo: -30,
      t: "Дым над Атлантикой",
      d: "Сентябрь 2023: индекс аэрозолей OMPS по снимкам Suomi NPP показывает шлейф, идущий к Западной Европе.",
    },
    {
      la: -75,
      lo: -30,
      t: "Рекордно мало льда в Антарктике",
      d: "21 февраля 2023: минимум морского льда 1,79 млн км², самый низкий за всю историю наблюдений.",
    },
    {
      la: -80,
      lo: 0,
      t: "Озоновая дыра: 26,0 млн км²",
      d: "Одна из самых больших за десятилетие, минимум озона около 99 е. Д.",
    },
    {
      la: 41,
      lo: 26,
      t: "Лесной пожар в Греции (Эврос)",
      d: "Август 2023: около 94 тыс. га, крупнейший зафиксированный в Евросоюзе лесной пожар.",
    },
  ],
  2024: [
    {
      la: 0,
      lo: -150,
      t: "Океан: +5,9 мм за год",
      d: "Уровень моря вырос на 5,9 мм при ожидавшихся 4,3 мм, в основном из-за теплового расширения воды (NASA). С 1993 года океан поднялся примерно на 10 см.",
    },
    {
      ...ML,
      t: "Мауна-Лоа: 426,7 ppm",
      d: "Май 2024. Рост CO₂ за год стал рекордным: около 3,75 ppm.",
    },
    {
      la: -10,
      lo: -55,
      t: "Суша теряет воду",
      d: "GRACE-FO: с мая 2014 года пресной воды на суше стало меньше, за 2015–2023 на 1200 км³ ниже среднего 2002–2014. 13 из 30 сильнейших засух с января 2015-го.",
    },
    {
      la: -17,
      lo: -57,
      t: "Пожары в Пантанале",
      d: "Август 2024: жаркие, сухие и ветреные условия сделали пожары примерно на 40% сильнее из-за изменения климата.",
    },
    { la: -80, lo: 0, t: "Озоновая дыра: 22,4 млн км²", d: "Минимум озона около 107 е. Д." },
    {
      la: 37,
      lo: 15,
      t: "Смертельная жара в Средиземноморье",
      d: "Июль 2024: по анализу World Weather Attribution, такой жары не было бы без изменения климата.",
    },
    {
      la: 39.4,
      lo: -0.4,
      t: "Наводнение в Валенсии",
      d: "29 октября 2024: ливни в Восточной Испании, погибло больше 220 человек.",
    },
    {
      la: 51.2,
      lo: 58.6,
      t: "Паводок на Урале и в Казахстане",
      d: "5 апреля 2024 прорвало дамбу в Орске, затем пошли паводки в Оренбургской области, Тюмени, Томске и Казахстане. В Казахстане эвакуировали 96 472 человека (на 10 апреля). Худшее наводнение за несколько десятилетий.",
    },
  ],
  2025: [
    {
      la: 55,
      lo: -103,
      t: "Канада: второй по тяжести сезон",
      d: "К 11 августа сгорело больше 7,3 млн га, вдвое выше 10-летней нормы. Больше половины пришлось на Саскачеван и Манитобу.",
    },
    {
      la: -80,
      lo: 0,
      t: "Пятая по малости дыра с 1992 года",
      d: "Среднее за пик сезона 18,7 млн км²; максимум 22,9 млн км², минимум озона 127 е. Д. NASA и NOAA ждут восстановления озонового слоя в этом столетии.",
    },
    { ...ML, t: "Мауна-Лоа: 430,2 ppm", d: "Май 2025: сезонный пик CO₂ впервые превысил 430 ppm." },
    {
      la: 85,
      lo: 30,
      t: "Арктический лёд",
      d: "Рекордно низкий зимний максимум: 14,33 млн км². Минимум 10 сентября 4,60 млн км².",
    },
    {
      ...VB,
      t: "Старт Sentinel-6B",
      d: "Ноябрь 2025: второй спутник серии Sentinel-6 продолжит ряд высоты океана вместе с Sentinel-6 Michael Freilich.",
    },
    {
      la: 46,
      lo: 4,
      t: "Жара в Западной Европе",
      d: "Конец июня – начало июля 2025. По быстрой оценке Imperial College London и LSHTM, в 12 городах умерло около 2300 человек, из них около 1500 из-за потепления.",
    },
    {
      la: 52.5,
      lo: 160.3,
      t: "Камчатка: землетрясение M8,8",
      d: "30 июля 2025: одно из десяти сильнейших землетрясений за всю историю, сильнейшее с 2011 года. Юг Камчатки сдвинулся почти на 2 метра (предварительно), цунами повредило порт и рыбозавод в Северо-Курильске. Извергся вулкан Крашенинникова (впервые за 600 лет) и Ключевская Сопка. Погибших нет (Meduza).",
    },
  ],
  2026: [
    {
      la: 0,
      lo: -140,
      t: "Супер-Эль-Ниньо",
      d: "В сентябре дневной индекс Ниньо-3.4 побил рекорд, 18 октября он был около +3,5 °C к норме 1996–2025, выше пика 2015 года. Пик ожидают в декабре.",
    },
    {
      la: 85,
      lo: 60,
      t: "Арктика",
      d: "Зимний максимум льда 14,29 млн км² (15 марта), почти вровень с рекордно низким 2025-м. Сентябрьский минимум 4,6 млн км² (12 сентября): 10-й с конца.",
    },
    {
      ...ML,
      t: "Мауна-Лоа: 432 ppm",
      d: "Май 2026: новый рекорд концентрации CO₂, плюс 1,8 ppm за год.",
    },
    {
      la: -80,
      lo: 0,
      t: "Озоновая дыра 2026",
      d: "Площадь достигала примерно 27 млн км² (20 сентября, Sentinel-5P): одна из самых больших за много лет, хотя потеря озона не так глубока, как могла бы быть.",
    },
    {
      la: 44,
      lo: 3,
      t: "Рекордная жара и пожары в Европе",
      d: "Июнь 2026: Франция, Германия и Дания обновили абсолютные рекорды, 24 июня во Франции был самый жаркий день за всю историю. Во Франции из-за жары за неделю умерло около 2000 человек (оценка Santé publique France, вероятно занижена), в Испании в июне 1029. В начале июля в южной Франции эвакуировали почти 12 тысяч человек. World Weather Attribution: полвека назад такая жара была бы «практически невозможна».",
    },
    {
      la: 57.2,
      lo: 65.5,
      t: "Тюмень и Ямал: паводок и пожары",
      d: "Июнь–июль 2026: ежедневные дожди, река Тура поднялась до 8,96 м (рекорд 1979 года: 9,15 м), 28 июля в Тюмени ЧС. На севере области 30 июля введён режим ЧС из-за пожаров, к 12 августа горело больше 37 тыс. га тайги (Moscow Times, по данным Авиалесоохраны).",
    },
    {
      la: 62,
      lo: 110,
      t: "Россия: самый жаркий июль и пожары",
      d: "Июль 2026 стал самым жарким в России с начала наблюдений в 1891 году (метеорологи, Interfax). К 13 августа лесные пожары уничтожили больше 4 млн га леса, сильнее всего в Якутии и Красноярском крае (Авиалесоохрана).",
    },
  ],
};
const mk = new THREE.Group();
globe.add(mk);
const PV = (la, lo, r) => {
  const a = (la * Math.PI) / 180,
    b = (lo * Math.PI) / 180;
  return new THREE.Vector3(
    Math.cos(a) * Math.cos(b) * r,
    Math.sin(a) * r,
    -Math.cos(a) * Math.sin(b) * r,
  );
};
let sel = null;
const rings = [],
  hits = [];
function setMarkers() {
  while (mk.children.length) {
    const old = mk.children[0];
    mk.remove(old);
    old.traverse((o) => {
      if (o.geometry) o.geometry.dispose();
      if (o.material) o.material.dispose();
    });
  }
  rings.length = 0;
  hits.length = 0;
  (EVS[year] || []).forEach((e, i) => {
    const g = new THREE.Group(),
      p = PV(e.la, e.lo, 1.006),
      on = sel === i,
      col = on ? 0xffe14d : 0xff4d2e;
    g.position.copy(p);
    g.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), p.clone().normalize());
    g.add(
      new THREE.Mesh(
        new THREE.SphereGeometry(on ? 0.02 : 0.014, 16, 12),
        new THREE.MeshBasicMaterial({ color: col }),
      ),
    );
    const rm = new THREE.MeshBasicMaterial({
        color: col,
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
      ring = new THREE.Mesh(new THREE.RingGeometry(0.026, 0.034, 40), rm);
    g.add(ring);
    rings.push({ ring, rm, ph: i * 0.31 });
    const h = new THREE.Mesh(
      new THREE.SphereGeometry(0.045, 8, 6),
      new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false }),
    );
    h.userData.i = i;
    g.add(h);
    hits.push(h);
    mk.add(g);
  });
}
(function pl(t) {
  requestAnimationFrame(pl);
  rings.forEach(({ ring, rm, ph }) => {
    const f = ((t || 0) * 0.0008 + ph) % 1;
    ring.scale.setScalar(1 + f * 3);
    rm.opacity = 1 - f;
  });
})(0);
function evui() {
  const ev = EVS[year] || [];
  $("evl").innerHTML =
    ev
      .map((e, i) => `<button class="evb${sel === i ? " on" : ""}" data-i="${i}">${e.t}</button>`)
      .join("") || '<p class="lx">Для этого года отметок нет.</p>';
  $("evd").innerHTML = ev[sel]
    ? `<b>${ev[sel].t}</b><br>${ev[sel].d}`
    : "Нажмите на событие в списке или на красную отметку на глобусе.";
  setMarkers();
}
function pick(i) {
  sel = i;
  const e = EVS[year][i];
  go(e.la, e.lo);
  evui();
}
$("evl").onclick = (e) => {
  const b = e.target.closest(".evb");
  if (b) pick(+b.dataset.i);
};
let dn = null;
cv.addEventListener("pointerdown", (e) => {
  dn = { x: e.clientX, y: e.clientY };
});
cv.addEventListener("pointerup", (e) => {
  if (!dn) return;
  const mvd = Math.hypot(e.clientX - dn.x, e.clientY - dn.y);
  dn = null;
  if (mvd > 4) return;
  const r = cv.getBoundingClientRect();
  mv.set(((e.clientX - r.left) / r.width) * 2 - 1, (-(e.clientY - r.top) / r.height) * 2 + 1);
  ray.setFromCamera(mv, cam);
  const h = ray.intersectObjects([globe, ...hits], false)[0];
  if (h && h.object.userData.i != null) pick(h.object.userData.i);
});
const paint0 = paint;
let pq = 0;
paint = function () {
  if (pq) return;
  pq = requestAnimationFrame(() => {
    pq = 0;
    paint0();
  });
};
const ui0 = ui;
let ly = year;
ui = function () {
  if (year !== ly) {
    ly = year;
    sel = null;
  }
  ui0();
  evui();
};
document
  .querySelector(".note")
  .insertAdjacentHTML(
    "beforebegin",
    "<details><summary>Источники фактов</summary><p>NASA GISS (температура), NSIDC и NASA (морской лёд), NASA Ozone Watch и JPL (озон, Aura/MLS, Хунга-Тонга), JPL и NASA Earthdata (GRACE-FO, OCO, VIIRS, OMPS, Sentinel-6), Scripps и NOAA (CO₂), Natural Resources Canada, Carbon Brief, Copernicus и DLR, World Weather Attribution. Список не полный: это избранные факты, которые я смог подтвердить.</p></details>",
  );
const B64 = (s) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0)).buffer;
const EP = new Float32Array(
  B64(
    DATA.EP,
  ),
);
const eg = new THREE.BufferGeometry();
eg.setAttribute("position", new THREE.BufferAttribute(EP, 3));
eg.setAttribute("normal", new THREE.BufferAttribute(EP.slice(), 3));
eg.setAttribute(
  "uv",
  new THREE.BufferAttribute(
    new Float32Array(
      B64(
        DATA.EUV,
      ),
    ),
    2,
  ),
);
eg.setIndex(
  new THREE.BufferAttribute(
    new Uint16Array(
      B64(
        DATA.EIDX,
      ),
    ),
    1,
  ),
);
const WU = { uWT: { value: 0 } };
const WREDUCE = !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
function liveEarth(m) {
  try {
    m.onBeforeCompile = (sh) => {
      sh.uniforms.uWT = WU.uWT;
      sh.vertexShader = sh.vertexShader
        .replace(
          "#include <common>",
          "#include <common>\nvarying vec3 vWOP;varying vec3 vWX;varying vec3 vWY;varying vec3 vWZ;",
        )
        .replace(
          "#include <begin_vertex>",
          "#include <begin_vertex>\nvWOP=position;vWX=normalMatrix[0];vWY=normalMatrix[1];vWZ=normalMatrix[2];",
        );
      sh.fragmentShader = sh.fragmentShader
        .replace(
          "#include <common>",
          [
            "#include <common>",
            "uniform float uWT;",
            "varying vec3 vWOP;varying vec3 vWX;varying vec3 vWY;varying vec3 vWZ;",
            "float wPatch(vec3 p,float t){return .5+.5*sin(p.x*3.1+sin(p.y*2.7+t*.05)*1.7+t*.03)*sin(p.y*3.7+sin(p.z*2.3-t*.04)*1.5+p.x*.9);}",
            "vec3 wWaves(vec3 p,float t){",
            "p+=.018*vec3(sin(p.y*23.+t*.35),sin(p.z*29.-t*.3),sin(p.x*19.+t*.27));",
            "vec3 d1=normalize(vec3(.83,.31,.46));vec3 d2=normalize(vec3(-.42,.88,.22));vec3 d3=normalize(vec3(.15,-.57,.81));",
            "vec3 d4=normalize(vec3(-.74,-.2,.64));vec3 d5=normalize(vec3(.51,.69,-.52));",
            "return d1*(.075*cos(dot(p,d1)*38.+t*.9))+d2*(.065*cos(dot(p,d2)*63.+t*1.25+1.3))+d3*(.055*cos(dot(p,d3)*104.+t*1.7+2.1))",
            "+d4*(.045*cos(dot(p,d4)*171.+t*2.2+.7))+d5*(.035*cos(dot(p,d5)*268.+t*2.8+4.2));}",
          ].join("\n"),
        )
        .replace(
          "#include <map_fragment>",
          [
            "#include <map_fragment>",
            "vec3 wP=normalize(vWOP);",
            "float wR=diffuseColor.r,wG=diffuseColor.g,wB=diffuseColor.b;",
            "float wM=smoothstep(.015,.07,wB-wR)*(1.-smoothstep(.02,.08,wG-wB));",
            "float wL=(1.-wM)*(1.-smoothstep(.55,.8,min(wR,min(wG,wB))));",
            "float wCur=wPatch(wP*2.3+vec3(uWT*.010,-uWT*.006,0.),uWT*1.5);",
            "diffuseColor.rgb*=1.+wM*.17*(wCur-.5);",
            "diffuseColor.rgb+=wM*vec3(0.,.010,.018)*wCur;",
            "float wSh=wPatch(wP*3.4+vec3(uWT*.018,0.,uWT*.007),uWT*.8);",
            "diffuseColor.rgb*=1.-wL*.09*smoothstep(.55,.95,wSh);",
          ].join("\n"),
        )
        .replace(
          "#include <roughnessmap_fragment>",
          "#include <roughnessmap_fragment>\nroughnessFactor=mix(roughnessFactor,min(roughnessFactor,.42),wM);",
        )
        .replace(
          "#include <normal_fragment_maps>",
          [
            "#include <normal_fragment_maps>",
            "vec3 wg=wWaves(wP,uWT)*mix(.55,1.15,wPatch(wP*1.7+vec3(3.1),uWT*.6));",
            "vec3 wgv=wg.x*vWX+wg.y*vWY+wg.z*vWZ;",
            "wgv-=dot(wgv,normal)*normal;",
            "normal=normalize(normal-wgv*wM);",
          ].join("\n"),
        )
        .replace(
          "#include <emissivemap_fragment>",
          [
            "#include <emissivemap_fragment>",
            "float wCoast=wM*(1.-wM)*4.;",
            "totalEmissiveRadiance+=wCoast*(.5+.5*sin(uWT*1.4+wCur*9.))*vec3(.05,.12,.14);",
          ].join("\n"),
        );
    };
    m.needsUpdate = true;
  } catch (e) {
    console.warn("анимация воды не включилась:", e);
  }
}
let earth = null;
const ET = {};
function syncEarth() {
  const on = !!(earth && layer === "v");
  if (earth) {
    earth.visible = true;
    earth.scale.setScalar(0.996);
  }
  const m = globe.material;
  if (!m.transparent) {
    m.transparent = true;
    m.depthWrite = false;
    m.needsUpdate = true;
  }
  m.visible = layer !== "v";
  if (on) cm.opacity = 0.4;
}
function mkEarth() {
  if (!(ET.d && ET.n && ET.r)) return;
  const em = new THREE.MeshStandardMaterial({
    map: ET.d,
    normalMap: ET.n,
    roughnessMap: ET.r,
    roughness: 1,
    metalness: 0,
    emissive: 0xffffff,
    emissiveMap: ET.d,
    emissiveIntensity: 0.4,
  });
  liveEarth(em);
  earth = new THREE.Mesh(eg, em);
  globe.add(earth);
  syncEarth();
}
[
  [
    "d",
    DATA.TEX_D,
  ],
  [
    "n",
    DATA.TEX_N,
  ],
  [
    "r",
    DATA.TEX_R,
  ],
].forEach(([k, s]) => {
  const im = new Image();
  im.onload = () => {
    const t = new THREE.Texture(im);
    t.flipY = false;
    t.anisotropy = renderer.capabilities.getMaxAnisotropy();
    t.needsUpdate = true;
    ET[k] = t;
    mkEarth();
  };
  im.src = s;
});
const ui2 = ui;
ui = function () {
  ui2();
  syncEarth();
};
const LANDB =
  DATA.LANDB;
const SEP = {
  2016: 4.14,
  2017: 4.64,
  2018: 4.59,
  2019: 4.15,
  2020: 3.74,
  2021: 4.72,
  2022: 4.67,
  2023: 4.23,
  2024: 4.28,
  2025: 4.6,
  2026: 4.6,
};
const MAR = {
  2016: 14.5,
  2017: 14.41,
  2018: 14.5,
  2019: 14.8,
  2020: 15.0,
  2021: 14.8,
  2022: 14.9,
  2023: 14.6,
  2024: 15.0,
  2025: 14.33,
  2026: 14.29,
};
const lerpY = (T, y) => {
  const a = Math.max(2016, Math.min(2026, Math.floor(y))),
    b = Math.min(2026, a + 1);
  return T[a] + (T[b] - T[a]) * (y - a);
};
const extA = (y, m) => {
  const s = (1 + Math.cos((2 * Math.PI * (m - 3)) / 12)) / 2,
    lo = lerpY(SEP, y);
  return lo + (lerpY(MAR, y) - lo) * s;
};
const extS = (m) => 2.3 + (15.1 * (1 + Math.cos((2 * Math.PI * (m - 9)) / 12))) / 2;
const IW = 1024,
  IH = 512;
let OC = null,
  SN = null,
  SS_ = null;
const ic = document.createElement("canvas");
ic.width = IW;
ic.height = IH;
const ix = ic.getContext("2d"),
  iid = ix.createImageData(IW, IH);
const itex = new THREE.CanvasTexture(ic);
itex.anisotropy = 8;
const ice = new THREE.Mesh(
  new THREE.SphereGeometry(1.0025, 96, 64),
  new THREE.MeshStandardMaterial({
    map: itex,
    transparent: true,
    depthWrite: false,
    roughness: 0.55,
    metalness: 0,
    emissive: 0xffffff,
    emissiveMap: itex,
    emissiveIntensity: 0.4,
  }),
);
ice.visible = false;
globe.add(ice);
function prep(north) {
  const s = [],
    k = [],
    w = [];
  for (let j = 0; j < IH; j++) {
    const lat = 90 - ((j + 0.5) / IH) * 180;
    if (north ? lat < 45 : lat > -45) continue;
    for (let i = 0; i < IW; i++) {
      const q = j * IW + i;
      if (!OC[q]) continue;
      const n = (DN[((j * 1.25) | 0) * 1280 + ((i * 1.25) | 0)] - 0.4) * 14;
      k.push(q);
      s.push(Math.abs(lat) + n);
      w.push(0.001528 * Math.cos((lat * Math.PI) / 180));
    }
  }
  const o = Array.from(s.keys()).sort((a, b) => s[b] - s[a]),
    cum = new Float64Array(o.length),
    sv = new Float32Array(o.length);
  let c = 0;
  o.forEach((t, u) => {
    c += w[t];
    cum[u] = c;
    sv[u] = s[t];
  });
  return { k, s, cum, sv };
}
function thr(P, E) {
  let lo = 0,
    hi = P.cum.length - 1;
  while (lo < hi) {
    const m = (lo + hi) >> 1;
    P.cum[m] < E ? (lo = m + 1) : (hi = m);
  }
  return P.sv[lo];
}
function paintIce(EA, m) {
  if (!SN) return;
  const d = iid.data;
  d.fill(0);
  [
    [SN, thr(SN, EA)],
    [SS_, thr(SS_, extS(m))],
  ].forEach(([P, t]) => {
    for (let u = 0; u < P.k.length; u++) {
      const a = Math.max(0, Math.min(1, (P.s[u] - t) / 1.3 + 0.3));
      if (a > 0) {
        const q = P.k[u] * 4;
        d[q] = 238;
        d[q + 1] = 245;
        d[q + 2] = 252;
        d[q + 3] = a * 240;
      }
    }
  });
  ix.putImageData(iid, 0, 0);
  itex.needsUpdate = true;
}
{
  const im = new Image();
  im.onload = () => {
    const c = document.createElement("canvas");
    c.width = IW;
    c.height = IH;
    const x = c.getContext("2d");
    x.drawImage(im, 0, 0);
    const D = x.getImageData(0, 0, IW, IH).data;
    OC = new Uint8Array(IW * IH);
    for (let q = 0; q < OC.length; q++) OC[q] = D[q * 4] < 128 ? 1 : 0;
    SN = prep(true);
    SS_ = prep(false);
    for (let j = 0; j < H; j++)
      for (let i = 0; i < W; i++)
        mask[(j * W + i) * 4] = OC[(((j * IH) / H) | 0) * IW + (((i * IW) / W) | 0)] ? 0 : 255;
    ui();
  };
  im.src = LANDB;
}
let tlOn = false,
  tlSv = null;
const TLT = "Перемотка льда · 10 с";
function iceSync() {
  const on = !!(earth && layer === "v" && SN);
  ice.visible = on;
  if (on && !tlOn) paintIce(extA(window.__yA != null ? window.__yA : year, month), month);
}
const ui3 = ui;
ui = function () {
  ui3();
  iceSync();
};
function tlStop() {
  tlOn = false;
  $("tl").textContent = TLT;
  $("tlh").style.display = "none";
  if (tlSv) {
    clouds.visible = tlSv.cl;
    month = tlSv.m;
    year = tlSv.y;
    cam.position.z = tlSv.z;
  }
  ui();
}
$("tl").onclick = () => {
  if (tlOn) {
    tlStop();
    return;
  }
  if (!SN || !earth) {
    $("tl").textContent = "Карта ещё загружается…";
    setTimeout(() => {
      $("tl").textContent = TLT;
    }, 1500);
    return;
  }
  tlOn = true;
  tlSv = { cl: clouds.visible, m: month, y: year, z: cam.position.z };
  $("tl").textContent = "Остановить";
  layer = "v";
  month = 9;
  clouds.visible = false;
  spin = false;
  cam.position.z = 2.4;
  go(86, 60);
  year = 2016;
  ui();
  ice.visible = true;
  const t0 = performance.now(),
    dur = 10000;
  let last = 0;
  (function st(now) {
    if (!tlOn) return;
    const fr = Math.min(1, (now - t0) / dur),
      yf = 2016 + 10 * fr;
    if (now - last > 45 || fr === 1) {
      last = now;
      const e = lerpY(SEP, yf);
      paintIce(e, 9);
      $("tlh").style.display = "block";
      $("tlh").innerHTML =
        '<b class="tlb">' +
        Math.min(2026, Math.round(yf)) +
        "</b> · сентябрь<br>Лёд Арктики: <b>" +
        f(e, 2) +
        "</b> млн км²<br>На " +
        f(6.22 - e, 2) +
        " млн км² ниже среднего 1981–2010 (6,22), то есть −" +
        f((1 - e / 6.22) * 100, 0) +
        "%<br>Гренландия с 2016: ≈ −" +
        Math.round(264 * (yf - 2016)) +
        " Гт льда (по среднему темпу)";
    }
    if (fr < 1) requestAnimationFrame(st);
    else {
      tlOn = false;
      $("tl").textContent = TLT;
      year = 2026;
      clouds.visible = tlSv.cl;
      ui();
    }
  })(performance.now());
};
(function () {
  try {
    const V3 = THREE.Vector3;
    sun.position.set(-5.4, 2.2, 4.3);
    sun.intensity = 1;
    const amb = scene.children.find((o) => o.isAmbientLight);
    if (amb) {
      amb.intensity = 0.26;
      amb.color.set(0xdfe8ff);
    }
    const sunV = new V3(),
      U = {
        uSun: { value: sunV },
        uT: { value: 0 },
        uOp: { value: 0.5 },
        uCity: { value: null },
        uMap: { value: cm.map },
      };
    const setSun = () =>
      sunV.set(sun.position.x, sun.position.y, sun.position.z + cam.position.z).normalize();
    setSun();
    const VS =
      "varying vec3 vN;varying vec3 vP;varying vec2 vU;void main(){vN=normalize(normalMatrix*normal);vP=position;vU=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}";
    const mat = (fs, ex) =>
      new THREE.ShaderMaterial(
        Object.assign(
          {
            uniforms: U,
            vertexShader: VS,
            fragmentShader: fs,
            transparent: true,
            depthWrite: false,
          },
          ex || {},
        ),
      );
    const FS_SHADE =
      "uniform vec3 uSun;varying vec3 vN;void main(){float d=dot(normalize(vN),uSun);float n=1.-smoothstep(-.16,.14,d);gl_FragColor=vec4(.012,.026,.08,n*.74);}";
    const FS_CITY =
      "uniform sampler2D uCity;uniform vec3 uSun;uniform float uT;varying vec3 vN;varying vec3 vP;void main(){float d=dot(normalize(vN),uSun);float n=1.-smoothstep(-.12,.08,d);if(n<.01)discard;vec3 p=normalize(vP);vec2 uv=vec2(atan(-p.z,p.x)*.15915494+.5,asin(clamp(p.y,-1.,1.))*.31830989+.5);float c=texture2D(uCity,uv).r;float g=texture2D(uCity,uv,3.).r;float tw=.9+.1*sin(uT*1.6+uv.x*900.+uv.y*700.);gl_FragColor=vec4((vec3(1.,.74,.4)*c*1.8*tw+vec3(1.,.55,.22)*g*1.1)*n,1.);}";
    const FS_CLOUD =
      "uniform sampler2D uMap;uniform vec3 uSun;uniform float uOp;varying vec3 vN;varying vec2 vU;void main(){float a=texture2D(uMap,vU).a*uOp;float d=dot(normalize(vN),uSun);float lit=smoothstep(-.14,.34,d);float band=exp(-d*d/.012);vec3 col=mix(vec3(.05,.06,.1),vec3(1.),lit);col=mix(col,vec3(1.,.66,.46),band*.4*lit);gl_FragColor=vec4(col,a);}";
    const FS_CSH =
      "uniform sampler2D uMap;uniform vec3 uSun;uniform float uOp;varying vec3 vN;varying vec2 vU;void main(){float a=texture2D(uMap,vU+vec2(-.006,.004)).a*uOp;float d=dot(normalize(vN),uSun);gl_FragColor=vec4(0.,.01,.03,a*.34*smoothstep(-.05,.3,d));}";
    const FS_ATM =
      "uniform vec3 uSun;varying vec3 vN;void main(){vec3 n=normalize(vN);float c=clamp(-n.z,0.,1.);float i=min(pow(c*1.9,2.5),1.);float d=dot(n,uSun);float s=smoothstep(-.55,.55,d);float t=exp(-d*d/.05);vec3 col=mix(vec3(.28,.52,1.),vec3(1.,.5,.24),t*.75);gl_FragColor=vec4(col*i*(.1+.95*s),1.);}";
    const SG = (r) => new THREE.SphereGeometry(r, 96, 64);
    const shade = new THREE.Mesh(SG(1.0035), mat(FS_SHADE));
    shade.renderOrder = -2;
    const lights = new THREE.Mesh(SG(1.0038), mat(FS_CITY, { blending: THREE.AdditiveBlending }));
    lights.renderOrder = -1;
    const csh = new THREE.Mesh(SG(1.0055), mat(FS_CSH));
    csh.renderOrder = -1;
    ice.renderOrder = -3;
    globe.add(shade, lights, csh);
    const cloudMat = mat(FS_CLOUD);
    clouds.material = cloudMat;
    const atm = new THREE.Mesh(
      new THREE.SphereGeometry(1.16, 64, 48),
      mat(FS_ATM, { blending: THREE.AdditiveBlending, side: THREE.BackSide }),
    );
    scene.add(atm);
    const og = scene.children.find(
      (o) => o.geometry && o.geometry.parameters && o.geometry.parameters.radius === 1.18,
    );
    if (og) og.visible = false;

    const os = scene.children.find((o) => o.isPoints);
    if (os) os.visible = false;
    const NS = 2600,
      sp2 = new Float32Array(NS * 3),
      sc2 = new Float32Array(NS * 3);
    for (let i = 0; i < NS; i++) {
      const u = Math.random() * 6.2832,
        v = Math.acos(2 * Math.random() - 1),
        b = 0.25 + 0.75 * Math.pow(Math.random(), 3),
        t = Math.random();
      sp2[i * 3] = 45 * Math.sin(v) * Math.cos(u);
      sp2[i * 3 + 1] = 45 * Math.cos(v);
      sp2[i * 3 + 2] = 45 * Math.sin(v) * Math.sin(u);
      sc2[i * 3] = b * (0.8 + 0.2 * t);
      sc2[i * 3 + 1] = b * 0.9;
      sc2[i * 3 + 2] = b * (1 - 0.25 * t);
    }
    const sg2 = new THREE.BufferGeometry();
    sg2.setAttribute("position", new THREE.BufferAttribute(sp2, 3));
    sg2.setAttribute("color", new THREE.BufferAttribute(sc2, 3));
    const stars = new THREE.Points(
      sg2,
      new THREE.PointsMaterial({
        size: 0.07,
        sizeAttenuation: true,
        vertexColors: true,
        transparent: true,
        depthWrite: false,
      }),
    );
    scene.add(stars);

    const CITIES = [
      [40, -75, 6, 1],
      [34, -84, 4, 0.5],
      [41.5, -87.5, 4, 0.7],
      [34, -118, 3, 0.7],
      [37.7, -122.3, 2, 0.45],
      [29.7, -95.4, 3, 0.5],
      [32.8, -96.8, 3, 0.5],
      [25.8, -80.2, 2, 0.45],
      [43.7, -79.4, 3, 0.5],
      [47.6, -122.3, 2, 0.3],
      [39.7, -105, 2, 0.25],
      [33.4, -112, 2, 0.3],
      [19.4, -99.1, 3, 0.7],
      [9, -79.5, 2, 0.2],
      [-23.5, -46.6, 4, 0.9],
      [-22.9, -43.2, 2.5, 0.5],
      [-34.6, -58.4, 3, 0.7],
      [-33.5, -70.7, 2, 0.4],
      [-12, -77, 2, 0.4],
      [4.7, -74.1, 2.5, 0.5],
      [10.5, -66.9, 2, 0.3],
      [-15.8, -47.9, 2, 0.25],
      [-3.7, -38.5, 2, 0.2],
      [-8, -35, 2, 0.2],
      [51.5, 0, 4, 0.9],
      [48.9, 2.3, 3, 0.8],
      [50.5, 7, 5, 1],
      [52.5, 13.4, 3, 0.5],
      [45.5, 9.2, 4, 0.7],
      [41.9, 12.5, 3, 0.5],
      [40.4, -3.7, 3, 0.5],
      [41.4, 2.2, 2, 0.4],
      [59.9, 30.3, 3, 0.3],
      [55.7, 37.6, 4, 0.7],
      [50.4, 30.5, 3, 0.3],
      [52.2, 21, 3, 0.4],
      [48.2, 16.4, 3, 0.3],
      [44.4, 26.1, 3, 0.3],
      [38, 23.7, 2.5, 0.3],
      [41, 29, 3, 0.5],
      [59.3, 18, 2.5, 0.25],
      [60, 11, 2, 0.15],
      [30, 31.2, 3, 0.8],
      [6.5, 3.4, 3, 0.6],
      [-26.2, 28, 3, 0.5],
      [-33.9, 18.4, 2, 0.25],
      [-1.3, 36.8, 2, 0.25],
      [9, 38.7, 2, 0.25],
      [33.6, -7.6, 2.5, 0.3],
      [36.8, 3, 2, 0.3],
      [14.7, -17.4, 2, 0.2],
      [5.3, -4, 2, 0.3],
      [-4.3, 15.3, 2, 0.3],
      [15.6, 32.5, 2, 0.2],
      [35.7, 51.4, 3, 0.6],
      [24.7, 46.7, 3, 0.4],
      [25.2, 55.3, 2, 0.4],
      [33.3, 44.4, 2.5, 0.4],
      [32, 35, 2, 0.5],
      [28.6, 77.2, 5, 1],
      [19.1, 72.9, 3, 0.9],
      [22.6, 88.4, 4, 0.9],
      [13, 80.3, 3, 0.5],
      [12.9, 77.6, 3, 0.5],
      [17.4, 78.5, 3, 0.4],
      [23, 72.6, 3, 0.4],
      [24.9, 67, 3, 0.5],
      [31.5, 74.3, 3, 0.6],
      [23.8, 90.4, 3, 0.7],
      [39.9, 116.4, 4, 1],
      [31.2, 121.5, 4, 1.1],
      [23.1, 113.3, 4, 1.1],
      [30.6, 114.3, 3, 0.5],
      [30.6, 104, 3, 0.5],
      [34.3, 108.9, 3, 0.4],
      [22.5, 114, 2, 0.6],
      [37.6, 127, 3, 0.9],
      [35.7, 139.7, 3, 1.2],
      [34.7, 135.5, 3, 0.8],
      [35.2, 129, 2, 0.4],
      [25, 121.5, 2, 0.6],
      [36, 117, 4, 0.5],
      [32, 119, 3, 0.6],
      [41.8, 123.4, 3, 0.5],
      [-6.2, 106.8, 3, 0.9],
      [14.6, 121, 3, 0.7],
      [13.8, 100.5, 3, 0.6],
      [10.8, 106.7, 3, 0.6],
      [21, 105.8, 3, 0.5],
      [3.1, 101.7, 3, 0.5],
      [1.3, 103.8, 1.5, 0.5],
      [-7.3, 112.7, 2, 0.5],
      [16.8, 96.2, 2, 0.3],
      [-33.9, 151.2, 3, 0.5],
      [-37.8, 145, 2.5, 0.4],
      [-27.5, 153, 2, 0.2],
      [-31.9, 115.9, 2, 0.2],
      [-36.8, 174.8, 2, 0.2],
      [43.2, 76.9, 2.5, 0.25],
      [51.2, 71.4, 2, 0.15],
      [41.3, 69.2, 2.5, 0.3],
      [40.4, 49.9, 2, 0.25],
      [56, 44, 2, 0.2],
      [56.8, 60.6, 2, 0.2],
      [55, 83, 2, 0.2],
      [55.8, 49, 2, 0.12],
      [45, 10, 14, 0.07],
      [30, 110, 12, 0.07],
      [24, 80, 10, 0.09],
      [38, -90, 12, 0.06],
      [-22, -48, 6, 0.06],
      [5, 6, 6, 0.06],
    ];
    const cityCv = document.createElement("canvas");
    cityCv.width = 1024;
    cityCv.height = 512;
    const cityTex = new THREE.CanvasTexture(cityCv);
    cityTex.anisotropy = 4;
    U.uCity.value = cityTex;
    let cityOK = false;
    function buildCity() {
      const cw = 1024,
        ch = 512,
        acc = new Float32Array(cw * ch),
        cx3 = cityCv.getContext("2d"),
        im3 = cx3.createImageData(cw, ch),
        d = im3.data;
      CITIES.forEach(([la, lo, r, s]) => {
        const cl = Math.max(0.25, Math.cos((la * Math.PI) / 180)),
          wx = Math.ceil((((2.6 * r) / cl) * cw) / 360),
          wy = Math.ceil((2.6 * r * ch) / 180),
          ci3 = Math.round(((lo + 180) / 360) * cw),
          cj = Math.round(((90 - la) / 180) * ch);
        for (let j = Math.max(0, cj - wy); j <= Math.min(ch - 1, cj + wy); j++) {
          const lat = 90 - ((j + 0.5) / ch) * 180,
            cl2 = Math.cos((lat * Math.PI) / 180);
          for (let di = -wx; di <= wx; di++) {
            const i = (((ci3 + di) % cw) + cw) % cw,
              lon = ((i + 0.5) / cw) * 360 - 180;
            let dl = lon - lo;
            dl = ((dl + 540) % 360) - 180;
            const e = Math.hypot(lat - la, dl * cl2) / r;
            acc[j * cw + i] += s * Math.exp(-e * e);
          }
        }
      });
      for (let j = 0; j < ch; j++)
        for (let i = 0; i < cw; i++) {
          const q = j * cw + i;
          let b = 0;
          if (!OC[q] && acc[q] > 0.02) {
            const n = n3(i * 0.35, j * 0.35, 13) * 0.6 + n3(i * 0.9, j * 0.9, 17) * 0.4,
              v = acc[q] * (0.35 + 1.3 * n),
              h = n3h(i, j, 1.7);
            b = v > 0.2 ? Math.min(1, Math.pow((v - 0.2) * 1.5, 1.3)) : 0;
            b *= h > 0.42 ? 0.7 + 0.3 * h : 0.28;
          }
          const o = q * 4;
          d[o] = d[o + 1] = d[o + 2] = b * 255;
          d[o + 3] = 255;
        }
      cx3.putImageData(im3, 0, 0);
      cityTex.needsUpdate = true;
      cityOK = true;
    }

    const CW = 1024,
      CH = 512,
      cloudCv = document.createElement("canvas");
    cloudCv.width = CW;
    cloudCv.height = CH;
    const ccx = cloudCv.getContext("2d"),
      cimg = ccx.createImageData(CW, CH);
    let crow = 0;
    function cloudRows(n) {
      const end = Math.min(CH, crow + n);
      for (let j = crow; j < end; j++) {
        const lat = 90 - ((j + 0.5) / CH) * 180,
          cl = Math.cos((lat * Math.PI) / 180),
          sl = Math.sin((lat * Math.PI) / 180),
          al = Math.abs(lat),
          bv =
            0.1 * Math.exp(-Math.pow((al - 4) / 9, 2)) +
            0.09 * Math.exp(-Math.pow((al - 55) / 11, 2)) -
            0.12 * Math.exp(-Math.pow((al - 27) / 9, 2));
        for (let i = 0; i < CW; i++) {
          const lr = ((((i + 0.5) / CW) * 360 - 180) * Math.PI) / 180,
            px = cl * Math.cos(lr),
            pz = cl * Math.sin(lr),
            w1 = fb(px * 1.7 + 31, sl * 1.7 + 7, pz * 1.7 + 13) - 0.5,
            w2 = fb(px * 1.7 + 5, sl * 1.7 + 41, pz * 1.7 + 23) - 0.5,
            c =
              fb(px * 3.6 + w1 * 1.8 + 20, sl * 3.6 + w2 * 1.8, pz * 3.6 + w1 * 1.3) +
              bv +
              (n3(px * 15, sl * 15, pz * 15) - 0.5) * 0.12,
            a = Math.max(0, Math.min(1, (c - 0.5) * 3)),
            k = (j * CW + i) * 4;
          cimg.data[k] = cimg.data[k + 1] = cimg.data[k + 2] = 255;
          cimg.data[k + 3] = a * 255;
        }
      }
      crow = end;
      if (crow >= CH) {
        ccx.putImageData(cimg, 0, 0);
        const t = new THREE.CanvasTexture(cloudCv);
        t.anisotropy = 4;
        U.uMap.value = t;
      }
    }

    let fr = 0;
    const dead = {};
    const bad = (m) => {
      try {
        const p = renderer.properties.get(m.material).currentProgram;
        return !!(p && p.diagnostics && p.diagnostics.runnable === false);
      } catch (e) {
        return false;
      }
    };
    (function live(t) {
      requestAnimationFrame(live);
      U.uT.value = (t || 0) * 0.001;
      WU.uWT.value = WREDUCE ? 0 : (t || 0) * 0.001;
      setSun();
      U.uOp.value = cm.opacity;
      if (!cityOK && OC) buildCity();
      if (crow < CH) cloudRows(10);
      if (earth && !earth.userData.tuned) {
        earth.userData.tuned = 1;
        const m = earth.material;
        m.emissiveIntensity = 0.16;
        m.normalScale.set(1.4, 1.4);
      }
      const v = layer === "v" && !!earth;
      shade.visible = !dead.shade && v;
      lights.visible = !dead.lights && v && cityOK;
      csh.visible = !dead.csh && v && clouds.visible;
      csh.rotation.y = clouds.rotation.y;
      stars.rotation.y += 0.00003;
      if (fr < 90 && ++fr === 90) {
        if (bad(shade)) {
          dead.shade = 1;
          shade.visible = false;
        }
        if (bad(lights)) {
          dead.lights = 1;
          lights.visible = false;
        }
        if (bad(csh)) {
          dead.csh = 1;
          csh.visible = false;
        }
        if (bad(atm)) {
          atm.visible = false;
          if (og) og.visible = true;
        }
        if (bad(clouds)) clouds.material = cm;
      }
    })(0);
  } catch (e) {
    console.warn("оживление планеты не включилось:", e);
  }
})();

(function () {
  const h = $("hero");
  if (!h) return;
  const seen = (() => {
    try {
      return sessionStorage.getItem("heroSeen");
    } catch (e) {
      return null;
    }
  })();
  const count = () =>
    document.querySelectorAll("#hero .cnt").forEach((el) => {
      const to = +el.dataset.to,
        from = +el.dataset.from || 0,
        t0 = performance.now();
      (function st(t) {
        const k = Math.min(1, (t - t0) / 1400),
          e = 1 - Math.pow(1 - k, 3);
        el.textContent = Math.round(from + (to - from) * e);
        if (k < 1) requestAnimationFrame(st);
      })(t0);
    });
  const close = (cb) => {
    h.classList.add("off");
    try {
      sessionStorage.setItem("heroSeen", "1");
    } catch (e) {}
    setTimeout(() => {
      spin = true;
      if (cb) cb();
    }, 350);
  };
  $("hero-go").onclick = () => close();
  $("hero-ice").onclick = () => close(() => $("tl").click());
  $("hero-st").innerHTML = SS.map(
    (s, i) => `<button class="chip" data-i="${i}">${s.b}</button>`,
  ).join("");
  $("hero-st").onclick = (e) => {
    const b = e.target.closest(".chip");
    if (b)
      close(() => {
        const c = document.querySelector('#stories .chip[data-i="' + b.dataset.i + '"]');
        if (c) c.click();
      });
  };
  $("reopen").onclick = () => {
    h.classList.remove("off");
    count();
    $("hero-go").focus();
  };
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !h.classList.contains("off")) close();
  });
  if (seen) h.classList.add("off");
  else {
    count();
    $("hero-go").focus();
  }
})();

layer = "v";
ui();