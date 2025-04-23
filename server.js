import express from "express";
import pool from "./db.js";
import haversine from "haversine";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Use built-in JSON parser
app.use(express.json());

// Helper: Validate school input
function validateSchool(data) {
  const { name, address, latitude, longitude } = data;
  if (!name || typeof name !== "string" || name.trim() === "")
    return "Invalid or missing name";
  if (!address || typeof address !== "string" || address.trim() === "")
    return "Invalid or missing address";
  if (typeof latitude !== "number" || latitude < -90 || latitude > 90)
    return "Invalid or missing latitude";
  if (typeof longitude !== "number" || longitude < -180 || longitude > 180)
    return "Invalid or missing longitude";
  return null;
}

// POST /addSchool
app.post("/addSchool", async (req, res) => {
  const error = validateSchool(req.body);
  if (error) return res.status(400).json({ success: false, error });

  const { name, address, latitude, longitude } = req.body;

  try {
    const [result] = await pool.query(
      "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)",
      [name.trim(), address.trim(), latitude, longitude]
    );

    res.status(201).json({
      success: true,
      message: "School added successfully",
      data: { id: result.insertId, name, address, latitude, longitude },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Database error" });
  }
});

// GET /listSchools?latitude=..&longitude=..
app.get("/listSchools", async (req, res) => {
  const lat = parseFloat(req.query.latitude);
  const lon = parseFloat(req.query.longitude);

  if (
    isNaN(lat) ||
    lat < -90 ||
    lat > 90 ||
    isNaN(lon) ||
    lon < -180 ||
    lon > 180
  ) {
    return res.status(400).json({
      success: false,
      error: "Invalid or missing latitude/longitude query parameters",
    });
  }

  try {
    const [schools] = await pool.query("SELECT * FROM schools");

    const userLocation = { latitude: lat, longitude: lon };

    // Calculate distance and sort
    const schoolsWithDistance = schools
      .map((school) => {
        const schoolLocation = {
          latitude: school.latitude,
          longitude: school.longitude,
        };
        const distance = haversine(userLocation, schoolLocation, {
          unit: "km",
        });
        return { ...school, distance: parseFloat(distance.toFixed(2)) };
      })
      .sort((a, b) => a.distance - b.distance);

    res.json({
      success: true,
      count: schoolsWithDistance.length,
      data: schoolsWithDistance,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Database error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
