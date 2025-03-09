
# SDEV-255-Final-Project-The-Scripters

This repository contains the backend for our student-teacher course management system. It provides RESTful APIs to manage courses, student enrollments, and teacher class management.
  
Our backend ensures: 
- Students can enroll in and drop courses.
- Teachers can create, update, and delete **their own** courses.
- Edge cases are handled, such as:
    - Preventing students from enrolling in a course they are already enrolled in.
    - Preventing students from dropping a course they are not enrolled in.
    - Ensuring only the teacher who created a course can modify or delete it.
    - Returning meaningful error messages for invalid operations.


### Install Dependencies

Run `npm install` in the project root.

### Configure Environment Variables
  
Add the `.env` file you have for the project to the project root.

```
MONGO_URI="your_mongo_connection_string"
PORT=3000
```

### Seed the Database

Run the seed file to insert the initial dummy data into the MongoDB database if the database hasn't been seeded yet.


```
node seed/appSeeder.js
```

### Run the Server
`nodemon start`

  
### API Endpoints 

For testing, you can use Postman, CURL or any HTTP client. Here are the main endpoints and example commands:


#### Class Routes
##### GET all classes

```
Invoke-RestMethod -Uri "http://localhost:3000/api/classes" -Method Get
```

Returns:  
```
_id         : 67cc97a8dc35bde76417d468
title       : Mathematics
instructor  : Matthew Donell
description : Introduction to Algebra, Trigonometry, Calculus
subjectArea : MATH
credits     : 3
schedule    : {Monday, Wednesday}
method      : virtual
createdBy   : 67cc97a7dc35bde76417d459
__v         : 0
createdAt   : 2025-03-08T19:16:56.014Z
updatedAt   : 2025-03-08T19:16:56.014Z

_id         : 67cc97a8dc35bde76417d469
title       : English
instructor  : Meredith Kortland
description : Introduction to grammar, syntax, lexico
subjectArea : ENGL
credits     : 3
schedule    : {Tuesday, Wednesday}
method      : on campus
createdBy   : 67cc97a7dc35bde76417d45a
__v         : 0
createdAt   : 2025-03-08T19:16:56.014Z
updatedAt   : 2025-03-08T19:16:56.014Z

_id         : 67cc97a8dc35bde76417d46a
title       : French
instructor  : Padley Perard
description : Introduction to verbs, vocabulary, basic communications
subjectArea : LANG
credits     : 4
schedule    : {Tuesday, Thursday}
method      : online
createdBy   : 67cc97a7dc35bde76417d45b
__v         : 0
createdAt   : 2025-03-08T19:16:56.014Z
updatedAt   : 2025-03-08T19:16:56.014Z

_id         : 67cc97a8dc35bde76417d46b
title       : Javascript
instructor  : Zachary Hamby
description : Web development using Javascript and its modules
subjectArea : COMP
credits     : 3
schedule    : {Monday, Wednesday}
method      : Learn Anywhere
createdBy   : 67cc97a7dc35bde76417d45c
__v         : 0
createdAt   : 2025-03-08T19:16:56.014Z
updatedAt   : 2025-03-08T19:16:56.014Z

_id         : 67cc97a8dc35bde76417d46c
title       : UI/UX Design
instructor  : Marvens Scott
description : Web design using bootstrap
subjectArea : DSGN
credits     : 2
schedule    : {Wednesday}
method      : on campus
createdBy   : 67cc97a7dc35bde76417d45d
__v         : 0
createdAt   : 2025-03-08T19:16:56.015Z
updatedAt   : 2025-03-08T19:16:56.015Z

_id         : 67cc97a8dc35bde76417d46d
title       : Communication
instructor  : Martha Packard
description : Learn how to communicate better
subjectArea : COMM
credits     : 2
schedule    : {Wednesday}
method      : on campus
createdBy   : 67cc97a7dc35bde76417d45e
__v         : 0
createdAt   : 2025-03-08T19:16:56.015Z
updatedAt   : 2025-03-08T19:16:56.015Z

_id         : 67cc97a8dc35bde76417d46e
title       : SDEV 255
instructor  : Zachary Hamby
description : Web design using bootstrap, Javascript intro, node.js, Express...
subjectArea : COMP
credits     : 4
schedule    : {Monday, Wednesday}
method      : on campus
createdBy   : 67cc97a7dc35bde76417d45c
__v         : 0
createdAt   : 2025-03-08T19:16:56.015Z
updatedAt   : 2025-03-08T19:16:56.015Z

_id         : 67cc97a8dc35bde76417d46f
title       : Machine Learning
instructor  : Tony Galburg
description : Learn AI, build machine learning systems
subjectArea : COMP
credits     : 3
schedule    : {Saturday}
method      : on campus
createdBy   : 67cc97a7dc35bde76417d45f
__v         : 0
createdAt   : 2025-03-08T19:16:56.015Z
updatedAt   : 2025-03-08T19:16:56.015Z

_id         : 67cc97a8dc35bde76417d470
title       : Cybersecurity
instructor  : Harry Potter
description : Learn how to defend against cyber threats
subjectArea : COMP
credits     : 3
schedule    : {Wednesday, Friday}
method      : online
createdBy   : 67cc97a7dc35bde76417d460
__v         : 0
createdAt   : 2025-03-08T19:16:56.015Z
updatedAt   : 2025-03-08T19:16:56.015Z
```

##### GET a single class by ID
```
Invoke-RestMethod -Uri "http://localhost:3000/api/classes/{_class_id}" -Method Get
```

Returns: 
```
_id         : 67cc97a8dc35bde76417d470
title       : Cybersecurity
instructor  : Harry Potter
description : Learn how to defend against cyber threats
subjectArea : COMP
credits     : 3
schedule    : {Wednesday, Friday}
method      : online
createdBy   : 67cc97a7dc35bde76417d460
__v         : 0
createdAt   : 2025-03-08T19:16:56.015Z
updatedAt   : 2025-03-08T19:16:56.015Z
```

#### Teacher Routes
- GET all teachers
```
Invoke-RestMethod -Uri "http://localhost:3000/api/teachers" -Method Get
```

Returns:
```
_id       : 67cc999c9deb5f4c68c7779d
username  : Matthew Donell
email     : mdonell@catalyst.edu
area      : Mathematics
__v       : 0
createdAt : 2025-03-08T19:25:16.042Z
updatedAt : 2025-03-08T19:25:16.042Z

_id       : 67cc999c9deb5f4c68c7779e
username  : Meredith Kortland
email     : mkortland@catalyst.edu
area      : English
__v       : 0
createdAt : 2025-03-08T19:25:16.042Z
updatedAt : 2025-03-08T19:25:16.042Z

_id       : 67cc999c9deb5f4c68c7779f
username  : Padley Perard
email     : pperard@catalyst.edu
area      : Languages
__v       : 0
createdAt : 2025-03-08T19:25:16.042Z
updatedAt : 2025-03-08T19:25:16.042Z

_id       : 67cc999c9deb5f4c68c777a0
username  : Zachary Hamby
email     : zhamby@catalyst.edu
area      : Computer Science
__v       : 0
createdAt : 2025-03-08T19:25:16.042Z
updatedAt : 2025-03-08T19:25:16.042Z

_id       : 67cc999c9deb5f4c68c777a1
username  : Marvens Scott
email     : mscott@catalyst.edu
area      : Design
__v       : 0
createdAt : 2025-03-08T19:25:16.042Z
updatedAt : 2025-03-08T19:25:16.042Z

_id       : 67cc999c9deb5f4c68c777a2
username  : Martha Packard
email     : mpackard@catalyst.edu
area      : Communication
__v       : 0
createdAt : 2025-03-08T19:25:16.043Z
updatedAt : 2025-03-08T19:25:16.043Z

_id       : 67cc999c9deb5f4c68c777a3
username  : Tony Galburg
email     : tgalburg@catalyst.edu
area      : Computer Science
__v       : 0
createdAt : 2025-03-08T19:25:16.043Z
updatedAt : 2025-03-08T19:25:16.043Z

_id       : 67cc999c9deb5f4c68c777a4
username  : Harry Potter
email     : hpotter@catalyst.edu
area      : Computer Science
__v       : 0
createdAt : 2025-03-08T19:25:16.043Z
updatedAt : 2025-03-08T19:25:16.043Z
```

##### GET a teacher by Id
```
Invoke-RestMethod -Uri "http://localhost:3000/api/teachers/{_teacher_id}" -Method Get
```

Returns:
```
_id       : 67cc999c9deb5f4c68c777a4
username  : Harry Potter
email     : hpotter@catalyst.edu
area      : Computer Science
__v       : 0
createdAt : 2025-03-08T19:25:16.043Z
updatedAt : 2025-03-08T19:25:16.043Z
```

##### Create a class as a teacher
```
$body = @{
    title = "Advanced Physics HARRY POTTER"
    description = "Quantum mechanics and relativity"
    subjectArea = "PHYS"
    credits = 4
    schedule = @("Monday", "Wednesday")
    method = "on campus"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/teachers/{_teacher_id}/classes" -Method Post -Body $body -ContentType "application/json"
```

Returns:
```
title       : Advanced Physics HARRY POTTER
instructor  : Harry Potter
description : Quantum mechanics and relativity
subjectArea : PHYS
credits     : 4
schedule    : {Monday, Wednesday}
method      : on campus
createdBy   : 67cc999c9deb5f4c68c777a4
_id         : 67cc9a5926ebe38ae9994d1b
createdAt   : 2025-03-08T19:28:25.777Z
updatedAt   : 2025-03-08T19:28:25.777Z
__v         : 0
```

##### GET courses created by a teacher
```
Invoke-RestMethod -Uri "http://localhost:3000/api/teachers/{_teacher_id}/classes" -Method Get
```

Returns: 
```
_id         : 67cc999c9deb5f4c68c777b4
title       : Cybersecurity
instructor  : Harry Potter
description : Learn how to defend against cyber threats
subjectArea : COMP
credits     : 3
schedule    : {Wednesday, Friday}
method      : online
createdBy   : 67cc999c9deb5f4c68c777a4
__v         : 0
createdAt   : 2025-03-08T19:25:16.132Z
updatedAt   : 2025-03-08T19:25:16.132Z

_id         : 67cc9a5926ebe38ae9994d1b
title       : Advanced Physics HARRY POTTER
instructor  : Harry Potter
description : Quantum mechanics and relativity
subjectArea : PHYS
credits     : 4
schedule    : {Monday, Wednesday}
method      : on campus
createdBy   : 67cc999c9deb5f4c68c777a4
createdAt   : 2025-03-08T19:28:25.777Z
updatedAt   : 2025-03-08T19:28:25.777Z
__v         : 0
```


##### Update a class as a teacher
```
$updateBody = @{
    teacherId = "{_teacher_id}"
    description = "Updated course description! TEST!"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/teachers/classes/{_class_id}" -Method Put -Body $updateBody -ContentType "application/json"
```

Returns: 
```
_id         : 67cc9a5926ebe38ae9994d1b
title       : Advanced Physics HARRY POTTER
instructor  : Harry Potter
description : Updated course description! TEST!
subjectArea : PHYS
credits     : 4
schedule    : {Monday, Wednesday}
method      : on campus
createdBy   : 67cc999c9deb5f4c68c777a4
createdAt   : 2025-03-08T19:28:25.777Z
updatedAt   : 2025-03-08T19:30:29.467Z
__v         : 0
```


##### Delete a class as a teacher
```
$deleteBody = @{
    teacherId = "{_teacher_id}"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/teachers/classes/{_class_id}" -Method Delete -Body $deleteBody -ContentType "application/json"
```

Returns: 
```
message
-------
Class deleted successfully
```


#### Student Schedules

#### Get all students
```
Invoke-RestMethod -Uri "http://localhost:3000/api/students" -Method Get
```

Returns:
```
_id             : 67cc999c9deb5f4c68c777a6
username        : Alex Johnson
email           : ajohnson@student.catalyst.edu
enrolledCourses : {@{courseId=67cc999c9deb5f4c68c777ac; enrollmentDate=2025-03-08T19:25:16.164Z; _id=67cc999c9deb5f4c68c777b8},
                  @{courseId=67cc999c9deb5f4c68c777af; enrollmentDate=2025-03-08T19:25:16.165Z; _id=67cc999c9deb5f4c68c777b9}}
__v             : 1
createdAt       : 2025-03-08T19:25:16.079Z
updatedAt       : 2025-03-08T19:25:16.166Z

_id             : 67cc999c9deb5f4c68c777a7
username        : Taylor Smith
email           : tsmith@student.catalyst.edu
enrolledCourses : {@{courseId=67cc999c9deb5f4c68c777ad; enrollmentDate=2025-03-08T19:25:16.211Z; _id=67cc999c9deb5f4c68c777bb},
                  @{courseId=67cc999c9deb5f4c68c777b0; enrollmentDate=2025-03-08T19:25:16.211Z; _id=67cc999c9deb5f4c68c777bc}}
__v             : 1
createdAt       : 2025-03-08T19:25:16.079Z
updatedAt       : 2025-03-08T19:25:16.211Z

_id             : 67cc999c9deb5f4c68c777a8
username        : Jordan Lee
email           : jlee@student.catalyst.edu
enrolledCourses : {}
__v             : 0
createdAt       : 2025-03-08T19:25:16.080Z
updatedAt       : 2025-03-08T19:25:16.080Z

_id             : 67cc999c9deb5f4c68c777a9
username        : Morgan Wilson
email           : mwilson@student.catalyst.edu
enrolledCourses : {}
__v             : 0
createdAt       : 2025-03-08T19:25:16.080Z
updatedAt       : 2025-03-08T19:25:16.080Z

_id             : 67cc999c9deb5f4c68c777aa
username        : Casey Brown
email           : cbrown@student.catalyst.edu
enrolledCourses : {}
__v             : 0
createdAt       : 2025-03-08T19:25:16.080Z
updatedAt       : 2025-03-08T19:25:16.080Z
```

#### Get a specific student by ID
```
Invoke-RestMethod -Uri "http://localhost:3000/api/students/{_student_id}" -Method Get
```

Returns: 
```
_id             : 67cc999c9deb5f4c68c777a6
username        : Alex Johnson
email           : ajohnson@student.catalyst.edu
enrolledCourses : {@{courseId=67cc999c9deb5f4c68c777ac; enrollmentDate=2025-03-08T19:25:16.164Z; _id=67cc999c9deb5f4c68c777b8},
                  @{courseId=67cc999c9deb5f4c68c777af; enrollmentDate=2025-03-08T19:25:16.165Z; _id=67cc999c9deb5f4c68c777b9}}
__v             : 1
createdAt       : 2025-03-08T19:25:16.079Z
updatedAt       : 2025-03-08T19:25:16.166Z
```

##### Create a new student

```
$body = @{
    username = "New Student"
    email = "newstudent@catalyst.edu"
    password = "password123"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/students" -Method Post -Body $body -ContentType "application/json"
```

Returns: 
```
_id             : 67cc9e115c737346a54ca8e7
username        : New Student
email           : newstudent@catalyst.edu
enrolledCourses : {}
createdAt       : 2025-03-08T19:44:17.257Z
```

##### Get a student's schedule
```
Invoke-RestMethod -Uri "http://localhost:3000/api/students/{_student_id}/schedule" -Method Get
```

Returns: 
```
_id            : 67cc999c9deb5f4c68c777ac
title          : Mathematics
instructor     : Matthew Donell
description    : Introduction to Algebra, Trigonometry, Calculus
subjectArea    : MATH
credits        : 3
schedule       : {Monday, Wednesday}
method         : virtual
createdBy      : 67cc999c9deb5f4c68c7779d
__v            : 0
createdAt      : 2025-03-08T19:25:16.131Z
updatedAt      : 2025-03-08T19:25:16.131Z
enrollmentDate : 2025-03-08T19:25:16.164Z

_id            : 67cc999c9deb5f4c68c777af
title          : Javascript
instructor     : Zachary Hamby
description    : Web development using Javascript and its modules
subjectArea    : COMP
credits        : 3
schedule       : {Monday, Wednesday}
method         : Learn Anywhere
createdBy      : 67cc999c9deb5f4c68c777a0
__v            : 0
createdAt      : 2025-03-08T19:25:16.131Z
updatedAt      : 2025-03-08T19:25:16.131Z
enrollmentDate : 2025-03-08T19:25:16.165Z
```

##### Enroll in a course
```
Invoke-RestMethod -Uri "http://localhost:3000/api/students/{_student_id}/enroll/{_class_id}" -Method Post
```
Returns: 

```
message                  course
-------                  ------
Course added to schedule @{_id=67cc999c9deb5f4c68c777b4; title=Cybersecurity; instructor=Harry Potter; description=Learn how to defend against cyber threats; sub...
```

##### Drop a course
```
Invoke-RestMethod -Uri "http://localhost:3000/api/students/{_student_id}/drop/{_class_id}" -Method Delete
```

Returns:
```
message
-------
Course removed from schedule
```

##### Get detailed student schedule by day
```
Invoke-RestMethod -Uri "http://localhost:3000/api/students/{_student_id}/detailed-schedule" -Method Get
```

Returns: 
```
totalCourses totalCredits scheduleByDay
------------ ------------ -------------
           2            6 @{Monday=System.Object[]; Wednesday=System.Object[]}
```           

#### Common API error codes

| Scenario | Status Code | Message |
|----------|-------------|---------|
| Student tries to enroll in the same course twice | 400 | "Already enrolled in this course" |
| Student tries to drop a course they are not enrolled in | 400 | "Not enrolled in this course" |
| Teacher tries to edit/delete another teacher's course | 403 | "Forbidden: You can only edit your own courses" |
| Student/Teacher ID is invalid | 404 | "User not found" |
| Course ID is invalid | 404 | "Class not found" |
