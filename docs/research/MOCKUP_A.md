————————————————————————————————————————————————————
DIRECTION: Direction A — "Structural Partition"
SCREEN: Red Teaming - Beginner (Practice Page) — Sidebar
Status: MODIFIED
Priority: P0
Brief reference: §13 "AI Red Team sidebar — with new button (Practice pages only)"
Asset sources: screenshot: learning-module-desktop.png; brief §8 Design Token Record; brief §13 layout diagram
Goal thread connection: Button in fixed action zone enables one-click return to Red Team Sample Submission from any Practice page (brief §4 primary metric)
————————————————————————————————————————————————————

VISUAL LAYOUT RENDER — Direction A — Practice Page Sidebar — MODIFIED

```html
<div style="display:flex;font-family:Inter,sans-serif;font-size:13px;background:#f3f4f6;padding:24px;gap:24px;align-items:flex-start">

  <!-- SIDEBAR -->
  <div style="width:256px;background:#fff;border:1px solid #E5E7EB;border-radius:6px;overflow:hidden;display:flex;flex-direction:column;height:560px;flex-shrink:0">

    <!-- Sidebar header -->
    <div style="padding:12px 16px;border-bottom:1px solid #E5E7EB;display:flex;align-items:center;gap:8px;background:#fff">
      <div style="width:32px;height:32px;background:#F3F4F6;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:10px;color:#9CA3AF">⊟</div>
      <div style="width:24px;height:24px;display:flex;align-items:center;justify-content:center;font-size:12px;color:#374151">←</div>
      <span style="font-size:13px;font-weight:600;color:oklch(0.278078 0.029596 256.848)">Red Teaming - Beginner</span>
    </div>

    <!-- ZONE 1: Scrollable nav list -->
    <div style="flex:1;overflow-y:auto;padding-top:4px">
      <!-- Learning Material item -->
      <div style="padding:10px 16px;display:flex;align-items:center;gap:8px;color:#374151;font-size:13px;border-bottom:1px solid #F3F4F6">
        <div style="width:16px;height:16px;background:#E5E7EB;border-radius:50%"></div>
        <span>Learning Material - Beginner</span>
        <span style="margin-left:auto;color:#9CA3AF">›</span>
      </div>
      <!-- Red Teaming Beginner section header -->
      <div style="padding:12px 16px;display:flex;align-items:center;gap:8px;background:#F9FAFB;font-size:13px;border-bottom:1px solid #E5E7EB">
        <div style="width:16px;height:16px;background:#E5E7EB;border-radius:50%"></div>
        <span style="font-weight:500">Red Teaming Beginner</span>
        <span style="margin-left:auto;color:#9CA3AF">∨</span>
      </div>
      <!-- Previous Conversations -->
      <div style="padding:10px 16px;display:flex;align-items:center;gap:8px;color:#6B7280;font-size:12px">
        <div style="width:14px;height:14px;background:#E5E7EB;border-radius:2px"></div>
        <span>Previous Conversations</span>
      </div>
      <!-- PRACTICE label -->
      <div style="padding:8px 16px;display:flex;align-items:center;gap:6px">
        <div style="width:12px;height:12px;background:#E5E7EB;border-radius:2px"></div>
        <span style="font-size:11px;font-weight:600;letter-spacing:0.08em;color:#9CA3AF;text-transform:uppercase">Practice</span>
      </div>
      <!-- Requirements -->
      <div style="padding:10px 16px;display:flex;align-items:center;gap:8px;color:#374151;font-size:12px">
        <div style="width:14px;height:14px;border:1.5px solid #D1D5DB;border-radius:50%"></div>
        <span>Requirements</span>
      </div>
      <!-- Challenge 1 -->
      <div style="padding:10px 16px;display:flex;align-items:center;gap:8px;color:#374151;font-size:12px">
        <div style="width:14px;height:14px;border:1.5px solid #D1D5DB;border-radius:50%"></div>
        <span>Challenge 1</span>
      </div>
      <!-- Challenge 2 -->
      <div style="padding:10px 16px;display:flex;align-items:center;gap:8px;color:#374151;font-size:12px">
        <div style="width:14px;height:14px;border:1.5px solid #D1D5DB;border-radius:50%"></div>
        <span>Challenge 2</span>
      </div>
      <!-- Challenge 3 — ACTIVE -->
      <div style="padding:10px 16px;display:flex;align-items:center;gap:8px;font-size:12px;background:#FDF2F8;border-left:4px solid #EC4899;color:#374151">
        <div style="width:14px;height:14px;border:1.5px solid #EC4899;border-radius:50%"></div>
        <span style="font-weight:500">Challenge 3</span>
      </div>
      <!-- Challenge 4–10 compressed -->
      <div style="padding:10px 16px;color:#9CA3AF;font-size:11px;font-style:italic">Challenge 4 – 10...</div>
    </div>

    <!-- ZONE 2: Fixed action zone — NEW -->
    <div style="border-top:1px solid #E5E7EB;flex-shrink:0">
      <button style="width:100%;height:48px;background:rgb(8,51,134);color:#fff;border:none;font-size:14px;font-weight:600;font-family:Inter,sans-serif;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;border-radius:0">
        Go to Job Application
        <span style="font-size:16px">→</span>
      </button>
      <!-- AMBER ANNOTATION -->
      <div style="background:#D97706;color:#fff;font-size:10px;padding:3px 8px;text-align:center">
        ★ NEW: Fixed action zone — ja-btn-primary, w-full, flush edges, no wrapper padding
      </div>
    </div>
  </div>

  <!-- ANNOTATION PANEL -->
  <div style="flex:1;font-size:12px;color:#374151;line-height:1.7">
    <div style="font-weight:700;font-size:13px;margin-bottom:12px;color:#D97706">Direction A — "Structural Partition"</div>
    <div style="margin-bottom:8px"><strong>Zone 1 (scrollable):</strong> existing nav list — no changes</div>
    <div style="margin-bottom:8px"><strong>Zone 2 (fixed, new):</strong> border-t border-gray-200 + full-width ja-btn-primary button</div>
    <div style="margin-bottom:8px"><strong>Button:</strong> w-full, h-12 (48px), flush to sidebar edges, no px-4 wrapper, border-radius: 0 (matches sidebar footer)</div>
    <div style="margin-bottom:8px"><strong>Accordion (home):</strong> silent instant collapse on return from AI Red Team module page</div>
    <div style="margin-bottom:8px"><strong>Animation:</strong> none</div>
    <div style="margin-bottom:8px"><strong>Visibility rule:</strong> Zone 2 renders only on Practice section pages (Requirements + Challenges 1–10). Hidden on Learn section.</div>
    <div style="background:#FEF3C7;padding:8px;border-radius:4px;margin-top:12px"><strong>Distinctive move:</strong> The structural partition is the signal. No extra copy, no shadow, no animation — the zone boundary and the filled navy block do all the work.</div>
  </div>
</div>
```

SPATIAL SUMMARY:
  Direction:               Direction A — Structural Partition
  Layout:                  256px sidebar split into scrollable nav zone (flex:1) + fixed action zone (flex-shrink:0, h-12)
  Distinctive layout move: No wrapper padding on button — it is flush with sidebar edges, making it feel like a structural bottom cap, not an appended element
  New/changed zones:       Zone 2 (fixed action footer) — new; Zone 1 (scrollable nav) — existing, unchanged
  Proportional note:       Sidebar height is viewport-height minus topbar (~64px). Zone 2 is always 48px (h-12). No estimated values.

---

EXISTING SCREEN ANALYSIS
  Current state:  Sidebar has scrollable nav list filling full height. No bottom zone, no button. Back button and title at top.
  What works:     Nav list structure and active state treatment (pink-50 + pink-500 left border) — preserve exactly.
  What is broken: No return path to Red Team Sample Submission from any Practice page (brief §2 Problem A).

LAYOUT
Two-zone sidebar: scrollable nav (top, flex:1, overflow-y:auto) + fixed action footer (bottom, flex-shrink:0). The border-t divider is the only new structural element added to the existing sidebar shell. Everything else is preserved. Direction A's spatial distinctiveness: the action zone is structurally part of the sidebar, not overlaid on it.

ABOVE THE FOLD
  First attention:  Active challenge item (pink-50 bg + pink-500 left border) — communicates current location
  Second attention: "Go to Job Application →" button — filled navy, full-width, structurally anchored at bottom
  Third attention:  Nav section headers (Red Teaming Beginner, PRACTICE label)

COMPONENTS

---

**Design Integration Reasoning — "Go to Job Application" button**

1. DISCOVERABILITY: Attention in the sidebar moves top-to-bottom along the nav list. The button is at the bottom — users who scroll reach it naturally. Users who don't scroll see it immediately on short content lists. The structural divider acts as a visual stop that directs attention downward.
2. VISUAL BELONGING: Filled navy `#083386`, white text, Inter 14px/600, border-radius 0 at sidebar bottom. Uses the exact same bg token as every other `ja-btn-primary` on the platform. Belongs completely.
3. HIERARCHY WEIGHT: Correct. The button is the only filled-navy element in the sidebar — it is visually dominant among the list items (which are transparent-bg or gray-50 at most). It does not compete with the active challenge (pink-50) because they use different color families.
4. INTEGRATION VERDICT: This component reads as native because it uses the same color token, font, and weight as every other primary CTA on the platform — only its position (bottom of sidebar) and width (full) are new.

---

**"Go to Job Application →" button — P0**
  Source:    New component — modeled on existing `ja-btn-primary` class
  Figma style names: N/A (no Figma file for this project)
  Living Token Reference: primary-brand #083386; surface-white #FFFFFF; btn-label Inter/14px/600; btn-primary radius 12px→0 (sidebar bottom cap); btn-primary shadow
  Visual:
    Color:     primary-brand #083386 (bg) + surface-white #FFFFFF (text) — source: brief §8
    Type:      btn-label — Inter / 14px / 600 — source: brief §8
    Spacing (internal):
      padding-x: 0px (w-full, no px needed) — source: brief §13 "flush to sidebar edges"
      padding-y: 0px (height fixed at 48px via h-12) — source: brief §8 btn-horizontal-padding
      gap: 8px (between label and arrow icon) — source: url_extracted existing btn gap
    Spacing (external / positional):
      Positioned at bottom of sidebar, 0px from sidebar bottom edge — source: client Q-01 sticky bottom
      border-top: 1px solid #E5E7EB above the button zone — source: brief §13 "border-t border-gray-200"
    Radius: 0px on button — source: designer judgment (bottom cap of sidebar, full-width, radius would create visual gap with sidebar edges). Existing ja-btn-primary uses 12px but full-width flush buttons conventionally use 0px at container edges.
    Shadow: none on button itself — source: structural partition direction, no elevation
  States:
    Default: bg #083386, text #FFFFFF
    Hover: DaisyUI btn hover treatment (slight brightness reduction or opacity) — source: brief §14
    Focus: ring-2 ring-ja-ocean ring-offset-2 — source: brief §14 / existing pattern
  Copy: "Go to Job Application" + right-arrow `<img>` element — source: brief §11 locked strings; url_extracted (arrows are img elements in existing CTAs)
  Visibility: Rendered only when current page is in Practice section (Requirements or Challenge 1–10). Conditionally rendered via React state or route check. — source: client Q-04

---

**AI Red Team accordion — /home return state — P1**
  Source:    Existing component (ModuleAccordion) — behavior modification only
  Visual:
    Collapsed state: Header row only visible ("AI Red Team | IN PROGRESS | 2.0 HOURS"). Learn/Advance/Get Hired cards and "Dive In" button hidden.
    Expanded state: Full content visible — no change to expanded state treatment.
  Behavior:
    Trigger: User navigates to /home from an AI Red Team module page (referrer check or router history)
    Action: Set accordion to collapsed state on /home component mount
    Animation: None (Direction A — silent collapse)
    Scope: Only triggered on return from AI Red Team module. All other /home arrivals: unchanged behavior.
  Source: client Q-05; brief §13 home page spec; brief §15 accordion trigger

---

SECONDARY SCREEN: /home — AI Red Team collapsed

LAYOUT
Identical to current /home layout. Only change: AI Red Team module card renders with `expanded = false` on return from AI Red Team module pages.

ABOVE THE FOLD (post-collapse)
  First attention:  "Welcome to July AI!" onboarding card (top)
  Second attention: "AI Red Team" module header row (collapsed — header only)
  Third attention:  "Red Team Sample Submission" module card — now visible without scrolling

No visual changes to Red Team Sample Submission card, other modules, or page chrome.
