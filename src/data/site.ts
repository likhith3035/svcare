// ─── SV Care Health Diagnostics — Single source of business data ───

export const SITE = {
  name: "SV Care Health Diagnostics",
  tagline: "Accurate • Reliable • Trusted",
  motto: "Your Health Our Priority...",
  title: "SV Care Health Diagnostics | 100+ Tests & Health Packages in Srikalahasti",
  description:
    "SV Care Health Diagnostics is an ISO 9001:2015 certified diagnostic laboratory in Srikalahasti offering 100+ blood tests, health packages from ₹400, and free home sample collection. Open daily 6:00 AM to 8:00 PM.",
  url: "https://svcarediagnostics.in", // ⚠️ UPDATE THIS when the real domain is live — affects sitemap, robots.txt, and JSON-LD schema
  whatsapp: "918019081501",
  whatsappLink: "https://wa.me/918019081501",
  instagram: "https://instagram.com/svcarehealth?stkn=dW53aXh0em5taGt3",
  instagramUrl: "https://instagram.com/svcarehealth",
  instagramHandle: "@svcarehealth",
} as const;

// ─── Inaugural Opening Offers ("Healthy Today — Happier Tomorrow") ───

export type OpeningOffer = {
  id: string;
  title: string;
  shortTitle: string;
  price: number;
  type: string;
  highlight: string;
  description: string;
  badge: string;
  flyerImage: string;
};

export const OPENING_OFFERS: OpeningOffer[] = [
  {
    id: "offer-sugar",
    title: "FREE Sugar Test (Fasting / Random)",
    shortTitle: "Free Sugar Test",
    price: 0,
    type: "Blood Glucose",
    highlight: "100% Free • Fasting or Random",
    description: "Complimentary blood glucose screening to help you take the first step towards a healthier you.",
    badge: "Free Test",
    flyerImage: "/opening-offer.jpg",
  },
  {
    id: "offer-checkup",
    title: "1st 10 Members FREE Body Checkup",
    shortTitle: "1st 10 Free Checkup",
    price: 0,
    type: "Full Body Screen",
    highlight: "First 10 Patients Only",
    description: "Special inaugural privilege providing a complete body checkup for the first 10 registered members.",
    badge: "Inaugural Special",
    flyerImage: "/opening-offer.jpg",
  },
];

export const CONTACT = {
  address:
    "#6/606, Ground Floor, PNR Convention Hall, Babu Agraharam Koneru, Srikalahasti - 517 644, Tirupati Dist., A.P.",
  addressShort: "PNR Convention Hall, Srikalahasti",
  phones: ["8019081501", "8019071501"] as const,
  phonesFormatted: ["80190 81501", "80190 71501"] as const,
  // Direct dial links — use these in all tel: hrefs
  dialLinks: ["tel:+918019081501", "tel:+918019071501"] as const,
  email: "svcarehealthdiagnostics@gmail.com",
  // Verified Google Business Profile — Knowledge Graph ID: /g/11nw0mmhkm
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=SV+Care+Health+Diagnostics&query_place_id=/g/11nw0mmhkm",
  // Short share link from client (opens Google Business Profile)
  mapsShareUrl: "https://share.google/2k1IfBBSxBQChEyQw",
  // Embed URL for iframe map display
  mapsEmbedUrl:
    "https://www.google.com/maps/embed/v1/place?q=SV+Care+Health+Diagnostics+Srikalahasti&key=AIzaSyD-placeholder",
} as const;

export type DaySchedule = {
  day: string;
  shortDay: string;
  open: string;
  close: string;
  /** 24-h format for open/close calculations */
  openHour: number;
  openMinute: number;
  closeHour: number;
  closeMinute: number;
};

// ─── Lab Operating Timings: 6:00 AM to 8:00 PM (per official flyer) ───
export const HOURS: DaySchedule[] = [
  { day: "Monday", shortDay: "Mon", open: "6:00 AM", close: "8:00 PM", openHour: 6, openMinute: 0, closeHour: 20, closeMinute: 0 },
  { day: "Tuesday", shortDay: "Tue", open: "6:00 AM", close: "8:00 PM", openHour: 6, openMinute: 0, closeHour: 20, closeMinute: 0 },
  { day: "Wednesday", shortDay: "Wed", open: "6:00 AM", close: "8:00 PM", openHour: 6, openMinute: 0, closeHour: 20, closeMinute: 0 },
  { day: "Thursday", shortDay: "Thu", open: "6:00 AM", close: "8:00 PM", openHour: 6, openMinute: 0, closeHour: 20, closeMinute: 0 },
  { day: "Friday", shortDay: "Fri", open: "6:00 AM", close: "8:00 PM", openHour: 6, openMinute: 0, closeHour: 20, closeMinute: 0 },
  { day: "Saturday", shortDay: "Sat", open: "6:00 AM", close: "8:00 PM", openHour: 6, openMinute: 0, closeHour: 20, closeMinute: 0 },
  { day: "Sunday", shortDay: "Sun", open: "6:00 AM", close: "1:00 PM", openHour: 6, openMinute: 0, closeHour: 13, closeMinute: 0 },
];

// ─── Official Client Flyer Metadata & Pillars ───
export const FLYER_DATA = {
  title: "Laboratory Test Price List (100 Tests)",
  imagePath: "/price-list-flyer.png",
  totalTests: 100,
  minRate: 50,
  maxRate: 1600,
  pillars: [
    { title: "Modern Equipment", icon: "equipment" },
    { title: "Accurate & Reliable Results", icon: "accurate" },
    { title: "Fast Reporting", icon: "fast" },
    { title: "Experienced Lab Technicians", icon: "technicians" },
    { title: "Your Health Our Care", icon: "care" },
  ],
  homeCollectionNote: "Home Sample Collection (Selected Areas)",
  digitalReportsNote: "Digital Reports (WhatsApp / Email)",
  timingsLabel: "6:00 AM TO 8:00 PM",
} as const;

// ─── 7 Official Health Packages from Client Flyer ("More Care • Less Cost") ───

export type OfficialPackage = {
  id: string;
  name: string;
  shortName: string;
  price: number;
  originalPrice?: number;
  inclusions: string;
  testList: string[];
  description: string;
  tag?: string;
  isPopular?: boolean;
  accentColor: string; // Tailwind class
};

export const OFFICIAL_PACKAGES: OfficialPackage[] = [
  {
    id: "pkg-basic",
    name: "Basic Health Package",
    shortName: "Basic Health",
    price: 699,
    originalPrice: 1650,
    inclusions: "CBC + FBS + Lipid Profile + LFT + KFT + Urine",
    testList: [
      "CBC (Complete Blood Count)",
      "FBS (Fasting Blood Sugar)",
      "Lipid Profile (10 tests)",
      "LFT Complete (8 tests)",
      "KFT Complete (7 tests)",
      "Urine Routine / CUE",
    ],
    description: "Complete full-organ baseline evaluation covering blood cells, heart, liver, kidneys, and metabolism.",
    tag: "Best Value",
    isPopular: true,
    accentColor: "from-blue-600 to-teal",
  },
  {
    id: "pkg-diabetic",
    name: "Diabetic Package",
    shortName: "Diabetic Care",
    price: 499,
    originalPrice: 870,
    inclusions: "FBS + PPBS + HbA1c",
    testList: [
      "FBS (Fasting Blood Sugar)",
      "PPBS (Post Prandial Blood Sugar)",
      "HbA1c (3-Month Average Glucose)",
    ],
    description: "Standard 3-parameter diabetes audit monitoring daily fluctuations and quarterly glycemic control.",
    tag: "Targeted Care",
    accentColor: "from-emerald-600 to-teal",
  },
  {
    id: "pkg-fever",
    name: "Fever Package",
    shortName: "Fever Profile",
    price: 599,
    originalPrice: 1100,
    inclusions: "CBC + ESR + CRP + Widal + Malaria",
    testList: [
      "CBC (Complete Blood Count)",
      "ESR (Inflammation Marker)",
      "CRP (C-Reactive Protein)",
      "Widal Test (Typhoid Fever)",
      "Malaria Parasite Smear Test",
    ],
    description: "Differential diagnosis for acute fevers, viral infections, dengue/typhoid differentiation, and malaria.",
    tag: "Rapid Care",
    accentColor: "from-amber-600 to-orange-500",
  },
  {
    id: "pkg-thyroid",
    name: "Thyroid Package",
    shortName: "Thyroid Profile",
    price: 450,
    originalPrice: 700,
    inclusions: "T3 + T4 + TSH",
    testList: [
      "Total T3 (Triiodothyronine)",
      "Total T4 (Thyroxine)",
      "TSH (Thyroid Stimulating Hormone)",
    ],
    description: "Accurate tri-hormone screening to detect hypothyroidism, hyperthyroidism, and metabolic fatigue.",
    tag: "Hormone Health",
    accentColor: "from-indigo-600 to-purple-600",
  },
  {
    id: "pkg-liver",
    name: "Liver Package",
    shortName: "Liver Function",
    price: 400,
    originalPrice: 800,
    inclusions: "Complete LFT",
    testList: [
      "SGOT (AST)",
      "SGPT (ALT)",
      "ALP (Alkaline Phosphatase)",
      "Total Bilirubin",
      "Direct Bilirubin",
      "Total Protein",
      "Albumin",
      "A/G Ratio",
    ],
    description: "Evaluates liver enzymes, biliary health, and protein synthesis for fatty liver and alcohol screening.",
    tag: "Organ Health",
    accentColor: "from-green-600 to-emerald-600",
  },
  {
    id: "pkg-kidney",
    name: "Kidney Package",
    shortName: "Kidney Function",
    price: 400,
    originalPrice: 850,
    inclusions: "Complete KFT + Electrolytes",
    testList: [
      "Blood Urea",
      "Serum Creatinine",
      "Uric Acid",
      "Serum Calcium",
      "Sodium (Na)",
      "Potassium (K)",
      "Chloride (Cl)",
    ],
    description: "Assesses glomerular filtration, waste elimination, uric acid, and vital body fluid electrolytes.",
    tag: "Organ Health",
    accentColor: "from-cyan-600 to-blue-600",
  },
  {
    id: "pkg-women",
    name: "Women Health Package",
    shortName: "Women Wellness",
    price: 999,
    originalPrice: 2650,
    inclusions: "CBC + TSH + HbA1c + Vitamin D3 + B12",
    testList: [
      "CBC (Anemia & Immunity)",
      "TSH (Thyroid Function)",
      "HbA1c (Diabetes Risk)",
      "Vitamin D3 (Bone & Immunity)",
      "Vitamin B12 (Nerve & Energy)",
    ],
    description: "Tailored multi-vital screen for women addressing anemia, fatigue, bone density, and hormonal balance.",
    tag: "Comprehensive",
    isPopular: true,
    accentColor: "from-rose-600 to-pink-600",
  },
];

// ─── 100 Individual Pathology Tests Master Catalog (Client Price List) ───

export type LabTestCategory =
  | "Hematology"
  | "Diabetes Profile"
  | "Lipid Profile"
  | "Kidney Function Tests (RFT)"
  | "Liver Function Tests (LFT)"
  | "Thyroid Profile"
  | "Urine Examination"
  | "Stool Examination"
  | "Coagulation Profile"
  | "Infectious Diseases"
  | "Vitamins & Special Tests"
  | "Other Tests";

export type LabTest = {
  id: string;
  testNo: number;
  name: string;
  category: LabTestCategory;
  rate: number;
  sampleType: "Blood" | "Urine" | "Stool" | "Other";
  fastingNote?: string;
  popular?: boolean;
};

export const LAB_TESTS: LabTest[] = [
  // ─── Hematology (Tests 1 - 9) ───
  { id: "test-1", testNo: 1, name: "CBC (Complete Blood Count)", category: "Hematology", rate: 250, sampleType: "Blood", popular: true },
  { id: "test-2", testNo: 2, name: "ESR", category: "Hematology", rate: 50, sampleType: "Blood" },
  { id: "test-3", testNo: 3, name: "Hemoglobin", category: "Hematology", rate: 50, sampleType: "Blood", popular: true },
  { id: "test-4", testNo: 4, name: "Blood Group & Rh", category: "Hematology", rate: 100, sampleType: "Blood" },
  { id: "test-5", testNo: 5, name: "Platelet Count", category: "Hematology", rate: 100, sampleType: "Blood", popular: true },
  { id: "test-6", testNo: 6, name: "Peripheral Smear", category: "Hematology", rate: 200, sampleType: "Blood" },
  { id: "test-7", testNo: 7, name: "Reticulocyte Count", category: "Hematology", rate: 150, sampleType: "Blood" },
  { id: "test-8", testNo: 8, name: "Absolute Eosinophil Count", category: "Hematology", rate: 100, sampleType: "Blood" },
  { id: "test-9", testNo: 9, name: "MP/Smear (Malaria Parasite)", category: "Hematology", rate: 150, sampleType: "Blood" },

  // ─── Diabetes Profile (Tests 9 - 14) ───
  { id: "test-10", testNo: 9, name: "FBS (Fasting Blood Sugar)", category: "Diabetes Profile", rate: 60, sampleType: "Blood", fastingNote: "Requires 8-10 hrs overnight fasting", popular: true },
  { id: "test-11", testNo: 10, name: "PPBS (Post Prandial Blood Sugar)", category: "Diabetes Profile", rate: 60, sampleType: "Blood", fastingNote: "Sample taken 2 hrs after meal" },
  { id: "test-12", testNo: 11, name: "RBS (Random Blood Sugar)", category: "Diabetes Profile", rate: 60, sampleType: "Blood" },
  { id: "test-13", testNo: 12, name: "HbA1c", category: "Diabetes Profile", rate: 350, sampleType: "Blood", popular: true },
  { id: "test-14", testNo: 13, name: "HbA1c + FBS", category: "Diabetes Profile", rate: 400, sampleType: "Blood", fastingNote: "Requires 8-10 hrs fasting", popular: true },
  { id: "test-15", testNo: 14, name: "Diabetes Profile", category: "Diabetes Profile", rate: 500, sampleType: "Blood", fastingNote: "Requires 8-10 hrs fasting" },

  // ─── Lipid Profile (Tests 15 - 21) ───
  { id: "test-16", testNo: 15, name: "Lipid Profile", category: "Lipid Profile", rate: 400, sampleType: "Blood", fastingNote: "Requires 10-12 hrs overnight fasting", popular: true },
  { id: "test-17", testNo: 16, name: "Total Cholesterol", category: "Lipid Profile", rate: 100, sampleType: "Blood" },
  { id: "test-18", testNo: 17, name: "Triglycerides", category: "Lipid Profile", rate: 100, sampleType: "Blood" },
  { id: "test-19", testNo: 18, name: "HDL Cholesterol", category: "Lipid Profile", rate: 100, sampleType: "Blood" },
  { id: "test-20", testNo: 19, name: "LDL Cholesterol", category: "Lipid Profile", rate: 100, sampleType: "Blood" },
  { id: "test-21", testNo: 20, name: "VLDL Cholesterol", category: "Lipid Profile", rate: 100, sampleType: "Blood" },
  { id: "test-22", testNo: 21, name: "LFT + Lipid Profile", category: "Lipid Profile", rate: 700, sampleType: "Blood", fastingNote: "Requires 10-12 hrs fasting", popular: true },

  // ─── Kidney Function Tests (RFT) (Tests 22 - 30) ───
  { id: "test-23", testNo: 22, name: "Urea", category: "Kidney Function Tests (RFT)", rate: 100, sampleType: "Blood" },
  { id: "test-24", testNo: 23, name: "Creatinine", category: "Kidney Function Tests (RFT)", rate: 100, sampleType: "Blood", popular: true },
  { id: "test-25", testNo: 24, name: "Uric Acid", category: "Kidney Function Tests (RFT)", rate: 120, sampleType: "Blood", popular: true },
  { id: "test-26", testNo: 25, name: "Calcium", category: "Kidney Function Tests (RFT)", rate: 120, sampleType: "Blood" },
  { id: "test-27", testNo: 26, name: "Sodium (Na)", category: "Kidney Function Tests (RFT)", rate: 100, sampleType: "Blood" },
  { id: "test-28", testNo: 27, name: "Potassium (K)", category: "Kidney Function Tests (RFT)", rate: 100, sampleType: "Blood" },
  { id: "test-29", testNo: 28, name: "Chloride (Cl)", category: "Kidney Function Tests (RFT)", rate: 100, sampleType: "Blood" },
  { id: "test-30", testNo: 29, name: "KFT / RFT (Complete)", category: "Kidney Function Tests (RFT)", rate: 400, sampleType: "Blood", popular: true },
  { id: "test-31", testNo: 30, name: "Electrolytes (Na/K/Cl)", category: "Kidney Function Tests (RFT)", rate: 300, sampleType: "Blood", popular: true },

  // ─── Liver Function Tests (LFT) (Tests 31 - 39) ───
  { id: "test-32", testNo: 31, name: "SGOT (AST)", category: "Liver Function Tests (LFT)", rate: 100, sampleType: "Blood" },
  { id: "test-33", testNo: 32, name: "SGPT (ALT)", category: "Liver Function Tests (LFT)", rate: 100, sampleType: "Blood", popular: true },
  { id: "test-34", testNo: 33, name: "ALP (Alkaline Phosphatase)", category: "Liver Function Tests (LFT)", rate: 100, sampleType: "Blood" },
  { id: "test-35", testNo: 34, name: "Total Bilirubin", category: "Liver Function Tests (LFT)", rate: 100, sampleType: "Blood" },
  { id: "test-36", testNo: 35, name: "Direct Bilirubin", category: "Liver Function Tests (LFT)", rate: 100, sampleType: "Blood" },
  { id: "test-37", testNo: 36, name: "Total Protein", category: "Liver Function Tests (LFT)", rate: 100, sampleType: "Blood" },
  { id: "test-38", testNo: 37, name: "Albumin", category: "Liver Function Tests (LFT)", rate: 100, sampleType: "Blood" },
  { id: "test-39", testNo: 38, name: "LFT (Complete)", category: "Liver Function Tests (LFT)", rate: 400, sampleType: "Blood", popular: true },
  { id: "test-40", testNo: 39, name: "LFT + KFT", category: "Liver Function Tests (LFT)", rate: 700, sampleType: "Blood", popular: true },

  // ─── Thyroid Profile (Tests 40 - 43) ───
  { id: "test-41", testNo: 40, name: "TSH (Thyroid Stimulating Hormone)", category: "Thyroid Profile", rate: 250, sampleType: "Blood", popular: true },
  { id: "test-42", testNo: 41, name: "T3 (Total Triiodothyronine)", category: "Thyroid Profile", rate: 150, sampleType: "Blood" },
  { id: "test-43", testNo: 42, name: "T4 (Total Thyroxine)", category: "Thyroid Profile", rate: 150, sampleType: "Blood" },
  { id: "test-44", testNo: 43, name: "Thyroid Profile (T3, T4, TSH)", category: "Thyroid Profile", rate: 450, sampleType: "Blood", popular: true },

  // ─── Urine Examination (Tests 44 - 51) ───
  { id: "test-45", testNo: 44, name: "Urine Routine / CUE", category: "Urine Examination", rate: 100, sampleType: "Urine", popular: true },
  { id: "test-46", testNo: 45, name: "Urine Sugar", category: "Urine Examination", rate: 50, sampleType: "Urine" },
  { id: "test-47", testNo: 46, name: "Urine Albumin", category: "Urine Examination", rate: 50, sampleType: "Urine" },
  { id: "test-48", testNo: 47, name: "Urine Ketones", category: "Urine Examination", rate: 100, sampleType: "Urine" },
  { id: "test-49", testNo: 48, name: "Urine Bile Salts / Pigments", category: "Urine Examination", rate: 100, sampleType: "Urine" },
  { id: "test-50", testNo: 49, name: "Urine Pregnancy Test", category: "Urine Examination", rate: 100, sampleType: "Urine" },
  { id: "test-51", testNo: 50, name: "Microalbumin", category: "Urine Examination", rate: 300, sampleType: "Urine" },
  { id: "test-52", testNo: 51, name: "Urine Culture & Sensitivity", category: "Urine Examination", rate: 500, sampleType: "Urine" },

  // ─── Stool Examination (Tests 52 - 53) ───
  { id: "test-53", testNo: 52, name: "Stool Routine", category: "Stool Examination", rate: 150, sampleType: "Stool" },
  { id: "test-54", testNo: 53, name: "Stool Occult Blood", category: "Stool Examination", rate: 150, sampleType: "Stool" },

  // ─── Coagulation Profile (Tests 54 - 57) ───
  { id: "test-55", testNo: 54, name: "PT / INR", category: "Coagulation Profile", rate: 250, sampleType: "Blood", popular: true },
  { id: "test-56", testNo: 55, name: "APTT", category: "Coagulation Profile", rate: 250, sampleType: "Blood" },
  { id: "test-57", testNo: 56, name: "BT (Bleeding Time)", category: "Coagulation Profile", rate: 100, sampleType: "Blood" },
  { id: "test-58", testNo: 57, name: "CT (Clotting Time)", category: "Coagulation Profile", rate: 100, sampleType: "Blood" },

  // ─── Infectious Diseases (Tests 58 - 70) ───
  { id: "test-59", testNo: 58, name: "Widal (Typhoid)", category: "Infectious Diseases", rate: 200, sampleType: "Blood", popular: true },
  { id: "test-60", testNo: 59, name: "CRP (C-Reactive Protein)", category: "Infectious Diseases", rate: 300, sampleType: "Blood", popular: true },
  { id: "test-61", testNo: 60, name: "Dengue NS1 Antigen", category: "Infectious Diseases", rate: 350, sampleType: "Blood", popular: true },
  { id: "test-62", testNo: 61, name: "Dengue IgM", category: "Infectious Diseases", rate: 350, sampleType: "Blood" },
  { id: "test-63", testNo: 62, name: "Dengue IgG", category: "Infectious Diseases", rate: 350, sampleType: "Blood" },
  { id: "test-64", testNo: 63, name: "Dengue IgG/IgM (Combo)", category: "Infectious Diseases", rate: 600, sampleType: "Blood", popular: true },
  { id: "test-65", testNo: 64, name: "Malaria Test", category: "Infectious Diseases", rate: 200, sampleType: "Blood", popular: true },
  { id: "test-66", testNo: 65, name: "HBsAg (Hepatitis B)", category: "Infectious Diseases", rate: 200, sampleType: "Blood" },
  { id: "test-67", testNo: 66, name: "HIV 1 & 2 Antibody", category: "Infectious Diseases", rate: 300, sampleType: "Blood" },
  { id: "test-68", testNo: 67, name: "VDRL (Syphilis)", category: "Infectious Diseases", rate: 150, sampleType: "Blood" },
  { id: "test-69", testNo: 68, name: "ASO Titre", category: "Infectious Diseases", rate: 300, sampleType: "Blood" },
  { id: "test-70", testNo: 69, name: "RA Factor (Rheumatoid)", category: "Infectious Diseases", rate: 300, sampleType: "Blood", popular: true },
  { id: "test-71", testNo: 70, name: "Anti-CCP", category: "Infectious Diseases", rate: 900, sampleType: "Blood" },

  // ─── Vitamins & Special Tests (Tests 71 - 78) ───
  { id: "test-72", testNo: 71, name: "Vitamin B12", category: "Vitamins & Special Tests", rate: 900, sampleType: "Blood", popular: true },
  { id: "test-73", testNo: 72, name: "Vitamin D3", category: "Vitamins & Special Tests", rate: 900, sampleType: "Blood", popular: true },
  { id: "test-74", testNo: 73, name: "Serum Iron", category: "Vitamins & Special Tests", rate: 300, sampleType: "Blood" },
  { id: "test-75", testNo: 74, name: "Ferritin", category: "Vitamins & Special Tests", rate: 500, sampleType: "Blood" },
  { id: "test-76", testNo: 75, name: "Serum Insulin", category: "Vitamins & Special Tests", rate: 500, sampleType: "Blood" },
  { id: "test-77", testNo: 76, name: "C-Peptide", category: "Vitamins & Special Tests", rate: 800, sampleType: "Blood" },
  { id: "test-78", testNo: 77, name: "Homocysteine", category: "Vitamins & Special Tests", rate: 700, sampleType: "Blood" },
  { id: "test-79", testNo: 78, name: "Vitamin B12 + D3 Combo", category: "Vitamins & Special Tests", rate: 1600, sampleType: "Blood", popular: true },

  // ─── Other Tests & Tumor Markers (Tests 79 - 93) ───
  { id: "test-80", testNo: 79, name: "Serum Amylase", category: "Other Tests", rate: 300, sampleType: "Blood" },
  { id: "test-81", testNo: 80, name: "Serum Lipase", category: "Other Tests", rate: 300, sampleType: "Blood" },
  { id: "test-82", testNo: 81, name: "GGT (Gamma GT)", category: "Other Tests", rate: 150, sampleType: "Blood" },
  { id: "test-83", testNo: 82, name: "LDH (Lactate Dehydrogenase)", category: "Other Tests", rate: 200, sampleType: "Blood" },
  { id: "test-84", testNo: 83, name: "Hb Electrophoresis", category: "Other Tests", rate: 800, sampleType: "Blood" },
  { id: "test-85", testNo: 84, name: "Semen Analysis", category: "Other Tests", rate: 300, sampleType: "Other" },
  { id: "test-86", testNo: 85, name: "PSA (Prostate Specific Antigen)", category: "Other Tests", rate: 600, sampleType: "Blood", popular: true },
  { id: "test-87", testNo: 86, name: "CEA (Carcinoembryonic Antigen)", category: "Other Tests", rate: 800, sampleType: "Blood" },
  { id: "test-88", testNo: 87, name: "AFP (Alpha-fetoprotein)", category: "Other Tests", rate: 700, sampleType: "Blood" },
  { id: "test-89", testNo: 88, name: "CA-125 (Ovarian Marker)", category: "Other Tests", rate: 900, sampleType: "Blood" },
  { id: "test-90", testNo: 89, name: "CA-19.9 (GI / Pancreatic)", category: "Other Tests", rate: 900, sampleType: "Blood" },
  { id: "test-91", testNo: 90, name: "CA-15.3 (Breast Marker)", category: "Other Tests", rate: 900, sampleType: "Blood" },
  { id: "test-92", testNo: 91, name: "Procalcitonin", category: "Other Tests", rate: 1200, sampleType: "Blood" },
  { id: "test-93", testNo: 92, name: "Blood Culture & Sensitivity", category: "Other Tests", rate: 700, sampleType: "Blood" },
  { id: "test-94", testNo: 93, name: "H. pylori Antigen", category: "Other Tests", rate: 500, sampleType: "Blood" },
];

// ─── Test categories (for chip cloud and quick tabs) ───

export type TestCategory = {
  id: string;
  chipLabel: string;
  name: string;
  parameterCount: number;
  system: "Cardiovascular" | "Organ Function" | "Metabolic" | "Hematology" | "Vitamins & Minerals" | "Inflammation & Fever";
  fastingNote?: string;
};

export const TEST_CATEGORIES: TestCategory[] = [
  { id: "lipid", chipLabel: "Lipid Profile", name: "Lipid Profile", parameterCount: 10, system: "Cardiovascular", fastingNote: "Requires 10-12 hrs overnight fasting" },
  { id: "liver", chipLabel: "Liver (LFT)", name: "Liver Profile", parameterCount: 12, system: "Organ Function" },
  { id: "viral", chipLabel: "Viral Markers", name: "Viral Marker", parameterCount: 4, system: "Inflammation & Fever" },
  { id: "fever", chipLabel: "Fever Profile", name: "Fever Profile", parameterCount: 5, system: "Inflammation & Fever" },
  { id: "kidney", chipLabel: "Kidney (KFT/RFT)", name: "Kidney Profile", parameterCount: 7, system: "Organ Function" },
  { id: "iron", chipLabel: "Iron Profile", name: "Iron Deficiency Profile", parameterCount: 4, system: "Hematology" },
  { id: "electrolytes", chipLabel: "Electrolytes", name: "Serum Electrolytes", parameterCount: 6, system: "Vitamins & Minerals" },
  { id: "rf", chipLabel: "RA Factor", name: "Rheumatoid Factor (RF)", parameterCount: 1, system: "Inflammation & Fever" },
  { id: "esr", chipLabel: "ESR", name: "Erythrocyte Sedimentation Rate (ESR)", parameterCount: 1, system: "Hematology" },
  { id: "crp", chipLabel: "CRP", name: "C-Reactive Protein (CRP)", parameterCount: 1, system: "Inflammation & Fever" },
  { id: "thyroid", chipLabel: "Thyroid (T3/T4/TSH)", name: "Thyroid Profile", parameterCount: 3, system: "Metabolic" },
  { id: "diabetes", chipLabel: "Diabetes (HbA1c)", name: "Diabetes Profile", parameterCount: 3, system: "Metabolic", fastingNote: "Fasting blood sugar requires 8-10 hrs fasting" },
  { id: "vitamin", chipLabel: "Vitamins (B12/D3)", name: "Vitamin Profile", parameterCount: 2, system: "Vitamins & Minerals" },
  { id: "cbc", chipLabel: "CBC Blood Count", name: "Complete Blood Count (CBC)", parameterCount: 28, system: "Hematology" },
  { id: "cardiac", chipLabel: "Cardiac Markers", name: "Cardiac Risk Markers", parameterCount: 5, system: "Cardiovascular" },
  { id: "urine", chipLabel: "Urine Routine", name: "Urine Examination", parameterCount: 8, system: "Organ Function" },
];

// ─── Comprehensive Full-Body Checkup Master Packages ───

export type Package = {
  id: string;
  name: string;
  shortName: string;
  parameters: number;
  originalPrice: number;
  price: number;
  /** IDs from TEST_CATEGORIES included in this package */
  includedTests: string[];
  /** short highlights */
  highlights: string[];
};

export const MASTER_PACKAGES: Package[] = [
  {
    id: "health-checkup-1",
    name: "Health Checkup 1",
    shortName: "Health Checkup 1",
    parameters: 62,
    originalPrice: 2550,
    price: 999,
    includedTests: ["lipid", "liver", "kidney", "thyroid", "diabetes", "cbc"],
    highlights: [
      "62 parameters covering vital organs",
      "Free sample collection included",
      "Reports delivered within 24 hours",
    ],
  },
  {
    id: "master-checkup-2",
    name: "Master Checkup 2",
    shortName: "Master Checkup 2",
    parameters: 69,
    originalPrice: 3740,
    price: 1800,
    includedTests: [
      "lipid", "liver", "kidney", "thyroid", "diabetes", "cbc",
      "vitamin", "cardiac",
    ],
    highlights: [
      "Includes all tests in Health Checkup 1",
      "Adds Vitamin Profile and Cardiac Risk Markers",
      "Free sample collection included",
    ],
  },
  {
    id: "advanced-master-3",
    name: "Advanced Master 3",
    shortName: "Advanced Master 3",
    parameters: 78,
    originalPrice: 5260,
    price: 2500,
    includedTests: [
      "lipid", "liver", "kidney", "thyroid", "diabetes", "cbc",
      "vitamin", "cardiac",
      "iron", "electrolytes", "rf", "esr", "crp", "urine",
    ],
    highlights: [
      "Our most comprehensive full-body evaluation",
      "Includes all tests in Master Checkup 2",
      "Adds Iron Deficiency, Electrolytes, RF, ESR, CRP, and Urine",
      "Free sample collection included",
    ],
  },
];

// Backwards-compatible PACKAGES reference (aliases MASTER_PACKAGES)
export const PACKAGES = MASTER_PACKAGES;

// ─── Official ISO 9001:2015 Registration Certificate ───
export const ACCREDITATION = {
  title: "ISO 9001:2015 Registered Diagnostic Laboratory",
  standard: "ISO 9001:2015",
  type: "Quality Management Systems (QMS)",
  scope: "Activities of Independent Diagnostic / Pathological Laboratories",
  certificateNumber: "EU/QMS/01326",
  registeredDate: "06-10-2026",
  firstAuditDate: "05-10-2027",
  secondAuditDate: "05-10-2028",
  recertificationDate: "05-10-2029",
  accreditedBy: "EU Certification Limited",
  accreditationAddress: "15 Broadstone House, Dorset Road, London, England SW81AD",
  companyNumber: "15665772",
  verificationUrl: "https://www.eucert.co.uk",
  verificationEmail: "info@eucert.co.uk",
  imagePath: "/iso-certificate.jpg",
  pdfPath: "/iso-certificate.pdf",
  registeredEntity: "S V CARE HEALTH DIAGNOSTICS",
  registeredAddress:
    "6-606, PNR CONVENTION HALL GROUND FLOOR, BABUAGRAHARAM, KONERU, SRIKALAHASTHI, TIRUPATI, ANDHRA PRADESH – 517644, INDIA",
  pillars: [
    {
      title: "Calibrated Analyzers",
      desc: "Daily calibrator and multi-level QC controls run before patient testing.",
    },
    {
      title: "Barcoded Sample Safety",
      desc: "Vacuum-sealed blood collection tubes with barcode IDs eliminate mix-ups.",
    },
    {
      title: "Cold-Chain Transport",
      desc: "Temperature-regulated transport boxes preserve sterile blood integrity.",
    },
    {
      title: "Certified Sign-Off",
      desc: "Independent pathological lab protocols audited under ISO 9001:2015 standards.",
    },
  ],
} as const;

// ─── Placeholders (Feature flags & real Google reference) ───
export const PLACEHOLDERS = {
  googleReviewUrl: "https://share.google/QEaqybZ73YKzJuLuh",
  showReviews: false, // Set to true once verified patient reviews are ready
  showGallery: false, // Set to true to display clinic photographs
  showAccreditations: true, // Official ISO 9001:2015 certificate issued (EU/QMS/01326)
} as const;

// ─── Illustrative lab report data for hero animation ───

export const HERO_LAB_REPORT = {
  title: "Lipid Profile",
  patientName: "Sample Report",
  date: "04 Oct 2026",
  rows: [
    { test: "Total Cholesterol", value: "185", unit: "mg/dL", range: "< 200", status: "normal" as const },
    { test: "Triglycerides", value: "142", unit: "mg/dL", range: "< 150", status: "normal" as const },
    { test: "HDL Cholesterol", value: "52", unit: "mg/dL", range: "> 40", status: "normal" as const },
    { test: "LDL Cholesterol", value: "105", unit: "mg/dL", range: "< 130", status: "normal" as const },
    { test: "VLDL Cholesterol", value: "28", unit: "mg/dL", range: "< 30", status: "normal" as const },
  ],
} as const;

// ─── Collection places ───

export const COLLECTION_PLACES = ["Home", "Work", "Clinic"] as const;
export type CollectionPlace = (typeof COLLECTION_PLACES)[number];
