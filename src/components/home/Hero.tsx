import { HeroContent } from "./HeroContent";
import { HeroBackground } from "./HeroBackground";

/**
 * Hero avec placeholder pour un canvas React Three Fiber (modèle 3D kart.glb).
 * Pour l’instant : image de fond ; plus tard : remplacer par <Canvas> + kart.glb.
 */
/**
 * Hero – image type "podium / piste" (ex. photo podium Lonato ou camion team au petit matin).
 * Overlay dark pour intégration mode sombre et lisibilité du texte.
 */
export function Hero() {
  return (
    <section className="relative z-0 h-screen w-full bg-background -mt-24">
      <HeroBackground />
      {/* Gradient de fondu : transparent en haut, noir complet en bas — fusionne avec la section suivante */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background pointer-events-none z-[1]" />
      <HeroContent />
    </section>
  );
}
