const express = require('express');

const GenreController = require('./app/controllers/GenreController');
const ArtistController = require('./app/controllers/ArtistController');
const MovieController = require('./app/controllers/MovieController');

const routes = express.Router();

// genres
//routes.get('/v1/genres', GenreController.index);
routes.get('/genres', GenreController.listGenres);
routes.post('/genres', GenreController.addGenre);
routes.get('/genres/:genreId', GenreController.getGenre);
routes.put('/genres/:genreId', GenreController.updateGenre);

// artists
routes.get('/artists', ArtistController.listArtists);
routes.post('/artists', ArtistController.addArtist);
routes.get('/artists/:artistId', ArtistController.getArtist);
routes.put('/artists/:artistId', ArtistController.updateArtist);
routes.get('/artists/:artistId/filmography', ArtistController.getArtistFilmography);

// movies
routes.get('/movies', MovieController.listMovies);
routes.post('/movies', MovieController.addMovie);
routes.get('/movies/:movieId', MovieController.getMovie);
routes.put('/movies/:movieId', MovieController.updateMovie);
routes.delete('/movies/:movieId', MovieController.removeMovie)

module.exports = routes;