import { useState } from "react";
import type { User } from "../../types/User";
import { FiEye, FiEyeOff } from "react-icons/fi";


interface RegisterProps {
  goToLogin: () => void;
}


export default function Register({ goToLogin }: RegisterProps) {
  
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [form, setForm] = useState<User>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role: "user",
  });

  const passwordRules = {
    minLength: form.password.length >= 6,
    hasLetter: /[A-Za-z]/.test(form.password),
    hasNumber: /\d/.test(form.password),
    hasSpecial: /[!@#$%^&*()+=<>?{}[\]~]/.test(form.password),
    noSpaces: !/\s/.test(form.password),
  };

  const passwordsMatch =
    form.password && confirmPassword && form.password === confirmPassword;


  const handleRegister = async () => {
    if (!form.firstname || !form.lastname || !form.email || !form.password || !form.role) {
      alert("All fields are required ❌");
      return;
    }

    if ( !passwordRules.minLength || !passwordRules.hasLetter || !passwordRules.hasNumber || !passwordRules.hasSpecial || !passwordRules.noSpaces ) {
    alert("Password does not meet requirements ❌");
    return;
  }

  if (!passwordsMatch) {
    alert("Passwords do not match ❌");
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
      <h2 className="text-2xl font-bold text-center ">Register</h2>

      <div>
        <label className="text-sm text-gray-900">Role</label>
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
        <label className="text-sm text-gray-900">Firstname</label>
        <input
          type="text"
          placeholder="Type your firstname"
          value={form.firstname}
          onChange={(e) =>
            setForm({ ...form, firstname: e.target.value })
          }
          className="w-full border-b border-gray-300 outline-none py-2 focus:border-purple-500"
        />
      </div>

      <div className="mb-4">
        <label className="text-sm text-gray-900">Lastname</label>
        <input
          type="text"
          placeholder="Type your lastname"
          value={form.lastname}
          onChange={(e) =>
            setForm({ ...form, lastname: e.target.value })
          }
          className="w-full border-b border-gray-300 outline-none py-2 focus:border-purple-500"
        />
      </div>

      <div className="mb-4">
        <label className="text-sm text-gray-900">Email</label>
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
          {/* Password  */}
      <div className="mb-4">
        <div className="mb-4 relative">
          <label className="text-sm text-gray-900">Password</label>

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Create password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            className="w-full border-b border-gray-300 outline-none py-2 pr-10 focus:border-purple-500"
          />

          {/* 👁 Eye Icon */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-9 text-gray-500"
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>

        {/* RULES LIST */}
        <div className="mt-3 text-sm space-y-1">
        
          <p className={passwordRules.minLength ? "text-green-600" : "text-red-500"}>
            • Minimum 6 characters
          </p>
        
          <p className={passwordRules.hasLetter ? "text-green-600" : "text-red-500"}>
            • At least one letter (A-Z or a-z)
          </p>
        
          <p className={passwordRules.hasNumber ? "text-green-600" : "text-red-500"}>
            • At least one number (0-9)
          </p>
        
          <p className={passwordRules.hasSpecial ? "text-green-600" : "text-red-500"}>
            • At least one special character (!@#$%^&*)
          </p>
        
          <p className={passwordRules.noSpaces ? "text-green-600" : "text-red-500"}>
            • No spaces allowed
          </p>
        
        </div>
      </div>

          {/* Confirm Password */}
      <div className="mb-4">
        <label className="text-sm text-gray-900">Confirm Password</label>
                
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border-b border-gray-300 outline-none py-2 pr-10 focus:border-purple-500"
          />
      
          {/* Eye Button */}
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>
                
        {confirmPassword && (
          <p
            className={
              passwordsMatch
                ? "text-green-600 text-sm mt-1"
                : "text-red-500 text-sm mt-1"
            }
          >
            {passwordsMatch ? "Passwords match ✔" : "Passwords do not match"}
          </p>
        )}
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
