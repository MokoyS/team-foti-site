"use client";

/**
 * Overlay télémétrie discret en arrière-plan de section (GPS Loriol, chronos, RPM).
 * Très faible opacité pour ne pas distraire.
 */
export function TelemetryOverlay({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 z-0 font-mono text-[10px] text-white/[0.06] select-none overflow-hidden ${className}`}
    >
      <div className="absolute top-[12%] left-[8%] tracking-widest uppercase">
        44.7528° N · 4.8264° E · Loriol
      </div>
      <div className="absolute top-[18%] right-[10%] tabular-nums">
        LAP 1:00.423
      </div>
      <div className="absolute bottom-[15%] left-[12%] flex items-center gap-1">
        <span className="inline-block w-8 h-1 bg-white/10 rounded" />
        <span>RPM 12.4k</span>
      </div>
      <div className="absolute bottom-[22%] right-[15%] tabular-nums">
        S1 0:18.234
      </div>
    </div>
  );
}
