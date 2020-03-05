var express = require('express');
var router = express.Router();
const dbContext = require('../Database/dbContext');
var response = require('../shared/response');
//var response = require('../../shared/response');
var TYPES = require('tedious').TYPES;
var bodyParser = require('body-parser')
var customParser = bodyParser.json({type: function(req) {
  req.headers['content-type'] === "text/html"
}})
router.post('/AddPort', customParser, function(req, res){
	// var newTask = {
	// 	//idTasks : shortid.generate(),
	// 	Name : 'Content-type: ' + req.get('Content-type'),
	// 	Description : 'JSON body: ' + JSON.stringify(req.body),
	// 	CreatedDateTime : new Date()
	// }
  var parameters = [];
  for (var key in req.body) {
      parameters.push({ name: key, type: TYPES.Int, val: req.body[key] });
  }
	//queryHandler.queryRecordsWithParam('insert into Tasks set ?', newTask, function(err, rows){
    if(parameters.length>0){
    dbContext.post("CRUD_AppSupportOption",parameters, function (error, data) {
		if(error) {
      console.log('info: ', '-------------------- ERROR: ' + error);
     return res.status(400).json({
        status: 'error',
        error: error.message,
      });
    }
    return	 res.status(200).json({
      status: 'succes',
      data: 'Record added successfully.',
    });
  });
}
else res.sendStatus(300).json('No param');
});

//  var _appBrpocess = {
//   portfolioID : 0,
//   applicationID : 0,
//   BprocessID :0,
//   SupportOptionID : 0,
//   };
// function AppBrpocess () {/*from  ww  w  .j a v  a 2  s. co  m*/

// }
/* GET portfolios listing. */
router.get('/portfolios/', function(req, res, next) {
  dbContext.get("getportfolio", function (error, data) {
    //console.log(error);
    if(error)
    return res.status(400).json({
      status: 'error',
      error: error.message,
    });
    else
    return	 res.status(200).json({
      status: 'succes',
      data: (response(data, error))
    });
  });
  
});
 /* GET ApplLayerState listing. */
 router.get('/ApplLayerState/', function(req, res, next) {
   dbContext.get("getApplLayerState", function (error, data) {
    if(error)
    return res.status(400).json({
      status: 'error',
      error: error.message,
    });
    else
    return	 res.status(200).json({
      status: 'succes',
      data: (response(data, error))
    });
  }); 
  });
  /* GET applications listing. */
  router.get('/applications/:ID', function(req, res, next) {
    if (req.params.ID) {
      var parameters = [];

      parameters.push({ name: 'PortfolioId', type: TYPES.Int, val: req.params.ID });

      dbContext.getQuery("getapplications",parameters,true, function (error, data) {
        console.log(data);
     return res.json(response(data, error));
   });
  }});
  /* GET ApplLayer State listing. */
  router.get('/ApplLayerStateID/:ID', function(req, res, next) {
    if (req.params.ID) {
      var parameters = [];

      parameters.push({ name: 'ID', type: TYPES.Int, val: req.params.ID });

      dbContext.getQuery("getApplLayerState",parameters,true, function (error, data) {
        console.log(data);
        if(error)
        return res.status(400).json({
          status: 'error',
          error: error.message,
        });
        else
        return	 res.status(200).json({
          status: 'succes',
          data: (response(data, error))
        });
      });
  }});
/* GET Process listing. */
router.get('/BProcess/', function(req, res, next) {
  dbContext.get("getBProcess", function (error, data) {
   return res.json(response(data, error));
 });
 });
 router.get('/GetSupports/', function(req, res, next) {
   dbContext.get("GetSupportOptions", function (error, data) {
    if(error)
    return res.status(400).json({
      status: 'error',
      error: error.message,
    });
    else
    return	 res.status(200).json({
      status: 'succes',
      data: (response(data, error))
    });
  });
  });

module.exports = router;
