import { useEffect, useState } from "react";

interface FixedDeposit {
  _id: string;
  bank: string;
  principal: number;
  interest: number;
  startDate: string;
  maturityDate: string;
  status: "active" | "matured";
}

export default function FixedDeposits() {
  const [fds, setFds] = useState<FixedDeposit[]>([]);

  useEffect(() => {
    // Later connect backend here
    setFds([
      {
        _id: "1",
        bank: "SBI",
        principal: 100000,
        interest: 6.5,
        startDate: "2024-01-01",
        maturityDate: "2026-01-01",
        status: "active",
      },
    ]);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow border overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b">
        <h2 className="text-xl font-semibold">Fixed Deposits</h2>
        <p className="text-sm text-gray-500">
          Your long-term investments
        </p>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-6 gap-4 px-6 py-3 text-sm font-semibold text-gray-500 border-b">
        <div>Bank</div>
        <div>Principal</div>
        <div>Interest</div>
        <div>Start Date</div>
        <div>Maturity</div>
        <div>Status</div>
      </div>

      {/* Empty State */}
      {fds.length === 0 && (
        <div className="px-6 py-10 text-center text-gray-500">
          No fixed deposits added
        </div>
      )}

      {/* Rows */}
      {fds.map((fd) => (
        <div
          key={fd._id}
          className="grid grid-cols-6 gap-4 px-6 py-4 border-b text-sm"
        >
          <div className="font-medium">{fd.bank}</div>
          <div>₹{fd.principal.toLocaleString()}</div>
          <div>{fd.interest}%</div>
          <div>{fd.startDate}</div>
          <div>{fd.maturityDate}</div>
          <div
            className={`font-semibold ${
              fd.status === "active"
                ? "text-green-600"
                : "text-gray-500"
            }`}
          >
            {fd.status}
          </div>
        </div>
      ))}
    </div>
  );
}
