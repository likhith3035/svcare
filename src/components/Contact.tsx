"use client";

import Image from "next/image";
import { CONTACT, HOURS, SITE } from "@/data/site";
import { useTodayIndex } from "@/hooks/useOpenStatus";

export default function Contact() {
  const todayIndex = useTodayIndex();

  return (
    <section id="contact" className="py-14 sm:py-20 bg-white scroll-mt-16 border-t border-slate-200/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-teal/10 text-teal-dark mb-2">
            <span>Laboratory Location & Hours</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy">
            Visit our lab in Srikalahasti
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base leading-relaxed">
            Centrally situated at PNR Convention Hall, Babu Agraharam Koneru. Walk-ins, sample drop-offs, and physician consultations welcome.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* ─── Contact Information & Operating Hours ─── */}
          <div className="lg:col-span-7 space-y-5">
            {/* Address & Direct Actions */}
            <div className="p-6 rounded-2xl bg-[#F6F9FA] border border-slate-200/90 shadow-2xs">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-teal/15 text-teal flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Laboratory Address
                  </h3>
                  <p className="text-sm font-semibold text-navy leading-relaxed">
                    {CONTACT.address}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-3">
                    <a
                href={CONTACT.mapsShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-teal bg-teal/10 hover:bg-teal hover:text-white transition-all"
                    >
                      <span>Open in Google Maps</span>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Phone Lines, Email & Instagram */}
            <div className="grid sm:grid-cols-3 gap-3.5">
              <div className="p-4 sm:p-5 rounded-2xl bg-[#F6F9FA] border border-slate-200/90 shadow-2xs">
                <div className="flex items-center gap-2 mb-2 text-slate-500">
                  <svg className="w-4 h-4 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-xs font-bold uppercase tracking-wider">Phone Lines</span>
                </div>
                <div className="space-y-1">
                  {CONTACT.phones.map((phone, i) => (
                    <a
                      key={phone}
                      href={CONTACT.dialLinks[i]}
                      className="block text-xs sm:text-sm font-bold text-navy hover:text-teal transition-colors"
                    >
                      {CONTACT.phonesFormatted[i]}
                    </a>
                  ))}
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-[#F6F9FA] border border-slate-200/90 shadow-2xs">
                <div className="flex items-center gap-2 mb-2 text-slate-500">
                  <svg className="w-4 h-4 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-xs font-bold uppercase tracking-wider">Email</span>
                </div>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="block text-xs font-semibold text-navy hover:text-teal transition-colors break-all"
                >
                  {CONTACT.email}
                </a>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-[#F6F9FA] border border-slate-200/90 shadow-2xs">
                <div className="flex items-center gap-2 mb-2 text-slate-500">
                  <svg className="w-4 h-4 text-pink-600 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span className="text-xs font-bold uppercase tracking-wider">Instagram</span>
                </div>
                <a
                  href={SITE.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-xs sm:text-sm font-bold text-navy hover:text-pink-600 transition-colors"
                >
                  {SITE.instagramHandle}
                </a>
              </div>
            </div>

            {/* Operating Hours Table */}
            <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-2xs bg-white">
              <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-navy flex items-center gap-2">
                  <svg className="w-4 h-4 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Lab Operating Hours
                </span>
                <span className="text-[11px] font-medium text-slate-500">
                  Asia/Kolkata (IST)
                </span>
              </div>

              <div className="divide-y divide-slate-100 text-xs sm:text-sm">
                {HOURS.map((h, idx) => {
                  const isToday = idx === todayIndex;
                  return (
                    <div
                      key={h.day}
                      className={`flex items-center justify-between px-5 py-2.5 transition-colors ${
                        isToday ? "bg-teal-light/40 font-bold text-teal-dark" : "text-slate-700"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{h.day}</span>
                        {isToday && (
                          <span className="text-[10px] font-extrabold uppercase bg-teal text-white px-2 py-0.5 rounded-full">
                            Today
                          </span>
                        )}
                      </div>
                      <span className="font-mono tabular-nums text-slate-600">
                        {h.open} – {h.close}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ─── Real Clinic Photos & Physical Authenticity ─── */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-4 sm:p-5 rounded-3xl bg-[#F6F9FA] border border-slate-200/90 shadow-clinical">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-dark">
                  Physical Facility
                </span>
                <span className="text-[11px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                  PNR Convention Hall
                </span>
              </div>

              {/* Photo 1: Storefront */}
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-slate-200 shadow-2xs mb-3">
                <Image
                  src="/clinic/exterior-front.jpg"
                  alt="SV Care Health Diagnostics storefront signage at PNR Convention Hall, Babu Agraharam"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 400px"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-3 text-white">
                  <p className="text-xs font-bold leading-tight">SV Care Health Diagnostics Storefront</p>
                  <p className="text-[10px] text-slate-200 mt-0.5">Babu Agraharam Koneru, Srikalahasti</p>
                </div>
              </div>

              {/* Photo 2: Lab Interior */}
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-slate-200 shadow-2xs">
                <Image
                  src="/clinic/lab-interior.jpg"
                  alt="SV Care Health Diagnostics laboratory diagnostic instruments and sterile phlebotomy area"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 400px"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-3 text-white">
                  <p className="text-xs font-bold leading-tight">Clinical Pathology & Phlebotomy Station</p>
                  <p className="text-[10px] text-slate-200 mt-0.5">Automated Bio-Analyzers & Sterile Testing</p>
                </div>
              </div>

              <div className="mt-3.5 pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Sanitized Daily
                </span>
                <span className="font-semibold text-navy">Walk-ins Welcome</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
