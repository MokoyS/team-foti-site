import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { FeaturedProductCard } from "@/components/home/FeaturedProductCard";
import { ArticleCard } from "@/components/competition/ArticleCard";
import { getFeaturedProducts, getArticles } from "@/lib/data/get-data";
import { TranslatedTitle } from "@/components/TranslatedTitle";
import { HomeAboutSection } from "@/components/home/HomeAboutSection";
import { ParallaxGallery } from "@/components/home/ParallaxGallery";
import { HomeContactSection } from "@/components/home/HomeContactSection";
import { RevealSection } from "@/components/ui/RevealSection";
import { RacingButton } from "@/components/ui/RacingButton";
import { RacingSeparator } from "@/components/ui/RacingSeparator";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Team Foti | L'excellence du karting depuis 1978",
  description:
    "Écurie familiale fondée par Sébastien Foti. Champion d'Europe KZ2 et OK-Junior. Boutique karts, moteurs préparés, châssis Monster K. Loriol-sur-Drôme.",
  openGraph: {
    title: "Team Foti | Karting d'excellence depuis 1978",
    description:
      "Préparateur de champions. Boutique karts et pièces. De la compétition internationale à votre garage.",
    url: "https://teamfoti.com",
    siteName: "Team Foti",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Team Foti | Karting d'excellence",
    description: "Champion d'Europe. Boutique karts et pièces. Loriol-sur-Drôme.",
  },
};

/** Données Strapi à la requête (pas au build) pour afficher les vrais produits en prod. */
export const dynamic = "force-dynamic";

export default async function Home() {
  const [featured, articles] = await Promise.all([getFeaturedProducts(4), getArticles()]);
  const latestNews = articles.slice(0, 3);

  return (
    <>
      <Hero />
        {/* À propos */}
        <HomeAboutSection />

      {/* Produits phares – pas de séparateur, fondu depuis le Hero */}
      <RevealSection>
        <section id="shop" className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-16 md:py-20 relative">
          <SectionHeader eyebrow="SHOP" title="Produits phares" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((p) => (
              <FeaturedProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <RacingButton href="/shop" variant="ghost" arrow>
              <TranslatedTitle translationKey="home.viewInShop" />
            </RacingButton>
          </div>
        </section>
      </RevealSection>

      {/* Galerie parallax */}
      <ParallaxGallery title="En piste" />


      {/* Actualité */}
      <RevealSection beams>
        <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-16 relative">
          <SectionHeader eyebrow="NEWS" title="Actualité" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestNews.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <RacingButton href="/actualite" variant="ghost" arrow>
              <TranslatedTitle translationKey="home.blogCta" />
            </RacingButton>
          </div>
        </section>
      </RevealSection>

      {/* Contact */}
      <HomeContactSection />
    </>
  );
}
