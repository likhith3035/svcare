"use client";

import Image from "next/image";
import { PLACEHOLDERS } from "@/data/site";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * PLACEHOLDER COMPONENTS (Clearly marked, hidden by default per instructions)
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * The client specified:
 * "Google reviews section, clinic photo gallery, accreditation badges.
 *  Hide them until real content exists. https://share.google/QEaqybZ73YKzJuLuh"
 *
 * To enable any section once verified content is available, simply toggle
 * the corresponding boolean in /data/site.ts:
 *   - PLACEHOLDERS.showReviews
 *   - PLACEHOLDERS.showGallery
 *   - PLACEHOLDERS.showAccreditations
 * ─────────────────────────────────────────────────────────────────────────────
 */

export function GoogleReviewsPlaceholder() {
  if (!PLACEHOLDERS.showReviews) {
    // Hidden until verified reviews exist
    return null;
  }

  return (
    <section id="reviews" className="py-16 sm:py-20 bg-background border-t border-card-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
              Patient reviews
            </h2>
            <p className="mt-2 text-muted text-base">
              Verified feedback from patients across Srikalahasti.
            </p>
          </div>
          <a
            href={PLACEHOLDERS.googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold
              bg-card-bg border border-card-border text-foreground hover:border-teal transition-colors"
          >
            Review us on Google
            <svg className="w-4 h-4 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        {/* Real reviews container - populated when available */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Review cards will render here */}
        </div>
      </div>
    </section>
  );
}

export function ClinicGalleryPlaceholder() {
  if (!PLACEHOLDERS.showGallery) {
    // Hidden until client activates photo gallery
    return null;
  }

  const photos = [
    { src: "/clinic/exterior-front.jpg", alt: "SV Care Health Diagnostics storefront at PNR Convention Hall" },
    { src: "/clinic/lab-interior.jpg", alt: "Lab testing area and diagnostic equipment" },
    { src: "/clinic/tests-board.jpg", alt: "Comprehensive test profiles list" },
    { src: "/clinic/packages-board.jpg", alt: "Health checkup packages overview" },
  ];

  return (
    <section id="gallery" className="py-16 sm:py-20 bg-background border-t border-card-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
            Our clinic & lab
          </h2>
          <p className="mt-2 text-muted text-base">
            Modern testing equipment, sanitized phlebotomy stations, and comfortable consultation rooms.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {photos.map((photo, i) => (
            <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden border border-card-border bg-card-bg">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AccreditationsPlaceholder() {
  if (!PLACEHOLDERS.showAccreditations) {
    // Hidden until verified certifications are provided
    return null;
  }

  return (
    <section id="accreditations" className="py-8 bg-card-bg border-y border-card-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-8 text-muted/60 text-xs">
          {/* Accreditation seals will render here */}
        </div>
      </div>
    </section>
  );
}
