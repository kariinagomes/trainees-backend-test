const chai = require('chai');
const chaiHttp = require('chai-http');

const Movie = require('../src/app/models/Movie');
const should = chai.should();

chai.use(chaiHttp);

const base_url = 'http://192.168.99.100:5000';
const route = '/movies';

describe('Movies', () => {
  describe('GET -> /movies', () => {
    it('should list all movies with default values as parameters', (done) => {
      chai.request(base_url)
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
      chai.request(base_url)
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

  describe('POST -> /movies', () => {
    it('should add a new movie', (done) => {
      const movie = new Movie({
        genres: [
          { _id: '' },
          { _id: '' }
        ],
        cast: [{}],
        title: 'Homem de Ferro',
        releaseYear: 2008,
        director: { _id: '' }
      });      
      chai.request(base_url)
        .post(route)
        .send(movie)
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

    it('should not accept to add a new movie without first name', (done) => {
      const movie = new Movie({
        genres: [
          { _id: '' },
          { _id: '' }
        ],
        cast: [{}],
        title: 'Homem de Ferro',
        releaseYear: 2008,
        director: { _id: '' }
      });      
      chai.request(base_url)
        .post(route)
        .send(movie)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('type');
          res.body.should.have.property('type', 'Client side error');
          done();
          // console.log('\n***************************');
          // console.log(res.body.record);
          // console.log('***************************\n');          
        }); 
    });
  });

  describe('GET -> /movies/{movieId}', () => {
    it('should get movie by id', (done) => {
      let movieId = '5d9be116d837a900114d3ec8';
      chai.request(base_url)
        .get(`${route}/${movieId}`)
        .end((err, res) => {          
          res.should.have.status(200);
          res.should.be.json;
          if (res.body.record !== null) {
            res.body.record.should.be.a('object');
          }
          done();
          // console.log('\n***************************');
          // console.log(res.body.record);
          // console.log('***************************\n');
        }); 
    });
  });

  describe('PUT -> /movies/{movieId}', () => {
    it('should update a movie', (done) => {
      let movieId = '5d9be116d837a900114d3ec8';
      const movie = new Movie({
        genres: [
          { _id: '' },
          { _id: '' }
        ],
        cast: [{}],
        title: 'Homem de Ferro',
        releaseYear: 2008,
        director: { _id: '' }
      });      
      chai.request(base_url)
        .put(`${route}/${movieId}`)
        .send(movie)
        .end((err, res) => {          
          res.should.have.status(200);
          res.should.be.json;
          if (res.body.record !== null) {
            res.body.record.should.be.a('object');
            res.body.record.should.have.property('description', movie.description);
          }
          done();
          // console.log('\n***************************');
          // console.log(res.body.record);
          // console.log('***************************\n');
        }); 
    });

    it('should not accept to update a movie without description', (done) => {
      let movieId = '5d9be116d837a900114d3ec8';
      const movie = new Movie({
        genres: [
          { _id: '' },
          { _id: '' }
        ],
        cast: [{}],
        title: 'Homem de Ferro',
        releaseYear: 2008,
        director: { _id: '' }
      });      
      chai.request(base_url)
        .put(`${route}/${movieId}`)
        .send(movie)
        .end((err, res) => {          
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('type');
          res.body.should.have.property('type', 'Client side error');
          done();
        }); 
    });
  });
});