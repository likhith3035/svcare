"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

type SectionId = "hero" | "prescription" | "fasting" | "homeCollection" | "booking";

interface LanguageContextType {
  /** True if global default is Telugu */
  globalTelugu: boolean;
  /** Toggle all sections between Telugu and English */
  toggleGlobal: () => void;
  /** Check if a specific section is currently in Telugu */
  isTelugu: (section: SectionId) => boolean;
  /** Toggle a specific section independently */
  toggleSection: (section: SectionId) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "svcare_section_lang_prefs";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [sectionOverrides, setSectionOverrides] = useState<Record<string, boolean>>({});
  const [globalTelugu, setGlobalTelugu] = useState<boolean>(false);

  // Load saved preferences on client mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.global === "boolean") setGlobalTelugu(parsed.global);
        if (parsed.sections && typeof parsed.sections === "object") {
          setSectionOverrides(parsed.sections);
        }
      }
    } catch {
      // ignore JSON or localStorage errors
    }
  }, []);

  // Save changes
  const savePrefs = useCallback((nextGlobal: boolean, nextSections: Record<string, boolean>) => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ global: nextGlobal, sections: nextSections })
      );
    } catch {
      // ignore
    }
  }, []);

  const isTelugu = useCallback(
    (section: SectionId): boolean => {
      if (section in sectionOverrides) {
        return sectionOverrides[section];
      }
      return globalTelugu;
    },
    [sectionOverrides, globalTelugu]
  );

  const toggleSection = useCallback(
    (section: SectionId) => {
      setSectionOverrides((prev) => {
        const current = section in prev ? prev[section] : globalTelugu;
        const next = { ...prev, [section]: !current };
        savePrefs(globalTelugu, next);
        return next;
      });
    },
    [globalTelugu, savePrefs]
  );

  const toggleGlobal = useCallback(() => {
    setGlobalTelugu((prev) => {
      const nextGlobal = !prev;
      // When toggling global, align all section overrides to the new global state
      const nextSections: Record<string, boolean> = {
        hero: nextGlobal,
        prescription: nextGlobal,
        fasting: nextGlobal,
        homeCollection: nextGlobal,
        booking: nextGlobal,
      };
      setSectionOverrides(nextSections);
      savePrefs(nextGlobal, nextSections);
      return nextGlobal;
    });
  }, [savePrefs]);

  return (
    <LanguageContext.Provider value={{ globalTelugu, toggleGlobal, isTelugu, toggleSection }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

/**
 * Reusable micro-pill button for toggling Telugu on specific sentences / cards.
 * Lets users switch language for individual things without changing the whole site.
 */
export function SectionLangToggle({
  section,
  className = "",
  size = "sm",
}: {
  section: SectionId;
  className?: string;
  size?: "xs" | "sm";
}) {
  const { isTelugu, toggleSection } = useLanguage();
  const teluguActive = isTelugu(section);

  return (
    <button
      type="button"
      onClick={() => toggleSection(section)}
      className={`inline-flex items-center gap-1.5 font-bold transition-all rounded-full cursor-pointer select-none shrink-0 ${
        size === "xs"
          ? "px-2 py-0.5 text-[10px]"
          : "px-2.5 py-1 text-xs"
      } ${
        teluguActive
          ? "bg-teal text-white shadow-2xs hover:bg-teal-dark border border-teal"
          : "bg-slate-100 hover:bg-slate-200/90 text-slate-700 border border-slate-200"
      } ${className}`}
      title={teluguActive ? "Switch to English" : "తెలుగులో చదవండి (Read in Telugu)"}
      aria-label={teluguActive ? "Switch to English" : "Switch to Telugu"}
    >
      <span className="text-[11px] leading-none">🌐</span>
      <span className="tracking-tight">
        {teluguActive ? "English" : "తెలుగు"}
      </span>
    </button>
  );
}
