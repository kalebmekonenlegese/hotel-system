import { useEffect, useState } from "react";
import API from "../api/api";

function ReservationsListPage() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const res = await API.get("/reservations");
        setReservations(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchReservations();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">
        Reservations
      </h2>

      {reservations.length === 0 ? (
        <p>No reservations found</p>
      ) : (
        <div className="space-y-4">
          {reservations.map((r) => (
            <div
              key={r.id}
              className="p-4 border rounded bg-white shadow"
            >
              <p><strong>Room:</strong> {r.room_number}</p>
              <p><strong>Guest:</strong> {r.guest_name}</p>
              <p><strong>Check In:</strong> {r.check_in}</p>
              <p><strong>Check Out:</strong> {r.check_out}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ReservationsListPage;