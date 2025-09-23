import React from "react";
import clsx from "clsx";

const Card = ({ className, children }) => {
  return (
    <div
      className={clsx(
        // lighter than section background
        "rounded-xl border border-gray-600 bg-gray-700 text-white shadow-md transition hover:shadow-lg cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ className, children }) => {
  return (
    <div className={clsx("p-4 border-b border-gray-600", className)}>
      {children}
    </div>
  );
};

const CardTitle = ({ className, children }) => {
  return (
    <h3
      className={clsx(
        "text-lg font-semibold leading-none tracking-tight",
        className
      )}
    >
      {children}
    </h3>
  );
};

const CardDescription = ({ className, children }) => {
  return (
    <p className={clsx("text-sm text-gray-300 mt-1", className)}>{children}</p>
  );
};

const CardContent = ({ className, children }) => {
  return <div className={clsx("p-4", className)}>{children}</div>;
};

const CardFooter = ({ className, children }) => {
  return (
    <div className={clsx("p-4 border-t border-gray-600", className)}>
      {children}
    </div>
  );
};

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};
