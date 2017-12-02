'use strict';

const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
  id: String,
  nickname: String,
<<<<<<< HEAD
  Files: [String],
  Members: [String],
=======
  Files: Array,
  Members: Array,
  Todo: [{
    title: String,
    content: String,
    status: String
  }]
>>>>>>> 7ca8d0323756342a27400e0e95fd686aa61a61eb
});

module.exports = mongoose.model('Group', GroupSchema);
