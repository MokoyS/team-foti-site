"use client";

import Link from "next/link";
import { useCartStore } from "@/lib/store/cart-store";
import { useLocale } from "@/contexts/LocaleContext";
import { motion } from "framer-motion";
import type { Product } from "@/lib/data/products";

interface ProductPageContentProps {
  product: Product;
}

export function ProductPageContent({ product }: ProductPageContentProps) {
  const addItem = useCartStore((s) => s.addItem);
  const { t } = useLocale();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-5xl mx-auto px-4 sm:px-6 py-24"
    >
      <Link href="/shop" className="text-sm text-foreground/70 hover:text-accent-yellow mb-6 inline-block">
        ← {t("cart.continueShopping")}
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="aspect-square rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-foreground/30 font-mono">
          {product.category}
        </div>
        <div>
          <span className="text-xs font-mono text-foreground/60 uppercase">{t("shop.category")}: {product.category}</span>
          <h1 className="font-heading font-bold italic text-3xl text-accent-yellow mt-2">{product.name}</h1>
          <p className="text-foreground/80 mt-4">{product.description}</p>
          <p className="font-mono text-2xl text-accent-yellow mt-6">{product.price.toLocaleString("fr-FR")} €</p>
          {product.stock > 0 ? (
            <button
              type="button"
              onClick={handleAddToCart}
              className="mt-6 px-6 py-3 bg-accent-yellow text-background font-heading font-bold rounded-lg btn-glow hover:shadow-glow transition"
            >
              {t("shop.addToCart")}
            </button>
          ) : (
            <p className="mt-6 text-accent-red">{t("shop.outOfStock")}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
