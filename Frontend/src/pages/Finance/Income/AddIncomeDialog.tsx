import { useState, useEffect } from "react";
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
  editData?: {
    _id: string;
    source: string;
    amount: number;
  } | null;
}

export default function AddIncomeDialog({
  open,
  onOpenChange,
  onSuccess,
  editData,
}: Props) {
  const [source, setSource] = useState("");
  const [amount, setAmount] = useState("");

  // 🔹 Prefill when editing
  useEffect(() => {
    if (editData) {
      setSource(editData.source);
      setAmount(editData.amount.toString());
    } else {
      setSource("");
      setAmount("");
    }
  }, [editData, open]);

  const handleSubmit = async () => {
    if (!source || !amount) {
      alert("Fill all fields");
      return;
    }

    const token = localStorage.getItem("token");

    const url = editData
      ? `http://localhost:5000/api/income/update/${editData._id}`
      : "http://localhost:5000/api/income/add";

    const method = editData ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        source,
        amount: Number(amount),
      }),
    });

    if (res.ok) {
      onOpenChange(false);
      onSuccess?.();
    } else {
      alert(editData ? "Failed to update income" : "Failed to add income");
    }
  };

  return (
    <DialogRoot open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-105 rounded-xl">
        <DialogHeader>
          <DialogTitle>
            {editData ? "Edit Income" : "Add Income"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <input
            placeholder="Income Source (Business, Freelance...)"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
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
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {editData ? "Update Income" : "Add Income"}
          </button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}
