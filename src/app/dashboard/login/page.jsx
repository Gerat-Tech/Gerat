"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import GeratLogo from "@/components/common/GeratLogo";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

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

  return (
    <div className="min-h-screen w-full bg-[var(--bg)] text-white flex flex-col justify-between p-4 sm:p-8 font-sans selection:bg-accent selection:text-black">
      {/* Top Header Status */}
      <header className="w-full max-w-5xl mx-auto flex items-center justify-between py-4 border-b border-white/10">
        <Link
          href="/"
          className="flex items-center gap-3 group text-white/80 hover:text-white transition-colors py-1"
          aria-label="Gerat Home"
        >
          <GeratLogo
            variant="badge"
            className="h-7 w-auto text-white group-hover:text-accent transition-colors duration-300"
          />
          <span className="font-parkinsans text-[11px] tracking-[0.2em] uppercase font-semibold text-white/50 group-hover:text-white transition-colors">
            Mission Control
          </span>
        </Link>

        <div className="font-parkinsans text-[10px] tracking-[0.15em] text-white/40 uppercase">
          <span>PORTAL SECURED</span>
        </div>
      </header>

      {/* Main Authentication Terminal */}
      <main className="w-full max-w-md mx-auto my-auto py-8">
        <div className="relative bg-[var(--surface)] border border-white/10 p-8 sm:p-10 rounded-[3px] shadow-[0_16px_64px_rgba(0,0,0,0.8)]">
          {/* Precision Corner Hairline Accents */}
          <span className="absolute top-0 left-0 size-2.5 border-t border-l border-white/30" />
          <span className="absolute top-0 right-0 size-2.5 border-t border-r border-white/30" />
          <span className="absolute bottom-0 left-0 size-2.5 border-b border-l border-white/30" />
          <span className="absolute bottom-0 right-0 size-2.5 border-b border-r border-white/30" />

          {/* Form Header */}
          <div className="flex flex-col gap-2 mb-8">
            <span className="font-parkinsans text-[10px] tracking-[0.25em] text-accent uppercase">
              INTERNAL PORTAL ACCESS
            </span>
            <h1 className="font-parkinsans text-2xl sm:text-3xl font-semibold tracking-tight uppercase text-white">
              TEAM AUTHENTICATION
            </h1>
            <p className="font-artific text-xs sm:text-sm text-white/50 leading-relaxed">
              Enter authorized credentials to access internal CRM records, client communications, and publishing tools.
            </p>
          </div>

          {/* Error Alert Box */}
          {error && (
            <div className="mb-6 p-3 bg-red-950/40 border border-red-500/40 rounded-[2px] flex items-start gap-2.5 text-red-300">
              <span className="font-parkinsans text-xs mt-0.5">✕</span>
              <p className="font-artific text-[11px] tracking-[0.05em] leading-relaxed">
                {error}
              </p>
            </div>
          )}

          {/* Authentication Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="font-parkinsans text-[10px] tracking-[0.15em] text-white/60 uppercase"
              >
                OPERATIONAL EMAIL
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@gerat.com"
                className="w-full bg-black/50 border border-white/15 focus:border-accent text-white px-3.5 py-2.5 rounded-[2px] font-parkinsans text-xs placeholder:text-white/20 outline-none transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="font-parkinsans text-[10px] tracking-[0.15em] text-white/60 uppercase"
                >
                  SECURITY PASSPHRASE
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="font-parkinsans text-[9px] tracking-[0.15em] text-white/40 hover:text-accent uppercase transition-colors"
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
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-black/50 border border-white/15 focus:border-accent text-white px-3.5 py-2.5 rounded-[2px] font-parkinsans text-xs placeholder:text-white/20 outline-none transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 w-full py-3 px-4 bg-accent hover:bg-white hover:text-black text-white font-parkinsans text-[11px] tracking-[0.2em] uppercase font-bold transition-all rounded-[2px] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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
        </div>
      </main>

      {/* Footer Colophon */}
      <footer className="w-full max-w-5xl mx-auto py-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 font-parkinsans text-[10px] tracking-[0.15em] text-white/40 uppercase">
        <span>© 2026 GERAT SOFTWARE SOLUTION</span>
        <span>CONFIDENTIAL · AUTHORIZED PERSONNEL ONLY</span>
      </footer>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full bg-[var(--bg)] flex items-center justify-center font-parkinsans text-xs text-white/40 uppercase tracking-[0.2em]">
          INITIALIZING SECURE TERMINAL...
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
