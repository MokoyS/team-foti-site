import Link from "next/link";
import { getProductBySlug } from "@/lib/data/get-data";
import { ProductPageContent } from "@/components/shop/ProductPageContent";
import type { Metadata } from "next";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = slug ? await getProductBySlug(slug) : undefined;

  if (!product) {
    return {
      title: "Produit introuvable | Team Foti",
      description: "Ce produit n'existe pas ou a été retiré de la boutique.",
    };
  }

  return {
    title: `${product.name} | Team Foti – Engineering Store`,
    description: product.description
      ? product.description.slice(0, 155)
      : `${product.name} — disponible dans la boutique Team Foti. Matériel karting de compétition.`,
    openGraph: {
      title: `${product.name} | Team Foti`,
      description: product.description?.slice(0, 155) ?? `${product.name} — Team Foti Engineering Store`,
      type: "website",
    },
  };
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
