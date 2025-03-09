const express = require("express");
const router = express.Router();
const Class = require("../models/Class");
const { Teacher } = require("../models/users");

// Get all teachers (for debugging)
router.get("/", async (req, res) => {
  try {
    const teachers = await Teacher.find().select("-password");
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get a specific teacher by ID
router.get("/:id", async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id).select("-password");
    
    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }
    
    res.json(teacher);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get all classes created by a specific teacher
router.get("/:id/classes", async (req, res) => {
  try {
    const teacherId = req.params.id;
    
    // First check if teacher exists
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }
    
    // Find classes where createdBy matches the teacher ID
    const classes = await Class.find({ createdBy: teacherId });
    
    res.json(classes);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Create a new class as a teacher
router.post("/:id/classes", async (req, res) => {
  try {
    const teacherId = req.params.id;
    
    // First check if teacher exists
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }
    
    // Create new class with teacher ID
    const newClass = new Class({
      ...req.body,
      createdBy: teacherId,
      instructor: teacher.username 
    });

    const savedClass = await newClass.save();
    res.status(201).json(savedClass);
  } catch (error) {
    res.status(400).json({ error: error.message || "Invalid class data" });
  }
});

// Update a class (verify teacher is the creator)
router.put("/classes/:classId", async (req, res) => {
  try {
    const { classId } = req.params;
    const { teacherId } = req.body;
    
    if (!teacherId) {
      return res.status(400).json({ error: "Teacher ID is required" });
    }
    
    // Find the class
    const classItem = await Class.findById(classId);
    if (!classItem) {
      return res.status(404).json({ error: "Class not found" });
    }
    
    // Check if this teacher created the class or if createdBy is not set
    if (classItem.createdBy && classItem.createdBy.toString() !== teacherId) {
      return res.status(403).json({ error: "You can only edit your own courses" });
    }
    
    // Update the class
    const updatedClass = await Class.findByIdAndUpdate(
      classId,
      req.body,
      { new: true }
    );
    
    res.json(updatedClass);
  } catch (error) {
    res.status(400).json({ error: error.message || "Bad request" });
  }
});

// Delete a class (verify teacher is the creator)
router.delete("/classes/:classId", async (req, res) => {
  try {
    const { classId } = req.params;
    const { teacherId } = req.body;
    
    if (!teacherId) {
      return res.status(400).json({ error: "Teacher ID is required" });
    }
    
    // Find the class
    const classItem = await Class.findById(classId);
    if (!classItem) {
      return res.status(404).json({ error: "Class not found" });
    }
    
    // Check if this teacher created the class or if createdBy is not set
    if (classItem.createdBy && classItem.createdBy.toString() !== teacherId) {
      return res.status(403).json({ error: "You can only delete your own courses" });
    }
    
    // Delete the class
    await Class.findByIdAndDelete(classId);
    res.json({ message: "Class deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Create a new teacher
router.post("/", async (req, res) => {
    try {
      // Check if all required fields are provided
      const { username, email, password, area } = req.body;
      
      if (!username || !email || !password || !area) {
        return res.status(400).json({ error: "All fields are required: username, email, password, area" });
      }
      
      // Check if teacher with this email already exists
      const existingTeacher = await Teacher.findOne({ email });
      if (existingTeacher) {
        return res.status(400).json({ error: "Teacher with this email already exists" });
      }
      
      // Create new teacher
      const newTeacher = new Teacher({
        username,
        email,
        password,
        area
      });
      
      const savedTeacher = await newTeacher.save();
      
      // Don't return the password in the response
      const teacherResponse = {
        _id: savedTeacher._id,
        username: savedTeacher.username,
        email: savedTeacher.email,
        area: savedTeacher.area,
        createdAt: savedTeacher.createdAt
      };
      
      res.status(201).json(teacherResponse);
    } catch (error) {
      console.error("Error creating teacher:", error);
      res.status(500).json({ error: error.message || "Server error" });
    }
  });
  
module.exports = router;