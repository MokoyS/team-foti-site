"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface PriceCounterProps {
  value: number;
  suffix?: string;
  className?: string;
  /** Effet glitch au montant (flash rapide) */
  glitch?: boolean;
}

export function PriceCounter({
  value,
  suffix = " €",
  className = "",
  glitch = true,
}: PriceCounterProps) {
  const [display, setDisplay] = useState(0);
  const [glitchKey, setGlitchKey] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 600;
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - (1 - progress) ** 2;
      setDisplay(Math.round(value * easeOut));
      if (progress < 1) requestAnimationFrame(step);
      else if (glitch) setGlitchKey((k) => k + 1);
    };
    requestAnimationFrame(step);
  }, [value, glitch]);

  return (
    <motion.span
      key={glitchKey}
      initial={glitch ? { opacity: 0.7, filter: "brightness(1.5)" } : false}
      animate={glitch ? { opacity: 1, filter: "brightness(1)" } : {}}
      transition={{ duration: 0.12 }}
      className={`font-mono tabular-nums ${className}`}
    >
      {display.toLocaleString("fr-FR")}
      {suffix}
    </motion.span>
  );
}
