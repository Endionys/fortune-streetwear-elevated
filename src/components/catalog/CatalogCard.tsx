import { useInView } from "@/hooks/use-in-view";
import { GlassPanel } from "@/components/ui/GlassPanel";
import type { CatalogArtwork } from "@/types/catalog";


type CatalogCardProps = {
  artwork: CatalogArtwork;
  index: number;
};

export function CatalogCard({ artwork, index }: CatalogCardProps) {
  const { ref, inView } = useInView<HTMLElement>();
  const delayMs = Math.min(index, 8) * 70;

  return (
    <article
      ref={ref}
      style={{
        transitionDelay: inView ? `${delayMs}ms` : "0ms",
      }}
      className={[
        "group relative glass-panel overflow-hidden",
        "transform-gpu will-change-transform",
        "transition-[opacity,transform,box-shadow,border-color] duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)]",
        "motion-reduce:transition-none motion-reduce:transform-none",
        inView
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-6 motion-reduce:opacity-100",
        "hover:-translate-y-1 hover:border-[color:var(--primary)]/40",
        "hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)]",
      ].join(" ")}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-background">
        <img
          src={artwork.image_url}
          alt={artwork.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06] motion-reduce:transition-none"
        />
        <span
          className={[
            "absolute top-4 left-4 text-eyebrow text-[10px]",
            "bg-background/70 backdrop-blur px-2 py-1",
            "transition-all duration-500 ease-out",
            "group-hover:tracking-[0.4em] group-hover:bg-primary group-hover:text-background",
            "motion-reduce:transition-none",
          ].join(" ")}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="p-5">
        <p className="text-eyebrow transition-[letter-spacing] duration-500 ease-out group-hover:tracking-[0.4em]">
          Arte
        </p>
        <h3 className="mt-1 text-text font-medium truncate relative inline-block max-w-full">
          <span className="truncate block">{artwork.title}</span>
          <span
            aria-hidden
            className="absolute left-0 -bottom-0.5 h-px w-full origin-left scale-x-0 bg-primary transition-transform duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-x-100 motion-reduce:transition-none"
          />
        </h3>
      </div>
    </article>
  );
}
