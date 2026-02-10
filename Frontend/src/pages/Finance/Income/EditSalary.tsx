import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EditSalary() {
  const [salary, setSalary] = useState("");
  const navigate = useNavigate();

  const handleSave = async () => {
    if (!salary) return alert("Enter salary");

    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/income/salary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ salary: Number(salary) }),
    });

    if (res.ok) {
      navigate("/finance/income");
    } else {
      alert("Failed to update salary");
    }
  };

  return (
    <div className="max-w-md bg-white p-6 rounded-xl shadow space-y-4">
      <h2 className="text-xl font-semibold">Edit Salary</h2>

      <input
        type="number"
        placeholder="Monthly Salary"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
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
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
}
