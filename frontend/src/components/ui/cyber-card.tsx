import * as React from "react";
import { cn } from "@/lib/utils";

interface CyberCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glow" | "gradient" | "stats";
  hover?: boolean;
}

const CyberCard = React.forwardRef<HTMLDivElement, CyberCardProps>(
  ({ className, variant = "default", hover = true, ...props }, ref) => {
    const variants = {
      default: "bg-card border border-border",
      glow: "bg-card border border-primary/20 shadow-[0_0_20px_hsl(211_100%_52%/0.1)]",
      gradient: "bg-gradient-card border border-border",
      stats: "bg-gradient-to-br from-card to-muted/30 border border-border",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl p-6 transition-all duration-300",
          variants[variant],
          hover && "card-float neon-border cursor-pointer",
          className
        )}
        {...props}
      />
    );
  }
);
CyberCard.displayName = "CyberCard";

const CyberCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 pb-4", className)}
    {...props}
  />
));
CyberCardHeader.displayName = "CyberCardHeader";

const CyberCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-lg font-semibold font-heading leading-none tracking-tight text-foreground",
      className
    )}
    {...props}
  />
));
CyberCardTitle.displayName = "CyberCardTitle";

const CyberCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CyberCardDescription.displayName = "CyberCardDescription";

const CyberCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
));
CyberCardContent.displayName = "CyberCardContent";

export {
  CyberCard,
  CyberCardHeader,
  CyberCardTitle,
  CyberCardDescription,
  CyberCardContent,
};
