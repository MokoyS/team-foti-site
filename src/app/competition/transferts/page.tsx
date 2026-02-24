import { getArticles } from "@/lib/data/get-data";
import { TranslatedTitle } from "@/components/TranslatedTitle";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transferts | Team Foti",
  description: "Annonces des pilotes rejoignant la Team Foti.",
};

export default async function TransfertsPage() {
  const articles = await getArticles();
  const transferts = articles.filter((a) => a.type === "Transfert");
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-24">
      <h1 className="font-heading font-bold italic text-3xl text-accent-yellow mb-10">
        <TranslatedTitle translationKey="competition.transfers" />
      </h1>
      {transferts.length === 0 ? (
        <p className="text-foreground/70">Aucun transfert pour le moment.</p>
      ) : (
        <ul className="space-y-6">
          {transferts.map((a) => (
            <li
              key={a.id}
              className="border border-white/10 rounded-lg p-6 bg-white/5"
            >
              <span className="text-xs font-mono uppercase text-accent-red">
                {a.type}
              </span>
              <h2 className="font-heading font-bold text-lg mt-2">{a.title}</h2>
              <p className="text-foreground/80 mt-2">{a.content}</p>
              <time
                className="text-xs text-foreground/50 mt-2 block"
                dateTime={a.date}
              >
                {new Date(a.date).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
