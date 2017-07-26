var express = require('express');
var router = express.Router();

var path = require('path');

var dir = path.dirname(__dirname);


router.get('/', function(req, res){
  res.sendFile(path.join(dir + '/index.html'));
});

router.get('/app', function(req, res){
  res.sendFile(path.join(dir + '/src/app/app.html'));
});


router.get('/signup', function(req, res){
  res.send("Vouper is anonymous!!! There is no signup!");
});

exports.dir = dir;
exports.router = router;
