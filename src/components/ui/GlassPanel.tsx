import { forwardRef, type ElementType, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type GlassPanelProps<T extends ElementType = "div"> = {
  as?: T;
  interactive?: boolean;
} & HTMLAttributes<HTMLElement>;

/**
 * GlassPanel — reusable glass surface for cards and sections.
 * Uses the shared `glass-panel` utility (border 1px, backdrop-filter, radius 10px).
 * Set `interactive` for hover elevation on clickable cards.
 */
export const GlassPanel = forwardRef<HTMLElement, GlassPanelProps>(
  ({ as, interactive = false, className, children, ...rest }, ref) => {
    const Component = (as ?? "div") as ElementType;
    return (
      <Component
        ref={ref}
        className={cn(
          "glass-panel",
          interactive && "glass-panel-hover",
          className,
        )}
        {...rest}
      >
        {children}
      </Component>
    );
  },
);

GlassPanel.displayName = "GlassPanel";
