import { useEffect, useState } from "react";
import { X, Sparkles } from "lucide-react";

const STORAGE_KEY = "fortune:first-purchase-alert-dismissed";
const PROMO_CODE = "FORTUNE10";

export function FirstPurchaseDiscountAlert() {
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const dismissed = window.localStorage.getItem(STORAGE_KEY);
    if (!dismissed) setVisible(true);
  }, []);

  if (!visible) return null;

  const handleDismiss = () => {
    setVisible(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(PROMO_CODE);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  };

  return (
    <div
      role="region"
      aria-label="Oferta de primeira compra"
      className="relative z-[60] w-full bg-primary text-background"
    >
      <div className="container-x flex items-center justify-between gap-3 py-2.5 text-[11px] md:text-xs">
        <div className="flex items-center gap-2 min-w-0">
          <Sparkles size={14} className="shrink-0" aria-hidden />
          <p className="truncate font-mono uppercase tracking-[0.2em]">
            <span className="font-semibold">10% OFF</span>
            <span className="hidden sm:inline"> na primeira compra —</span>
            <span className="sm:hidden"> —</span> use o código{" "}
            <button
              type="button"
              onClick={handleCopy}
              className="underline underline-offset-4 decoration-background/50 hover:decoration-background transition-colors"
              aria-label={`Copiar código ${PROMO_CODE}`}
            >
              {copied ? "COPIADO!" : PROMO_CODE}
            </button>
          </p>
        </div>
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Fechar aviso"
          className="shrink-0 grid place-items-center h-6 w-6 hover:bg-background/10 transition-colors"
        >
          <X size={14} aria-hidden />
        </button>
      </div>
    </div>
  );
}
