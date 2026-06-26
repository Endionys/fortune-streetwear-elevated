import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

type CatalogItem = {
  id: string;
  title: string;
  image_url: string;
};

const catalogQuery = queryOptions({
  queryKey: ["catalog_items"],
  queryFn: async (): Promise<CatalogItem[]> => {
    const { data, error } = await supabase
      .from("catalog_items")
      .select("id, title, image_url")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
  },
});

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
        content: "Acervo visual da Fortune. Cada peça é construída para a rua.",
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(catalogQuery),
  component: CatalogoPage,
});

function CatalogoPage() {
  return (
    <main className="min-h-screen bg-background text-text">
      <Header />
      <section className="pt-32 md:pt-40 pb-16 border-b border-[color:var(--border)]">
        <div className="container-x">
          <span className="text-eyebrow">/ Acervo</span>
          <h1 className="text-display text-6xl md:text-8xl lg:text-9xl mt-4 leading-[0.85]">
            Cat<span className="text-primary italic">á</span>logo
          </h1>
          <p className="text-text-muted max-w-md mt-6">
            Artes, estampas e direção criativa. Cada peça reflete a essência da marca — drops limitados, produção em pequena escala.
          </p>
        </div>
      </section>

      <Suspense fallback={<CatalogSkeleton />}>
        <CatalogGrid />
      </Suspense>

      <Footer />
    </main>
  );
}

function CatalogGrid() {
  const { data: items } = useSuspenseQuery(catalogQuery);

  if (items.length === 0) {
    return (
      <section className="container-x py-24">
        <div className="border border-dashed border-[color:var(--border)] p-16 text-center">
          <span className="text-eyebrow">/ Em breve</span>
          <p className="text-display text-3xl mt-4">Acervo em construção</p>
          <p className="text-text-muted text-sm mt-3">Novas artes serão publicadas aqui.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="container-x py-16 md:py-24">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((item, i) => (
          <article
            key={item.id}
            className="group relative border border-[color:var(--border)] bg-surface overflow-hidden"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-background">
              <img
                src={item.image_url}
                alt={item.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.05]"
              />
              <span className="absolute top-4 left-4 text-eyebrow text-[10px] bg-background/70 backdrop-blur px-2 py-1">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="p-5">
              <p className="text-eyebrow">Arte</p>
              <h3 className="mt-1 text-text font-medium truncate">{item.title}</h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function CatalogSkeleton() {
  return (
    <section className="container-x py-16 md:py-24">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="aspect-[4/5] bg-surface border border-[color:var(--border)] animate-pulse" />
        ))}
      </div>
    </section>
  );
}
