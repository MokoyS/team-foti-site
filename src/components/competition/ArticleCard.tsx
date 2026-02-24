"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Article } from "@/lib/data/articles";

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const typeColor =
    article.type === "Résultat"
      ? "text-accent-yellow"
      : article.type === "Transfert"
        ? "text-accent-red"
        : "text-foreground/80";

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="border border-white/10 rounded-lg overflow-hidden bg-white/5 hover:border-white/20 transition"
    >
      {article.image_cover ? (
        <div className="relative w-full aspect-video bg-white/5">
          <Image
            src={article.image_cover}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      ) : null}
      <div className="p-4">
        <span className={`text-xs font-mono uppercase ${typeColor}`}>{article.type}</span>
        <h3 className="font-heading font-bold mt-2 text-foreground">{article.title}</h3>
        <p className="text-sm text-foreground/70 mt-2 line-clamp-2">{article.content}</p>
        <time className="text-xs text-foreground/50 mt-2 block" dateTime={article.date}>
          {new Date(article.date).toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </time>
      </div>
    </motion.article>
  );
}
