# User Journey — gojuly-ux-v17
*Designer Agent output — new_screen mode. 2026-04-13.*

---

## Journey Overview

**User persona:** Job seeker completing AI red-teaming challenges on GoJuly AI. Has started the AI Red Team - Beginner module and wants to submit their red team samples for job application.
**Start state:** On the Red Teaming - Beginner learning page (Challenge 3 active).
**Goal:** Navigate to the Red Team Sample Submission module to submit their application.

---

## Screen 1: Red Teaming - Beginner Learning Page

**Entry condition:** User has been working through challenges. Challenge 3 is active in the sidebar (bg-pink-50, border-l-4 border-pink-500).

| Step | Action | Expected Result |
|---|---|---|
| 1 | Land on Screen 1 | Navbar sticky at top (h=116px). Fixed sidebar (256px) shows "Red Teaming - Beginner" title. Challenge 3 highlighted in pink as active item. Main content shows challenge bar + empty chat + right panels. |
| 2 | View sidebar | Sidebar shows: Learning Material - Beginner section, Red Teaming Beginner section (expanded) with Previous Conversations, PRACTICE header, Requirements, Challenges 1-10. "Go to Job Application" button visible at very bottom, below Challenge 10, separated by border-t border-gray-200. |
| 3 | Click "Go to Job Application" | `setCurrentScreen(2)` fires. Screen switches to Screen 2 (Home page). |

**Success indicator:** "Go to Job Application" button clearly present at sidebar bottom — solid dark navy (#083386), white text, full-width.

---

## Screen 2: Home Dashboard

**Entry condition:** Arrived from Screen 1 via "Go to Job Application" click.

| Step | Action | Expected Result |
|---|---|---|
| 1 | View home page | AI Red Team card (card #2) is COLLAPSED — header row only (icon, title, IN PROGRESS badge, "2.0 HOURS", down-chevron). |
| 2 | Red Team Sample Submission visible | Card #3 (Red Team Sample Submission, COMPLETED) is immediately visible below the collapsed AI Red Team card — no scrolling required. |
| 3 | Click AI Red Team card header | Card expands to show description + Dive In button + Learn/Advance/Get Hired sub-cards. Chevron rotates. |
| 4 | Click AI Red Team card header again | Card collapses back to header-only. |
| 5 | Navigate further | [out of scope for this prototype] |

**Success indicator:** Red Team Sample Submission card is visible on page load without scrolling.

---

## Navigation Model

Screen 1 → Screen 2: "Go to Job Application" button (sidebar bottom) → `setCurrentScreen(2)`.
Screen 2 → Screen 1: Not included in this prototype (one-directional journey demo).

**Implementation:** `const [currentScreen, setCurrentScreen] = useState<1 | 2>(1);`

---

## Prototype Interaction Model

**Both screens: STATIC** — no real navigation, no API calls, no auth.
- Screen 1: sidebar items are not clickable (except "Go to Job Application" which switches screens)
- Screen 2: AI Red Team card is interactive (accordion toggle). Other cards are static.
- The "Go to Job Application" button and AI Red Team collapsed state are the VISUAL PROOF of the UX fix.
