import { useMount } from "@reactuses/core";

import { invokeSilent } from "./invoke";

export const useShowWindow = () => {
  useMount(() => {
    const showWindow = () => {
      requestAnimationFrame(() => {
        invokeSilent("show_window");
      });
    };

    void (document.readyState === "complete"
      ? showWindow()
      : window.addEventListener("load", showWindow, { once: true }));
  });
};
