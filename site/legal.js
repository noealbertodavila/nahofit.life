// Cambio de idioma en Privacidad y Términos (archivo aparte por la política CSP).
(function () {
  function poner(l) {
    document.querySelectorAll("[data-doc]").forEach(function (d) { d.hidden = d.getAttribute("data-doc") !== l; });
    document.querySelectorAll(".idioma button").forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-lang") === l)); });
    document.documentElement.lang = l;
    document.querySelector("[data-volver]").textContent = l === "en" ? "← Back to home" : "← Volver al inicio";
  }
  var l = "es"; try { l = localStorage.getItem("nahofit_idioma") || "es"; } catch (e) {}
  poner(l);
  document.querySelectorAll(".idioma button").forEach(function (b) {
    b.addEventListener("click", function () { var v = b.getAttribute("data-lang"); try { localStorage.setItem("nahofit_idioma", v); } catch (e) {} poner(v); });
  });
})();
