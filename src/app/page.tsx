import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { FeaturedProductCard } from "@/components/home/FeaturedProductCard";
import { ArticleCard } from "@/components/competition/ArticleCard";
import { getFeaturedProducts, getArticles } from "@/lib/data/get-data";
import { TranslatedTitle } from "@/components/TranslatedTitle";
import { HomeAboutSection } from "@/components/home/HomeAboutSection";
import { HomeContactSection } from "@/components/home/HomeContactSection";
import { RevealSection } from "@/components/ui/RevealSection";

export default async function Home() {
  const [featured, articles] = await Promise.all([getFeaturedProducts(4), getArticles()]);
  const latestNews = articles.slice(0, 3);

  return (
    <>
      <Hero />

      {/* Produits phares */}
      <RevealSection beams>
        <section id="shop" className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-16 md:py-20 relative">
          <h2 className="font-heading font-bold italic text-2xl text-accent-yellow tracking-tight mb-8">
            <TranslatedTitle translationKey="home.featuredProducts" />
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((p) => (
              <FeaturedProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/shop"
              className="inline-block px-6 py-3 border border-accent-yellow text-accent-yellow font-heading font-bold italic rounded-xl transition btn-glow-yellow hover:bg-accent-yellow/10"
            >
              <TranslatedTitle translationKey="home.viewInShop" />
            </Link>
          </div>
        </section>
      </RevealSection>

      {/* À propos */}
      <HomeAboutSection />

      {/* Actualité */}
      <RevealSection beams>
        <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-16 border-t border-white/10 relative">
          <h2 className="font-heading font-bold italic text-2xl text-accent-yellow tracking-tight mb-8">
            <TranslatedTitle translationKey="home.latestNews" />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestNews.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/actualite"
              className="inline-block px-6 py-3 border border-accent-red text-accent-red font-heading font-bold italic rounded-xl transition btn-glow-red hover:bg-accent-red/10"
            >
              <TranslatedTitle translationKey="home.blogCta" />
            </Link>
          </div>
        </section>
      </RevealSection>

      {/* Contact */}
      <HomeContactSection />
    </>
  );
}
