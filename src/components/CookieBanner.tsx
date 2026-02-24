"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "@/contexts/LocaleContext";
import Link from "next/link";

const STORAGE_KEY = "team-foti-cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const { t } = useLocale();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const consent = localStorage.getItem(STORAGE_KEY);
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(STORAGE_KEY, "declined");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 bg-background border-t border-white/10 shadow-lg"
        >
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-sm text-foreground/90">
              {t("cookie.message")}{" "}
              <Link href="/mentions-legales" className="text-accent-yellow underline hover:no-underline">
                {t("nav.legal")}
              </Link>
            </p>
            <div className="flex gap-3 shrink-0">
              <button
                type="button"
                onClick={decline}
                className="px-4 py-2 text-sm border border-white/20 rounded-lg hover:bg-white/5 transition"
              >
                {t("cookie.decline")}
              </button>
              <button
                type="button"
                onClick={accept}
                className="px-4 py-2 text-sm bg-accent-yellow text-background font-medium rounded-lg hover:shadow-glow transition"
              >
                {t("cookie.accept")}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
