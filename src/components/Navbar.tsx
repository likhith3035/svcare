"use client";

import { useState } from "react";
import Logo from "@/components/Logo";
import OpeningBanner from "@/components/OpeningBanner";
import { SITE, CONTACT } from "@/data/site";
import { useOpenStatus } from "@/hooks/useOpenStatus";
import { useLanguage } from "@/context/LanguageContext";

const NAV_LINKS = [
  { label: "Packages", href: "#packages" },
  { label: "100 Tests", href: "#tests" },
  { label: "Home Collection", href: "#home-collection" },
  { label: "ISO Certified", href: "#accreditation" },
  { label: "Book a Test", href: "#booking" },
  { label: "Our Lab", href: "#contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isOpen = useOpenStatus();
  const { globalTelugu, toggleGlobal } = useLanguage();

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Inaugural Opening Offers Announcement Bar */}
      <OpeningBanner />

      <nav
        className="bg-white/92 backdrop-blur-md border-b border-slate-200/70 transition-colors shadow-2xs"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="flex h-13 sm:h-14 items-center justify-between gap-3">
            {/* Logo */}
            <a
              href="#"
              className="flex items-center gap-2.5 shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
              aria-label={SITE.name}
            >
              <Logo variant="light" className="h-7 sm:h-8 w-auto" priority />
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-0.5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-2.5 py-1 text-xs font-semibold text-slate-600 hover:text-navy hover:bg-slate-100/70 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Right Action Area */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Language Switcher Pill (Telugu / English) */}
              <button
                type="button"
                onClick={toggleGlobal}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-all border cursor-pointer select-none shrink-0 ${
                  globalTelugu
                    ? "bg-teal text-white border-teal shadow-2xs hover:bg-teal-dark"
                    : "bg-slate-100 hover:bg-slate-200/80 text-slate-700 border-slate-200"
                }`}
                title={globalTelugu ? "Switch key sentences to English" : "తెలుగులో చదవండి (Read in Telugu)"}
                aria-label={globalTelugu ? "Switch to English" : "Switch to Telugu"}
              >
                <span className="text-[11px] leading-none">🌐</span>
                <span className="tracking-tight">{globalTelugu ? "తెలుగు" : "English"}</span>
              </button>

              {/* Instagram Quick Link (Desktop/Tablet) */}
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden xl:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-slate-600 hover:text-pink-600 hover:bg-pink-50 border border-transparent hover:border-pink-200 transition-colors text-xs font-semibold"
                title="Follow @svcarehealth on Instagram"
                aria-label="Instagram @svcarehealth"
              >
                <svg className="w-3.5 h-3.5 fill-current text-pink-600" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>Instagram</span>
              </a>

              {/* Live Open/Closed Status Badge */}
              {isOpen !== null && (
                <div
                  className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold
                    bg-slate-100/90 border border-slate-200 text-slate-700 shrink-0"
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      isOpen ? "bg-emerald-500 animate-pulse" : "bg-red"
                    }`}
                    aria-hidden="true"
                  />
                  <span>{isOpen ? "Open • 6 AM – 8 PM" : "Closed • Opens 6 AM"}</span>
                </div>
              )}

              {/* Direct Call Button (Desktop/Tablet) */}
              <a
                href={CONTACT.dialLinks[0]}
                className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold
                  text-white bg-red hover:bg-red-hover rounded-lg shadow-2xs transition-all
                  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red
                  active:scale-[0.98] shrink-0"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>Call Lab</span>
              </a>

              {/* Mobile Hamburger Toggle */}
              <button
                type="button"
                className="lg:hidden p-1.5 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors
                  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-expanded={mobileOpen}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
              >
                {mobileOpen ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white/98 shadow-xl animate-fade-in">
            <div className="px-4 py-3 space-y-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:text-teal hover:bg-teal/5 transition-colors"
                >
                  {link.label}
                </a>
              ))}

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <a
                  href={SITE.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-pink-600 bg-pink-50 rounded-lg"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span>@svcarehealth</span>
                </a>

                {isOpen !== null && (
                  <span className="text-xs font-semibold text-slate-500">
                    {isOpen ? "🟢 Open 6 AM – 8 PM" : "🔴 Closed • Opens 6 AM"}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
