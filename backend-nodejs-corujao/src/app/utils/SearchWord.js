module.exports = {
  /**
   * Verifica se contém o searchValue no arrayValue após formatar as strings
   * (desta forma, buscando palavras "similares").
   */
  checkIfStringExists(searchValue, arrayValue) {    
    let formattedSearchValue = this.formatString(searchValue);
    let formattedArrayValue = this.formatString(arrayValue);

    if (formattedArrayValue.search(formattedSearchValue) === -1) {
      return false;
    } 
    return true;
  },

  /**
   * Remove acentos e alguns caracteres especiais e transforma em
   * letra minuscula.
   * 
   * Exemplo: se na str estiver "Comédiã", retornará "comedia".
   * 
   * Consultado no site: https://metring.com.br/javascript-substituir-caracteres-especiais
   */
  formatString(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }
}