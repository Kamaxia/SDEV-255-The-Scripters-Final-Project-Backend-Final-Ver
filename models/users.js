const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true,
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  enrolledCourses: [{
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class'
    },
    enrollmentDate: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

const teacherSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true,
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  }, 
  area: { 
    type: String, 
    required: true 
  }
}, {
  timestamps: true
});

module.exports = {
  Student: mongoose.model("Student", studentSchema),
  Teacher: mongoose.model("Teacher", teacherSchema)
};