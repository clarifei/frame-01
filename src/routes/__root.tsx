import { createRootRoute, Outlet } from "@tanstack/react-router";
import { WindowControls } from "@/components/window/window-controls";
import { useShowWindow } from "@/core/tauri/window";

function RootComponent() {
  useShowWindow();

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="relative flex h-full flex-col">
        <WindowControls className="w-full shrink-0" />
        <div className="relative min-h-0 flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
});
