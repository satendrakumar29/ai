export type ApiContent =
  | string
  | Array<{ type: "text"; text: string } | { type: "image_url"; image_url: { url: string } }>;

export type ApiMessage = { role: "system" | "user" | "assistant"; content: ApiContent };

export async function streamCompletion(opts: {
  model: string;
  messages: ApiMessage[];
  apiKey: string;
  temperature: number;
  maxTokens: number;
  signal: AbortSignal;
  onText: (delta: string) => void;
  onReasoning: (delta: string) => void;
}): Promise<void> {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: opts.model,
      messages: opts.messages,
      apiKey: opts.apiKey || undefined,
      temperature: opts.temperature,
      maxTokens: opts.maxTokens,
    }),
    signal: opts.signal,
  });

  const ctype = res.headers.get("content-type") ?? "";
  if (!res.ok || ctype.includes("application/json")) {
    let message = `Request failed (${res.status})`;
    try {
      const data = (await res.json()) as { error?: string };
      if (data.error) message = data.error;
    } catch {
      /* keep status text */
    }
    throw new Error(message);
  }
  if (!res.body) throw new Error("Empty response");

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith("data:")) continue;
      const data = trimmed.slice(5).trim();
      if (!data || data === "[DONE]") continue;
      let json: {
        error?: { message?: string };
        choices?: Array<{
          delta?: { content?: string; reasoning?: string; reasoning_content?: string };
        }>;
      };
      try {
        json = JSON.parse(data) as typeof json;
      } catch {
        continue;
      }
      if (json.error?.message) throw new Error(json.error.message);
      const delta = json.choices?.[0]?.delta;
      if (!delta) continue;
      if (typeof delta.content === "string" && delta.content) opts.onText(delta.content);
      const reason = delta.reasoning || delta.reasoning_content;
      if (typeof reason === "string" && reason) opts.onReasoning(reason);
    }
  }
}

export function isAbortError(error: unknown): boolean {
  return error instanceof Error && error.name === "AbortError";
}
