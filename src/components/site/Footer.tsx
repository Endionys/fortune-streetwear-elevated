import { Instagram, MapPin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer id="contato" className="border-t border-[color:var(--border)] bg-background">
      <div className="container-x py-16">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <h3 className="text-display text-5xl md:text-6xl">
              FORT<span className="text-primary">U</span>NE
            </h3>
            <p className="mt-4 text-text-muted max-w-sm">
              Streetwear premium feito para quem transforma estilo em
              identidade.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="text-eyebrow mb-5">Navegue</p>
            <ul className="space-y-3 text-text-muted">
              <li><a href="#colecao" className="hover:text-text transition-colors">Coleção</a></li>
              <li><a href="#categorias" className="hover:text-text transition-colors">Categorias</a></li>
              <li><a href="#manifesto" className="hover:text-text transition-colors">Manifesto</a></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="text-eyebrow mb-5">Contato</p>
            <ul className="space-y-3 text-text-muted">
              <li className="flex items-center gap-3"><Mail size={16} /> contato@fortune.co</li>
              <li className="flex items-center gap-3"><MapPin size={16} /> São Paulo, BR</li>
              <li className="flex items-center gap-3"><Instagram size={16} /> @fortune.streetwear</li>
            </ul>
          </div>
        </div>

        {/* Giant typography */}
        <div className="mt-16 pt-10 border-t border-[color:var(--border)]">
          <div className="text-display text-[clamp(4rem,18vw,16rem)] leading-[0.85] text-text">
            FORTUNE<span className="text-primary">.</span>
          </div>
          <div className="mt-8 flex flex-col md:flex-row justify-between gap-4 text-xs text-text-muted uppercase tracking-[0.2em]">
            <span>© 2026 Fortune Streetwear — Todos os direitos reservados</span>
            <span>Vista sua atitude.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
