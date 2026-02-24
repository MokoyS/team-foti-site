"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/lib/data/products";
import { useLocale } from "@/contexts/LocaleContext";
import { GlowCard } from "@/components/ui/GlowCard";
import { MagneticCard } from "@/components/ui/MagneticCard";
import { PriceCounter } from "@/components/ui/PriceCounter";

interface ProductCardProps {
  product: Product;
  index?: number;
}

function getSpecs(product: Product): string {
  const cat = product.category.toUpperCase().replace(/\s/g, " ");
  return product.stock > 0 ? `[SPECS: ${cat} · ${product.stock} EN STOCK]` : `[SPECS: ${cat} · RUPTURE]`;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { t } = useLocale();
  const inStock = product.stock > 0;
  const specs = getSpecs(product);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: index * 0.05 }}
    >
      <MagneticCard strength={10}>
        <Link href={`/shop/${product.slug}`}>
          <GlowCard glow="yellow" className="h-full overflow-hidden group">
            <div className="aspect-square bg-carbon-700/50 flex items-center justify-center text-foreground/30 font-mono text-xs uppercase tracking-wider">
              {product.category}
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="font-heading font-bold italic text-accent-yellow text-lg tracking-tight">
                {product.name}
              </h3>
              <p className="font-mono text-[11px] text-foreground/60 mt-1 tracking-wide">
                {specs}
              </p>
              <p className="text-sm text-foreground/70 mt-3 line-clamp-2">
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
                <PriceCounter value={product.price} suffix=" €" glitch />
              </p>
              {!inStock && (
                <p className="text-xs text-accent-red mt-1 font-mono">{t("shop.outOfStock")}</p>
              )}
            </div>
          </GlowCard>
        </Link>
      </MagneticCard>
    </motion.div>
  );
}
