import { useEffect, useState } from "react";

interface User {
  _id: string;
  username: string;
  email: string;
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const token = localStorage.getItem("token");

  /* ================= FETCH USERS ================= */
  const fetchUsers = async () => {
    const res = await fetch("http://localhost:5000/api/admin/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  /* ================= CREATE USER ================= */
  const handleCreate = async () => {
    if (!form.username || !form.email || !form.password) {
      alert("All fields required");
      return;
    }

    const res = await fetch("http://localhost:5000/api/admin/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const err = await res.json();
      alert(err.message);
      return;
    }

    setForm({ username: "", email: "", password: "" });
    fetchUsers();
  };

  /* ================= DELETE USER ================= */
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this user?")) return;

    await fetch(`http://localhost:5000/api/admin/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchUsers();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">User Management</h1>

      {/* USER COUNT */}
      <div className="bg-white p-4 rounded shadow">
        Total Users: <b>{users.length}</b>
      </div>

      {/* CREATE USER */}
      <div className="bg-white p-6 rounded shadow space-y-4 max-w-md">
        <h2 className="font-semibold">Create User</h2>

        <input
          placeholder="Username"
          value={form.username}
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
          className="w-full border p-2 rounded"
        />

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          className="w-full border p-2 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          className="w-full border p-2 rounded"
        />

        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create User
        </button>
      </div>

      {/* USERS TABLE */}
      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Username</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-t">
                <td className="p-3">{u.username}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">
                  <button
                    onClick={() => handleDelete(u._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={3} className="p-6 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
