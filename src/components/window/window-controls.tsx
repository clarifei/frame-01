interface WindowControlsProps {
  className?: string;
  children?: React.ReactNode;
}

export const WindowControls = ({
  className,
  children,
}: WindowControlsProps) => (
  <div
    className={`relative z-10 flex h-8.25 select-none items-center justify-between border-b border-border bg-sidebar ${className ?? ""}`}
    data-tauri-drag-region
  >
    <div className="pointer-events-none flex items-center gap-2 px-3">
      <span className="font-medium text-foreground text-xs">FRAME-01</span>
    </div>
    <div
      className="flex items-center justify-end gap-2"
      style={{ marginRight: "var(--tauri-frame-controls-width)" }}
    >
      <span className="pointer-events-none font-mono text-foreground/50 text-xs">
        PLACEHOLDER
      </span>
      {children}
    </div>
  </div>
);
