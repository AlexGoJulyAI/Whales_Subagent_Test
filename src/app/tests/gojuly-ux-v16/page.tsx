// ============================================================
// gojuly-ux-v16 — 2-Screen UX Fix Prototype
// Target: src/app/tests/gojuly-ux-v16/page.tsx
// Source: Live authenticated extraction via Playwright MCP (2026-04-12)
//         Mockup: docs/research/MOCKUP.md (gojuly-ux-v16)
//         Brief:  docs/research/PROJECT_BRIEF.md (gojuly-ux-v16)
// Priority: P0
// ============================================================
// UPSTREAM HANDOFF VALIDATION: all inputs present
// FONT: Inter — loaded as --font-inter — applied via font-[--font-inter]
// HEADING FONT: Calistoga — applied via font-[--font-calistoga] on logo
// ZONE FONTS: sidebar nav: font-arial on nav ul/items | main content: font-arial | home: font-[--font-inter]
// ============================================================

"use client";

import { useState } from "react";
import Image from "next/image";

// ─────────────────────────────────────────────────────────────────────────────
// SVG ICONS
// ─────────────────────────────────────────────────────────────────────────────

function HamburgerIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
    </svg>
  );
}

function BackArrowIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20z" />
    </svg>
  );
}

function ViewSidebarIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M2 4v16h20V4zm18 4.67h-2.5V6H20zm-2.5 2H20v2.67h-2.5zM4 6h11.5v12H4zm13.5 12v-2.67H20V18z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2M12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8m.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
    </svg>
  );
}

function ArrowForwardIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z" />
    </svg>
  );
}

// In-progress status icon: green circle with dot
function InProgressIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="7" stroke="rgb(92,204,137)" strokeWidth="1.5" />
      <circle cx="8" cy="8" r="3" fill="rgb(92,204,137)" />
    </svg>
  );
}

// Not-started status icon: hollow gray ring
function NotStartedIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="7" stroke="rgb(218,222,231)" strokeWidth="1.5" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SCREEN 1 — LEARNING PAGE (AI Red Teaming Beginner)
// ─────────────────────────────────────────────────────────────────────────────

function Screen1Navbar({ onBack }: { onBack: () => void }) {
  return (
    <nav className="sticky top-8 z-[9999996] bg-white border-2 border-[#dadee7] rounded-b-[16px] h-16 flex items-center px-4 gap-3">
      {/* Left: hamburger + logo */}
      <button
        type="button"
        onClick={onBack}
        className="text-[#10204b] hover:text-gray-600 transition-colors"
        aria-label="Back"
      >
        <BackArrowIcon />
      </button>
      <button type="button" className="text-gray-500 hover:text-gray-700 transition-colors" aria-label="Menu">
        <HamburgerIcon />
      </button>
      <span className="font-[--font-calistoga] text-[#10204b] text-xl select-none">july</span>

      {/* Center breadcrumb */}
      <div className="flex-1 flex items-center justify-center gap-1 text-xs font-[--font-inter] text-gray-500">
        <span className="text-[#10204b] font-medium">AI Red Teaming</span>
        <ChevronRightIcon />
        <span>Red Teaming - Beginner</span>
      </div>

      {/* Right: bell + avatar */}
      <div className="flex items-center gap-3">
        <button type="button" className="text-gray-500 hover:text-gray-700 transition-colors" aria-label="Notifications">
          <BellIcon />
        </button>
        <div className="w-8 h-8 rounded-full bg-[#083386] text-white text-xs font-semibold font-[--font-inter] flex items-center justify-center select-none">
          AL
        </div>
      </div>
    </nav>
  );
}

interface Screen1SidebarProps {
  onGoToJobApplication: () => void;
}

function Screen1Sidebar({ onGoToJobApplication }: Screen1SidebarProps) {
  return (
    <aside className="fixed top-[108px] left-0 w-[256px] h-[calc(100vh-108px)] bg-white border-r border-gray-200 z-10 overflow-y-auto py-4">
      {/* Sidebar header row */}
      <div className="flex items-center gap-2 px-4 pb-3">
        <button type="button" className="text-gray-500 hover:text-gray-700 transition-colors" aria-label="Toggle sidebar">
          <HamburgerIcon />
        </button>
        <button type="button" className="text-gray-500 hover:text-gray-700 transition-colors" aria-label="View layout">
          <ViewSidebarIcon />
        </button>
        <span className="text-sm font-semibold text-[#10204b] font-arial ml-1 truncate">Red Teaming - Beginner</span>
      </div>

      {/* LEARN section */}
      <div className="px-4 pb-1">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide font-[--font-inter]">Learn</p>
      </div>
      <ul className="font-arial">
        {/* AI Red Teaming Beginner — page-level active (bg only, no border-l) */}
        <li>
          <div className="flex items-center gap-3 px-4 py-2.5 h-10 bg-[#fdf2f8] cursor-pointer">
            <span className="text-[#10204b] flex-shrink-0">
              <PlayIcon />
            </span>
            <span className="text-sm text-[#10204b] font-medium truncate">AI Red Teaming Beginner</span>
          </div>
        </li>
      </ul>

      {/* PRACTICE section */}
      <div className="px-4 pt-3 pb-1">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide font-[--font-inter]">Practice</p>
      </div>
      <ul className="font-arial">
        {/* Requirements */}
        <li>
          <div className="flex items-center gap-3 px-4 py-2.5 h-10 cursor-pointer hover:bg-gray-50 transition-colors">
            <span className="flex-shrink-0">
              <WarningIcon />
            </span>
            <span className="text-sm text-gray-600 truncate">Requirements</span>
          </div>
        </li>

        {/* Challenge 1 — in-progress */}
        <li>
          <div className="flex items-center gap-3 px-4 py-2.5 h-10 cursor-pointer hover:bg-gray-50 transition-colors">
            <span className="flex-shrink-0">
              <InProgressIcon />
            </span>
            <span className="text-sm text-gray-600 truncate">Challenge 1</span>
          </div>
        </li>

        {/* Challenge 2 — in-progress */}
        <li>
          <div className="flex items-center gap-3 px-4 py-2.5 h-10 cursor-pointer hover:bg-gray-50 transition-colors">
            <span className="flex-shrink-0">
              <InProgressIcon />
            </span>
            <span className="text-sm text-gray-600 truncate">Challenge 2</span>
          </div>
        </li>

        {/* Challenge 3 — ACTIVE (challenge-level active: bg + border-l-4) */}
        <li>
          <div className="flex items-center gap-3 px-4 py-2.5 h-10 bg-[#fdf2f8] border-l-4 border-[#ec4899] cursor-pointer">
            <span className="flex-shrink-0">
              <NotStartedIcon />
            </span>
            <span className="text-sm text-[#10204b] font-medium truncate">Challenge 3</span>
          </div>
        </li>

        {/* Challenge 4 — not started */}
        <li>
          <div className="flex items-center gap-3 px-4 py-2.5 h-10 cursor-pointer hover:bg-gray-50 transition-colors">
            <span className="flex-shrink-0">
              <NotStartedIcon />
            </span>
            <span className="text-sm text-gray-600 truncate">Challenge 4</span>
          </div>
        </li>

        {/* Challenge 5 — not started */}
        <li>
          <div className="flex items-center gap-3 px-4 py-2.5 h-10 cursor-pointer hover:bg-gray-50 transition-colors">
            <span className="flex-shrink-0">
              <NotStartedIcon />
            </span>
            <span className="text-sm text-gray-600 truncate">Challenge 5</span>
          </div>
        </li>

        {/* Challenge 6 — not started */}
        <li>
          <div className="flex items-center gap-3 px-4 py-2.5 h-10 cursor-pointer hover:bg-gray-50 transition-colors">
            <span className="flex-shrink-0">
              <NotStartedIcon />
            </span>
            <span className="text-sm text-gray-600 truncate">Challenge 6</span>
          </div>
        </li>

        {/* Challenge 7 — not started */}
        <li>
          <div className="flex items-center gap-3 px-4 py-2.5 h-10 cursor-pointer hover:bg-gray-50 transition-colors">
            <span className="flex-shrink-0">
              <NotStartedIcon />
            </span>
            <span className="text-sm text-gray-600 truncate">Challenge 7</span>
          </div>
        </li>

        {/* Challenge 8 — not started */}
        <li>
          <div className="flex items-center gap-3 px-4 py-2.5 h-10 cursor-pointer hover:bg-gray-50 transition-colors">
            <span className="flex-shrink-0">
              <NotStartedIcon />
            </span>
            <span className="text-sm text-gray-600 truncate">Challenge 8</span>
          </div>
        </li>
      </ul>

      {/* DELTA 1 — Go to Job Application button */}
      <div className="px-4 pt-4 pb-4 border-t border-gray-100 mt-2">
        <button
          type="button"
          onClick={onGoToJobApplication}
          className="w-full border border-[#083386] bg-white text-[#083386] rounded-xl h-12 px-6 font-semibold text-sm font-[--font-inter] flex items-center justify-center gap-2 transition-[background-color,color] duration-200 ease-out hover:bg-[#083386] hover:text-white focus-visible:outline-2 focus-visible:outline-[#083386] focus-visible:outline-offset-2"
        >
          Go to Job Application
          <ArrowForwardIcon />
        </button>
      </div>
    </aside>
  );
}

function Screen1MainContent() {
  return (
    <main className="ml-[256px] flex-1 bg-[#dadee7] min-h-screen font-arial">
      <div className="p-6">
        {/* Challenge header */}
        <div className="mb-4">
          <h1 className="text-xl font-semibold text-[#10204b]">Challenge 3</h1>
          <p className="text-sm text-gray-500 mt-1">AI Red Teaming — Red Teaming - Beginner</p>
        </div>

        <div className="flex gap-4">
          {/* Left: Chat/challenge area */}
          <div className="flex-1 bg-white rounded-lg border border-gray-200 shadow-sm min-h-[500px] flex items-center justify-center">
            <div className="text-center text-gray-400">
              <p className="text-sm font-semibold">Challenge Interaction Area</p>
              <p className="text-xs mt-1">Auth-gated content</p>
            </div>
          </div>

          {/* Right: Annotation/feedback panels */}
          <div className="w-64 flex flex-col gap-4">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 min-h-[200px] flex items-center justify-center">
              <div className="text-center text-gray-400">
                <p className="text-xs font-semibold">Annotations Panel</p>
                <p className="text-xs mt-1">Auth-gated content</p>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 min-h-[180px] flex items-center justify-center">
              <div className="text-center text-gray-400">
                <p className="text-xs font-semibold">Feedback Panel</p>
                <p className="text-xs mt-1">Auth-gated content</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function Screen1({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="min-h-screen bg-[#dadee7] flex flex-col">
      <Screen1Navbar onBack={onNavigate} />
      <div className="flex flex-1">
        <Screen1Sidebar onGoToJobApplication={onNavigate} />
        <Screen1MainContent />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SCREEN 2 — HOME PAGE
// ─────────────────────────────────────────────────────────────────────────────

function Screen2Navbar({ onBack }: { onBack: () => void }) {
  return (
    <nav className="sticky top-0 z-[9999996] bg-white border-2 border-[#dadee7] rounded-b-[16px] h-16 flex items-center px-4 gap-3">
      {/* Left: back arrow + hamburger + logo */}
      <button
        type="button"
        onClick={onBack}
        className="text-[#10204b] hover:text-gray-600 transition-colors"
        aria-label="Back"
      >
        <BackArrowIcon />
      </button>
      <button type="button" className="text-gray-500 hover:text-gray-700 transition-colors" aria-label="Menu">
        <HamburgerIcon />
      </button>
      <span className="font-[--font-calistoga] text-[#10204b] text-xl select-none">july</span>

      <div className="flex-1" />

      {/* Right: search + bell + avatar */}
      <div className="flex items-center gap-3">
        <button type="button" className="text-gray-500 hover:text-gray-700 transition-colors" aria-label="Search">
          <SearchIcon />
        </button>
        <button type="button" className="text-gray-500 hover:text-gray-700 transition-colors" aria-label="Notifications">
          <BellIcon />
        </button>
        <div className="w-8 h-8 rounded-full bg-[#083386] text-white text-xs font-semibold font-[--font-inter] flex items-center justify-center select-none">
          AL
        </div>
      </div>
    </nav>
  );
}

// Card body: green panel with background image
function GreenPanel({ buttonLabel }: { buttonLabel: string }) {
  return (
    <div
      className="relative rounded-lg p-8 bg-cover bg-center w-full"
      style={{ backgroundImage: "url('/images/gojuly/btn-bg-green.png')" }}
    >
      <button
        type="button"
        className="bg-[#083386] text-white font-semibold text-sm rounded-xl px-6 h-11 font-[--font-inter] transition-opacity duration-200 hover:opacity-90"
      >
        {buttonLabel}
      </button>
    </div>
  );
}

// Welcome card — always expanded
function WelcomeCard() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="flex items-center gap-4 p-5">
        <Image
          src="/images/gojuly/TrackWelcome.svg"
          alt="Welcome to July AI!"
          width={52}
          height={52}
          className="flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="font-semibold text-[#10204b] text-base font-[--font-inter]">Welcome to July AI!</h2>
            <span className="bg-[#dadee7] text-[#10204b] rounded-full text-xs font-semibold px-2 py-0.5 font-[--font-inter]">
              IN PROGRESS
            </span>
          </div>
          <div className="flex items-center gap-1 mt-0.5">
            <span className="text-gray-500">
              <ClockIcon />
            </span>
            <span className="text-xs text-gray-500 font-[--font-inter]">2.5 MINUTES</span>
          </div>
          <p className="text-sm text-gray-600 mt-1 font-[--font-inter] line-clamp-2">
            We are glad you are here to start an exciting journey with us. Start here to get familiar with using the platform.
          </p>
        </div>
      </div>
      <div className="px-5 pb-5">
        <GreenPanel buttonLabel="Onboard" />
      </div>
    </div>
  );
}

// AI Red Team card — DELTA 2: starts collapsed (isOpen = false)
function AIRedTeamCard() {
  const [aiRedTeamOpen, setAiRedTeamOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
      <button
        type="button"
        onClick={() => setAiRedTeamOpen((prev) => !prev)}
        className="w-full flex items-center gap-4 p-5 text-left"
        aria-expanded={aiRedTeamOpen}
      >
        <Image
          src="/images/gojuly/TrackRedTeam.svg"
          alt="AI Red Team"
          width={52}
          height={52}
          className="flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="font-semibold text-[#10204b] text-base font-[--font-inter]">AI Red Team</h2>
            <span className="bg-[#dadee7] text-[#10204b] rounded-full text-xs font-semibold px-2 py-0.5 font-[--font-inter]">
              IN PROGRESS
            </span>
          </div>
          <div className="flex items-center gap-1 mt-0.5">
            <span className="text-gray-500">
              <ClockIcon />
            </span>
            <span className="text-xs text-gray-500 font-[--font-inter]">2.0 HOURS</span>
          </div>
          <p className="text-sm text-gray-600 mt-1 font-[--font-inter] line-clamp-2">
            Learning what red teaming is and apply your knowledge to guide AI respond outside its safety guard rails
          </p>
        </div>
        <ChevronDownIcon
          className={`flex-shrink-0 text-gray-400 transition-transform duration-200 ${aiRedTeamOpen ? "rotate-180" : "rotate-0"}`}
        />
      </button>
      {aiRedTeamOpen && (
        <div className="px-5 pb-5">
          <GreenPanel buttonLabel="Dive In" />
        </div>
      )}
    </div>
  );
}

// Red Team Sample Submission card — always expanded
function RedTeamSampleSubmissionCard() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="flex items-center gap-4 p-5">
        <Image
          src="/images/gojuly/SampleSubmissionImage.png"
          alt="Red Team Sample Submission"
          width={52}
          height={52}
          className="flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="font-semibold text-[#10204b] text-base font-[--font-inter]">Red Team Sample Submission</h2>
            <span className="bg-[#a2e8a5] text-[#083386] rounded-full text-xs font-semibold px-2 py-0.5 font-[--font-inter]">
              COMPLETED
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-1 font-[--font-inter] line-clamp-2">
            Click this to submit your red team samples.
          </p>
        </div>
      </div>
      <div className="px-5 pb-5">
        <GreenPanel buttonLabel="View" />
      </div>
    </div>
  );
}

// AI Fundamentals card — collapsed
function AIFundamentalsCard() {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center gap-4 p-5 text-left"
        aria-expanded={open}
      >
        <Image
          src="/images/gojuly/TrackAIFundamentals.svg"
          alt="AI Fundamentals"
          width={52}
          height={52}
          className="flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="font-semibold text-[#10204b] text-base font-[--font-inter]">AI Fundamentals</h2>
            <span className="bg-[#dadee7] text-[#10204b] rounded-full text-xs font-semibold px-2 py-0.5 font-[--font-inter]">
              IN PROGRESS
            </span>
          </div>
          <div className="flex items-center gap-1 mt-0.5">
            <span className="text-gray-500">
              <ClockIcon />
            </span>
            <span className="text-xs text-gray-500 font-[--font-inter]">45 MINUTES</span>
          </div>
        </div>
        <ChevronDownIcon
          className={`flex-shrink-0 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`}
        />
      </button>
      {open && (
        <div className="px-5 pb-5">
          <GreenPanel buttonLabel="Dive In" />
        </div>
      )}
    </div>
  );
}

// Coding Fundamentals card — collapsed
function CodingFundamentalsCard() {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center gap-4 p-5 text-left"
        aria-expanded={open}
      >
        <Image
          src="/images/gojuly/TrackCodingFundamentals.svg"
          alt="Coding Fundamentals"
          width={52}
          height={52}
          className="flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="font-semibold text-[#10204b] text-base font-[--font-inter]">Coding Fundamentals</h2>
            <span className="bg-[#dadee7] text-[#374151] rounded-full text-xs font-semibold px-2 py-0.5 font-[--font-inter]">
              NOT STARTED
            </span>
          </div>
          <div className="flex items-center gap-1 mt-0.5">
            <span className="text-gray-500">
              <ClockIcon />
            </span>
            <span className="text-xs text-gray-500 font-[--font-inter]">2.25 HOURS</span>
          </div>
        </div>
        <ChevronDownIcon
          className={`flex-shrink-0 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`}
        />
      </button>
      {open && (
        <div className="px-5 pb-5">
          <GreenPanel buttonLabel="Start" />
        </div>
      )}
    </div>
  );
}

// Exclusive Events card — collapsed
function ExclusiveEventsCard() {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center gap-4 p-5 text-left"
        aria-expanded={open}
      >
        <Image
          src="/images/gojuly/TrackEventExclusives.svg"
          alt="Exclusive Events"
          width={52}
          height={52}
          className="flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h2 className="font-semibold text-[#10204b] text-base font-[--font-inter]">Exclusive Events</h2>
        </div>
        <ChevronDownIcon
          className={`flex-shrink-0 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`}
        />
      </button>
      {open && (
        <div className="px-5 pb-5">
          <GreenPanel buttonLabel="View Events" />
        </div>
      )}
    </div>
  );
}

function Screen2({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-screen bg-[#eeeeee] font-[--font-inter]">
      <Screen2Navbar onBack={onBack} />
      <div className="max-w-[640px] mx-auto px-4 pt-6 pb-12">
        <h1 className="text-[36px] font-bold text-[#10204b] font-[--font-calistoga] mb-6">Hey, Alex!</h1>

        <WelcomeCard />
        <AIRedTeamCard />
        <RedTeamSampleSubmissionCard />
        <AIFundamentalsCard />
        <CodingFundamentalsCard />
        <ExclusiveEventsCard />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT — screen switcher
// ─────────────────────────────────────────────────────────────────────────────

export default function GoJulyUxV16Page() {
  const [currentScreen, setCurrentScreen] = useState<1 | 2>(1);

  return (
    <>
      {currentScreen === 1 && (
        <Screen1 onNavigate={() => setCurrentScreen(2)} />
      )}
      {currentScreen === 2 && (
        <Screen2 onBack={() => setCurrentScreen(1)} />
      )}
    </>
  );
}
