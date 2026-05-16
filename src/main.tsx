import "./main.css";
import { useEventListener, usePreferredDark } from "@reactuses/core";
import ReactDOM from "react-dom/client";

import { Providers } from "./app/providers";

const ThemeSync = () => {
  const isDark = usePreferredDark();

  document.documentElement.classList.toggle("dark", isDark);

  useEventListener(
    "keydown",
    (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        e.preventDefault();
      }
    },
    document,
    { capture: true }
  );

  return null;
};

ReactDOM.createRoot(document.querySelector("#root") as HTMLElement).render(
  <>
    <ThemeSync />
    <Providers />
  </>
);
