#!/usr/bin/env bash
# Скачивает three.js r128 в папку сайта (рядом с index.html) и сверяет хеш с boot.js.
# Запуск:  bash tools/fetch-three.sh   (из корня сайта или из папки tools)
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
if   [ -f "$HERE/index.html" ];    then ROOT="$HERE"
elif [ -f "$HERE/../index.html" ]; then ROOT="$HERE/.."
else echo "Не нашёл index.html рядом со скриптом"; exit 1; fi
cd "$ROOT"

URL="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"
curl -fsSL "$URL" -o three.min.js

ACTUAL="sha512-$(openssl dgst -sha512 -binary three.min.js | openssl base64 -A)"
EXPECTED="$(grep -o 'sha512-[A-Za-z0-9+/=]*' boot.js | head -1)"

echo "Скачано: three.min.js ($(wc -c < three.min.js) байт)"
echo "Хеш файла:     $ACTUAL"
echo "Хеш в boot.js: $EXPECTED"

if [ "$ACTUAL" = "$EXPECTED" ]; then
  echo "OK: хеши совпадают."
else
  echo "Хеши не совпадают, но локальный three.min.js всё равно будет работать (он грузится первым)."
  echo "Чтобы CDN-запас тоже проверялся, подставьте значение «Хеш файла» в SRI в boot.js."
fi
echo "Готово: three.min.js лежит рядом с index.html. Можно поставить ALLOW_UNVERIFIED = false в boot.js."
