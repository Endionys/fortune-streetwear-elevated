import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { ProductGrid } from "@/components/site/ProductGrid";
import { Manifesto } from "@/components/site/Manifesto";
import { Categories } from "@/components/site/Categories";
import { Newsletter } from "@/components/site/Newsletter";
import { Footer } from "@/components/site/Footer";

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
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-background text-text">
      <Header />
      <Hero />
      <ProductGrid />
      <Manifesto />
      <Categories />
      <Newsletter />
      <Footer />
    </main>
  );
}
