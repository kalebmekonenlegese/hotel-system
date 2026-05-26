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
    const result = await pool.query("SELECT * FROM rooms ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error("GET ROOMS ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

//
// 📋 GET AVAILABLE ROOMS (OPTIONAL ROUTE)
//
router.get("/available", async (req, res) => {
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
    console.error("AVAILABLE ROOMS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

//
// ➕ CREATE ROOM (ADMIN ONLY)
//
router.post("/", verifyToken, isAdmin, async (req, res) => {
  try {
    const { name, type, price, capacity, image, description } = req.body;

    if (!name || !type || !price) {
      return res.status(400).json({
        message: "Name, type, and price are required",
      });
    }

    const result = await pool.query(
      `INSERT INTO rooms (name, type, price, capacity, image, description)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [name, type, price, capacity, image, description]
    );

    res.status(201).json(result.rows[0]);

  } catch (error) {
    console.error("CREATE ROOM ERROR:", error);
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;