require('dotenv/config');

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

const server = process.env.SERVER_TEST;
const route = '/artists';

var artistId = ''; 

describe('Artists', () => {
  describe('POST -> /artists', () => {
    it('should add a new artist', (done) => {
      chai.request(server)
        .post(route)
        .send({
          firstName: 'Robert',
          lastName: 'Downey',
          dateOfBirth: '1965-04-04T00:00:00-00:00'
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.record.should.be.a('object');
          res.body.record.should.have.property('_id');
          res.body.record.should.have.property('firstName');
          done();
          artistId = res.body.record._id;
          // console.log('\n***************************');
          // console.log(res.body.record);
          // console.log('***************************\n');          
        });       
    });

    it('should not accept to add a new artist without first name', (done) => {
      chai.request(server)
        .post(route)
        .send({
          firstName: '',
          lastName: 'Downey',
          dateOfBirth: '1965-04-04T00:00:00-00:00'
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

  describe('GET -> /artists', () => {
    it('should list all artists with default values as parameters', (done) => {
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

    it('should list all artists with filled search value as parameter', (done) => {
      let search = 'robert';
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

  describe('GET -> /artists/{artistId}', () => {
    it('should get artist by id', (done) => { 
      chai.request(server)
        .get(`${route}/${artistId}`)
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

  describe('GET -> /artists/{artistId}/filmography', () => {
    it('should get filmography by artist id', (done) => {
      chai.request(server)
        .get(`${route}/${artistId}/filmography`)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          if (res.body.record !== null) {
            res.body.record.should.be.a('array');
          }
          done();
          // console.log('\n***************************');
          // console.log(res.body.record);
          // console.log('***************************\n');
        }); 
    });
  });

  describe('PUT -> /artists/{artistId}', () => {
    it('should update a artist', (done) => {
      chai.request(server)
        .put(`${route}/${artistId}`)
        .send({
          firstName: 'Robert',
          lastName: 'Downey Jr.',
          dateOfBirth: '1965-04-04T00:00:00-00:00'
        })
        .end(function(error, res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.record.should.have.property('_id');
          res.body.record.should.have.property('firstName');
          done();
          // console.log('\n***************************');
          // console.log(res.body.record);
          // console.log('***************************\n');
        });
    });

    it('should not accept to update a artist without description', (done) => {
      chai.request(server)
        .put(`${route}/${artistId}`)
        .send({
          firstName: '',
          lastName: 'Downey Jr',
          dateOfBirth: '1965-04-04T00:00:00-00:00'
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