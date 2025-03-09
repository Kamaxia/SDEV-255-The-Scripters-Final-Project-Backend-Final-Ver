const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  instructor: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  subjectArea: { 
    type: String, 
    required: true 
  },
  credits: { 
    type: Number, 
    required: true,
    min: 1 
  },
  schedule: { 
    type: [String], 
    required: true 
  },
  method: { 
    type: String, 
    required: true 
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Class", ClassSchema);