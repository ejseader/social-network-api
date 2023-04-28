const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/turtles_mongoose');

module.exports = mongoose.connection;