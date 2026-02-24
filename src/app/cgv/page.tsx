import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CGV | Team Foti",
  description: "Conditions générales de vente Team Foti.",
};

export default function CGVPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-24">
      <h1 className="font-heading font-bold italic text-3xl text-accent-yellow mb-8">
        Conditions générales de vente
      </h1>
      <div className="prose prose-invert prose-sm max-w-none text-foreground/90 space-y-6">
        <section>
          <h2 className="font-heading font-semibold text-lg text-foreground mt-6 mb-2">
            1. Objet
          </h2>
          <p>
            Les présentes CGV s’appliquent aux ventes de produits (karts, pièces,
            consommables, merchandising) réalisées par Team Foti via le site
            teamfoti.com.
          </p>
        </section>
        <section>
          <h2 className="font-heading font-semibold text-lg text-foreground mt-6 mb-2">
            2. Prix et paiement
          </h2>
          <p>
            Les prix sont indiqués en euros TTC. Le paiement est sécurisé (Stripe :
            CB, Apple Pay, Google Pay). La commande est validée à réception du
            paiement.
          </p>
        </section>
        <section>
          <h2 className="font-heading font-semibold text-lg text-foreground mt-6 mb-2">
            3. Livraison
          </h2>
          <p>
            Les délais et frais de livraison sont indiqués au moment de la commande.
            Pour les châssis et équipements lourds, une livraison sur rendez-vous ou
            en circuit peut être proposée.
          </p>
        </section>
        <section>
          <h2 className="font-heading font-semibold text-lg text-foreground mt-6 mb-2">
            4. Droit de rétractation
          </h2>
          <p>
            Conformément à la loi, vous disposez de 14 jours à compter de la
            réception pour exercer votre droit de rétractation (sauf produits
            personnalisés ou dégradables). Contactez-nous pour organiser le retour.
          </p>
        </section>
        <section>
          <h2 className="font-heading font-semibold text-lg text-foreground mt-6 mb-2">
            5. Garanties
          </h2>
          <p>
            Les produits bénéficient des garanties légales (conformité, vices
            cachés). Pour les équipements compétition, des conditions spécifiques
            peuvent s’appliquer (voir fiches produits).
          </p>
        </section>
      </div>
    </div>
  );
}
