import { env } from "@/lib/env.server";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/status")({
  server: {
    handlers: {
      GET: async () => Response.json({ env: Boolean(env("OPENROUTER_API_KEY")) }),
    },
  },
});
