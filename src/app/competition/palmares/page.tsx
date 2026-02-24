import { getPalmares } from "@/lib/data/get-data";
import { TranslatedTitle } from "@/components/TranslatedTitle";
import { PalmaresTimeline } from "@/components/competition/PalmaresTimeline";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Palmarès | Team Foti",
  description: "Titres mondiaux et européens de la Team Foti.",
};

export default async function PalmaresPage() {
  const palmares = await getPalmares();
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-24">
      <h1 className="font-heading font-bold italic text-3xl text-accent-yellow mb-10">
        <TranslatedTitle translationKey="competition.palmares" />
      </h1>
      <PalmaresTimeline items={palmares} />
    </div>
  );
}
