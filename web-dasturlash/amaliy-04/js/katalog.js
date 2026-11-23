// js/katalog.js — chiqarish, qidiruv, filtr, saralash, statistika (A va B qism)
(function () {
  const konteyner = document.querySelector("#konteyner");
  if (!konteyner) return;

  const qidiruv = document.querySelector("#qidiruv");
  const kategoriya = document.querySelector("#kategoriya");
  const saralash = document.querySelector("#saralash");
  const soni = document.querySelector("#soni");
  const bosh = document.querySelector("#bosh-xabar");

  // ---- A qism: statistika (reduce / find) ----
  const jami = mahsulotlar.reduce((s) => s + 1, 0);
  const ortacha = mahsulotlar.reduce((s, m) => s + m.narx, 0) / mahsulotlar.length;
  const engQimmatNarx = mahsulotlar.reduce((mx, m) => Math.max(mx, m.narx), 0);
  const engQimmat = mahsulotlar.find((m) => m.narx === engQimmatNarx);
  document.querySelector("#st-jami").textContent = jami;
  document.querySelector("#st-ortacha").textContent = Math.round(ortacha).toLocaleString("ru-RU") + " so'm";
  document.querySelector("#st-qimmat").textContent = engQimmat.nomi;

  // ---- Kategoriya select'ini map bilan to'ldirish ----
  const kategoriyalar = [...new Set(mahsulotlar.map((m) => m.kategoriya))];
  kategoriyalar.forEach((k) => {
    const opt = document.createElement("option");
    opt.value = k;
    opt.textContent = k;
    kategoriya.append(opt);
  });

  // ---- B qism: kartalarni yaratish (textContent bilan) ----
  function chiqar(royxat) {
    konteyner.innerHTML = "";
    royxat.forEach((m) => {
      const karta = document.createElement("article");
      karta.className = "karta";
      karta.dataset.id = m.id;

      const rasm = document.createElement("img");
      rasm.src = m.rasm;
      rasm.alt = m.nomi;

      const h3 = document.createElement("h3");
      h3.textContent = m.nomi;

      const kat = document.createElement("p");
      kat.className = "kat";
      kat.textContent = m.kategoriya + (m.mavjud ? " · mavjud" : " · tugagan");

      const narx = document.createElement("p");
      narx.className = "narx";
      narx.textContent = m.narx.toLocaleString("ru-RU") + " so'm";

      const tugma = document.createElement("button");
      tugma.className = "batafsil";
      tugma.type = "button";
      tugma.textContent = "Batafsil";

      karta.append(rasm, h3, kat, narx, tugma);
      konteyner.append(karta);
    });
    soni.textContent = royxat.length;
    bosh.hidden = royxat.length !== 0;
  }

  // ---- Qidiruv + filtr + saralash birgalikda ----
  function yangila() {
    const q = qidiruv.value.trim().toLowerCase();
    const kat = kategoriya.value;

    let natija = mahsulotlar.filter(
      (m) => m.nomi.toLowerCase().includes(q) && (kat === "hammasi" || m.kategoriya === kat)
    );

    natija = [...natija]; // asl massiv o'zgarmasligi uchun nusxa
    if (saralash.value === "narx-osish") natija.sort((a, b) => a.narx - b.narx);
    else if (saralash.value === "narx-kamayish") natija.sort((a, b) => b.narx - a.narx);
    else if (saralash.value === "nom") natija.sort((a, b) => a.nomi.localeCompare(b.nomi));

    chiqar(natija);
  }

  qidiruv.addEventListener("input", yangila);
  kategoriya.addEventListener("change", yangila);
  saralash.addEventListener("change", yangila);
  yangila();
})();
