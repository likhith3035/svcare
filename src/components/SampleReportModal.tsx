"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { SAMPLE_REPORT, SITE } from "@/data/site";

interface SampleReportModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function SampleReportModal({
  isOpen: controlledIsOpen,
  onClose: controlledOnClose,
}: SampleReportModalProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  function handleClose() {
    if (isControlled && controlledOnClose) {
      controlledOnClose();
    } else {
      setInternalIsOpen(false);
    }
    setZoomLevel(1);
  }

  // Listen for global window events to open modal from any section
  useEffect(() => {
    function handleOpenEvent() {
      setInternalIsOpen(true);
      setZoomLevel(1);
    }
    window.addEventListener("open-sample-report-modal", handleOpenEvent);
    return () => window.removeEventListener("open-sample-report-modal", handleOpenEvent);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Keyboard escape listener
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        handleClose();
      }
    }
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  function handleZoomIn() {
    setZoomLevel((prev) => Math.min(prev + 0.5, 2.5));
  }

  function handleZoomOut() {
    setZoomLevel((prev) => Math.max(prev - 0.5, 1));
  }

  function handleResetZoom() {
    setZoomLevel(1);
  }

  function handleBookFromReport() {
    handleClose();
    const el = document.getElementById("booking");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  if (!isOpen) return null;

  const whatsappBookingUrl = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
    "Hello SV Care Health Diagnostics, I saw your sample lab report preview and would like to book a blood test appointment for home sample collection."
  )}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Official SV Care Sample Diagnostic Report Preview"
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 backdrop-blur-md p-2 sm:p-4 md:p-6 transition-all duration-300 animate-fadeIn"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[94vh] bg-slate-900 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-700/80"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header Bar */}
        <div className="bg-navy px-3.5 py-3 sm:px-5 sm:py-3.5 border-b border-navy-light flex items-center justify-between gap-3 text-white shrink-0">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal animate-pulse shrink-0" />
              <h3 className="text-xs sm:text-sm font-bold truncate">
                Official Sample WhatsApp Report — SV Care
              </h3>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-300 truncate mt-0.5">
              Doctor-Signed & ISO 9001:2015 Verified • Delivered in 4–6 Hours
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* View / Download PDF */}
            <a
              href={SAMPLE_REPORT.pdfPath}
              target="_blank"
              rel="noopener noreferrer"
              download="SV-Care-Sample-Report.pdf"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-teal hover:bg-teal-hover text-white transition-all shadow-xs"
              title="Download Sample PDF"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span className="hidden sm:inline">Download</span> PDF
            </a>

            {/* Close Button */}
            <button
              type="button"
              onClick={handleClose}
              className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer text-sm font-bold"
              aria-label="Close sample report preview"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Modal Secondary Toolbar: Zoom Controls & Instructions */}
        <div className="bg-slate-800/90 px-3.5 py-2 sm:px-5 sm:py-2 border-b border-slate-700/60 flex items-center justify-between text-xs text-slate-300 shrink-0">
          <span className="text-[11px] sm:text-xs text-slate-300 hidden sm:inline">
            Scroll or pinch to inspect clinical parameters:
          </span>
          <span className="text-[11px] text-slate-300 sm:hidden">
            Zoom report:
          </span>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={handleZoomOut}
              disabled={zoomLevel <= 1}
              className="px-2.5 py-1 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-mono font-bold text-xs transition-colors"
              title="Zoom out"
            >
              −
            </button>
            <span className="font-mono text-xs text-teal-light font-bold min-w-[42px] text-center">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              type="button"
              onClick={handleZoomIn}
              disabled={zoomLevel >= 2.5}
              className="px-2.5 py-1 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-mono font-bold text-xs transition-colors"
              title="Zoom in"
            >
              +
            </button>
            {zoomLevel > 1 && (
              <button
                type="button"
                onClick={handleResetZoom}
                className="px-2 py-0.5 text-[10px] text-teal-light underline hover:text-white"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Zoomable High-Resolution Report Canvas */}
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
              src={SAMPLE_REPORT.imagePath}
              alt="Official Sample WhatsApp Lab Report for SV Care Health Diagnostics"
              width={1785}
              height={2523}
              className="w-full h-auto object-contain block"
              priority
            />
          </div>
        </div>

        {/* Modal Bottom Callout & Quick Action Bar */}
        <div className="bg-slate-950 px-3.5 py-2.5 sm:px-5 sm:py-3.5 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs text-slate-300 shrink-0">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-[11px] sm:text-xs text-slate-300 text-center sm:text-left">
            <span className="inline-flex items-center gap-1 text-emerald-400 font-bold">
              ✓ 100% Doctor Accepted
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="text-slate-400">Password-Protected PDF on WhatsApp</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-teal font-semibold">Ready in 4–6 Hours</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <a
              href={whatsappBookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#1E9C80] hover:bg-[#16856C] transition-all shadow-xs"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.69 0-3.259-.52-4.555-1.408l-.327-.194-2.871.852.852-2.871-.194-.327A7.96 7.96 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
              </svg>
              <span>Book on WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={handleBookFromReport}
              className="flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold text-white bg-red hover:bg-red-hover transition-colors shadow-xs"
            >
              Book Home Pickup (₹0)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
