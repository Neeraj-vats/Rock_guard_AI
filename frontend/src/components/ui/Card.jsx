// src/components/ui/Card.jsx
import React from "react";
import clsx from "clsx";

const Card = ({ className, children }) => {
  return (
    <div
      className={clsx(
        "rounded-xl border bg-white shadow-sm transition hover:shadow-md",
        className
      )}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ className, children }) => {
  return (
    <div className={clsx("p-4 border-b", className)}>
      {children}
    </div>
  );
};

const CardTitle = ({ className, children }) => {
  return (
    <h3 className={clsx("text-lg font-semibold leading-none", className)}>
      {children}
    </h3>
  );
};

const CardDescription = ({ className, children }) => {
  return (
    <p className={clsx("text-sm text-gray-500 mt-1", className)}>{children}</p>
  );
};

const CardContent = ({ className, children }) => {
  return (
    <div className={clsx("p-4", className)}>
      {children}
    </div>
  );
};

const CardFooter = ({ className, children }) => {
  return (
    <div className={clsx("p-4 border-t", className)}>
      {children}
    </div>
  );
};

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
