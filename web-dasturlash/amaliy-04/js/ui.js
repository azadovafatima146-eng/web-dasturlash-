// js/ui.js — modal, event delegation, forma tekshiruvi, tungi rejim
// Katalog sahifasida data.js ui.js dan OLDIN ulanishi kerak.

/* ---------- 1. MODAL + 2. EVENT DELEGATION ---------- */
const konteyner = document.querySelector("#konteyner");
const modal = document.querySelector("#modal");

function modalOchish(element) {
  modal.querySelector("#modal-nomi").textContent = element.nomi;
  modal.querySelector("#modal-malumot").textContent =
    `Kategoriya: ${element.kategoriya} | Narx: ${element.narx} so'm | ` +
    `${element.mavjud ? "Mavjud" : "Mavjud emas"} | Teglar: ${element.teglar.join(", ")}`;
  modal.hidden = false;
}

function modalYopish() {
  modal.hidden = true;
}

if (konteyner && modal) {
  // Bitta tinglovchi — ota konteynerda (har bir kartada emas)
  konteyner.addEventListener("click", (e) => {
    const tugma = e.target.closest(".batafsil");
    if (!tugma) return;
    const karta = tugma.closest(".karta");
    const element = mahsulotlar.find((m) => m.id === Number(karta.dataset.id));
    if (element) modalOchish(element);
  });

  // Yopish: × tugmasi, fon ustiga bosish, Escape
  modal.querySelector("#modal-yopish").addEventListener("click", modalYopish);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modalYopish(); // faqat fonning o'ziga bosilsa
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) modalYopish();
  });
}

/* ---------- 3. FORMA TEKSHIRUVI (aloqa.html) ---------- */
const forma = document.querySelector("#aloqa-forma");

function xatoYozish(maydonNomi, matn) {
  const joy = forma.querySelector(`.xato[data-for="${maydonNomi}"]`);
  joy.textContent = matn;
}

function tekshir(qiymatlar) {
  const xatolar = {};
  if (qiymatlar.ism.length < 2) xatolar.ism = "Ism kamida 2 ta belgidan iborat bo'lsin";
  if (qiymatlar.email === "") xatolar.email = "Email bo'sh bo'lmasin";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(qiymatlar.email))
    xatolar.email = "Email formati noto'g'ri";
  if (qiymatlar.telefon === "") xatolar.telefon = "Telefon bo'sh bo'lmasin";
  else if (!/^\+998\d{9}$/.test(qiymatlar.telefon))
    xatolar.telefon = "Format: +998XXXXXXXXX";
  if (qiymatlar.xabar.length < 10) xatolar.xabar = "Xabar kamida 10 ta belgidan iborat bo'lsin";
  else if (qiymatlar.xabar.length > 500) xatolar.xabar = "Xabar 500 ta belgidan oshmasin";
  return xatolar;
}

if (forma) {
  const muvaffaqiyat = document.querySelector("#muvaffaqiyat");
  const maydonlar = ["ism", "email", "telefon", "xabar"];

  forma.addEventListener("submit", (e) => {
    e.preventDefault(); // sahifa qayta yuklanishini to'xtatadi
    muvaffaqiyat.textContent = "";

    const qiymatlar = {};
    maydonlar.forEach((n) => (qiymatlar[n] = forma.elements[n].value.trim()));

    const xatolar = tekshir(qiymatlar);
    maydonlar.forEach((n) => xatoYozish(n, xatolar[n] || ""));

    if (Object.keys(xatolar).length === 0) {
      muvaffaqiyat.textContent = "Xabaringiz yuborildi. Rahmat!";
      forma.reset();
    }
  });
}

/* ---------- TANLOV: TUNGI REJIM (localStorage) ---------- */
const temaTugma = document.querySelector("#tema");

function temaQollash(tun) {
  document.body.classList.toggle("tun", tun);
}

try {
  temaQollash(localStorage.getItem("tema") === "tun");
} catch (err) {
  /* localStorage mavjud bo'lmasa, oddiy rejimda qoladi */
}

if (temaTugma) {
  temaTugma.addEventListener("click", () => {
    const tun = !document.body.classList.contains("tun");
    temaQollash(tun);
    try {
      localStorage.setItem("tema", tun ? "tun" : "kun");
    } catch (err) {}
  });
}
