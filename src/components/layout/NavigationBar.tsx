import { useEffect, useState } from "react";
import { Instagram, MapPin, ShoppingBag, Menu, X } from "lucide-react";
import { navigationLinks } from "@/data/navigation";
import { BrandWordmark } from "@/components/ui/BrandWordmark";

export function NavigationBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const leftLinks = navigationLinks.slice(0, 2);
  const rightLinks = navigationLinks.slice(2);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "backdrop-blur-xl bg-[color:var(--background)]/70 border-b border-[color:var(--border)]"
          : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between md:h-20">
        <nav className="hidden md:flex items-center gap-8 text-sm flex-1">
          {leftLinks.map((link) => (
            <NavigationLinkItem key={link.href} {...link} />
          ))}
        </nav>

        <a href="/" className="flex-1 md:flex-none text-center">
          <BrandWordmark className="text-2xl md:text-3xl tracking-[0.05em]" />
        </a>

        <div className="hidden md:flex items-center justify-end gap-8 text-sm flex-1">
          {rightLinks.map((link) => (
            <NavigationLinkItem key={link.href} {...link} />
          ))}
          <div className="flex items-center gap-4 pl-6 border-l border-[color:var(--border)]">
            <a href="#" aria-label="Instagram" className="text-text-muted hover:text-primary transition-colors">
              <Instagram size={18} />
            </a>
            <a href="#" aria-label="Lojas" className="text-text-muted hover:text-primary transition-colors">
              <MapPin size={18} />
            </a>
            <a
              href="#"
              aria-label="Carrinho"
              className="relative text-text-muted hover:text-primary transition-colors"
            >
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
          onClick={() => setIsMobileOpen((open) => !open)}
        >
          {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {isMobileOpen && (
        <div className="md:hidden border-t border-[color:var(--border)] bg-background/95 backdrop-blur-xl">
          <nav className="container-x py-6 flex flex-col gap-5">
            {navigationLinks.map((link) => (
              <a
                key={link.href}
                onClick={() => setIsMobileOpen(false)}
                href={link.href}
                className="text-text uppercase tracking-[0.2em] text-sm"
              >
                {link.label}
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

function NavigationLinkItem({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      className="text-text-muted hover:text-text transition-colors uppercase tracking-[0.18em] text-[11px]"
    >
      {label}
    </a>
  );
}
