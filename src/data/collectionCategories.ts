import catOversized from "@/assets/cat-oversized.jpg";
import catTees from "@/assets/cat-tees.jpg";
import catPants from "@/assets/cat-pants.jpg";
import catJackets from "@/assets/cat-jackets.jpg";
import catAccessories from "@/assets/cat-accessories.jpg";
import type { CollectionCategory } from "@/types/site";

export const collectionCategories: CollectionCategory[] = [
  { image: catOversized, title: "Oversized", count: "12 peças" },
  { image: catTees, title: "Camisetas", count: "28 peças" },
  { image: catPants, title: "Calças", count: "14 peças" },
  { image: catJackets, title: "Jaquetas", count: "9 peças" },
  { image: catAccessories, title: "Acessórios", count: "21 peças" },
];

/** Asymmetric layout classes for the editorial category grid. */
export const categoryGridLayout = [
  "col-span-12 md:col-span-7 aspect-[4/3] md:aspect-[16/11]",
  "col-span-12 sm:col-span-6 md:col-span-5 aspect-[4/3] md:aspect-[16/11]",
  "col-span-6 md:col-span-4 aspect-[4/5]",
  "col-span-6 md:col-span-4 aspect-[4/5]",
  "col-span-12 md:col-span-4 aspect-[4/3] md:aspect-[4/5]",
];
