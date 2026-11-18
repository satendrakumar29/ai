import { Mark } from "@/components/vela/logo";
import { APP_NAME } from "@/lib/brand";
import { t } from "@/lib/i18n";
import { NEW_CHAT, useDesk, type Chat } from "@/lib/store";
import { Pin, Search, Settings, X } from "lucide-react";
import { useState } from "react";

function bucket(ts: number): "today" | "yesterday" | "week" | "older" {
  const day = 86_400_000;
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const today = start.getTime();
  const s = new Date(ts);
  s.setHours(0, 0, 0, 0);
  const diff = today - s.getTime();
  if (diff <= 0) return "today";
  if (diff <= day) return "yesterday";
  if (diff <= day * 7) return "week";
  return "older";
}

export function Sidebar({
  open,
  onClose,
  onOpenSettings,
}: {
  open: boolean;
  onClose: () => void;
  onOpenSettings: () => void;
}) {
  const lang = useDesk((s) => s.settings.language);
  const name = useDesk((s) => s.settings.name);
  const chats = useDesk((s) => s.chats);
  const activeId = useDesk((s) => s.activeId);
  const setActive = useDesk((s) => s.setActive);
  const togglePin = useDesk((s) => s.togglePin);
  const newChat = useDesk((s) => s.newChat);
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const filtered = chats.filter((chat) => {
    if (!q) return true;
    if (chat.title.toLowerCase().includes(q)) return true;
    return chat.messages.some((msg) => {
      if (msg.content.toLowerCase().includes(q)) return true;
      return msg.columns?.some((column) => column.content.toLowerCase().includes(q)) ?? false;
    });
  });
  const pinned = filtered.filter((chat) => chat.pinned).sort((a, b) => b.updatedAt - a.updatedAt);
  const rest = filtered.filter((chat) => !chat.pinned);
  const groups: Array<["today" | "yesterday" | "week" | "older", Chat[]]> = [
    ["today", []],
    ["yesterday", []],
    ["week", []],
    ["older", []],
  ];
  for (const chat of rest) {
    const group = groups.find(([id]) => id === bucket(chat.updatedAt));
    group?.[1].push(chat);
  }
  for (const [, list] of groups) list.sort((a, b) => b.updatedAt - a.updatedAt);

  function openChat(id: string) {
    setActive(id);
    onClose();
  }

  return (
    <>
      {open && (
        <button type="button" className="scrim fixed inset-0 z-30 md:hidden" aria-label={t(lang, "close")} onClick={onClose} />
      )}
      <aside
        className={`slide-x fixed inset-y-0 left-0 z-40 flex w-[min(88vw,20rem)] flex-col border-r border-line bg-bg pt-safe md:static md:z-auto md:w-80 md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-2 px-4 pb-3">
          <Mark className="size-8 text-accent" />
          <span className="text-lg font-medium">{APP_NAME}</span>
          <button type="button" className="ml-auto grid size-10 place-items-center rounded-full md:hidden" onClick={onClose} aria-label={t(lang, "close")}>
            <X className="size-5" />
          </button>
        </div>
        <div className="px-4">
          <label className="flex h-11 items-center gap-2 rounded-full bg-subtle px-3 text-muted">
            <Search className="size-4 shrink-0" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t(lang, "searchChats")}
              className="w-full bg-transparent text-sm text-fg outline-none placeholder:text-faint"
            />
          </label>
          <button
            type="button"
            onClick={() => {
              newChat();
              onClose();
            }}
            className="mt-3 h-11 w-full rounded-full bg-subtle text-sm font-medium"
          >
            {t(lang, "newChat")}
          </button>
        </div>
        <div className="scroll-thin mt-4 min-h-0 flex-1 overflow-y-auto px-3 pb-3">
          {filtered.length === 0 && (
            <p className="px-2 py-6 text-sm text-muted">{q ? t(lang, "emptySearch") : t(lang, "noChats")}</p>
          )}
          {pinned.length > 0 && (
            <section className="mb-4">
              <h2 className="px-2 pb-1 text-sm text-muted">{t(lang, "pinned")}</h2>
              {pinned.map((chat) => (
                <Row
                  key={chat.id}
                  chat={chat}
                  active={chat.id === activeId}
                  lang={lang}
                  onOpen={() => openChat(chat.id)}
                  onPin={() => togglePin(chat.id)}
                />
              ))}
            </section>
          )}
          {groups.map(([id, list]) =>
            list.length === 0 ? null : (
              <section key={id} className="mb-4">
                <h2 className="px-2 pb-1 text-sm text-muted">{t(lang, id)}</h2>
                {list.map((chat) => (
                  <Row
                    key={chat.id}
                    chat={chat}
                    active={chat.id === activeId}
                    lang={lang}
                    onOpen={() => openChat(chat.id)}
                    onPin={() => togglePin(chat.id)}
                  />
                ))}
              </section>
            ),
          )}
        </div>
        <button
          type="button"
          onClick={onOpenSettings}
          className="flex items-center gap-3 border-t border-line px-4 py-3 pb-safe text-left"
        >
          <span className="grid size-9 place-items-center rounded-full bg-accent text-sm font-semibold text-accent-fg">
            {(name || APP_NAME).slice(0, 1).toUpperCase()}
          </span>
          <span className="min-w-0 flex-1 truncate font-medium">{name || APP_NAME}</span>
          <Settings className="size-4 text-muted" />
        </button>
      </aside>
    </>
  );
}

function Row({
  chat,
  active,
  lang,
  onOpen,
  onPin,
}: {
  chat: Chat;
  active: boolean;
  lang: "en" | "hi";
  onOpen: () => void;
  onPin: () => void;
}) {
  const title = chat.title === NEW_CHAT ? t(lang, "newChat") : chat.title;
  return (
    <div className={`flex items-center rounded-xl ${active ? "bg-subtle" : ""}`}>
      <button type="button" onClick={onOpen} className="min-w-0 flex-1 truncate px-2 py-2.5 text-left text-sm">
        {title}
      </button>
      <button
        type="button"
        onClick={onPin}
        aria-label={chat.pinned ? t(lang, "unpin") : t(lang, "pin")}
        className="grid size-9 shrink-0 place-items-center text-muted"
      >
        <Pin className={`size-4 ${chat.pinned ? "fill-current text-accent" : ""}`} />
      </button>
    </div>
  );
}
