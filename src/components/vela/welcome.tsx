import { Mark } from "@/components/vela/logo";
import { APP_VERSION } from "@/lib/brand";
import { t, type CopyKey, type Lang } from "@/lib/i18n";
import { useDesk } from "@/lib/store";
import { useEffect, useState, type FormEvent } from "react";

export function Welcome({ ready }: { ready: boolean }) {
  const settings = useDesk((s) => s.settings);
  const patch = useDesk((s) => s.patchSettings);
  const [name, setName] = useState(settings.name);
  const [email, setEmail] = useState(settings.email);
  const [apiKey, setApiKey] = useState(settings.apiKey);
  const [showKey, setShowKey] = useState(Boolean(settings.apiKey));
  const [reveal, setReveal] = useState(false);
  const [legal, setLegal] = useState<null | "privacy" | "terms">(null);
  const lang = settings.language;

  useEffect(() => {
    if (!ready) return;
    const saved = useDesk.getState().settings;
    setName(saved.name);
    setEmail(saved.email);
    setApiKey(saved.apiKey);
    setShowKey(Boolean(saved.apiKey));
  }, [ready]);

  function submit(event: FormEvent) {
    event.preventDefault();
    const nextName = name.trim();
    if (!nextName || !ready) return;
    const nextEmail = email.trim();
    if (nextEmail && !nextEmail.includes("@")) return;
    patch({
      name: nextName.slice(0, 40),
      email: nextEmail,
      apiKey: apiKey.trim(),
      onboarded: true,
    });
  }

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pb-safe pt-safe">
      <div className="flex justify-end">
        <button
          type="button"
          className="text-sm text-muted"
          onClick={() => patch({ language: lang === "en" ? "hi" : "en" })}
        >
          {lang === "en" ? "हिंदी" : "English"}
        </button>
      </div>
      <form onSubmit={submit} className="flex flex-1 flex-col items-center justify-center pb-10">
        <Mark className="mb-8 size-16 text-accent" />
        <h1 className="text-center text-3xl font-medium tracking-tight">{t(lang, "welcomeTitle")}</h1>
        <p className="mt-2 text-center text-muted">{t(lang, "welcomeSub")}</p>
        <label className="mt-8 w-full text-sm font-medium">
          {t(lang, "name")}
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder={t(lang, "namePh")}
            autoComplete="nickname"
            maxLength={40}
            className="mt-2 h-12 w-full rounded-full bg-subtle px-4 text-base outline-none placeholder:text-faint"
          />
        </label>
        <label className="mt-4 w-full text-sm font-medium">
          {t(lang, "email")}
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={t(lang, "emailPh")}
            autoComplete="email"
            inputMode="email"
            className="mt-2 h-12 w-full rounded-full bg-subtle px-4 text-base outline-none placeholder:text-faint"
          />
        </label>
        <button
          type="submit"
          disabled={!ready || !name.trim()}
          className="mt-5 flex h-12 w-full items-center justify-center rounded-full bg-fg text-base font-medium text-bg disabled:opacity-40"
        >
          {t(lang, "continue")}
        </button>
        <button
          type="button"
          className="mt-4 text-sm text-muted underline-offset-4 hover:underline"
          onClick={() => setShowKey((value) => !value)}
        >
          {showKey ? t(lang, "hideKey") : t(lang, "addKey")}
        </button>
        {showKey && (
          <label className="mt-3 w-full text-sm font-medium">
            {t(lang, "key")}
            <input
              value={apiKey}
              onChange={(event) => setApiKey(event.target.value)}
              placeholder={t(lang, "keyPh")}
              autoComplete="off"
              spellCheck={false}
              type={reveal ? "text" : "password"}
              className="mt-2 h-12 w-full rounded-full bg-subtle px-4 font-mono text-sm outline-none placeholder:text-faint"
            />
            <span className="mt-2 block font-normal text-faint">{t(lang, "keyHint")}</span>
          </label>
        )}
      </form>
      <footer className="flex items-center justify-between pb-2 text-sm text-muted">
        <button type="button" onClick={() => setLegal("privacy")}>
          {t(lang, "privacy")}
        </button>
        <button type="button" onClick={() => setLegal("terms")}>
          {t(lang, "terms")}
        </button>
      </footer>
      <p className="pb-4 text-center text-sm text-faint">
        {t(lang, "versionLabel")}: {APP_VERSION}
      </p>
      {legal && <Legal lang={lang} kind={legal} onClose={() => setLegal(null)} />}
    </main>
  );
}

export function Legal({
  lang,
  kind,
  onClose,
}: {
  lang: Lang;
  kind: "privacy" | "terms" | "help" | "about";
  onClose: () => void;
}) {
  const key: CopyKey =
    kind === "privacy" ? "privacyBody" : kind === "terms" ? "termsBody" : kind === "help" ? "helpBody" : "aboutBody";
  const title: CopyKey = kind === "privacy" ? "privacy" : kind === "terms" ? "terms" : kind === "help" ? "help" : "about";
  return (
    <div className="scrim fixed inset-0 z-50 flex items-end justify-center sm:items-center" role="presentation">
      <button type="button" className="absolute inset-0" aria-label={t(lang, "close")} onClick={onClose} />
      <article className="sheet-in relative z-10 m-3 w-full max-w-md rounded-3xl bg-elevated p-5" role="dialog">
        <h2 className="text-lg font-medium">{t(lang, title)}</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">{t(lang, key)}</p>
        <button
          type="button"
          onClick={onClose}
          className="mt-5 h-11 w-full rounded-full bg-fg font-medium text-bg"
        >
          {t(lang, "close")}
        </button>
      </article>
    </div>
  );
}
