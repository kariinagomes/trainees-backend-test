const chai = require('chai');
const chaiHttp = require('chai-http');

const Artist = require('../src/app/models/Artist');
const should = chai.should();

chai.use(chaiHttp);

const base_url = 'http://192.168.99.100:5000';
const route = '/artists';

describe('Artists', () => {
  describe('POST -> /artists', () => {
    it('should add a new artist', (done) => {
      const artist = new Artist({
        firstName: 'Robert',
        lastName: 'Downey',
        dateOfBirth: '1965-04-04T00:00:00-00:00'
      });      
      chai.request(base_url)
        .post(route)
        .send(artist)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.record.should.be.a('object');
          res.body.record.should.have.property('firstName', artist.firstName);
          done();
          // console.log('\n***************************');
          // console.log(res.body.record);
          // console.log('***************************\n');          
        });       
    });

    it('should not accept to add a new artist without first name', (done) => {
      const artist = new Artist({
        firstName: '',
        lastName: 'Downey',
        dateOfBirth: '1965-04-04T00:00:00-00:00'
      });
      chai.request(base_url)
        .post(route)
        .send(artist)
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

  describe('GET -> /artists', () => {
    it('should list all artists with default values as parameters', (done) => {
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

    it('should list all artists with filled search value as parameter', (done) => {
      let search = 'robert';
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

  describe('GET -> /artists/{artistId}', () => {
    it('should get artist by id', (done) => {
      let artistId = '';
      Artist.findOne({}, (err, res) => { artistId = res._id });

      // const artistValidId = Artist.findOne().then; // encontrar um id válido
      // const artistId = artistValidId._id;
      chai.request(base_url)
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
      let artistId = '';
      Artist.findOne({}, (err, res) => { artistId = res._id });
      chai.request(base_url)
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

  describe('PUT -> /artists/{artistId}', () => {
    it('should update a artist', (done) => {
      let artistId = '';
      Artist.findOne({}, (err, res) => { artistId = res._id });
      const artist = new Artist({
        firstName: 'Robert',
        lastName: 'Downey Jr.',
        dateOfBirth: '1965-04-04T00:00:00-00:00'
      });      
      chai.request(base_url)
        .put(`${route}/${artistId}`)
        .send(artist)
        .end((err, res) => {          
          res.should.have.status(200);
          res.should.be.json;
          if (res.body.record !== null) {
            res.body.record.should.be.a('object');
            res.body.record.should.have.property('firstName', artist.firstName);
          }
          done();
          // console.log('\n***************************');
          // console.log(res.body.record);
          // console.log('***************************\n');
        }); 
    });

    it('should not accept to update a artist without description', (done) => {
      let artistId = '';
      Artist.findOne().exec(function(err, res) { 
        console.log(res);
      });
      console.log('ARTIST ID:', artistId);
      const artist = new Artist({
        firstName: '',
        lastName: 'Downey Jr.',
        dateOfBirth: '1965-04-04T00:00:00-00:00'
      });
      chai.request(base_url)
        .put(`${route}/${artistId}`)
        .send(artist)
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