'use strict';

const mongoose = require('mongoose');


const ClientSchema = new mongoose.Schema({
  Login: {
    email: String,
    id: String,
    nickname: String,
    provider: String,
  },
  Files: [{
    path: String,
    access: Number,
  }],
  Group: [String],
  Schedule: [{
    subjects: Array,
    time: Array,
  }],
});
// ClientSchema.replace
module.exports = mongoose.model('Client', ClientSchema);
