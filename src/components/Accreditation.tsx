"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ACCREDITATION, PLACEHOLDERS } from "@/data/site";

export default function Accreditation() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Listen for global open-certificate-modal events from Navbar, Hero, or Footer
  useEffect(() => {
    function handleOpenEvent() {
      setIsModalOpen(true);
      setZoomLevel(1);
    }
    window.addEventListener("open-certificate-modal", handleOpenEvent);
    return () => window.removeEventListener("open-certificate-modal", handleOpenEvent);
  }, []);

  // Close modal on Escape key & reset zoom
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsModalOpen(false);
        setZoomLevel(1);
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

  function handleZoomIn() {
    setZoomLevel((prev) => Math.min(prev + 0.5, 2.5));
  }

  function handleZoomOut() {
    setZoomLevel((prev) => Math.max(prev - 0.5, 1));
  }

  function handleResetZoom() {
    setZoomLevel(1);
  }

  if (!PLACEHOLDERS.showAccreditations) {
    return null;
  }

  return (
    <section id="accreditation" className="py-12 sm:py-20 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-t border-slate-200/80 scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-teal/10 text-teal-dark border border-teal/20 mb-3 shadow-2xs">
            <svg className="w-3.5 h-3.5 text-teal shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>Official Quality Accreditation</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-4xl lg:text-[2.6rem] font-extrabold text-navy tracking-tight leading-tight">
            ISO 9001:2015 Certified Diagnostic Quality
          </h2>
          <p className="mt-2.5 text-slate-600 text-xs sm:text-base leading-relaxed max-w-2xl mx-auto">
            SV Care Health Diagnostics is officially assessed and certified under international <strong className="text-navy font-bold">Quality Management Systems (QMS)</strong> standards for independent pathological and diagnostic laboratories.
          </p>
        </div>

        {/* Main Grid: Responsive 2-Col on Desktop, Certificate Priority on Mobile */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-start mb-12">
          
          {/* ─── Column 1: Visual Framed Certificate Preview (5 cols on desktop, on mobile placed top) ─── */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div
              onClick={() => {
                setIsModalOpen(true);
                setZoomLevel(1);
              }}
              className="group relative w-full max-w-md rounded-2xl sm:rounded-3xl bg-white p-2.5 sm:p-4 shadow-xl sm:shadow-2xl border border-slate-200/90 transition-all duration-300 hover:shadow-teal/20 hover:-translate-y-1 cursor-pointer overflow-hidden"
            >
              {/* Top Seal Badge */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-extrabold bg-navy text-white shadow-md border border-teal/40 flex items-center gap-1.5 backdrop-blur-xs">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-teal animate-pulse" />
                <span>ISO 9001:2015</span>
              </div>

              {/* Certificate Image Frame - 1:1.414 Aspect Ratio */}
              <div className="relative aspect-[1/1.414] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 flex items-center justify-center">
                <Image
                  src={ACCREDITATION.imagePath}
                  alt="SV Care Health Diagnostics ISO 9001:2015 Certificate of Registration"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 450px"
                  className="object-contain p-1 sm:p-2 transition-transform duration-500 group-hover:scale-105"
                  priority
                />

                {/* Hover / Tap overlay hint */}
                <div className="absolute inset-0 bg-navy/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 text-white p-4 text-center">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white text-navy flex items-center justify-center shadow-lg">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-navy/80 px-3 py-1 rounded-full">
                    Tap to Zoom & Inspect Certificate
                  </span>
                </div>
              </div>

              {/* Card Footer Caption */}
              <div className="mt-2.5 sm:mt-3 px-1 flex items-center justify-between text-xs text-slate-500 font-medium">
                <span className="font-mono font-bold text-slate-700 text-[11px] sm:text-xs">
                  Cert #{ACCREDITATION.certificateNumber}
                </span>
                <span className="text-teal font-bold group-hover:underline text-[11px] sm:text-xs flex items-center gap-1">
                  <span>Expand & Zoom</span>
                  <span>↗</span>
                </span>
              </div>
            </div>

            {/* Mobile Quick Action Buttons directly beneath certificate */}
            <div className="w-full max-w-md grid grid-cols-2 gap-2 mt-3 sm:hidden">
              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(true);
                  setZoomLevel(1);
                }}
                className="py-2.5 px-3 rounded-xl text-xs font-bold bg-navy text-white text-center shadow-xs flex items-center justify-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>View Full Screen</span>
              </button>

              <a
                href={ACCREDITATION.pdfPath}
                download="SV-Care-ISO-9001-Certificate.pdf"
                className="py-2.5 px-3 rounded-xl text-xs font-bold bg-white text-navy border border-slate-200 text-center shadow-xs flex items-center justify-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Download PDF</span>
              </a>
            </div>
          </div>

          {/* ─── Column 2: Official Verified Credentials Breakdown (7 cols on desktop) ─── */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5">
            {/* Main Accreditation Specs Card */}
            <div className="p-4 sm:p-7 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-clinical space-y-4 sm:space-y-5">
              
              {/* Card Header & One-Click Copy */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 sm:pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-teal/10 border border-teal/20 flex items-center justify-center text-teal shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-teal block">
                      Certificate of Registration
                    </span>
                    <h3 className="font-heading text-base sm:text-xl font-bold text-navy">
                      {ACCREDITATION.standard}
                    </h3>
                  </div>
                </div>

                {/* Copy Certificate Button */}
                <button
                  type="button"
                  onClick={handleCopyCertNo}
                  className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-mono font-bold text-slate-700 transition-colors cursor-pointer"
                  title="Click to copy certificate number"
                >
                  <span>Cert #{ACCREDITATION.certificateNumber}</span>
                  <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  {copied && <span className="text-teal font-sans text-[10px]">Copied!</span>}
                </button>
              </div>

              {/* Verified Details Grid */}
              <div className="grid sm:grid-cols-2 gap-2.5 sm:gap-3.5 text-xs">
                <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-100">
                  <span className="text-slate-400 block font-medium text-[11px]">Certified Organization</span>
                  <strong className="text-navy font-bold text-xs sm:text-sm">{ACCREDITATION.registeredEntity}</strong>
                </div>

                <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-100">
                  <span className="text-slate-400 block font-medium text-[11px]">UK Accreditation Body</span>
                  <strong className="text-navy font-bold text-xs sm:text-sm">{ACCREDITATION.accreditedBy}</strong>
                  <span className="text-[10px] text-slate-500 block">London, England • Co. No. {ACCREDITATION.companyNumber}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-100">
                  <span className="text-slate-400 block font-medium text-[11px]">Certified Pathology Scope</span>
                  <strong className="text-navy font-bold leading-tight block mt-0.5 text-xs sm:text-sm">
                    {ACCREDITATION.scope}
                  </strong>
                </div>

                <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-100">
                  <span className="text-slate-400 block font-medium text-[11px]">Registration & Validity Dates</span>
                  <strong className="text-navy font-bold block text-xs sm:text-sm">
                    {ACCREDITATION.registeredDate} to {ACCREDITATION.recertificationDate}
                  </strong>
                  <span className="text-[10px] text-emerald-700 font-semibold block">
                    Active & Surveillance Audited
                  </span>
                </div>

                <div className="sm:col-span-2 p-3 rounded-xl bg-slate-50/80 border border-slate-100">
                  <span className="text-slate-400 block font-medium text-[11px]">Audited Facility Address</span>
                  <p className="text-navy font-semibold text-xs leading-relaxed mt-0.5">
                    {ACCREDITATION.registeredAddress}
                  </p>
                </div>
              </div>

              {/* Desktop Action Buttons */}
              <div className="hidden sm:flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(true);
                    setZoomLevel(1);
                  }}
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

            {/* Quality Assurance Pillars - 2x2 grid on mobile, 4 columns on desktop */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
              {ACCREDITATION.pillars.map((pillar, i) => (
                <div key={i} className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-1">
                  <div className="w-6 h-6 rounded-lg bg-teal/10 text-teal flex items-center justify-center">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-xs font-bold text-navy leading-tight">{pillar.title}</h4>
                  <p className="text-[10px] sm:text-[11px] text-slate-500 leading-snug">{pillar.desc}</p>
                </div>
              ))}
            </div>

            {/* Registrar Verification Callout for Mobile */}
            <div className="sm:hidden text-center pt-1">
              <a
                href={ACCREDITATION.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-teal hover:underline"
              >
                <span>Verify Registration on Registrar Site (eucert.co.uk)</span>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* ─── FULL HIGH-RES CERTIFICATE LIGHTBOX MODAL WITH ZOOM CONTROLS ─── */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center p-0 sm:p-4 md:p-6 bg-black/90 backdrop-blur-md animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label="ISO 9001:2015 Certificate of Registration Lightbox"
        >
          <div className="relative w-full h-full sm:h-auto sm:max-w-4xl sm:max-h-[94vh] bg-white sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col">
            
            {/* Modal Top Bar */}
            <div className="bg-navy text-white px-3.5 py-3 sm:px-5 sm:py-4 flex items-center justify-between shrink-0 border-b border-navy-light">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 pr-2">
                <span className="w-2.5 h-2.5 rounded-full bg-teal animate-pulse shrink-0" />
                <div className="min-w-0">
                  <h3 className="font-heading text-xs sm:text-base font-bold text-white truncate">
                    Certificate of Registration — ISO 9001:2015
                  </h3>
                  <p className="text-[10px] sm:text-xs text-slate-300 truncate">
                    SV Care Health Diagnostics • Cert #{ACCREDITATION.certificateNumber}
                  </p>
                </div>
              </div>

              {/* Actions & Close */}
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                {/* Zoom Controls */}
                <div className="hidden sm:inline-flex items-center bg-white/10 rounded-lg p-0.5 border border-white/15 text-xs text-white">
                  <button
                    type="button"
                    onClick={handleZoomOut}
                    disabled={zoomLevel <= 1}
                    className="px-2 py-1 hover:bg-white/15 rounded disabled:opacity-30 cursor-pointer"
                    title="Zoom out"
                  >
                    −
                  </button>
                  <button
                    type="button"
                    onClick={handleResetZoom}
                    className="px-2 py-1 font-mono hover:bg-white/15 rounded cursor-pointer"
                    title="Reset zoom"
                  >
                    {Math.round(zoomLevel * 100)}%
                  </button>
                  <button
                    type="button"
                    onClick={handleZoomIn}
                    disabled={zoomLevel >= 2.5}
                    className="px-2 py-1 hover:bg-white/15 rounded disabled:opacity-30 cursor-pointer"
                    title="Zoom in"
                  >
                    +
                  </button>
                </div>

                <a
                  href={ACCREDITATION.pdfPath}
                  download="SV-Care-ISO-9001-Certificate.pdf"
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-teal hover:bg-teal-dark text-white text-[11px] sm:text-xs font-bold transition-colors cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span className="hidden xs:inline">Download</span>
                  <span>PDF</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setZoomLevel(1);
                  }}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Mobile Zoom Floating Bar */}
            <div className="sm:hidden bg-slate-800 text-white px-3 py-1.5 flex items-center justify-between text-xs shrink-0 border-b border-slate-700">
              <span className="text-[11px] text-slate-300">Pinch or use buttons to zoom:</span>
              <div className="flex items-center gap-1.5 bg-slate-700/80 rounded-lg p-0.5">
                <button
                  type="button"
                  onClick={handleZoomOut}
                  disabled={zoomLevel <= 1}
                  className="px-2 py-0.5 font-bold rounded disabled:opacity-30 bg-slate-600"
                >
                  −
                </button>
                <span className="px-1.5 font-mono text-[11px] font-bold">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  type="button"
                  onClick={handleZoomIn}
                  disabled={zoomLevel >= 2.5}
                  className="px-2 py-0.5 font-bold rounded disabled:opacity-30 bg-slate-600"
                >
                  +
                </button>
                {zoomLevel > 1 && (
                  <button
                    type="button"
                    onClick={handleResetZoom}
                    className="px-1.5 py-0.5 text-[10px] text-teal-light underline"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>

            {/* Scrollable / Zoomable High-Resolution Certificate Canvas */}
            <div className="flex-1 overflow-auto bg-slate-900 p-2 sm:p-4 md:p-6 flex justify-center items-start">
              <div
                style={{
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: "top center",
                  transition: "transform 0.15s ease-out",
                }}
                className="relative w-full max-w-xl bg-white rounded-lg sm:rounded-xl shadow-2xl overflow-hidden shrink-0 my-auto"
              >
                <Image
                  src={ACCREDITATION.imagePath}
                  alt="Official ISO 9001:2015 Certificate for SV Care Health Diagnostics"
                  width={1787}
                  height={2527}
                  className="w-full h-auto object-contain block"
                  priority
                />
              </div>
            </div>

            {/* Modal Bottom Footer Callout */}
            <div className="bg-slate-50 px-3.5 py-2.5 sm:px-5 sm:py-3.5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 text-xs text-slate-600 shrink-0">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-center sm:text-left">
                <span className="font-bold text-navy">
                  Registrar: {ACCREDITATION.accreditedBy} (London, UK)
                </span>
                <span className="hidden sm:inline">•</span>
                <a
                  href={ACCREDITATION.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal font-bold hover:underline"
                >
                  Verify at eucert.co.uk ↗
                </a>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(false);
                  setZoomLevel(1);
                }}
                className="w-full sm:w-auto px-4 py-1.5 rounded-lg bg-slate-200 text-slate-700 font-bold hover:bg-slate-300 transition-colors cursor-pointer text-xs"
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
