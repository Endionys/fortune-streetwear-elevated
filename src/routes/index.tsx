import { createFileRoute } from "@tanstack/react-router";
import { NavigationBar } from "@/components/layout/NavigationBar";
import { FirstPurchaseDiscountAlert } from "@/components/marketing/FirstPurchaseDiscountAlert";

import { HeroBanner } from "@/components/home/HeroBanner";
import { FeaturedCollection } from "@/components/home/FeaturedCollection";
import { BrandManifesto } from "@/components/home/BrandManifesto";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { FooterSection } from "@/components/layout/FooterSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fortune — Streetwear premium. Vista sua atitude." },
      {
        name: "description",
        content:
          "Fortune é uma marca de streetwear premium para quem transforma estilo em identidade. Drops limitados, peças construídas para a rua.",
      },
      { property: "og:title", content: "Fortune — Streetwear premium" },
      {
        property: "og:description",
        content:
          "Nova coleção Fortune. Drops limitados de streetwear premium. Vista sua atitude.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <main className="min-h-screen bg-background text-text">
      <FirstPurchaseDiscountAlert />
      <NavigationBar />

      <HeroBanner />
      <FeaturedCollection />
      <BrandManifesto />
      <CategoryGrid />
      <NewsletterSection />
      <FooterSection />
    </main>
  );
}
