// src/app/tests/gojuly-ux-v2/page.tsx
// ——————————————————————————————————————————————————————————————
// INTAKE — gojuly_nav_fix_2026_04_10
//   Complexity: surgical (score 4 — 2 component changes, existing design system)
//   Asset completeness: partial (auth-gated pages — 3 user-provided screenshots)
//   Pipeline: standard
//
// CHANGE DELTA (surgical)
//   1. Learning page sidebar: ADD "Go to Job Application" <a> button
//      below PRACTICE items — links to Red Team Sample Submission module
//      href: https://app.gojuly.ai/learning_tracks/89c756f8-0966-40eb-9fe6-048ab7f8b153
//   2. Home page: AI Red Team TrackCard defaultOpen=false
//      (was automatically expanded, pushing Red Team Sample Submission out of frame)
//
//   PRESERVATION DECLARATION:
//   All other elements cloned verbatim from user-provided screenshots.
//   Auth-gated content not visible in screenshots → minimal labeled placeholder.
//
// CONTENT AUTHENTICITY GATE
//   Screen 1 (Submission): confirmed from user screenshot — verbatim strings
//   Screen 2 (Learning):   sidebar structure confirmed from screenshot;
//                          lesson card content confirmed from screenshot (2 cards visible)
//                          additional lesson cards → placeholder
//   Screen 3 (Home):       confirmed from screenshot + gojuly-clone source
//
// DESIGN TOKENS (from docs/research/DESIGN_SYSTEM.md)
//   --ja-primary       #083386   bg-[#083386]       Primary CTA
//   --ja-primary-hover #0a40a0   hover:bg-[#0a40a0] Button hover
//   --ja-deep-sea      #10204b   text-[#10204b]     Logo
//   --ja-heading       #1a2847   text-[#1a2847]     Card titles, page h1
//   --ja-bg            #eeeeee   bg-[#eeeeee]       Page background
//   --ja-border-heavy  #dadee7   border-[#dadee7]   Navbar border
//   --ja-badge-pos     #a2e8a5   bg-[#a2e8a5]       COMPLETED badge
//   --ja-admin-pink    #e040a0   bg-[#e040a0]       Admin button
//   --ja-admin-teal    #40b0a0   bg-[#40b0a0]       FE Admin button
//   --ja-nav-active    #2563eb   text-[#2563eb]     Active nav item
//   font-calistoga: layout.tsx | font-inter: layout.tsx
// ——————————————————————————————————————————————————————————————

"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Home,
  PenTool,
  DollarSign,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Clock,
  ArrowRight,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────
type Screen = "submission-start" | "learning" | "home";
type TrackStatus = "IN PROGRESS" | "NOT STARTED" | "COMPLETED";

interface Track {
  id: string;
  title: string;
  icon: string;
  status?: TrackStatus;
  duration?: string;
  expandedContent?: React.ReactNode;
}

// ─── Context Banner ───────────────────────────────────────────
// Test utility: navigate between the 3 demo screens
// Screen order follows the user journey:
//   Submission Start → Learning (with new Go to Job Application button) → Home (accordion fixed)

function ContextBanner({
  screen,
  onSwitch,
}: {
  screen: Screen;
  onSwitch: (s: Screen) => void;
}) {
  const screens: { id: Screen; label: string }[] = [
    { id: "submission-start", label: "Sample Submission Start (Screen 1)" },
    { id: "learning", label: "Learning Page — Go to Job App (Screen 2)" },
    { id: "home", label: "Home — Accordion Fixed (Screen 3)" },
  ];
  return (
    <div className="bg-[#10204b] text-white text-xs px-4 py-1.5 flex items-center gap-1 flex-wrap">
      <span className="font-semibold mr-2 opacity-70">Test: GoJuly UX Fix v2</span>
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

// ─── Shared Navbar ────────────────────────────────────────────
// All 3 screens share the same navbar visual.
// Admin + FE Admin buttons confirmed from all 3 user-provided screenshots.
// Home nav item active on Home screen only.

const navItems = [
  { label: "Home", icon: Home },
  { label: "Data Portfolio", icon: PenTool },
  { label: "Payment", icon: DollarSign },
];

function Navbar({ homeActive = false }: { homeActive?: boolean }) {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between bg-white px-6 py-2 rounded-b-2xl border-2 border-[#dadee7]">
      {/* Left */}
      <div className="flex items-center">
        <span className="font-calistoga text-2xl text-[#10204b] mr-8">
          july ai
        </span>
        <ul className="hidden lg:flex items-center gap-0 font-inter">
          {navItems.map((item) => {
            const active = homeActive && item.label === "Home";
            return (
              <li key={item.label}>
                <button
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? "text-[#2563eb] font-medium"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Right — Admin + FE Admin confirmed from all screenshots */}
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

// ═══════════════════════════════════════════════════════════════
// SCREEN 1 — Red Team Sample Submission: Entry Page
// Source: user-provided screenshot (Screen 2 in original set)
// This is where the user journey STARTS — "Start Beginner Module" button
// leads to the Learning page (Screen 2).
// ═══════════════════════════════════════════════════════════════

function SubmissionStartScreen() {
  return (
    <div className="min-h-screen bg-[#eeeeee] font-inter">
      <Navbar />
      <main className="flex items-center justify-center min-h-[calc(100vh-52px)] p-8">
        {/* Centered card — confirmed from user screenshot */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 max-w-lg w-full p-10 text-center">
          {/* "If you're new..." — Calistoga, blue (#083386), confirmed from screenshot */}
          <h1 className="font-calistoga text-3xl text-[#083386] mb-1">
            If you&apos;re new...
          </h1>
          {/* "Learn the skills for success." — confirmed from screenshot */}
          <h2 className="font-calistoga text-3xl font-bold text-[#1a2847] mb-5">
            Learn the skills for success.
          </h2>

          {/* Subtitle — confirmed from screenshot */}
          <p className="text-sm text-gray-600 mb-6 leading-relaxed">
            Our beginner module strengthens your application by teaching{" "}
            <strong>red team strategies</strong> and making you{" "}
            <strong>hire-ready</strong>.
          </p>

          {/* Note box — confirmed from screenshot */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-8 text-left">
            <p className="text-xs text-gray-600 leading-relaxed">
              <strong>Note:</strong> Although submissions aren&apos;t compensated,
              your conversations will be considered for our Revenue Share
              Program. If they are commercialized, you&apos;ll receive a share
              of the proceeds. Learn more{" "}
              <span className="text-[#083386] underline cursor-pointer">
                here
              </span>
              .
            </p>
          </div>

          {/* Buttons — side by side, confirmed from screenshot */}
          <div className="grid grid-cols-2 gap-3">
            {/* "Start Beginner Module" — outline style, confirmed from screenshot */}
            <button className="inline-flex items-center gap-2 px-6 h-12 rounded-xl border-2 border-[#083386] text-[#083386] text-sm font-semibold hover:bg-[#083386] hover:text-white transition-colors">
              Start Beginner Module
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* "Skip to Job Application" — filled primary, confirmed from screenshot */}
            <button className="inline-flex items-center gap-2 px-6 h-12 rounded-xl bg-[#083386] text-white text-sm font-semibold shadow-sm hover:bg-[#0a40a0] transition-colors">
              Skip to Job Application
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SCREEN 2 — Learning Page: Red Teaming - Beginner
// Source: user-provided screenshot (Screen 1 in original set)
// CHANGE DELTA ITEM 1: "Go to Job Application" button added to sidebar
// ═══════════════════════════════════════════════════════════════

// Practice sidebar item — circle indicator confirmed from screenshot
function PracticeItem({ label }: { label: string }) {
  return (
    <button className="w-full flex items-center gap-2 text-left py-1.5 px-3 rounded-lg text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50">
      <span className="w-4 h-4 rounded-full border border-gray-300 shrink-0" />
      {label}
    </button>
  );
}

function LearningSidebar() {
  // Sidebar structure — SCREENSHOT-CONFIRMED from user screenshot (original live site):
  // ← back arrow at top
  // "Red Teaming - Beginner" bold title
  // "Learning Material - Beginner →" with right chevron
  // "AI Red Teaming Beginner" with circular icon (blue border) + ChevronDown (active)
  // "Previous Conversations" plain link
  // "▾ PRACTICE" collapsible section header
  // Requirements, Challenge 1–10 with circle indicators
  // [separator]
  // CHANGE DELTA: "Go to Job Application" button
  //
  // NOT PRESENT in screenshot (removed): "LEARN" section header, Concepts, Techniques, Case Studies
  return (
    <aside
      className="flex flex-col bg-white border-r border-gray-200 overflow-y-auto shrink-0"
      style={{ width: 240, padding: 16, minHeight: "calc(100vh - 52px)" }}
    >
      {/* ← Back arrow — SCREENSHOT-CONFIRMED */}
      <button className="flex items-center text-gray-500 hover:text-gray-700 mb-4">
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Module header — SCREENSHOT-CONFIRMED */}
      <div className="mb-4">
        <p className="text-sm font-semibold text-[#1a2847] mb-2">
          Red Teaming - Beginner
        </p>

        {/* "Learning Material - Beginner →" with right chevron — SCREENSHOT-CONFIRMED */}
        <button className="w-full flex items-center justify-between text-left text-xs text-gray-500 hover:text-gray-700 py-1">
          <span>Learning Material - Beginner</span>
          <ChevronRight className="w-3 h-3 shrink-0" />
        </button>

        {/* "AI Red Teaming Beginner" — circular icon (blue border) + down chevron (active) — SCREENSHOT-CONFIRMED */}
        <button className="w-full flex items-center gap-2 text-left py-1.5 text-sm font-medium text-[#2563eb]">
          <span className="w-5 h-5 rounded-full border-2 border-[#2563eb] shrink-0" />
          <span className="flex-1">AI Red Teaming Beginner</span>
          <ChevronDown className="w-3 h-3 shrink-0" />
        </button>

        {/* "Previous Conversations" — SCREENSHOT-CONFIRMED */}
        <button className="w-full text-left text-xs text-gray-500 hover:text-gray-700 py-1 pl-7">
          Previous Conversations
        </button>
      </div>

      {/* ▾ PRACTICE section header — SCREENSHOT-CONFIRMED */}
      <button className="w-full flex items-center gap-1 text-left text-xs font-semibold uppercase text-gray-500 px-3 py-1 mb-1 hover:text-gray-700">
        <ChevronDown className="w-3 h-3" />
        PRACTICE
      </button>

      {/* Requirements + Challenge 1–10 — SCREENSHOT-CONFIRMED */}
      <div className="mb-4">
        <PracticeItem label="Requirements" />
        <PracticeItem label="Challenge 1" />
        <PracticeItem label="Challenge 2" />
        <PracticeItem label="Challenge 3" />
        <PracticeItem label="Challenge 4" />
        <PracticeItem label="Challenge 5" />
        <PracticeItem label="Challenge 6" />
        <PracticeItem label="Challenge 7" />
        <PracticeItem label="Challenge 8" />
        <PracticeItem label="Challenge 9" />
        <PracticeItem label="Challenge 10" />
      </div>

      {/* Separator */}
      <div className="border-t border-gray-100 mt-auto mb-4" />

      {/* ── CHANGE DELTA ITEM 1 ──────────────────────────────────
          "Go to Job Application" button
          href LOCKED: https://app.gojuly.ai/learning_tracks/89c756f8-0966-40eb-9fe6-048ab7f8b153
          Label LOCKED: "Go to Job Application"
      ────────────────────────────────────────────────────────── */}
      <a
        href="https://app.gojuly.ai/learning_tracks/89c756f8-0966-40eb-9fe6-048ab7f8b153"
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

// Lesson card — style from user screenshot:
// - White card with green/teal gradient header containing "july ai" branding
// - Lesson title below header
// - Body text
function LessonCard({
  title,
  body,
  subBody,
}: {
  title: string;
  body: string;
  subBody?: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4 overflow-hidden">
      {/* Header — green gradient approximated from screenshot */}
      <div className="px-6 py-3 bg-gradient-to-r from-[#c8f0d8] to-[#e0f5e9]">
        <span className="font-calistoga text-lg text-[#10204b]">july ai</span>
      </div>
      {/* Content */}
      <div className="p-6">
        <h2 className="font-calistoga text-2xl text-[#1a2847] mb-3">{title}</h2>
        <p className="text-sm text-gray-600 mb-3 leading-relaxed">{body}</p>
        {subBody && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-sm text-gray-600 leading-relaxed">{subBody}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function LearningScreen() {
  return (
    <div className="min-h-screen bg-[#eeeeee] font-inter">
      <Navbar />
      <div className="flex" style={{ minHeight: "calc(100vh - 52px)" }}>
        {/* Left: Sidebar with Change Delta button */}
        <LearningSidebar />

        {/* Right: Content area */}
        <main className="flex-1 p-8 bg-[#eeeeee] overflow-y-auto">
          {/* Lesson page title — confirmed from screenshot sidebar active item */}
          <h1 className="font-calistoga text-4xl font-normal text-[#1a2847] mb-6">
            AI Red Teaming Beginner
          </h1>

          {/* Lesson Card 1 — confirmed from user screenshot (verbatim strings) */}
          <LessonCard
            title="[Refresher] Understanding AI Red Teaming"
            body="Red teaming rigorously tests AI models to uncover vulnerabilities and assess their adherence to established safety guidelines. It's about pushing boundaries to find potential failures."
            subBody="The core challenge in AI development lies in balancing a model's utility (helpfulness) with its safety. This often reveals inherent tensions and trade-offs between the two objectives."
          />

          {/* Lesson Card 2 — title confirmed from screenshot; body not fully visible → placeholder */}
          <LessonCard
            title="Common Causes of Safety Failures"
            body="Lesson content"
          />
        </main>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SCREEN 3 — Home Page
// Source: user-provided screenshot (Screen 3 in original set)
// CHANGE DELTA ITEM 2: AI Red Team TrackCard defaultOpen=false
// (was expanded by default, pushing Red Team Sample Submission out of frame)
// ═══════════════════════════════════════════════════════════════

function StatusBadge({ status }: { status: TrackStatus }) {
  const base = "px-2 py-1 text-[10px] font-semibold rounded uppercase";
  if (status === "COMPLETED") {
    return (
      <span className={`${base} bg-[#a2e8a5] text-[#083386]`}>{status}</span>
    );
  }
  return (
    <span className={`${base} bg-[#dadee7] text-gray-700`}>{status}</span>
  );
}

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
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 cursor-pointer"
        aria-expanded={open}
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

      {/* Instant toggle — NO CSS transition (confirmed from DESIGN_SYSTEM.md) */}
      {open && track.expandedContent && (
        <div className="border-t border-gray-100">
          {track.expandedContent}
        </div>
      )}
    </div>
  );
}

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
      <div
        className="relative rounded-lg p-8 bg-cover bg-center w-full"
        style={{ backgroundImage: "url(/images/gojuly/btn-bg-green.png)" }}
      >
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
        <button className="mt-4 inline-flex items-center gap-2 px-6 h-12 rounded-xl bg-[#083386] text-white text-sm font-semibold shadow-sm hover:bg-[#0a40a0] transition-colors">
          Dive In
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

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

// Track data — confirmed from user screenshot + gojuly-clone source
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
    // ── CHANGE DELTA ITEM 2 ──────────────────────────────────────
    // defaultOpen=false — collapsed by default
    // Previously: automatically expanded → pushed Red Team Sample Submission out of viewport
    // Fix: user can now see Red Team Sample Submission without scrolling
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
        <Navbar homeActive={true} />
        <div className="p-8">
          <div className="max-w-6xl mx-auto">
            {/* Greeting — confirmed from screenshot */}
            <h1 className="font-calistoga text-4xl text-[#1a2847] mb-8">
              Hey, Alex!
            </h1>
            {homeTracks.map((track, i) => (
              <TrackCard
                key={track.id}
                track={track}
                // ── CHANGE DELTA ITEM 2 ──────────────────────────────
                // Only Welcome (index 0) open by default
                // AI Red Team (index 1) is collapsed → Sample Submission visible
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
// PAGE — Net new combined test route (3 screens)
// Slug: gojuly-ux-v2
// Registered in src/lib/test-registry.ts
// Journey: Submission Start → Learning (UX fix 1) → Home (UX fix 2)
// ═══════════════════════════════════════════════════════════════

export default function GoJulyUxV2Page() {
  const [screen, setScreen] = useState<Screen>("submission-start");

  return (
    <div>
      {/* Test context banner — not part of production UI */}
      <ContextBanner screen={screen} onSwitch={setScreen} />

      {screen === "submission-start" && <SubmissionStartScreen />}
      {screen === "learning" && <LearningScreen />}
      {screen === "home" && <HomeScreen />}
    </div>
  );
}
