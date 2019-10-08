require('dotenv/config');

const mongoose = require('mongoose');

module.exports = {
  connection() {
    mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    }).catch(error => console.log('Database error: ', error));
  }
}
