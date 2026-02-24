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
        className="w-full mt-6 px-6 py-3 bg-accent-yellow text-background font-heading font-bold rounded-lg btn-glow"
      >
        {t("checkout.step2")} →
      </button>
    </form>
  );
}
