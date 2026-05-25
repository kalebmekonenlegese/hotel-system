import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/api";

function RegisterPage({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await API.post("/api/auth/register", {
        email,
        password,
      });

      // ✅ Save token
      localStorage.setItem("token", res.data.token);

      // ✅ Save user
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // ✅ Set user state
      setUser(res.data.user);

      alert("Registration successful");

      // ✅ Redirect
      navigate("/customer-dashboard");

    } catch (error) {
      alert("Registration failed");
      console.error(error);
    }
  };

 return (
  <div className="max-w-md mx-auto mt-16 p-6 bg-white shadow-md rounded">

    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
      Create Account
    </h2>

    {/* NAME */}
    <input
      type="text"
      placeholder="Full Name"
      value={name}
      // eslint-disable-next-line no-undef
      onChange={(e) => setName(e.target.value)}
      className="w-full border p-2 rounded mb-4"
    />

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

    {/* REGISTER BUTTON */}
    <button
      onClick={handleRegister}
      className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
    >
      Register
    </button>

    {/* LINKS */}
    <div className="mt-6 space-y-3 text-sm text-center">

      <p>
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-blue-600 font-semibold hover:underline"
        >
          Login
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

export default RegisterPage;