import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { insightsArticles as staticArticles } from "@/content";
import MarkdownRenderer from "@/components/common/MarkdownRenderer";
import Footer from "@/components/layout/Footer";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  let article = await prisma.article.findUnique({
    where: { slug },
    select: { title: true, subtitle: true, excerpt: true, category: true },
  });

  if (!article) {
    article = staticArticles.find((a) => a.slug === slug);
  }

  if (!article) {
    return { title: "Blueprint Not Found // Gerat Software Solutions" };
  }

  return {
    title: `${article.title} // Gerat Insights`,
    description: article.excerpt || article.subtitle || "Gerät Technical Whitepaper",
  };
}

export default async function ArticleDetailPage({ params }) {
  const { slug } = await params;

  // 1. Try fetching from database first
  let article = await prisma.article.findUnique({
    where: { slug },
    include: {
      author: {
        select: { id: true, name: true, role: true, email: true },
      },
    },
  });

  // 2. Fallback to static content if not found in database
  if (!article) {
    const staticMatch = staticArticles.find((a) => a.slug === slug);
    if (staticMatch) {
      article = {
        ...staticMatch,
        readingTime: staticMatch.readTime,
        coverImageUrl: staticMatch.image,
        author: { name: staticMatch.author, role: "Principal Systems Architect" },
        content: `# Executive Abstract\n\n${staticMatch.excerpt}\n\n## 1. Architectural Vector\n\n${staticMatch.summary}\n\n> "High-throughput fault-tolerant computing demands strict adherence to state machine replication and zero-trust data validation."\n\n## 2. Engineered Specifications\n\n\`\`\`go\n// Gerät Core Execution Engine\ntype TelemetryBus struct {\n    ClusterID string\n    State     StateReplicated\n    Throughput int64\n}\n\`\`\`\n\n## 3. Production Outcomes\n\n- Sub-second deterministic consensus\n- Real-time audit log immutability\n- Seamless failover across regional availability zones\n`,
        tags: JSON.stringify(["SYSTEMS", "ARCHITECTURE", staticMatch.category]),
      };
    }
  }

  if (!article) {
    notFound();
  }

  // Parse tags
  let tagsList = [];
  if (article.tags) {
    try {
      tagsList = typeof article.tags === "string" && article.tags.startsWith("[")
        ? JSON.parse(article.tags)
        : article.tags.split(",").map((t) => t.trim());
    } catch {
      tagsList = [article.category];
    }
  }

  // Fetch 3 related blueprints
  let related = await prisma.article.findMany({
    where: {
      slug: { not: slug },
      status: "PUBLISHED",
    },
    take: 3,
    orderBy: { publishedAt: "desc" },
  });

  if (related.length === 0) {
    related = staticArticles.filter((a) => a.slug !== slug).slice(0, 3);
  }

  const coverSrc = article.coverImageUrl || article.image || "/image/LatestNews/01_Picture.webp";

  return (
    <div className="bg-[#050505] min-h-screen text-white selection:bg-accent selection:text-black">
      {/* Article Header Hero */}
      <section className="relative w-full pt-32 sm:pt-40 pb-16 px-4 sm:px-6 md:px-8 lg:px-12 max-w-[1440px] mx-auto">
        {/* Breadcrumb navigation */}
        <div className="flex items-center gap-2 font-azeret text-[10px] tracking-[0.2em] text-white/40 uppercase mb-8">
          <Link href="/insights" className="hover:text-accent transition-colors">
            ← ALL BLUEPRINTS
          </Link>
          <span>/</span>
          <span className="text-accent">{article.category}</span>
        </div>

        {/* Article Meta Strip */}
        <div className="flex flex-wrap items-center gap-4 font-azeret text-[10px] tracking-[0.15em] text-white/50 uppercase mb-6">
          <span className="px-2.5 py-1 bg-accent/15 border border-accent/40 text-accent font-bold rounded-[2px]">
            {article.category}
          </span>
          <span>{"//"}</span>
          <span>{article.readingTime || article.readTime || "7 MIN READ"}</span>
          <span>{"//"}</span>
          <span>
            {article.publishedAt
              ? new Date(article.publishedAt).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })
              : article.date || "RECENT DISPATCH"}
          </span>
        </div>

        {/* Title & Subtitle */}
        <h1 className="font-roc text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white max-w-5xl leading-[1.08] mb-6">
          {article.title}
        </h1>

        {article.subtitle && (
          <p className="font-sans text-base sm:text-xl text-white/70 max-w-3xl leading-relaxed mb-8">
            {article.subtitle}
          </p>
        )}

        {/* Author Card */}
        <div className="flex items-center gap-4 pt-6 border-t border-white/10 max-w-5xl">
          <div className="size-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-azeret text-xs text-white font-bold">
            {(article.author?.name || article.author || "GA").slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="font-roc text-sm font-bold uppercase text-white tracking-wide">
              {article.author?.name || article.author || "Gerät Systems Architect"}
            </div>
            <div className="font-azeret text-[10px] tracking-[0.15em] text-white/40 uppercase">
              {article.author?.role || "Engineering Directorate // Addis Ababa"}
            </div>
          </div>
        </div>
      </section>

      {/* Hero Cover Image */}
      {coverSrc && (
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 mb-16">
          <div className="relative aspect-21/9 w-full overflow-hidden rounded-[4px] border border-white/15 bg-black/60">
            <img
              src={coverSrc}
              alt={article.title}
              className="w-full h-full object-cover grayscale contrast-110 hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
          </div>
        </div>
      )}

      {/* Main Body + Sticky Technical Sidebar */}
      <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pb-24 sm:pb-36 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Markdown Content Column */}
        <main className="lg:col-span-8 flex flex-col gap-8">
          <div className="bg-[#0c0c0c] border border-white/10 p-6 sm:p-10 rounded-[4px]">
            <MarkdownRenderer content={article.content} />
          </div>

          {/* Bottom Engagement Callout */}
          <div className="p-8 bg-gradient-to-r from-accent/10 to-transparent border border-accent/30 rounded-[4px] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <div className="font-roc text-lg sm:text-xl font-bold uppercase text-white tracking-tight">
                COMMISSION TECHNICAL ARCHITECTURE
              </div>
              <p className="font-azeret text-[11px] tracking-[0.1em] text-white/60 uppercase mt-1">
                ALIGN WITH GERAT ENGINEERS ON DISTRIBUTED SYSTEMS & BRAND IDENTITY
              </p>
            </div>
            <Link
              href="/#contact"
              className="px-6 py-3 bg-accent hover:bg-white hover:text-black text-black font-azeret text-xs tracking-[0.15em] font-bold uppercase rounded-[2px] transition-all shrink-0 text-center"
            >
              INITIATE INQUIRY →
            </Link>
          </div>
        </main>

        {/* Technical Sidebar */}
        <aside className="lg:col-span-4 flex flex-col gap-6 font-azeret text-xs">
          {/* Blueprint Specs Card */}
          <div className="bg-[#0e0e0e] border border-white/10 p-6 rounded-[4px] flex flex-col gap-4 sticky top-28">
            <div className="text-[10px] tracking-[0.2em] text-accent uppercase font-bold border-b border-white/10 pb-3">
              BLUEPRINT SPECIFICATION
            </div>

            <div className="space-y-3">
              <div>
                <div className="text-[9px] tracking-[0.15em] text-white/40 uppercase">
                  CLASSIFICATION
                </div>
                <div className="text-white font-semibold mt-0.5">{article.category}</div>
              </div>

              <div>
                <div className="text-[9px] tracking-[0.15em] text-white/40 uppercase">
                  READING DURATION
                </div>
                <div className="text-white mt-0.5">
                  {article.readingTime || article.readTime || "7 MIN READ"}
                </div>
              </div>

              <div>
                <div className="text-[9px] tracking-[0.15em] text-white/40 uppercase">
                  AUTHOR / ARCHITECT
                </div>
                <div className="text-white mt-0.5">
                  {article.author?.name || article.author || "Gerät Systems Architect"}
                </div>
              </div>

              {tagsList.length > 0 && (
                <div>
                  <div className="text-[9px] tracking-[0.15em] text-white/40 uppercase mb-1.5">
                    TECHNICAL VECTORS
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {tagsList.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 bg-white/[0.04] border border-white/15 text-[9px] tracking-wider text-white/80 rounded-[2px]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
              <Link
                href="/insights"
                className="w-full py-2.5 text-center bg-white/[0.05] hover:bg-white/10 border border-white/15 text-white text-[10px] tracking-[0.15em] uppercase rounded-[2px] transition-colors"
              >
                ← RETURN TO INSIGHTS
              </Link>
            </div>
          </div>
        </aside>
      </section>

      {/* Related Publications Strip */}
      {related.length > 0 && (
        <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pb-24 border-t border-white/10 pt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-roc text-xl sm:text-2xl font-bold uppercase tracking-tight text-white">
              RELATED TECHNICAL BLUEPRINTS
            </h2>
            <Link
              href="/insights"
              className="font-azeret text-[10px] tracking-[0.2em] text-accent hover:underline uppercase"
            >
              VIEW ALL ARCHIVES →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((rel) => (
              <Link
                key={rel.id || rel.slug}
                href={`/insights/${rel.slug}`}
                className="group p-6 bg-[#0c0c0c] border border-white/10 hover:border-accent/50 rounded-[4px] transition-colors flex flex-col justify-between"
              >
                <div className="flex flex-col gap-2 mb-4">
                  <span className="font-azeret text-[9px] tracking-[0.2em] text-accent uppercase">
                    {rel.category}
                  </span>
                  <h3 className="font-roc text-lg font-bold uppercase text-white group-hover:text-accent transition-colors leading-snug">
                    {rel.title}
                  </h3>
                </div>
                <div className="font-azeret text-[9px] tracking-[0.15em] text-white/40 uppercase flex items-center justify-between pt-3 border-t border-white/5">
                  <span>{rel.readingTime || rel.readTime || "6 MIN"}</span>
                  <span className="text-accent group-hover:translate-x-1 transition-transform">
                    READ →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
