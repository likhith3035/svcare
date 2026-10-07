# Telugu Sentence-Level Toggle & Compact Modern Navbar Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Implement a sentence/section-level Telugu language toggle allowing patients to read instructions, guidelines, and guarantees in natural Telugu without completely altering the website language, while slimming down and modernizing the main navbar UI.

**Architecture:** 
1. Create a centralized Telugu translation dictionary `src/data/telugu.ts` containing conversational, authentic Telugu text for key sections (Hero, Prescription Upload, Fasting Guidelines, Home Collection, and Booking).
2. Create a lightweight `LanguageContext` / custom state store that manages both individual section toggles (`hero`, `prescription`, `fasting`, `homeCollection`, `booking`) and a global toggle preference, persisted in `localStorage`.
3. Provide an elegant inline micro-toggle `[🌐 తెలుగు / Eng]` on each key informational card so users can toggle individual things at will ("they can change with each things").
4. Modernize and slim down `Navbar.tsx` from `h-16 sm:h-18` (64-72px) to `h-13 sm:h-14` (52-56px), with a glassmorphism backdrop, refined logo scale, compact link pills, inline language switch, and streamlined mobile drawer.
5. Adjust `Hero.tsx` top padding to match the reduced navbar height.

**Tech Stack:** Next.js 16 (Turbopack), React 19, TypeScript, Tailwind CSS v4, LocalStorage.

---

### Task 1: Create Centralized Telugu Translation Dictionary (`src/data/telugu.ts`)

**Files:**
- Create: `src/data/telugu.ts`

**Details:**
Define clear, culturally authentic Telugu translations paired with English keys for:
- Hero: Main headline, doorstep proposition, and Srikalahasti reassurance.
- Prescription Upload: Explanation of snapping a handwritten slip photo on WhatsApp for instant quote.
- Fasting Guidelines: Plain-language instructions for FBS, Lipid Profile, HbA1c, CBC, Thyroid, and Urine (emphasizing water is allowed, tablets timing, etc.).
- Home Collection: 3-step doorstep process and report turnaround guarantees.
- Booking: Elderly parents care notes and payment-on-collection guarantee.

---

### Task 2: Create Flexible Language Store (`src/context/LanguageContext.tsx`)

**Files:**
- Create: `src/context/LanguageContext.tsx`
- Modify: `src/app/layout.tsx` (wrap children in LanguageProvider)

**Details:**
- Store:
  - `isTelugu(sectionId: string): boolean`
  - `toggleSection(sectionId: string): void`
  - `globalTelugu: boolean`
  - `toggleGlobal(): void`
- Allows toggling specific components individually ("without total changing website language they can change with each things"), plus a top-level toggle that switches all sections at once if desired.
- Persist state to `localStorage` safely with SSR fallback.

---

### Task 3: Compact and Modernize Navbar UI (`src/components/Navbar.tsx`)

**Files:**
- Modify: `src/components/Navbar.tsx`
- Modify: `src/components/Hero.tsx` (adjust `pt-` spacing to align with slim navbar)

**Details:**
- Reduce bar height from `h-16 sm:h-18` (64px/72px) down to `h-13 sm:h-14` (52px/56px).
- Refine logo height to `h-7.5 sm:h-8.5`.
- Modern frosted glass background (`bg-white/92 backdrop-blur-md border-b border-slate-200/70 shadow-2xs`).
- Nav links: sleek rounded pill hover state (`text-[13px] font-semibold text-slate-600 hover:text-navy hover:bg-slate-100/70 rounded-full px-3 py-1.5 transition-all`).
- Add inline language switcher pill: `[EN | తె]` in navbar right section.
- Keep live status indicator compact: `🟢 6 AM – 8 PM`.
- Adjust Hero top spacing from `pt-32 sm:pt-40` to `pt-28 sm:pt-34`.

---

### Task 4: Integrate Inline Telugu Toggles in Key Sections

**Files:**
- Modify: `src/components/Hero.tsx`: Add inline `[🌐 తెలుగు]` toggle chip next to headline and prescription helper.
- Modify: `src/components/Tests.tsx`: Add inline `[🌐 తెలుగు]` toggle chip on Doctor Prescription Upload banner and Pre-Test Fasting Guide accordion.
- Modify: `src/components/HomeCollection.tsx`: Add inline `[🌐 తెలుగు]` toggle chip on 3-step collection workflow and clinical guarantees.
- Modify: `src/components/Booking.tsx`: Add inline `[🌐 తెలుగు]` toggle chip on Prescription sidebar card and Booking For elderly care notes.

---

### Task 5: Verification & Mobile Responsiveness

**Steps:**
1. Run `npx tsc --noEmit` to verify type safety.
2. Run `npm run build` to confirm Turbopack production compilation.
3. Verify interactive behavior in browser (toggle Telugu on individual cards, verify text updates, verify navbar height and mobile drawer).
4. Verify horizontal overflow safety (`scrollWidth <= innerWidth`).
5. Commit and push to Git repository.
