import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface SavingsTransaction {
  _id: string;
  amount: number;
  transactionType: "add" | "withdraw";
  date: string;
}

export default function Savings() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<SavingsTransaction[]>([]);

  useEffect(() => {
    const fetchSavings = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch("http://localhost:5000/api/savings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setTransactions(await res.json());
      }
    };

    fetchSavings();
  }, []);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Savings History</h1>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/finance/savings/add")}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Add
          </button>
          <button
            onClick={() => navigate("/finance/savings/withdraw")}
            className="border px-4 py-2 rounded"
          >
            Withdraw
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow border overflow-hidden">
        <div className="grid grid-cols-4 px-6 py-4 text-sm font-semibold text-gray-500 border-b">
          <div>Date</div>
          <div>Type</div>
          <div>Amount</div>
          <div>Status</div>
        </div>

        {transactions.length === 0 && (
          <div className="px-6 py-10 text-center text-gray-500">
            No savings transactions yet
          </div>
        )}

        {transactions.map((t) => (
          <div
            key={t._id}
            className="grid grid-cols-4 px-6 py-4 border-b text-sm"
          >
            <div>{new Date(t.date).toLocaleDateString()}</div>
            <div
              className={`font-medium ${
                t.transactionType === "add"
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {t.transactionType === "add" ? "Added" : "Withdrawn"}
            </div>
            <div>₹{t.amount}</div>
            <div className="text-gray-500">Completed</div>
          </div>
        ))}
      </div>
    </div>
  );
}
