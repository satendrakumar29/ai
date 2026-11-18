import type { ReactNode } from "react";

function inline(text: string): ReactNode[] {
  const bits = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return bits.map((bit, index) => {
    if (bit.startsWith("**") && bit.endsWith("**") && bit.length > 4) {
      return (
        <strong key={index} className="font-semibold">
          {bit.slice(2, -2)}
        </strong>
      );
    }
    if (bit.startsWith("`") && bit.endsWith("`") && bit.length > 2) {
      return (
        <code key={index} className="rounded-md bg-subtle px-1 py-0.5 font-mono text-sm">
          {bit.slice(1, -1)}
        </code>
      );
    }
    return <span key={index}>{bit}</span>;
  });
}

function blocks(text: string): ReactNode[] {
  const lines = text.split("\n");
  const out: ReactNode[] = [];
  let i = 0;
  let key = 0;
  while (i < lines.length) {
    const line = lines[i] ?? "";
    if (!line.trim()) {
      i += 1;
      continue;
    }
    if (line.startsWith("### ")) {
      out.push(
        <h3 key={key} className="mt-3 text-base font-semibold first:mt-0">
          {inline(line.slice(4))}
        </h3>,
      );
      key += 1;
      i += 1;
      continue;
    }
    if (line.startsWith("## ")) {
      out.push(
        <h2 key={key} className="mt-3 text-lg font-semibold first:mt-0">
          {inline(line.slice(3))}
        </h2>,
      );
      key += 1;
      i += 1;
      continue;
    }
    if (line.startsWith("# ")) {
      out.push(
        <h2 key={key} className="mt-3 text-lg font-semibold first:mt-0">
          {inline(line.slice(2))}
        </h2>,
      );
      key += 1;
      i += 1;
      continue;
    }
    if (line.startsWith("- ") || line.startsWith("* ")) {
      const items: string[] = [];
      while (i < lines.length && (lines[i]?.startsWith("- ") || lines[i]?.startsWith("* "))) {
        items.push((lines[i] ?? "").slice(2));
        i += 1;
      }
      out.push(
        <ul key={key} className="my-2 list-disc space-y-1 pl-5">
          {items.map((item, index) => (
            <li key={index}>{inline(item)}</li>
          ))}
        </ul>,
      );
      key += 1;
      continue;
    }
    const para: string[] = [];
    while (
      i < lines.length &&
      lines[i]?.trim() &&
      !lines[i]?.startsWith("#") &&
      !lines[i]?.startsWith("- ") &&
      !lines[i]?.startsWith("* ")
    ) {
      para.push(lines[i] ?? "");
      i += 1;
    }
    out.push(
      <p key={key} className="my-2 first:mt-0 last:mb-0">
        {inline(para.join(" "))}
      </p>,
    );
    key += 1;
  }
  return out;
}

export function RichText({ text }: { text: string }) {
  const chunks = text.split("```");
  return (
    <div className="text-base leading-relaxed">
      {chunks.map((chunk, index) => {
        if (index % 2 === 1) {
          const nl = chunk.indexOf("\n");
          const code = nl === -1 ? chunk : chunk.slice(nl + 1);
          return (
            <pre key={index} className="my-2 overflow-x-auto rounded-xl bg-subtle p-3 font-mono text-sm">
              <code>{code.replace(/\n$/, "")}</code>
            </pre>
          );
        }
        return <div key={index}>{blocks(chunk)}</div>;
      })}
    </div>
  );
}

export function Sectioned({ text }: { text: string }) {
  const parts = text.split(/\n(?=## )/);
  const headings = parts.filter((part) => part.startsWith("## ")).length;
  if (headings < 2) return <RichText text={text} />;
  return (
    <div className="grid gap-3">
      {parts.map((part, index) => (
        <article key={index} className={part.startsWith("## ") ? "rounded-2xl bg-elevated p-4" : ""}>
          <RichText text={part} />
        </article>
      ))}
    </div>
  );
}
