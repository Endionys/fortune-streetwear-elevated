import { ArrowUpRight } from "lucide-react";
import { products } from "@/data/site";

export function ProductGrid() {
  return (
    <section id="colecao" className="py-24 md:py-32">
      <div className="container-x">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="text-eyebrow">/ 02 — Nova coleção</span>
            <h2 className="text-display text-5xl md:text-7xl mt-4">
              Peças em <span className="text-primary italic">destaque</span>
            </h2>
          </div>
          <p className="text-text-muted max-w-sm">
            Drops limitados, produção em pequena escala. Cada peça reflete a
            essência da marca.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((p, i) => (
            <article
              key={p.title}
              className="group relative bg-surface border border-[color:var(--border)] overflow-hidden"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-background">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]"
                />
                <span className="absolute top-4 left-4 text-eyebrow text-[10px] bg-background/70 backdrop-blur px-2 py-1">
                  0{i + 1} / 0{products.length}
                </span>
              </div>
              <div className="p-5 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-eyebrow">{p.category}</p>
                  <h3 className="mt-1 text-text font-medium truncate">
                    {p.title}
                  </h3>
                </div>
                <button
                  aria-label={`Ver ${p.title}`}
                  className="shrink-0 grid place-items-center h-10 w-10 border border-[color:var(--border)] text-text-muted group-hover:bg-primary group-hover:text-background group-hover:border-primary transition-colors"
                >
                  <ArrowUpRight size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
