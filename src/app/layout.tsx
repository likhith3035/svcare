import type { Metadata } from "next";
import { Fraunces, Figtree } from "next/font/google";
import { SITE, CONTACT, HOURS } from "@/data/site";
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
  icons: {
    icon: "/icon.jpg",
    apple: "/icon.jpg",
  },
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    type: "website",
    locale: "en_IN",
    siteName: SITE.name,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalLaboratory",
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    sameAs: [SITE.instagramUrl],
    hasMap: CONTACT.mapsShareUrl,
    telephone: [
      `+91${CONTACT.phones[0]}`,
      `+91${CONTACT.phones[1]}`,
    ],
    email: CONTACT.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "#6/606, Ground Floor, PNR Convention Hall, Babu Agraharam Koneru",
      addressLocality: "Srikalahasti",
      addressRegion: "Andhra Pradesh",
      postalCode: "517644",
      addressCountry: "IN",
    },
    openingHoursSpecification: HOURS.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.day,
      opens: `${String(h.openHour).padStart(2, "0")}:${String(h.openMinute).padStart(2, "0")}`,
      closes: `${String(h.closeHour).padStart(2, "0")}:${String(h.closeMinute).padStart(2, "0")}`,
    })),
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${figtree.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
