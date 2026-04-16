# BEHAVIORS — Previous Conversations (Red Team Sample Submission)
**URL:** https://app.gojuly.ai/learning/8677bb41-e677-4995-8cc0-9b5d38d934e0?type=practice-overview  
**Captured:** 2026-04-15

---

## Scroll Sweep
- Top nav: sticky, does not change on scroll (no scroll-driven state changes observed)
- Sidebar: fixed, no scroll-driven behaviors
- Main content: standard scroll, no scroll-snap, no animation-on-scroll observed

## Click Sweep

### Sidebar "Previous Conversations" click
- INTERACTION MODEL: route-level (already active, no change)
- Active state: bg-pink-50 (#fdf2f8) + border-l-4 border-pink-500 (#ec4899)
- Non-active state: transparent bg, no left border

### Challenge card "View Attempts" click
- INTERACTION MODEL: click-driven toggle (DaisyUI collapse component)
- State A (collapsed): table hidden, `collapse-arrow` shows `>`
- State B (expanded): `.collapse-open` appended, table visible, arrow rotates
- Transition: DaisyUI grid-row CSS transition (~150ms)
- NOTE: each card expands independently; multiple can be open simultaneously

### Table row click
- INTERACTION MODEL: click-driven navigation
- Opens new tab: `/collections/:collectionId/feedback/:attemptId`
- No visual state change on the source row after click (no "visited" treatment)

### "Copy share link" button
- INTERACTION MODEL: clipboard copy on click
- No observed visual feedback captured (toast may appear)

## Hover Sweep

### Table rows
- Cursor changes to pointer
- No background color change observed in static extraction (zebra table provides alternating #f8fafc rows)

### Sidebar items
- `hover:cursor-pointer` applied
- No observed color change extracted

## Responsive Sweep

| Breakpoint | Behavior |
|---|---|
| 1440px | Full layout — sidebar fixed 256px, table 748px wide |
| 390px | Sidebar overlaps content — table columns severely clipped; dates wrap and overflow |

## Component States Confirmed

| Component | States confirmed |
|---|---|
| Challenge card | collapsed / expanded |
| Sidebar nav item | active (pink) / default (transparent) |
| Table row | default / hover (pointer only) |
| Progress badge | SUBMITTED (green) / RESET (neutral) |
| Result badge | GUARDED (shield icon + text) / empty |

## Component States Unconfirmed
- Table row hover background color (requires JS hover trigger)
- FAILED / SUCCEEDED result states (not present in live data)
- "Copy share link" toast feedback
- Sidebar collapse animation (full width → 0)
