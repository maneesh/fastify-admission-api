const custDetailsController = require('../controllers/custDetailsController');

async function custDetailsRoutes (fastify, options) {
  fastify.get('/cust_details', custDetailsController.getAllCustDetails);
  fastify.get('/cust_details/:id', custDetailsController.getCustDetailsById);
  fastify.post('/cust_details', (req, res) => custDetailsController.createCustDetails(req, res));
  fastify.put('/cust_details/:id', (req, res) => custDetailsController.updateCustDetails(req, res));
  fastify.delete('/cust_details/:id', custDetailsController.deleteCustDetails);
}

module.exports = custDetailsRoutes;