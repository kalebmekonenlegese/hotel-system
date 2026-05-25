const express = require("express");
const router = express.Router();
const pool = require("../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ✅ 👉 ADD IT RIGHT HERE
const verifyToken = require("../../middleware/authMiddleware");

console.log("🔥 AUTH ROUTES FILE LOADED");

// ================= REGISTER =================
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO public.users (email, password, role) VALUES ($1, $2, $3) RETURNING *",
      [email, hashedPassword, "customer"]
    );

    const user = result.rows[0];

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({
      message: "User registered successfully",
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error("❌ REGISTER ERROR:", error.message);
    return res.status(500).json({ message: error.message });
  }
});
// ================= LOGIN =================
router.post("/login", async (req, res) => {
  console.log("🔥 LOGIN HIT");

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const result = await pool.query(
      "SELECT * FROM public.users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 🔐 DEBUG
    console.log("👉 JWT SECRET:", process.env.JWT_SECRET);

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

   return res.json({
  message: "Login success",
  token: token,
  user: {
    id: user.id,
    email: user.email,
    role: user.role
  }
});

  } catch (error) {
    console.error("❌ ERROR:", error.message);
    return res.status(500).json({ message: error.message });
  }
});

// 🔒 PROTECTED ROUTE
router.get("/dashboard", verifyToken, (req, res) => {
  res.json({
    message: "Welcome to dashboard",
    user: req.user
  });
});
module.exports = router;