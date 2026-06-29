import { HeroContent } from "./HeroContent";
import { HeroCollage } from "./HeroCollage";
import { BrandMarquee } from "./BrandMarquee";

export function HeroBanner() {
  return (
    <section className="relative pt-32 md:pt-40 pb-24 md:pb-32 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(var(--text) 1px, transparent 1px), linear-gradient(90deg, var(--text) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="container-x relative grid lg:grid-cols-2 gap-16 lg:gap-10 items-center">
        <HeroContent />
        <HeroCollage />
      </div>

      <BrandMarquee />
    </section>
  );
}
