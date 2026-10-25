// GitHub Pages no tiene servidor: copia la página a /privacidad y /terminos
// para que esas direcciones abran directo.
import { mkdirSync, copyFileSync } from "node:fs";
for (const r of ["privacidad", "terminos"]) {
  mkdirSync(`dist/${r}`, { recursive: true });
  copyFileSync("dist/index.html", `dist/${r}/index.html`);
}
copyFileSync("dist/index.html", "dist/404.html");
