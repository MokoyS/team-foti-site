import Link from "next/link";
import { getProductBySlug } from "@/lib/data/get-data";
import { ProductPageContent } from "@/components/shop/ProductPageContent";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = slug ? await getProductBySlug(slug) : undefined;

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <p className="text-foreground/70">Produit introuvable.</p>
        <Link href="/shop" className="text-accent-yellow mt-4 inline-block">
          Retour boutique
        </Link>
      </div>
    );
  }

  return <ProductPageContent product={product} />;
}
