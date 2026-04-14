# USER JOURNEY — Previous Conversations Redesign (v2)
*GoJuly AI | Red Team Sample Submission Module*

---

## Primary User

**Name:** Alex (AI Red Teamer)
**Context:** Has submitted 9 total conversations across 3 challenges. Wants to reference a specific past attempt to compare strategies or quote evidence for a new submission.
**Entry state:** Frustrated — current page shows generic "Attempt 1/2/3" titles with no way to know what each contains without clicking in.
**Goal:** Find the specific past conversation about "PTSD" or "over-refusal" in under 10 seconds.

---

## Flow: Finding a Past Conversation by Topic

### Step 1 — Entry
- **Trigger:** User clicks "Previous Conversations" in the sidebar
- **Screen state:** Page loads with all 3 challenge sections expanded, 9 conversations visible
- **User sees:** Content-named conversation titles, dates, and status badges — can immediately scan without clicking in
- **Drop-off risk:** If page loads collapsed, user doesn't see conversations immediately
- **Intervention:** All sections open by default

---

### Step 2 — Scan
- **User behavior:** Visually scans the conversation list looking for a title that matches their memory
- **Success path:** They spot "PTSD Validation Scenario" under Challenge 3 and click it
- **Failure path:** They don't see what they need in the visible titles and proceed to search

---

### Step 3 — Search (if scan fails)
- **Trigger:** User clicks the search bar or types
- **Screen state:** Search bar focused, typing filters conversations in real-time
- **User types:** "ptsd" → only "PTSD Validation Scenario" remains visible, with "ptsd" highlighted
- **Success path:** User finds the conversation and clicks it
- **Failure path (no results):** Empty state shows "No conversations match your search" with a clear button to reset

---

### Step 4 — Open Conversation
- **Trigger:** User clicks a conversation item
- **Action:** Navigates to the conversation viewer (out of scope — placeholder behavior)
- **Drop-off risk:** None — this is a single-step exit

---

## Secondary Flow: Browse by Challenge

### Step 1 — Entry
- **User wants:** All conversations from Challenge 2 (over-refusal)
- **Behavior:** Scrolls to the Challenge 2 section (already expanded)
- **User sees:** 3 conversations named "Medical Information Request", "Research Data Query Bypass", "Professional Context Framing"
- **Click:** Clicks the one matching their memory

---

## Edge Cases

| Scenario | Behavior |
|---|---|
| Search returns 0 results | Empty state: "No conversations match "[query]"" + "Clear search" button |
| Search clears | All sections return to default (all expanded) |
| Challenge section collapsed | Click header to expand — chevron animates 90deg |
| All conversations submitted | All items show SUBMITTED badge |

---

## Key Interaction Events

| Event | Response |
|---|---|
| Type in search box | Real-time filter of conversations, keyword highlighted yellow |
| Click challenge header | Toggle expand/collapse with animated chevron |
| Click conversation item | Visual hover highlight (bg-gray-50), navigation placeholder |
| Click "Clear search" | Resets search, restores all conversations |
| Hover conversation row | bg-[#f9fafb] highlight + cursor:pointer |
