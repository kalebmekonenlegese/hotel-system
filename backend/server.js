console.log("🔥 SERVER.JS IS RUNNING");

require("dotenv").config();

const express = require("express");
const cors = require("cors");

// ✅ ROUTES
const roomRoutes = require("./src/routes/roomRoutes");
const authRoutes = require("./src/routes/authRoutes");
const reservationRoutes = require("./src/routes/reservationRoutes");
const dashboardRoutes = require("./src/routes/dashboardRoutes");

const app = express();

// ✅ MIDDLEWARE
app.use(cors());
app.use(express.json());

// ✅ TEST ROUTES
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/api/test", (req, res) => {
  res.send("TEST WORKING");
});

// ✅ API ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/dashboard", dashboardRoutes);

// ✅ PORT (IMPORTANT FOR RENDER)
const PORT = process.env.PORT || 5000;

// ✅ START SERVER
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});