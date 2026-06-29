import type { CatalogArtwork } from "@/types/catalog";

type CatalogCardProps = {
  artwork: CatalogArtwork;
  index: number;
};

export function CatalogCard({ artwork, index }: CatalogCardProps) {
  return (
    <article className="group relative border border-[color:var(--border)] bg-surface overflow-hidden">
      <div className="relative aspect-[4/5] overflow-hidden bg-background">
        <img
          src={artwork.image_url}
          alt={artwork.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.05]"
        />
        <span className="absolute top-4 left-4 text-eyebrow text-[10px] bg-background/70 backdrop-blur px-2 py-1">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="p-5">
        <p className="text-eyebrow">Arte</p>
        <h3 className="mt-1 text-text font-medium truncate">{artwork.title}</h3>
      </div>
    </article>
  );
}
