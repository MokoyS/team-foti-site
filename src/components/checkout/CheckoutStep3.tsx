"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale } from "@/contexts/LocaleContext";

export function CheckoutStep3() {
  const { t } = useLocale();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-8"
    >
      <div className="w-16 h-16 rounded-full bg-accent-yellow/20 flex items-center justify-center mx-auto mb-6">
        <svg className="w-8 h-8 text-accent-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="font-heading font-bold italic text-xl text-accent-yellow mb-2">
        {t("checkout.success")}
      </h2>
      <p className="text-foreground/70 mb-6">
        Merci pour votre commande. Vous recevrez un email de confirmation.
      </p>
      <Link
        href="/shop"
        className="inline-block px-6 py-3 bg-accent-yellow text-background font-heading font-bold rounded-lg"
      >
        Retour à la boutique
      </Link>
    </motion.div>
  );
}
