import type { Lang } from "@/lib/i18n";

export type Mode = "chat" | "compare" | "research" | "videos" | "slides" | "images";

export const MODES: Array<Exclude<Mode, "chat">> = ["compare", "research", "videos", "slides", "images"];

export function systemPrompt(mode: Mode, name: string, think: boolean): string {
  const who = `You are Vela, a precise assistant talking with ${name || "the user"}. Write in the user's language. Use markdown when it helps. Never invent citations, URLs, or files you did not create.`;
  const extra: Record<Mode, string> = {
    chat: "Be concise unless the user asks for depth.",
    compare: "Answer independently and concretely. Do not mention other models.",
    research:
      "Go deep. Use ## headings. Separate what is established from what is uncertain. Never fabricate sources.",
    videos:
      "Produce a short video plan with 4 to 6 sections. Every section heading must start with '## Scene'. Under each, write a Visual line and a Voiceover line.",
    slides:
      "Produce 6 sections. Every heading must start with '## Slide'. Under each, write a one-line title and exactly 3 bullet points.",
    images:
      "Turn the request into a tight visual brief: subject, setting, light, palette, framing, and mood. Then offer two alternative directions. Do not claim an image file was created.",
  };
  const thinkLine = think
    ? "Think carefully. Put a short ## Reasoning section first, then ## Answer."
    : "";
  return [who, extra[mode], thinkLine].filter(Boolean).join("\n\n");
}

export function temperatureFor(mode: Mode, think: boolean): number {
  if (think || mode === "research") return 0.4;
  if (mode === "images") return 0.8;
  return 0.7;
}

export function maxTokensFor(mode: Mode): number {
  return mode === "chat" ? 1800 : 3200;
}

export function starterFor(mode: Mode, lang: Lang): string {
  const hi = lang === "hi";
  switch (mode) {
    case "compare":
      return hi ? "इन विकल्पों की तुलना करें: " : "Compare these options: ";
    case "research":
      return hi ? "इस पर गहराई से लिखें: " : "Research this: ";
    case "videos":
      return hi ? "इस पर एक छोटा वीडियो प्लान बनाएँ: " : "Plan a short video about ";
    case "slides":
      return hi ? "इस पर स्लाइड आउटलाइन बनाएँ: " : "Outline slides about ";
    case "images":
      return hi ? "इसका दृश्य ब्रीफ़ बनाएँ: " : "Visual brief for ";
    default:
      return "";
  }
}
