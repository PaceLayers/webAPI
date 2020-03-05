var express = require('express');
var router = express.Router();
const dbContext = require('../Database/dbContext');
var response = require('../shared/response');
//var response = require('../../shared/response');
var TYPES = require('tedious').TYPES;

var portFolios=[
  {id:1,caption:'Apple1'},
  {id:2,caption:'Ball1'},
  {id:3,caption:'Cat1'}
]
/* GET users listing. */
router.get('/api/portfolios/', function(req, res, next) {

  console.log('getportfolio');
  
dbContext.get("getportfolio", function (error, data) {
  return res.json(response(data, error));
});
});

module.exports = router;
