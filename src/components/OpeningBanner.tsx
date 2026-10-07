"use client";

import { useState } from "react";
import Image from "next/image";
import { SITE, OPENING_OFFERS } from "@/data/site";

export default function OpeningBanner() {
  const [isDismissed, setIsDismissed] = useState(false);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);

  if (isDismissed) return null;

  function handleClaimOffer(offerId: string) {
    const el = document.getElementById("booking");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    window.dispatchEvent(new CustomEvent("select-package", { detail: offerId }));
  }

  const whatsappOfferUrl = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
    "Hello SV Care Health Diagnostics, I would like to claim your *Grand Opening Offer* (FREE Sugar Test / 1st 10 Members Free Body Checkup). Please confirm how I can avail this."
  )}`;

  return (
    <>
      {/* Top Banner */}
      <aside
        className="relative bg-gradient-to-r from-red via-[#D92D20] to-[#E53E3E] text-white py-1.5 sm:py-2.5 px-3 sm:px-4 shadow-md z-40 border-b border-red-700/50"
        aria-label="Grand Opening Offer Announcement"
      >
        <div className="mx-auto max-w-7xl flex items-center justify-between gap-2 text-xs sm:text-sm">
          {/* Mobile view (< sm) */}
          <div className="flex sm:hidden items-center gap-1.5 min-w-0 flex-1">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-white/20 text-white font-extrabold text-[10px] uppercase tracking-wider shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-300 animate-ping mr-1" />
              Offer
            </span>
            <p className="text-[11px] font-bold text-white truncate">
              <strong className="underline decoration-yellow-300">FREE Sugar Test</strong> + 1st 10 Free Checkups!
            </p>
          </div>

          {/* Desktop view (sm+) */}
          <div className="hidden sm:flex flex-wrap items-center gap-2 text-left">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-white font-extrabold text-[11px] uppercase tracking-wider shadow-2xs backdrop-blur-xs">
              <span className="w-2 h-2 rounded-full bg-yellow-300 animate-ping" />
              Opening Offer
            </span>

            <span className="font-bold text-white">
              <strong className="underline decoration-yellow-300 font-extrabold">FREE Sugar Test</strong> (Fasting/Random)
              {" + "}
              <strong className="text-yellow-200 font-extrabold">1st 10 Members FREE Body Checkup!</strong>
            </span>

            <span className="hidden lg:inline text-white/80">•</span>
            <span className="hidden lg:inline text-white/90 italic text-xs">
              Healthy Today — Happier Tomorrow
            </span>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* View Offer Details Button */}
            <button
              type="button"
              onClick={() => setIsOfferModalOpen(true)}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] sm:text-xs font-bold bg-white/15 hover:bg-white/25 text-white transition-all cursor-pointer border border-white/20 shrink-0"
              title="View full flyer and terms"
            >
              <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>Details</span>
            </button>

            {/* Claim on WhatsApp */}
            <a
              href={whatsappOfferUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-black bg-white text-red hover:bg-yellow-50 transition-all shadow-xs shrink-0"
            >
              <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.69 0-3.259-.52-4.555-1.408l-.327-.194-2.871.852.852-2.871-.194-.327A7.96 7.96 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
              </svg>
              <span>Claim</span>
            </a>

            {/* Instagram Link (sm+) */}
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex p-1 rounded-md text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              title="Follow @svcarehealth on Instagram"
              aria-label="Follow SV Care Health Diagnostics on Instagram"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            {/* Dismiss button */}
            <button
              type="button"
              onClick={() => setIsDismissed(true)}
              className="p-1 rounded-md text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer ml-0.5 sm:ml-1"
              aria-label="Dismiss banner"
            >
              ✕
            </button>
          </div>
        </div>
      </aside>

      {/* Opening Offer Flyer Lightbox Modal */}
      {isOfferModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label="Grand Opening Special Offer Details"
        >
          <div className="relative w-full max-w-2xl max-h-[92vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col">
            {/* Modal Header */}
            <div className="bg-red text-white px-5 py-3.5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-300 animate-ping" />
                <div>
                  <h3 className="font-heading text-base font-bold text-white">
                    Grand Opening Special Offer
                  </h3>
                  <p className="text-[11px] text-white/80">
                    SV Care Health Diagnostics • Srikalahasti
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="/opening-offer.jpg"
                  download="SV-Care-Opening-Offer.jpg"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-red text-xs font-bold transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Download</span>
                </a>

                <button
                  type="button"
                  onClick={() => setIsOfferModalOpen(false)}
                  className="p-1.5 rounded-lg bg-white/15 hover:bg-white/30 text-white transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Offer Image Container */}
            <div className="flex-1 overflow-auto bg-slate-900 p-2 sm:p-4 flex justify-center items-start">
              <div className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden">
                <Image
                  src="/opening-offer.jpg"
                  alt="SV Care Health Diagnostics Grand Opening Special Offer"
                  width={800}
                  height={1200}
                  className="w-full h-auto object-contain"
                  priority
                />
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="bg-slate-50 px-5 py-3.5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shrink-0">
              <div className="flex items-center gap-2 text-slate-600">
                <span className="font-bold text-navy">📍 PNR Convention Hall Ground Floor</span>
                <span>•</span>
                <span>📞 8019081501</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsOfferModalOpen(false);
                    handleClaimOffer("offer-sugar");
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-red text-white font-bold hover:bg-red-hover transition-colors cursor-pointer"
                >
                  Book Free Sugar Test
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsOfferModalOpen(false);
                    handleClaimOffer("offer-checkup");
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-navy text-white font-bold hover:bg-navy-light transition-colors cursor-pointer"
                >
                  Book Free Checkup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
