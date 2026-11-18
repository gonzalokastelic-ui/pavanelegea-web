/* =========================================================
   PAVANEL EGEA · Interacciones
   ========================================================= */
(() => {
  const S = window.SITE;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ---------- Utilidades ---------- */
  const img = (src, w = 1200) =>
    /^(https?:|\/|\.|img\/)/.test(src) ? src : `https://images.unsplash.com/photo-${src}?auto=format&fit=crop&w=${w}&q=72`;

  // srcset para que cada pantalla baje la foto del tamaño que necesita
  const srcset = (src, widths) =>
    /^(https?:|\/|\.|img\/)/.test(src) ? "" : `srcset="${widths.map((w) => `${img(src, w)} ${w}w`).join(", ")}"`;

  const waLink = (msg = S.whatsappMensaje) => `https://wa.me/${S.whatsapp}?text=${encodeURIComponent(msg)}`;

  const money = (n, cur) => {
    const v = new Intl.NumberFormat("es-AR", { maximumFractionDigits: 0 }).format(n);
    return cur === "USD" ? `USD ${v}` : `$ ${v}`;
  };
  const priceHTML = (p) =>
    `${money(p.precio, p.moneda)}${p.operacion === "alquiler" ? " <small>/ mes</small>" : ""}`;
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const tipoLabel = { departamento: "Departamento", casa: "Casa" };

  /* ---------- Enlaces de contacto ---------- */
  const wireContacts = (root = document) => {
    $$("[data-wa]", root).forEach((a) => {
      a.href = waLink(a.dataset.waMsg || S.whatsappMensaje);
      a.target = "_blank";
      a.rel = "noopener";
    });
    $$("[data-ig]", root).forEach((a) => (a.href = S.instagram));
    $$("[data-ig-user]", root).forEach((el) => (el.textContent = S.instagramUser));
    $$("[data-mail]", root).forEach((a) => (a.href = `mailto:${S.email}`));
    $$("[data-mail-text]", root).forEach((el) => (el.textContent = S.email));
  };
  wireContacts();
  $("#year").textContent = new Date().getFullYear();
  $$("[data-demo-note]").forEach((n) => (n.hidden = !S.datosDeEjemplo));

  // Íconos decorativos: que los lectores de pantalla no los anuncien
  const hideIcons = (root = document) => $$("svg:not([aria-hidden])", root).forEach((s) => s.setAttribute("aria-hidden", "true"));
  hideIcons();

  /* ---------- Carga inicial ---------- */
  const loaded = () => document.documentElement.classList.add("is-loaded");
  requestAnimationFrame(() => requestAnimationFrame(loaded));
  setTimeout(loaded, 1200); // respaldo si la pestaña abre en segundo plano
  const hero = $(".hero");

  /* ---------- Nav ---------- */
  const nav = $("#nav");
  // El nav cambia de tono según la sección que tiene debajo (clara u oscura)
  const navObs = new IntersectionObserver(
    (entries) => entries.forEach((en) => {
      if (en.isIntersecting) {
        nav.classList.toggle("is-solid", en.target.dataset.nav === "light");
        nav.classList.toggle("is-scrolled", en.target !== hero);
      }
    }),
    { rootMargin: "-36px 0px -92% 0px" }
  );
  $$("[data-nav]").forEach((el) => navObs.observe(el));

  const navLinks = $$(".nav__links a");
  const secObs = new IntersectionObserver(
    (entries) => entries.forEach((en) => {
      if (!en.isIntersecting) return;
      navLinks.forEach((a) => a.classList.toggle("is-current", a.getAttribute("href") === `#${en.target.id}`));
    }),
    { rootMargin: "-45% 0px -50% 0px" }
  );
  ["inicio", "servicios", "propiedades", "desarrollos", "estudio", "contacto"].forEach((id) => secObs.observe(document.getElementById(id)));

  /* ---------- Menú mobile ---------- */
  const burger = $("#burger");
  const menu = $("#menu");
  const waFloat = $("#waFloat");
  // Mientras el menú está abierto, el resto de la página queda inerte (foco atrapado en el menú)
  const outside = [$("#contenido"), $(".footer"), waFloat, $(".skip")];
  const setMenu = (open) => {
    burger.setAttribute("aria-expanded", open);
    $(".burger__label", burger).textContent = open ? "Cerrar" : "Menú";
    document.documentElement.classList.toggle("no-scroll", open);
    waFloat.classList.toggle("is-hidden", open);
    outside.forEach((el) => el && (el.inert = open));
    if (open) {
      menu.hidden = false;
      requestAnimationFrame(() => requestAnimationFrame(() => menu.classList.add("is-open")));
      setTimeout(() => $("a", menu).focus(), 80);
    } else {
      menu.classList.remove("is-open");
      setTimeout(() => { if (!menu.classList.contains("is-open")) menu.hidden = true; }, 450);
    }
  };
  burger.addEventListener("click", () => setMenu(burger.getAttribute("aria-expanded") !== "true"));
  $$("a", menu).forEach((a) => a.addEventListener("click", () => setMenu(false)));
  addEventListener("keydown", (e) => {
    if (burger.getAttribute("aria-expanded") !== "true") return;
    if (e.key === "Escape") { setMenu(false); burger.focus(); }
    // Tab circula entre el botón de cerrar y los enlaces del menú
    if (e.key === "Tab") {
      const items = [burger, ...$$("a", menu)];
      const i = items.indexOf(document.activeElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); items[items.length - 1].focus(); }
      else if (!e.shiftKey && i === items.length - 1) { e.preventDefault(); items[0].focus(); }
    }
  });
  matchMedia("(min-width: 901px)").addEventListener("change", (m) => m.matches && setMenu(false));


  /* ---------- Reveal al entrar en pantalla ---------- */
  const revObs = new IntersectionObserver(
    (entries) => entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("is-in"); revObs.unobserve(en.target); }
    }),
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
  );
  const observeReveal = (root = document) => $$(".reveal:not(.is-in), .dev:not(.is-in)", root).forEach((el) => revObs.observe(el));

  /* ---------- Propiedades ---------- */
  const filters = { operacion: "todas", tipo: "todos", moneda: "todas" };
  const grid = $("#propGrid");
  const countEl = $("#propCount");
  const emptyEl = $("#propEmpty");

  const propCard = (p, i) => `
    <article class="prop is-entering" style="--i:${i}" data-ref="${p.ref}">
      <div class="bezel"><div class="bezel__core">
        <div class="prop__media">
          <img src="${img(p.fotos[0], 900)}" ${srcset(p.fotos[0], [480, 720, 960])} sizes="(max-width: 640px) 92vw, (max-width: 1080px) 46vw, 400px" alt="${esc(p.titulo)}" loading="lazy" width="900" height="675">
          <div class="prop__chips">
            <span class="chip ${p.operacion === "venta" ? "chip--sand" : "chip--glass"}">${cap(p.operacion)}</span>
            <span class="chip chip--glass"><svg><use href="#i-photos"/></svg>${p.fotos.length}<span class="sr-only"> fotos</span></span>
          </div>
        </div>
        <div class="prop__body">
          <span class="prop__zone"><svg><use href="#i-pin"/></svg>${tipoLabel[p.tipo]} · ${esc(p.zona)}</span>
          <h3 class="prop__title"><button class="stretch" data-open="${p.ref}">${esc(p.titulo)}</button></h3>
          <div class="prop__specs">
            <span><svg><use href="#i-area"/></svg>${p.m2} m²</span>
            <span><svg><use href="#i-door"/></svg>${p.ambientes} amb.</span>
            ${p.dormitorios ? `<span><svg><use href="#i-bed"/></svg>${p.dormitorios} dorm.</span>` : ""}
            <span><svg><use href="#i-bath"/></svg>${p.banos} baño${p.banos > 1 ? "s" : ""}</span>
          </div>
          <div class="prop__foot">
            <span class="price">${priceHTML(p)}</span>
            <a class="prop__ask" data-wa data-wa-msg="${esc(`¡Hola! Quiero consultar por la propiedad "${p.titulo}" (Ref. ${p.ref}).`)}" href="#" aria-label="Consultar por WhatsApp: ${esc(p.titulo)}">
              <svg><use href="#i-wa"/></svg>Consultar
            </a>
          </div>
        </div>
      </div></div>
    </article>`;

  const renderProps = (animate = true) => {
    const list = window.PROPIEDADES.filter(
      (p) =>
        (filters.operacion === "todas" || p.operacion === filters.operacion) &&
        (filters.tipo === "todos" || p.tipo === filters.tipo) &&
        (filters.moneda === "todas" || p.moneda === filters.moneda)
    );
    const draw = () => {
      grid.innerHTML = list.map(propCard).join("");
      wireContacts(grid);
      hideIcons(grid);
      emptyEl.hidden = list.length > 0;
      countEl.textContent = `${list.length} ${list.length === 1 ? "propiedad" : "propiedades"}`;
    };
    const current = $$(".prop", grid);
    if (animate && current.length && !reduced) {
      current.forEach((c) => c.classList.add("is-leaving"));
      setTimeout(draw, 220);
    } else draw();
  };

  // Segmented control con indicador líquido
  const placeInd = (seg, stretch) => {
    const on = $('[aria-checked="true"]', seg);
    const ind = $(".seg__ind", seg);
    ind.style.width = `${on.offsetWidth}px`;
    ind.style.transform = `translateX(${on.offsetLeft}px)`;
    if (stretch && !reduced) { seg.classList.remove("is-stretch"); void seg.offsetWidth; seg.classList.add("is-stretch"); }
  };
  // Radios con "roving tabindex": Tab entra al grupo una vez, las flechas cambian la opción
  const syncTabs = (seg) => $$("button", seg).forEach((x) => (x.tabIndex = x.getAttribute("aria-checked") === "true" ? 0 : -1));
  $$(".seg").forEach((seg) => {
    syncTabs(seg);
    seg.addEventListener("click", (e) => {
      const b = e.target.closest("button");
      if (!b || b.getAttribute("aria-checked") === "true") return;
      $$("button", seg).forEach((x) => x.setAttribute("aria-checked", x === b));
      syncTabs(seg);
      filters[seg.dataset.filter] = b.dataset.value;
      placeInd(seg, true);
      renderProps();
    });
    seg.addEventListener("keydown", (e) => {
      if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) return;
      e.preventDefault();
      const btns = $$("button", seg);
      const i = btns.findIndex((x) => x.getAttribute("aria-checked") === "true");
      const fwd = e.key === "ArrowRight" || e.key === "ArrowDown";
      const n = btns[(i + (fwd ? 1 : -1) + btns.length) % btns.length];
      n.focus(); n.click();
    });
  });
  const placeAll = () => $$(".seg").forEach((s) => placeInd(s));
  addEventListener("resize", placeAll, { passive: true });
  document.fonts?.ready.then(placeAll);
  placeAll();
  renderProps(false);

  grid.addEventListener("click", (e) => {
    if (e.target.closest(".prop__ask")) return;
    const card = e.target.closest(".prop");
    if (card) openSheet("prop", card.dataset.ref);
  });

  /* ---------- Desarrollos ---------- */
  const devList = $("#devList");
  const devCard = (d) => {
    const building = d.estado === "construccion";
    return `
    <article class="dev${building ? "" : " dev--launch"}" data-ref="${d.ref}">
      <button class="dev__media" data-open-dev="${d.ref}" aria-label="Ver fotos de ${esc(d.nombre)}">
        <img src="${img(d.fotos[0], 1300)}" ${srcset(d.fotos[0], [640, 960, 1400, 1900])} sizes="(max-width: 900px) 94vw, ${building ? "56vw" : "92vw"}" alt="" loading="lazy">
        <span class="chip ${building ? "chip--glass" : "chip--sand"}">${building ? "En construcción" : "Próximo lanzamiento"}</span>
      </button>
      <div class="dev__body">
        <div>
          <h3 class="dev__name">${esc(d.nombre)}</h3>
          <p class="dev__loc"><svg><use href="#i-pin"/></svg>${esc(d.ubicacion)}</p>
        </div>
        <p class="dev__text">${esc(d.resumen)}</p>
        <dl class="dev__facts">
          <div><dt>Unidades</dt><dd>${esc(d.unidades)}</dd></div>
          <div><dt>Tipologías</dt><dd>${esc(d.tipologias)}</dd></div>
        </dl>
        ${building ? `
        <div class="progress">
          <div class="progress__top"><span>Avance de obra · Entrega ${esc(d.entrega)}</span><b>${d.avance}%</b></div>
          <div class="progress__bar" role="progressbar" aria-valuenow="${d.avance}" aria-valuemin="0" aria-valuemax="100" aria-label="Avance de obra"><i style="--p:${d.avance / 100}"></i></div>
        </div>` : ""}
        <div class="dev__ctas">
          <button class="btn btn--sand" data-open-dev="${d.ref}">
            <span>Ver ficha</span>
          </button>
          <a class="btn ${building ? "btn--ghost-dark" : "btn--ghost"}" data-wa data-wa-msg="${esc(building ? `¡Hola! Quiero información sobre el desarrollo ${d.nombre}.` : `¡Hola! Quiero anotarme en la pre-venta de ${d.nombre}.`)}" href="#">
            <span>${building ? "Consultar" : "Quiero la pre-venta"}</span>
          </a>
        </div>
      </div>
    </article>`;
  };
  devList.innerHTML = window.DESARROLLOS.map(devCard).join("");
  hideIcons(devList);
  wireContacts(devList);
  devList.addEventListener("click", (e) => {
    const t = e.target.closest("[data-open-dev]");
    if (t) openSheet("dev", t.dataset.openDev);
  });
  observeReveal();

  /* ---------- Ficha (modal con galería) ---------- */
  const sheet = $("#sheet");
  const panel = $(".sheet__panel", sheet);
  const sheetMQ = matchMedia("(max-width: 640px)"); // en mobile la ficha es una hoja inferior
  let lastPress = null;
  document.addEventListener("pointerdown", (e) => { lastPress = { x: e.clientX, y: e.clientY }; }, { capture: true, passive: true });
  const track = $("#galleryTrack");
  const thumbs = $("#galThumbs");
  const body = $("#sheetBody");
  const gPrev = $("#galPrev"), gNext = $("#galNext"), gCount = $("#galCount");
  let gIdx = 0, gLen = 0, lastFocus = null;

  const setGallery = (fotos, alt) => {
    gLen = fotos.length; gIdx = 0;
    track.innerHTML = fotos.map((f, i) => `<img src="${img(f, 1400)}" ${srcset(f, [640, 1000, 1400])} sizes="(max-width: 900px) 96vw, 580px" alt="${esc(alt)} · foto ${i + 1}" ${i ? 'loading="lazy"' : ""}>`).join("");
    thumbs.innerHTML = fotos.length > 1
      ? fotos.map((f, i) => `<button aria-label="Ver foto ${i + 1}" ${i ? "" : 'aria-current="true"'} data-i="${i}"><img src="${img(f, 200)}" alt=""></button>`).join("")
      : "";
    track.scrollLeft = 0;
    updateGal();
  };
  const updateGal = () => {
    gCount.textContent = `${gIdx + 1} / ${gLen}`;
    gPrev.disabled = gIdx === 0;
    gNext.disabled = gIdx >= gLen - 1;
    $$("button", thumbs).forEach((b, i) => b.setAttribute("aria-current", i === gIdx));
  };
  const goTo = (i) => {
    gIdx = Math.max(0, Math.min(gLen - 1, i));
    track.scrollTo({ left: track.clientWidth * gIdx, behavior: reduced ? "auto" : "smooth" });
    updateGal();
  };
  gPrev.addEventListener("click", () => goTo(gIdx - 1));
  gNext.addEventListener("click", () => goTo(gIdx + 1));
  thumbs.addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) goTo(+b.dataset.i); });
  let st;
  track.addEventListener("scroll", () => {
    clearTimeout(st);
    st = setTimeout(() => { gIdx = Math.round(track.scrollLeft / track.clientWidth); updateGal(); }, 60);
  }, { passive: true });

  const propBody = (p) => {
    const msg = `¡Hola! Quiero consultar por la propiedad "${p.titulo}" (Ref. ${p.ref}).`;
    return `
      <div class="sheet__chips">
        <span class="chip ${p.operacion === "venta" ? "chip--sand" : "chip--line"}">${cap(p.operacion)}</span>
        <span class="chip chip--line">${tipoLabel[p.tipo]}</span>
        <span class="chip chip--line">Ref. ${p.ref}</span>
      </div>
      <h2 class="sheet__title" id="sheetTitle">${esc(p.titulo)}</h2>
      <p class="sheet__zone"><svg><use href="#i-pin"/></svg>${esc(p.zona)}</p>
      <p class="sheet__price">${priceHTML(p)}</p>
      <div class="specs">
        <div><svg><use href="#i-area"/></svg><span><b>${p.m2}</b> m²</span></div>
        <div><svg><use href="#i-door"/></svg><span><b>${p.ambientes}</b> ambientes</span></div>
        <div><svg><use href="#i-bed"/></svg><span>${p.dormitorios ? `<b>${p.dormitorios}</b> dormitorio${p.dormitorios > 1 ? "s" : ""}` : "Monoambiente"}</span></div>
        <div><svg><use href="#i-bath"/></svg><span><b>${p.banos}</b> baño${p.banos > 1 ? "s" : ""}</span></div>
      </div>
      <p class="sheet__desc">${esc(p.descripcion)}</p>
      <ul class="feats">${p.caracteristicas.map((c) => `<li><svg><use href="#i-check"/></svg>${esc(c)}</li>`).join("")}</ul>
      <div class="sheet__ctas">
        <a class="btn btn--wa" data-wa data-wa-msg="${esc(msg)}" href="#"><span>Consultar por WhatsApp</span><span class="btn__icon"><svg><use href="#i-wa"/></svg></span></a>
        <button class="sheet__alt" data-to-form data-motivo="${p.operacion === "venta" ? "Comprar una propiedad" : "Alquilar una propiedad"}" data-msg="${esc(`Me interesa la propiedad "${p.titulo}" (Ref. ${p.ref}).`)}">Prefiero dejar mi consulta por escrito</button>
      </div>`;
  };

  const devBody = (d) => {
    const building = d.estado === "construccion";
    const msg = building ? `¡Hola! Quiero información sobre el desarrollo ${d.nombre}.` : `¡Hola! Quiero anotarme en la pre-venta de ${d.nombre}.`;
    return `
      <div class="sheet__chips">
        <span class="chip ${building ? "chip--line" : "chip--sand"}">${building ? "En construcción" : "Próximo lanzamiento"}</span>
        <span class="chip chip--line">Desarrollo propio</span>
      </div>
      <h2 class="sheet__title" id="sheetTitle">${esc(d.nombre)}</h2>
      <p class="sheet__zone"><svg><use href="#i-pin"/></svg>${esc(d.ubicacion)}</p>
      <div class="specs">
        <div><svg><use href="#i-door"/></svg><span>${esc(d.unidades)}</span></div>
        <div><svg><use href="#i-area"/></svg><span>${esc(d.tipologias)}</span></div>
        <div><svg><use href="#i-crane"/></svg><span>${building ? `Avance <b>${d.avance}%</b>` : "Pre-venta"}</span></div>
        <div><svg><use href="#i-key"/></svg><span>${esc(d.entrega)}</span></div>
      </div>
      <p class="sheet__desc">${esc(d.resumen)}</p>
      <ul class="feats">${d.caracteristicas.map((c) => `<li><svg><use href="#i-check"/></svg>${esc(c)}</li>`).join("")}</ul>
      <div class="sheet__ctas">
        <a class="btn btn--wa" data-wa data-wa-msg="${esc(msg)}" href="#"><span>${building ? "Consultar por WhatsApp" : "Anotarme en la pre-venta"}</span><span class="btn__icon"><svg><use href="#i-wa"/></svg></span></a>
        <button class="sheet__alt" data-to-form data-motivo="Desarrollos / inversión" data-msg="${esc(`Quiero información sobre ${d.nombre}.`)}">Prefiero dejar mi consulta por escrito</button>
      </div>`;
  };

  function openSheet(kind, ref) {
    const item = (kind === "prop" ? window.PROPIEDADES : window.DESARROLLOS).find((x) => x.ref === ref);
    if (!item) return;
    lastFocus = document.activeElement;
    setGallery(item.fotos, item.titulo || item.nombre);
    body.innerHTML = kind === "prop" ? propBody(item) : devBody(item);
    hideIcons(body);
    wireContacts(body);
    sheet.showModal();
    panel.scrollTop = 0;
    // Anclar al origen: la ficha crece desde donde se tocó (y vuelve hacia ahí al cerrar)
    if (!sheetMQ.matches && lastPress) {
      const left = (innerWidth - panel.offsetWidth) / 2, top = (innerHeight - panel.offsetHeight) / 2;
      const ox = Math.min(Math.max(lastPress.x - left, 0), panel.offsetWidth);
      const oy = Math.min(Math.max(lastPress.y - top, 0), panel.offsetHeight);
      panel.style.transformOrigin = `${ox}px ${oy}px`;
    }
    document.documentElement.classList.add("no-scroll");
    waFloat.classList.add("is-hidden");
    requestAnimationFrame(() => requestAnimationFrame(() => sheet.classList.add("is-open")));
  }
  const closeSheet = () => {
    sheet.classList.remove("is-open");
    document.documentElement.classList.remove("no-scroll");
    waFloat.classList.remove("is-hidden");
    setTimeout(() => { sheet.close(); lastFocus?.focus?.({ preventScroll: true }); }, reduced ? 0 : 420);
  };
  $("#sheetClose").addEventListener("click", closeSheet);

  // Hoja inferior (mobile): arrastrar el asa hacia abajo para cerrar.
  // Sigue al dedo 1:1, resiste al tirar hacia arriba y usa la inercia del gesto para decidir.
  const handle = $("#sheetHandle");
  const rubber = (over, dim, c = 0.55) => (over * dim * c) / (dim + c * Math.abs(over));
  const project = (v, d = 0.998) => ((v / 1000) * d) / (1 - d); // proyección de momentum
  let drag = null;
  handle.addEventListener("pointerdown", (e) => {
    if (!sheetMQ.matches) return;
    handle.setPointerCapture(e.pointerId);
    drag = { y0: e.clientY, dy: 0, h: panel.offsetHeight, hist: [{ y: e.clientY, t: e.timeStamp }] };
    panel.style.transition = "none";
  });
  handle.addEventListener("pointermove", (e) => {
    if (!drag) return;
    const raw = e.clientY - drag.y0;
    drag.dy = raw >= 0 ? raw : -rubber(-raw, drag.h);
    panel.style.transform = `translateY(${drag.dy}px)`;
    drag.hist.push({ y: e.clientY, t: e.timeStamp });
    if (drag.hist.length > 6) drag.hist.shift();
  });
  const endDrag = () => {
    if (!drag) return;
    const a = drag.hist[0], b = drag.hist[drag.hist.length - 1];
    const v = b.t > a.t ? ((b.y - a.y) / (b.t - a.t)) * 1000 : 0; // px/s
    const landing = drag.dy + project(v);
    panel.style.transition = "";
    panel.style.transform = ""; // la transición parte del valor actual en pantalla
    if (landing > drag.h * 0.45) closeSheet();
    drag = null;
  };
  handle.addEventListener("pointerup", endDrag);
  handle.addEventListener("pointercancel", endDrag);
  sheet.addEventListener("cancel", (e) => { e.preventDefault(); closeSheet(); });
  sheet.addEventListener("click", (e) => { if (e.target === sheet) closeSheet(); });
  sheet.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") goTo(gIdx + 1);
    if (e.key === "ArrowLeft") goTo(gIdx - 1);
  });
  body.addEventListener("click", (e) => {
    const t = e.target.closest("[data-to-form]");
    if (!t) return;
    closeSheet();
    prefillForm(t.dataset.motivo, t.dataset.msg);
  });

  /* ---------- Formulario ---------- */
  const form = $("#form");
  const fields = $("#formFields");
  const ok = $("#formOk");
  const err = $("#formErr");
  const btn = $("#formBtn");
  const motivo = $("#f-motivo");
  const msgEl = $("#f-msg");

  function prefillForm(m, msg) {
    if (m) motivo.value = m;
    if (msg && !msgEl.value.trim()) msgEl.value = msg + " ";
    setTimeout(() => {
      $("#contacto").scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
      setTimeout(() => $("#f-nombre").focus({ preventScroll: true }), 700);
    }, 300);
  }
  $$("[data-motivo]:not([data-to-form])").forEach((a) => a.addEventListener("click", () => { motivo.value = a.dataset.motivo; }));

  const validate = () => {
    let valid = true;
    [["#f-nombre", (v) => v.length > 1], ["#f-email", (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)], ["#f-msg", (v) => v.length > 3]].forEach(([s, test]) => {
      const el = $(s);
      const good = test(el.value.trim());
      el.closest(".field").classList.toggle("is-invalid", !good);
      el.setAttribute("aria-invalid", !good);
      if (good) el.removeAttribute("aria-describedby"); else el.setAttribute("aria-describedby", "formErr");
      if (!good && valid) { el.focus(); valid = false; }
    });
    return valid;
  };
  form.addEventListener("input", (e) => {
    const f = e.target.closest(".field");
    if (f?.classList.contains("is-invalid")) { f.classList.remove("is-invalid"); e.target.removeAttribute("aria-invalid"); }
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    err.hidden = true;
    if (!validate()) {
      err.textContent = "Revisá los campos marcados: nombre, un email válido y tu consulta.";
      err.hidden = false;
      return;
    }
    btn.classList.add("is-loading");
    btn.querySelector("span").textContent = "Enviando…";
    try {
      if (S.formDemo) {
        await new Promise((r) => setTimeout(r, 900));
      } else {
        const res = await fetch(S.formEndpoint, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || data.ok === false) throw new Error(data.error || "send");
      }
      fields.hidden = true;
      ok.hidden = false;
      form.reset();
    } catch {
      err.innerHTML = `No pudimos enviar tu consulta. Probá de nuevo o <a href="${waLink()}" target="_blank" rel="noopener">escribinos por WhatsApp</a>.`;
      err.hidden = false;
    } finally {
      btn.classList.remove("is-loading");
      btn.querySelector("span").textContent = "Enviar consulta";
    }
  });
  $("#formAgain").addEventListener("click", () => { ok.hidden = true; fields.hidden = false; $("#f-nombre").focus(); });

  /* ---------- WhatsApp flotante: aviso breve ---------- */
  if (finePointer) {
    setTimeout(() => {
      waFloat.classList.add("show-tip");
      setTimeout(() => waFloat.classList.remove("show-tip"), 5000);
    }, 4500);
  }
})();
