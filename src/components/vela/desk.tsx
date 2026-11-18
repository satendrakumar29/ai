import { ChatView } from "@/components/vela/chat-view";
import { ModelSheet } from "@/components/vela/model-sheet";
import { Settings, type SettingsScreen } from "@/components/vela/settings";
import { Sidebar } from "@/components/vela/sidebar";
import { Welcome } from "@/components/vela/welcome";
import { findBackground } from "@/lib/backgrounds";
import { useDesk } from "@/lib/store";
import { useEffect, useState } from "react";

export function Desk() {
  const settings = useDesk((s) => s.settings);
  const patch = useDesk((s) => s.patchSettings);
  const [hydrated, setHydrated] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settingsScreen, setSettingsScreen] = useState<SettingsScreen>("root");
  const [modelTarget, setModelTarget] = useState<null | "default" | "compare">(null);
  const [envKey, setEnvKey] = useState(false);

  useEffect(() => {
    void Promise.resolve(useDesk.persist.rehydrate()).finally(() => setHydrated(true));
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const saved = useDesk.getState().settings;
    document.documentElement.dataset.bg = saved.backgroundId;
    document.documentElement.dataset.scale = saved.fontScale;
    document.documentElement.lang = saved.language === "hi" ? "hi" : "en";
    const meta = document.querySelector('meta[name="theme-color"]');
    meta?.setAttribute("content", findBackground(saved.backgroundId).swatch);
  }, [hydrated, settings.backgroundId, settings.fontScale, settings.language]);

  useEffect(() => {
    void fetch("/api/status")
      .then((res) => res.json())
      .then((data: { env?: boolean }) => setEnvKey(Boolean(data.env)))
      .catch(() => setEnvKey(false));
  }, []);

  if (!settings.onboarded) return <Welcome ready={hydrated} />;

  return (
    <div className="flex h-dvh overflow-hidden bg-bg">
      <Sidebar
        open={navOpen}
        onClose={() => setNavOpen(false)}
        onOpenSettings={() => {
          setNavOpen(false);
          setSettingsScreen("root");
          setSettingsOpen(true);
        }}
      />
      <ChatView
        envKey={envKey}
        onOpenNav={() => setNavOpen(true)}
        onOpenModels={setModelTarget}
        onNeedKey={() => {
          setSettingsScreen("account");
          setSettingsOpen(true);
        }}
      />
      {settingsOpen && (
        <Settings envKey={envKey} initial={settingsScreen} onClose={() => setSettingsOpen(false)} />
      )}
      {modelTarget && (
        <ModelSheet
          lang={settings.language}
          target={modelTarget}
          selectedId={modelTarget === "compare" ? settings.compareModelId : settings.modelId}
          onPick={(id) => {
            patch(modelTarget === "compare" ? { compareModelId: id } : { modelId: id });
            setModelTarget(null);
          }}
          onClose={() => setModelTarget(null)}
        />
      )}
    </div>
  );
}
