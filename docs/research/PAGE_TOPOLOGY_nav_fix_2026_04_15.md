# PAGE TOPOLOGY — Previous Conversations (Red Team Sample Submission)
**URL:** https://app.gojuly.ai/learning/8677bb41-e677-4995-8cc0-9b5d38d934e0?type=practice-overview  
**Captured:** 2026-04-15  
**Viewport:** 1440×900 desktop

---

## Shell Layers (fixed / sticky)

| Layer | Element | Position | z-index | Notes |
|---|---|---|---|---|
| Top nav bar | `.navbar` div | sticky top:0 | 2147483647 | height 76px, bg white, 2px border #dadde7, br 0 0 16px 16px, px 24px |
| Left sidebar | `aside`/complementary | fixed left:0 | — | width 256px, bg white, padding-top 16px, transition 0.15s cubic-bezier(0.4,0,0.2,1) |

## Left Sidebar Structure (top-to-bottom)

1. **Collapse button** — icon button top of sidebar
2. **Module title** — "Red Team Sample Submission", 14px bold, with back arrow
3. **Navigation list:**
   - `Sample Submission` (expandable group, currently open)
     - **MENU section** (label)
       - Success Criteria
       - Examples of Successful Attacks
       - Previous Conversations ← active (bg-pink-50 #fdf2f8, border-l-4 pink-500 #ec4899)
     - **Previous Conversations** ← second active indicator (same treatment — duplicate nav entry)
     - **CHALLENGES (REQUIRED) section**
       - Challenge 1
       - Challenge 2
       - Challenge 3

## Main Content Area (scrollable, offset left 256px)

### Section 1 — Page Header
- Text: **"Practice Sets"** (misleading title for a "Previous Conversations" view)
- Style: `ja-module-title`, 24px/600, color oklch(0.278, 0.03, 257) ≈ #1e2a40
- INTERACTION MODEL: static

### Section 2 — Challenge Cards (accordion)
Three `.collapse.collapse-arrow` cards stacked vertically. Each:

**Collapsed:**
- Container: bg white, border 2px #dadde7, br 12px
- Header `.collapse-title`: 14px/600, padding 12px 48px 12px 16px
  - Challenge icon (32px circle, dark navy bg)
  - Challenge name + Continue arrow + SUBMITTED badge
  - Description text beneath
- "View Attempts" toggle text at bottom

**Expanded (after "View Attempts" click):**
- `.collapse-open.rounded-b-xl`: border-t-0, appended table section
- `table.table-zebra.table-fixed` with 4 columns

| Column | Style |
|---|---|
| Attempted On | 14px/600, date string + → arrow icon |
| Progress | SUBMITTED (green badge) or RESET |
| Result | GUARDED + shield icon, or empty |
| Share | "Copy share link" icon button |

Row height: 61px. Cursor: pointer. INTERACTION MODEL: click-driven (opens new tab).

### Section 3 — Attempt Result States

| State | Progress | Result | Color |
|---|---|---|---|
| SUBMITTED + GUARDED | Green badge #a2e8a5, text #083386, br 6px | Shield icon + "GUARDED" | Green/navy |
| RESET | Neutral badge | — | Gray |

---

## Mobile Behavior (390px)
- Sidebar overlaps main content — table columns get severely clipped
- "Attempted On" column truncated, dates wrap
- Table unusable without horizontal scroll

---

## Navigation Flow

```
Module → Previous Conversations tab (type=practice-overview)
  └─ 3 challenge cards (collapsed)
       └─ [click "View Attempts"] → expand inline table
            └─ [click row] → new tab: /collections/:id/feedback/:attemptId
                 └─ Conversation detail: chat + annotation panel + feedback panel
```

## Data Observed (Challenge 1 — 8 attempts)

| Date | Progress | Result |
|---|---|---|
| Mar 9, 2026, 9:52 AM | SUBMITTED | GUARDED |
| Mar 9, 2026, 9:46 AM | SUBMITTED | GUARDED |
| Mar 6, 2026, 12:44 PM | SUBMITTED | GUARDED |
| Feb 14, 2026, 3:51 PM | RESET | — |
| Feb 5, 2026, 2:08 PM | RESET | — |
| Nov 1, 2025, 3:00 PM | RESET | — |
| Oct 31, 2025, 4:39 PM | RESET | — |
| Oct 13, 2025, 9:34 AM | SUBMITTED | GUARDED |
