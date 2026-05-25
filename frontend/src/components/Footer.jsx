import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-10">
      <div className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-6 text-center md:text-left">

        {/* BRAND */}
        <div>
          <h2 className="text-xl font-bold mb-2">🏨 Hotel</h2>
          <p className="text-gray-400 text-sm">
            Comfort, convenience, and quality service for every guest.
          </p>
        </div>

        {/* LINKS */}
        <div>
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-2 text-gray-400 text-sm">

            <li>
              <Link to="/" className="hover:text-white hover:underline transition">
                Home
              </Link>
            </li>

            <li>
              <Link to="/rooms" className="hover:text-white hover:underline transition">
                Rooms
              </Link>
            </li>

            <li>
              <Link to="/login" className="hover:text-white hover:underline transition">
                Login
              </Link>
            </li>

            <li>
              <Link to="/register" className="hover:text-white hover:underline transition">
                Register
              </Link>
            </li>

          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="font-semibold mb-2">Contact</h3>
          <p className="text-gray-400 text-sm">Email: hatseykalebhotel@gmail.com</p>
          <p className="text-gray-400 text-sm">Phone: +251 914 754 143</p>
          <p className="text-gray-400 text-sm">Location: Ethiopia</p>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} Hotel Booking System. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;