import { useEffect, useState } from "react";
import AddTripsDialog from "./AddTripsDialog";
import { Button, Delbutton } from "../../components/ui/Button";

interface Trip {
  _id: string;
  name: string;
  tripType: string;
  transportMode: string;
  tripMode: string;
  departDate: string;
  returnDate?: string;
  tripStatus: string; // from virtual
  budget: number;
  status: string;     // Draft / Saved
}

export default function Trips() {
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const fetchTrips = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const res = await fetch("http://localhost:5000/api/trips", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      const data = await res.json();
      setTrips(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const handleDelete = async (_id: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const res = await fetch(
      `http://localhost:5000/api/trips/delete/${_id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!res.ok) {
      alert("Failed to delete trip");
      return;
    }

    fetchTrips();
  };

  const handleEdit = (trip: Trip) => {
    setSelectedTrip(trip);
    setOpen(true);
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Trips</h1>

        <button
          onClick={() => {
            setSelectedTrip(null);
            setOpen(true);
          }}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Add Trip
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow border overflow-hidden">

        {/* Header row */}
        <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1.5fr] gap-4 px-6 py-4 text-sm font-semibold text-gray-500 border-b">
          <div>Name</div>
          <div>Type</div>
          <div>Transport</div>
          <div>Trip Mode</div>
          <div>Depart</div>
          <div>Return</div>
          <div>Trip Status</div>
          <div>Budget</div>
          <div className="text-center">Actions</div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="px-6 py-10 text-center text-gray-500">
            Loading trips...
          </div>
        )}

        {/* Empty */}
        {!loading && trips.length === 0 && (
          <div className="px-6 py-10 text-center text-gray-500">
            No trips yet
          </div>
        )}

        {/* Rows */}
        {trips.map((trip) => (
          <div
            key={trip._id}
            className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1.3fr] gap-4 px-6 py-4 border-b text-sm items-center"
          >
            <div className="font-medium">{trip.name}</div>
            <div>{trip.tripType}</div>
            <div>{trip.transportMode}</div>
            <div>{trip.tripMode}</div>
            <div>{new Date(trip.departDate).toLocaleDateString()}</div>
            <div>
              {trip.returnDate
                ? new Date(trip.returnDate).toLocaleDateString()
                : "-"}
            </div>

            {/* Trip Status (Virtual) */}
            <div>
              <span
                className={`px-2 py-1 rounded text-xs font-semibold ${
                  trip.tripStatus === "Trip Ended"
                    ? "bg-red-100 text-red-600"
                    : trip.tripStatus === "Ongoing"
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {trip.tripStatus}
              </span>
            </div>

            <div className="w-2">{trip.budget}</div>

            <div className="flex gap-2 text-center">
              <Button onClick={() => handleEdit(trip)}>Edit</Button>
              <Delbutton onClick={() => handleDelete(trip._id)}>
                Delete
              </Delbutton>
            </div>
          </div>
        ))}
      </div>

      <AddTripsDialog
        open={open}
        onOpenChange={(value) => {
          setOpen(value);
          if (!value) setSelectedTrip(null);
        }}
        editData={selectedTrip}
        onSuccess={fetchTrips}
      />
    </div>
  );
}
