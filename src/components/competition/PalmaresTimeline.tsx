"use client";

import { motion } from "framer-motion";

interface PalmaresItem {
  year: string;
  title: string;
  event: string;
}

interface PalmaresTimelineProps {
  items: PalmaresItem[];
}

export function PalmaresTimeline({ items }: PalmaresTimelineProps) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-px bg-white/20" />
      <ul className="space-y-0">
        {items.map((item, i) => (
          <motion.li
            key={item.year}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="relative pl-12 pb-10 last:pb-0"
          >
            <span className="absolute left-0 w-8 h-8 rounded-full bg-accent-yellow/20 border-2 border-accent-yellow flex items-center justify-center text-xs font-mono font-bold text-accent-yellow">
              {item.year}
            </span>
            <h3 className="font-heading font-bold text-foreground">{item.title}</h3>
            <p className="text-sm text-foreground/70 mt-1">{item.event}</p>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
