# NAHOFIT — página de Nahomy (nahofit.life)

Página estática, sin base de datos: **HTML, CSS y JavaScript**, sin framework ni compilación.
Se publica sola en GitHub Pages en cada cambio a `main` (`.github/workflows/publicar.yml`).

```
site/
  index.html          una sola página con todas las secciones (español en el HTML)
  styles.css          paleta verde bosque, salvia, arena, marfil y bronce · Playfair Display + Manrope
  script.js           inglés, menú, formulario, credenciales y testimonios
  en/index.html       versión en inglés (se genera, no se edita a mano)
  cancelacion/        política de cancelación (BORRADOR, sin enlazar ni indexar hasta que Nahomy la apruebe)
  privacidad/, terminos/, 404.html, robots.txt, sitemap.xml, CNAME
  assets/             fotos, favicon e imagen para compartir (opengraph.jpg)
```

## Lo que Nahomy va completando (en `site/script.js`)
- `CREDENCIALES`: hoy dice que está cursando su certificación. Al terminar, poner el nombre oficial y la institución.
- `TESTIMONIOS`: solo reales y con permiso. Mientras esté vacío, la sección no aparece.

## Cómo funciona
- WhatsApp (385) 230-0315 con mensaje listo, en el botón flotante y en Contacto. Instagram: @nahofit.life.
- El formulario manda los datos a **Fitorbe** (`https://fitorbe.com/api/contacto`, coach `nahofit`).
  Nahomy los ve en su panel de Fitorbe → Solicitudes. La modalidad (presencial / en línea) va en el mensaje.
- "Entrar a mi cuenta" lleva a `https://fitorbe.com/login`.
- Sin precios: se explican en la primera conversación.

## Versión en inglés
Los textos en inglés están en `site/script.js` (objeto `EN`). Después de cambiar `index.html` o esos textos, corre:

```
python3 herramientas/generar-en.py
```

Eso rehace `site/en/index.html`. Los botones ES/EN llevan de `/` a `/en/` y al revés.
