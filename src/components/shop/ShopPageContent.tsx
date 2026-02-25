"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProductCard } from "@/components/shop/ProductCard";
import { ShopFilters, type ShopFilterState } from "@/components/shop/ShopFilters";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Product } from "@/lib/data/products";

interface ShopPageContentProps {
  products: Product[];
}

function applyFilters(products: Product[], filters: ShopFilterState): Product[] {
  let result = [...products];

  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }

  if (filters.categories.length > 0) {
    result = result.filter((p) => filters.categories.includes(p.category));
  }

  result = result.filter((p) => p.price <= filters.maxPrice);

  if (filters.stock === "instock") {
    result = result.filter((p) => p.stock > 0);
  }

  switch (filters.sort) {
    case "price-asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "name-asc":
      result.sort((a, b) => a.name.localeCompare(b.name));
      break;
  }

  return result;
}

export function ShopPageContent({ products }: ShopPageContentProps) {
  const allCategories = useMemo(
    () => [...new Set(products.map((p) => p.category))].sort(),
    [products]
  );
  const maxProductPrice = useMemo(
    () => Math.max(...products.map((p) => p.price)),
    [products]
  );

  const [filters, setFilters] = useState<ShopFilterState>({
    categories: [],
    maxPrice: maxProductPrice,
    sort: "default",
    stock: "all",
    search: "",
  });

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filtered = useMemo(() => applyFilters(products, filters), [products, filters]);

  return (
    <div className="h-[calc(100dvh-6rem)] bg-background bg-carbon-texture flex flex-col overflow-hidden">

      {/* Titre + bouton filtres — bloc fixe */}
      <div className="shrink-0 border-b border-white/[0.06] py-10 md:py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeader eyebrow="SHOP" title="Boutique" />
          <p className="text-foreground/50 text-sm font-mono max-w-lg -mt-4">
            Châssis compétition · Moteurs · Consommables · Équipement pilote
          </p>

          {/* Bouton filtres mobile */}
          <button
            type="button"
            onClick={() => setMobileFiltersOpen((v) => !v)}
            className="lg:hidden mt-6 inline-flex items-center gap-2 px-4 py-2 border border-white/20 text-foreground/70 font-heading font-semibold text-sm rounded-lg transition-all duration-200 hover:border-white/40 hover:bg-white/[0.04]"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
              <path d="M2 4h12M4 8h8M6 12h4" />
            </svg>
            Filtres
            {(filters.categories.length > 0 || filters.stock !== "all" || filters.maxPrice < maxProductPrice) && (
              <span className="w-2 h-2 rounded-full bg-accent-yellow" />
            )}
          </button>
        </div>
      </div>

      {/* Corps : sidebar fixe + grille scrollable */}
      <div className="flex-1 overflow-hidden px-4 sm:px-6">
        <div className="max-w-7xl mx-auto h-full flex gap-10">

          {/* Sidebar desktop — fixe, scroll interne si nécessaire */}
          <div className="hidden lg:flex shrink-0 overflow-y-auto py-6 scrollbar-none">
            <ShopFilters
              allCategories={allCategories}
              maxProductPrice={maxProductPrice}
              filters={filters}
              onChange={setFilters}
              resultCount={filtered.length}
            />
          </div>

          {/* Sidebar mobile (drawer) */}
          <AnimatePresence>
            {mobileFiltersOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="lg:hidden fixed inset-0 bg-black/60 z-40"
                  onClick={() => setMobileFiltersOpen(false)}
                />
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="lg:hidden fixed top-0 left-0 bottom-0 w-80 bg-carbon-800 z-50 overflow-y-auto p-5"
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-heading font-bold italic text-foreground">Filtres</span>
                    <button
                      type="button"
                      onClick={() => setMobileFiltersOpen(false)}
                      className="text-foreground/40 hover:text-foreground transition-colors text-xl"
                      aria-label="Fermer"
                    >
                      ×
                    </button>
                  </div>
                  <ShopFilters
                    allCategories={allCategories}
                    maxProductPrice={maxProductPrice}
                    filters={filters}
                    onChange={(f) => { setFilters(f); }}
                    resultCount={filtered.length}
                  />
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Grille produits — seule zone scrollable */}
          <div className="flex-1 min-w-0 overflow-y-auto py-6 pb-10 scrollbar-none">
            <AnimatePresence mode="wait">
              {filtered.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-32 text-center"
                >
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1" className="text-white/10 mb-6" aria-hidden>
                    <circle cx="24" cy="24" r="20" /><path d="M16 24h16M24 16v16" strokeLinecap="round" />
                  </svg>
                  <p className="font-heading italic text-foreground/40 text-lg">Aucun produit trouvé</p>
                  <p className="font-mono text-xs text-foreground/25 mt-2">Modifiez vos filtres</p>
                </motion.div>
              ) : (
                <motion.div
                  key="grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
                >
                  <AnimatePresence>
                    {filtered.map((p, i) => (
                      <motion.div
                        key={p.id}
                        layout
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ type: "spring", stiffness: 200, damping: 24, delay: i * 0.04 }}
                      >
                        <ProductCard product={p} index={i} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}
