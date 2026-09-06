import React from "react";

/**
 * Lightweight, zero-dependency Markdown renderer tailored for Gerät's dark architectural aesthetics.
 */
export default function MarkdownRenderer({ content = "", className = "" }) {
  if (!content) return null;

  // Split by code blocks first
  const blocks = parseMarkdownBlocks(content);

  return (
    <div className={`space-y-4 text-white/80 leading-relaxed font-sans ${className}`}>
      {blocks.map((block, idx) => {
        if (block.type === "code") {
          return (
            <div
              key={idx}
              className="my-6 rounded-[3px] border border-white/15 bg-black/80 overflow-hidden font-mono text-xs"
            >
              <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/[0.03] font-azeret text-[9px] tracking-[0.15em] text-white/40 uppercase">
                <span>{block.lang || "CODE"}</span>
                <span className="text-accent">GERAT // TERMINAL</span>
              </div>
              <pre className="p-4 overflow-x-auto text-emerald-400 leading-relaxed">
                <code>{block.code}</code>
              </pre>
            </div>
          );
        }

        if (block.type === "h1") {
          return (
            <h1
              key={idx}
              className="font-roc text-2xl sm:text-3xl font-bold uppercase text-white tracking-tight mt-8 mb-4 border-b border-white/10 pb-2"
            >
              {renderInline(block.text)}
            </h1>
          );
        }

        if (block.type === "h2") {
          return (
            <h2
              key={idx}
              className="font-roc text-xl sm:text-2xl font-bold uppercase text-white tracking-tight mt-6 mb-3 text-accent"
            >
              {renderInline(block.text)}
            </h2>
          );
        }

        if (block.type === "h3") {
          return (
            <h3
              key={idx}
              className="font-roc text-lg sm:text-xl font-bold uppercase text-white tracking-tight mt-5 mb-2"
            >
              {renderInline(block.text)}
            </h3>
          );
        }

        if (block.type === "h4") {
          return (
            <h4
              key={idx}
              className="font-azeret text-sm font-bold uppercase text-white/90 tracking-wider mt-4 mb-2"
            >
              {renderInline(block.text)}
            </h4>
          );
        }

        if (block.type === "blockquote") {
          return (
            <blockquote
              key={idx}
              className="p-4 my-4 bg-white/[0.03] border-l-2 border-accent text-white/90 font-serif italic text-sm sm:text-base rounded-r-[2px]"
            >
              {renderInline(block.text)}
            </blockquote>
          );
        }

        if (block.type === "hr") {
          return <hr key={idx} className="my-8 border-t border-white/10" />;
        }

        if (block.type === "ul") {
          return (
            <ul key={idx} className="space-y-1.5 list-disc list-inside text-white/80 my-3 pl-2">
              {block.items.map((item, i) => (
                <li key={i}>{renderInline(item)}</li>
              ))}
            </ul>
          );
        }

        if (block.type === "ol") {
          return (
            <ol key={idx} className="space-y-1.5 list-decimal list-inside text-white/80 my-3 pl-2">
              {block.items.map((item, i) => (
                <li key={i}>{renderInline(item)}</li>
              ))}
            </ol>
          );
        }

        return (
          <p key={idx} className="text-sm sm:text-base text-white/80 leading-relaxed font-sans">
            {renderInline(block.text)}
          </p>
        );
      })}
    </div>
  );
}

function parseMarkdownBlocks(raw) {
  const lines = raw.split("\n");
  const blocks = [];
  let inCode = false;
  let codeLang = "";
  let codeLines = [];
  let currentList = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check code fence
    if (line.trim().startsWith("```")) {
      if (!inCode) {
        if (currentList) {
          blocks.push(currentList);
          currentList = null;
        }
        inCode = true;
        codeLang = line.trim().slice(3).trim();
        codeLines = [];
      } else {
        inCode = false;
        blocks.push({ type: "code", lang: codeLang, code: codeLines.join("\n") });
        codeLang = "";
        codeLines = [];
      }
      continue;
    }

    if (inCode) {
      codeLines.push(line);
      continue;
    }

    const trimmed = line.trim();

    if (!trimmed) {
      if (currentList) {
        blocks.push(currentList);
        currentList = null;
      }
      continue;
    }

    // Horizontal Rule
    if (trimmed === "---" || trimmed === "***" || trimmed === "___") {
      if (currentList) {
        blocks.push(currentList);
        currentList = null;
      }
      blocks.push({ type: "hr" });
      continue;
    }

    // Headings
    if (trimmed.startsWith("# ")) {
      if (currentList) {
        blocks.push(currentList);
        currentList = null;
      }
      blocks.push({ type: "h1", text: trimmed.slice(2) });
      continue;
    }
    if (trimmed.startsWith("## ")) {
      if (currentList) {
        blocks.push(currentList);
        currentList = null;
      }
      blocks.push({ type: "h2", text: trimmed.slice(3) });
      continue;
    }
    if (trimmed.startsWith("### ")) {
      if (currentList) {
        blocks.push(currentList);
        currentList = null;
      }
      blocks.push({ type: "h3", text: trimmed.slice(4) });
      continue;
    }
    if (trimmed.startsWith("#### ")) {
      if (currentList) {
        blocks.push(currentList);
        currentList = null;
      }
      blocks.push({ type: "h4", text: trimmed.slice(5) });
      continue;
    }

    // Blockquote
    if (trimmed.startsWith("> ")) {
      if (currentList) {
        blocks.push(currentList);
        currentList = null;
      }
      blocks.push({ type: "blockquote", text: trimmed.slice(2) });
      continue;
    }

    // Unordered List (- or *)
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      const itemText = trimmed.slice(2);
      if (currentList && currentList.type === "ul") {
        currentList.items.push(itemText);
      } else {
        if (currentList) blocks.push(currentList);
        currentList = { type: "ul", items: [itemText] };
      }
      continue;
    }

    // Ordered List (1. )
    const olMatch = trimmed.match(/^\d+\.\s+(.*)/);
    if (olMatch) {
      const itemText = olMatch[1];
      if (currentList && currentList.type === "ol") {
        currentList.items.push(itemText);
      } else {
        if (currentList) blocks.push(currentList);
        currentList = { type: "ol", items: [itemText] };
      }
      continue;
    }

    // Normal paragraph
    if (currentList) {
      blocks.push(currentList);
      currentList = null;
    }

    blocks.push({ type: "p", text: line });
  }

  if (inCode) {
    blocks.push({ type: "code", lang: codeLang, code: codeLines.join("\n") });
  }
  if (currentList) {
    blocks.push(currentList);
  }

  return blocks;
}

function renderInline(text) {
  if (!text) return "";

  // Split by inline markdown tokens: `code`, **bold**, *italic*, [link](url)
  const regex = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g;
  const parts = text.split(regex);

  return parts.map((part, i) => {
    if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
      return (
        <code
          key={i}
          className="bg-white/10 text-accent font-mono text-xs px-1.5 py-0.5 rounded-[2px]"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return (
        <strong key={i} className="font-bold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      return (
        <em key={i} className="italic text-white/90">
          {part.slice(1, -1)}
        </em>
      );
    }
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      return (
        <a
          key={i}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent underline hover:text-white transition-colors"
        >
          {linkMatch[1]}
        </a>
      );
    }
    return part;
  });
}
