'use strict';

const mongoose = require('mongoose');


const ClientSchema = new mongoose.Schema({
  Login: {
    email: String,
    id: String,
    nickname: String,
  },
  Files: [{
    path: String,
    access: String,
  }],
  Group: [String],
  Schedule: [{
    subjects: String,
    time: String,
  }],
});

module.exports = mongoose.model('Client', ClientSchema);
