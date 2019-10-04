const Movie = require('../models/Movie');

//Lista os filmes cinematográficos
module.exports = {
  async listMovies(req, res) {
    const page = Number(req.query.page) || 1;
    const size = Number(req.query.size) || 10;
    const search = req.query.search || '';
    
    try {
      const movies = await Movie.find()
      .skip((page - 1) * size)
      .limit(size)
      .populate('genres')
      .populate('director')
      .populate('cast');

      return res.json(movies);
    }
    catch(ex) {
      return res.status(500).json({ error: 'Erro durante a listagem - server side' });
    }    
  },

  //Cadastra um novo filme
  async addMovie(req, res) {
    //const { title, releaseYear, genres, director, cast } = req.body;
    
    //const movie = await Movie.create({ title, releaseYear, genres, director, cast });
    try {
      const movie = await Movie.create(req.body);
      
      await movie.populate('genres')
        .populate('director')
        .populate('cast')
        .execPopulate();
      
      return res.json(movie);
    }
    catch(ex) {
      return res.status(500).json({ error: 'Erro durante a criação - server side' });
    }   
  },

  //Detalhe de filme
  async getMovie(req, res) {
    const movieId = req.params.movieId;

    try {
      const movie = await Movie.findById(movieId)
        .populate('genres')
        .populate('director')
        .populate('cast');

      return res.json(movie);
    } 
    catch(ex) {
      return res.status(500).json({ error: 'Erro durante a consulta - server side' });
    }

  },

  //Atualização de filme
  async updateMovie(req, res) {
    const movieId = req.params.movieId;
    const options = { new: true }; 

    try {
      
      movie = await Movie.findByIdAndUpdate(movieId, req.body, options)
      .populate('genres')
      .populate('director')
      .populate('cast');

      // if (!movie) {
      //   return res.status(400).json({ error: 'Parâmetros invalidos - client side' });
      // }

      return res.json(movie);
    }
    catch(ex) {
      return res.status(500).json({ error: 'Erro durante a atualização - server side' });
    }    
  },

  //Remove um filme do catálogo
  async removeMovie(req, res) {
    const movieId = req.params.movieId;

    try {
      const result = await Movie.deleteOne({ _id: movieId});

      if (result.deletedCount === 0) {
        return res.status(404).json({message: 'Filme não encontrado'});
      } 
      else {
        return res.status(204);
        //return res.status(204).json({message: 'Filme removido com sucesso'});
      }
    }
    catch(ex) {
      return res.status(500).json({ error: 'Erro durante a remoção - server side' });
    }
  }
}
