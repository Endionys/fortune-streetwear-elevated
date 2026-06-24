import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <section className="py-24 md:py-32 border-t border-[color:var(--border)]">
      <div className="container-x grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-eyebrow">/ 05 — Newsletter</span>
          <h2 className="text-display text-5xl md:text-7xl mt-4">
            Faça parte da
            <br />
            <span className="text-primary italic">Fortune.</span>
          </h2>
          <p className="mt-6 text-text-muted max-w-md">
            Receba acesso antecipado a drops, edições limitadas e conteúdo
            exclusivo da marca. Sem spam, só sinal.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (email) setSent(true);
          }}
          className="w-full"
        >
          <div className="flex flex-col sm:flex-row gap-3 border-b border-[color:var(--border)] pb-4">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="flex-1 bg-transparent text-text placeholder:text-text-muted outline-none py-3 text-lg"
            />
            <button
              type="submit"
              className="bg-primary text-background px-8 py-3 text-sm font-bold uppercase tracking-[0.2em] hover:bg-text transition-colors"
            >
              {sent ? "Inscrito ✓" : "Inscrever-se"}
            </button>
          </div>
          <p className="mt-4 text-xs text-text-muted">
            Ao se inscrever você concorda com nossos termos e política de
            privacidade.
          </p>
        </form>
      </div>
    </section>
  );
}
