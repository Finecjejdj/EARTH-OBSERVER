// Прокси к api.nasa.gov: ключ хранится в переменной окружения NASA_API_KEY
// (Netlify → Site settings → Environment variables) и в браузер не попадает.
// Разрешены только заранее перечисленные запросы, произвольные адреса не проксируются.
const day = (back) => new Date(Date.now() - back * 864e5).toISOString().slice(0, 10);
const ROUTES = {
  flr: () => "DONKI/FLR?startDate=" + day(7) + "&endDate=" + day(0),
  cme: () => "DONKI/CME?startDate=" + day(7) + "&endDate=" + day(0),
  gst: () => "DONKI/GST?startDate=" + day(7) + "&endDate=" + day(0),
  epic: () => "EPIC/api/natural",
};

// кэш в памяти экземпляра: лишние параметры в адресе не расходуют лимит ключа NASA
const CACHE = new Map();
exports.ROUTES = ROUTES;
exports.handler = async (event) => {
  const t = ((event.queryStringParameters || {}).t || "").toLowerCase();
  const json = (code, body, cache) => ({
    statusCode: code,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": cache || "no-store" },
    body: JSON.stringify(body),
  });
  if (event.httpMethod && event.httpMethod !== "GET") return json(405, { error: "method" });
  if (!Object.prototype.hasOwnProperty.call(ROUTES, t)) return json(400, { error: "unknown" });
  const key = process.env.NASA_API_KEY;
  if (!key) return json(503, { error: "not_configured" });
  const hit = CACHE.get(t);
  if (hit && Date.now() - hit.at < 5 * 60e3) return json(200, hit.data, "public, max-age=300, s-maxage=600");
  const path = ROUTES[t]();
  const url = "https://api.nasa.gov/" + path + (path.includes("?") ? "&" : "?") + "api_key=" + encodeURIComponent(key);
  try {
    const r = await fetch(url, { headers: { Accept: "application/json" } });
    if (!r.ok) return json(502, { error: "upstream", status: r.status });
    const data = await r.json();
    CACHE.set(t, { at: Date.now(), data });
    return json(200, data, "public, max-age=300, s-maxage=600");
  } catch (e) {
    return json(502, { error: "upstream" }); // текст ошибки не отдаём: в нём мог бы оказаться адрес с ключом
  }
};
