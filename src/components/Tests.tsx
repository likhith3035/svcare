"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { LAB_TESTS, LabTest, LabTestCategory, SITE, CONTACT, FLYER_DATA, FASTING_GUIDELINES } from "@/data/site";
import { useLanguage, SectionLangToggle } from "@/context/LanguageContext";
import { TELUGU_CONTENT } from "@/data/telugu";

const CATEGORIES: { label: string; value: string }[] = [
  { label: "All Tests", value: "All" },
  { label: "Hematology", value: "Hematology" },
  { label: "Diabetes", value: "Diabetes Profile" },
  { label: "Lipid Profile", value: "Lipid Profile" },
  { label: "Kidney (RFT)", value: "Kidney Function Tests (RFT)" },
  { label: "Liver (LFT)", value: "Liver Function Tests (LFT)" },
  { label: "Thyroid", value: "Thyroid Profile" },
  { label: "Urine", value: "Urine Examination" },
  { label: "Stool", value: "Stool Examination" },
  { label: "Coagulation", value: "Coagulation Profile" },
  { label: "Infectious", value: "Infectious Diseases" },
  { label: "Vitamins & Special", value: "Vitamins & Special Tests" },
  { label: "Tumor & Other", value: "Other Tests" },
];

export default function Tests() {
  const { isTelugu } = useLanguage();
  const isPrescriptionTelugu = isTelugu("prescription");
  const isFastingTelugu = isTelugu("fasting");

  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [popularOnly, setPopularOnly] = useState(false);
  const [under300Only, setUnder300Only] = useState(false);
  const [isFlyerModalOpen, setIsFlyerModalOpen] = useState(false);
  const [isFastingGuideOpen, setIsFastingGuideOpen] = useState(false);

  // Listen for flyer modal opening triggers from other sections
  useEffect(() => {
    function handleFlyerEvent() {
      setIsFlyerModalOpen(true);
    }
    window.addEventListener("open-flyer-modal", handleFlyerEvent);
    return () => window.removeEventListener("open-flyer-modal", handleFlyerEvent);
  }, []);

  const filteredTests = LAB_TESTS.filter((test) => {
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q ||
      test.name.toLowerCase().includes(q) ||
      test.category.toLowerCase().includes(q) ||
      test.testNo.toString() === q;

    const matchesCategory =
      selectedCategory === "All" || test.category === selectedCategory;

    const matchesPopular = !popularOnly || !!test.popular;
    const matchesUnder300 = !under300Only || test.rate <= 300;

    return matchesQuery && matchesCategory && matchesPopular && matchesUnder300;
  });

  function handleSelectTest(test: LabTest) {
    const el = document.getElementById("booking");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    window.dispatchEvent(new CustomEvent("select-package", { detail: test.id }));
  }

  function getWhatsAppUrl(test: LabTest) {
    const text = `Hello SV Care Health Diagnostics, I would like to book the test *#${test.testNo} ${test.name}* (₹${test.rate}). Please let me know when home sample collection is possible.`;
    return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
  }

  return (
    <section id="tests" className="py-14 sm:py-20 bg-[#F6F9FA] scroll-mt-16 border-t border-slate-200/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-teal/10 text-teal-dark mb-2">
              <span>Official 100 Tests Directory</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy">
              Laboratory test price list
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base leading-relaxed">
              Transparent, standardized pathology pricing in Srikalahasti. Search 100 individual tests from{" "}
              <strong className="text-navy font-bold">₹50</strong> with zero doorstep collection fees.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => setIsFlyerModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-white border border-slate-200 text-navy hover:border-teal hover:text-teal shadow-2xs transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>View Price List</span>
            </button>

            <a
              href={FLYER_DATA.imagePath}
              download="SV-Care-Lab-Test-Price-List.png"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-navy text-white hover:bg-navy-light shadow-2xs transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download Price List</span>
            </a>
          </div>
        </div>

        {/* 5 Laboratory Trust Pillars (from Flyer) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3 mb-8 w-full min-w-0">
          {FLYER_DATA.pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-2.5 sm:p-3 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex items-center gap-2 sm:gap-2.5 min-w-0 overflow-hidden"
            >
              <div className="w-7 h-7 rounded-lg bg-teal/10 text-teal flex items-center justify-center shrink-0">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-navy leading-tight truncate">{pillar.title}</span>
            </div>
          ))}
        </div>

        {/* ─── Doctor's Prescription WhatsApp Upload Banner (Top Conversion Driver) ─── */}
        <div className="mb-6 p-4 sm:p-7 rounded-3xl bg-gradient-to-r from-navy via-navy-light to-teal/90 text-white shadow-clinical border border-teal/30 relative overflow-hidden w-full min-w-0">
          <div className="absolute -right-10 -bottom-10 w-56 h-56 bg-teal/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-6 w-full min-w-0">
            <div className="flex items-start gap-3 sm:gap-4 max-w-2xl min-w-0">
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-2xl bg-teal/25 border border-teal/40 text-teal-light flex items-center justify-center shrink-0 shadow-inner">
                <svg className="w-5 h-5 sm:w-7 sm:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-extrabold bg-teal text-white uppercase tracking-wider shadow-2xs">
                    <span>{isPrescriptionTelugu ? TELUGU_CONTENT.prescriptionBanner.badge : "📸 Instant Prescription Quote"}</span>
                  </div>
                  <SectionLangToggle section="prescription" size="xs" />
                </div>
                <h3 className="font-heading text-base sm:text-2xl font-bold text-white leading-tight break-words">
                  {isPrescriptionTelugu ? TELUGU_CONTENT.prescriptionBanner.title : "Have a Doctor's Prescription Slip?"}
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 mt-1.5 leading-relaxed font-normal break-words">
                  {isPrescriptionTelugu
                    ? TELUGU_CONTENT.prescriptionBanner.description
                    : "Don't know the exact test names to search? Just snap a photo of your doctor's prescription slip and send it on WhatsApp. We'll verify the tests, give you an instant discounted quote, and schedule doorstep pickup in Srikalahasti."}
                </p>
              </div>
            </div>

            <div className="shrink-0 w-full sm:w-auto">
              <a
                href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
                  "Hello SV Care Health Diagnostics, I am sending a photo of my doctor's prescription slip. Please verify the prescribed tests, calculate the discounted total, and schedule doorstep collection."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-5 sm:px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs sm:text-sm font-bold shadow-lg shadow-emerald-500/25 transition-all active:scale-[0.98] cursor-pointer w-full sm:w-auto"
              >
                <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.69 0-3.259-.52-4.555-1.408l-.327-.194-2.871.852.852-2.871-.194-.327A7.96 7.96 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
                </svg>
                <span>{isPrescriptionTelugu ? TELUGU_CONTENT.prescriptionBanner.cta : "Send Prescription on WhatsApp"}</span>
              </a>
            </div>
          </div>
        </div>

        {/* ─── Compact Expandable Pre-Test Fasting Guidelines Accordion ─── */}
        <div id="fasting-guide" className="mb-6 bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden transition-all w-full min-w-0">
          <button
            type="button"
            onClick={() => setIsFastingGuideOpen((prev) => !prev)}
            className="w-full p-3.5 sm:p-5 flex items-center justify-between gap-3 text-left hover:bg-slate-50/70 transition-colors cursor-pointer"
            aria-expanded={isFastingGuideOpen}
          >
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                  <h3 className="font-heading text-xs sm:text-base font-bold text-navy truncate">
                    {isFastingTelugu ? TELUGU_CONTENT.fastingGuide.title : "Pre-Test Fasting & Preparation Guide"}
                  </h3>
                  <span className="text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full bg-teal/10 text-teal-dark shrink-0 hidden xs:inline-block">
                    {isFastingTelugu ? TELUGU_CONTENT.fastingGuide.badge : "Clinical Advice"}
                  </span>
                  <div onClick={(e) => e.stopPropagation()}>
                    <SectionLangToggle section="fasting" size="xs" />
                  </div>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 line-clamp-1">
                  {isFastingTelugu ? TELUGU_CONTENT.fastingGuide.subtitle : "Do you need to skip breakfast, drink water, or pause morning medication?"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-bold text-teal hidden sm:inline-block">
                {isFastingGuideOpen ? "Collapse Guide" : "Expand Guide (5 Categories)"}
              </span>
              <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 transition-transform duration-200 shrink-0 ${isFastingGuideOpen ? "rotate-180 bg-teal text-white" : ""}`}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </button>

          {isFastingGuideOpen && (
            <div className="px-3.5 pb-4 sm:px-6 sm:pb-6 pt-2 border-t border-slate-100 bg-slate-50/40 animate-fade-in w-full min-w-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2 w-full min-w-0">
                {FASTING_GUIDELINES.map((item) => {
                  const teluguItem = isFastingTelugu
                    ? (TELUGU_CONTENT.fastingGuide.items as Record<string, { category: string; rule: string; details: string }>)[item.id]
                    : null;
                  return (
                    <div
                      key={item.id}
                      className="p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between min-w-0"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-xs font-bold text-navy leading-tight truncate">
                            {teluguItem ? teluguItem.category : item.category}
                          </span>
                          <span
                            className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md shrink-0 ${
                              item.badge === "Strict Fasting"
                                ? "bg-amber-100 text-amber-800"
                                : item.badge === "No Fasting"
                                ? "bg-emerald-100 text-emerald-800"
                                : item.badge === "Pre-Medication"
                                ? "bg-indigo-100 text-indigo-800"
                                : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {item.badge}
                          </span>
                        </div>
                        <p className="text-xs font-bold text-teal-dark mb-1">
                          {teluguItem ? teluguItem.rule : item.rule}
                        </p>
                        <p className="text-[11px] text-slate-600 leading-relaxed font-normal">
                          {teluguItem ? teluguItem.details : item.details}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Water & Hydration Note */}
              <div className="mt-3.5 p-3 rounded-xl bg-teal/10 border border-teal/20 flex items-start gap-2.5 text-xs text-navy w-full min-w-0">
                <span className="text-base shrink-0 mt-0.5">💧</span>
                <p className="leading-relaxed">
                  {isFastingTelugu ? (
                    <span>{TELUGU_CONTENT.fastingGuide.waterNote}</span>
                  ) : (
                    <>
                      <strong>Water is always permitted:</strong> Drinking 1–2 glasses of normal plain water before blood collection is encouraged. It keeps veins well-hydrated for easy, painless single-prick sampling.
                    </>
                  )}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Search Bar + Quick Toggle Pills */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="search"
                placeholder="Search tests (e.g. HbA1c, Dengue, CBC, Creatinine, Vitamin D3, Thyroid)..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm font-medium focus:border-teal focus:bg-white focus:ring-2 focus:ring-teal/20 outline-none transition-all"
                aria-label="Search laboratory tests"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold p-1"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Quick Filter Buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setPopularOnly((prev) => !prev)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  popularOnly
                    ? "bg-teal text-white border-teal shadow-xs"
                    : "bg-slate-50 border-slate-200 text-slate-600 hover:text-navy"
                }`}
              >
                ⭐ Popular Only
              </button>

              <button
                type="button"
                onClick={() => setUnder300Only((prev) => !prev)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  under300Only
                    ? "bg-navy text-white border-navy shadow-xs"
                    : "bg-slate-50 border-slate-200 text-slate-600 hover:text-navy"
                }`}
              >
                ₹ Under ₹300
              </button>
            </div>
          </div>

          {/* Category Chips Horizontal Bar with mobile swipe */}
          <div className="flex overflow-x-auto sm:flex-wrap gap-1.5 pt-1 pb-1 sm:pb-0 no-scrollbar -mx-1 px-1">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.value;
              const count =
                cat.value === "All"
                  ? LAB_TESTS.length
                  : LAB_TESTS.filter((t) => t.category === cat.value).length;

              return (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? "bg-navy text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-navy"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive ? "bg-white/20 text-white" : "bg-white text-slate-500"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter & Timings Banner */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-4 px-1">
          <div>
            Showing <strong className="text-navy">{filteredTests.length}</strong> of{" "}
            {LAB_TESTS.length} tests
            {query && <span> for &ldquo;{query}&rdquo;</span>}
          </div>
          <div className="hidden sm:flex items-center gap-2 text-teal font-semibold">
            <span>⏱ Timings: 6:00 AM to 8:00 PM</span>
            <span>•</span>
            <span>Digital Reports (WhatsApp)</span>
          </div>
        </div>

        {/* Test Cards Grid */}
        {filteredTests.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center border border-slate-200">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-3">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-heading text-lg font-bold text-navy">No tests found</h3>
            <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
              We couldn&apos;t find any test matching your search. Please check the spelling or browse by category.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setSelectedCategory("All");
                setPopularOnly(false);
                setUnder300Only(false);
              }}
              className="mt-4 px-4 py-2 rounded-xl text-xs font-bold bg-navy text-white"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTests.map((test) => (
              <div
                key={test.id}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs hover:border-teal hover:shadow-clinical transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Top row: Number and Category tag */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-xs font-bold text-slate-400 group-hover:text-teal transition-colors">
                      No. {test.testNo.toString().padStart(2, "0")}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 truncate max-w-[170px]">
                      {test.category}
                    </span>
                  </div>

                  {/* Test Name */}
                  <h3 className="font-heading text-base font-bold text-navy group-hover:text-teal-dark transition-colors line-clamp-2">
                    {test.name}
                  </h3>

                  {/* Badges: Sample Type & Fasting */}
                  <div className="flex flex-wrap items-center gap-1.5 mt-2">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 bg-slate-50 px-2 py-0.5 rounded">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                      {test.sampleType} Sample
                    </span>

                    {test.fastingNote ? (
                      <button
                        type="button"
                        onClick={() => {
                          setIsFastingGuideOpen(true);
                          const el = document.getElementById("fasting-guide");
                          if (el) el.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 px-2 py-0.5 rounded transition-colors cursor-pointer"
                        title="Click to view Fasting Guide rules"
                      >
                        <span>⚠️ Fasting Note</span>
                      </button>
                    ) : null}

                    {test.popular && (
                      <span className="text-[10px] font-extrabold text-teal bg-teal/10 px-1.5 py-0.5 rounded">
                        Routine Test
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Rate & Booking CTA */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block leading-tight">
                      Standard Rate
                    </span>
                    <span className="text-xl font-black text-navy font-mono tabular-nums">
                      ₹{test.rate.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* WhatsApp Enquire */}
                    <a
                      href={getWhatsAppUrl(test)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-slate-100 hover:bg-[#25D366] hover:text-white text-slate-600 transition-colors"
                      title="Enquire on WhatsApp"
                      aria-label={`Enquire ${test.name} on WhatsApp`}
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.69 0-3.259-.52-4.555-1.408l-.327-.194-2.871.852.852-2.871-.194-.327A7.96 7.96 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
                      </svg>
                    </a>

                    {/* Book Button */}
                    <button
                      type="button"
                      onClick={() => handleSelectTest(test)}
                      className="px-3 py-2 rounded-xl text-xs font-bold bg-teal hover:bg-teal-dark text-white transition-all cursor-pointer shadow-xs"
                    >
                      Book Test
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ─── FULL OFFICIAL FLYER LIGHTBOX MODAL ─── */}
        {isFlyerModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-fade-in"
            role="dialog"
            aria-modal="true"
            aria-label="Official Price List"
          >
            <div className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col">
              {/* Modal Top Bar */}
              <div className="bg-navy text-white px-5 py-4 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-teal animate-pulse" />
                  <div>
                    <h3 className="font-heading text-base font-bold text-white">
                      SV Care Health Diagnostics — Official Price List
                    </h3>
                    <p className="text-xs text-slate-300">
                      100 Laboratory Tests • Accurate • Reliable • Trusted
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={FLYER_DATA.imagePath}
                    download="SV-Care-Lab-Price-List.png"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal hover:bg-teal-dark text-white text-xs font-bold transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span className="hidden sm:inline">Download</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setIsFlyerModalOpen(false)}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                    aria-label="Close modal"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Flyer Scrollable Image Container */}
              <div className="flex-1 overflow-auto bg-slate-900 p-2 sm:p-4 flex justify-center items-start">
                <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden">
                  <Image
                    src={FLYER_DATA.imagePath}
                    alt="SV Care Health Diagnostics Laboratory Test Price List 100 Tests"
                    width={1000}
                    height={1500}
                    className="w-full h-auto object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Modal Footer Callout */}
              <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-navy">📍 PNR Convention Hall, Srikalahasti</span>
                  <span>•</span>
                  <span>📞 8019081501, 8019071501</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsFlyerModalOpen(false);
                      const el = document.getElementById("booking");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="px-4 py-1.5 rounded-lg bg-teal text-white font-bold hover:bg-teal-dark transition-colors cursor-pointer"
                  >
                    Book Home Collection Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
