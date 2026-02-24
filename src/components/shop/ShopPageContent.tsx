"use client";

import { motion } from "framer-motion";
import { ProductCard } from "@/components/shop/ProductCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { Product } from "@/lib/data/products";

interface ShopPageContentProps {
  products: Product[];
}

export function ShopPageContent({ products }: ShopPageContentProps) {
  return (
    <div className="min-h-screen bg-background bg-carbon-texture">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
        <ScrollReveal>
          <h1 className="font-heading font-extrabold italic text-3xl sm:text-4xl text-accent-yellow tracking-tight mb-2">
            Boutique
          </h1>
          <p className="font-mono text-xs text-foreground/50 uppercase tracking-widest mb-10">
            Engineering Store · Châssis, moteurs, consommables
          </p>
        </ScrollReveal>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.06 } },
            hidden: {},
          }}
        >
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
