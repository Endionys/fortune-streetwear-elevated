import { featuredProducts } from "@/data/featuredProducts";
import { ProductCard } from "./ProductCard";

export function FeaturedCollection() {
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
          {featuredProducts.map((product, index) => (
            <ProductCard
              key={product.title}
              product={product}
              index={index}
              total={featuredProducts.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
