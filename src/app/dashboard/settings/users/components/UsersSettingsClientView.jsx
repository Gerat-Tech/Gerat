"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";

const AVAILABLE_ROLES = [
  { id: "SUPER_ADMIN", name: "SUPER ADMIN", desc: "Full root authority, user governance, audit logs, system config", badgeClass: "bg-red-500/15 text-red-400 border-red-500/30" },
  { id: "OPERATIONS_LEAD", name: "OPERATIONS LEAD", desc: "Inquiries CRM, lead triage, client communications, team directory", badgeClass: "bg-blue-500/15 text-blue-400 border-blue-500/30" },
  { id: "TECHNICAL_EDITOR", name: "TECHNICAL EDITOR", desc: "Research publications, CMS insights, whitepapers, service pillars", badgeClass: "bg-purple-500/15 text-purple-400 border-purple-500/30" },
  { id: "CREATIVE_EDITOR", name: "CREATIVE EDITOR", desc: "Portfolio case studies, showcases, brand assets, creative pillars", badgeClass: "bg-amber-500/15 text-amber-400 border-amber-500/30" },
  { id: "VIEWER", name: "VIEWER (READ ONLY)", desc: "Read-only access to published content and team rosters", badgeClass: "bg-white/10 text-white/60 border-white/20" },
];

export default function UsersSettingsClientView({ initialUsers = [], currentUser = null }) {
  const router = useRouter();
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [isPending, startTransition] = useTransition();
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    role: "OPERATIONS_LEAD",
    password: "",
    active: true,
  });
  const [newRole, setNewRole] = useState("OPERATIONS_LEAD");
  const [newPassword, setNewPassword] = useState("");
  const [statusMessage, setStatusMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Stats calculation
  const totalUsers = users.length;
  const superAdmins = users.filter((u) => u.role === "SUPER_ADMIN").length;
  const opsLeads = users.filter((u) => u.role === "OPERATIONS_LEAD").length;
  const editors = users.filter((u) => ["TECHNICAL_EDITOR", "CREATIVE_EDITOR"].includes(u.role)).length;
  const activeCount = users.filter((u) => u.active).length;

  // Filtered users
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      (user.title && user.title.toLowerCase().includes(search.toLowerCase()));
    const matchesRole = roleFilter === "ALL" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  // Password Generator Helper
  const generateSecurePassword = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%^&*";
    let pass = "";
    for (let i = 0; i < 14; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `Gerat${pass}!`;
  };

  // Handle Create User
  const handleCreateUser = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const res = await fetch("/api/settings/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatusMessage({ type: "error", text: data.error || "Failed to create user." });
        setIsSubmitting(false);
        return;
      }

      setUsers([...users, data.user]);
      setIsAddModalOpen(false);
      setFormData({
        name: "",
        email: "",
        title: "",
        role: "OPERATIONS_LEAD",
        password: "",
        active: true,
      });
      setStatusMessage({ type: "success", text: `User ${data.user.email} provisioned successfully.` });
      startTransition(() => router.refresh());
    } catch {
      setStatusMessage({ type: "error", text: "Network error creating user." });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Update Role
  const handleUpdateRole = async (e) => {
    e.preventDefault();
    if (!selectedUser) return;
    setIsSubmitting(true);

    try {
      const res = await fetch(`/api/settings/users/${selectedUser.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatusMessage({ type: "error", text: data.error || "Failed to update role." });
        setIsSubmitting(false);
        return;
      }

      setUsers(users.map((u) => (u.id === selectedUser.id ? data.user : u)));
      setIsRoleModalOpen(false);
      setSelectedUser(null);
      setStatusMessage({ type: "success", text: `Role for ${data.user.email} updated to ${data.user.role}.` });
      startTransition(() => router.refresh());
    } catch {
      setStatusMessage({ type: "error", text: "Network error updating role." });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!selectedUser || !newPassword) return;
    setIsSubmitting(true);

    try {
      const res = await fetch(`/api/settings/users/${selectedUser.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatusMessage({ type: "error", text: data.error || "Failed to reset password." });
        setIsSubmitting(false);
        return;
      }

      setIsPasswordModalOpen(false);
      setSelectedUser(null);
      setNewPassword("");
      setStatusMessage({ type: "success", text: `Password for ${selectedUser.email} has been reset.` });
    } catch {
      setStatusMessage({ type: "error", text: "Network error resetting password." });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Toggle Active
  const handleToggleActive = async (user) => {
    if (user.id === currentUser?.id) {
      setStatusMessage({ type: "error", text: "Cannot deactivate your own logged-in account." });
      return;
    }

    const nextActive = !user.active;
    try {
      const res = await fetch(`/api/settings/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: nextActive }),
      });

      const data = await res.json();
      if (res.ok) {
        setUsers(users.map((u) => (u.id === user.id ? data.user : u)));
        setStatusMessage({
          type: "success",
          text: `Account for ${user.email} is now ${nextActive ? "ACTIVE" : "DEACTIVATED"}.`,
        });
        startTransition(() => router.refresh());
      } else {
        setStatusMessage({ type: "error", text: data.error || "Failed to toggle status." });
      }
    } catch {
      setStatusMessage({ type: "error", text: "Network error changing account status." });
    }
  };

  const getBadgeStyle = (role) => {
    const found = AVAILABLE_ROLES.find((r) => r.id === role);
    return found ? found.badgeClass : "bg-white/10 text-white/60 border-white/20";
  };

  return (
    <div className="flex flex-col gap-8 pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard/settings"
              className="font-azeret text-[10px] tracking-[0.2em] text-white/40 hover:text-white uppercase transition-colors"
            >
              SETTINGS //
            </Link>
            <h1 className="font-roc text-2xl sm:text-3xl font-bold tracking-tight uppercase text-white">
              USER & ROLE GOVERNANCE
            </h1>
          </div>
          <p className="font-azeret text-[10px] tracking-[0.15em] text-white/40 uppercase mt-1">
            MANAGE AUTHORIZED OPERATORS, ASSIGN RBAC ROLES, AND AUDIT ACCESS CONTROL
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              setFormData({
                name: "",
                email: "",
                title: "",
                role: "OPERATIONS_LEAD",
                password: generateSecurePassword(),
                active: true,
              });
              setIsAddModalOpen(true);
            }}
            className="py-2 px-4 bg-accent hover:bg-white hover:text-black text-white font-azeret text-[10px] tracking-[0.2em] uppercase font-bold transition-all rounded-[2px] flex items-center gap-2 shadow-lg shadow-accent/20 cursor-pointer"
          >
            <span>+</span>
            <span>PROVISION NEW OPERATOR</span>
          </button>
        </div>
      </div>

      {/* Notification Banner */}
      {statusMessage && (
        <div
          className={`p-3.5 rounded-[2px] border flex items-center justify-between gap-3 text-xs font-azeret tracking-[0.05em] ${
            statusMessage.type === "success"
              ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-300"
              : "bg-red-950/40 border-red-500/40 text-red-300"
          }`}
        >
          <span>{statusMessage.text}</span>
          <button
            type="button"
            onClick={() => setStatusMessage(null)}
            className="text-white/60 hover:text-white text-sm cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <div className="bg-[#121212] border border-white/10 p-4 rounded-[3px] flex flex-col gap-1">
          <span className="font-azeret text-[9px] tracking-[0.2em] text-white/40 uppercase">TOTAL OPERATORS</span>
          <span className="font-roc text-2xl font-bold text-white">{totalUsers}</span>
        </div>
        <div className="bg-[#121212] border border-white/10 p-4 rounded-[3px] flex flex-col gap-1">
          <span className="font-azeret text-[9px] tracking-[0.2em] text-red-400 uppercase">SUPER ADMINS</span>
          <span className="font-roc text-2xl font-bold text-white">{superAdmins}</span>
        </div>
        <div className="bg-[#121212] border border-white/10 p-4 rounded-[3px] flex flex-col gap-1">
          <span className="font-azeret text-[9px] tracking-[0.2em] text-blue-400 uppercase">OPS LEADS</span>
          <span className="font-roc text-2xl font-bold text-white">{opsLeads}</span>
        </div>
        <div className="bg-[#121212] border border-white/10 p-4 rounded-[3px] flex flex-col gap-1">
          <span className="font-azeret text-[9px] tracking-[0.2em] text-purple-400 uppercase">EDITORS / CMS</span>
          <span className="font-roc text-2xl font-bold text-white">{editors}</span>
        </div>
        <div className="bg-[#121212] border border-white/10 p-4 rounded-[3px] flex flex-col gap-1 col-span-2 lg:col-span-1">
          <span className="font-azeret text-[9px] tracking-[0.2em] text-emerald-400 uppercase">ACTIVE SESSIONS</span>
          <span className="font-roc text-2xl font-bold text-white">{activeCount} / {totalUsers}</span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#121212] border border-white/10 p-3 rounded-[3px]">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search operators by name, email, or role title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-black/50 border border-white/10 focus:border-accent text-white px-3.5 py-2 rounded-[2px] font-azeret text-xs placeholder:text-white/20 outline-none transition-colors"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="font-azeret text-[9px] tracking-[0.15em] text-white/40 uppercase whitespace-nowrap">
            FILTER ROLE:
          </span>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-black/50 border border-white/10 focus:border-accent text-white px-3 py-2 rounded-[2px] font-azeret text-xs outline-none cursor-pointer uppercase"
          >
            <option value="ALL">ALL ROLES ({totalUsers})</option>
            {AVAILABLE_ROLES.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-[#121212] border border-white/10 rounded-[3px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] font-azeret text-[9px] tracking-[0.2em] text-white/40 uppercase">
                <th className="py-3 px-4">OPERATOR & CONTACT</th>
                <th className="py-3 px-4">ROLE TITLE / DESIGNATION</th>
                <th className="py-3 px-4">RBAC ROLE</th>
                <th className="py-3 px-4">STATUS</th>
                <th className="py-3 px-4">REGISTERED</th>
                <th className="py-3 px-4 text-right">GOVERNANCE ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-sans text-xs">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-white/40 font-azeret text-xs uppercase tracking-[0.1em]">
                    No operators match the specified search or role filter.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => {
                  const isSelf = user.id === currentUser?.id;
                  return (
                    <tr key={user.id} className="hover:bg-white/[0.02] transition-colors">
                      {/* Operator & Email */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="size-8 rounded-[2px] bg-white/5 border border-white/15 flex items-center justify-center font-azeret text-xs font-bold text-white uppercase">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-roc font-bold text-white flex items-center gap-2">
                              <span>{user.name}</span>
                              {isSelf && (
                                <span className="font-azeret text-[8px] tracking-[0.15em] px-1.5 py-0.5 rounded-[2px] bg-accent/20 border border-accent/40 text-accent uppercase">
                                  YOU (CURRENT)
                                </span>
                              )}
                            </div>
                            <div className="font-azeret text-[10px] text-white/40 tracking-normal">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Title */}
                      <td className="py-3.5 px-4 font-azeret text-[11px] text-white/70">
                        {user.title || "—"}
                      </td>

                      {/* Role Badge */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-block font-azeret text-[9px] tracking-[0.15em] px-2 py-0.5 rounded-[2px] border font-bold uppercase ${getBadgeStyle(
                            user.role
                          )}`}
                        >
                          {user.role.replace("_", " ")}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <button
                          type="button"
                          disabled={isSelf}
                          onClick={() => handleToggleActive(user)}
                          className={`inline-flex items-center gap-1.5 font-azeret text-[9px] tracking-[0.15em] px-2 py-0.5 rounded-[2px] border font-bold uppercase transition-colors ${
                            user.active
                              ? "bg-emerald-950/40 text-emerald-400 border-emerald-500/30 hover:border-emerald-500"
                              : "bg-red-950/40 text-red-400 border-red-500/30 hover:border-red-500"
                          } ${isSelf ? "cursor-default opacity-80" : "cursor-pointer"}`}
                        >
                          <span
                            className={`size-1.5 rounded-full ${
                              user.active ? "bg-emerald-400" : "bg-red-400"
                            }`}
                          />
                          <span>{user.active ? "ACTIVE" : "SUSPENDED"}</span>
                        </button>
                      </td>

                      {/* Registered */}
                      <td className="py-3.5 px-4 font-azeret text-[10px] text-white/40">
                        {new Date(user.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2 font-azeret text-[9px] tracking-[0.1em] uppercase">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedUser(user);
                              setNewRole(user.role);
                              setIsRoleModalOpen(true);
                            }}
                            className="py-1 px-2 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-accent/40 rounded-[2px] text-white/70 hover:text-white transition-colors cursor-pointer"
                          >
                            ROLE
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedUser(user);
                              setNewPassword(generateSecurePassword());
                              setIsPasswordModalOpen(true);
                            }}
                            className="py-1 px-2 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-accent/40 rounded-[2px] text-white/70 hover:text-white transition-colors cursor-pointer"
                          >
                            PASSWORD
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Provision New Operator */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-[#121212] border border-white/15 p-6 sm:p-8 rounded-[3px] shadow-2xl flex flex-col gap-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <span className="font-azeret text-[9px] tracking-[0.25em] text-accent uppercase">
                  SECURITY GOVERNANCE //
                </span>
                <h2 className="font-roc text-xl font-bold uppercase text-white">PROVISION OPERATOR</h2>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-white/40 hover:text-white font-azeret text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-azeret text-[9px] tracking-[0.15em] text-white/60 uppercase">
                    FULL NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Samuel Bekele"
                    className="w-full bg-black/50 border border-white/15 focus:border-accent text-white px-3 py-2 rounded-[2px] font-azeret text-xs outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-azeret text-[9px] tracking-[0.15em] text-white/60 uppercase">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="operator@gerat.et"
                    className="w-full bg-black/50 border border-white/15 focus:border-accent text-white px-3 py-2 rounded-[2px] font-azeret text-xs outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-azeret text-[9px] tracking-[0.15em] text-white/60 uppercase">
                    ROLE TITLE / DESIGNATION
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Solutions Architect"
                    className="w-full bg-black/50 border border-white/15 focus:border-accent text-white px-3 py-2 rounded-[2px] font-azeret text-xs outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-azeret text-[9px] tracking-[0.15em] text-white/60 uppercase">
                    RBAC ROLE *
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full bg-black/50 border border-white/15 focus:border-accent text-white px-3 py-2 rounded-[2px] font-azeret text-xs outline-none uppercase"
                  >
                    {AVAILABLE_ROLES.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="font-azeret text-[9px] tracking-[0.15em] text-white/60 uppercase">
                    TEMPORARY PASSPHRASE *
                  </label>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, password: generateSecurePassword() })}
                    className="font-azeret text-[9px] tracking-[0.15em] text-accent hover:underline uppercase"
                  >
                    GENERATE NEW
                  </button>
                </div>
                <input
                  type="text"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Min 6 characters"
                  className="w-full bg-black/50 border border-white/15 focus:border-accent text-white px-3 py-2 rounded-[2px] font-azeret text-xs outline-none font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10 font-azeret text-[10px] tracking-[0.15em] uppercase">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="py-2.5 px-4 border border-white/15 hover:bg-white/5 rounded-[2px] text-white/60 hover:text-white"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="py-2.5 px-5 bg-accent hover:bg-white hover:text-black text-white font-bold rounded-[2px] transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? "PROVISIONING..." : "CONFIRM & PROVISION"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Change Role */}
      {isRoleModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-[#121212] border border-white/15 p-6 sm:p-8 rounded-[3px] shadow-2xl flex flex-col gap-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <span className="font-azeret text-[9px] tracking-[0.25em] text-accent uppercase">
                  RBAC MUTATION //
                </span>
                <h2 className="font-roc text-lg font-bold uppercase text-white">REASSIGN ROLE</h2>
              </div>
              <button
                type="button"
                onClick={() => setIsRoleModalOpen(false)}
                className="text-white/40 hover:text-white font-azeret text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-3 bg-white/[0.02] border border-white/10 rounded-[2px] font-azeret text-[10px]">
              <div className="text-white font-bold">{selectedUser.name}</div>
              <div className="text-white/50">{selectedUser.email}</div>
            </div>

            <form onSubmit={handleUpdateRole} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-azeret text-[9px] tracking-[0.15em] text-white/60 uppercase">
                  SELECT NEW RBAC ROLE:
                </label>
                <div className="flex flex-col gap-2">
                  {AVAILABLE_ROLES.map((r) => (
                    <label
                      key={r.id}
                      className={`p-3 border rounded-[2px] flex items-start gap-3 cursor-pointer transition-colors ${
                        newRole === r.id
                          ? "bg-accent/10 border-accent text-white"
                          : "bg-white/[0.02] border-white/10 text-white/70 hover:bg-white/[0.05]"
                      }`}
                    >
                      <input
                        type="radio"
                        name="userRole"
                        value={r.id}
                        checked={newRole === r.id}
                        onChange={(e) => setNewRole(e.target.value)}
                        className="mt-0.5 accent-[#FF4A00]"
                      />
                      <div>
                        <div className="font-azeret text-[10px] font-bold uppercase">{r.name}</div>
                        <div className="font-sans text-[11px] text-white/50 leading-relaxed">{r.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10 font-azeret text-[10px] tracking-[0.15em] uppercase">
                <button
                  type="button"
                  onClick={() => setIsRoleModalOpen(false)}
                  className="py-2 px-4 border border-white/15 hover:bg-white/5 rounded-[2px] text-white/60 hover:text-white"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="py-2 px-5 bg-accent hover:bg-white hover:text-black text-white font-bold rounded-[2px] transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? "UPDATING..." : "SAVE ROLE"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Reset Password */}
      {isPasswordModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-[#121212] border border-white/15 p-6 sm:p-8 rounded-[3px] shadow-2xl flex flex-col gap-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <span className="font-azeret text-[9px] tracking-[0.25em] text-accent uppercase">
                  SECURITY KEY //
                </span>
                <h2 className="font-roc text-lg font-bold uppercase text-white">RESET PASSPHRASE</h2>
              </div>
              <button
                type="button"
                onClick={() => setIsPasswordModalOpen(false)}
                className="text-white/40 hover:text-white font-azeret text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="font-roc text-xs text-white/60 leading-relaxed">
              Set a new temporary password for <strong>{selectedUser.name}</strong> ({selectedUser.email}).
            </p>

            <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="font-azeret text-[9px] tracking-[0.15em] text-white/60 uppercase">
                    NEW PASSPHRASE
                  </label>
                  <button
                    type="button"
                    onClick={() => setNewPassword(generateSecurePassword())}
                    className="font-azeret text-[9px] tracking-[0.15em] text-accent hover:underline uppercase"
                  >
                    GENERATE NEW
                  </button>
                </div>
                <input
                  type="text"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  className="w-full bg-black/50 border border-white/15 focus:border-accent text-white px-3 py-2 rounded-[2px] font-azeret text-xs outline-none font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10 font-azeret text-[10px] tracking-[0.15em] uppercase">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="py-2 px-4 border border-white/15 hover:bg-white/5 rounded-[2px] text-white/60 hover:text-white"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !newPassword}
                  className="py-2 px-5 bg-accent hover:bg-white hover:text-black text-white font-bold rounded-[2px] transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? "SAVING..." : "OVERWRITE PASSPHRASE"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
