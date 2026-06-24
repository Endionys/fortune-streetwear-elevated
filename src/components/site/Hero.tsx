import { ArrowUpRight } from "lucide-react";
import { heroImages } from "@/data/site";

export function Hero() {
  return (
    <section className="relative pt-32 md:pt-40 pb-24 md:pb-32 overflow-hidden">
      {/* faint grid background */}
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
        {/* Left */}
        <div className="fade-up">
          <div className="flex items-center gap-3 mb-8">
            <span className="h-px w-10 bg-primary" />
            <span className="text-eyebrow">FW 26 / Drop 01</span>
          </div>

          <h1 className="text-display text-[clamp(3.5rem,9vw,8rem)] text-text">
            Vista sua
            <br />
            <span className="italic font-display text-primary">atitude.</span>
          </h1>

          <p className="mt-8 max-w-md text-text-muted text-base md:text-lg leading-relaxed">
            Nova coleção Fortune criada para quem transforma estilo em
            identidade. Peças limitadas, construídas para a rua.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <a
              href="#colecao"
              className="group inline-flex items-center gap-3 bg-primary text-background px-7 py-4 text-sm font-bold uppercase tracking-[0.18em] hover:bg-text transition-colors"
            >
              Conheça a coleção
              <ArrowUpRight
                size={18}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>
            <a
              href="#manifesto"
              className="text-sm uppercase tracking-[0.2em] text-text-muted hover:text-text transition-colors border-b border-[color:var(--border)] pb-1"
            >
              Nosso manifesto
            </a>
          </div>

          <dl className="mt-16 grid grid-cols-3 gap-6 max-w-md">
            {[
              { k: "42", v: "Peças" },
              { k: "01", v: "Drop ativo" },
              { k: "∞", v: "Atitude" },
            ].map((s) => (
              <div key={s.v} className="border-t border-[color:var(--border)] pt-4">
                <dt className="text-display text-3xl text-text">{s.k}</dt>
                <dd className="text-eyebrow mt-1">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Right — editorial collage */}
        <div className="relative aspect-[4/5] w-full max-w-[640px] mx-auto lg:mx-0 lg:ml-auto">
          {heroImages.map((img, i) => (
            <figure
              key={i}
              className={`absolute ${img.position} group`}
              style={{
                transform: `rotate(${img.rotation}deg)`,
                animation: `fade-up 1s cubic-bezier(0.2,0.7,0.2,1) ${i * 0.12}s both`,
              }}
            >
              <div className="relative h-full w-full overflow-hidden bg-surface ring-1 ring-[color:var(--border)] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover:scale-[1.03] group-hover:rotate-0">
                <img
                  src={img.image}
                  alt={img.alt}
                  className="h-full w-full object-cover"
                  loading={i === 0 ? "eager" : "lazy"}
                  width={1024}
                  height={1024}
                />
              </div>
            </figure>
          ))}
        </div>
      </div>

      {/* Marquee */}
      <div className="mt-24 overflow-hidden border-y border-[color:var(--border)] py-5">
        <div className="marquee-track flex whitespace-nowrap text-display text-3xl md:text-5xl gap-12">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex shrink-0 items-center gap-12">
              {["Fortune Streetwear", "★", "Drop 01 / FW26", "★", "Made for the streets", "★", "Vista sua atitude", "★"].map(
                (t, i) => (
                  <span
                    key={i}
                    className={i % 4 === 0 ? "text-text" : "text-text-muted/40"}
                  >
                    {t}
                  </span>
                ),
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
