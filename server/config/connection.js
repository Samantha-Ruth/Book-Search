const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/Book-Search', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

module.exports = mongoose.connection;
