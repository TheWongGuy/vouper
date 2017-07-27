//IMPORTS
var express = require("express");

var server = express();
var router = require('./router/router');
var path = require('path');

//CONFIG
var port = process.env.PORT || 8080

server.use('/source', express.static(path.join(__dirname, 'src')));
server.use('/modules', express.static(path.join(__dirname, 'node_modules')));
server.use('/router', express.static(path.join(__dirname, 'router')));
server.use('/fonts', express.static(path.join(__dirname, 'assets/fonts')));
//API Routes
server.use('/', router.router);

//Starting the server
server.listen(port, function(err, res){
  if(err){
    console.log("[!] " + err);
  }else{
    console.log("[*] Welcome! Vouper is now running on port: " + port);
  }
});
