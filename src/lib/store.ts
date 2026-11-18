import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { BackgroundId } from "@/lib/backgrounds";
import type { Lang } from "@/lib/i18n";
import { DEFAULT_COMPARE_ID, DEFAULT_MODEL_ID, type ModelId } from "@/lib/modelsname";
import type { Mode } from "@/lib/modes";

export const IMAGE_MARKER = "[Image attached]";
export const NEW_CHAT = "New chat";

export type Column = { modelId: string; content: string; reasoning: string };

export type Msg = {
  id: string;
  role: "user" | "assistant";
  content: string;
  modelId?: string;
  reasoning?: string;
  columns?: Column[];
};

export type Chat = {
  id: string;
  title: string;
  pinned: boolean;
  createdAt: number;
  updatedAt: number;
  messages: Msg[];
};

export type FontScale = "sm" | "md" | "lg";

export type Settings = {
  modelId: ModelId;
  compareModelId: ModelId;
  backgroundId: BackgroundId;
  fontScale: FontScale;
  language: Lang;
  voiceLang: string;
  voiceURI: string;
  thinkHarder: boolean;
  mode: Mode;
  name: string;
  email: string;
  apiKey: string;
  onboarded: boolean;
};

type DeskState = {
  settings: Settings;
  chats: Chat[];
  activeId: string | null;
  patchSettings: (patch: Partial<Settings>) => void;
  logout: () => void;
  wipe: () => void;
  newChat: () => string;
  setActive: (id: string | null) => void;
  togglePin: (id: string) => void;
  removeChat: (id: string) => void;
  clearChats: () => void;
  appendUser: (chatId: string, content: string) => void;
  beginAssistant: (chatId: string, modelId: string, columnIds?: string[]) => string;
  appendDelta: (
    chatId: string,
    msgId: string,
    delta: string,
    columnIndex: number | null,
    reasoning: boolean,
  ) => void;
  dropLast: (chatId: string) => void;
};

export const defaultSettings = (): Settings => ({
  modelId: DEFAULT_MODEL_ID,
  compareModelId: DEFAULT_COMPARE_ID,
  backgroundId: "ink",
  fontScale: "md",
  language: "en",
  voiceLang: "en-US",
  voiceURI: "",
  thinkHarder: false,
  mode: "chat",
  name: "",
  email: "",
  apiKey: "",
  onboarded: false,
});

function titleFrom(content: string): string {
  const clean = content
    .replace(IMAGE_MARKER, "")
    .replace(/\s+/g, " ")
    .trim();
  if (!clean) return NEW_CHAT;
  if (clean.length <= 42) return clean;
  return `${clean.slice(0, 41)}…`;
}

function touch(chat: Chat, messages: Msg[], title?: string): Chat {
  return {
    ...chat,
    title: title ?? chat.title,
    messages,
    updatedAt: Date.now(),
  };
}

export const useDesk = create<DeskState>()(
  persist(
    (set, get) => ({
      settings: defaultSettings(),
      chats: [],
      activeId: null,
      patchSettings: (patch) => set((state) => ({ settings: { ...state.settings, ...patch } })),
      logout: () => set((state) => ({ settings: { ...state.settings, onboarded: false } })),
      wipe: () => set({ settings: defaultSettings(), chats: [], activeId: null }),
      newChat: () => {
        const state = get();
        const current = state.chats.find((chat) => chat.id === state.activeId);
        if (current && current.messages.length === 0) return current.id;
        const id = crypto.randomUUID();
        const now = Date.now();
        set({
          activeId: id,
          chats: [
            { id, title: NEW_CHAT, pinned: false, createdAt: now, updatedAt: now, messages: [] },
            ...state.chats,
          ],
        });
        return id;
      },
      setActive: (id) => set({ activeId: id }),
      togglePin: (id) =>
        set((state) => ({
          chats: state.chats.map((chat) => (chat.id === id ? { ...chat, pinned: !chat.pinned } : chat)),
        })),
      removeChat: (id) =>
        set((state) => {
          const chats = state.chats.filter((chat) => chat.id !== id);
          const activeId = state.activeId === id ? (chats[0]?.id ?? null) : state.activeId;
          return { chats, activeId };
        }),
      clearChats: () => set({ chats: [], activeId: null }),
      appendUser: (chatId, content) =>
        set((state) => ({
          chats: state.chats.map((chat) => {
            if (chat.id !== chatId) return chat;
            const msg: Msg = { id: crypto.randomUUID(), role: "user", content };
            const title = chat.title === NEW_CHAT ? titleFrom(content) : chat.title;
            return touch(chat, [...chat.messages, msg], title);
          }),
        })),
      beginAssistant: (chatId, modelId, columnIds) => {
        const id = crypto.randomUUID();
        set((state) => ({
          chats: state.chats.map((chat) => {
            if (chat.id !== chatId) return chat;
            const msg: Msg = {
              id,
              role: "assistant",
              content: "",
              modelId,
              reasoning: "",
              columns: columnIds?.map((columnModel) => ({
                modelId: columnModel,
                content: "",
                reasoning: "",
              })),
            };
            return touch(chat, [...chat.messages, msg]);
          }),
        }));
        return id;
      },
      appendDelta: (chatId, msgId, delta, columnIndex, reasoning) =>
        set((state) => ({
          chats: state.chats.map((chat) => {
            if (chat.id !== chatId) return chat;
            const messages = chat.messages.map((msg) => {
              if (msg.id !== msgId) return msg;
              if (columnIndex == null) {
                return reasoning
                  ? { ...msg, reasoning: (msg.reasoning ?? "") + delta }
                  : { ...msg, content: msg.content + delta };
              }
              const columns = msg.columns?.map((column, index) => {
                if (index !== columnIndex) return column;
                return reasoning
                  ? { ...column, reasoning: column.reasoning + delta }
                  : { ...column, content: column.content + delta };
              });
              return { ...msg, columns };
            });
            return { ...chat, messages, updatedAt: chat.updatedAt };
          }),
        })),
      dropLast: (chatId) =>
        set((state) => ({
          chats: state.chats.map((chat) =>
            chat.id === chatId ? { ...chat, messages: chat.messages.slice(0, -1) } : chat,
          ),
        })),
    }),
    {
      name: "vela-desk",
      skipHydration: true,
      partialize: (state) => ({
        settings: state.settings,
        chats: state.chats,
        activeId: state.activeId,
      }),
    },
  ),
);
