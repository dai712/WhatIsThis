const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
//const http = require('http').Server(app);
//const server = http.createServer(app);

const server = require('http').Server(app);
const io = require('socket.io').listen(server);

//소켓 통신
io.on('connection', function(socket){
  console.log('aas');
  socket.on('add-message', function(msg){
    io.emit('chat-message', msg);
    console.log('에밋 : '+msg);
  });
  socket.on('chat-message', function(msg){
    console.log('메세지 : ' + msg);
  });
});



// API file for interacting with MongoDB
const api = require('./server/routes/com');

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

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
