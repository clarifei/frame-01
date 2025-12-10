import { MultiBorder } from "@/components/ui/multi-border";
import { useLoadTime } from "@/core/tauri/window";

type WindowControlsProps = {
  className?: string;
  children?: React.ReactNode;
};

export function WindowControls({ className, children }: WindowControlsProps) {
  const loadTime = useLoadTime();

  return (
    <MultiBorder
      className={`relative z-10 flex h-[33px] select-none items-center justify-between bg-sidebar ${className ?? ""}`}
      colors={["var(--border)", "#0e0e11"]}
      data-tauri-drag-region
      directions={["bottom"]}
    >
      <div className="pointer-events-none flex items-center gap-2 px-3">
        <span className="font-medium text-foreground text-xs">FRAME-01</span>
      </div>
      <div
        className="flex items-center justify-end gap-2"
        style={{ marginRight: "var(--tauri-frame-controls-width)" }}
      >
        {loadTime !== null && (
          <span className="pointer-events-none font-mono text-foreground/50 text-xs">
            {loadTime}ms
          </span>
        )}
        {children}
      </div>
    </MultiBorder>
  );
}
