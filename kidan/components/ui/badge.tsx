import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-widest transition-colors",
  {
    variants: {
      variant: {
        default: "border-kidan-indigo/40 bg-kidan-indigo/10 text-kidan-lightIndigo",
        secondary: "border-kidan-navymid bg-kidan-card text-kidan-silver",
        outline: "border-kidan-graphite/60 bg-transparent text-kidan-slate",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
