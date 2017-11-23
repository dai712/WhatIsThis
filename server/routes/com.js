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
  Login: {
    id: String,
    password: String,
    nickname: String,
  },
  Cfiles: [{        //클라이언트 파일
    ids: Array,
    Access: Array
  }],
  Group: [{
    ids: Array,
    master: Array
  }],
  Schedule: [{
    subjects: Array,
    time: Array
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
router.post('/NewAccount', function (req, res) {
  console.log(req.body.content);
  var newAccount = new Client();
  newAccount.Login.id = req.body.content.id;
  newAccount.Login.password = req.body.content.password;
  newAccount.Login.nickname = req.body.content.nickname;
  console.log('created new account: '+newAccount.Login);
  newAccount.save(function (err, savedAccount) {
    if(err) return console.error(err);
    res.send(savedAccount);
  });
});
router.post('/checkUnique', function (req, res) {
  console.log(req.body.content);
  Client.findOne({'Login.id': req.body.content}, function (err, account) {
    console.log(account);
    if(err) return console.error("err " + err);
    if(account==null) res.send(true);
    else res.send(false);
  })
});
router.post('/login', function (req, res) {
  console.log(req.body.content);
  Client.findOne({ $and: [{'Login.id': req.body.content.id}, {'Login.password': req.body.content.password}]}, function (err, account) {
    console.log(account);
    if(err) return console.error(err);
    if(account==null) res.send(false);
    else res.send(account);
  })
});

router.post('/saveSchedule', function (req, res) {
  Client.findOne({'Login.id': req.body.content.id}, function (err, account) {
    account.Schedule.subjects = req.body.content.subjects;
    account.Schedule.time = req.body.content.time;
    account.save(function(err, updatedAccount) {
      if(err) console.log(err);
    })
  });
});

router.post('/getAccount', function(req, res){
  console.log(req.body.content);
  Client.findOne({'Login.id': req.body.content}, function(err, account){
    if(err) console.log(err);
    else res.send(account);
  })
});

router.get('/수정', function (req, res) {

});

router.post('/spreadText', function(req, res) {
  console.log('updata');
});






module.exports = router;
