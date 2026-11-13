#!/bin/zsh
cd -- "$(dirname -- "$0")"
if ! command -v node >/dev/null; then
  echo "Kalıcı kayıt için Node.js 24 veya üzeri gerekir. Kurulumsuz değerlendirme için index.html dosyasını açabilirsiniz."
  read -r '?Kapatmak için Enter: '
  exit 1
fi
exec node start.mjs
