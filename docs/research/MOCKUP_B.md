————————————————————————————————————————————————————
DIRECTION: Direction B — "Elevated Anchor"
SCREEN: Red Teaming - Beginner (Practice Page) — Sidebar
Status: MODIFIED
Priority: P0
Brief reference: §13 "AI Red Team sidebar — with new button (Practice pages only)"
Asset sources: screenshot: learning-module-desktop.png; brief §8 Design Token Record; brief §13 layout diagram; brief §14 interaction states
Goal thread connection: Elevated persistent button enables one-click return to Red Team Sample Submission; entry animation ensures the button is noticed on first arrival (brief §4 primary metric)
————————————————————————————————————————————————————

VISUAL LAYOUT RENDER — Direction B — Practice Page Sidebar — MODIFIED

```html
<div style="display:flex;font-family:Inter,sans-serif;font-size:13px;background:#f3f4f6;padding:24px;gap:24px;align-items:flex-start">

  <!-- SIDEBAR -->
  <div style="width:256px;background:#fff;border:1px solid #E5E7EB;border-radius:6px;overflow:hidden;display:flex;flex-direction:column;height:560px;flex-shrink:0;position:relative">

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

    <!-- ZONE 2: Elevated anchor — NEW -->
    <div style="flex-shrink:0;padding:12px 16px;background:#fff;box-shadow:0 -2px 8px rgba(0,0,0,0.06)">
      <button style="width:100%;height:48px;background:rgb(8,51,134);color:#fff;border:none;font-size:14px;font-weight:600;font-family:Inter,sans-serif;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;border-radius:12px">
        Go to Job Application
        <span style="font-size:16px">→</span>
      </button>
      <!-- AMBER ANNOTATION -->
      <div style="background:#D97706;color:#fff;font-size:10px;padding:3px 8px;text-align:center;margin-top:4px;border-radius:3px">
        ★ NEW: Elevated anchor — px-4 py-3 wrapper, box-shadow 0 -2px 8px rgba(0,0,0,0.06), 200ms slide-in on first Practice visit
      </div>
    </div>
  </div>

  <!-- ANNOTATION PANEL -->
  <div style="flex:1;font-size:12px;color:#374151;line-height:1.7">
    <div style="font-weight:700;font-size:13px;margin-bottom:12px;color:#D97706">Direction B — "Elevated Anchor"</div>
    <div style="margin-bottom:8px"><strong>Zone 1 (scrollable):</strong> existing nav list — no changes</div>
    <div style="margin-bottom:8px"><strong>Zone 2 (elevated, new):</strong> px-4 py-3 wrapper + upward box-shadow + ja-btn-primary button (12px radius)</div>
    <div style="margin-bottom:8px"><strong>Button:</strong> w-full within px-4 wrapper, h-12 (48px), border-radius 12px (matches ja-btn-primary standard)</div>
    <div style="margin-bottom:8px"><strong>Entry animation:</strong> translateY(8px)→0 + opacity(0)→1, 200ms ease-out, once per session</div>
    <div style="margin-bottom:8px"><strong>Accordion (home):</strong> smooth height collapse, 200ms ease-out</div>
    <div style="background:#FEF3C7;padding:8px;border-radius:4px;margin-top:12px"><strong>Distinctive move:</strong> Upward shadow creates a floating layer — universally understood as "this persists while content above scrolls." Button retains its standard 12px radius (not flush) because the padded wrapper provides the visual boundary.</div>
  </div>
</div>
```

SPATIAL SUMMARY:
  Direction:               Direction B — Elevated Anchor
  Layout:                  256px sidebar: scrollable nav (flex:1) + padded elevated footer (flex-shrink:0, py-3 px-4 + h-12 button = ~72px total footer)
  Distinctive layout move: Upward box-shadow on footer zone separates it from the scrolling nav without a hard divider line — creates depth in an otherwise flat sidebar
  New/changed zones:       Elevated footer zone (new). Nav zone (existing, unchanged).
  Proportional note:       Footer zone total height: 12px top padding + 48px button + 12px bottom padding = 72px. All extracted values.

---

EXISTING SCREEN ANALYSIS
  Current state:  Sidebar has scrollable nav filling full height. No bottom zone. No button.
  What works:     Nav list, active states, section headers — preserve all.
  What is broken: No return path from Practice section to Red Team Sample Submission (brief §2 Problem A).

LAYOUT
Two-zone sidebar: scrollable nav (top, flex:1) + elevated padded footer (bottom, flex-shrink:0). The footer zone uses `box-shadow: 0 -2px 8px rgba(0,0,0,0.06)` to create the appearance of floating above the scroll — the shadow rises from the footer, not falls from above. The button inside the footer retains its standard 12px radius because it is inset within a padded container (unlike Direction A where flush edges required 0px radius). Direction B's spatial distinctiveness: depth through shadow, not hard structural partition.

ABOVE THE FOLD
  First attention:  Active challenge item (pink-50 bg + pink-500 left border)
  Second attention: "Go to Job Application →" button in elevated footer — the shadow draws eye toward bottom
  Third attention:  Nav section headers

COMPONENTS

---

**Design Integration Reasoning — "Go to Job Application" button**

1. DISCOVERABILITY: The entry animation (translateY + opacity, 200ms ease-out) on first Practice page visit fires once — it is the most dynamic element in the sidebar at that moment. Users who are visually tracking the page load will notice it. After that, the upward shadow provides passive discoverability.
2. VISUAL BELONGING: Same bg token (#083386), same text token (#FFFFFF), same font (Inter/14px/600), same radius (12px — ja-btn-primary standard). The padded wrapper uses the sidebar's own bg (#FFFFFF) and standard py-3 px-4 spacing. Entirely native.
3. HIERARCHY WEIGHT: The button is the most visually prominent element in the sidebar — filled navy in an otherwise flat white/gray environment. The upward shadow reinforces this prominence without competing with active nav items (which use pink, a distinct color family).
4. INTEGRATION VERDICT: This component reads as native because its padded wrapper uses the same surface (#FFFFFF), its button uses the same tokens as every other primary CTA, and the upward shadow is the only addition — a depth cue, not a decoration.

---

**"Go to Job Application →" button — P0**
  Source:    New component — modeled on existing `ja-btn-primary` class
  Figma style names: N/A
  Living Token Reference: primary-brand #083386; surface-white #FFFFFF; btn-label Inter/14px/600; btn-primary radius 12px; btn-primary shadow rgba(0,0,0,0.05) 0 1 2 0
  Visual:
    Color:     primary-brand #083386 (bg) + surface-white #FFFFFF (text) — source: brief §8
    Type:      btn-label — Inter / 14px / 600 — source: brief §8
    Spacing (internal):
      padding-x: 24px (px-6) — source: brief §8 btn-horizontal-padding
      padding-y: 0px (height fixed at 48px) — source: brief §8
      gap: 8px (label + arrow) — source: url_extracted
    Spacing (external / positional):
      Wrapper: padding 12px 16px (py-3 px-4) — source: url_extracted nav item padding rhythm
      box-shadow on wrapper: 0 -2px 8px rgba(0,0,0,0.06) — source: designer addition (not in brief token record — must be confirmed before implementation)
    Radius: 12px (rounded-xl) — source: brief §8 btn-primary radius (standard ja-btn-primary, preserved because button is inset in padded wrapper)
    Shadow: rgba(0,0,0,0.05) 0px 1px 2px 0px on button itself — source: brief §8 shadow btn-primary
  States:
    Default: bg #083386, text #FFFFFF
    Hover: DaisyUI btn hover — source: brief §14
    Focus: ring-2 ring-ja-ocean ring-offset-2 — source: brief §14
  Animation:
    Entry: translateY(8px) → translateY(0) + opacity(0) → opacity(1), 200ms ease-out, fires once per session on first Practice page mount
    Implementation: CSS transition triggered by class addition on mount; sessionStorage flag prevents re-triggering — source: designer specification (not in brief; must be confirmed by engineering)
  Copy: "Go to Job Application" + right-arrow `<img>` — source: brief §11; url_extracted
  Visibility: Practice section pages only — source: client Q-04

---

**AI Red Team accordion — /home return — smooth collapse — P1**
  Source:    Existing component — behavior modification
  Behavior:
    Trigger: User navigates to /home from AI Red Team module page (referrer check)
    Animation: CSS height transition: max-height [expanded] → 0, opacity 1 → 0, 200ms ease-out
    Scope: Only on return from AI Red Team module — source: client Q-05
  Visual:
    Collapsed state: Header row only. Accordion content collapses smoothly, not instantly.
    No other visual changes.
  Implementation note: max-height animation requires a known max-height value for the expanded state. Engineering must measure and set this. Alternative: use a JS-driven height animation if CSS-only max-height is unreliable.

---

SECONDARY SCREEN: /home — AI Red Team animated collapse

LAYOUT
Identical to current /home. On return from AI Red Team module: AI Red Team accordion content animates to collapsed state (200ms ease-out height + opacity). Red Team Sample Submission card becomes visible as accordion content folds away.

ABOVE THE FOLD (post-collapse, after animation)
  First attention:  "Welcome to July AI!" card (top)
  Second attention: "AI Red Team" collapsed header row
  Third attention:  "Red Team Sample Submission" module card — visible, COMPLETED status
