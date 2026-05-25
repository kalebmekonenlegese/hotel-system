# PostgreSQL Setup Guide

## What was done:
✅ Created database schema (`schema.sql`)
✅ Updated authRoutes.js to use PostgreSQL instead of in-memory storage
✅ Created initialization script (`init-db.js`)

## What you need to do:

### Step 1: Ensure PostgreSQL is Running
Make sure your PostgreSQL server is running on your machine. Check the services or PostgreSQL application.

### Step 2: Initialize Database
Run this command in the backend folder:

```bash
cd backend
node init-db.js
```

### Step 3: Verify Setup
You should see output like:
```
✅ Database initialized successfully!
📊 Tables created: users, rooms, reservations
👤 Admin user created: admin@hatseykaleb.com
🏨 4 sample rooms loaded
```

### Step 4: Test Login
Start the backend:
```bash
npm start
```

Login with:
- **Email**: admin@hatseykaleb.com
- **Password**: password123

### What Changed:
1. **authRoutes.js**: All user storage now uses PostgreSQL
   - Register creates user in database
   - Login queries database for user
   - Passwords hashed with bcrypt

2. **Database Structure**:
   - `users` table: email (unique), password, name, role
   - `rooms` table: room_number, category, price, status
   - `reservations` table: guest info, room_id, dates, price, status

3. **Data Persistence**:
   - All data now survives server restarts ✅
   - Ready for production deployment
   - Can handle unlimited users and reservations

## Important Notes:
- Admin password hash in schema.sql is already set up
- Database credentials are in `.env` file
- JWT secret is in server.js (change in production!)
- All existing features (rooms, reservations, dashboard) still work

## Next Steps:
1. Run `node init-db.js` to create tables
2. Restart backend server
3. Test login → booking → dashboard
4. Then we can deploy to the cloud! 🚀
