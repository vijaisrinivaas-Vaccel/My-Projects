import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "../../../components/ui/Dialog";
import { Button } from "../../../components/ui/Button";

interface ConfirmCreditedDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  disabled?: boolean;
}

export default function ConfirmCreditedDialog({
  open,
  onOpenChange,
  onConfirm,
  disabled = false,
}: ConfirmCreditedDialogProps) {
  return (
    <DialogRoot open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Salary Credit</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-gray-600 mt-2">
          Confirm that this monthly income has been credited?
        </p>

        <DialogFooter>
          <DialogClose asChild>
            <button className="px-4 py-2 border rounded">
              Cancel
            </button>
          </DialogClose>

          <Button disabled={disabled} onClick={onConfirm}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}
