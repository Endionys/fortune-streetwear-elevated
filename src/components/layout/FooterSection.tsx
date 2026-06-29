import { Instagram, MapPin, Mail } from "lucide-react";
import { brand } from "@/data/brand";
import { footerNavigationLinks } from "@/data/navigation";
import { BrandWordmark } from "@/components/ui/BrandWordmark";

export function FooterSection() {
  return (
    <footer id="contato" className="border-t border-[color:var(--border)] bg-background">
      <div className="container-x py-16">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <BrandWordmark className="text-5xl md:text-6xl" />
            <p className="mt-4 text-text-muted max-w-sm">{brand.description}</p>
          </div>

          <div className="md:col-span-3">
            <p className="text-eyebrow mb-5">Navegue</p>
            <ul className="space-y-3 text-text-muted">
              {footerNavigationLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="hover:text-text transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="text-eyebrow mb-5">Contato</p>
            <ul className="space-y-3 text-text-muted">
              <li className="flex items-center gap-3">
                <Mail size={16} /> {brand.contact.email}
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={16} /> {brand.contact.location}
              </li>
              <li className="flex items-center gap-3">
                <Instagram size={16} /> {brand.contact.instagram}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-10 border-t border-[color:var(--border)]">
          <div className="text-display text-[clamp(4rem,18vw,16rem)] leading-[0.85] text-text">
            FORTUNE<span className="text-primary">.</span>
          </div>
          <div className="mt-8 flex flex-col md:flex-row justify-between gap-4 text-xs text-text-muted uppercase tracking-[0.2em]">
            <span>{brand.copyright}</span>
            <span>{brand.tagline}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
