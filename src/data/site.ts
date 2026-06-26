import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";
import hero5 from "@/assets/hero-5.jpg";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import catOversized from "@/assets/cat-oversized.jpg";
import catTees from "@/assets/cat-tees.jpg";
import catPants from "@/assets/cat-pants.jpg";
import catJackets from "@/assets/cat-jackets.jpg";
import catAccessories from "@/assets/cat-accessories.jpg";

export type HeroImage = {
  image: string;
  alt: string;
  /** Tailwind absolute positioning classes */
  position: string;
  /** rotation in degrees, e.g. "-4" */
  rotation: string;
};

export const heroImages: HeroImage[] = [
  {
    image: hero1,
    alt: "Modelo com camiseta oversized Fortune",
    position: "top-0 left-[8%] w-[58%] aspect-[3/4] z-20",
    rotation: "-3",
  },
  {
    image: hero2,
    alt: "Modelo com cropped hoodie Fortune",
    position: "top-[18%] right-0 w-[48%] aspect-[3/4] z-30",
    rotation: "4",
  },
  {
    image: hero4,
    alt: "Jaqueta bomber Fortune",
    position: "bottom-0 left-0 w-[42%] aspect-[4/5] z-10",
    rotation: "-6",
  },
  {
    image: hero5,
    alt: "Look Fortune underground",
    position: "bottom-[6%] right-[10%] w-[40%] aspect-[3/4] z-20",
    rotation: "5",
  },
  {
    image: hero3,
    alt: "Detalhe da peça Fortune",
    position: "top-[42%] left-[44%] w-[24%] aspect-square z-40",
    rotation: "-2",
  },
];

export type Product = {
  image: string;
  title: string;
  category: string;
};

export const products: Product[] = [
  { image: product1, title: "Essential Tee — Onyx", category: "Camisetas" },
  { image: product2, title: "Shadow Hoodie", category: "Moletons" },
  { image: product3, title: "Tactical Cargo", category: "Calças" },
  { image: product4, title: "Signature Cap", category: "Acessórios" },
];

export type Category = {
  image: string;
  title: string;
  count: string;
};

export const categories: Category[] = [
  { image: catOversized, title: "Oversized", count: "12 peças" },
  { image: catTees, title: "Camisetas", count: "28 peças" },
  { image: catPants, title: "Calças", count: "14 peças" },
  { image: catJackets, title: "Jaquetas", count: "9 peças" },
  { image: catAccessories, title: "Acessórios", count: "21 peças" },
];

export const navLinks = [
  { label: "Coleção", href: "/#colecao" },
  { label: "Catálogo", href: "/catalogo" },
  { label: "Manifesto", href: "/#manifesto" },
  { label: "Contato", href: "/#contato" },
];
