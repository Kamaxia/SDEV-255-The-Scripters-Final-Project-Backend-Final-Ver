const express = require("express");
const router = express.Router();
const Class = require("../models/Class");

// GET all classes
router.get("/", async (req, res) => {
  try {
    const classes = await Class.find();
    res.json(classes);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// GET a single class by id
router.get("/:id", async (req, res) => {
  try {
      const courseId = req.params.id;

      // Find course by MongoDB ObjectId (_id)
      const classItem = await Class.findById(courseId);
      if (!classItem) {
          return res.status(404).json({ error: "Class not found" });
      }

      res.json(classItem); // Return the course data
  } catch (error) {
      res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
