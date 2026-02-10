import { useState } from "react";
import type { User } from "../../types/User";

interface RegisterProps {
  goToLogin: () => void;
}


export default function Register({ goToLogin }: RegisterProps) {
  

  const [form, setForm] = useState<User>({
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleRegister = async () => {
    if (!form.username || !form.email || !form.password || !form.role) {
      alert("All fields are required ❌");
      return;
    }
  
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
  
    const data = await res.json();
  
    if (!res.ok) {
      alert(data.message);
      return;
    }
  
    alert("Registered successfully ✅");
    goToLogin();
  };


  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-8">Register</h2>

      <div>
        <label className="text-sm text-gray-500">Role</label>
        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value as "user" | "admin" })}
          className="w-full border-b border-gray-300 outline-none py-2 focus:border-purple-500"
        >
          <option value="user">User (track my expenses)</option>
          <option value="admin">Admin (manage system)</option>
        </select>

      </div>

      <div className="mb-4">
        <label className="text-sm text-gray-500">Username</label>
        <input
          type="text"
          placeholder="Type your username"
          value={form.username}
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
          className="w-full border-b border-gray-300 outline-none py-2 focus:border-purple-500"
        />
      </div>

      <div className="mb-4">
        <label className="text-sm text-gray-500">Email</label>
        <input
          type="email"
          placeholder="Type your email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          className="w-full border-b border-gray-300 outline-none py-2 focus:border-purple-500"
        />
      </div>

      <div className="mb-6">
        <label className="text-sm text-gray-500">Password</label>
        <input
          type="password"
          placeholder="Create password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          className="w-full border-b border-gray-300 outline-none py-2 focus:border-purple-500"
        />
      </div>

      <button onClick={handleRegister} className="w-full py-3 rounded-full text-white font-semibold bg-linear-to-r from-blue-100 via-blue-300 to-blue-500 hover:opacity-90 transition">
        REGISTER
      </button>

      <p className="text-center text-sm mt-6">
        Already have an account?{" "}
        <span
          className="text-purple-500 font-semibold cursor-pointer"
          onClick={goToLogin}
        >
          Login
        </span>
      </p>
    </>
  );
}
