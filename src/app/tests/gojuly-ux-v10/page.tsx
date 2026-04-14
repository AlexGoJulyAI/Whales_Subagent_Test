"use client";

import { useState } from "react";

// ─── Icon components (from live site SVG paths) ─────────────────────────────

function IconHome() {
  return (
    <svg className="mr-2" width={20} height={20} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="m12 5.69 5 4.5V18h-2v-6H9v6H7v-7.81zM12 3 2 12h3v8h6v-6h2v6h6v-8h3z" />
    </svg>
  );
}

function IconBrush() {
  return (
    <svg className="mr-2" width={20} height={20} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M7 16c.55 0 1 .45 1 1 0 1.1-.9 2-2 2-.17 0-.33-.02-.5-.05.31-.55.5-1.21.5-1.95 0-.55.45-1 1-1M18.67 3c-.26 0-.51.1-.71.29L9 12.25 11.75 15l8.96-8.96c.39-.39.39-1.02 0-1.41l-1.34-1.34c-.2-.2-.45-.29-.7-.29M7 14c-1.66 0-3 1.34-3 3 0 1.31-1.16 2-2 2 .92 1.22 2.49 2 4 2 2.21 0 4-1.79 4-4 0-1.66-1.34-3-3-3" />
    </svg>
  );
}

function IconMoney() {
  return (
    <svg className="mr-2" width={20} height={20} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4" />
    </svg>
  );
}

function IconChevronLeft() {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M15.41 16.59 10.83 12l4.58-4.59L14 6l-6 6 6 6z" />
    </svg>
  );
}

function IconChevronDown() {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
    </svg>
  );
}

function IconArrowRight() {
  return (
    <svg className="ml-2" width={20} height={20} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z" />
    </svg>
  );
}

function IconArrowForward() {
  return (
    <svg width={28} height={28} viewBox="0 0 24 24" fill="currentColor" className="text-gray-700" aria-hidden="true">
      <path d="m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
    </svg>
  );
}

function IconClock() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2M12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8m.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
    </svg>
  );
}

// ─── Navbar ─────────────────────────────────────────────────────────────────

function Navbar() {
  const activeTab =
    "relative flex items-center justify-center w-44 px-4 py-2 text-sm font-medium text-gray-900 transition-colors after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600 cursor-pointer";
  const inactiveTab =
    "relative flex items-center justify-center w-44 px-4 py-2 text-sm font-normal text-gray-600 hover:text-gray-800 transition-colors cursor-pointer";

  return (
    <nav
      className="sticky top-0 bg-white w-full flex items-center px-6"
      style={{
        height: "76px",
        border: "2px solid rgb(218, 222, 231)",
        borderRadius: "0 0 16px 16px",
        zIndex: 2147483647,
      }}
    >
      {/* Logo */}
      <a
        href="#"
        className="no-underline text-2xl mr-8 flex-shrink-0"
        style={{
          fontFamily: "var(--font-calistoga, 'Calistoga', serif)",
          color: "rgb(16, 32, 75)",
        }}
      >
        july ai
      </a>

      {/* Nav tabs */}
      <button className={activeTab}>
        <IconHome />
        Home
      </button>
      <button className={inactiveTab}>
        <IconBrush />
        Data Portfolio
      </button>
      <button className={inactiveTab}>
        <IconMoney />
        Payment
      </button>

      <div className="flex-1" />

      {/* Admin button — pink/salmon */}
      <button
        className="text-sm font-semibold px-3 rounded-lg ml-3"
        style={{
          height: "32px",
          background: "oklch(0.6971 0.329 342.55)",
          color: "oklch(0.9871 0.0106 342.55)",
          borderRadius: "8px",
          border: "none",
        }}
      >
        Admin
      </button>

      {/* FE Admin button — teal */}
      <button
        className="text-sm font-semibold px-3 rounded-lg ml-3"
        style={{
          height: "32px",
          background: "oklch(0.7676 0.184 183.61)",
          color: "oklch(0.15352 0.0368 183.61)",
          borderRadius: "8px",
          border: "none",
        }}
      >
        FE Admin
      </button>

      {/* Slack icon */}
      <span className="ml-3 cursor-pointer">
        <img src="/images/gojuly/slack-icon.png" alt="Slack" className="h-8 w-auto" />
      </span>

      {/* Profile avatar */}
      <div className="ml-3 w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
        <img
          src="/images/gojuly/profile.png"
          alt="User avatar"
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      </div>
    </nav>
  );
}

// ─── Badge variants ──────────────────────────────────────────────────────────

type BadgeState = "in-progress" | "not-started" | "completed";

function StatusBadge({ state }: { state: BadgeState }) {
  if (state === "completed") {
    return (
      <span
        className="px-2 py-1 text-[10px] font-semibold"
        style={{
          backgroundColor: "rgb(162, 232, 165)",
          color: "rgb(8, 51, 134)",
          borderRadius: "6px",
        }}
      >
        COMPLETED
      </span>
    );
  }
  if (state === "not-started") {
    return (
      <span
        className="px-2 py-1 text-[10px] font-semibold"
        style={{
          backgroundColor: "rgb(218, 222, 231)",
          color: "rgb(55, 65, 81)",
          borderRadius: "4px",
        }}
      >
        NOT STARTED
      </span>
    );
  }
  // in-progress
  return (
    <span
      className="px-2 py-1 text-[10px] font-semibold"
      style={{
        backgroundColor: "rgb(218, 222, 231)",
        color: "rgb(55, 65, 81)",
        borderRadius: "4px",
      }}
    >
      IN PROGRESS
    </span>
  );
}

// ─── Primary button ──────────────────────────────────────────────────────────

function PrimaryBtn({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center font-semibold cursor-pointer transition-colors hover:opacity-90"
      style={{
        backgroundColor: "rgb(8, 51, 134)",
        color: "rgb(255, 255, 255)",
        borderRadius: "12px",
        padding: "0 24px",
        fontSize: "14px",
        fontWeight: 600,
        height: "48px",
        border: "none",
      }}
    >
      {children}
    </button>
  );
}

// ─── Track card (accordion) ──────────────────────────────────────────────────

interface TrackCardProps {
  icon: string;
  iconAlt: string;
  title: string;
  badgeState?: BadgeState;
  duration?: string;
  defaultOpen?: boolean;
  children?: React.ReactNode;
}

function TrackCard({
  icon,
  iconAlt,
  title,
  badgeState,
  duration,
  defaultOpen = false,
  children,
}: TrackCardProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      className="bg-white rounded-lg mb-6"
      style={{
        boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)",
        border: "1px solid rgb(229, 231, 235)",
      }}
    >
      {/* Header row */}
      <div
        className="flex items-center justify-between py-4 px-4 cursor-pointer"
        onClick={() => children && setOpen((o) => !o)}
      >
        <div className="flex items-center gap-4 flex-1">
          <img
            src={icon}
            alt={iconAlt}
            className="shrink-0 object-contain"
            style={{ width: "52px", height: "52px" }}
          />
          <div className="flex flex-col text-left flex-1">
            <h2
              className="text-xl font-bold my-0 mb-1"
              style={{ color: "oklch(0.278078 0.029596 256.848)" }}
            >
              {title}
            </h2>
            {(badgeState || duration) && (
              <div className="flex items-center gap-2">
                {badgeState && <StatusBadge state={badgeState} />}
                {duration && (
                  <span
                    className="flex items-center gap-1 text-gray-500"
                    style={{ fontSize: "10px" }}
                  >
                    <IconClock />
                    {duration}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
        {children && (
          <div className="flex items-center ml-4 text-gray-700">
            {open ? <IconChevronLeft /> : <IconChevronDown />}
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="px-4 mb-4">
        <div className="border-t border-gray-200" />
      </div>

      {/* Expandable body */}
      {open && children && (
        <div className="px-4 pb-4">{children}</div>
      )}
    </div>
  );
}

// ─── Welcome to July AI expanded body ───────────────────────────────────────

function WelcomeBody() {
  return (
    <div>
      <p className="text-sm text-gray-500 mb-4 mt-4">
        We are glad you are here to start an exciting journey with us. Start here to get familiar with using the platform.
      </p>
      <PrimaryBtn>
        Onboard
        <IconArrowRight />
      </PrimaryBtn>
    </div>
  );
}

// ─── AI Red Team expanded body ───────────────────────────────────────────────

function AIRedTeamBody() {
  return (
    <div>
      <p className="text-sm text-gray-500 mb-4 mt-4">
        Learning what red teaming is and apply your knowledge to guide AI respond outside its safety guard rails
      </p>

      {/* Green background card with 3 feature cards */}
      <div
        className="relative rounded-lg p-8 w-full"
        style={{
          backgroundImage: "url('/images/gojuly/btn-bg-green.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex items-stretch justify-center gap-6">
          {/* Learn card */}
          <div className="w-72 bg-white rounded-lg p-6 shadow-sm">
            <div className="flex flex-col items-center text-center h-full">
              <img
                src="/images/gojuly/Lightbulb_medium.svg"
                alt="Learn"
                className="w-16 h-16 mb-4"
              />
              <h3 className="font-bold text-base mb-2">Learn</h3>
              <p className="text-sm text-gray-700">
                Build AI red teaming skills through core concepts, skill checks, and hands-on exercises.
              </p>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex items-center justify-center flex-shrink-0">
            <IconArrowForward />
          </div>

          {/* Advance card */}
          <div className="w-72 bg-white rounded-lg p-6 shadow-sm">
            <div className="flex flex-col items-center text-center h-full">
              <img
                src="/images/gojuly/SuccessfulAttack_medium.svg"
                alt="Advance"
                className="w-16 h-16 mb-4"
              />
              <h3 className="font-bold text-base mb-2">Advance</h3>
              <p className="text-sm text-gray-700">
                Progress to real-world scenarios and deeper technical material after a background check and interview.
              </p>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex items-center justify-center flex-shrink-0">
            <IconArrowForward />
          </div>

          {/* Get Hired card */}
          <div className="w-72 bg-white rounded-lg p-6 shadow-sm">
            <div className="flex flex-col items-center text-center h-full">
              <img
                src="/images/gojuly/money_medium.svg"
                alt="Get Hired"
                className="w-16 h-16 mb-4"
              />
              <h3 className="font-bold text-base mb-2">Get Hired</h3>
              <p className="text-sm text-gray-700">
                Strong performance leads to hiring opportunities for AI red team roles, paying $25–$100 per hour.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <PrimaryBtn>
          Dive In
          <IconArrowRight />
        </PrimaryBtn>
      </div>
    </div>
  );
}

// ─── Red Team Sample Submission expanded body ────────────────────────────────

function SampleSubmissionBody() {
  return (
    <div className="flex overflow-x-auto gap-4" style={{ scrollbarWidth: "none" }}>
      {/* Card */}
      <div
        className="rounded-2xl overflow-hidden flex-shrink-0"
        style={{
          border: "4px solid rgb(92, 204, 137)",
          width: "250px",
          backgroundColor: "rgb(255, 255, 255)",
        }}
      >
        {/* Card image */}
        <div className="rounded-t-xl overflow-hidden relative">
          <img
            src="/images/gojuly/card-bg-blue.png"
            alt="card background"
            className="w-full h-auto block"
          />
        </div>

        {/* Card body */}
        <div className="p-4 relative" style={{ minHeight: "140px" }}>
          <p
            className="font-semibold mb-2"
            style={{ fontSize: "18px", color: "oklch(0.278078 0.029596 256.848)" }}
          >
            Red Team Sample Submission
          </p>
          <StatusBadge state="completed" />
          <p
            className="text-sm text-gray-500 mt-2 mb-10 overflow-hidden"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            Click this to submit your red team samples.
          </p>

          {/* View button — pinned to bottom center */}
          <div className="mt-4">
            <PrimaryBtn>View</PrimaryBtn>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main page ───────────────────────────────────────────────────────────────

export default function GoJulyHomeV10() {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "rgb(238, 238, 238)",
        fontFamily: "var(--font-inter, 'Inter', sans-serif)",
        color: "oklch(0.278078 0.029596 256.848)",
      }}
    >
      <Navbar />

      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          {/* Page title */}
          <h1
            className="mt-0 mb-8"
            style={{
              fontFamily: "var(--font-calistoga, 'Calistoga', serif)",
              fontSize: "36px",
              fontWeight: 400,
              color: "oklch(0.278078 0.029596 256.848)",
            }}
          >
            Hey, Alex!
          </h1>

          {/* Track cards */}

          {/* 1. Welcome to July AI — expanded */}
          <TrackCard
            icon="/images/gojuly/TrackWelcome.svg"
            iconAlt="Welcome to July AI! icon"
            title="Welcome to July AI!"
            badgeState="in-progress"
            duration="2.5 MINUTES"
            defaultOpen={true}
          >
            <WelcomeBody />
          </TrackCard>

          {/* 2. AI Red Team — expanded */}
          <TrackCard
            icon="/images/gojuly/TrackRedTeam.svg"
            iconAlt="AI Red Team icon"
            title="AI Red Team"
            badgeState="in-progress"
            duration="2.0 HOURS"
            defaultOpen={true}
          >
            <AIRedTeamBody />
          </TrackCard>

          {/* 3. Red Team Sample Submission — expanded */}
          <TrackCard
            icon="/images/gojuly/SampleSubmissionImage.png"
            iconAlt="Red Team Sample Submission icon"
            title="Red Team Sample Submission"
            defaultOpen={true}
          >
            <SampleSubmissionBody />
          </TrackCard>

          {/* 4. AI Fundamentals — collapsed */}
          <TrackCard
            icon="/images/gojuly/TrackAIFundamentals.svg"
            iconAlt="AI Fundamentals icon"
            title="AI Fundamentals"
            badgeState="in-progress"
            duration="45 MINUTES"
            defaultOpen={false}
          >
            {/* collapsed — placeholder content */}
            <p className="text-sm text-gray-500">AI Fundamentals course content goes here.</p>
          </TrackCard>

          {/* 5. Coding Fundamentals — collapsed */}
          <TrackCard
            icon="/images/gojuly/TrackCodingFundamentals.svg"
            iconAlt="Coding Fundamentals icon"
            title="Coding Fundamentals"
            badgeState="not-started"
            duration="2.25 HOURS"
            defaultOpen={false}
          >
            <p className="text-sm text-gray-500">Coding Fundamentals course content goes here.</p>
          </TrackCard>

          {/* 6. Exclusive Events — collapsed (no badge/duration on live site) */}
          <TrackCard
            icon="/images/gojuly/TrackEventExclusives.svg"
            iconAlt="Exclusive Events icon"
            title="Exclusive Events"
            defaultOpen={false}
          >
            <p className="text-sm text-gray-500">Exclusive Events content goes here.</p>
          </TrackCard>
        </div>
      </div>
    </div>
  );
}
