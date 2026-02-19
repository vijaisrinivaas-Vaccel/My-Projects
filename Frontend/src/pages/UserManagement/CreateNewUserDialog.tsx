import { useEffect, useState } from "react";
import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "../../components/ui/Dialog";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  editData?: any | null;
}

export default function CreateNewUserDialog({
  open,
  onOpenChange,
  onSuccess,
  editData,
}: Props) {
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (editData) {
      setForm({
        username: editData.username,
        email: editData.email,
        password: "",
      });
    } else {
      setForm({
        username: "",
        email: "",
        password: "",
      });
    }
  }, [editData, open]);

  const handleSave = async () => {
    if (!form.username || !form.email || (!editData && !form.password)) {
      alert("All fields are required");
      return;
    }

    const url = editData
      ? `http://localhost:5000/api/admin/users/${editData._id}`
      : "http://localhost:5000/api/admin/users";

    const method = editData ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Failed");
      return;
    }

    onOpenChange(false);
    onSuccess?.();
  };

  return (
    <DialogRoot open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-96">
        <DialogHeader>
          <DialogTitle>
            {editData ? "Edit User" : "Create User"}
          </DialogTitle>
          <DialogDescription>
            {editData
              ? "Update user details"
              : "Fill details to create new user"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
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

          {!editData && (
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              className="w-full border p-2 rounded"
            />
          )}
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <button className="px-4 py-2 border rounded">
              Cancel
            </button>
          </DialogClose>

          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-600 text-white rounded"
          >
            {editData ? "Update" : "Create"}
          </button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}
