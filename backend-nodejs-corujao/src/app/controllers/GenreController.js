const Genre = require('../models/Genre');
const SearchWord = require('../utils/SearchWord');
const ResponseMessage = require('../utils/ResponseMessage');

module.exports = {
  //Lista os gêneros cinematográficos
  async listGenres(req, res) {
    //Se os valores não forem informados, considera os da direita como default
    const page = Number(req.query.page) || 1;
    const size = Number(req.query.size) || 10;
    const search = req.query.search || '';
    
    try {
      const genres = await Genre.find().skip((page - 1) * size).limit(size);
      
      //Filtra pelo search caso esse parâmetro seja informado
      if (search !== '') {
        let genresFiltered = [];
        for (let i = 0; i < genres.length; i++) {
          if (SearchWord.checkIfStringExists(search, genres[i].description))
            genresFiltered.push(genres[i]);
        }        
        return ResponseMessage.getResponseMessageOK(genresFiltered, res);
      }
      
      return ResponseMessage.getResponseMessageOK(genres, res);
    }
    catch(error) {
      return ResponseMessage.getResponseErrorServerSide(error, res);
    }
  },

  //Cadastra um novo gênero cinematográfico
  async addGenre(req, res) {
    const { description } = req.body;

    // Não permitir adicionar um gênero se a descrição estiver em branco
    if (!description) {
      return ResponseMessage.getResponseErrorClientSide(400, res);
    }

    try {
      const genre = await Genre.create({ description });
      return ResponseMessage.getResponseMessageOK(genre, res);
    }    
    catch(error) {
      return ResponseMessage.getResponseErrorServerSide(error, res);
    }
  },
  
  //Detalhe de gênero cinematográfico
  async getGenre(req, res) {
    const { genreId } = req.params;

    if (!genreId) {
      return ResponseMessage.getResponseErrorClientSide(400, res);
    }
    
    try {
      const genre = await Genre.findById(genreId);
      return ResponseMessage.getResponseMessageOK(genre, res); 
    } 
    catch(error) {
      return ResponseMessage.getResponseErrorServerSide(error, res);
    }
  },

  //Atualização de gênero cinematográfico
  async updateGenre(req, res) {
    const { genreId } = req.params;
    const { description } = req.body;
    const options = { new: true }; //mostra o dado atualizado

    // Não permitir atualizar a descrição do gênero para vazio
    if (!genreId || !description) {
      return ResponseMessage.getResponseErrorClientSide(400, res);
    }

    try {      
      const genre = await Genre.findByIdAndUpdate(genreId, { description }, options);
      return ResponseMessage.getResponseMessageOK(genre, res);
    }
    catch(error) {
      return ResponseMessage.getResponseErrorServerSide(error, res);
    }    
  }
}
