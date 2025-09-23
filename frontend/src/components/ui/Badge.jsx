// src/components/ui/Badge.jsx
import React from "react";
import clsx from "clsx";

const Badge = ({ children, variant = "default", className }) => {
  const baseStyle =
    "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium transition-colors";

  const variants = {
    default: "bg-primary text-primary-foreground",
    outline: "border border-input bg-transparent text-foreground",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    destructive: "bg-red-100 text-red-800",
  };
  
  return (
    <span className={clsx(baseStyle, variants[variant], className)}>
      {children}
    </span>
  );
};

export { Badge };
