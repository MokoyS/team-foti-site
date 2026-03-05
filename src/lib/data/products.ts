export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  image?: string;
  badge?: string;
  specs?: string;
}

export const products: Product[] = [
  // --- Compétition ---
  {
    id: "1",
    name: "Châssis Monster K KZ2",
    slug: "chassis-monster-k-kz2",
    description: "Châssis compétition Monster K développé avec Yuri Serafini. Structure aluminium haute résistance, géométrie optimisée piste. Prêt à moteur.",
    price: 4990,
    category: "Compétition",
    stock: 4,
    badge: "EXCLUSIVE",
    specs: "TYPE: KZ2 / MARQUE: Monster K / PARTENAIRE: Yuri Serafini",
  },
  {
    id: "2",
    name: "Châssis Monster K OK-Senior",
    slug: "chassis-monster-k-ok",
    description: "Version OK du châssis Monster K. Réglages Foti inclus. Compatible moteurs IAME / TM Racing.",
    price: 4490,
    category: "Compétition",
    stock: 3,
    badge: "FOTI PREP",
    specs: "TYPE: OK / MARQUE: Monster K / MOTEUR: IAME ou TM",
  },
  {
    id: "3",
    name: "Moteur Foti Prep KZ2",
    slug: "moteur-foti-prep-kz2",
    description: "Moteur KZ2 préparé en interne par Sébastien Foti. Des heures de banc d'essai pour extraire chaque centième. Puissance maximale garantie.",
    price: 3200,
    category: "Compétition",
    stock: 5,
    badge: "FOTI PREP",
    specs: "TYPE: KZ2 / MOTEUR: FOTI PREP / BANC: certifié",
  },
  {
    id: "4",
    name: "Moteur Foti Prep OK-Senior",
    slug: "moteur-foti-prep-ok",
    description: "Moteur OK préparé Foti. Fiabilité course + performance maximale. Idéal championnats nationaux et européens.",
    price: 2600,
    category: "Compétition",
    stock: 6,
    badge: "FOTI PREP",
    specs: "TYPE: OK / MOTEUR: FOTI PREP / USAGE: compétition",
  },
  // --- Loisir ---
  {
    id: "5",
    name: "Kart Loisir PCR 125cc",
    slug: "kart-loisir-pcr-125",
    description: "Châssis PCR, marque importée par l'écurie depuis les années 2000. Accessible, fiable, parfait pour débuter ou rouler en famille.",
    price: 2890,
    category: "Loisir",
    stock: 5,
    specs: "TYPE: Loisir / MARQUE: PCR / MOTEUR: 125cc",
  },
  {
    id: "6",
    name: "Pack Initiation Complet",
    slug: "pack-initiation",
    description: "Kart PCR + casque + combinaison + gants. Tout pour rouler dès la livraison. Réglages de base inclus.",
    price: 3490,
    category: "Loisir",
    stock: 3,
    badge: "PACK",
    specs: "TYPE: Pack / CONTENU: kart + équipement complet",
  },
  {
    id: "7",
    name: "Casque Bell K1 Pro",
    slug: "casque-bell-k1-pro",
    description: "Casque karting homologué CIK/FIA. Visière teintée incluse. Protection optimale pour la piste.",
    price: 449,
    category: "Loisir",
    stock: 8,
    specs: "TYPE: Casque / NORME: CIK/FIA / MARQUE: Bell",
  },
  {
    id: "8",
    name: "Combinaison Pilote Team Foti",
    slug: "combinaison-team-foti",
    description: "Combinaison officielle Team Foti. Tissu ignifugé homologué CIK, coupe compétition. Broderie écurie.",
    price: 289,
    category: "Loisir",
    stock: 20,
    specs: "TYPE: Combinaison / NORME: CIK / COUPE: compétition",
  },
  // --- Consommables ---
  {
    id: "9",
    name: "Huile Lexoil 2T Racing",
    slug: "huile-lexoil-2t-racing",
    description: "Huile 2 temps haute performance Lexoil. Utilisée par l'équipe en compétition. Bidon 5L.",
    price: 79,
    category: "Consommables",
    stock: 30,
    specs: "TYPE: Huile / MARQUE: Lexoil / CONTENANCE: 5L",
  },
  {
    id: "10",
    name: "Pneus Vega Slicks (×4)",
    slug: "pneus-vega-slicks",
    description: "Gomme medium Vega. Référence piste en championnat CIK/FIA. Dimensions WKA/CIK réglementaires.",
    price: 249,
    category: "Consommables",
    stock: 40,
    specs: "TYPE: Pneu / MARQUE: Vega / GOMME: medium",
  },
  {
    id: "11",
    name: "Bougies NGK BR9EG (×4)",
    slug: "bougies-ngk-br9eg",
    description: "Lot de 4 bougies NGK référence course. Compatible IAME X30 / Rotax Max / TM Racing.",
    price: 32,
    category: "Consommables",
    stock: 50,
    specs: "TYPE: Bougie / MARQUE: NGK / REF: BR9EG",
  },
  {
    id: "12",
    name: "Kit Entretien Courroie",
    slug: "kit-courroie",
    description: "Courroie + tendeur haute performance. Compatible X30 / Rotax / TM. Recommandé toutes les 4 sorties.",
    price: 65,
    category: "Consommables",
    stock: 15,
    specs: "TYPE: Entretien / COMPAT: X30 · Rotax · TM",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(limit = 6): Product[] {
  return products.slice(0, limit);
}
