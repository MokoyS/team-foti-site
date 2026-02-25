"use client";

import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useLocale } from "@/contexts/LocaleContext";

interface CheckoutStep2Props {
  amount: number;
  onSuccess: () => void;
}

export function CheckoutStep2({ amount, onSuccess }: CheckoutStep2Props) {
  const { t } = useLocale();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: Math.round(amount * 100) }),
        });
        const data = await res.json();
        if (data.clientSecret) setClientSecret(data.clientSecret);
        else setError(data.error || "Erreur serveur");
      } catch {
        setError("Impossible de préparer le paiement.");
      }
    })();
  }, [amount]);

  const handlePay = async () => {
    if (!clientSecret) return;
    setLoading(true);
    setError(null);
    try {
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");
      if (!stripe) {
        setError("Stripe non configuré. Utilisez NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.");
        setLoading(false);
        return;
      }
      const { error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: { token: "tok_visa" } as unknown as { token: string },
        } as unknown as { card: { token: string } },
      });
      if (stripeError) {
        setError(stripeError.message || "Paiement refusé");
        setLoading(false);
        return;
      }
      onSuccess();
    } catch {
      setError("Erreur lors du paiement.");
    }
    setLoading(false);
  };

  if (error && !clientSecret) {
    return (
      <div className="p-4 rounded-lg bg-accent-red/20 text-accent-red">
        {error}
        <p className="text-sm mt-2 text-foreground/70">
          En mode démo, vous pouvez simuler une commande sans paiement réel.
        </p>
        <button
          type="button"
          onClick={onSuccess}
          className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 border border-white/20 text-foreground/80 font-heading font-semibold text-sm rounded-lg transition-all duration-200 hover:border-white/40 hover:bg-white/[0.04] active:scale-[0.98]"
        >
          Simuler une commande validée
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="font-mono text-accent-yellow">
        {t("checkout.total")}: {amount.toLocaleString("fr-FR")} €
      </p>
      {process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ? (
        <>
          <p className="text-sm text-foreground/70">
            {t("checkout.payWith")} Stripe (CB, Apple Pay, Google Pay). Paiement sécurisé.
          </p>
          <div className="p-4 rounded-lg bg-white/5 border border-white/10 text-foreground/70 text-sm">
            En développement : configurez Stripe et utilisez les Stripe Elements pour saisir la carte.
            Pour tester sans clé, cliquez sur &quot;Simuler&quot; ci-dessous.
          </div>
          <button
            type="button"
            onClick={handlePay}
            disabled={loading}
            className="group w-full mt-4 inline-flex items-center justify-center gap-2.5 px-6 py-2.5 bg-white text-background font-heading font-semibold text-sm rounded-lg transition-all duration-200 hover:bg-white/90 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? "Chargement…" : t("checkout.placeOrder")}
          </button>
        </>
      ) : (
        <>
          <p className="text-sm text-foreground/70">
            Stripe n&apos;est pas configuré. Ajoutez NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY pour activer le paiement.
          </p>
          <button
            type="button"
            onClick={onSuccess}
            className="group w-full mt-4 inline-flex items-center justify-center gap-2.5 px-6 py-2.5 bg-white text-background font-heading font-semibold text-sm rounded-lg transition-all duration-200 hover:bg-white/90 active:scale-[0.98]"
          >
            Simuler la commande (démo)
          </button>
        </>
      )}
      {error && <p className="text-accent-red text-sm">{error}</p>}
    </div>
  );
}
