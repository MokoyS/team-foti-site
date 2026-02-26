"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { BentoGrid, BentoCell } from "@/components/ui/BentoGrid";
import { SectionHeader } from "@/components/ui/SectionHeader";

const PHOTOS = [
  { src: "/Photos%20/resultats-podiums/21_OPENKART_Salbris_22022026-_T5A4369.jpg", alt: "Open Kart Salbris 2026", caption: "Open Kart · Salbris 2026" },
  { src: "/Photos%20/resultats-podiums/Podium%20Champ%20france.jpg", alt: "Podium Championnat de France", caption: "Podium — Champ. de France" },
  { src: "/Photos%20/resultats-podiums/podium%20Champ%C3%A0onnat%20de%20France.jpeg", alt: "Podium Championnat de France", caption: "Championnat de France" },
  { src: "/Photos%20/resultats-podiums/Podium%20KArt%20MAg%20pers.jpeg", alt: "Podium Kart Mag", caption: "Podium — Kart Mag" },
  { src: "/Photos%20/Pilotes/Salbris%20Hugo.jpg", alt: "Hugo — Salbris", caption: "Hugo · Salbris" },
  { src: "/Photos%20/Pilotes/Hugo%20Cesare%20Varennes%20-%20Copie.jpg", alt: "Hugo et Cesare — Varennes", caption: "Hugo & Cesare · Varennes" },
  { src: "/Photos%20/Pilotes/Salbris%202.jpg", alt: "Salbris — en course", caption: "En course · Salbris" },
  { src: "/Photos%20/Pilotes/Salbris%203.jpg", alt: "Salbris — bataille", caption: "Bataille · Salbris" },
  { src: "/Photos%20/Pilotes/Clement%20Salbris%20-%20Copie.jpg", alt: "Clément — Salbris", caption: "Clément · Salbris" },
  { src: "/Photos%20/Pilotes/Clement%20Salbris%202%20-%20Copie.jpg", alt: "Clément — Salbris 2", caption: "Clément · Salbris" },
  { src: "/Photos%20/Pilotes/Alexis%20Salbris%20-%20Copie.jpg", alt: "Alexis — Salbris", caption: "Alexis · Salbris" },
  { src: "/Photos%20/Pilotes/Alexis%20Varennes%20-%20Copie.jpg", alt: "Alexis — Varennes", caption: "Alexis · Varennes" },
  { src: "/Photos%20/Pilotes/Antho%20Salbris%20-%20Copie.jpg", alt: "Anthony — Salbris", caption: "Anthony · Salbris" },
  { src: "/Photos%20/Pilotes/Antho%20Varennes%20-%20Copie.jpg", alt: "Anthony — Varennes", caption: "Anthony · Varennes" },
  { src: "/Photos%20/Pilotes/Noa%20varennes%20-%20Copie.jpg", alt: "Noa — Varennes", caption: "Noa · Varennes" },
  { src: "/Photos%20/Pilotes/Jade%20salbris%20-%20Copie.jpg", alt: "Jade — Salbris", caption: "Jade · Salbris" },
  { src: "/Photos%20/Pilotes/Valentin.jpg", alt: "Valentin", caption: "Valentin" },
  { src: "/Photos%20/Pilotes/Alexandre%20Varennes%20-%20Copie.jpg", alt: "Alexandre — Varennes", caption: "Alexandre · Varennes" },
];

function Lightbox({
  photo,
  onClose,
}: {
  photo: (typeof PHOTOS)[0];
  onClose: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          layoutId={`gallery-photo-${photo.src}`}
          className="relative w-[min(90vw,900px)] aspect-[3/2] rounded-xl overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            className="object-cover"
            sizes="min(90vw, 900px)"
            priority
          />
          <div className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-gradient-to-t from-black/80 to-transparent">
            <p className="font-sans text-base font-medium text-white">{photo.caption}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Fermer"
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition"
          >
            ✕
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function PhotoTile({
  photo,
  colSpan,
  rowSpan,
  onSelect,
}: {
  photo: (typeof PHOTOS)[0];
  colSpan?: 1 | 2 | 3;
  rowSpan?: 1 | 2;
  onSelect: () => void;
}) {
  return (
    <BentoCell colSpan={colSpan} rowSpan={rowSpan} className="p-0 overflow-hidden cursor-pointer group">
      <motion.div
        layoutId={`gallery-photo-${photo.src}`}
        className="relative w-full h-full min-h-[200px]"
        onClick={onSelect}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes={
            colSpan === 2
              ? "(max-width: 768px) 100vw, 66vw"
              : "(max-width: 768px) 100vw, 33vw"
          }
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 px-4 py-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <p className="font-sans text-sm font-medium text-white drop-shadow">{photo.caption}</p>
        </div>
      </motion.div>
    </BentoCell>
  );
}

export function GaleriePageContent() {
  const [selected, setSelected] = useState<(typeof PHOTOS)[0] | null>(null);

  const hero = PHOTOS[0];
  const featured = PHOTOS.slice(1, 3);
  const rest = PHOTOS.slice(3);

  return (
    <main className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader eyebrow="GALERIE" title="En piste avec la Team Foti" />

        <BentoGrid className="mt-10 auto-rows-[220px]">
          <PhotoTile photo={hero} colSpan={2} rowSpan={2} onSelect={() => setSelected(hero)} />
          {featured.map((photo) => (
            <PhotoTile key={photo.src} photo={photo} onSelect={() => setSelected(photo)} />
          ))}
          {rest.map((photo) => (
            <PhotoTile key={photo.src} photo={photo} onSelect={() => setSelected(photo)} />
          ))}
        </BentoGrid>
      </div>

      {selected && <Lightbox photo={selected} onClose={() => setSelected(null)} />}
    </main>
  );
}
