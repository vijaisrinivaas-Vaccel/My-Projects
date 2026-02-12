import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";

export default function Income() {
  const [data, setData] = useState<any>(null);
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  const salaryCredited = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:5000/api/income/salarycredited", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setData(await res.json()); 
  }
      
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
        <div className="flex flex-col gap-3 ">
          <Button onClick={() => setShowConfirm(true)}>
            Credited
          </Button>
          <Button onClick={() => navigate("/finance/income/edit-salary")}>
            Edit
          </Button>
          
        </div>
        
      </div>

      {showConfirm && (
        <div className="bg-white border rounded-lg shadow p-4 max-w-sm bg-centered mx-auto ">
          <p className="text-sm text-gray-700 mb-4">
            Confirm that this month’s salary has been credited?
          </p>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowConfirm(false)}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>

            <Button
              onClick={() => {
                salaryCredited();
                setShowConfirm(false);
              }}
            >
              Confirm
            </Button>
          </div>
        </div>
      )}


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
