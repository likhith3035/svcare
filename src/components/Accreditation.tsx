"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ACCREDITATION, PLACEHOLDERS } from "@/data/site";

export default function Accreditation() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Listen for global open-certificate-modal events from Navbar, Hero, or Footer
  useEffect(() => {
    function handleOpenEvent() {
      setIsModalOpen(true);
    }
    window.addEventListener("open-certificate-modal", handleOpenEvent);
    return () => window.removeEventListener("open-certificate-modal", handleOpenEvent);
  }, []);

  // Close modal on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      }
    }
    if (isModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  function handleCopyCertNo() {
    navigator.clipboard?.writeText(ACCREDITATION.certificateNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (!PLACEHOLDERS.showAccreditations) {
    return null;
  }

  return (
    <section id="accreditation" className="py-16 sm:py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-t border-slate-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-teal/10 text-teal-dark border border-teal/20 mb-4 shadow-2xs">
            <svg className="w-3.5 h-3.5 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>International Quality Accreditation</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-navy tracking-tight">
            ISO 9001:2015 Certified Diagnostic Quality
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            SV Care Health Diagnostics is independently assessed and certified under international Quality Management Systems (QMS) for independent diagnostic and pathological laboratories.
          </p>
        </div>

        {/* Main Grid: Details & Framed Certificate Preview */}
        <div className="grid lg:grid-cols-12 gap-8 items-center mb-14">
          {/* Left Column: Official Certificate Specs & Actions (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Accreditation Badge Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-clinical space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-teal/10 border border-teal/20 flex items-center justify-center text-teal shrink-0">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-teal">
                      Official Certificate of Registration
                    </span>
                    <h3 className="font-heading text-lg sm:text-xl font-bold text-navy">
                      {ACCREDITATION.standard}
                    </h3>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyCertNo}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-mono font-bold text-slate-700 transition-colors cursor-pointer"
                  title="Click to copy certificate number"
                >
                  <span>Cert #{ACCREDITATION.certificateNumber}</span>
                  <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  {copied && <span className="text-teal font-sans text-[10px]">Copied!</span>}
                </button>
              </div>

              {/* Specification List */}
              <div className="grid sm:grid-cols-2 gap-3.5 text-xs">
                <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-100">
                  <span className="text-slate-400 block font-medium">Certified Entity</span>
                  <strong className="text-navy font-bold">{ACCREDITATION.registeredEntity}</strong>
                </div>

                <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-100">
                  <span className="text-slate-400 block font-medium">Accreditation Body</span>
                  <strong className="text-navy font-bold">{ACCREDITATION.accreditedBy} (UK)</strong>
                </div>

                <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-100">
                  <span className="text-slate-400 block font-medium">Service Scope</span>
                  <strong className="text-navy font-bold leading-tight block mt-0.5">
                    {ACCREDITATION.scope}
                  </strong>
                </div>

                <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-100">
                  <span className="text-slate-400 block font-medium">Validity Period</span>
                  <strong className="text-navy font-bold">2026 to 2029 (Active & Audited)</strong>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-navy text-white hover:bg-navy-light shadow-2xs transition-colors cursor-pointer"
                >
                  <svg className="w-4 h-4 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span>View Official Certificate</span>
                </button>

                <a
                  href={ACCREDITATION.pdfPath}
                  download="SV-Care-ISO-9001-Certificate.pdf"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-white text-navy hover:bg-slate-50 border border-slate-200 shadow-2xs transition-colors cursor-pointer"
                >
                  <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Download PDF</span>
                </a>

                <a
                  href={ACCREDITATION.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-teal transition-colors ml-auto pt-1"
                >
                  <span>Verify at eucert.co.uk</span>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quality Assurance Pillars */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {ACCREDITATION.pillars.map((pillar, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-1">
                  <div className="w-6 h-6 rounded-lg bg-teal/10 text-teal flex items-center justify-center">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-xs font-bold text-navy leading-tight">{pillar.title}</h4>
                  <p className="text-[11px] text-slate-500 leading-snug">{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Visual Framed Certificate Preview (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              onClick={() => setIsModalOpen(true)}
              className="group relative w-full max-w-sm rounded-3xl bg-white p-3.5 shadow-2xl border border-slate-200/90 transition-all duration-300 hover:shadow-teal/20 hover:-translate-y-1 cursor-pointer overflow-hidden"
            >
              {/* Top Seal Badge */}
              <div className="absolute top-6 right-6 z-20 px-3 py-1 rounded-full text-[11px] font-extrabold bg-navy text-white shadow-md border border-teal/40 flex items-center gap-1.5 backdrop-blur-xs">
                <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
                <span>ISO 9001:2015</span>
              </div>

              {/* Certificate Image Frame */}
              <div className="relative aspect-[1/1.414] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                <Image
                  src={ACCREDITATION.imagePath}
                  alt="SV Care Health Diagnostics ISO 9001:2015 Certificate of Registration"
                  fill
                  sizes="(max-width: 640px) 100vw, 400px"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  priority
                />

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-navy/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 text-white p-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-white text-navy flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider">Click to Inspect Certificate</span>
                </div>
              </div>

              {/* Card Footer Caption */}
              <div className="mt-3 px-2 flex items-center justify-between text-xs text-slate-500 font-medium">
                <span>Registration No: EU/QMS/01326</span>
                <span className="text-teal font-bold group-hover:underline">Click to Expand ↗</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── FULL HIGH-RES CERTIFICATE LIGHTBOX MODAL ─── */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label="ISO 9001:2015 Certificate of Registration"
        >
          <div className="relative w-full max-w-3xl max-h-[92vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col">
            {/* Modal Top Bar */}
            <div className="bg-navy text-white px-5 py-4 flex items-center justify-between shrink-0 border-b border-navy-light">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-teal animate-pulse" />
                <div>
                  <h3 className="font-heading text-base font-bold text-white">
                    Certificate of Registration — ISO 9001:2015
                  </h3>
                  <p className="text-xs text-slate-300">
                    SV Care Health Diagnostics • Cert No: {ACCREDITATION.certificateNumber}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={ACCREDITATION.pdfPath}
                  download="SV-Care-ISO-9001-Certificate.pdf"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal hover:bg-teal-dark text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Download PDF</span>
                </a>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Scrollable Certificate Image Container */}
            <div className="flex-1 overflow-auto bg-slate-900 p-3 sm:p-5 flex justify-center items-start">
              <div className="relative w-full max-w-xl bg-white rounded-xl shadow-2xl overflow-hidden">
                <Image
                  src={ACCREDITATION.imagePath}
                  alt="Official ISO 9001:2015 Certificate for SV Care Health Diagnostics"
                  width={1654}
                  height={2339}
                  className="w-full h-auto object-contain"
                  priority
                />
              </div>
            </div>

            {/* Modal Bottom Footer Callout */}
            <div className="bg-slate-50 px-5 py-3.5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 shrink-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-bold text-navy">Accredited by: {ACCREDITATION.accreditedBy} (London, England)</span>
                <span>•</span>
                <a
                  href={ACCREDITATION.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal font-semibold hover:underline"
                >
                  Verify at eucert.co.uk
                </a>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-1.5 rounded-lg bg-slate-200 text-slate-700 font-bold hover:bg-slate-300 transition-colors cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
