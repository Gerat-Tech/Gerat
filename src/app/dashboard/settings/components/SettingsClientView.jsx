"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

const DEFAULT_MARQUEE_TOKENS = [
  "DISTRIBUTED CONSENSUS PROTOCOLS",
  "SUB-SECOND VERIFICATION ENGINES",
  "DOMAIN-GROUNDED RAG & LOCAL LLMS",
  "MISSION-CRITICAL PUBLIC-SECTOR REGISTRIES",
  "HIGH-THROUGHPUT MONOLITHIC RESILIENCE",
  "CRYPTOGRAPHIC AUDIT COMPLIANCE",
];

// Presets for Ethiopian cities and Addis Ababa sub-cities
const LOCATION_PRESETS = [
  {
    label: "Addis Ababa — Bole Sub-City (Atlas / Medhanialem / Woreda 03)",
    coords: "8.9954° N, 38.7889° E // BOLE",
    address: "Bole Sub-City, Woreda 03, Addis Ababa, Ethiopia",
    mapQuery: "Bole, Addis Ababa, Ethiopia",
  },
  {
    label: "Addis Ababa — Kirkos Sub-City (Kazanchis / ECA / Meskel Sq)",
    coords: "9.0125° N, 38.7612° E // KAZANCHIS",
    address: "Kirkos Sub-City, Kazanchis, Addis Ababa, Ethiopia",
    mapQuery: "Kazanchis, Addis Ababa, Ethiopia",
  },
  {
    label: "Addis Ababa — Arada Sub-City (Piassa / Churchill Ave / 4 Kilo)",
    coords: "9.0345° N, 38.7521° E // PIASSA",
    address: "Arada Sub-City, Churchill Avenue, Addis Ababa, Ethiopia",
    mapQuery: "Arada, Addis Ababa, Ethiopia",
  },
  {
    label: "Addis Ababa — Yeka Sub-City (CMC / Megenagna / Signal)",
    coords: "9.0289° N, 38.7981° E // MEGENAGNA",
    address: "Yeka Sub-City, Megenagna Corridor, Addis Ababa, Ethiopia",
    mapQuery: "Megenagna, Addis Ababa, Ethiopia",
  },
  {
    label: "Addis Ababa — Nifas Silk-Lafto (Gotera / Saris / Jomo)",
    coords: "8.9712° N, 38.7391° E // GOTERA",
    address: "Nifas Silk-Lafto, Gotera Interchange, Addis Ababa, Ethiopia",
    mapQuery: "Gotera, Addis Ababa, Ethiopia",
  },
  {
    label: "Addis Ababa — Lideta Sub-City (Mexico Square / Balcha)",
    coords: "9.0101° N, 38.7423° E // MEXICO",
    address: "Lideta Sub-City, Mexico Square, Addis Ababa, Ethiopia",
    mapQuery: "Mexico Square, Addis Ababa, Ethiopia",
  },
  {
    label: "Addis Ababa — Lemi Kura Sub-City (Ayat / Summit)",
    coords: "9.0195° N, 38.8541° E // AYAT",
    address: "Lemi Kura Sub-City, Ayat Zone, Addis Ababa, Ethiopia",
    mapQuery: "Ayat, Addis Ababa, Ethiopia",
  },
  {
    label: "Addis Ababa — Gulele Sub-City (AAU Campus / Shiromeda)",
    coords: "9.0583° N, 38.7489° E // GULELE",
    address: "Gulele Sub-City, Sidist Kilo Campus, Addis Ababa, Ethiopia",
    mapQuery: "Gulele, Addis Ababa, Ethiopia",
  },
  {
    label: "Addis Ababa — Kolfe Keranio (Tor Hailoch / Total)",
    coords: "9.0089° N, 38.7189° E // TOR HAILOCH",
    address: "Kolfe Keranio Sub-City, Tor Hailoch, Addis Ababa, Ethiopia",
    mapQuery: "Tor Hailoch, Addis Ababa, Ethiopia",
  },
  {
    label: "Addis Ababa — Akaky Kaliti (Industry Zone / Kality)",
    coords: "8.8923° N, 38.7634° E // KALITI",
    address: "Akaky Kaliti Sub-City, Industrial Zone, Addis Ababa, Ethiopia",
    mapQuery: "Kality, Addis Ababa, Ethiopia",
  },
  {
    label: "Addis Ababa — Addis Ketema (Mercato / Autobis Tera)",
    coords: "9.0312° N, 38.7345° E // MERCATO",
    address: "Addis Ketema Sub-City, Mercato, Addis Ababa, Ethiopia",
    mapQuery: "Mercato, Addis Ababa, Ethiopia",
  },
  {
    label: "Hawassa — Lake View / Industrial Park Hub",
    coords: "7.0621° N, 38.4764° E // HAWASSA",
    address: "Hawassa Industrial Park Boulevard, Sidama, Ethiopia",
    mapQuery: "Hawassa Industrial Park, Ethiopia",
  },
  {
    label: "Dire Dawa — Free Trade Zone / Rail Corridor",
    coords: "9.6009° N, 41.8501° E // DIRE DAWA",
    address: "Dire Dawa Free Trade Area, Dire Dawa, Ethiopia",
    mapQuery: "Dire Dawa, Ethiopia",
  },
  {
    label: "Adama / Nazret — Expressway Technology Corridor",
    coords: "8.5414° N, 39.2689° E // ADAMA",
    address: "Expressway Highway Zone, Adama, Oromia, Ethiopia",
    mapQuery: "Adama, Ethiopia",
  },
  {
    label: "Bahir Dar — Lake Tana Innovation Center",
    coords: "11.5936° N, 37.3908° E // BAHIR DAR",
    address: "Kebele 04, Lake Tana Boulevard, Bahir Dar, Amhara, Ethiopia",
    mapQuery: "Bahir Dar, Ethiopia",
  },
  {
    label: "Mekelle — Technology Park Corridor",
    coords: "13.4967° N, 39.4753° E // MEKELLE",
    address: "Technology Park Zone, Mekelle, Tigray, Ethiopia",
    mapQuery: "Mekelle, Ethiopia",
  },
  {
    label: "Bishoftu / Debre Zeit — Resort & Innovation Hub",
    coords: "8.7523° N, 38.9785° E // BISHOFTU",
    address: "Lake Babogaya Zone, Bishoftu, Oromia, Ethiopia",
    mapQuery: "Bishoftu, Ethiopia",
  },
];

export default function SettingsClientView({
  initialConfigs = {},
  initialAuditLogs = [],
  defaultTab = "config",
}) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  const [activeTab, setActiveTab] = useState(defaultTab); // "config" | "appearance" | "notifications" | "audit"

  // Config State
  const [configs, setConfigs] = useState({
    CONTACT_EMAIL: initialConfigs.CONTACT_EMAIL || "info@gerat.et",
    CONTACT_PHONE: initialConfigs.CONTACT_PHONE || "+251911002233",
    EMERGENCY_HOTLINE: initialConfigs.EMERGENCY_HOTLINE || "+251944556677",
    OFFICE_ADDRESS: initialConfigs.OFFICE_ADDRESS || "Bole Sub-City, Woreda 03, Addis Ababa, Ethiopia",
    OFFICE_COORDINATES: initialConfigs.OFFICE_COORDINATES || "8.9954° N, 38.7889° E // BOLE",
    ANNOUNCEMENT_ENABLED: initialConfigs.ANNOUNCEMENT_ENABLED === "true",
    ANNOUNCEMENT_TEXT: initialConfigs.ANNOUNCEMENT_TEXT || "SYSTEM ADVISORY: Q3 ARCHITECTURAL ENGAGEMENT SCHEDULE OPEN",
    ANNOUNCEMENT_LINK: initialConfigs.ANNOUNCEMENT_LINK || "/services",
    NOTIFICATION_ENABLED: initialConfigs.NOTIFICATION_ENABLED !== "false",
    NOTIFICATION_WEBHOOK_URL: initialConfigs.NOTIFICATION_WEBHOOK_URL || "",
    NOTIFICATION_CHAT_ID: initialConfigs.NOTIFICATION_CHAT_ID || "",
  });

  // Selected Location Preset State
  const [selectedPreset, setSelectedPreset] = useState("");

  const handleLocationPresetChange = (e) => {
    const val = e.target.value;
    setSelectedPreset(val);
    const found = LOCATION_PRESETS.find((p) => p.label === val);
    if (found) {
      setConfigs((prev) => ({
        ...prev,
        OFFICE_COORDINATES: found.coords,
        OFFICE_ADDRESS: found.address,
      }));
    }
  };

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
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b ${isLight ? "border-[#E2E5EB]" : "border-white/10"}`}>
        <div>
          <div className="flex items-center gap-2">
            <h1 className={`font-roc text-2xl sm:text-3xl font-bold tracking-tight uppercase ${isLight ? "text-[#0D0F12]" : "text-white"}`}>
              SYSTEM CONTROL & TELEMETRY
            </h1>
            <span className="font-azeret text-[9px] tracking-[0.2em] px-2 py-0.5 rounded-[2px] bg-accent/15 border border-accent/40 text-accent uppercase font-bold">
              SYS // CONFIG
            </span>
          </div>
          <p className={`font-azeret text-[10px] tracking-[0.15em] uppercase mt-1 ${isLight ? "text-[#555D6B]" : "text-white/40"}`}>
            MANAGE GLOBAL BRAND PARAMETERS, APPEARANCE THEMES, ALERT WEBHOOKS, AND IMMUTABLE AUDIT LOGS
          </p>
        </div>

        {activeTab !== "audit" && activeTab !== "appearance" && (
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleSaveConfigs}
              disabled={saving}
              className="py-2 px-6 bg-accent hover:bg-[#ff5c1a] text-white font-azeret text-[10px] tracking-[0.15em] font-bold uppercase rounded-[2px] transition-colors disabled:opacity-50"
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
      <div
        className={`p-1.5 rounded-[3px] flex flex-wrap items-center gap-2 font-azeret text-[10px] tracking-[0.15em] uppercase border ${
          isLight
            ? "bg-white border-[#E2E5EB]"
            : "bg-[#121212] border-white/10"
        }`}
      >
        <button
          type="button"
          onClick={() => setActiveTab("config")}
          className={`py-2 px-3.5 rounded-[2px] transition-colors ${
            activeTab === "config"
              ? "bg-accent text-white font-bold"
              : isLight
              ? "text-[#555D6B] hover:text-[#0D0F12]"
              : "text-white/60 hover:text-white"
          }`}
        >
          01 // SITE CONFIG & LOCATION
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("appearance")}
          className={`py-2 px-3.5 rounded-[2px] transition-colors ${
            activeTab === "appearance"
              ? "bg-accent text-white font-bold"
              : isLight
              ? "text-[#555D6B] hover:text-[#0D0F12]"
              : "text-white/60 hover:text-white"
          }`}
        >
          02 // THEME & APPEARANCE
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("notifications")}
          className={`py-2 px-3.5 rounded-[2px] transition-colors ${
            activeTab === "notifications"
              ? "bg-accent text-white font-bold"
              : isLight
              ? "text-[#555D6B] hover:text-[#0D0F12]"
              : "text-white/60 hover:text-white"
          }`}
        >
          03 // ALERT WEBHOOKS
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("audit")}
          className={`py-2 px-3.5 rounded-[2px] transition-colors ${
            activeTab === "audit"
              ? "bg-accent text-white font-bold"
              : isLight
              ? "text-[#555D6B] hover:text-[#0D0F12]"
              : "text-white/60 hover:text-white"
          }`}
        >
          04 // IMMUTABLE AUDIT LOG
        </button>

        <Link
          href="/dashboard/settings/users"
          className={`py-2 px-3.5 rounded-[2px] transition-colors flex items-center gap-1.5 ${
            isLight
              ? "bg-black/5 hover:bg-black/10 text-accent font-bold"
              : "bg-white/5 hover:bg-white/10 text-accent font-bold"
          }`}
        >
          <span>05 // USER & ROLE GOVERNANCE</span>
          <span>→</span>
        </Link>
      </div>

      {/* TAB 1: SITE CONFIG & LOCATION PRESETS */}
      {activeTab === "config" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Coordinates & Announcement */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            {/* Section: Brand Coordinates & Location Presets */}
            <div
              className={`border p-6 rounded-[3px] flex flex-col gap-4 ${
                isLight ? "bg-white border-[#E2E5EB]" : "bg-[#121212] border-white/10"
              }`}
            >
              <div className="font-azeret text-[10px] tracking-[0.2em] text-accent uppercase font-bold border-b border-accent/20 pb-2">
                OFFICIAL CONTACT & LOCATION PRESETS
              </div>

              {/* Location Preset Selector Dropdown */}
              <div>
                <label className={`block font-azeret text-[10px] tracking-[0.15em] uppercase mb-1 font-semibold ${isLight ? "text-[#0D0F12]" : "text-accent"}`}>
                  📍 SELECT ETHIOPIAN CITY / ADDIS ABABA SUB-CITY
                </label>
                <select
                  value={selectedPreset}
                  onChange={handleLocationPresetChange}
                  className={`w-full border px-3 py-2.5 font-azeret text-xs rounded-[2px] focus:border-accent outline-none ${
                    isLight
                      ? "bg-[#F0F2F5] border-[#D4D8E0] text-[#0D0F12]"
                      : "bg-black/80 border-white/20 text-white"
                  }`}
                >
                  <option value="">-- Choose a District / City to Auto-Fill GPS --</option>
                  <optgroup label="Addis Ababa Sub-Cities & Hubs">
                    {LOCATION_PRESETS.slice(0, 11).map((p) => (
                      <option key={p.coords} value={p.label}>
                        {p.label}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Regional Tech & Industrial Hubs">
                    {LOCATION_PRESETS.slice(11).map((p) => (
                      <option key={p.coords} value={p.label}>
                        {p.label}
                      </option>
                    ))}
                  </optgroup>
                </select>
                <span className={`font-azeret text-[9px] mt-1 block ${isLight ? "text-[#555D6B]" : "text-white/40"}`}>
                  Choosing a district automatically sets verified GPS telemetry coordinates and updates the physical address.
                </span>
              </div>

              {/* GPS Coordinates with 1-click Map Verification */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className={`font-azeret text-[10px] tracking-[0.15em] uppercase ${isLight ? "text-[#555D6B]" : "text-white/50"}`}>
                    GPS TELEMETRY COORDINATES
                  </label>
                  {configs.OFFICE_COORDINATES && (
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        configs.OFFICE_ADDRESS || configs.OFFICE_COORDINATES
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-azeret text-[9px] tracking-[0.15em] text-accent hover:underline uppercase flex items-center gap-1 font-bold"
                    >
                      <span>VIEW ON GOOGLE MAPS</span>
                      <span>↗</span>
                    </a>
                  )}
                </div>
                <input
                  type="text"
                  value={configs.OFFICE_COORDINATES}
                  onChange={(e) => setConfigs({ ...configs, OFFICE_COORDINATES: e.target.value })}
                  className={`w-full border px-3 py-2 font-mono text-xs rounded-[2px] focus:border-accent outline-none ${
                    isLight
                      ? "bg-[#F0F2F5] border-[#E2E5EB] text-[#0D0F12]"
                      : "bg-black/60 border-white/15 text-white"
                  }`}
                />
              </div>

              <div>
                <label className={`block font-azeret text-[10px] tracking-[0.15em] uppercase mb-1 ${isLight ? "text-[#555D6B]" : "text-white/50"}`}>
                  OFFICE HEADQUARTERS PHYSICAL ADDRESS
                </label>
                <input
                  type="text"
                  value={configs.OFFICE_ADDRESS}
                  onChange={(e) => setConfigs({ ...configs, OFFICE_ADDRESS: e.target.value })}
                  className={`w-full border px-3 py-2 font-sans text-xs rounded-[2px] focus:border-accent outline-none ${
                    isLight
                      ? "bg-[#F0F2F5] border-[#E2E5EB] text-[#0D0F12]"
                      : "bg-black/60 border-white/15 text-white"
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={`block font-azeret text-[10px] tracking-[0.15em] uppercase mb-1 ${isLight ? "text-[#555D6B]" : "text-white/50"}`}>
                    PRIMARY SWITCHBOARD PHONE
                  </label>
                  <input
                    type="text"
                    value={configs.CONTACT_PHONE}
                    onChange={(e) => setConfigs({ ...configs, CONTACT_PHONE: e.target.value })}
                    className={`w-full border px-3 py-2 font-mono text-xs rounded-[2px] focus:border-accent outline-none ${
                      isLight
                        ? "bg-[#F0F2F5] border-[#E2E5EB] text-[#0D0F12]"
                        : "bg-black/60 border-white/15 text-white"
                    }`}
                  />
                </div>

                <div>
                  <label className={`block font-azeret text-[10px] tracking-[0.15em] uppercase mb-1 ${isLight ? "text-[#555D6B]" : "text-white/50"}`}>
                    EMERGENCY ARCHITECTURE HOTLINE
                  </label>
                  <input
                    type="text"
                    value={configs.EMERGENCY_HOTLINE}
                    onChange={(e) => setConfigs({ ...configs, EMERGENCY_HOTLINE: e.target.value })}
                    className={`w-full border px-3 py-2 font-mono text-xs rounded-[2px] focus:border-accent outline-none ${
                      isLight
                        ? "bg-[#F0F2F5] border-[#E2E5EB] text-[#0D0F12]"
                        : "bg-black/60 border-white/15 text-white"
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className={`block font-azeret text-[10px] tracking-[0.15em] uppercase mb-1 ${isLight ? "text-[#555D6B]" : "text-white/50"}`}>
                  OFFICIAL INQUIRY EMAIL
                </label>
                <input
                  type="email"
                  value={configs.CONTACT_EMAIL}
                  onChange={(e) => setConfigs({ ...configs, CONTACT_EMAIL: e.target.value })}
                  className={`w-full border px-3 py-2 font-mono text-xs rounded-[2px] focus:border-accent outline-none ${
                    isLight
                      ? "bg-[#F0F2F5] border-[#E2E5EB] text-[#0D0F12]"
                      : "bg-black/60 border-white/15 text-white"
                  }`}
                />
              </div>
            </div>

            {/* Section: Global Announcement Banner (With Clear Explanatory Notes) */}
            <div
              className={`border p-6 rounded-[3px] flex flex-col gap-4 ${
                isLight ? "bg-white border-[#E2E5EB]" : "bg-[#121212] border-white/10"
              }`}
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <div>
                  <span className="font-azeret text-[10px] tracking-[0.2em] text-accent uppercase font-bold">
                    GLOBAL ANNOUNCEMENT BANNER
                  </span>
                  <p className={`font-sans text-[11px] mt-0.5 ${isLight ? "text-[#555D6B]" : "text-white/50"}`}>
                    Optional top broadcast banner for flash public notices (holiday schedules, booking openings).
                  </p>
                </div>
                <label className="flex items-center gap-2 cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={configs.ANNOUNCEMENT_ENABLED}
                    onChange={(e) => setConfigs({ ...configs, ANNOUNCEMENT_ENABLED: e.target.checked })}
                    className="size-4 accent-[#FF4A00]"
                  />
                  <span className={`font-azeret text-[9px] uppercase font-bold ${configs.ANNOUNCEMENT_ENABLED ? "text-emerald-500" : isLight ? "text-[#848D9C]" : "text-white/40"}`}>
                    {configs.ANNOUNCEMENT_ENABLED ? "BANNER LIVE" : "DISABLED"}
                  </span>
                </label>
              </div>

              <div>
                <label className={`block font-azeret text-[10px] tracking-[0.15em] uppercase mb-1 ${isLight ? "text-[#555D6B]" : "text-white/50"}`}>
                  ANNOUNCEMENT TEXT
                </label>
                <input
                  type="text"
                  placeholder="e.g. SYSTEM ADVISORY: Q4 ARCHITECTURAL BOOKINGS NOW OPEN"
                  value={configs.ANNOUNCEMENT_TEXT}
                  onChange={(e) => setConfigs({ ...configs, ANNOUNCEMENT_TEXT: e.target.value })}
                  className={`w-full border px-3 py-2 font-mono text-xs rounded-[2px] focus:border-accent outline-none ${
                    isLight
                      ? "bg-[#F0F2F5] border-[#E2E5EB] text-[#0D0F12]"
                      : "bg-black/60 border-white/15 text-white"
                  }`}
                />
              </div>

              <div>
                <label className={`block font-azeret text-[10px] tracking-[0.15em] uppercase mb-1 ${isLight ? "text-[#555D6B]" : "text-white/50"}`}>
                  TARGET URL / LINK (OPTIONAL)
                </label>
                <input
                  type="text"
                  placeholder="/services or /services/brand-creative"
                  value={configs.ANNOUNCEMENT_LINK}
                  onChange={(e) => setConfigs({ ...configs, ANNOUNCEMENT_LINK: e.target.value })}
                  className={`w-full border px-3 py-2 font-mono text-xs rounded-[2px] focus:border-accent outline-none ${
                    isLight
                      ? "bg-[#F0F2F5] border-[#E2E5EB] text-[#0D0F12]"
                      : "bg-black/60 border-white/15 text-white"
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Marquee Ticker Tokens */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div
              className={`border p-6 rounded-[3px] flex flex-col gap-4 ${
                isLight ? "bg-white border-[#E2E5EB]" : "bg-[#121212] border-white/10"
              }`}
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="font-azeret text-[10px] tracking-[0.2em] text-accent uppercase font-bold">
                  HOMEPAGE MARQUEE TICKER TOKENS
                </span>
                <span className={`font-mono text-[9px] ${isLight ? "text-[#555D6B]" : "text-white/40"}`}>
                  {tokens.length} ACTIVE TOKENS
                </span>
              </div>

              <p className={`font-sans text-xs leading-relaxed ${isLight ? "text-[#555D6B]" : "text-white/60"}`}>
                Tokens stream continuously in the high-speed architectural marquee on the homepage.
              </p>

              {/* Add Token Input */}
              <form onSubmit={handleAddToken} className="flex gap-2">
                <input
                  type="text"
                  placeholder="NEW TICKER TOKEN..."
                  value={newToken}
                  onChange={(e) => setNewToken(e.target.value)}
                  className={`flex-1 border px-3 py-2 font-mono text-xs uppercase rounded-[2px] focus:border-accent outline-none ${
                    isLight
                      ? "bg-[#F0F2F5] border-[#E2E5EB] text-[#0D0F12]"
                      : "bg-black/60 border-white/15 text-white"
                  }`}
                />
                <button
                  type="submit"
                  className={`px-4 font-azeret text-[10px] tracking-[0.15em] uppercase rounded-[2px] transition-colors font-bold ${
                    isLight
                      ? "bg-[#0D0F12] text-white hover:bg-accent"
                      : "bg-white/10 text-white hover:bg-accent hover:text-black"
                  }`}
                >
                  ADD TOKEN
                </button>
              </form>

              {/* Tokens List */}
              <div className="flex flex-col gap-2 mt-2 max-h-96 overflow-y-auto pr-1">
                {tokens.map((tok, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-between p-2.5 border rounded-[2px] group hover:border-accent/40 transition-colors ${
                      isLight
                        ? "bg-[#F8F9FB] border-[#E2E5EB]"
                        : "bg-black/50 border-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="font-mono text-[10px] text-accent">0{idx + 1}</span>
                      <span className={`font-mono text-xs uppercase truncate ${isLight ? "text-[#0D0F12]" : "text-white"}`}>
                        {tok}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveToken(idx)}
                      className={`font-azeret text-[10px] px-2 py-0.5 uppercase transition-colors shrink-0 ${
                        isLight
                          ? "text-[#848D9C] hover:text-rose-600"
                          : "text-white/30 hover:text-rose-400"
                      }`}
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

      {/* TAB 2: THEME & APPEARANCE (Point 6) */}
      {activeTab === "appearance" && (
        <div className="flex flex-col gap-6">
          <div
            className={`border p-6 rounded-[3px] flex flex-col gap-6 ${
              isLight ? "bg-white border-[#E2E5EB]" : "bg-[#121212] border-white/10"
            }`}
          >
            <div>
              <span className="font-azeret text-[10px] tracking-[0.2em] text-accent uppercase font-bold block mb-1">
                DASHBOARD THEME ARCHITECTURE
              </span>
              <h2 className={`font-roc text-xl font-bold uppercase ${isLight ? "text-[#0D0F12]" : "text-white"}`}>
                COLOR HARMONY & DISPLAY MODE
              </h2>
              <p className={`font-sans text-xs mt-1 max-w-3xl leading-relaxed ${isLight ? "text-[#555D6B]" : "text-white/60"}`}>
                Gerat Mission Control is engineered with two balanced architectural themes, utilizing precise contrast ratios, slate borders, and Gerat&apos;s signature International Orange spark (`#FF4A00`).
              </p>
            </div>

            {/* Theme Selector Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Option 1: Dark Monolithic */}
              <div
                onClick={() => setTheme("dark")}
                className={`relative p-5 rounded-[4px] border-2 cursor-pointer transition-all flex flex-col justify-between min-h-[220px] ${
                  theme === "dark"
                    ? "border-accent shadow-[0_0_20px_rgba(255,74,0,0.15)] bg-[#0c0c0c]"
                    : isLight
                    ? "border-[#E2E5EB] bg-[#0c0c0c] text-white hover:border-accent/40"
                    : "border-white/10 bg-[#0c0c0c] hover:border-white/30"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-azeret text-[10px] tracking-wider text-accent font-bold">
                      🌙 DARK MONOLITHIC
                    </span>
                    {theme === "dark" && (
                      <span className="size-2 rounded-full bg-accent" />
                    )}
                  </div>
                  <p className="font-sans text-xs text-white/70 leading-relaxed">
                    Obsidian canvas (`#080808`), technical card surfaces (`#121212`), high-contrast white text, and orange accents. Ideal for low-light environments.
                  </p>
                </div>

                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/10">
                  <span className="size-5 rounded-[2px] bg-[#080808] border border-white/20" title="Canvas #080808" />
                  <span className="size-5 rounded-[2px] bg-[#121212] border border-white/20" title="Card #121212" />
                  <span className="size-5 rounded-[2px] bg-[#FF4A00]" title="Accent #FF4A00" />
                  <span className="size-5 rounded-[2px] bg-white" title="Text #FFFFFF" />
                </div>
              </div>

              {/* Option 2: Architectural Light */}
              <div
                onClick={() => setTheme("light")}
                className={`relative p-5 rounded-[4px] border-2 cursor-pointer transition-all flex flex-col justify-between min-h-[220px] ${
                  theme === "light"
                    ? "border-accent shadow-[0_0_20px_rgba(255,74,0,0.15)] bg-white text-[#0D0F12]"
                    : "border-[#E2E5EB] bg-white text-[#0D0F12] hover:border-accent/40"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-azeret text-[10px] tracking-wider text-accent font-bold">
                      ☀️ ARCHITECTURAL LIGHT
                    </span>
                    {theme === "light" && (
                      <span className="size-2 rounded-full bg-accent" />
                    )}
                  </div>
                  <p className="font-sans text-xs text-[#555D6B] leading-relaxed">
                    Architectural gray canvas (`#F0F2F5`), refined light-gray card surfaces (`#E4E7EB`), deep dark typography (`#0A0C10`), and crisp borders. Eliminates dark cards for a cohesive daylight experience.
                  </p>
                </div>

                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-[#E2E5EB]">
                  <span className="size-5 rounded-[2px] bg-[#F0F2F5] border border-[#CBD2DC]" title="Canvas #F0F2F5" />
                  <span className="size-5 rounded-[2px] bg-[#E4E7EB] border border-[#CBD2DC]" title="Card #E4E7EB" />
                  <span className="size-5 rounded-[2px] bg-[#FF4A00]" title="Accent #FF4A00" />
                  <span className="size-5 rounded-[2px] bg-[#0A0C10]" title="Text #0A0C10" />
                </div>
              </div>

              {/* Option 3: System Automatic */}
              <div
                onClick={() => setTheme("system")}
                className={`relative p-5 rounded-[4px] border-2 cursor-pointer transition-all flex flex-col justify-between min-h-[220px] ${
                  theme === "system"
                    ? "border-accent shadow-[0_0_20px_rgba(255,74,0,0.15)]"
                    : isLight
                    ? "border-[#E2E5EB] bg-[#F0F2F5] hover:border-accent/40"
                    : "border-white/10 bg-black/40 hover:border-white/30"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-azeret text-[10px] tracking-wider text-accent font-bold">
                      💻 SYSTEM AUTOMATIC
                    </span>
                    {theme === "system" && (
                      <span className="size-2 rounded-full bg-accent" />
                    )}
                  </div>
                  <p className={`font-sans text-xs leading-relaxed ${isLight ? "text-[#555D6B]" : "text-white/60"}`}>
                    Synchronizes automatically with your operating system or browser light/dark mode preference. Currently resolved to <strong className="text-accent uppercase">{resolvedTheme}</strong>.
                  </p>
                </div>

                <div className={`mt-4 pt-3 border-t font-azeret text-[9px] uppercase ${isLight ? "border-[#E2E5EB] text-[#555D6B]" : "border-white/10 text-white/40"}`}>
                  Auto-switch active
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: REAL-TIME NOTIFICATIONS (Image 5) */}
      {activeTab === "notifications" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div
              className={`border p-6 rounded-[3px] flex flex-col gap-4 ${
                isLight ? "bg-white border-[#E2E5EB]" : "bg-[#121212] border-white/10"
              }`}
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <div>
                  <span className="font-azeret text-[10px] tracking-[0.2em] text-accent uppercase font-bold">
                    INSTANT TELEMETRY NOTIFICATION PIPELINE
                  </span>
                  <p className={`font-sans text-[11px] mt-0.5 ${isLight ? "text-[#555D6B]" : "text-white/50"}`}>
                    Sends real-time alerts to Telegram, Discord, or Slack whenever a client submits a project inquiry.
                  </p>
                </div>
                <label className="flex items-center gap-2 cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={configs.NOTIFICATION_ENABLED}
                    onChange={(e) => setConfigs({ ...configs, NOTIFICATION_ENABLED: e.target.checked })}
                    className="size-4 accent-[#FF4A00]"
                  />
                  <span className={`font-azeret text-[9px] uppercase font-bold ${configs.NOTIFICATION_ENABLED ? "text-emerald-500" : isLight ? "text-[#848D9C]" : "text-white/40"}`}>
                    {configs.NOTIFICATION_ENABLED ? "NOTIFICATIONS ACTIVE" : "MUTED"}
                  </span>
                </label>
              </div>

              <p className={`font-sans text-xs leading-relaxed ${isLight ? "text-[#555D6B]" : "text-white/70"}`}>
                Whenever a potential client fills out the consultation drawer or service form on `gerat.et`, this system automatically formats an alert with their full name, company, budget tier, phone number, and a direct link to their file in Mission Control.
              </p>

              <div>
                <label className={`block font-azeret text-[10px] tracking-[0.15em] uppercase mb-1 ${isLight ? "text-[#555D6B]" : "text-white/50"}`}>
                  WEBHOOK ENDPOINT URL (SLACK / DISCORD / TELEGRAM / CUSTOM)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="https://discord.com/api/webhooks/... or https://hooks.slack.com/services/..."
                    value={configs.NOTIFICATION_WEBHOOK_URL}
                    onChange={(e) => setConfigs({ ...configs, NOTIFICATION_WEBHOOK_URL: e.target.value })}
                    className={`flex-1 border px-3 py-2 font-mono text-xs rounded-[2px] focus:border-accent outline-none ${
                      isLight
                        ? "bg-[#F0F2F5] border-[#E2E5EB] text-[#0D0F12]"
                        : "bg-black/60 border-white/15 text-white"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={handleTestPing}
                    disabled={testingPing}
                    className="px-4 bg-accent hover:bg-[#ff5c1a] text-white font-azeret text-[10px] tracking-[0.15em] uppercase rounded-[2px] transition-colors font-bold disabled:opacity-50 whitespace-nowrap"
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
                <label className={`block font-azeret text-[10px] tracking-[0.15em] uppercase mb-1 ${isLight ? "text-[#555D6B]" : "text-white/50"}`}>
                  OPTIONAL TELEGRAM CHAT ID (IF USING TELEGRAM BOT API)
                </label>
                <input
                  type="text"
                  placeholder="-100xxxxxxxxxx"
                  value={configs.NOTIFICATION_CHAT_ID}
                  onChange={(e) => setConfigs({ ...configs, NOTIFICATION_CHAT_ID: e.target.value })}
                  className={`w-full border px-3 py-2 font-mono text-xs rounded-[2px] focus:border-accent outline-none ${
                    isLight
                      ? "bg-[#F0F2F5] border-[#E2E5EB] text-[#0D0F12]"
                      : "bg-black/60 border-white/15 text-white"
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Alert Payload Preview */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className={`font-azeret text-[10px] tracking-[0.2em] uppercase font-bold ${isLight ? "text-[#555D6B]" : "text-white/40"}`}>
              STANDARDIZED TELEMETRY ALERT PREVIEW
            </div>

            <div
              className={`border p-5 rounded-[3px] font-mono text-[11px] leading-relaxed flex flex-col gap-2.5 ${
                isLight
                  ? "bg-white border-[#E2E5EB] text-[#0D0F12]"
                  : "bg-[#121212] border-white/10 text-white/80"
              }`}
            >
              <div className="text-accent font-bold">
                🚨 NEW CLIENT LEAD REGISTERED // GRT-ENG-202609-847291
              </div>
              <div className={`border-t pt-2 flex flex-col gap-1 ${isLight ? "border-[#E2E5EB] text-[#555D6B]" : "border-white/10 text-white/70"}`}>
                <div><span className="opacity-50">Client:</span> Dr. Henok Tadesse (Apex Logistics PLC)</div>
                <div><span className="opacity-50">Discipline:</span> CUSTOM ERP & OPERATIONAL PLATFORMS</div>
                <div><span className="opacity-50">Budget:</span> 150K - 250K ETB | <span className="opacity-50">Timeline:</span> 1-3 MONTHS</div>
                <div><span className="opacity-50">Contact:</span> +251911223344 | henok@apexlogistics.et</div>
                <div><span className="opacity-50">Priority:</span> CRITICAL_ENTERPRISE</div>
                <div className={`mt-1 italic p-2 border-l-2 border-accent text-[10px] ${isLight ? "bg-[#F0F2F5] text-[#0D0F12]" : "bg-black/40 text-white/90"}`}>
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

      {/* TAB 4: IMMUTABLE AUDIT LOG */}
      {activeTab === "audit" && (
        <div className="flex flex-col gap-4">
          {/* Audit Search & Filter Bar */}
          <div
            className={`border p-4 rounded-[3px] flex flex-col md:flex-row md:items-center justify-between gap-4 ${
              isLight ? "bg-white border-[#E2E5EB]" : "bg-[#121212] border-white/10"
            }`}
          >
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
                      ? "bg-accent text-white font-bold"
                      : isLight
                      ? "bg-[#F0F2F5] hover:bg-[#E4E7ED] text-[#555D6B]"
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
              className={`border px-3 py-1.5 font-azeret text-xs rounded-[2px] focus:border-accent outline-none min-w-[280px] ${
                isLight
                  ? "bg-[#F0F2F5] border-[#D4D8E0] text-[#0D0F12]"
                  : "bg-black/60 border-white/15 text-white"
              }`}
            />
          </div>

          {/* Audit Logs Table */}
          <div
            className={`border rounded-[3px] overflow-x-auto ${
              isLight ? "bg-white border-[#E2E5EB]" : "bg-[#121212] border-white/10"
            }`}
          >
            <table className="w-full text-left border-collapse font-azeret text-xs">
              <thead>
                <tr
                  className={`border-b text-[9px] tracking-[0.2em] uppercase ${
                    isLight
                      ? "bg-[#F8F9FB] border-[#E2E5EB] text-[#555D6B]"
                      : "bg-black/40 border-white/10 text-white/40"
                  }`}
                >
                  <th className="py-3 px-4">TIMESTAMP</th>
                  <th className="py-3 px-4">ACTION</th>
                  <th className="py-3 px-4">ENTITY TYPE</th>
                  <th className="py-3 px-4">OPERATOR / ACTOR</th>
                  <th className="py-3 px-4">ENTITY ID</th>
                  <th className="py-3 px-4 text-right">MUTATION PAYLOAD</th>
                </tr>
              </thead>
              <tbody className={`divide-y font-mono text-[11px] ${isLight ? "divide-[#E2E5EB]" : "divide-white/5"}`}>
                {filteredLogs.map((log) => {
                  const isExpanded = expandedLogId === log.id;
                  return (
                    <React.Fragment key={log.id}>
                      <tr className={`transition-colors ${isLight ? "hover:bg-black/[0.02]" : "hover:bg-white/[0.02]"}`}>
                        <td className={`py-3 px-4 whitespace-nowrap ${isLight ? "text-[#555D6B]" : "text-white/40"}`}>
                          {new Date(log.createdAt).toISOString().replace("T", " ").slice(0, 19)}
                        </td>
                        <td className="py-3 px-4 font-bold text-accent">
                          {log.action}
                        </td>
                        <td className={`py-3 px-4 ${isLight ? "text-[#0D0F12]" : "text-white/80"}`}>
                          {log.entityType}
                        </td>
                        <td className={`py-3 px-4 ${isLight ? "text-[#0D0F12]" : "text-white/90"}`}>
                          <span className="font-sans font-medium">{log.actor?.name || "SYSTEM"}</span>{" "}
                          <span className={`text-[10px] ${isLight ? "text-[#848D9C]" : "text-white/40"}`}>
                            ({log.actor?.role || "SYSTEM"})
                          </span>
                        </td>
                        <td className={`py-3 px-4 truncate max-w-[140px] ${isLight ? "text-[#555D6B]" : "text-white/50"}`}>
                          {log.entityId}
                        </td>
                        <td className="py-3 px-4 text-right">
                          {log.diff ? (
                            <button
                              type="button"
                              onClick={() => setExpandedLogId(isExpanded ? null : log.id)}
                              className={`py-1 px-2.5 border rounded-[2px] text-[10px] uppercase font-azeret transition-colors ${
                                isLight
                                  ? "bg-[#F0F2F5] hover:bg-[#E4E7ED] border-[#D4D8E0] text-[#0D0F12]"
                                  : "bg-white/[0.05] hover:bg-white/10 border-white/15 text-white"
                              }`}
                            >
                              {isExpanded ? "HIDE DIFF ▲" : "INSPECT DIFF ▼"}
                            </button>
                          ) : (
                            <span className={`text-[10px] ${isLight ? "text-[#848D9C]" : "text-white/20"}`}>—</span>
                          )}
                        </td>
                      </tr>

                      {isExpanded && log.diff && (
                        <tr>
                          <td colSpan={6} className={`p-4 border-b ${isLight ? "bg-[#F8F9FB] border-[#E2E5EB]" : "bg-black/60 border-white/10"}`}>
                            <div className="flex flex-col gap-1.5">
                              <span className="font-azeret text-[9px] tracking-[0.2em] text-accent uppercase font-bold">
                                MUTATION DIFF PAYLOAD SNAPSHOT // {log.action}
                              </span>
                              <pre
                                className={`p-3 border rounded-[2px] text-[10px] overflow-x-auto ${
                                  isLight
                                    ? "bg-white border-[#E2E5EB] text-[#0D0F12]"
                                    : "bg-[#0a0a0a] border-white/10 text-white/80"
                                }`}
                              >
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
                      className={`p-8 text-center font-azeret text-xs uppercase tracking-widest ${isLight ? "text-[#848D9C]" : "text-white/40"}`}
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
