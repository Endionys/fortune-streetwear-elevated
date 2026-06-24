import { ArrowUpRight } from "lucide-react";
import { categories } from "@/data/site";

export function Categories() {
  return (
    <section id="categorias" className="py-24 md:py-32">
      <div className="container-x">
        <div className="flex items-end justify-between gap-6 mb-14">
          <div>
            <span className="text-eyebrow">/ 04 — Categorias</span>
            <h2 className="text-display text-5xl md:text-7xl mt-4">
              Encontre seu <span className="italic text-primary">estilo</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 md:gap-5">
          {categories.map((cat, i) => {
            // asymmetric layout: featured large + smaller
            const layout = [
              "col-span-12 md:col-span-7 aspect-[4/3] md:aspect-[16/11]",
              "col-span-12 sm:col-span-6 md:col-span-5 aspect-[4/3] md:aspect-[16/11]",
              "col-span-6 md:col-span-4 aspect-[4/5]",
              "col-span-6 md:col-span-4 aspect-[4/5]",
              "col-span-12 md:col-span-4 aspect-[4/3] md:aspect-[4/5]",
            ];
            return (
              <a
                key={cat.title}
                href="#"
                className={`group relative overflow-hidden bg-surface border border-[color:var(--border)] ${layout[i]}`}
              >
                <img
                  src={cat.image}
                  alt={cat.title}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between">
                  <span className="text-eyebrow text-text">{cat.count}</span>
                  <div className="flex items-end justify-between gap-4">
                    <h3 className="text-display text-3xl md:text-5xl text-text group-hover:text-primary transition-colors">
                      {cat.title}
                    </h3>
                    <span className="grid place-items-center h-11 w-11 border border-[color:var(--border)] bg-background/50 backdrop-blur text-text group-hover:bg-primary group-hover:text-background group-hover:border-primary transition-all">
                      <ArrowUpRight size={18} />
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
