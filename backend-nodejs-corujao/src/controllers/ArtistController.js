const Artist = require('../models/Artist');

module.exports = {
  async listArtists(req, res) {
    const page = Number(req.query.page) || 1;
    const size = Number(req.query.size) || 10;
    const search = req.query.search || '';
    
    //const artists = await Artist.find();
    const artists = await Artist.find().skip((page - 1) * size).limit(size);
    
    return res.json(artists);
  },

  async addArtist(req, res) {
    const { firstName, lastName, dateOfBirth } = req.body;

    const artist = await Artist.create({
      firstName,
      lastName,
      dateOfBirth
    });

    return res.json(artist);
  },

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
      return res.status(500).json({ error: 'Erro durante a criação - server side' });
    }

  },

  async updateArtist(req, res) {
    const artistId = req.params.artistId;
    const { firstName, lastName, dateOfBirth } = req.body;
    const options = { new: true }; 

    try {
      
      const artist = await Artist.findByIdAndUpdate(artistId, { firstName, lastName, dateOfBirth }, options);

      if (!artist) {
        return res.status(400).json({ error: 'Parâmetros invalidos - client side' });
      }

      return res.json(artist);
    }
    catch(ex) {
      return res.status(500).json({ error: 'Erro durante a criação - server side' });
    }
    
  },

  async getArtistFilmography(req, res) {
    const artistId = req.params.artistId;

    try {
      const artist = await Artist.findById(artistId);

      // if (!artist) {
      //   return res.status(400).json({ error: 'Parâmetros invalidos - client side' });
      // }

      return res.json({message: 'Retornar os filmes aqui'});
    } 
    catch(ex) {
      return res.status(500).json({ error: 'Erro durante a criação - server side' });
    }

  }

}
