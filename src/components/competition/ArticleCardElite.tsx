"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { Article } from "@/lib/data/articles";

interface ArticleCardEliteProps {
  article: Article;
  index: number;
}

export function ArticleCardElite({ article, index }: ArticleCardEliteProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 0.3], [20, -20]);

  const typeColor =
    article.type === "Résultat"
      ? "text-accent-yellow"
      : article.type === "Transfert"
        ? "text-accent-red"
        : "text-foreground/80";

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: index * 0.06 }}
      className="group relative rounded-xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm overflow-hidden transition-colors duration-200 hover:border-white/[0.14]"
    >
      {article.image_cover ? (
        <motion.div
          style={{ y }}
          className="relative w-full aspect-video bg-carbon-600 overflow-hidden"
        >
          <Image
            src={article.image_cover}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>
      ) : (
        <div className="w-full aspect-video bg-carbon-600 flex items-center justify-center">
          <span className="font-mono text-4xl font-bold text-white/10">TF</span>
        </div>
      )}
      <div className="p-5">
        <span className={`text-xs font-mono uppercase tracking-wider ${typeColor}`}>
          {article.type}
        </span>
        <h3 className="font-heading font-bold italic text-foreground mt-2 text-lg tracking-tight group-hover:text-accent-yellow transition-colors">
          {article.title}
        </h3>
        <p className="text-sm text-foreground/70 mt-2 line-clamp-2">{article.content}</p>
        <time
          className="font-mono text-xs text-foreground/50 mt-3 block"
          dateTime={article.date}
        >
          {new Date(article.date).toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </time>
      </div>
    </motion.article>
  );
}
