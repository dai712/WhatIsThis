const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const app = express();

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
    password: String,
    nickname: String,
  }],
  Cfiles: [{        //클라이언트 파일
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
  Gfiles: [{      //그룹파일
    ids: Array
  }],
  Members: [{
    ids: Array
  }]
});

var Client = mongoose.model('Client', client);
var Group = mongoose.model('Group', group);

router.post('/createNewId', function(req, res) {
  console.log(req.body.content);
});

router.get('/수정', function (req, res) {

});

router.post('/spreadText', function(req, res) {
  console.log('updata');
});




module.exports = router;
