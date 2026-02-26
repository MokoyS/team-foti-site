import type { Metadata } from "next";
import { GaleriePageContent } from "@/components/home/GaleriePageContent";

export const metadata: Metadata = {
  title: "Galerie | Team Foti",
  description:
    "Photos de la Team Foti en compétition — karting KZ2, OK-Junior, Rotax. Podiums, pilotes et moments de course.",
};

export default function GaleriePage() {
  return <GaleriePageContent />;
}
