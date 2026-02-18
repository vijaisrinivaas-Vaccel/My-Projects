import * as TabsPrimitive from "@radix-ui/react-tabs";
import React from "react";

interface TabsProps {
  defaultValue: string;
  children: React.ReactNode;
  className?: string;
}

export function Tabs({ defaultValue, children, className = "" }: TabsProps) {
  return (
    <TabsPrimitive.Root defaultValue={defaultValue} className={className}>
      {children}
    </TabsPrimitive.Root>
  );
}

export function TabsList({ children, ...rest }: any) {
  return (
    <TabsPrimitive.List
      {...rest}
      className="flex border-b border-gray-200"
    >
      {children}
    </TabsPrimitive.List>
  );
}

export function TabsTrigger({ children, value, ...rest }: any) {
  return (
    <TabsPrimitive.Trigger
      value={value}
      {...rest}
      className="px-4 py-2 font-medium text-gray-600 hover:text-gray-900 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600"
    >
      {children}
    </TabsPrimitive.Trigger>
  );
}

export function TabsContent({ children, value, ...rest }: any) {
  return (
    <TabsPrimitive.Content value={value} {...rest} className="py-4">
      {children}
    </TabsPrimitive.Content>
  );
}
