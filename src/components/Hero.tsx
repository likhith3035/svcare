"use client";

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

      {/* Luminous glow */}
      <div className="absolute top-1/4 right-5 w-[450px] h-[450px] bg-teal/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full min-w-0">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full min-w-0">
          {/* ─── Left Column: Headline & Action CTAs ─── */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 max-w-2xl w-full min-w-0">
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
            <h1 className="font-heading text-2xl sm:text-4xl lg:text-[3.25rem] font-bold tracking-tight text-navy leading-[1.2] sm:leading-[1.15] break-words">
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
            <p className="text-sm sm:text-lg text-slate-600 leading-relaxed font-normal">
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

            {/* Action Buttons: Responsive Stack on Mobile */}
            <div className="space-y-2 sm:space-y-0 sm:flex sm:items-center sm:gap-3 pt-1 w-full min-w-0">
              {/* Primary High-Converting CTA */}
              <a
                href="#booking"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3.5 text-sm sm:text-base font-bold text-white
                  bg-red hover:bg-red-hover rounded-xl shadow-md shadow-red/20 transition-all
                  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red
                  active:scale-[0.98] cursor-pointer"
              >
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="truncate">Book Home Collection (₹0 Fee)</span>
              </a>

              {/* Mobile Exploration Shortcuts (Replaces duplicate call/WhatsApp buttons since sticky bottom bar already has them) */}
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
            <div className="pt-5 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 w-full min-w-0">
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

          {/* ─── Right Column: Interactive Diagnostic Quick-Selector ─── */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end w-full min-w-0">
            <motion.div
              className="w-full max-w-full sm:max-w-[440px] bg-white rounded-2xl shadow-clinical border border-slate-200/90 overflow-hidden min-w-0"
              initial={skip ? {} : { opacity: 0, y: 25 }}
              animate={skip ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {/* Card Header */}
              <div className="bg-navy text-white px-3.5 py-3 sm:px-5 sm:py-4 border-b border-navy-light flex items-center justify-between gap-2 min-w-0">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="w-2 h-2 rounded-full bg-teal animate-pulse shrink-0" />
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-teal-light truncate">
                      Popular Health Packages
                    </span>
                  </div>
                  <h2 className="text-sm sm:text-base font-bold text-white mt-0.5 truncate">
                    Preventive Health Screenings
                  </h2>
                </div>
                <span className="text-[10px] font-mono font-bold bg-white/10 px-2 sm:px-2.5 py-1 rounded-md text-slate-200 shrink-0">
                  From ₹400
                </span>
              </div>

              {/* 3 Interactive Quick Package Rows */}
              <div className="p-3 sm:p-5 space-y-2.5 sm:space-y-3 min-w-0">
                {featuredPackages.map((pkg) => {
                  const discount = pkg.originalPrice
                    ? Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)
                    : null;

                  return (
                    <div
                      key={pkg.id}
                      onClick={() => selectAndBook(pkg.id)}
                      className={`group p-2.5 sm:p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2 sm:gap-3 min-w-0 ${
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

                {/* Direct Action */}
                <div className="pt-1 sm:pt-2">
                  <a
                    href="#packages"
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-bold text-navy bg-slate-100 hover:bg-slate-200/80 transition-colors"
                  >
                    <span>View All 7 Packages & 100 Tests</span>
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Bottom Assurance */}
              <div className="px-3.5 py-2.5 sm:px-5 sm:py-3 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-1.5 text-xs text-slate-500 min-w-0">
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById("accreditation");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                    window.dispatchEvent(new CustomEvent("open-certificate-modal"));
                  }}
                  className="flex items-center gap-1.5 font-bold text-navy hover:text-teal transition-colors cursor-pointer text-[11px] sm:text-xs min-w-0"
                  title="Click to view ISO 9001:2015 certificate"
                >
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="truncate">ISO 9001:2015 Certified Lab ↗</span>
                </button>
                <span className="font-semibold text-slate-600 text-[11px] sm:text-xs shrink-0">6:00 AM – 8:00 PM</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
