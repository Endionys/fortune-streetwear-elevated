import { useEffect, useState } from "react";
import { Instagram, MapPin, ShoppingBag, Menu, X } from "lucide-react";
import { navLinks } from "@/data/site";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-[color:var(--background)]/70 border-b border-[color:var(--border)]"
          : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between md:h-20">
        {/* Left nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm flex-1">
          {navLinks.slice(0, 2).map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-text-muted hover:text-text transition-colors uppercase tracking-[0.18em] text-[11px]"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Logo */}
        <a href="#" className="flex-1 md:flex-none text-center">
          <span className="text-display text-2xl md:text-3xl tracking-[0.05em]">
            FORT<span className="text-primary">U</span>NE
          </span>
        </a>

        {/* Right */}
        <div className="hidden md:flex items-center justify-end gap-8 text-sm flex-1">
          {navLinks.slice(2).map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-text-muted hover:text-text transition-colors uppercase tracking-[0.18em] text-[11px]"
            >
              {l.label}
            </a>
          ))}
          <div className="flex items-center gap-4 pl-6 border-l border-[color:var(--border)]">
            <a href="#" aria-label="Instagram" className="text-text-muted hover:text-primary transition-colors">
              <Instagram size={18} />
            </a>
            <a href="#" aria-label="Lojas" className="text-text-muted hover:text-primary transition-colors">
              <MapPin size={18} />
            </a>
            <a href="#" aria-label="Carrinho" className="relative text-text-muted hover:text-primary transition-colors">
              <ShoppingBag size={18} />
              <span className="absolute -top-2 -right-2 grid place-items-center h-4 w-4 rounded-full bg-primary text-[10px] font-bold text-background">
                0
              </span>
            </a>
          </div>
        </div>

        <button
          aria-label="Menu"
          className="md:hidden text-text"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-[color:var(--border)] bg-background/95 backdrop-blur-xl">
          <nav className="container-x py-6 flex flex-col gap-5">
            {navLinks.map((l) => (
              <a
                key={l.href}
                onClick={() => setOpen(false)}
                href={l.href}
                className="text-text uppercase tracking-[0.2em] text-sm"
              >
                {l.label}
              </a>
            ))}
            <div className="flex items-center gap-5 pt-4 border-t border-[color:var(--border)]">
              <Instagram size={18} />
              <MapPin size={18} />
              <ShoppingBag size={18} />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
