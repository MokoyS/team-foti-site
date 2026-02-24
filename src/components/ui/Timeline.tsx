"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export function Timeline({ items, className = "" }: TimelineProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <div className={`relative ${className}`}>
      {/* Ligne verticale */}
      <div className="absolute left-[11px] top-0 bottom-0 w-px bg-gradient-to-b from-accent-yellow/40 via-white/10 to-transparent" />
      <ul className="space-y-8">
        {items.map((item, i) => {
          const isActive = activeIndex === i;
          return (
            <motion.li
              key={item.year}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: i * 0.08 }}
              className="relative flex gap-6 pl-0"
            >
              <button
                type="button"
                onClick={() => setActiveIndex(isActive ? null : i)}
                className="relative z-10 flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-yellow/50"
                style={{
                  borderColor: isActive ? "var(--accent-yellow)" : "rgba(255,255,255,0.2)",
                  boxShadow: isActive ? "0 0 16px rgba(255,215,0,0.4)" : "none",
                }}
                aria-expanded={isActive}
                aria-label={`${item.year} – ${item.title}`}
              >
                <span className="sr-only">{item.year}</span>
              </button>
              <div className="flex-1 min-w-0 pt-0.5">
                <p className="font-mono text-xs text-accent-yellow tracking-wider">{item.year}</p>
                <h3 className="font-heading font-bold italic text-foreground mt-1 tracking-tight">
                  {item.title}
                </h3>
                <AnimatePresence mode="wait">
                  {isActive && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="text-sm text-foreground/75 mt-2 leading-relaxed"
                    >
                      {item.description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
