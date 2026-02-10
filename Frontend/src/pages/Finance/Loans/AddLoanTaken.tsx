import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddLoanTaken() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    personOrBank: "",
    amount: "",
    interest: "",
  });

  const handleSave = async () => {
    const token = localStorage.getItem("token");

    await fetch("http://localhost:5000/api/finance/loans", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...form,
        amount: Number(form.amount),
        interest: Number(form.interest),
        type: "taken",
      }),
    });

    navigate("/finance/loans-taken");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow max-w-lg">
      <h2 className="text-2xl font-bold mb-4">+ New Loan Taken</h2>

      <input
        placeholder="Bank / Person"
        className="w-full border p-2 mb-4"
        onChange={(e) =>
          setForm({ ...form, personOrBank: e.target.value })
        }
      />

      <input
        type="number"
        placeholder="Amount"
        className="w-full border p-2 mb-4"
        onChange={(e) =>
          setForm({ ...form, amount: e.target.value })
        }
      />

      <input
        type="number"
        placeholder="Interest %"
        className="w-full border p-2 mb-4"
        onChange={(e) =>
          setForm({ ...form, interest: e.target.value })
        }
      />

      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Save
      </button>
    </div>
  );
}
