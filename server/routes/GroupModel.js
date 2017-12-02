'use strict';

const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
  id: String,
  nickname: String,
  Files: Array,
  Members: Array,
  Todo: [{
    title: String,
    content: String,
    status: String
  }]
});

module.exports = mongoose.model('Group', GroupSchema);
