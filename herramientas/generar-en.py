#!/usr/bin/env python3
"""Genera la versión en inglés de cada página en site/en/ a partir de la versión
en español y de los textos EN y metaEN de site/script.js.

Uso:  python3 herramientas/generar-en.py   (necesita node y beautifulsoup4)
Correrlo cada vez que cambie una página en español o los textos en inglés.
"""
import json, re, subprocess, pathlib
from bs4 import BeautifulSoup

raiz = pathlib.Path(__file__).resolve().parent.parent / "site"
js = (raiz / "script.js").read_text(encoding="utf-8")

def evaluar(texto):
    return json.loads(subprocess.check_output(
        ["node", "-e", "process.stdout.write(JSON.stringify(" + texto + "))"], text=True))

m = re.search(r"var EN = (\{.*?\n  \});", js, re.S)
if not m:
    raise SystemExit("No encontré EN en script.js")
EN = evaluar(m.group(1))
META_INICIO = evaluar(re.search(r"var metaEN = (\{.*?\});", js).group(1))

# Página en español → (título y descripción en inglés)
PAGINAS = {
    "": (META_INICIO["title"], META_INICIO["desc"]),
    "coaching/": ("Emotional coaching for women · NAHOFIT",
                  "Emotional coaching sessions with Nahomy: self-esteem, emotions, boundaries and personal goals. In person in Salt Lake City and online, in Spanish and English."),
    "metodo/": ("The NAHOFIT Method: Connect, Strengthen, Bloom · NAHOFIT",
                "The NAHOFIT Method brings together emotional coaching and mindful movement in three stages: Connect, Strengthen and Bloom. A personal process, with no promise of identical results."),
    "fitness/": ("Mindful fitness with Nahomy · NAHOFIT",
                 "Personal training for women with Nahomy: strength, mobility and habits, out of love for yourself, not as punishment for your body. In person in Salt Lake City and online."),
    "sobre-nahomy/": ("About Nahomy, emotional coach and trainer · NAHOFIT",
                      "Meet Nahomy, NAHOFIT's emotional coach and personal trainer. She helps women build confidence and create habits, at their own pace."),
}
# Rutas que no tienen versión /en/ (son bilingües por sí mismas o son archivos)
SIN_EN = ("/en/", "/assets/", "/styles.css", "/script.js", "/legal.js",
          "/privacidad/", "/terminos/", "/cancelacion/")

def a_ingles(href):
    if not href.startswith("/") or href.startswith("//") or href.startswith(SIN_EN):
        return href
    return "/en" + href

faltan = set()
for ruta, (titulo, desc) in PAGINAS.items():
    sopa = BeautifulSoup((raiz / ruta / "index.html").read_text(encoding="utf-8"), "html.parser")
    sopa.html["lang"] = "en"
    for el in sopa.select("[data-i18n]"):
        k = el["data-i18n"]
        if k in EN: el.string = EN[k]
        else: faltan.add(k)
    for el in sopa.select("[data-i18n-html]"):
        k = el["data-i18n-html"]
        if k in EN:
            el.clear(); el.append(BeautifulSoup(EN[k], "html.parser"))
        else: faltan.add(k)
    for el in sopa.select("[data-i18n-alt]"):
        k = el["data-i18n-alt"]
        if k in EN: el["alt"] = EN[k]
        else: faltan.add(k)
    for el in sopa.select("[data-i18n-aria]"):
        k = el["data-i18n-aria"]
        if k in EN: el["aria-label"] = EN[k]
        else: faltan.add(k)

    url = "https://nahofit.life/en/" + ruta
    sopa.title.string = titulo
    sopa.find("meta", attrs={"name": "description"})["content"] = desc
    sopa.find("link", rel="canonical")["href"] = url
    for prop, valor in (("og:url", url), ("og:locale", "en_US"), ("og:title", titulo), ("og:description", desc)):
        t = sopa.find("meta", attrs={"property": prop})
        if t: t["content"] = valor
    for a in sopa.find_all("a", href=True):
        a["href"] = a_ingles(a["href"])
    for b in sopa.select(".idioma button"):
        b["aria-pressed"] = "true" if b.get("data-lang") == "en" else "false"

    destino = raiz / "en" / ruta
    destino.mkdir(parents=True, exist_ok=True)
    (destino / "index.html").write_text(str(sopa), encoding="utf-8")
    print("Listo: site/en/" + ruta + "index.html")

if faltan:
    print("Sin traducción (quedan en español):", ", ".join(sorted(faltan)))
