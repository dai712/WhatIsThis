'use strict';

const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
  id: String,
  nickname: String,
  Files: Array,
  Members: Array,
});

module.exports = mongoose.model('Group', GroupSchema);
