export type CatalogArtwork = {
  id: string;
  title: string;
  image_url: string;
};

export type AdminCatalogArtwork = CatalogArtwork & {
  sort_order: number;
  created_at: string;
};
