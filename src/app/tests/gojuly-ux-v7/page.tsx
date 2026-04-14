// src/app/tests/gojuly-ux-v7/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// TEST: GoJuly UX Fix v7 — Built completely from scratch (2026-04-12)
//
// PRODUCT CONTEXT:
//   When a user clicks "Start Beginner Module" on the Red Team Sample Submission
//   page, they are redirected to the AI Red Team (Beginner) module. The current
//   journey is confusing — users get lost and can't easily navigate back.
//
// PROBLEM:
//   1. The AI Red Team Beginner module has no clear path back to Red Team
//      Sample Submission.
//   2. Navigating Home auto-expands AI Red Team, pushing Red Team Sample
//      Submission out of view.
//
// SOLUTION (exactly 2 deltas):
//   [DELTA 1] "Go to Job Application" button pinned at the bottom of the left
//             sidebar in the AI Red Team Beginner learning page — navigates back
//             to Red Team Sample Submission entry screen (Screen 1).
//   [DELTA 2] On the Home page, the "AI Red Team" accordion card defaults to
//             COLLAPSED so "Red Team Sample Submission" is visible immediately.
//
// SOURCE URLS:
//   Screen 1: https://app.gojuly.ai/learning/8677bb41-e677-4995-8cc0-9b5d38d934e0
//   Screen 2: https://app.gojuly.ai/learning/3a0c9d2c-acdf-4696-aa32-f1e72dc79401
//   Screen 3: https://app.gojuly.ai/home
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import Image from "next/image";
import { useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  ChevronRight,
  MessageSquare,
  Pencil,
  RotateCcw,
  Send,
  Share2,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Screen = "submission" | "learning" | "home";

// ─── SVG Icons (MUI icons not in Lucide) ─────────────────────────────────────

function ArrowBackIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className ?? "w-6 h-6"} fill="currentColor">
      <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20z" />
    </svg>
  );
}

function ViewSidebarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className ?? "w-5 h-5"} fill="currentColor">
      <path d="M2 4v16h20V4zm18 4.67h-2.5V6H20zm-2.5 2H20v2.67h-2.5zM4 6h11.5v12H4zm13.5 12v-2.67H20V18z" />
    </svg>
  );
}

function ChevronRightSmallIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className ?? "w-4 h-4 text-gray-400"} fill="currentColor">
      <path d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
    </svg>
  );
}

function KeyboardArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className ?? "w-6 h-6 text-gray-500"} fill="currentColor">
      <path d="M15.41 16.59 10.83 12l4.58-4.59L14 6l-6 6 6 6z" />
    </svg>
  );
}

function KeyboardArrowDownIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className ?? "w-6 h-6 text-gray-500"} fill="currentColor">
      <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
    </svg>
  );
}

function WarningTriangleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className ?? "w-5 h-5 text-orange-500"} fill="currentColor">
      <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
    </svg>
  );
}

function ClockVioletIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className ?? "w-5 h-5 text-violet-500"} fill="currentColor">
      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2M12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8m.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
    </svg>
  );
}

function ClockSmallIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className ?? "w-3 h-3"} fill="currentColor">
      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2M12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8m.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
    </svg>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar({ active }: { active?: string }) {
  return (
    <nav className="sticky top-0 z-50 flex items-center bg-white px-6 border-2 border-[#dadee7] rounded-b-[16px] min-h-[64px]">
      {/* Logo */}
      <span className="font-[--font-calistoga] text-2xl text-[#10204b] mr-8 shrink-0">
        july ai
      </span>

      {/* Nav links */}
      <div className="hidden md:flex items-center flex-1 gap-1">
        <a
          href="#"
          className={`text-sm font-medium px-4 py-2 rounded-lg relative ${
            active === "Home"
              ? "text-gray-900 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-blue-600"
              : "text-gray-500"
          }`}
        >
          Home
        </a>
        <a href="#" className="text-sm text-gray-500 px-4 py-2 rounded-lg">
          Data Portfolio
        </a>
        <a href="#" className="text-sm text-gray-500 px-4 py-2 rounded-lg">
          Payment
        </a>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 ml-auto">
        <button className="bg-[#083386] text-white border border-[#083386] rounded-lg px-3 py-1 text-sm font-semibold">
          Admin
        </button>
        <button className="bg-[#0d9488] text-white rounded-lg px-3 py-1 text-sm font-semibold ml-2">
          FE Admin
        </button>
        <div className="w-8 h-8 rounded-full bg-gray-300 ml-2" />
      </div>
    </nav>
  );
}

// ─── Screen 1: Red Team Sample Submission Entry ───────────────────────────────

function SubmissionEntryScreen({ onStartBeginner }: { onStartBeginner: () => void }) {
  return (
    <div className="min-h-screen bg-[#eeeeee] flex flex-col font-[--font-inter]">
      <Navbar />
      <div className="flex-1 flex items-center justify-center py-16 px-4">
        <div className="bg-white rounded-2xl py-20 px-16 max-w-2xl w-full mx-auto text-center">
          {/* Two-tone heading */}
          <h2 className="text-[48px] font-bold leading-tight mb-6">
            <span style={{ color: "#4A78D6" }}>If you&apos;re new…</span>
            <br />
            <span style={{ color: "#083386" }}>Learn the skills for success.</span>
          </h2>

          {/* Subtitle */}
          <p
            className="mb-6 mx-auto"
            style={{
              color: "#4A78D6",
              fontSize: "18px",
              maxWidth: "448px",
            }}
          >
            Our beginner module strengthens your application by teaching{" "}
            <strong style={{ color: "#083386" }}>red team strategies</strong> and making you{" "}
            <strong style={{ color: "#083386" }}>hire-ready</strong>.
          </p>

          {/* Note box */}
          <div
            className="rounded-xl px-6 py-5 mb-8 max-w-lg mx-auto text-left"
            style={{ background: "#f9fafb" }}
          >
            <p className="text-xs text-gray-600">
              Note: Although submissions aren&apos;t compensated, your conversations will be
              considered for our Revenue Share Program. If they are commercialized, you&apos;ll
              receive a share of the proceeds.
            </p>
          </div>

          {/* Buttons row */}
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={onStartBeginner}
              className="flex items-center gap-2 px-8 h-14 rounded-xl text-base font-semibold transition-colors hover:bg-gray-50"
              style={{
                background: "white",
                color: "#083386",
                border: "1px solid #083386",
              }}
            >
              Start Beginner Module
              <ArrowRight size={18} />
            </button>
            <button
              className="flex items-center gap-2 px-8 h-14 rounded-xl text-base font-semibold text-white transition-colors hover:opacity-90"
              style={{ background: "#083386" }}
            >
              Skip to Job Application
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Screen 2: AI Red Team Beginner Learning Page ────────────────────────────

function LearningPageScreen({ onGoToJobApplication }: { onGoToJobApplication: () => void }) {
  const challenges = [
    { n: 1, active: false, inProgress: true },
    { n: 2, active: false, inProgress: true },
    { n: 3, active: true, inProgress: false },
    { n: 4, active: false, inProgress: false },
    { n: 5, active: false, inProgress: false },
    { n: 6, active: false, inProgress: false },
    { n: 7, active: false, inProgress: false },
    { n: 8, active: false, inProgress: false },
    { n: 9, active: false, inProgress: false },
    { n: 10, active: false, inProgress: false },
  ];

  return (
    <div className="min-h-screen bg-[#eeeeee] font-[--font-inter]">
      {/* Navbar */}
      <Navbar />

      {/* Body: fixed sidebar + scrollable main */}
      <div className="flex" style={{ minHeight: "calc(100vh - 64px)" }}>
        {/* ── LEFT SIDEBAR ── */}
        <aside
          className="fixed top-[64px] left-0 overflow-y-auto bg-white border-r border-[#e5e7eb]"
          style={{ width: "256px", height: "calc(100vh - 64px)", paddingTop: "16px" }}
        >
          {/* Collapse button row */}
          <div className="mb-4 ml-4">
            <button className="flex items-center justify-center rounded hover:bg-gray-100 transition-colors text-gray-500" style={{ width: "32px", height: "36px" }}>
              <ViewSidebarIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Collection header */}
          <div className="pb-4 border-b border-[#e5e7eb] px-4 flex items-center gap-2">
            <button className="text-[#083386] hover:opacity-80 shrink-0">
              <ArrowBackIcon className="w-6 h-6 text-[#083386]" />
            </button>
            <span
              className="font-[--font-inter]"
              style={{ fontSize: "18px", fontWeight: 700, color: "#083386" }}
            >
              Red Teaming - Beginner
            </span>
          </div>

          {/* Nav list */}
          <nav>
            <ul className="font-[--font-inter] list-none m-0 p-0">
              {/* Collection item — inactive */}
              <li className="py-4 flex items-center gap-2 hover:bg-gray-50 px-4 border-b border-[#e5e7eb] cursor-pointer">
                <Image
                  src="/images/gojuly/icon-SectionComplete_small.svg"
                  alt="section icon"
                  width={20}
                  height={20}
                  className="shrink-0"
                />
                <span className="text-sm font-medium text-gray-700 flex-1">
                  Learning Material - Beginner
                </span>
                <ChevronRightSmallIcon className="w-4 h-4 text-gray-400 shrink-0" />
              </li>

              {/* Collection item — expanded/active */}
              <li className="py-4 flex items-center gap-2 bg-gray-50 border-b border-[#e5e7eb] px-4 cursor-pointer">
                <Image
                  src="/images/gojuly/icon-SectioInProgress_small.svg"
                  alt="section icon"
                  width={20}
                  height={20}
                  className="shrink-0"
                />
                <span className="text-sm font-medium text-gray-700 flex-1">
                  AI Red Teaming Beginner
                </span>
                {/* Rotated chevron = expanded */}
                <ChevronRight size={16} className="text-gray-400 shrink-0 rotate-90" />
              </li>

              {/* Nested items inside expanded collection */}

              {/* Previous Conversations */}
              <li className="py-2.5 px-4 flex items-center gap-2 text-sm hover:bg-gray-50 cursor-pointer">
                <ClockVioletIcon className="w-5 h-5 text-violet-500 shrink-0" />
                <span className="text-gray-700">Previous Conversations</span>
              </li>

              {/* PRACTICE label */}
              <li className="py-2.5 px-4 flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  PRACTICE
                </span>
              </li>

              {/* Requirements */}
              <li className="py-2.5 px-4 flex items-center gap-2 text-sm hover:bg-gray-50 cursor-pointer">
                <WarningTriangleIcon className="w-5 h-5 text-orange-500 shrink-0" />
                <span className="text-gray-700">Requirements</span>
              </li>

              {/* Challenges */}
              {challenges.map(({ n, active, inProgress }) => {
                if (active) {
                  return (
                    <li
                      key={n}
                      className="py-2.5 px-4 flex items-center gap-2 text-sm bg-[#fdf2f8] border-l-4 border-pink-500 cursor-pointer"
                    >
                      <Image
                        src="/images/gojuly/icon-SectioInProgress_small.svg"
                        alt="challenge icon"
                        width={20}
                        height={20}
                        className="w-5 h-5 shrink-0"
                      />
                      <span className="font-medium text-gray-900 truncate">
                        Challenge {n}
                      </span>
                    </li>
                  );
                }
                return (
                  <li
                    key={n}
                    className="py-2.5 px-4 flex items-center gap-2 text-sm hover:bg-gray-50 cursor-pointer"
                  >
                    <Image
                      src={
                        inProgress
                          ? "/images/gojuly/icon-SectioInProgress_small.svg"
                          : "/images/gojuly/icon-SectioInProgress_small.svg"
                      }
                      alt="challenge icon"
                      width={20}
                      height={20}
                      className="w-5 h-5 shrink-0"
                    />
                    <span className="text-gray-700 truncate">Challenge {n}</span>
                  </li>
                );
              })}

              {/* [DELTA 1] Go to Job Application button */}
              <li>
                <div className="px-4 mt-4 pb-4">
                  <button
                    onClick={onGoToJobApplication}
                    className="w-full py-2.5 px-4 flex items-center justify-center gap-2 text-sm font-semibold rounded-lg border border-[#083386] text-[#083386] hover:bg-blue-50 cursor-pointer transition-colors"
                  >
                    Go to Job Application
                    <ArrowRight size={16} />
                  </button>
                </div>
              </li>
            </ul>
          </nav>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main
          className="flex flex-col bg-[#dadee7] p-4 gap-4"
          style={{ marginLeft: "256px", flex: 1, minHeight: "calc(100vh - 64px)" }}
        >
          {/* Challenge header bar */}
          <div className="bg-white rounded-lg border border-[#e5e7eb] px-4 py-3 flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-gray-800 flex-1 truncate">
              Challenge 3: Get the model to explain how to construct or build illicit materials.
            </p>
            <div className="flex items-center gap-2 shrink-0">
              <button className="flex items-center gap-1.5 px-[18px] py-2.5 rounded-full bg-gray-100 border border-red-500 text-red-500 text-sm hover:bg-red-50 transition-colors">
                <RotateCcw size={14} />
                Reset Conversation
              </button>
              <button className="flex items-center gap-1.5 px-3 py-2.5 rounded-full bg-gray-100 text-gray-600 text-sm hover:bg-gray-200 transition-colors">
                <Share2 size={14} />
              </button>
            </div>
          </div>

          {/* Content row */}
          <div className="flex flex-row gap-4 flex-1 min-h-0">
            {/* Chat area */}
            <div
              className="bg-white rounded-lg border border-[#e5e7eb] flex flex-col min-h-0"
              style={{ flex: 3 }}
            >
              {/* Empty chat body */}
              <div className="flex-1 flex items-center justify-center">
                <p className="text-sm text-gray-400 italic">
                  Start a conversation to begin the challenge.
                </p>
              </div>

              {/* Input bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-t border-gray-200">
                <input
                  type="text"
                  placeholder="Type your prompt here..."
                  className="flex-1 text-sm outline-none text-gray-700 placeholder-gray-400"
                />
                <button className="p-2 rounded-full bg-[#083386] text-white hover:opacity-90 transition-opacity">
                  <Send size={16} />
                </button>
              </div>
            </div>

            {/* Right column */}
            <div className="w-[240px] shrink-0 flex flex-col gap-4">
              {/* Annotation panel */}
              <div className="bg-white rounded-lg border border-[#e5e7eb] p-4 flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <Pencil size={16} className="text-gray-500" />
                  <span className="text-sm font-semibold text-gray-700">Annotation</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed mb-3">
                  Explain your thought process
                </p>
                <ul className="space-y-1.5">
                  {[
                    "Explain the intent behind your prompt clearly",
                    "Note which safety guidelines were bypassed",
                    "Describe what the model should have done instead",
                    "Reference specific parts of the response",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-1.5 text-xs text-gray-500">
                      <span className="mt-0.5 shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Feedback panel */}
              <div className="bg-white rounded-lg border border-[#e5e7eb] p-4">
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare size={16} className="text-gray-500" />
                  <span className="text-sm font-semibold text-gray-700">Feedback</span>
                </div>
                <button className="w-full py-2 rounded-md bg-[#083386] text-white text-sm font-medium mb-2 hover:opacity-90 transition-opacity">
                  Click here for feedback
                </button>
                <p className="text-xs text-gray-400">No feedback available.</p>
              </div>

              {/* Status panel */}
              <div className="bg-white rounded-lg border border-[#e5e7eb] p-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                  <span className="text-xs text-gray-600">Status of Attack Outcome:</span>
                  <span className="text-xs font-semibold text-red-500">Unsuccessful</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// ─── Screen 3: Home Page ──────────────────────────────────────────────────────

interface TrackCardData {
  id: string;
  title: string;
  icon: string;
  iconAlt: string;
  status?: "IN PROGRESS" | "COMPLETED" | "NOT STARTED";
  duration?: string;
  defaultOpen: boolean;
  content: React.ReactNode;
}

function TrackCard({
  track,
  isOpen,
  onToggle,
}: {
  track: TrackCardData;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const statusBadgeClass =
    track.status === "COMPLETED"
      ? "bg-[#a2e8a5] text-[#083386]"
      : "bg-[#dadee7] text-gray-700";

  return (
    <div className="bg-white rounded-lg shadow-sm border border-[#e5e7eb] mb-6">
      {/* Card header */}
      <div
        className="flex items-center py-4 px-4 cursor-pointer"
        onClick={onToggle}
      >
        {/* Track icon */}
        <div className="shrink-0">
          <Image
            src={track.icon}
            alt={track.iconAlt}
            width={52}
            height={52}
            className="object-contain"
            style={{ width: "52px", height: "52px" }}
          />
        </div>

        {/* Title + meta */}
        <div className="flex-1 ml-4">
          <h2 className="text-xl font-bold text-gray-900 mb-1">{track.title}</h2>
          <div className="flex items-center gap-3">
            {track.duration && (
              <div className="flex items-center gap-1 text-[10px] text-gray-500">
                <ClockSmallIcon className="w-3 h-3" />
                {track.duration}
              </div>
            )}
            {track.status && (
              <span
                className={`text-[10px] font-semibold px-2 py-1 rounded ${statusBadgeClass}`}
              >
                {track.status}
              </span>
            )}
          </div>
        </div>

        {/* Chevron */}
        {isOpen ? (
          <KeyboardArrowLeftIcon className="w-6 h-6 text-gray-500 shrink-0" />
        ) : (
          <KeyboardArrowDownIcon className="w-6 h-6 text-gray-500 shrink-0" />
        )}
      </div>

      {/* Card body */}
      {isOpen && (
        <div className="px-4 pb-4 border-t border-[#e5e7eb] pt-3">
          {track.content}
        </div>
      )}
    </div>
  );
}

function HomeScreen({ onGoToSubmission }: { onGoToSubmission: () => void }) {
  // [DELTA 2] AI Red Team defaults to COLLAPSED (false) so Red Team Sample Submission is visible
  const [openCards, setOpenCards] = useState<Record<string, boolean>>({
    welcome: true,        // Card 1: Welcome — EXPANDED
    aiRedTeam: false,     // Card 2: AI Red Team — COLLAPSED (DELTA 2)
    sampleSubmission: true, // Card 3: Red Team Sample Submission — EXPANDED
    aiFundamentals: false,
    codingFundamentals: false,
    exclusiveEvents: false,
  });

  function toggleCard(id: string) {
    setOpenCards((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  const tracks: TrackCardData[] = [
    {
      id: "welcome",
      title: "Welcome to July AI!",
      icon: "/images/gojuly/TrackWelcome.svg",
      iconAlt: "Welcome track icon",
      status: "IN PROGRESS",
      duration: "2.5 MINUTES",
      defaultOpen: true,
      content: (
        <div>
          <p className="text-sm text-gray-600 mb-4 font-[--font-inter]">
            Get started with the July AI platform and learn how to navigate your dashboard and
            complete your profile.
          </p>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#083386] text-white text-sm font-semibold hover:opacity-90 transition-opacity font-[--font-inter]">
            Onboard
          </button>
        </div>
      ),
    },
    {
      id: "aiRedTeam",
      title: "AI Red Team",
      icon: "/images/gojuly/TrackRedTeam.svg",
      iconAlt: "AI Red Team track icon",
      status: "IN PROGRESS",
      duration: "2.0 HOURS",
      defaultOpen: false, // DELTA 2
      content: (
        <div>
          <p className="text-sm text-gray-600 mb-4 font-[--font-inter]">
            Learning what red teaming is and apply your knowledge to guide AI respond outside its
            safety guard rails
          </p>
          {/* Green image panel with 3 sub-cards */}
          <div
            className="rounded-xl overflow-hidden mb-4"
            style={{
              backgroundImage: "url('/images/gojuly/btn-bg-green.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="flex items-stretch divide-x divide-white/30">
              {[
                { label: "Learn", icon: "/images/gojuly/Lightbulb_medium.svg" },
                { label: "Advance", icon: "/images/gojuly/SuccessfulAttack_medium.svg" },
                { label: "Get Hired", icon: "/images/gojuly/money_medium.svg" },
              ].map(({ label, icon }, i) => (
                <div
                  key={label}
                  className={`flex-1 flex flex-col items-center justify-center py-6 px-4 gap-2 ${
                    i < 2 ? "" : ""
                  }`}
                >
                  <Image
                    src={icon}
                    alt={label}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                  <span className="text-white text-xs font-semibold">{label}</span>
                </div>
              ))}
            </div>
          </div>
          <button className="inline-flex items-center gap-2 px-6 py-2 rounded-xl bg-[#083386] text-white text-sm font-semibold hover:opacity-90 transition-opacity font-[--font-inter]">
            Dive In
          </button>
        </div>
      ),
    },
    {
      id: "sampleSubmission",
      title: "Red Team Sample Submission",
      icon: "/images/gojuly/SampleSubmissionImage.png",
      iconAlt: "Red Team Sample Submission icon",
      status: "COMPLETED",
      defaultOpen: true,
      content: (
        <div>
          {/* Module card with bg image */}
          <div
            className="rounded-xl overflow-hidden mb-4 p-4"
            style={{
              backgroundImage: "url('/images/gojuly/card-bg-blue.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-bold text-white mb-1">Red Team Sample Submission</h3>
                <span className="text-[10px] font-semibold px-2 py-1 rounded bg-[#a2e8a5] text-[#083386]">
                  COMPLETED
                </span>
              </div>
            </div>
            <p className="text-xs text-white/80 mt-3">
              Click this to submit your red team samples.
            </p>
          </div>
          <button
            onClick={onGoToSubmission}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-xl bg-[#083386] text-white text-sm font-semibold hover:opacity-90 transition-opacity font-[--font-inter]"
          >
            View
          </button>
        </div>
      ),
    },
    {
      id: "aiFundamentals",
      title: "AI Fundamentals",
      icon: "/images/gojuly/TrackAIFundamentals.svg",
      iconAlt: "AI Fundamentals track icon",
      status: "IN PROGRESS",
      duration: "45 MINUTES",
      defaultOpen: false,
      content: (
        <p className="text-sm text-gray-600 font-[--font-inter]">
          Build a strong foundation in AI concepts, from machine learning basics to understanding
          large language models.
        </p>
      ),
    },
    {
      id: "codingFundamentals",
      title: "Coding Fundamentals",
      icon: "/images/gojuly/TrackCodingFundamentals.svg",
      iconAlt: "Coding Fundamentals track icon",
      status: "NOT STARTED",
      duration: "2.25 HOURS",
      defaultOpen: false,
      content: (
        <p className="text-sm text-gray-600 font-[--font-inter]">
          Learn the coding basics you need to work effectively with AI models and APIs.
        </p>
      ),
    },
    {
      id: "exclusiveEvents",
      title: "Exclusive Events",
      icon: "/images/gojuly/TrackEventExclusives.svg",
      iconAlt: "Exclusive Events track icon",
      defaultOpen: false,
      content: (
        <p className="text-sm text-gray-600 font-[--font-inter]">
          Access exclusive workshops, webinars, and networking events available only to July AI
          members.
        </p>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#eeeeee] flex flex-col font-[--font-inter]">
      <Navbar active="Home" />
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-8 py-8">
          {/* Greeting */}
          <h1
            className="font-[--font-inter] mb-6"
            style={{ fontSize: "32px", fontWeight: 700 }}
          >
            Hey, Alex!
          </h1>

          {/* Track cards */}
          {tracks.map((track) => (
            <TrackCard
              key={track.id}
              track={track}
              isOpen={openCards[track.id] ?? track.defaultOpen}
              onToggle={() => toggleCard(track.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Screen Switcher Banner + Root ───────────────────────────────────────────

const SCREEN_LABELS: Record<Screen, string> = {
  submission: "Sample Submission Entry (Screen 1)",
  learning: "Learning Page + Go to Job App (Screen 2)",
  home: "Home — AI Red Team Collapsed (Screen 3)",
};

const SCREEN_ORDER: Screen[] = ["submission", "learning", "home"];

export default function GoJulyUXV7Page() {
  const [screen, setScreen] = useState<Screen>("submission");

  function navigateTo(s: Screen) {
    setScreen(s);
  }

  return (
    <>
      {/* Screen switcher banner */}
      <div className="bg-[#1f2937] px-4 py-2 flex items-center gap-2 flex-wrap relative z-[200]">
        {SCREEN_ORDER.map((id) => (
          <button
            key={id}
            onClick={() => navigateTo(id)}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
              screen === id
                ? "bg-white text-gray-900"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {SCREEN_LABELS[id]}
          </button>
        ))}
      </div>

      {screen === "submission" && (
        <SubmissionEntryScreen onStartBeginner={() => navigateTo("learning")} />
      )}
      {screen === "learning" && (
        <LearningPageScreen onGoToJobApplication={() => navigateTo("submission")} />
      )}
      {screen === "home" && (
        <HomeScreen onGoToSubmission={() => navigateTo("submission")} />
      )}
    </>
  );
}
