import { NavLink } from "react-router-dom";


export default function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const linkClass = ({ isActive }: { isActive: boolean }) =>
  `block ${isActive ? "text-blue-600 font-semibold" : "text-gray-600"}`;

  return (
    <aside className="w-72 bg-white shadow h-full">
      <div className="p-6">
        <h1 className="text-xl font-bold mb-8">Expense Tracker</h1>

        <nav className="space-y-4">
          <NavLink to="/" className={linkClass}>
            Dashboard
          </NavLink>

          <NavLink to="/expenses" className={linkClass}>
            Expenses
          </NavLink>

          <NavLink to="/trips" className={linkClass}>
            Trips
          </NavLink>
          <NavLink to="/finance" className={linkClass}>
            Finance
          </NavLink>

           {/* 🔐 ADMIN ONLY */}
          {user.role === "admin" && (
            <NavLink to="/user-management" className="block text-red-600">
              User Management
            </NavLink>
          )}

          <NavLink to="/reports" className={linkClass}>
            Reports
          </NavLink>

          <NavLink to="/settings" className={linkClass}>
            Settings
          </NavLink>
        </nav>
      </div>
    </aside>
  );
}
