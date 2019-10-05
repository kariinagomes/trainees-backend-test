module.exports = {
  checkIfValidParamsArtist(body) {
    const { firstName, lastName, dateOfBirth } = body;    
    //Como não são campos obrigatórios, se houver ao menos um,
    //retorna que a entrada é válida
    if (firstName || lastName || dateOfBirth) {
      return true;
    }
    return false;
  },

  checkIfValidParamsMovie(body) {
    const { title, releaseYear, genres, director, cast } = body;  
    //Como não são campos obrigatórios, se houver ao menos um,
    //retorna que a entrada é válida
    if (title || releaseYear || director || genres.length !== 0 
      || cast.length !== 0) {
        return true;
    }
    return false;
  }
}