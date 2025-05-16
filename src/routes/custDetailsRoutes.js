const custDetailsController = require('../controllers/custDetailsController');
const auth = require('../middleware/auth');

async function custDetailsRoutes (fastify, options) {
  fastify.get('/cust_details',{ preHandler: auth }, custDetailsController.getAllCustDetails);
  fastify.get('/cust_details/:id',{ preHandler: auth }, custDetailsController.getCustDetailsById);
  fastify.post('/cust_details', { preHandler: auth },(req, res) => custDetailsController.createCustDetails(req, res));
  fastify.put('/cust_details/:id', { preHandler: auth },(req, res) => custDetailsController.updateCustDetails(req, res));
  fastify.delete('/cust_details/:id', { preHandler: auth }, custDetailsController.deleteCustDetails);
}

module.exports = custDetailsRoutes;