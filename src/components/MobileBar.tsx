"use client";

import { CONTACT, SITE } from "@/data/site";

export default function MobileBar() {
  return (
    <aside
      className="fixed bottom-0 left-0 right-0 z-50 sm:hidden
        bg-white/95 dark:bg-deep-navy/95 backdrop-blur-lg
        border-t border-slate-200 dark:border-slate-800 shadow-2xl"
      aria-label="Mobile quick actions"
    >
      <div className="grid grid-cols-2 gap-2.5 p-3 max-w-md mx-auto">
        {/* Direct Call Button */}
        <a
          href={CONTACT.dialLinks[0]}
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold
            bg-navy text-white shadow-md active:scale-[0.98] transition-all cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span>Call Now</span>
        </a>

        {/* Direct WhatsApp Button */}
        <a
          href={`${SITE.whatsappLink}?text=${encodeURIComponent(
            "Hello SV Care Health Diagnostics, I would like to book a blood test appointment."
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold
            bg-[#25D366] hover:bg-[#20BD5A] text-white shadow-md active:scale-[0.98] transition-all cursor-pointer"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.69 0-3.259-.52-4.555-1.408l-.327-.194-2.871.852.852-2.871-.194-.327A7.96 7.96 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
          </svg>
          <span>WhatsApp</span>
        </a>
      </div>
    </aside>
  );
}
