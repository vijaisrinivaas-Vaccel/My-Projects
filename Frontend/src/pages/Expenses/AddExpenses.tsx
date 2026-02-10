import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddExpense() {
  const navigate = useNavigate();
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    const formattedValue =
    name === "subject" || name === "shopName"
      ? value.charAt(0).toUpperCase() + value.slice(1)
      : value;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : formattedValue,
    });

  };

    /* ================= SAVE EXPENSE ================= */
  const handleSave = async () => {
    if (!form.subject || !form.shopName || !form.amount || !form.date) {
      alert("Please fill required fields ❌");
      return;
    }

    const token = localStorage.getItem("token");
    console.log("🟡 TOKEN FROM LOCALSTORAGE:", token);
    if (!token) {
      alert("Not authenticated");
      return;
    }

    const res = await fetch("http://localhost:5000/api/expenses/addExpense", {
      method: "POST",
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

    navigate("/expenses"); // back to expenses list
  };

  return (
    <div className="bg-gray-50 min-h-full p-6">
      <div className="flex justify-between items-center mb-7">
        {/* Title */}
      <h1 className="text-2xl font-bold mb-3">Add Expense</h1>
      
      {/* ACTION BUTTONS */}
      <div className="flex justify-end gap-4 mt-6">
        <button onClick={() => navigate("/expenses")} className="px-5 py-2 rounded border">
          Cancel
        </button>
        <button onClick={handleSave} className="px-6 py-2 rounded bg-blue-600 text-white">
          Save
        </button>
      </div>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-xl shadow p-3 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT FORM */}
        <div className="lg:col-span-2 space-y-5">
          
          {/* Subject */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Subject *
            </label>
            <input
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="Expense used for..."
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* ShopName */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Shop Name *
            </label>
            <input
              name="shopName"
              value={form.shopName}
              onChange={handleChange}
              placeholder="Shop name here..."
              className="w-full border rounded px-3 py-2"
            />
          </div>
          {/* Amount */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Amount *
            </label>
            <input
              type="number"
              name="amount"
              placeholder="Enter amount here..."
              value={form.amount}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Date */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Date *
            </label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Category *
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option>Travel</option>
              <option>Food</option>
              <option>Accommodation</option>
              <option>Office Supplies</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="w-full border rounded px-3 py-2"
              placeholder="Add more details..."
            />
          </div>

          {/* Add to report */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.addToReport}
              onChange={handleChange}
            />
            <span className="text-sm">Add to report</span>
          </div>
        </div>

        {/* RIGHT UPLOAD */}
        <div className="border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-gray-500 p-6">
          <div className="text-5xl mb-3">＋</div>
          <p className="font-medium">Upload file or photo</p>
          <p className="text-xs mt-1">PNG, JPG, PDF</p>

          <input
            type="file"
            className="hidden"
          />
        </div>
      </div>

    </div>
  );
}
