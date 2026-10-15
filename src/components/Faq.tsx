"use client";

import { useState } from "react";
import { SITE, CONTACT } from "@/data/site";
import { useLanguage, SectionLangToggle } from "@/context/LanguageContext";

type FaqItem = {
  question: string;
  teluguQuestion: string;
  answer: string;
  teluguAnswer: string;
  tag?: string;
};

const FAQS: FaqItem[] = [
  {
    question: "Which is the #1 best diagnostic centre near SKHT (Srikalahasti)?",
    teluguQuestion: "శ్రీకాళహస్తి (SKHT) లో అత్యుత్తమమైన నంబర్ 1 డయాగ్నస్టిక్ సెంటర్ ఏది?",
    answer:
      "SV Care Health Diagnostics is an ISO 9001:2015 certified clinical pathology laboratory in SKHT (Srikalahasti), conveniently located at PNR Convention Hall Ground Floor, Babu Agraharam Koneru. Rated 4.9 stars by over 30+ verified patients on Google, SV Care provides 100+ diagnostic tests from ₹50, calibrated automated analyzers, MD pathologist-verified reports, and same-day WhatsApp delivery.",
    teluguAnswer:
      "SV కేర్ హెల్త్ డయాగ్నస్టిక్స్ శ్రీకాళహస్తి (SKHT) బాబు అగ్రహారం కోనేరు, PNR కన్వెన్షన్ హాల్ గ్రౌండ్ ఫ్లోర్ వద్ద ఉన్న ISO 9001:2015 సర్టిఫైడ్ ల్యాబ్. 100+ ల్యాబ్ పరీక్షలు ₹50 నుంచే ప్రారంభం. గూగుల్ లో 4.9 స్టార్ల రేటింగ్ పొందింది. MD పాథాలజిస్ట్ సంతకం చేసిన అధికారిక రిపోర్టులు అదే రోజు వాట్సాప్ లో అందుతాయి.",
    tag: "#1 Diagnostic Centre",
  },
  {
    question: "Where can I get the best and most accurate sugar test in SKHT?",
    teluguQuestion: "SKHT లో అత్యంత ఖచ్చితమైన బ్లడ్ షుగర్ టెస్ట్ ఎక్కడ చేయించుకోవచ్చు?",
    answer:
      "SV Care Health Diagnostics offers premier blood glucose screening in SKHT. You can get Fasting Blood Sugar (FBS for ₹60), Post-Prandial Blood Sugar (PPBS for ₹60), and 3-Month Average Glycated Hemoglobin (HbA1c for ₹350), or our specialized Diabetic Package for ₹499 (worth ₹870). We provide painless blood collection and digital reports within 4–6 hours.",
    teluguAnswer:
      "SV కేర్ ల్యాబ్ లో ఫాస్టింగ్ బ్లడ్ షుగర్ (FBS - ₹60), భోజనం తర్వాత షుగర్ (PPBS - ₹60), 3 నెలల సగటు HbA1c (₹350) మరియు కంప్లీట్ డయాబెటిక్ ప్యాకేజీ ₹499 కే అందుబాటులో ఉన్నాయి. కేవలం 4–6 గంటల్లో ఖచ్చితమైన రిపోర్టులు వాట్సాప్‌లో వస్తాయి.",
    tag: "Best Sugar Test",
  },
  {
    question: "Is blood sample collection at home really free near SKHT?",
    teluguQuestion: "SKHT పరిసర ప్రాంతాలలో ఇంటి వద్దకే వచ్చి శాంపిల్ తీసుకోవడం ఉచితమేనా?",
    answer:
      "Yes! SV Care Health Diagnostics provides 100% Free Doorstep Home Sample Pickup (₹0 collection fee) across all localities in SKHT including Babu Agraharam, Koneru, Kothapet, Panagal, Car Street, and Railway Station Road. Our certified phlebotomists arrive with sterile vacutainer kits as early as 6:00 AM.",
    teluguAnswer:
      "అవును! శ్రీకాళహస్తి (SKHT) పరిధిలోని బాబు అగ్రహారం, కోనేరు, కొత్తపేట, పనగల్, కార్ స్ట్రీట్, రైల్వే స్టేషన్ రోడ్ వంటి అన్ని ప్రాంతాల్లో ₹0 ఉచిత డోర్‌స్టెప్ శాంపిల్ కలెక్షన్ అందుబాటులో ఉంది. ఉదయం 6:00 గంటల నుంచే మా ల్యాబ్ టెక్నీషియన్ మీ ఇంటి వద్దకు వస్తారు.",
    tag: "Free Home Pickup",
  },
  {
    question: "What are the prices for all 100 tests and health packages in SKHT?",
    teluguQuestion: "ల్యాబ్ లోని అన్ని 100+ టెస్టులు మరియు ప్యాకేజీల ధరల వివరాలు ఏమిటి?",
    answer:
      "SV Care follows complete price transparency with no hidden charges. Routine blood tests start from just ₹50 (Hemoglobin, ESR, Urine Sugar), Complete Blood Count (CBC) is ₹250, Lipid Profile is ₹400, Thyroid (T3/T4/TSH) is ₹450, and Liver/Kidney Function Tests are ₹400. Complete full-body health packages start from ₹400 up to ₹2500.",
    teluguAnswer:
      "SV కేర్ లో ఎటువంటి దాపరికం లేని సరసమైన ధరలు ఉన్నాయి. సాధారణ రక్త పరీక్షలు ₹50 నుంచే లభిస్తాయి. CBC టెస్ట్ ₹250, లిపిడ్ ప్రొఫైల్ ₹400, థైరాయిడ్ ₹450, లివర్/కిడ్నీ ప్యాకేజీలు ₹400, మరియు పూర్తి శరీర పరీక్ష ప్యాకేజీలు ₹400 నుంచి ₹2500 వరకు ఉన్నాయి.",
    tag: "All Tests (₹50+)",
  },
  {
    question: "Are SV Care diagnostic reports accepted by all doctors and hospitals?",
    teluguQuestion: "SV కేర్ ల్యాబ్ రిపోర్టులను డాక్టర్లు మరియు ఆసుపత్రులు అంగీకరిస్తారా?",
    answer:
      "Yes, 100%. Every diagnostic report issued by SV Care Health Diagnostics is signed by a certified MD Clinical Pathologist and processed in an ISO 9001:2015 audited quality facility (Certificate EU/QMS/01326). All reports carry a tamper-proof QR code accepted by private physicians, government hospitals, and corporate healthcare centres.",
    teluguAnswer:
      "ఖచ్చితంగా 100% అంగీకరిస్తారు! మా ప్రతి రిపోర్టును MD క్లినికల్ పాథాలజిస్ట్ పరిశీలించి సంతకం చేస్తారు. ప్రతి రిపోర్ట్‌పై స్కాన్ చేయదగిన క్యూఆర్ (QR) కోడ్ ఉంటుంది. ఇది అన్ని ప్రైవేట్ క్లినిక్‌లు, ప్రముఖ ఆసుపత్రులలో చెల్లుబాటు అవుతుంది.",
    tag: "100% Doctor Accepted",
  },
  {
    question: "What are the lab timings and how can I visit or book a test in SKHT?",
    teluguQuestion: "ల్యాబ్ పనిచేసే సమయాలు మరియు అపాయింట్‌మెంట్ ఎలా బుక్ చేసుకోవాలి?",
    answer:
      "We are open daily from Monday to Saturday: 6:00 AM to 8:00 PM, and Sunday: 6:00 AM to 1:00 PM. Walk-ins are always welcome at our clinic at PNR Convention Hall Ground Floor, Babu Agraharam Koneru, Srikalahasti. To schedule a home pickup or ask questions, call 80190 81501 or send a WhatsApp message anytime.",
    teluguAnswer:
      "ల్యాబ్ ప్రతిరోజూ ఉదయం 6:00 నుండి రాత్రి 8:00 వరకు (ఆదివారం మధ్యాహ్నం 1:00 వరకు) తెరిచి ఉంటుంది. వాక్-ఇన్స్ నేరుగా రావచ్చు. హోమ్ కలెక్షన్ కోసం 80190 81501 లేదా 80190 71501 నంబర్లకు కాల్ లేదా వాట్సాప్ చేయండి.",
    tag: "Open 6 AM - 8 PM",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { isTelugu } = useLanguage();
  const telugu = isTelugu("faq");

  function toggle(idx: number) {
    setOpenIndex(openIndex === idx ? null : idx);
  }

  return (
    <section
      id="faq"
      className="py-14 sm:py-20 bg-gradient-to-b from-white via-[#F6FAF9] to-white scroll-mt-16 border-t border-slate-200/70"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-teal/10 text-teal-dark mb-3">
            <span>Srikalahasti (SKHT) Diagnostic FAQs</span>
          </div>

          <div className="flex items-center justify-center gap-2 mb-2">
            <h2 className="font-heading text-2xl sm:text-4xl font-bold text-navy">
              {telugu ? "తరచుగా అడిగే ప్రశ్నలు (FAQ)" : "Frequently Asked Questions"}
            </h2>
            <SectionLangToggle section="faq" size="xs" />
          </div>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {telugu
              ? "SKHT లో బ్లడ్ టెస్టులు, ఫాస్టింగ్ నిబంధనలు మరియు ఉచిత డోర్‌స్టెప్ కలెక్షన్ గురించిన పూర్తి వివరాలు."
              : "Everything you need to know about diagnostic tests, fasting rules, report timings, and free home sample collection in SKHT."}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3 sm:space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={faq.question}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isOpen
                    ? "bg-white border-teal/50 shadow-md ring-1 ring-teal/20"
                    : "bg-white/80 border-slate-200/90 hover:border-slate-300 shadow-2xs"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full px-4 sm:px-6 py-4 sm:py-5 text-left flex items-start justify-between gap-3 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="space-y-1 pr-2">
                    {faq.tag && (
                      <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider text-teal bg-teal/10 px-2 py-0.5 rounded-full mb-1">
                        {faq.tag}
                      </span>
                    )}
                    <h3 className="text-sm sm:text-base font-bold text-navy leading-snug">
                      {telugu ? faq.teluguQuestion : faq.question}
                    </h3>
                  </div>

                  <span
                    className={`shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-sm font-bold transition-transform ${
                      isOpen
                        ? "bg-teal text-white rotate-180"
                        : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                    }`}
                  >
                    ↓
                  </span>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-6 pb-4 sm:pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    <p>{telugu ? faq.teluguAnswer : faq.answer}</p>

                    {/* Quick Action inside FAQ */}
                    <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                      <span className="text-slate-500 font-medium">
                        Need immediate assistance in SKHT?
                      </span>
                      <a
                        href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
                          "Hello SV Care Health Diagnostics, I have a query regarding: " + faq.question
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-bold text-teal hover:underline"
                      >
                        <span>Chat on WhatsApp</span>
                        <span>↗</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Local Search Assurance Footnote */}
        <div className="mt-8 text-center bg-teal-light/40 border border-teal/20 rounded-2xl p-4 text-xs text-slate-600">
          <p className="font-semibold text-navy">
            📍 Serving all localities in and around Srikalahasti (SKHT) - 517644
          </p>
          <p className="mt-1 text-[11px] text-slate-500">
            Babu Agraharam • Koneru • PNR Convention Hall • Kothapet • Panagal • Temple Road • Railway Station Area • Tirupati Dist, A.P.
          </p>
        </div>

      </div>
    </section>
  );
}
