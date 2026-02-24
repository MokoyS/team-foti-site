import type { Metadata } from "next";
import { ContactPageContent } from "@/components/contact/ContactPageContent";

export const metadata: Metadata = {
  title: "Contact | Team Foti – Direct Line",
  description: "Contactez l'atelier Team Foti à Loriol-sur-Drôme. Téléphone et email.",
};

export default function ContactPage() {
  return <ContactPageContent />;
}
