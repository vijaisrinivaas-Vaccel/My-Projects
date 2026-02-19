import { useEffect, useState } from "react";
import { Button, Delbutton } from "../../components/ui/Button";
import CreateNewUserDialog from "./CreateNewUserDialog";

interface User {
  _id: string;
  username: string;
  email: string;
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:5000/api/admin/users", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this user?")) return;

    await fetch(`http://localhost:5000/api/admin/users/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchUsers();
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setOpen(true);
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">User Management</h1>

        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Create User
        </button>
      </div>

      {/* 🔹 Summary Card (Professional Placement) */}
      <div className="bg-white rounded-xl shadow p-6 flex items-center justify-between">
        <div>
          <p className="text-gray-500">Total Registered Users</p>
          <h2 className="text-3xl font-bold text-blue-600">
            {users.length}
          </h2>
        </div>
      </div>

      {/* 🔹 Users Table */}
      <div className="bg-white rounded-xl shadow border overflow-hidden">
        {/* Table header and rows here */}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow border overflow-hidden">

        {/* Header Row */}
        <div className="grid grid-cols-4 gap-4 px-6 py-4 text-sm font-semibold text-gray-500 border-b bg-gray-100">
          <div>Username</div>
          <div>Email</div>
          <div>CreatedAt</div>
          <div className="text-center">Actions</div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="px-6 py-10 text-center text-gray-500">
            Loading users...
          </div>
        )}

        {/* Empty */}
        {!loading && users.length === 0 && (
          <div className="px-6 py-10 text-center text-gray-500">
            No users found
          </div>
        )}

        {/* Rows */}
        {users.map((user) => (
          <div
            key={user._id}
            className="grid grid-cols-3 gap-4 px-6 py-4 border-b text-sm items-center"
          >
            <div className="font-medium">{user.username}</div>
            <div>{user.email}</div>
            <div className="flex justify-center gap-3">
              <Button onClick={() => handleEdit(user)}>
                Edit
              </Button>

              <Delbutton onClick={() => handleDelete(user._id)}>
                Delete
              </Delbutton>
            </div>
          </div>
        ))}
      </div>

      {/* Dialog */}
      <CreateNewUserDialog
        open={open}
        onOpenChange={(value) => {
          setOpen(value);
          if (!value) setSelectedUser(null);
        }}
        editData={selectedUser}
        onSuccess={fetchUsers}
      />
    </div>
  );
}
