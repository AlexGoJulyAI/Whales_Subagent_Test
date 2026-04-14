// FONT: Inter — loaded as --font-inter — applied via font-[--font-inter] on home page wrapper
// FONT: Calistoga — loaded as --font-calistoga — applied via font-[--font-calistoga] on logo span
// FONT: Arial — no CSS variable — applied via font-arial @utility class on sidebar <ul> and learning content
// Source: getComputedStyle extraction 2026-04-12

'use client';

import { useState } from 'react';

export default function GoJulyUxV14() {
  const [currentScreen, setCurrentScreen] = useState<1 | 2>(1);
  const [isAiRedTeamOpen, setIsAiRedTeamOpen] = useState(false);

  // ─── Shared Navbar ─────────────────────────────────────────────────────────
  const Navbar = () => (
    <nav className="sticky top-0 z-[2147483647] bg-white border-b-2 border-[#dadee7] rounded-b-[16px] px-6 flex items-center justify-between h-16 w-full">
      <div className="flex items-center gap-8">
        <span className="font-[--font-calistoga] text-2xl text-[#10204b]">july ai</span>
        <div className="flex gap-1">
          <button className="px-4 py-2 text-sm font-medium text-gray-900">Home</button>
          <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800">Data Portfolio</button>
          <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800">Payment</button>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="border border-gray-300 text-gray-700 text-xs font-semibold px-3 py-1 rounded-md">Admin</button>
        <button className="border border-gray-300 text-gray-700 text-xs font-semibold px-3 py-1 rounded-md">FE Admin</button>
        <div className="w-8 h-8 rounded-full bg-[#083386] text-white text-xs flex items-center justify-center font-semibold">A</div>
      </div>
    </nav>
  );

  // ─── Screen 1: Learning Page ────────────────────────────────────────────────
  if (currentScreen === 1) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex flex-1">
          {/* Fixed sidebar */}
          <aside className="fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 overflow-y-auto z-10 pt-4">
            {/* Collapse button */}
            <div className="mb-4 ml-4">
              <button className="rounded-md hover:bg-gray-100 transition p-1.5">
                {/* ViewSidebar inline SVG */}
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-gray-600" fill="currentColor">
                  <path d="M18 4H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H6V6h12v12zM9 6H6v12h3V6z"/>
                </svg>
              </button>
            </div>

            {/* Header */}
            <div className="pb-4 border-b border-[#dadee7] px-4 flex items-center gap-2">
              <button className="shrink-0">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#10204b]">
                  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                </svg>
              </button>
              <span className="font-bold text-[#10204b] text-lg leading-tight line-clamp-2">Red Teaming - Beginner</span>
            </div>

            {/* Nav list */}
            <nav>
              <ul className="m-0 p-0 font-arial list-none">

                {/* Learning Material - Beginner (complete, collapsed) */}
                <li className="my-0 border-b border-[#dadee7]">
                  <div className="py-4 flex items-center gap-2 hover:cursor-pointer hover:bg-gray-50 px-4">
                    <img src="/images/gojuly/icon-SectionComplete_small.svg" alt="complete" className="w-5 h-5 shrink-0" />
                    <span className="flex-1 font-medium text-sm">Learning Material - Beginner</span>
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-gray-400" fill="currentColor">
                      <path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z"/>
                    </svg>
                  </div>
                </li>

                {/* Red Teaming Beginner (in progress, expanded) */}
                <li className="my-0 border-b border-[#dadee7]">
                  <div className="py-4 flex items-center gap-2 hover:cursor-pointer bg-gray-50 border-b border-[#dadee7] px-4">
                    <img src="/images/gojuly/icon-SectioInProgress_small.svg" alt="in progress" className="w-5 h-5 shrink-0" />
                    <span className="flex-1 font-medium text-sm">Red Teaming Beginner</span>
                    {/* rotate-90 = chevron-right rotated to point down = expanded */}
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-gray-400 rotate-90 transition-transform" fill="currentColor">
                      <path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z"/>
                    </svg>
                  </div>

                  {/* Expanded body */}
                  <div>
                    {/* Previous Conversations */}
                    <div className="py-2.5 px-4 flex items-center gap-2 hover:cursor-pointer text-sm hover:bg-gray-50">
                      <span className="shrink-0 text-violet-500">
                        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                          <path d="M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
                        </svg>
                      </span>
                      <span className="flex-1 text-gray-700">Previous Conversations</span>
                    </div>

                    {/* PRACTICE section */}
                    <div>
                      {/* PRACTICE label */}
                      <div className="py-2.5 px-4 flex items-center gap-2 hover:cursor-pointer hover:bg-gray-50">
                        <svg viewBox="0 0 24 24" className="w-4 h-4 text-gray-400 rotate-90" fill="currentColor">
                          <path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z"/>
                        </svg>
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-600">PRACTICE</span>
                      </div>

                      {/* Requirements */}
                      <div className="py-2.5 px-4 flex items-center gap-2 hover:cursor-pointer text-sm hover:bg-gray-50">
                        <span className="shrink-0 text-orange-500">
                          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                            <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                          </svg>
                        </span>
                        <span className="flex-1 text-gray-700">Requirements</span>
                      </div>

                      {/* Challenge 1 — in progress */}
                      <div className="py-2.5 px-4 flex items-center gap-2 hover:cursor-pointer text-sm hover:bg-gray-50">
                        <img src="/images/gojuly/icon-SectioInProgress_small.svg" alt="in progress" className="w-5 h-5 shrink-0" />
                        <span className="flex-1 truncate text-left text-gray-700">Challenge 1</span>
                      </div>

                      {/* Challenge 2 — in progress */}
                      <div className="py-2.5 px-4 flex items-center gap-2 hover:cursor-pointer text-sm hover:bg-gray-50">
                        <img src="/images/gojuly/icon-SectioInProgress_small.svg" alt="in progress" className="w-5 h-5 shrink-0" />
                        <span className="flex-1 truncate text-left text-gray-700">Challenge 2</span>
                      </div>

                      {/* Challenge 3 — ACTIVE */}
                      <div className="py-2.5 px-4 flex items-center gap-2 hover:cursor-pointer text-sm bg-pink-50 border-l-4 border-pink-500">
                        <img src="/images/gojuly/icon-NotStarted_small.svg" alt="not started" className="w-5 h-5 shrink-0" />
                        <span className="flex-1 truncate text-left font-medium text-gray-900">Challenge 3</span>
                      </div>

                      {/* Challenges 4-10 — not started */}
                      {([4, 5, 6, 7, 8, 9, 10] as const).map((n) => (
                        <div key={n} className="py-2.5 px-4 flex items-center gap-2 hover:cursor-pointer text-sm hover:bg-gray-50">
                          <img src="/images/gojuly/icon-NotStarted_small.svg" alt="not started" className="w-5 h-5 shrink-0" />
                          <span className="flex-1 truncate text-left text-gray-700">Challenge {n}</span>
                        </div>
                      ))}

                      {/* DELTA 1 — Go to Job Application button */}
                      <div className="px-4 mt-4 pb-4">
                        <button
                          onClick={() => setCurrentScreen(2)}
                          className="w-full border border-[#083386] bg-white text-[#083386] rounded-xl px-6 font-semibold text-sm h-12 flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors"
                        >
                          Go to Job Application
                          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                            <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </nav>
          </aside>

          {/* Main content offset */}
          <div className="ml-64 flex flex-1 font-arial bg-[#dadee7]">
            {/* Left: chat area */}
            <div className="flex-1 flex flex-col p-4">
              <h2 className="text-base font-bold mb-4">Challenge 3</h2>
              <div className="flex-1 bg-white rounded-lg p-4 mb-4 min-h-[300px]">
                {/* chat placeholder */}
              </div>
              <div className="bg-white rounded-lg p-3 flex gap-2">
                <input className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm" placeholder="Type your message..." />
                <button className="bg-[#083386] text-white rounded-lg px-4 py-2 text-sm font-semibold">Send</button>
              </div>
            </div>
            {/* Right panel */}
            <div className="w-72 min-w-[15rem] flex flex-col gap-3 p-4">
              <div className="bg-white rounded-lg p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">Annotation</p>
                <p className="text-sm text-gray-500">Add your annotations here.</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">Feedback</p>
                <p className="text-sm text-gray-500">Feedback will appear here.</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">Status</p>
                <p className="text-sm text-gray-500">Not started</p>
              </div>
              <button className="bg-[#083386] hover:bg-[rgb(5,33,90)] text-white rounded-xl px-6 font-semibold text-sm h-9">Submit</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── Screen 2: Home Page ────────────────────────────────────────────────────
  return (
    <div className="flex flex-col min-h-screen bg-[#eeeeee]">
      <Navbar />
      <div className="min-h-screen p-8 font-[--font-inter]">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-[36px] font-bold text-gray-900 mb-8">Hey, Alex!</h1>

          {/* Card 1 — Welcome to July AI! (always expanded, no toggle) */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="flex items-center justify-between py-4 px-4">
              <div className="flex items-center gap-4 flex-1">
                <img src="/images/gojuly/TrackWelcome.svg" className="shrink-0 object-contain w-[52px] h-[52px]" alt="Welcome" />
                <div className="flex flex-col text-left flex-1">
                  <h2 className="text-xl font-bold my-0 mb-1">Welcome to July AI!</h2>
                </div>
              </div>
              <div className="flex items-center ml-4">
                {/* Left chevron = expanded */}
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-gray-400" fill="currentColor">
                  <path d="M15.41 16.59 10.83 12l4.58-4.59L14 6l-6 6 6 6z"/>
                </svg>
              </div>
            </div>
            <div className="px-4 mb-4"><div className="border-t border-gray-200" /></div>
            <div className="px-4 pb-4">
              <div className="text-sm text-gray-500 mb-4 mt-4">
                We are glad you are here to start an exciting journey with us. Start here to get familiar with using the platform.
              </div>
              <div className="flex overflow-x-auto gap-4">
                <div className="w-72 bg-white rounded-lg p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center">
                  <div className="w-16 h-16 mb-4 bg-[#083386] rounded-full flex items-center justify-center text-white text-2xl">📚</div>
                  <h3 className="font-bold text-base mb-2">Learn</h3>
                  <p className="text-sm text-gray-700">Build AI red teaming skills through core concepts, skill checks, and hands-on exercises.</p>
                </div>
                <div className="flex items-center text-gray-400 text-2xl shrink-0">→</div>
                <div className="w-72 bg-white rounded-lg p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center">
                  <div className="w-16 h-16 mb-4 bg-[#083386] rounded-full flex items-center justify-center text-white text-2xl">⚡</div>
                  <h3 className="font-bold text-base mb-2">Advance</h3>
                  <p className="text-sm text-gray-700">Progress to real-world scenarios and deeper technical material after a background check and interview.</p>
                </div>
                <div className="flex items-center text-gray-400 text-2xl shrink-0">→</div>
                <div className="w-72 bg-white rounded-lg p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center">
                  <div className="w-16 h-16 mb-4 bg-[#083386] rounded-full flex items-center justify-center text-white text-2xl">💼</div>
                  <h3 className="font-bold text-base mb-2">Get Hired</h3>
                  <p className="text-sm text-gray-700">Strong performance leads to hiring opportunities for AI red team roles, paying $25–$100 per hour.</p>
                </div>
              </div>
              <button className="bg-[#083386] hover:bg-[rgb(5,33,90)] text-white rounded-xl px-6 font-semibold text-sm h-9 mt-4 flex items-center gap-2">
                Dive In
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>
              </button>
            </div>
          </div>

          {/* Card 2 — AI Red Team (DELTA 2: collapsed by default, toggleable) */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
            <div
              className="flex items-center justify-between py-4 px-4 cursor-pointer"
              onClick={() => setIsAiRedTeamOpen(!isAiRedTeamOpen)}
            >
              <div className="flex items-center gap-4 flex-1">
                <img src="/images/gojuly/TrackRedTeam.svg" className="shrink-0 object-contain w-[52px] h-[52px]" alt="AI Red Team" />
                <div className="flex flex-col text-left flex-1">
                  <h2 className="text-xl font-bold my-0 mb-1">AI Red Team</h2>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 text-[10px] font-semibold rounded text-gray-700 bg-[#dadee7]">IN PROGRESS</span>
                    <span className="text-[10px] text-gray-500 flex items-center gap-1">⏰ 2.0 HOURS</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center ml-4">
                {isAiRedTeamOpen ? (
                  /* Left chevron = expanded */
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-gray-400" fill="currentColor">
                    <path d="M15.41 16.59 10.83 12l4.58-4.59L14 6l-6 6 6 6z"/>
                  </svg>
                ) : (
                  /* Down chevron = collapsed */
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-gray-400" fill="currentColor">
                    <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z"/>
                  </svg>
                )}
              </div>
            </div>
            {isAiRedTeamOpen && (
              <>
                <div className="px-4 mb-4"><div className="border-t border-gray-200" /></div>
                <div className="px-4 pb-4">
                  <div className="text-sm text-gray-500 mb-4 mt-4">
                    Learning what red teaming is and apply your knowledge to guide AI respond outside its safety guard rails
                  </div>
                  <div className="flex overflow-x-auto gap-4">
                    <div className="w-72 bg-white rounded-lg p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center">
                      <div className="w-16 h-16 mb-4 bg-[#083386] rounded-full flex items-center justify-center text-white text-2xl">📚</div>
                      <h3 className="font-bold text-base mb-2">Learn</h3>
                      <p className="text-sm text-gray-700">Build AI red teaming skills through core concepts, skill checks, and hands-on exercises.</p>
                    </div>
                    <div className="flex items-center text-gray-400 text-2xl shrink-0">→</div>
                    <div className="w-72 bg-white rounded-lg p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center">
                      <div className="w-16 h-16 mb-4 bg-[#083386] rounded-full flex items-center justify-center text-white text-2xl">⚡</div>
                      <h3 className="font-bold text-base mb-2">Advance</h3>
                      <p className="text-sm text-gray-700">Progress to real-world scenarios and deeper technical material after a background check and interview.</p>
                    </div>
                    <div className="flex items-center text-gray-400 text-2xl shrink-0">→</div>
                    <div className="w-72 bg-white rounded-lg p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center">
                      <div className="w-16 h-16 mb-4 bg-[#083386] rounded-full flex items-center justify-center text-white text-2xl">💼</div>
                      <h3 className="font-bold text-base mb-2">Get Hired</h3>
                      <p className="text-sm text-gray-700">Strong performance leads to hiring opportunities for AI red team roles, paying $25–$100 per hour.</p>
                    </div>
                  </div>
                  <button className="bg-[#083386] hover:bg-[rgb(5,33,90)] text-white rounded-xl px-6 font-semibold text-sm h-9 mt-4">
                    Dive In →
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Card 3 — Red Team Sample Submission (always expanded, no toggle) */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="flex items-center justify-between py-4 px-4">
              <div className="flex items-center gap-4 flex-1">
                <img src="/images/gojuly/SampleSubmissionImage.png" className="shrink-0 object-contain w-[52px] h-[52px]" alt="Red Team Sample Submission" />
                <div className="flex flex-col text-left flex-1">
                  <h2 className="text-xl font-bold my-0 mb-1">Red Team Sample Submission</h2>
                </div>
              </div>
              <div className="flex items-center ml-4">
                {/* Left chevron = expanded */}
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-gray-400" fill="currentColor">
                  <path d="M15.41 16.59 10.83 12l4.58-4.59L14 6l-6 6 6 6z"/>
                </svg>
              </div>
            </div>
            <div className="px-4 mb-4"><div className="border-t border-gray-200" /></div>
            <div className="px-4 pb-4">
              <div className="flex overflow-x-auto gap-4">
                <div className="border-4 border-[rgb(92,204,137)] rounded-xl bg-white w-64 shrink-0">
                  <div className="h-24 bg-gradient-to-br from-orange-100 to-pink-100 rounded-t-xl" />
                  <div className="p-4">
                    <div className="font-bold text-sm mb-1">Red Team Sample Submission</div>
                    <div className="inline-block px-2 py-0.5 text-[10px] font-semibold rounded bg-[rgb(162,232,165)] text-gray-700 mb-2">COMPLETED</div>
                    <p className="text-sm text-gray-500 line-clamp-2">Click this to submit your red team samples.</p>
                    <div className="mt-4">
                      <button className="bg-[#083386] hover:bg-[rgb(5,33,90)] text-white rounded-xl w-full font-semibold text-sm h-9">View</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4 — AI Fundamentals (collapsed) */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="flex items-center justify-between py-4 px-4 cursor-pointer">
              <div className="flex items-center gap-4 flex-1">
                <img src="/images/gojuly/TrackAIFundamentals.svg" className="shrink-0 object-contain w-[52px] h-[52px]" alt="AI Fundamentals" />
                <div className="flex flex-col text-left flex-1">
                  <h2 className="text-xl font-bold my-0 mb-1">AI Fundamentals</h2>
                </div>
              </div>
              <div className="flex items-center ml-4">
                {/* Down chevron = collapsed */}
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-gray-400" fill="currentColor">
                  <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Card 5 — Coding Fundamentals (collapsed) */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="flex items-center justify-between py-4 px-4 cursor-pointer">
              <div className="flex items-center gap-4 flex-1">
                <img src="/images/gojuly/TrackCodingFundamentals.svg" className="shrink-0 object-contain w-[52px] h-[52px]" alt="Coding Fundamentals" />
                <div className="flex flex-col text-left flex-1">
                  <h2 className="text-xl font-bold my-0 mb-1">Coding Fundamentals</h2>
                </div>
              </div>
              <div className="flex items-center ml-4">
                {/* Down chevron = collapsed */}
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-gray-400" fill="currentColor">
                  <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Card 6 — Exclusive Events (collapsed) */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="flex items-center justify-between py-4 px-4 cursor-pointer">
              <div className="flex items-center gap-4 flex-1">
                <img src="/images/gojuly/TrackEventExclusives.svg" className="shrink-0 object-contain w-[52px] h-[52px]" alt="Exclusive Events" />
                <div className="flex flex-col text-left flex-1">
                  <h2 className="text-xl font-bold my-0 mb-1">Exclusive Events</h2>
                </div>
              </div>
              <div className="flex items-center ml-4">
                {/* Down chevron = collapsed */}
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-gray-400" fill="currentColor">
                  <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z"/>
                </svg>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
