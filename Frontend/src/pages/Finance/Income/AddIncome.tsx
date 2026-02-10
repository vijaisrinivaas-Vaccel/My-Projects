import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddIncome() {
  const [source, setSource] = useState("");
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();

  const handleAdd = async () => {
    if (!source || !amount) {
      alert("Fill all fields");
      return;
    }

    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/income/add", {
      method: "POST",
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
      navigate("/finance/income");
    } else {
      alert("Failed to add income");
    }
  };

  return (
    <div className="max-w-md bg-white p-6 rounded-xl shadow space-y-4">
      <h2 className="text-xl font-semibold">Add Income</h2>

      <input
        placeholder="Income Source (Business, Freelance...)"
        value={source}
        onChange={(e) => setSource(e.target.value)}
        className="w-full border rounded px-3 py-2"
      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full border rounded px-3 py-2"
      />

      <div className="flex justify-end gap-3">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 border rounded"
        >
          Cancel
        </button>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Add
        </button>
      </div>
    </div>
  );
}
