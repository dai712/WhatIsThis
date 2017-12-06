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
 Account.Login.id = req.body.content.id;
 Account.Login.nickname = req.body.content.nickname;
 Account.Login.email = req.body.content.email;
 Account.Login.provider = req.body.content.provider;
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
    console.log(req.user);
  } else {
    res.send('error');
  }

});

router.get('/getAllUsers', function(req, res){
  Client.find({}, function(err, Users){
    if(err) console.log('err');
    res.send(Users);
  })
});

router.post('/changeNickname', function(req, res){
  let id = req.user.id;
  Client.findOneAndUpdate({'Login.id': id}, {$set: {'Login.nickname': req.body.content}}, {new: true}, function(err, updated){
    console.log(updated);
    res.send(updated);
  });
});

router.post('/saveSchedule', function (req, res) {
  console.log("here");
  console.log(req.body.content.id);
  Client.findOneAndUpdate({'Login.id': req.body.content.id}, {Schedule : req.body.content},function (err, account) {
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

router.post('/getGroup',function (req,res) {
  console.log("getgroup");
  Group.findOne({_id: req.body.content}, function(err, account){
    if(err) console.log(err);
    else res.send(account);
  })
});

router.post('/createGroup', function(req, res){
  var newGroup = new Group();
  newGroup.id = req.body.content[0];
  newGroup.Members.push(req.body.content[1]);
  newGroup.save(function(err, savedGroup){
    if(err) console.log('error');
    Client.findOneAndUpdate({'Login.id' : req.user.id}, {$push: {'Group': savedGroup._id}}, {new : true}, function(err, savedUser){
      if(err) console.log('error');
    });
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

router.post('/getGroupDetail', function(req, res){
  console.log(req.body.content);
  Group.findOne({_id: req.body.content}, function(err, findedGroup){
    res.send(findedGroup);
  });
});

router.post('/catUserFiles', function(req, res) {
  // 0: 해당 아이디
  // 2: group 검사
  Client.findOne({'Login.id': req.body.content[0]}, function(err, findedUser){
    let response = [];
    console.log(findedUser);
    if(req.user.id === findedUser.Login.id){
      for(let i = 0 ; i < findedUser.Files.length ; i ++){
        response.push(findedUser.Files[i].path);
      }
    } else {
      for (let i = 0 ; i < findedUser.Files.length ; i++) {
        if(findedUser.Files[i].access === 0) {
          response.push(findedUser.Files[i].path);
        } else if (findedUser.Files[i].access === 2 && req.body.content[1] === true) {
          response.push(findedUser.Files[i].path);
        }
      }
    }
    res.send(response);
  });
});

router.post('/joinGroup', function(req, res){
  Group.findOne({_id: req.body.content[0], Members: req.user.id}, function(err, finded) {
    if(finded){
      let response = [];
      response.push('이미 가입한 그룹');
      console.log('찾음');
      console.log(req.body.content[0]);
      console.log(finded);
      res.send(response);
    }
    else {
      Group.findOneAndUpdate({_id: req.body.content[0]}, {$push: {Members : req.body.content[1]}},{new: true}, function(err, updatedGroup){
        Client.findOneAndUpdate({'Login.id': req.user.id}, {$push: {Group: updatedGroup._id}}, {new: true}, function(err, updatedCliend){
          if(err) console.log('error');
        });
        if(err) console.log('error');
        console.log(updatedGroup.Members);
      });
    }

  });

});

router.post('/withdrawGroup', function(req, res){
  Group.findOneAndUpdate({_id: req.body.content[0]}, {$pull: {Members : req.body.content[1]}}, {new: true}, function(err, updatedGroup){
    if(err) console.log('error');
    console.log(updatedGroup);
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
  console.log(filename);
  Client.findOneAndUpdate({'Login.id': id} , {$pull : {Files: {path: filename}}}, {new: true},
    function(err, updated){
      if(err) console.log(err);
      console.log('업데이트된것 : ' + updated);
      res.send(updated);
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
          if(finded.Files[j].access === 0) {
            access.push('Public');
          } else if(finded.Files[j].access === 1) {
            access.push('Private');
          } else if(finded.Files[j].access === 2) {
            access.push('Group');
          }
        }
      }
    }
   res.send(access);
  });
});

router.post('/changePfileAccess', function(req, res) {
    console.log(req.body.content);
    let id = req.user.id;
    let list = req.body.content;
    let access = '';
    if(list[1] === 'Public') {
      access = 0;
      console.log('퍼블릭');
    } else if(list[1] === 'Private') {
      access = 1;
      console.log('프리베잇');
    } else if(list[1] === 'Group') {
      access = 2;
      console.log('그룹' + access);
    }
  Client.findOneAndUpdate({'Login.id': id, Files: {$elemMatch: {path: list[0]}}}, {$set:{'Files.$.access': access}}, {new: true},
    function(err, updated){
    if(err) console.log(err);
    console.log('업데이트된것 : ' + updated);
    res.send(updated);
    });
});

router.post('/createGFiles', function(req, res){
  let id = req.body.content[1];
  let path = req.body.content[0];
    Group.findOneAndUpdate({_id: id}, {$push: {Files: path}}, {new : true} , function(err, updatedGroup){
      console.log(updatedGroup);
      if(err) console.log('error');
    });
});

router.post('/removeGFiles', function(req, res){
  let id= req.body.content[1];
  let path = req.body.content[0];
  Group.findOneAndUpdate({_id: id}, {$pull: {Files: path}}, {new : true}, function(err, updatedGroup){
    console.log(updatedGroup);
    if(err) console.log('error');
  })
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
