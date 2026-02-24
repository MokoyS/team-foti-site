export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  image?: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Kart OTK 2024",
    slug: "kart-otk-2024",
    description: "Châssis compétition OTK, prêt à courir. Moteur Iame X30. Réglages usine Team Foti.",
    price: 8990,
    category: "Karts",
    stock: 3,
  },
  {
    id: "2",
    name: "Kart Birel ART 125",
    slug: "kart-birel-art-125",
    description: "Modèle loisir/initiation. Idéal pour débuter en toute sécurité.",
    price: 3490,
    category: "Karts",
    stock: 5,
  },
  {
    id: "3",
    name: "Huile moteur X30 2T",
    slug: "huile-x30-2t",
    description: "Huile 2 temps recommandée Iame. Bidon 5L.",
    price: 89,
    category: "Consommables",
    stock: 24,
  },
  {
    id: "4",
    name: "Pneus slicks Vega (jeu de 4)",
    slug: "pneus-vega-slicks",
    description: "Gomme medium. Dimensions réglementaires WKA/CIK.",
    price: 249,
    category: "Consommables",
    stock: 40,
  },
  {
    id: "5",
    name: "Bougies NGK BR9EG",
    slug: "bougies-ngk-br9eg",
    description: "Lot de 4 bougies. Référence constructeur Iame/Rotax.",
    price: 32,
    category: "Consommables",
    stock: 50,
  },
  {
    id: "6",
    name: "Combinaison Team Foti",
    slug: "combinaison-team-foti",
    description: "Combinaison pilote officielle. Tissu ignifugé, coupe compétition.",
    price: 289,
    category: "Merchandising",
    stock: 20,
  },
  {
    id: "7",
    name: "Casque Bell K1",
    slug: "casque-bell-k1",
    description: "Casque karting homologué. Visière teintée incluse.",
    price: 449,
    category: "Merchandising",
    stock: 8,
  },
  {
    id: "8",
    name: "Pack entretien courroie",
    slug: "pack-courroie",
    description: "Courroie + tendeur. Compatible X30 / Rotax.",
    price: 65,
    category: "Consommables",
    stock: 15,
  },
  {
    id: "9",
    name: "T-shirt Team Foti",
    slug: "tshirt-team-foti",
    description: "T-shirt coton officiel. Coupe unisexe.",
    price: 29,
    category: "Merchandising",
    stock: 100,
  },
  {
    id: "10",
    name: "Freins avant complémentaires",
    slug: "freins-avant",
    description: "Kit freins avant pour châssis OTK/Birel. Disques + étriers.",
    price: 420,
    category: "Consommables",
    stock: 6,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(limit = 6): Product[] {
  return products.slice(0, limit);
}
