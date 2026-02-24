"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCartStore } from "@/lib/store/cart-store";
import { useLocale } from "@/contexts/LocaleContext";
import { CheckoutStep1 } from "@/components/checkout/CheckoutStep1";
import { CheckoutStep2 } from "@/components/checkout/CheckoutStep2";
import { CheckoutStep3 } from "@/components/checkout/CheckoutStep3";

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCartStore();
  const { t } = useLocale();

  useEffect(() => {
    if (items.length === 0 && step < 3 && !paymentSuccess) {
      router.replace("/cart");
    }
  }, [items.length, step, paymentSuccess, router]);

  const handleStep1Complete = () => setStep(2);
  const handleStep2Complete = () => {
    setPaymentSuccess(true);
    setStep(3);
    clearCart();
  };

  if (items.length === 0 && !paymentSuccess) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <p className="text-foreground/70">{t("cart.empty")}</p>
        <Link href="/shop" className="text-accent-yellow mt-4 inline-block">
          {t("cart.continueShopping")}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-24">
      <h1 className="font-heading font-bold italic text-2xl text-accent-yellow mb-8">
        {t("checkout.title")}
      </h1>
      <div className="flex gap-2 mb-8">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`h-1 flex-1 rounded ${
              step >= s ? "bg-accent-yellow" : "bg-white/20"
            }`}
          />
        ))}
      </div>
      <p className="text-sm text-foreground/60 mb-6">
        {step === 1 && t("checkout.step1")}
        {step === 2 && t("checkout.step2")}
        {step === 3 && t("checkout.step3")}
      </p>

      {step === 1 && <CheckoutStep1 onComplete={handleStep1Complete} />}
      {step === 2 && (
        <CheckoutStep2
          amount={totalPrice()}
          onSuccess={handleStep2Complete}
        />
      )}
      {step === 3 && <CheckoutStep3 />}
    </div>
  );
}
