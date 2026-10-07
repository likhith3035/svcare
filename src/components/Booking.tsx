"use client";

import { useState, useEffect, type FormEvent } from "react";
import {
  OPENING_OFFERS,
  OFFICIAL_PACKAGES,
  MASTER_PACKAGES,
  LAB_TESTS,
  TEST_CATEGORIES,
  COLLECTION_PLACES,
  BOOKING_FOR_OPTIONS,
  BookingFor,
  FASTING_GUIDELINES,
  SITE,
  CONTACT,
} from "@/data/site";

type FormData = {
  name: string;
  phone: string;
  bookingFor: BookingFor;
  packageOrTest: string;
  date: string;
  time: string;
  place: (typeof COLLECTION_PLACES)[number];
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const TIME_SLOTS = [
  "6:00 AM - 6:30 AM (Early Fasting)",
  "6:30 AM - 7:00 AM (Early Fasting)",
  "7:00 AM - 7:30 AM (Fasting Recommended)",
  "7:30 AM - 8:00 AM (Fasting Recommended)",
  "8:00 AM - 8:30 AM (Fasting Recommended)",
  "8:30 AM - 9:00 AM (Fasting Recommended)",
  "9:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "12:00 PM - 2:00 PM",
  "2:00 PM - 4:00 PM",
  "4:00 PM - 6:00 PM",
  "6:00 PM - 8:00 PM (Evening Collection)",
];

function getMinDate(): string {
  const now = new Date();
  return now.toISOString().split("T")[0];
}

function getMaxDate(): string {
  const max = new Date();
  max.setDate(max.getDate() + 30);
  return max.toISOString().split("T")[0];
}

/** Sunday closes at 1 PM — filter out afternoon slots if date is a Sunday */
function getAvailableSlots(dateStr: string): string[] {
  if (!dateStr) return TIME_SLOTS;
  const day = new Date(dateStr).getDay(); // 0 = Sunday
  if (day === 0) {
    return TIME_SLOTS.filter(
      (s) => !s.startsWith("12:") && !s.startsWith("2:") && !s.startsWith("4:") && !s.startsWith("6:")
    );
  }
  return TIME_SLOTS;
}

export default function Booking() {
  const [form, setForm] = useState<FormData>({
    name: "",
    phone: "",
    bookingFor: "Self",
    packageOrTest: "",
    date: "",
    time: "",
    place: "Home",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // Resolve selected item from opening offers, official packages, master packages, lab tests, or test categories
  const selectedOffer = OPENING_OFFERS.find((o) => o.id === form.packageOrTest);
  const selectedOfficialPkg = OFFICIAL_PACKAGES.find((p) => p.id === form.packageOrTest);
  const selectedMasterPkg = MASTER_PACKAGES.find((p) => p.id === form.packageOrTest);
  const selectedLabTest = LAB_TESTS.find((t) => t.id === form.packageOrTest);
  const selectedCategory = TEST_CATEGORIES.find((t) => t.id === form.packageOrTest);

  const selectedItemName =
    selectedOffer?.title ||
    selectedOfficialPkg?.name ||
    selectedMasterPkg?.name ||
    selectedLabTest?.name ||
    selectedCategory?.name ||
    "";

  const selectedItemPrice =
    selectedOffer !== undefined
      ? 0
      : selectedOfficialPkg?.price ??
        selectedMasterPkg?.price ??
        selectedLabTest?.rate ??
        null;

  // Detect fasting advice based on selected test or package
  const requiresFasting =
    selectedOffer?.id === "offer-sugar" ||
    !!selectedOfficialPkg ||
    !!selectedMasterPkg ||
    !!selectedLabTest?.fastingNote ||
    selectedLabTest?.id === "test-10" || // FBS
    selectedLabTest?.id === "test-14" || // HbA1c + FBS
    selectedLabTest?.id === "test-15" || // Diabetes Profile
    selectedLabTest?.id === "test-16" || // Lipid Profile
    selectedCategory?.id === "lipid" ||
    selectedCategory?.id === "diabetes";

  // Listen for package or test selection from other sections
  useEffect(() => {
    function handleSelect(e: Event) {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        setForm((prev) => ({ ...prev, packageOrTest: customEvent.detail }));
        setErrors((prev) => {
          const next = { ...prev };
          delete next.packageOrTest;
          return next;
        });
      }
    }

    window.addEventListener("select-package", handleSelect);
    return () => window.removeEventListener("select-package", handleSelect);
  }, []);

  function validate(): FormErrors {
    const errs: FormErrors = {};
    if (!form.name.trim()) {
      errs.name = "Please enter patient name";
    }
    const cleanPhone = form.phone.replace(/\D/g, "");
    if (!cleanPhone) {
      errs.phone = "Please enter mobile number";
    } else if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      errs.phone = "Enter a valid 10-digit Indian mobile number";
    }
    if (!form.packageOrTest) {
      errs.packageOrTest = "Please choose a checkup package or test";
    }
    if (!form.date) {
      errs.date = "Please pick a preferred date";
    }
    if (!form.time) {
      errs.time = "Please pick a time slot";
    }
    return errs;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const itemLabel = selectedOffer
      ? `${selectedOffer.title} (🎉 Grand Opening Special — ₹0 FREE)`
      : selectedItemPrice !== null
      ? `${selectedItemName} (₹${selectedItemPrice})`
      : selectedItemName || form.packageOrTest;

    const bookingForLine =
      form.bookingFor === "Parents / Elders"
        ? `• Booking For: Parents / Elders (Elderly Doorstep Care)\n`
        : form.bookingFor === "Child"
        ? `• Booking For: Child (Pediatric Home Visit)\n`
        : form.bookingFor === "Family Member"
        ? `• Booking For: Family Member\n`
        : `• Booking For: Self\n`;

    const relationPrompt =
      form.bookingFor === "Parents / Elders"
        ? `for my elderly parents`
        : form.bookingFor === "Child"
        ? `for my child`
        : form.bookingFor === "Family Member"
        ? `for a family member`
        : `for myself`;

    const message =
      `Hello SV Care Health Diagnostics,\n` +
      `I would like to book a laboratory appointment ${relationPrompt}:\n\n` +
      `• Patient Name: ${form.name.trim()}\n` +
      bookingForLine +
      `• WhatsApp Mobile: ${form.phone.trim()}\n` +
      `• Test/Package: ${itemLabel}\n` +
      `• Preferred Date: ${form.date}\n` +
      `• Time Slot: ${form.time}\n` +
      `• Sample Collection: ${form.place} (Free Doorstep Pickup)\n` +
      (requiresFasting ? `• Fasting: Patient informed of 8–10 hr overnight fasting instructions\n\n` : `\n`) +
      `Please confirm my appointment slot.`;

    const url = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  }

  function updateField<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  }

  return (
    <section id="booking" className="py-14 sm:py-20 bg-[#F6F9FA] scroll-mt-16 border-t border-slate-200/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* ─── Form Column ─── */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-9 rounded-3xl shadow-clinical border border-slate-200/90">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-teal/10 text-teal-dark mb-2">
              <span>Direct Scheduling • 6:00 AM to 8:00 PM</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-navy">
              Book a test or health package
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1 mb-6">
              Instant appointment confirmation on WhatsApp. No advance payment required — pay after sample collection.
            </p>

            <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5">
              {/* Who is this booking for? (1-tap chip selector) */}
              <div>
                <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                  Who is this booking for?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full min-w-0">
                  {BOOKING_FOR_OPTIONS.map((opt) => {
                    const isSelected = form.bookingFor === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => updateField("bookingFor", opt.id)}
                        className={`py-2 px-2 sm:px-3 rounded-xl text-xs font-bold transition-all text-center border cursor-pointer flex flex-col items-center justify-center gap-0.5 min-w-0 overflow-hidden ${
                          isSelected
                            ? "bg-teal text-white border-teal shadow-xs shadow-teal/20"
                            : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                        }`}
                      >
                        <span className="leading-tight truncate w-full">{opt.label}</span>
                        <span className={`text-[10px] font-normal leading-tight truncate w-full ${isSelected ? "text-white/85" : "text-slate-400"}`}>
                          {opt.description}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Patient Full Name (Dynamically adjusted based on Booking For) */}
              <div>
                <label htmlFor="booking-name" className="block text-xs font-bold text-navy uppercase tracking-wider mb-1.5">
                  {form.bookingFor === "Parents / Elders"
                    ? "Parent / Elder's Full Name"
                    : form.bookingFor === "Child"
                    ? "Child's Full Name & Age"
                    : form.bookingFor === "Family Member"
                    ? "Family Member's Full Name"
                    : "Patient Full Name"}{" "}
                  <span className="text-red">*</span>
                </label>
                <input
                  id="booking-name"
                  type="text"
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl bg-slate-50/70 border text-slate-900 text-sm font-medium
                    placeholder:text-slate-400 outline-none transition-all
                    ${errors.name ? "border-red ring-2 ring-red/20" : "border-slate-200 focus:border-teal focus:ring-2 focus:ring-teal/20"}`}
                  placeholder={
                    form.bookingFor === "Parents / Elders"
                      ? "e.g. Father / Mother Name (e.g. Lakshmi Devi)"
                      : form.bookingFor === "Child"
                      ? "e.g. Child Name & Age (e.g. Aarav, 8 Yrs)"
                      : form.bookingFor === "Family Member"
                      ? "e.g. Spouse / Relative Name"
                      : "e.g. Ramesh Kumar"
                  }
                  autoComplete="name"
                />
                {errors.name && <p className="mt-1 text-xs text-red font-semibold">{errors.name}</p>}
              </div>

              {/* Mobile Number */}
              <div>
                <label htmlFor="booking-phone" className="block text-xs font-bold text-navy uppercase tracking-wider mb-1.5">
                  WhatsApp Mobile Number <span className="text-red">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
                    +91
                  </span>
                  <input
                    id="booking-phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    className={`w-full pl-14 pr-4 py-3 rounded-xl bg-slate-50/70 border text-slate-900 text-sm font-medium
                    placeholder:text-slate-400 outline-none transition-all
                    ${errors.phone ? "border-red ring-2 ring-red/20" : "border-slate-200 focus:border-teal focus:ring-2 focus:ring-teal/20"}`}
                    placeholder="80190 81501"
                    autoComplete="tel"
                    inputMode="numeric"
                  />
                </div>
                {errors.phone && <p className="mt-1 text-xs text-red font-semibold">{errors.phone}</p>}
              </div>

              {/* Package or Test Selector */}
              <div>
                <label htmlFor="booking-package" className="block text-xs font-bold text-navy uppercase tracking-wider mb-1.5">
                  Select Package or Test <span className="text-red">*</span>
                </label>
                <div className="relative">
                  <select
                    id="booking-package"
                    value={form.packageOrTest}
                    onChange={(e) => updateField("packageOrTest", e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl bg-slate-50/70 border text-slate-900 text-sm font-semibold
                      outline-none transition-all appearance-none cursor-pointer pr-10
                      ${errors.packageOrTest ? "border-red ring-2 ring-red/20" : "border-slate-200 focus:border-teal focus:ring-2 focus:ring-teal/20"}
                      ${!form.packageOrTest ? "text-slate-400 font-normal" : ""}`}
                  >
                    <option value="" disabled>Choose a checkup package or individual test</option>

                    <optgroup label="🎉 Grand Opening Special Offers (FREE)">
                      {OPENING_OFFERS.map((offer) => (
                        <option key={offer.id} value={offer.id}>
                          {offer.title} — ₹0 FREE ({offer.highlight})
                        </option>
                      ))}
                    </optgroup>

                    <optgroup label="Official Health Packages (More Care • Less Cost)">
                      {OFFICIAL_PACKAGES.map((pkg) => (
                        <option key={pkg.id} value={pkg.id}>
                          {pkg.name} — ₹{pkg.price.toLocaleString("en-IN")} ({pkg.inclusions})
                        </option>
                      ))}
                    </optgroup>

                    <optgroup label="Full-Body Master Checkups">
                      {MASTER_PACKAGES.map((pkg) => (
                        <option key={pkg.id} value={pkg.id}>
                          {pkg.name} — ₹{pkg.price.toLocaleString("en-IN")} ({pkg.parameters} params)
                        </option>
                      ))}
                    </optgroup>

                    <optgroup label="Individual Pathology Tests (100 Tests List)">
                      {LAB_TESTS.map((test) => (
                        <option key={test.id} value={test.id}>
                          #{test.testNo.toString().padStart(2, "0")} {test.name} — ₹{test.rate.toLocaleString("en-IN")} ({test.category})
                        </option>
                      ))}
                    </optgroup>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {errors.packageOrTest && <p className="mt-1 text-xs text-red font-semibold">{errors.packageOrTest}</p>}

                {/* Selected Item Summary Pill */}
                {selectedItemName && (
                  <div className="mt-2.5 p-3 rounded-xl bg-teal/10 border border-teal/20 flex items-center justify-between gap-3 text-xs">
                    <div>
                      <span className="font-bold text-navy block">{selectedItemName}</span>
                      <span className="text-teal-dark font-medium text-[11px]">
                        {selectedOffer?.highlight || selectedOfficialPkg?.inclusions || selectedLabTest?.category || "Pathology Service"}
                      </span>
                    </div>
                    {selectedOffer ? (
                      <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                        ₹0 FREE (Opening Offer)
                      </span>
                    ) : selectedItemPrice !== null ? (
                      <span className="text-base font-black text-navy font-mono">
                        ₹{selectedItemPrice.toLocaleString("en-IN")}
                      </span>
                    ) : null}
                  </div>
                )}

                {/* Fasting Notice */}
                {requiresFasting && (
                  <div className="mt-2.5 p-3 rounded-xl bg-amber-50 border border-amber-200/80 text-xs text-amber-900 flex items-start justify-between gap-2.5">
                    <div className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <div>
                        <p>
                          <strong>8–10 Hr Overnight Fasting Required:</strong> Plain water permitted. Avoid breakfast, tea, milk, or coffee prior to morning draw.
                        </p>
                      </div>
                    </div>
                    <a
                      href="#fasting-guide"
                      className="text-amber-800 hover:text-amber-950 font-bold underline shrink-0 text-[11px]"
                    >
                      View Guide ↗
                    </a>
                  </div>
                )}
              </div>

              {/* Date and Time Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Date */}
                <div>
                  <label htmlFor="booking-date" className="block text-xs font-bold text-navy uppercase tracking-wider mb-1.5">
                    Preferred Date <span className="text-red">*</span>
                  </label>
                  <input
                    id="booking-date"
                    type="date"
                    min={getMinDate()}
                    max={getMaxDate()}
                    value={form.date}
                    onChange={(e) => updateField("date", e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl bg-slate-50/70 border text-slate-900 text-sm font-medium
                      outline-none transition-all
                      ${errors.date ? "border-red ring-2 ring-red/20" : "border-slate-200 focus:border-teal focus:ring-2 focus:ring-teal/20"}`}
                  />
                  {errors.date && <p className="mt-1 text-xs text-red font-semibold">{errors.date}</p>}
                </div>

                {/* Time Slot */}
                <div>
                  <label htmlFor="booking-time" className="block text-xs font-bold text-navy uppercase tracking-wider mb-1.5">
                    Time Slot <span className="text-red">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="booking-time"
                      value={form.time}
                      onChange={(e) => updateField("time", e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl bg-slate-50/70 border text-slate-900 text-sm font-medium
                        outline-none transition-all appearance-none cursor-pointer pr-10
                        ${errors.time ? "border-red ring-2 ring-red/20" : "border-slate-200 focus:border-teal focus:ring-2 focus:ring-teal/20"}
                        ${!form.time ? "text-slate-400 font-normal" : ""}`}
                    >
                      <option value="" disabled>Select time slot (6 AM – 8 PM)</option>
                      {getAvailableSlots(form.date).map((slot) => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  {errors.time && <p className="mt-1 text-xs text-red font-semibold">{errors.time}</p>}
                </div>
              </div>

              {/* Collection Place Toggle */}
              <div>
                <span className="block text-xs font-bold text-navy uppercase tracking-wider mb-1.5">
                  Sample Collection Location
                </span>
                <div
                  className="grid grid-cols-3 gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200"
                  role="radiogroup"
                  aria-label="Collection place"
                >
                  {COLLECTION_PLACES.map((place) => {
                    const isSelected = form.place === place;
                    return (
                      <button
                        key={place}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() => updateField("place", place)}
                        className={`py-2.5 px-2 rounded-xl text-xs sm:text-sm font-bold transition-all text-center cursor-pointer
                          ${
                            isSelected
                              ? "bg-teal text-white shadow-xs"
                              : "text-slate-600 hover:text-navy"
                          }`}
                      >
                        {place === "Home" ? "🏡 Home (Free)" : place === "Work" ? "🏢 Office" : "🏥 Clinic"}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 text-base font-bold text-white
                    bg-[#1E9C80] hover:bg-[#16856C] rounded-xl shadow-md shadow-teal/20 transition-all
                    active:scale-[0.98] cursor-pointer"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.69 0-3.259-.52-4.555-1.408l-.327-.194-2.871.852.852-2.871-.194-.327A7.96 7.96 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
                  </svg>
                  Confirm Appointment on WhatsApp
                </button>
                <p className="text-[11px] text-center text-slate-400 mt-2">
                  No payment required now. Our laboratory phlebotomy team confirms within 15 minutes.
                </p>
              </div>
            </form>
          </div>

          {/* ─── Sidebar Column ─── */}
          <aside className="lg:col-span-5 space-y-4 w-full min-w-0">
            {/* Upload Doctor's Prescription Slip Card (Top Conversion Driver) */}
            <div className="bg-gradient-to-br from-teal/10 via-emerald-50/60 to-white border-2 border-teal/40 p-5 sm:p-6 rounded-3xl shadow-clinical relative overflow-hidden w-full min-w-0">
              <div className="flex items-start gap-3 sm:gap-3.5 mb-3 min-w-0">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-teal text-white flex items-center justify-center shrink-0 shadow-sm shadow-teal/30">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-teal text-white uppercase tracking-wider mb-1">
                    📸 1-Tap Prescription Order
                  </div>
                  <h3 className="font-heading text-base sm:text-lg font-bold text-navy leading-snug break-words">
                    Have a Doctor&apos;s Prescription Slip?
                  </h3>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-4 break-words">
                Don&apos;t worry about searching specific test names. Just snap a photo of your doctor&apos;s prescription slip and send it on WhatsApp. We will verify every test, give you an instant discounted quote, and schedule doorstep collection.
              </p>
              <a
                href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
                  "Hello SV Care Health Diagnostics, I am sharing a photo of my doctor's prescription slip. Please verify the prescribed tests, calculate the discounted total, and schedule doorstep collection."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 sm:py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-500/20 transition-all active:scale-[0.98] cursor-pointer"
              >
                <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.69 0-3.259-.52-4.555-1.408l-.327-.194-2.871.852.852-2.871-.194-.327A7.96 7.96 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
                </svg>
                <span>Send Prescription on WhatsApp</span>
              </a>
            </div>

            {/* Timings & Highlights Card */}
            <div className="bg-navy text-white p-6 rounded-3xl shadow-clinical">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-teal animate-pulse" />
                <span className="text-xs font-bold text-teal-light uppercase tracking-wider">
                  Operating Schedule
                </span>
              </div>
              <h3 className="font-heading text-xl font-bold text-white">
                Open Daily: 6:00 AM – 8:00 PM
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Early morning fasting sample collections begin at 6:00 AM. Free doorstep phlebotomist visits available in selected areas of Srikalahasti.
              </p>
              <div className="mt-4 pt-3 border-t border-navy-light flex items-center justify-between text-xs font-semibold text-slate-300">
                <span>⚡ Fast Reporting</span>
                <span>📱 WhatsApp Digital PDF</span>
              </div>
            </div>

            {/* Doctor Consultancy Callout */}
            <div className="bg-white border-2 border-teal/30 p-6 rounded-3xl shadow-clinical">
              <div className="flex items-center gap-3.5 mb-2.5">
                <div className="w-10 h-10 rounded-xl bg-teal/15 text-teal flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-navy">
                    Doctor consultancy
                  </h3>
                  <span className="text-xs font-semibold text-teal">Available on-site at lab</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Doctor consultancy is available at our Srikalahasti lab. You can request a physician consultation when you book your test or visit in person.
              </p>
            </div>

            {/* Quick Diagnostic Standards */}
            <div className="bg-white border border-slate-200/90 p-6 rounded-3xl shadow-clinical space-y-3.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Patient Assurances
              </h4>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-teal/10 text-teal flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-navy">₹0 Doorstep Collection Charge</p>
                  <p className="text-[11px] text-slate-500">Free sample pickup across Srikalahasti localities.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-teal/10 text-teal flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-navy">Prompt WhatsApp PDF Delivery</p>
                  <p className="text-[11px] text-slate-500">Routine tests delivered on the same day or within 24 hours.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-teal/10 text-teal flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-navy">Certified Sterile Protocol</p>
                  <p className="text-[11px] text-slate-500">Single-use sealed vacutainers opened right in front of you.</p>
                </div>
              </div>

              {/* Direct Phone Lines */}
              <div className="pt-3 border-t border-slate-100">
                <p className="text-xs font-bold text-navy mb-1.5">Need immediate phone booking?</p>
                <div className="flex flex-wrap gap-2 text-xs">
                  {CONTACT.phones.map((phone, idx) => (
                    <a
                      key={phone}
                      href={CONTACT.dialLinks[idx]}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-teal-light hover:text-teal-dark font-bold text-slate-700 transition-colors"
                    >
                      <svg className="w-3 h-3 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {CONTACT.phonesFormatted[idx]}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
