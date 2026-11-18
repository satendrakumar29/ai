import { backgrounds, findBackground } from "@/lib/backgrounds";
import { APP_VERSION } from "@/lib/brand";
import { t, type Lang } from "@/lib/i18n";
import { useDesk, type FontScale } from "@/lib/store";
import {
  ALargeSmall,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Database,
  Globe,
  Info,
  LogOut,
  Mail,
  Mic,
  Moon,
  Shield,
  Sparkles,
  UserRound,
  Volume2,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

export type SettingsScreen =
  | "root"
  | "account"
  | "data"
  | "language"
  | "appearance"
  | "font"
  | "personal"
  | "voiceLang"
  | "voice"
  | "help"
  | "about";

const VOICE_LANGS: Array<[string, string]> = [
  ["en-US", "English (US)"],
  ["en-GB", "English (UK)"],
  ["hi-IN", "Hindi"],
  ["es-ES", "Spanish"],
  ["fr-FR", "French"],
  ["de-DE", "German"],
  ["ja-JP", "Japanese"],
  ["zh-CN", "Chinese"],
];

export function Settings({
  envKey,
  initial,
  onClose,
}: {
  envKey: boolean;
  initial: SettingsScreen;
  onClose: () => void;
}) {
  const settings = useDesk((s) => s.settings);
  const patch = useDesk((s) => s.patchSettings);
  const logout = useDesk((s) => s.logout);
  const wipe = useDesk((s) => s.wipe);
  const clearChats = useDesk((s) => s.clearChats);
  const chats = useDesk((s) => s.chats);
  const lang = settings.language;
  const [screen, setScreen] = useState<SettingsScreen>(initial);
  const [confirm, setConfirm] = useState<null | "chats" | "wipe">(null);
  const [reveal, setReveal] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const load = () => setVoices(window.speechSynthesis?.getVoices() ?? []);
    load();
    window.speechSynthesis?.addEventListener("voiceschanged", load);
    return () => window.speechSynthesis?.removeEventListener("voiceschanged", load);
  }, []);

  const title =
    screen === "root"
      ? t(lang, "settings")
      : screen === "account"
        ? t(lang, "account")
        : screen === "data"
          ? t(lang, "data")
          : screen === "language"
            ? t(lang, "language")
            : screen === "appearance"
              ? t(lang, "appearance")
              : screen === "font"
                ? t(lang, "fontSize")
                : screen === "personal"
                  ? t(lang, "personalization")
                  : screen === "voiceLang"
                    ? t(lang, "mainLang")
                    : screen === "voice"
                      ? t(lang, "voice")
                      : screen === "help"
                        ? t(lang, "help")
                        : t(lang, "about");

  function back() {
    if (screen === "root") onClose();
    else setScreen("root");
  }

  function exportChats() {
    const blob = new Blob([JSON.stringify(chats, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "vela-chats.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  const filteredVoices = voices.filter((voice) =>
    voice.lang.toLowerCase().startsWith(settings.voiceLang.slice(0, 2).toLowerCase()),
  );
  const voiceList = filteredVoices.length ? filteredVoices : voices;
  const bg = findBackground(settings.backgroundId);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-bg pt-safe" role="dialog" aria-label={title}>
      <header className="grid grid-cols-[2.75rem_1fr_2.75rem] items-center px-3 py-2">
        <button type="button" onClick={back} aria-label={t(lang, "back")} className="grid size-11 place-items-center rounded-full bg-subtle">
          <ChevronLeft className="size-5" />
        </button>
        <h1 className="text-center text-lg font-medium">{title}</h1>
        <span />
      </header>
      <div className="scroll-thin min-h-0 flex-1 overflow-y-auto px-4 pb-safe">
        {screen === "root" && (
          <div className="mx-auto grid w-full max-w-lg gap-5 py-2">
            <Group label={t(lang, "profile")}>
              <Row icon={UserRound} label={t(lang, "account")} onClick={() => setScreen("account")} />
              <Row icon={Database} label={t(lang, "data")} onClick={() => setScreen("data")} />
            </Group>
            <Group label={t(lang, "app")}>
              <Row icon={Globe} label={t(lang, "language")} value={lang === "hi" ? t(lang, "hindi") : t(lang, "english")} onClick={() => setScreen("language")} />
              <Row icon={Moon} label={t(lang, "appearance")} value={lang === "hi" ? bg.hi : bg.en} onClick={() => setScreen("appearance")} />
              <Row icon={ALargeSmall} label={t(lang, "fontSize")} onClick={() => setScreen("font")} />
              <Row icon={Sparkles} label={t(lang, "personalization")} onClick={() => setScreen("personal")} />
            </Group>
            <Group label={t(lang, "audio")}>
              <Row icon={Mic} label={t(lang, "mainLang")} value={settings.voiceLang} onClick={() => setScreen("voiceLang")} />
              <Row icon={Volume2} label={t(lang, "voice")} onClick={() => setScreen("voice")} />
            </Group>
            <p className="px-1 text-sm text-muted">{t(lang, "voiceHint")}</p>
            <Group label={t(lang, "about")}>
              <Row icon={Info} label={t(lang, "about")} value={APP_VERSION} onClick={() => setScreen("about")} />
              <Row icon={CircleHelp} label={t(lang, "help")} onClick={() => setScreen("help")} />
            </Group>
            <button
              type="button"
              onClick={() => {
                logout();
                onClose();
              }}
              className="flex h-14 items-center gap-3 rounded-2xl bg-elevated px-4"
            >
              <LogOut className="size-5" />
              {t(lang, "logout")}
            </button>
          </div>
        )}

        {screen === "account" && (
          <div className="mx-auto flex min-h-full w-full max-w-lg flex-col gap-5 py-2">
            <Group label={t(lang, "profile")}>
              <label className="flex items-center gap-3 px-4 py-3">
                <UserRound className="size-5" />
                <span className="w-16 text-sm">{t(lang, "name")}</span>
                <input
                  value={settings.name}
                  onChange={(event) => patch({ name: event.target.value.slice(0, 40) })}
                  className="min-w-0 flex-1 bg-transparent text-right text-sm text-muted outline-none"
                />
              </label>
              <label className="flex items-center gap-3 border-t border-line px-4 py-3">
                <Mail className="size-5" />
                <span className="w-16 text-sm">{t(lang, "email")}</span>
                <input
                  value={settings.email}
                  onChange={(event) => patch({ email: event.target.value })}
                  className="min-w-0 flex-1 bg-transparent text-right text-sm text-muted outline-none"
                />
              </label>
            </Group>
            <Group label={t(lang, "key")}>
              <div className="px-4 py-3">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="inline-flex items-center gap-2">
                    <Shield className="size-4" />
                    {t(lang, "browserKey")}
                  </span>
                  <span className="text-muted">{settings.apiKey ? t(lang, "bound") : t(lang, "notSet")}</span>
                </div>
                <input
                  value={settings.apiKey}
                  onChange={(event) => patch({ apiKey: event.target.value.trim() })}
                  placeholder={t(lang, "keyPh")}
                  type={reveal ? "text" : "password"}
                  autoComplete="off"
                  spellCheck={false}
                  className="h-11 w-full rounded-full bg-subtle px-4 font-mono text-sm outline-none placeholder:text-faint"
                />
                <div className="mt-2 flex gap-3 text-sm text-muted">
                  <button type="button" onClick={() => setReveal((value) => !value)}>
                    {reveal ? t(lang, "hideKey") : t(lang, "showKey")}
                  </button>
                  {settings.apiKey && (
                    <button type="button" onClick={() => patch({ apiKey: "" })}>
                      {t(lang, "clearKey")}
                    </button>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-line px-4 py-3 text-sm">
                <span>{t(lang, "serverKey")}</span>
                <span className="text-muted">{envKey ? t(lang, "serverKeyOn") : t(lang, "serverKeyOff")}</span>
              </div>
            </Group>
            <p className="px-1 text-sm text-muted">{settings.apiKey ? t(lang, "usingBrowser") : envKey ? t(lang, "usingServer") : t(lang, "keyHint")}</p>
            <button type="button" onClick={() => setConfirm("wipe")} className="mt-auto py-8 text-center text-danger">
              {t(lang, "deleteAccount")}
            </button>
            {confirm === "wipe" && (
              <Confirm
                lang={lang}
                text={t(lang, "confirmDelete")}
                onCancel={() => setConfirm(null)}
                onOk={() => {
                  wipe();
                  onClose();
                }}
              />
            )}
          </div>
        )}

        {screen === "data" && (
          <div className="mx-auto grid w-full max-w-lg gap-3 py-2">
            <button type="button" onClick={exportChats} className="h-14 rounded-2xl bg-elevated px-4 text-left">
              {t(lang, "exportChats")}
            </button>
            <button type="button" onClick={() => setConfirm("chats")} className="h-14 rounded-2xl bg-elevated px-4 text-left text-danger">
              {t(lang, "clearChats")}
            </button>
            {confirm === "chats" && (
              <Confirm
                lang={lang}
                text={t(lang, "confirmClear")}
                onCancel={() => setConfirm(null)}
                onOk={() => {
                  clearChats();
                  setConfirm(null);
                }}
              />
            )}
          </div>
        )}

        {screen === "language" && (
          <div className="mx-auto grid w-full max-w-lg gap-2 py-2">
            <Choice selected={lang === "en"} label={t(lang, "english")} onClick={() => patch({ language: "en" })} />
            <Choice selected={lang === "hi"} label={t(lang, "hindi")} onClick={() => patch({ language: "hi" })} />
          </div>
        )}

        {screen === "appearance" && (
          <div className="mx-auto grid w-full max-w-lg grid-cols-4 gap-3 py-3">
            {backgrounds.map((item) => {
              const selected = item.id === settings.backgroundId;
              return (
                <button key={item.id} type="button" onClick={() => patch({ backgroundId: item.id })} className="flex flex-col items-center gap-2">
                  <span
                    className={`size-14 rounded-full border-2 ${selected ? "border-accent" : "border-transparent"}`}
                    style={{ background: item.swatch }}
                  />
                  <span className="text-xs text-muted">{lang === "hi" ? item.hi : item.en}</span>
                </button>
              );
            })}
          </div>
        )}

        {screen === "font" && (
          <div className="mx-auto grid w-full max-w-lg gap-3 py-2">
            <p className="rounded-2xl bg-elevated p-4 leading-relaxed">{t(lang, "previewLine")}</p>
            {(["sm", "md", "lg"] as FontScale[]).map((scale) => (
              <Choice
                key={scale}
                selected={settings.fontScale === scale}
                label={t(lang, scale === "sm" ? "fontSm" : scale === "md" ? "fontMd" : "fontLg")}
                onClick={() => patch({ fontScale: scale })}
              />
            ))}
          </div>
        )}

        {screen === "personal" && (
          <div className="mx-auto grid w-full max-w-lg gap-4 py-2">
            <p className="text-sm text-muted">{t(lang, "personalNote")}</p>
            <div className="flex items-center justify-between rounded-2xl bg-elevated px-4 py-3">
              <span>{t(lang, "think")}</span>
              <Toggle on={settings.thinkHarder} label={t(lang, "think")} onClick={() => patch({ thinkHarder: !settings.thinkHarder })} />
            </div>
            <p className="text-center text-lg">{t(lang, "greeting", { name: settings.name || "…" })}</p>
          </div>
        )}

        {screen === "voiceLang" && (
          <div className="mx-auto grid w-full max-w-lg gap-2 py-2">
            {VOICE_LANGS.map(([id, label]) => (
              <Choice key={id} selected={settings.voiceLang === id} label={label} onClick={() => patch({ voiceLang: id })} />
            ))}
          </div>
        )}

        {screen === "voice" && (
          <div className="mx-auto grid w-full max-w-lg gap-2 py-2">
            <Choice selected={!settings.voiceURI} label={t(lang, "systemVoice")} onClick={() => patch({ voiceURI: "" })} />
            {voiceList.length === 0 && <p className="px-1 text-sm text-muted">{t(lang, "noVoices")}</p>}
            {voiceList.map((voice) => (
              <Choice
                key={voice.voiceURI}
                selected={settings.voiceURI === voice.voiceURI}
                label={`${voice.name}`}
                onClick={() => patch({ voiceURI: voice.voiceURI })}
              />
            ))}
            <button
              type="button"
              className="mt-2 h-12 rounded-full bg-fg font-medium text-bg"
              onClick={() => {
                const utter = new SpeechSynthesisUtterance(t(lang, "previewLine"));
                utter.lang = settings.voiceLang;
                const picked = voices.find((voice) => voice.voiceURI === settings.voiceURI);
                if (picked) utter.voice = picked;
                window.speechSynthesis?.cancel();
                window.speechSynthesis?.speak(utter);
              }}
            >
              {t(lang, "speak")}
            </button>
          </div>
        )}

        {screen === "help" && <p className="mx-auto max-w-lg py-3 text-sm leading-relaxed text-muted">{t(lang, "helpBody")}</p>}
        {screen === "about" && (
          <div className="mx-auto grid max-w-lg gap-3 py-3 text-sm leading-relaxed text-muted">
            <p>{t(lang, "aboutBody")}</p>
            <p>
              {t(lang, "versionLabel")}: {APP_VERSION}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function Group({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="mb-2 px-1 text-sm text-muted">{label}</h2>
      <div className="overflow-hidden rounded-2xl bg-elevated">{children}</div>
    </section>
  );
}

function Row({
  icon: Icon,
  label,
  value,
  onClick,
}: {
  icon: typeof Globe;
  label: string;
  value?: string;
  onClick: () => void;
}) {
  return (
    <button type="button" onClick={onClick} className="flex w-full items-center gap-3 border-b border-line px-4 py-3.5 text-left last:border-b-0">
      <Icon className="size-5 shrink-0" />
      <span className="min-w-0 flex-1">{label}</span>
      {value && <span className="max-w-36 truncate text-sm text-muted">{value}</span>}
      <ChevronRight className="size-4 text-faint" />
    </button>
  );
}

function Choice({ selected, label, onClick }: { selected: boolean; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-12 items-center justify-between rounded-2xl px-4 text-left ${selected ? "bg-subtle ring-1 ring-accent" : "bg-elevated"}`}
    >
      <span>{label}</span>
      <span className={`grid size-5 place-items-center rounded-full border ${selected ? "border-accent bg-accent text-accent-fg" : "border-faint"}`}>
        {selected && <Check className="size-3" />}
      </span>
    </button>
  );
}

function Toggle({ on, label, onClick }: { on: boolean; label: string; onClick: () => void }) {
  return (
    <button type="button" role="switch" aria-checked={on} aria-label={label} onClick={onClick} className={`relative h-7 w-12 rounded-full ${on ? "bg-accent" : "bg-subtle"}`}>
      <span className={`knob absolute top-0.5 size-6 rounded-full ${on ? "translate-x-5 bg-accent-fg" : "translate-x-0.5 bg-fg"}`} />
    </button>
  );
}

function Confirm({
  lang,
  text,
  onCancel,
  onOk,
}: {
  lang: Lang;
  text: string;
  onCancel: () => void;
  onOk: () => void;
}) {
  return (
    <div className="rounded-2xl bg-subtle p-4">
      <p className="text-sm">{text}</p>
      <div className="mt-3 flex gap-2">
        <button type="button" onClick={onCancel} className="h-11 flex-1 rounded-full bg-elevated">
          {t(lang, "cancel")}
        </button>
        <button type="button" onClick={onOk} className="h-11 flex-1 rounded-full bg-fg font-medium text-danger">
          {t(lang, "delete")}
        </button>
      </div>
    </div>
  );
}
