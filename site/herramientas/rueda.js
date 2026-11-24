/* Rueda del bienestar · NAHOFIT
   Herramienta educativa de autorreflexión. No guarda ni envía nada:
   las respuestas solo viven en esta página mientras está abierta. */
(function () {
  "use strict";
  var form = document.getElementById("rueda-form");
  if (!form) return;
  var en = document.documentElement.lang === "en";

  var AREAS = [
    { id: "salud", es: "Salud y cuerpo", en: "Health and body",
      pes: "¿Qué pequeño hábito te ayudaría a sentir más energía esta semana?",
      pen: "What small habit would help you feel more energy this week?" },
    { id: "emociones", es: "Emociones", en: "Emotions",
      pes: "¿Qué emoción se ha repetido más estos días y qué te quiere decir?",
      pen: "Which emotion has come up most lately, and what is it telling you?" },
    { id: "amor", es: "Amor propio", en: "Self-love",
      pes: "¿Cómo te hablarías si fueras tu mejor amiga?",
      pen: "How would you talk to yourself if you were your own best friend?" },
    { id: "relaciones", es: "Relaciones", en: "Relationships",
      pes: "¿Qué relación te da paz y cuál te pide un límite?",
      pen: "Which relationship brings you peace, and which one needs a boundary?" },
    { id: "proposito", es: "Trabajo y propósito", en: "Work and purpose",
      pes: "¿Qué parte de tu día se siente alineada con lo que valoras?",
      pen: "Which part of your day feels aligned with what you value?" },
    { id: "descanso", es: "Descanso", en: "Rest",
      pes: "¿Qué necesitarías soltar para descansar mejor?",
      pen: "What would you need to let go of to rest better?" },
    { id: "disfrute", es: "Disfrute", en: "Joy",
      pes: "¿Cuándo fue la última vez que hiciste algo solo porque te gusta?",
      pen: "When did you last do something just because you enjoy it?" },
    { id: "crecimiento", es: "Crecimiento personal", en: "Personal growth",
      pes: "¿Qué te gustaría aprender o intentar en los próximos tres meses?",
      pen: "What would you like to learn or try in the next three months?" }
  ];
  var T = en ? {
    valor: "of 10", menores: "Areas with the most room to grow", pregunta: "A question to reflect on:",
    resumen: "Your wellbeing wheel. Average: ", igual: "Your areas are balanced. Which one would you like to strengthen first?"
  } : {
    valor: "de 10", menores: "Áreas con más espacio para crecer", pregunta: "Una pregunta para reflexionar:",
    resumen: "Tu rueda del bienestar. Promedio: ", igual: "Tus áreas están parejas. ¿Cuál te gustaría fortalecer primero?"
  };

  var NS = "http://www.w3.org/2000/svg";
  var svg = document.getElementById("rueda-svg");
  var lista = document.getElementById("rueda-campos");
  var res = document.getElementById("rueda-resultado");
  var C = 160, R = 120, N = AREAS.length;

  function el(tag, attrs, padre) {
    var e = document.createElementNS(NS, tag);
    Object.keys(attrs).forEach(function (k) { e.setAttribute(k, attrs[k]); });
    if (padre) padre.appendChild(e);
    return e;
  }
  function punto(i, r) {
    var a = (Math.PI * 2 * i) / N - Math.PI / 2;
    return [C + r * Math.cos(a), C + r * Math.sin(a)];
  }

  // Campos
  AREAS.forEach(function (a, i) {
    var fila = document.createElement("div");
    fila.className = "rueda-fila";
    var lab = document.createElement("label");
    lab.setAttribute("for", "r-" + a.id);
    lab.textContent = en ? a.en : a.es;
    var inp = document.createElement("input");
    inp.type = "range"; inp.min = "1"; inp.max = "10"; inp.step = "1"; inp.value = "5";
    inp.id = "r-" + a.id; inp.name = a.id;
    var out = document.createElement("output");
    out.setAttribute("for", inp.id);
    out.id = "o-" + a.id;
    fila.appendChild(lab); fila.appendChild(inp); fila.appendChild(out);
    lista.appendChild(fila);
  });

  // Dibujo fijo: anillos y ejes
  var fondo = el("g", { "aria-hidden": "true" }, svg);
  [2, 4, 6, 8, 10].forEach(function (v) {
    el("circle", { cx: C, cy: C, r: (R * v) / 10, fill: "none", stroke: "#D8C8B5", "stroke-width": v === 10 ? 1.5 : 1 }, fondo);
  });
  AREAS.forEach(function (a, i) {
    var p = punto(i, R);
    el("line", { x1: C, y1: C, x2: p[0], y2: p[1], stroke: "#D8C8B5", "stroke-width": 1 }, fondo);
    var q = punto(i, R + 22);
    var t = el("text", { x: q[0], y: q[1] + 4, "text-anchor": Math.abs(q[0] - C) < 4 ? "middle" : (q[0] > C ? "start" : "end"),
      "font-size": "11", fill: "#2B2B28" }, fondo);
    t.textContent = en ? a.en : a.es;
  });
  var forma = el("polygon", { fill: "rgba(152,170,148,0.35)", stroke: "#344C43", "stroke-width": 2, "stroke-linejoin": "round" }, svg);
  var puntos = el("g", {}, svg);

  function valores() {
    return AREAS.map(function (a) { return Number(document.getElementById("r-" + a.id).value); });
  }

  function pintar() {
    var v = valores();
    AREAS.forEach(function (a, i) { document.getElementById("o-" + a.id).textContent = v[i] + " " + T.valor; });
    forma.setAttribute("points", v.map(function (x, i) { return punto(i, (R * x) / 10).join(","); }).join(" "));
    while (puntos.firstChild) puntos.removeChild(puntos.firstChild);
    v.forEach(function (x, i) { var p = punto(i, (R * x) / 10); el("circle", { cx: p[0], cy: p[1], r: 4, fill: "#344C43" }, puntos); });

    var prom = (v.reduce(function (s, x) { return s + x; }, 0) / N).toFixed(1);
    svg.setAttribute("aria-label", T.resumen + prom + ". " +
      AREAS.map(function (a, i) { return (en ? a.en : a.es) + " " + v[i]; }).join(", "));

    var orden = AREAS.map(function (a, i) { return { a: a, v: v[i] }; }).sort(function (x, y) { return x.v - y.v; });
    res.innerHTML = "";
    var h = document.createElement("h2"); h.className = "rueda-titulo-res"; res.appendChild(h);
    if (orden[0].v === orden[N - 1].v) {
      h.textContent = T.igual;
      return;
    }
    h.textContent = T.menores;
    orden.slice(0, 2).forEach(function (o) {
      var c = document.createElement("div"); c.className = "rueda-tarjeta";
      var n = document.createElement("p"); n.className = "rueda-area";
      n.textContent = (en ? o.a.en : o.a.es) + " · " + o.v + " " + T.valor;
      var q = document.createElement("p");
      q.textContent = T.pregunta + " " + (en ? o.a.pen : o.a.pes);
      c.appendChild(n); c.appendChild(q); res.appendChild(c);
    });
  }

  form.addEventListener("input", pintar);
  document.getElementById("rueda-reiniciar").addEventListener("click", function () {
    AREAS.forEach(function (a) { document.getElementById("r-" + a.id).value = 5; });
    pintar();
  });
  document.getElementById("rueda-imprimir").addEventListener("click", function () { window.print(); });
  pintar();
})();
