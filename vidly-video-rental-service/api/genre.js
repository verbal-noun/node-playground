// Dependencies
const Joi = require("joi");
const express = require("express");
const app = express();

// Middleware
app.use(express.json());

// Some dummy genres
const genres = [
  { id: 1, name: "Horror" },
  { id: 2, name: "Comedy" },
  { id: 3, name: "Action" },
  { id: 4, name: "Romance" },
];

// Get Requets
app.get("/", (req, res) => {
  res.send("Welcome to video rental app!");
});

app.get("/api/genres", (req, res) => {
  res.send(genres);
});

app.get("/api/genres/:id", (req, res) => {
  const genre = findGenre(req);

  if (!genre) return throwGenre404(res);
  return res.send(genre);
});

// POST Requests
app.post("/api/genres", (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };

  genres.push(genre);
  res.send(genre);
});
/**********************************************************************/
// Helper Functions
function findGenre(req) {
  return genres.find((g) => g.id === parseInt(req.params.id));
}

function throwGenre404(res) {
  return res.status(404).send("The given genre ID was not found.");
}

function validateGenre(genre) {
  // Define Schema
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(genre);
}
/**********************************************************************/
// Setting port
const port = process.env.PORT || 3000;
app.listen(port, console.log(`Listening of port: ${port}...`));
