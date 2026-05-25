import { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

function RoomsPage() {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  // ✅ FETCH ROOMS
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await API.get("/rooms");
        console.log("🔥 ROOMS DATA:", res.data);
        setRooms(res.data);
      } catch (error) {
        console.error("Failed to fetch rooms", error);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Available Rooms
      </h2>

      {rooms.length === 0 ? (
        <p className="text-gray-500">No rooms available</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="bg-white shadow-md rounded-lg p-5 border hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold mb-2">
                Room {room.room_number}
              </h3>

              <p className="text-gray-600">
                Type: <span className="font-medium">{room.type}</span>
              </p>

              <p className="text-green-600 font-bold">
                {room.price} ETB
              </p>

              <span
                className={`inline-block mt-2 px-2 py-1 text-sm rounded ${
                  room.status === "available"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {room.status}
              </span>

              <button
                onClick={() => {
                  localStorage.setItem(
                    "selectedRoom",
                    JSON.stringify(room)
                  );

                  navigate(`/reservation/${room.id}`);
                }}
                className="mt-4 w-full py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RoomsPage;