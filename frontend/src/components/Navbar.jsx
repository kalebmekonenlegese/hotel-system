import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ user, setUser }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // 👇 HERE is where it goes
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
       setUser(null);
    alert("Logged out successfully");
    setUser(null); // 🔥 important
    navigate("/login");
  };

  // 🔥 reusable link style (with underline animation)
  const linkStyle =
    "relative after:block after:h-[2px] after:bg-blue-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform";

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 shadow-sm border-b">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">

        {/* LOGO */}
        <h1 className="text-lg md:text-xl font-bold text-gray-800">
          🏨 Hotel
        </h1>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className={linkStyle}>Home</Link>
          <Link to="/rooms" className={linkStyle}>Rooms</Link>
          <Link to="/reservations" className="px-4">
  Reservations
           </Link>
          {!user ? (
            <>
              <Link to="/login" className={linkStyle}>Login</Link>
              <Link to="/register" className={linkStyle}>Register</Link>
            </>
          ) : (
            <>
              <span className="text-sm text-gray-600">
                {user.email}
              </span>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* ✅ MOBILE MENU (FIXED) */}
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-4 px-4 pb-4 border-t">

          <Link to="/" className={linkStyle}>Home</Link>
          <Link to="/rooms" className={linkStyle}>Rooms</Link>

          {!user ? (
            <>
              <Link to="/login" className={linkStyle}>Login</Link>
              <Link to="/register" className={linkStyle}>Register</Link>
            </>
          ) : (
            <>
              <span className="text-sm text-gray-600">
                {user.email}
              </span>

              <button
  onClick={handleLogout}
  className="bg-red-500 text-white px-3 py-1 rounded"
>
  Logout
</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;