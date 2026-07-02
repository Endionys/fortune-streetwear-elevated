import { ArrowUpRight } from "lucide-react";
import type { FeaturedProduct } from "@/types/site";

type ProductCardProps = {
  product: FeaturedProduct;
  index: number;
  total: number;
};

export function ProductCard({ product, index, total }: ProductCardProps) {
  const badge = `0${index + 1} / 0${total}`;

  return (
    <article className="group relative glass-panel glass-panel-hover overflow-hidden">
      <div className="relative aspect-[4/5] overflow-hidden bg-background">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          width={1024}
          height={1024}
          className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]"
        />
        <span className="absolute top-4 left-4 text-eyebrow text-[10px] bg-background/70 backdrop-blur px-2 py-1">
          {badge}
        </span>
      </div>
      <div className="p-5 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-eyebrow">{product.category}</p>
          <h3 className="mt-1 text-text font-medium truncate">{product.title}</h3>
        </div>
        <button
          aria-label={`Ver ${product.title}`}
          className="shrink-0 grid place-items-center h-10 w-10 border border-[color:var(--border)] text-text-muted group-hover:bg-primary group-hover:text-background group-hover:border-primary transition-colors"
        >
          <ArrowUpRight size={16} />
        </button>
      </div>
    </article>
  );
}
