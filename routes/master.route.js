
const _portfoliosRepository = require('../repository/Masters/portfolios.Repository');
const dbContext = require('../Database/dbContext');

var express = require('express');
var router = express.Router();
const portfoliosRepository = _portfoliosRepository(dbContext);

/* GET users listing. */
router.get('/portfolios', function(req, res, next) {
  res.send( portfoliosRepository.getAll );
});

module.exports = router;

/*
module.exports = function (router) {
  const portfoliosRepository = _portfoliosRepository(dbContext);

  router.route('/portfolios')
    .get(portfoliosRepository.getAll);

  router.route('/employees')
      .get(employeeRepository.getAll)
      .post(employeeRepository.post);
      
  router.route('/employees/department')
  .get(employeeRepository.getMulti);

  router.use('/employees/:employeeId', employeeRepository.intercept);

  router.route('/employees/:employeeId')
      .get(employeeRepository.get)
      .put(employeeRepository.put)
      .delete(employeeRepository.delete);
*/
// const _portfolioRepository=require('../repository/Masters/portfolios.Repository');
// const dbcontext = require('../Database/dbContext');

// /* GET data. */
// router.get('/api/portfolios', function(req, res, next) {
//   console.log('start');
//     console.log(_portfolioRepository.get);
//     res.send(_portfolioRepository.get);
//   console.log('end');
// });
  
//   /* GET home page. */
//   router.post('/api/portfolio', function(req, res, next) {
//     var portfolio=[{
//       id:portFolios.length+1,
//       caption:req.body.caption
//     }];
//     portFolios.push(portfolio);
//     res.send(portFolios);
//   });
  
// module.exports=router;
// //function(router){    const portfoliosRepository=_portfolioRepository(dbcontext);}

// //router.route('/portfoliosRepository');