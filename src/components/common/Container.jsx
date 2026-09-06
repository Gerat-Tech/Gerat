import React from "react";

/**
 * Standardized responsive container (Spec §5)
 * Snaps content to 12-col desktop, 8-col tablet, 4-col mobile grids
 */
export default function Container({
  children,
  className = "",
  as: Component = "div",
  clean = false,
  ...props
}) {
  return (
    <Component
      className={`w-full max-w-[1440px] mx-auto ${
        clean ? "" : "px-4 sm:px-6 md:px-8 lg:px-10"
      } ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
