/**
 * Fixed brand texture layered above section backgrounds but below the
 * navigation and interactive content. Uses low-opacity type + mix-blend
 * so it reads as ambient noise rather than foreground copy.
 */
export function BrandTextureBackdrop() {
  const diagonalPhrase = "não tenta entender, só usa";
  const verticalPhrase = "just wear it";

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[40] overflow-hidden select-none mix-blend-overlay"
      style={{ width: "100vw", height: "100vh" }}
    >
      {/* Diagonal band — spans the whole viewport */}
      <div className="absolute inset-0 hidden sm:block">
        <div
          className="absolute left-1/2 top-1/2 w-[240vmax]"
          style={{ transform: "translate(-50%, -50%) rotate(-18deg)" }}
        >
          <div className="brand-marquee-x flex whitespace-nowrap text-display text-[9vw] leading-none text-[color:var(--primary)]/[0.10]">
            {Array.from({ length: 2 }).map((_, loop) => (
              <div key={loop} className="flex shrink-0 items-center">
                {Array.from({ length: 8 }).map((_, i) => (
                  <span key={i} className="tracking-[0.08em] pr-16">
                    {diagonalPhrase}
                    <span className="mx-8 text-text/[0.10]">✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Vertical band pinned to the right edge, full viewport height */}
      <div className="absolute right-0 top-0 h-screen w-14 md:w-16 overflow-hidden">
        <div
          className="absolute left-1/2 top-0 h-full -translate-x-1/2"
          style={{ writingMode: "vertical-rl", transform: "translateX(-50%) rotate(180deg)" }}
        >
          <div className="brand-marquee-y flex flex-col whitespace-nowrap text-display text-2xl md:text-3xl text-text/[0.12]">
            {Array.from({ length: 2 }).map((_, loop) => (
              <div key={loop} className="flex flex-col shrink-0">
                {Array.from({ length: 12 }).map((_, i) => (
                  <span key={i} className="tracking-[0.35em] uppercase pb-12">
                    {verticalPhrase} —
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
