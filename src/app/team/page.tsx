import type { Metadata } from "next";
import { TeamPageContent } from "@/components/team/TeamPageContent";

export const metadata: Metadata = {
  title: "L'équipe | Team Foti – The Crew",
  description: "Ingénieurs piste, expert performance pilote. L'équipe Team Foti au service de la victoire.",
};

export default function TeamPage() {
  return <TeamPageContent />;
}
