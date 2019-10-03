const express = require('express');

const GenreController = require('./controllers/GenreController');
const ArtistController = require('./controllers/ArtistController');

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

module.exports = routes;