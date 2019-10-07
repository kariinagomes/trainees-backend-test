const mongoose = require('mongoose');

module.exports = {
  connection() {
    mongoose.connect('mongodb://mongodb:27017/backendcorujao', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });

    //mongodb atlas
    //mongoose.connect('mongodb+srv://karina:karinag@backend-tcr1r.mongodb.net/backendcorujao?retryWrites=true&w=majority', {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   useFindAndModify: false
    // });
  }
}
