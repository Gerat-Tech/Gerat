"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const DIVISIONS = [
  { key: "EXECUTIVE_LEADERSHIP", label: "EXECUTIVE LEADERSHIP" },
  { key: "ENGINEERING_PRACTITIONER", label: "ENGINEERING PRACTITIONER" },
  { key: "CREATIVE_DIRECTOR", label: "CREATIVE & BRAND DIRECTOR" },
  { key: "ADVISOR", label: "TECHNICAL & STRATEGIC ADVISOR" },
];

export default function TeamMemberEditor({ initialMember = null }) {
  const router = useRouter();

  const [name, setName] = useState(initialMember?.name || "");
  const [roleTitle, setRoleTitle] = useState(initialMember?.roleTitle || "");
  const [division, setDivision] = useState(
    initialMember?.division || "ENGINEERING_PRACTITIONER"
  );
  const [focusTag, setFocusTag] = useState(
    initialMember?.focusTag || "SYSTEMS ARCHITECTURE // DISTRIBUTED LEDGERS"
  );
  const [bio, setBio] = useState(
    initialMember?.bio ||
      "Directing core architectural roadmaps, high-concurrency systems, and mission-critical engineering initiatives."
  );
  const [photoUrl, setPhotoUrl] = useState(
    initialMember?.photoUrl || "/image/team/leadership/WQF__0000_Founder-IgorTulchinsky.webp"
  );
  const [order, setOrder] = useState(initialMember?.order || 1);
  const [active, setActive] = useState(initialMember ? initialMember.active : true);
  const [linkedinUrl, setLinkedinUrl] = useState(initialMember?.linkedinUrl || "");
  const [githubUrl, setGithubUrl] = useState(initialMember?.githubUrl || "");
  const [twitterUrl, setTwitterUrl] = useState(initialMember?.twitterUrl || "");

  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleSave = async () => {
    if (!name.trim() || !roleTitle.trim()) {
      showToast("Error: Name and Role Title are required.");
      return;
    }

    setIsSaving(true);
    const payload = {
      name: name.trim(),
      roleTitle: roleTitle.trim(),
      division,
      focusTag: focusTag.trim(),
      bio: bio.trim(),
      photoUrl: photoUrl.trim(),
      order: Number(order) || 0,
      active,
      linkedinUrl: linkedinUrl.trim() || null,
      githubUrl: githubUrl.trim() || null,
      twitterUrl: twitterUrl.trim() || null,
    };

    try {
      const isNew = !initialMember?.id;
      const url = isNew ? "/api/team" : `/api/team/${initialMember.id}`;
      const method = isNew ? "POST" : "PATCH";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save team member.");

      showToast("Team member saved successfully!");
      if (isNew && data.member?.id) {
        router.push(`/dashboard/team/${data.member.id}`);
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

  const handleDelete = async () => {
    if (!initialMember?.id) return;
    if (!confirm(`Are you sure you want to remove ${name} from the roster?`)) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/team/${initialMember.id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete team member.");
      }
      router.push("/dashboard/team");
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

      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1 font-azeret text-[10px] tracking-[0.15em] text-white/50">
            <Link href="/dashboard/team" className="hover:text-white transition-colors">
              ← TEAM ROSTER
            </Link>
            <span>/</span>
            <span className="text-accent uppercase font-bold">
              {initialMember?.id ? "EDIT MEMBER PROFILE" : "NEW ROSTER ADDITION"}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-roc text-2xl sm:text-3xl font-bold uppercase text-white tracking-tight">
              {name || "UNNAMED ARCHITECT"}
            </h1>
            <span className="font-azeret text-[9px] tracking-[0.2em] px-2 py-0.5 rounded-[2px] bg-white/[0.05] border border-white/15 text-white/80 uppercase">
              {division.replace("_", " ")}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 font-azeret text-[10px] tracking-[0.15em] uppercase font-bold">
          <Link
            href="/team"
            target="_blank"
            className="py-2 px-3 bg-white/[0.04] hover:bg-white/10 border border-white/15 text-white/80 rounded-[2px] transition-colors flex items-center gap-1.5"
          >
            <span>VIEW PUBLIC ROSTER ↗</span>
          </Link>

          {initialMember?.id && (
            <button
              type="button"
              disabled={isDeleting || isSaving}
              onClick={handleDelete}
              className="py-2 px-3 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-500/40 text-rose-400 rounded-[2px] transition-colors disabled:opacity-40"
            >
              {isDeleting ? "REMOVING..." : "REMOVE"}
            </button>
          )}

          <button
            type="button"
            disabled={isSaving}
            onClick={handleSave}
            className="py-2 px-5 bg-accent hover:bg-[#ff5c1a] text-black rounded-[2px] transition-colors disabled:opacity-40"
          >
            {isSaving ? "COMMITTING..." : "SAVE PROFILE"}
          </button>
        </div>
      </div>

      {/* Main Form & Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Controls (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="bg-[#121212] border border-white/10 p-5 rounded-[3px] flex flex-col gap-4 font-azeret text-xs">
            <span className="text-[10px] tracking-[0.2em] text-accent uppercase font-bold border-b border-white/10 pb-2">
              PROFESSIONAL IDENTITY & ROLE
            </span>

            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] tracking-[0.15em] text-white/40 uppercase">
                FULL LEGAL / PROFESSIONAL NAME:
              </label>
              <input
                type="text"
                required
                placeholder="e.g. DAWIT TEKLEBRHAN"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-black/60 border border-white/15 px-3 py-2.5 text-white font-roc text-lg font-bold uppercase rounded-[2px] focus:border-accent outline-none tracking-tight"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] tracking-[0.15em] text-white/40 uppercase">
                  OFFICIAL ROLE TITLE:
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. FOUNDER & CHIEF EXECUTIVE OFFICER"
                  value={roleTitle}
                  onChange={(e) => setRoleTitle(e.target.value)}
                  className="bg-black/60 border border-white/15 px-3 py-2 text-white font-sans text-xs rounded-[2px] focus:border-accent outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] tracking-[0.15em] text-white/40 uppercase">
                  DIVISION / CADRE:
                </label>
                <select
                  value={division}
                  onChange={(e) => setDivision(e.target.value)}
                  className="bg-black/60 border border-white/15 px-3 py-2 text-white text-xs rounded-[2px] focus:border-accent outline-none"
                >
                  {DIVISIONS.map((d) => (
                    <option key={d.key} value={d.key}>
                      {d.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] tracking-[0.15em] text-white/40 uppercase">
                SPECIALTY FOCUS TAG:
              </label>
              <input
                type="text"
                placeholder="SYSTEMS ARCHITECTURE // DISTRIBUTED LEDGERS"
                value={focusTag}
                onChange={(e) => setFocusTag(e.target.value)}
                className="bg-black/60 border border-white/15 px-3 py-2 text-accent font-mono text-xs rounded-[2px] focus:border-accent outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] tracking-[0.15em] text-white/40 uppercase">
                EXECUTIVE BIOGRAPHY:
              </label>
              <textarea
                rows={4}
                required
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="bg-black/60 border border-white/15 p-3 text-white font-sans text-xs rounded-[2px] focus:border-accent outline-none resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] tracking-[0.15em] text-white/40 uppercase">
                  PHOTO PATH / ASSET URL:
                </label>
                <input
                  type="text"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  placeholder="/image/team/leadership/..."
                  className="bg-black/60 border border-white/15 px-3 py-2 text-white text-xs rounded-[2px] focus:border-accent outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] tracking-[0.15em] text-white/40 uppercase">
                  ROSTER DISPLAY ORDER:
                </label>
                <input
                  type="number"
                  value={order}
                  onChange={(e) => setOrder(Number(e.target.value))}
                  className="bg-black/60 border border-white/15 px-3 py-2 text-white text-xs rounded-[2px] focus:border-accent outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-2 border-t border-white/5">
              <span className="text-[9px] tracking-[0.15em] text-white/40 uppercase">
                EXTERNAL CONNECTIVITY VECTORS (OPTIONAL):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="LinkedIn URL"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  className="bg-black/60 border border-white/15 px-2.5 py-1.5 text-white text-xs rounded-[2px]"
                />
                <input
                  type="text"
                  placeholder="GitHub URL"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  className="bg-black/60 border border-white/15 px-2.5 py-1.5 text-white text-xs rounded-[2px]"
                />
                <input
                  type="text"
                  placeholder="Twitter / X URL"
                  value={twitterUrl}
                  onChange={(e) => setTwitterUrl(e.target.value)}
                  className="bg-black/60 border border-white/15 px-2.5 py-1.5 text-white text-xs rounded-[2px]"
                />
              </div>
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-2 text-white cursor-pointer">
                <input
                  type="checkbox"
                  checked={active}
                  onChange={(e) => setActive(e.target.checked)}
                  className="accent-accent"
                />
                <span className="text-[10px] tracking-[0.1em] uppercase font-bold text-accent">
                  ACTIVE ON PUBLIC ROSTER
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Live Card Preview (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="sticky top-28 flex flex-col gap-4">
            <span className="font-azeret text-[10px] tracking-[0.2em] text-accent uppercase font-bold">
              LIVE ROSTER CARD PREVIEW
            </span>

            <div className="bg-[#0c0c0c] border border-white/15 rounded-[4px] overflow-hidden flex flex-col shadow-2xl">
              <div className="relative aspect-4/5 w-full overflow-hidden bg-black/80 border-b border-white/10">
                <img
                  src={photoUrl || "/image/team/leadership/WQF__0000_Founder-IgorTulchinsky.webp"}
                  alt={name}
                  className="w-full h-full object-cover grayscale contrast-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-transparent to-transparent opacity-80" />

                <div className="absolute top-3 left-3 font-azeret text-[9px] tracking-[0.2em] text-accent bg-black/90 px-2.5 py-0.5 border border-accent/40 rounded-[1px] uppercase">
                  {division.replace("_", " ")}
                </div>

                <div className="absolute bottom-3 left-3 right-3 font-azeret text-[10px] tracking-wider text-accent uppercase truncate">
                  {focusTag}
                </div>
              </div>

              <div className="p-6 flex flex-col gap-3">
                <h3 className="font-roc text-xl font-bold uppercase text-white tracking-tight">
                  {name || "ARCHITECT NAME"}
                </h3>

                <div className="font-azeret text-[10px] tracking-[0.15em] text-white/50 uppercase">
                  {roleTitle || "ENGINEERING LEADERSHIP"}
                </div>

                <p className="font-sans text-xs text-white/70 leading-relaxed pt-2 border-t border-white/5">
                  {bio}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
