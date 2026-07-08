import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { NavigationBar } from "@/components/layout/NavigationBar";
import { FirstPurchaseDiscountAlert } from "@/components/marketing/FirstPurchaseDiscountAlert";
import { FooterSection } from "@/components/layout/FooterSection";

import {
  CatalogGallery,
  CatalogGallerySkeleton,
} from "@/components/catalog/CatalogGallery";
import { catalogArtworksQuery } from "@/services/catalog";

export const Route = createFileRoute("/catalogo")({
  head: () => ({
    meta: [
      { title: "Catálogo — Fortune Streetwear" },
      {
        name: "description",
        content:
          "Catálogo de artes Fortune. Drops, gráficos e estampas exclusivas da marca de streetwear premium.",
      },
      { property: "og:title", content: "Catálogo — Fortune" },
      {
        property: "og:description",
        content:
          "Acervo visual da Fortune. Cada peça é construída para a rua.",
      },
    ],
  }),
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(catalogArtworksQuery),
  component: CatalogPage,
});

function CatalogPage() {
  return (
    <main className="min-h-screen bg-background text-text">
      <NavigationBar />

      <section className="pt-32 md:pt-40 pb-16 border-b border-[color:var(--border)]">
        <div className="container-x">
          <span className="text-eyebrow">/ Acervo</span>
          <h1 className="text-display text-6xl md:text-8xl lg:text-9xl mt-4 leading-[0.85]">
            Cat<span className="text-primary italic">á</span>logo
          </h1>
          <p className="text-text-muted max-w-md mt-6">
            Artes, estampas e direção criativa. Cada peça reflete a essência da
            marca — drops limitados, produção em pequena escala.
          </p>
        </div>
      </section>

      <Suspense fallback={<CatalogGallerySkeleton />}>
        <CatalogGallery />
      </Suspense>

      <FooterSection />
    </main>
  );
}
