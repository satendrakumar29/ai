import { Desk } from "@/components/vela/desk";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <Desk />;
}
