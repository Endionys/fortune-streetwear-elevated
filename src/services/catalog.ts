import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { CatalogArtwork } from "@/types/catalog";

export const SIGNED_URL_TTL_SECONDS = 60 * 60 * 24 * 365; // 1 year

export const catalogArtworksQuery = queryOptions({
  queryKey: ["catalog_items"],
  queryFn: async (): Promise<CatalogArtwork[]> => {
    const { data, error } = await supabase
      .from("catalog_items")
      .select("id, title, image_url")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
  },
});
