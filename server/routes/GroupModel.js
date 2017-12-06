'use strict';

const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
  id: String,
  Files: [String],
  Members: [String],
  Todo: [{
    title: String,
    content: String,
    status: String
  }]
});

module.exports = mongoose.model('Group', GroupSchema);
