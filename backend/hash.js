const bcrypt = require("bcrypt");

async function generateHash() {
  try {
    const hash = await bcrypt.hash("Hatseykalebhotel@123", 10);
    console.log("✅ HASH:", hash);
  } catch (error) {
    console.error("❌ ERROR:", error);
  }
}

generateHash();