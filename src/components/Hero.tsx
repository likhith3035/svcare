"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useOpenStatus } from "@/hooks/useOpenStatus";
import { OFFICIAL_PACKAGES, CONTACT, SITE } from "@/data/site";
import { useLanguage, SectionLangToggle } from "@/context/LanguageContext";
import { TELUGU_CONTENT } from "@/data/telugu";

export default function Hero() {
  const isOpen = useOpenStatus();
  const prefersReducedMotion = useReducedMotion();
  const skip = !!prefersReducedMotion;
  const { isTelugu } = useLanguage();
  const teluguHero = isTelugu("hero");
  const [activeTab, setActiveTab] = useState<"reception" | "packages">("reception");

  function selectAndBook(pkgId: string) {
    const el = document.getElementById("booking");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    window.dispatchEvent(new CustomEvent("select-package", { detail: pkgId }));
  }

  // Feature top 3 popular packages from the flyer in hero selector
  const featuredPackages = [
    OFFICIAL_PACKAGES[0], // Basic Health (₹699)
    OFFICIAL_PACKAGES[1], // Diabetic Package (₹499)
    OFFICIAL_PACKAGES[6], // Women Health (₹999)
  ];

  return (
    <section
      id="hero"
      className="relative bg-gradient-to-b from-[#EEF7F5] via-[#F6FAF9] to-[#F6F9FA] text-foreground pt-28 pb-14 sm:pt-36 sm:pb-20 overflow-hidden border-b border-slate-200/70"
    >
      {/* Subtle clinical blueprint grid */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#1E9C80 1.2px, transparent 1.2px)`,
          backgroundSize: "24px 24px",
        }}
        aria-hidden="true"
      />

      {/* Luminous ambient glow behind right showcase */}
      <div className="absolute top-1/4 right-5 w-[500px] h-[500px] bg-teal/15 rounded-full blur-[110px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full min-w-0">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center w-full min-w-0">
          
          {/* ─── Left Column: Headline, 3 Trust Badges & CTAs ─── */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5 max-w-2xl w-full min-w-0">
            {/* Live Operational Status, ISO Certification & Telugu Language Toggle */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold bg-white/95 border border-slate-200 shadow-2xs text-slate-700 max-w-full">
                <span
                  className={`h-2 w-2 rounded-full shrink-0 ${
                    isOpen ? "bg-emerald-500 animate-pulse" : "bg-red"
                  }`}
                  aria-hidden="true"
                />
                <span className="truncate">
                  {isOpen ? "Open Now • 6 AM – 8 PM" : "Closed • Opens 6 AM"} • Free Pickup
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById("accreditation");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                  window.dispatchEvent(new CustomEvent("open-certificate-modal"));
                }}
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold bg-navy hover:bg-navy-light text-white border border-teal/30 shadow-2xs transition-colors cursor-pointer shrink-0"
                title="View ISO 9001:2015 Official Certificate"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse shrink-0" />
                <span>ISO 9001:2015 ↗</span>
              </button>

              {/* 1-Tap Telugu Toggle for Hero Headline & Promises */}
              <SectionLangToggle section="hero" size="xs" />
            </div>

            {/* Main High-Impact Headline */}
            <h1 className="font-heading text-2xl sm:text-4xl lg:text-[3.15rem] font-bold tracking-tight text-navy leading-[1.2] sm:leading-[1.15] break-words">
              {teluguHero ? (
                <>
                  {TELUGU_CONTENT.hero.headlinePart1}
                  <br className="hidden sm:inline" />
                  <span className="text-teal font-normal italic">
                    {TELUGU_CONTENT.hero.headlinePart2}
                  </span>
                </>
              ) : (
                <>
                  Accurate blood diagnostics,
                  <br className="hidden sm:inline" />
                  <span className="text-teal font-normal italic"> right at your doorstep.</span>
                </>
              )}
            </h1>

            {/* Subtext */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed font-normal">
              {teluguHero ? (
                <>
                  అధికారిక హెల్త్ ప్యాకేజీలు <strong className="text-navy font-bold">₹400</strong> నుంచే • 100+ ల్యాబ్ టెస్టులు <strong className="text-navy font-bold">₹50</strong> నుంచే.
                  శ్రీకాళహస్తిలో ₹0 ఉచిత డోర్‌స్టెప్ కలెక్షన్ తో{" "}
                  <a
                    href="#home-collection"
                    className="text-teal hover:text-teal-dark hover:underline font-bold inline-flex items-center gap-0.5"
                    title="View authentic WhatsApp sample report preview"
                  >
                    <span>అదే రోజు వాట్సాప్ రిపోర్టులు</span>
                    <span className="text-xs font-bold">↗</span>
                  </a>
                  .
                </>
              ) : (
                <>
                  Official health packages starting from <strong className="text-navy font-bold">₹400</strong> • 100+ tests from <strong className="text-navy font-bold">₹50</strong>.
                  Trained phlebotomists collect sterile samples at your home or clinic with{" "}
                  <a
                    href="#home-collection"
                    className="text-teal hover:text-teal-dark hover:underline font-bold inline-flex items-center gap-0.5"
                    title="View authentic WhatsApp sample report preview"
                  >
                    <span>same-day WhatsApp reports</span>
                    <span className="text-xs font-bold">↗</span>
                  </a>
                  .
                </>
              )}
            </p>

            {/* ─── Client Inspired: 3 Key Feature Trust Badges ─── */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-1">
              {/* Badge 1: Quick Response */}
              <div className="p-2.5 sm:p-3 rounded-2xl bg-white/95 border border-slate-200/90 shadow-2xs hover:border-teal/50 hover:shadow-xs transition-all flex flex-col items-center sm:items-start text-center sm:text-left min-w-0">
                <div className="w-8 h-8 rounded-xl bg-teal/10 text-teal flex items-center justify-center mb-1.5 shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span className="text-xs sm:text-sm font-bold text-navy leading-tight truncate w-full">
                  {teluguHero ? TELUGU_CONTENT.hero.quickResponseTitle : "Quick Response"}
                </span>
                <span className="text-[10px] sm:text-xs text-slate-500 mt-0.5 leading-tight hidden xs:block truncate w-full">
                  {teluguHero ? TELUGU_CONTENT.hero.quickResponseDesc : "< 5 Min WhatsApp Reply"}
                </span>
              </div>

              {/* Badge 2: Reliable & Accurate */}
              <div className="p-2.5 sm:p-3 rounded-2xl bg-white/95 border border-slate-200/90 shadow-2xs hover:border-emerald-300 hover:shadow-xs transition-all flex flex-col items-center sm:items-start text-center sm:text-left min-w-0">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-1.5 shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <span className="text-xs sm:text-sm font-bold text-navy leading-tight truncate w-full">
                  {teluguHero ? TELUGU_CONTENT.hero.reliableTitle : "Reliable & Accurate"}
                </span>
                <span className="text-[10px] sm:text-xs text-slate-500 mt-0.5 leading-tight hidden xs:block truncate w-full">
                  {teluguHero ? TELUGU_CONTENT.hero.reliableDesc : "ISO 9001:2015 Certified"}
                </span>
              </div>

              {/* Badge 3: Patient First Approach */}
              <div className="p-2.5 sm:p-3 rounded-2xl bg-white/95 border border-slate-200/90 shadow-2xs hover:border-rose-300 hover:shadow-xs transition-all flex flex-col items-center sm:items-start text-center sm:text-left min-w-0">
                <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-1.5 shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <span className="text-xs sm:text-sm font-bold text-navy leading-tight truncate w-full">
                  {teluguHero ? TELUGU_CONTENT.hero.patientFirstTitle : "Patient-First Care"}
                </span>
                <span className="text-[10px] sm:text-xs text-slate-500 mt-0.5 leading-tight hidden xs:block truncate w-full">
                  {teluguHero ? TELUGU_CONTENT.hero.patientFirstDesc : "Gentle Phlebotomy • ₹0 Draw"}
                </span>
              </div>
            </div>

            {/* Action Buttons: Responsive Stack on Mobile */}
            <div className="space-y-2 sm:space-y-0 sm:flex sm:items-center sm:gap-3 pt-1 w-full min-w-0">
              {/* Primary High-Converting CTA */}
              <a
                href="#booking"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm sm:text-base font-bold text-white
                  bg-red hover:bg-red-hover rounded-xl shadow-md shadow-red/20 transition-all
                  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red
                  active:scale-[0.98] cursor-pointer"
              >
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="truncate">Book Home Collection (₹0 Fee)</span>
              </a>

              {/* Mobile Exploration Shortcuts */}
              <div className="grid grid-cols-2 gap-2 w-full sm:hidden">
                <a
                  href="#packages"
                  className="inline-flex items-center justify-center gap-1.5 py-2.5 px-2.5 rounded-xl text-xs font-bold text-navy bg-white hover:bg-slate-50 border border-slate-200 shadow-2xs transition-colors min-w-0"
                >
                  <span className="truncate">Packages (₹400)</span>
                  <span className="text-teal font-black shrink-0">↓</span>
                </a>
                <a
                  href="#tests"
                  className="inline-flex items-center justify-center gap-1.5 py-2.5 px-2.5 rounded-xl text-xs font-bold text-navy bg-white hover:bg-slate-50 border border-slate-200 shadow-2xs transition-colors min-w-0"
                >
                  <span className="truncate">100 Tests (₹50)</span>
                  <span className="text-teal font-black shrink-0">↓</span>
                </a>
              </div>

              {/* Desktop/Tablet Direct WhatsApp & Phone CTAs */}
              <div className="hidden sm:flex sm:items-center sm:gap-3 shrink-0">
                <a
                  href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent("Hello SV Care Health Diagnostics, I would like to book a blood test appointment.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm sm:text-base font-bold text-white
                    bg-[#1E9C80] hover:bg-[#16856C] rounded-xl shadow-md shadow-teal/20 transition-all
                    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal
                    active:scale-[0.98] cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.69 0-3.259-.52-4.555-1.408l-.327-.194-2.871.852.852-2.871-.194-.327A7.96 7.96 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
                  </svg>
                  <span>WhatsApp</span>
                </a>

                <a
                  href={CONTACT.dialLinks[0]}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-3.5 text-sm font-bold text-slate-700
                    bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-xs transition-all"
                >
                  <svg className="w-4 h-4 text-teal shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>{CONTACT.phonesFormatted[0]}</span>
                </a>
              </div>
            </div>

            {/* Quick Doctor's Prescription WhatsApp Callout */}
            <div className="flex items-center gap-2 text-xs text-slate-700 bg-white/95 border border-teal/30 px-3.5 py-2.5 rounded-2xl shadow-2xs w-full min-w-0">
              <span className="text-base shrink-0">📸</span>
              <span className="truncate font-medium">
                {teluguHero
                  ? TELUGU_CONTENT.hero.prescriptionCallout
                  : "Have a doctor's prescription slip? Snap photo & send:"}
              </span>
              <a
                href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
                  "Hello SV Care Health Diagnostics, I am sharing a photo of my doctor's prescription slip. Please verify the prescribed tests, calculate the discounted total, and schedule doorstep collection."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-teal-dark hover:text-teal hover:underline ml-auto shrink-0 inline-flex items-center gap-1"
              >
                <span>{teluguHero ? TELUGU_CONTENT.hero.prescriptionCta : "WhatsApp Quote"}</span>
                <span>↗</span>
              </a>
            </div>

            {/* Diagnostic Trust Metrics Pillars */}
            <div className="pt-3 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 w-full min-w-0">
              <div className="p-2 sm:p-2.5 rounded-xl bg-white/80 border border-slate-200/80 shadow-2xs min-w-0 overflow-hidden">
                <span className="block text-lg sm:text-xl font-extrabold text-teal font-mono">₹0</span>
                <span className="text-[11px] sm:text-xs text-slate-600 font-semibold leading-tight block truncate">
                  {teluguHero ? TELUGU_CONTENT.hero.freeHomePickupPill : "Home Sample Pickup"}
                </span>
              </div>
              <div className="p-2 sm:p-2.5 rounded-xl bg-white/80 border border-slate-200/80 shadow-2xs min-w-0 overflow-hidden">
                <span className="block text-lg sm:text-xl font-extrabold text-navy font-mono">100</span>
                <span className="text-[11px] sm:text-xs text-slate-600 font-semibold leading-tight block truncate">
                  {teluguHero ? TELUGU_CONTENT.hero.testsCountPill : "Diagnostic Tests"}
                </span>
              </div>
              <div className="p-2 sm:p-2.5 rounded-xl bg-white/80 border border-slate-200/80 shadow-2xs min-w-0 overflow-hidden">
                <span className="block text-lg sm:text-xl font-extrabold text-emerald-600 font-mono">6 AM</span>
                <span className="text-[11px] sm:text-xs text-slate-600 font-semibold leading-tight block truncate">
                  {teluguHero ? TELUGU_CONTENT.hero.earlyMorningPill : "Early Morning Pickup"}
                </span>
              </div>
              <a
                href="#accreditation"
                className="p-2 sm:p-2.5 rounded-xl bg-white/80 border border-teal/30 hover:border-teal shadow-2xs transition-colors group block min-w-0 overflow-hidden"
                title="ISO 9001:2015 Certified Pathology Laboratory"
              >
                <span className="block text-lg sm:text-xl font-extrabold text-navy font-mono group-hover:text-teal">ISO</span>
                <span className="text-[11px] sm:text-xs text-slate-600 font-semibold group-hover:text-navy leading-tight block truncate">9001:2015 Certified</span>
              </a>
            </div>
          </div>

          {/* ─── Right Column: Signature Sweeping Curved Reception Showcase & Packages Toggle ─── */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end w-full min-w-0">
            <motion.div
              className="w-full max-w-full sm:max-w-[480px] bg-white rounded-3xl shadow-xl border border-slate-200/90 overflow-hidden min-w-0 flex flex-col"
              initial={skip ? {} : { opacity: 0, y: 25 }}
              animate={skip ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {/* Header Tab Switcher: Reception Desk vs Popular Packages */}
              <div className="bg-navy p-2 flex items-center justify-between gap-1 border-b border-navy-light shrink-0">
                <div className="flex items-center gap-1 w-full">
                  <button
                    type="button"
                    onClick={() => setActiveTab("reception")}
                    className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      activeTab === "reception"
                        ? "bg-teal text-white shadow-xs"
                        : "text-slate-300 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <span>🏥</span>
                    <span className="truncate">Clinic Reception</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("packages")}
                    className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      activeTab === "packages"
                        ? "bg-teal text-white shadow-xs"
                        : "text-slate-300 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <span>🧪</span>
                    <span className="truncate">Popular Packages</span>
                    <span className="text-[9px] bg-white/20 px-1.5 py-0.2 rounded font-mono hidden sm:inline">₹400</span>
                  </button>
                </div>
              </div>

              {/* View 1: Photorealistic Clinic Reception with Signature Curved Frame & Floating Badges */}
              {activeTab === "reception" && (
                <div className="relative group overflow-hidden bg-slate-900 flex-1 flex flex-col">
                  {/* Aspect Ratio Container for Reception Asset */}
                  <div className="relative aspect-[16/11] sm:aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src="/reception-desk.jpg"
                      alt="SV Care Health Diagnostics clinic reception desk in Srikalahasti with 3D illuminated wall logo and WE CARE patient values board"
                      fill
                      priority
                      className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                      sizes="(max-width: 1024px) 100vw, 480px"
                    />

                    {/* Sweeping organic wave overlay at top-left matching client's mockup */}
                    <div 
                      className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay"
                      style={{
                        backgroundImage: `radial-gradient(circle at 10% 10%, #1E9C80 0%, transparent 60%)`
                      }}
                      aria-hidden="true"
                    />

                    {/* Top Floating Pill: Location & Live Hours */}
                    <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-1.5 pointer-events-none">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-bold bg-white/95 text-navy backdrop-blur-md shadow-md border border-white/80 pointer-events-auto">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="truncate">PNR Convention Hall • Srikalahasti</span>
                      </div>
                      <span className="text-[10px] font-bold text-white bg-navy/90 backdrop-blur-md px-2.5 py-1 rounded-full shadow-md shrink-0">
                        6 AM – 8 PM
                      </span>
                    </div>

                    {/* Center Subtle Pill: WE CARE Core Pillars */}
                    <div className="absolute bottom-3 inset-x-3 pointer-events-none">
                      <div className="p-3 sm:p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-white/80 shadow-lg pointer-events-auto flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-teal bg-teal/10 px-2 py-0.5 rounded-full">
                            Our Care Philosophy
                          </span>
                          <p className="text-xs sm:text-sm font-bold text-navy mt-1 truncate">
                            Your Health • Your Family • Your Trust
                          </p>
                        </div>
                        <a
                          href="#packages"
                          className="shrink-0 inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold text-white bg-navy hover:bg-navy-light transition-all shadow-xs"
                          title="Explore tests and packages"
                        >
                          <span>Tests (₹50)</span>
                          <span className="text-teal-light font-black">↓</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Strip: Walk-in & Safety Guarantees */}
                  <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200/90 flex items-center justify-between text-xs text-slate-600">
                    <span className="flex items-center gap-1.5 font-semibold text-slate-700">
                      <svg className="w-3.5 h-3.5 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      Walk-ins & Home Visits
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveTab("packages")}
                      className="text-teal font-bold hover:underline cursor-pointer"
                    >
                      View Price List ↗
                    </button>
                  </div>
                </div>
              )}

              {/* View 2: Interactive Popular Health Packages Selector */}
              {activeTab === "packages" && (
                <div className="p-3 sm:p-4 space-y-2.5 flex-1 flex flex-col justify-between">
                  <div className="space-y-2.5">
                    {featuredPackages.map((pkg) => {
                      const discount = pkg.originalPrice
                        ? Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)
                        : null;

                      return (
                        <div
                          key={pkg.id}
                          onClick={() => selectAndBook(pkg.id)}
                          className={`group p-2.5 sm:p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2 sm:gap-3 min-w-0 ${
                            pkg.isPopular
                              ? "bg-teal-light/40 border-teal hover:border-teal-dark hover:bg-teal-light/60 shadow-xs"
                              : "bg-slate-50/70 border-slate-200 hover:border-slate-300 hover:bg-slate-100/70"
                          }`}
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                              <span className="font-bold text-xs sm:text-sm text-navy truncate">
                                {pkg.name}
                              </span>
                              {pkg.isPopular && (
                                <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider bg-teal text-white px-1.5 sm:px-2 py-0.5 rounded-full shrink-0">
                                  Popular
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] sm:text-xs text-slate-500 mt-0.5 truncate">
                              {pkg.inclusions}
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <div className="flex items-baseline gap-1 sm:gap-1.5 justify-end">
                              {pkg.originalPrice && (
                                <span className="text-[11px] sm:text-xs line-through text-slate-400 font-mono">
                                  ₹{pkg.originalPrice}
                                </span>
                              )}
                              <span className="text-base sm:text-lg font-black text-navy font-mono tabular-nums">
                                ₹{pkg.price}
                              </span>
                            </div>
                            {discount && (
                              <span className="text-[9px] sm:text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-1.5 py-0.5 rounded inline-block">
                                {discount}% OFF
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Direct Action Link */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                    <a
                      href="#packages"
                      className="flex-1 inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold text-navy bg-slate-100 hover:bg-slate-200/80 transition-colors"
                    >
                      <span>View All 7 Packages</span>
                      <span>↓</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setActiveTab("reception")}
                      className="py-2 px-3 rounded-xl text-xs font-bold text-teal hover:bg-teal/10 transition-colors cursor-pointer"
                    >
                      Back to Reception ↗
                    </button>
                  </div>
                </div>
              )}

              {/* Bottom Card Guarantee Footer */}
              <div className="px-3.5 py-2 sm:px-4 sm:py-2.5 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-1 text-[11px] text-slate-500 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById("accreditation");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                    window.dispatchEvent(new CustomEvent("open-certificate-modal"));
                  }}
                  className="flex items-center gap-1 font-bold text-navy hover:text-teal transition-colors cursor-pointer"
                  title="Click to view ISO 9001:2015 certificate"
                >
                  <svg className="w-3.5 h-3.5 text-teal shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>ISO 9001:2015 Registered Lab ↗</span>
                </button>
                <span className="font-semibold text-slate-600">Daily 6 AM – 8 PM</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
