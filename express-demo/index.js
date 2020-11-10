const Joi = require("joi");
const express = require("express");
const app = express();

// Middleware
app.use(express.json());

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
  { id: 4, name: "course4" },
];

// GET requests
app.get("/", (req, res) => {
  res.send("Hello world!!!");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

// Parameters and queries
app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));

  if (!course) {
    // 404 Not found
    res.status(404).send("The course with given ID does not exist");
  }
  res.send(course);
});

// Post request
app.post("/api/courses", (req, res) => {
  // Request body schema
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  const result = schema.validate(req.body);

  if (result.error) {
    // 400 Bad request
    res.status(400).send(result.error);
    return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };

  courses.push(course);
  res.send(course);
});

// Setting port
const port = process.env.PORT || 3000;
app.listen(port, console.log(`Listening on port ${port}...`));
