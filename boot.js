(function () {
  "use strict";
  var files = ["three.min.js", "data.js", "globe.js", "enhance.js", "trend.js", "nasaimg.js", "live.js", "space.js", "popup.js"];

  // Источники three.js r128 по порядку: 1) локальный файл, 2) cdnjs с проверкой хеша (SRI),
  // 3) jsDelivr с тем же хешем, 4) те же CDN без проверки хеша (если хеш устарел или не совпал).
  // Пункт 4 включён, чтобы сайт гарантированно запускался. Когда положите three.min.js
  // рядом с index.html (bash fetch-three.sh), поставьте ALLOW_UNVERIFIED = false.
  var ALLOW_UNVERIFIED = true;
  var SRI = "sha512-dLxUelApnYxpLt6K2iomGngnHO83iUvZytA3YUTS6j5ZmdYpoFH2Yn5RS2WwWtVEQSRcA52Nv1NEZNlVmmuPnQ==";
  var CDNJS = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
  var JSDLV = "https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js";
  var THREE_SOURCES = [
    { src: "three.min.js" },
    { src: CDNJS, sri: SRI },
    { src: JSDLV, sri: SRI }
  ];
  if (ALLOW_UNVERIFIED) THREE_SOURCES.push({ src: CDNJS, loose: true }, { src: JSDLV, loose: true });

  function fail(msg) {
    var b = document.getElementById("boot");
    if (b) b.classList.add("done");           // убрать «крутилку», чтобы было видно сообщение
    var d = document.createElement("div");
    d.setAttribute("role", "alert");
    d.style.cssText = "position:fixed;left:0;right:0;top:0;z-index:99999;padding:14px 18px;background:#b3261e;color:#fff;font:16px/1.4 sans-serif;text-align:center";
    d.textContent = msg;
    document.body.appendChild(d);
  }

  function loadScript(o, ok, bad) {
    var s = document.createElement("script");
    s.src = o.src;
    if (o.sri) {
      s.integrity = o.sri;
      s.crossOrigin = "anonymous";
      s.referrerPolicy = "no-referrer";
    } else if (/^https:/.test(o.src)) {
      s.crossOrigin = "anonymous";
      s.referrerPolicy = "no-referrer";
    }
    s.onload = ok;
    s.onerror = function () { if (s.parentNode) s.parentNode.removeChild(s); bad(); };
    document.body.appendChild(s);
  }

  function loadThree(done) {
    var i = 0;
    (function tryNext() {
      if (typeof window.THREE !== "undefined" && window.THREE.REVISION) return done(true);
      if (i >= THREE_SOURCES.length) return done(false);
      var o = THREE_SOURCES[i++];
      loadScript(o, function () {
        if (typeof window.THREE !== "undefined" && window.THREE.REVISION) {
          if (o.loose && window.console) console.warn("three.js загружен без проверки хеша: " + o.src);
          done(true);
        } else tryNext();
      }, tryNext);
    })();
  }

  function next(i) {
    if (i >= files.length) {
      var b = document.getElementById("boot");
      if (b) b.classList.add("done");
      return;
    }
    if (files[i] === "three.min.js") {
      loadThree(function (ok) {
        if (ok) return next(i + 1);
        var hint = location.protocol === "file:"
          ? " Сайт открыт как файл (file://): запустите его через локальный сервер, например «python3 -m http.server» в папке сайта, и откройте http://localhost:8000."
          : "";
        fail("Не удалось загрузить three.js ни локально, ни с cdnjs/jsDelivr. Положите three.min.js (r128) рядом с index.html (bash fetch-three.sh) или проверьте интернет, VPN и блокировщики рекламы." + hint);
      });
      return;
    }
    var s = document.createElement("script");
    s.src = files[i];
    s.onload = function () { next(i + 1); };
    s.onerror = function () {
      fail("Не найден файл " + files[i] + ". Он должен лежать в одной папке с index.html." +
        (location.protocol === "file:" ? " Если файл на месте, откройте сайт через локальный сервер, а не двойным щелчком." : ""));
    };
    document.body.appendChild(s);
  }

  window.addEventListener("load", function () {
    if (!getComputedStyle(document.documentElement).getPropertyValue("--void").trim())
      fail("Не найден файл style.css. Он должен лежать в одной папке с index.html.");
  });
  requestAnimationFrame(function () { setTimeout(function () { next(0); }, 40); });
})();
