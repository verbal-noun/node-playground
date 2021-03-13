// This require returns a function
const Joi = require("joi");
const express = require("express");
const app = express();

// Middleware
app.use(express.json());

/**********************************************************************/
const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
  { id: 4, name: "course4" },
];

/**********************************************************************/
// GET requests
app.get("/", (req, res) => {
  res.send("Hello world!!!");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

// Parameters and queries
app.get("/api/courses/:id", (req, res) => {
  const course = findCourse(req);

  // 404
  //if (!course) return res.status(404).send("The given course ID was not found");
  if (!course) return throwCourse404(res);
  res.send(course);
});

// Post request - Adding new course
app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body);
  // If not found then return 400
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };

  courses.push(course);
  res.send(course);
});

// Put method - Updating new course
app.put("/api/courses/:id", (req, res) => {
  // Fine course
  const course = findCourse(req);
  if (!course) return throwCourse404(res);

  // Validate the course
  const { error } = validateCourse(req.body);
  // If not found then return 404
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  // Update course
  course.name = req.body.name;
  res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
  // Find course
  const course = findCourse(req);
  if (!course) return throwCourse404(res);

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

/**********************************************************************/
// Helper Functions
function validateCourse(course) {
  // Define schema
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(course);
}

function findCourse(req) {
  return courses.find((c) => c.id === parseInt(req.params.id));
}

function throwCourse404(res) {
  return res.status(404).send("The given course ID was not found");
}
/**********************************************************************/

// Setting port
const port = process.env.PORT || 3000;
app.listen(port, console.log(`Listening on port ${port}...`));
