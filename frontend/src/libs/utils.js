// This file exports a utility function `cn` that merges CSS classes.
// It's particularly useful for combining default classes with conditional classes in React components,
// especially when using Tailwind CSS.

// You'll need to install two small libraries for this to work:
// npm install clsx tailwind-merge

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * A utility function to conditionally join class names together,
 * and merge Tailwind CSS classes without style conflicts.
 * @param {...any} inputs - A list of class names. Can be strings, objects, or arrays.
 * @returns {string} The merged and optimized class name string.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
