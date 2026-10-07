# Sample Lab Report Preview Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build an interactive "Sample WhatsApp Lab Report" preview feature using the client's official SV Care letterhead template to demonstrate report authenticity, doctor acceptance, and same-day digital delivery.

**Architecture:** Extract and render the client's letterhead PDF at high resolution using PDFium, construct clinical sample data (CBC, Glucose, HbA1c, Lipid Profile) matching SV Care standards, and build a responsive preview card in `HomeCollection.tsx` connected to a high-definition zoomable lightbox modal (`SampleReportModal.tsx`) with instant WhatsApp booking actions.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, pypdfium2 (asset processing), Next/Image.

---

### Task 1: Asset Preparation & Clinical Data Schema

**Files:**
- Create: `public/letterhead.pdf` (copied from client upload `media_1791367313707.pdf`)
- Create: `public/sample-report.jpg` (3× high-resolution rendered letterhead with clinical test overlay or background)
- Modify: `src/data/site.ts` (Add `SAMPLE_REPORT` metadata)

**Step 1: Copy PDF asset to `public/letterhead.pdf`**
```powershell
Copy-Item "C:\Users\kamil\.gemini\antigravity-ide\brain\34cdf523-fb3c-46a5-93f3-096bc17d72b9\.user_uploaded\media_1791367313707.pdf" "public/letterhead.pdf" -Force
```

**Step 2: Render high-resolution template with Python PDFium**
Generate `public/letterhead-bg.jpg` at 3× scale (1787 × 2527 px) and synthesize the sample patient report.

**Step 3: Define `SAMPLE_REPORT` constant in `src/data/site.ts`**
Include:
- Patient Name, Age, Sex, Patient ID (`SVC-2026-0842`), Sample ID (`#B-48192`)
- Collection time (`06:30 AM`), Reported time (`10:45 AM`)
- Test results: Fasting Blood Sugar, HbA1c, Serum Creatinine, Total Cholesterol, Hemoglobin
- Turnaround time (`4 to 6 Hours via WhatsApp PDF`)
- Doctor acceptance statement (`Accepted by all hospitals and clinics`)

**Step 4: Verify TypeScript compilation**
Run: `npx tsc --noEmit`
Expected: 0 errors.

---

### Task 2: Build `SampleReportModal.tsx` Lightbox Component

**Files:**
- Create: `src/components/SampleReportModal.tsx`

**Features:**
- Modal backdrop (`z-[70]`) with blur and click-outside dismissal
- Zoom controls (`−`, `100% Reset`, `+` up to 250%)
- Pan & scroll on zoomed canvas for mobile touch
- Patient assurance footer:
  - Password protection info (`DOB as password`)
  - "Accepted by All Doctors & Hospitals" badge
  - Direct WhatsApp booking button with prefilled message
- Accessible keyboard navigation (`Escape` key listener)

**Verification:**
Run: `npx tsc --noEmit`
Expected: 0 errors.

---

### Task 3: Integrate Showcase Card into `HomeCollection.tsx`

**Files:**
- Modify: `src/components/HomeCollection.tsx`

**Changes:**
- Update Step 03 ("Same-day verified report") to feature an interactive visual badge: `View Sample Report ↗`.
- Add an eye-catching interactive showcase section between the 3 steps and the coverage banner:
  - Left column: Realistic letterhead report preview thumbnail with hover zoom effect and "Click to inspect report" prompt.
  - Right column: 4 Patient Trust Guarantees:
    1. **Doctor & Hospital Accepted**: Validated by certified pathologists under ISO 9001:2015 QMS standards.
    2. **WhatsApp Digital PDF in 4–6 Hours**: Delivered directly to your phone as a password-protected PDF.
    3. **Historical Comparison**: Automatically track past blood sugar and lipid values across visits.
    4. **QR Code Authenticity**: Instant digital verification prevents tampering.
  - Action buttons: `Inspect Full Sample Report` (opens modal) + `Book Test Collection on WhatsApp`.

**Verification:**
Run: `npm run build`
Expected: Static build passes with 0 errors.

---

### Task 4: Responsive Mobile Verification

**Files:**
- Test viewports: 390px (iPhone 14/15), 768px (iPad/Tablet), 1280px (Desktop)

**Checklist:**
1. Thumbnail card fits comfortably on 360–390px mobile screens without horizontal page scroll.
2. Lightbox opens cleanly with `z-[70]` above sticky navbar (`z-50`) and mobile bar (`z-40`).
3. Zoom in (`150%`, `200%`) works smoothly and allows scrolling through the clinical test parameters.
4. "Book Home Visit" CTA in the sample report modal opens WhatsApp with the right pre-filled message.

---

### Task 5: Final Git Commit & Remote Push

**Commands:**
```bash
git add .
git commit -m "feat: add interactive sample lab report preview using official letterhead template"
git push origin main
```
