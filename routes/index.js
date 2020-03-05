var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Check home page' });
});

//  var Request = require('tedious').Request;
//  var connection = require('../Database/connect');

//  var utility = require('../Database/utility/utility');

module.exports = router;
