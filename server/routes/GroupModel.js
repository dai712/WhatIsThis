'use strict';

const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
  id: String,
  nickname: String,
  Files: [String],
  Members: [String],
});

module.exports = mongoose.model('Group', GroupSchema);
