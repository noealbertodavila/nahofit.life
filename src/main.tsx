import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Landing from "./Landing";
import { Privacidad, Terminos } from "./Legal";

const ruta = window.location.pathname.replace(/\/+$/, "");
const pagina =
  ruta === "/privacidad" ? <Privacidad /> :
  ruta === "/terminos" ? <Terminos /> :
  <Landing />;

createRoot(document.getElementById("root")!).render(<StrictMode>{pagina}</StrictMode>);
