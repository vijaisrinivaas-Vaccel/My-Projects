import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  username: string;
  role: "user" | "admin";
}

export default function Topbar() {
  const navigate= useNavigate();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch("http://localhost:5000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }
    };

    fetchUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  if (!user) return null;

  return (
    <header className="h-16 bg-white shadow flex items-center justify-end px-8 relative">
      <div
        className="flex items-center gap-2 cursor-pointer font-semibold"
        onClick={() => setOpen(!open)}
      >
        <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center">
          {user.username[0]}
        </div>
        {user.username}
      </div>

      {open && (
        <div className="absolute top-16 right-8 bg-white shadow-lg rounded-md w-40">
          <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
            Profile
          </div>
          <div
            className="px-4 py-2 hover:bg-gray-100 text-red-500 cursor-pointer"
            onClick={logout}
          >
            Logout
          </div>
        </div>
      )}
    </header>
  );
}
