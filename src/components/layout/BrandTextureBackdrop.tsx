/**
 * Fixed, low-opacity brand texture that lives behind every page.
 * - Diagonal marquee across the viewport ("não tenta entender, só usa")
 * - Vertical marquee pinned to the right edge ("just wear it")
 * Pure CSS animation, respects prefers-reduced-motion, tuned down on mobile.
 */
export function BrandTextureBackdrop() {
  const diagonalPhrase = "não tenta entender, só usa";
  const verticalPhrase = "just wear it";

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden select-none mix-blend-screen"
    >

      {/* Diagonal band */}
      <div className="absolute inset-0 hidden sm:flex items-center justify-center">
        <div
          className="absolute left-1/2 top-1/2 w-[220vmax] -translate-x-1/2 -translate-y-1/2 overflow-hidden"
          style={{ transform: "translate(-50%, -50%) rotate(-18deg)" }}
        >
          <div className="brand-marquee-x flex whitespace-nowrap gap-16 text-display text-[9vw] leading-none text-[color:var(--primary)]/[0.07]">
            {Array.from({ length: 2 }).map((_, loop) => (
              <div key={loop} className="flex shrink-0 items-center gap-16">
                {Array.from({ length: 6 }).map((_, i) => (
                  <span key={i} className="tracking-[0.08em]">
                    {diagonalPhrase}
                    <span className="mx-8 text-text/[0.08]">✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Vertical band pinned to the right edge */}
      <div className="absolute right-0 top-0 h-full w-[3.5rem] md:w-16 overflow-hidden">
        <div
          className="absolute left-1/2 top-0 h-full origin-center"
          style={{ transform: "translateX(-50%) rotate(180deg)", writingMode: "vertical-rl" }}
        >
          <div className="brand-marquee-y flex flex-col whitespace-nowrap gap-12 text-display text-2xl md:text-3xl text-text/[0.08]">
            {Array.from({ length: 2 }).map((_, loop) => (
              <div key={loop} className="flex flex-col gap-12">
                {Array.from({ length: 8 }).map((_, i) => (
                  <span key={i} className="tracking-[0.35em] uppercase">
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
