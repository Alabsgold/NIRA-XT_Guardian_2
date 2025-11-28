import * as React from "react";
import { cn } from "@/lib/utils";

interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: "active" | "warning" | "danger" | "success" | "muted";
  pulse?: boolean;
}

const StatusBadge = React.forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({ className, status, pulse = false, children, ...props }, ref) => {
    const statusStyles = {
      active: "bg-primary/20 text-primary border-primary/30",
      success: "bg-success/20 text-success border-success/30",
      warning: "bg-warning/20 text-warning border-warning/30",
      danger: "bg-destructive/20 text-destructive border-destructive/30",
      muted: "bg-muted text-muted-foreground border-border",
    };

    const dotColors = {
      active: "bg-primary",
      success: "bg-success",
      warning: "bg-warning",
      danger: "bg-destructive",
      muted: "bg-muted-foreground",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border",
          statusStyles[status],
          className
        )}
        {...props}
      >
        <span
          className={cn(
            "w-2 h-2 rounded-full",
            dotColors[status],
            pulse && "animate-pulse"
          )}
        />
        {children}
      </span>
    );
  }
);
StatusBadge.displayName = "StatusBadge";

export { StatusBadge };
