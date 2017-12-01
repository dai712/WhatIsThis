const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const app = express();
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/27017', {useMongoClient: true});
const db = mongoose.connection;
//db.dropDatabase();

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
    email: String,
    id: String,
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
  nickname: String,
  Gfiles: [{      //그룹파일
  }],
  Members: [{
  }]
});

var Client = mongoose.model('Client', client);
var Group = mongoose.model('Group', group);
/*
router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
*/
router.post('/createNewId', function(req, res) {
  console.log(req.body.content);
});

router.post('/NewAccount', function (req, res) {
  console.log('새 아이디');
  var Account = new Client();
 Account.Login.id = req.body.content.id;
 Account.Login.nickname = req.body.content.nickname;
 Account.Login.email = req.body.content.email;
  console.log('created new account: '+Account._id);

  Account.save(function (err, savedAccount) {
    console.log(savedAccount);
    if(err) return console.error(err);
    res.send(savedAccount);
  });
});
router.post('/checkUnique', function (req, res) {
  console.log('체크');
  console.log('아이디 : ' + req.body.content);
  Client.findOne({'Login.id': req.body.content}, function (err, account) {
    console.log(account);
    if(err) return console.error("err " + err);
    if(account==null) res.send(true);
    else res.send(false);
  })
});

router.get('/login',function (req, res) {
  if(req.user){
    res.send(req.user);
  } else {
    res.send('error');
  }

  //res.redirect('/auth/google');
  /*console.log(req.body.content);
  //req.session.id = req.body.content.id;
  console.log(req.session.id);
  Client.findOne({ $and: [{'Login.id': req.body.content.id}, {'Login.password': req.body.content.password}]}, function (err, account) {
    account.session = req.session;
    console.log(account.session);
    if(err) return console.error(err);
    if(account==null) res.send(false);
    else res.send(account);
  })*/
});


router.post('/saveSchedule', function (req, res) {
  Client.findOneAndUpdate({id: req.body.content.id}, {Schedule : req.body.content},function (err, account) {
    console.log(account);
  });
});

router.post('/getAccount', function(req, res){
  console.log("겟");
console.log(req.body.content);
  Client.findOne({'Login.id': req.body.content}, function(err, account){
    console.log(account);
    if(err) console.log(err);
    else res.send(account);
  })
});

router.post('/createGroup', function(req, res){
  var newGroup = new Group();
  newGroup.id = req.body.content[0];
  newGroup.Members.push(req.body.content[1]);
  newGroup.save(function(err, savedGroup){
    if(err) console.log(err);
    console.log(savedGroup);
    console.log(savedGroup.Members);
    res.send(savedGroup);
  })
});

router.get('/searchAllGroup', function(req, res){
  console.log('모든그룹');
  Group.find(function(err, documents){
    if(err) console.error(err);
    res.send(documents);
  });
});

router.post('/joinGroup', function(req, res){
  Group.findOneAndUpdate({_id: req.body.content[0]}, {$push: {Members : req.body.content[1]}}, function(err, updatedGroup){
    if(err) console.error(err);
    console.log(updatedGroup.Members);
  });
});

router.post('/withdrawGroup', function(req, res){
  Group.findOneAndUpdate({_id: req.body.content[0]}, {$pull: {Members : req.body.content[1]}}, function(err, updatedGroup){
    if(err) console.error(err);
    console.log(updatedGroup.Members);
  });
});

router.post('/removeGroup', function(req, res){
    Group.findOneAndRemove({_id: req.body.content[0]}, function(err, result){
      if(err) return console.error(err);
    });
});


module.exports = router;
