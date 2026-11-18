import { isModelId } from "@/lib/modelsname";
import { resolveOpenRouterKey } from "@/lib/openrouter.server";
import { createFileRoute } from "@tanstack/react-router";

type Part =
  | { type: "text"; text: string }
  | { type: "image_url"; image_url: { url: string } };

type OutMessage = { role: "system" | "user" | "assistant"; content: string | Part[] };

function publicError(text: string, key: string): string {
  const cleaned = (key ? text.split(key).join("••••") : text).replace(/\s+/g, " ").trim();
  return cleaned.slice(0, 360) || "OpenRouter request failed.";
}

function asMessages(input: unknown): OutMessage[] | null {
  if (!Array.isArray(input) || input.length === 0 || input.length > 40) return null;
  const out: OutMessage[] = [];
  for (const item of input) {
    if (!item || typeof item !== "object") return null;
    const role = (item as { role?: unknown }).role;
    if (role !== "system" && role !== "user" && role !== "assistant") return null;
    const content = (item as { content?: unknown }).content;
    if (typeof content === "string") {
      if (!content.trim() || content.length > 32000) return null;
      out.push({ role, content });
      continue;
    }
    if (!Array.isArray(content) || content.length === 0 || content.length > 4) return null;
    const parts: Part[] = [];
    for (const part of content) {
      if (!part || typeof part !== "object") return null;
      const type = (part as { type?: unknown }).type;
      if (type === "text") {
        const text = (part as { text?: unknown }).text;
        if (typeof text !== "string" || text.length > 32000) return null;
        parts.push({ type: "text", text });
        continue;
      }
      if (type === "image_url") {
        const url = (part as { image_url?: { url?: unknown } }).image_url?.url;
        if (typeof url !== "string" || url.length > 2_000_000) return null;
        if (!/^data:image\/(jpeg|png|webp);base64,/i.test(url)) return null;
        parts.push({ type: "image_url", image_url: { url } });
        continue;
      }
      return null;
    }
    out.push({ role, content: parts });
  }
  return out;
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "Invalid request." }, { status: 400 });
        }
        const record = body && typeof body === "object" ? (body as Record<string, unknown>) : {};
        const model = typeof record.model === "string" ? record.model : "";
        if (!isModelId(model)) {
          return Response.json({ error: "Unknown model." }, { status: 400 });
        }
        const messages = asMessages(record.messages);
        if (!messages) {
          return Response.json({ error: "Invalid messages." }, { status: 400 });
        }
        const key = resolveOpenRouterKey(record.apiKey);
        if (!key) {
          return Response.json(
            { error: "Add an OpenRouter API key in Settings, or set OPENROUTER_API_KEY." },
            { status: 401 },
          );
        }
        const temperature =
          typeof record.temperature === "number" && Number.isFinite(record.temperature)
            ? Math.min(1, Math.max(0, record.temperature))
            : 0.7;
        const maxTokens =
          typeof record.maxTokens === "number" && Number.isFinite(record.maxTokens)
            ? Math.min(4000, Math.max(256, Math.round(record.maxTokens)))
            : 1800;

        let origin = "https://vela.app";
        try {
          origin = new URL(request.url).origin;
        } catch {
          /* keep fallback */
        }

        let upstream: Response;
        try {
          upstream = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${key}`,
              "Content-Type": "application/json",
              "HTTP-Referer": origin,
              "X-Title": "Vela",
            },
            body: JSON.stringify({
              model,
              messages,
              stream: true,
              temperature,
              max_tokens: maxTokens,
            }),
          });
        } catch {
          return Response.json({ error: "Could not reach OpenRouter." }, { status: 502 });
        }

        if (!upstream.ok || !upstream.body) {
          const text = await upstream.text().catch(() => "");
          let message = text;
          try {
            const parsed = JSON.parse(text) as { error?: { message?: string }; message?: string };
            message = parsed.error?.message || parsed.message || text;
          } catch {
            /* raw text */
          }
          return Response.json(
            { error: publicError(message, key) },
            { status: upstream.status || 502 },
          );
        }

        return new Response(upstream.body, {
          headers: {
            "Content-Type": "text/event-stream; charset=utf-8",
            "Cache-Control": "no-cache, no-transform",
            "X-Accel-Buffering": "no",
          },
        });
      },
    },
  },
});
