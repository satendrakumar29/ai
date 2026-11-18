import { Sectioned } from "@/components/vela/rich-text";
import { compressImage, readTextFile } from "@/lib/files";
import { t, type CopyKey, type Lang } from "@/lib/i18n";
import { findModel, shortModelName } from "@/lib/modelsname";
import { MODES, maxTokensFor, starterFor, systemPrompt, temperatureFor, type Mode } from "@/lib/modes";
import { isAbortError, streamCompletion, type ApiMessage } from "@/lib/stream";
import { IMAGE_MARKER, useDesk, type Msg } from "@/lib/store";
import {
  ArrowUp,
  Camera,
  Clapperboard,
  Columns2,
  Copy,
  Image as ImageIcon,
  Menu,
  Mic,
  Paperclip,
  Plus,
  Presentation,
  RotateCcw,
  Square,
  Telescope,
  Volume2,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Rec = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((ev: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

type Attachment = { name: string; kind: "image" | "file"; payload: string };

const MODE_ICON: Record<Exclude<Mode, "chat">, typeof Telescope> = {
  compare: Columns2,
  research: Telescope,
  videos: Clapperboard,
  slides: Presentation,
  images: ImageIcon,
};

const MODE_KEY: Record<Exclude<Mode, "chat">, CopyKey> = {
  compare: "compare",
  research: "research",
  videos: "videos",
  slides: "slides",
  images: "images",
};

function plain(msg: Msg): string {
  if (msg.columns?.length) {
    return msg.columns
      .map((column) => column.content)
      .filter(Boolean)
      .join("\n\n");
  }
  return msg.content.replace(IMAGE_MARKER, "").trim();
}

export function ChatView({
  envKey,
  onOpenNav,
  onOpenModels,
  onNeedKey,
}: {
  envKey: boolean;
  onOpenNav: () => void;
  onOpenModels: (target: "default" | "compare") => void;
  onNeedKey: () => void;
}) {
  const settings = useDesk((s) => s.settings);
  const patch = useDesk((s) => s.patchSettings);
  const chats = useDesk((s) => s.chats);
  const activeId = useDesk((s) => s.activeId);
  const chat = chats.find((item) => item.id === activeId) ?? null;
  const lang = settings.language;
  const hasKey = envKey || settings.apiKey.trim().length > 0;

  const [draft, setDraft] = useState("");
  const [attachment, setAttachment] = useState<Attachment | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [listening, setListening] = useState(false);
  const [copiedId, setCopiedId] = useState("");
  const abortRef = useRef<AbortController | null>(null);
  const recRef = useRef<Rec | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const boxRef = useRef<HTMLTextAreaElement>(null);

  const activeMode = settings.mode === "chat" ? null : settings.mode;
  const empty = !chat || chat.messages.length === 0;

  const tail = chat?.messages[chat.messages.length - 1];
  const tailMark = `${tail?.content ?? ""}${tail?.columns?.map((column) => column.content).join("") ?? ""}`;

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [tailMark, busy]);

  useEffect(() => () => abortRef.current?.abort(), []);

  useEffect(() => {
    if (!menuOpen) return;
    const close = () => setMenuOpen(false);
    window.addEventListener("pointerdown", close);
    return () => window.removeEventListener("pointerdown", close);
  }, [menuOpen]);

  function grow(el: HTMLTextAreaElement) {
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 168)}px`;
  }

  async function takeImage(file: File | undefined) {
    if (!file) return;
    try {
      const payload = await compressImage(file);
      setAttachment({ name: file.name || "image", kind: "image", payload });
      setError("");
    } catch {
      setError(t(lang, "imageFail"));
    }
  }

  async function takeFile(file: File | undefined) {
    if (!file) return;
    if (file.size > 1_500_000) {
      setError(t(lang, "fileBig"));
      return;
    }
    if (file.type.startsWith("image/")) {
      await takeImage(file);
      return;
    }
    const payload = await readTextFile(file);
    setAttachment({ name: file.name, kind: "file", payload });
    setError("");
  }

  function messagesFor(chatId: string, imagePayload?: string): ApiMessage[] {
    const fresh = useDesk.getState();
    const current = fresh.chats.find((item) => item.id === chatId);
    const msgs: ApiMessage[] = [
      { role: "system", content: systemPrompt(fresh.settings.mode, fresh.settings.name, fresh.settings.thinkHarder) },
    ];
    const history = current?.messages ?? [];
    history.forEach((msg, index) => {
      const text = plain(msg);
      if (!text) return;
      const last = index === history.length - 1;
      if (msg.role === "user" && last && imagePayload) {
        msgs.push({
          role: "user",
          content: [
            { type: "text", text },
            { type: "image_url", image_url: { url: imagePayload } },
          ],
        });
        return;
      }
      msgs.push({ role: msg.role, content: text });
    });
    return msgs;
  }

  async function run(chatId: string, imagePayload?: string) {
    const snap = useDesk.getState().settings;
    const controller = new AbortController();
    abortRef.current = controller;
    setBusy(true);
    setError("");
    const compare = snap.mode === "compare";
    const models = compare ? [snap.modelId, snap.compareModelId] : [snap.modelId];
    const messages = messagesFor(chatId, imagePayload);
    const msgId = useDesk.getState().beginAssistant(chatId, snap.modelId, compare ? [...models] : undefined);
    let any = false;
    try {
      await Promise.all(
        models.map(async (model, index) => {
          const column = compare ? index : null;
          try {
            let got = false;
            await streamCompletion({
              model,
              messages,
              apiKey: snap.apiKey.trim(),
              temperature: temperatureFor(snap.mode, snap.thinkHarder),
              maxTokens: maxTokensFor(snap.mode),
              signal: controller.signal,
              onText: (delta) => {
                got = true;
                any = true;
                useDesk.getState().appendDelta(chatId, msgId, delta, column, false);
              },
              onReasoning: (delta) => {
                useDesk.getState().appendDelta(chatId, msgId, delta, column, true);
              },
            });
            if (!got && !controller.signal.aborted) {
              useDesk.getState().appendDelta(chatId, msgId, t(snap.language, "emptyReply"), column, false);
            }
          } catch (err) {
            if (isAbortError(err) || controller.signal.aborted) throw err;
            const message = err instanceof Error ? err.message : t(snap.language, "emptyReply");
            useDesk.getState().appendDelta(chatId, msgId, message, column, false);
            setError(message);
          }
        }),
      );
    } catch (err) {
      if (!isAbortError(err)) {
        const message = err instanceof Error ? err.message : t(snap.language, "emptyReply");
        if (!any) useDesk.getState().appendDelta(chatId, msgId, message, null, false);
        setError(message);
      }
    } finally {
      setBusy(false);
      abortRef.current = null;
    }
  }

  async function send() {
    if (busy) return;
    const text = draft.trim();
    if (!text && !attachment) return;
    if (!hasKey) {
      setError(t(lang, "needKey"));
      onNeedKey();
      return;
    }
    if (attachment?.kind === "image") {
      const primary = findModel(settings.modelId);
      const secondary = findModel(settings.compareModelId);
      const blocked =
        settings.mode === "compare" ? !primary?.vision || !secondary?.vision : !primary?.vision;
      if (blocked) {
        setError(t(lang, "needVision"));
        return;
      }
    }
    let content = text;
    let imagePayload: string | undefined;
    if (attachment?.kind === "file") {
      content = `${text}\n\n\`\`\`\n${attachment.payload}\n\`\`\``.trim();
    } else if (attachment?.kind === "image") {
      imagePayload = attachment.payload;
      const caption = text || t(lang, "describeImage");
      content = `${caption}\n\n${IMAGE_MARKER}`;
    }
    let chatId = useDesk.getState().activeId;
    if (!chatId || !useDesk.getState().chats.some((item) => item.id === chatId)) {
      chatId = useDesk.getState().newChat();
    }
    useDesk.getState().appendUser(chatId, content);
    setDraft("");
    setAttachment(null);
    if (boxRef.current) boxRef.current.style.height = "auto";
    await run(chatId, imagePayload);
  }

  async function retry() {
    if (busy || !chat) return;
    const last = chat.messages[chat.messages.length - 1];
    if (last?.role !== "assistant") return;
    useDesk.getState().dropLast(chat.id);
    await run(chat.id);
  }

  function toggleMic() {
    const w = window as Window & {
      SpeechRecognition?: new () => Rec;
      webkitSpeechRecognition?: new () => Rec;
    };
    const Ctor = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!Ctor) {
      setError(t(lang, "voiceUnsupported"));
      return;
    }
    if (listening && recRef.current) {
      recRef.current.stop();
      return;
    }
    const base = draft.trim();
    const rec = new Ctor();
    rec.lang = settings.voiceLang;
    rec.interimResults = true;
    rec.continuous = false;
    rec.onresult = (ev) => {
      let said = "";
      for (let i = 0; i < ev.results.length; i += 1) said += ev.results[i]?.[0]?.transcript ?? "";
      setDraft(`${base} ${said}`.trim());
    };
    rec.onerror = () => setListening(false);
    rec.onend = () => setListening(false);
    recRef.current = rec;
    setListening(true);
    setError("");
    rec.start();
  }

  function chooseMode(mode: Mode) {
    patch({ mode });
    setMenuOpen(false);
    if (!draft.trim()) setDraft(starterFor(mode, lang));
    boxRef.current?.focus();
  }

  async function copyText(id: string, text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      window.setTimeout(() => setCopiedId(""), 1200);
    } catch {
      setError(t(lang, "couldNotCopy"));
    }
  }

  function speak(text: string) {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = settings.voiceLang;
    const picked = window.speechSynthesis?.getVoices().find((voice) => voice.voiceURI === settings.voiceURI);
    if (picked) utter.voice = picked;
    window.speechSynthesis?.cancel();
    window.speechSynthesis?.speak(utter);
  }

  return (
    <section className="flex min-h-0 min-w-0 flex-1 flex-col">
      <header className="flex items-center gap-2 px-3 py-3 pt-safe">
        <button type="button" onClick={onOpenNav} aria-label={t(lang, "menu")} className="grid size-11 place-items-center rounded-full bg-subtle md:hidden">
          <Menu className="size-5" />
        </button>
        <p className="min-w-0 flex-1 truncate text-center text-sm text-muted">
          {chat && chat.messages.length > 0 ? chat.title : ""}
        </p>
        <span className="size-11 md:hidden" />
      </header>

      {empty ? (
        <div className="flex flex-1 flex-col items-center justify-center px-6">
          <div className="relative">
            <div className="vela-glow pointer-events-none absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full" />
            <h1 className="relative max-w-xl text-center text-3xl leading-tight font-medium tracking-tight md:text-4xl">
              {t(lang, "greeting", { name: settings.name || "there" })}
            </h1>
          </div>
        </div>
      ) : (
        <div className="scroll-thin min-h-0 flex-1 overflow-y-auto">
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-5 px-4 py-4">
            {chat?.messages.map((msg, index) => {
              const last = index === chat.messages.length - 1;
              if (msg.role === "user") {
                const text = msg.content.replace(IMAGE_MARKER, "").trim();
                const image = msg.content.includes(IMAGE_MARKER);
                return (
                  <div key={msg.id} className="flex justify-end">
                    <div className="max-w-[85%] rounded-3xl rounded-br-lg bg-subtle px-4 py-3">
                      {text && <p className="whitespace-pre-wrap">{text}</p>}
                      {image && <p className="mt-1 text-sm text-muted">{t(lang, "attached")}</p>}
                    </div>
                  </div>
                );
              }
              return (
                <article key={msg.id} className="max-w-full">
                  {msg.columns?.length ? (
                    <div className="grid gap-3 md:grid-cols-2">
                      {msg.columns.map((column) => (
                        <div key={column.modelId} className="min-w-0 rounded-2xl bg-elevated p-4">
                          <p className="mb-2 text-sm text-muted">{shortModelName(column.modelId)}</p>
                          {column.reasoning && <Reasoning lang={lang} text={column.reasoning} />}
                          {column.content ? (
                            <Sectioned text={column.content} />
                          ) : busy && last ? (
                            <Dots />
                          ) : null}
                          {column.content && (
                            <Actions
                              lang={lang}
                              copied={copiedId === `${msg.id}-${column.modelId}`}
                              onCopy={() => void copyText(`${msg.id}-${column.modelId}`, column.content)}
                              onSpeak={() => speak(column.content)}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div>
                      <p className="mb-1 text-sm text-muted">{shortModelName(msg.modelId || settings.modelId)}</p>
                      {msg.reasoning && <Reasoning lang={lang} text={msg.reasoning} />}
                      {msg.content ? <Sectioned text={msg.content} /> : busy && last ? <Dots /> : null}
                      {msg.content && (
                        <Actions
                          lang={lang}
                          copied={copiedId === msg.id}
                          onCopy={() => void copyText(msg.id, msg.content)}
                          onSpeak={() => speak(msg.content)}
                          onRetry={last ? () => void retry() : undefined}
                        />
                      )}
                    </div>
                  )}
                </article>
              );
            })}
            <div ref={endRef} />
          </div>
        </div>
      )}

      <div className="mx-auto w-full max-w-3xl px-3 pb-safe">
        {!hasKey && (
          <button type="button" onClick={onNeedKey} className="mb-2 block w-full text-center text-sm text-accent">
            {t(lang, "needKey")}
          </button>
        )}
        {error && <p className="mb-2 text-center text-sm text-danger">{error}</p>}
        {empty && (
          <div className="mb-3 flex flex-wrap justify-center gap-2">
            {MODES.map((mode) => {
              const Icon = MODE_ICON[mode];
              return (
                <button
                  key={mode}
                  type="button"
                  onClick={() => chooseMode(mode)}
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-subtle px-4 text-sm"
                >
                  <Icon className="size-4" />
                  {t(lang, MODE_KEY[mode])}
                </button>
              );
            })}
          </div>
        )}
        {activeMode && (
          <div className="mb-2 flex justify-center">
            <button
              type="button"
              onClick={() => patch({ mode: "chat" })}
              className="inline-flex h-9 items-center gap-2 rounded-full bg-subtle px-3 text-sm"
            >
              {t(lang, MODE_KEY[activeMode])}
              <X className="size-3.5" />
              <span className="sr-only">{t(lang, "clearMode")}</span>
            </button>
          </div>
        )}
        {attachment && (
          <div className="mb-2 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-subtle px-3 py-1 text-sm">
              {attachment.name}
              <button type="button" aria-label={t(lang, "remove")} onClick={() => setAttachment(null)}>
                <X className="size-3.5" />
              </button>
            </span>
          </div>
        )}
        {listening && <p className="mb-2 text-center text-sm text-accent">{t(lang, "listening")}</p>}
        <div className="relative rounded-3xl bg-elevated px-3 pt-3 pb-2">
          {menuOpen && (
            <div
              className="menu-in absolute bottom-full left-2 z-20 mb-2 w-56 rounded-2xl border border-line bg-elevated p-1.5"
              onPointerDown={(event) => event.stopPropagation()}
            >
              <MenuButton icon={Camera} label={t(lang, "camera")} onClick={() => cameraRef.current?.click()} />
              <MenuButton icon={ImageIcon} label={t(lang, "photos")} onClick={() => photoRef.current?.click()} />
              <MenuButton icon={Paperclip} label={t(lang, "files")} onClick={() => fileRef.current?.click()} />
              <MenuButton
                icon={Telescope}
                label={t(lang, "think")}
                active={settings.thinkHarder}
                onClick={() => patch({ thinkHarder: !settings.thinkHarder })}
              />
              <p className="px-3 pt-2 pb-1 text-xs text-faint">{t(lang, "modes")}</p>
              {MODES.map((mode) => (
                <MenuButton
                  key={mode}
                  icon={MODE_ICON[mode]}
                  label={t(lang, MODE_KEY[mode])}
                  active={settings.mode === mode}
                  onClick={() => chooseMode(mode)}
                />
              ))}
            </div>
          )}
          <textarea
            ref={boxRef}
            value={draft}
            rows={1}
            placeholder={t(lang, "ask")}
            onChange={(event) => {
              setDraft(event.target.value);
              grow(event.target);
              if (error) setError("");
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
                event.preventDefault();
                void send();
              }
            }}
            className="max-h-40 w-full resize-none bg-transparent px-1 text-base outline-none placeholder:text-faint"
          />
          <div className="flex items-center gap-1 pt-1">
            <button
              type="button"
              aria-label={t(lang, "attach")}
              onPointerDown={(event) => event.stopPropagation()}
              onClick={() => setMenuOpen((value) => !value)}
              className="grid size-10 place-items-center rounded-full"
            >
              <Plus className="size-5" />
            </button>
            <button type="button" onClick={() => onOpenModels("default")} className="inline-flex h-10 items-center gap-1 rounded-full px-2 text-sm text-muted">
              {shortModelName(settings.modelId)}
            </button>
            {settings.mode === "compare" && (
              <button type="button" onClick={() => onOpenModels("compare")} className="inline-flex h-10 items-center rounded-full px-2 text-sm text-muted">
                {shortModelName(settings.compareModelId)}
              </button>
            )}
            <span className="flex-1" />
            <button type="button" onClick={toggleMic} aria-label={t(lang, "mic")} className={`grid size-10 place-items-center rounded-full ${listening ? "text-accent" : ""}`}>
              <Mic className="size-5" />
            </button>
            {busy ? (
              <button type="button" onClick={() => abortRef.current?.abort()} aria-label={t(lang, "stop")} className="grid size-10 place-items-center rounded-full bg-fg text-bg">
                <Square className="size-4 fill-current" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => void send()}
                disabled={!draft.trim() && !attachment}
                aria-label={t(lang, "send")}
                className="grid size-10 place-items-center rounded-full bg-fg text-bg disabled:opacity-40"
              >
                <ArrowUp className="size-5" />
              </button>
            )}
          </div>
        </div>
      </div>
      <input
        ref={cameraRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          event.target.value = "";
          void takeImage(file);
        }}
      />
      <input
        ref={photoRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          event.target.value = "";
          void takeImage(file);
        }}
      />
      <input
        ref={fileRef}
        type="file"
        accept=".txt,.md,.json,.csv,.ts,.tsx,.js,.py,.html,.css,text/plain"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          event.target.value = "";
          void takeFile(file);
        }}
      />
    </section>
  );
}

function Dots() {
  return (
    <span className="inline-flex h-6 items-center gap-1" aria-hidden="true">
      <span className="pulse-dot" />
      <span className="pulse-dot" />
      <span className="pulse-dot" />
    </span>
  );
}

function Reasoning({ lang, text }: { lang: Lang; text: string }) {
  return (
    <details className="mb-2 text-sm text-muted">
      <summary>{t(lang, "reasoning")}</summary>
      <p className="mt-2 whitespace-pre-wrap">{text}</p>
    </details>
  );
}

function Actions({
  lang,
  copied,
  onCopy,
  onSpeak,
  onRetry,
}: {
  lang: Lang;
  copied: boolean;
  onCopy: () => void;
  onSpeak: () => void;
  onRetry?: () => void;
}) {
  return (
    <div className="mt-2 flex gap-1">
      <button type="button" onClick={onCopy} aria-label={t(lang, "copy")} className="grid size-9 place-items-center rounded-full text-muted">
        <Copy className="size-4" />
      </button>
      {copied && <span className="self-center text-xs text-muted">{t(lang, "copied")}</span>}
      <button type="button" onClick={onSpeak} aria-label={t(lang, "speak")} className="grid size-9 place-items-center rounded-full text-muted">
        <Volume2 className="size-4" />
      </button>
      {onRetry && (
        <button type="button" onClick={onRetry} aria-label={t(lang, "retry")} className="grid size-9 place-items-center rounded-full text-muted">
          <RotateCcw className="size-4" />
        </button>
      )}
    </div>
  );
}

function MenuButton({
  icon: Icon,
  label,
  onClick,
  active,
}: {
  icon: typeof Plus;
  label: string;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <button type="button" onClick={onClick} className="flex h-11 w-full items-center gap-3 rounded-xl px-3 text-left text-sm">
      <Icon className="size-4" />
      <span className="flex-1">{label}</span>
      {active && <span className="size-2 rounded-full bg-accent" />}
    </button>
  );
}
