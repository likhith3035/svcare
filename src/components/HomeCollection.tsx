"use client";

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
    subtitle: "Within 24 Hours",
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

export default function HomeCollection() {
  return (
    <section id="home-collection" className="py-14 sm:py-20 bg-white scroll-mt-16 border-t border-slate-200/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
        <div className="grid md:grid-cols-3 gap-6 mb-10">
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

              <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center gap-2 text-xs font-semibold text-teal">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>Zero convenience fee</span>
              </div>
            </div>
          ))}
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
    </section>
  );
}
