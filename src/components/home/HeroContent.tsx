import { ArrowUpRight } from "lucide-react";
import { heroStats } from "@/data/brand";

export function HeroContent() {
  return (
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
        Nova coleção Fortune criada para quem transforma estilo em identidade.
        Peças limitadas, construídas para a rua.
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
        {heroStats.map((stat) => (
          <div key={stat.label} className="border-t border-[color:var(--border)] pt-4">
            <dt className="text-display text-3xl text-text">{stat.value}</dt>
            <dd className="text-eyebrow mt-1">{stat.label}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
