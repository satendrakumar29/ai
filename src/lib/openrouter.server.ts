import { env } from "@/lib/env.server";

/** Browser-saved key wins when present; otherwise OPENROUTER_API_KEY. */
export function resolveOpenRouterKey(override: unknown): string | undefined {
  if (typeof override === "string") {
    const trimmed = override.trim();
    if (trimmed) return trimmed;
  }
  return env("OPENROUTER_API_KEY");
}
