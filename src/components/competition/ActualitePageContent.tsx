"use client";

import { motion } from "framer-motion";
import { ArticleCardElite } from "@/components/competition/ArticleCardElite";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { Article } from "@/lib/data/articles";

interface ActualitePageContentProps {
  articles: Article[];
}

export function ActualitePageContent({ articles }: ActualitePageContentProps) {
  return (
    <div className="min-h-screen bg-background bg-carbon-texture">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
        <ScrollReveal>
          <h1 className="font-heading font-extrabold italic text-3xl sm:text-4xl text-accent-yellow tracking-tight mb-2">
            Actualité
          </h1>
          <p className="font-mono text-xs text-foreground/50 uppercase tracking-widest mb-4">
            The Race Feed
          </p>
          <p className="text-foreground/70 text-sm max-w-2xl mb-12">
            Résultats, transferts et news. Chronos, trajectoires et paddock.
          </p>
        </ScrollReveal>

        {articles.length === 0 ? (
          <p className="font-mono text-sm text-foreground/50">
            Aucun article pour le moment.
          </p>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.08 } },
              hidden: {},
            }}
          >
            {articles.map((a, i) => (
              <ArticleCardElite key={a.id} article={a} index={i} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
