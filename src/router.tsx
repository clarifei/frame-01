import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  // biome-ignore lint/style/useConsistentTypeDefinitions: interface required for module augmentation
  interface Register {
    router: typeof router;
  }
}
