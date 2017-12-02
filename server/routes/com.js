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

var Client = require('./ClientModel');
var Group = require('./GroupModel');

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
  console.log(Account);
 Account.Login.id = req.body.content.id;
 Account.Login.nickname = req.body.content.nickname;
 Account.Login.email = req.body.content.email;
  console.log('created new account: '+Account._id);

  Account.save(function (err, savedAccount) {
    console.log(savedAccount);
    if(err) return console.log('error');
    res.send(savedAccount);
  });
});
router.post('/checkUnique', function (req, res) {
  console.log('체크');
  console.log('아이디 : ' + req.body.content);
  Client.findOne({'Login.id': req.body.content}, function (err, account) {
    console.log(account);
    if(err) return console.log('error');
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
    if(err) console.log('error');
    else res.send(account);
  })
});

router.post('/createGroup', function(req, res){
  var newGroup = new Group();
  newGroup.id = req.body.content[0];
  newGroup.Members.push(req.body.content[1]);
  newGroup.save(function(err, savedGroup){
    if(err) console.log('error');
    console.log(savedGroup);
    console.log(savedGroup.Members);
    res.send(savedGroup);
  })
});

router.get('/searchAllGroup', function(req, res){
  console.log('모든그룹');
  Group.find(function(err, documents){
    if(err) console.log('error');
    res.send(documents);
  });
});

router.post('/joinGroup', function(req, res){
  Group.findOneAndUpdate({_id: req.body.content[0]}, {$push: {Members : req.body.content[1]}}, function(err, updatedGroup){
    if(err) console.log('error');
    console.log(updatedGroup.Members);
  });
});

router.post('/withdrawGroup', function(req, res){
  Group.findOneAndUpdate({_id: req.body.content[0]}, {$pull: {Members : req.body.content[1]}}, function(err, updatedGroup){
    if(err) console.log('error');
    console.log(updatedGroup.Members);
  });
});

router.post('/removeGroup', function(req, res){
    Group.findOneAndRemove({_id: req.body.content[0]}, function(err, result){
      if(err) return console.log('error');
    });
});
router.post('/createPfile', function(req, res){
  console.log(req.body.content);
  var test = new Object();
  test.path = req.body.content[0];
  test.access = '0'
  Client.findOneAndUpdate({'Login.id': req.body.content[1]}, {$push: {Files : test}}, function (err, updated){
   if(err) console.log(err);
   res.send(updated);
  });
});

router.post('/deletePfile', function(req, res){
  var filename = req.body.content[0];
  var id = req.body.content[1];
  Client.findOne({'Login.id': id}, function(err, finded){
    console.log(finded);
  });
});

router.post('/getAccess', function(req, res){
  let id  = req.user.id;
  let access = new Array();
  let list = req.body.content;

  Client.findOne({'Login.id': id}, function(err, finded){
    for (let i = 0 ; i < list.length; i++) {
      for (let j = 0 ;j < finded.Files.length ; j++){
        if(finded.Files[j].path === list[i]) {
          if(finded.Files[j].access === '0') {
            access.push('Public');
          } else if(finded.Files[j].access === '1') {
            access.push('Private');
          } else if(finded.Files[j].access === '2') {
            access.push('Group');
          }
        }
      }
    }
   res.send(access);
  });

});

router.post('/allTask', function (req, res) {
  // console.log(req.body.content);
  Group.findOne({_id: req.body.content}, function (err, result) {
    if(err) return console.error(err);
    // console.log(result.Todo);
    res.send(result.Todo);
  })
})

router.post('/addTask', function (req, res) {
  var task = new Object();
  task.title = req.body.content.title;
  task.content = req.body.content.content;
  task.status = req.body.content.status;
  // task.id = req.body.content.id;
  console.log('will add');
  console.log(task);
  Group.findOneAndUpdate({_id: req.body.content.gid}, {$push: {Todo: task}}, function (err, group) {
    if(err) return console.error(err);
    res.send(group);
    // console.log('before changing' + group.Todo.toString());
  });
})

router.post('/changeTask', function (req, res) {   // gid, curTask, newstatus
  var task = new Object();
  task.title = req.body.content[1].title;
  task.content = req.body.content[1].content;
  task.status = req.body.content[2];
  // task._id = req.body.content[1]._id;
  Group.findOneAndUpdate({_id: req.body.content[0]}, {$pull: {Todo: req.body.content[1]}}, function (err, group) {
    if(err) return console.log(err);
  });
  Group.findOneAndUpdate({_id: req.body.content[0]}, {$push: {Todo: task}}, function (err, group) {
    if(err) return console.log(err);
  });
})

router.post('/deleteTask', function (req, res) {
  // var task = new Object();
  // task.content = req.body.content[1].content;
  // task.title = req.body.content[1].title;
  // task.status = req.body.content[1].status;
  // task._id = req.body.content[1]._id;
  // console.log(task);
  Group.findOneAndUpdate({_id: req.body.content[0]}, {$pull: { Todo: req.body.content[1]}}, function (err, group) {
    if(err) return console.error(err);
  });
  // Group.findOneAndUpdate({_id: req.body.content.gid}, function (err, group) {
  //   if(err) return console.error(err);
  //   group.findOneAndRemove({_id:task.id}, function (err) {
  //     if(err) return console.error(err);
  //   })
  // });
})

module.exports = router;
