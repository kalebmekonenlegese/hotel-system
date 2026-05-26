const express = require("express");
const router = express.Router();
const pool = require("../config/database");

const verifyToken = require("../../middleware/authMiddleware");

// 🔒 ADMIN CHECK
const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};

//
// 📋 GET ALL ROOMS
//
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM rooms");
    res.json(result.rows);
  } catch (err) {
    console.error("GET ROOMS ERROR:", err.message); // 👈 important
    res.status(500).json({ message: "Server error" });
  }
});
//
// ✅ GET SINGLE ROOM BY ID (🔥 THIS WAS MISSING)
//
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT *
      FROM rooms
      WHERE id NOT IN (
        SELECT room_id
        FROM reservations
        WHERE NOW() < check_out
      )
      ORDER BY id ASC
    `);

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});
//
// ➕ CREATE ROOM (ADMIN ONLY)
//
router.post("/", verifyToken, isAdmin, async (req, res) => {
  try {
    const { room_number, type, price } = req.body;

    if (!room_number || !type || !price) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const result = await pool.query(
      "INSERT INTO rooms (room_number, type, price) VALUES ($1, $2, $3) RETURNING *",
      [room_number, type, price]
    );

    res.status(201).json(result.rows[0]);

  } catch (error) {
    console.error("CREATE ROOM ERROR:", error);

    res.status(500).json({
      message: "Server error",
      details: error.message,
    });
  }
});

module.exports = router;