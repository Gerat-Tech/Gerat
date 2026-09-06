"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MarkdownRenderer from "@/components/common/MarkdownRenderer";
import StatusBadge from "@/components/dashboard/common/StatusBadge";

const CATEGORIES = [
  "SYSTEM ARCHITECTURE",
  "BRAND ARCHITECTURE",
  "APPLIED AI",
  "INFRASTRUCTURE",
  "ENTERPRISE ERP",
  "CYBERSECURITY",
  "DESIGN ENGINEERING",
  "FIELD DISPATCH",
];

const STATUSES = [
  { key: "DRAFT", label: "DRAFT" },
  { key: "IN_REVIEW", label: "IN REVIEW" },
  { key: "SCHEDULED", label: "SCHEDULED" },
  { key: "PUBLISHED", label: "PUBLISHED" },
  { key: "ARCHIVED", label: "ARCHIVED" },
];

export default function ArticleEditor({ initialArticle = null, authors = [] }) {
  const router = useRouter();
  const textareaRef = useRef(null);

  // Form State
  const [title, setTitle] = useState(initialArticle?.title || "");
  const [subtitle, setSubtitle] = useState(initialArticle?.subtitle || "");
  const [slug, setSlug] = useState(initialArticle?.slug || "");
  const [isSlugLocked, setIsSlugLocked] = useState(Boolean(initialArticle?.id));
  const [category, setCategory] = useState(initialArticle?.category || "SYSTEM ARCHITECTURE");
  const [status, setStatus] = useState(initialArticle?.status || "DRAFT");
  const [authorId, setAuthorId] = useState(initialArticle?.authorId || authors[0]?.id || "");
  const [content, setContent] = useState(
    initialArticle?.content ||
      `# Executive Blueprint Overview\n\nProvide an engineering abstract and architectural context for this whitepaper.\n\n## 1. Problem Topology\n\nDetail the core failure modes or scaling bottlenecks encountered in production.\n\n> "In distributed systems, eventual consistency is not a compromise—it is a geometric reality of network partitions."\n\n## 2. Engineered Architecture\n\nDescribe the consensus protocols, state machines, and data schemas deployed.\n\n\`\`\`go\npackage consensus\n\ntype NodeCluster struct {\n    LeaderID   string\n    CommitIndex int64\n    Topology   []string\n}\n\`\`\`\n\n## 3. Production Telemetry\n\n- Verification Latency: Sub-12ms\n- Fault Recovery Time: < 350ms\n- Replication Factor: 3x Across Fault Domains\n`
  );
  const [excerpt, setExcerpt] = useState(initialArticle?.excerpt || "");
  const [coverImageUrl, setCoverImageUrl] = useState(
    initialArticle?.coverImageUrl || "/image/LatestNews/01_Picture.webp"
  );
  const [tags, setTags] = useState(
    initialArticle?.tags
      ? typeof initialArticle.tags === "string" && initialArticle.tags.startsWith("[")
        ? JSON.parse(initialArticle.tags).join(", ")
        : initialArticle.tags
      : "DISTRIBUTED SYSTEMS, ARCHITECTURE, RAFT"
  );
  const [featured, setFeatured] = useState(Boolean(initialArticle?.featured));

  // UI state
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeTab, setActiveTab] = useState("split"); // "split" | "editor" | "preview" | "meta"
  const [toastMessage, setToastMessage] = useState("");

  // Auto-slugify on title changes if not locked
  const handleTitleChange = (val) => {
    setTitle(val);
    if (!isSlugLocked) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")
      );
    }
  };

  // Metrics
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const readingTime = `${Math.max(1, Math.ceil(wordCount / 200))} MIN READ`;

  // Toolbar Insert Helper
  const insertToken = (before, after = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const replacement = before + selectedText + after;

    const newContent =
      content.substring(0, start) + replacement + content.substring(end);
    setContent(newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 10);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  // Submit Handler
  const handleSave = async (targetStatus = status) => {
    if (!title.trim()) {
      showToast("Error: Title is required.");
      return;
    }

    setIsSaving(true);
    const payload = {
      title: title.trim(),
      subtitle: subtitle.trim() || null,
      slug: slug.trim() || undefined,
      category,
      status: targetStatus,
      authorId: authorId || null,
      content,
      excerpt: excerpt.trim() || content.slice(0, 180) + "...",
      readingTime,
      coverImageUrl: coverImageUrl.trim() || null,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      featured,
    };

    try {
      const isNew = !initialArticle?.id;
      const url = isNew ? "/api/articles" : `/api/articles/${initialArticle.id}`;
      const method = isNew ? "POST" : "PATCH";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to save article.");
      }

      showToast(`Article ${targetStatus === "PUBLISHED" ? "published" : "saved"} successfully!`);
      setStatus(targetStatus);

      if (isNew && data.article?.id) {
        router.push(`/dashboard/insights/${data.article.id}`);
      } else {
        router.refresh();
      }
    } catch (err) {
      console.error(err);
      showToast(`Error: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  // Delete Handler
  const handleDelete = async () => {
    if (!initialArticle?.id) return;
    if (!confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) {
      return;
    }

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/articles/${initialArticle.id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete article.");
      }
      router.push("/dashboard/insights");
    } catch (err) {
      console.error(err);
      showToast(`Error: ${err.message}`);
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#161616] border border-accent text-white px-4 py-3 rounded-[3px] font-azeret text-xs tracking-wider shadow-2xl flex items-center gap-2">
          <span className="size-2 rounded-full bg-accent animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header & Publishing Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1 font-azeret text-[10px] tracking-[0.15em] text-white/50">
            <Link href="/dashboard/insights" className="hover:text-white transition-colors">
              ← INSIGHTS CMS
            </Link>
            <span>/</span>
            <span className="text-accent uppercase font-bold">
              {initialArticle?.id ? "EDIT BLUEPRINT" : "NEW PUBLICATION"}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-roc text-2xl sm:text-3xl font-bold uppercase text-white tracking-tight">
              {title || "UNTITLED WHITE PAPER"}
            </h1>
            <StatusBadge status={status} />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 font-azeret text-[10px] tracking-[0.15em] uppercase font-bold">
          {initialArticle?.slug && status === "PUBLISHED" && (
            <Link
              href={`/insights/${slug}`}
              target="_blank"
              className="py-2 px-3 bg-white/[0.04] hover:bg-white/10 border border-white/15 text-white/80 rounded-[2px] transition-colors flex items-center gap-1.5"
            >
              <span>VIEW LIVE ↗</span>
            </Link>
          )}

          {initialArticle?.id && (
            <button
              type="button"
              disabled={isDeleting || isSaving}
              onClick={handleDelete}
              className="py-2 px-3 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-500/40 text-rose-400 rounded-[2px] transition-colors disabled:opacity-40"
            >
              {isDeleting ? "DELETING..." : "DELETE"}
            </button>
          )}

          <button
            type="button"
            disabled={isSaving}
            onClick={() => handleSave("DRAFT")}
            className="py-2 px-4 bg-white/[0.06] hover:bg-white/15 border border-white/20 text-white rounded-[2px] transition-colors disabled:opacity-40"
          >
            {isSaving ? "SAVING..." : "SAVE DRAFT"}
          </button>

          <button
            type="button"
            disabled={isSaving}
            onClick={() => handleSave("PUBLISHED")}
            className="py-2 px-4 bg-accent hover:bg-[#ff5c1a] text-black rounded-[2px] transition-colors disabled:opacity-40"
          >
            {isSaving ? "COMMITTING..." : "PUBLISH NOW"}
          </button>
        </div>
      </div>

      {/* Responsive View Tabs */}
      <div className="flex border-b border-white/10 gap-2 font-azeret text-[10px] tracking-[0.15em] uppercase">
        <button
          type="button"
          onClick={() => setActiveTab("split")}
          className={`py-2 px-4 border-b-2 transition-colors hidden lg:block ${
            activeTab === "split"
              ? "border-accent text-accent font-bold"
              : "border-transparent text-white/50 hover:text-white"
          }`}
        >
          SPLIT SCREEN (EDITOR + PREVIEW)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("editor")}
          className={`py-2 px-4 border-b-2 transition-colors ${
            activeTab === "editor"
              ? "border-accent text-accent font-bold"
              : "border-transparent text-white/50 hover:text-white"
          }`}
        >
          MARKDOWN EDITOR
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("preview")}
          className={`py-2 px-4 border-b-2 transition-colors ${
            activeTab === "preview"
              ? "border-accent text-accent font-bold"
              : "border-transparent text-white/50 hover:text-white"
          }`}
        >
          LIVE PREVIEW
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("meta")}
          className={`py-2 px-4 border-b-2 transition-colors ${
            activeTab === "meta"
              ? "border-accent text-accent font-bold"
              : "border-transparent text-white/50 hover:text-white"
          }`}
        >
          METADATA & TAXONOMY
        </button>
      </div>

      {/* Main Content Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column / Editor & Preview Area */}
        <div
          className={`${
            activeTab === "meta" ? "hidden" : "col-span-12 lg:col-span-8 flex flex-col gap-6"
          }`}
        >
          {/* Document Title & Subtitle Card */}
          <div className="bg-[#121212] border border-white/10 p-5 rounded-[3px] flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-azeret text-[9px] tracking-[0.15em] text-white/40 uppercase">
                ARTICLE TITLE:
              </label>
              <input
                type="text"
                required
                placeholder="e.g. ARCHITECTING SUB-SECOND AUDIT LOG CONSENSUS"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full bg-black/60 border border-white/15 px-3 py-2.5 text-white font-roc text-lg font-bold uppercase rounded-[2px] focus:border-accent outline-none tracking-tight"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-azeret text-[9px] tracking-[0.15em] text-white/40 uppercase">
                SUBTITLE / EXECUTIVE ABSTRACT:
              </label>
              <input
                type="text"
                placeholder="e.g. A technical retrospective on fault-tolerant distributed consensus"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="w-full bg-black/60 border border-white/15 px-3 py-2 text-white font-sans text-xs rounded-[2px] focus:border-accent outline-none"
              />
            </div>
          </div>

          {/* Editor + Live Preview Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* RAW MARKDOWN EDITOR */}
            {(activeTab === "split" || activeTab === "editor") && (
              <div
                className={`bg-[#121212] border border-white/10 rounded-[3px] flex flex-col overflow-hidden ${
                  activeTab === "editor" ? "col-span-2" : ""
                }`}
              >
                {/* Editor Toolbar */}
                <div className="p-2 border-b border-white/10 bg-black/40 flex flex-wrap items-center gap-1 font-azeret text-[10px]">
                  <button
                    type="button"
                    title="Heading 1"
                    onClick={() => insertToken("# ")}
                    className="px-2 py-1 bg-white/[0.04] hover:bg-white/10 text-white rounded-[2px]"
                  >
                    H1
                  </button>
                  <button
                    type="button"
                    title="Heading 2"
                    onClick={() => insertToken("## ")}
                    className="px-2 py-1 bg-white/[0.04] hover:bg-white/10 text-white rounded-[2px]"
                  >
                    H2
                  </button>
                  <button
                    type="button"
                    title="Heading 3"
                    onClick={() => insertToken("### ")}
                    className="px-2 py-1 bg-white/[0.04] hover:bg-white/10 text-white rounded-[2px]"
                  >
                    H3
                  </button>
                  <span className="text-white/20 px-1">|</span>
                  <button
                    type="button"
                    title="Bold"
                    onClick={() => insertToken("**", "**")}
                    className="px-2 py-1 bg-white/[0.04] hover:bg-white/10 text-white font-bold rounded-[2px]"
                  >
                    B
                  </button>
                  <button
                    type="button"
                    title="Italic"
                    onClick={() => insertToken("*", "*")}
                    className="px-2 py-1 bg-white/[0.04] hover:bg-white/10 text-white italic rounded-[2px]"
                  >
                    I
                  </button>
                  <button
                    type="button"
                    title="Code Block"
                    onClick={() => insertToken("```go\n", "\n```")}
                    className="px-2 py-1 bg-white/[0.04] hover:bg-white/10 text-accent font-mono rounded-[2px]"
                  >
                    {"</>"}
                  </button>
                  <button
                    type="button"
                    title="Blockquote"
                    onClick={() => insertToken("> ")}
                    className="px-2 py-1 bg-white/[0.04] hover:bg-white/10 text-white rounded-[2px]"
                  >
                    &ldquo;
                  </button>
                  <button
                    type="button"
                    title="Bullet List"
                    onClick={() => insertToken("- ")}
                    className="px-2 py-1 bg-white/[0.04] hover:bg-white/10 text-white rounded-[2px]"
                  >
                    • List
                  </button>
                  <button
                    type="button"
                    title="Divider"
                    onClick={() => insertToken("\n---\n")}
                    className="px-2 py-1 bg-white/[0.04] hover:bg-white/10 text-white rounded-[2px]"
                  >
                    ―
                  </button>
                </div>

                {/* Textarea */}
                <textarea
                  ref={textareaRef}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={24}
                  className="w-full p-4 bg-transparent text-white/90 font-mono text-xs leading-relaxed outline-none resize-y"
                  placeholder="Write full whitepaper content in Markdown..."
                />

                {/* Editor Bottom Stats */}
                <div className="px-4 py-2 bg-black/40 border-t border-white/5 flex items-center justify-between font-azeret text-[9px] tracking-[0.15em] text-white/40 uppercase">
                  <span>WORDS: {wordCount}</span>
                  <span>READ TIME: {readingTime}</span>
                </div>
              </div>
            )}

            {/* LIVE PREVIEW PANE */}
            {(activeTab === "split" || activeTab === "preview") && (
              <div
                className={`bg-[#0d0d0d] border border-white/10 rounded-[3px] p-6 overflow-y-auto max-h-[640px] flex flex-col gap-4 ${
                  activeTab === "preview" ? "col-span-2" : ""
                }`}
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="font-azeret text-[9px] tracking-[0.2em] text-accent uppercase font-bold">
                    LIVE RENDERED BLUEPRINT
                  </span>
                  <span className="font-azeret text-[9px] text-white/40 uppercase">
                    {category}
                  </span>
                </div>

                {title && (
                  <h1 className="font-roc text-2xl font-bold uppercase text-white tracking-tight leading-tight">
                    {title}
                  </h1>
                )}

                {subtitle && (
                  <p className="font-sans text-xs text-white/60 italic leading-relaxed">
                    {subtitle}
                  </p>
                )}

                <div className="pt-2 border-t border-white/5">
                  <MarkdownRenderer content={content} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column / Metadata Inspector */}
        <div
          className={`${
            activeTab === "meta"
              ? "col-span-12"
              : "col-span-12 lg:col-span-4"
          } flex flex-col gap-4`}
        >
          <div className="bg-[#121212] border border-white/10 p-5 rounded-[3px] flex flex-col gap-4 font-azeret text-xs">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-[10px] tracking-[0.2em] text-white/40 uppercase font-bold">
                METADATA & TAXONOMY
              </span>
              <StatusBadge status={status} />
            </div>

            {/* URL Slug */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[9px] tracking-[0.15em] text-white/40 uppercase">
                  URL SLUG:
                </label>
                <label className="flex items-center gap-1 text-[9px] text-white/40 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isSlugLocked}
                    onChange={(e) => setIsSlugLocked(e.target.checked)}
                    className="accent-accent"
                  />
                  <span>LOCK SLUG</span>
                </label>
              </div>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="e.g. sub-second-audit-consensus"
                className="w-full bg-black/60 border border-white/15 px-3 py-2 text-white font-mono text-xs rounded-[2px] focus:border-accent outline-none"
              />
              <span className="text-[9px] text-white/30 truncate">
                Route: /insights/{slug || "slug"}
              </span>
            </div>

            {/* Category Select */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] tracking-[0.15em] text-white/40 uppercase">
                DISCIPLINE / CATEGORY:
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-black/60 border border-white/15 px-3 py-2 text-white text-xs rounded-[2px] focus:border-accent outline-none"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Select */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] tracking-[0.15em] text-white/40 uppercase">
                LIFECYCLE STATUS:
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="bg-black/60 border border-white/15 px-3 py-2 text-white text-xs rounded-[2px] focus:border-accent outline-none"
              >
                {STATUSES.map((s) => (
                  <option key={s.key} value={s.key}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Author Select */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] tracking-[0.15em] text-white/40 uppercase">
                PRIMARY AUTHOR / ARCHITECT:
              </label>
              <select
                value={authorId}
                onChange={(e) => setAuthorId(e.target.value)}
                className="bg-black/60 border border-white/15 px-3 py-2 text-white text-xs rounded-[2px] focus:border-accent outline-none"
              >
                {authors.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name} ({a.role})
                  </option>
                ))}
              </select>
            </div>

            {/* Tags Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] tracking-[0.15em] text-white/40 uppercase">
                TAGS (COMMA SEPARATED):
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="DISTRIBUTED SYSTEMS, RAFT, GO"
                className="w-full bg-black/60 border border-white/15 px-3 py-2 text-white text-xs rounded-[2px] focus:border-accent outline-none"
              />
            </div>

            {/* Cover Image URL */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] tracking-[0.15em] text-white/40 uppercase">
                COVER IMAGE PATH:
              </label>
              <input
                type="text"
                value={coverImageUrl}
                onChange={(e) => setCoverImageUrl(e.target.value)}
                placeholder="/image/LatestNews/01_Picture.webp"
                className="w-full bg-black/60 border border-white/15 px-3 py-2 text-white text-xs rounded-[2px] focus:border-accent outline-none"
              />
            </div>

            {/* Excerpt */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] tracking-[0.15em] text-white/40 uppercase">
                CARD EXCERPT (FALLBACK TO FIRST 180 CHARS):
              </label>
              <textarea
                rows={3}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Brief summary for listings and SEO meta description..."
                className="w-full bg-black/60 border border-white/15 p-2.5 text-white text-xs rounded-[2px] focus:border-accent outline-none resize-none"
              />
            </div>

            {/* Featured Checkbox */}
            <label className="flex items-center gap-2 text-white/80 cursor-pointer pt-2 border-t border-white/5">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="accent-accent"
              />
              <span className="text-[10px] tracking-[0.1em] uppercase font-bold">
                FEATURE ON HOMEPAGE
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
