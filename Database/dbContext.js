var Request = require('tedious').Request;
var connection = require('../Database/connect');
var TYPES = require('tedious').TYPES;
var utility = require('../Database/utility/utility');

function spGetExecute(qry, callback) {
    var data = [];
    var dataset = [];
    var resultset = 0;
    request = new Request(qry, function (err, rowCount) {
        utility.sendDbResponse(err, rowCount, dataset, callback);

    });

    request.on('row', function (columns) {
        utility.buildRow(columns, data);

    });

    request.on('doneInProc', function (rowCount, more, rows) {
        dataset.push(data);
        data = [];
    });

    connection.callProcedure(request);
}
function spPostExecute(qry, params, callback) {
    console.log("cnt params "+params.length);
    if(params.length>0){
    var newdata = [];
      request = new Request(qry, function (err, rowCount) {
          utility.sendDbResponse(err, rowCount, newdata, callback);
      });
      request.addParameter('mode',TYPES.VarChar, 'ADD');
      params.forEach(param => {
  //        console.log(param.val);
          request.addParameter(param.name, param.type, param.val);
      });
  console.log('sp Post Execute');
      
      request.on('row', function (columns) {
          utility.buildRow(columns, newdata);
      });
      connection.callProcedure(request);
  }
  else
      return null;
}
  
function queryGetExecute(qry, params, isMultiSet, callback) {
    var data = [];
    var dataset = [];
    var resultset = 0;

    console.log('log: queryGetExecute')
    request = new Request(qry, function (err, rowCount) {
        utility.sendDbResponse(err, rowCount, dataset, callback);

    });

    params.forEach(param => {
        request.addParameter(param.name, param.type, param.val);
    });

    request.on('row', function (columns) {
        utility.buildRow(columns, data);
    });

    request.on('doneInProc', function (rowCount, more, rows) {
        if (isMultiSet == false) {
            dataset = data;
        } else {
            dataset.push(data);
            data = [];
        }
    });

    connection.callProcedure(request);
}

function queryExecute(qry, params, isMultiSet, callback) {
    var data = [];
    var dataset = [];
    var resultset = 0;

    request = new Request(qry, function (err, rowCount) {
        utility.sendDbResponse(err, rowCount, dataset, callback);
    });

    params.forEach(param => {
        request.addParameter(param.name, param.type, param.val);
    });


    connection.execSql(request);
}

module.exports = {
    get: spGetExecute,
    post: spPostExecute,
    getQuery: queryGetExecute
};