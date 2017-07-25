var express = require('express');
var router = express.Router();

var path = require('path');

var dir = path.dirname(__dirname);


router.get('/', function(req, res){
  res.sendFile(path.join(dir + '/index.html'));
});


exports.dir = dir;
exports.router = router;
