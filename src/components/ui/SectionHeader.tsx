interface SectionHeaderProps {
  /** Libellé discret au-dessus de la ligne (ex: "GALLERY", "SHOP", "NEWS") */
  eyebrow: string;
  /** Titre principal en jaune italique */
  title: string;
  className?: string;
}

/**
 * En-tête de section : petite étiquette mono + ligne + titre jaune italique.
 * Style cohérent sur toute la page d'accueil.
 */
export function SectionHeader({ eyebrow, title, className = "" }: SectionHeaderProps) {
  return (
    <div className={`mb-8 ${className}`}>
      <div className="flex items-center gap-4">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/30">
          {eyebrow}
        </span>
        <div className="flex-1 h-px bg-white/10" />
      </div>
      <h2 className="font-heading font-bold italic text-2xl text-accent-yellow tracking-tight mt-3">
        {title}
      </h2>
    </div>
  );
}
