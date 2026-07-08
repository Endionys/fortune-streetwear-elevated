import { useSuspenseQuery } from "@tanstack/react-query";
import { catalogArtworksQuery } from "@/services/catalog";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { CatalogCard } from "./CatalogCard";


export function CatalogGallery() {
  const { data: artworks } = useSuspenseQuery(catalogArtworksQuery);

  if (artworks.length === 0) {
    return <EmptyCatalogState />;
  }

  return (
    <section className="container-x py-16 md:py-24 animate-catalog-in">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {artworks.map((artwork, index) => (
          <CatalogCard key={artwork.id} artwork={artwork} index={index} />
        ))}
      </div>
    </section>
  );
}

function EmptyCatalogState() {
  return (
    <section className="container-x py-24 animate-catalog-in">
      <GlassPanel className="p-16 text-center border-dashed">
        <span className="text-eyebrow">/ Em breve</span>
        <p className="text-display text-3xl mt-4">Acervo em construção</p>
        <p className="text-text-muted text-sm mt-3">
          Novas artes serão publicadas aqui.
        </p>
      </GlassPanel>
    </section>
  );
}


export function CatalogGallerySkeleton() {
  return (
    <section className="container-x py-16 md:py-24 animate-catalog-in">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, index) => (
          <GlassPanel
            key={index}
            className="aspect-[4/5] shimmer-surface"
          />
        ))}

      </div>
    </section>
  );
}
