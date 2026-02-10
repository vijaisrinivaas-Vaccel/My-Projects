import { NavLink } from "react-router-dom";


export default function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  return (
    <aside className="w-72 bg-white shadow h-full">
      <div className="p-6">
        <h1 className="text-xl font-bold mb-8">Expense Tracker</h1>

        <nav className="space-y-4">
          <NavLink to="/" className="block font-semibold text-blue-600">
            Dashboard
          </NavLink>

          <NavLink to="/expenses" className="block text-gray-600">
            Expenses
          </NavLink>

          <NavLink to="/trips" className="block text-gray-600">
            Trips
          </NavLink>
          <NavLink to="/finance" className="block text-gray-600">
            Finance
          </NavLink>

           {/* 🔐 ADMIN ONLY */}
          {user.role === "admin" && (
            <NavLink to="/user-management" className="block text-red-600">
              User Management
            </NavLink>
          )}

          <NavLink to="/reports" className="block text-gray-600">
            Reports
          </NavLink>

          <NavLink to="/settings" className="block text-gray-600">
            Settings
          </NavLink>
        </nav>
      </div>
    </aside>
  );
}
