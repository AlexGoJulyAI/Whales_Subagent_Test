"use client";

/**
 * TreeHouse SafeChat — v2
 * Design system via ui-ux-pro-max skill:
 *   Style:      Micro-interactions (50–100ms tactile feedback, spring states)
 *   Primary:    #F97316 (orange)  — child warmth / energy
 *   CTA/Trust:  #2563EB (blue)    — parent authority / safety
 *   Background: #FFF7ED (cream)   — warm, approachable
 *   Text:       #9A3412 (deep orange-brown)
 *   Heading font: Baloo 2 (kids, education, playful)
 *   Body font:    Comic Neue (friendly, readable)
 *
 * 4 screens toggled via top tab bar:
 *   1. Parent Onboarding  — 5-section safety wizard
 *   2. Parent Dashboard   — alerts + weekly activity
 *   3. Child Login        — PIN entry with orange accents
 *   4. Child Chatbot      — SafeChat chat UI
 */

import { useState, useRef, useEffect } from "react";
import { Baloo_2, Comic_Neue } from "next/font/google";
import {
  ChevronLeft,
  ChevronRight,
  Shield,
  Bell,
  Home,
  TrendingUp,
  AlertTriangle,
  Settings,
  Bot,
  Search,
  Plus,
  SendHorizonal,
  Delete,
  BookOpen,
  Users,
  Brain,
  Check,
  Wifi,
  BatteryFull,
  Signal,
} from "lucide-react";

// ─── Fonts (loaded per-page, no layout.tsx modification needed) ───────────────

const baloo = Baloo_2({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-baloo",
  display: "swap",
});

const comicNeue = Comic_Neue({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-comic",
  display: "swap",
});

// ─── Design tokens (from ui-ux-pro-max output) ───────────────────────────────

const T = {
  orange:      "#F97316",
  orangeLight: "#FFEDD5",
  orangeDark:  "#C2410C",
  blue:        "#2563EB",
  blueDark:    "#1D4ED8",
  blueLight:   "#DBEAFE",
  cream:       "#FFF7ED",
  creamDark:   "#FED7AA",
  text:        "#9A3412",
  textDark:    "#431407",
  textMuted:   "#C2410C",
  white:       "#FFFFFF",
  gray50:      "#F9FAFB",
  gray100:     "#F3F4F6",
  gray200:     "#E5E7EB",
  gray400:     "#9CA3AF",
  red:         "#EF4444",
  amber:       "#F59E0B",
  green:       "#22C55E",
} as const;

// ─── Types & data ─────────────────────────────────────────────────────────────

type Level = "off" | "balanced" | "strict";

interface SettingRow {
  icon: React.ReactNode;
  label: string;
  desc: string;
  key: string;
}

interface Msg { role: "user" | "ai"; text: string }

// Lucide icons used in setting rows — no emoji icons per skill rules
const CONTENT_ROWS: SettingRow[] = [
  { icon: <Shield size={14} />,        label: "Self-harm & suicide",        desc: "Blocks content describing/normalizing self-injury.", key: "self_harm" },
  { icon: <AlertTriangle size={14} />, label: "Drugs & substance use",       desc: "Blocks instructions for controlled substances.", key: "drugs" },
  { icon: <Users size={14} />,         label: "Eating disorders",             desc: "Blocks extreme dieting, thinspiration content.", key: "eating" },
  { icon: <AlertTriangle size={14} />, label: "Illegal activities",           desc: "Blocks fraud, theft, hacking instructions.", key: "illegal" },
  { icon: <Shield size={14} />,        label: "Sexual content",               desc: "Blocks pornographic/sexually explicit material.", key: "sexual" },
  { icon: <AlertTriangle size={14} />, label: "Graphic violence",             desc: "Blocks gratuitous depictions of harm/gore.", key: "violence" },
  { icon: <AlertTriangle size={14} />, label: "Profanity & crude language",   desc: "Blocks obscene language and slurs.", key: "profanity" },
  { icon: <Brain size={14} />,         label: "Health & medical advice",      desc: "Flags specific diagnoses/medication advice.", key: "medical" },
  { icon: <Shield size={14} />,        label: "Hate speech",                  desc: "Blocks hateful content targeting identities.", key: "hate" },
  { icon: <AlertTriangle size={14} />, label: "Weapons & dangerous acts",     desc: "Blocks weapon-building instructions.", key: "weapons" },
  { icon: <Shield size={14} />,        label: "Fake info & impersonation",    desc: "Blocks fabricated facts and fake sources.", key: "fake" },
  { icon: <AlertTriangle size={14} />, label: "Scams & financial exploits",   desc: "Blocks fraud, gambling, crypto schemes.", key: "scams" },
];

const BEHAVIOR_ROWS: SettingRow[] = [
  { icon: <Brain size={14} />,  label: "Loneliness & AI dependency",    desc: "Watches for AI as primary social/emotional outlet.", key: "loneliness" },
  { icon: <Shield size={14} />, label: "Radicalization",                 desc: "Detects escalating extremist viewpoints over time.", key: "radical" },
  { icon: <Users size={14} />,  label: "Predatory interactions",         desc: "Detects grooming/predatory relationship patterns.", key: "predatory" },
  { icon: <Shield size={14} />, label: "Sharing personal information",   desc: "Flags PII — address, school, phone number.", key: "pii" },
];

const ACADEMIC_ROWS: SettingRow[] = [
  { icon: <BookOpen size={14} />, label: "Doing homework for them",        desc: "Switches AI to tutor mode for full-completion requests.", key: "homework" },
  { icon: <Brain size={14} />,    label: "Over-relying on AI to think",    desc: "Flags pattern of always outsourcing ideas/writing.", key: "overreliance" },
];

const INIT_CHAT: Msg[] = [
  { role: "user", text: "My math homework is super hard today 😩 can you just write it for me?" },
  { role: "ai",  text: "I can't hand you the answers, but I know you can figure this out! Let's tackle it together 🌟" },
  { role: "ai",  text: "Which part is tripping you up?" },
  { role: "user", text: "Long division with decimals. I keep getting lost at the end." },
];

// ─── Shared sub-components ────────────────────────────────────────────────────

function StatusBar({ light = false }: { light?: boolean }) {
  const c = light ? "text-white/90" : "text-[#9A3412]";
  return (
    <div className={`flex items-center justify-between px-5 pt-5 pb-1 text-[11px] font-semibold ${c}`}>
      <span>9:41</span>
      <div className="flex items-center gap-1">
        <Signal size={11} />
        <Wifi size={11} />
        <BatteryFull size={13} />
      </div>
    </div>
  );
}

/** 3-way Off / Balanced / Strict pill selector */
function TriPill({ value, onChange }: { value: Level; onChange: (v: Level) => void }) {
  const opts: { v: Level; label: string }[] = [
    { v: "off",      label: "Off" },
    { v: "balanced", label: "Bal" },
    { v: "strict",   label: "Str" },
  ];
  return (
    <div
      className="flex rounded-xl p-[3px] shrink-0"
      style={{ background: T.blueLight, border: `1px solid ${T.blue}22` }}
    >
      {opts.map(({ v, label }) => (
        <button
          key={v}
          onClick={() => onChange(v)}
          className="px-2 py-1 rounded-[9px] text-[10px] font-bold transition-all duration-75 cursor-pointer"
          style={
            value === v
              ? { background: T.blue, color: T.white, boxShadow: "0 1px 4px rgba(37,99,235,0.35)" }
              : { color: T.blue, background: "transparent" }
          }
        >
          {label}
        </button>
      ))}
    </div>
  );
}

function SettingItem({ row, value, onChange }: { row: SettingRow; value: Level; onChange: (v: Level) => void }) {
  return (
    <div
      className="flex items-center justify-between px-3.5 py-3 transition-colors duration-75 cursor-pointer hover:bg-orange-50"
    >
      <div className="flex items-center gap-2.5 min-w-0 flex-1 pr-3">
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
          style={{ background: T.blueLight, color: T.blue }}
        >
          {row.icon}
        </div>
        <div className="min-w-0">
          <p className="text-[12px] font-bold truncate" style={{ color: T.textDark, fontFamily: "var(--font-baloo)" }}>
            {row.label}
          </p>
          <p className="text-[10px] leading-tight truncate" style={{ color: T.textMuted }}>
            {row.desc}
          </p>
        </div>
      </div>
      <TriPill value={value} onChange={onChange} />
    </div>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-5 px-4">
      <p
        className="text-[10px] font-extrabold uppercase tracking-widest mb-2 pl-1"
        style={{ color: T.blue, fontFamily: "var(--font-baloo)" }}
      >
        {title}
      </p>
      <div
        className="rounded-2xl overflow-hidden divide-y divide-[#FED7AA]"
        style={{ background: T.white, border: `1px solid ${T.creamDark}` }}
      >
        {children}
      </div>
    </div>
  );
}

function DeviceShell({ children, bg = T.cream }: { children: React.ReactNode; bg?: string }) {
  return (
    <div
      className="w-[390px] h-[844px] rounded-[44px] overflow-hidden relative flex flex-col"
      style={{
        background: bg,
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.28), 0 0 0 1px rgba(0,0,0,0.06), inset 0 0 0 4px #000, inset 0 0 0 6px #222",
      }}
    >
      {children}
      {/* Home indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 rounded-full bg-black z-50" />
    </div>
  );
}

// ─── Screen 1 — Parent Onboarding ─────────────────────────────────────────────

function ParentOnboarding() {
  const [step] = useState(3);
  const [cs, setCs] = useState<Record<string, Level>>(Object.fromEntries(CONTENT_ROWS.map(r => [r.key, "strict"])));
  const [bs, setBs] = useState<Record<string, Level>>(Object.fromEntries(BEHAVIOR_ROWS.map(r => [r.key, "balanced"])));
  const [as_, setAs] = useState<Record<string, Level>>(Object.fromEntries(ACADEMIC_ROWS.map(r => [r.key, "balanced"])));
  const [honesty, setHonesty]   = useState<"natural"|"honest"|"gentle">("natural");
  const [persona, setPersona]   = useState<"natural"|"tool"|"friend">("natural");
  const [privacy, setPrivacy]   = useState(true);

  const RadioGroup = ({
    value, onChange, options,
  }: {
    value: string;
    onChange: (v: string) => void;
    options: { v: string; label: string; desc: string }[];
  }) => (
    <div className="flex flex-col gap-1">
      {options.map(opt => (
        <button
          key={opt.v}
          onClick={() => onChange(opt.v)}
          className="flex items-start gap-3 p-2.5 rounded-xl text-left transition-all duration-75 cursor-pointer"
          style={value === opt.v ? { background: T.blueLight } : { background: "transparent" }}
        >
          <div
            className="w-4 h-4 rounded-full border-2 mt-0.5 shrink-0 flex items-center justify-center transition-all duration-75"
            style={{ borderColor: value === opt.v ? T.blue : T.gray400, background: value === opt.v ? T.blue : "transparent" }}
          >
            {value === opt.v && <Check size={9} color={T.white} />}
          </div>
          <div>
            <p className="text-[12px] font-bold leading-tight" style={{ color: value === opt.v ? T.blue : T.textDark, fontFamily: "var(--font-baloo)" }}>
              {opt.label}
            </p>
            <p className="text-[10px]" style={{ color: T.gray400 }}>{opt.desc}</p>
          </div>
        </button>
      ))}
    </div>
  );

  return (
    <DeviceShell>
      {/* Header */}
      <div style={{ background: T.white }}>
        <StatusBar />
        <div className="px-5 pt-3 pb-4" style={{ borderBottom: `1px solid ${T.creamDark}` }}>
          <div className="flex items-center gap-3 mb-4">
            <button className="cursor-pointer transition-transform duration-75 active:scale-90" style={{ color: T.gray400 }}>
              <ChevronLeft size={22} />
            </button>
            <h1
              className="flex-1 text-center pr-6 text-[18px] font-bold"
              style={{ color: T.textDark, fontFamily: "var(--font-baloo)" }}
            >
              Safety Settings
            </h1>
          </div>
          {/* Stepper */}
          <div className="flex items-center justify-between px-1">
            <div className="flex gap-1.5 items-center">
              {[1,2,3,4,5].map(s => (
                <div key={s} className="rounded-full transition-all duration-200"
                  style={{ height: 8, width: s <= step ? 28 : 8, background: s <= step ? T.orange : T.creamDark }} />
              ))}
            </div>
            <span className="text-[11px] font-semibold" style={{ color: T.textMuted }}>Step {step} of 5</span>
          </div>
        </div>
      </div>

      {/* Scroll */}
      <div className="flex-1 overflow-y-auto pb-28" style={{ scrollbarWidth: "none" }}>

        {/* 1 — Content Moderation */}
        <SectionCard title="1 — Content Moderation">
          {CONTENT_ROWS.map(r => (
            <SettingItem key={r.key} row={r} value={cs[r.key]} onChange={v => setCs(s => ({ ...s, [r.key]: v }))} />
          ))}
        </SectionCard>

        {/* 2 — Behavioral Monitoring */}
        <SectionCard title="2 — Behavioral Monitoring">
          {BEHAVIOR_ROWS.map(r => (
            <SettingItem key={r.key} row={r} value={bs[r.key]} onChange={v => setBs(s => ({ ...s, [r.key]: v }))} />
          ))}
        </SectionCard>

        {/* 3 — AI Personality */}
        <SectionCard title="3 — AI Personality">
          <div className="px-4 py-4" style={{ borderBottom: `1px solid ${T.orangeLight}` }}>
            <p className="text-[12px] font-bold mb-3" style={{ color: T.textDark, fontFamily: "var(--font-baloo)" }}>
              How honest should the AI be?
            </p>
            <RadioGroup value={honesty} onChange={v => setHonesty(v as typeof honesty)} options={[
              { v: "natural", label: "Just be natural",           desc: "AI uses its default style." },
              { v: "honest",  label: "Be honest, even if it stings", desc: "Less cheerleading, more real talk." },
              { v: "gentle",  label: "Be encouraging and gentle", desc: "Leads with praise and positivity." },
            ]} />
          </div>
          <div className="px-4 py-4">
            <p className="text-[12px] font-bold mb-3" style={{ color: T.textDark, fontFamily: "var(--font-baloo)" }}>
              Should the AI feel like a friend?
            </p>
            <RadioGroup value={persona} onChange={v => setPersona(v as typeof persona)} options={[
              { v: "natural", label: "Just be natural",           desc: "AI uses its default personality." },
              { v: "tool",    label: "Keep it clearly a tool",    desc: "No feelings, no name, clear boundaries." },
              { v: "friend",  label: "Be warm and friendly",      desc: "Conversational, warm, may use a name." },
            ]} />
          </div>
        </SectionCard>

        {/* 4 — Academic Integrity */}
        <SectionCard title="4 — Schoolwork & Learning">
          {ACADEMIC_ROWS.map(r => (
            <SettingItem key={r.key} row={r} value={as_[r.key]} onChange={v => setAs(s => ({ ...s, [r.key]: v }))} />
          ))}
        </SectionCard>

        {/* 5 — Data & Privacy */}
        <SectionCard title="5 — Your Family's Data">
          {[
            { v: true,  label: "Yes, help improve SafeChat", desc: "Anonymized data improves detection. We never sell or share identifiable info." },
            { v: false, label: "No, don't keep anything",    desc: "Nothing stored after chat ends. Complete privacy guaranteed." },
          ].map(opt => (
            <button
              key={String(opt.v)}
              onClick={() => setPrivacy(opt.v)}
              className="w-full flex items-start gap-4 px-4 py-4 text-left transition-colors duration-75 cursor-pointer"
              style={privacy === opt.v ? { background: T.blueLight } : { background: "transparent" }}
            >
              <div
                className="w-5 h-5 rounded-full border-2 mt-0.5 shrink-0 flex items-center justify-center transition-all duration-75"
                style={{ borderColor: privacy === opt.v ? T.blue : T.gray400, background: privacy === opt.v ? T.blue : "transparent" }}
              >
                {privacy === opt.v && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>
              <div>
                <p className="text-[12px] font-bold" style={{ color: T.textDark, fontFamily: "var(--font-baloo)" }}>{opt.label}</p>
                <p className="text-[11px] leading-relaxed" style={{ color: T.gray400 }}>{opt.desc}</p>
              </div>
            </button>
          ))}
        </SectionCard>

        <div className="h-4" />
      </div>

      {/* CTA */}
      <div
        className="absolute bottom-0 w-full px-5 pb-8 pt-12 z-20"
        style={{ background: `linear-gradient(to top, ${T.cream} 70%, transparent)` }}
      >
        <button
          className="w-full py-3.5 rounded-2xl font-extrabold text-[15px] text-white transition-all duration-100 cursor-pointer active:scale-[0.98]"
          style={{ background: T.blue, boxShadow: `0 4px 16px ${T.blue}55`, fontFamily: "var(--font-baloo)" }}
        >
          Save &amp; Continue
        </button>
      </div>
    </DeviceShell>
  );
}

// ─── Screen 2 — Parent Dashboard ─────────────────────────────────────────────

function ParentDashboard() {
  const bars = [38, 52, 28, 88, 62, 12, 8];
  const days = ["M","T","W","T","F","S","S"];

  return (
    <DeviceShell>
      <StatusBar />

      <div className="flex-1 overflow-y-auto pb-24 px-4 pt-1" style={{ scrollbarWidth: "none" }}>

        {/* Child header */}
        <div className="flex items-center justify-between mt-2 mb-5">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold border-2"
                style={{ background: T.orangeLight, borderColor: T.creamDark, color: T.orange, fontFamily: "var(--font-baloo)" }}
              >
                L
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-white" style={{ background: T.green }} />
            </div>
            <div>
              <h1 className="text-[21px] font-extrabold leading-tight" style={{ color: T.textDark, fontFamily: "var(--font-baloo)" }}>
                Leo's Device
              </h1>
              <p className="text-[11px] font-bold flex items-center gap-1" style={{ color: T.blue }}>
                <Shield size={11} /> SafeChat Active
              </p>
            </div>
          </div>
          <button
            className="w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-75 active:scale-90 cursor-pointer"
            style={{ background: T.blueLight, color: T.blue }}
          >
            <Bell size={18} />
          </button>
        </div>

        {/* Alerts */}
        <p className="text-[12px] font-extrabold mb-2" style={{ color: T.textDark, fontFamily: "var(--font-baloo)" }}>
          Attention Required
        </p>
        <div className="rounded-2xl overflow-hidden mb-5" style={{ background: T.white, border: `1px solid ${T.creamDark}` }}>
          {[
            {
              dot: T.red, label: "Blocked Search", labelColor: T.red, time: "2:14 PM",
              body: <>Attempted query: <span className="font-bold px-1 py-0.5 rounded text-[11px]" style={{ background: "#FEE2E2", color: T.red }}>&ldquo;how to bypass school wifi router&rdquo;</span></>
            },
            {
              dot: T.amber, label: "Screen Time", labelColor: T.amber, time: "Yesterday",
              body: <>Approaching daily limit. Extended usage on <span className="font-bold" style={{ color: T.textDark }}>TikTok</span> (+45 min).</>
            },
            {
              dot: T.amber, label: "AI Dependency", labelColor: T.amber, time: "This week",
              body: <>4 messages included phrase &ldquo;you&apos;re the only one who gets me.&rdquo;</>
            },
          ].map((a, i) => (
            <div key={i} className="flex items-start gap-3 px-4 py-3" style={{ borderBottom: i < 2 ? `1px solid ${T.orangeLight}` : undefined }}>
              <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: a.dot, boxShadow: `0 0 6px ${a.dot}88` }} />
              <div className="flex-1">
                <div className="flex justify-between mb-0.5">
                  <span className="text-[10px] font-extrabold uppercase tracking-wide" style={{ color: a.labelColor }}>{a.label}</span>
                  <span className="text-[10px]" style={{ color: T.gray400 }}>{a.time}</span>
                </div>
                <p className="text-[12px] leading-snug" style={{ color: T.textDark }}>{a.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Activity chart */}
        <div className="flex justify-between items-center mb-2">
          <p className="text-[12px] font-extrabold" style={{ color: T.textDark, fontFamily: "var(--font-baloo)" }}>Weekly Activity</p>
          <button className="text-[11px] font-bold px-2.5 py-1 rounded-lg cursor-pointer" style={{ background: T.blueLight, color: T.blue }}>Details</button>
        </div>
        <div className="rounded-2xl p-4 mb-5" style={{ background: T.white, border: `1px solid ${T.creamDark}` }}>
          <div className="flex items-end gap-2 h-20 mb-2">
            {bars.map((h, i) => (
              <div key={i} className="flex-1 rounded-t-lg transition-all"
                style={{ height: `${h}%`, background: i === 4 ? T.orange : i < 4 ? T.creamDark : T.gray100 }} />
            ))}
          </div>
          <div className="flex justify-between border-t pt-1.5" style={{ borderColor: T.orangeLight }}>
            {days.map((d, i) => (
              <span key={i} className="text-[10px] font-bold" style={{ color: i === 4 ? T.textDark : T.gray400 }}>{d}</span>
            ))}
          </div>
        </div>

        {/* Intervention log */}
        <p className="text-[12px] font-extrabold mb-2" style={{ color: T.textDark, fontFamily: "var(--font-baloo)" }}>AI Intervention Log</p>
        <div className="rounded-2xl overflow-hidden" style={{ background: T.white, border: `1px solid ${T.creamDark}` }}>
          {[
            { bg: "#EDE9FE", color: "#7C3AED", icon: <BookOpen size={17} />, title: "Academic Help",      desc: "Refused direct answers, offered tutoring." },
            { bg: T.blueLight, color: T.blue, icon: <Users size={17} />,     title: "Social Conflict",    desc: "De-escalated argument about a game." },
            { bg: "#DCFCE7", color: "#16A34A", icon: <Brain size={17} />,    title: "Emotional Check-in", desc: "Redirected loneliness language to parent." },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3.5 cursor-pointer hover:bg-orange-50 transition-colors duration-75"
              style={{ borderBottom: i < 2 ? `1px solid ${T.orangeLight}` : undefined }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: item.bg, color: item.color }}>
                {item.icon}
              </div>
              <div className="flex-1">
                <p className="text-[12px] font-bold" style={{ color: T.textDark, fontFamily: "var(--font-baloo)" }}>{item.title}</p>
                <p className="text-[11px]" style={{ color: T.gray400 }}>{item.desc}</p>
              </div>
              <ChevronRight size={15} color={T.gray400} />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom nav */}
      <div
        className="absolute bottom-0 w-full pb-6 pt-3 px-5 z-30"
        style={{ background: "rgba(255,247,237,0.95)", backdropFilter: "blur(12px)", borderTop: `1px solid ${T.creamDark}` }}
      >
        <div className="flex justify-between">
          {[
            { icon: <Home size={22} />,          label: "Home",     active: true },
            { icon: <TrendingUp size={22} />,     label: "Stats",    active: false },
            { icon: <AlertTriangle size={22} />,  label: "Alerts",   active: false, badge: true },
            { icon: <Settings size={22} />,       label: "Settings", active: false },
          ].map(tab => (
            <div key={tab.label} className="flex flex-col items-center gap-1 relative cursor-pointer">
              {tab.badge && <div className="absolute -top-0.5 right-0 w-2 h-2 rounded-full border-2 border-white" style={{ background: T.red }} />}
              <div style={{ color: tab.active ? T.orange : T.gray400 }}>{tab.icon}</div>
              <span className="text-[9px] font-bold" style={{ color: tab.active ? T.orange : T.gray400, fontFamily: "var(--font-baloo)" }}>
                {tab.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </DeviceShell>
  );
}

// ─── Screen 3 — Child Login ────────────────────────────────────────────────────

function ChildLogin() {
  const [pin, setPin] = useState<number[]>([]);
  const tap = (n: number) => { if (pin.length < 4) setPin(p => [...p, n]); };
  const del = () => setPin(p => p.slice(0, -1));

  return (
    <DeviceShell bg={T.cream}>
      {/* Decorative arcs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-25" style={{ background: T.orange }} />
        <div className="absolute -bottom-10 -left-16 w-48 h-48 rounded-full opacity-20" style={{ background: T.blue }} />
        <div className="absolute top-1/3 -left-12 w-32 h-32 rounded-full opacity-15" style={{ background: T.orange }} />
      </div>

      <StatusBar />

      <div className="flex flex-col items-center justify-center flex-1 px-8 pb-10 relative z-10">
        {/* Avatar */}
        <div
          className="w-24 h-24 rounded-[2rem] flex items-center justify-center mb-7 relative"
          style={{ background: T.orangeLight, border: `3px solid ${T.creamDark}`, boxShadow: `0 8px 24px ${T.orange}33` }}
        >
          <span className="text-4xl" style={{ fontFamily: "var(--font-baloo)" }}>🌳</span>
          {/* Sparkle dots */}
          <div className="absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full" style={{ background: T.orange }} />
          <div className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full" style={{ background: T.blue }} />
        </div>

        <h1
          className="text-[36px] font-extrabold text-center mb-1 leading-tight"
          style={{ color: T.textDark, fontFamily: "var(--font-baloo)" }}
        >
          Hi, Leo!
        </h1>
        <p className="text-[15px] font-semibold text-center mb-10" style={{ color: T.textMuted }}>
          Enter your secret code.
        </p>

        {/* PIN dots */}
        <div className="flex gap-4 mb-10">
          {[0,1,2,3].map(i => (
            <div
              key={i}
              className="w-5 h-5 rounded-full transition-all duration-100"
              style={i < pin.length
                ? { background: T.orange, boxShadow: `0 0 10px ${T.orange}88`, transform: "scale(1.15)" }
                : { background: T.creamDark, border: `2px solid ${T.orangeLight}` }
              }
            />
          ))}
        </div>

        {/* Numpad */}
        <div className="grid grid-cols-3 gap-x-7 gap-y-4 w-full max-w-[272px]">
          {[1,2,3,4,5,6,7,8,9].map(n => (
            <button
              key={n}
              onClick={() => tap(n)}
              className="w-[72px] h-[72px] rounded-2xl text-[28px] font-extrabold transition-all duration-75 active:scale-90 cursor-pointer"
              style={{
                background: T.white,
                color: T.textDark,
                border: `2px solid ${T.creamDark}`,
                boxShadow: "0 2px 8px rgba(249,115,22,0.12)",
                fontFamily: "var(--font-baloo)",
              }}
            >
              {n}
            </button>
          ))}
          <div />
          <button
            onClick={() => tap(0)}
            className="w-[72px] h-[72px] rounded-2xl text-[28px] font-extrabold transition-all duration-75 active:scale-90 cursor-pointer"
            style={{ background: T.white, color: T.textDark, border: `2px solid ${T.creamDark}`, boxShadow: "0 2px 8px rgba(249,115,22,0.12)", fontFamily: "var(--font-baloo)" }}
          >
            0
          </button>
          <button
            onClick={del}
            className="w-[72px] h-[72px] rounded-2xl flex items-center justify-center transition-all duration-75 active:scale-90 cursor-pointer"
            style={{ background: "transparent", color: T.textMuted }}
          >
            <Delete size={22} />
          </button>
        </div>
      </div>
    </DeviceShell>
  );
}

// ─── Screen 4 — Child Chatbot ─────────────────────────────────────────────────

function ChildChatbot() {
  const [msgs, setMsgs] = useState<Msg[]>(INIT_CHAT);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, typing]);

  const send = () => {
    const t = input.trim(); if (!t) return;
    setMsgs(m => [...m, { role: "user", text: t }]);
    setInput(""); setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs(m => [...m, { role: "ai", text: "Great question! Let me walk you through it step by step 📚" }]);
    }, 1800);
  };

  return (
    <DeviceShell bg={T.cream}>
      {/* Header */}
      <div style={{ background: T.white, borderBottom: `1px solid ${T.creamDark}` }}>
        <StatusBar />
        <div className="flex items-center justify-between px-4 pb-3 mt-1">
          <button className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer" style={{ background: T.gray100, color: T.textMuted }}>
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </button>

          {/* Treey chip */}
          <div
            className="flex items-center gap-2.5 py-1.5 pl-2 pr-4 rounded-full"
            style={{ background: T.orangeLight, border: `1px solid ${T.creamDark}` }}
          >
            <div className="relative w-9 h-9 rounded-full flex items-center justify-center" style={{ background: T.orange }}>
              <Bot size={18} color={T.white} />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white" style={{ background: T.green }} />
            </div>
            <div>
              <p className="text-[14px] font-extrabold leading-none" style={{ color: T.textDark, fontFamily: "var(--font-baloo)" }}>Treey</p>
              <span className="text-[10px] font-bold" style={{ color: T.orange }}>Online</span>
            </div>
          </div>

          <button className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer" style={{ background: T.gray100, color: T.textMuted }}>
            <Search size={16} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 pt-5 pb-36 flex flex-col gap-3" style={{ scrollbarWidth: "none" }}>
        <div className="flex justify-center mb-1">
          <span
            className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full"
            style={{ background: T.creamDark, color: T.textMuted, fontFamily: "var(--font-baloo)" }}
          >
            Today 2:10 PM
          </span>
        </div>

        {msgs.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start gap-2"} items-end`}>
            {msg.role === "ai" && (
              <div className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center" style={{ background: T.orange }}>
                <Bot size={13} color={T.white} />
              </div>
            )}
            <div
              className="px-4 py-3 rounded-2xl max-w-[80%] text-[13px] leading-relaxed"
              style={msg.role === "user"
                ? { background: T.orange, color: T.white, borderBottomRightRadius: 6, boxShadow: `0 2px 12px ${T.orange}44`, fontFamily: "var(--font-comic)" }
                : { background: T.white, color: T.textDark, borderBottomLeftRadius: 6, boxShadow: "0 2px 10px rgba(0,0,0,0.06)", border: `1px solid ${T.creamDark}`, fontFamily: "var(--font-comic)" }
              }
            >
              {msg.text}
            </div>
          </div>
        ))}

        {typing && (
          <div className="flex justify-start gap-2 items-end">
            <div className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center" style={{ background: T.orange }}>
              <Bot size={13} color={T.white} />
            </div>
            <div
              className="px-4 py-3.5 rounded-2xl flex gap-1.5"
              style={{ background: T.white, border: `1px solid ${T.creamDark}`, boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}
            >
              {[0,1,2].map(d => (
                <div key={d} className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: T.orange, animationDelay: `${d * 0.15}s` }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div
        className="absolute bottom-0 w-full px-4 pb-6 pt-8 z-30"
        style={{ background: `linear-gradient(to top, ${T.cream} 70%, transparent)` }}
      >
        {/* Smart suggestions */}
        <div className="flex gap-2 overflow-x-auto mb-3" style={{ scrollbarWidth: "none" }}>
          {["Give me a hint", "Show me an example", "What does this mean?"].map(s => (
            <button
              key={s}
              onClick={() => setInput(s)}
              className="whitespace-nowrap px-3.5 py-2 rounded-full text-[11px] font-bold shrink-0 cursor-pointer transition-all duration-75 active:scale-95"
              style={{ background: T.white, color: T.orange, border: `1.5px solid ${T.creamDark}`, boxShadow: "0 1px 4px rgba(249,115,22,0.1)", fontFamily: "var(--font-baloo)" }}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Input box */}
        <div
          className="flex items-end gap-2 p-1.5 rounded-3xl"
          style={{ background: T.white, border: `1.5px solid ${T.creamDark}`, boxShadow: "0 4px 16px rgba(249,115,22,0.12)" }}
        >
          <button className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer" style={{ color: T.gray400 }}>
            <Plus size={20} />
          </button>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && send()}
            placeholder="Message Treey..."
            className="flex-1 pb-2.5 pt-3 bg-transparent border-none focus:outline-none text-[13px]"
            style={{ color: T.textDark, fontFamily: "var(--font-comic)" }}
          />
          <button
            onClick={send}
            className="w-9 h-9 rounded-full flex items-center justify-center text-white transition-all duration-75 cursor-pointer active:scale-90"
            style={{ background: input.trim() ? T.orange : T.gray200, boxShadow: input.trim() ? `0 2px 10px ${T.orange}55` : "none" }}
          >
            <SendHorizonal size={16} />
          </button>
        </div>
      </div>
    </DeviceShell>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

type Screen = "parent-onboarding" | "parent-dashboard" | "child-login" | "child-chat";

const TABS: { id: Screen; label: string; who: "parent" | "child" }[] = [
  { id: "parent-onboarding", label: "Parent Setup",      who: "parent" },
  { id: "parent-dashboard",  label: "Parent Dashboard",  who: "parent" },
  { id: "child-login",       label: "Child Login",       who: "child" },
  { id: "child-chat",        label: "Child Chat",        who: "child" },
];

export default function TreehouseV2() {
  const [screen, setScreen] = useState<Screen>("parent-onboarding");

  return (
    <div
      className={`min-h-screen ${baloo.variable} ${comicNeue.variable}`}
      style={{
        background: "#E5E7EB",
        backgroundImage: "radial-gradient(#9CA3AF 1px, transparent 1px)",
        backgroundSize: "24px 24px",
        fontFamily: "var(--font-comic)",
      }}
    >
      {/* Tab bar */}
      <div
        className="sticky top-0 z-50 px-5 py-3 flex items-center gap-2 overflow-x-auto"
        style={{
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: `1px solid ${T.gray200}`,
          scrollbarWidth: "none",
        }}
      >
        <span
          className="text-[11px] font-extrabold uppercase tracking-wider shrink-0 mr-2"
          style={{ color: T.gray400, fontFamily: "var(--font-baloo)" }}
        >
          TreeHouse v2
        </span>
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setScreen(tab.id)}
            className="shrink-0 px-4 py-1.5 rounded-full text-[12px] font-bold transition-all duration-100 cursor-pointer active:scale-95"
            style={screen === tab.id
              ? { background: tab.who === "parent" ? T.blue : T.orange, color: T.white, boxShadow: `0 2px 8px ${tab.who === "parent" ? T.blue : T.orange}55`, fontFamily: "var(--font-baloo)" }
              : { background: T.gray100, color: T.gray400, fontFamily: "var(--font-baloo)" }
            }
          >
            {tab.who === "parent" ? "👩 " : "🧒 "}{tab.label}
          </button>
        ))}
      </div>

      {/* Screen label */}
      <div className="text-center py-8">
        <p
          className="text-[10px] font-extrabold uppercase tracking-widest mb-1"
          style={{ color: TABS.find(t => t.id === screen)?.who === "child" ? T.orange : T.blue, fontFamily: "var(--font-baloo)" }}
        >
          {TABS.find(t => t.id === screen)?.who === "parent" ? "Parent Experience" : "Child Experience"}
        </p>
        <h2
          className="text-[20px] font-extrabold"
          style={{ color: T.textDark, fontFamily: "var(--font-baloo)" }}
        >
          {TABS.find(t => t.id === screen)?.label}
        </h2>
      </div>

      {/* Device */}
      <div className="flex justify-center pb-16">
        {screen === "parent-onboarding" && <ParentOnboarding />}
        {screen === "parent-dashboard"  && <ParentDashboard />}
        {screen === "child-login"       && <ChildLogin />}
        {screen === "child-chat"        && <ChildChatbot />}
      </div>
    </div>
  );
}
