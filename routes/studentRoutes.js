const express = require("express");
const router = express.Router();
const { Student } = require("../models/users");
const Class = require("../models/Class");

router.get("/", async (req, res) => {
  try {
    const students = await Student.find().select("-password");
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get a specific student
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).select("-password");
    
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Create a new student
router.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required: username, email, password" });
    }
    
    // Check if student with this email already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ error: "Student with this email already exists" });
    }
    
    // Create new student
    const newStudent = new Student({
      username,
      email,
      password,
      enrolledCourses: []
    });
    
    const savedStudent = await newStudent.save();
    
    const studentResponse = {
      _id: savedStudent._id,
      username: savedStudent.username,
      email: savedStudent.email,
      enrolledCourses: savedStudent.enrolledCourses,
      createdAt: savedStudent.createdAt
    };
    
    res.status(201).json(studentResponse);
  } catch (error) {
    res.status(500).json({ error: error.message || "Server error" });
  }
});

// Get student's enrolled courses
router.get("/:id/schedule", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    
    const enrolledCourseIds = student.enrolledCourses.map(course => course.courseId);
    const courses = await Class.find({ '_id': { $in: enrolledCourseIds } });
    
    // Add enrollment date to each course
    const coursesWithEnrollmentDate = courses.map(course => {
      const enrollment = student.enrolledCourses.find(
        e => e.courseId.toString() === course._id.toString()
      );
      
      return {
        ...course.toObject(),
        enrollmentDate: enrollment.enrollmentDate
      };
    });
    
    res.json(coursesWithEnrollmentDate);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Add course to student's schedule
router.post("/:id/enroll/:courseId", async (req, res) => {
  try {
    const { id: studentId, courseId } = req.params;
    
    // Find student and course
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    
    const course = await Class.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    
    // Check if already enrolled
    const alreadyEnrolled = student.enrolledCourses.some(
      enrollment => enrollment.courseId.toString() === courseId
    );
    
    if (alreadyEnrolled) {
      return res.status(400).json({ error: "Already enrolled in this course" });
    }
    
    // Add course to student's schedule
    student.enrolledCourses.push({
      courseId: courseId,
      enrollmentDate: new Date()
    });
    
    await student.save();
    
    res.status(201).json({
      message: "Course added to schedule",
      course: course
    });
  } catch (error) {
    res.status(500).json({ error: error.message || "Server error" });
  }
});

// Remove course from student's schedule
router.delete("/:id/drop/:courseId", async (req, res) => {
  try {
    const { id: studentId, courseId } = req.params;
    
    // Find student
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    
    // Check if enrolled in course
    const isEnrolled = student.enrolledCourses.some(
      enrollment => enrollment.courseId.toString() === courseId
    );
    
    if (!isEnrolled) {
      return res.status(400).json({ error: "Not enrolled in this course" });
    }
    
    // Remove course from student's schedule
    student.enrolledCourses = student.enrolledCourses.filter(
      enrollment => enrollment.courseId.toString() !== courseId
    );
    
    await student.save();
    
    res.json({ message: "Course removed from schedule" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get student's detailed schedule (organized by day)
router.get("/:id/detailed-schedule", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ 
        error: "Student not found", 
        message: "The student with the provided ID does not exist in our records." 
      });
    }

    const enrolledCourseIds = student.enrolledCourses.map(course => course.courseId);
    const courses = await Class.find({ '_id': { $in: enrolledCourseIds } });

    // Organize by day of the week
    const scheduleByDay = {};
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    daysOfWeek.forEach(day => {
      scheduleByDay[day] = courses
        .filter(course => course.schedule.includes(day))
        .map(course => ({
          _id: course._id,
          title: course.title,
          instructor: course.instructor,
          method: course.method,
          credits: course.credits
        }));
    });

    // Remove empty days (if any)
    Object.keys(scheduleByDay).forEach(day => {
      if (scheduleByDay[day].length === 0) {
        delete scheduleByDay[day];
      }
    });

    res.json({
      totalCourses: courses.length,
      totalCredits: courses.reduce((sum, course) => sum + course.credits, 0),
      scheduleByDay
    });

  } catch (error) {
    console.error("Error fetching schedule:", error);
    res.status(500).json({ 
      error: "Server error", 
      message: error.message || "An unexpected error occurred while fetching the schedule."
    });
  }
});



module.exports = router;