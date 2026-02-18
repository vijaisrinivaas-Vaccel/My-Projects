import * as PopoverPrimitive from "@radix-ui/react-popover";
import React from "react";

interface PopoverProps {
  children: React.ReactNode;
}

export function Popover({ children }: PopoverProps) {
  return <PopoverPrimitive.Root>{children}</PopoverPrimitive.Root>;
}

export function PopoverTrigger({ children, ...rest }: any) {
  return (
    <PopoverPrimitive.Trigger {...rest} className="cursor-pointer">
      {children}
    </PopoverPrimitive.Trigger>
  );
}

export function PopoverContent({ children, ...rest }: any) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        {...rest}
        className="min-w-[200px] rounded-md border border-gray-200 bg-white p-4 shadow-md"
      >
        {children}
        <PopoverPrimitive.Arrow className="fill-white" />
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  );
}
