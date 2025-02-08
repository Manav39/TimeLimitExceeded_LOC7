import React from 'react';

function Badge({ children, variant = "default", className = "", ...props }) {
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/80",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    outline: "border border-input",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/80",
  };

  const classes = `inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${variants[variant]} ${className}`;

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
}

export default Badge;

