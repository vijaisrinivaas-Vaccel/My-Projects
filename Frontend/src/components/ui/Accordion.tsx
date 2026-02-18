import * as AccordionPrimitive from "@radix-ui/react-accordion";
import React from "react";

interface AccordionProps {
  type?: "single" | "multiple";
  collapsible?: boolean;
  children: React.ReactNode;
}

export function Accordion({ type = "single", collapsible = true, children }: AccordionProps) {
  return (
    <AccordionPrimitive.Root type={type as any} collapsible={collapsible}>
      {children}
    </AccordionPrimitive.Root>
  );
}

export function AccordionItem({ children, value, ...rest }: any) {
  return (
    <AccordionPrimitive.Item value={value} {...rest} className="border-b">
      {children}
    </AccordionPrimitive.Item>
  );
}

export function AccordionTrigger({ children, ...rest }: any) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        {...rest}
        className="flex flex-1 items-center justify-between py-3 px-4 text-sm font-medium hover:bg-gray-100"
      >
        {children}
        <span className="text-lg">▶</span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function AccordionContent({ children, ...rest }: any) {
  return (
    <AccordionPrimitive.Content
      {...rest}
      className="overflow-hidden px-4 py-2 text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    >
      {children}
    </AccordionPrimitive.Content>
  );
}
