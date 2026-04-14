————————————————————————————————————————————————————
USER JOURNEY — Direction B: "Elevated Anchor"
Flow Name: Red Teaming Beginner → Job Application Navigation
Persona: Job applicant who clicked "Start Beginner Module" and is now in the Practice section
Goal: Return to Red Team Sample Submission to submit work
Primary metric enabled: Reach Red Team Sample Submission first page in one click from any Practice page
Assets informing this journey: PROJECT_BRIEF_v2.md §2, §5, §12, §13; screenshot: learning-module-desktop.png; screenshot: home-desktop-1440.png
Aesthetic stance: Glassmorphic / elevated — the button reads as a permanent floating layer above the scrolling nav; motion is used precisely at two moments: button entry + accordion collapse
————————————————————————————————————————————————————

DIRECTION SUMMARY
The sidebar scrolls normally, but the button anchors to the bottom inside a padded container with an upward shadow (`box-shadow: 0 -2px 8px rgba(0,0,0,0.06)`) that makes it visually float above the scroll list. When the user first arrives on a Practice page, the button slides in from below (translateY 8px → 0, opacity 0 → 1, 200ms ease-out) — a single-use entry animation that calls attention without looping. When the user returns to /home, the AI Red Team accordion collapses with a smooth height transition (200ms ease-out). This direction makes a bet: motion at exactly two moments communicates state change more reliably than purely static UI.

ENTRY POINTS
- User is on any Practice page (Requirements, Challenge 1–10) inside the Red Teaming - Beginner module
- User arrived here after clicking "Start Beginner Module" on the Red Team Sample Submission first page

————————————————————————————————————————————————————
STEP 1: First arrival on any Practice page
[MODIFIED EXISTING SCREEN]
————————————————————————————————————————————————————
User action:      User navigates to a Practice page (Requirements or any Challenge) for the first time in this session.
System response:  Sidebar renders. After the nav list loads, the elevated footer zone animates in from below:
                  - Start: translateY(8px), opacity(0)
                  - End: translateY(0), opacity(1)
                  - Duration: 200ms, ease-out
                  - One time per session — does not re-animate on subsequent Practice page navigations
                  Footer zone: px-4 wrapper, py-3 padding, box-shadow: 0 -2px 8px rgba(0,0,0,0.06) above the container, bg white, "Go to Job Application →" button (ja-btn-primary, w-full, h-12)
Resulting state:  User sees the nav list scrolling above, the elevated button anchored below. The upward shadow creates a clear visual layer boundary.
States present:   Button: default (filled navy). Footer zone: visible, elevated. Nav: scrollable.
Asset reference:  Brief §13 layout diagram; brief §8 button spec; brief §14 interaction states
Drop-off risk:    User completes the entry animation but still doesn't register the button as cross-module navigation.
Intervention:     The upward shadow is a universal affordance for "this element persists while content above it scrolls" — learned from mobile bottom sheets and fixed toolbars. No copy needed to communicate permanence.

————————————————————————————————————————————————————
STEP 2: Subsequent Practice page navigations (same session)
[MODIFIED EXISTING SCREEN]
————————————————————————————————————————————————————
User action:      User clicks to Challenge 2, 3, etc. within the same session.
System response:  Elevated footer zone is already visible. No re-animation. Button persists.
Resulting state:  Button is statically present. Nav active state updates (new Challenge highlighted in pink-50 with pink-500 left border).
States present:   Button: default. New active Challenge: active state.
Asset reference:  Brief §8 active state visual record; brief §14
Drop-off risk:    None at this step.
Intervention:     Persistence is the intervention — the button was already introduced once; it now feels native.

————————————————————————————————————————————————————
DECISION POINT: User ready to navigate to job application?
————————————————————————————————————————————————————
Condition:        User decides to apply or return to submission
Path A:           User clicks "Go to Job Application →" → Step 3
Path B:           User continues challenges → stays on Practice page
Asset reference:  Brief §12 Flow 1

————————————————————————————————————————————————————
STEP 3: Click "Go to Job Application →"
[MODIFIED EXISTING SCREEN — action]
————————————————————————————————————————————————————
User action:      User clicks the elevated "Go to Job Application →" button.
System response:  Runtime derives Red Team Sample Submission URL from stored module reference. Navigates.
Resulting state:  User lands on Red Team Sample Submission first page.
States present:   Standard browser navigation.
Asset reference:  Brief §6, §12 Flow 1 step 4; screenshot: red-team-sample-submission-first-page.png
Drop-off risk:    None — direct navigation.
Intervention:     N/A.

————————————————————————————————————————————————————
STEP 4: Learn section pages (Learning Material - Beginner)
[EXISTING SCREEN — no change]
————————————————————————————————————————————————————
User action:      User is on the Learn section page.
System response:  Elevated footer zone is NOT rendered. Full sidebar height used by nav list. No animation.
Resulting state:  Standard sidebar. No button.
States present:   Unchanged from current.
Asset reference:  Brief §5 out-of-scope; client-confirmed Q-04
Drop-off risk:    N/A — out of scope.
Intervention:     N/A.

————————————————————————————————————————————————————
STEP 5: User navigates to /home via logo or back arrow
[MODIFIED EXISTING SCREEN]
————————————————————————————————————————————————————
User action:      User clicks "july ai" logo or back arrow.
System response:  System detects referrer is an AI Red Team module page. On /home mount, AI Red Team accordion collapses with a smooth height transition: max-height [expanded] → 0, 200ms ease-out. Content fades out as height animates.
Resulting state:  /home with AI Red Team accordion collapsed. Red Team Sample Submission card visible below.
States present:   AI Red Team: collapsed (animated). Red Team Sample Submission: visible.
Asset reference:  Brief §12 Flow 2; brief §13 home spec; brief §15 accordion trigger
Drop-off risk:    User might miss the Red Team Sample Submission card if they look away during the transition.
Intervention:     The smooth collapse draws the eye downward as content folds away — it naturally pulls attention to what becomes visible: the Red Team Sample Submission header.

————————————————————————————————————————————————————
EXIT POINTS
————————————————————————————————————————————————————
Success:          User clicks "Go to Job Application →" from any Practice page and reaches Red Team Sample Submission in one click.
Abandonment:      User navigates to /home and does not see Red Team Sample Submission. Mitigated by animated accordion collapse that draws eye downward.

SECONDARY FLOWS
Flow 2 (home return) embedded in Step 5.

OUT-OF-SCOPE TOUCHPOINTS
- Learn section: no button — confirmed out of scope
- Red Team Sample Submission content: no changes

OPEN QUESTIONS
- Session state management: the "animate once per session" behavior requires either sessionStorage flag or component-level mount tracking. Prototyper Agent must confirm implementation approach.
- Upward shadow (`box-shadow: 0 -2px 8px rgba(0,0,0,0.06)`) is a designer addition not in the brief token record — it must be added to the token record or confirmed as a one-off value before implementation.
