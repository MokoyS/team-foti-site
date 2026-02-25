"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Barre verticale à gauche : piste avec le kart qui "roule" dessus
 * (orienté vers le haut puis -45° pour donner l’effet route).
 */
export function ScrollTrack() {
  const { scrollYProgress } = useScroll();

  // Le kart se déplace de 2% (haut) à 98% (bas) de la piste avec le scroll
  const kartY = useTransform(scrollYProgress, [0, 1], ["2%", "98%"]);

  return (
    <div className="fixed left-0 top-0 bottom-0 w-10 z-40 pointer-events-none hidden sm:block">
      {/* Route : ligne verticale pleine hauteur, sous le menu */}
      <div className="absolute left-2 top-0 bottom-0 w-px">
        <div className="absolute inset-0 w-px bg-white/15" />

        {/* Kart qui roule sur la route : flip vers le haut + rotation -45° */}
        <motion.div
          style={{ top: kartY, left: "50%", transform: "translateX(calc(-50% + 10px))" }}
          className="absolute w-12 h-12 flex items-center justify-center"
        >
          <div
            className="w-12 h-12 flex items-center justify-center origin-center"
            style={{
              transform: "rotate(90deg) scaleX(-1)",
            }}
          >
            <Image
              src="/kart.png"
              alt=""
              width={48}
              height={48}
              className="w-12 h-12 object-contain drop-shadow-md"
              aria-hidden
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
