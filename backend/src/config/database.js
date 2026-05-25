const { Pool } = require("pg");
require("dotenv").config();

console.log("🔥 database.js LOADED");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// ✅ TEST CONNECTION
pool.connect()
  .then(() => {
    console.log("✅ Neon PostgreSQL Connected");
  })
  .catch((err) => {
    console.error("❌ DB ERROR:", err.message);
  });

module.exports = pool;