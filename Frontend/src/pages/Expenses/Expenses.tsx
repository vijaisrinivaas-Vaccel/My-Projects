import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Expense {
  _id: string;
  subject: string;
  shopName: string;
  amount: number;
  category: string;
  date: string;
}

export default function Expenses() {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpenses = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch("http://localhost:5000/api/expenses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setExpenses(data);
      }

      setLoading(false);
    };

    fetchExpenses();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Expenses</h1>

        <button
          onClick={() => navigate("/expenses/add")}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Add Expense
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow border overflow-hidden">
        {/* Header row */}
        <div className="grid grid-cols-6 gap-4 px-6 py-4 text-sm font-semibold text-gray-500 border-b">
          <div>Details</div>
          <div>Shop Name</div>
          <div>Amount</div>
          <div>Date</div>
          <div>Category</div>
          <div>Status</div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="px-6 py-10 text-center text-gray-500">
            Loading expenses...
          </div>
        )}

        {/* Empty */}
        {!loading && expenses.length === 0 && (
          <div className="px-6 py-10 text-center text-gray-500">
            No expenses yet
          </div>
        )}

        {/* Rows */}
        {expenses.map((expense) => (
          <div
            key={expense._id}
            className="grid grid-cols-6 gap-4 px-6 py-4 border-b text-sm"
          >
            <div className="font-medium">{expense.subject}</div>
            <div>{expense.shopName}</div>
            <div>₹{expense.amount}</div>
            <div>{new Date(expense.date).toLocaleDateString()}</div>
            <div>{expense.category}</div>
            <div className="text-green-600 font-semibold">Saved</div>
          </div>
        ))}
      </div>
    </div>
  );
}
