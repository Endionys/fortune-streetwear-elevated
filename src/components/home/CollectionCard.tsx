import { ArrowUpRight } from "lucide-react";
import type { CollectionCategory } from "@/types/site";

type CollectionCardProps = {
  category: CollectionCategory;
  layoutClassName: string;
};

export function CollectionCard({ category, layoutClassName }: CollectionCardProps) {
  return (
    <a
      href="#"
      className={`group relative overflow-hidden bg-surface border border-[color:var(--border)] ${layoutClassName}`}
    >
      <img
        src={category.image}
        alt={category.title}
        loading="lazy"
        width={1024}
        height={1024}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between">
        <span className="text-eyebrow text-text">{category.count}</span>
        <div className="flex items-end justify-between gap-4">
          <h3 className="text-display text-3xl md:text-5xl text-text group-hover:text-primary transition-colors">
            {category.title}
          </h3>
          <span className="grid place-items-center h-11 w-11 border border-[color:var(--border)] bg-background/50 backdrop-blur text-text group-hover:bg-primary group-hover:text-background group-hover:border-primary transition-all">
            <ArrowUpRight size={18} />
          </span>
        </div>
      </div>
    </a>
  );
}
