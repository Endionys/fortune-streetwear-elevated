export function Manifesto() {
  return (
    <section id="manifesto" className="relative py-32 md:py-48 bg-background overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05] text-display text-[clamp(10rem,40vw,32rem)] leading-none text-text whitespace-nowrap flex items-center justify-center pointer-events-none select-none"
      >
        FORTUNE
      </div>

      <div className="container-x relative text-center">
        <span className="text-eyebrow">/ 03 — Manifesto</span>
        <h2 className="mt-8 text-display text-[clamp(2.5rem,6vw,5.5rem)] max-w-4xl mx-auto">
          Não seguimos <span className="text-text-muted">tendências.</span>
          <br />
          <span className="text-primary italic">Criamos identidade.</span>
        </h2>
        <p className="mt-10 max-w-xl mx-auto text-text-muted leading-relaxed">
          Fortune é mais do que uma marca de roupas. É a tradução visual de uma
          geração que recusa o óbvio, que constrói sua própria narrativa e
          carrega atitude em cada detalhe.
        </p>

        <div className="mt-16 inline-flex items-center gap-3 text-eyebrow">
          <span className="h-px w-12 bg-primary" />
          Estabelecida em 2026
          <span className="h-px w-12 bg-primary" />
        </div>
      </div>
    </section>
  );
}
