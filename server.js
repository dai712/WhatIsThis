  const express = require('express');
  const bodyParser = require('body-parser');
  const path = require('path');
  const multer = require('multer');
  const app = express();

  const server = require('http').Server(app);
  const io = require('socket.io').listen(server);
  const mkdirp = require('mkdirp');
  var Finder = require('fs-finder');


  require('./config/passportGoogle').setupGoogle(app);
  require('./config/passportFacebook').setupFacebook(app);
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true}));
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });



let current = [];
  //소켓 통신
  io.on('connection', function(socket){
    socket.on('add-message', function(msg){
      io.emit('chat-message', msg);
      console.log('에밋 : '+msg);
    });
    socket.on('chat-message', function(msg){
      console.log('메세지 : ' + msg);
    });



    socket.on('add-spread', function(msg){
      io.emit('emit-spread', msg);
      console.log('스프레드: ', msg);
    });
    socket.on('emit-spread', function(msg){
      console.log('스프레드: ', msg);
    });
  /*  socket.on('disconnect', function(usr){
      console.log('유저는2' + usr);
      for (let j = 0 ; j < current.length ; j++){
        if(current[j].Login.id === usr.Login.id) {
          let splice = current.splice(j, j);
        }
      }
      console.log(current);
    });*/
  });

  var loc = '';
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, loc);
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });

  var upload = multer({ storage: storage });
  var fs = require('fs');


  app.use('/download', express.static(__dirname));

  app.post('/makeDir', upload.fields([]),function(req, res){
    loc = req.body.loc;
    console.log(loc);
    mkdirp(loc, function(err){
      if(err) console.error(err);
    });
  });
  app.post('/delete', upload.fields([]),function(req, res){
    console.log(req.body);
    fs.unlink(req.body.loc);
    res.send(res);
  });

  app.post('/getPrivate/', upload.fields([]), function(req, res){
  console.log('로케' + req.body.loc);
    var files = Finder.in(req.body.loc).find();
    loc = req.body.loc;
    console.log(files);
    res.send(files);
  });

  app.post('/joinMakeDir/', upload.fields([]),function(req, res){
    console.log(req.body.loc);
    mkdirp(req.body.loc, function(err){
      if(err) console.error(err);
    });
    loc = path.join(req.body.loc);
      //res.send(res);
  });

  app.post('/currentLoc/', upload.fields([]), function(req, res){
    var forders = Finder.in(path.join('./uploads/Private/', req.body.id)).find();
  });

  app.post('/refreshLoc/', upload.fields([]), function(req, res){
    loc = req.body.loc;
  });

  app.post('/uploads/', upload.array("uploads[]", 12),  function (req, res, next) {
    console.log('files', req.files);
    res.send(req.files);
  });

  // API file for interacting with MongoDB
  const api = require('./server/routes/com');


  // Angular DIST output folder
  app.use(express.static(path.join(__dirname, 'dist')));

  // API location
  app.use('/com', api);

  // Send all other requests to the Angular app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });

  //Set Port
  const port = process.env.PORT || '3000';
  app.set('port', port);

  server.listen(port, () => console.log(`Running on localhost:${port}`));
