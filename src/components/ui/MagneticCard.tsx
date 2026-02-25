"use client";

import { ReactNode } from "react";

interface MagneticCardProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  tiltDeg?: number;
}

/**
 * Simple wrapper sans effet magnétique ni tilt (style pro).
 */
export function MagneticCard({
  children,
  className = "",
}: MagneticCardProps) {
  return <div className={className}>{children}</div>;
}
