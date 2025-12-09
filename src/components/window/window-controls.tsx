import { useCallback, useEffect, useState } from "react";
import { useLoadTime } from "@/core/tauri/window";

type WindowControlsProps = {
  className?: string;
  children?: React.ReactNode;
};

export function WindowControls({ className, children }: WindowControlsProps) {
  const loadTime = useLoadTime();
  const [rightOffset, setRightOffset] = useState(0);

  const updateOffset = useCallback(() => {
    const minBtn = document.getElementById("frame-tb-minimize");
    if (minBtn) {
      const rect = minBtn.getBoundingClientRect();
      setRightOffset(window.innerWidth - rect.left);
    }
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(updateOffset);
    window.addEventListener("resize", updateOffset);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", updateOffset);
    };
  }, [updateOffset]);

  return (
    <div
      className={`relative z-10 flex h-[33px] select-none items-center justify-between border-b ${className ?? ""}`}
      data-tauri-drag-region
    >
      <div className="pointer-events-none flex items-center gap-2 px-3">
        <span className="font-medium text-foreground text-xs">FRAME-01</span>
      </div>
      <div
        className="flex items-center justify-end gap-2"
        style={{ marginRight: rightOffset }}
      >
        {loadTime !== null && (
          <span className="pointer-events-none font-mono text-foreground/50 text-xs">
            {loadTime}ms
          </span>
        )}
        {children}
      </div>
    </div>
  );
}
