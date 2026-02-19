import { useState, useEffect } from "react";
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

export default function AddTripsDialog({
  open,
  onOpenChange,
  onSuccess,
  editData,
}: Props) {

  const [form, setForm] = useState({
    name: "",
    tripType: "Domestic",
    purpose: "",
    transportMode: "Flight",
    tripMode: "Roundtrip",
    departFrom: "",
    destination: "",
    departDate: "",
    returnDate: "",
    budget: "",
    hotel: "",
  });

  useEffect(() => {
    if (editData) {
      setForm({
        ...editData,
        departDate: editData.departDate.split("T")[0],
        returnDate: editData.returnDate
          ? editData.returnDate.split("T")[0]
          : "",
        budget: editData.budget.toString(),
      });
    } else {
      setForm({
        name: "",
        tripType: "Domestic",
        purpose: "",
        transportMode: "Flight",
        tripMode: "Roundtrip",
        departFrom: "",
        destination: "",
        departDate: "",
        returnDate: "",
        budget: "",
        hotel: "",
      });
    }
  }, [editData, open]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (!form.name || !form.departFrom || !form.destination || !form.departDate || !form.returnDate || !form.budget) {
      alert("Please fill required fields");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) return;

    const url = editData
      ? `http://localhost:5000/api/trips/edit/${editData._id}`
      : "http://localhost:5000/api/trips/add";

    const method = editData ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...form,
        budget: Number(form.budget),
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Failed to save trip");
      return;
    }

    onOpenChange(false);
    onSuccess?.();
  };

  return (
    <DialogRoot open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-205 ">
        <DialogHeader>
          <DialogTitle>
            {editData ? "Edit Trip" : "Add Trip"}
          </DialogTitle>
          <DialogDescription>
            Fill trip details below.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-4">

          <input name="name" placeholder="Trip Name" value={form.name} onChange={handleChange} className="border p-2 rounded" />
          
          <select name="tripType" value={form.tripType} onChange={handleChange} className="border p-2 rounded">
            <option>Domestic</option>
            <option>International</option>
          </select>

          <select name="transportMode" value={form.transportMode} onChange={handleChange} className="border p-2 rounded">
            <option>Flight</option>
            <option>Train</option>
            <option>Bus</option>
            <option>Car</option>
            <option>Bike</option>
          </select>

          <select name="tripMode" value={form.tripMode} onChange={handleChange} className="border p-2 rounded">
            <option>One-way</option>
            <option>Roundtrip</option>
          </select>

          <input name="departFrom" placeholder="Depart From" value={form.departFrom} onChange={handleChange} className="border p-2 rounded" />
          <input name="destination" placeholder="Destination" value={form.destination} onChange={handleChange} className="border p-2 rounded" />

          <input name="purpose" placeholder="Purpose (Business, Vacation...)" value={form.purpose} onChange={handleChange} className="border p-2 rounded" />

          <input type="date" name="departDate" value={form.departDate} onChange={handleChange} className="border p-2 rounded" />
          <input type="date" name="returnDate" value={form.returnDate} onChange={handleChange} className="border p-2 rounded" />

          <input type="number" name="budget" placeholder="Budget" value={form.budget} onChange={handleChange} className="border p-2 rounded" />

          <input name="hotel" placeholder="Hotel (optional)" value={form.hotel} onChange={handleChange} className="border p-2 rounded" />

        </div>

        <DialogFooter>
          <DialogClose asChild>
            <button className="px-4 py-2 border rounded">Cancel</button>
          </DialogClose>

          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-600 text-white rounded"
          >
            {editData ? "Update" : "Save"}
          </button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}
