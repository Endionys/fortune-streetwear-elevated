export type NavigationLink = {
  label: string;
  href: string;
};

export type HeroImage = {
  image: string;
  alt: string;
  /** Tailwind absolute positioning classes */
  position: string;
  /** rotation in degrees, e.g. "-4" */
  rotation: string;
};

export type FeaturedProduct = {
  image: string;
  title: string;
  category: string;
};

export type CollectionCategory = {
  image: string;
  title: string;
  count: string;
};

export type BrandStat = {
  value: string;
  label: string;
};
