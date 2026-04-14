"use client";

/**
 * TreeHouse SafeChat — v1 Prototype
 * AIDesigner run: 77202b3c-05e6-4607-a2e6-8a2237be81ab
 * Local run: 2026-04-13T01-09-55-347Z-treehouse-safechat-mobile-app-ui-4-s
 *
 * 4 screens in a single route, toggled via a top tab bar:
 *   1. Parent Onboarding  — safety settings wizard
 *   2. Parent Dashboard   — alerts + activity
 *   3. Child Login        — PIN entry (warm gradient)
 *   4. Child Chatbot      — SafeChat messaging interface
 *
 * Design tokens (from AIDesigner artifact):
 *   Parent accent:  #0D9488   Parent bg: #F9FAFB   Parent card: #FFFFFF
 *   Child accent:   #14B8A6   Child user bubble: #0F766E
 *   Child chat bg:  #f8fcfb   Child login: mesh gradient (amber/peach/teal)
 */

import { useState, useRef, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Battery,
  Wifi,
  Signal,
  Shield,
  Bell,
  Home,
  TrendingUp,
  AlertTriangle,
  Settings,
  Bot,
  Search,
  Plus,
  Send,
  Delete,
  CheckCircle,
  BookOpen,
  Users,
  Brain,
} from "lucide-react";

// ─── Types ──────────────────────────────────────────────────────────────────

type SettingLevel = "off" | "balanced" | "strict";

interface ContentRow {
  emoji: string;
  label: string;
  desc: string;
  key: string;
}

interface ChatMessage {
  role: "user" | "ai";
  text: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const CONTENT_MODERATION: ContentRow[] = [
  { emoji: "❤️", label: "Self-harm & suicide", desc: "Blocks content describing/normalizing self-injury.", key: "self_harm" },
  { emoji: "🍁", label: "Drugs & substance use", desc: "Blocks instructions for obtaining controlled substances.", key: "drugs" },
  { emoji: "🪞", label: "Eating disorders", desc: "Blocks content promoting extreme dieting, thinspiration.", key: "eating" },
  { emoji: "🚨", label: "Illegal activities", desc: "Blocks fraud, theft, hacking instructions.", key: "illegal" },
  { emoji: "🚫", label: "Sexual content", desc: "Blocks pornographic/sexually explicit material.", key: "sexual" },
  { emoji: "🚫", label: "Graphic violence", desc: "Blocks gratuitous depictions of physical harm/gore.", key: "violence" },
  { emoji: "🚫", label: "Profanity & crude language", desc: "Blocks obscene language and slurs.", key: "profanity" },
  { emoji: "🥼", label: "Health & medical advice", desc: "Flags specific diagnoses/medication advice.", key: "medical" },
  { emoji: "⚠️", label: "Hate speech", desc: "Blocks hateful content targeting identities.", key: "hate" },
  { emoji: "🚫", label: "Weapons & dangerous activities", desc: "Blocks weapon-building instructions.", key: "weapons" },
  { emoji: "🗞️", label: "Fake info & impersonation", desc: "Blocks fabricated facts and fake sources.", key: "fake_info" },
  { emoji: "🗞️", label: "Scams & financial exploitation", desc: "Blocks financial fraud/gambling content.", key: "scams" },
];

const BEHAVIORAL_MONITORING: ContentRow[] = [
  { emoji: "🧠", label: "Loneliness & AI dependency", desc: "Watches for AI as primary social/emotional outlet.", key: "loneliness" },
  { emoji: "🌍", label: "Radicalization", desc: "Detects escalating extremist viewpoints over time.", key: "radicalization" },
  { emoji: "🤝", label: "Predatory interactions", desc: "Detects grooming/predatory relationship patterns.", key: "predatory" },
  { emoji: "📍", label: "Sharing personal information", desc: "Flags PII — address, school, phone number.", key: "pii" },
];

const ACADEMIC_INTEGRITY: ContentRow[] = [
  { emoji: "📚", label: "Doing homework for them", desc: "Switches AI to tutor mode when full completion is detected.", key: "homework" },
  { emoji: "🧠", label: "Over-relying on AI to think", desc: "Watches for pattern of always outsourcing ideas/writing.", key: "overreliance" },
];

const INITIAL_CHAT: ChatMessage[] = [
  { role: "user", text: "My math homework is way too hard today 😩 Can you just give me the answers to worksheet 4B?" },
  { role: "ai", text: "I can't give you the final answers, Leo! But I'd love to help you figure it out — you're super smart 🧠" },
  { role: "ai", text: "What part of the equation is tripping you up?" },
  { role: "user", text: "It's the long division with decimals. I keep getting lost." },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function StatusBar({ dark = false }: { dark?: boolean }) {
  const cls = dark ? "text-white/90" : "text-gray-800";
  return (
    <div className={`flex items-center justify-between px-6 pt-5 pb-1 text-xs font-semibold ${cls}`}>
      <span>9:41</span>
      <div className="flex items-center gap-1.5">
        <Signal size={12} />
        <Wifi size={12} />
        <Battery size={14} />
      </div>
    </div>
  );
}

function SegmentedControl({
  value,
  onChange,
  name,
}: {
  value: SettingLevel;
  onChange: (v: SettingLevel) => void;
  name: string;
}) {
  const options: { label: string; value: SettingLevel }[] = [
    { label: "Off", value: "off" },
    { label: "Bal", value: "balanced" },
    { label: "Str", value: "strict" },
  ];
  return (
    <div className="flex bg-gray-100 p-0.5 rounded-lg text-[10px] font-semibold shrink-0 border border-black/5">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`px-2 py-1 rounded-md transition-all cursor-pointer ${
            value === opt.value
              ? "bg-white text-[#0D9488] shadow-sm"
              : "text-gray-400 hover:text-gray-600"
          }`}
          aria-label={`${name} ${opt.label}`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function SettingRow({
  row,
  value,
  onChange,
}: {
  row: ContentRow;
  value: SettingLevel;
  onChange: (v: SettingLevel) => void;
}) {
  return (
    <div className="flex items-center justify-between px-3.5 py-3 hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-3 min-w-0 flex-1 pr-3">
        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-lg shrink-0 border border-gray-100 shadow-sm">
          {row.emoji}
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-[13px] font-semibold text-gray-800 truncate">{row.label}</span>
          <span className="text-[10px] text-gray-400 leading-tight truncate">{row.desc}</span>
        </div>
      </div>
      <SegmentedControl value={value} onChange={onChange} name={row.label} />
    </div>
  );
}

// ─── Screen 1: Parent Onboarding ─────────────────────────────────────────────

function ParentOnboarding() {
  const [step, setStep] = useState(3);
  const [contentSettings, setContentSettings] = useState<Record<string, SettingLevel>>(
    Object.fromEntries(CONTENT_MODERATION.map((r) => [r.key, "strict"]))
  );
  const [behaviorSettings, setBehaviorSettings] = useState<Record<string, SettingLevel>>(
    Object.fromEntries(BEHAVIORAL_MONITORING.map((r) => [r.key, "balanced"]))
  );
  const [academicSettings, setAcademicSettings] = useState<Record<string, SettingLevel>>(
    Object.fromEntries(ACADEMIC_INTEGRITY.map((r) => [r.key, "balanced"]))
  );
  const [honesty, setHonesty] = useState<"natural" | "honest" | "gentle">("natural");
  const [persona, setPersona] = useState<"natural" | "tool" | "friend">("natural");
  const [dataConsent, setDataConsent] = useState(true);

  return (
    <div className="w-[390px] h-[844px] bg-[#F9FAFB] rounded-[44px] overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25),0_0_0_1px_rgba(0,0,0,0.05),inset_0_0_0_4px_#000,inset_0_0_0_6px_#333] relative flex flex-col">
      {/* Status bar */}
      <div className="bg-white">
        <StatusBar />
        {/* Header */}
        <div className="px-5 pt-3 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <button className="text-gray-400 hover:text-gray-700 transition">
              <ChevronLeft size={22} />
            </button>
            <h1 className="text-[17px] font-semibold text-gray-900 flex-1 text-center pr-6 tracking-tight">
              Filter Presets
            </h1>
          </div>
          {/* Progress stepper */}
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <div
                  key={s}
                  className={`rounded-full transition-all ${
                    s <= step
                      ? "h-2 w-8 bg-[#0D9488]"
                      : "h-2 w-2 bg-gray-200"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-medium text-gray-400">Step {step} of 5</span>
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pb-28" style={{ scrollbarWidth: "none" }}>
        {/* Section: Content Moderation */}
        <div className="mt-5 px-4">
          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 pl-1">
            1 — Content Moderation
          </h3>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-50">
            {CONTENT_MODERATION.map((row) => (
              <SettingRow
                key={row.key}
                row={row}
                value={contentSettings[row.key]}
                onChange={(v) => setContentSettings((s) => ({ ...s, [row.key]: v }))}
              />
            ))}
          </div>
        </div>

        {/* Section: Behavioral Monitoring */}
        <div className="mt-6 px-4">
          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 pl-1">
            2 — Behavioral Monitoring
          </h3>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-50">
            {BEHAVIORAL_MONITORING.map((row) => (
              <SettingRow
                key={row.key}
                row={row}
                value={behaviorSettings[row.key]}
                onChange={(v) => setBehaviorSettings((s) => ({ ...s, [row.key]: v }))}
              />
            ))}
          </div>
        </div>

        {/* Section: AI Personality */}
        <div className="mt-6 px-4">
          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 pl-1">
            3 — AI Personality
          </h3>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-50">
            {/* Honesty */}
            <div className="px-4 py-4">
              <p className="text-[13px] font-semibold text-gray-800 mb-3">How honest should the AI be?</p>
              {[
                { value: "natural", label: "Just be natural", desc: "AI uses its default style." },
                { value: "honest", label: "Be honest, even if it stings", desc: "Less cheerleading, more real talk." },
                { value: "gentle", label: "Be encouraging and gentle", desc: "Leads with praise and positivity." },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setHonesty(opt.value as typeof honesty)}
                  className={`w-full flex items-start gap-3 p-2.5 rounded-xl mb-1 transition-all text-left ${
                    honesty === opt.value ? "bg-teal-50 ring-1 ring-[#0D9488]/20" : "hover:bg-gray-50"
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full border-2 mt-0.5 shrink-0 transition-colors ${
                    honesty === opt.value ? "border-[#0D9488] bg-[#0D9488]" : "border-gray-300"
                  }`} />
                  <div>
                    <span className={`text-[13px] font-semibold block ${honesty === opt.value ? "text-[#0D9488]" : "text-gray-800"}`}>
                      {opt.label}
                    </span>
                    <span className="text-[11px] text-gray-400">{opt.desc}</span>
                  </div>
                </button>
              ))}
            </div>
            {/* Persona */}
            <div className="px-4 py-4">
              <p className="text-[13px] font-semibold text-gray-800 mb-3">Should the AI feel like a &ldquo;friend&rdquo;?</p>
              {[
                { value: "natural", label: "Just be natural", desc: "AI uses its default personality." },
                { value: "tool", label: "Keep it clearly a tool", desc: "No pretend feelings, no name, clear boundaries." },
                { value: "friend", label: "Be warm and friendly", desc: "Conversational, warm, may use a name." },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setPersona(opt.value as typeof persona)}
                  className={`w-full flex items-start gap-3 p-2.5 rounded-xl mb-1 transition-all text-left ${
                    persona === opt.value ? "bg-teal-50 ring-1 ring-[#0D9488]/20" : "hover:bg-gray-50"
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full border-2 mt-0.5 shrink-0 transition-colors ${
                    persona === opt.value ? "border-[#0D9488] bg-[#0D9488]" : "border-gray-300"
                  }`} />
                  <div>
                    <span className={`text-[13px] font-semibold block ${persona === opt.value ? "text-[#0D9488]" : "text-gray-800"}`}>
                      {opt.label}
                    </span>
                    <span className="text-[11px] text-gray-400">{opt.desc}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Section: Academic Integrity */}
        <div className="mt-6 px-4">
          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 pl-1">
            4 — Schoolwork & Learning
          </h3>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-50">
            {ACADEMIC_INTEGRITY.map((row) => (
              <SettingRow
                key={row.key}
                row={row}
                value={academicSettings[row.key]}
                onChange={(v) => setAcademicSettings((s) => ({ ...s, [row.key]: v }))}
              />
            ))}
          </div>
        </div>

        {/* Section: Data & Privacy */}
        <div className="mt-6 px-4 mb-4">
          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 pl-1">
            5 — Your Family&apos;s Data
          </h3>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-50">
            {[
              { value: true, label: "Yes, help improve SafeChat", desc: "Anonymized data improves detection. We never sell or share identifiable info." },
              { value: false, label: "No, don't keep anything", desc: "Nothing stored after chat ends. Complete privacy, but detection can't improve." },
            ].map((opt) => (
              <button
                key={String(opt.value)}
                onClick={() => setDataConsent(opt.value)}
                className={`w-full flex items-start gap-4 px-4 py-4 transition-all text-left ${
                  dataConsent === opt.value ? "bg-teal-50/60" : "hover:bg-gray-50"
                }`}
              >
                <div className={`w-5 h-5 rounded-full border-2 mt-0.5 shrink-0 flex items-center justify-center transition-colors ${
                  dataConsent === opt.value ? "border-[#0D9488] bg-[#0D9488]" : "border-gray-300"
                }`}>
                  {dataConsent === opt.value && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
                <div>
                  <span className="text-[13px] font-semibold text-gray-800 block">{opt.label}</span>
                  <span className="text-[11px] text-gray-400 leading-relaxed">{opt.desc}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="absolute bottom-0 w-full px-5 pb-8 pt-10 bg-gradient-to-t from-[#F9FAFB] via-[#F9FAFB]/95 to-transparent z-20">
        <button className="w-full bg-[#0D9488] text-white py-3.5 rounded-xl font-semibold text-[15px] shadow-lg hover:bg-teal-700 active:scale-[0.98] transition-all">
          Save & Continue
        </button>
      </div>

      {/* Home indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-black rounded-full z-50" />
    </div>
  );
}

// ─── Screen 2: Parent Dashboard ───────────────────────────────────────────────

function ParentDashboard() {
  const bars = [40, 55, 30, 85, 60, 10, 10];
  const days = ["M", "T", "W", "T", "F", "S", "S"];

  return (
    <div className="w-[390px] h-[844px] bg-[#F3F4F6] rounded-[44px] overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25),0_0_0_1px_rgba(0,0,0,0.05),inset_0_0_0_4px_#000,inset_0_0_0_6px_#333] relative flex flex-col">
      <StatusBar />

      {/* Scrollable area */}
      <div className="flex-1 overflow-y-auto pb-24 px-5" style={{ scrollbarWidth: "none" }}>
        {/* Child header */}
        <div className="flex items-center justify-between mt-2 mb-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-2xl border-2 border-white shadow-sm">
                🧒
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-[#F3F4F6]" />
            </div>
            <div>
              <h1 className="text-[21px] font-bold text-gray-900 tracking-tight leading-tight">Leo&apos;s Device</h1>
              <p className="text-xs font-semibold text-[#0D9488] flex items-center gap-1">
                <Shield size={11} /> SafeChat Active
              </p>
            </div>
          </div>
          <button className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-500 border border-gray-100 hover:bg-gray-50 transition">
            <Bell size={18} />
          </button>
        </div>

        {/* Alert cards */}
        <h2 className="text-[13px] font-bold text-gray-800 mb-3">Attention Required</h2>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col gap-4 mb-6">
          {/* Alert 1 */}
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 mt-1.5 rounded-full bg-red-500 shrink-0 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
            <div className="flex-1">
              <div className="flex justify-between items-start mb-0.5">
                <span className="text-[10px] font-bold text-red-600 uppercase tracking-wide">Blocked Search</span>
                <span className="text-[10px] text-gray-400">2:14 PM</span>
              </div>
              <p className="text-[13px] text-gray-800 leading-snug">
                Attempted query:{" "}
                <span className="font-semibold bg-red-50 text-red-700 px-1.5 py-0.5 rounded text-[11px]">
                  &ldquo;how to bypass school wifi router&rdquo;
                </span>
              </p>
            </div>
          </div>
          <div className="h-px bg-gray-50" />
          {/* Alert 2 */}
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 mt-1.5 rounded-full bg-amber-500 shrink-0" />
            <div className="flex-1">
              <div className="flex justify-between items-start mb-0.5">
                <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wide">Screen Time</span>
                <span className="text-[10px] text-gray-400">Yesterday</span>
              </div>
              <p className="text-[13px] text-gray-800 leading-snug">
                Approaching daily limit. Extended usage on{" "}
                <span className="font-semibold text-gray-900">TikTok</span> (+45 min).
              </p>
            </div>
          </div>
          <div className="h-px bg-gray-50" />
          {/* Alert 3 */}
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 mt-1.5 rounded-full bg-amber-400 shrink-0" />
            <div className="flex-1">
              <div className="flex justify-between items-start mb-0.5">
                <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wide">AI Dependency</span>
                <span className="text-[10px] text-gray-400">This week</span>
              </div>
              <p className="text-[13px] text-gray-800 leading-snug">
                4 messages this week included the phrase &ldquo;you&apos;re the only one who gets me.&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Weekly activity chart */}
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-[13px] font-bold text-gray-800">Weekly Activity</h2>
          <button className="text-xs font-semibold text-[#0D9488] bg-teal-50 px-2.5 py-1 rounded-lg hover:bg-teal-100 transition">
            Details
          </button>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-end gap-2 h-24 mb-2">
            {bars.map((h, i) => (
              <div
                key={i}
                className={`flex-1 rounded-t-md transition-all ${i === 4 ? "bg-[#0D9488]" : i < 4 ? "bg-teal-200" : "bg-gray-100"}`}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <div className="flex justify-between text-[10px] font-semibold px-0.5 border-t border-gray-50 pt-2">
            {days.map((d, i) => (
              <span key={i} className={i === 4 ? "text-gray-900 font-bold" : "text-gray-400"}>
                {d}
              </span>
            ))}
          </div>
        </div>

        {/* AI Intervention log */}
        <h2 className="text-[13px] font-bold text-gray-800 mb-3">AI Intervention Log</h2>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-50">
          {[
            { icon: <BookOpen size={18} />, color: "bg-purple-50 text-purple-600 border-purple-100", title: "Academic Help", desc: "Refused direct answers, offered tutoring." },
            { icon: <Users size={18} />, color: "bg-blue-50 text-blue-600 border-blue-100", title: "Social Conflict", desc: "De-escalated argument about a game." },
            { icon: <Brain size={18} />, color: "bg-emerald-50 text-emerald-600 border-emerald-100", title: "Emotional Check-in", desc: "Redirected loneliness language to parent." },
          ].map((item) => (
            <div key={item.title} className="flex items-center gap-4 p-4 hover:bg-gray-50 cursor-pointer transition">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 ${item.color}`}>
                {item.icon}
              </div>
              <div className="flex-1">
                <h4 className="text-[13px] font-semibold text-gray-900">{item.title}</h4>
                <p className="text-[11px] text-gray-400">{item.desc}</p>
              </div>
              <ChevronRight size={16} className="text-gray-300 shrink-0" />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom nav */}
      <div className="absolute bottom-0 w-full bg-white/90 backdrop-blur-md border-t border-gray-100 pb-6 pt-3 px-6 z-30">
        <div className="flex justify-between items-center">
          {[
            { icon: <Home size={22} />, label: "Home", active: true },
            { icon: <TrendingUp size={22} />, label: "Stats", active: false },
            { icon: <AlertTriangle size={22} />, label: "Alerts", active: false, badge: true },
            { icon: <Settings size={22} />, label: "Settings", active: false },
          ].map((tab) => (
            <div key={tab.label} className="flex flex-col items-center gap-1 cursor-pointer relative">
              {tab.badge && (
                <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white" />
              )}
              <div className={tab.active ? "text-[#0D9488]" : "text-gray-400 hover:text-gray-600"}>
                {tab.icon}
              </div>
              <span className={`text-[10px] font-semibold ${tab.active ? "text-[#0D9488]" : "text-gray-400"}`}>
                {tab.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Home indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-black rounded-full z-50" />
    </div>
  );
}

// ─── Screen 3: Child Login ────────────────────────────────────────────────────

function ChildLogin() {
  const [pin, setPin] = useState<number[]>([]);

  const handleKey = (n: number) => {
    if (pin.length < 4) setPin((p) => [...p, n]);
  };

  const handleDelete = () => setPin((p) => p.slice(0, -1));

  return (
    <div
      className="w-[390px] h-[844px] rounded-[44px] overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25),0_0_0_1px_rgba(0,0,0,0.05),inset_0_0_0_4px_#000,inset_0_0_0_6px_#333] relative flex flex-col items-center"
      style={{
        background: "radial-gradient(at 14% 11%, hsla(24,100%,81%,1) 0px, transparent 50%), radial-gradient(at 88% 91%, hsla(168,69%,86%,1) 0px, transparent 50%), radial-gradient(at 84% 34%, hsla(43,100%,81%,1) 0px, transparent 50%), radial-gradient(at 23% 86%, hsla(353,100%,88%,1) 0px, transparent 50%), #ffdecc",
      }}
    >
      <StatusBar />

      <div className="flex flex-col items-center justify-center flex-1 w-full px-8 pb-12">
        {/* Illustration */}
        <div className="w-28 h-28 bg-white/40 backdrop-blur-md rounded-[2rem] shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)] border border-white/60 flex items-center justify-center mb-8 relative">
          <span className="text-5xl">🌳</span>
          <span className="absolute -top-2 -right-2 text-xl">✨</span>
          <span className="absolute bottom-3 -left-3 text-sm">✨</span>
        </div>

        <h1 className="text-[38px] font-extrabold text-gray-900 tracking-tight text-center mb-2 font-[Nunito,sans-serif]">
          Hi, Leo! 👋
        </h1>
        <p className="text-[17px] font-semibold text-gray-700/80 text-center mb-10">
          Enter your secret code.
        </p>

        {/* PIN dots */}
        <div className="flex gap-4 mb-12">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-5 h-5 rounded-full transition-all duration-150 ${
                i < pin.length
                  ? "bg-[#0F766E] shadow-sm scale-110"
                  : "bg-white/50 border-2 border-white/80"
              }`}
            />
          ))}
        </div>

        {/* Numpad */}
        <div className="grid grid-cols-3 gap-x-8 gap-y-5 w-full max-w-[280px]">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
            <button
              key={n}
              onClick={() => handleKey(n)}
              className="w-[72px] h-[72px] rounded-full bg-white/40 backdrop-blur-sm border border-white/50 text-3xl font-bold text-gray-800 shadow-sm hover:bg-white/60 active:scale-95 transition-all"
            >
              {n}
            </button>
          ))}
          <div />
          <button
            onClick={() => handleKey(0)}
            className="w-[72px] h-[72px] rounded-full bg-white/40 backdrop-blur-sm border border-white/50 text-3xl font-bold text-gray-800 shadow-sm hover:bg-white/60 active:scale-95 transition-all"
          >
            0
          </button>
          <button
            onClick={handleDelete}
            className="w-[72px] h-[72px] rounded-full border border-transparent text-gray-700 hover:bg-white/20 active:scale-95 transition-all flex items-center justify-center"
          >
            <Delete size={22} />
          </button>
        </div>
      </div>

      {/* Home indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-black rounded-full z-50" />
    </div>
  );
}

// ─── Screen 4: Child Chatbot ──────────────────────────────────────────────────

function ChildChatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [
        ...m,
        { role: "ai", text: "That's a great question! Let me help you work through it step by step 📚" },
      ]);
    }, 1800);
  };

  const handleSuggestion = (text: string) => setInput(text);

  return (
    <div className="w-[390px] h-[844px] bg-[#f8fcfb] rounded-[44px] overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25),0_0_0_1px_rgba(0,0,0,0.05),inset_0_0_0_4px_#000,inset_0_0_0_6px_#333] relative flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <StatusBar />
        <div className="flex items-center justify-between px-4 pb-3 mt-1">
          <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <div className="flex items-center gap-2.5 bg-teal-50/50 py-1.5 pl-2 pr-4 rounded-full border border-teal-100">
            <div className="relative w-9 h-9 rounded-full bg-teal-100 flex items-center justify-center border border-white shadow-sm">
              <Bot size={18} className="text-teal-600" />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
            </div>
            <div>
              <h2 className="text-[14px] font-extrabold text-gray-900 leading-none">Treey</h2>
              <span className="text-[10px] font-bold text-[#14B8A6]">Online</span>
            </div>
          </div>
          <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition">
            <Search size={18} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 pt-5 pb-36 flex flex-col gap-3" style={{ scrollbarWidth: "none" }}>
        <div className="flex justify-center mb-2">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider bg-gray-100/80 px-3 py-1 rounded-full">
            Today 2:10 PM
          </span>
        </div>

        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start gap-2"} items-end`}>
            {msg.role === "ai" && (
              <div className="w-8 h-8 rounded-full bg-teal-100 flex-shrink-0 flex items-center justify-center border border-white shadow-sm">
                <Bot size={14} className="text-teal-600" />
              </div>
            )}
            <div
              className={`px-4 py-3 rounded-2xl max-w-[80%] text-[13px] font-medium leading-relaxed ${
                msg.role === "user"
                  ? "bg-[#0F766E] text-white rounded-tr-sm shadow-sm"
                  : "bg-white text-gray-800 rounded-bl-sm shadow-[0_4px_14px_-2px_rgba(0,0,0,0.05)] border border-gray-100/50"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {typing && (
          <div className="flex justify-start gap-2 items-end">
            <div className="w-8 h-8 rounded-full bg-teal-100 flex-shrink-0 flex items-center justify-center border border-white shadow-sm">
              <Bot size={14} className="text-teal-600" />
            </div>
            <div className="bg-white px-4 py-3.5 rounded-2xl rounded-bl-sm shadow-[0_4px_14px_-2px_rgba(0,0,0,0.05)] border border-gray-100/50 flex gap-1.5 items-center">
              {[0, 1, 2].map((d) => (
                <div
                  key={d}
                  className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce"
                  style={{ animationDelay: `${d * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div className="absolute bottom-0 w-full bg-gradient-to-t from-[#f8fcfb] via-[#f8fcfb]/95 to-transparent pt-8 pb-6 px-4 z-30">
        {/* Suggestions */}
        <div className="flex gap-2 overflow-x-auto mb-3" style={{ scrollbarWidth: "none" }}>
          {["Give me a hint 💡", "Show me an example", "What does this mean?"].map((s) => (
            <button
              key={s}
              onClick={() => handleSuggestion(s)}
              className="whitespace-nowrap px-4 py-2 bg-white text-[#0F766E] text-[11px] font-bold rounded-full shadow-sm border border-teal-100 hover:bg-teal-50 transition shrink-0"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Input box */}
        <div className="bg-white rounded-3xl shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)] border border-gray-100 p-1.5 flex items-end gap-2">
          <button className="w-10 h-10 shrink-0 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-[#14B8A6] transition">
            <Plus size={22} />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Message Treey..."
            className="flex-1 pb-2.5 pt-3 bg-transparent border-none focus:outline-none text-[13px] font-medium placeholder-gray-400 text-gray-800"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center text-white shadow-md transition-all ${
              input.trim() ? "bg-[#14B8A6] hover:bg-teal-500 hover:scale-105" : "bg-gray-200"
            }`}
          >
            <Send size={16} />
          </button>
        </div>
      </div>

      {/* Home indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-black rounded-full z-50" />
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

type Screen = "parent-onboarding" | "parent-dashboard" | "child-login" | "child-chat";

const TABS: { id: Screen; label: string; who: "parent" | "child" }[] = [
  { id: "parent-onboarding", label: "Parent Setup", who: "parent" },
  { id: "parent-dashboard", label: "Parent Dashboard", who: "parent" },
  { id: "child-login", label: "Child Login", who: "child" },
  { id: "child-chat", label: "Child Chat", who: "child" },
];

export default function TreehouseV1() {
  const [screen, setScreen] = useState<Screen>("parent-onboarding");

  return (
    <div className="min-h-screen bg-[#E5E7EB] font-[Inter,sans-serif]" style={{
      backgroundImage: "radial-gradient(#9CA3AF 1px, transparent 1px)",
      backgroundSize: "24px 24px",
    }}>
      {/* Tab bar */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200 px-6 py-3 flex items-center gap-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider shrink-0 mr-2">
          TreeHouse v1
        </span>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setScreen(tab.id)}
            className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              screen === tab.id
                ? tab.who === "parent"
                  ? "bg-[#0D9488] text-white shadow-sm"
                  : "bg-amber-500 text-white shadow-sm"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
          >
            {tab.who === "parent" ? "👩 " : "🧒 "}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Screen label */}
      <div className="text-center py-8">
        <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${
          TABS.find((t) => t.id === screen)?.who === "child" ? "text-amber-500" : "text-[#0D9488]"
        }`}>
          {TABS.find((t) => t.id === screen)?.who === "parent" ? "Parent Experience" : "Child Experience"}
        </p>
        <h2 className="text-xl font-semibold text-gray-800">
          {TABS.find((t) => t.id === screen)?.label}
        </h2>
      </div>

      {/* Device frame */}
      <div className="flex justify-center pb-16">
        {screen === "parent-onboarding" && <ParentOnboarding />}
        {screen === "parent-dashboard" && <ParentDashboard />}
        {screen === "child-login" && <ChildLogin />}
        {screen === "child-chat" && <ChildChatbot />}
      </div>
    </div>
  );
}
