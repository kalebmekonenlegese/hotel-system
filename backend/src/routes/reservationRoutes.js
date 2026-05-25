const express = require("express");
const router = express.Router();
const pool = require("../config/database");
const verifyToken = require("../../middleware/authMiddleware");

// ✅ CREATE RESERVATION
router.post("/", async (req, res) => {
  try {
    const { guest_name, room_id, check_in, check_out } = req.body;

    // ✅ VALIDATION
    if (!guest_name || !room_id || !check_in || !check_out) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // ✅ FORCE 4AM CHECKOUT
    const checkOutDate = new Date(check_out);
    checkOutDate.setHours(4, 0, 0, 0);

    // ✅ CHECK DOUBLE BOOKING (DATE BASED)
    const conflict = await pool.query(
      `SELECT * FROM reservations
       WHERE room_id = $1
       AND (
         (check_in <= $2 AND check_out >= $2) OR
         (check_in <= $3 AND check_out >= $3) OR
         ($2 <= check_in AND $3 >= check_out)
       )`,
      [room_id, check_in, checkOutDate]
    );

    if (conflict.rows.length > 0) {
      return res.status(400).json({
        message: "Room already booked for these dates",
      });
    }

    // ✅ INSERT RESERVATION
    const result = await pool.query(
      `INSERT INTO reservations (guest_name, room_id, check_in, check_out)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [guest_name, room_id, check_in, checkOutDate]
    );

    res.status(201).json(result.rows[0]);

  } catch (error) {
    console.error("SERVER ERROR:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

// 📋 GET ALL RESERVATIONS
router.get("/", verifyToken, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT r.*, rooms.room_number
      FROM reservations r
      JOIN rooms ON r.room_id = rooms.id
      ORDER BY r.id DESC
    `);

    res.json(result.rows);

  } catch (error) {
    console.error("GET ERROR:", error);
    res.status(500).json({
      message: "Failed to fetch reservations",
    });
  }
});

module.exports = router;