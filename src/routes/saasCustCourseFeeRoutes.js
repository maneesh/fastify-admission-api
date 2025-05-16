const saasCustCourseFeeController = require('../controllers/saasCustCourseFeeController');
const auth = require('../middleware/auth');

async function saasCustCourseFeeRoutes (fastify, options) {
  fastify.get('/saas_cust_course_fees',{ preHandler: auth }, saasCustCourseFeeController.getAllSaasCustCourseFees);
  fastify.get('/saas_cust_course_fees/:id',{ preHandler: auth }, saasCustCourseFeeController.getSaasCustCourseFeeById);
  fastify.post('/saas_cust_course_fees',{ preHandler: auth }, (req, res) => saasCustCourseFeeController.createSaasCustCourseFee(req, res));
  fastify.put('/saas_cust_course_fees/:id',{ preHandler: auth }, (req, res) => saasCustCourseFeeController.updateSaasCustCourseFee(req, res));
  fastify.delete('/saas_cust_course_fees/:id',{ preHandler: auth }, saasCustCourseFeeController.deleteSaasCustCourseFee);
}

module.exports = saasCustCourseFeeRoutes;