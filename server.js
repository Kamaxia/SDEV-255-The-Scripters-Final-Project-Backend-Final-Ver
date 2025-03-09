require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const connectDB = require("./db");

const classRoutes = require("./routes/classRoutes");
const authRoutes = require("./routes/authRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const studentRoutes = require("./routes/studentRoutes");

connectDB();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/index", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// API routes
app.use("/api/classes", classRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/teachers", teacherRoutes); 
app.use("/api/students", studentRoutes);

// Course information for the registration page
app.get("/register", async (req, res) => {
  try {
    const Class = require("./models/Class");
    const classes = await Class.find();
    res.json({ classes: classes });
  } catch (error) {
    console.error("Error fetching classes:", error);
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});