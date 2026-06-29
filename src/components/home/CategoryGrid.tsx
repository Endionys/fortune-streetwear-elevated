import {
  collectionCategories,
  categoryGridLayout,
} from "@/data/collectionCategories";
import { CollectionCard } from "./CollectionCard";

export function CategoryGrid() {
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
          {collectionCategories.map((category, index) => (
            <CollectionCard
              key={category.title}
              category={category}
              layoutClassName={categoryGridLayout[index]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
