"use client";

import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";

export default function ChangePasswordModal({ isOpen, onClose, user }) {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const [modalError, setModalError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setModalError(null);
    setSuccessMessage(null);

    if (!currentPassword) {
      setModalError({ message: "Current passphrase is required.", field: "currentPassword" });
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      setModalError({ message: "New passphrase must be at least 6 characters long.", field: "newPassword" });
      return;
    }
    if (newPassword !== confirmPassword) {
      setModalError({ message: "Passphrases do not match. Please re-type.", field: "confirmPassword" });
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        setModalError({ message: data.error || "Failed to update passphrase.", field: data.field });
        setIsSubmitting(false);
        return;
      }

      setSuccessMessage("Your passphrase has been updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        onClose();
        setSuccessMessage(null);
      }, 2000);
    } catch {
      setModalError({ message: "Network error updating passphrase. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className={`relative w-full max-w-md border p-6 sm:p-8 rounded-[3px] shadow-2xl flex flex-col gap-5 ${
          isLight ? "bg-white border-[#CBD5E1] text-[#0D0F12]" : "bg-[var(--surface)] border-white/15 text-white"
        }`}
      >
        {/* Modal Header */}
        <div className={`flex items-center justify-between pb-3 border-b ${isLight ? "border-[#E2E8F0]" : "border-white/10"}`}>
          <div>
            <span className="font-parkinsans text-[9px] tracking-[0.25em] text-accent uppercase font-bold">
              SECURITY VERIFICATION
            </span>
            <h2 className={`font-parkinsans text-lg font-bold uppercase mt-0.5 ${isLight ? "text-[#0D0F12]" : "text-white"}`}>
              CHANGE PASSWORD
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className={`font-parkinsans text-sm cursor-pointer ${isLight ? "text-slate-500 hover:text-black font-bold" : "text-white/40 hover:text-white"}`}
          >
            ✕
          </button>
        </div>

        {/* User Identity Info */}
        <div className={`p-3 rounded-[2px] border font-parkinsans text-[10px] ${isLight ? "bg-[#F8FAFC] border-[#CBD5E1] text-[#0D0F12]" : "bg-white/[0.02] border-white/10 text-white"}`}>
          <div className="font-bold">{user?.name || "Operator"}</div>
          <div className={isLight ? "text-[#64748B]" : "opacity-60"}>{user?.email || "operator@gerat.com"}</div>
        </div>

        {/* In-Modal Error Card */}
        {modalError && (
          <div className={`p-3 rounded-[2px] flex items-start gap-2.5 text-xs font-parkinsans ${
            isLight
              ? "bg-red-50 border border-red-300 text-red-900"
              : "bg-red-950/60 border border-red-500/60 text-red-200"
          }`}>
            <span className={isLight ? "text-red-700 font-bold" : "text-red-400 font-bold"}>⚠ ERROR:</span>
            <span className="flex-1 leading-relaxed">{modalError.message}</span>
            <button
              type="button"
              onClick={() => setModalError(null)}
              className={isLight ? "text-red-600 hover:text-red-900 font-bold cursor-pointer" : "text-red-400/60 hover:text-red-300 font-bold cursor-pointer"}
            >
              ✕
            </button>
          </div>
        )}

        {/* Success Message Card */}
        {successMessage && (
          <div className={`p-3 rounded-[2px] flex items-center gap-2.5 text-xs font-parkinsans ${
            isLight
              ? "bg-emerald-50 border border-emerald-300 text-emerald-900"
              : "bg-emerald-950/60 border border-emerald-500/60 text-emerald-300"
          }`}>
            <span className={isLight ? "text-emerald-700 font-bold" : "text-emerald-400 font-bold"}>✓</span>
            <span className="flex-1 font-medium">{successMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className={`font-parkinsans text-[9px] tracking-[0.15em] uppercase font-bold ${
                isLight ? "text-[#1E293B]" : "text-white/70"
              }`}>
                CURRENT PASSWORD *
              </label>
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="font-parkinsans text-[8.5px] tracking-[0.1em] text-accent hover:underline uppercase cursor-pointer font-bold"
              >
                {showPass ? "HIDE" : "SHOW"}
              </button>
            </div>
            <input
              type={showPass ? "text" : "password"}
              required
              value={currentPassword}
              onChange={(e) => {
                setCurrentPassword(e.target.value);
                if (modalError?.field === "currentPassword") setModalError(null);
              }}
              placeholder="••••••••••••"
              className={`w-full border px-3 py-2 rounded-[2px] font-parkinsans text-xs outline-none transition-colors ${
                modalError?.field === "currentPassword"
                  ? isLight
                    ? "border-red-500 bg-red-50/50 text-red-900"
                    : "border-red-500 bg-red-950/20 text-red-200"
                  : isLight
                  ? "bg-white border-[#CBD5E1] text-[#0D0F12] placeholder:text-[#94A3B8] focus:border-accent"
                  : "bg-black/50 border-white/15 text-white focus:border-accent"
              }`}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={`font-parkinsans text-[9px] tracking-[0.15em] uppercase font-bold ${
              isLight ? "text-[#1E293B]" : "text-white/70"
            }`}>
              NEW PASSWORD (MIN 6 CHARS) *
            </label>
            <input
              type={showPass ? "text" : "password"}
              required
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                if (modalError?.field === "newPassword") setModalError(null);
              }}
              placeholder="Enter new strong password"
              className={`w-full border px-3 py-2 rounded-[2px] font-parkinsans text-xs outline-none transition-colors ${
                modalError?.field === "newPassword"
                  ? isLight
                    ? "border-red-500 bg-red-50/50 text-red-900"
                    : "border-red-500 bg-red-950/20 text-red-200"
                  : isLight
                  ? "bg-white border-[#CBD5E1] text-[#0D0F12] placeholder:text-[#94A3B8] focus:border-accent"
                  : "bg-black/50 border-white/15 text-white focus:border-accent"
              }`}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={`font-parkinsans text-[9px] tracking-[0.15em] uppercase font-bold ${
              isLight ? "text-[#1E293B]" : "text-white/70"
            }`}>
              CONFIRM NEW PASSWORD *
            </label>
            <input
              type={showPass ? "text" : "password"}
              required
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (modalError?.field === "confirmPassword") setModalError(null);
              }}
              placeholder="Re-type new password"
              className={`w-full border px-3 py-2 rounded-[2px] font-parkinsans text-xs outline-none transition-colors ${
                modalError?.field === "confirmPassword"
                  ? isLight
                    ? "border-red-500 bg-red-50/50 text-red-900"
                    : "border-red-500 bg-red-950/20 text-red-200"
                  : isLight
                  ? "bg-white border-[#CBD5E1] text-[#0D0F12] placeholder:text-[#94A3B8] focus:border-accent"
                  : "bg-black/50 border-white/15 text-white focus:border-accent"
              }`}
            />
          </div>

          <div className={`flex items-center justify-end gap-3 pt-4 border-t font-parkinsans text-[10px] tracking-[0.15em] uppercase ${isLight ? "border-[#E2E8F0]" : "border-white/10"}`}>
            <button
              type="button"
              onClick={onClose}
              className={`py-2 px-4 border rounded-[2px] cursor-pointer transition-colors ${
                isLight ? "border-[#CBD5E1] hover:bg-slate-100 text-[#1E293B] font-semibold" : "border-white/15 hover:bg-white/5 text-white/60 hover:text-white"
              }`}
            >
              CANCEL
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !currentPassword || !newPassword}
              className="py-2 px-5 bg-accent hover:bg-[#FA6C26] text-white font-bold rounded-[2px] transition-colors disabled:opacity-50 cursor-pointer shadow-sm"
            >
              <span className="!text-white font-bold">{isSubmitting ? "SAVING..." : "UPDATE PASSWORD"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
