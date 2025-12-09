import { useMount } from "@reactuses/core";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { useCallback, useEffect, useState } from "react";
import { invokeSilent } from "./invoke";

const appWindow = getCurrentWindow();

export function useWindowControls() {
  const [isMaximized, setIsMaximized] = useState(false);

  const checkMaximizedState = useCallback(async () => {
    setIsMaximized(await appWindow.isMaximized());
  }, []);

  const minimize = useCallback(async () => {
    await appWindow.minimize();
  }, []);

  const toggleMaximize = useCallback(async () => {
    if (isMaximized) {
      await appWindow.unmaximize();
    } else {
      await appWindow.maximize();
    }
    setIsMaximized(!isMaximized);
  }, [isMaximized]);

  const close = useCallback(async () => {
    await appWindow.close();
  }, []);

  useEffect(() => {
    checkMaximizedState();
    const unlisten = appWindow.listen("tauri://resize", checkMaximizedState);
    return () => {
      unlisten.then((fn) => fn());
    };
  }, [checkMaximizedState]);

  return {
    isMaximized,
    minimize,
    toggleMaximize,
    close,
  };
}

export function useShowWindow() {
  useMount(() => {
    const showWindow = () => {
      requestAnimationFrame(() => {
        invokeSilent("show_window");
      });
    };

    if (document.readyState === "complete") {
      showWindow();
    } else {
      window.addEventListener("load", showWindow, { once: true });
    }
  });
}
