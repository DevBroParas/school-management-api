import mysql from "mysql2/promise";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Create a MySQL connection pool with environment variables
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost", // Use Railway DB host or fallback to localhost
  user: process.env.DB_USER || "root", // Use Railway DB user or fallback to local settings
  password: process.env.DB_PASSWORD || "Paras@7678", // Use Railway DB password or fallback
  database: process.env.DB_NAME || "school_management", // Use Railway DB name or fallback
  waitForConnections: true,
  connectionLimit: 10,
});

// Optional: Check MySQL connection success
pool
  .getConnection()
  .then(() => console.log("✅ MySQL connected successfully!"))
  .catch((err) => console.error("❌ MySQL connection failed:", err));

export default pool;
