import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddSavings() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    bank: "",
    amount: "",
    note: "",
  });

  const handleSave = async () => {
    if (!form.bank || !form.amount) {
      alert("Fill required fields ❌");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) return;

    const res = await fetch("http://localhost:5000/api/savings/addSavingData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        bank: form.bank,
        amount: Number(form.amount),
        transactionType: "add",
        note: form.note,
      }),
    });

    if (res.ok) {
      navigate("/finance/savings");
    } else {
      alert("Failed to add savings");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow max-w-xl">
      <h1 className="text-2xl font-bold mb-6">Add Savings</h1>

      <input
        placeholder="Bank Name"
        className="w-full mb-4 border p-2 rounded"
        value={form.bank}
        onChange={(e) => setForm({ ...form, bank: e.target.value })}
      />

      <input
        type="number"
        placeholder="Amount"
        className="w-full mb-4 border p-2 rounded"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
      />

      <textarea
        placeholder="Note (optional)"
        className="w-full mb-6 border p-2 rounded"
        value={form.note}
        onChange={(e) => setForm({ ...form, note: e.target.value })}
      />

      <div className="flex gap-4">
        <button
          onClick={() => navigate("/finance/savings")}
          className="px-4 py-2 border rounded"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-5 py-2 bg-blue-600 text-white rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
}
