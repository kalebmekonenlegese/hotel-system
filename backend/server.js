console.log("🔥 SERVER.JS IS RUNNING");

const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");

const roomRoutes = require("./src/routes/roomRoutes");
const authRoutes = require("./src/routes/authRoutes");
const reservationRoutes = require("./src/routes/reservationRoutes");
const dashboardRoutes = require("./src/routes/dashboardRoutes");

const app = express();

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

const PORT = 5050;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});