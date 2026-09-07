"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Authentication failed. Verify your credentials.");
        setIsLoading(false);
        return;
      }

      router.push(callbackUrl);
      router.refresh();
    } catch {
      setError("Network or server connection error. Please try again.");
      setIsLoading(false);
    }
  };

  const handleQuickFill = (presetKey, presetEmail, presetPass) => {
    setEmail(presetEmail);
    setPassword(presetPass);
    setSelectedPreset(presetKey);
    setError("");
  };

  return (
    <div className="min-h-screen w-full bg-[#080808] text-white flex flex-col justify-between p-4 sm:p-8 font-sans selection:bg-accent selection:text-black">
      {/* Top Header Status */}
      <header className="w-full max-w-5xl mx-auto flex items-center justify-between py-4 border-b border-white/10">
        <Link
          href="/"
          className="flex items-center gap-3 group text-white/80 hover:text-white transition-colors"
        >
          <div className="size-7 rounded-[2px] bg-white/5 border border-white/15 flex items-center justify-center text-white group-hover:border-accent transition-colors">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="size-3.5"
              aria-hidden="true"
            >
              <path
                d="M4 4H20V8H8V16H16V12H12V8H20V20H4V4Z"
                fill="currentColor"
              />
              <rect x="17" y="13" width="3" height="3" fill="#FF4A00" />
            </svg>
          </div>
          <span className="font-azeret text-[11px] tracking-[0.2em] uppercase font-semibold">
            GERAT // MISSION CONTROL
          </span>
        </Link>

        <div className="flex items-center gap-2 font-azeret text-[10px] tracking-[0.15em] text-white/40 uppercase">
          <span className="inline-block size-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>PORTAL SECURED</span>
        </div>
      </header>

      {/* Main Authentication Terminal */}
      <main className="w-full max-w-md mx-auto my-auto py-8">
        <div className="relative bg-[#121212] border border-white/10 p-8 sm:p-10 rounded-[3px] shadow-[0_16px_64px_rgba(0,0,0,0.8)]">
          {/* Precision Corner Hairline Accents */}
          <span className="absolute top-0 left-0 size-2.5 border-t border-l border-white/30" />
          <span className="absolute top-0 right-0 size-2.5 border-t border-r border-white/30" />
          <span className="absolute bottom-0 left-0 size-2.5 border-b border-l border-white/30" />
          <span className="absolute bottom-0 right-0 size-2.5 border-b border-r border-white/30" />

          {/* Form Header */}
          <div className="flex flex-col gap-2 mb-8">
            <span className="font-azeret text-[10px] tracking-[0.25em] text-accent uppercase">
              OPERATIONS ACCESS //
            </span>
            <h1 className="font-roc text-2xl sm:text-3xl font-semibold tracking-tight uppercase text-white">
              TEAM AUTHENTICATION
            </h1>
            <p className="font-roc text-xs sm:text-sm text-white/50 leading-relaxed">
              Enter authorized credentials to access internal CRM telemetry, client communications, and CMS publishing tools.
            </p>
          </div>

          {/* Error Alert Box */}
          {error && (
            <div className="mb-6 p-3 bg-red-950/40 border border-red-500/40 rounded-[2px] flex items-start gap-2.5 text-red-300">
              <span className="font-azeret text-xs mt-0.5">✕</span>
              <p className="font-azeret text-[11px] tracking-[0.05em] leading-relaxed">
                {error}
              </p>
            </div>
          )}

          {/* Authentication Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="font-azeret text-[10px] tracking-[0.15em] text-white/60 uppercase"
              >
                OPERATIONAL EMAIL
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setSelectedPreset("");
                }}
                placeholder="name@gerat.et"
                className="w-full bg-black/50 border border-white/15 focus:border-accent text-white px-3.5 py-2.5 rounded-[2px] font-azeret text-xs placeholder:text-white/20 outline-none transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="font-azeret text-[10px] tracking-[0.15em] text-white/60 uppercase"
                >
                  SECURITY PASSPHRASE
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="font-azeret text-[9px] tracking-[0.15em] text-white/40 hover:text-accent uppercase transition-colors"
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setSelectedPreset("");
                  }}
                  placeholder="••••••••••••"
                  className="w-full bg-black/50 border border-white/15 focus:border-accent text-white px-3.5 py-2.5 rounded-[2px] font-azeret text-xs placeholder:text-white/20 outline-none transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 w-full py-3 px-4 bg-accent hover:bg-white hover:text-black text-white font-azeret text-[11px] tracking-[0.2em] uppercase font-bold transition-all rounded-[2px] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <span className="inline-block size-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  <span>VERIFYING CREDENTIALS...</span>
                </>
              ) : (
                <>
                  <span>AUTHENTICATE SESSION</span>
                  <span>→</span>
                </>
              )}
            </button>
          </form>

          {/* Development Quick-Fill Helpers */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <span className="font-azeret text-[9px] tracking-[0.2em] text-white/40 uppercase">
                QUICK-ACCESS PRESETS (TEAM ROLES):
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 font-azeret text-[9px] tracking-[0.1em] uppercase">
              <button
                type="button"
                onClick={() => handleQuickFill("admin", "admin@gerat.et", "GeratAdmin2026!#")}
                className={`py-2 px-2 border rounded-[2px] text-center transition-all flex flex-col items-center gap-0.5 ${
                  selectedPreset === "admin"
                    ? "bg-accent/15 border-accent text-white"
                    : "bg-white/[0.03] hover:bg-white/[0.08] border-white/10 hover:border-accent/40 text-white/70 hover:text-white"
                }`}
              >
                <span className="font-bold">SUPER ADMIN</span>
                <span className="text-[7.5px] tracking-normal text-white/40 lowercase">admin@gerat.et</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickFill("ops", "operations@gerat.et", "GeratTeam2026!#")}
                className={`py-2 px-2 border rounded-[2px] text-center transition-all flex flex-col items-center gap-0.5 ${
                  selectedPreset === "ops"
                    ? "bg-accent/15 border-accent text-white"
                    : "bg-white/[0.03] hover:bg-white/[0.08] border-white/10 hover:border-accent/40 text-white/70 hover:text-white"
                }`}
              >
                <span className="font-bold">OPS LEAD</span>
                <span className="text-[7.5px] tracking-normal text-white/40 lowercase">operations@gerat.et</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickFill("tech", "architect@gerat.et", "GeratTeam2026!#")}
                className={`py-2 px-2 border rounded-[2px] text-center transition-all flex flex-col items-center gap-0.5 ${
                  selectedPreset === "tech"
                    ? "bg-accent/15 border-accent text-white"
                    : "bg-white/[0.03] hover:bg-white/[0.08] border-white/10 hover:border-accent/40 text-white/70 hover:text-white"
                }`}
              >
                <span className="font-bold">TECH EDITOR</span>
                <span className="text-[7.5px] tracking-normal text-white/40 lowercase">architect@gerat.et</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickFill("creative", "creative@gerat.et", "GeratTeam2026!#")}
                className={`py-2 px-2 border rounded-[2px] text-center transition-all flex flex-col items-center gap-0.5 ${
                  selectedPreset === "creative"
                    ? "bg-accent/15 border-accent text-white"
                    : "bg-white/[0.03] hover:bg-white/[0.08] border-white/10 hover:border-accent/40 text-white/70 hover:text-white"
                }`}
              >
                <span className="font-bold">CREATIVE DIR</span>
                <span className="text-[7.5px] tracking-normal text-white/40 lowercase">creative@gerat.et</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Colophon */}
      <footer className="w-full max-w-5xl mx-auto py-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 font-azeret text-[10px] tracking-[0.15em] text-white/40 uppercase">
        <span>© 2026 GERAT SOFTWARE SOLUTIONS PLC</span>
        <span>CONFIDENTIAL // AUTHORIZED PERSONNEL ONLY</span>
      </footer>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full bg-[#080808] flex items-center justify-center font-azeret text-xs text-white/40 uppercase tracking-[0.2em]">
          INITIALIZING SECURE TERMINAL...
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
