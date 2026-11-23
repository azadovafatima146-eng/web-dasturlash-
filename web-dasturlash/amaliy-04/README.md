# TexnoDokon — 4-amaliy ish

**Mavzu:** elektronika do'koni (quloqchin, smartfon, noutbuk, aksessuarlar).

## Qo'shilgan imkoniyatlar
- 12 ta mahsulotdan iborat massiv (`js/data.js`)
- Statistika: jami soni, o'rtacha narx, eng qimmat mahsulot
- Kartalarni JS orqali yaratish (createElement, textContent)
- Qidiruv, kategoriya filtri, saralash (birgalikda ishlaydi), "Hech narsa topilmadi" xabari
- Modal oyna (×, fon va Escape bilan yopiladi), event delegation
- Aloqa formasi tekshiruvi (bo'sh maydon, email, +998XXXXXXXXX, matn uzunligi)
- Tungi rejim (localStorage'da saqlanadi)

## Massiv metodlari qayerda
- `reduce` — `js/katalog.js` (jami, o'rtacha narx, eng qimmat narx)
- `find` — `js/katalog.js` (eng qimmat mahsulot), `js/ui.js` (modal uchun id bo'yicha)
- `map` — `js/katalog.js` (kategoriyalar ro'yxati)
- `filter` — `js/katalog.js`, `yangila()` (qidiruv va kategoriya)
- `sort` — `js/katalog.js`, `yangila()` (narx va nom bo'yicha)
