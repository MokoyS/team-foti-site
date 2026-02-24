import { getProducts } from "@/lib/data/get-data";
import { ShopPageContent } from "@/components/shop/ShopPageContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Boutique | Team Foti – Engineering Store",
  description: "Châssis compétition, moteurs, consommables et équipement. Préparation et réglages Team Foti.",
};

export default async function ShopPage() {
  const products = await getProducts();
  return <ShopPageContent products={products} />;
}
