require('dotenv/config');

const mongoose = require('mongoose');
//const dotenv = require('dotenv');

// dotenv.config({
//   path: process.env.NODE_ENV.trim() === 'test' ? './.env.test' : './.env'
// });

console.log(process.env.MONGO_URL);

// const env = (process.env.NODE_ENV || 'development').trim();

// if (env === 'test') {
//   process.env.MONGO_URL = 'mongodb://mongodb:27017/backendcorujao-test';
// } else {
//   process.env.MONGO_URL = 'mongodb://mongodb:27017/backendcorujao';
// }

module.exports = {
  connection() {
    mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    }).catch(error => console.log('Database error: ', error));

    // mongoose.connect('mongodb://mongodb:27017/backendcorujao', {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   useFindAndModify: false
    // });

    //mongodb atlas
    // mongoose.connect('mongodb+srv://karina:karinag@backend-tcr1r.mongodb.net/backendcorujao?retryWrites=true&w=majority', {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   useFindAndModify: false
    // });
  }
}
