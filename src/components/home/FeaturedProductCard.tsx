"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/lib/data/products";
import { useLocale } from "@/contexts/LocaleContext";
import { GlowCard } from "@/components/ui/GlowCard";

interface FeaturedProductCardProps {
  product: Product;
}

export function FeaturedProductCard({ product }: FeaturedProductCardProps) {
  const { t } = useLocale();
  const inStock = product.stock > 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="h-full flex flex-col"
    >
      <GlowCard glow="yellow" className="flex-1 flex flex-col overflow-hidden group">
        <Link href={`/shop/${product.slug}`} className="flex-1 flex flex-col">
          <div className="aspect-square bg-carbon-700/50 flex items-center justify-center text-foreground/30 font-mono text-xs uppercase tracking-wider">
            {product.category}
          </div>
          <div className="p-5 flex-1 flex flex-col">
            <h3 className="font-heading font-bold italic text-accent-yellow text-lg tracking-tight">
              {product.name}
            </h3>
            <p className="text-sm text-foreground/70 mt-2 line-clamp-2">
              {product.description}
            </p>
            <div className="mt-3 pt-3 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="font-mono text-xs text-foreground/50">
                Catégorie · {product.category}
              </p>
              <p className="font-mono text-xs text-foreground/50 mt-0.5">
                {inStock ? `Stock · ${product.stock}` : t("shop.outOfStock")}
              </p>
            </div>
            <p className="mt-auto pt-4 font-mono text-accent-yellow font-semibold text-sm">
              {product.price.toLocaleString("fr-FR")} €
            </p>
            {!inStock && (
              <p className="text-xs text-accent-red mt-1 font-mono">{t("shop.outOfStock")}</p>
            )}
          </div>
        </Link>
        <div className="p-5 pt-0">
          <Link
            href={`/shop/${product.slug}`}
            className="block w-full text-center rounded-xl border border-accent-yellow py-2.5 font-heading text-sm font-bold italic text-accent-yellow transition btn-glow-yellow hover:bg-accent-yellow/10"
          >
            {t("home.viewInShop")}
          </Link>
        </div>
      </GlowCard>
    </motion.article>
  );
}
