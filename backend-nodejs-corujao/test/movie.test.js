const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

const server = process.env.SERVER_TEST;
const route = '/movies';

var movieId = '';

describe('Movies', () => {
  describe('POST -> /movies', () => {
    it('should add a new movie', (done) => {
      chai.request(server)
        .get('/genres')
        .end((errorGenre, responseGenre) => {
          chai.request(server)
            .get('/artists')
            .end((errorArtist, responseArtist) => {
              chai.request(server)
                .post(route)
                .send({        
                  title: 'Homem Ferro',
                  releaseYear: 2008,        
                  genres: [
                    { _id: responseGenre.body.record[0]._id }
                  ],
                  director: { _id: responseArtist.body.record[0]._id },
                  cast: [{ _id: responseArtist.body.record[0]._id }],
                })
                .end((err, res) => {
                  res.should.have.status(200);
                  res.should.be.json;
                  res.body.record.should.be.a('object');
                  res.body.record.should.have.property('_id');
                  res.body.record.should.have.property('title');
                  done();
                  movieId = res.body.record._id;
                  // console.log('\n***************************');
                  // console.log(res.body.record);
                  // console.log('\n***************************');
                })
            });
      });
    });

    it('should not accept to add a new movie without title', (done) => {
      chai.request(server)
        .get('/genres')
        .end((errorGenre, responseGenre) => {
          chai.request(server)
            .get('/artists')
            .end((errorArtist, responseArtist) => {
              chai.request(server)
                .post(route)
                .send({        
                  title: '',
                  releaseYear: 2008,        
                  genres: [
                    { _id: responseGenre.body.record[0]._id }
                  ],
                  director: { _id: responseArtist.body.record[0]._id },
                  cast: [{ _id: responseArtist.body.record[0]._id }],
                })
                .end((err, res) => {
                  res.should.have.status(400);
                  res.should.be.json;
                  res.body.should.be.a('object');
                  res.body.should.have.property('type');
                  res.body.should.have.property('type', 'Client side error');
                  done();
                })
            });
      });
    });
  });

  describe('GET -> /movies', () => {
    it('should list all movies with default values as parameters', (done) => {
      chai.request(server)
        .get(route)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.record.should.be.a('array');
          done();
          // console.log('\n***************************');
          // console.log(res.body.record);
          // console.log('***************************\n');
        }); 
    });

    it('should list all movies with filled search value as parameter', (done) => {
      let search = 'ferro';
      chai.request(server)
        .get(route)
        .query({search: `${search}`})
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.record.should.be.a('array');          
          done();
          // console.log('\n***************************');
          // console.log(res.body.record);
          // console.log('***************************\n');
        }); 
    });
  });

  describe('GET -> /movies/{movieId}', () => {
    it('should get movie by id', (done) => {
      chai.request(server)
        .get(`${route}/${movieId}`)
        .end((err, res) => {          
          res.should.have.status(200);
          res.should.be.json;
          res.body.record.should.be.a('object');
          done();
          // console.log('\n***************************');
          // console.log(res.body.record);
          // console.log('***************************\n');
        }); 
    });
  });

  describe('PUT -> /movies/{movieId}', () => {
    it('should update a movie', (done) => {
      chai.request(server)
        .get('/genres')
        .end((errorGenre, responseGenre) => {
          chai.request(server)
            .get('/artists')
            .end((errorArtist, responseArtist) => {
              chai.request(server)
                .post(route)
                .send({        
                  title: 'Homem de Ferro',
                  releaseYear: 2008,        
                  genres: [
                    { _id: responseGenre.body.record[0]._id }
                  ],
                  director: { _id: responseArtist.body.record[0]._id },
                  cast: [{ _id: responseArtist.body.record[0]._id }],
                })
                .end((err, res) => {
                  res.should.have.status(200);
                  res.should.be.json;
                  res.body.record.should.be.a('object');
                  res.body.record.should.have.property('_id');
                  res.body.record.should.have.property('title');
                  done();
                  // console.log('\n***************************');
                  // console.log(res.body.record);
                  // console.log('***************************\n');
                })
            });
      });
    });

    it('should not accept to update a movie without title', (done) => {
      chai.request(server)
        .get('/genres')
        .end((errorGenre, responseGenre) => {
          chai.request(server)
            .get('/artists')
            .end((errorArtist, responseArtist) => {
              chai.request(server)
                .post(route)
                .send({        
                  title: '',
                  releaseYear: 2008,        
                  genres: [
                    { _id: responseGenre.body.record[0]._id }
                  ],
                  director: { _id: responseArtist.body.record[0]._id },
                  cast: [{ _id: responseArtist.body.record[0]._id }],
                })
                .end((err, res) => {
                  res.should.have.status(400);
                  res.should.be.json;
                  res.body.should.be.a('object');
                  res.body.should.have.property('type');
                  res.body.should.have.property('type', 'Client side error');
                  done();
                })
            });
      });
    });
  });

  describe('DELETE -> /movies/{movieId}', () => {
    it('should delete movie by id', (done) => {
      chai.request(server)
        .delete(`${route}/${movieId}`)
        .end((err, res) => {         
          res.should.have.status(204);
          done();
        }); 
    });

    it('should return status 404 when not find movie id', (done) => {
      chai.request(server)
        .delete(`${route}/111111111111111111111111`)
        .end((err, res) => {         
          res.should.have.status(404);
          done();
        }); 
    });
  });  
});