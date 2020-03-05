var response = require('../../shared/response');
var TYPES = require('tedious').TYPES;
function portfoliosRepository(dbContext) {
    console.log('Begin');
    
  var portFolios=[
    {id:1,caption:'Apple1'},
    {id:2,caption:'Ball1'},
    {id:3,caption:'Cat1'}
  ]
function getportfolios(req, res) {
    console.log('getportfolios');
return portFolios;
    
dbContext.get("getportfolios", function (error, data) {
                return res.json(response(data, error));
            });
}
function getportfolio(req, res) {
    console.log('getportfolio');
       if (req.params.portfoliosId) {
            var parameters = [];
//parameters.push({ name: 'Id', type: TYPES.Int, val: req.params.portfoliosId });
var query = "GetPortfolio"
dbContext.get(query, parameters, false, function (error, data) {
                if (data) {
                    req.data = data[0];
                    return next();
                }
                return res.sendStatus(404);
            });
        }
    }
function postportfolios(req, res) {
    console.log('postportfolio');
var parameters = [];
parameters.push({ name: 'FirstName', type: TYPES.VarChar, val: req.body.FirstName });
        parameters.push({ name: 'LastName', type: TYPES.VarChar, val: req.body.LastName });
        parameters.push({ name: 'MiddleName', type: TYPES.VarChar, val: req.body.MiddleName });
        parameters.push({ name: 'DOB', type: TYPES.DateTime, val: new Date(req.body.DOB) });
        parameters.push({ name: 'Designation', type: TYPES.VarChar, val: req.body.Designation });
        parameters.push({ name: 'ReportingTo', type: TYPES.VarChar, val: req.body.ReportingTo });
        parameters.push({ name: 'Salary', type: TYPES.Int, val: req.body.Salary });
dbContext.post("InsertOrUpdateportfolios", parameters, function (error, data) {
            return res.json(response(data, error));
        });
    }
return {
        getAll: getportfolios,
        get: getportfolio,
        post: postportfolios 
    }
}
module.exports = portfoliosRepository;