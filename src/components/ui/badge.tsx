// components/ui/badge.tsx
import { cn } from "@/lib/utils";
import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline";
}

export const Badge = ({ className, variant = "default", ...props }: BadgeProps) => {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        variant === "default" && "bg-primary text-white",
        variant === "secondary" && "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100",
        variant === "outline" && "border border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-200",
        className
      )}
      {...props}
    />
  );
};
