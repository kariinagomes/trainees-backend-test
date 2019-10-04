const Artist = require('../models/Artist');
const Movie = require('../models/Movie');

module.exports = {
  //Lista os artistas
  async listArtists(req, res) {
    const page = Number(req.query.page) || 1;
    const size = Number(req.query.size) || 10;
    const search = req.query.search || '';
    
    try {
      const artists = await Artist.find().skip((page - 1) * size).limit(size);
      
      return res.json(artists);
    } catch(ex) {
      return res.status(500).json({ error: 'Erro durante a listagem - server side' });
      //return res.status(code).json({ error: `Erro durante a ${action} - server side` });
    }
  },

  //Cadastra um novo artista
  async addArtist(req, res) {
    const { firstName, lastName, dateOfBirth } = req.body;

    try {
      const artist = await Artist.create({
        firstName,
        lastName,
        dateOfBirth
      });

      return res.json(artist);
    }
    catch(ex) {
      return res.status(500).json({ error: 'Erro durante a criação - server side' });
    }    
  },

  //Detalhe do artista
  async getArtist(req, res) {
    const artistId = req.params.artistId;

    try {
      const artist = await Artist.findById(artistId);

      // if (!artist) {
      //   return res.status(400).json({ error: 'Parâmetros invalidos - client side' });
      // }

      return res.json(artist);
    } 
    catch(ex) {
      return res.status(500).json({ error: 'Erro durante a pesquisa - server side' });
    }
  },

  //Atualização do artista
  async updateArtist(req, res) {
    const artistId = req.params.artistId;
    const { firstName, lastName, dateOfBirth } = req.body;
    const options = { new: true }; 

    if (!firstName && !lastName && !dateOfBirth) {
      return res.status(400).json({ error: 'Parâmetros inválidos - client side' });
    }

    try {      
      const artist = await Artist.findByIdAndUpdate(artistId, { 
        firstName, lastName, dateOfBirth 
      }, options);

      // if (!artist) {
      //   return res.status(400).json({ error: 'Parâmetros invalidos - client side' });
      // }

      return res.json(artist);
    }
    catch(ex) {
      return res.status(500).json({ error: 'Erro durante a atualização - server side' });
    }    
  },

  //Filmografia
  async getArtistFilmography(req, res) {
    const artistId = req.params.artistId;

    try {
      const movies = await Movie.find({ cast: { $all: artistId} })
          .populate('genres')
          .populate('director')
          .populate('cast');

      return res.json(movies);
    } 
    catch(ex) {
      return res.status(500).json({ error: 'Erro durante a pesquisa - server side' });
    }
  },
}
