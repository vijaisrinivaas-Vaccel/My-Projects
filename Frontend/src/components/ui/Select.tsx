import * as SelectPrimitive from "@radix-ui/react-select";
import React from "react";

interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}

export function Select({ value, onValueChange, children }: SelectProps) {
  return (
    <SelectPrimitive.Root value={value} onValueChange={onValueChange}>
      {children}
    </SelectPrimitive.Root>
  );
}

export function SelectTrigger({ children, ...rest }: any) {
  return (
    <SelectPrimitive.Trigger
      {...rest}
      className="flex items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm hover:border-gray-400"
    >
      <SelectPrimitive.Value>{children}</SelectPrimitive.Value>
      <SelectPrimitive.Icon />
    </SelectPrimitive.Trigger>
  );
}

export function SelectContent({ children, ...rest }: any) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        {...rest}
        className="overflow-hidden rounded-md border border-gray-200 bg-white shadow-md"
      >
        <SelectPrimitive.Viewport className="p-1">
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

export function SelectItem({ children, value, ...rest }: any) {
  return (
    <SelectPrimitive.Item
      value={value}
      {...rest}
      className="relative flex cursor-pointer items-center rounded px-8 py-2 text-sm hover:bg-blue-100 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white"
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

export function SelectGroup({ children, ...rest }: any) {
  return <SelectPrimitive.Group {...rest}>{children}</SelectPrimitive.Group>;
}

export function SelectLabel({ children, ...rest }: any) {
  return (
    <SelectPrimitive.Label
      {...rest}
      className="px-8 py-1.5 text-xs font-semibold text-gray-600"
    >
      {children}
    </SelectPrimitive.Label>
  );
}

export function SelectSeparator() {
  return (
    <SelectPrimitive.Separator className="mx-1 my-1 border-t border-gray-200" />
  );
}
