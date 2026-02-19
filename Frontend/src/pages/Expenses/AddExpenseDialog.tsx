import { useState,useEffect } from "react";

import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "../../components/ui/Dialog";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  editData?: any | null;
}


export default function AddExpenseDialog({
  open,
  onOpenChange,
  onSuccess,
  editData,
}: Props){

  const [form, setForm] = useState({
    subject: "",
    shopName: "",
    amount: "",
    date: "",
    category: "Travel",
    description: "",
    addToReport: true,
    file: null as File | null,
  });

  useEffect(() => {
  if (editData) {
    setForm({
      subject: editData.subject,
      shopName: editData.shopName,
      amount: editData.amount.toString(),
      date: editData.date.split("T")[0],
      category: editData.category,
      description: editData.description || "",
      addToReport: editData.addToReport ?? true,
      file: null,
    });
  } else {
    setForm({
      subject: "",
      shopName: "",
      amount: "",
      date: "",
      category: "Travel",
      description: "",
      addToReport: true,
      file: null,
    });
  }
}, [editData, open]);


  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    const formatted =
      name === "subject" || name === "shopName"
        ? value.charAt(0).toUpperCase() + value.slice(1)
        : value;

    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : formatted,
    }));
  };

  const handleSave = async () => {
    if (!form.subject || !form.shopName || !form.amount || !form.date) {
      alert("Please fill required fields ❌");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) return;

    const url = editData
      ? `http://localhost:5000/api/expenses/edit/${editData._id}`
      : "http://localhost:5000/api/expenses/addExpense";

    const method = editData ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        subject: form.subject,
        shopName: form.shopName,
        amount: Number(form.amount),
        category: form.category,
        date: form.date,
        description: form.description,
        addToReport: form.addToReport,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Failed to save expense");
      return;
    }

    onOpenChange(false);
    onSuccess?.();
  };


  return (
    <DialogRoot open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-150 max-w-full">
        <DialogHeader>
          <DialogTitle>
            {editData ? "Edit Expense" : "Add Expense"}
          </DialogTitle>

          <DialogDescription>
            {editData
              ? "Update your expense details below."
              : "Fill the details to add a new expense."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <div>
            <label className="text-sm font-medium">Subject *</label>
            <input
              name="subject"
              value={form.subject}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Merchant *</label>
            <input
              name="shopName"
              value={form.shopName}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Amount *</label>
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Date *</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Category *</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
            >
              <option>Travel</option>
              <option>Food</option>
              <option>Accommodation</option>
              <option>Office Supplies</option>
              <option>Outing</option>
              <option>Games</option>
              <option>Entertainment</option>
              <option>Donations</option>
              <option>Health</option>
              <option>Education</option>
              <option>Other</option>
            </select>
          </div>

          <div className="flex items-center gap-2 mt-6">
            <input
              type="checkbox"
              name="addToReport"
              checked={form.addToReport}
              onChange={handleChange}
            />
            <span className="text-sm">Add to report</span>
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <button className="px-4 py-2 border rounded">
              Cancel
            </button>
          </DialogClose>

          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-600 text-white rounded"
          >
            {editData ? "Update" : "Save"}
          </button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}
