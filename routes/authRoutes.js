const express = require("express");
const router = express.Router();
const jwt = require("jwt-simple");
const { Teacher, Student } = require("../models/users");
const secret = process.env.JWT_SECRET || "default_secret";



router.post("/signup/student", async (req, res) => {
    if(!req.body.username || !req.body.password || !req.body.email) {
      res.status(400).json({ error: "All fields are required" });
    }
    const newStudent = new Student({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
    try {
      await newStudent.save();
      res.sendStatus(201)
    }
    catch (err) {
      res.status(400).send(err.message);
    }
  })
  
router.post("/signup/teacher", async (req, res) => {
    if(!req.body.username || !req.body.password || !req.body.email || !req.body.area) {
      res.status(400).json({ error: "All fields are required" });
    }
    const newTeacher = new Teacher({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      area: req.body.area
    })
    try {
      await newTeacher.save();
      res.sendStatus(201)
    }
    catch (err) {
      res.status(400).send(err.message);
    }
  })
  
  router.post("/login", async (req, res) => {
    // Only email and password are required to login
    if (!req.body.email || !req.body.password) {
        res.status(401).json({ error: "Email and password are required" });
        return;
    }

    try {
        let user;
        let userType;

        // Check if the user is a student
        user = await Student.findOne({ email: req.body.email });
        if (user) {
            userType = "student";
        }

        // If not a student, check if the user is a teacher
        if (!user) {
            user = await Teacher.findOne({ email: req.body.email });
            if (user) {
                userType = "teacher";
            }
        }

        // If no user found, return an error
        if (!user) {
            res.status(401).json({ error: "User not found" });
            return;
        }

        // Check if the password is correct
        if (user.password === req.body.password) {
            const token = jwt.encode({ email: user.email, userType }, secret);
            res.json({
                token: token,
                userType: userType,
                userId: user._id // Send the user ID as part of the response
            });
        } else {
            res.status(401).json({ error: "Incorrect password" });
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
});


  module.exports = router;