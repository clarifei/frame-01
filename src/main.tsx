import "./wdyr";
import "./main.css";
import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import ReactDOM from "react-dom/client";
import { Providers } from "./app/providers";

const applyTheme = (dark: boolean) => {
  document.documentElement.classList.toggle("dark", dark);
};

const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
applyTheme(mediaQuery.matches);
mediaQuery.addEventListener("change", (e) => applyTheme(e.matches));

document.addEventListener(
  "keydown",
  (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
    }
  },
  { capture: true }
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Providers />
);
