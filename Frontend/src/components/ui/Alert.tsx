import React from "react";

interface AlertProps {
  variant?: "default" | "destructive" | "success" | "warning";
  children: React.ReactNode;
  className?: string;
}

export function Alert({ variant = "default", children, className = "" }: AlertProps) {
  const baseClasses = "px-4 py-3 rounded-md border";
  
  const variantClasses = {
    default: "border-blue-200 bg-blue-50 text-blue-900",
    destructive: "border-red-200 bg-red-50 text-red-900",
    success: "border-green-200 bg-green-50 text-green-900",
    warning: "border-yellow-200 bg-yellow-50 text-yellow-900",
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
}

export function AlertTitle({ children }: any) {
  return <h5 className="font-semibold">{children}</h5>;
}

export function AlertDescription({ children }: any) {
  return <p className="text-sm">{children}</p>;
}
