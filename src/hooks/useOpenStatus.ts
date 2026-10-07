"use client";

import { useEffect, useState } from "react";
import { HOURS } from "@/data/site";

/**
 * Returns whether the lab is currently open,
 * calculated in Asia/Kolkata timezone.
 */
export function useOpenStatus() {
  const [isOpen, setIsOpen] = useState<boolean | null>(null);

  useEffect(() => {
    function check() {
      const now = new Date(
        new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
      );
      const dayIndex = now.getDay(); // 0 = Sunday
      // Map JS getDay() (0=Sun) → HOURS array (0=Mon)
      const scheduleIndex = dayIndex === 0 ? 6 : dayIndex - 1;
      const schedule = HOURS[scheduleIndex];

      const currentMinutes = now.getHours() * 60 + now.getMinutes();
      const openMinutes = schedule.openHour * 60 + schedule.openMinute;
      const closeMinutes = schedule.closeHour * 60 + schedule.closeMinute;

      setIsOpen(currentMinutes >= openMinutes && currentMinutes < closeMinutes);
    }

    check();
    const interval = setInterval(check, 60_000);
    return () => clearInterval(interval);
  }, []);

  return isOpen;
}

/**
 * Returns the index (0-6, Mon-Sun) of today in Asia/Kolkata timezone.
 */
export function useTodayIndex() {
  const [index, setIndex] = useState<number | null>(null);

  useEffect(() => {
    const now = new Date(
      new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
    );
    const dayIndex = now.getDay();
    setIndex(dayIndex === 0 ? 6 : dayIndex - 1);
  }, []);

  return index;
}
