import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Loan {
  _id: string;
  personOrBank: string;
  amount: number;
  interest: number;
  status: string;
}

export default function LoansTaken() {
  const navigate = useNavigate();
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLoans = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch(
        "http://localhost:5000/api/finance/loans?type=taken",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.ok) {
        const data = await res.json();
        setLoans(data);
      }
      setLoading(false);
    };

    fetchLoans();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Loans Taken</h1>

        <button
          onClick={() => navigate("/finance/loans-taken/add")}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg"
        >
          + Add Loan
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow border overflow-hidden">
        <div className="grid grid-cols-5 gap-4 px-6 py-4 text-sm font-semibold text-gray-500 border-b">
          <div>Lender</div>
          <div>Amount</div>
          <div>Interest</div>
          <div>Status</div>
          <div>Type</div>
        </div>

        {loading && (
          <div className="px-6 py-10 text-center text-gray-500">
            Loading loans...
          </div>
        )}

        {!loading && loans.length === 0 && (
          <div className="px-6 py-10 text-center text-gray-500">
            No loans taken yet
          </div>
        )}

        {loans.map((loan) => (
          <div
            key={loan._id}
            className="grid grid-cols-5 gap-4 px-6 py-4 border-b text-sm"
          >
            <div className="font-medium">{loan.personOrBank}</div>
            <div>₹{loan.amount}</div>
            <div>{loan.interest}%</div>
            <div className="text-green-600 font-semibold">
              {loan.status}
            </div>
            <div>Taken</div>
          </div>
        ))}
      </div>
    </div>
  );
}
