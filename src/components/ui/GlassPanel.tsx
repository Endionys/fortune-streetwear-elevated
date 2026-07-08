import { forwardRef, createElement, type ElementType, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type GlassPanelProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  interactive?: boolean;
};

/**
 * GlassPanel — reusable glass surface for cards and sections.
 * Uses the shared `glass-panel` utility (border 1px, backdrop-filter, radius 10px).
 * Set `interactive` for hover elevation on clickable cards.
 */
export const GlassPanel = forwardRef<HTMLElement, GlassPanelProps>(
  ({ as = "div", interactive = false, className, children, ...rest }, ref) => {
    return createElement(
      as,
      {
        ref,
        className: cn("glass-panel", interactive && "glass-panel-hover", className),
        ...rest,
      },
      children,
    );
  },
);

GlassPanel.displayName = "GlassPanel";
