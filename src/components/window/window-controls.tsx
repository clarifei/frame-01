import { useWindowControls } from "@/core/tauri/window";
import { IconsControl } from "./icons-control";

type WindowControlsProps = {
  className?: string;
};

const buttonClass =
  "flex h-10 w-12 items-center justify-center transition-colors text-black/90 hover:bg-black/[.05] active:bg-black/[.03] dark:text-white dark:hover:bg-white/[.06] dark:active:bg-white/[.04]";
const closeButtonClass =
  "flex h-10 w-12 items-center justify-center transition-colors text-black/90 hover:bg-[#c42b1c] hover:text-white active:bg-[#c42b1c]/90 dark:text-white";

export function WindowControls({ className }: WindowControlsProps) {
  const { isMaximized, minimize, toggleMaximize, close } = useWindowControls();

  return (
    <div
      className={`relative z-10 flex h-10 select-none items-center justify-between border-b ${className ?? ""}`}
      data-tauri-drag-region
    >
      <div className="pointer-events-none flex items-center gap-2 px-3">
        <span className="font-medium text-foreground text-xs">FRAME-01</span>
      </div>
      <div className="flex items-center">
        <button className={buttonClass} onClick={minimize} type="button">
          <IconsControl className="w-3" icon="minimize" />
        </button>
        <button className={buttonClass} onClick={toggleMaximize} type="button">
          <IconsControl
            className="w-3"
            icon={isMaximized ? "restore" : "maximize"}
          />
        </button>
        <button className={closeButtonClass} onClick={close} type="button">
          <IconsControl className="w-3" icon="close" />
        </button>
      </div>
    </div>
  );
}
