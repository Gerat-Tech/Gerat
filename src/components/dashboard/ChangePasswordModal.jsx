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
          isLight ? "bg-[#E2E6EC] border-[#CBD2DC] text-[#0B0F17]" : "bg-[#121212] border-white/15 text-white"
        }`}
      >
        {/* Modal Header */}
        <div className={`flex items-center justify-between pb-3 border-b ${isLight ? "border-[#CBD2DC]" : "border-white/10"}`}>
          <div>
            <span className="font-azeret text-[9px] tracking-[0.25em] text-accent uppercase">
              SECURITY KEY //
            </span>
            <h2 className="font-roc text-lg font-bold uppercase">UPDATE MY PASSPHRASE</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className={`font-azeret text-sm cursor-pointer ${isLight ? "text-black/40 hover:text-black" : "text-white/40 hover:text-white"}`}
          >
            ✕
          </button>
        </div>

        {/* User Identity Info */}
        <div className={`p-3 rounded-[2px] border font-azeret text-[10px] ${isLight ? "bg-white/60 border-[#CBD2DC]" : "bg-white/[0.02] border-white/10"}`}>
          <div className="font-bold">{user?.name || "Operator"}</div>
          <div className="opacity-60">{user?.email || "operator@gerat.et"}</div>
        </div>

        {/* In-Modal Error Card */}
        {modalError && (
          <div className="p-3 bg-red-950/60 border border-red-500/60 rounded-[2px] flex items-start gap-2.5 text-xs text-red-200 font-azeret">
            <span className="text-red-400 font-bold">⚠ ERROR:</span>
            <span className="flex-1 leading-relaxed">{modalError.message}</span>
            <button
              type="button"
              onClick={() => setModalError(null)}
              className="text-red-400/60 hover:text-red-300 font-bold cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {/* Success Message Card */}
        {successMessage && (
          <div className="p-3 bg-emerald-950/60 border border-emerald-500/60 rounded-[2px] flex items-center gap-2.5 text-xs text-emerald-300 font-azeret">
            <span className="text-emerald-400 font-bold">✓</span>
            <span className="flex-1">{successMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="font-azeret text-[9px] tracking-[0.15em] opacity-60 uppercase">
                CURRENT PASSPHRASE *
              </label>
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="font-azeret text-[8.5px] tracking-[0.1em] text-accent hover:underline uppercase cursor-pointer"
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
              className={`w-full border px-3 py-2 rounded-[2px] font-azeret text-xs outline-none transition-colors ${
                modalError?.field === "currentPassword"
                  ? "border-red-500 bg-red-950/20 text-red-200"
                  : isLight
                  ? "bg-white border-[#BCC5D1] text-[#0B0F17] focus:border-accent"
                  : "bg-black/50 border-white/15 text-white focus:border-accent"
              }`}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-azeret text-[9px] tracking-[0.15em] opacity-60 uppercase">
              NEW PASSPHRASE (MIN 6 CHARS) *
            </label>
            <input
              type={showPass ? "text" : "password"}
              required
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                if (modalError?.field === "newPassword") setModalError(null);
              }}
              placeholder="Enter new strong passphrase"
              className={`w-full border px-3 py-2 rounded-[2px] font-azeret text-xs outline-none transition-colors ${
                modalError?.field === "newPassword"
                  ? "border-red-500 bg-red-950/20 text-red-200"
                  : isLight
                  ? "bg-white border-[#BCC5D1] text-[#0B0F17] focus:border-accent"
                  : "bg-black/50 border-white/15 text-white focus:border-accent"
              }`}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-azeret text-[9px] tracking-[0.15em] opacity-60 uppercase">
              CONFIRM NEW PASSPHRASE *
            </label>
            <input
              type={showPass ? "text" : "password"}
              required
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (modalError?.field === "confirmPassword") setModalError(null);
              }}
              placeholder="Re-type new passphrase"
              className={`w-full border px-3 py-2 rounded-[2px] font-azeret text-xs outline-none transition-colors ${
                modalError?.field === "confirmPassword"
                  ? "border-red-500 bg-red-950/20 text-red-200"
                  : isLight
                  ? "bg-white border-[#BCC5D1] text-[#0B0F17] focus:border-accent"
                  : "bg-black/50 border-white/15 text-white focus:border-accent"
              }`}
            />
          </div>

          <div className={`flex items-center justify-end gap-3 pt-4 border-t font-azeret text-[10px] tracking-[0.15em] uppercase ${isLight ? "border-[#CBD2DC]" : "border-white/10"}`}>
            <button
              type="button"
              onClick={onClose}
              className={`py-2 px-4 border rounded-[2px] cursor-pointer transition-colors ${
                isLight ? "border-[#CBD2DC] hover:bg-black/5 text-[#555D6B]" : "border-white/15 hover:bg-white/5 text-white/60 hover:text-white"
              }`}
            >
              CANCEL
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !currentPassword || !newPassword}
              className="py-2 px-5 bg-accent hover:bg-black hover:text-white text-white font-bold rounded-[2px] transition-colors disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? "SAVING..." : "UPDATE PASSPHRASE"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
