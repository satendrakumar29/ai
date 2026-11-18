/**
 * OpenRouter model catalog.
 * Edit this file to rename a model or point it at a different id.
 * The chat API only accepts ids listed here.
 */
export const modelsname = [
  { id: "openrouter/free", name: "Auto Router", provider: "openrouter", group: "daily", vision: true },
  { id: "google/gemma-4-31b-it:free", name: "Gemma 4 31B", provider: "google", group: "daily", vision: true },
  { id: "baidu/ernie-5.5-flash-preview:free", name: "ERNIE 5.5 Flash", provider: "baidu", group: "daily", vision: false },
  { id: "nvidia/nemotron-3.5-lightning:free", name: "Nemotron 3.5 Lightning", provider: "nvidia", group: "daily", vision: false },
  { id: "inclusionai/ling-3.2-flash:free", name: "Ling 3.2 Flash", provider: "inclusionai", group: "daily", vision: true },
  { id: "liquid/lfm-3-1.7b:free", name: "LFM3 1.7B", provider: "liquid", group: "daily", vision: false },

  { id: "nvidia/nemotron-3-ultra-550b-a55b:free", name: "Nemotron 3 Ultra", provider: "nvidia", group: "thinking", vision: false },
  { id: "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free", name: "Nemotron 3 Nano Omni", provider: "nvidia", group: "thinking", vision: true },
  { id: "thinkingmachines/inkling-2-small:free", name: "Inkling 2 Small", provider: "thinkingmachines", group: "thinking", vision: false },
  { id: "recursive/flint-v1.0:free", name: "Flint v1.0", provider: "recursive", group: "thinking", vision: false },
  { id: "dots-studio/dots-3-note-preview:free", name: "Dots3 Note", provider: "dots-studio", group: "thinking", vision: false },

  { id: "cohere/north-mini-code:free", name: "North Mini Code", provider: "cohere", group: "code", vision: false },
  { id: "google/gemma-4-26b-a4b-it:free", name: "Gemma 4 26B A4B", provider: "google", group: "code", vision: false },
  { id: "particle-ai/particle-1:free", name: "Particle-1", provider: "particle", group: "code", vision: false },

  { id: "nvidia/nemotron-3.5-super-vl:free", name: "Nemotron 3.5 Super VL", provider: "nvidia", group: "vision", vision: true },
] as const;

export type ModelName = (typeof modelsname)[number];
export type ModelId = ModelName["id"];
export type ModelGroup = ModelName["group"];

export const MODEL_GROUPS: ModelGroup[] = ["daily", "thinking", "code", "vision"];

export const DEFAULT_MODEL_ID: ModelId = "openrouter/free";
export const DEFAULT_COMPARE_ID: ModelId = "nvidia/nemotron-3-ultra-550b-a55b:free";

export function findModel(id: string): ModelName | undefined {
  return modelsname.find((model) => model.id === id);
}

export function isModelId(id: string): id is ModelId {
  return modelsname.some((model) => model.id === id);
}

export function shortModelName(id: string): string {
  const model = findModel(id);
  if (!model) return "Model";
  if (model.id === "openrouter/free") return "Auto";
  return model.name;
}
