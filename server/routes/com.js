const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/');

const db = mongoose.connection;
db.on('error', function(err){
  console.log("error : " + err);
});
db.on('connected',function(){
  console.log("connected successfully to server");
});
router.get('/', function (req, res) {
  res.send('express works');
});

var Schema = mongoose.Schema;
var client = new Schema({
  Login: [{
    id: String,
    password: String
  }],
  Cfiles: [{
    ids: Array,
    Access: Array
  }],
  Group: [{
    ids: Array,
    master: Array
  }]
});

var group = new Schema({
  id: String,
  Gfiles: [{
    ids: Array
  }],
  Members: [{
    ids: Array
  }]
});

var Client = mongoose.model('Client', client);
var Group = mongoose.model('Group', group);

router.post('/수정', function(req, res) {

});

router.get('/수정', function (req, res) {

});


module.exports = router;
