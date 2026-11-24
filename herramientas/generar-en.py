#!/usr/bin/env python3
"""Genera site/en/index.html (versión en inglés) a partir de site/index.html
y de los textos EN y metaEN de site/script.js.

Uso:  python3 herramientas/generar-en.py   (necesita node y beautifulsoup4)
Correrlo cada vez que cambie index.html o los textos en inglés.
"""
import json, re, subprocess, pathlib
from bs4 import BeautifulSoup

raiz = pathlib.Path(__file__).resolve().parent.parent / "site"
js = (raiz / "script.js").read_text(encoding="utf-8")

def objeto(nombre):
    m = re.search(r"var " + nombre + r" = (\{.*?\n  \});", js, re.S)
    if not m:
        raise SystemExit("No encontré " + nombre + " en script.js")
    return json.loads(subprocess.check_output(
        ["node", "-e", "process.stdout.write(JSON.stringify(" + m.group(1) + "))"], text=True))

EN = objeto("EN")
m = re.search(r"var metaEN = (\{.*?\});", js)
META = json.loads(subprocess.check_output(
    ["node", "-e", "process.stdout.write(JSON.stringify(" + m.group(1) + "))"], text=True))

html = (raiz / "index.html").read_text(encoding="utf-8")
sopa = BeautifulSoup(html, "html.parser")
sopa.html["lang"] = "en"
faltan = []

for el in sopa.select("[data-i18n]"):
    k = el["data-i18n"]
    if k in EN: el.string = EN[k]
    else: faltan.append(k)
for el in sopa.select("[data-i18n-html]"):
    k = el["data-i18n-html"]
    if k in EN:
        el.clear(); el.append(BeautifulSoup(EN[k], "html.parser"))
    else: faltan.append(k)
for el in sopa.select("[data-i18n-alt]"):
    k = el["data-i18n-alt"]
    if k in EN: el["alt"] = EN[k]
    else: faltan.append(k)
for el in sopa.select("[data-i18n-aria]"):
    k = el["data-i18n-aria"]
    if k in EN: el["aria-label"] = EN[k]
    else: faltan.append(k)

sopa.title.string = META["title"]
sopa.find("meta", attrs={"name": "description"})["content"] = META["desc"]
sopa.find("link", rel="canonical")["href"] = "https://nahofit.life/en/"
for prop, valor in (("og:url", "https://nahofit.life/en/"), ("og:locale", "en_US"),
                    ("og:title", "NAHOFIT · Bloom from within"), ("og:description", META["desc"])):
    t = sopa.find("meta", attrs={"property": prop})
    if t: t["content"] = valor
for b in sopa.select(".idioma button"):
    b["aria-pressed"] = "true" if b.get("data-lang") == "en" else "false"

(raiz / "en").mkdir(exist_ok=True)
(raiz / "en" / "index.html").write_text(
    "<!doctype html>\n" + str(sopa).split("\n", 1)[1] if str(sopa).lower().startswith("<!doctype") else str(sopa),
    encoding="utf-8")
print("Listo: site/en/index.html")
if faltan:
    print("Sin traducción (quedan en español):", ", ".join(sorted(set(faltan))))
