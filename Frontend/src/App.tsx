import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AuthPage from "./pages/Auth/AuthPage";
import DashboardLayout from "./pages/Dashboard/DashboardLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Expenses from "./pages/Expenses/Expenses";
import AddExpense from "./pages/Expenses/AddExpenses";
import Finance from "./pages/Finance/Finance";

import LoansTaken from "./pages/Finance/Loans/LoanTaken";
import LoansGiven from "./pages/Finance/Loans/LoanGiven";
import AddLoanTaken from "./pages/Finance/Loans/AddLoanTaken";
import AddLoanGiven from "./pages/Finance/Loans/AddLoanGiven";

import Income from "./pages/Finance/Income/Income";
import EditSalary from "./pages/Finance/Income/EditSalary";
import AddIncome from "./pages/Finance/Income/AddIncome";

import Savings from "./pages/Finance/Savings/Savings";
import AddSavings from "./pages/Finance/Savings/AddSavings";
import WithdrawSavings from "./pages/Finance/Savings/WithdrawSavings";
import FixedDeposits from "./pages/Finance/Savings/FixedDeposits";

import UserManagement from "./pages/UserManagement/UserManagement";
import Reports from "./pages/Reports/Reports";
import Trips from "./pages/Trips/Trips";


export default function App() {
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const user = JSON.parse(
    localStorage.getItem("user") || '{"role":"user"}'
  );

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setAuthChecked(true);
        return;
      }

      const res = await fetch("http://localhost:5000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      }

      setAuthChecked(true);
    };

    checkAuth();
  }, []);

  if (!authChecked) return null;

  return (
    <Routes>
      {/* AUTH */}
      {!isAuthenticated && (
        <Route
          path="/*"
          element={
            <AuthPage onLoginSuccess={() => setIsAuthenticated(true)} />
          }
        />
      )}

      {/* DASHBOARD */}
      {isAuthenticated && (
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />

          <Route path="expenses" element={<Expenses />} />
          <Route path="expenses/add" element={<AddExpense />} />

          <Route path="trips" element={<Trips />} />

          {/* FINANCE */}
          <Route path="finance" element={<Finance />}>
            <Route index element={<Navigate to="loans-taken" />} />
            <Route path="loans-taken" element={<LoansTaken />} />
            <Route path="loans-given" element={<LoansGiven />} />
            <Route path="loans-taken/add" element={<AddLoanTaken />} />
            <Route path="loans-given/add" element={<AddLoanGiven />} />

            <Route path="income" element={<Income />} />
            <Route path="income/edit-salary" element={<EditSalary />} />
            <Route path="income/add" element={<AddIncome />} />

            <Route path="savings" element={<Savings />} />
            <Route path="savings/add" element={<AddSavings />} />
            <Route path="savings/withdraw" element={<WithdrawSavings />} />
            <Route path="fd" element={<FixedDeposits />} />
          </Route>

          {/* ADMIN */}
          <Route
            path="user-management"
            element={
              user.role === "admin" ? (
                <UserManagement />
              ) : (
                <Navigate to="/" />
              )
            }
          />

          <Route path="reports" element={<Reports />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      )}
    </Routes>
  );
}
