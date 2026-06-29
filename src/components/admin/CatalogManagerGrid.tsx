import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { AdminCatalogArtwork } from "@/types/catalog";

type CatalogManagerGridProps = {
  artworks: AdminCatalogArtwork[];
  onChanged: () => void;
};

export function CatalogManagerGrid({
  artworks,
  onChanged,
}: CatalogManagerGridProps) {
  async function handleDelete(artwork: AdminCatalogArtwork) {
    if (!confirm(`Remover "${artwork.title}"?`)) return;
    const { error } = await supabase
      .from("catalog_items")
      .delete()
      .eq("id", artwork.id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Removido.");
    onChanged();
  }

  if (artworks.length === 0) {
    return (
      <div className="border border-dashed border-[color:var(--border)] p-12 text-center text-text-muted">
        Nenhuma arte ainda. Adicione a primeira acima.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {artworks.map((artwork) => (
        <article
          key={artwork.id}
          className="group relative border border-[color:var(--border)] bg-surface overflow-hidden"
        >
          <div className="aspect-[4/5] overflow-hidden bg-background">
            <img
              src={artwork.image_url}
              alt={artwork.title}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="p-4 flex items-start justify-between gap-2">
            <h3 className="text-sm font-medium truncate">{artwork.title}</h3>
            <button
              onClick={() => handleDelete(artwork)}
              aria-label="Remover"
              className="shrink-0 text-text-muted hover:text-primary transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
