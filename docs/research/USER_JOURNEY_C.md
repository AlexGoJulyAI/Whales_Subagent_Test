————————————————————————————————————————————————————
USER JOURNEY — Direction C: "Wayfinding Signal"
Flow Name: Red Teaming Beginner → Job Application Navigation
Persona: Job applicant who clicked "Start Beginner Module" and is now in the Practice section
Goal: Return to Red Team Sample Submission to submit work
Primary metric enabled: Reach Red Team Sample Submission first page in one click from any Practice page
Assets informing this journey: PROJECT_BRIEF_v2.md §2, §5, §12, §13; screenshot: learning-module-desktop.png; screenshot: home-desktop-1440.png
Aesthetic stance: Editorial — the sidebar footer zone uses typographic hierarchy (micro-label + CTA) to communicate "this is your next step in a larger journey," not just a navigation option
————————————————————————————————————————————————————

DIRECTION SUMMARY
The sticky sidebar footer contains two elements: a micro-label `NEXT STEP` (text-[10px], tracking-widest, uppercase, text-gray-400) above the button, and the "Go to Job Application →" button (ja-btn-primary, w-full). The label pre-frames the button — users understand before clicking that this is a progression action, not a module exit. On /home return, the AI Red Team accordion collapses and the Red Team Sample Submission header row briefly flashes `bg-gray-50` (150ms, one time) to draw attention to the newly visible module. This direction makes a bet: users who understand *why* they're clicking navigate with higher intent — the micro-label reduces hesitation without adding visual weight.

ENTRY POINTS
- User is on any Practice page (Requirements, Challenge 1–10) inside the Red Teaming - Beginner module
- User arrived here after clicking "Start Beginner Module" on the Red Team Sample Submission first page

————————————————————————————————————————————————————
STEP 1: Practice Page — any Challenge or Requirements
[MODIFIED EXISTING SCREEN]
————————————————————————————————————————————————————
User action:      User is on any Practice page. No specific action required.
System response:  Sidebar renders with sticky footer containing:
                  LINE 1: `NEXT STEP` — text-[10px], tracking-widest, uppercase, text-gray-400, px-4, pt-3 (micro-label)
                  LINE 2: "Go to Job Application →" — btn ja-btn-primary, w-full, mx-4 (or px-4 wrapper), h-12, pb-3
                  A border-t border-gray-200 divider separates the footer from the nav list above.
                  ⚠ Designer note: `NEXT STEP` is designer-added copy. Not confirmed by client. Must be confirmed before implementation — see Open Questions.
Resulting state:  User sees nav list above, wayfinding footer below. The micro-label reads as a structural hint, not a headline.
States present:   Button: default (filled navy). Micro-label: static gray. Divider: visible.
Asset reference:  Brief §13 layout diagram; brief §8 button spec; brief §11 copy guide (locked string: "Go to Job Application")
Drop-off risk:    User reads `NEXT STEP` as a mandatory instruction rather than an optional CTA — creates pressure to click prematurely.
Intervention:     The micro-label is in `text-gray-400` (the lightest gray in the system) — it reads as ambient wayfinding, not a command. The button itself carries the action weight.

————————————————————————————————————————————————————
DECISION POINT: User ready to navigate to job application?
————————————————————————————————————————————————————
Condition:        User decides to apply or return to submission
Path A:           User clicks "Go to Job Application →" → Step 2
Path B:           User continues challenges, ignoring the footer
Asset reference:  Brief §12 Flow 1

————————————————————————————————————————————————————
STEP 2: Click "Go to Job Application →"
[MODIFIED EXISTING SCREEN — action]
————————————————————————————————————————————————————
User action:      User clicks "Go to Job Application →" in the footer.
System response:  Runtime derives Red Team Sample Submission URL from stored module reference. Navigates.
Resulting state:  User lands on Red Team Sample Submission first page.
States present:   Standard browser navigation.
Asset reference:  Brief §6, §12 Flow 1; screenshot: red-team-sample-submission-first-page.png
Drop-off risk:    None — direct navigation.
Intervention:     N/A.

————————————————————————————————————————————————————
STEP 3: Learn section pages (Learning Material - Beginner)
[EXISTING SCREEN — no change]
————————————————————————————————————————————————————
User action:      User is on the Learn section page.
System response:  Sticky footer NOT rendered. No micro-label. No button. Full sidebar height for nav list.
Resulting state:  Standard sidebar — unchanged.
States present:   Unchanged from current.
Asset reference:  Brief §5 out-of-scope; client-confirmed Q-04
Drop-off risk:    N/A.
Intervention:     N/A.

————————————————————————————————————————————————————
STEP 4: User navigates to /home via logo or back arrow
[MODIFIED EXISTING SCREEN]
————————————————————————————————————————————————————
User action:      User clicks "july ai" logo or back arrow.
System response:  System detects referrer is an AI Red Team module page. On /home mount:
                  1. AI Red Team accordion collapses instantly (no height animation — silent)
                  2. Red Team Sample Submission header row flashes bg-gray-50 for 150ms (CSS transition on background-color, one time only per return)
                  The flash draws the eye to the module that was previously obscured.
Resulting state:  /home with AI Red Team collapsed. Red Team Sample Submission header row returns to white after 150ms flash. Module card visible below.
States present:   AI Red Team: collapsed. Red Team Sample Submission: visible (post-flash, static white).
Asset reference:  Brief §12 Flow 2; brief §13 home spec; screenshot: home-desktop-1440.png
Drop-off risk:    150ms flash is too short to notice if user is not looking at that area.
Intervention:     The flash is brief and subtle by design — it is a hint, not a notification. Users who glance at the page see it; users who don't are still served by the collapsed accordion exposing the module.

————————————————————————————————————————————————————
EXIT POINTS
————————————————————————————————————————————————————
Success:          User clicks "Go to Job Application →" from any Practice page and reaches Red Team Sample Submission in one click.
Abandonment:      User returns to /home, misses Red Team Sample Submission. Mitigated by flash signal drawing attention to the newly visible module.

SECONDARY FLOWS
Flow 2 (home return) embedded in Step 4.

OUT-OF-SCOPE TOUCHPOINTS
- Learn section: no button — confirmed out of scope
- Red Team Sample Submission content: no changes

OPEN QUESTIONS
- ⚠ `NEXT STEP` micro-label is designer-added copy not confirmed in brief §11 locked strings. Must be confirmed by client before implementation. If client declines, this direction reverts to the same footer structure as Direction A (divider + button only), removing the differentiating element.
- bg-gray-50 flash on Red Team Sample Submission header is a new interaction not specified in the brief. Must be confirmed as acceptable before implementation.
