const express = require("express");
const router = express.Router();
const pool = require("../config/database");

const verifyToken = require("../../middleware/authMiddleware");

router.get("/", verifyToken, async (req, res) => {
  try {
    // 📊 GET ROOMS
    const rooms = await pool.query("SELECT * FROM rooms");

    // 📊 GET RESERVATIONS
    const reservations = await pool.query(`
      SELECT r.*, rooms.room_number
      FROM reservations r
      JOIN rooms ON r.room_id = rooms.id
      ORDER BY r.id DESC
    `);

    res.json({
      rooms: rooms.rows,
      reservations: reservations.rows
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;