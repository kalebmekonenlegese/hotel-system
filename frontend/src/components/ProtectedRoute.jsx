import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // ❌ Not logged in
  if (!token || !user) {
    return <Navigate to="/login" />;
  }

  // ❌ Wrong role
  if (role && user.role !== role) {
    return <Navigate to="/" />;
  }

  // ✅ Allowed
  return children;
}

export default ProtectedRoute;