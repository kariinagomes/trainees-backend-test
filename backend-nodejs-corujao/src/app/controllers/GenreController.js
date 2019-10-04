const Genre = require('../models/Genre');

module.exports = {
  //Lista os gêneros cinematográficos
  async listGenres(req, res) {
    const page = Number(req.query.page) || 1;
    const size = Number(req.query.size) || 10;
    const search = req.query.search || '';

    try {
      //const genres = await Genre.find();
      const genres = await Genre.find().skip((page - 1) * size).limit(size);

      return res.json(genres);
    }
    catch(ex) {
      return res.status(500).json({ error: 'Erro durante a listagem - server side' });
    }
  },

  //Cadastra um novo gênero cinematográfico
  async addGenre(req, res) {
    const { description } = req.body;

    if (!description) {
      return res.status(400).json({ error: 'Parâmetros inválidos - client side' });
    }

    try {
      const genre = await Genre.create({ description });

      return res.json(genre);
    }    
    catch(ex) {
      return res.status(500).json({ error: 'Erro durante a criação - server side' });
    }
  },
  
  //Detalhe de gênero cinematográfico
  async getGenre(req, res) {
    const genreId = req.params.genreId;

    try {
      const genre = await Genre.findById(genreId);

      return res.json(genre);
    } 
    catch(ex) {
      return res.status(500).json({ error: 'Erro durante a pesquisa - server side' });
    }
  },

  //Atualização de gênero cinematográfico
  async updateGenre(req, res) {
    const genreId = req.params.genreId;
    const { description } = req.body;
    const options = { new: true }; //mostra o dado atualizado

    if (!description) {
      return res.status(400).json({ error: 'Parâmetros inválidos - client side' });
    }

    try {      
      const genre = await Genre.findByIdAndUpdate(genreId, { description }, options);

      // if (!genre) {
      //   return res.status(400).json({ error: 'Parâmetros invalidos - client side' });
      // }

      return res.json(genre);
    }
    catch(ex) {
      return res.status(500).json({ error: 'Erro durante a atualização - server side' });
    }    
  }
}
