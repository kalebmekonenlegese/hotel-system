import { useEffect, useState } from "react";
import API from "../api/api";

export default function AdminDashboard() {

  const [rooms, setRooms] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);

  // ✅ LOAD DATA
  const loadData = async () => {
  try {
    const roomsRes = await API.get("/rooms");
    const resRes = await API.get("/reservations");

    setRooms(roomsRes.data);
    setReservations(resRes.data);

  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  const init = async () => {
    await loadData();
  };

  init();
}, []);

  // ✅ UPDATE STATUS
  const updateStatus = async (id, status) => {
    try {
      await API.put(`/reservations/${id}`, { status });
      loadData();
    } catch (error) {
      console.log(error);
    }
  };

  // SELECT ROOM
  const handleBook = (room) => {
    setSelectedRoom(room);
  };

  // ✅ CREATE RESERVATION
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const reservation = {
      guest_name: formData.get("name"),
      room_id: selectedRoom.id,
      check_in: formData.get("checkin"),
      check_out: formData.get("checkout"),
    };

    try {
      await API.post("/reservations", reservation);

      alert("Reservation Created");
      loadData();
      setSelectedRoom(null);

    } catch (error) {
      alert(error.response?.data?.message || "Error");
    }
  };

  // ✅ DELETE
  const handleDeleteReservation = async (id) => {
    try {
      await API.delete(`/reservations/${id}`);
      loadData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>ADMIN DASHBOARD</h1>

      <h2>Rooms</h2>
      {rooms.map((room) => (
        <div key={room.id}>
          Room {room.room_number} - {room.type} - ${room.price}
          <button onClick={() => handleBook(room)}>
            Book
          </button>
        </div>
      ))}

      {selectedRoom && (
        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Guest Name" required />
          <input type="date" name="checkin" required />
          <input type="date" name="checkout" required />
          <button type="submit">Confirm</button>
        </form>
      )}

      <h2>Reservations</h2>
      {reservations.map((r) => (
        <div key={r.id}>
          {r.guest_name} - Room {r.room_number}

          <button onClick={() => updateStatus(r.id, "confirmed")}>
            Confirm
          </button>

          <button onClick={() => handleDeleteReservation(r.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}