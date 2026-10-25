/* NAHOFIT · página estática (sin base de datos).
   - El formulario manda los datos a Fitorbe, donde Nahomy es coach ("nahofit").
   - Idioma ES/EN: el español está en el HTML; aquí va el inglés. */
(function () {
  "use strict";

  var FITORBE = "https://fitorbe.com";
  var COACH = "nahofit";
  var WHATSAPP = "13852300315";

  /* ── Lo que Nahomy irá completando ─────────────────────────────────────
     CREDENCIALES: cuando termine, cambiar por el nombre oficial y la institución,
       por ejemplo { es: "Coach emocional certificada — Instituto X (2027)", en: "..." }.
     TESTIMONIOS: solo reales y con permiso. Mientras esté vacío, la sección no se muestra.
       Ejemplo: { texto: { es: "...", en: "..." }, nombre: "María G." } */
  var CREDENCIALES = [
    { es: "Actualmente cursando su certificación en coaching emocional.", en: "Currently completing her emotional coaching certification." },
  ];
  var TESTIMONIOS = [];

  var EN = {
    saltar: "Skip to content",
    nav_coaching: "Emotional coaching", nav_metodo: "NAHOFIT Method", nav_fitness: "Mindful fitness", nav_nahomy: "About me", nav_preguntas: "FAQ",
    nav_entrar: "Sign in to my account", nav_cta: "Book a session",
    hero_tag: "Emotional coaching and whole-person wellbeing",
    hero_h1: "Bloom <em>from within.</em>",
    hero_sub: "Your transformation begins when you decide to come back to yourself. Build your self-esteem, connect with your emotions and create habits that help you feel better about yourself.",
    hero_firma: "I'm Nahomy, emotional coach and personal trainer. I support you with respect and self-love, at your own pace.",
    hero_btn1: "I want to start my transformation", hero_btn2: "Meet Nahomy",
    hero_d1: "In person in Salt Lake City", hero_d2: "Online, wherever you are", hero_d3: "In Spanish and English",
    con_h2: "You've given so much time to others… when was the last time you thought about yourself?",
    con_p1: "Sometimes we keep going, meeting responsibilities, taking care of everyone and leaving our own needs for later. Maybe you feel you've lost some confidence, need to find your motivation again, or simply want to feel connected with yourself again.",
    con_p2: "You don't need to have all the answers to begin.",
    con_p3: "I'll walk with you as you take that first step, at your pace, with no comparisons and no judgment.",
    con_btn: "This is my moment",
    cam_tag: "Your wellbeing, your way", cam_h2: "Different paths, one purpose: your wellbeing.",
    cam1_t: "Emotional coaching", cam1_p: "A space to be heard and to reflect, so you can know yourself better, grow your confidence, set healthy boundaries and move toward what you want.",
    cam2_t: "NAHOFIT Method", cam2_p: "A whole-person program that brings together emotional coaching, movement and habits to support your personal growth.",
    cam3_t: "Mindful fitness", cam3_p: "Workouts that respect your body, your experience and your goals. Moving is also a way of caring for yourself.",
    ver_mas: "Learn more →",
    coa_tag: "Emotional coaching", coa_h2: "Reconnect with yourself. Get your confidence back.",
    coa_p1: "There are seasons in life when we need a space to listen to ourselves, reflect and find clarity. Emotional coaching is support focused on self-knowledge and personal growth.",
    coa_p2: "My purpose isn't to tell you how to live your life, but to walk with you as you find your own answers and make decisions aligned with your values.",
    alt_sesion: "Nahomy preparing a session",
    coa_lista_t: "What can we work on together?",
    coa_l1: "Building your self-esteem and confidence.", coa_l2: "Recognizing your emotions and having tools to handle them day to day.",
    coa_l3: "Recognizing your needs and setting healthy boundaries.", coa_l4: "Working on your personal goals and motivation.",
    coa_l5: "Creating habits that support your wellbeing.", coa_l6: "Reconnecting with your strengths and values.",
    coa_ses_t: "What are sessions like?",
    coa_ses_p: "We start with a conversation to understand your goals. Then we work with questions, reflection exercises and practical actions for your week. Sessions are in person in Salt Lake City or online by video.",
    coa_btn: "Book a coaching session",
    coa_nota: "Emotional coaching is not psychotherapy or medical or psychological treatment.",
    met_tag: "NAHOFIT Method", met_h2: "Your whole-person transformation",
    met_intro: "A support program that connects your emotional growth with caring for your body, built on three pillars.",
    met1_t: "Connect", met1_p: "Identify your emotions, values, strengths and what you want for yourself.",
    met2_t: "Strengthen", met2_p: "Build confidence and a movement routine adapted to you and your energy.",
    met3_t: "Bloom", met3_p: "Build habits that stay with you and a plan to keep moving forward.",
    met_para: "<strong>Who is it for?</strong> Women who want to invest time in their personal growth, find their motivation again, strengthen their self-esteem and add physical wellbeing habits.",
    met_nota: "Every process is personal: identical results or guaranteed transformations are not promised.",
    met_btn: "I want to learn about the NAHOFIT Method",
    fit_tag: "Mindful fitness", fit_h2: "Move out of love for yourself, not to punish your body.",
    fit_p1: "Exercise can be much more than chasing a look: it also gives you strength, energy, discipline and confidence.",
    fit_p2: "As a personal trainer, my goal is to help you build a positive, sustainable relationship with movement. You don't need to compare yourself to anyone: your progress starts from your own starting point.",
    fit_btn: "I want to train with Nahomy",
    fit_lista_t: "Training adapted to you",
    fit_l1: "Strength training.", fit_l2: "Beginner routines.", fit_l3: "Improving your fitness.", fit_l4: "Mobility and functional movement.",
    fit_l5: "Building the habit of moving.", fit_l6: "Tracking your physical goals in the app.",
    fil_q: "You don't need to become another woman. You need to discover everything that already lives inside you.",
    fil_p: "Wellbeing goes far beyond appearance: it's listening to yourself, recognizing your worth, caring for your emotions and respecting your body. We're not chasing perfection here. We're after progress, balance and authenticity.",
    fil_firma: "Mind, body and emotions in harmony.",
    sob_tag: "About me", sob_h2: "Hi, I'm Nahomy.",
    sob_p1: "I'm an emotional coach and personal trainer. My work comes from one belief: emotional and physical wellbeing complement each other and help us build a more conscious, balanced life.",
    sob_p2: "I support women who want to know themselves better, grow their confidence and build healthy habits. My approach is based on respect, listening and moving at your own pace.",
    sob_prep_t: "My training",
    sob_inv: "You don't have to prove anything to anyone. This can be the beginning of a process you do by yourself and for yourself.",
    sob_btn: "Let's talk about your goals",
    pas_tag: "How to start", pas_h2: "Your path begins with three steps.",
    pas1_t: "Let's talk", pas1_p: "Book a first conversation to tell me your goals and see how I can support you.",
    pas2_t: "Let's design your path", pas2_p: "We identify your priorities and choose the program that fits you best.",
    pas3_t: "Move at your pace", pas3_p: "You begin your process with practical tools, support and follow-up.",
    pas_btn: "Book your first conversation",
    tes_tag: "Testimonials", tes_h2: "Real stories, personal journeys.",
    faq_h2: "Frequently asked questions",
    faq1_q: "Is this therapy?", faq1_a: "No. It's emotional coaching: it helps you build habits, manage stress and feel better. It doesn't diagnose or treat mental health conditions such as depression, anxiety or eating disorders. If you have or think you have one, we recommend a licensed therapist, and we can help you find one.",
    faq2_q: "Do I need any coaching experience?", faq2_a: "No. You can start right where you are. What matters is wanting to get to know yourself and work on your goals.",
    faq3_q: "Do I have to work out to get coaching?", faq3_a: "No. Emotional coaching and personal training can be taken separately, or together in the NAHOFIT Method.",
    faq4_q: "Are sessions in person or online?", faq4_a: "Both. You can have in-person sessions in Salt Lake City or online by video, wherever you are. Sessions are one-on-one.",
    faq5_q: "What language are sessions in?", faq5_a: "Spanish or English, whichever feels more comfortable.",
    faq6_q: "How much does it cost?", faq6_a: "It depends on the program and the format. Message me and in our first conversation I'll walk you through the options that fit you best.",
    faq7_q: "What if I'm in a crisis?", faq7_a: "If you're thinking about hurting yourself, call or text 988 (Suicide & Crisis Lifeline, 24/7) or 911 if you're in danger. Sessions are not an emergency service.",
    cto_tag: "Contact and booking", cto_h2: "Your next chapter can start today.",
    cto_p: "Tell me what you'd like to work on and let's find the best starting point together. I'll reach out to choose a day and time.",
    cto_lugar: "In person in Salt Lake City, Utah · Online by video",
    f_nombre: "Name", f_email: "Email", f_tel: "WhatsApp or phone", f_ayuda: "Leave your email or WhatsApp, whichever you prefer.",
    f_interes: "I'm interested in", op_primera: "A first conversation", op_coaching: "Emotional coaching", op_metodo: "NAHOFIT Method", op_fitness: "Mindful fitness", op_otro: "Something else",
    f_modalidad: "I prefer", op_presencial: "In person (Salt Lake City)", op_linea: "Online", op_cualquiera: "Either one",
    f_msg: "Anything you'd like to tell me? (optional)", f_privacidad: "For your privacy, please don't share diagnoses or medical information here.",
    f_acepta: "I agree that Nahomy may contact me by WhatsApp, phone or email.",
    f_btn: "Request information", f_ok_t: "Thank you for reaching out!", f_ok: "I received your request. I'll write to you soon to explain the next steps.",
    cie_h2: "You deserve to feel good about yourself.",
    cie_p: "You don't need to have everything figured out to start caring for yourself. Today you can take a small step toward a life with more confidence, wellbeing and connection with yourself.",
    cie_btn: "I'm ready to begin",
    pie_lema: "Bloom from within.", privacidad: "Privacy", terminos: "Terms",
    pie_aviso: "NAHOFIT offers emotional coaching and personal training. It is not therapy and does not replace medical or psychological care. Talk to your doctor before starting an exercise program. If you're in crisis, call or text 988.",
    wa_aria: "Message Nahomy on WhatsApp", wa_txt_corto: "WhatsApp",
  };

  var MSG = {
    es: { wa: "Hola Nahomy, vi tu página y quiero información para comenzar.", nombre: "Escribe tu nombre.", contacto: "Déjame tu correo o tu WhatsApp para escribirte.", correo: "Ese correo no parece válido.", acepta: "Marca la casilla para que Nahomy pueda contactarte.", enviando: "Enviando…", fallo: "No se pudo enviar. Intenta de nuevo o escríbeme por WhatsApp.", menu_abrir: "Abrir menú", menu_cerrar: "Cerrar menú" },
    en: { wa: "Hi Nahomy, I saw your page and I'd like information to get started.", nombre: "Please enter your name.", contacto: "Leave your email or WhatsApp so I can reach you.", correo: "That email doesn't look right.", acepta: "Check the box so Nahomy can contact you.", enviando: "Sending…", fallo: "Couldn't send. Please try again or message me on WhatsApp.", menu_abrir: "Open menu", menu_cerrar: "Close menu" },
  };

  document.documentElement.classList.add("js");
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ── Idioma ───────────────────────────────────────────────────────── */
  var ES = {};
  $$("[data-i18n]").forEach(function (el) { ES[el.getAttribute("data-i18n")] = el.textContent; });
  $$("[data-i18n-html]").forEach(function (el) { ES[el.getAttribute("data-i18n-html")] = el.innerHTML; });
  $$("[data-i18n-alt]").forEach(function (el) { ES[el.getAttribute("data-i18n-alt")] = el.alt; });
  $$("[data-i18n-aria]").forEach(function (el) { ES[el.getAttribute("data-i18n-aria")] = el.getAttribute("aria-label"); });
  var metaES = { title: document.title, desc: $('meta[name="description"]').content };
  var metaEN = { title: "NAHOFIT · Emotional coaching and wellbeing for women with Nahomy", desc: "Emotional coaching and mindful fitness with Nahomy. Build your self-esteem, connect with your emotions and care for your body. In person in Salt Lake City and online, in Spanish and English." };
  var lang = "es";

  function guardar(l) { try { localStorage.setItem("nahofit_idioma", l); } catch (e) { /* sin almacenamiento */ } }
  function leer() { try { return localStorage.getItem("nahofit_idioma"); } catch (e) { return null; } }

  function aplicarIdioma(l) {
    lang = l === "en" ? "en" : "es";
    var d = lang === "en" ? EN : ES;
    $$("[data-i18n]").forEach(function (el) { var k = el.getAttribute("data-i18n"); if (d[k] != null) el.textContent = d[k]; });
    $$("[data-i18n-html]").forEach(function (el) { var k = el.getAttribute("data-i18n-html"); if (d[k] != null) el.innerHTML = d[k]; });
    $$("[data-i18n-alt]").forEach(function (el) { var k = el.getAttribute("data-i18n-alt"); if (d[k] != null) el.alt = d[k]; });
    $$("[data-i18n-aria]").forEach(function (el) { var k = el.getAttribute("data-i18n-aria"); if (d[k] != null) el.setAttribute("aria-label", d[k]); });
    $$(".idioma button").forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-lang") === lang)); });
    document.documentElement.lang = lang;
    document.title = lang === "en" ? metaEN.title : metaES.title;
    $('meta[name="description"]').content = lang === "en" ? metaEN.desc : metaES.desc;
    var wa = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(MSG[lang].wa);
    $$("[data-wa]").forEach(function (a) { a.href = wa; });
    pintarCredenciales();
    pintarTestimonios();
    actualizarBotonMenu();
  }
  $$(".idioma button").forEach(function (b) {
    b.addEventListener("click", function () { var l = b.getAttribute("data-lang"); guardar(l); aplicarIdioma(l); });
  });

  /* ── Credenciales y testimonios ───────────────────────────────────── */
  function pintarCredenciales() {
    var ul = $("#credenciales");
    if (!ul) return;
    ul.innerHTML = "";
    CREDENCIALES.forEach(function (c) { var li = document.createElement("li"); li.textContent = c[lang] || c.es; ul.appendChild(li); });
    ul.closest(".preparacion").hidden = CREDENCIALES.length === 0;
  }
  function pintarTestimonios() {
    var sec = $("#testimonios"), cont = $("#lista-testimonios");
    if (!sec || !cont) return;
    sec.hidden = TESTIMONIOS.length === 0;
    cont.innerHTML = "";
    TESTIMONIOS.forEach(function (t) {
      var fig = document.createElement("figure"); fig.className = "testimonio";
      var q = document.createElement("blockquote"); var p = document.createElement("p");
      p.textContent = "“" + (t.texto[lang] || t.texto.es) + "”"; q.appendChild(p);
      var cap = document.createElement("figcaption"); var cite = document.createElement("cite"); cite.textContent = t.nombre;
      cap.appendChild(cite); fig.appendChild(q); fig.appendChild(cap); cont.appendChild(fig);
    });
  }

  /* ── Menú en celular ──────────────────────────────────────────────── */
  var menu = $("#menu"), ham = $("#hamburguesa");
  function actualizarBotonMenu() {
    var abierto = menu.classList.contains("abierto");
    ham.setAttribute("aria-expanded", String(abierto));
    ham.setAttribute("aria-label", abierto ? MSG[lang].menu_cerrar : MSG[lang].menu_abrir);
  }
  function cerrarMenu() { menu.classList.remove("abierto"); actualizarBotonMenu(); }
  ham.addEventListener("click", function () { menu.classList.toggle("abierto"); actualizarBotonMenu(); });
  $$("a", menu).forEach(function (a) { a.addEventListener("click", cerrarMenu); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && menu.classList.contains("abierto")) { cerrarMenu(); ham.focus(); } });

  /* ── Barra con borde al bajar ─────────────────────────────────────── */
  var barra = $("#barra");
  function alBajar() { barra.classList.toggle("con-borde", window.scrollY > 10); }
  window.addEventListener("scroll", alBajar, { passive: true });
  alBajar();

  /* ── Aparece al bajar ─────────────────────────────────────────────── */
  if ("IntersectionObserver" in window) {
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } });
    }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
    $$(".aparece").forEach(function (el) { obs.observe(el); });
  } else {
    $$(".aparece").forEach(function (el) { el.classList.add("visible"); });
  }

  /* ── Formulario → Fitorbe ─────────────────────────────────────────── */
  var form = $("#form"), err = $("#f-error"), boton = $("#f-boton");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var m = MSG[lang];
    var nombre = $("#f-nombre").value.trim();
    var email = $("#f-email").value.trim();
    var tel = $("#f-tel").value.trim();
    err.textContent = "";
    if (!nombre) { err.textContent = m.nombre; $("#f-nombre").focus(); return; }
    if (!email && !tel) { err.textContent = m.contacto; $("#f-email").focus(); return; }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { err.textContent = m.correo; $("#f-email").focus(); return; }
    if (!$("#f-acepta").checked) { err.textContent = m.acepta; $("#f-acepta").focus(); return; }

    var modalidad = $("#f-modalidad").value;
    var mensaje = $("#f-msg").value.trim();
    var datos = {
      coach: COACH,
      nombre: nombre,
      email: email,
      telefono: tel,
      interes: $("#f-interes").value,
      mensaje: ("Modalidad: " + modalidad + (mensaje ? "\n" + mensaje : "")).slice(0, 1000),
      acepta: true,
      empresa: $("#f-empresa").value,
      idioma: lang,
    };
    var texto = boton.textContent;
    boton.disabled = true; boton.textContent = m.enviando;
    fetch(FITORBE + "/api/contacto", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(datos) })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { ok: r.ok, j: j }; }); })
      .then(function (res) {
        if (!res.ok) throw new Error(res.j && res.j.error);
        form.hidden = true;
        var g = $("#gracias"); g.hidden = false; g.focus();
      })
      .catch(function (ex) {
        err.textContent = (lang === "es" && ex && ex.message) ? ex.message : m.fallo;
      })
      .then(function () { boton.disabled = false; boton.textContent = texto; });
  });

  /* ── Inicio ───────────────────────────────────────────────────────── */
  var anio = $("#anio"); if (anio) anio.textContent = String(new Date().getFullYear());
  var guardado = leer();
  var inicial = guardado || "es";
  aplicarIdioma(inicial);
})();
