import { useMount } from "@reactuses/core";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { useCallback, useEffect, useRef, useState } from "react";
import { invokeSilent } from "./invoke";

let loadTime: number | null = null;

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
        loadTime = Math.round(performance.now());
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

export function useLoadTime() {
  const [time, setTime] = useState<number | null>(loadTime);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    if (loadTime !== null) {
      setTime(loadTime);
      return;
    }

    intervalRef.current = setInterval(() => {
      if (loadTime !== null) {
        setTime(loadTime);
        clearInterval(intervalRef.current);
      }
    }, 10);

    return () => clearInterval(intervalRef.current);
  }, []);

  return time;
}
