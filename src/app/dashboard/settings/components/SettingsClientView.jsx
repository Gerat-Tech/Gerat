"use client";

import React, { useState } from "react";

const DEFAULT_MARQUEE_TOKENS = [
  "DISTRIBUTED CONSENSUS PROTOCOLS",
  "SUB-SECOND VERIFICATION ENGINES",
  "DOMAIN-GROUNDED RAG & LOCAL LLMS",
  "MISSION-CRITICAL PUBLIC-SECTOR REGISTRIES",
  "HIGH-THROUGHPUT MONOLITHIC RESILIENCE",
  "CRYPTOGRAPHIC AUDIT COMPLIANCE",
];

export default function SettingsClientView({
  initialConfigs = {},
  initialAuditLogs = [],
  defaultTab = "config",
}) {
  const [activeTab, setActiveTab] = useState(defaultTab); // "config" | "notifications" | "audit"

  // Config State
  const [configs, setConfigs] = useState({
    CONTACT_EMAIL: initialConfigs.CONTACT_EMAIL || "info@gerat.et",
    CONTACT_PHONE: initialConfigs.CONTACT_PHONE || "+251911002233",
    EMERGENCY_HOTLINE: initialConfigs.EMERGENCY_HOTLINE || "+251944556677",
    OFFICE_ADDRESS: initialConfigs.OFFICE_ADDRESS || "Bole Sub-City, Woreda 03, Addis Ababa, Ethiopia",
    OFFICE_COORDINATES: initialConfigs.OFFICE_COORDINATES || "9.0125° N, 38.7612° E // ADDIS ABABA",
    ANNOUNCEMENT_ENABLED: initialConfigs.ANNOUNCEMENT_ENABLED === "true",
    ANNOUNCEMENT_TEXT: initialConfigs.ANNOUNCEMENT_TEXT || "SYSTEM ADVISORY: Q3 ARCHITECTURAL ENGAGEMENT SCHEDULE OPEN",
    ANNOUNCEMENT_LINK: initialConfigs.ANNOUNCEMENT_LINK || "/why-wqf",
    NOTIFICATION_ENABLED: initialConfigs.NOTIFICATION_ENABLED !== "false",
    NOTIFICATION_WEBHOOK_URL: initialConfigs.NOTIFICATION_WEBHOOK_URL || "",
    NOTIFICATION_CHAT_ID: initialConfigs.NOTIFICATION_CHAT_ID || "",
  });

  // Marquee Tokens State
  const parseTokens = () => {
    if (!initialConfigs.MARQUEE_TOKENS) return DEFAULT_MARQUEE_TOKENS;
    try {
      const parsed = JSON.parse(initialConfigs.MARQUEE_TOKENS);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_MARQUEE_TOKENS;
    } catch {
      return DEFAULT_MARQUEE_TOKENS;
    }
  };

  const [tokens, setTokens] = useState(parseTokens());
  const [newToken, setNewToken] = useState("");

  // Audit Logs State
  const [auditLogs, setAuditLogs] = useState(initialAuditLogs);
  const [auditFilter, setAuditFilter] = useState("ALL");
  const [auditSearch, setAuditSearch] = useState("");
  const [expandedLogId, setExpandedLogId] = useState(null);

  // Status & Feedback
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState(null);

  const [testingPing, setTestingPing] = useState(false);
  const [pingResult, setPingResult] = useState(null);

  // Token Handlers
  const handleAddToken = (e) => {
    e.preventDefault();
    if (!newToken.trim()) return;
    setTokens([...tokens, newToken.trim().toUpperCase()]);
    setNewToken("");
  };

  const handleRemoveToken = (idx) => {
    setTokens(tokens.filter((_, i) => i !== idx));
  };

  // Save Config Changes
  const handleSaveConfigs = async () => {
    setSaving(true);
    setSaveSuccess(false);
    setSaveError(null);

    const payload = {
      configs: {
        ...configs,
        ANNOUNCEMENT_ENABLED: configs.ANNOUNCEMENT_ENABLED ? "true" : "false",
        NOTIFICATION_ENABLED: configs.NOTIFICATION_ENABLED ? "true" : "false",
        MARQUEE_TOKENS: JSON.stringify(tokens),
      },
    };

    try {
      const res = await fetch("/api/settings/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save configuration.");

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err) {
      setSaveError(err.message);
    } finally {
      setSaving(false);
    }
  };

  // Test Webhook Ping
  const handleTestPing = async () => {
    if (!configs.NOTIFICATION_WEBHOOK_URL) {
      alert("Please enter a target Webhook URL before testing.");
      return;
    }

    setTestingPing(true);
    setPingResult(null);

    try {
      const res = await fetch("/api/settings/test-notification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ webhookUrl: configs.NOTIFICATION_WEBHOOK_URL }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Ping delivery failed.");

      setPingResult({ success: true, message: data.message });
    } catch (err) {
      setPingResult({ success: false, message: err.message });
    } finally {
      setTestingPing(false);
    }
  };

  // Filtered Audit Logs
  const filteredLogs = auditLogs.filter((log) => {
    const matchesFilter = auditFilter === "ALL" || log.entityType === auditFilter;
    const matchesSearch =
      log.action.toLowerCase().includes(auditSearch.toLowerCase()) ||
      log.entityType.toLowerCase().includes(auditSearch.toLowerCase()) ||
      (log.actor?.name || "").toLowerCase().includes(auditSearch.toLowerCase()) ||
      (log.diff || "").toLowerCase().includes(auditSearch.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-roc text-2xl sm:text-3xl font-bold tracking-tight uppercase text-white">
              SYSTEM CONTROL & TELEMETRY
            </h1>
            <span className="font-azeret text-[9px] tracking-[0.2em] px-2 py-0.5 rounded-[2px] bg-accent/15 border border-accent/40 text-accent uppercase font-bold">
              SYS // CONFIG
            </span>
          </div>
          <p className="font-azeret text-[10px] tracking-[0.15em] text-white/40 uppercase mt-1">
            MANAGE GLOBAL BRAND PARAMETERS, REAL-TIME ALERT WEBHOOKS, AND IMMUTABLE AUDIT LOGS
          </p>
        </div>

        {activeTab !== "audit" && (
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleSaveConfigs}
              disabled={saving}
              className="py-2 px-6 bg-accent hover:bg-[#ff5c1a] text-black font-azeret text-[10px] tracking-[0.15em] font-bold uppercase rounded-[2px] transition-colors disabled:opacity-50"
            >
              {saving ? "SAVING PARAMETERS..." : "COMMIT CONFIGURATION"}
            </button>
          </div>
        )}
      </div>

      {saveSuccess && (
        <div className="p-4 bg-emerald-950/40 border border-emerald-500/50 rounded-[2px] font-azeret text-xs text-emerald-300 flex items-center justify-between">
          <span>✓ SYSTEM CONFIGURATION PERSISTED SUCCESSFULLY TO PRODUCTION DATABASE.</span>
          <span className="text-[10px] text-emerald-400/60 uppercase font-mono">AUDIT LOGGED</span>
        </div>
      )}

      {saveError && (
        <div className="p-4 bg-rose-950/40 border border-rose-500/50 rounded-[2px] font-azeret text-xs text-rose-300">
          SYSTEM ERROR: {saveError}
        </div>
      )}

      {/* Workspace Tabs */}
      <div className="bg-[#121212] border border-white/10 p-1.5 rounded-[3px] flex items-center gap-2 font-azeret text-[10px] tracking-[0.15em] uppercase">
        <button
          type="button"
          onClick={() => setActiveTab("config")}
          className={`py-2 px-4 rounded-[2px] transition-colors ${
            activeTab === "config"
              ? "bg-accent text-black font-bold"
              : "text-white/60 hover:text-white"
          }`}
        >
          01 // SITE CONFIG & MARQUEE TOKENS
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("notifications")}
          className={`py-2 px-4 rounded-[2px] transition-colors ${
            activeTab === "notifications"
              ? "bg-accent text-black font-bold"
              : "text-white/60 hover:text-white"
          }`}
        >
          02 // REAL-TIME ALERT WEBHOOKS
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("audit")}
          className={`py-2 px-4 rounded-[2px] transition-colors ${
            activeTab === "audit"
              ? "bg-accent text-black font-bold"
              : "text-white/60 hover:text-white"
          }`}
        >
          03 // IMMUTABLE AUDIT LOG TRAIL
        </button>
      </div>

      {/* TAB 1: SITE CONFIG & MARQUEE */}
      {activeTab === "config" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Coordinates & Announcement */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            {/* Section: Brand Coordinates */}
            <div className="bg-[#121212] border border-white/10 p-6 rounded-[3px] flex flex-col gap-4">
              <div className="font-azeret text-[10px] tracking-[0.2em] text-accent uppercase font-bold border-b border-white/10 pb-2">
                OFFICIAL CONTACT COORDINATES
              </div>

              <div>
                <label className="block font-azeret text-[10px] tracking-[0.15em] text-white/50 uppercase mb-1">
                  OFFICIAL INQUIRY EMAIL
                </label>
                <input
                  type="email"
                  value={configs.CONTACT_EMAIL}
                  onChange={(e) => setConfigs({ ...configs, CONTACT_EMAIL: e.target.value })}
                  className="w-full bg-black/60 border border-white/15 px-3 py-2 text-white font-mono text-xs rounded-[2px] focus:border-accent outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-azeret text-[10px] tracking-[0.15em] text-white/50 uppercase mb-1">
                    PRIMARY SWITCHBOARD PHONE
                  </label>
                  <input
                    type="text"
                    value={configs.CONTACT_PHONE}
                    onChange={(e) => setConfigs({ ...configs, CONTACT_PHONE: e.target.value })}
                    className="w-full bg-black/60 border border-white/15 px-3 py-2 text-white font-mono text-xs rounded-[2px] focus:border-accent outline-none"
                  />
                </div>

                <div>
                  <label className="block font-azeret text-[10px] tracking-[0.15em] text-white/50 uppercase mb-1">
                    EMERGENCY ARCHITECTURE HOTLINE
                  </label>
                  <input
                    type="text"
                    value={configs.EMERGENCY_HOTLINE}
                    onChange={(e) => setConfigs({ ...configs, EMERGENCY_HOTLINE: e.target.value })}
                    className="w-full bg-black/60 border border-white/15 px-3 py-2 text-white font-mono text-xs rounded-[2px] focus:border-accent outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-azeret text-[10px] tracking-[0.15em] text-white/50 uppercase mb-1">
                  OFFICE HEADQUARTERS PHYSICAL ADDRESS
                </label>
                <input
                  type="text"
                  value={configs.OFFICE_ADDRESS}
                  onChange={(e) => setConfigs({ ...configs, OFFICE_ADDRESS: e.target.value })}
                  className="w-full bg-black/60 border border-white/15 px-3 py-2 text-white font-sans text-xs rounded-[2px] focus:border-accent outline-none"
                />
              </div>

              <div>
                <label className="block font-azeret text-[10px] tracking-[0.15em] text-white/50 uppercase mb-1">
                  GPS TELEMETRY COORDINATES
                </label>
                <input
                  type="text"
                  value={configs.OFFICE_COORDINATES}
                  onChange={(e) => setConfigs({ ...configs, OFFICE_COORDINATES: e.target.value })}
                  className="w-full bg-black/60 border border-white/15 px-3 py-2 text-white font-mono text-xs rounded-[2px] focus:border-accent outline-none"
                />
              </div>
            </div>

            {/* Section: Global Announcement Banner */}
            <div className="bg-[#121212] border border-white/10 p-6 rounded-[3px] flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="font-azeret text-[10px] tracking-[0.2em] text-accent uppercase font-bold">
                  GLOBAL ANNOUNCEMENT BANNER
                </span>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={configs.ANNOUNCEMENT_ENABLED}
                    onChange={(e) => setConfigs({ ...configs, ANNOUNCEMENT_ENABLED: e.target.checked })}
                    className="size-3.5 accent-[#FF4A00]"
                  />
                  <span className="font-azeret text-[9px] text-white/70 uppercase">
                    {configs.ANNOUNCEMENT_ENABLED ? "BANNER LIVE" : "DISABLED"}
                  </span>
                </label>
              </div>

              <div>
                <label className="block font-azeret text-[10px] tracking-[0.15em] text-white/50 uppercase mb-1">
                  ANNOUNCEMENT TEXT
                </label>
                <input
                  type="text"
                  value={configs.ANNOUNCEMENT_TEXT}
                  onChange={(e) => setConfigs({ ...configs, ANNOUNCEMENT_TEXT: e.target.value })}
                  className="w-full bg-black/60 border border-white/15 px-3 py-2 text-white font-mono text-xs rounded-[2px] focus:border-accent outline-none"
                />
              </div>

              <div>
                <label className="block font-azeret text-[10px] tracking-[0.15em] text-white/50 uppercase mb-1">
                  TARGET URL / SPECIFICATION ROUTE
                </label>
                <input
                  type="text"
                  value={configs.ANNOUNCEMENT_LINK}
                  onChange={(e) => setConfigs({ ...configs, ANNOUNCEMENT_LINK: e.target.value })}
                  className="w-full bg-black/60 border border-white/15 px-3 py-2 text-white font-mono text-xs rounded-[2px] focus:border-accent outline-none"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Marquee Ticker Tokens */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="bg-[#121212] border border-white/10 p-6 rounded-[3px] flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="font-azeret text-[10px] tracking-[0.2em] text-accent uppercase font-bold">
                  HOMEPAGE MARQUEE TICKER TOKENS
                </span>
                <span className="font-mono text-[9px] text-white/40">
                  {tokens.length} ACTIVE TOKENS
                </span>
              </div>

              <p className="font-sans text-xs text-white/60 leading-relaxed">
                Tokens stream continuously in the high-speed architectural marquee on the homepage.
              </p>

              {/* Add Token Input */}
              <form onSubmit={handleAddToken} className="flex gap-2">
                <input
                  type="text"
                  placeholder="NEW TICKER TOKEN..."
                  value={newToken}
                  onChange={(e) => setNewToken(e.target.value)}
                  className="flex-1 bg-black/60 border border-white/15 px-3 py-2 text-white font-mono text-xs uppercase rounded-[2px] focus:border-accent outline-none"
                />
                <button
                  type="submit"
                  className="px-4 bg-white/10 hover:bg-accent hover:text-black font-azeret text-[10px] tracking-[0.15em] text-white uppercase rounded-[2px] transition-colors font-bold"
                >
                  ADD TOKEN
                </button>
              </form>

              {/* Tokens List */}
              <div className="flex flex-col gap-2 mt-2 max-h-96 overflow-y-auto pr-1">
                {tokens.map((tok, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 bg-black/50 border border-white/10 rounded-[2px] group hover:border-accent/40 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-accent">0{idx + 1}</span>
                      <span className="font-mono text-xs text-white uppercase">{tok}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveToken(idx)}
                      className="text-white/30 hover:text-rose-400 font-azeret text-[10px] px-2 py-0.5 uppercase transition-colors"
                    >
                      REMOVE ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: REAL-TIME NOTIFICATIONS */}
      {activeTab === "notifications" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="bg-[#121212] border border-white/10 p-6 rounded-[3px] flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="font-azeret text-[10px] tracking-[0.2em] text-accent uppercase font-bold">
                  INSTANT TELEMETRY NOTIFICATION PIPELINE
                </span>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={configs.NOTIFICATION_ENABLED}
                    onChange={(e) => setConfigs({ ...configs, NOTIFICATION_ENABLED: e.target.checked })}
                    className="size-3.5 accent-[#FF4A00]"
                  />
                  <span className="font-azeret text-[9px] text-white/70 uppercase">
                    {configs.NOTIFICATION_ENABLED ? "NOTIFICATIONS ACTIVE" : "MUTED"}
                  </span>
                </label>
              </div>

              <p className="font-sans text-xs text-white/70 leading-relaxed">
                When a client submits an intake inquiry via the public website, Gerat Mission Control formats and dispatches an instant telemetry alert with full project brief and 1-click dossier links.
              </p>

              <div>
                <label className="block font-azeret text-[10px] tracking-[0.15em] text-white/50 uppercase mb-1">
                  WEBHOOK ENDPOINT URL (SLACK / DISCORD / TELEGRAM / CUSTOM)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="https://discord.com/api/webhooks/... or https://hooks.slack.com/services/..."
                    value={configs.NOTIFICATION_WEBHOOK_URL}
                    onChange={(e) => setConfigs({ ...configs, NOTIFICATION_WEBHOOK_URL: e.target.value })}
                    className="flex-1 bg-black/60 border border-white/15 px-3 py-2 text-white font-mono text-xs rounded-[2px] focus:border-accent outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleTestPing}
                    disabled={testingPing}
                    className="px-4 bg-white/10 hover:bg-accent hover:text-black font-azeret text-[10px] tracking-[0.15em] text-white uppercase rounded-[2px] transition-colors font-bold disabled:opacity-50 whitespace-nowrap"
                  >
                    {testingPing ? "PINGING..." : "TEST PING ↗"}
                  </button>
                </div>
              </div>

              {pingResult && (
                <div
                  className={`p-3 rounded-[2px] font-azeret text-xs ${
                    pingResult.success
                      ? "bg-emerald-950/40 border border-emerald-500/50 text-emerald-300"
                      : "bg-rose-950/40 border border-rose-500/50 text-rose-300"
                  }`}
                >
                  {pingResult.success ? `✓ ${pingResult.message}` : `✕ PING FAILED: ${pingResult.message}`}
                </div>
              )}

              <div>
                <label className="block font-azeret text-[10px] tracking-[0.15em] text-white/50 uppercase mb-1">
                  OPTIONAL TELEGRAM CHAT ID (IF USING TELEGRAM BOT API)
                </label>
                <input
                  type="text"
                  placeholder="-100xxxxxxxxxx"
                  value={configs.NOTIFICATION_CHAT_ID}
                  onChange={(e) => setConfigs({ ...configs, NOTIFICATION_CHAT_ID: e.target.value })}
                  className="w-full bg-black/60 border border-white/15 px-3 py-2 text-white font-mono text-xs rounded-[2px] focus:border-accent outline-none"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Alert Payload Preview */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="font-azeret text-[10px] tracking-[0.2em] text-white/40 uppercase font-bold">
              STANDARDIZED TELEMETRY ALERT PAYLOAD
            </div>

            <div className="bg-[#121212] border border-white/10 p-5 rounded-[3px] font-mono text-[11px] text-white/80 leading-relaxed flex flex-col gap-2.5">
              <div className="text-accent font-bold">
                🚨 NEW CLIENT LEAD REGISTERED // GRT-ENG-202609-847291
              </div>
              <div className="border-t border-white/10 pt-2 flex flex-col gap-1 text-white/70">
                <div><span className="text-white/40">Client:</span> Dr. Henok Tadesse (Apex Logistics PLC)</div>
                <div><span className="text-white/40">Discipline:</span> CUSTOM ERP & OPERATIONAL PLATFORMS</div>
                <div><span className="text-white/40">Budget:</span> 150K - 250K ETB | <span className="text-white/40">Timeline:</span> 1-3 MONTHS</div>
                <div><span className="text-white/40">Contact:</span> +251911223344 | henok@apexlogistics.et</div>
                <div><span className="text-white/40">Priority:</span> CRITICAL_ENTERPRISE</div>
                <div className="mt-1 text-white/90 italic bg-black/40 p-2 border-l border-accent text-[10px]">
                  &quot;We require a centralized multi-warehouse inventory reconciliation engine that integrates with local banks.&quot;
                </div>
                <div className="mt-2 text-accent font-bold">
                  🔗 https://gerat.et/dashboard/inquiries/cuid_12345
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: IMMUTABLE AUDIT LOG */}
      {activeTab === "audit" && (
        <div className="flex flex-col gap-4">
          {/* Audit Search & Filter Bar */}
          <div className="bg-[#121212] border border-white/10 p-4 rounded-[3px] flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {[
                "ALL",
                "INQUIRY",
                "ARTICLE",
                "CASE_STUDY",
                "TEAM_MEMBER",
                "SERVICE_PILLAR",
                "SITE_CONFIG",
              ].map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setAuditFilter(filter)}
                  className={`py-1 px-3 rounded-[2px] font-azeret text-[9px] tracking-[0.15em] uppercase transition-colors ${
                    auditFilter === filter
                      ? "bg-accent text-black font-bold"
                      : "bg-white/[0.04] hover:bg-white/10 text-white/70"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <input
              type="text"
              placeholder="Search audit trail by actor, action, or payload..."
              value={auditSearch}
              onChange={(e) => setAuditSearch(e.target.value)}
              className="bg-black/60 border border-white/15 px-3 py-1.5 text-white font-azeret text-xs rounded-[2px] focus:border-accent outline-none min-w-[280px]"
            />
          </div>

          {/* Audit Logs Table */}
          <div className="bg-[#121212] border border-white/10 rounded-[3px] overflow-x-auto">
            <table className="w-full text-left border-collapse font-azeret text-xs">
              <thead>
                <tr className="border-b border-white/10 bg-black/40 text-[9px] tracking-[0.2em] text-white/40 uppercase">
                  <th className="py-3 px-4">TIMESTAMP</th>
                  <th className="py-3 px-4">ACTION</th>
                  <th className="py-3 px-4">ENTITY TYPE</th>
                  <th className="py-3 px-4">OPERATOR / ACTOR</th>
                  <th className="py-3 px-4">ENTITY ID</th>
                  <th className="py-3 px-4 text-right">MUTATION PAYLOAD</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono text-[11px]">
                {filteredLogs.map((log) => {
                  const isExpanded = expandedLogId === log.id;
                  return (
                    <React.Fragment key={log.id}>
                      <tr className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3 px-4 text-white/40 whitespace-nowrap">
                          {new Date(log.createdAt).toISOString().replace("T", " ").slice(0, 19)}
                        </td>
                        <td className="py-3 px-4 font-bold text-accent">
                          {log.action}
                        </td>
                        <td className="py-3 px-4 text-white/80">
                          {log.entityType}
                        </td>
                        <td className="py-3 px-4 text-white/90">
                          <span className="font-sans font-medium">{log.actor?.name || "SYSTEM"}</span>{" "}
                          <span className="text-white/40 text-[10px]">({log.actor?.role || "SYSTEM"})</span>
                        </td>
                        <td className="py-3 px-4 text-white/50 truncate max-w-[140px]">
                          {log.entityId}
                        </td>
                        <td className="py-3 px-4 text-right">
                          {log.diff ? (
                            <button
                              type="button"
                              onClick={() => setExpandedLogId(isExpanded ? null : log.id)}
                              className="py-1 px-2.5 bg-white/[0.05] hover:bg-white/10 border border-white/15 text-white rounded-[2px] text-[10px] uppercase font-azeret transition-colors"
                            >
                              {isExpanded ? "HIDE DIFF ▲" : "INSPECT DIFF ▼"}
                            </button>
                          ) : (
                            <span className="text-white/20 text-[10px]">—</span>
                          )}
                        </td>
                      </tr>

                      {isExpanded && log.diff && (
                        <tr>
                          <td colSpan={6} className="p-4 bg-black/60 border-b border-white/10">
                            <div className="flex flex-col gap-1.5">
                              <span className="font-azeret text-[9px] tracking-[0.2em] text-accent uppercase font-bold">
                                MUTATION DIFF PAYLOAD SNAPSHOT // {log.action}
                              </span>
                              <pre className="p-3 bg-[#0a0a0a] border border-white/10 rounded-[2px] text-[10px] text-white/80 overflow-x-auto">
                                {(() => {
                                  try {
                                    return JSON.stringify(JSON.parse(log.diff), null, 2);
                                  } catch {
                                    return log.diff;
                                  }
                                })()}
                              </pre>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}

                {filteredLogs.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="p-8 text-center text-white/40 font-azeret text-xs uppercase tracking-widest"
                    >
                      NO AUDIT LOG RECORDS MATCHING QUERY
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
