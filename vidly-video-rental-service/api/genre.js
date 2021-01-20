const Joi = require("joi");
const express = require("express");
const app = express();

/************************* Middleware ****************************/
app.use(express.json());
/********************* Test genres ******************************/

const genres = [
  { id: 1, name: "Horror" },
  { id: 2, name: "Action" },
  { id: 3, name: "Comedy" },
  { id: 4, name: "Romance" },
];

// GET apis

// Get all the genres
app.get("/api/genres", (req, res) => {
  res.send(genres);
});

// Get a specific genre
app.get("/api/genres/:id", (req, res) => {
  const genre = findGenre(req);

  // Throw 404 if genre not found
  if (!genre) {
    return throwGenre404(req);
  }

  res.send(genre);
});

/**********************************************************************/
// Helper Functions
function findGenre(req) {
  return genres.find((g) => g.id === parseInt(req.params.id));
}

function throwGenre404(req) {
  return res.status(404).send("The given genre ID was not found");
}
/**********************************************************************/

// Setting port

const port = process.env.PORT || 3000;
app.listen(port, console.log(`Listening on port ${port}.....`));
