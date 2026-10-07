"use client";

import { useState } from "react";
import { OFFICIAL_PACKAGES, MASTER_PACKAGES, TEST_CATEGORIES, SITE } from "@/data/site";

export default function Packages() {
  const [activeTab, setActiveTab] = useState<"official" | "master">("official");
  const [mobileMasterIdx, setMobileMasterIdx] = useState(1); // Default to Master Checkup 2
  const [showMatrix, setShowMatrix] = useState(false);

  function handleBook(pkgId: string) {
    const el = document.getElementById("booking");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    window.dispatchEvent(new CustomEvent("select-package", { detail: pkgId }));
  }

  function handleOpenFlyer() {
    window.dispatchEvent(new CustomEvent("open-flyer-modal"));
  }

  return (
    <section id="packages" className="py-14 sm:py-20 bg-white scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-teal/10 text-teal-dark mb-3">
            <span>More Care • Less Cost</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-navy tracking-tight">
            Preventive health packages
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Doctor-curated diagnostic panels starting at <strong className="text-navy font-semibold">₹400</strong> with{" "}
            <strong className="text-navy font-semibold">₹0 doorstep collection charge</strong> and same-day digital reports.
          </p>

          {/* Package Type Switcher */}
          <div className="inline-flex p-1.5 bg-slate-100 rounded-2xl mt-6 border border-slate-200 shadow-2xs max-w-md mx-auto">
            <button
              type="button"
              onClick={() => setActiveTab("official")}
              className={`py-2 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "official"
                  ? "bg-navy text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Specialized Care (7 Packages)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("master")}
              className={`py-2 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "master"
                  ? "bg-navy text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Full-Body Master (62–78 Tests)
            </button>
          </div>
        </div>

        {/* ─── Grand Opening Inaugural Special Callout ─── */}
        <div className="mb-8 p-3.5 sm:p-5 rounded-2xl bg-gradient-to-r from-red/10 via-amber-500/10 to-teal/10 border border-red-200/80 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3.5 sm:gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-red text-white flex items-center justify-center font-black text-lg shrink-0 shadow-xs">
              🎁
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-red text-white px-2 py-0.5 rounded-full">
                  Grand Opening Special
                </span>
                <span className="text-xs text-slate-500 font-semibold">Limited Period</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-navy mt-0.5">
                FREE Sugar Test (Fasting / Random) • 1st 10 Members Get FREE Body Checkup
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => handleBook("offer-sugar")}
              className="px-3 py-2 sm:px-3.5 rounded-xl text-[11px] sm:text-xs font-bold bg-red text-white hover:bg-red-hover transition-colors shadow-xs cursor-pointer text-center"
            >
              Claim Free Sugar Test
            </button>
            <button
              type="button"
              onClick={() => handleBook("offer-checkup")}
              className="px-3 py-2 sm:px-3.5 rounded-xl text-[11px] sm:text-xs font-bold bg-navy text-white hover:bg-navy-light transition-colors shadow-xs cursor-pointer text-center"
            >
              1st 10 Free Checkup
            </button>
          </div>
        </div>

        {/* ─── TAB 1: 7 OFFICIAL HEALTH PACKAGES (From Client Flyer) ─── */}
        {activeTab === "official" && (
          <div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 items-stretch mb-10">
              {OFFICIAL_PACKAGES.map((pkg) => {
                const discount = pkg.originalPrice
                  ? Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)
                  : null;

                const whatsappText = `Hello SV Care Health Diagnostics, I would like to book the *${pkg.name}* (₹${pkg.price}). Please share the next available appointment slot.`;

                return (
                  <div
                    key={pkg.id}
                    className={`relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 bg-white border ${
                      pkg.isPopular
                        ? "border-2 border-teal shadow-clinical-hover -translate-y-1 bg-gradient-to-b from-[#F2FAF8] to-white"
                        : "border-slate-200/90 shadow-clinical hover:border-slate-300 hover:shadow-clinical-hover"
                    }`}
                  >
                    {/* Badge */}
                    {pkg.tag && (
                      <div
                        className={`absolute -top-3 left-6 px-3.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider shadow-xs ${
                          pkg.isPopular ? "bg-teal text-white" : "bg-navy text-white"
                        }`}
                      >
                        {pkg.tag}
                      </div>
                    )}

                    <div>
                      {/* Package Inclusions Headline Pill */}
                      <div className="text-[11px] font-bold text-teal font-mono uppercase tracking-wider mb-1">
                        SV Care Official Package
                      </div>

                      <h3 className="font-heading text-xl sm:text-2xl font-bold text-navy">
                        {pkg.name}
                      </h3>

                      <p className="mt-1.5 text-xs text-slate-500 leading-relaxed min-h-[32px]">
                        {pkg.description}
                      </p>

                      {/* Pricing block */}
                      <div className="mt-4 pb-4 border-b border-slate-100 flex items-baseline gap-2.5">
                        <span className="text-3xl font-black text-navy font-mono tabular-nums">
                          ₹{pkg.price.toLocaleString("en-IN")}
                        </span>
                        {pkg.originalPrice && (
                          <span className="text-sm line-through text-slate-400 font-mono tabular-nums">
                            ₹{pkg.originalPrice.toLocaleString("en-IN")}
                          </span>
                        )}
                        {discount && (
                          <span className="text-[11px] font-extrabold text-emerald-700 bg-emerald-100/90 px-2 py-0.5 rounded-md ml-auto">
                            Save {discount}%
                          </span>
                        )}
                      </div>

                      {/* Inclusions summary chip */}
                      <div className="mt-4 p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
                        <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-1">
                          Key Inclusions:
                        </div>
                        <div className="text-xs font-bold text-teal-dark">
                          {pkg.inclusions}
                        </div>
                      </div>

                      {/* Detailed test list */}
                      <div className="mt-4 space-y-2">
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          Included Tests ({pkg.testList.length}):
                        </div>
                        <ul className="space-y-1.5 text-xs text-slate-700">
                          {pkg.testList.map((testName, i) => (
                            <li key={i} className="flex items-start gap-2 font-medium">
                              <svg
                                className="w-4 h-4 text-teal shrink-0 mt-0.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2.5}
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                              <span>{testName}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="mt-6 pt-4 border-t border-slate-100 space-y-2">
                      <button
                        type="button"
                        onClick={() => handleBook(pkg.id)}
                        className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-center transition-all cursor-pointer shadow-xs ${
                          pkg.isPopular
                            ? "bg-red hover:bg-red-hover text-white shadow-red/20"
                            : "bg-navy hover:bg-navy-light text-white"
                        }`}
                      >
                        Book Home Collection (₹0 Fee)
                      </button>

                      <a
                        href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(whatsappText)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold text-teal bg-teal/10 hover:bg-teal hover:text-white transition-colors"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                          <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.69 0-3.259-.52-4.555-1.408l-.327-.194-2.871.852.852-2.871-.194-.327A7.96 7.96 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
                        </svg>
                        <span>WhatsApp Quick Booking</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ─── TAB 2: FULL-BODY MASTER CHECKUPS (3 Cumulative Tiers) ─── */}
        {activeTab === "master" && (
          <div>
            {/* Mobile Tab Switcher */}
            <div className="md:hidden flex p-1.5 bg-slate-100 rounded-2xl mb-6 max-w-md mx-auto border border-slate-200">
              {MASTER_PACKAGES.map((pkg, idx) => (
                <button
                  key={pkg.id}
                  type="button"
                  onClick={() => setMobileMasterIdx(idx)}
                  className={`flex-1 py-2.5 px-2 rounded-xl text-xs font-bold transition-all text-center cursor-pointer ${
                    mobileMasterIdx === idx ? "bg-navy text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <span>{pkg.shortName}</span>
                </button>
              ))}
            </div>

            {/* 3 Master Cards */}
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch mb-10">
              {MASTER_PACKAGES.map((pkg, idx) => {
                const isPopular = idx === 1;
                const isAdvanced = idx === 2;
                const savings = pkg.originalPrice - pkg.price;
                const discount = Math.round((savings / pkg.originalPrice) * 100);
                const isVisibleOnMobile = idx === mobileMasterIdx;

                return (
                  <div
                    key={pkg.id}
                    className={`relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
                      !isVisibleOnMobile ? "hidden md:flex" : "flex"
                    } ${
                      isPopular
                        ? "bg-gradient-to-b from-[#F2FAF8] to-white border-2 border-teal shadow-clinical-hover md:-translate-y-2"
                        : "bg-white border border-slate-200/90 shadow-clinical hover:border-slate-300"
                    }`}
                  >
                    {isPopular && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-teal text-white text-[11px] font-extrabold uppercase tracking-wider shadow-sm">
                        Most Popular Choice
                      </div>
                    )}
                    {isAdvanced && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-navy text-white text-[11px] font-extrabold uppercase tracking-wider shadow-sm">
                        Full-Body Comprehensive
                      </div>
                    )}

                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          Tier 0{idx + 1}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-slate-100 text-slate-700">
                          {pkg.parameters} Parameters
                        </span>
                      </div>

                      <h3 className="font-heading text-2xl font-bold text-navy">{pkg.name}</h3>

                      <div className="mt-4 pb-4 border-b border-slate-100 flex items-baseline gap-2.5">
                        <span className="text-3xl sm:text-4xl font-extrabold text-navy font-mono tabular-nums">
                          ₹{pkg.price.toLocaleString("en-IN")}
                        </span>
                        <span className="text-sm line-through text-slate-400 font-mono tabular-nums">
                          ₹{pkg.originalPrice.toLocaleString("en-IN")}
                        </span>
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md ml-auto">
                          Save {discount}%
                        </span>
                      </div>

                      <div className="mt-5 space-y-2.5 text-sm text-slate-700">
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                          Key Profiles Included:
                        </p>
                        {idx === 0 && (
                          <>
                            <div className="flex items-center gap-2 font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-teal shrink-0" />
                              <span>Lipid Profile (10 tests)</span>
                            </div>
                            <div className="flex items-center gap-2 font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-teal shrink-0" />
                              <span>Liver Function LFT (12 tests)</span>
                            </div>
                            <div className="flex items-center gap-2 font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-teal shrink-0" />
                              <span>Kidney Function KFT (7 tests)</span>
                            </div>
                            <div className="flex items-center gap-2 font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-teal shrink-0" />
                              <span>Complete Blood Count CBC (28 tests)</span>
                            </div>
                            <div className="flex items-center gap-2 font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-teal shrink-0" />
                              <span>Thyroid & Diabetes Profiles</span>
                            </div>
                          </>
                        )}
                        {idx === 1 && (
                          <>
                            <div className="p-2 rounded-xl bg-teal/10 text-teal-dark text-xs font-bold mb-2">
                              ✓ All 62 tests in Health Checkup 1 PLUS:
                            </div>
                            <div className="flex items-center gap-2 font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-teal shrink-0" />
                              <span>Vitamin Profile (D3 & B12)</span>
                            </div>
                            <div className="flex items-center gap-2 font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-teal shrink-0" />
                              <span>Cardiac Risk Markers (Chol/HDL ratio)</span>
                            </div>
                            <div className="flex items-center gap-2 font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-teal shrink-0" />
                              <span>Full Metabolic & Vital Organ Screen</span>
                            </div>
                          </>
                        )}
                        {idx === 2 && (
                          <>
                            <div className="p-2 rounded-xl bg-navy/10 text-navy text-xs font-bold mb-2">
                              ✓ All 69 tests in Master Checkup 2 PLUS:
                            </div>
                            <div className="flex items-center gap-2 font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-teal shrink-0" />
                              <span>Iron Deficiency Profile (4 tests)</span>
                            </div>
                            <div className="flex items-center gap-2 font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-teal shrink-0" />
                              <span>Serum Electrolytes (Na, K, Cl)</span>
                            </div>
                            <div className="flex items-center gap-2 font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-teal shrink-0" />
                              <span>Rheumatoid Factor (RF), ESR & CRP</span>
                            </div>
                            <div className="flex items-center gap-2 font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-teal shrink-0" />
                              <span>Complete Urine Examination</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="mt-8 pt-4 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => handleBook(pkg.id)}
                        className={`w-full py-3.5 px-4 rounded-xl text-sm font-bold text-center transition-all cursor-pointer shadow-xs ${
                          isPopular
                            ? "bg-teal hover:bg-teal-dark text-white shadow-teal/20"
                            : "bg-navy hover:bg-navy-light text-white"
                        }`}
                      >
                        Book {pkg.shortName}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Matrix comparison toggle */}
            <div className="text-center mb-8">
              <button
                type="button"
                onClick={() => setShowMatrix((prev) => !prev)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs sm:text-sm font-bold text-navy transition-all cursor-pointer"
              >
                <span>{showMatrix ? "Hide Detailed Parameter Comparison" : "Compare Tests Across All 3 Master Packages"}</span>
                <svg
                  className={`w-4 h-4 text-teal transition-transform duration-200 ${showMatrix ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {showMatrix && (
              <div className="mb-10 overflow-x-auto rounded-2xl border border-slate-200 shadow-xs bg-white">
                <table className="w-full text-left text-sm border-collapse min-w-[600px]">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-700">
                      <th className="py-3 px-4">Diagnostic Profile</th>
                      <th className="py-3 px-4 text-center">Health 1 (₹999)</th>
                      <th className="py-3 px-4 text-center bg-teal/5 text-teal-dark">Master 2 (₹1,800)</th>
                      <th className="py-3 px-4 text-center">Advanced 3 (₹2,500)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                    {TEST_CATEGORIES.map((test) => {
                      const inPkg1 = MASTER_PACKAGES[0].includedTests.includes(test.id);
                      const inPkg2 = MASTER_PACKAGES[1].includedTests.includes(test.id);
                      const inPkg3 = MASTER_PACKAGES[2].includedTests.includes(test.id);
                      return (
                        <tr key={test.id} className="hover:bg-slate-50/70">
                          <td className="py-3 px-4 font-semibold text-navy">
                            {test.name} {test.parameterCount > 0 && <span className="text-slate-400 font-normal">({test.parameterCount} tests)</span>}
                          </td>
                          <td className="py-3 px-4 text-center font-bold">{inPkg1 ? <span className="text-teal">✓</span> : <span className="text-slate-300">—</span>}</td>
                          <td className="py-3 px-4 text-center font-bold bg-teal/5">{inPkg2 ? <span className="text-teal">✓</span> : <span className="text-slate-300">—</span>}</td>
                          <td className="py-3 px-4 text-center font-bold">{inPkg3 ? <span className="text-teal">✓</span> : <span className="text-slate-300">—</span>}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ─── Client Flyer Callout Banner ─── */}
        <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-deep-navy to-navy text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-clinical">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full text-[11px] font-bold bg-teal/20 text-teal-light border border-teal/30">
              <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
              <span>Official Laboratory Price Sheet</span>
            </div>
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-white">
              Need individual tests? Browse our 100-test directory.
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Inspect all 100 pathology tests starting from ₹50 with transparent rates, or preview the official laboratory price chart.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handleOpenFlyer}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold bg-white text-navy hover:bg-slate-100 transition-colors cursor-pointer shadow-xs"
            >
              <svg className="w-4 h-4 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>View Price List</span>
            </button>

            <a
              href="#tests"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold bg-teal hover:bg-teal-dark text-white transition-colors cursor-pointer shadow-xs"
            >
              <span>Search 100 Tests</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
