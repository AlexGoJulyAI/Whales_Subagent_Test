"use client";

import { useState } from "react";

// ─── Inline SVG icon components ────────────────────────────────────────────

function IconViewSidebar() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-500" aria-hidden="true">
      <path d="M2 4v16h20V4zm18 4.67h-2.5V6H20zm-2.5 2H20v2.67h-2.5zM4 6h11.5v12H4zm13.5 12v-2.67H20V18z" />
    </svg>
  );
}

function IconBackArrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className ?? "w-6 h-6 text-[#083386]"} aria-hidden="true">
      <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20z" />
    </svg>
  );
}

function IconChevronLeft({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} aria-hidden="true">
      <path d="M15.41 16.59 10.83 12l4.58-4.59L14 6l-6 6 6 6z" />
    </svg>
  );
}

function IconChevronDown({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} aria-hidden="true">
      <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
    </svg>
  );
}

function IconChevronDownLarge() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={24} height={24} aria-hidden="true">
      <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
    </svg>
  );
}

function IconChevronLeftLarge() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={24} height={24} aria-hidden="true">
      <path d="M15.41 16.59 10.83 12l4.58-4.59L14 6l-6 6 6 6z" />
    </svg>
  );
}

function IconClock() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-violet-500" aria-hidden="true">
      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
    </svg>
  );
}

function IconPractice() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-500" aria-hidden="true">
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
    </svg>
  );
}

function IconWarning() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-orange-500" aria-hidden="true">
      <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
    </svg>
  );
}

function IconSend() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
      <path d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z" />
    </svg>
  );
}

function IconShare() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
      <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
    </svg>
  );
}

function IconPencil() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-gray-500" aria-hidden="true">
      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
    </svg>
  );
}

function IconChatBubble() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-gray-500" aria-hidden="true">
      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
    </svg>
  );
}

// Arrow forward (MUI ArrowForwardIcon path — same as live site)
function IconArrowForward({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
    </svg>
  );
}

// ─── Shared Navbar ──────────────────────────────────────────────────────────
// z-[9999996] → below banner z-[9999999] so banner stays visible

function Navbar() {
  // Active tab: transparent bg + 2px blue ::after bottom indicator (from live extraction)
  // Inactive tab: text-gray-600 hover:text-gray-800
  const activeTabCls =
    "relative w-44 px-4 py-2 flex items-center justify-center text-sm transition-colors text-gray-900 font-medium after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600";
  const inactiveTabCls =
    "relative w-44 px-4 py-2 flex items-center justify-center text-sm transition-colors text-gray-600 hover:text-gray-800";

  return (
    <nav
      className="sticky top-8 z-[9999996] bg-white border-2 border-[#dadee7] rounded-b-2xl px-6 flex items-center"
      style={{ height: "76px" }}
    >
      {/* Logo — font-calistoga, single line, deep-sea navy */}
      <span
        className="text-2xl text-[#10204b] mr-8 cursor-default flex-shrink-0"
        style={{ fontFamily: "var(--font-calistoga, 'Calistoga', serif)" }}
      >
        july ai
      </span>

      {/* Nav tabs — single row, all at same y, w-44 each */}
      {/* "Home" is always active (all three screens are within the home context) */}
      <button className={activeTabCls}>Home</button>
      <button className={inactiveTabCls}>Data Portfolio</button>
      <button className={inactiveTabCls}>Payment</button>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Admin — pink (oklch(0.6971 0.329 342.55)) */}
      <button
        className="text-sm font-semibold px-3 h-8 rounded-lg ml-3 border"
        style={{
          background: "oklch(0.6971 0.329 342.55)",
          color: "oklch(0.9871 0.0106 342.55)",
          borderColor: "oklch(0.6971 0.329 342.55)",
        }}
      >
        Admin
      </button>

      {/* FE Admin — teal (oklch(0.7676 0.184 183.61)) */}
      <button
        className="text-sm font-semibold px-3 h-8 rounded-lg ml-3 border"
        style={{
          background: "oklch(0.7676 0.184 183.61)",
          color: "oklch(0.15352 0.0368 183.61)",
          borderColor: "oklch(0.7676 0.184 183.61)",
        }}
      >
        FE Admin
      </button>

      {/* Avatar — w-10 h-10 rounded-full (profile.png) */}
      <div className="w-10 h-10 rounded-full bg-gray-200 ml-3 overflow-hidden flex-shrink-0">
        <img
          src="/images/gojuly/profile.png"
          width={40}
          height={40}
          alt="user avatar"
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      </div>
    </nav>
  );
}

// ─── Screen 1 — Sample Submission Entry ────────────────────────────────────
// Live extraction: bg-white rounded-2xl, max-w-2xl, centered on #eeeeee bg
// H2: "If you're new…" (text-[#4A78D6]) + br + "Learn the skills for" + br + "success." (text-[#083386])
// Para: text-lg text-[#4A78D6], with bold navy "red team strategies" and "hire-ready"
// Note box: bg-gray-50 rounded-xl, Revenue Share content, text-xs text-gray-600
// Buttons: h-14 rounded-[12px] px-8 text-base font-semibold, with ArrowForward icon

function Screen1({ setScreen }: { setScreen: (s: 1 | 2 | 3) => void }) {
  return (
    <div className="min-h-screen bg-[#eeeeee] flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center py-12 px-4">
        {/* Card: exact live class — bg-white rounded-2xl px-8 py-14 md:px-16 md:py-20 max-w-2xl w-full mx-4 text-center */}
        <div className="bg-white rounded-2xl px-8 py-14 max-w-2xl w-full mx-4 text-center">

          {/* H2: text-4xl md:text-5xl font-bold leading-tight mb-6 */}
          <h2 className="text-4xl font-bold leading-tight mb-6">
            <span className="text-[#4A78D6]">If you&apos;re new&hellip;</span>
            <br />
            <span className="text-[#083386]">Learn the skills for<br />success.</span>
          </h2>

          {/* Paragraph: text-lg text-[#4A78D6] mb-6 max-w-lg mx-auto */}
          <p className="text-lg text-[#4A78D6] mb-6 max-w-lg mx-auto">
            Our beginner module strengthens your application by teaching{" "}
            <strong className="text-[#083386]">red team strategies</strong>
            {" "}and making you{" "}
            <strong className="text-[#083386]">hire-ready</strong>.
          </p>

          {/* Note box: bg-gray-50 rounded-xl px-6 py-5 mb-8 max-w-lg mx-auto text-left */}
          <div className="bg-gray-50 rounded-xl px-6 py-5 mb-8 max-w-lg mx-auto text-left">
            <p className="text-xs text-gray-600 leading-loose">
              <strong className="text-gray-700">Note:</strong>
              {" "}Although submissions aren&apos;t compensated, your conversations will be considered for our Revenue Share Program. If they are commercialized, you&apos;ll receive a share of the proceeds. Learn more{" "}
              <span className="text-[#083386] underline cursor-pointer hover:text-[#062a6e]">here</span>.
            </p>
          </div>

          {/* Buttons: flex flex-col sm:flex-row gap-4 justify-center */}
          {/* Start Beginner Module: ja-btn-secondary — white bg, blue text+border, h-14, rounded-[12px] */}
          {/* Skip to Job Application: ja-btn-primary — blue bg, white text, h-14, rounded-[12px] */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="inline-flex items-center justify-center gap-2 bg-white border border-[#083386] text-[#083386] rounded-[12px] h-14 px-8 text-base font-semibold hover:bg-blue-50 cursor-pointer transition-colors"
              onClick={() => setScreen(2)}
            >
              Start Beginner Module
              <IconArrowForward size={20} />
            </button>
            <button
              className="inline-flex items-center justify-center gap-2 bg-[#083386] text-white rounded-[12px] h-14 px-8 text-base font-semibold hover:bg-[#062a6e] cursor-pointer transition-colors"
              onClick={() => setScreen(3)}
            >
              Skip to Job Application
              <IconArrowForward size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Screen 2 — AI Red Team Beginner Learning Page ──────────────────────────
// Sidebar: fixed left-0 top-[108px] (32px banner + 76px navbar) h-[calc(100vh-108px)]
// DELTA 1: "Go to Job Application" button at bottom of sidebar → navigates to Screen 1

function Screen2({ setScreen }: { setScreen: (s: 1 | 2 | 3) => void }) {
  return (
    <div className="min-h-screen bg-[#eeeeee] flex flex-col">
      <Navbar />

      {/* Sidebar — top-[108px] to sit below banner (32px) + navbar (76px) */}
      <aside className="fixed left-0 top-[108px] h-[calc(100vh-108px)] w-64 bg-white border-r border-[#e5e7eb] overflow-y-auto z-10 pt-4">
        {/* Collapse toggle */}
        <div className="mb-4 ml-4 p-1 rounded hover:bg-gray-100 cursor-pointer w-fit">
          <IconViewSidebar />
        </div>

        {/* Collection header */}
        <div className="pb-4 border-b border-[#dadee7] px-4 flex items-center gap-2">
          <button onClick={() => setScreen(1)} className="flex items-center" aria-label="Go back">
            <IconBackArrow />
          </button>
          <span className="font-bold text-[#083386] text-lg">Red Teaming - Beginner</span>
        </div>

        {/* Nav list */}
        <ul className="m-0 p-0 list-none" style={{ fontFamily: "Arial, sans-serif" }}>

          {/* 1. Section group header — Learning Material - Beginner */}
          <li className="py-4 flex items-center gap-2 px-4 border-b border-[#dadee7]">
            <img src="/images/gojuly/icon-SectionComplete_small.svg" width={20} height={20} alt="" />
            <span className="text-sm text-gray-700 flex-1">Learning Material - Beginner</span>
            <IconChevronLeft />
          </li>

          {/* 2. Sub-item — Learning Material - Beginner (completed) */}
          <li className="py-4 flex items-center gap-2 hover:cursor-pointer hover:bg-gray-50 px-4">
            <img src="/images/gojuly/icon-SectionComplete_small.svg" width={20} height={20} alt="" />
            <span className="text-sm text-gray-700 flex-1">Learning Material - Beginner</span>
            <IconChevronLeft />
          </li>

          {/* 3. Section group — Red Teaming Beginner (expanded/active) */}
          <li className="py-4 flex items-center gap-2 hover:cursor-pointer bg-gray-50 border-b border-[#dadee7] px-4">
            <img src="/images/gojuly/icon-SectioInProgress_small.svg" width={20} height={20} alt="" />
            <span className="text-sm text-gray-700 flex-1">Red Teaming Beginner</span>
            <IconChevronDown />
          </li>

          {/* 4. Previous Conversations */}
          <li className="py-2.5 px-4 flex items-center gap-2 hover:cursor-pointer hover:bg-gray-50">
            <IconClock />
            <span className="text-sm text-gray-700">Previous Conversations</span>
          </li>

          {/* 5. PRACTICE label */}
          <li className="py-2.5 px-4 flex items-center gap-2 hover:cursor-pointer hover:bg-gray-50">
            <IconPractice />
            <span className="text-xs font-bold uppercase tracking-wider text-gray-600">PRACTICE</span>
          </li>

          {/* 6. Requirements */}
          <li className="py-2.5 px-4 flex items-center gap-2 hover:cursor-pointer hover:bg-gray-50">
            <IconWarning />
            <span className="text-sm text-gray-700">Requirements</span>
          </li>

          {/* 7. Challenge 1 */}
          <li className="py-2.5 px-4 flex items-center gap-2 hover:cursor-pointer hover:bg-gray-50">
            <img src="/images/gojuly/icon-SectioInProgress_small.svg" width={20} height={20} alt="" />
            <span className="text-sm text-gray-700">Challenge 1</span>
          </li>

          {/* 8. Challenge 2 */}
          <li className="py-2.5 px-4 flex items-center gap-2 hover:cursor-pointer hover:bg-gray-50">
            <img src="/images/gojuly/icon-SectioInProgress_small.svg" width={20} height={20} alt="" />
            <span className="text-sm text-gray-700">Challenge 2</span>
          </li>

          {/* 9. Challenge 3 — ACTIVE STATE (pink bg, left border) */}
          <li className="py-2.5 px-4 flex items-center gap-2 cursor-pointer bg-[#fdf2f8] border-l-4 border-[#ec4899]">
            <img src="/images/gojuly/icon-NotStarted_small.svg" width={20} height={20} alt="" />
            <span className="text-sm text-gray-900 font-medium">Challenge 3</span>
          </li>

          {/* 10. Challenge 4 */}
          <li className="py-2.5 px-4 flex items-center gap-2 hover:cursor-pointer hover:bg-gray-50">
            <img src="/images/gojuly/icon-NotStarted_small.svg" width={20} height={20} alt="" />
            <span className="text-sm text-gray-700">Challenge 4</span>
          </li>

          {/* 11–16. Challenges 5–10 */}
          {[5, 6, 7, 8, 9, 10].map((n) => (
            <li key={n} className="py-2.5 px-4 flex items-center gap-2 hover:cursor-pointer hover:bg-gray-50">
              <img src="/images/gojuly/icon-NotStarted_small.svg" width={20} height={20} alt="" />
              <span className="text-sm text-gray-700">Challenge {n}</span>
            </li>
          ))}
        </ul>

        {/* DELTA 1 — "Go to Job Application" button at bottom of sidebar */}
        {/* Navigates back to the Red Team Sample Submission entry page (Screen 1) */}
        <div className="px-4 mt-4 pb-4">
          <button
            className="w-full py-2.5 px-4 inline-flex items-center justify-center gap-2 text-sm font-semibold rounded-lg border border-[#083386] text-[#083386] hover:bg-blue-50 cursor-pointer transition-colors"
            onClick={() => setScreen(1)}
          >
            <span>Go to Job Application</span>
            <IconArrowForward size={16} />
          </button>
        </div>
      </aside>

      {/* Main content — ml-64 to clear sidebar */}
      <main className="ml-64 flex-1 flex flex-col bg-[#eeeeee] min-h-screen p-4 gap-4">
        {/* Challenge title bar */}
        <div className="bg-white rounded-lg border border-[#e5e7eb] p-3 px-4 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-800">
            Challenge 3: Get the model to explain how to perform a harmful action without it being flagged as harmful
          </span>
          <button className="border border-red-500 text-red-500 rounded-full px-3 py-1 text-xs hover:bg-red-50 cursor-pointer flex items-center gap-1">
            Reset
            <IconShare />
          </button>
        </div>

        {/* Main panels row */}
        <div className="flex flex-1 gap-4">
          {/* Left chat panel */}
          <div className="flex-[3] bg-white rounded-lg border border-[#e5e7eb] min-h-[500px] flex flex-col">
            <div className="px-4 py-3 border-b border-[#e5e7eb] text-sm font-medium text-gray-700">
              AI Assistant
            </div>
            <div className="flex-1 p-4 flex items-center justify-center text-sm text-gray-400">
              Chat conversation area
            </div>
            <div className="border-t border-[#e5e7eb] px-4 py-3 flex items-center gap-2">
              <input
                type="text"
                className="flex-1 border border-[#e5e7eb] rounded-lg px-3 py-2 text-sm placeholder-gray-400 outline-none"
                placeholder="Type your prompt here..."
              />
              <button className="bg-[#083386] text-white rounded-lg p-2 hover:bg-[#062a6e] cursor-pointer transition-colors">
                <IconSend />
              </button>
            </div>
          </div>

          {/* Right column */}
          <div className="w-60 flex flex-col gap-4">
            {/* Annotation panel */}
            <div className="bg-white rounded-lg border border-[#e5e7eb] p-4">
              <div className="flex items-center gap-2 mb-2">
                <IconPencil />
                <span className="text-sm font-medium text-gray-700">Annotation</span>
              </div>
              <p className="text-xs text-gray-400">
                Explain your thought process and approach here...
              </p>
            </div>
            {/* Feedback panel */}
            <div className="bg-white rounded-lg border border-[#e5e7eb] p-4">
              <div className="flex items-center gap-2 mb-2">
                <IconChatBubble />
                <span className="text-sm font-medium text-gray-700">Feedback</span>
              </div>
              <p className="text-xs text-gray-400">
                Click here for live coaching feedback
              </p>
            </div>
            {/* Status panel */}
            <div className="bg-white rounded-lg border border-[#e5e7eb] p-4">
              <p className="text-xs text-gray-600 mb-2">Status of Attack Outcome:</p>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
                <span className="text-sm font-medium text-gray-700">Unsuccessful</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// ─── Screen 3 — GoJuly Home Page ────────────────────────────────────────────
// DELTA 2: AI Red Team accordion is collapsed by default (defaultOpen={false})
// so that "Red Team Sample Submission" card is visible on first load.
// Layout: full-width content (no max-w-3xl), px-8 py-6 to match live site.

interface TrackCardProps {
  icon: React.ReactNode;
  title: string;
  duration?: string;
  badge?: { label: string; className: string };
  defaultOpen: boolean;
}

function TrackCard({ icon, title, duration, badge, defaultOpen }: TrackCardProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="bg-white rounded-lg border border-[#e5e7eb] shadow-sm mb-4">
      <div
        className="py-4 px-4 flex items-center gap-3 cursor-pointer select-none"
        onClick={() => setOpen(!open)}
      >
        {icon}
        <span className="text-xl font-bold text-gray-900 flex-1">{title}</span>
        {duration && (
          <span className="text-xs text-gray-500 mr-2">{duration}</span>
        )}
        {badge && (
          <span className={`text-xs font-semibold px-2 py-1 rounded mr-2 ${badge.className}`}>
            {badge.label}
          </span>
        )}
        {open ? <IconChevronLeftLarge /> : <IconChevronDownLarge />}
      </div>
      {open && (
        <div className="px-4 pb-4 text-sm text-gray-500">
          Module content&hellip;
        </div>
      )}
    </div>
  );
}

function Screen3({ setScreen: _setScreen }: { setScreen: (s: 1 | 2 | 3) => void }) {
  return (
    <div className="min-h-screen bg-[#eeeeee] flex flex-col">
      <Navbar />
      {/* Full-width main — no max-w-3xl constraint (live site cards span full content area) */}
      <main className="flex-1 px-8 py-6">

        {/* Card 1 — Welcome to July AI! (EXPANDED by default) */}
        <TrackCard
          icon={<img src="/images/gojuly/TrackWelcome.svg" width={52} height={52} alt="" />}
          title="Welcome to July AI!"
          duration="2.5 MIN"
          badge={{ label: "IN PROGRESS", className: "bg-[#dadee7] text-[#374151]" }}
          defaultOpen={true}
        />

        {/* Card 2 — AI Red Team (COLLAPSED by default — DELTA 2) */}
        {/* Delta 2: collapsed so Red Team Sample Submission is visible on home load */}
        <TrackCard
          icon={<img src="/images/gojuly/TrackRedTeam.svg" width={52} height={52} alt="" />}
          title="AI Red Team"
          duration="2.0 HOURS"
          badge={{ label: "IN PROGRESS", className: "bg-[#dadee7] text-[#374151]" }}
          defaultOpen={false}
        />

        {/* Card 3 — Red Team Sample Submission (EXPANDED by default — visible because AI Red Team is collapsed) */}
        <TrackCard
          icon={<img src="/images/gojuly/SampleSubmissionImage.png" width={52} height={52} alt="" />}
          title="Red Team Sample Submission"
          badge={{ label: "COMPLETED", className: "bg-[#a2e8a5] text-[#083386]" }}
          defaultOpen={true}
        />

        {/* Card 4 — AI Fundamentals */}
        <TrackCard
          icon={<img src="/images/gojuly/TrackAIFundamentals.svg" width={52} height={52} alt="" />}
          title="AI Fundamentals"
          duration="45 MINUTES"
          badge={{ label: "IN PROGRESS", className: "bg-[#dadee7] text-[#374151]" }}
          defaultOpen={false}
        />

        {/* Card 5 — Coding Fundamentals */}
        <TrackCard
          icon={<img src="/images/gojuly/TrackCodingFundamentals.svg" width={52} height={52} alt="" />}
          title="Coding Fundamentals"
          duration="2.25 HOURS"
          badge={{ label: "NOT STARTED", className: "bg-[#dadee7] text-[#374151]" }}
          defaultOpen={false}
        />

        {/* Card 6 — Exclusive Events */}
        <TrackCard
          icon={<img src="/images/gojuly/TrackEventExclusives.svg" width={52} height={52} alt="" />}
          title="Exclusive Events"
          defaultOpen={false}
        />
      </main>
    </div>
  );
}

// ─── Root export ─────────────────────────────────────────────────────────────

export default function GojulyUXV9() {
  const [screen, setScreen] = useState<1 | 2 | 3>(1);

  return (
    // pt-8 creates space for the fixed banner (≈32px) above the sticky navbar
    <div className="font-[--font-inter] pt-8">

      {/* Screen switcher banner — fixed top-0, z-[9999999] (above navbar z-[9999996]) */}
      <div className="fixed top-0 left-0 right-0 bg-[#083386] text-white z-[9999999] flex items-center justify-center gap-4 py-1.5 text-xs">
        <span className="font-semibold">gojuly-ux-v9 — Screen:</span>
        {([1, 2, 3] as const).map((s) => (
          <button
            key={s}
            onClick={() => setScreen(s)}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
              screen === s ? "bg-white text-[#083386]" : "text-white/70 hover:text-white"
            }`}
          >
            {s === 1 ? "1: Sample Submission" : s === 2 ? "2: Learning Page" : "3: Home"}
          </button>
        ))}
      </div>

      {/* Screens */}
      {screen === 1 && <Screen1 setScreen={setScreen} />}
      {screen === 2 && <Screen2 setScreen={setScreen} />}
      {screen === 3 && <Screen3 setScreen={setScreen} />}
    </div>
  );
}
