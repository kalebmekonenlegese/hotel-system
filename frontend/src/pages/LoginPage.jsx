import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/api";

function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      // ✅ FIXED PATH
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      const { token, user } = res.data;

      // ✅ SAVE DATA
      localStorage.setItem("token", token);
localStorage.setItem("user", JSON.stringify(res.data.user));
      // ✅ UPDATE STATE
      setUser(user);

      // ✅ REDIRECT
      if (user.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/customer-dashboard");
      }

    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
  <div className="max-w-md mx-auto mt-16 p-6 bg-white shadow-md rounded">

    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
      Login
    </h2>

    {/* EMAIL */}
    <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full border p-2 rounded mb-4"
    />

    {/* PASSWORD */}
    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full border p-2 rounded mb-4"
    />

    {/* LOGIN BUTTON */}
    <button
      onClick={handleLogin}
      className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
    >
      Login
    </button>

    {/* LINKS SECTION */}
    <div className="mt-6 space-y-3 text-sm text-center">

      <p>
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-blue-600 font-semibold hover:underline"
        >
          Register
        </Link>
      </p>

      <Link
        to="/forgot-password"
        className="block border border-gray-300 rounded py-2 hover:bg-gray-100 transition"
      >
        Forgot Password?
      </Link>

    </div>
  </div>
);
}

export default Login;