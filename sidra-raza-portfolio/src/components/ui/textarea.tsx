"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-text-muted mb-2"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          className={cn(
            "w-full px-4 py-3 bg-surface border border-border rounded-lg",
            "text-foreground placeholder:text-text-dim",
            "transition-all duration-200 resize-none",
            "focus:outline-none focus:border-primary focus:shadow-[0_0_10px_var(--primary-muted)]",
            error && "border-error focus:border-error",
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-error">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
