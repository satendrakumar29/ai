import { t, type Lang } from "@/lib/i18n";
import { MODEL_GROUPS, modelsname, type ModelGroup, type ModelId } from "@/lib/modelsname";
import { Brain, Check, Code, ImageIcon, MessageSquare, Search, X } from "lucide-react";
import { useMemo, useState } from "react";

const ICONS = {
  daily: MessageSquare,
  thinking: Brain,
  code: Code,
  vision: ImageIcon,
} as const;

export function ModelSheet({
  lang,
  target,
  selectedId,
  onPick,
  onClose,
}: {
  lang: Lang;
  target: "default" | "compare";
  selectedId: ModelId;
  onPick: (id: ModelId) => void;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const groups = useMemo(() => {
    return MODEL_GROUPS.map((group) => ({
      group,
      items: modelsname.filter((model) => {
        if (model.group !== group) return false;
        if (!q) return true;
        return (
          model.name.toLowerCase().includes(q) ||
          model.provider.toLowerCase().includes(q) ||
          model.id.toLowerCase().includes(q)
        );
      }),
    })).filter((group) => group.items.length > 0);
  }, [q]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center" role="presentation">
      <button type="button" className="scrim absolute inset-0" aria-label={t(lang, "close")} onClick={onClose} />
      <section
        role="dialog"
        aria-label={t(lang, "chooseModel")}
        className="sheet-in relative z-10 flex max-h-[86vh] w-full max-w-lg flex-col rounded-t-3xl bg-bg px-4 pt-4 pb-safe sm:rounded-3xl"
      >
        <div className="mb-3 flex items-start gap-3">
          <div className="min-w-0 flex-1">
            <h2 className="text-xl font-medium">{t(lang, target === "compare" ? "compareModel" : "chooseModel")}</h2>
            <p className="text-sm text-muted">{t(lang, "chooseModelSub")}</p>
          </div>
          <button type="button" onClick={onClose} aria-label={t(lang, "close")} className="grid size-10 place-items-center rounded-full bg-subtle">
            <X className="size-5" />
          </button>
        </div>
        <label className="mb-4 flex h-11 items-center gap-2 rounded-full bg-subtle px-3 text-muted">
          <Search className="size-4" />
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t(lang, "searchModel")}
            className="w-full bg-transparent text-sm text-fg outline-none placeholder:text-faint"
          />
        </label>
        <div className="scroll-thin min-h-0 flex-1 overflow-y-auto pb-4">
          {groups.length === 0 && <p className="py-8 text-center text-sm text-muted">{t(lang, "noModels")}</p>}
          {groups.map(({ group, items }) => (
            <section key={group} className="mb-4">
              <h3 className="mb-2 text-xs font-medium tracking-widest text-faint">{t(lang, groupLabel(group))}</h3>
              <div className="grid gap-2">
                {items.map((model) => {
                  const selected = model.id === selectedId;
                  const Icon = ICONS[model.group];
                  return (
                    <button
                      key={model.id}
                      type="button"
                      onClick={() => onPick(model.id)}
                      className={`flex items-center gap-3 rounded-2xl p-3 text-left ${selected ? "bg-subtle ring-1 ring-accent" : "bg-elevated"}`}
                    >
                      <span className={`grid size-11 shrink-0 place-items-center rounded-xl ${selected ? "bg-accent text-accent-fg" : "bg-subtle"}`}>
                        <Icon className="size-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-medium">{model.name}</span>
                        <span className="block truncate text-sm text-muted">
                          {model.provider} · {t(lang, "free")}
                        </span>
                      </span>
                      <span className={`grid size-5 shrink-0 place-items-center rounded-full border ${selected ? "border-accent bg-accent text-accent-fg" : "border-faint"}`}>
                        {selected && <Check className="size-3" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </section>
    </div>
  );
}

function groupLabel(group: ModelGroup): "daily" | "thinking" | "code" | "vision" {
  return group;
}
