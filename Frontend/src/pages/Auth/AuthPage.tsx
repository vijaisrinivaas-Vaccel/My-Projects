import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

interface AuthPageProps {
  onLoginSuccess: () => void;
}

export default function AuthPage({ onLoginSuccess }: AuthPageProps) {
  const [page, setPage] = useState<"login" | "register">("login");

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-100 via-blue-300 to-blue-500">
      <div className="bg-white w-105 rounded-xl shadow-xl p-5">
        {page === "login" && (
          <Login
            onSuccess={onLoginSuccess}
            goToRegister={() => setPage("register")}
          />
        )}

        {page === "register" && (
          <Register goToLogin={() => setPage("login")} />
        )}
      </div>
    </div>
  );
}
