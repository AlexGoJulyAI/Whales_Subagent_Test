————————————————————————————————————————————————————
USER JOURNEY — Direction A: "Structural Partition"
Flow Name: Red Teaming Beginner → Job Application Navigation
Persona: Job applicant who clicked "Start Beginner Module" and is now in the Practice section
Goal: Return to Red Team Sample Submission to submit work
Primary metric enabled: Reach Red Team Sample Submission first page in one click from any Practice page
Assets informing this journey: PROJECT_BRIEF_v2.md §2, §5, §12, §13; screenshot: learning-module-desktop.png; screenshot: home-desktop-1440.png
Aesthetic stance: Industrial / utilitarian — structural zone boundaries do the navigation work; no animation, no decoration
————————————————————————————————————————————————————

DIRECTION SUMMARY
The sidebar is formally divided into two zones: a scrollable nav zone (top) and a fixed action zone (bottom). A full-width border-t divider separates them. The button fills the action zone flush to the sidebar edges — no padding wrapper, no shadow, no extra copy. The partition is the signal. The accordion collapses silently on /home return. This direction makes a bet: structural clarity is more legible than visual emphasis. A user who has scrolled past 10 challenges still sees the action zone because it never moves.

ENTRY POINTS
- User is on any Practice page (Requirements, Challenge 1–10) inside the Red Teaming - Beginner module
- User arrived here after clicking "Start Beginner Module" on the Red Team Sample Submission first page

————————————————————————————————————————————————————
STEP 1: Practice Page — any Challenge or Requirements
[MODIFIED EXISTING SCREEN]
————————————————————————————————————————————————————
User action:      User is reading or working through a Practice page. No specific action required.
System response:  Sidebar renders with two explicit zones:
                  ZONE 1 (scrollable): Collapse button, back button + title, nav list (Learning Material, Red Teaming Beginner section, Previous Conversations, PRACTICE items)
                  ZONE 2 (fixed, bottom): border-t border-gray-200 divider + "Go to Job Application →" button (ja-btn-primary, w-full, flush to sidebar edges, h-12, no px-4 wrapper)
Resulting state:  User sees the nav list above, the button below. Both zones are visible simultaneously unless viewport is very short.
States present:   Button — default (filled navy); Nav items — one active (pink-50 + pink-500 left border); Zone 2 — always visible
Asset reference:  Brief §13 layout diagram; brief §8 button spec; screenshot: learning-module-desktop.png
Drop-off risk:    User does not notice the button because it reads as a generic sidebar element.
Intervention:     Flush full-width button with filled navy background creates a strong color contrast at the bottom of the white sidebar. The structural boundary (border-t) signals that this zone is categorically different from the nav list above.

————————————————————————————————————————————————————
DECISION POINT: User ready to navigate to job application?
————————————————————————————————————————————————————
Condition:        User decides to apply (or return to submission)
Path A:           User clicks "Go to Job Application →" → Flow 1 continues
Path B:           User continues working on challenges → stays on current Practice page
Asset reference:  Brief §12 Flow 1

————————————————————————————————————————————————————
STEP 2: Click "Go to Job Application →"
[MODIFIED EXISTING SCREEN — action]
————————————————————————————————————————————————————
User action:      User clicks the "Go to Job Application →" button in Zone 2 of the sidebar.
System response:  System derives the Red Team Sample Submission URL from the stored module reference at runtime. Navigates to Red Team Sample Submission first page.
Resulting state:  User lands on: "If you're new... Learn the skills for success." page with "Start Beginner Module →" and "Skip to Job Application →" buttons.
States present:   No loading state specified. Standard browser navigation.
Asset reference:  Brief §6 constraints (runtime URL derivation); brief §12 Flow 1 step 4; screenshot: red-team-sample-submission-first-page.png
Drop-off risk:    None — this is a direct navigation. No intermediate state to abandon.
Intervention:     N/A — zero friction path.

————————————————————————————————————————————————————
STEP 3: Learn section pages (Learning Material - Beginner)
[EXISTING SCREEN — no change]
————————————————————————————————————————————————————
User action:      User is on the Learn section (Learning Material - Beginner), not a Practice page.
System response:  Sidebar renders WITHOUT Zone 2. No "Go to Job Application" button shown. Nav list fills the full sidebar height.
Resulting state:  Standard sidebar. No button visible.
States present:   Same as current state — no modification.
Asset reference:  Brief §5 out-of-scope (Learn section pages); client-confirmed Q-04
Drop-off risk:    User on Learn section has no return path — but this is client-confirmed scope.
Intervention:     N/A — out of scope per brief §5.

————————————————————————————————————————————————————
STEP 4: User navigates to /home via logo or back arrow
[MODIFIED EXISTING SCREEN]
————————————————————————————————————————————————————
User action:      User clicks "july ai" logo or the back arrow in the sidebar header.
System response:  System detects referrer is an AI Red Team module page. On /home mount, AI Red Team accordion is set to collapsed state. No animation — instant collapse.
Resulting state:  /home renders with AI Red Team accordion collapsed (header row only: "AI Red Team | IN PROGRESS | 2.0 HOURS"). Red Team Sample Submission module card is visible below it without scrolling.
States present:   AI Red Team: collapsed. Red Team Sample Submission: visible, COMPLETED status.
Asset reference:  Brief §12 Flow 2; brief §13 home page spec; brief §15 accordion trigger; screenshot: home-desktop-1440.png
Drop-off risk:    User does not immediately see Red Team Sample Submission. Silent collapse means no visual cue that anything changed.
Intervention:     Structural partition: with AI Red Team collapsed, the Red Team Sample Submission card appears directly below the AI Red Team header row — naturally in view without the user needing to do anything.

————————————————————————————————————————————————————
EXIT POINTS
————————————————————————————————————————————————————
Success:          User clicks "Go to Job Application →" from any Practice page and lands on Red Team Sample Submission first page in one click.
Abandonment:      User returns to /home via back arrow or logo instead of using the button. Mitigated by accordion collapse ensuring Red Team Sample Submission is visible.

SECONDARY FLOWS
Flow 2 (home return) is embedded in Steps 3–4 above.

OUT-OF-SCOPE TOUCHPOINTS
- Learn section pages: no button shown — client-confirmed out of scope
- Red Team Sample Submission module content: no changes — out of scope per brief §5

OPEN QUESTIONS
- Arrow icon must be an `<img>` element matching the existing CTA pattern (confirmed from DOM inspection) — implementation detail for Prototyper Agent
- Runtime URL derivation method: engineering must confirm API/store lookup before implementation
