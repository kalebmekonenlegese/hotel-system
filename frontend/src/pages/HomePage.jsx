import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaCalendarAlt,
  FaWifi,
  FaSwimmingPool,
  FaSpa,
  FaDumbbell,
} from "react-icons/fa";

import { testimonials } from "../data/mockData";

const HomePage = () => {
  const amenities = [
    { icon: FaWifi, name: "Free WiFi", desc: "High-speed internet" },
    { icon: FaSwimmingPool, name: "Infinity Pool", desc: "Heated pool with bar" },
    { icon: FaSpa, name: "Luxury Spa", desc: "Traditional treatments" },
    { icon: FaDumbbell, name: "Fitness Center", desc: "24/7 modern gym" },
  ];

  return (
    <div>
      {/* HERO */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-screen flex items-center justify-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1542314831-068cd1dbfeeb")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative text-center text-white px-6">
<h1 className="text-5xl md:text-7xl text-white! font-bold mb-6">
            Welcome to Hatsey Kaleb Hotel
          </h1>

          <p className="text-xl md:text-2xl mb-8">
            Experience comfort and Ethiopian hospitality
          </p>

          <div className="flex gap-4 justify-center flex-col sm:flex-row">
            <Link
              to="/rooms"
              className="bg-blue-500 text-white px-6 py-2 rounded"
            >
              View Rooms
            </Link>

            <Link
              to="/reservation"
              className="bg-blue-500 text-white px-6 py-2 rounded"
            >
              Book Now
            </Link>
          </div>
        </div>

        <FaCalendarAlt className="absolute bottom-8 text-yellow-400 text-3xl animate-bounce" />
      </motion.section>

      {/* AMENITIES */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-10">
            World-Class Amenities
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {amenities.map((a, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition"
              >
                <a.icon className="text-yellow-500 text-4xl mx-auto mb-3" />
                <h3 className="font-semibold">{a.name}</h3>
                <p className="text-gray-600 text-sm">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROOMS PREVIEW */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-10">
            Featured Rooms
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Single Room",
                price: "300 ETB",
                image:
                  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
              },
              {
                name: "Double Room",
                price: "600 ETB",
                image:
                  "https://images.unsplash.com/photo-1566665797739-1674de7a421a",
              },
              {
                name: "Luxury Room",
                price: "1000 ETB",
                image:
                  "https://images.unsplash.com/photo-1618773928121-c32242e63f39",
              },
            ].map((room, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow overflow-hidden"
              >
                <img
                  src={room.image}
                  className="h-56 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg">{room.name}</h3>
                  <p className="text-yellow-600 font-bold">
                    {room.price}
                  </p>

                  <Link
                    to="/reservation"
                    className="block mt-3 bg-blue-500 text-white py-2 rounded"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS ✅ FIXED */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-10">
            Guest Experiences
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white text-black p-6 rounded-xl shadow"
              >
                <div className="flex items-center mb-4">
                 <img
  src={testimonial.image}
  alt={testimonial.name}   // ✅ add this
  className="w-12 h-12 rounded-full mr-3"
/>
                  <div>
                    <h4 className="font-semibold">
                      {testimonial.name}
                    </h4>
                    <div className="text-yellow-500">
                      {"★".repeat(testimonial.rating)}
                    </div>
                  </div>
                </div>

                <p className="italic text-gray-700">
                  "{testimonial.comment}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;