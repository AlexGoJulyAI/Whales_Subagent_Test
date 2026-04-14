# Component Spec: gojuly-ux-v12 — Home Page (Screen 2)
*Extracted from live authenticated GoJuly pages via Playwright CDP, 2026-04-12*
*Source: DESIGN_SYSTEM.md (live extraction). Screenshot: docs/design-references/v12-home-full.png*

---

## Overview

Full page layout for the GoJuly AI Home dashboard. Shows 6 track cards.
This is Screen 2 of the 2-screen gojuly-ux-v12 prototype.
Delta 2: AI Red Team card (card #2) is collapsed by default.

---

## LIVING TOKEN REFERENCE

(Same as Learning page spec — see v12-learning-page.spec.md)

---

## COMPONENT 1: Navbar (same as Learning page)

See v12-learning-page.spec.md Component 1. Exact same navbar.

---

## COMPONENT 2: Page Layout

```html
<div class="min-h-screen bg-[#eeeeee]">
  <!-- navbar sticky top-0 -->
  <main class="max-w-3xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-6">Hey, Alex!</h1>
    <!-- track cards here -->
  </main>
</div>
```

---

## COMPONENT 3: Track Cards

All cards share this base style:
```
background: rgb(255,255,255)
border: 1px solid rgb(229,231,235)
border-radius: 8px (rounded-lg)
box-shadow: rgba(0,0,0,0.05) 0px 1px 2px 0px (shadow-sm)
margin-bottom: 24px (mb-6)
```

### Card Header Row (clickable for cards 2,4,5,6):
```html
<div class="flex items-center justify-between py-4 px-4 cursor-pointer" onClick={toggle}>
  <div class="flex items-center gap-3">
    <img src="/images/{icon}" style={{width:'52px',height:'52px'}} class="shrink-0 object-contain" />
    <div>
      <h2 class="text-xl font-bold my-0 mb-1 text-gray-900">{title}</h2>
      <div class="flex items-center gap-2">
        <span class="text-xs font-semibold px-2 py-1 rounded" style={{background: badge.bg, color: badge.color}}>
          {badge.label}
        </span>
        {duration && (
          <span class="flex items-center gap-1 text-[10px] text-gray-500">
            ⏱ {duration}
          </span>
        )}
      </div>
    </div>
  </div>
  <div class="flex items-center ml-4">
    {isOpen ? (
      <!-- KeyboardArrowLeft (points left = collapse) -->
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" class="text-gray-500">
        <path d="M15.41 16.59 10.83 12l4.58-4.59L14 6l-6 6 6 6z"/>
      </svg>
    ) : (
      <!-- KeyboardArrowDown (points down = expand) -->
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" class="text-gray-500">
        <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
      </svg>
    )}
  </div>
</div>
```

### Status Badge Styles:
```
IN PROGRESS:  bg rgb(218,222,231)  color rgb(55,65,81)   radius 4px  font-size 10px  font-weight 600  padding 4px 8px
COMPLETED:    bg rgb(162,232,165)  color rgb(8,51,134)   radius 6px  font-size 10px  font-weight 600  padding 4px 8px
NOT STARTED:  bg rgb(218,222,231)  color rgb(55,65,81)   radius 4px  font-size 10px  font-weight 600  padding 4px 8px
```

### Card Expanded Body:
```html
<div class="px-4 mb-4"><div class="border-t border-gray-200"></div></div>
<div class="px-4 pb-4">{body content}</div>
```

---

## CARD INVENTORY (6 cards in order)

### Card 1: Welcome to July AI! (ALWAYS EXPANDED — no toggle)
```
icon: /images/TrackWelcome.svg
badge: IN PROGRESS, bg rgb(218,222,231), color rgb(55,65,81)
duration: 2.5 MINUTES
isOpen: true (no toggle behavior — always shown)
```
Body:
```html
<p class="text-sm text-gray-600 mb-4">
  We are glad you are here to start an exciting journey with us. Start here to get familiar with using the platform.
</p>
<button class="py-2 px-6 bg-[#083386] text-white text-sm font-semibold rounded-xl hover:bg-[#062a70] transition-colors">
  Onboard →
</button>
```

### Card 2: AI Red Team — [DELTA 2: collapsed by default]
```
icon: /images/TrackRedTeam.svg
badge: IN PROGRESS, bg rgb(218,222,231), color rgb(55,65,81)
duration: 2.0 HOURS
isOpen: false  ← DELTA 2: was true on live page, now false
```
Body (shown when expanded):
```html
<p class="text-sm text-gray-600 mb-4">
  Learning what red teaming is and apply your knowledge to guide AI respond outside its safety guard rails
</p>
<div class="rounded-lg p-8" style={{backgroundImage: "url('/images/btn-bg-green.png')"}}>
  <div class="flex gap-4">
    <!-- Learn card -->
    <div class="flex-1 bg-white rounded-lg p-4 text-center">
      <img src="/images/Lightbulb_medium.svg" class="w-16 h-16 mx-auto mb-2" />
      <h3 class="font-bold text-sm mb-1">Learn</h3>
      <p class="text-xs text-gray-600">Build AI red teaming skills, core concepts, and hands on exercises</p>
    </div>
    <!-- Arrow divider -->
    <div class="flex items-center text-white text-2xl">→</div>
    <!-- Advance card -->
    <div class="flex-1 bg-white rounded-lg p-4 text-center">
      <img src="/images/SuccessfulAttack_medium.svg" class="w-16 h-16 mx-auto mb-2" />
      <h3 class="font-bold text-sm mb-1">Advance</h3>
      <p class="text-xs text-gray-600">Progress to real-world scenarios and deeper technical material after a background check and interview</p>
    </div>
    <!-- Arrow divider -->
    <div class="flex items-center text-white text-2xl">→</div>
    <!-- Get Hired card -->
    <div class="flex-1 bg-white rounded-lg p-4 text-center">
      <img src="/images/money_medium.svg" class="w-16 h-16 mx-auto mb-2" />
      <h3 class="font-bold text-sm mb-1">Get Hired</h3>
      <p class="text-xs text-gray-600">Strong performance leads to hiring opportunities for AI red team roles, paying $25-$100 per hour</p>
    </div>
  </div>
</div>
<button class="mt-4 py-2 px-6 bg-[#083386] text-white text-sm font-semibold rounded-xl hover:bg-[#062a70] transition-colors">
  Dive In →
</button>
```

### Card 3: Red Team Sample Submission (ALWAYS EXPANDED — no toggle)
```
icon: /images/SampleSubmissionImage.png
badge: COMPLETED, bg rgb(162,232,165), color rgb(8,51,134)
duration: none
isOpen: true (always expanded)
```
Body:
```html
<div class="rounded-xl p-6 border-4 border-gray-200" style={{backgroundImage: "url('/images/card-bg-peach.png')", backgroundSize: 'cover'}}>
  <div class="flex items-center justify-between mb-2">
    <h3 class="font-bold text-gray-900">Red Team Sample Submission</h3>
    <span class="text-xs font-semibold px-2 py-1 rounded-md" style={{background:'rgb(162,232,165)',color:'rgb(8,51,134)'}}>COMPLETED</span>
  </div>
  <p class="text-sm text-gray-600 mb-4">Click this to submit your red team samples.</p>
  <button class="w-full py-2 bg-[#083386] text-white text-sm font-semibold rounded-xl hover:bg-[#062a70] transition-colors">
    View →
  </button>
</div>
```

### Card 4: AI Fundamentals (collapsed by default)
```
icon: /images/TrackAIFundamentals.svg
badge: IN PROGRESS
duration: 45 MINUTES
isOpen: false
```
Body (when expanded): placeholder content.

### Card 5: Coding Fundamentals (collapsed by default)
```
icon: /images/TrackCodingFundamentals.svg
badge: NOT STARTED
duration: 2.25 HOURS
isOpen: false
```
Body (when expanded): placeholder content.

### Card 6: Exclusive Events (collapsed by default)
```
icon: /images/TrackEventExclusives.svg
badge: none
duration: none
isOpen: false
```
Body (when expanded): placeholder content.

---

## Delta Changes Summary

### Delta 2: AI Red Team card collapsed by default
- **What:** Card #2 starts with isOpen = false instead of isOpen = true
- **Chevron:** Shows KeyboardArrowDown (pointing down) when collapsed
- **Effect:** Red Team Sample Submission (Card #3) is visible without scrolling
- **Toggle:** Click on card header toggles isOpen state

### Interaction Model
- INTERACTION MODEL: click-driven accordion toggle (useState for each card)
- Cards 1 and 3 have no toggle (always expanded)
- Cards 2, 4, 5, 6 have click-toggle behavior

