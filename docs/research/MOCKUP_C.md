————————————————————————————————————————————————————
DIRECTION: Direction C — "Wayfinding Signal"
SCREEN: Red Teaming - Beginner (Practice Page) — Sidebar
Status: MODIFIED
Priority: P0
Brief reference: §13 "AI Red Team sidebar — with new button (Practice pages only)"
Asset sources: screenshot: learning-module-desktop.png; brief §8 Design Token Record; brief §11 copy guide; brief §13 layout diagram
Goal thread connection: Micro-label pre-frames the button as a "next step," reducing hesitation before clicking; flash on /home draws attention to the newly visible Red Team Sample Submission card (brief §4 primary metric)
————————————————————————————————————————————————————

VISUAL LAYOUT RENDER — Direction C — Practice Page Sidebar — MODIFIED

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
      <div style="padding:10px 16px;display:flex;align-items:center;gap:8px;color:#374151;font-size:13px;border-bottom:1px solid #F3F4F6">
        <div style="width:16px;height:16px;background:#E5E7EB;border-radius:50%"></div>
        <span>Learning Material - Beginner</span>
        <span style="margin-left:auto;color:#9CA3AF">›</span>
      </div>
      <div style="padding:12px 16px;display:flex;align-items:center;gap:8px;background:#F9FAFB;font-size:13px;border-bottom:1px solid #E5E7EB">
        <div style="width:16px;height:16px;background:#E5E7EB;border-radius:50%"></div>
        <span style="font-weight:500">Red Teaming Beginner</span>
        <span style="margin-left:auto;color:#9CA3AF">∨</span>
      </div>
      <div style="padding:10px 16px;display:flex;align-items:center;gap:8px;color:#6B7280;font-size:12px">
        <div style="width:14px;height:14px;background:#E5E7EB;border-radius:2px"></div>
        <span>Previous Conversations</span>
      </div>
      <div style="padding:8px 16px;display:flex;align-items:center;gap:6px">
        <div style="width:12px;height:12px;background:#E5E7EB;border-radius:2px"></div>
        <span style="font-size:11px;font-weight:600;letter-spacing:0.08em;color:#9CA3AF;text-transform:uppercase">Practice</span>
      </div>
      <div style="padding:10px 16px;display:flex;align-items:center;gap:8px;color:#374151;font-size:12px">
        <div style="width:14px;height:14px;border:1.5px solid #D1D5DB;border-radius:50%"></div>
        <span>Requirements</span>
      </div>
      <div style="padding:10px 16px;display:flex;align-items:center;gap:8px;color:#374151;font-size:12px">
        <div style="width:14px;height:14px;border:1.5px solid #D1D5DB;border-radius:50%"></div>
        <span>Challenge 1</span>
      </div>
      <div style="padding:10px 16px;display:flex;align-items:center;gap:8px;color:#374151;font-size:12px">
        <div style="width:14px;height:14px;border:1.5px solid #D1D5DB;border-radius:50%"></div>
        <span>Challenge 2</span>
      </div>
      <div style="padding:10px 16px;display:flex;align-items:center;gap:8px;font-size:12px;background:#FDF2F8;border-left:4px solid #EC4899;color:#374151">
        <div style="width:14px;height:14px;border:1.5px solid #EC4899;border-radius:50%"></div>
        <span style="font-weight:500">Challenge 3</span>
      </div>
      <div style="padding:10px 16px;color:#9CA3AF;font-size:11px;font-style:italic">Challenge 4 – 10...</div>
    </div>

    <!-- ZONE 2: Wayfinding footer — NEW -->
    <div style="flex-shrink:0;border-top:1px solid #E5E7EB;padding:10px 16px 14px">
      <!-- Micro-label -->
      <div style="font-size:10px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#9CA3AF;margin-bottom:8px">
        ⚠ NEXT STEP
      </div>
      <!-- Button -->
      <button style="width:100%;height:48px;background:rgb(8,51,134);color:#fff;border:none;font-size:14px;font-weight:600;font-family:Inter,sans-serif;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;border-radius:12px">
        Go to Job Application
        <span style="font-size:16px">→</span>
      </button>
      <!-- AMBER ANNOTATION -->
      <div style="background:#D97706;color:#fff;font-size:10px;padding:3px 8px;text-align:center;margin-top:4px;border-radius:3px">
        ★ NEW: Wayfinding footer — micro-label (10px caps gray-400) + ja-btn-primary. ⚠ "NEXT STEP" copy not confirmed by client.
      </div>
    </div>
  </div>

  <!-- ANNOTATION PANEL -->
  <div style="flex:1;font-size:12px;color:#374151;line-height:1.7">
    <div style="font-weight:700;font-size:13px;margin-bottom:12px;color:#D97706">Direction C — "Wayfinding Signal"</div>
    <div style="margin-bottom:8px"><strong>Zone 1 (scrollable):</strong> existing nav list — no changes</div>
    <div style="margin-bottom:8px"><strong>Zone 2 (wayfinding, new):</strong> border-t + micro-label "NEXT STEP" + ja-btn-primary button</div>
    <div style="margin-bottom:8px"><strong>Micro-label:</strong> text-[10px], tracking-widest, uppercase, text-gray-400 (#9CA3AF) — ambient wayfinding, not a command</div>
    <div style="margin-bottom:8px"><strong>Button:</strong> w-full within px-4 wrapper, h-12 (48px), border-radius 12px</div>
    <div style="margin-bottom:8px"><strong>Animation:</strong> none on sidebar. /home: instant accordion collapse + 150ms bg-gray-50 flash on Red Team Sample Submission header</div>
    <div style="background:#FEF3C7;padding:8px;border-radius:4px;margin-top:12px"><strong>Distinctive move:</strong> The typographic scale contrast (10px caps vs. 14px button) creates a small but deliberate hierarchy — the label reads as ambient wayfinding, the button reads as the action. <span style="color:#B45309">⚠ "NEXT STEP" requires client confirmation before implementation.</span></div>
  </div>
</div>
```

SPATIAL SUMMARY:
  Direction:               Direction C — Wayfinding Signal
  Layout:                  256px sidebar: scrollable nav (flex:1) + wayfinding footer (flex-shrink:0, pt-10px + 14px micro-label + 8px gap + 48px button + pb-14px = ~94px total)
  Distinctive layout move: Two-line footer (micro-label + button) adds typographic hierarchy to the action zone — a designer-specified editorial layer within the sidebar
  New/changed zones:       Wayfinding footer (new). Nav zone (existing, unchanged).
  Proportional note:       Micro-label height ~14px (10px font + 4px line-height). Gap between label and button: 8px. Button height: 48px. All values derived from existing spacing rhythm.

---

EXISTING SCREEN ANALYSIS
  Current state:  Sidebar has scrollable nav filling full height. No bottom zone. No button.
  What works:     Nav list, active states, section headers — preserve all.
  What is broken: No return path from Practice section to Red Team Sample Submission (brief §2 Problem A).

LAYOUT
Two-zone sidebar: scrollable nav (top) + wayfinding footer (bottom). The footer has three elements: `border-t border-gray-200` divider, `NEXT STEP` micro-label, `Go to Job Application →` button. The micro-label is in `text-[10px] tracking-widest uppercase text-gray-400` — it is intentionally at the edge of legibility, functioning as structural wayfinding rather than readable copy. Direction C's spatial distinctiveness: the footer zone communicates "you are at a decision point" through typography, not just through button prominence.

ABOVE THE FOLD
  First attention:  Active challenge item (pink-50 + pink-500 left border)
  Second attention: "Go to Job Application →" button (filled navy)
  Third attention:  "NEXT STEP" micro-label (ambient, below primary attention)

COMPONENTS

---

**Design Integration Reasoning — "Go to Job Application" button + micro-label**

1. DISCOVERABILITY: Attention in the sidebar moves top-to-bottom. The micro-label appears before the button — it pre-frames the button's purpose for users whose eye reaches the footer zone. Users who see only the button (without reading the label) still have sufficient information from the button label alone.
2. VISUAL BELONGING: Micro-label uses `text-gray-400` (#9CA3AF) — the same gray used for collapsed section labels and timestamps elsewhere in the sidebar. It belongs to the same visual language as ambient structural elements. The button uses identical ja-btn-primary tokens.
3. HIERARCHY WEIGHT: The micro-label is visually recessive (10px, light gray). The button is dominant (48px, filled navy). There is no competition — the label informs, the button acts.
4. INTEGRATION VERDICT: This component reads as native because both the micro-label color and the button tokens are drawn from existing sidebar elements. The only addition is the typographic pairing, which is an editorial move within the existing type scale.

---

**"NEXT STEP" micro-label — P1**
  ⚠ DESIGNER-ADDED COPY — not confirmed by client. Must be confirmed before implementation. If declined, Direction C reverts to Direction A footer structure.
  Source:    New element — designer addition
  Visual:
    Color:     #9CA3AF (text-gray-400) — source: url_extracted sidebar ambient text color
    Type:      10px / 600 / tracking-widest / uppercase — source: designer specification matching existing PRACTICE label pattern (text-xs tracking-widest uppercase) but smaller
    Spacing (internal):
      No padding — inherits wrapper padding (px-4)
    Spacing (external):
      margin-bottom: 8px (gap between label and button) — source: url_extracted standard gap
  Copy:      "NEXT STEP" — source: designer-added (unconfirmed)

---

**"Go to Job Application →" button — P0**
  Source:    New component — modeled on existing `ja-btn-primary` class
  Figma style names: N/A
  Living Token Reference: primary-brand #083386; surface-white #FFFFFF; btn-label Inter/14px/600; btn-primary radius 12px; btn-primary shadow
  Visual:
    Color:     primary-brand #083386 (bg) + surface-white #FFFFFF (text) — source: brief §8
    Type:      btn-label — Inter / 14px / 600 — source: brief §8
    Spacing (internal):
      padding-x: 24px (px-6) — source: brief §8
      padding-y: 0px (height fixed at 48px) — source: brief §8
      gap: 8px — source: url_extracted
    Spacing (external / positional):
      Wrapper: padding 10px 16px top + 14px bottom (px-4, pt-2.5, pb-3.5) — source: designer specification
      border-top: 1px solid #E5E7EB above wrapper — source: brief §13
    Radius: 12px — source: brief §8 (standard ja-btn-primary, button is inset in wrapper)
    Shadow: rgba(0,0,0,0.05) 0px 1px 2px 0px — source: brief §8
  States: Default (navy), Hover (DaisyUI), Focus (ring-2 ring-ja-ocean) — source: brief §14
  Copy: "Go to Job Application" + right-arrow `<img>` — source: brief §11; url_extracted
  Visibility: Practice section pages only — source: client Q-04

---

**AI Red Team accordion — /home return — instant collapse + flash signal — P1**
  Source:    Existing component — behavior modification
  Behavior:
    Trigger: User navigates to /home from AI Red Team module page
    Accordion: Collapses instantly (no height animation — same as Direction A)
    Flash signal: Red Team Sample Submission module header row flashes `bg-gray-50` (#F9FAFB) for 150ms on /home mount, then returns to `bg-white` (#FFFFFF). CSS transition on background-color.
    Scope: Flash fires once per return event — source: designer specification
    ⚠ Flash signal is a designer addition not specified in the brief. Must be confirmed before implementation.
  Visual:
    Collapsed AI Red Team: header row only visible
    Red Team Sample Submission header: 150ms bg-gray-50 flash → white (subtle pulse of attention)

---

SECONDARY SCREEN: /home — AI Red Team collapsed + flash

LAYOUT
Identical to current /home. On return from AI Red Team module: instant collapse + 150ms bg-gray-50 flash on Red Team Sample Submission header draws attention to the newly visible card.

ABOVE THE FOLD (post-collapse)
  First attention:  "Welcome to July AI!" card
  Second attention: "AI Red Team" collapsed header row
  Third attention:  "Red Team Sample Submission" — briefly flashed bg-gray-50, then static white — visible in viewport

---

**⚠ UNCONFIRMED ELEMENTS IN THIS DIRECTION — must be confirmed before Prototyper Agent begins:**
1. `NEXT STEP` micro-label copy — designer addition, not in brief §11 locked strings
2. bg-gray-50 flash on Red Team Sample Submission header — designer addition, not in brief §13 or §14
3. If either is declined by client, Direction C reduces to Direction A (divider + button, silent collapse)
