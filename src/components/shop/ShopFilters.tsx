"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export type SortOption = "default" | "price-asc" | "price-desc" | "name-asc";
export type StockFilter = "all" | "instock";

export interface ShopFilterState {
  categories: string[];
  maxPrice: number;
  sort: SortOption;
  stock: StockFilter;
  search: string;
}

interface ShopFiltersProps {
  allCategories: string[];
  maxProductPrice: number;
  filters: ShopFilterState;
  onChange: (filters: ShopFilterState) => void;
  resultCount: number;
}

const PRICE_STEPS = [100, 300, 500, 1000, 5000, 99999];

const SORT_LABELS: Record<SortOption, string> = {
  default: "Par défaut",
  "price-asc": "Prix croissant",
  "price-desc": "Prix décroissant",
  "name-asc": "Nom A → Z",
};

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="14" height="14" viewBox="0 0 14 14"
      fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round"
      className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      aria-hidden
    >
      <path d="M2 5l5 5 5-5" />
    </svg>
  );
}

function FilterSection({
  label,
  children,
  defaultOpen = true,
}: {
  label: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-white/[0.07] last:border-0 pb-4 last:pb-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-3 text-left group"
      >
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-foreground/40 group-hover:text-foreground/60 transition-colors">
          {label}
        </span>
        <ChevronIcon open={open} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ShopFilters({
  allCategories,
  maxProductPrice,
  filters,
  onChange,
  resultCount,
}: ShopFiltersProps) {
  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.maxPrice < maxProductPrice ||
    filters.sort !== "default" ||
    filters.stock !== "all" ||
    filters.search !== "";

  function reset() {
    onChange({
      categories: [],
      maxPrice: maxProductPrice,
      sort: "default",
      stock: "all",
      search: "",
    });
  }

  function toggleCategory(cat: string) {
    onChange({
      ...filters,
      categories: filters.categories.includes(cat)
        ? filters.categories.filter((c) => c !== cat)
        : [...filters.categories, cat],
    });
  }

  return (
    <aside className="w-full lg:w-64 shrink-0 space-y-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-foreground/30">
          FILTRES
        </span>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={reset}
            className="font-mono text-[10px] tracking-wider uppercase text-accent-yellow/70 hover:text-accent-yellow transition-colors"
          >
            Réinitialiser
          </button>
        )}
      </div>

      {/* Résultats */}
      <div className="mb-5 pb-4 border-b border-white/[0.07]">
        <span className="font-mono text-xs text-foreground/40 tabular-nums">
          {resultCount} produit{resultCount > 1 ? "s" : ""}
        </span>
      </div>

      {/* Recherche */}
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Rechercher…"
            value={filters.search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2 text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-white/20 transition-colors font-sans"
          />
          {filters.search && (
            <button
              type="button"
              onClick={() => onChange({ ...filters, search: "" })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/30 hover:text-foreground/60 transition-colors"
            >
              ×
            </button>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 space-y-2">
        {/* Catégorie */}
        <FilterSection label="Catégorie">
          <div className="space-y-1.5">
            {allCategories.map((cat) => {
              const active = filters.categories.includes(cat);
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => toggleCategory(cat)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all duration-150 ${
                    active
                      ? "bg-accent-yellow/10 border border-accent-yellow/30 text-accent-yellow"
                      : "border border-transparent text-foreground/60 hover:text-foreground hover:bg-white/[0.04]"
                  }`}
                >
                  <span className="font-sans">{cat}</span>
                  {active && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                      <path d="M2 6l3 3 5-5" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </FilterSection>

        {/* Prix */}
        <FilterSection label="Prix maximum">
          <div className="space-y-2 pt-1">
            <div className="flex flex-wrap gap-2">
              {PRICE_STEPS.filter((p) => p <= maxProductPrice + 1).map((step) => {
                const label = step >= 99999 ? "Tous" : `≤ ${step.toLocaleString("fr-FR")} €`;
                const active = step >= 99999
                  ? filters.maxPrice >= maxProductPrice
                  : filters.maxPrice === step;
                return (
                  <button
                    key={step}
                    type="button"
                    onClick={() =>
                      onChange({ ...filters, maxPrice: step >= 99999 ? maxProductPrice : step })
                    }
                    className={`px-3 py-1 rounded-lg text-xs font-mono transition-all duration-150 ${
                      active
                        ? "bg-accent-yellow/10 border border-accent-yellow/30 text-accent-yellow"
                        : "border border-white/[0.08] text-foreground/50 hover:border-white/20 hover:text-foreground/80"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </FilterSection>

        {/* Disponibilité */}
        <FilterSection label="Disponibilité">
          <div className="flex gap-2 pt-1">
            {(["all", "instock"] as StockFilter[]).map((v) => {
              const label = v === "all" ? "Tous" : "En stock";
              const active = filters.stock === v;
              return (
                <button
                  key={v}
                  type="button"
                  onClick={() => onChange({ ...filters, stock: v })}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-mono transition-all duration-150 ${
                    active
                      ? "bg-accent-yellow/10 border border-accent-yellow/30 text-accent-yellow"
                      : "border border-white/[0.08] text-foreground/50 hover:border-white/20 hover:text-foreground/80"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </FilterSection>

        {/* Tri */}
        <FilterSection label="Trier par" defaultOpen={false}>
          <div className="space-y-1.5 pt-1">
            {(Object.keys(SORT_LABELS) as SortOption[]).map((key) => {
              const active = filters.sort === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => onChange({ ...filters, sort: key })}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all duration-150 ${
                    active
                      ? "bg-accent-yellow/10 border border-accent-yellow/30 text-accent-yellow"
                      : "border border-transparent text-foreground/60 hover:text-foreground hover:bg-white/[0.04]"
                  }`}
                >
                  <span className="font-sans text-sm">{SORT_LABELS[key]}</span>
                  {active && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                      <path d="M2 6l3 3 5-5" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </FilterSection>
      </div>

      {/* Tags filtres actifs */}
      {hasActiveFilters && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-2 mt-4"
        >
          {filters.categories.map((cat) => (
            <span
              key={cat}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-accent-yellow/10 border border-accent-yellow/20 rounded-full text-accent-yellow text-xs font-mono"
            >
              {cat}
              <button type="button" onClick={() => toggleCategory(cat)} className="hover:text-white transition-colors" aria-label={`Retirer ${cat}`}>×</button>
            </span>
          ))}
          {filters.stock === "instock" && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/[0.06] border border-white/10 rounded-full text-foreground/60 text-xs font-mono">
              En stock
              <button type="button" onClick={() => onChange({ ...filters, stock: "all" })} className="hover:text-white transition-colors" aria-label="Retirer filtre stock">×</button>
            </span>
          )}
        </motion.div>
      )}
    </aside>
  );
}
