"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/lib/data/products";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Karts: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 opacity-20">
      <circle cx="6" cy="17" r="2" /><circle cx="18" cy="17" r="2" />
      <path d="M4 17H3a1 1 0 0 1-1-1v-4l3-5h12l3 5v4a1 1 0 0 1-1 1h-1" />
      <path d="M6 11h12" />
    </svg>
  ),
  Consommables: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 opacity-20">
      <path d="M12 2v6M12 18v4M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24M2 12h6M16 12h6" />
    </svg>
  ),
  Merchandising: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 opacity-20">
      <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z" />
    </svg>
  ),
};

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const inStock = product.stock > 0;
  const icon = CATEGORY_ICONS[product.category] ?? CATEGORY_ICONS["Consommables"];

  return (
    <Link href={`/shop/${product.slug}`} className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-xl">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: index * 0.05 }}
        className="h-full flex flex-col rounded-xl border border-white/[0.07] bg-white/[0.02] overflow-hidden transition-all duration-300 group-hover:border-white/[0.15] group-hover:bg-white/[0.04]"
      >
        {/* Image / placeholder */}
        <div className="relative aspect-[4/3] bg-carbon-800 overflow-hidden flex items-center justify-center">
          {product.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.image}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-foreground/15">
              {icon}
              <span className="font-mono text-[9px] tracking-[0.25em] uppercase">{product.category}</span>
            </div>
          )}

          {/* Badge stock */}
          <div className="absolute top-3 right-3 z-10">
            {inStock ? (
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-background/80 backdrop-blur-sm border border-white/10 font-mono text-[9px] tracking-widest uppercase text-foreground/50">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500/80" />
                En stock
              </span>
            ) : (
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-background/80 backdrop-blur-sm border border-white/10 font-mono text-[9px] tracking-widest uppercase text-foreground/40">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-red/70" />
                Rupture
              </span>
            )}
          </div>

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-carbon-800/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Contenu */}
        <div className="flex flex-col flex-1 p-5 gap-3">
          {/* Catégorie */}
          <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-foreground/30">
            {product.category}
          </span>

          {/* Titre */}
          <h3 className="font-heading font-bold italic text-foreground text-base sm:text-lg tracking-tight leading-tight group-hover:text-accent-yellow transition-colors duration-200 line-clamp-2">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-foreground/55 text-sm leading-relaxed line-clamp-2 flex-1">
            {product.description}
          </p>

          {/* Prix + CTA */}
          <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] mt-auto">
            <span className="font-mono font-semibold text-accent-yellow text-base tabular-nums">
              {product.price.toLocaleString("fr-FR")} €
            </span>
            <span className="inline-flex items-center gap-1.5 font-heading font-semibold text-xs text-foreground/50 group-hover:text-foreground/80 transition-colors duration-200">
              Voir
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden>
                <path d="M2 6h8M6 2l4 4-4 4" />
              </svg>
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
