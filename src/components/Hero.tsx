"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useOpenStatus } from "@/hooks/useOpenStatus";
import { OFFICIAL_PACKAGES, CONTACT, SITE } from "@/data/site";

export default function Hero() {
  const isOpen = useOpenStatus();
  const prefersReducedMotion = useReducedMotion();
  const skip = !!prefersReducedMotion;

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
      className="relative bg-gradient-to-b from-[#EEF7F5] via-[#F6FAF9] to-[#F6F9FA] text-foreground pt-32 pb-14 sm:pt-40 sm:pb-20 overflow-hidden border-b border-slate-200/70"
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

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* ─── Left Column: Headline & Action CTAs ─── */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 max-w-2xl">
            {/* Live Operational Status & Free Collection Announcement */}
            <div className="flex flex-wrap items-center gap-2">
              {isOpen !== null && (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-white/90 border border-slate-200 shadow-xs text-slate-700">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      isOpen ? "bg-emerald-500 animate-pulse" : "bg-red"
                    }`}
                    aria-hidden="true"
                  />
                  <span>{isOpen ? "Open Now • 6 AM to 8 PM" : "Closed • Opens 6:00 AM"}</span>
                </div>
              )}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal/10 border border-teal/20 text-teal-dark">
                <svg className="w-3.5 h-3.5 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>Free Doorstep Collection in Srikalahasti</span>
              </div>
            </div>

            {/* Main High-Impact Headline */}
            <h1 className="font-heading text-3xl sm:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-navy leading-[1.15]">
              Accurate blood diagnostics,
              <br />
              <span className="text-teal font-normal italic">right at your doorstep.</span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Official health packages starting from <strong className="text-navy font-bold">₹400</strong> • 100+ tests from <strong className="text-navy font-bold">₹50</strong>.
              Trained phlebotomists collect sterile samples at your home or clinic with same-day WhatsApp reports.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="#booking"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-bold text-white
                  bg-red hover:bg-red-hover rounded-xl shadow-md shadow-red/20 transition-all
                  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red
                  active:scale-[0.98] cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Book Home Collection
              </a>

              <a
                href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent("Hello SV Care Health Diagnostics, I would like to book a blood test appointment.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-bold text-white
                  bg-[#1E9C80] hover:bg-[#16856C] rounded-xl shadow-md shadow-teal/20 transition-all
                  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal
                  active:scale-[0.98] cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.69 0-3.259-.52-4.555-1.408l-.327-.194-2.871.852.852-2.871-.194-.327A7.96 7.96 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
                </svg>
                WhatsApp
              </a>

              <a
                href={CONTACT.dialLinks[0]}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3.5 text-sm font-bold text-slate-700
                  bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-xs transition-all"
              >
                <svg className="w-4 h-4 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {CONTACT.phonesFormatted[0]}
              </a>
            </div>

            {/* Diagnostic Trust Metrics Pillars */}
            <div className="pt-5 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="p-2.5 rounded-xl bg-white/80 border border-slate-200/80 shadow-2xs">
                <span className="block text-xl font-extrabold text-teal font-mono">₹0</span>
                <span className="text-xs text-slate-600 font-semibold">Home Sample Pickup</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/80 border border-slate-200/80 shadow-2xs">
                <span className="block text-xl font-extrabold text-navy font-mono">100</span>
                <span className="text-xs text-slate-600 font-semibold">Diagnostic Tests</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/80 border border-slate-200/80 shadow-2xs">
                <span className="block text-xl font-extrabold text-emerald-600 font-mono">6 AM</span>
                <span className="text-xs text-slate-600 font-semibold">Early Morning Pickup</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/80 border border-slate-200/80 shadow-2xs">
                <span className="block text-xl font-extrabold text-navy font-mono">MD</span>
                <span className="text-xs text-slate-600 font-semibold">Doctor On-Site</span>
              </div>
            </div>
          </div>

          {/* ─── Right Column: Interactive Diagnostic Quick-Selector ─── */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              className="w-full max-w-[440px] bg-white rounded-2xl shadow-clinical border border-slate-200/90 overflow-hidden"
              initial={skip ? {} : { opacity: 0, y: 25 }}
              animate={skip ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {/* Card Header */}
              <div className="bg-navy text-white px-5 py-4 border-b border-navy-light flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-teal-light">
                      Popular Health Packages
                    </span>
                  </div>
                  <h2 className="text-base font-bold text-white mt-0.5">
                    Preventive Health Screenings
                  </h2>
                </div>
                <span className="text-[10px] font-mono font-bold bg-white/10 px-2.5 py-1 rounded-md text-slate-200">
                  From ₹400
                </span>
              </div>

              {/* 3 Interactive Quick Package Rows */}
              <div className="p-4 sm:p-5 space-y-3">
                {featuredPackages.map((pkg) => {
                  const discount = pkg.originalPrice
                    ? Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)
                    : null;

                  return (
                    <div
                      key={pkg.id}
                      onClick={() => selectAndBook(pkg.id)}
                      className={`group p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        pkg.isPopular
                          ? "bg-teal-light/40 border-teal hover:border-teal-dark hover:bg-teal-light/60 shadow-xs"
                          : "bg-slate-50/70 border-slate-200 hover:border-slate-300 hover:bg-slate-100/70"
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-navy truncate">
                            {pkg.name}
                          </span>
                          {pkg.isPopular && (
                            <span className="text-[10px] font-extrabold uppercase tracking-wider bg-teal text-white px-2 py-0.5 rounded-full">
                              Popular
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5 truncate">
                          {pkg.inclusions}
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="flex items-baseline gap-1.5 justify-end">
                          {pkg.originalPrice && (
                            <span className="text-xs line-through text-slate-400 font-mono">
                              ₹{pkg.originalPrice}
                            </span>
                          )}
                          <span className="text-lg font-black text-navy font-mono tabular-nums">
                            ₹{pkg.price}
                          </span>
                        </div>
                        {discount && (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-1.5 py-0.5 rounded">
                            {discount}% OFF
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* Direct Action */}
                <div className="pt-2">
                  <a
                    href="#packages"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-navy bg-slate-100 hover:bg-slate-200/80 transition-colors"
                  >
                    <span>View All 7 Packages & 100 Tests</span>
                    <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Bottom Assurance */}
              <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1.5 font-medium">
                  <svg className="w-4 h-4 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Certified Pathology Lab
                </span>
                <span className="font-semibold text-slate-600">6:00 AM – 8:00 PM</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
