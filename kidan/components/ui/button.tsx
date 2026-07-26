import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-lg font-mono text-sm font-bold uppercase tracking-wider transition-all duration-300 ease-out-expo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kidan-lightIndigo focus-visible:ring-offset-2 focus-visible:ring-offset-kidan-ink disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-kidan-indigo text-white shadow-[0_8px_24px_-8px_rgba(58,79,214,0.6)] hover:bg-kidan-lightIndigo hover:shadow-[0_12px_32px_-8px_rgba(102,117,234,0.7)] hover:-translate-y-0.5 active:translate-y-0",
        outline:
          "border border-kidan-navymid bg-transparent text-kidan-ivory hover:border-kidan-indigo/60 hover:bg-kidan-indigo/10",
        ghost: "text-kidan-silver hover:bg-kidan-navymid/50 hover:text-kidan-ivory",
        link: "text-kidan-lightIndigo underline-offset-4 hover:text-kidan-ivory hover:underline",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4 text-xs",
        lg: "h-13 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
