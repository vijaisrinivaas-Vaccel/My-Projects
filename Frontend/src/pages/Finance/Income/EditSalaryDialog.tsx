import { useState } from "react";
import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "../../../components/ui/Dialog";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export default function EditSalaryDialog({
  open,
  onOpenChange,
  onSuccess,
}: Props) {
  const [salary, setSalary] = useState("");

  const handleSave = async () => {
    if (!salary) {
      alert("Enter salary");
      return;
    }

    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/income/salary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ salary: Number(salary) }),
    });

    if (res.ok) {
      setSalary("");
      onOpenChange(false);
      onSuccess?.(); // optional refresh
    } else {
      alert("Failed to update salary");
    }
  };

  return (
    <DialogRoot open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-105 rounded-xl">
        <DialogHeader>
          <DialogTitle>Edit Monthly Salary</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <input
            type="number"
            placeholder="Monthly Salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <button className="px-4 py-2 border rounded-lg">
              Cancel
            </button>
          </DialogClose>

          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save
          </button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}
