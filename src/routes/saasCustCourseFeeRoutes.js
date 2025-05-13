const saasCustCourseFeeController = require('../controllers/saasCustCourseFeeController');

async function saasCustCourseFeeRoutes (fastify, options) {
  fastify.get('/saas_cust_course_fees', saasCustCourseFeeController.getAllSaasCustCourseFees);
  fastify.get('/saas_cust_course_fees/:id', saasCustCourseFeeController.getSaasCustCourseFeeById);
  fastify.post('/saas_cust_course_fees', (req, res) => saasCustCourseFeeController.createSaasCustCourseFee(req, res));
  fastify.put('/saas_cust_course_fees/:id', (req, res) => saasCustCourseFeeController.updateSaasCustCourseFee(req, res));
  fastify.delete('/saas_cust_course_fees/:id', saasCustCourseFeeController.deleteSaasCustCourseFee);
}

module.exports = saasCustCourseFeeRoutes;