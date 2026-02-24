import { HeroContent } from "./HeroContent";
import { HeroBackground } from "./HeroBackground";

/**
 * Hero avec placeholder pour un canvas React Three Fiber (modèle 3D kart.glb).
 * Pour l’instant : image de fond ; plus tard : remplacer par <Canvas> + kart.glb.
 */
export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-background -mt-24">
      <HeroBackground />
      <HeroContent />
    </section>
  );
}
