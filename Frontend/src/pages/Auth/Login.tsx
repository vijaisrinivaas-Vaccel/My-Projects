import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";


interface LoginProps {
  onSuccess: () => void;
  goToRegister: () => void;
}

export default function Login({
  onSuccess,
  goToRegister,
}: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
  if (!email || !password) {
    alert("All fields are required ❌");
    return;
  }

  try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Invalid credentials");
        return;
      }

      // ✅ STORE JWT TOKEN
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      onSuccess();
    } catch (err) {
      alert("Server error");
    }
};

 return (
    <>
      <h2 className="text-2xl font-bold text-center mb-8">Login</h2>

      <div className="mb-5">
        
        <label className="text-sm text-gray-500">Email</label>
        <input
          type="email"
          placeholder="Type your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border-b border-gray-300 outline-none py-2 focus:border-purple-500"
        />
      </div>

      <div className="mb-6 relative">
        <label className="text-sm text-gray-500">Password</label>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Type your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border-b border-gray-300 outline-none py-2 focus:border-purple-500"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
        >
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </button>
      </div>

      <button onClick={handleLogin} className="w-full py-3 rounded-full text-white font-semibold bg-linear-to-r from-blue-100 via-blue-300 to-blue-500 hover:opacity-90 transition">
        LOGIN
      </button>

      <p className="text-center text-sm mt-6">
        Create new account?{" "}
        <span
          className="text-purple-500 font-semibold cursor-pointer"
          onClick={goToRegister}
        >
          Register
        </span>
      </p>
    </>
  );
}
