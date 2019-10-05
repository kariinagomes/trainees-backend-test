const Artist = require('../models/Artist');
const Movie = require('../models/Movie');
const SearchWord = require('../utils/SearchWord');
const ResponseMessage = require('../utils/ResponseMessage');
const CheckParams = require('../utils/CheckParams');

module.exports = {
  //Lista os artistas
  async listArtists(req, res) {
    //Se os valores não forem informados, considera os da direita como default
    const page = Number(req.query.page) || 1;
    const size = Number(req.query.size) || 10;
    const search = req.query.search || '';

    try {
      const artists = await Artist.find().skip((page - 1) * size).limit(size);

      //Filtra pelo search caso seja informado o valor
      if (search !== '') {
        let artistsFiltered = [];
        for (let i = 0; i < artists.length; i++) {
          if (SearchWord.checkIfStringExists(search, artists[i].firstName) 
            || SearchWord.checkIfStringExists(search, artists[i].lastName)) {
            artistsFiltered.push(artists[i]);
          } 
        }        
        return ResponseMessage.getResponseMessageOK(artistsFiltered, res);
      }
      
      return ResponseMessage.getResponseMessageOK(artists, res);
    } 
    catch(ex) {
      return ResponseMessage.getResponseErrorServerSide(error, res);
    }
  },

  //Cadastra um novo artista
  async addArtist(req, res) {
    
    if (!CheckParams.checkIfValidParamsArtist(req.body)) {
      return ResponseMessage.getResponseErrorClientSide(400, res);
    }

    try {
      const artist = await Artist.create({
        firstName, lastName, dateOfBirth
      });

      return ResponseMessage.getResponseMessageOK(artist, res);
    }
    catch(ex) {
      return ResponseMessage.getResponseErrorServerSide(error, res);
    }
  },

  //Detalhe do artista
  async getArtist(req, res) {
    const { artistId } = req.params;

    try {
      const artist = await Artist.findById(artistId);
      return ResponseMessage.getResponseMessageOK(artist, res);
    } 
    catch(ex) {
      return ResponseMessage.getResponseErrorServerSide(error, res);
    }
  },

  //Atualização do artista
  async updateArtist(req, res) {
    const { artistId } = req.params;
    const options = { new: true }; 

    if (!CheckParams.checkIfValidParamsArtist(req.body)) {
      return ResponseMessage.getResponseErrorClientSide(400, res);
    }

    try {      
      const artist = await Artist.findByIdAndUpdate(
        artistId, req.body, options
      );

      return ResponseMessage.getResponseMessageOK(artist, res);
    }
    catch(ex) {
      return ResponseMessage.getResponseErrorServerSide(error, res);
    }    
  },

  //Filmografia
  async getArtistFilmography(req, res) {
    const { artistId } = req.params;

    if (!artistId) {
      return ResponseMessage.getResponseErrorClientSide(400, res);
    }    

    try {
      const movies = await Movie.find({ cast: { $all: artistId} })
        .populate('genres')
        .populate('director')
        .populate('cast');

      return ResponseMessage.getResponseMessageOK(movies, res);
    } 
    catch(ex) {
      return ResponseMessage.getResponseErrorServerSide(error, res);
    }
  },
}
