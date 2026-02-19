import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import React from "react";

interface DropdownProps {
  children: React.ReactNode;
}

export function DropdownRoot({ children }: DropdownProps) {
  return <DropdownMenu.Root>{children}</DropdownMenu.Root>;
}

export function DropdownTrigger({ children, ...rest }: any) {
  return (
    <DropdownMenu.Trigger {...rest} className="cursor-pointer">
      {children}
    </DropdownMenu.Trigger>
  );
}

export function DropdownContent({ children, ...rest }: any) {
  return (
    <DropdownMenu.Portal>
      <DropdownMenu.Content
        {...rest}
        className="min-w-50 rounded-md border border-gray-200 bg-white shadow-md"
      >
        {children}
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  );
}

export function DropdownItem({ children, ...rest }: any) {
  return (
    <DropdownMenu.Item
      {...rest}
      className="px-4 py-2 text-sm hover:bg-blue-100 cursor-pointer"
    >
      {children}
    </DropdownMenu.Item>
  );
}

export function DropdownSeparator() {
  return <DropdownMenu.Separator className="my-1 border-t border-gray-200" />;
}

export function DropdownLabel({ children, ...rest }: any) {
  return (
    <DropdownMenu.Label {...rest} className="px-4 py-2 text-xs font-semibold text-gray-600">
      {children}
    </DropdownMenu.Label>
  );
}
