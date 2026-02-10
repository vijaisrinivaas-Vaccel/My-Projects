import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Income() {
  const [data, setData] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIncome = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/income", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(await res.json());
    };
    fetchIncome();
  }, []);

  if (!data) return null;

  return (
    <div className="space-y-6">
      {/* TOTAL INCOME */}
      <div className="bg-white p-6 rounded-xl shadow">
        <p className="text-gray-500">Total Income</p>
        <h2 className="text-3xl font-bold">₹{data.totalIncome}</h2>
      </div>

      {/* SALARY CARD */}
      <div className="bg-white p-6 rounded-xl shadow flex justify-between">
        <div>
          <p className="text-gray-500">Monthly Salary</p>
          <h3 className="text-xl font-semibold">₹{data.salary}</h3>
        </div>
        <button
          onClick={() => navigate("/finance/income/edit-salary")}
          className="text-blue-600"
        >
          Edit
        </button>
      </div>

      {/* OTHER INCOME */}
      <div className="bg-white rounded-xl shadow border">
        <div className="flex justify-between px-6 py-4 border-b">
          <h3 className="font-semibold">Other Income</h3>
          <button
            onClick={() => navigate("/finance/income/add")}
            className="text-blue-600"
          >
            + Add
          </button>
        </div>

        {data.otherIncome.length === 0 && (
          <p className="p-6 text-gray-500">No other income yet</p>
        )}

        {data.otherIncome.map((i: any) => (
          <div
            key={i._id}
            className="flex justify-between px-6 py-3 border-b"
          >
            <span>{i.source}</span>
            <span>₹{i.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
