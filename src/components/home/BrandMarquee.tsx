import { marqueePhrases } from "@/data/brand";

export function BrandMarquee() {
  return (
    <div className="mt-24 overflow-hidden border-y border-[color:var(--border)] py-5">
      <div className="marquee-track flex whitespace-nowrap text-display text-3xl md:text-5xl gap-12">
        {Array.from({ length: 2 }).map((_, loopIndex) => (
          <div key={loopIndex} className="flex shrink-0 items-center gap-12">
            {marqueePhrases.map((phrase, phraseIndex) => (
              <span
                key={phraseIndex}
                className={phraseIndex % 4 === 0 ? "text-text" : "text-text-muted/40"}
              >
                {phrase}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
