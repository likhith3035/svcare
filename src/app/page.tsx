import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Packages from "@/components/Packages";
import Tests from "@/components/Tests";
import HomeCollection from "@/components/HomeCollection";
import Booking from "@/components/Booking";
import Contact from "@/components/Contact";
import Accreditation from "@/components/Accreditation";
import {
  GoogleReviewsPlaceholder,
  ClinicGalleryPlaceholder,
} from "@/components/Placeholders";
import Footer from "@/components/Footer";
import MobileBar from "@/components/MobileBar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Packages />
        <Tests />
        <HomeCollection />
        <Accreditation />
        <Booking />
        <Contact />

        {/* 
          Placeholders clearly marked for future verified content.
          Hidden by default per client instruction.
          Can be toggled anytime in /src/data/site.ts: PLACEHOLDERS
        */}
        <ClinicGalleryPlaceholder />
        <GoogleReviewsPlaceholder />
      </main>
      <Footer />
      <MobileBar />

      {/* Extra bottom clearance on mobile to prevent content clipping behind sticky bottom bar */}
      <div className="h-20 sm:hidden" aria-hidden="true" />
    </>
  );
}
