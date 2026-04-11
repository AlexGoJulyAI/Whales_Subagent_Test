"use client";

import Image from "next/image";
import { ArrowRight, Home, PenTool, DollarSign } from "lucide-react";

// ─── Navbar ──────────────────────────────────────────────────────────────────

const navItems = [
  { label: "Home", icon: Home, active: false },
  { label: "Data Portfolio", icon: PenTool, active: false },
  { label: "Payment", icon: DollarSign, active: false },
];

function Navbar() {
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
          {navItems.map((item) => (
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

// ─── Sidebar Nav Item ─────────────────────────────────────────────────────────

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

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function Sidebar() {
  return (
    // ESTIMATED: sidebar bg #ffffff, borderRight #e5e7eb — not directly observed from clone
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

      {/* Go to Job Application CTA */}
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

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function GoJulyLearningPage() {
  return (
    <div className="min-h-screen bg-[#eeeeee] font-inter">
      {/* Shared Navbar */}
      <Navbar />

      {/* Two-column layout */}
      <div className="flex" style={{ minHeight: "calc(100vh - 52px)" }}>
        {/* Left: Sidebar */}
        <Sidebar />

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
