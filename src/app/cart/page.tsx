"use client";

import Link from "next/link";
import { useCartStore } from "@/lib/store/cart-store";
import { useLocale } from "@/contexts/LocaleContext";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore();
  const { t } = useLocale();

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <h1 className="font-heading font-bold italic text-2xl text-accent-yellow mb-4">
          {t("cart.title")}
        </h1>
        <p className="text-foreground/70">{t("cart.empty")}</p>
        <Link
          href="/shop"
          className="group mt-6 inline-flex items-center gap-2 px-5 py-2.5 border border-white/20 text-foreground/80 font-heading font-semibold text-sm rounded-lg transition-all duration-200 hover:border-white/40 hover:text-foreground hover:bg-white/[0.04] active:scale-[0.98]"
        >
          {t("cart.continueShopping")}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-24">
      <h1 className="font-heading font-bold italic text-2xl text-accent-yellow mb-8">
        {t("cart.title")}
      </h1>
      <ul className="space-y-4">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex flex-wrap items-center justify-between gap-4 border border-white/10 rounded-lg p-4 bg-white/5"
          >
            <div>
              <p className="font-heading font-medium">{item.name}</p>
              <p className="text-sm text-foreground/70">{item.price.toLocaleString("fr-FR")} € × {item.quantity}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-white/20 rounded">
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 flex items-center justify-center hover:bg-white/10"
                >
                  −
                </button>
                <span className="w-8 text-center text-sm">{item.quantity}</span>
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center hover:bg-white/10"
                >
                  +
                </button>
              </div>
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="text-accent-red text-sm hover:underline"
              >
                Supprimer
              </button>
            </div>
            <p className="font-mono text-accent-yellow w-full text-right sm:w-auto">
              {(item.price * item.quantity).toLocaleString("fr-FR")} €
            </p>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-col sm:flex-row items-end sm:items-center justify-between gap-4">
        <Link href="/shop" className="text-foreground/70 hover:text-accent-yellow">
          {t("cart.continueShopping")}
        </Link>
        <div className="flex items-center gap-6">
          <p className="font-mono text-lg">
            {t("cart.total")}: <span className="text-accent-yellow font-bold">{totalPrice().toLocaleString("fr-FR")} €</span>
          </p>
          <Link
            href="/checkout"
            className="group inline-flex items-center gap-2.5 px-5 py-2.5 bg-white text-background font-heading font-semibold text-sm rounded-lg transition-all duration-200 hover:bg-white/90 active:scale-[0.98]"
          >
            {t("nav.checkout")}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden>
              <path d="M2 7h10M8 3l4 4-4 4" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
