import type { Metadata } from "next";
import { Fraunces, Figtree } from "next/font/google";
import { SITE, CONTACT, HOURS } from "@/data/site";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: SITE.title,
  description: SITE.description,
  metadataBase: new URL(SITE.url),
  applicationName: "SV Care Health Diagnostics",
  keywords: [
    "sv care health diagnostics skht",
    "sv care health diagnostics",
    "best diagnostic centre near skht",
    "blood sample collection centre near skht",
    "best sugar test skht",
    "all tests skht",
    "no 1 diagnosis skht",
    "no 1 diagnostic centre in srikalahasti",
    "diagnostic centre in srikalahasti",
    "diagnostic lab near me srikalahasti",
    "blood test lab srikalahasti",
    "pathology lab srikalahasti",
    "blood test at home srikalahasti",
    "blood sample pickup skht",
    "fasting sugar test skht",
    "hba1c test price skht",
    "thyroid test cost skht",
    "lipid profile test skht",
    "full body checkup packages in skht",
    "kothapet srikalahasti diagnostic lab",
    "babu agraharam koneru diagnostic center",
    "iso certified lab srikalahasti",
    "sv care diagnostics",
    "pnr convention hall lab srikalahasti"
  ],
  authors: [{ name: "SV Care Health Diagnostics", url: SITE.url }],
  creator: "SV Care Health Diagnostics",
  publisher: "SV Care Health Diagnostics",
  category: "Medical & Health Diagnostics",
  icons: {
    icon: "/icon.jpg",
    apple: "/icon.jpg",
  },
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/reception-desk.jpg",
        width: 1200,
        height: 675,
        alt: "SV Care Health Diagnostics - #1 Diagnostic Centre in SKHT (Srikalahasti)",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    images: ["/reception-desk.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE.url,
  },
  verification: {
    google: "googled6fe425f9d710848",
  },
};

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["MedicalLaboratory", "DiagnosticLab", "LocalBusiness"],
        "@id": `${SITE.url}#lab`,
        name: SITE.name,
        alternateName: [
          "SV Care Diagnostics",
          "SV Care SKHT",
          "SV Care Health Diagnostics Srikalahasti",
          "SV Care Pathology Laboratory"
        ],
        description: SITE.description,
        url: SITE.url,
        logo: `${SITE.url}/icon.jpg`,
        image: `${SITE.url}/reception-desk.jpg`,
        hasMap: CONTACT.mapsShareUrl,
        telephone: [
          `+91${CONTACT.phones[0]}`,
          `+91${CONTACT.phones[1]}`,
        ],
        email: CONTACT.email,
        priceRange: "₹50 - ₹2500",
        currenciesAccepted: "INR",
        paymentAccepted: "Cash, UPI, Google Pay, PhonePe, Paytm, Debit Card, Credit Card",
        medicalSpecialty: [
          "Pathology",
          "Clinical Medical Laboratory",
          "Diagnostic Services",
          "Preventive Health Screenings"
        ],
        isAcceptingNewPatients: true,
        address: {
          "@type": "PostalAddress",
          streetAddress: "#6/606, Ground Floor, PNR Convention Hall, Babu Agraharam Koneru, Near Kothapet",
          addressLocality: "Srikalahasti",
          addressRegion: "Andhra Pradesh",
          postalCode: "517644",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 13.7498,
          longitude: 79.6984,
        },
        openingHoursSpecification: HOURS.map((h) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: h.day,
          opens: `${String(h.openHour).padStart(2, "0")}:${String(h.openMinute).padStart(2, "0")}`,
          closes: `${String(h.closeHour).padStart(2, "0")}:${String(h.closeMinute).padStart(2, "0")}`,
        })),
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "30",
          bestRating: "5",
          worstRating: "1",
        },
        sameAs: [
          SITE.instagramUrl,
          CONTACT.mapsShareUrl,
          "https://www.google.com/maps/search/?api=1&query=SV+Care+Health+Diagnostics&query_place_id=/g/11nw0mmhkm",
          "https://www.justdial.com/Srikalahasti/SV-Care-Health-Diagnostics-in-KothapetSrikalahasti/9999P8578-8578-240919131626-G7M4_BZDET",
          "https://www.facebook.com/people/SV-Care-Health-Diagnostics"
        ],
        availableService: [
          {
            "@type": "MedicalTest",
            name: "Complete Blood Count (CBC)",
            description: "28 cellular parameters evaluating hemoglobin, platelets, and immunity markers."
          },
          {
            "@type": "MedicalTest",
            name: "Fasting Blood Sugar (FBS)",
            description: "High accuracy glycemic screening requiring 8-10 hours overnight fasting."
          },
          {
            "@type": "MedicalTest",
            name: "HbA1c Glycated Hemoglobin",
            description: "3-month average glucose control audit."
          },
          {
            "@type": "MedicalTest",
            name: "Thyroid Profile (T3, T4, TSH)",
            description: "Comprehensive thyroid gland and metabolic evaluation."
          },
          {
            "@type": "MedicalTest",
            name: "Lipid Profile",
            description: "Cholesterol, triglycerides, HDL, LDL cardiovascular risk assessment."
          },
          {
            "@type": "MedicalProcedure",
            name: "Doorstep Home Sample Collection",
            description: "Free sterile sample collection at home or office across Srikalahasti / SKHT."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE.url}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "Which is the best diagnostic centre near SKHT (Srikalahasti)?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "SV Care Health Diagnostics is the #1 ISO 9001:2015 certified diagnostic laboratory in SKHT (Srikalahasti), located at PNR Convention Hall, Babu Agraharam Koneru. It offers 100+ tests from ₹50, certified bio-analyzers, and same-day reports on WhatsApp, rated 4.9 stars by patients."
            }
          },
          {
            "@type": "Question",
            name: "Where can I get the best sugar test in SKHT?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "SV Care Health Diagnostics offers premier blood glucose screening in SKHT including Fasting Blood Sugar (FBS at ₹60), Post-Prandial Sugar (PPBS at ₹60), and 3-month HbA1c (at ₹350) with digital reports delivered on WhatsApp within 4–6 hours."
            }
          },
          {
            "@type": "Question",
            name: "Is blood sample collection at home free near SKHT?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, SV Care Health Diagnostics provides 100% Free Doorstep Blood Sample Collection (₹0 Fee) across all areas of SKHT (Srikalahasti) including Babu Agraharam, Koneru, Kothapet, Panagal, and Railway Station Road starting from 6:00 AM daily."
            }
          },
          {
            "@type": "Question",
            name: "What are the charges for all lab tests and checkup packages in SKHT?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Individual tests start from just ₹50 (Hemoglobin, ESR, Urine Sugar) up to ₹1600. Official health packages start from ₹400 (Liver, Kidney, Thyroid profiles) and comprehensive master checkups start from ₹699 to ₹2500."
            }
          },
          {
            "@type": "Question",
            name: "Are SV Care lab reports accepted by all doctors and hospitals?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, 100% of diagnostic reports from SV Care Health Diagnostics are signed by an MD Clinical Pathologist with tamper-proof QR code verification, accepted across all hospitals, clinics, and physicians."
            }
          }
        ]
      }
    ]
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${figtree.variable} h-full antialiased`}
    >
      <head>
        {/* Geographic Meta Tags for Local Google Search & Map Pack */}
        <meta name="geo.region" content="IN-AP" />
        <meta name="geo.placename" content="Srikalahasti, SKHT" />
        <meta name="geo.position" content="13.7498;79.6984" />
        <meta name="ICBM" content="13.7498, 79.6984" />

        {/* Structured Data Graph: MedicalLaboratory + LocalBusiness + FAQPage */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
