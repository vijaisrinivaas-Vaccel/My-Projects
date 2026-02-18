import { useEffect, useState } from "react";

import {Button,Delbutton} from "../../../components/ui/Button";
import AddIncomeDialog from "./AddIncomeDialog";
import EditSalaryDialog from "./EditSalaryDialog";
import ConfirmCreditedDialog from "./ConfirmCreditedDialog";

export default function Income() {
  const [data, setData] = useState<any>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedIncome, setSelectedIncome] = useState<any>(null);

  const getStatus = (createdAt: string) => {
  const createdDate = new Date(createdAt);
  const today = new Date();

  const diffInDays =
    (today.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24);

  return diffInDays <= 30 ? "Active" : "Inactive";
  };


  const fetchIncome = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const res = await fetch("http://localhost:5000/api/income", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      console.error("Failed to fetch income");
      return;
    }

    const incomeData = await res.json();
    setData(incomeData);
  };

  useEffect(() => {
    fetchIncome();
  }, []);

  const IncomeCredited = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(
      "http://localhost:5000/api/income/salarycredited",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      alert("Failed to credit salary");
      return;
    }

    // refresh after success
    await fetchIncome();
    setShowConfirm(false);
  };

  if (!data) return <p>Loading...</p>;

  const handleDelete = async (_id: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`http://localhost:5000/api/income/delete/${_id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        alert(errData?.message || "Failed to delete income");
        return;
      }

      await fetchIncome();
    } catch (error) {
      console.error("Error deleting income:", error);
      alert("Error deleting income");
    }
  };

  const handleEdit = (income: any) => {
    setSelectedIncome(income);
    setOpen(true);
  };    


  return (
    <div className="space-y-6">
      {/* TOTAL INCOME */}
      <div className="bg-white p-6 rounded-xl shadow flex justify-between">
        <div>
          <p className="text-gray-500">Total Monthly Income</p>
          <h2 className="text-3xl font-bold">₹{data.totalIncome}</h2>
        </div>
      </div>

      {/* SALARY CARD */}
      <div className="bg-white p-6 rounded-xl shadow flex justify-between">
        <div>
          <p className="text-gray-500">Monthly Salary</p>
          <h3 className="text-xl font-semibold">₹{data.salary}</h3>
        </div>

        <div className="flex flex-col gap-3">
          <Button
            disabled={data.isCredited}
            onClick={() => setShowConfirm(true)}
          >
            {data.isCredited ? "Credited" : "Credit Income"}
          </Button>
          <Button onClick={() => setEditOpen(true)}>
            Increment 
          </Button>
        </div>
      </div>

      {/* OTHER INCOME */}
      <div className="bg-white rounded-xl shadow border overflow-hidden">

        {/* Header */}
        <div className="relative flex items-center justify-center px-6 py-5 border-b bg-linear-to-r from-gray-50 to-gray-100 rounded-t-xl">

        {/* Center Title */}
        <h3 className="text-xl font-semibold tracking-wide text-gray-800">
          Other Income
        </h3>

        {/* Add Button - Right Side */}
        <button
          onClick={() => setOpen(true)}
          className="absolute right-6 flex items-center gap-2 px-4 py-2 
                     bg-blue-600 text-white rounded-lg shadow-md
                     hover:bg-blue-700 hover:shadow-lg 
                     transition-all duration-200"
        >
          <span className="text-lg font-bold">＋</span>
          Add Income
        </button>

      </div>


      {/* Table Header */}
      <div className="grid grid-cols-[2fr_1fr_1.5fr_1fr_1.5fr] gap-8 px-6 py-3 text-sm font-semibold text-gray-500 border-b bg-gray-100">
        <div>Income Source</div>
        <div >Amount (₹)</div>
        <div>Date Added</div>
        <div>Status</div>
        <div className="text-center">Actions</div>
      </div>
          
      {/* Empty State */}
      {data.otherIncome.length === 0 && (
        <p className="p-6 text-gray-500 text-center">
          No additional income added yet
        </p>
      )}
      
      {/* Rows */}
      {data.otherIncome.map((i: any) => {
        const status = getStatus(i.createdAt);
      
        return (
          <div
            key={i._id}
            className="grid grid-cols-[2fr_1fr_1.5fr_1fr_1.5fr] gap-8 items-center px-6 py-4 border-b hover:bg-gray-50 transition"
          >
            {/* 1. Source */}
            <div className="font-medium">{i.source}</div>
        
            {/* 2. Amount */}
            <div className="font-semibold text-green-600 pr-4">
              ₹{i.amount}
            </div>
        
            {/* 3. Date */}
            <div className="text-gray-600 pl-2">
              {new Date(i.createdAt).toLocaleDateString()}
            </div>
        
            {/* 4. Status */}
            <div>
              <span
                className={`px-3 py-1 text-xs rounded-full font-medium ${
                  status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {status}
              </span>
            </div>
              
            {/* 5. Actions */}
            <div className="flex justify-center gap-3">
              <Button onClick={() => handleEdit(i)}>
                Edit
              </Button>
              
              <Delbutton onClick={() => handleDelete(i._id)}>
                Delete
              </Delbutton>
            </div>
          </div>
        );
      })}

        
      </div>
      <AddIncomeDialog
        open={open}
        onOpenChange={(value) => {
          setOpen(value);
          if (!value) setSelectedIncome(null);
        }}
        onSuccess={fetchIncome}
        editData={selectedIncome}
      />
      <EditSalaryDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        onSuccess={fetchIncome}
      />
      <ConfirmCreditedDialog
        open={showConfirm}
        onOpenChange={setShowConfirm}
        onConfirm={IncomeCredited}
        disabled={data.isCredited}
      />


    </div>
  );
}
