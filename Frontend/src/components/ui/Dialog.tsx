import * as Dialog from "@radix-ui/react-dialog";
import React from "react";

interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export function DialogRoot({ open, onOpenChange, children }: DialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </Dialog.Root>
  );
}

export function DialogTrigger({ children, ...rest }: any) {
  return <Dialog.Trigger {...rest}>{children}</Dialog.Trigger>;
}

export function DialogContent({ children, ...rest }: any) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/10 backdrop-blur-sm transition-all" />
      <Dialog.Content
        {...rest}
        className="fixed left-1/2 top-1/2 w-200 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg"
      >
        {children}
        <Dialog.Close className="absolute right-4 top-4 text-gray-500 hover:text-gray-700">
          ✕
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  );
}

export function DialogHeader({ children }: any) {
  return <div className="mb-4">{children}</div>;
}

export function DialogTitle(props: any) {
  return (
    <Dialog.Title className="text-xl font-semibold text-gray-900" {...props} />
  );
}

export function DialogDescription(props: any) {
  return (
    <Dialog.Description className="text-sm text-gray-600" {...props} />
  );
}

export function DialogFooter({ children }: any) {
  return <div className="mt-6 flex justify-end gap-2">{children}</div>;
}

export function DialogClose({ children, ...rest }: any) {
  return <Dialog.Close {...rest}>{children}</Dialog.Close>;
}
