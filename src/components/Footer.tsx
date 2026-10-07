import Logo from "@/components/Logo";
import { SITE, CONTACT } from "@/data/site";

export default function Footer() {
  return (
    <footer className="bg-deep-navy text-slate-300 py-16 border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-5 space-y-4">
            <Logo variant="dark" className="h-11 w-auto" />
            <p className="text-sm leading-relaxed max-w-[36ch] text-slate-400 font-medium">
              Precision clinical pathology and diagnostic testing laboratory based in Srikalahasti, Andhra Pradesh.
            </p>
            <p className="text-xs text-teal font-semibold">
              {SITE.tagline}
            </p>
            <div className="pt-2">
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800/90 hover:bg-pink-600 hover:text-white text-slate-300 text-xs font-bold transition-all border border-slate-700/80 group shadow-xs"
              >
                <svg className="w-4 h-4 fill-current text-pink-500 group-hover:text-white transition-colors" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>Follow {SITE.instagramHandle}</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm font-medium">
              {[
                { label: "Packages", href: "#packages" },
                { label: "100 Tests (Price List)", href: "#tests" },
                { label: "Home Collection", href: "#home-collection" },
                { label: "Sample Lab Report", href: "#home-collection" },
                { label: "ISO 9001:2015 Certificate", href: "#accreditation" },
                { label: "Book a Test", href: "#booking" },
                { label: "Lab Location", href: "#contact" },
              ].map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-slate-400 hover:text-teal transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Direct Contact
            </h4>
            <div className="space-y-2 text-sm text-slate-400 font-medium">
              <p>
                <a href={CONTACT.dialLinks[0]} className="hover:text-teal transition-colors block">
                  +91 {CONTACT.phonesFormatted[0]}
                </a>
              </p>
              <p>
                <a href={CONTACT.dialLinks[1]} className="hover:text-teal transition-colors block">
                  +91 {CONTACT.phonesFormatted[1]}
                </a>
              </p>
              <p>
                <a href={`mailto:${CONTACT.email}`} className="hover:text-teal transition-colors block break-all">
                  {CONTACT.email}
                </a>
              </p>
            </div>
          </div>

          {/* Address */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Clinic Address
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              #6/606, Ground Floor, PNR Convention Hall, Babu Agraharam Koneru, Srikalahasti - 517 644
            </p>
            <div>
              <a
                href={CONTACT.mapsShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-teal hover:underline pt-1"
              >
                <span>Directions on Maps</span>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="mt-14 pt-8 border-t border-slate-800 text-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 font-medium">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-teal" />
            <span>ISO 9001:2015 Certified Diagnostic Lab • Reg: EU/QMS/01326</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
