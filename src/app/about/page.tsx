import type { Metadata } from "next";
import { AboutPageContent } from "@/components/about/AboutPageContent";

export const metadata: Metadata = {
  title: "À propos | Team Foti – 40 ans à la limite",
  description:
    "Team Foti, précurseur du karting européen depuis 1984. Loriol-sur-Drôme. Préparateur de champions, expertise châssis et moteur.",
};

export default function AboutPage() {
  return <AboutPageContent />;
}
