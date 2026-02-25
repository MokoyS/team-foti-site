"use client";

import { useState } from "react";
import { useLocale } from "@/contexts/LocaleContext";

interface CheckoutStep1Props {
  onComplete: () => void;
}

export function CheckoutStep1({ onComplete }: CheckoutStep1Props) {
  const { t } = useLocale();
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("France");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm text-foreground/70 mb-1">{t("checkout.email")}</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/20 text-foreground focus:border-accent-yellow focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-sm text-foreground/70 mb-1">{t("checkout.address")}</label>
        <input
          type="text"
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/20 text-foreground focus:border-accent-yellow focus:outline-none"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-foreground/70 mb-1">{t("checkout.city")}</label>
          <input
            type="text"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/20 text-foreground focus:border-accent-yellow focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm text-foreground/70 mb-1">{t("checkout.zip")}</label>
          <input
            type="text"
            required
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/20 text-foreground focus:border-accent-yellow focus:outline-none"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm text-foreground/70 mb-1">{t("checkout.country")}</label>
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/20 text-foreground focus:border-accent-yellow focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="group w-full mt-6 inline-flex items-center justify-center gap-2.5 px-6 py-2.5 bg-white text-background font-heading font-semibold text-sm rounded-lg transition-all duration-200 hover:bg-white/90 active:scale-[0.98]"
      >
        {t("checkout.step2")}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden>
          <path d="M2 7h10M8 3l4 4-4 4" />
        </svg>
      </button>
    </form>
  );
}
