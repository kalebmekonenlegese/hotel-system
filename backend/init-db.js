const { Pool } = require('pg');
require('dotenv').config();
const fs = require('fs');

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

async function initializeDatabase() {
  const client = await pool.connect();
  try {
    console.log('🔄 Initializing database...\n');
    
    // Drop existing tables in correct order (due to foreign keys)
    console.log('🗑️  Dropping existing tables...');
    await client.query('DROP TABLE IF EXISTS reservations CASCADE');
    await client.query('DROP TABLE IF EXISTS rooms CASCADE');
    await client.query('DROP TABLE IF EXISTS users CASCADE');
    console.log('✓ Old tables dropped\n');
    
    // Create users table
    console.log('📋 Creating tables...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'customer',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✓ Users table created');
    
    // Create rooms table
    await client.query(`
      CREATE TABLE IF NOT EXISTS rooms (
        id SERIAL PRIMARY KEY,
        room_number VARCHAR(50) UNIQUE NOT NULL,
        category VARCHAR(100) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        status VARCHAR(50) DEFAULT 'available',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✓ Rooms table created');
    
    // Create reservations table
    await client.query(`
      CREATE TABLE IF NOT EXISTS reservations (
        id SERIAL PRIMARY KEY,
        guest_name VARCHAR(255) NOT NULL,
        guest_email VARCHAR(255) NOT NULL,
        guest_phone VARCHAR(20) NOT NULL,
        room_id INTEGER NOT NULL REFERENCES rooms(id),
        check_in DATE NOT NULL,
        check_out DATE NOT NULL,
        total_price DECIMAL(10, 2) NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (room_id) REFERENCES rooms(id)
      )
    `);
    console.log('✓ Reservations table created');
    
    // Insert rooms
    await client.query(`
      INSERT INTO rooms (room_number, category, price, status) VALUES
      ('101', 'Luxury', 350.00, 'available'),
      ('102', 'VIP', 250.00, 'available'),
      ('201', 'Standard', 180.00, 'occupied'),
      ('202', 'Ordinary', 80.00, 'maintenance')
      ON CONFLICT (room_number) DO NOTHING
    `);
    console.log('✓ Sample rooms loaded (4 rooms)');
    
    // Insert admin user
    await client.query(`
      INSERT INTO users (email, password, name, role) VALUES
      ('admin@hatseykaleb.com', '$2a$10$EIxfn7aUQY.BvR.I3TJ3ie/9VmXR9K8J0L8qYj7Hc9hUBRu4OqONa', 'Admin User', 'admin')
      ON CONFLICT (email) DO NOTHING
    `);
    console.log('✓ Admin user created');
    
    // Create indexes
    await client.query('CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_reservations_room ON reservations(room_id)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_reservations_status ON reservations(status)');
    console.log('✓ Indexes created');
    
    console.log('\n✅ Database initialized successfully!\n');
    console.log('📊 Tables created:');
    console.log('   • users (id, email, password, name, role)');
    console.log('   • rooms (id, room_number, category, price, status)');
    console.log('   • reservations (id, guest info, room_id, dates, total_price)');
    console.log('\n👤 Admin credentials:');
    console.log('   • Email: admin@hatseykaleb.com');
    console.log('   • Password: password123');
    console.log('\n🏨 Sample rooms loaded: 4 rooms');
    console.log('\n🎉 Ready to start testing!\n');
    
  } catch (error) {
    console.error('\n❌ Error initializing database:', error.message);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

initializeDatabase();
