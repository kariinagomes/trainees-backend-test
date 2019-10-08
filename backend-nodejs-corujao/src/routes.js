const express = require('express');

const GenreController = require('./app/controllers/GenreController');
const ArtistController = require('./app/controllers/ArtistController');
const MovieController = require('./app/controllers/MovieController');

const routes = express.Router();

// genres
routes.get('/v1/genres', GenreController.listGenres);
routes.post('/v1/genres', GenreController.addGenre);
routes.get('/v1/genres/:genreId', GenreController.getGenre);
routes.put('/v1/genres/:genreId', GenreController.updateGenre);

// artists
routes.get('/v1/artists', ArtistController.listArtists);
routes.post('/v1/artists', ArtistController.addArtist);
routes.get('/v1/artists/:artistId', ArtistController.getArtist);
routes.put('/v1/artists/:artistId', ArtistController.updateArtist);
routes.get('/v1/artists/:artistId/filmography', ArtistController.getArtistFilmography);

// movies
routes.get('/v1/movies', MovieController.listMovies);
routes.post('/v1/movies', MovieController.addMovie);
routes.get('/v1/movies/:movieId', MovieController.getMovie);
routes.put('/v1/movies/:movieId', MovieController.updateMovie);
routes.delete('/v1/movies/:movieId', MovieController.removeMovie)

module.exports = routes;