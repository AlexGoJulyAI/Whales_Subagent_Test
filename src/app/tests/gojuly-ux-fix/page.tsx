// src/app/tests/gojuly-ux-fix/page.tsx
// ——————————————————————————————————————————————————————————————
// CHANGE DELTA — gojuly-ux-fix (surgical)
//   1. Learning page sidebar: ADD "Go to Job Application" <a> button
//      below PRACTICE items — LOCKED label, LOCKED destination URL
//      href="https://app.gojuly.ai/learning/3a0c9d2c-acdf-4696-aa32-f1e72dc79401"
//   2. Home page: AI Red Team TrackCard defaultOpen=false (i===0 only)
//
//   PRESERVATION DECLARATION:
//   All other elements reproduced verbatim from source files:
//     Screen 1 → src/app/tests/gojuly-learning/page.tsx
//     Screen 2 → src/app/tests/gojuly-clone/page.tsx
//   Content not accessible from clone workflow → minimal labeled placeholder.
// ——————————————————————————————————————————————————————————————

"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Home,
  PenTool,
  DollarSign,
  ChevronDown,
  ChevronUp,
  Clock,
  ArrowRight,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────
type Screen = "learning" | "home";
type TrackStatus = "IN PROGRESS" | "NOT STARTED" | "COMPLETED";

interface Track {
  id: string;
  title: string;
  icon: string;
  status?: TrackStatus;
  duration?: string;
  description?: string;
  expandedContent?: React.ReactNode;
}

// ─── Context Banner ───────────────────────────────────────────
// Test utility: switch between screens without back-nav
// Not part of production UI — 2 screens only (matches Change Delta)

function ContextBanner({
  screen,
  onSwitch,
}: {
  screen: Screen;
  onSwitch: (s: Screen) => void;
}) {
  const screens: { id: Screen; label: string }[] = [
    { id: "learning", label: "Learning Page (Screen 1)" },
    { id: "home", label: "Home Page (Screen 2)" },
  ];
  return (
    <div className="bg-[#10204b] text-white text-xs px-4 py-1.5 flex items-center gap-1 flex-wrap">
      <span className="font-semibold mr-2 opacity-70">Test: GoJuly UX Fix</span>
      {screens.map((s) => (
        <button
          key={s.id}
          onClick={() => onSwitch(s.id)}
          className={`px-3 py-0.5 rounded-full transition-colors ${
            screen === s.id
              ? "bg-white text-[#10204b] font-semibold"
              : "opacity-60 hover:opacity-90"
          }`}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SCREEN 1 — Learning Page: Red Teaming - Beginner
// Source: verbatim gojuly-learning/page.tsx
// Change Delta item 1: "Go to Job Application" <a> button in sidebar
// All other elements: verbatim from gojuly-learning/page.tsx
// ═══════════════════════════════════════════════════════════════

// Navbar — verbatim gojuly-learning/page.tsx (no Admin/FE Admin buttons)
const learningNavItems = [
  { label: "Home", icon: Home, active: false },
  { label: "Data Portfolio", icon: PenTool, active: false },
  { label: "Payment", icon: DollarSign, active: false },
];

function LearningNavbar() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between bg-white px-6 py-2 rounded-b-2xl border-2 border-[#dadee7]">
      {/* Left side */}
      <div className="flex items-center">
        {/* Logo */}
        <span className="font-calistoga text-2xl text-[#10204b] mr-8">
          july ai
        </span>

        {/* Nav links */}
        <ul className="hidden lg:flex items-center gap-0 font-inter">
          {learningNavItems.map((item) => (
            <li key={item.label}>
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  item.active
                    ? "text-[#2563eb] font-medium"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        <Image
          src="/images/gojuly/slack-icon.png"
          alt="Slack"
          width={32}
          height={32}
          className="rounded-full"
        />
        <Image
          src="/images/gojuly/profile.png"
          alt="Profile"
          width={32}
          height={32}
          className="rounded-full"
        />
      </div>
    </nav>
  );
}

// SidebarNavItem — verbatim gojuly-learning/page.tsx
function SidebarNavItem({
  label,
  active = false,
}: {
  label: string;
  active?: boolean;
}) {
  return (
    <button
      className={`w-full text-left py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
        active
          ? "text-[#2563eb]"
          : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
      }`}
    >
      {label}
    </button>
  );
}

// Sidebar — verbatim gojuly-learning/page.tsx
// ESTIMATED: sidebar bg #ffffff, borderRight #e5e7eb — not directly observed from clone
function LearningPageSidebar() {
  return (
    <aside
      className="flex flex-col bg-white border-r border-gray-200 overflow-y-auto"
      style={{ width: 240, padding: 16 }}
    >
      {/* LEARN section */}
      <div>
        <p className="text-xs font-semibold uppercase text-gray-500 mb-2">
          LEARN
        </p>
        <SidebarNavItem label="AI Red Teaming Beginner" active={true} />
        <SidebarNavItem label="Concepts" />
        <SidebarNavItem label="Techniques" />
        <SidebarNavItem label="Case Studies" />
      </div>

      {/* PRACTICE section */}
      <div className="mt-4">
        <p className="text-xs font-semibold uppercase text-gray-500 mb-2">
          PRACTICE
        </p>
        <SidebarNavItem label="Requirements" />
        <SidebarNavItem label="Challenge 1" />
        <SidebarNavItem label="Challenge 2" />
        <SidebarNavItem label="Challenge 3" />
      </div>

      {/* Separator */}
      <div className="border-t border-gray-100 mt-4 mb-4" />

      {/* ── CHANGE DELTA ITEM 1 ──────────────────────────────────
          "Go to Job Application" CTA
          href links to real Red Team Sample Submission URL — NOT onClick
          Label LOCKED: "Go to Job Application"
          href LOCKED: https://app.gojuly.ai/learning/3a0c9d2c-acdf-4696-aa32-f1e72dc79401
      ────────────────────────────────────────────────────────── */}
      <a
        href="https://app.gojuly.ai/learning/3a0c9d2c-acdf-4696-aa32-f1e72dc79401"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 w-full h-12 rounded-xl px-6 bg-[#083386] text-white text-sm font-semibold shadow-sm hover:bg-[#0a40a0] transition-colors"
      >
        Go to Job Application
        <ArrowRight className="w-4 h-4" />
      </a>
    </aside>
  );
}

function LearningScreen() {
  return (
    <div className="min-h-screen bg-[#eeeeee] font-inter">
      <LearningNavbar />

      {/* Two-column layout */}
      <div className="flex" style={{ minHeight: "calc(100vh - 52px)" }}>
        {/* Left: Sidebar */}
        <LearningPageSidebar />

        {/* Right: Content area */}
        <main className="flex-1 p-8 bg-[#eeeeee]">
          {/* Lesson title */}
          <h1 className="font-calistoga text-4xl font-normal text-[#1a2847] mb-8">
            AI Red Teaming Beginner
          </h1>

          {/* Content placeholder card */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <p className="text-sm text-gray-500">Lesson content</p>
          </div>
        </main>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SCREEN 2 — Home Page: AI Red Team Accordion Fix
// Source: verbatim gojuly-clone/page.tsx
// Change Delta item 2: defaultOpen={i === 0} only
// All other elements: verbatim from gojuly-clone/page.tsx
// ═══════════════════════════════════════════════════════════════

// Navbar — verbatim gojuly-clone/page.tsx (with Admin/FE Admin buttons, Home active)
const homeNavItems = [
  { label: "Home", icon: Home, active: true },
  { label: "Data Portfolio", icon: PenTool, active: false },
  { label: "Payment", icon: DollarSign, active: false },
];

function HomeNavbar() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between bg-white px-6 py-2 rounded-b-2xl border-2 border-[#dadee7]">
      {/* Left side */}
      <div className="flex items-center">
        {/* Logo */}
        <span className="font-calistoga text-2xl text-[#10204b] mr-8">
          july ai
        </span>

        {/* Nav links */}
        <ul className="hidden lg:flex items-center gap-0 font-inter">
          {homeNavItems.map((item) => (
            <li key={item.label}>
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  item.active
                    ? "text-[#2563eb] font-medium"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        <button className="px-3 h-8 rounded-lg bg-[#e040a0] text-white text-sm font-semibold shadow-sm">
          Admin
        </button>
        <button className="px-3 h-8 rounded-lg bg-[#40b0a0] text-[#0a2030] text-sm font-semibold shadow-sm">
          FE Admin
        </button>
        <Image
          src="/images/gojuly/slack-icon.png"
          alt="Slack"
          width={32}
          height={32}
          className="rounded-full"
        />
        <Image
          src="/images/gojuly/profile.png"
          alt="Profile"
          width={32}
          height={32}
          className="rounded-full"
        />
      </div>
    </nav>
  );
}

// StatusBadge — verbatim gojuly-clone/page.tsx
function StatusBadge({ status }: { status: TrackStatus }) {
  const base = "px-2 py-1 text-[10px] font-semibold rounded uppercase";
  if (status === "COMPLETED") {
    return (
      <span
        className={`${base} bg-[#a2e8a5] text-[#083386]`}
      >
        {status}
      </span>
    );
  }
  return (
    <span
      className={`${base} bg-[#dadee7] text-gray-700`}
    >
      {status}
    </span>
  );
}

// TrackCard — verbatim gojuly-clone/page.tsx (no onDiveIn prop)
function TrackCard({
  track,
  defaultOpen = false,
}: {
  track: Track;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <Image
            src={track.icon}
            alt={`${track.title} icon`}
            width={40}
            height={40}
          />
          <div className="text-left">
            <h2 className="text-xl font-bold text-[#1a2847] mb-1">
              {track.title}
            </h2>
            {(track.status || track.duration) && (
              <div className="flex items-center gap-2">
                {track.status && <StatusBadge status={track.status} />}
                {track.duration && (
                  <span className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    {track.duration}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
        {open ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </button>

      {/* Expanded content */}
      {open && track.expandedContent && (
        <div className="border-t border-gray-100">
          {track.expandedContent}
        </div>
      )}
    </div>
  );
}

// WelcomeContent — verbatim gojuly-clone/page.tsx
function WelcomeContent() {
  return (
    <div className="px-4 pb-4">
      <p className="text-sm text-gray-600 mb-4">
        We are glad you are here to start an exciting journey with us. Start
        here to get familiar with using the platform.
      </p>
      <button className="inline-flex items-center gap-2 px-6 h-12 rounded-xl bg-[#083386] text-white text-sm font-semibold shadow-sm hover:bg-[#0a40a0] transition-colors">
        Onboard
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}

// RedTeamContent — verbatim gojuly-clone/page.tsx (no onDiveIn prop)
function RedTeamContent() {
  const steps = [
    {
      icon: "/images/gojuly/Lightbulb_medium.svg",
      title: "Learn",
      description:
        "Build AI red teaming skills through core concepts, skill checks, and hands-on exercises.",
    },
    {
      icon: "/images/gojuly/SuccessfulAttack_medium.svg",
      title: "Advance",
      description:
        "Progress to real-world scenarios and deeper technical material after a background check and interview.",
    },
    {
      icon: "/images/gojuly/money_medium.svg",
      title: "Get Hired",
      description:
        "Strong performance leads to hiring opportunities for AI red team roles, paying $25\u2013$100 per hour.",
    },
  ];

  return (
    <div className="px-4 pb-4">
      <p className="text-sm text-gray-600 mb-4">
        Learning what red teaming is and apply your knowledge to guide AI
        respond outside its safety guard rails
      </p>

      {/* Green background steps area */}
      <div
        className="relative rounded-lg p-8 bg-cover bg-center w-full"
        style={{
          backgroundImage: "url(/images/gojuly/btn-bg-green.png)",
        }}
      >
        {/* Step cards */}
        <div className="flex items-stretch justify-center gap-6">
          {steps.map((step, i) => (
            <div key={step.title} className="flex items-center gap-0">
              <div className="w-72 bg-white rounded-lg p-6 shadow-sm">
                <div className="flex flex-col items-center text-center h-full">
                  <Image
                    src={step.icon}
                    alt={step.title}
                    width={28}
                    height={28}
                  />
                  <h3 className="font-bold text-base mt-3 mb-2 text-[#1a2847]">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              </div>
              {i < steps.length - 1 && (
                <ArrowRight className="w-5 h-5 text-gray-400 mx-2 shrink-0" />
              )}
            </div>
          ))}
        </div>

        {/* Dive In button */}
        <button className="mt-4 inline-flex items-center gap-2 px-6 h-12 rounded-xl bg-[#083386] text-white text-sm font-semibold shadow-sm hover:bg-[#0a40a0] transition-colors">
          Dive In
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// SampleSubmissionContent — verbatim gojuly-clone/page.tsx
function SampleSubmissionContent() {
  return (
    <div className="px-4 pb-4">
      <div className="flex gap-4">
        <div className="w-[250px] rounded-2xl border-4 border-[#5ccc89] bg-white overflow-hidden flex flex-col">
          <div className="rounded-t-xl overflow-hidden">
            <Image
              src="/images/gojuly/card-bg-blue.png"
              alt="card background"
              width={250}
              height={100}
              className="w-full object-cover"
            />
          </div>
          <div className="p-4 flex flex-col flex-1">
            <div className="font-bold text-sm text-[#1a2847] mb-1">
              Red Team Sample Submission
            </div>
            <StatusBadge status="COMPLETED" />
            <p className="text-xs text-gray-500 mt-3 mb-4">
              Click this to submit your red team samples.
            </p>
            <button className="mt-auto w-full py-2 rounded-full bg-[#083386] text-white text-sm font-semibold hover:bg-[#0a40a0] transition-colors">
              View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Tracks data — verbatim gojuly-clone/page.tsx
const homeTracks: Track[] = [
  {
    id: "welcome",
    title: "Welcome to July AI!",
    icon: "/images/gojuly/TrackWelcome.svg",
    status: "IN PROGRESS",
    duration: "2.5 MINUTES",
    expandedContent: <WelcomeContent />,
  },
  {
    id: "red-team",
    title: "AI Red Team",
    icon: "/images/gojuly/TrackRedTeam.svg",
    status: "IN PROGRESS",
    duration: "2.0 HOURS",
    expandedContent: <RedTeamContent />,
  },
  {
    id: "sample-submission",
    title: "Red Team Sample Submission",
    icon: "/images/gojuly/SampleSubmissionImage.png",
    expandedContent: <SampleSubmissionContent />,
  },
  {
    id: "ai-fundamentals",
    title: "AI Fundamentals",
    icon: "/images/gojuly/TrackAIFundamentals.svg",
    status: "IN PROGRESS",
    duration: "45 MINUTES",
  },
  {
    id: "coding-fundamentals",
    title: "Coding Fundamentals",
    icon: "/images/gojuly/TrackCodingFundamentals.svg",
    status: "NOT STARTED",
    duration: "2.25 HOURS",
  },
  {
    id: "exclusive-events",
    title: "Exclusive Events",
    icon: "/images/gojuly/TrackEventExclusives.svg",
  },
];

function HomeScreen() {
  return (
    <div className="min-h-screen bg-[#eeeeee] font-inter">
      <main className="max-w-[1200px] mx-auto">
        <HomeNavbar />

        <div className="p-8">
          <div className="max-w-6xl mx-auto">
            {/* Greeting */}
            <h1 className="font-calistoga text-4xl text-[#1a2847] mb-8">
              Hey, Alex!
            </h1>

            {/* ── CHANGE DELTA ITEM 2 ─────────────────────────────────
                defaultOpen={i === 0} — only Welcome (index 0) open by default
                AI Red Team is collapsed → Red Team Sample Submission visible
            ─────────────────────────────────────────────────────────── */}
            {homeTracks.map((track, i) => (
              <TrackCard
                key={track.id}
                track={track}
                defaultOpen={i === 0}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PAGE — Combined test route (screens 1 + 2)
// Slug: gojuly-ux-fix
// Registered in src/lib/test-registry.ts
// ═══════════════════════════════════════════════════════════════

export default function GoJulyUxFixPage() {
  const [screen, setScreen] = useState<Screen>("learning");

  return (
    <div>
      {/* Test context banner — not part of production UI */}
      <ContextBanner screen={screen} onSwitch={setScreen} />

      {screen === "learning" && <LearningScreen />}
      {screen === "home" && <HomeScreen />}
    </div>
  );
}
