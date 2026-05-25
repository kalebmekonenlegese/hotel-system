import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

function ReservationPage() {
  const navigate = useNavigate();

  // ✅ LOAD ROOM DIRECTLY (NO useEffect)
  const [room] = useState(() => {
    try {
      const savedRoom = localStorage.getItem("selectedRoom");
      return savedRoom ? JSON.parse(savedRoom) : null;
    } catch {
      return null;
    }
  });

  const [guestName, setGuestName] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  // ✅ HANDLE BOOKING
  const handleReservation = async () => {
    if (!guestName || !checkIn || !checkOut) {
      alert("Please fill all fields");
      return;
    }

    try {
      await API.post("/reservations", {
        guest_name: guestName,
        room_id: room.id,
        check_in: checkIn,
        check_out: checkOut,
      });

      alert("Booked successfully ✅");

      localStorage.removeItem("selectedRoom");

      navigate("/customer-dashboard");

    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Booking failed ❌");
    }
  };

  // ✅ NO ROOM
  if (!room) {
    return <p className="text-center mt-10">No room selected ❌</p>;
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded mt-10">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Confirm Reservation
      </h2>

      {/* ROOM INFO */}
      <div className="mb-4 border p-4 rounded bg-gray-50">
        <h3 className="font-semibold">
          Room {room.room_number}
        </h3>
        <p>Type: {room.type}</p>
        <p className="text-green-600 font-bold">
          {room.price} ETB
        </p>
      </div>

      {/* FORM */}
      <div className="space-y-4">

        <input
          type="text"
          placeholder="Guest Name"
          className="w-full border p-2 rounded"
          onChange={(e) => setGuestName(e.target.value)}
        />

        <div>
          <label className="block text-sm">Check In</label>
          <input
            type="date"
            className="w-full border p-2 rounded"
            onChange={(e) => setCheckIn(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm">Check Out</label>
          <input
            type="date"
            className="w-full border p-2 rounded"
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </div>

        <button
          onClick={handleReservation}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
}

export default ReservationPage;