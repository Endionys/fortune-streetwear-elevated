import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";
import hero5 from "@/assets/hero-5.jpg";
import type { HeroImage } from "@/types/site";

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
