import { createFileRoute } from "@tanstack/react-router";

const Index = () => (
  <div className="flex h-full items-center justify-center">
    {/* nothing nothing */}
  </div>
);

export const Route = createFileRoute("/")({
  component: Index,
});
