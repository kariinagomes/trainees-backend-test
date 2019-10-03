const Genre = require('../models/Genre');

module.exports = {
  // index(req, res) {
  //   return res.json({ message: 'Hello world' });
  // }
  async listGenres(req, res) {
    const page = Number(req.query.page) || 1;
    const size = Number(req.query.size) || 10;
    const search = req.query.search || '';
    
    //const genres = await Genre.find();
    const genres = await Genre.find().skip((page - 1) * size).limit(size);
    
    return res.json(genres);
    //return res.status(201).json({ message: 'Olá' });
  },

  async addGenre(req, res) {
    const { description } = req.body;

    const genre = await Genre.create({
      description
    });

    return res.json(genre);
  },

  async getGenre(req, res) {
    const genreId = req.params.genreId;

    try {
      const genre = await Genre.findById(genreId);

      if (!genre) {
        return res.status(400).json({ error: 'Parâmetros invalidos - client side' });
      }

      return res.json(genre);
    } 
    catch(ex) {
      return res.status(500).json({ error: 'Erro durante a criação - server side' });
    }

  },

  async updateGenre(req, res) {
    const genreId = req.params.genreId;
    const { description } = req.body;
    const options = { new: true }; 

    try {
      
      const genre = await Genre.findByIdAndUpdate(genreId, { description }, options);

      if (!genre) {
        return res.status(400).json({ error: 'Parâmetros invalidos - client side' });
      }

      return res.json(genre);
    }
    catch(ex) {
      return res.status(500).json({ error: 'Erro durante a criação - server side' });
    }
    
  }
}
