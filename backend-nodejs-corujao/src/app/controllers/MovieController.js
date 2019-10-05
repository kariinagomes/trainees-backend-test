const Movie = require('../models/Movie');
const SearchWord = require('../utils/SearchWord');
const ResponseMessage = require('../utils/ResponseMessage');
const CheckParams = require('../utils/CheckParams');

//Lista os filmes cinematográficos
module.exports = {
  async listMovies(req, res) {
     //Se os valores não forem informados, considera os da direita como default
     const page = Number(req.query.page) || 1;
     const size = Number(req.query.size) || 10;
     const search = req.query.search || '';
    
    try {
      const movies = await Movie.find().skip((page - 1) * size).limit(size)
        .populate('genres')
        .populate('director')
        .populate('cast');

      //Filtra pelo search caso seja informado o valor
      if (search !== '') {
        let moviesFiltered = [];
        for (let i = 0; i < movies.length; i++) {
          if (SearchWord.checkIfStringExists(search, movies[i].title))
            moviesFiltered.push(movies[i]);
        }        
        return ResponseMessage.getResponseMessageOK(moviesFiltered, res);
      }

      return ResponseMessage.getResponseMessageOK(movies, res);
    }
    catch(ex) {
      return ResponseMessage.getResponseErrorServerSide(error, res);
    }    
  },

  //Cadastra um novo filme
  async addMovie(req, res) {
    if(!CheckParams.checkIfValidParamsMovie(req.body)) {
      return ResponseMessage.getResponseErrorClientSide(400, res);
    }
    
    try {
      const movie = await Movie.create(req.body);
      //const movie = await Movie.create({ title, releaseYear, genres, director, cast });
      
      await movie.populate('genres')
        .populate('director')
        .populate('cast')
        .execPopulate();
      
      return ResponseMessage.getResponseMessageOK(movie, res);
    }
    catch(ex) {
      return ResponseMessage.getResponseErrorServerSide(error, res);
    }   
  },

  //Detalhe do filme
  async getMovie(req, res) {
    const { movieId } = req.params;

    if(!movieId) {
      return ResponseMessage.getResponseErrorClientSide(400, res);
    }

    try {
      const movie = await Movie.findById(movieId)
        .populate('genres')
        .populate('director')
        .populate('cast');

      return ResponseMessage.getResponseMessageOK(movie, res);
    } 
    catch(ex) {
      return ResponseMessage.getResponseErrorServerSide(error, res);
    }
  },

  //Atualização do filme
  async updateMovie(req, res) {
    const { movieId } = req.params;
    const options = { new: true }; 

    if(!movieId || !CheckParams.checkIfValidParamsMovie(req.body)) {
      return ResponseMessage.getResponseErrorClientSide(400, res);
    }

    try {      
      const movie = await Movie.findByIdAndUpdate(movieId, req.body, options)
      .populate('genres')
      .populate('director')
      .populate('cast');

      return ResponseMessage.getResponseMessageOK(movie, res);
    }
    catch(ex) {
      return ResponseMessage.getResponseErrorServerSide(error, res);
    }    
  },

  //Remove um filme do catálogo
  async removeMovie(req, res) {
    const { movieId } = req.params;

    if(!movieId) {
      return ResponseMessage.getResponseErrorClientSide(400, res);
    }
    
    try {
      const result = await Movie.deleteOne({ _id: movieId});

      if (result.deletedCount === 0) {
        return ResponseMessage.getResponseErrorClientSide(404, res);
      } 
      else {
        return ResponseMessage.getResponseMessageOKDelete();
      }
    }
    catch(ex) {
      return ResponseMessage.getResponseErrorServerSide(error, res);
    }
  }
}
