import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales | Team Foti",
  description: "Mentions légales du site Team Foti.",
};

export default function MentionsLegalesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-24">
      <h1 className="font-heading font-bold italic text-3xl text-accent-yellow mb-8">
        Mentions légales
      </h1>
      <div className="prose prose-invert prose-sm max-w-none text-foreground/90 space-y-6">
        <section>
          <h2 className="font-heading font-semibold text-lg text-foreground mt-6 mb-2">
            1. Éditeur du site
          </h2>
          <p>
            Le site teamfoti.com est édité par Team Foti [ou raison sociale et forme
            juridique]. Siège social : [adresse]. SIRET : [numéro]. TVA : [si applicable].
          </p>
        </section>
        <section>
          <h2 className="font-heading font-semibold text-lg text-foreground mt-6 mb-2">
            2. Hébergement
          </h2>
          <p>
            L’hébergement du site est assuré par [nom de l’hébergeur], [adresse].
          </p>
        </section>
        <section>
          <h2 className="font-heading font-semibold text-lg text-foreground mt-6 mb-2">
            3. Propriété intellectuelle
          </h2>
          <p>
            L’ensemble du contenu (textes, images, logos, vidéos) est protégé par le
            droit d’auteur et appartient à Team Foti ou à ses partenaires. Toute
            reproduction non autorisée est interdite.
          </p>
        </section>
        <section>
          <h2 className="font-heading font-semibold text-lg text-foreground mt-6 mb-2">
            4. Données personnelles et cookies
          </h2>
          <p>
            Les données collectées (email, adresse de livraison) lors d’une commande
            sont utilisées uniquement pour traiter celle-ci et ne sont pas cédées à des
            tiers. Conformément au RGPD, vous disposez d’un droit d’accès, de
            rectification et de suppression de vos données en nous contactant. Un
            bandeau cookies vous permet d’accepter ou refuser les cookies non
            essentiels.
          </p>
        </section>
        <section>
          <h2 className="font-heading font-semibold text-lg text-foreground mt-6 mb-2">
            5. Contact
          </h2>
          <p>
            Pour toute question : [email ou formulaire de contact].
          </p>
        </section>
      </div>
    </div>
  );
}
