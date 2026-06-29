import { cn } from "@/lib/utils";

type BrandWordmarkProps = {
  className?: string;
};

/** "FORTUNE" wordmark with the accented U — used in nav, footer, and auth screens. */
export function BrandWordmark({ className }: BrandWordmarkProps) {
  return (
    <span className={cn("text-display", className)}>
      FORT<span className="text-primary">U</span>NE
    </span>
  );
}
