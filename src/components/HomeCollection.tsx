"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { SAMPLE_REPORT, SITE } from "@/data/site";
import SampleReportModal from "@/components/SampleReportModal";

const STEPS = [
  {
    number: "01",
    title: "Schedule in seconds",
    subtitle: "Book Online or WhatsApp",
    description: "Select your health package or test, choose a convenient morning slot and your doorstep address.",
  },
  {
    number: "02",
    title: "Sterile sample pickup",
    subtitle: "Certified Phlebotomist",
    description: "Our vaccinated technician visits with sealed, single-use BD vacutainers and temperature-controlled collection kit.",
  },
  {
    number: "03",
    title: "Same-day verified report",
    subtitle: "Delivered in 4–6 Hours",
    description: "Receive clinically verified, tamper-proof digital PDF reports directly on WhatsApp and email.",
  },
];

const LOCALITIES = [
  "Babu Agraharam",
  "PNR Convention Area",
  "Temple Road",
  "Koneru",
  "Railway Station Road",
  "All Srikalahasti Localities",
];

const REPORT_GUARANTEES = [
  {
    title: "100% Doctor & Hospital Accepted",
    description: "Signed by MD Clinical Pathologist and registered technicians under ISO 9001:2015 QMS standards. Recognized by all physicians and hospitals.",
    icon: (
      <svg className="w-5 h-5 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "WhatsApp PDF in 4–6 Hours",
    description: "Samples drawn in the morning (from 6:00 AM) are processed immediately. Get high-definition PDF reports delivered straight to your WhatsApp by 10:45 AM.",
    icon: (
      <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Tamper-Proof QR Code Verification",
    description: "Every report features a unique cryptographic verification QR code that instantly authenticates clinical test parameters against central records.",
    icon: (
      <svg className="w-5 h-5 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
      </svg>
    ),
  },
  {
    title: "Password-Protected Confidentiality",
    description: "Medical records are secured with Date-of-Birth encryption, ensuring your confidential health records remain strictly private and HIPAA/GDPR compliant.",
    icon: (
      <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
];

export default function HomeCollection() {
  const [isReportOpen, setIsReportOpen] = useState(false);

  // Listen for global open-sample-report-modal events
  useEffect(() => {
    function handleOpenEvent() {
      setIsReportOpen(true);
    }
    window.addEventListener("open-sample-report-modal", handleOpenEvent);
    return () => window.removeEventListener("open-sample-report-modal", handleOpenEvent);
  }, []);

  const whatsappBookingUrl = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
    "Hello SV Care Health Diagnostics, I saw your sample diagnostic report preview and would like to book a blood test appointment for home collection."
  )}`;

  return (
    <section id="home-collection" className="py-14 sm:py-20 bg-white scroll-mt-16 border-t border-slate-200/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-teal/10 text-teal-dark mb-3">
            <span>Free Doorstep Diagnostics</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-navy tracking-tight">
            The lab comes to you. <span className="text-teal font-normal italic">Free.</span>
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Zero travel hassle, zero waiting rooms. Safe, hygienic sample collection in the comfort of your home or office.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="p-6 sm:p-7 rounded-3xl bg-[#F6F9FA] border border-slate-200/80 hover:border-teal hover:bg-white hover:shadow-clinical transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-12 h-12 rounded-2xl bg-teal/15 text-teal font-mono font-black text-lg flex items-center justify-center">
                    {step.number}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-teal-dark bg-teal-light/50 px-2.5 py-1 rounded-full">
                    {step.subtitle}
                  </span>
                </div>
                <h3 className="font-heading text-xl font-bold text-navy mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>

              {step.number === "03" ? (
                <button
                  type="button"
                  onClick={() => setIsReportOpen(true)}
                  className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between w-full text-xs font-bold text-teal hover:text-teal-dark transition-colors cursor-pointer group/btn"
                >
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
                    <span>View Sample Report</span>
                  </span>
                  <span className="group-hover/btn:translate-x-1 transition-transform font-bold">↗</span>
                </button>
              ) : (
                <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center gap-2 text-xs font-semibold text-teal">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Zero convenience fee</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ─── Official Sample Lab Report Showcase Card ─── */}
        <div className="mb-12 rounded-3xl bg-gradient-to-br from-slate-900 via-navy to-slate-900 text-white p-6 sm:p-8 lg:p-10 border border-slate-700/80 shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-red/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Column: Realistic Letterhead Report Preview Thumbnail */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div
                onClick={() => setIsReportOpen(true)}
                className="group relative w-full max-w-sm sm:max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-slate-600/60 hover:border-teal transition-all duration-300 cursor-pointer text-slate-800"
              >
                {/* Letterhead Header Indicator */}
                <div className="bg-slate-100 px-3.5 py-2 border-b border-slate-200 flex items-center justify-between text-[11px] text-slate-600 font-semibold">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
                    <span className="font-bold text-navy truncate">SV Care Official Letterhead</span>
                  </div>
                  <span className="font-mono text-[10px] text-slate-500 font-bold bg-white px-2 py-0.5 rounded border border-slate-200">
                    {SAMPLE_REPORT.sampleBarcode}
                  </span>
                </div>

                {/* Report Image Preview with Hover Overlay */}
                <div className="relative aspect-[1/1.38] w-full overflow-hidden bg-slate-50">
                  <Image
                    src={SAMPLE_REPORT.imagePath}
                    alt="SV Care Health Diagnostics Sample Letterhead Report"
                    width={800}
                    height={1100}
                    className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-300"
                  />
                  {/* Gradient Hover Prompt Overlay */}
                  <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors flex items-center justify-center p-4">
                    <div className="bg-navy/90 backdrop-blur-md text-white text-xs font-bold px-4 py-2.5 rounded-xl border border-white/20 shadow-xl group-hover:scale-105 transition-transform flex items-center gap-2">
                      <svg className="w-4 h-4 text-teal-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                      <span>Click to Inspect Full Report</span>
                    </div>
                  </div>
                </div>

                {/* Sample Summary Strip */}
                <div className="p-3 bg-slate-50 border-t border-slate-200 text-left">
                  <div className="flex items-center justify-between text-xs font-bold text-navy mb-1.5">
                    <span>{SAMPLE_REPORT.patientName}</span>
                    <span className="text-[11px] font-normal text-slate-500 font-mono">{SAMPLE_REPORT.uhid}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 text-[10px] font-semibold text-slate-600">
                    <span className="px-2 py-0.5 rounded bg-emerald-100/80 text-emerald-800">FBS: 92 mg/dL</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-100/80 text-emerald-800">HbA1c: 5.4%</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-100/80 text-emerald-800">Creatinine: 0.94</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-100/80 text-emerald-800">Hb: 14.6</span>
                  </div>
                </div>
              </div>

              {/* Sub-prompt under thumbnail */}
              <button
                type="button"
                onClick={() => setIsReportOpen(true)}
                className="mt-3 text-xs text-teal-light hover:text-white font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Inspect doctor signatures & QR verification</span>
                <span className="font-bold">↗</span>
              </button>
            </div>

            {/* Right Column: 4 Patient Trust Guarantees & Instant CTAs */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-teal/20 text-teal-light mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
                <span>WhatsApp Digital PDF Delivery</span>
              </div>

              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                Physician-Accepted Lab Reports, <span className="text-teal-light">Delivered to WhatsApp</span>
              </h3>

              <p className="mt-2 text-slate-300 text-sm leading-relaxed">
                Every test is conducted on fully automated clinical analyzers under strict ISO 9001:2015 quality control, verified by registered pathologists, and delivered straight to your phone.
              </p>

              {/* 4 Trust Highlights Grid */}
              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                {REPORT_GUARANTEES.map((item) => (
                  <div
                    key={item.title}
                    className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
                  >
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <div className="p-1.5 rounded-xl bg-white/10 shrink-0">
                        {item.icon}
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed pl-8">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Actions Stack */}
              <div className="mt-7 pt-5 border-t border-white/10 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsReportOpen(true)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-teal hover:bg-teal-hover shadow-lg shadow-teal/20 transition-all cursor-pointer active:scale-[0.98]"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                  <span>Inspect Full Sample Report</span>
                </button>

                <a
                  href={whatsappBookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/15 transition-all"
                >
                  <svg className="w-4 h-4 fill-current text-emerald-400 shrink-0" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.69 0-3.259-.52-4.555-1.408l-.327-.194-2.871.852.852-2.871-.194-.327A7.96 7.96 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
                  </svg>
                  <span>Book on WhatsApp</span>
                </a>

                <a
                  href={SAMPLE_REPORT.pdfPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  download="SV-Care-Sample-Report.pdf"
                  className="inline-flex items-center gap-1.5 px-3 py-3 rounded-xl text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Download Sample PDF (638 KB)</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Coverage Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-navy to-navy-light text-white shadow-clinical flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-teal-light">
                Doorstep Coverage Area
              </span>
            </div>
            <h4 className="text-lg font-bold text-white">
              Prompt Home Collection Active Across Srikalahasti
            </h4>
            <div className="flex flex-wrap gap-2 mt-3">
              {LOCALITIES.map((loc) => (
                <span
                  key={loc}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-white/10 border border-white/15 text-slate-200"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-teal" />
                  {loc}
                </span>
              ))}
            </div>
          </div>

          <a
            href="#booking"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-red hover:bg-red-hover shadow-md transition-all shrink-0 active:scale-[0.98]"
          >
            <span>Book Home Visit</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      <SampleReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
      />
    </section>
  );
}
