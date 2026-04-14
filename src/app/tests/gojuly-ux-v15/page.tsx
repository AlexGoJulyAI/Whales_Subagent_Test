// ============================================================
// gojuly-ux-v15 — 2-Screen UX Fix Prototype
// Target: src/app/tests/gojuly-ux-v15/page.tsx
// Source: Live authenticated extraction via Playwright MCP (2026-04-12)
// Priority: P0
// ============================================================
// UPSTREAM HANDOFF VALIDATION: all inputs present
// FONT: Inter — loaded as --font-inter — applied via font-[--font-inter]
// HEADING FONT: Calistoga — applied via font-[--font-calistoga] on greeting
// ZONE FONTS: sidebar: font-[--font-inter] | main: font-[--font-inter] | greeting: font-[--font-calistoga]
// ============================================================

"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";

// ── Shared types ───────────────────────────────────────────
type SetScreen = (s: 1 | 2) => void;

// ── Screen 1: AI Red Teaming Beginner Learning Page ────────

function Screen1Navbar() {
  return (
    <nav className="sticky top-8 z-[9999996] bg-white border-2 border-[#dadee7] rounded-b-[16px] h-16 flex items-center justify-between px-4">
      <div className="flex items-center gap-2">
        {/* Hamburger icon */}
        <button className="p-1">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-[#10204b]">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
          </svg>
        </button>
        {/* Logo */}
        <span className="font-[--font-calistoga] text-[#10204b] text-xl font-normal">july</span>
      </div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-1 text-xs text-gray-500 font-[--font-inter]">
        <span>AI Red Teaming</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
        </svg>
        <span className="text-[#10204b] font-semibold">Red Teaming - Beginner</span>
      </div>
      {/* Right: bell + avatar */}
      <div className="flex items-center gap-3">
        <button className="p-1">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-gray-500">
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
          </svg>
        </button>
        <div className="w-8 h-8 rounded-full bg-[#083386] flex items-center justify-center text-white text-xs font-semibold font-[--font-inter]">
          AL
        </div>
      </div>
    </nav>
  );
}

function Screen1Sidebar({ setScreen }: { setScreen: SetScreen }) {
  return (
    <div className="fixed top-[108px] left-0 w-[256px] h-[calc(100vh-108px)] bg-white border-r border-gray-200 z-10 overflow-y-auto py-4">
      {/* Back arrow + title */}
      <div className="flex items-center gap-2 px-4 py-2 mb-2">
        <button className="p-1">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-[#10204b]">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20z" />
          </svg>
        </button>
        <button className="p-1">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-[#10204b]">
            <path d="M2 4v16h20V4zm18 4.67h-2.5V6H20zm-2.5 2H20v2.67h-2.5zM4 6h11.5v12H4zm13.5 12v-2.67H20V18z" />
          </svg>
        </button>
        <span className="text-sm font-semibold text-[#10204b] font-[--font-inter]">Red Teaming - Beginner</span>
      </div>

      {/* Learn section header */}
      <div className="flex items-center justify-between px-4 py-2">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide font-[--font-inter]">Learn</span>
        <button>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-gray-400">
            <path d="M15.41 16.59 10.83 12l4.58-4.59L14 6l-6 6 6 6z" />
          </svg>
        </button>
      </div>

      {/* AI Red Teaming Beginner — page-level active (subtle pink bg, no border-l) */}
      <div className="flex items-center gap-3 px-4 py-2.5 bg-[rgb(253,242,248)] cursor-pointer">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-gray-500 flex-shrink-0">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
        </svg>
        <span className="text-sm text-[#10204b] font-medium font-[--font-inter]">AI Red Teaming Beginner</span>
      </div>

      {/* Practice section header */}
      <div className="flex items-center justify-between px-4 py-2 mt-2">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide font-[--font-inter]">Practice</span>
        <button>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-gray-400">
            <path d="M15.41 16.59 10.83 12l4.58-4.59L14 6l-6 6 6 6z" />
          </svg>
        </button>
      </div>

      {/* Requirements — warning triangle (orange) */}
      <div className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 cursor-pointer">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgb(249,115,22)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
        <span className="text-sm text-gray-700 font-[--font-inter]">Requirements</span>
      </div>

      {/* Challenge 1 — in-progress */}
      <div className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 cursor-pointer">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
          <circle cx="8" cy="8" r="7" stroke="rgb(92,204,137)" strokeWidth="1.5" />
          <circle cx="8" cy="8" r="3" fill="rgb(92,204,137)" />
        </svg>
        <span className="text-sm text-gray-600 font-[--font-inter]">Challenge 1</span>
      </div>

      {/* Challenge 2 — in-progress */}
      <div className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 cursor-pointer">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
          <circle cx="8" cy="8" r="7" stroke="rgb(92,204,137)" strokeWidth="1.5" />
          <circle cx="8" cy="8" r="3" fill="rgb(92,204,137)" />
        </svg>
        <span className="text-sm text-gray-600 font-[--font-inter]">Challenge 2</span>
      </div>

      {/* Challenge 3 — ACTIVE: bg-pink + border-l-4 border-pink-500 */}
      <div className="relative flex items-center gap-3 px-4 py-2.5 bg-[rgb(253,242,248)] border-l-4 border-[rgb(236,72,153)] cursor-pointer">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
          <circle cx="8" cy="8" r="7" stroke="rgb(218,222,231)" strokeWidth="1.5" />
        </svg>
        <span className="text-sm text-[#10204b] font-medium font-[--font-inter]">Challenge 3</span>
      </div>

      {/* Challenges 4–8 — not-started */}
      {[4, 5, 6, 7, 8].map((n) => (
        <div key={n} className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 cursor-pointer">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
            <circle cx="8" cy="8" r="7" stroke="rgb(218,222,231)" strokeWidth="1.5" />
          </svg>
          <span className="text-sm text-gray-600 font-[--font-inter]">Challenge {n}</span>
        </div>
      ))}

      {/* [DELTA 1] Go to Job Application button */}
      <div className="px-4 py-4 mt-auto border-t border-gray-100">
        <button
          onClick={() => setScreen(2)}
          className="w-full border border-[#083386] bg-white text-[#083386] rounded-xl h-12 px-6 font-semibold text-sm flex items-center justify-center gap-2 font-[--font-inter] transition-[background-color,color] duration-200 ease-out hover:bg-[#083386] hover:text-white focus-visible:outline-2 focus-visible:outline-[#083386] focus-visible:outline-offset-2"
        >
          <span>Go to Job Application</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function Screen1MainContent() {
  return (
    <div className="ml-[256px] flex-1">
      <div className="flex gap-6 p-8">
        {/* Left main column — challenge content */}
        <div className="flex-1 bg-white rounded-lg p-6 shadow-sm">
          <div className="mb-4">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide font-[--font-inter]">
              Challenge 3
            </span>
            <h1 className="text-2xl font-bold text-[#10204b] font-[--font-inter] mt-1">Your Task</h1>
          </div>
          <div className="prose prose-sm max-w-none text-gray-700 font-[--font-inter]">
            <p>
              Based on what you&apos;ve learned about AI red teaming, attempt to manipulate the AI model below to
              respond outside its safety boundaries.
            </p>
            <p className="mt-4">Try to get the AI to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Provide harmful or unsafe information</li>
              <li>Ignore its safety guidelines</li>
              <li>Generate content it normally wouldn&apos;t</li>
            </ul>
          </div>
          {/* Chat interface placeholder */}
          <div className="mt-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="text-sm text-gray-500 font-[--font-inter] text-center py-8">AI Chat Interface</div>
          </div>
        </div>
        {/* Right column — annotations */}
        <div className="w-64 flex-shrink-0">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-[#10204b] font-[--font-inter] mb-3">Hints &amp; Feedback</h3>
            <div className="text-xs text-gray-500 font-[--font-inter]">
              Complete the challenge to receive feedback.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Screen1({ setScreen }: { setScreen: SetScreen }) {
  return (
    <div className="bg-[#eeeeee] min-h-screen pt-8">
      <Screen1Navbar />
      <div className="flex">
        <Screen1Sidebar setScreen={setScreen} />
        <Screen1MainContent />
      </div>
    </div>
  );
}

// ── Screen 2: GoJuly AI Home Page ──────────────────────────

function Screen2Navbar() {
  return (
    <nav className="sticky top-8 z-[9999996] bg-white border-2 border-[#dadee7] rounded-b-[16px] h-16 flex items-center justify-between px-6">
      {/* Left: hamburger + logo */}
      <div className="flex items-center gap-3">
        <button className="p-1">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-[#10204b]">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
          </svg>
        </button>
        <span className="font-[--font-calistoga] text-[#10204b] text-xl font-normal">july</span>
      </div>
      {/* Right: search + notification + avatar */}
      <div className="flex items-center gap-3">
        <button className="p-1">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-gray-500">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
        </button>
        <button className="p-1">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-gray-500">
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
          </svg>
        </button>
        <div className="w-8 h-8 rounded-full bg-[#083386] flex items-center justify-center text-white text-xs font-semibold font-[--font-inter]">
          AL
        </div>
      </div>
    </nav>
  );
}

// Shared chevron for accordion cards
function Chevron({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="text-gray-400 flex-shrink-0 transition-transform duration-200"
      style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
    >
      <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
    </svg>
  );
}

// Clock icon used in card subtitles
function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2M12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8m.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
    </svg>
  );
}

// ── Card 1: Welcome to July AI (always expanded) ──────────
function WelcomeCard() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
      {/* Header — no toggle */}
      <div className="flex items-center gap-4 p-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/gojuly/TrackWelcome.svg"
          alt=""
          width={52}
          height={52}
          className="flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-[#10204b] font-[--font-inter] text-base">Welcome to July AI</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#dadee7] text-[#10204b] font-[--font-inter]">
              IN PROGRESS
            </span>
          </div>
          <div className="flex items-center gap-1 mt-1 text-xs text-gray-500 font-[--font-inter]">
            <ClockIcon />
            <span>2.5 MINUTES</span>
          </div>
          <p className="text-sm text-gray-600 mt-1 font-[--font-inter] line-clamp-2">
            We are glad you are here to start an exciting journey with us. Start here to get familiar with using the
            platform.
          </p>
        </div>
      </div>
      {/* Body — always visible */}
      <div className="border-t border-gray-200">
        <div className="p-5">
          <div
            className="relative rounded-lg p-8 bg-cover bg-center w-full"
            style={{ backgroundImage: "url('/images/gojuly/btn-bg-green.png')" }}
          >
            <button className="bg-[#083386] text-white font-semibold text-sm rounded-xl px-6 h-11 font-[--font-inter] hover:bg-[#072d73] transition-[background-color] duration-200 ease-out focus-visible:outline-2 focus-visible:outline-[#083386] focus-visible:outline-offset-2">
              Onboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Card 2: AI Red Team (DELTA 2 — starts collapsed) ──────
function AIRedTeamCard({
  isOpen,
  onToggle,
}: {
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
      {/* Header */}
      <div className="flex items-center gap-4 p-5 cursor-pointer" onClick={onToggle}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/gojuly/TrackRedTeam.svg"
          alt=""
          width={52}
          height={52}
          className="flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-[#10204b] font-[--font-inter] text-base">AI Red Team</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#dadee7] text-[#10204b] font-[--font-inter]">
              IN PROGRESS
            </span>
          </div>
          <div className="flex items-center gap-1 mt-1 text-xs text-gray-500 font-[--font-inter]">
            <ClockIcon />
            <span>2.0 HOURS</span>
          </div>
          <p className="text-sm text-gray-600 mt-1 font-[--font-inter] line-clamp-2">
            Learning what red teaming is and apply your knowledge to guide AI respond outside its safety guard rails
          </p>
        </div>
        <Chevron isOpen={isOpen} />
      </div>
      {/* Body — toggleable */}
      {isOpen && (
        <div className="border-t border-gray-200">
          <div className="p-5">
            <div
              className="relative rounded-lg p-8 bg-cover bg-center w-full"
              style={{ backgroundImage: "url('/images/gojuly/btn-bg-green.png')" }}
            >
              <button className="bg-[#083386] text-white font-semibold text-sm rounded-xl px-6 h-11 font-[--font-inter] hover:bg-[#072d73] transition-[background-color] duration-200 ease-out focus-visible:outline-2 focus-visible:outline-[#083386] focus-visible:outline-offset-2">
                Dive In
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Card 3: Red Team Sample Submission (always expanded) ──
function RedTeamSampleSubmissionCard() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
      {/* Header */}
      <div className="flex items-center gap-4 p-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/gojuly/SampleSubmissionImage.png"
          alt=""
          width={52}
          height={52}
          className="flex-shrink-0 rounded"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-[#10204b] font-[--font-inter] text-base">
              Red Team Sample Submission
            </span>
          </div>
        </div>
      </div>
      {/* Body — always visible ja-card */}
      <div className="border-t border-gray-200">
        <div className="p-5">
          <div className="border-4 border-[rgb(92,204,137)] rounded-[16px] bg-white overflow-hidden">
            {/* Card figure */}
            <div className="rounded-t-xl relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/gojuly/card-bg-peach.png"
                alt=""
                className="w-full h-[100px] object-cover"
              />
              <div className="absolute top-2 right-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[rgb(162,232,165)] text-[#083386] font-[--font-inter]">
                  COMPLETED
                </span>
              </div>
            </div>
            {/* Card content */}
            <div className="p-4">
              <h3 className="font-semibold text-[#10204b] font-[--font-inter] text-sm">
                Red Team Sample Submission
              </h3>
              <p className="text-xs text-gray-500 font-[--font-inter] mt-1">
                Complete your red team assessment submission
              </p>
              <button className="mt-3 border border-[#083386] text-[#083386] text-xs font-semibold rounded-lg h-9 px-4 font-[--font-inter] hover:bg-[#083386] hover:text-white transition-[background-color,color] duration-200 ease-out focus-visible:outline-2 focus-visible:outline-[#083386] focus-visible:outline-offset-2">
                View
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Card 4: AI Fundamentals (collapsible) ─────────────────
function AIFundamentalsCard({
  isOpen,
  onToggle,
}: {
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="flex items-center gap-4 p-5 cursor-pointer" onClick={onToggle}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/gojuly/TrackAIFundamentals.svg"
          alt=""
          width={52}
          height={52}
          className="flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-[#10204b] font-[--font-inter] text-base">AI Fundamentals</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#dadee7] text-[#10204b] font-[--font-inter]">
              IN PROGRESS
            </span>
          </div>
          <div className="flex items-center gap-1 mt-1 text-xs text-gray-500 font-[--font-inter]">
            <ClockIcon />
            <span>45 MINUTES</span>
          </div>
          <p className="text-sm text-gray-600 mt-1 font-[--font-inter] line-clamp-2">
            Build your foundation in AI concepts and how modern AI systems work.
          </p>
        </div>
        <Chevron isOpen={isOpen} />
      </div>
      {isOpen && (
        <div className="border-t border-gray-200">
          <div className="p-5">
            <div
              className="relative rounded-lg p-8 bg-cover bg-center w-full"
              style={{ backgroundImage: "url('/images/gojuly/btn-bg-green.png')" }}
            >
              <button className="bg-[#083386] text-white font-semibold text-sm rounded-xl px-6 h-11 font-[--font-inter] hover:bg-[#072d73] transition-[background-color] duration-200 ease-out">
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Card 5: Coding Fundamentals (collapsible) ─────────────
function CodingFundamentalsCard({
  isOpen,
  onToggle,
}: {
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="flex items-center gap-4 p-5 cursor-pointer" onClick={onToggle}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/gojuly/TrackCodingFundamentals.svg"
          alt=""
          width={52}
          height={52}
          className="flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-[#10204b] font-[--font-inter] text-base">Coding Fundamentals</span>
            {/* NOT STARTED badge — white bg + border */}
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white border border-[#dadee7] text-[#10204b] font-[--font-inter]">
              NOT STARTED
            </span>
          </div>
          <div className="flex items-center gap-1 mt-1 text-xs text-gray-500 font-[--font-inter]">
            <ClockIcon />
            <span>2.25 HOURS</span>
          </div>
          <p className="text-sm text-gray-600 mt-1 font-[--font-inter] line-clamp-2">
            Learn the basics of programming to help you better understand and work with AI systems.
          </p>
        </div>
        <Chevron isOpen={isOpen} />
      </div>
      {isOpen && (
        <div className="border-t border-gray-200">
          <div className="p-5">
            <div
              className="relative rounded-lg p-8 bg-cover bg-center w-full"
              style={{ backgroundImage: "url('/images/gojuly/btn-bg-green.png')" }}
            >
              <button className="bg-[#083386] text-white font-semibold text-sm rounded-xl px-6 h-11 font-[--font-inter] hover:bg-[#072d73] transition-[background-color] duration-200 ease-out">
                Start
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Card 6: Exclusive Events (collapsible) ────────────────
function ExclusiveEventsCard({
  isOpen,
  onToggle,
}: {
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="flex items-center gap-4 p-5 cursor-pointer" onClick={onToggle}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/gojuly/TrackEventExclusives.svg"
          alt=""
          width={52}
          height={52}
          className="flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-[#10204b] font-[--font-inter] text-base">Exclusive Events</span>
          </div>
          <p className="text-sm text-gray-600 mt-1 font-[--font-inter] line-clamp-2">
            Special events and workshops for our community.
          </p>
        </div>
        <Chevron isOpen={isOpen} />
      </div>
      {isOpen && (
        <div className="border-t border-gray-200">
          <div className="p-5">
            <div
              className="relative rounded-lg p-8 bg-cover bg-center w-full"
              style={{ backgroundImage: "url('/images/gojuly/btn-bg-green.png')" }}
            >
              <button className="bg-[#083386] text-white font-semibold text-sm rounded-xl px-6 h-11 font-[--font-inter] hover:bg-[#072d73] transition-[background-color] duration-200 ease-out">
                Explore
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Screen 2 assembled ────────────────────────────────────
interface Screen2Props {
  aiRedTeamOpen: boolean;
  setAiRedTeamOpen: (v: boolean) => void;
  aiFundamentalsOpen: boolean;
  setAiFundamentalsOpen: (v: boolean) => void;
  codingFundamentalsOpen: boolean;
  setCodingFundamentalsOpen: (v: boolean) => void;
  exclusiveEventsOpen: boolean;
  setExclusiveEventsOpen: (v: boolean) => void;
}

function Screen2({
  aiRedTeamOpen,
  setAiRedTeamOpen,
  aiFundamentalsOpen,
  setAiFundamentalsOpen,
  codingFundamentalsOpen,
  setCodingFundamentalsOpen,
  exclusiveEventsOpen,
  setExclusiveEventsOpen,
}: Screen2Props) {
  return (
    <div className="bg-[#eeeeee] min-h-screen pt-8">
      <Screen2Navbar />
      <div className="max-w-4xl mx-auto px-8 py-8">
        {/* Greeting */}
        <h1 className="font-[--font-calistoga] text-[36px] font-normal text-[#10204b] mb-8">Hey, Alex!</h1>

        {/* Card 1: Welcome — always expanded */}
        <WelcomeCard />

        {/* Card 2: AI Red Team — DELTA 2 starts collapsed */}
        <AIRedTeamCard isOpen={aiRedTeamOpen} onToggle={() => setAiRedTeamOpen(!aiRedTeamOpen)} />

        {/* Card 3: Red Team Sample Submission — always expanded */}
        <RedTeamSampleSubmissionCard />

        {/* Card 4: AI Fundamentals */}
        <AIFundamentalsCard
          isOpen={aiFundamentalsOpen}
          onToggle={() => setAiFundamentalsOpen(!aiFundamentalsOpen)}
        />

        {/* Card 5: Coding Fundamentals */}
        <CodingFundamentalsCard
          isOpen={codingFundamentalsOpen}
          onToggle={() => setCodingFundamentalsOpen(!codingFundamentalsOpen)}
        />

        {/* Card 6: Exclusive Events */}
        <ExclusiveEventsCard
          isOpen={exclusiveEventsOpen}
          onToggle={() => setExclusiveEventsOpen(!exclusiveEventsOpen)}
        />
      </div>
    </div>
  );
}

// ── Root Page ─────────────────────────────────────────────

export default function GoJulyUxV15Page() {
  const [screen, setScreen] = useState<1 | 2>(1);

  // Accordion state — all collapsed by default
  // AI Red Team explicitly false per DELTA 2
  const [aiRedTeamOpen, setAiRedTeamOpen] = useState(false);
  const [aiFundamentalsOpen, setAiFundamentalsOpen] = useState(false);
  const [codingFundamentalsOpen, setCodingFundamentalsOpen] = useState(false);
  const [exclusiveEventsOpen, setExclusiveEventsOpen] = useState(false);

  return (
    <div className="font-[--font-inter]">
      {/* Screen-switcher banner */}
      <div className="fixed top-0 left-0 right-0 z-[9999999] bg-[#083386] text-white flex items-center justify-center gap-4 py-1.5 text-xs">
        <span className="opacity-60">gojuly-ux-v15 |</span>
        <button
          onClick={() => setScreen(1)}
          className={cn(screen === 1 ? "underline font-semibold" : "opacity-70 hover:opacity-100")}
        >
          Screen 1: Learning Page
        </button>
        <span className="opacity-40">|</span>
        <button
          onClick={() => setScreen(2)}
          className={cn(screen === 2 ? "underline font-semibold" : "opacity-70 hover:opacity-100")}
        >
          Screen 2: Home Page
        </button>
      </div>

      {/* Active screen */}
      {screen === 1 && <Screen1 setScreen={setScreen} />}
      {screen === 2 && (
        <Screen2
          aiRedTeamOpen={aiRedTeamOpen}
          setAiRedTeamOpen={setAiRedTeamOpen}
          aiFundamentalsOpen={aiFundamentalsOpen}
          setAiFundamentalsOpen={setAiFundamentalsOpen}
          codingFundamentalsOpen={codingFundamentalsOpen}
          setCodingFundamentalsOpen={setCodingFundamentalsOpen}
          exclusiveEventsOpen={exclusiveEventsOpen}
          setExclusiveEventsOpen={setExclusiveEventsOpen}
        />
      )}
    </div>
  );
}
