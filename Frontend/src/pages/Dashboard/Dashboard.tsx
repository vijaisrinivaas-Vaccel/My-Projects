import { useEffect, useState } from "react";
import SavingsChart from "../../components/Charts/SavingsChart";
import { buildSavingsChart } from "../../Utils/SavingsUtils";


interface SavingsTransaction {
  amount: number;
  transactionType: "add" | "withdraw";
  date: string;
}

export default function Dashboard() {
  const [transactions, setTransactions] = useState<SavingsTransaction[]>([]);

    const [totalIncome, setTotalIncome] = useState<number>(0);

  useEffect(() => {
    const fetchIncome = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/income", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setTotalIncome(data.totalIncome);
      }
    };

    fetchIncome();
  }, []);

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

  const chartData = buildSavingsChart(transactions);

  const totalSavings =
    chartData.length > 0 ? chartData[chartData.length - 1].balance : 0;

  const totalWithdrawn = transactions
    .filter((t) => t.transactionType === "withdraw")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* TOTAL INCOME */}
      <div className="bg-white p-6 rounded-xl shadow">
        <p className="text-gray-500">Total Income</p>
        <h2 className="text-3xl font-bold">₹{totalIncome}</h2>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Total Savings</p>
          <h2 className="text-2xl font-bold">₹{totalSavings}</h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Total Withdrawn</p>
          <h2 className="text-2xl font-bold text-red-500">
            ₹{totalWithdrawn}
          </h2>
        </div>
      </div>

      {/* CHART */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Savings Trend</h2>
        <SavingsChart data={chartData} />
      </div>
    </div>
  );
}
