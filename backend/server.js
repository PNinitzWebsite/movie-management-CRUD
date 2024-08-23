const express = require('express');
const app = express();
const port = 3001;

// Middleware to parse JSON
app.use(express.json());
// ตัวอย่าง movies
let movies = [
  { title: 'Inception', year: 2010, rating: 'PG' },
  { title: 'The Matrix', year: 1999, rating: 'R' },
];

// GET endpoint to fetch movies
app.get('/api/movies', (req, res) => {
  res.json(movies);
});

// POST endpoint to add a movie
app.post('/api/movies', (req, res) => {
  const movie = req.body;
  movies.push(movie);
  res.json(movie);
});

// DELETE endpoint to delete a movie
app.delete('/api/movies/:title', (req, res) => {
  const { title } = req.params;
  movies = movies.filter(movie => movie.title !== title);
  res.sendStatus(204);
});

// UPDATE endpoint to update a movie
app.put('/api/movies/:title', (req, res) => {
  const { title } = req.params;
  const updatedMovie = req.body;
  const movieIndex = movies.findIndex((m) => m.title === title);
  if (movieIndex !== -1) {
    movies[movieIndex] = updatedMovie;
    res.status(200).send(updatedMovie);
  } else {
    res.status(404).send({ error: 'Movie not found' });
  }
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
