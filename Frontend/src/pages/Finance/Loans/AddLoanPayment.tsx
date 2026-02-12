import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function AddLoanPayment() {
  const navigate = useNavigate();
  const { loanId } = useParams();

  const [principal, setPrincipal] = useState("");
  const [interest, setInterest] = useState("");

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    await fetch("http://localhost:5000/api/loan-transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        loanId,
        principal: Number(principal),
        interest: Number(interest),
        type: "payment",
      }),
    });

    navigate(-1);
  };

  return (
    <div className="max-w-md bg-white p-6 rounded-xl shadow space-y-4">
      <h2 className="text-xl font-semibold">Add Loan Payment</h2>

      <input
        type="number"
        placeholder="Principal Paid"
        value={principal}
        onChange={(e) => setPrincipal(e.target.value)}
        className="w-full border rounded px-3 py-2"
      />

      <input
        type="number"
        placeholder="Interest Paid"
        value={interest}
        onChange={(e) => setInterest(e.target.value)}
        className="w-full border rounded px-3 py-2"
      />

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        Save Payment
      </button>
    </div>
  );
}
