import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// COMPONENTS
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// PAGES
import HomePage from "./pages/HomePage";
import RoomsPage from "./pages/RoomsPage";
import ReservationPage from "./pages/ReservationPage";
import PaymentPage from "./pages/PaymentPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPassword from "./pages/ForgotPassword";
import CustomerDashboard from "./pages/CustomerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ReservationsListPage from "./pages/ReservationsListPage";
function App() {
  // ✅ LOAD USER FROM LOCAL STORAGE
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("❌ Failed to load user:", error);
      localStorage.removeItem("user");
      return null;
    }
  });

  return (
    <Router>
      <div className="min-h-screen flex flex-col">

        {/* NAVBAR */}
        <Navbar user={user} setUser={setUser} />

        {/* MAIN CONTENT */}
        <main className="grow">
          <Routes>

            {/* PUBLIC ROUTES */}
            <Route path="/" element={<HomePage />} />
            <Route path="/rooms" element={<RoomsPage />} />
            <Route path="/reservation/:id" element={<ReservationPage />} />
            <Route path="/payment" element={<PaymentPage />} />
             <Route path="/reservations" element={<ReservationsListPage />} />
            {/* AUTH */}
            <Route
              path="/login"
              element={<LoginPage setUser={setUser} />}
            />
            <Route
              path="/register"
              element={<RegisterPage setUser={setUser} />}
            />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* CUSTOMER */}
            <Route
              path="/customer-dashboard"
              element={
                <ProtectedRoute role="customer">
                  <CustomerDashboard />
                </ProtectedRoute>
              }
            />

            {/* ADMIN */}
            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute role="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* RESERVATIONS LIST */}
            <Route
              path="/reservations"
              element={
                <ProtectedRoute role="admin">
                  <ReservationsListPage />
                </ProtectedRoute>
              }
            />

          </Routes>
        </main>

        {/* FOOTER */}
        <Footer />

      </div>
    </Router>
  );
}

export default App;