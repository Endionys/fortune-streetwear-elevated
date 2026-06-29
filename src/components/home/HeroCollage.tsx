import { heroImages } from "@/data/heroImages";

export function HeroCollage() {
  return (
    <div className="relative aspect-[4/5] w-full max-w-[640px] mx-auto lg:mx-0 lg:ml-auto">
      {heroImages.map((image, index) => (
        <figure
          key={image.image}
          className={`absolute ${image.position} group`}
          style={{
            transform: `rotate(${image.rotation}deg)`,
            animation: `fade-up 1s cubic-bezier(0.2,0.7,0.2,1) ${index * 0.12}s both`,
          }}
        >
          <div className="relative h-full w-full overflow-hidden bg-surface ring-1 ring-[color:var(--border)] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover:scale-[1.03] group-hover:rotate-0">
            <img
              src={image.image}
              alt={image.alt}
              className="h-full w-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
              width={1024}
              height={1024}
            />
          </div>
        </figure>
      ))}
    </div>
  );
}
