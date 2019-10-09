const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

const server = process.env.SERVER_TEST;
const route = '/genres';

var genreId = '';

describe('Genres', () => {
  describe('POST -> /genres', () => {
    it('should add a new genre', (done) => {
      chai.request(server)
        .post(route)
        .send({
          description: 'Ficção científica'
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.record.should.be.a('object');
          res.body.record.should.have.property('_id');
          res.body.record.should.have.property('description');
          done();
          genreId = res.body.record._id;
          // console.log('\n***************************');
          // console.log(res.body.record);
          // console.log('***************************\n');          
        });       
    });

    it('should not accept to add a new genre without description', (done) => {
      chai.request(server)
        .post(route)
        .send({
          description: ''
        })
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

  describe('GET -> /genres', () => {
    it('should list all genres with default values as parameters', (done) => {
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

    it('should list all genres with filled search value as parameter', (done) => {
      const search = 'ficcao';
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

  describe('GET -> /genres/{genreId}', () => {
    it('should get genre by id', (done) => {     
      chai.request(server)
        .get(`${route}/${genreId}`)
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

  describe('PUT -> /genres/{genreId}', () => {
    it('should update a genre', (done) => {
      chai.request(server)
        .put(`${route}/${genreId}`)
        .send({
          description: 'Ação'
        })
        .end((err, res) => {          
          res.should.have.status(200);
          res.should.be.json;
          res.body.record.should.be.a('object');
          res.body.record.should.have.property('_id');
          res.body.record.should.have.property('description');
          done();
          // console.log('\n***************************');
          // console.log(res.body.record);
          // console.log('***************************\n');
        }); 
    });

    it('should not accept to update a genre without description', (done) => {
      chai.request(server)
        .put(`${route}/${genreId}`)
        .send({
          description: ''
        })
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