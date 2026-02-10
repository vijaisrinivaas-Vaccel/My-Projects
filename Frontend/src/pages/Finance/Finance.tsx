import { NavLink, Outlet } from "react-router-dom";

const tabClass = ({ isActive }: { isActive: boolean }) =>
  `pb-2 transition-colors ${
    isActive
      ? "text-blue-600 border-b-2 border-blue-600"
      : "text-gray-600 border-b-2 border-transparent hover:text-blue-600"
  }`;


export default function Finance() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Finance</h1>

      <div className="flex gap-8 border-b mb-6">
        <NavLink to="loans-taken" className={tabClass}>
          Loans Taken
        </NavLink>

        <NavLink to="loans-given" className={tabClass}>
          Loans Given
        </NavLink>

        <NavLink to="income" className={tabClass}>
          Income
        </NavLink>

        <NavLink to="savings" className={tabClass}>
          Savings
        </NavLink>

        <NavLink to="fd" className={tabClass}>
          Fixed Deposits
        </NavLink>
      </div>

      <Outlet />
    </div>
  );
}
