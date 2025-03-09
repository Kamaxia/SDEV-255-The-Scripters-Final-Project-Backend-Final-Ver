require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../db");
const Class = require("../models/Class");
const { Teacher, Student } = require("../models/users");

const seedDatabase = async () => {
  try {
    await connectDB();
    
    await Teacher.deleteMany({});
    await Student.deleteMany({});
    await Class.deleteMany({});
    
    console.log("Cleared existing data from MongoDB collections");
    
    const teachers = [
      {
        username: "Matthew Donell",
        email: "mdonell@catalyst.edu",
        password: "password123",
        area: "Mathematics"
      },
      {
        username: "Meredith Kortland",
        email: "mkortland@catalyst.edu",
        password: "password123",
        area: "English"
      },
      {
        username: "Padley Perard",
        email: "pperard@catalyst.edu",
        password: "password123",
        area: "Languages"
      },
      {
        username: "Zachary Hamby",
        email: "zhamby@catalyst.edu",
        password: "password123",
        area: "Computer Science"
      },
      {
        username: "Marvens Scott",
        email: "mscott@catalyst.edu",
        password: "password123",
        area: "Design"
      },
      {
        username: "Martha Packard",
        email: "mpackard@catalyst.edu",
        password: "password123",
        area: "Communication"
      },
      {
        username: "Tony Galburg",
        email: "tgalburg@catalyst.edu",
        password: "password123",
        area: "Computer Science"
      },
      {
        username: "Harry Potter",
        email: "hpotter@catalyst.edu",
        password: "password123",
        area: "Computer Science"
      }
    ];
    
    const students = [
      {
        username: "Alex Johnson",
        email: "ajohnson@student.catalyst.edu",
        password: "password123",
        enrolledCourses: []
      },
      {
        username: "Taylor Smith",
        email: "tsmith@student.catalyst.edu",
        password: "password123",
        enrolledCourses: []
      },
      {
        username: "Jordan Lee",
        email: "jlee@student.catalyst.edu",
        password: "password123",
        enrolledCourses: []
      },
      {
        username: "Morgan Wilson",
        email: "mwilson@student.catalyst.edu",
        password: "password123",
        enrolledCourses: []
      },
      {
        username: "Casey Brown",
        email: "cbrown@student.catalyst.edu",
        password: "password123",
        enrolledCourses: []
      }
    ];
    
    const savedTeachers = await Teacher.insertMany(teachers);
    const savedStudents = await Student.insertMany(students);
    
    console.log(`Created ${savedTeachers.length} teachers and ${savedStudents.length} students`);
    
    const teacherMap = {};
    savedTeachers.forEach(teacher => {
      teacherMap[teacher.username] = teacher._id;
    });
    
    const classesData = [
      {
        title: "Mathematics",
        instructor: "Matthew Donell",
        description: "Introduction to Algebra, Trigonometry, Calculus",
        subjectArea: "MATH",
        credits: 3,
        schedule: ["Monday", "Wednesday"],
        method: "virtual",
        createdBy: teacherMap["Matthew Donell"]
      },
      {
        title: "English",
        instructor: "Meredith Kortland",
        description: "Introduction to grammar, syntax, lexico",
        subjectArea: "ENGL",
        credits: 3,
        schedule: ["Tuesday", "Wednesday"],
        method: "on campus",
        createdBy: teacherMap["Meredith Kortland"]
      },
      {
        title: "French",
        instructor: "Padley Perard",
        description: "Introduction to verbs, vocabulary, basic communications",
        subjectArea: "LANG",
        credits: 4,
        schedule: ["Tuesday", "Thursday"],
        method: "online",
        createdBy: teacherMap["Padley Perard"]
      },
      {
        title: "Javascript",
        instructor: "Zachary Hamby",
        description: "Web development using Javascript and its modules",
        subjectArea: "COMP",
        credits: 3,
        schedule: ["Monday", "Wednesday"],
        method: "Learn Anywhere",
        createdBy: teacherMap["Zachary Hamby"]
      },
      {
        title: "UI/UX Design",
        instructor: "Marvens Scott",
        description: "Web design using bootstrap",
        subjectArea: "DSGN",
        credits: 2,
        schedule: ["Wednesday"],
        method: "on campus",
        createdBy: teacherMap["Marvens Scott"]
      },
      {
        title: "Communication",
        instructor: "Martha Packard",
        description: "Learn how to communicate better",
        subjectArea: "COMM",
        credits: 2,
        schedule: ["Wednesday"],
        method: "on campus",
        createdBy: teacherMap["Martha Packard"]
      },
      {
        title: "SDEV 255",
        instructor: "Zachary Hamby",
        description: "Web design using bootstrap, Javascript intro, node.js, Express...",
        subjectArea: "COMP",
        credits: 4,
        schedule: ["Monday", "Wednesday"],
        method: "on campus",
        createdBy: teacherMap["Zachary Hamby"]
      },
      {
        title: "Machine Learning",
        instructor: "Tony Galburg",
        description: "Learn AI, build machine learning systems",
        subjectArea: "COMP",
        credits: 3,
        schedule: ["Saturday"],
        method: "on campus",
        createdBy: teacherMap["Tony Galburg"]
      },
      {
        title: "Cybersecurity",
        instructor: "Harry Potter",
        description: "Learn how to defend against cyber threats",
        subjectArea: "COMP",
        credits: 3,
        schedule: ["Wednesday", "Friday"],
        method: "online",
        createdBy: teacherMap["Harry Potter"]
      },
    ];

    const savedClasses = await Class.insertMany(classesData);
    
    console.log(`Created ${savedClasses.length} classes`);
    
    const student1 = savedStudents[0];
    const student2 = savedStudents[1];
    
    const mathClass = savedClasses.find(c => c.title === "Mathematics");
    const englishClass = savedClasses.find(c => c.title === "English");
    const javascriptClass = savedClasses.find(c => c.title === "Javascript");
    const uiuxClass = savedClasses.find(c => c.title === "UI/UX Design");
    
    student1.enrolledCourses.push({
      courseId: mathClass._id,
      enrollmentDate: new Date()
    });
    
    student1.enrolledCourses.push({
      courseId: javascriptClass._id,
      enrollmentDate: new Date()
    });
    
    await student1.save();
    
    student2.enrolledCourses.push({
      courseId: englishClass._id,
      enrollmentDate: new Date()
    });
    
    student2.enrolledCourses.push({
      courseId: uiuxClass._id,
      enrollmentDate: new Date()
    });
    
    await student2.save();
    
    console.log("Enrolled students in classes");
    console.log("Database seeding completed successfully");
    
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();